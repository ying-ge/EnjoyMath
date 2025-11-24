"""
题库统计和分析脚本
"""
from app import app
from models import db, Question

def print_question_stats():
    """打印题库统计信息"""
    with app.app_context():
        total = Question.query.count()
        
        print("=" * 60)
        print("📊 题库统计信息")
        print("=" * 60)
        print(f"\n总题目数: {total} 道\n")
        
        # 按分类统计
        categories = db.session.query(Question.category).distinct().all()
        print("按分类统计:")
        print("-" * 60)
        for (category,) in categories:
            count = Question.query.filter_by(category=category).count()
            print(f"  {category}: {count} 道")
        
        # 按难度分布
        print(f"\n按难度分布:")
        print("-" * 60)
        difficulties = [
            ('简单 (<-1)', Question.query.filter(Question.difficulty < -1).count()),
            ('较易 (-1~0)', Question.query.filter(Question.difficulty >= -1, Question.difficulty < 0).count()),
            ('中等 (0~1)', Question.query.filter(Question.difficulty >= 0, Question.difficulty < 1).count()),
            ('较难 (1~2)', Question.query.filter(Question.difficulty >= 1, Question.difficulty < 2).count()),
            ('困难 (>=2)', Question.query.filter(Question.difficulty >= 2).count()),
        ]
        for label, count in difficulties:
            print(f"  {label}: {count} 道")
        
        # 知识点覆盖
        print(f"\n知识点覆盖:")
        print("-" * 60)
        all_questions = Question.query.all()
        knowledge_point_count = {}
        for q in all_questions:
            for kp in q.knowledge_points:
                knowledge_point_count[kp] = knowledge_point_count.get(kp, 0) + 1
        
        for kp, count in sorted(knowledge_point_count.items(), key=lambda x: -x[1]):
            print(f"  {kp}: {count} 道")
        
        print("\n" + "=" * 60)
        print(f"✅ 题库充足，可支持 {total // 20} 次完整测试不重复")
        print("=" * 60)

if __name__ == '__main__':
    print_question_stats()

