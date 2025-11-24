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
    
    def calculate_scaled_score(self, theta):
        """
        计算标准分数（Scaled Score）
        将 IRT 能力值（theta，-3 到 3）转换为 0-1000 的标准分数
        
        参数:
            theta: IRT 能力值
            
        返回:
            int: 标准分数（0-1000）
        """
        # 将 theta 从 [-3, 3] 映射到 [0, 1000]
        scaled = 500 + (theta * 100)
        return max(0, min(1000, int(round(scaled))))
    
    def calculate_grade_equivalent(self, theta):
        """
        计算年级等值分数（Grade Equivalent, GE）
        表示学生的能力相当于哪个年级的水平
        
        参数:
            theta: IRT 能力值
            
        返回:
            float: 年级等值分数（如 7.5 表示七年级下学期水平）
        """
        # 基于能力值映射到年级
        # 七年级上：theta = -1.5 到 -0.5，GE = 7.0 - 7.5
        # 七年级下：theta = -0.5 到 0.0，GE = 7.5 - 8.0
        # 八年级上：theta = 0.0 到 0.5，GE = 8.0 - 8.5
        # 八年级下：theta = 0.5 到 1.0，GE = 8.5 - 9.0
        # 九年级上：theta = 1.0 到 1.5，GE = 9.0 - 9.5
        # 九年级下：theta = 1.5 到 3.0，GE = 9.5 - 10.0+
        
        if theta < -1.5:
            # 低于七年级上
            ge = 6.5 + (theta + 3) * 0.5 / 1.5
        elif theta < -0.5:
            # 七年级上
            ge = 7.0 + (theta + 1.5) * 0.5 / 1.0
        elif theta < 0.0:
            # 七年级下
            ge = 7.5 + (theta + 0.5) * 0.5 / 0.5
        elif theta < 0.5:
            # 八年级上
            ge = 8.0 + theta * 0.5 / 0.5
        elif theta < 1.0:
            # 八年级下
            ge = 8.5 + (theta - 0.5) * 0.5 / 0.5
        elif theta < 1.5:
            # 九年级上
            ge = 9.0 + (theta - 1.0) * 0.5 / 0.5
        else:
            # 九年级下及以上
            ge = 9.5 + min((theta - 1.5) * 0.5 / 1.5, 1.0)
        
        return round(ge, 1)
    
    def calculate_zpd(self, theta):
        """
        计算最近发展区（Zone of Proximal Development, ZPD）
        学生能够通过努力掌握的难度范围
        
        参数:
            theta: IRT 能力值
            
        返回:
            dict: {'lower': 下界, 'upper': 上界, 'recommended': 推荐难度范围}
        """
        # ZPD 下界：当前能力 - 0.5（稍低于当前水平，用于巩固）
        lower_bound = theta - 0.5
        # ZPD 上界：当前能力 + 1.0（挑战性题目）
        upper_bound = theta + 1.0
        
        return {
            'lower': round(lower_bound, 2),
            'upper': round(upper_bound, 2),
            'recommended_range': f'{round(lower_bound, 1)} ~ {round(upper_bound, 1)}'
        }
    
    def predict_future_ability(self, current_theta, time_horizon_months=3):
        """
        预测未来能力值（Predictive Analytics）
        基于当前能力和预期成长速度预测未来能力
        
        参数:
            current_theta: 当前能力值
            time_horizon_months: 预测时间范围（月）
            
        返回:
            dict: {'predicted_theta': 预测能力值, 'predicted_scaled_score': 预测标准分数, 
                   'growth_rate': 预期成长速度, 'confidence': 置信度}
        """
        # 基于经验数据：平均每月成长 0.1-0.2 个 theta 单位
        # 能力值越高，成长速度可能稍慢
        if current_theta < 0:
            monthly_growth = 0.15  # 基础阶段成长较快
        elif current_theta < 1.0:
            monthly_growth = 0.12  # 中等水平
        else:
            monthly_growth = 0.10  # 高水平成长较慢
        
        predicted_theta = current_theta + monthly_growth * time_horizon_months
        predicted_theta = min(predicted_theta, 3.0)  # 限制上限
        
        # 置信度：基于当前能力值的稳定性
        # 能力值越接近0（中等），置信度越高
        confidence = 0.7 + 0.2 * (1 - abs(current_theta) / 3)
        
        return {
            'predicted_theta': round(predicted_theta, 2),
            'predicted_scaled_score': self.calculate_scaled_score(predicted_theta),
            'growth_rate': round(monthly_growth, 2),
            'confidence': round(confidence, 2),
            'time_horizon_months': time_horizon_months
        }
    
    def diagnose_skill_levels(self, session_id):
        """
        技能诊断（Skill Diagnosis）
        深入分析每个知识点的子技能掌握情况
        
        参数:
            session_id: 测试会话ID
            
        返回:
            dict: {知识点: {'subskills': [...], 'error_patterns': [...]}}
        """
        session = TestSession.query.get(session_id)
        responses = session.responses if session else []
        
        # 知识点子技能映射
        subskill_mapping = {
            '有理数': ['正负数运算', '绝对值', '数轴', '混合运算'],
            '整式': ['代数式', '合并同类项', '因式分解', '公式应用'],
            '分式': ['约分', '通分', '分式运算', '分式方程'],
            '二次根式': ['化简', '运算', '有理化', '应用'],
            '一元一次方程': ['移项', '去括号', '去分母', '实际应用'],
            '二元一次方程组': ['代入法', '加减法', '实际应用'],
            '一元二次方程': ['因式分解法', '配方法', '公式法', '判别式'],
            '不等式': ['基本性质', '解不等式', '不等式组', '实际应用'],
            '函数概念': ['函数定义', '函数表示', '函数值', '自变量范围'],
            '一次函数': ['图像', '性质', '应用', '交点'],
            '二次函数': ['图像', '顶点', '对称轴', '最值', '零点'],
            '反比例函数': ['图像', '性质', '应用'],
            '三角形': ['内角和', '全等', '相似', '勾股定理', '面积'],
            '四边形': ['平行四边形', '矩形', '菱形', '正方形', '梯形'],
            '圆': ['周长', '面积', '圆心角', '圆周角', '弦'],
            '平面几何': ['平行线', '角', '对顶角', '同位角'],
            '立体几何': ['体积', '表面积', '侧面积'],
            '统计': ['平均数', '中位数', '众数', '方差', '四分位数', '箱线图', '抽样'],
            '概率': ['概率计算', '等可能事件', '复合事件']
        }
        
        # 错误类型分析
        error_patterns = {
            '计算错误': 0,
            '概念理解错误': 0,
            '方法选择错误': 0,
            '审题错误': 0,
            '公式应用错误': 0
        }
        
        knowledge_diagnosis = {}
        
        for response in responses:
            question = response.question
            if not response.is_correct:
                # 分析错误类型（简化版，实际可以通过题目内容分析）
                # 这里根据题目难度和知识点推断可能的错误类型
                if question.difficulty < 0:
                    error_patterns['计算错误'] += 1
                elif question.difficulty < 0.5:
                    error_patterns['概念理解错误'] += 1
                else:
                    error_patterns['方法选择错误'] += 1
            
            for kp in question.knowledge_points:
                if kp not in knowledge_diagnosis:
                    knowledge_diagnosis[kp] = {
                        'subskills': {},
                        'total_questions': 0,
                        'correct_questions': 0
                    }
                
                knowledge_diagnosis[kp]['total_questions'] += 1
                if response.is_correct:
                    knowledge_diagnosis[kp]['correct_questions'] += 1
                
                # 分析子技能（简化版，实际需要更细致的分析）
                if kp in subskill_mapping:
                    for subskill in subskill_mapping[kp]:
                        if subskill not in knowledge_diagnosis[kp]['subskills']:
                            knowledge_diagnosis[kp]['subskills'][subskill] = {
                                'total': 0,
                                'correct': 0
                            }
                        knowledge_diagnosis[kp]['subskills'][subskill]['total'] += 1
                        if response.is_correct:
                            knowledge_diagnosis[kp]['subskills'][subskill]['correct'] += 1
        
        # 计算子技能掌握度
        for kp, diagnosis in knowledge_diagnosis.items():
            for subskill, stats in diagnosis['subskills'].items():
                if stats['total'] > 0:
                    stats['mastery'] = stats['correct'] / stats['total']
                    stats['mastery_percent'] = round(stats['mastery'] * 100, 1)
        
        return {
            'knowledge_diagnosis': knowledge_diagnosis,
            'error_patterns': error_patterns,
            'most_common_error': max(error_patterns.items(), key=lambda x: x[1])[0] if error_patterns else None
        }
    
    def recommend_testing_frequency(self, current_ability, last_test_date=None):
        """
        推荐测试频率
        
        参数:
            current_ability: 当前能力值
            last_test_date: 上次测试日期（可选）
            
        返回:
            dict: {'frequency': 推荐频率, 'next_test_date': 建议下次测试日期, 'reason': 原因}
        """
        # 根据能力值和成长阶段推荐
        if current_ability < -0.5:
            # 基础薄弱，建议频繁测试追踪进步
            frequency = '每2周一次'
            reason = '您的数学基础需要加强，建议每2周测试一次，及时追踪进步情况，发现问题及时调整学习计划。'
        elif current_ability < 0.5:
            # 中等水平，建议定期测试
            frequency = '每月一次'
            reason = '您的数学水平处于中等，建议每月测试一次，保持对学习进度的追踪，及时发现薄弱环节。'
        elif current_ability < 1.5:
            # 良好水平
            frequency = '每6-8周一次'
            reason = '您的数学能力良好，建议每6-8周测试一次，追踪长期进步趋势。'
        else:
            # 优秀水平
            frequency = '每2-3个月一次'
            reason = '您的数学能力优秀，建议每2-3个月测试一次，保持对整体水平的了解。'
        
        return {
            'frequency': frequency,
            'reason': reason,
            'suggestion': '建议您记录每次测试的分数，绘制成长趋势图，这样可以更直观地看到自己的进步。'
        }
    
    def recommend_goals(self, current_theta, zpd):
        """
        推荐学习目标
        
        参数:
            current_theta: 当前能力值
            zpd: 最近发展区
            
        返回:
            dict: {'short_term': 短期目标, 'long_term': 长期目标, 'target_theta': 目标能力值}
        """
        # 计算预期成长速度
        if current_theta < 0:
            monthly_growth = 0.15
        elif current_theta < 1.0:
            monthly_growth = 0.12
        else:
            monthly_growth = 0.10
        
        # 短期目标（1-2个月）：较小的提升
        # 1.5个月平均，约提升 0.2-0.3
        short_term_theta = min(current_theta + monthly_growth * 1.5, 3.0)
        short_term_ge = self.calculate_grade_equivalent(short_term_theta)
        
        # 长期目标（3-6个月）：较大的提升
        # 4.5个月平均，约提升 0.4-0.9，或达到 ZPD 上界的 90%
        long_term_growth = monthly_growth * 4.5
        long_term_theta = min(
            max(current_theta + long_term_growth, zpd['upper'] * 0.9),
            3.0
        )
        long_term_ge = self.calculate_grade_equivalent(long_term_theta)
        
        return {
            'short_term': {
                'theta': round(short_term_theta, 2),
                'scaled_score': self.calculate_scaled_score(short_term_theta),
                'ge': short_term_ge,
                'description': f'短期目标（1-2个月）：达到能力值 {round(short_term_theta, 2)}，相当于 {short_term_ge} 年级水平'
            },
            'long_term': {
                'theta': round(long_term_theta, 2),
                'scaled_score': self.calculate_scaled_score(long_term_theta),
                'ge': long_term_ge,
                'description': f'长期目标（3-6个月）：达到能力值 {round(long_term_theta, 2)}，相当于 {long_term_ge} 年级水平'
            }
        }
    
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

