"""
学期统计分析脚本
"""
from app import app
from models import db, Question, TestResponse, TestSession

def analyze_semester_performance(session_id):
    """分析测试结果中按学期的表现"""
    with app.app_context():
        session = TestSession.query.get(session_id)
        if not session:
            return None
        
        responses = TestResponse.query.filter_by(session_id=session_id).all()
        
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

def print_all_semester_distribution():
    """打印所有题目的学期分布"""
    with app.app_context():
        questions = Question.query.all()
        semester_count = {}
        
        for q in questions:
            semester = q.semester or '未分类'
            semester_count[semester] = semester_count.get(semester, 0) + 1
        
        print("=" * 60)
        print("📚 题库学期分布")
        print("=" * 60)
        print()
        
        semesters_order = ['七年级上', '七年级下', '八年级上', '八年级下', '九年级上', '九年级下']
        for semester in semesters_order:
            if semester in semester_count:
                print(f"  {semester}: {semester_count[semester]} 道")
        
        if '未分类' in semester_count:
            print(f"  未分类: {semester_count['未分类']} 道")
        
        print()
        print(f"  总计: {sum(semester_count.values())} 道")
        print("=" * 60)

if __name__ == '__main__':
    print_all_semester_distribution()

