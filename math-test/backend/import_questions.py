"""
导入扩充题库的独立脚本
"""
from app import app
from models import db, Question
from expand_questions import additional_questions

def import_additional_questions():
    """导入扩充题目"""
    with app.app_context():
        added_count = 0
        skipped_count = 0
        
        for q_data in additional_questions:
            existing = Question.query.filter_by(content=q_data['content']).first()
            if not existing:
                question = Question(**q_data)
                db.session.add(question)
                added_count += 1
            else:
                skipped_count += 1
        
        db.session.commit()
        total = Question.query.count()
        
        print(f"=" * 50)
        print(f"题库扩充完成！")
        print(f"新增题目: {added_count} 道")
        print(f"跳过重复: {skipped_count} 道")
        print(f"题库总数: {total} 道")
        print(f"=" * 50)
        
        return added_count, total

if __name__ == '__main__':
    import_additional_questions()

