"""
更新题目数据文件，为题目添加学期字段
这个脚本用于更新init_questions.py和expand_questions.py中的题目数据
"""
from semester_mapping import get_semester_from_knowledge_points

def get_semester_for_question(knowledge_points, category):
    """获取题目的学期"""
    return get_semester_from_knowledge_points(knowledge_points, category) or "未分类"

# 示例：为题目数据添加学期
example_question = {
    'content': '计算：$(-3) + 5 = ?$',
    'options': ['2', '-2', '8', '-8'],
    'correct_answer': 0,
    'difficulty': -1.0,
    'discrimination': 0.8,
    'knowledge_points': ['有理数'],
    'category': '数与式',
    'semester': '七年级上',  # 新添加的字段
    'explanation': '...'
}

print("✅ 学期映射函数已创建")
print("请在添加新题目时，使用 semester_mapping.get_semester_from_knowledge_points() 自动分配学期")

