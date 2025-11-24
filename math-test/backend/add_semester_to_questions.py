"""
为所有题目添加学期标注
更新数据库中所有现有题目的学期字段
"""
from app import app
from models import db, Question
from semester_mapping import get_semester_from_knowledge_points

def add_semester_to_all_questions():
    """为所有题目添加学期标注"""
    with app.app_context():
        questions = Question.query.all()
        updated_count = 0
        semester_stats = {}
        
        print("=" * 60)
        print("📚 为题目添加学期标注")
        print("=" * 60)
        print()
        
        for q in questions:
            semester = get_semester_from_knowledge_points(q.knowledge_points, q.category)
            if semester:
                q.semester = semester
                updated_count += 1
                semester_stats[semester] = semester_stats.get(semester, 0) + 1
            elif not q.semester:
                # 如果无法确定学期，标记为"未分类"
                q.semester = "未分类"
                updated_count += 1
                semester_stats["未分类"] = semester_stats.get("未分类", 0) + 1
        
        db.session.commit()
        
        print(f"✅ 成功更新 {updated_count} 道题目的学期标注")
        print()
        print("按学期统计:")
        print("-" * 60)
        for semester in sorted(semester_stats.keys()):
            print(f"  {semester}: {semester_stats[semester]} 道")
        print()
        print("=" * 60)
        
        return updated_count, semester_stats

if __name__ == '__main__':
    add_semester_to_all_questions()

