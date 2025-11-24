"""
中国初中生数学水平测试系统 - Flask后端主应用
"""
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import os

from models import db, Question, TestSession, TestResponse, KnowledgePoint
from adaptive import AdaptiveTestEngine

app = Flask(__name__)

# 配置
from config import Config
app.config.from_object(Config)

# 初始化
db.init_app(app)
CORS(app)  # 允许跨域请求

# 初始化自适应测试引擎
test_engine = AdaptiveTestEngine()


@app.route('/api/health', methods=['GET'])
def health_check():
    """健康检查"""
    return jsonify({'status': 'ok', 'message': '系统运行正常'})


@app.route('/api/test/start', methods=['POST'])
def start_test():
    """开始新的测试会话"""
    data = request.get_json() or {}
    student_id = data.get('student_id', 'anonymous')
    
    # 创建测试会话
    session = TestSession(
        student_id=student_id,
        current_ability=0.0,  # 初始能力值为0（中等水平）
        total_questions=0,
        status='in_progress'
    )
    db.session.add(session)
    db.session.commit()
    
    # 获取第一题（中等难度）
    first_question = test_engine.get_next_question(session.id, 0.0)
    
    return jsonify({
        'session_id': session.id,
        'current_ability': session.current_ability,
        'question': first_question.to_dict() if first_question else None,
        'question_number': 1,
        'total_answered': 0
    })


@app.route('/api/test/<int:session_id>/submit', methods=['POST'])
def submit_answer(session_id):
    """提交答案"""
    data = request.get_json()
    question_id = data.get('question_id')
    answer = data.get('answer')  # 答案索引
    response_time = data.get('response_time', 0)  # 答题时间（秒）
    
    # 获取会话和题目
    session = TestSession.query.get_or_404(session_id)
    question = Question.query.get_or_404(question_id)
    
    # 判断答案是否正确
    is_correct = (answer == question.correct_answer)
    
    # 获取答题前的能力估计
    ability_before = session.current_ability
    
    # 更新能力估计
    session.total_questions += 1
    ability_after = test_engine.update_ability(
        session_id,
        question_id,
        is_correct,
        ability_before
    )
    session.current_ability = ability_after
    
    # 保存答题记录
    response = TestResponse(
        session_id=session_id,
        question_id=question_id,
        answer=answer,
        is_correct=is_correct,
        response_time=response_time,
        ability_before=ability_before,
        ability_after=ability_after
    )
    db.session.add(response)
    db.session.commit()
    
    # 判断是否继续测试（通常15-25题可以较准确评估）
    should_continue = session.total_questions < 20
    
    # 如果继续，获取下一题
    next_question = None
    if should_continue:
        next_question = test_engine.get_next_question(session_id, ability_after)
    
    # 如果测试结束，更新会话状态
    if not should_continue:
        session.status = 'completed'
        session.completed_at = datetime.utcnow()
        db.session.commit()
    
    return jsonify({
        'is_correct': is_correct,
        'correct_answer': question.correct_answer,
        'explanation': question.explanation,
        'current_ability': ability_after,
        'ability_change': ability_after - ability_before,
        'question_number': session.total_questions,
        'should_continue': should_continue,
        'next_question': next_question.to_dict() if next_question else None,
        'status': session.status
    })


@app.route('/api/test/<int:session_id>/result', methods=['GET'])
def get_test_result(session_id):
    """获取测试结果和详细报告"""
    session = TestSession.query.get_or_404(session_id)
    
    # 获取所有答题记录
    responses = TestResponse.query.filter_by(session_id=session_id).all()
    
    # 统计知识点掌握情况
    knowledge_stats = test_engine.analyze_knowledge_points(session_id)
    
    # 统计学期表现
    semester_stats = test_engine.analyze_semester_performance(session_id)
    
    # 计算能力等级
    ability_level = test_engine.get_ability_level(session.current_ability)
    
    # 计算标准分数（Scaled Score）
    scaled_score = test_engine.calculate_scaled_score(session.current_ability)
    
    # 计算年级等值分数（GE）
    grade_equivalent = test_engine.calculate_grade_equivalent(session.current_ability)
    
    # 计算最近发展区（ZPD）
    zpd = test_engine.calculate_zpd(session.current_ability)
    
    # 预测性分析
    prediction = test_engine.predict_future_ability(session.current_ability, time_horizon_months=3)
    
    # 技能诊断
    skill_diagnosis = test_engine.diagnose_skill_levels(session_id)
    
    # 推荐测试频率
    testing_frequency = test_engine.recommend_testing_frequency(session.current_ability)
    
    # 推荐目标
    goals = test_engine.recommend_goals(session.current_ability, zpd)
    
    # 生成学习建议
    suggestions = test_engine.generate_suggestions(knowledge_stats, session.current_ability)
    
    return jsonify({
        'session': session.to_dict(),
        'final_ability': session.current_ability,
        'ability_level': ability_level,
        'scaled_score': scaled_score,  # 新增：标准分数
        'grade_equivalent': grade_equivalent,  # 新增：年级等值分数
        'zpd': zpd,  # 新增：最近发展区
        'prediction': prediction,  # 新增：预测性分析
        'skill_diagnosis': skill_diagnosis,  # 新增：技能诊断
        'testing_frequency': testing_frequency,  # 新增：测试频率建议
        'goals': goals,  # 新增：推荐目标
        'total_questions': session.total_questions,
        'correct_count': sum(1 for r in responses if r.is_correct),
        'accuracy': sum(1 for r in responses if r.is_correct) / len(responses) if responses else 0,
        'knowledge_stats': knowledge_stats,
        'semester_stats': semester_stats,
        'suggestions': suggestions,
        'responses': [r.to_dict() for r in responses]
    })


@app.route('/api/questions', methods=['GET'])
def get_questions():
    """获取题目列表（用于管理）"""
    questions = Question.query.all()
    return jsonify([q.to_dict() for q in questions])


@app.route('/api/knowledge-points', methods=['GET'])
def get_knowledge_points():
    """获取所有知识点"""
    points = KnowledgePoint.query.all()
    return jsonify([p.to_dict() for p in points])


@app.route('/api/test/<int:session_id>/status', methods=['GET'])
def get_test_status(session_id):
    """获取测试状态"""
    session = TestSession.query.get_or_404(session_id)
    return jsonify(session.to_dict())


@app.route('/api/test/<int:session_id>/current-question', methods=['GET'])
def get_current_question(session_id):
    """获取当前应该回答的题目"""
    session = TestSession.query.get_or_404(session_id)
    
    if session.status == 'completed':
        return jsonify({'error': '测试已完成'}), 400
    
    # 获取已答题目ID列表
    answered_ids = [r.question_id for r in session.responses]
    
    # 如果还没有题目，返回第一题
    if len(answered_ids) == 0:
        next_question = test_engine.get_next_question(session_id, session.current_ability)
        if next_question:
            return jsonify({
                'question': next_question.to_dict(),
                'question_number': 1,
                'total_answered': 0
            })
    
    # 否则返回None，表示需要先提交上一题的答案
    return jsonify({
        'question': None,
        'question_number': session.total_questions + 1,
        'total_answered': session.total_questions
    })


def init_db():
    """初始化数据库"""
    with app.app_context():
        db.create_all()
        print("数据库初始化完成")
        
        # 如果题库为空，导入示例题目
        if Question.query.count() == 0:
            from init_questions import load_questions
            load_questions()
            print("示例题目导入完成")


if __name__ == '__main__':
    import sys
    
    # 检查是否需要初始化数据库
    if '--init-db' in sys.argv:
        init_db()
        sys.exit(0)
    
    # 初始化数据库
    init_db()
    
    print("=" * 50)
    print("数学水平测试系统 - 后端服务")
    print("=" * 50)
    print("服务地址: http://0.0.0.0:5001")
    print("API文档: http://0.0.0.0:5001/api/health")
    print("=" * 50)
    
    app.run(debug=True, host='0.0.0.0', port=5001)

