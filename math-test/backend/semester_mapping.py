"""
学期分配映射规则
根据知识点判断题目属于哪个学期
"""
from typing import Optional

# 知识点到学期的映射（基于中国初中数学课程标准）
KNOWLEDGE_POINT_TO_SEMESTER = {
    # 七年级上
    '有理数': '七年级上',
    '整式': '七年级上',
    '一元一次方程': '七年级上',
    # 注意：部分基础平面几何题目也会在七年级上（通过手动指定semester字段）
    
    # 七年级下
    '实数': '七年级下',
    '分式': '七年级下',
    '二元一次方程组': '七年级下',
    '不等式': '七年级下',
    '平面几何': '七年级下',  # 默认在七年级下，但基础题目可以在七年级上
    
    # 八年级上
    '二次根式': '八年级上',
    # 注意：2024年改版教材中，函数概念和一次函数已移至八年级下
    
    # 八年级下
    '函数概念': '八年级下',  # 2024年改版：从八年级上移至八年级下
    '一次函数': '八年级下',  # 2024年改版：从八年级上移至八年级下
    '反比例函数': '八年级下',
    '三角形': '八年级下',
    '四边形': '八年级下',
    
    # 九年级上
    '一元二次方程': '九年级上',
    '二次函数': '九年级上',
    
    # 九年级下
    '圆': '九年级下',
    '统计': '九年级下',
    '概率': '九年级下',
    '立体几何': '九年级下',  # 2024年新增：圆柱与圆锥
    '投影与透视': '九年级下',  # 2024年新增
}

def get_semester_from_knowledge_points(knowledge_points: list, category: str = None) -> Optional[str]:
    """
    根据知识点列表判断题目属于哪个学期
    
    参数:
        knowledge_points: 知识点列表
        category: 题目分类（辅助判断）
        
    返回:
        学期字符串，如'七年级上'，如果无法确定则返回None
    """
    if not knowledge_points:
        return None
    
    # 优先匹配第一个知识点
    for kp in knowledge_points:
        if kp in KNOWLEDGE_POINT_TO_SEMESTER:
            return KNOWLEDGE_POINT_TO_SEMESTER[kp]
    
    # 如果知识点不在映射中，根据分类推断
    if category:
        category_semester_map = {
            '数与式': '七年级上',  # 默认为七年级上，但具体看知识点
            '方程与不等式': '七年级下',
            '函数': '八年级下',  # 2024年改版：函数相关内容移至八年级下
            '图形的性质': '八年级下',
            '图形的认识': '七年级下',  # 默认七年级下，但基础题目可能在七年级上
            '统计与概率': '九年级下',
        }
        return category_semester_map.get(category)
    
    return None

def update_question_semesters():
    """更新所有题目的学期标注"""
    from app import app
    from models import db, Question
    
    with app.app_context():
        questions = Question.query.all()
        updated_count = 0
        
        for q in questions:
            semester = get_semester_from_knowledge_points(q.knowledge_points, q.category)
            if semester and q.semester != semester:
                q.semester = semester
                updated_count += 1
        
        db.session.commit()
        print(f"成功更新 {updated_count} 道题目的学期标注")
        return updated_count

if __name__ == '__main__':
    update_question_semesters()

