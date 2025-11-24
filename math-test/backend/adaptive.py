"""
自适应测试算法 - 基于IRT（项目反应理论）
"""
import numpy as np
from scipy.optimize import minimize_scalar
from models import db, Question, TestSession, TestResponse


class AdaptiveTestEngine:
    """自适应测试引擎"""
    
    def __init__(self):
        self.max_questions = 20  # 最大题目数
        self.min_questions = 10  # 最小题目数
        self.ability_precision = 0.1  # 能力估计精度
    
    def get_next_question(self, session_id, current_ability):
        """
        根据当前能力值选择下一题
        
        参数:
            session_id: 测试会话ID
            current_ability: 当前能力估计值
            
        返回:
            Question对象
        """
        # 获取已答题目ID列表
        session = TestSession.query.get(session_id)
        answered_ids = [r.question_id for r in session.responses] if session else []
        
        # 查询未答题目
        available_questions = Question.query.filter(
            ~Question.id.in_(answered_ids) if answered_ids else True
        ).all()
        
        if not available_questions:
            return None
        
        # 选择最能准确评估当前能力水平的题目
        # 在IRT中，信息量最大的题目是难度接近当前能力值的题目
        best_question = None
        min_distance = float('inf')
        
        for q in available_questions:
            # 计算题目难度与当前能力的距离
            distance = abs(q.difficulty - current_ability)
            
            # 同时考虑区分度，区分度越高越好
            adjusted_distance = distance / (q.discrimination + 0.1)
            
            if adjusted_distance < min_distance:
                min_distance = adjusted_distance
                best_question = q
        
        return best_question
    
    def update_ability(self, session_id, question_id, is_correct, previous_ability):
        """
        根据答题结果更新能力估计值
        
        参数:
            session_id: 测试会话ID
            question_id: 题目ID
            is_correct: 是否答对
            previous_ability: 之前的能力估计值
            
        返回:
            更新后的能力估计值
        """
        # 获取所有已回答的记录
        session = TestSession.query.get(session_id)
        responses = session.responses if session else []
        
        # 使用最大似然估计（MLE）或贝叶斯估计（EAP）来估计能力值
        # 这里使用简化的MLE方法
        
        # 如果题目太少，使用简单的平均方法
        if len(responses) < 3:
            # 简单的加权平均
            correct_rate = sum(1 for r in responses if r.is_correct) / len(responses) if responses else 0.5
            # 根据正确率调整能力值
            if is_correct:
                new_ability = previous_ability + 0.3
            else:
                new_ability = previous_ability - 0.3
            return np.clip(new_ability, -3, 3)  # 限制在-3到3之间
        
        # 题目数量足够时，使用IRT的MLE方法
        return self._estimate_ability_mle(session_id)
    
    def _estimate_ability_mle(self, session_id):
        """
        使用最大似然估计（MLE）估计能力值
        
        基于2PL（两参数逻辑斯蒂模型）:
        P(theta) = 1 / (1 + exp(-a * (theta - b)))
        
        其中:
        - theta: 能力值
        - a: 区分度
        - b: 难度
        """
        session = TestSession.query.get(session_id)
        responses = session.responses if session else []
        
        if not responses:
            return 0.0
        
        # 定义似然函数（负对数似然）
        def neg_log_likelihood(theta):
            log_likelihood = 0.0
            for response in responses:
                question = response.question
                a = question.discrimination  # 区分度
                b = question.difficulty      # 难度
                
                # 计算答对的概率
                prob = 1 / (1 + np.exp(-a * (theta - b)))
                
                # 累积对数似然
                if response.is_correct:
                    log_likelihood += np.log(prob + 1e-10)
                else:
                    log_likelihood += np.log(1 - prob + 1e-10)
            
            return -log_likelihood
        
        # 在合理范围内搜索最优theta值
        result = minimize_scalar(
            neg_log_likelihood,
            bounds=(-3, 3),
            method='bounded'
        )
        
        return float(result.x) if result.success else 0.0
    
    def analyze_knowledge_points(self, session_id):
        """
        分析知识点掌握情况
        
        返回:
            dict: {知识点: {'correct': 正确数, 'total': 总数, 'mastery': 掌握度}}
        """
        session = TestSession.query.get(session_id)
        responses = session.responses if session else []
        
        knowledge_stats = {}
        
        for response in responses:
            question = response.question
            for kp in question.knowledge_points:
                if kp not in knowledge_stats:
                    knowledge_stats[kp] = {'correct': 0, 'total': 0}
                
                knowledge_stats[kp]['total'] += 1
                if response.is_correct:
                    knowledge_stats[kp]['correct'] += 1
        
        # 计算掌握度（0-1之间）
        for kp in knowledge_stats:
            stats = knowledge_stats[kp]
            stats['mastery'] = stats['correct'] / stats['total'] if stats['total'] > 0 else 0
            stats['mastery_percent'] = round(stats['mastery'] * 100, 1)
        
        return knowledge_stats
    
    def analyze_semester_performance(self, session_id):
        """
        分析按学期的表现
        
        返回:
            dict: {学期: {'correct': 正确数, 'total': 总数, 'accuracy': 正确率}}
        """
        session = TestSession.query.get(session_id)
        responses = session.responses if session else []
        
        semester_stats = {}
        
        for response in responses:
            question = response.question
            semester = question.semester or '未分类'
            
            if semester not in semester_stats:
                semester_stats[semester] = {'correct': 0, 'total': 0}
            
            semester_stats[semester]['total'] += 1
            if response.is_correct:
                semester_stats[semester]['correct'] += 1
        
        # 计算正确率
        for semester in semester_stats:
            stats = semester_stats[semester]
            stats['accuracy'] = stats['correct'] / stats['total'] if stats['total'] > 0 else 0
            stats['accuracy_percent'] = round(stats['accuracy'] * 100, 1)
        
        return semester_stats
    
    def get_ability_level(self, ability_value):
        """
        根据能力值确定能力等级
        
        参数:
            ability_value: 能力估计值（通常在-3到3之间）
            
        返回:
            str: 能力等级描述
        """
        if ability_value >= 1.5:
            return '优秀'
        elif ability_value >= 0.5:
            return '良好'
        elif ability_value >= -0.5:
            return '中等'
        elif ability_value >= -1.5:
            return '一般'
        else:
            return '需要加强'
    
    def generate_suggestions(self, knowledge_stats, overall_ability):
        """
        生成学习建议
        
        参数:
            knowledge_stats: 知识点统计
            overall_ability: 总体能力值
            
        返回:
            list: 建议列表
        """
        suggestions = []
        
        # 分析薄弱知识点
        weak_points = [
            kp for kp, stats in knowledge_stats.items()
            if stats.get('mastery', 0) < 0.6
        ]
        
        if weak_points:
            suggestions.append({
                'type': 'weak_points',
                'title': '薄弱知识点',
                'content': f'建议重点复习以下知识点：{", ".join(weak_points[:5])}',
                'priority': 'high'
            })
        
        # 根据能力水平给出总体建议
        if overall_ability < -0.5:
            suggestions.append({
                'type': 'overall',
                'title': '整体建议',
                'content': '您的数学基础需要加强，建议从基础概念和计算能力开始系统复习。',
                'priority': 'high'
            })
        elif overall_ability > 1.0:
            suggestions.append({
                'type': 'overall',
                'title': '整体建议',
                'content': '您的数学能力较强，可以挑战更有难度的题目，注重思维能力的拓展。',
                'priority': 'medium'
            })
        else:
            suggestions.append({
                'type': 'overall',
                'title': '整体建议',
                'content': '您的数学水平处于中等偏上，建议在保持现有水平的基础上，重点突破薄弱环节。',
                'priority': 'medium'
            })
        
        return suggestions

