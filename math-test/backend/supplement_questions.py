"""
补充题库 - 补充遗漏知识点，扩充到100道题
目标：补充函数概念、平面几何等缺失知识点，并补充题目较少的知识点
"""
from models import db, Question, KnowledgePoint

# 补充题目数据
supplement_questions = [
    # ========== 函数 - 函数概念 (完全缺失，补充5道) ==========
    {
        'content': '下列关系中，$y$是$x$的函数的是？',
        'options': [
            '$y = x^2$',
            '$x^2 + y^2 = 1$',
            '$|y| = x$',
            '$y^2 = x$'
        ],
        'correct_answer': 0,
        'difficulty': 0.3,
        'discrimination': 1.0,
        'knowledge_points': ['函数概念'],
        'category': '函数',
        'explanation': '函数要求对于每个$x$值，都有唯一的$y$值与之对应。$y = x^2$满足这个条件，是函数。'
    },
    {
        'content': '函数$f(x) = 2x + 1$，当$x = 3$时，$f(3) = ?$',
        'options': ['7', '6', '5', '8'],
        'correct_answer': 0,
        'difficulty': -0.5,
        'discrimination': 0.9,
        'knowledge_points': ['函数概念'],
        'category': '函数',
        'explanation': '将$x = 3$代入函数：$f(3) = 2 \\times 3 + 1 = 7$。'
    },
    {
        'content': '函数$y = \\frac{1}{x-1}$的自变量$x$的取值范围是？',
        'options': ['$x \\neq 1$', '$x > 1$', '$x < 1$', '$x \\neq 0$'],
        'correct_answer': 0,
        'difficulty': 0.5,
        'discrimination': 1.1,
        'knowledge_points': ['函数概念'],
        'category': '函数',
        'explanation': '分式的分母不能为0，所以$x - 1 \\neq 0$，即$x \\neq 1$。'
    },
    {
        'content': '下列哪个是函数的表示方法？',
        'options': [
            '解析式、图像、表格',
            '只有解析式',
            '只有图像',
            '只有表格'
        ],
        'correct_answer': 0,
        'difficulty': -0.2,
        'discrimination': 0.8,
        'knowledge_points': ['函数概念'],
        'category': '函数',
        'explanation': '函数有三种表示方法：解析式法、图像法、列表法（表格法）。'
    },
    {
        'content': '函数$f(x) = x^2 - 4$，当$f(x) = 0$时，$x = ?$',
        'options': ['$x = \\pm 2$', '$x = 2$', '$x = -2$', '$x = 0$'],
        'correct_answer': 0,
        'difficulty': 0.4,
        'discrimination': 1.0,
        'knowledge_points': ['函数概念'],
        'category': '函数',
        'explanation': '令$f(x) = 0$：$x^2 - 4 = 0$，所以$x^2 = 4$，$x = \\pm 2$。'
    },
    
    # ========== 图形的认识 - 平面几何 (完全缺失，补充3道) ==========
    {
        'content': '下列说法正确的是？',
        'options': [
            '两点确定一条直线',
            '两条直线一定相交',
            '线段可以无限延长',
            '射线没有端点'
        ],
        'correct_answer': 0,
        'difficulty': -0.8,
        'discrimination': 0.9,
        'knowledge_points': ['平面几何'],
        'category': '图形的认识',
        'explanation': '基本事实：两点确定一条直线。平行线不相交，线段有端点，射线有一个端点。'
    },
    {
        'content': '在同一平面内，如果两条直线都垂直于同一条直线，则这两条直线？',
        'options': ['平行', '相交', '重合', '无法确定'],
        'correct_answer': 0,
        'difficulty': 0.2,
        'discrimination': 1.0,
        'knowledge_points': ['平面几何'],
        'category': '图形的认识',
        'explanation': '在同一平面内，如果两条直线都垂直于同一条直线，则这两条直线平行。'
    },
    {
        'content': '下列说法错误的是？',
        'options': [
            '角的大小与边的长短无关',
            '角的大小与角的两边张开程度有关',
            '角的大小可以用量角器测量',
            '角的大小与角的顶点位置有关'
        ],
        'correct_answer': 3,
        'difficulty': 0.0,
        'discrimination': 0.9,
        'knowledge_points': ['平面几何'],
        'category': '图形的认识',
        'explanation': '角的大小只与角的两边张开程度有关，与边的长短和顶点位置无关。'
    },
    
    # ========== 数与式 - 实数 (只有2道，补充3道) ==========
    {
        'content': '下列数中，是无理数的是？',
        'options': ['$\\sqrt{9}$', '$\\sqrt{2}$', '$\\frac{1}{3}$', '$0.5$'],
        'correct_answer': 1,
        'difficulty': 0.3,
        'discrimination': 1.0,
        'knowledge_points': ['实数'],
        'category': '数与式',
        'explanation': '$\\sqrt{9} = 3$是有理数，$\\frac{1}{3}$和$0.5$是有理数，只有$\\sqrt{2}$是无理数。'
    },
    {
        'content': '实数$\\sqrt{3}$和$\\sqrt{5}$之间有多少个整数？',
        'options': ['0个', '1个', '2个', '3个'],
        'correct_answer': 1,
        'difficulty': 0.6,
        'discrimination': 1.1,
        'knowledge_points': ['实数'],
        'category': '数与式',
        'explanation': '$\\sqrt{3} \\approx 1.73$，$\\sqrt{5} \\approx 2.24$，所以它们之间有整数2，共1个。'
    },
    {
        'content': '若$|a| = 3$，则$a = ?$',
        'options': ['$3$', '$-3$', '$\\pm 3$', '$0$'],
        'correct_answer': 2,
        'difficulty': -0.3,
        'discrimination': 0.9,
        'knowledge_points': ['实数'],
        'category': '数与式',
        'explanation': '绝对值等于3的数有两个：$3$和$-3$，所以$a = \\pm 3$。'
    },
    
    # ========== 数与式 - 分式 (只有4道，补充2道) ==========
    {
        'content': '计算：$\\frac{x^2 + 2x + 1}{x + 1} = ?$（$x \\neq -1$）',
        'options': ['$x + 1$', '$x - 1$', '$x^2 + 1$', '$x$'],
        'correct_answer': 0,
        'difficulty': 0.4,
        'discrimination': 1.0,
        'knowledge_points': ['分式'],
        'category': '数与式',
        'explanation': '$\\frac{x^2 + 2x + 1}{x + 1} = \\frac{(x+1)^2}{x+1} = x + 1$（$x \\neq -1$）。'
    },
    {
        'content': '分式$\\frac{x-2}{x^2-4}$在什么条件下有意义？',
        'options': ['$x \\neq \\pm 2$', '$x \\neq 2$', '$x \\neq -2$', '$x \\neq 0$'],
        'correct_answer': 0,
        'difficulty': 0.5,
        'discrimination': 1.1,
        'knowledge_points': ['分式'],
        'category': '数与式',
        'explanation': '分母$x^2 - 4 = (x+2)(x-2) \\neq 0$，所以$x \\neq 2$且$x \\neq -2$，即$x \\neq \\pm 2$。'
    },
    
    # ========== 数与式 - 二次根式 (只有4道，补充2道) ==========
    {
        'content': '计算：$\\sqrt{18} - \\sqrt{8} = ?$',
        'options': ['$\\sqrt{2}$', '$\\sqrt{10}$', '$2\\sqrt{2}$', '$\\sqrt{26}$'],
        'correct_answer': 0,
        'difficulty': 0.7,
        'discrimination': 1.2,
        'knowledge_points': ['二次根式'],
        'category': '数与式',
        'explanation': '$\\sqrt{18} = 3\\sqrt{2}$，$\\sqrt{8} = 2\\sqrt{2}$，所以$\\sqrt{18} - \\sqrt{8} = 3\\sqrt{2} - 2\\sqrt{2} = \\sqrt{2}$。'
    },
    {
        'content': '化简：$\\sqrt{50} = ?$',
        'options': ['$5\\sqrt{2}$', '$10\\sqrt{5}$', '$25\\sqrt{2}$', '$5\\sqrt{10}$'],
        'correct_answer': 0,
        'difficulty': 0.5,
        'discrimination': 1.0,
        'knowledge_points': ['二次根式'],
        'category': '数与式',
        'explanation': '$\\sqrt{50} = \\sqrt{25 \\times 2} = 5\\sqrt{2}$。'
    },
    
    # ========== 方程与不等式 - 不等式 (只有4道，补充2道) ==========
    {
        'content': '解不等式：$3x - 2 \\geq 4$',
        'options': ['$x \\geq 2$', '$x \\leq 2$', '$x \\geq 3$', '$x \\leq 3$'],
        'correct_answer': 0,
        'difficulty': 0.3,
        'discrimination': 1.0,
        'knowledge_points': ['不等式'],
        'category': '方程与不等式',
        'explanation': '$3x - 2 \\geq 4$，移项得$3x \\geq 6$，所以$x \\geq 2$。'
    },
    {
        'content': '不等式组$\\begin{cases} x > 1 \\\\ x < 3 \\end{cases}$的解集是？',
        'options': ['$1 < x < 3$', '$x > 1$或$x < 3$', '$x > 3$', '$x < 1$'],
        'correct_answer': 0,
        'difficulty': 0.5,
        'discrimination': 1.1,
        'knowledge_points': ['不等式'],
        'category': '方程与不等式',
        'explanation': '求两个不等式的交集：同时满足$x > 1$和$x < 3$，即$1 < x < 3$。'
    },
    
    # ========== 函数 - 反比例函数 (只有4道，补充1道) ==========
    {
        'content': '反比例函数$y = \\frac{k}{x}$（$k \\neq 0$）的图像经过点$(2, 6)$，则$k = ?$',
        'options': ['12', '8', '4', '3'],
        'correct_answer': 0,
        'difficulty': 0.3,
        'discrimination': 1.0,
        'knowledge_points': ['反比例函数'],
        'category': '函数',
        'explanation': '将点$(2, 6)$代入：$6 = \\frac{k}{2}$，所以$k = 12$。'
    },
]

def load_supplement_questions():
    """加载补充题目到数据库"""
    from app import app
    
    with app.app_context():
        added_count = 0
        skipped_count = 0
        
        for q_data in supplement_questions:
            # 检查是否已存在相同内容的题目
            existing = Question.query.filter_by(content=q_data['content']).first()
            if existing:
                skipped_count += 1
                continue
            
            # 创建新题目
            question = Question(**q_data)
            db.session.add(question)
            added_count += 1
        
        db.session.commit()
        
        print(f"补充题目完成：新增 {added_count} 道，跳过重复 {skipped_count} 道")
        return added_count, skipped_count

if __name__ == '__main__':
    load_supplement_questions()

