"""
扩充题库 - 添加更多题目避免重复
目标：将题库扩充到100+道题目
"""
from models import db, Question, KnowledgePoint

# 新增题目数据（添加到现有题库）
additional_questions = [
    # ========== 数与式 - 有理数 (更多题目) ==========
    {
        'content': '计算：$(-5) + (-3) = ?$',
        'options': ['-8', '-2', '2', '8'],
        'correct_answer': 0,
        'difficulty': -1.2,
        'discrimination': 0.8,
        'knowledge_points': ['有理数'],
        'category': '数与式',
        'explanation': '同号两数相加，取相同的符号，并把绝对值相加：$(-5) + (-3) = -8$。'
    },
    {
        'content': '计算：$3 - (-7) = ?$',
        'options': ['10', '4', '-4', '-10'],
        'correct_answer': 0,
        'difficulty': -0.8,
        'discrimination': 0.9,
        'knowledge_points': ['有理数'],
        'category': '数与式',
        'explanation': '减去一个数等于加上这个数的相反数：$3 - (-7) = 3 + 7 = 10$。'
    },
    {
        'content': '计算：$(-4) \\times 6 = ?$',
        'options': ['24', '-24', '10', '-10'],
        'correct_answer': 1,
        'difficulty': -1.0,
        'discrimination': 0.9,
        'knowledge_points': ['有理数'],
        'category': '数与式',
        'explanation': '异号两数相乘得负：$(-4) \\times 6 = -24$。'
    },
    {
        'content': '计算：$(-12) \\div (-3) = ?$',
        'options': ['4', '-4', '9', '-9'],
        'correct_answer': 0,
        'difficulty': -0.9,
        'discrimination': 0.9,
        'knowledge_points': ['有理数'],
        'category': '数与式',
        'explanation': '同号两数相除得正：$(-12) \\div (-3) = 4$。'
    },
    {
        'content': '计算：$(-1)^{2024} = ?$',
        'options': ['1', '-1', '0', '2024'],
        'correct_answer': 0,
        'difficulty': 0.3,
        'discrimination': 1.0,
        'knowledge_points': ['有理数'],
        'category': '数与式',
        'explanation': '$2024$是偶数，所以$(-1)^{2024} = 1$。'
    },
    
    # ========== 数与式 - 实数 ==========
    {
        'content': '下列哪个数是有理数？',
        'options': ['$\\sqrt{2}$', '$\\pi$', '$\\frac{22}{7}$', '$\\sqrt{5}$'],
        'correct_answer': 2,
        'difficulty': 0.5,
        'discrimination': 1.1,
        'knowledge_points': ['实数'],
        'category': '数与式',
        'explanation': '$\\frac{22}{7}$是分数，属于有理数。$\\sqrt{2}$、$\\pi$、$\\sqrt{5}$都是无理数。'
    },
    {
        'content': '比较大小：$\\sqrt{5}$ 和 $2.2$',
        'options': ['$\\sqrt{5} > 2.2$', '$\\sqrt{5} < 2.2$', '$\\sqrt{5} = 2.2$', '无法比较'],
        'correct_answer': 0,
        'difficulty': 0.7,
        'discrimination': 1.2,
        'knowledge_points': ['实数'],
        'category': '数与式',
        'explanation': '$\\sqrt{5} \\approx 2.236 > 2.2$，所以$\\sqrt{5} > 2.2$。'
    },
    
    # ========== 数与式 - 整式 (更多题目) ==========
    {
        'content': '计算：$(x+2)(x-2) = ?$',
        'options': ['$x^2-4$', '$x^2+4$', '$x^2-4x+4$', '$x^2+4x+4$'],
        'correct_answer': 0,
        'difficulty': 0.4,
        'discrimination': 1.1,
        'knowledge_points': ['整式'],
        'category': '数与式',
        'explanation': '平方差公式：$(a+b)(a-b) = a^2-b^2$，所以$(x+2)(x-2) = x^2-4$。'
    },
    {
        'content': '计算：$(2x+1)^2 = ?$',
        'options': ['$4x^2+1$', '$4x^2+4x+1$', '$4x^2+2x+1$', '$2x^2+4x+1$'],
        'correct_answer': 1,
        'difficulty': 0.5,
        'discrimination': 1.1,
        'knowledge_points': ['整式'],
        'category': '数与式',
        'explanation': '完全平方公式：$(a+b)^2 = a^2+2ab+b^2$，所以$(2x+1)^2 = 4x^2+4x+1$。'
    },
    {
        'content': '因式分解：$x^2-9$',
        'options': ['$(x+3)(x-3)$', '$(x+9)(x-9)$', '$(x+3)^2$', '$(x-3)^2$'],
        'correct_answer': 0,
        'difficulty': 0.6,
        'discrimination': 1.2,
        'knowledge_points': ['整式'],
        'category': '数与式',
        'explanation': '平方差公式：$x^2-9 = x^2-3^2 = (x+3)(x-3)$。'
    },
    {
        'content': '化简：$3x^2 - 2x + 1 - (x^2 - 3x + 2)$',
        'options': ['$2x^2+x-1$', '$2x^2+x+1$', '$2x^2-5x+3$', '$4x^2-5x+3$'],
        'correct_answer': 0,
        'difficulty': 0.3,
        'discrimination': 1.0,
        'knowledge_points': ['整式'],
        'category': '数与式',
        'explanation': '$3x^2 - 2x + 1 - x^2 + 3x - 2 = 2x^2 + x - 1$。'
    },
    
    # ========== 数与式 - 分式 (更多题目) ==========
    {
        'content': '计算：$\\frac{1}{x} + \\frac{2}{x} = ?$',
        'options': ['$\\frac{3}{x}$', '$\\frac{3}{2x}$', '$\\frac{1}{2x}$', '$\\frac{2}{x^2}$'],
        'correct_answer': 0,
        'difficulty': -0.5,
        'discrimination': 0.9,
        'knowledge_points': ['分式'],
        'category': '数与式',
        'explanation': '同分母分式相加，分子相加：$\\frac{1}{x} + \\frac{2}{x} = \\frac{3}{x}$。'
    },
    {
        'content': '计算：$\\frac{x}{y} \\times \\frac{y}{x} = ?$（$x \\neq 0, y \\neq 0$）',
        'options': ['$1$', '$\\frac{x^2}{y^2}$', '$\\frac{y^2}{x^2}$', '$xy$'],
        'correct_answer': 0,
        'difficulty': 0.2,
        'discrimination': 1.0,
        'knowledge_points': ['分式'],
        'category': '数与式',
        'explanation': '$\\frac{x}{y} \\times \\frac{y}{x} = \\frac{xy}{xy} = 1$。'
    },
    {
        'content': '计算：$\\frac{1}{x-1} - \\frac{1}{x+1} = ?$',
        'options': ['$\\frac{2}{x^2-1}$', '$\\frac{-2}{x^2-1}$', '$\\frac{2x}{x^2-1}$', '$0$'],
        'correct_answer': 0,
        'difficulty': 1.0,
        'discrimination': 1.3,
        'knowledge_points': ['分式'],
        'category': '数与式',
        'explanation': '通分后：$\\frac{(x+1)-(x-1)}{(x-1)(x+1)} = \\frac{2}{x^2-1}$。'
    },
    
    # ========== 数与式 - 二次根式 (更多题目) ==========
    {
        'content': '计算：$\\sqrt{12} + \\sqrt{27} = ?$',
        'options': ['$5\\sqrt{3}$', '$6\\sqrt{3}$', '$7\\sqrt{3}$', '$\\sqrt{39}$'],
        'correct_answer': 0,
        'difficulty': 0.8,
        'discrimination': 1.2,
        'knowledge_points': ['二次根式'],
        'category': '数与式',
        'explanation': '$\\sqrt{12} = 2\\sqrt{3}$，$\\sqrt{27} = 3\\sqrt{3}$，所以$\\sqrt{12} + \\sqrt{27} = 5\\sqrt{3}$。'
    },
    {
        'content': '计算：$\\sqrt{8} \\times \\sqrt{2} = ?$',
        'options': ['$4$', '$\\sqrt{10}$', '$2\\sqrt{2}$', '$\\sqrt{16}$'],
        'correct_answer': 0,
        'difficulty': 0.6,
        'discrimination': 1.1,
        'knowledge_points': ['二次根式'],
        'category': '数与式',
        'explanation': '$\\sqrt{8} \\times \\sqrt{2} = \\sqrt{16} = 4$。'
    },
    {
        'content': '化简：$\\sqrt{72}$',
        'options': ['$6\\sqrt{2}$', '$8\\sqrt{2}$', '$6\\sqrt{3}$', '$12\\sqrt{2}$'],
        'correct_answer': 0,
        'difficulty': 0.7,
        'discrimination': 1.2,
        'knowledge_points': ['二次根式'],
        'category': '数与式',
        'explanation': '$\\sqrt{72} = \\sqrt{36 \\times 2} = 6\\sqrt{2}$。'
    },
    
    # ========== 方程与不等式 - 一元一次方程 (更多题目) ==========
    {
        'content': '解方程：$3x - 5 = 10$',
        'options': ['$x = 5$', '$x = 3$', '$x = 15$', '$x = \\frac{5}{3}$'],
        'correct_answer': 0,
        'difficulty': -1.2,
        'discrimination': 0.9,
        'knowledge_points': ['一元一次方程'],
        'category': '方程与不等式',
        'explanation': '$3x - 5 = 10$，移项得$3x = 15$，所以$x = 5$。'
    },
    {
        'content': '解方程：$\\frac{x}{2} + 1 = 5$',
        'options': ['$x = 8$', '$x = 6$', '$x = 4$', '$x = 12$'],
        'correct_answer': 0,
        'difficulty': -0.8,
        'discrimination': 0.9,
        'knowledge_points': ['一元一次方程'],
        'category': '方程与不等式',
        'explanation': '$\\frac{x}{2} + 1 = 5$，移项得$\\frac{x}{2} = 4$，所以$x = 8$。'
    },
    {
        'content': '解方程：$2(x-3) = 10$',
        'options': ['$x = 8$', '$x = 5$', '$x = 4$', '$x = 7$'],
        'correct_answer': 0,
        'difficulty': -0.5,
        'discrimination': 1.0,
        'knowledge_points': ['一元一次方程'],
        'category': '方程与不等式',
        'explanation': '$2(x-3) = 10$，展开得$2x-6 = 10$，所以$2x = 16$，$x = 8$。'
    },
    {
        'content': '解方程：$\\frac{2x+1}{3} = 3$',
        'options': ['$x = 4$', '$x = 3$', '$x = 5$', '$x = 6$'],
        'correct_answer': 0,
        'difficulty': 0.2,
        'discrimination': 1.0,
        'knowledge_points': ['一元一次方程'],
        'category': '方程与不等式',
        'explanation': '$\\frac{2x+1}{3} = 3$，两边乘以3得$2x+1 = 9$，所以$2x = 8$，$x = 4$。'
    },
    
    # ========== 方程与不等式 - 二元一次方程组 (更多题目) ==========
    {
        'content': '解方程组：$\\begin{cases} 2x + y = 7 \\\\ x - y = 2 \\end{cases}$',
        'options': ['$x=3, y=1$', '$x=2, y=3$', '$x=4, y=-1$', '$x=5, y=-3$'],
        'correct_answer': 0,
        'difficulty': 0.7,
        'discrimination': 1.2,
        'knowledge_points': ['二元一次方程组'],
        'category': '方程与不等式',
        'explanation': '两式相加得$3x = 9$，所以$x = 3$。代入第二式得$y = 1$。'
    },
    {
        'content': '解方程组：$\\begin{cases} x + 2y = 8 \\\\ 2x - y = 1 \\end{cases}$',
        'options': ['$x=2, y=3$', '$x=3, y=2.5$', '$x=4, y=2$', '$x=1, y=3.5$'],
        'correct_answer': 0,
        'difficulty': 0.8,
        'discrimination': 1.3,
        'knowledge_points': ['二元一次方程组'],
        'category': '方程与不等式',
        'explanation': '第一式乘以2减去第二式：$5y = 15$，所以$y = 3$。代入得$x = 2$。'
    },
    {
        'content': '解方程组：$\\begin{cases} 3x - 2y = 5 \\\\ x + y = 4 \\end{cases}$',
        'options': ['$x=2.6, y=1.4$', '$x=3, y=1$', '$x=2.5, y=1.5$', '$x=2, y=2$'],
        'correct_answer': 0,
        'difficulty': 1.0,
        'discrimination': 1.3,
        'knowledge_points': ['二元一次方程组'],
        'category': '方程与不等式',
        'explanation': '由第二式得$x = 4-y$，代入第一式：$3(4-y) - 2y = 5$，解得$y = 1.4$，$x = 2.6$。'
    },
    
    # ========== 方程与不等式 - 一元二次方程 (更多题目) ==========
    {
        'content': '解方程：$x^2 - 7x + 12 = 0$',
        'options': ['$x_1=3, x_2=4$', '$x_1=-3, x_2=-4$', '$x_1=2, x_2=6$', '$x_1=1, x_2=12$'],
        'correct_answer': 0,
        'difficulty': 0.7,
        'discrimination': 1.2,
        'knowledge_points': ['一元二次方程'],
        'category': '方程与不等式',
        'explanation': '因式分解得$(x-3)(x-4)=0$，所以$x_1=3, x_2=4$。'
    },
    {
        'content': '解方程：$x^2 + 4x - 5 = 0$',
        'options': ['$x_1=1, x_2=-5$', '$x_1=-1, x_2=5$', '$x_1=1, x_2=5$', '$x_1=-1, x_2=-5$'],
        'correct_answer': 0,
        'difficulty': 0.6,
        'discrimination': 1.2,
        'knowledge_points': ['一元二次方程'],
        'category': '方程与不等式',
        'explanation': '因式分解得$(x-1)(x+5)=0$，所以$x_1=1, x_2=-5$。'
    },
    {
        'content': '解方程：$2x^2 - 5x + 2 = 0$',
        'options': ['$x_1=2, x_2=\\frac{1}{2}$', '$x_1=-2, x_2=-\\frac{1}{2}$', '$x_1=1, x_2=2$', '$x_1=\\frac{1}{2}, x_2=\\frac{3}{2}$'],
        'correct_answer': 0,
        'difficulty': 0.9,
        'discrimination': 1.3,
        'knowledge_points': ['一元二次方程'],
        'category': '方程与不等式',
        'explanation': '因式分解得$(2x-1)(x-2)=0$，所以$x_1=\\frac{1}{2}, x_2=2$。'
    },
    {
        'content': '方程$x^2 + 2x + 1 = 0$的判别式$\\Delta = ?$',
        'options': ['$0$', '$4$', '$8$', '$16$'],
        'correct_answer': 0,
        'difficulty': 0.8,
        'discrimination': 1.2,
        'knowledge_points': ['一元二次方程'],
        'category': '方程与不等式',
        'explanation': '$\\Delta = b^2-4ac = 2^2 - 4\\times1\\times1 = 4-4 = 0$。'
    },
    
    # ========== 方程与不等式 - 不等式 (更多题目) ==========
    {
        'content': '解不等式：$3x + 1 < 10$',
        'options': ['$x < 3$', '$x < 4$', '$x > 3$', '$x > 4$'],
        'correct_answer': 0,
        'difficulty': -0.5,
        'discrimination': 0.9,
        'knowledge_points': ['不等式'],
        'category': '方程与不等式',
        'explanation': '$3x + 1 < 10$，移项得$3x < 9$，所以$x < 3$。'
    },
    {
        'content': '解不等式：$-2x > 6$',
        'options': ['$x < -3$', '$x > -3$', '$x < 3$', '$x > 3$'],
        'correct_answer': 0,
        'difficulty': 0.4,
        'discrimination': 1.1,
        'knowledge_points': ['不等式'],
        'category': '方程与不等式',
        'explanation': '两边同时除以$-2$（负数），不等号方向改变：$x < -3$。'
    },
    {
        'content': '解不等式组：$\\begin{cases} x > 2 \\\\ x < 5 \\end{cases}$',
        'options': ['$2 < x < 5$', '$x > 2$或$x < 5$', '$x > 5$', '$x < 2$'],
        'correct_answer': 0,
        'difficulty': 0.6,
        'discrimination': 1.2,
        'knowledge_points': ['不等式'],
        'category': '方程与不等式',
        'explanation': '求交集：同时满足$x > 2$和$x < 5$，即$2 < x < 5$。'
    },
    
    # ========== 函数 - 一次函数 (更多题目) ==========
    {
        'content': '一次函数$y = -x + 3$的斜率是？',
        'options': ['$-1$', '$1$', '$3$', '$-3$'],
        'correct_answer': 0,
        'difficulty': 0.3,
        'discrimination': 1.0,
        'knowledge_points': ['一次函数'],
        'category': '函数',
        'explanation': '一次函数的一般形式为$y = kx + b$，其中$k$是斜率。这里$k = -1$。'
    },
    {
        'content': '一次函数$y = 3x - 2$的图像与$y$轴的交点坐标是？',
        'options': ['$(0, -2)$', '$(0, 2)$', '$(2, 0)$', '$(-2, 0)$'],
        'correct_answer': 0,
        'difficulty': 0.4,
        'discrimination': 1.0,
        'knowledge_points': ['一次函数'],
        'category': '函数',
        'explanation': '与$y$轴交点，令$x=0$，得$y=-2$，所以交点为$(0, -2)$。'
    },
    {
        'content': '一次函数$y = 2x + 1$和$y = -x + 4$的交点坐标是？',
        'options': ['$(1, 3)$', '$(2, 5)$', '$(3, 7)$', '$(0, 1)$'],
        'correct_answer': 0,
        'difficulty': 1.0,
        'discrimination': 1.3,
        'knowledge_points': ['一次函数'],
        'category': '函数',
        'explanation': '联立方程：$2x+1 = -x+4$，解得$x=1$，代入得$y=3$，所以交点为$(1, 3)$。'
    },
    {
        'content': '一次函数$y = kx + b$的图像经过点$(2, 5)$和$(4, 9)$，则$k = ?$',
        'options': ['$2$', '$3$', '$4$', '$5$'],
        'correct_answer': 0,
        'difficulty': 1.1,
        'discrimination': 1.3,
        'knowledge_points': ['一次函数'],
        'category': '函数',
        'explanation': '斜率$k = \\frac{9-5}{4-2} = \\frac{4}{2} = 2$。'
    },
    
    # ========== 函数 - 二次函数 (更多题目) ==========
    {
        'content': '二次函数$y = x^2 - 6x + 5$的对称轴方程是？',
        'options': ['$x = 3$', '$x = -3$', '$x = 2$', '$x = -2$'],
        'correct_answer': 0,
        'difficulty': 1.0,
        'discrimination': 1.3,
        'knowledge_points': ['二次函数'],
        'category': '函数',
        'explanation': '对称轴$x = -\\frac{b}{2a} = -\\frac{-6}{2} = 3$。'
    },
    {
        'content': '二次函数$y = -2x^2 + 8x - 6$的开口方向是？',
        'options': ['向下', '向上', '水平', '无法确定'],
        'correct_answer': 0,
        'difficulty': 0.5,
        'discrimination': 1.1,
        'knowledge_points': ['二次函数'],
        'category': '函数',
        'explanation': '二次项系数$a = -2 < 0$，所以开口向下。'
    },
    {
        'content': '二次函数$y = x^2 - 2x - 3$的零点（与$x$轴交点）的横坐标是？',
        'options': ['$x_1=-1, x_2=3$', '$x_1=1, x_2=-3$', '$x_1=0, x_2=2$', '$x_1=-2, x_2=4$'],
        'correct_answer': 0,
        'difficulty': 0.9,
        'discrimination': 1.2,
        'knowledge_points': ['二次函数'],
        'category': '函数',
        'explanation': '令$y=0$：$x^2-2x-3=0$，因式分解得$(x+1)(x-3)=0$，所以$x_1=-1, x_2=3$。'
    },
    {
        'content': '二次函数$y = 2x^2 - 4x + 1$的最小值是？',
        'options': ['$-1$', '$0$', '$1$', '$2$'],
        'correct_answer': 0,
        'difficulty': 1.3,
        'discrimination': 1.4,
        'knowledge_points': ['二次函数'],
        'category': '函数',
        'explanation': '顶点横坐标$x = -\\frac{-4}{4} = 1$，最小值$y = 2-4+1 = -1$。'
    },
    
    # ========== 函数 - 反比例函数 (更多题目) ==========
    {
        'content': '反比例函数$y = \\frac{-3}{x}$的图像在哪些象限？',
        'options': ['第二、四象限', '第一、三象限', '第一、二象限', '第三、四象限'],
        'correct_answer': 0,
        'difficulty': 0.9,
        'discrimination': 1.3,
        'knowledge_points': ['反比例函数'],
        'category': '函数',
        'explanation': '反比例函数$y = \\frac{k}{x}$（$k < 0$）的图像分布在第二、四象限。'
    },
    {
        'content': '反比例函数$y = \\frac{k}{x}$经过点$(3, 4)$，则$k = ?$',
        'options': ['$12$', '$7$', '$\\frac{4}{3}$', '$\\frac{3}{4}$'],
        'correct_answer': 0,
        'difficulty': 0.5,
        'discrimination': 1.1,
        'knowledge_points': ['反比例函数'],
        'category': '函数',
        'explanation': '将点$(3, 4)$代入得$4 = \\frac{k}{3}$，所以$k = 12$。'
    },
    
    # ========== 图形的性质 - 三角形 (更多题目) ==========
    {
        'content': '在$\\triangle ABC$中，$\\angle A = 50°$，$\\angle B = 70°$，则$\\angle C = ?$',
        'options': ['$60°$', '$50°$', '$70°$', '$80°$'],
        'correct_answer': 0,
        'difficulty': -1.1,
        'discrimination': 0.8,
        'knowledge_points': ['三角形'],
        'category': '图形的性质',
        'explanation': '三角形内角和为180°，所以$\\angle C = 180° - 50° - 70° = 60°$。'
    },
    {
        'content': '在$\\triangle ABC$中，$AB = 5$，$BC = 12$，$AC = 13$，则这个三角形是？',
        'options': ['直角三角形', '锐角三角形', '钝角三角形', '无法确定'],
        'correct_answer': 0,
        'difficulty': 0.8,
        'discrimination': 1.2,
        'knowledge_points': ['三角形'],
        'category': '图形的性质',
        'explanation': '因为$5^2+12^2=25+144=169=13^2$，满足勾股定理，所以是直角三角形。'
    },
    {
        'content': '等腰三角形的顶角是$80°$，则一个底角是？',
        'options': ['$50°$', '$60°$', '$70°$', '$80°$'],
        'correct_answer': 0,
        'difficulty': 0.3,
        'discrimination': 1.0,
        'knowledge_points': ['三角形'],
        'category': '图形的性质',
        'explanation': '等腰三角形两底角相等，设底角为$x$，则$80° + 2x = 180°$，所以$x = 50°$。'
    },
    {
        'content': '在$\\triangle ABC$中，$\\angle A = 90°$，$AB = 6$，$AC = 8$，则$BC = ?$',
        'options': ['$10$', '$12$', '$14$', '$16$'],
        'correct_answer': 0,
        'difficulty': 0.9,
        'discrimination': 1.3,
        'knowledge_points': ['三角形'],
        'category': '图形的性质',
        'explanation': '由勾股定理：$BC = \\sqrt{AB^2 + AC^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10$。'
    },
    
    # ========== 图形的性质 - 四边形 (更多题目) ==========
    {
        'content': '平行四边形的对角线具有什么性质？',
        'options': ['互相平分', '互相垂直', '相等', '互相平分且相等'],
        'correct_answer': 0,
        'difficulty': 0.4,
        'discrimination': 1.1,
        'knowledge_points': ['四边形'],
        'category': '图形的性质',
        'explanation': '平行四边形的对角线互相平分，但不一定相等或垂直。'
    },
    {
        'content': '菱形的对角线具有什么性质？',
        'options': ['互相垂直平分', '相等', '互相平分但不垂直', '没有特殊性质'],
        'correct_answer': 0,
        'difficulty': 0.6,
        'discrimination': 1.2,
        'knowledge_points': ['四边形'],
        'category': '图形的性质',
        'explanation': '菱形的对角线互相垂直平分。'
    },
    {
        'content': '正方形的对角线长度为$6\\sqrt{2}$，则边长为？',
        'options': ['$6$', '$3\\sqrt{2}$', '$12$', '$6\\sqrt{2}$'],
        'correct_answer': 0,
        'difficulty': 1.0,
        'discrimination': 1.3,
        'knowledge_points': ['四边形'],
        'category': '图形的性质',
        'explanation': '正方形对角线$d = a\\sqrt{2}$，所以$a = \\frac{d}{\\sqrt{2}} = \\frac{6\\sqrt{2}}{\\sqrt{2}} = 6$。'
    },
    
    # ========== 图形的性质 - 圆 (更多题目) ==========
    {
        'content': '已知圆的半径为$r$，则圆的面积公式是？',
        'options': ['$\\pi r^2$', '$2\\pi r$', '$\\pi r$', '$\\pi d^2$'],
        'correct_answer': 0,
        'difficulty': -0.8,
        'discrimination': 0.8,
        'knowledge_points': ['圆'],
        'category': '图形的性质',
        'explanation': '圆的面积公式是$S = \\pi r^2$。'
    },
    {
        'content': '已知圆的半径为$4$cm，则圆的周长是？（取$\\pi = 3.14$）',
        'options': ['$25.12$ cm', '$50.24$ cm', '$12.56$ cm', '$16$ cm'],
        'correct_answer': 0,
        'difficulty': -0.5,
        'discrimination': 0.9,
        'knowledge_points': ['圆'],
        'category': '图形的性质',
        'explanation': '圆的周长$C = 2\\pi r = 2 \\times 3.14 \\times 4 = 25.12$ cm。'
    },
    {
        'content': '已知圆的面积为$25\\pi$，则半径是？',
        'options': ['$5$', '$10$', '$25$', '$\\sqrt{25}$'],
        'correct_answer': 0,
        'difficulty': 0.6,
        'discrimination': 1.1,
        'knowledge_points': ['圆'],
        'category': '图形的性质',
        'explanation': '由$\\pi r^2 = 25\\pi$，得$r^2 = 25$，所以$r = 5$。'
    },
    {
        'content': '在圆中，弦长等于半径的弦所对的圆心角是？',
        'options': ['$60°$', '$90°$', '$120°$', '$180°$'],
        'correct_answer': 0,
        'difficulty': 1.2,
        'discrimination': 1.4,
        'knowledge_points': ['圆'],
        'category': '图形的性质',
        'explanation': '弦长等于半径时，圆心角为$60°$（等边三角形的内角）。'
    },
    
    # ========== 统计与概率 - 统计 (更多题目) ==========
    {
        'content': '一组数据：5, 7, 8, 9, 10的平均数是？',
        'options': ['$7.8$', '$8$', '$8.5$', '$9$'],
        'correct_answer': 0,
        'difficulty': -0.7,
        'discrimination': 0.9,
        'knowledge_points': ['统计'],
        'category': '统计与概率',
        'explanation': '平均数$\\bar{x} = \\frac{5+7+8+9+10}{5} = \\frac{39}{5} = 7.8$。'
    },
    {
        'content': '一组数据：2, 3, 4, 5, 6, 7的中位数是？',
        'options': ['$4.5$', '$4$', '$5$', '$5.5$'],
        'correct_answer': 0,
        'difficulty': 0.0,
        'discrimination': 1.0,
        'knowledge_points': ['统计'],
        'category': '统计与概率',
        'explanation': '数据个数为偶数，中位数是中间两个数的平均值：$\\frac{4+5}{2} = 4.5$。'
    },
    {
        'content': '一组数据：1, 2, 2, 3, 3, 3, 4的众数是？',
        'options': ['$3$', '$2$', '$2$和$3$', '没有众数'],
        'correct_answer': 0,
        'difficulty': 0.2,
        'discrimination': 1.0,
        'knowledge_points': ['统计'],
        'category': '统计与概率',
        'explanation': '数据中出现次数最多的是$3$（出现3次），所以众数是$3$。'
    },
    {
        'content': '一组数据的方差是$4$，则标准差是？',
        'options': ['$2$', '$4$', '$16$', '$\\sqrt{2}$'],
        'correct_answer': 0,
        'difficulty': 0.5,
        'discrimination': 1.1,
        'knowledge_points': ['统计'],
        'category': '统计与概率',
        'explanation': '标准差是方差的算术平方根：$\\sqrt{4} = 2$。'
    },
    
    # ========== 统计与概率 - 概率 (更多题目) ==========
    {
        'content': '抛掷一枚骰子，出现奇数的概率是？',
        'options': ['$\\frac{1}{2}$', '$\\frac{1}{3}$', '$\\frac{1}{6}$', '$\\frac{2}{3}$'],
        'correct_answer': 0,
        'difficulty': -0.8,
        'discrimination': 0.9,
        'knowledge_points': ['概率'],
        'category': '统计与概率',
        'explanation': '骰子有6个面，奇数有3个（1, 3, 5），概率为$\\frac{3}{6} = \\frac{1}{2}$。'
    },
    {
        'content': '从1到10中随机选一个数，是3的倍数的概率是？',
        'options': ['$\\frac{3}{10}$', '$\\frac{1}{3}$', '$\\frac{1}{10}$', '$\\frac{2}{5}$'],
        'correct_answer': 0,
        'difficulty': 0.4,
        'discrimination': 1.1,
        'knowledge_points': ['概率'],
        'category': '统计与概率',
        'explanation': '1到10中，3的倍数有3个（3, 6, 9），概率为$\\frac{3}{10}$。'
    },
    {
        'content': '同时抛掷两枚硬币，至少有一个正面的概率是？',
        'options': ['$\\frac{3}{4}$', '$\\frac{1}{2}$', '$\\frac{1}{4}$', '$1$'],
        'correct_answer': 0,
        'difficulty': 0.8,
        'discrimination': 1.2,
        'knowledge_points': ['概率'],
        'category': '统计与概率',
        'explanation': '所有可能结果：（正，正）、（正，反）、（反，正）、（反，反）。至少一个正面的有3种，概率为$\\frac{3}{4}$。'
    },
    {
        'content': '从52张扑克牌中随机抽取一张，是红心的概率是？',
        'options': ['$\\frac{1}{4}$', '$\\frac{1}{13}$', '$\\frac{1}{52}$', '$\\frac{13}{52}$'],
        'correct_answer': 0,
        'difficulty': 0.6,
        'discrimination': 1.1,
        'knowledge_points': ['概率'],
        'category': '统计与概率',
        'explanation': '52张牌中红心有13张，概率为$\\frac{13}{52} = \\frac{1}{4}$。'
    },
]

