"""
初始化题库数据
"""
from models import db, Question, KnowledgePoint


def load_questions():
    """加载示例题目到数据库"""
    
    # 先创建知识点
    knowledge_points_data = [
        # 数与式
        {'name': '有理数', 'category': '数与式', 'description': '正数、负数、零的概念及运算'},
        {'name': '实数', 'category': '数与式', 'description': '实数概念及运算'},
        {'name': '整式', 'category': '数与式', 'description': '整式的概念、运算'},
        {'name': '分式', 'category': '数与式', 'description': '分式的概念、运算'},
        {'name': '二次根式', 'category': '数与式', 'description': '二次根式的概念、化简'},
        
        # 方程与不等式
        {'name': '一元一次方程', 'category': '方程与不等式', 'description': '一元一次方程的解法'},
        {'name': '二元一次方程组', 'category': '方程与不等式', 'description': '二元一次方程组的解法'},
        {'name': '一元二次方程', 'category': '方程与不等式', 'description': '一元二次方程的解法'},
        {'name': '不等式', 'category': '方程与不等式', 'description': '不等式的性质及解法'},
        
        # 函数
        {'name': '函数概念', 'category': '函数', 'description': '函数的概念及表示'},
        {'name': '一次函数', 'category': '函数', 'description': '一次函数的图像和性质'},
        {'name': '二次函数', 'category': '函数', 'description': '二次函数的图像和性质'},
        {'name': '反比例函数', 'category': '函数', 'description': '反比例函数的图像和性质'},
        
        # 图形
        {'name': '平面几何', 'category': '图形的认识', 'description': '点、线、面的认识'},
        {'name': '三角形', 'category': '图形的性质', 'description': '三角形的性质和判定'},
        {'name': '四边形', 'category': '图形的性质', 'description': '四边形的性质和判定'},
        {'name': '圆', 'category': '图形的性质', 'description': '圆的性质'},
        
        # 统计与概率
        {'name': '统计', 'category': '统计与概率', 'description': '数据的收集、整理和分析'},
        {'name': '概率', 'category': '统计与概率', 'description': '概率的计算'},
    ]
    
    for kp_data in knowledge_points_data:
        existing = KnowledgePoint.query.filter_by(name=kp_data['name']).first()
        if not existing:
            kp = KnowledgePoint(**kp_data)
            db.session.add(kp)
    
    # 示例题目数据
    questions_data = [
        {
            'content': '计算：$(-3) + 5 = ?$',
            'options': ['2', '-2', '8', '-8'],
            'correct_answer': 0,
            'difficulty': -1.0,
            'discrimination': 0.8,
            'knowledge_points': ['有理数'],
            'category': '数与式',
            'explanation': '$(-3) + 5 = 2$，异号两数相加，取绝对值较大的符号，并用较大的绝对值减去较小的绝对值。'
        },
        {
            'content': '化简：$\\frac{x^2-1}{x+1}$',
            'options': ['$x-1$', '$x+1$', '$x^2+1$', '$\\frac{x-1}{x+1}$'],
            'correct_answer': 0,
            'difficulty': 0.0,
            'discrimination': 1.0,
            'knowledge_points': ['分式'],
            'category': '数与式',
            'explanation': '$\\frac{x^2-1}{x+1} = \\frac{(x+1)(x-1)}{x+1} = x-1$（注意$x \\neq -1$）。'
        },
        {
            'content': '解方程：$2x + 3 = 7$',
            'options': ['$x = 2$', '$x = 3$', '$x = 4$', '$x = 5$'],
            'correct_answer': 0,
            'difficulty': -1.5,
            'discrimination': 0.9,
            'knowledge_points': ['一元一次方程'],
            'category': '方程与不等式',
            'explanation': '$2x + 3 = 7$，移项得$2x = 4$，所以$x = 2$。'
        },
        {
            'content': '解方程组：$\\begin{cases} x + y = 5 \\\\ x - y = 1 \\end{cases}$',
            'options': ['$x=3, y=2$', '$x=2, y=3$', '$x=4, y=1$', '$x=1, y=4$'],
            'correct_answer': 0,
            'difficulty': 0.5,
            'discrimination': 1.2,
            'knowledge_points': ['二元一次方程组'],
            'category': '方程与不等式',
            'explanation': '两式相加得$2x=6$，所以$x=3$。代入第一式得$y=2$。'
        },
        {
            'content': '解方程：$x^2 - 5x + 6 = 0$',
            'options': ['$x_1=2, x_2=3$', '$x_1=-2, x_2=-3$', '$x_1=1, x_2=6$', '$x_1=-1, x_2=-6$'],
            'correct_answer': 0,
            'difficulty': 0.8,
            'discrimination': 1.3,
            'knowledge_points': ['一元二次方程'],
            'category': '方程与不等式',
            'explanation': '因式分解得$(x-2)(x-3)=0$，所以$x_1=2, x_2=3$。'
        },
        {
            'content': '一次函数$y = 2x + 3$的图像经过点$(1, k)$，则$k = ?$',
            'options': ['5', '6', '7', '8'],
            'correct_answer': 0,
            'difficulty': -0.5,
            'discrimination': 0.9,
            'knowledge_points': ['一次函数'],
            'category': '函数',
            'explanation': '将$x=1$代入函数得$y = 2 \\times 1 + 3 = 5$，所以$k=5$。'
        },
        {
            'content': '二次函数$y = x^2 - 4x + 3$的顶点坐标是？',
            'options': ['$(2, -1)$', '$(-2, 1)$', '$(2, 1)$', '$(-2, -1)$'],
            'correct_answer': 0,
            'difficulty': 1.2,
            'discrimination': 1.4,
            'knowledge_points': ['二次函数'],
            'category': '函数',
            'explanation': '顶点横坐标$x = -\\frac{b}{2a} = -\\frac{-4}{2} = 2$，纵坐标$y = 2^2 - 4\\times2 + 3 = -1$，所以顶点为$(2, -1)$。'
        },
        {
            'content': '在三角形$ABC$中，若$\\angle A = 60°$，$\\angle B = 80°$，则$\\angle C = ?$',
            'options': ['40°', '50°', '60°', '70°'],
            'correct_answer': 0,
            'difficulty': -1.0,
            'discrimination': 0.8,
            'knowledge_points': ['三角形'],
            'category': '图形的性质',
            'explanation': '三角形内角和为180°，所以$\\angle C = 180° - 60° - 80° = 40°$。'
        },
        {
            'content': '在$\\triangle ABC$中，$AB = AC$，$\\angle A = 80°$，则$\\angle B = ?$',
            'options': ['50°', '60°', '70°', '80°'],
            'correct_answer': 0,
            'difficulty': 0.2,
            'discrimination': 1.0,
            'knowledge_points': ['三角形'],
            'category': '图形的性质',
            'explanation': '等腰三角形两底角相等，设$\\angle B = \\angle C = x$，则$80° + 2x = 180°$，所以$x = 50°$。'
        },
        {
            'content': '矩形的对角线长度相等，这是矩形的什么性质？',
            'options': ['对边相等', '对角线相等', '对角相等', '邻角互补'],
            'correct_answer': 1,
            'difficulty': 0.0,
            'discrimination': 1.1,
            'knowledge_points': ['四边形'],
            'category': '图形的性质',
            'explanation': '矩形的对角线相等是矩形的重要性质之一。'
        },
        {
            'content': '已知圆的半径为5cm，则圆的面积为？（取$\\pi = 3.14$）',
            'options': ['78.5 cm²', '31.4 cm²', '15.7 cm²', '10 cm²'],
            'correct_answer': 0,
            'difficulty': -0.3,
            'discrimination': 0.9,
            'knowledge_points': ['圆'],
            'category': '图形的性质',
            'explanation': '圆的面积$S = \\pi r^2 = 3.14 \\times 5^2 = 78.5$ cm²。'
        },
        {
            'content': '抛掷一枚均匀的硬币，正面朝上的概率是？',
            'options': ['$\\frac{1}{4}$', '$\\frac{1}{3}$', '$\\frac{1}{2}$', '$\\frac{2}{3}$'],
            'correct_answer': 2,
            'difficulty': -1.5,
            'discrimination': 0.7,
            'knowledge_points': ['概率'],
            'category': '统计与概率',
            'explanation': '均匀硬币有两个等可能的结果，正面朝上的概率为$\\frac{1}{2}$。'
        },
        {
            'content': '化简：$\\sqrt{48}$',
            'options': ['$4\\sqrt{3}$', '$6\\sqrt{2}$', '$8\\sqrt{3}$', '$12\\sqrt{2}$'],
            'correct_answer': 0,
            'difficulty': 0.5,
            'discrimination': 1.2,
            'knowledge_points': ['二次根式'],
            'category': '数与式',
            'explanation': '$\\sqrt{48} = \\sqrt{16 \\times 3} = 4\\sqrt{3}$。'
        },
        {
            'content': '解不等式：$2x - 3 > 7$',
            'options': ['$x > 5$', '$x > 4$', '$x > 3$', '$x > 2$'],
            'correct_answer': 0,
            'difficulty': 0.0,
            'discrimination': 1.0,
            'knowledge_points': ['不等式'],
            'category': '方程与不等式',
            'explanation': '$2x - 3 > 7$，移项得$2x > 10$，所以$x > 5$。'
        },
        {
            'content': '函数$y = \\frac{3}{x}$的图像在哪些象限？',
            'options': ['第一、三象限', '第二、四象限', '第一、二象限', '第三、四象限'],
            'correct_answer': 0,
            'difficulty': 0.8,
            'discrimination': 1.3,
            'knowledge_points': ['反比例函数'],
            'category': '函数',
            'explanation': '反比例函数$y = \\frac{k}{x}$（$k > 0$）的图像分布在第一、三象限。'
        },
        {
            'content': '已知一组数据：2, 3, 4, 5, 6，这组数据的中位数是？',
            'options': ['3', '4', '5', '6'],
            'correct_answer': 1,
            'difficulty': -0.5,
            'discrimination': 0.9,
            'knowledge_points': ['统计'],
            'category': '统计与概率',
            'explanation': '将数据从小到大排列后，中位数是位于中间的数，即4。'
        },
        {
            'content': '若$ab = 0$，则下列说法正确的是？',
            'options': ['$a = 0$或$b = 0$', '$a = 0$且$b = 0$', '$a \\neq 0$且$b \\neq 0$', '以上都不对'],
            'correct_answer': 0,
            'difficulty': 0.3,
            'discrimination': 1.1,
            'knowledge_points': ['整式'],
            'category': '数与式',
            'explanation': '若$ab = 0$，则至少有一个因子为0，即$a = 0$或$b = 0$。'
        },
        {
            'content': '已知反比例函数$y = \\frac{k}{x}$经过点$(2, 3)$，则$k = ?$',
            'options': ['6', '5', '4', '3'],
            'correct_answer': 0,
            'difficulty': 0.2,
            'discrimination': 1.0,
            'knowledge_points': ['反比例函数'],
            'category': '函数',
            'explanation': '将点$(2, 3)$代入得$3 = \\frac{k}{2}$，所以$k = 6$。'
        },
        {
            'content': '在$\\triangle ABC$中，$\\angle A = 90°$，$AB = 3$，$BC = 5$，则$AC = ?$',
            'options': ['4', '5', '6', '7'],
            'correct_answer': 0,
            'difficulty': 0.8,
            'discrimination': 1.3,
            'knowledge_points': ['三角形'],
            'category': '图形的性质',
            'explanation': '由勾股定理得$AC = \\sqrt{BC^2 - AB^2} = \\sqrt{25 - 9} = 4$。'
        },
        {
            'content': '解方程：$x^2 - 6x + 9 = 0$',
            'options': ['$x = 3$', '$x = -3$', '$x = 0$', '无解'],
            'correct_answer': 0,
            'difficulty': 0.5,
            'discrimination': 1.2,
            'knowledge_points': ['一元二次方程'],
            'category': '方程与不等式',
            'explanation': '完全平方式$(x-3)^2 = 0$，所以$x = 3$。'
        },
        {
            'content': '计算：$(-2)^3 = ?$',
            'options': ['8', '-8', '6', '-6'],
            'correct_answer': 1,
            'difficulty': -0.8,
            'discrimination': 0.9,
            'knowledge_points': ['有理数'],
            'category': '数与式',
            'explanation': '$(-2)^3 = (-2) \\times (-2) \\times (-2) = -8$。'
        },
        {
            'content': '一次函数$y = kx + b$的图像经过点$(0, 2)$和$(1, 5)$，则$k = ?$',
            'options': ['3', '4', '5', '6'],
            'correct_answer': 0,
            'difficulty': 1.0,
            'discrimination': 1.3,
            'knowledge_points': ['一次函数'],
            'category': '函数',
            'explanation': '由题意得$b = 2$，$k + 2 = 5$，所以$k = 3$。'
        },
        {
            'content': '二次函数$y = -x^2 + 4x - 3$的最大值是？',
            'options': ['1', '2', '3', '4'],
            'correct_answer': 0,
            'difficulty': 1.5,
            'discrimination': 1.5,
            'knowledge_points': ['二次函数'],
            'category': '函数',
            'explanation': '顶点横坐标$x = -\\frac{4}{2\\times(-1)} = 2$，最大值$y = -4 + 8 - 3 = 1$。'
        },
        {
            'content': '已知圆的直径是10cm，则圆的周长是？（取$\\pi = 3.14$）',
            'options': ['31.4 cm', '15.7 cm', '78.5 cm', '314 cm'],
            'correct_answer': 0,
            'difficulty': -0.2,
            'discrimination': 0.9,
            'knowledge_points': ['圆'],
            'category': '图形的性质',
            'explanation': '半径$r = 5$cm，周长$C = 2\\pi r = 2 \\times 3.14 \\times 5 = 31.4$ cm。'
        },
        {
            'content': '从1, 2, 3, 4, 5中随机选取一个数，是偶数的概率是？',
            'options': ['$\\frac{1}{5}$', '$\\frac{2}{5}$', '$\\frac{3}{5}$', '$\\frac{4}{5}$'],
            'correct_answer': 1,
            'difficulty': 0.3,
            'discrimination': 1.1,
            'knowledge_points': ['概率'],
            'category': '统计与概率',
            'explanation': '5个数中有2个偶数（2和4），所以概率为$\\frac{2}{5}$。'
        }
    ]
    
    # 添加题目到数据库
    added_count = 0
    for q_data in questions_data:
        existing = Question.query.filter_by(content=q_data['content']).first()
        if not existing:
            question = Question(**q_data)
            db.session.add(question)
            added_count += 1
    
    db.session.commit()
    print(f"成功导入 {added_count} 道新题目（总共 {Question.query.count()} 道题目）")
    
    # 导入扩充题库
    try:
        from expand_questions import additional_questions
        expand_count = 0
        for q_data in additional_questions:
            existing = Question.query.filter_by(content=q_data['content']).first()
            if not existing:
                question = Question(**q_data)
                db.session.add(question)
                expand_count += 1
        db.session.commit()
        if expand_count > 0:
            print(f"成功导入扩充题目 {expand_count} 道（总共 {Question.query.count()} 道题目）")
    except ImportError:
        print("扩充题库文件不存在，跳过")
    except Exception as e:
        print(f"导入扩充题库时出错: {e}")


if __name__ == '__main__':
    from app import app
    with app.app_context():
        load_questions()

