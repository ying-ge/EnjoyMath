"""
完整导入所有题目（包括初始、扩充和补充题目）
"""
from app import app
from models import db, Question, KnowledgePoint
from init_questions import load_questions as load_initial_questions
from expand_questions import load_expanded_questions
from supplement_questions import load_supplement_questions
from semester_mapping import get_semester_from_knowledge_points

def import_all_questions():
    """导入所有题目（初始 + 扩充 + 补充）"""
    with app.app_context():
        print("=" * 60)
        print("📚 开始导入所有题目")
        print("=" * 60)
        print()
        
        # 1. 导入初始题目
        print("1. 导入初始题目...")
        load_initial_questions()
        print()
        
        # 2. 导入扩充题目
        print("2. 导入扩充题目...")
        load_expanded_questions()
        print()
        
        # 3. 导入补充题目
        print("3. 导入补充题目...")
        load_supplement_questions()
        print()
        
        # 4. 为所有题目添加学期标注（如果缺失）
        print("4. 检查学期标注...")
        questions = Question.query.filter(Question.semester == None).all()
        updated = 0
        for q in questions:
            semester = get_semester_from_knowledge_points(q.knowledge_points, q.category)
            if semester:
                q.semester = semester
                updated += 1
        
        if updated > 0:
            db.session.commit()
            print(f"   为 {updated} 道题目添加了学期标注")
        else:
            print("   所有题目都已标注学期")
        print()
        
        # 5. 统计结果
        total_questions = Question.query.count()
        
        print("=" * 60)
        print("✅ 导入完成！")
        print("=" * 60)
        print(f"📊 题库总数: {total_questions} 道")
        print()
        
        # 按知识点统计
        all_questions = Question.query.all()
        knowledge_point_count = {}
        for q in all_questions:
            for kp in q.knowledge_points:
                knowledge_point_count[kp] = knowledge_point_count.get(kp, 0) + 1
        
        print("知识点覆盖:")
        print("-" * 60)
        for kp, count in sorted(knowledge_point_count.items(), key=lambda x: -x[1]):
            status = '✅' if count >= 3 else '⚠️' if count > 0 else '❌'
            print(f"  {status} {kp}: {count} 道")
        
        print()
        print("=" * 60)

if __name__ == '__main__':
    import_all_questions()

