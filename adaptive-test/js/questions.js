// 题库数据 - 共 203 道题目
// 从数据库导出，选项顺序已随机打乱，使正确答案分布更均匀
const questionsData = [
  {
    "id": 1,
    "content": "计算：$(-3) + 5 = ?$",
    "options": [
      "8",
      "-2",
      "2",
      "-8"
    ],
    "correctAnswer": 2,
    "difficulty": -1.0,
    "discrimination": 0.8,
    "knowledgePoints": [
      "有理数"
    ],
    "category": "数与式",
    "semester": "七年级上",
    "explanation": "$(-3) + 5 = 2$，异号两数相加，取绝对值较大的符号，并用较大的绝对值减去较小的绝对值。"
  },
  {
    "id": 2,
    "content": "化简：$\\frac{x^2-1}{x+1}$",
    "options": [
      "$x^2+1$",
      "$x+1$",
      "$x-1$",
      "$\\frac{x-1}{x+1}$"
    ],
    "correctAnswer": 2,
    "difficulty": 0.0,
    "discrimination": 1.0,
    "knowledgePoints": [
      "分式"
    ],
    "category": "数与式",
    "semester": "七年级下",
    "explanation": "$\\frac{x^2-1}{x+1} = \\frac{(x+1)(x-1)}{x+1} = x-1$（注意$x \\neq -1$）。"
  },
  {
    "id": 3,
    "content": "解方程：$2x + 3 = 7$",
    "options": [
      "$x = 3$",
      "$x = 2$",
      "$x = 4$",
      "$x = 5$"
    ],
    "correctAnswer": 1,
    "difficulty": -1.5,
    "discrimination": 0.9,
    "knowledgePoints": [
      "一元一次方程"
    ],
    "category": "方程与不等式",
    "semester": "七年级上",
    "explanation": "$2x + 3 = 7$，移项得$2x = 4$，所以$x = 2$。"
  },
  {
    "id": 4,
    "content": "解方程组：$\\begin{cases} x + y = 5 \\\\ x - y = 1 \\end{cases}$",
    "options": [
      "$x=2, y=3$",
      "$x=3, y=2$",
      "$x=1, y=4$",
      "$x=4, y=1$"
    ],
    "correctAnswer": 1,
    "difficulty": 0.5,
    "discrimination": 1.2,
    "knowledgePoints": [
      "二元一次方程组"
    ],
    "category": "方程与不等式",
    "semester": "七年级下",
    "explanation": "两式相加得$2x=6$，所以$x=3$。代入第一式得$y=2$。"
  },
  {
    "id": 5,
    "content": "解方程：$x^2 - 5x + 6 = 0$",
    "options": [
      "$x_1=2, x_2=3$",
      "$x_1=-2, x_2=-3$",
      "$x_1=1, x_2=6$",
      "$x_1=-1, x_2=-6$"
    ],
    "correctAnswer": 0,
    "difficulty": 0.8,
    "discrimination": 1.3,
    "knowledgePoints": [
      "一元二次方程"
    ],
    "category": "方程与不等式",
    "semester": "九年级上",
    "explanation": "因式分解得$(x-2)(x-3)=0$，所以$x_1=2, x_2=3$。"
  },
  {
    "id": 6,
    "content": "一次函数$y = 2x + 3$的图像经过点$(1, k)$，则$k = ?$",
    "options": [
      "7",
      "8",
      "5",
      "6"
    ],
    "correctAnswer": 2,
    "difficulty": -0.5,
    "discrimination": 0.9,
    "knowledgePoints": [
      "一次函数"
    ],
    "category": "函数",
    "semester": "八年级下",
    "explanation": "将$x=1$代入函数得$y = 2 \\times 1 + 3 = 5$，所以$k=5$。"
  },
  {
    "id": 7,
    "content": "二次函数$y = x^2 - 4x + 3$的顶点坐标是？",
    "options": [
      "$(-2, -1)$",
      "$(-2, 1)$",
      "$(2, 1)$",
      "$(2, -1)$"
    ],
    "correctAnswer": 3,
    "difficulty": 1.2,
    "discrimination": 1.4,
    "knowledgePoints": [
      "二次函数"
    ],
    "category": "函数",
    "semester": "九年级上",
    "explanation": "顶点横坐标$x = -\\frac{b}{2a} = -\\frac{-4}{2} = 2$，纵坐标$y = 2^2 - 4\\times2 + 3 = -1$，所以顶点为$(2, -1)$。"
  },
  {
    "id": 8,
    "content": "在三角形$ABC$中，若$\\angle A = 60°$，$\\angle B = 80°$，则$\\angle C = ?$",
    "options": [
      "60°",
      "50°",
      "70°",
      "40°"
    ],
    "correctAnswer": 3,
    "difficulty": -1.0,
    "discrimination": 0.8,
    "knowledgePoints": [
      "三角形"
    ],
    "category": "图形的性质",
    "semester": "八年级下",
    "explanation": "三角形内角和为180°，所以$\\angle C = 180° - 60° - 80° = 40°$。"
  },
  {
    "id": 9,
    "content": "在$\\triangle ABC$中，$AB = AC$，$\\angle A = 80°$，则$\\angle B = ?$",
    "options": [
      "60°",
      "50°",
      "70°",
      "80°"
    ],
    "correctAnswer": 1,
    "difficulty": 0.2,
    "discrimination": 1.0,
    "knowledgePoints": [
      "三角形"
    ],
    "category": "图形的性质",
    "semester": "八年级下",
    "explanation": "等腰三角形两底角相等，设$\\angle B = \\angle C = x$，则$80° + 2x = 180°$，所以$x = 50°$。"
  },
  {
    "id": 10,
    "content": "矩形的对角线长度相等，这是矩形的什么性质？",
    "options": [
      "邻角互补",
      "对边相等",
      "对角线相等",
      "对角相等"
    ],
    "correctAnswer": 2,
    "difficulty": 0.0,
    "discrimination": 1.1,
    "knowledgePoints": [
      "四边形"
    ],
    "category": "图形的性质",
    "semester": "八年级下",
    "explanation": "矩形的对角线相等是矩形的重要性质之一。"
  },
  {
    "id": 11,
    "content": "已知圆的半径为5cm，则圆的面积为？（取$\\pi = 3.14$）",
    "options": [
      "15.7 cm²",
      "78.5 cm²",
      "31.4 cm²",
      "10 cm²"
    ],
    "correctAnswer": 1,
    "difficulty": -0.3,
    "discrimination": 0.9,
    "knowledgePoints": [
      "圆"
    ],
    "category": "图形的性质",
    "semester": "九年级下",
    "explanation": "圆的面积$S = \\pi r^2 = 3.14 \\times 5^2 = 78.5$ cm²。"
  },
  {
    "id": 12,
    "content": "抛掷一枚均匀的硬币，正面朝上的概率是？",
    "options": [
      "$\\frac{1}{2}$",
      "$\\frac{1}{3}$",
      "$\\frac{1}{4}$",
      "$\\frac{2}{3}$"
    ],
    "correctAnswer": 0,
    "difficulty": -1.5,
    "discrimination": 0.7,
    "knowledgePoints": [
      "概率"
    ],
    "category": "统计与概率",
    "semester": "九年级下",
    "explanation": "均匀硬币有两个等可能的结果，正面朝上的概率为$\\frac{1}{2}$。"
  },
  {
    "id": 13,
    "content": "化简：$\\sqrt{48}$",
    "options": [
      "$12\\sqrt{2}$",
      "$8\\sqrt{3}$",
      "$6\\sqrt{2}$",
      "$4\\sqrt{3}$"
    ],
    "correctAnswer": 3,
    "difficulty": 0.5,
    "discrimination": 1.2,
    "knowledgePoints": [
      "二次根式"
    ],
    "category": "数与式",
    "semester": "八年级上",
    "explanation": "$\\sqrt{48} = \\sqrt{16 \\times 3} = 4\\sqrt{3}$。"
  },
  {
    "id": 14,
    "content": "解不等式：$2x - 3 > 7$",
    "options": [
      "$x > 5$",
      "$x > 3$",
      "$x > 4$",
      "$x > 2$"
    ],
    "correctAnswer": 0,
    "difficulty": 0.0,
    "discrimination": 1.0,
    "knowledgePoints": [
      "不等式"
    ],
    "category": "方程与不等式",
    "semester": "七年级下",
    "explanation": "$2x - 3 > 7$，移项得$2x > 10$，所以$x > 5$。"
  },
  {
    "id": 15,
    "content": "函数$y = \\frac{3}{x}$的图像在哪些象限？",
    "options": [
      "第二、四象限",
      "第一、三象限",
      "第三、四象限",
      "第一、二象限"
    ],
    "correctAnswer": 1,
    "difficulty": 0.8,
    "discrimination": 1.3,
    "knowledgePoints": [
      "反比例函数"
    ],
    "category": "函数",
    "semester": "八年级下",
    "explanation": "反比例函数$y = \\frac{k}{x}$（$k > 0$）的图像分布在第一、三象限。"
  },
  {
    "id": 16,
    "content": "已知一组数据：2, 3, 4, 5, 6，这组数据的中位数是？",
    "options": [
      "3",
      "5",
      "4",
      "6"
    ],
    "correctAnswer": 2,
    "difficulty": -0.5,
    "discrimination": 0.9,
    "knowledgePoints": [
      "统计"
    ],
    "category": "统计与概率",
    "semester": "九年级下",
    "explanation": "将数据从小到大排列后，中位数是位于中间的数，即4。"
  },
  {
    "id": 17,
    "content": "若$ab = 0$，则下列说法正确的是？",
    "options": [
      "$a = 0$或$b = 0$",
      "$a = 0$且$b = 0$",
      "$a \\neq 0$且$b \\neq 0$",
      "以上都不对"
    ],
    "correctAnswer": 0,
    "difficulty": 0.3,
    "discrimination": 1.1,
    "knowledgePoints": [
      "整式"
    ],
    "category": "数与式",
    "semester": "七年级上",
    "explanation": "若$ab = 0$，则至少有一个因子为0，即$a = 0$或$b = 0$。"
  },
  {
    "id": 18,
    "content": "已知反比例函数$y = \\frac{k}{x}$经过点$(2, 3)$，则$k = ?$",
    "options": [
      "4",
      "5",
      "3",
      "6"
    ],
    "correctAnswer": 3,
    "difficulty": 0.2,
    "discrimination": 1.0,
    "knowledgePoints": [
      "反比例函数"
    ],
    "category": "函数",
    "semester": "八年级下",
    "explanation": "将点$(2, 3)$代入得$3 = \\frac{k}{2}$，所以$k = 6$。"
  },
  {
    "id": 19,
    "content": "在$\\triangle ABC$中，$\\angle A = 90°$，$AB = 3$，$BC = 5$，则$AC = ?$",
    "options": [
      "5",
      "6",
      "4",
      "7"
    ],
    "correctAnswer": 2,
    "difficulty": 0.8,
    "discrimination": 1.3,
    "knowledgePoints": [
      "三角形"
    ],
    "category": "图形的性质",
    "semester": "八年级下",
    "explanation": "由勾股定理得$AC = \\sqrt{BC^2 - AB^2} = \\sqrt{25 - 9} = 4$。"
  },
  {
    "id": 20,
    "content": "解方程：$x^2 - 6x + 9 = 0$",
    "options": [
      "无解",
      "$x = 0$",
      "$x = 3$",
      "$x = -3$"
    ],
    "correctAnswer": 2,
    "difficulty": 0.5,
    "discrimination": 1.2,
    "knowledgePoints": [
      "一元二次方程"
    ],
    "category": "方程与不等式",
    "semester": "九年级上",
    "explanation": "完全平方式$(x-3)^2 = 0$，所以$x = 3$。"
  },
  {
    "id": 21,
    "content": "计算：$(-2)^3 = ?$",
    "options": [
      "8",
      "6",
      "-6",
      "-8"
    ],
    "correctAnswer": 3,
    "difficulty": -0.8,
    "discrimination": 0.9,
    "knowledgePoints": [
      "有理数"
    ],
    "category": "数与式",
    "semester": "七年级上",
    "explanation": "$(-2)^3 = (-2) \\times (-2) \\times (-2) = -8$。"
  },
  {
    "id": 22,
    "content": "一次函数$y = kx + b$的图像经过点$(0, 2)$和$(1, 5)$，则$k = ?$",
    "options": [
      "4",
      "3",
      "5",
      "6"
    ],
    "correctAnswer": 1,
    "difficulty": 1.0,
    "discrimination": 1.3,
    "knowledgePoints": [
      "一次函数"
    ],
    "category": "函数",
    "semester": "八年级下",
    "explanation": "由题意得$b = 2$，$k + 2 = 5$，所以$k = 3$。"
  },
  {
    "id": 23,
    "content": "二次函数$y = -x^2 + 4x - 3$的最大值是？",
    "options": [
      "4",
      "3",
      "2",
      "1"
    ],
    "correctAnswer": 3,
    "difficulty": 1.5,
    "discrimination": 1.5,
    "knowledgePoints": [
      "二次函数"
    ],
    "category": "函数",
    "semester": "九年级上",
    "explanation": "顶点横坐标$x = -\\frac{4}{2\\times(-1)} = 2$，最大值$y = -4 + 8 - 3 = 1$。"
  },
  {
    "id": 24,
    "content": "已知圆的直径是10cm，则圆的周长是？（取$\\pi = 3.14$）",
    "options": [
      "314 cm",
      "31.4 cm",
      "78.5 cm",
      "15.7 cm"
    ],
    "correctAnswer": 1,
    "difficulty": -0.2,
    "discrimination": 0.9,
    "knowledgePoints": [
      "圆"
    ],
    "category": "图形的性质",
    "semester": "九年级下",
    "explanation": "半径$r = 5$cm，周长$C = 2\\pi r = 2 \\times 3.14 \\times 5 = 31.4$ cm。"
  },
  {
    "id": 25,
    "content": "从1, 2, 3, 4, 5中随机选取一个数，是偶数的概率是？",
    "options": [
      "$\\frac{4}{5}$",
      "$\\frac{2}{5}$",
      "$\\frac{3}{5}$",
      "$\\frac{1}{5}$"
    ],
    "correctAnswer": 1,
    "difficulty": 0.3,
    "discrimination": 1.1,
    "knowledgePoints": [
      "概率"
    ],
    "category": "统计与概率",
    "semester": "九年级下",
    "explanation": "5个数中有2个偶数（2和4），所以概率为$\\frac{2}{5}$。"
  },
  {
    "id": 26,
    "content": "计算：$(-5) + (-3) = ?$",
    "options": [
      "8",
      "-8",
      "-2",
      "2"
    ],
    "correctAnswer": 1,
    "difficulty": -1.2,
    "discrimination": 0.8,
    "knowledgePoints": [
      "有理数"
    ],
    "category": "数与式",
    "semester": "七年级上",
    "explanation": "同号两数相加，取相同的符号，并把绝对值相加：$(-5) + (-3) = -8$。"
  },
  {
    "id": 27,
    "content": "计算：$3 - (-7) = ?$",
    "options": [
      "4",
      "10",
      "-4",
      "-10"
    ],
    "correctAnswer": 1,
    "difficulty": -0.8,
    "discrimination": 0.9,
    "knowledgePoints": [
      "有理数"
    ],
    "category": "数与式",
    "semester": "七年级上",
    "explanation": "减去一个数等于加上这个数的相反数：$3 - (-7) = 3 + 7 = 10$。"
  },
  {
    "id": 28,
    "content": "计算：$(-4) \\times 6 = ?$",
    "options": [
      "24",
      "-10",
      "10",
      "-24"
    ],
    "correctAnswer": 3,
    "difficulty": -1.0,
    "discrimination": 0.9,
    "knowledgePoints": [
      "有理数"
    ],
    "category": "数与式",
    "semester": "七年级上",
    "explanation": "异号两数相乘得负：$(-4) \\times 6 = -24$。"
  },
  {
    "id": 29,
    "content": "计算：$(-12) \\div (-3) = ?$",
    "options": [
      "4",
      "9",
      "-4",
      "-9"
    ],
    "correctAnswer": 0,
    "difficulty": -0.9,
    "discrimination": 0.9,
    "knowledgePoints": [
      "有理数"
    ],
    "category": "数与式",
    "semester": "七年级上",
    "explanation": "同号两数相除得正：$(-12) \\div (-3) = 4$。"
  },
  {
    "id": 30,
    "content": "计算：$(-1)^{2024} = ?$",
    "options": [
      "0",
      "1",
      "-1",
      "2024"
    ],
    "correctAnswer": 1,
    "difficulty": 0.3,
    "discrimination": 1.0,
    "knowledgePoints": [
      "有理数"
    ],
    "category": "数与式",
    "semester": "七年级上",
    "explanation": "$2024$是偶数，所以$(-1)^{2024} = 1$。"
  },
  {
    "id": 31,
    "content": "下列哪个数是有理数？",
    "options": [
      "$\\sqrt{5}$",
      "$\\frac{22}{7}$",
      "$\\sqrt{2}$",
      "$\\pi$"
    ],
    "correctAnswer": 1,
    "difficulty": 0.5,
    "discrimination": 1.1,
    "knowledgePoints": [
      "实数"
    ],
    "category": "数与式",
    "semester": "七年级下",
    "explanation": "$\\frac{22}{7}$是分数，属于有理数。$\\sqrt{2}$、$\\pi$、$\\sqrt{5}$都是无理数。"
  },
  {
    "id": 32,
    "content": "比较大小：$\\sqrt{5}$ 和 $2.2$",
    "options": [
      "$\\sqrt{5} > 2.2$",
      "无法比较",
      "$\\sqrt{5} = 2.2$",
      "$\\sqrt{5} < 2.2$"
    ],
    "correctAnswer": 0,
    "difficulty": 0.7,
    "discrimination": 1.2,
    "knowledgePoints": [
      "实数"
    ],
    "category": "数与式",
    "semester": "七年级下",
    "explanation": "$\\sqrt{5} \\approx 2.236 > 2.2$，所以$\\sqrt{5} > 2.2$。"
  },
  {
    "id": 33,
    "content": "计算：$(x+2)(x-2) = ?$",
    "options": [
      "$x^2-4$",
      "$x^2+4x+4$",
      "$x^2-4x+4$",
      "$x^2+4$"
    ],
    "correctAnswer": 0,
    "difficulty": 0.4,
    "discrimination": 1.1,
    "knowledgePoints": [
      "整式"
    ],
    "category": "数与式",
    "semester": "七年级上",
    "explanation": "平方差公式：$(a+b)(a-b) = a^2-b^2$，所以$(x+2)(x-2) = x^2-4$。"
  },
  {
    "id": 34,
    "content": "计算：$(2x+1)^2 = ?$",
    "options": [
      "$2x^2+4x+1$",
      "$4x^2+2x+1$",
      "$4x^2+1$",
      "$4x^2+4x+1$"
    ],
    "correctAnswer": 3,
    "difficulty": 0.5,
    "discrimination": 1.1,
    "knowledgePoints": [
      "整式"
    ],
    "category": "数与式",
    "semester": "七年级上",
    "explanation": "完全平方公式：$(a+b)^2 = a^2+2ab+b^2$，所以$(2x+1)^2 = 4x^2+4x+1$。"
  },
  {
    "id": 35,
    "content": "因式分解：$x^2-9$",
    "options": [
      "$(x+3)^2$",
      "$(x+3)(x-3)$",
      "$(x-3)^2$",
      "$(x+9)(x-9)$"
    ],
    "correctAnswer": 1,
    "difficulty": 0.6,
    "discrimination": 1.2,
    "knowledgePoints": [
      "整式"
    ],
    "category": "数与式",
    "semester": "七年级上",
    "explanation": "平方差公式：$x^2-9 = x^2-3^2 = (x+3)(x-3)$。"
  },
  {
    "id": 36,
    "content": "化简：$3x^2 - 2x + 1 - (x^2 - 3x + 2)$",
    "options": [
      "$2x^2-5x+3$",
      "$2x^2+x-1$",
      "$4x^2-5x+3$",
      "$2x^2+x+1$"
    ],
    "correctAnswer": 1,
    "difficulty": 0.3,
    "discrimination": 1.0,
    "knowledgePoints": [
      "整式"
    ],
    "category": "数与式",
    "semester": "七年级上",
    "explanation": "$3x^2 - 2x + 1 - x^2 + 3x - 2 = 2x^2 + x - 1$。"
  },
  {
    "id": 37,
    "content": "计算：$\\frac{1}{x} + \\frac{2}{x} = ?$",
    "options": [
      "$\\frac{2}{x^2}$",
      "$\\frac{3}{x}$",
      "$\\frac{3}{2x}$",
      "$\\frac{1}{2x}$"
    ],
    "correctAnswer": 1,
    "difficulty": -0.5,
    "discrimination": 0.9,
    "knowledgePoints": [
      "分式"
    ],
    "category": "数与式",
    "semester": "七年级下",
    "explanation": "同分母分式相加，分子相加：$\\frac{1}{x} + \\frac{2}{x} = \\frac{3}{x}$。"
  },
  {
    "id": 38,
    "content": "计算：$\\frac{x}{y} \\times \\frac{y}{x} = ?$（$x \\neq 0, y \\neq 0$）",
    "options": [
      "$xy$",
      "$\\frac{x^2}{y^2}$",
      "$1$",
      "$\\frac{y^2}{x^2}$"
    ],
    "correctAnswer": 2,
    "difficulty": 0.2,
    "discrimination": 1.0,
    "knowledgePoints": [
      "分式"
    ],
    "category": "数与式",
    "semester": "七年级下",
    "explanation": "$\\frac{x}{y} \\times \\frac{y}{x} = \\frac{xy}{xy} = 1$。"
  },
  {
    "id": 39,
    "content": "计算：$\\frac{1}{x-1} - \\frac{1}{x+1} = ?$",
    "options": [
      "$\\frac{2}{x^2-1}$",
      "$0$",
      "$\\frac{-2}{x^2-1}$",
      "$\\frac{2x}{x^2-1}$"
    ],
    "correctAnswer": 0,
    "difficulty": 1.0,
    "discrimination": 1.3,
    "knowledgePoints": [
      "分式"
    ],
    "category": "数与式",
    "semester": "七年级下",
    "explanation": "通分后：$\\frac{(x+1)-(x-1)}{(x-1)(x+1)} = \\frac{2}{x^2-1}$。"
  },
  {
    "id": 40,
    "content": "计算：$\\sqrt{12} + \\sqrt{27} = ?$",
    "options": [
      "$5\\sqrt{3}$",
      "$6\\sqrt{3}$",
      "$7\\sqrt{3}$",
      "$\\sqrt{39}$"
    ],
    "correctAnswer": 0,
    "difficulty": 0.8,
    "discrimination": 1.2,
    "knowledgePoints": [
      "二次根式"
    ],
    "category": "数与式",
    "semester": "八年级上",
    "explanation": "$\\sqrt{12} = 2\\sqrt{3}$，$\\sqrt{27} = 3\\sqrt{3}$，所以$\\sqrt{12} + \\sqrt{27} = 5\\sqrt{3}$。"
  },
  {
    "id": 41,
    "content": "计算：$\\sqrt{8} \\times \\sqrt{2} = ?$",
    "options": [
      "$\\sqrt{10}$",
      "$4$",
      "$\\sqrt{16}$",
      "$2\\sqrt{2}$"
    ],
    "correctAnswer": 1,
    "difficulty": 0.6,
    "discrimination": 1.1,
    "knowledgePoints": [
      "二次根式"
    ],
    "category": "数与式",
    "semester": "八年级上",
    "explanation": "$\\sqrt{8} \\times \\sqrt{2} = \\sqrt{16} = 4$。"
  },
  {
    "id": 42,
    "content": "化简：$\\sqrt{72}$",
    "options": [
      "$8\\sqrt{2}$",
      "$12\\sqrt{2}$",
      "$6\\sqrt{2}$",
      "$6\\sqrt{3}$"
    ],
    "correctAnswer": 2,
    "difficulty": 0.7,
    "discrimination": 1.2,
    "knowledgePoints": [
      "二次根式"
    ],
    "category": "数与式",
    "semester": "八年级上",
    "explanation": "$\\sqrt{72} = \\sqrt{36 \\times 2} = 6\\sqrt{2}$。"
  },
  {
    "id": 43,
    "content": "解方程：$3x - 5 = 10$",
    "options": [
      "$x = 3$",
      "$x = 5$",
      "$x = \\frac{5}{3}$",
      "$x = 15$"
    ],
    "correctAnswer": 1,
    "difficulty": -1.2,
    "discrimination": 0.9,
    "knowledgePoints": [
      "一元一次方程"
    ],
    "category": "方程与不等式",
    "semester": "七年级上",
    "explanation": "$3x - 5 = 10$，移项得$3x = 15$，所以$x = 5$。"
  },
  {
    "id": 44,
    "content": "解方程：$\\frac{x}{2} + 1 = 5$",
    "options": [
      "$x = 12$",
      "$x = 6$",
      "$x = 4$",
      "$x = 8$"
    ],
    "correctAnswer": 3,
    "difficulty": -0.8,
    "discrimination": 0.9,
    "knowledgePoints": [
      "一元一次方程"
    ],
    "category": "方程与不等式",
    "semester": "七年级上",
    "explanation": "$\\frac{x}{2} + 1 = 5$，移项得$\\frac{x}{2} = 4$，所以$x = 8$。"
  },
  {
    "id": 45,
    "content": "解方程：$2(x-3) = 10$",
    "options": [
      "$x = 5$",
      "$x = 4$",
      "$x = 8$",
      "$x = 7$"
    ],
    "correctAnswer": 2,
    "difficulty": -0.5,
    "discrimination": 1.0,
    "knowledgePoints": [
      "一元一次方程"
    ],
    "category": "方程与不等式",
    "semester": "七年级上",
    "explanation": "$2(x-3) = 10$，展开得$2x-6 = 10$，所以$2x = 16$，$x = 8$。"
  },
  {
    "id": 46,
    "content": "解方程：$\\frac{2x+1}{3} = 3$",
    "options": [
      "$x = 3$",
      "$x = 5$",
      "$x = 4$",
      "$x = 6$"
    ],
    "correctAnswer": 2,
    "difficulty": 0.2,
    "discrimination": 1.0,
    "knowledgePoints": [
      "一元一次方程"
    ],
    "category": "方程与不等式",
    "semester": "七年级上",
    "explanation": "$\\frac{2x+1}{3} = 3$，两边乘以3得$2x+1 = 9$，所以$2x = 8$，$x = 4$。"
  },
  {
    "id": 47,
    "content": "解方程组：$\\begin{cases} 2x + y = 7 \\\\ x - y = 2 \\end{cases}$",
    "options": [
      "$x=4, y=-1$",
      "$x=5, y=-3$",
      "$x=3, y=1$",
      "$x=2, y=3$"
    ],
    "correctAnswer": 2,
    "difficulty": 0.7,
    "discrimination": 1.2,
    "knowledgePoints": [
      "二元一次方程组"
    ],
    "category": "方程与不等式",
    "semester": "七年级下",
    "explanation": "两式相加得$3x = 9$，所以$x = 3$。代入第二式得$y = 1$。"
  },
  {
    "id": 48,
    "content": "解方程组：$\\begin{cases} x + 2y = 8 \\\\ 2x - y = 1 \\end{cases}$",
    "options": [
      "$x=4, y=2$",
      "$x=2, y=3$",
      "$x=1, y=3.5$",
      "$x=3, y=2.5$"
    ],
    "correctAnswer": 1,
    "difficulty": 0.8,
    "discrimination": 1.3,
    "knowledgePoints": [
      "二元一次方程组"
    ],
    "category": "方程与不等式",
    "semester": "七年级下",
    "explanation": "第一式乘以2减去第二式：$5y = 15$，所以$y = 3$。代入得$x = 2$。"
  },
  {
    "id": 49,
    "content": "解方程组：$\\begin{cases} 3x - 2y = 5 \\\\ x + y = 4 \\end{cases}$",
    "options": [
      "$x=2.6, y=1.4$",
      "$x=2.5, y=1.5$",
      "$x=3, y=1$",
      "$x=2, y=2$"
    ],
    "correctAnswer": 0,
    "difficulty": 1.0,
    "discrimination": 1.3,
    "knowledgePoints": [
      "二元一次方程组"
    ],
    "category": "方程与不等式",
    "semester": "七年级下",
    "explanation": "由第二式得$x = 4-y$，代入第一式：$3(4-y) - 2y = 5$，解得$y = 1.4$，$x = 2.6$。"
  },
  {
    "id": 50,
    "content": "解方程：$x^2 - 7x + 12 = 0$",
    "options": [
      "$x_1=1, x_2=12$",
      "$x_1=3, x_2=4$",
      "$x_1=-3, x_2=-4$",
      "$x_1=2, x_2=6$"
    ],
    "correctAnswer": 1,
    "difficulty": 0.7,
    "discrimination": 1.2,
    "knowledgePoints": [
      "一元二次方程"
    ],
    "category": "方程与不等式",
    "semester": "九年级上",
    "explanation": "因式分解得$(x-3)(x-4)=0$，所以$x_1=3, x_2=4$。"
  },
  {
    "id": 51,
    "content": "解方程：$x^2 + 4x - 5 = 0$",
    "options": [
      "$x_1=-1, x_2=5$",
      "$x_1=-1, x_2=-5$",
      "$x_1=1, x_2=5$",
      "$x_1=1, x_2=-5$"
    ],
    "correctAnswer": 3,
    "difficulty": 0.6,
    "discrimination": 1.2,
    "knowledgePoints": [
      "一元二次方程"
    ],
    "category": "方程与不等式",
    "semester": "九年级上",
    "explanation": "因式分解得$(x-1)(x+5)=0$，所以$x_1=1, x_2=-5$。"
  },
  {
    "id": 52,
    "content": "解方程：$2x^2 - 5x + 2 = 0$",
    "options": [
      "$x_1=2, x_2=\\frac{1}{2}$",
      "$x_1=-2, x_2=-\\frac{1}{2}$",
      "$x_1=1, x_2=2$",
      "$x_1=\\frac{1}{2}, x_2=\\frac{3}{2}$"
    ],
    "correctAnswer": 0,
    "difficulty": 0.9,
    "discrimination": 1.3,
    "knowledgePoints": [
      "一元二次方程"
    ],
    "category": "方程与不等式",
    "semester": "九年级上",
    "explanation": "因式分解得$(2x-1)(x-2)=0$，所以$x_1=\\frac{1}{2}, x_2=2$。"
  },
  {
    "id": 53,
    "content": "方程$x^2 + 2x + 1 = 0$的判别式$\\Delta = ?$",
    "options": [
      "$16$",
      "$4$",
      "$0$",
      "$8$"
    ],
    "correctAnswer": 2,
    "difficulty": 0.8,
    "discrimination": 1.2,
    "knowledgePoints": [
      "一元二次方程"
    ],
    "category": "方程与不等式",
    "semester": "九年级上",
    "explanation": "$\\Delta = b^2-4ac = 2^2 - 4\\times1\\times1 = 4-4 = 0$。"
  },
  {
    "id": 54,
    "content": "解不等式：$3x + 1 < 10$",
    "options": [
      "$x < 3$",
      "$x > 4$",
      "$x < 4$",
      "$x > 3$"
    ],
    "correctAnswer": 0,
    "difficulty": -0.5,
    "discrimination": 0.9,
    "knowledgePoints": [
      "不等式"
    ],
    "category": "方程与不等式",
    "semester": "七年级下",
    "explanation": "$3x + 1 < 10$，移项得$3x < 9$，所以$x < 3$。"
  },
  {
    "id": 55,
    "content": "解不等式：$-2x > 6$",
    "options": [
      "$x < 3$",
      "$x < -3$",
      "$x > 3$",
      "$x > -3$"
    ],
    "correctAnswer": 1,
    "difficulty": 0.4,
    "discrimination": 1.1,
    "knowledgePoints": [
      "不等式"
    ],
    "category": "方程与不等式",
    "semester": "七年级下",
    "explanation": "两边同时除以$-2$（负数），不等号方向改变：$x < -3$。"
  },
  {
    "id": 56,
    "content": "解不等式组：$\\begin{cases} x > 2 \\\\ x < 5 \\end{cases}$",
    "options": [
      "$x > 5$",
      "$2 < x < 5$",
      "$x < 2$",
      "$x > 2$或$x < 5$"
    ],
    "correctAnswer": 1,
    "difficulty": 0.6,
    "discrimination": 1.2,
    "knowledgePoints": [
      "不等式"
    ],
    "category": "方程与不等式",
    "semester": "七年级下",
    "explanation": "求交集：同时满足$x > 2$和$x < 5$，即$2 < x < 5$。"
  },
  {
    "id": 57,
    "content": "一次函数$y = -x + 3$的斜率是？",
    "options": [
      "$3$",
      "$-3$",
      "$1$",
      "$-1$"
    ],
    "correctAnswer": 3,
    "difficulty": 0.3,
    "discrimination": 1.0,
    "knowledgePoints": [
      "一次函数"
    ],
    "category": "函数",
    "semester": "八年级下",
    "explanation": "一次函数的一般形式为$y = kx + b$，其中$k$是斜率。这里$k = -1$。"
  },
  {
    "id": 58,
    "content": "一次函数$y = 3x - 2$的图像与$y$轴的交点坐标是？",
    "options": [
      "$(2, 0)$",
      "$(-2, 0)$",
      "$(0, -2)$",
      "$(0, 2)$"
    ],
    "correctAnswer": 2,
    "difficulty": 0.4,
    "discrimination": 1.0,
    "knowledgePoints": [
      "一次函数"
    ],
    "category": "函数",
    "semester": "八年级下",
    "explanation": "与$y$轴交点，令$x=0$，得$y=-2$，所以交点为$(0, -2)$。"
  },
  {
    "id": 59,
    "content": "一次函数$y = 2x + 1$和$y = -x + 4$的交点坐标是？",
    "options": [
      "$(3, 7)$",
      "$(0, 1)$",
      "$(2, 5)$",
      "$(1, 3)$"
    ],
    "correctAnswer": 3,
    "difficulty": 1.0,
    "discrimination": 1.3,
    "knowledgePoints": [
      "一次函数"
    ],
    "category": "函数",
    "semester": "八年级下",
    "explanation": "联立方程：$2x+1 = -x+4$，解得$x=1$，代入得$y=3$，所以交点为$(1, 3)$。"
  },
  {
    "id": 60,
    "content": "一次函数$y = kx + b$的图像经过点$(2, 5)$和$(4, 9)$，则$k = ?$",
    "options": [
      "$3$",
      "$5$",
      "$4$",
      "$2$"
    ],
    "correctAnswer": 3,
    "difficulty": 1.1,
    "discrimination": 1.3,
    "knowledgePoints": [
      "一次函数"
    ],
    "category": "函数",
    "semester": "八年级下",
    "explanation": "斜率$k = \\frac{9-5}{4-2} = \\frac{4}{2} = 2$。"
  },
  {
    "id": 61,
    "content": "二次函数$y = x^2 - 6x + 5$的对称轴方程是？",
    "options": [
      "$x = 3$",
      "$x = -2$",
      "$x = 2$",
      "$x = -3$"
    ],
    "correctAnswer": 0,
    "difficulty": 1.0,
    "discrimination": 1.3,
    "knowledgePoints": [
      "二次函数"
    ],
    "category": "函数",
    "semester": "九年级上",
    "explanation": "对称轴$x = -\\frac{b}{2a} = -\\frac{-6}{2} = 3$。"
  },
  {
    "id": 62,
    "content": "二次函数$y = -2x^2 + 8x - 6$的开口方向是？",
    "options": [
      "无法确定",
      "向上",
      "水平",
      "向下"
    ],
    "correctAnswer": 3,
    "difficulty": 0.5,
    "discrimination": 1.1,
    "knowledgePoints": [
      "二次函数"
    ],
    "category": "函数",
    "semester": "九年级上",
    "explanation": "二次项系数$a = -2 < 0$，所以开口向下。"
  },
  {
    "id": 63,
    "content": "二次函数$y = x^2 - 2x - 3$的零点（与$x$轴交点）的横坐标是？",
    "options": [
      "$x_1=0, x_2=2$",
      "$x_1=-1, x_2=3$",
      "$x_1=-2, x_2=4$",
      "$x_1=1, x_2=-3$"
    ],
    "correctAnswer": 1,
    "difficulty": 0.9,
    "discrimination": 1.2,
    "knowledgePoints": [
      "二次函数"
    ],
    "category": "函数",
    "semester": "九年级上",
    "explanation": "令$y=0$：$x^2-2x-3=0$，因式分解得$(x+1)(x-3)=0$，所以$x_1=-1, x_2=3$。"
  },
  {
    "id": 64,
    "content": "二次函数$y = 2x^2 - 4x + 1$的最小值是？",
    "options": [
      "$2$",
      "$0$",
      "$-1$",
      "$1$"
    ],
    "correctAnswer": 2,
    "difficulty": 1.3,
    "discrimination": 1.4,
    "knowledgePoints": [
      "二次函数"
    ],
    "category": "函数",
    "semester": "九年级上",
    "explanation": "顶点横坐标$x = -\\frac{-4}{4} = 1$，最小值$y = 2-4+1 = -1$。"
  },
  {
    "id": 65,
    "content": "反比例函数$y = \\frac{-3}{x}$的图像在哪些象限？",
    "options": [
      "第二、四象限",
      "第一、二象限",
      "第一、三象限",
      "第三、四象限"
    ],
    "correctAnswer": 0,
    "difficulty": 0.9,
    "discrimination": 1.3,
    "knowledgePoints": [
      "反比例函数"
    ],
    "category": "函数",
    "semester": "八年级下",
    "explanation": "反比例函数$y = \\frac{k}{x}$（$k < 0$）的图像分布在第二、四象限。"
  },
  {
    "id": 66,
    "content": "反比例函数$y = \\frac{k}{x}$经过点$(3, 4)$，则$k = ?$",
    "options": [
      "$\\frac{3}{4}$",
      "$\\frac{4}{3}$",
      "$12$",
      "$7$"
    ],
    "correctAnswer": 2,
    "difficulty": 0.5,
    "discrimination": 1.1,
    "knowledgePoints": [
      "反比例函数"
    ],
    "category": "函数",
    "semester": "八年级下",
    "explanation": "将点$(3, 4)$代入得$4 = \\frac{k}{3}$，所以$k = 12$。"
  },
  {
    "id": 67,
    "content": "在$\\triangle ABC$中，$\\angle A = 50°$，$\\angle B = 70°$，则$\\angle C = ?$",
    "options": [
      "$70°$",
      "$50°$",
      "$80°$",
      "$60°$"
    ],
    "correctAnswer": 3,
    "difficulty": -1.1,
    "discrimination": 0.8,
    "knowledgePoints": [
      "三角形"
    ],
    "category": "图形的性质",
    "semester": "八年级下",
    "explanation": "三角形内角和为180°，所以$\\angle C = 180° - 50° - 70° = 60°$。"
  },
  {
    "id": 68,
    "content": "在$\\triangle ABC$中，$AB = 5$，$BC = 12$，$AC = 13$，则这个三角形是？",
    "options": [
      "无法确定",
      "直角三角形",
      "钝角三角形",
      "锐角三角形"
    ],
    "correctAnswer": 1,
    "difficulty": 0.8,
    "discrimination": 1.2,
    "knowledgePoints": [
      "三角形"
    ],
    "category": "图形的性质",
    "semester": "八年级下",
    "explanation": "因为$5^2+12^2=25+144=169=13^2$，满足勾股定理，所以是直角三角形。"
  },
  {
    "id": 69,
    "content": "等腰三角形的顶角是$80°$，则一个底角是？",
    "options": [
      "$60°$",
      "$70°$",
      "$50°$",
      "$80°$"
    ],
    "correctAnswer": 2,
    "difficulty": 0.3,
    "discrimination": 1.0,
    "knowledgePoints": [
      "三角形"
    ],
    "category": "图形的性质",
    "semester": "八年级下",
    "explanation": "等腰三角形两底角相等，设底角为$x$，则$80° + 2x = 180°$，所以$x = 50°$。"
  },
  {
    "id": 70,
    "content": "在$\\triangle ABC$中，$\\angle A = 90°$，$AB = 6$，$AC = 8$，则$BC = ?$",
    "options": [
      "$10$",
      "$14$",
      "$16$",
      "$12$"
    ],
    "correctAnswer": 0,
    "difficulty": 0.9,
    "discrimination": 1.3,
    "knowledgePoints": [
      "三角形"
    ],
    "category": "图形的性质",
    "semester": "八年级下",
    "explanation": "由勾股定理：$BC = \\sqrt{AB^2 + AC^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10$。"
  },
  {
    "id": 71,
    "content": "平行四边形的对角线具有什么性质？",
    "options": [
      "互相平分且相等",
      "互相垂直",
      "互相平分",
      "相等"
    ],
    "correctAnswer": 2,
    "difficulty": 0.4,
    "discrimination": 1.1,
    "knowledgePoints": [
      "四边形"
    ],
    "category": "图形的性质",
    "semester": "八年级下",
    "explanation": "平行四边形的对角线互相平分，但不一定相等或垂直。"
  },
  {
    "id": 72,
    "content": "菱形的对角线具有什么性质？",
    "options": [
      "互相平分但不垂直",
      "相等",
      "互相垂直平分",
      "没有特殊性质"
    ],
    "correctAnswer": 2,
    "difficulty": 0.6,
    "discrimination": 1.2,
    "knowledgePoints": [
      "四边形"
    ],
    "category": "图形的性质",
    "semester": "八年级下",
    "explanation": "菱形的对角线互相垂直平分。"
  },
  {
    "id": 73,
    "content": "正方形的对角线长度为$6\\sqrt{2}$，则边长为？",
    "options": [
      "$6$",
      "$3\\sqrt{2}$",
      "$6\\sqrt{2}$",
      "$12$"
    ],
    "correctAnswer": 0,
    "difficulty": 1.0,
    "discrimination": 1.3,
    "knowledgePoints": [
      "四边形"
    ],
    "category": "图形的性质",
    "semester": "八年级下",
    "explanation": "正方形对角线$d = a\\sqrt{2}$，所以$a = \\frac{d}{\\sqrt{2}} = \\frac{6\\sqrt{2}}{\\sqrt{2}} = 6$。"
  },
  {
    "id": 74,
    "content": "已知圆的半径为$r$，则圆的面积公式是？",
    "options": [
      "$\\pi r$",
      "$\\pi d^2$",
      "$2\\pi r$",
      "$\\pi r^2$"
    ],
    "correctAnswer": 3,
    "difficulty": -0.8,
    "discrimination": 0.8,
    "knowledgePoints": [
      "圆"
    ],
    "category": "图形的性质",
    "semester": "九年级下",
    "explanation": "圆的面积公式是$S = \\pi r^2$。"
  },
  {
    "id": 75,
    "content": "已知圆的半径为$4$cm，则圆的周长是？（取$\\pi = 3.14$）",
    "options": [
      "$50.24$ cm",
      "$25.12$ cm",
      "$16$ cm",
      "$12.56$ cm"
    ],
    "correctAnswer": 1,
    "difficulty": -0.5,
    "discrimination": 0.9,
    "knowledgePoints": [
      "圆"
    ],
    "category": "图形的性质",
    "semester": "九年级下",
    "explanation": "圆的周长$C = 2\\pi r = 2 \\times 3.14 \\times 4 = 25.12$ cm。"
  },
  {
    "id": 76,
    "content": "已知圆的面积为$25\\pi$，则半径是？",
    "options": [
      "$\\sqrt{25}$",
      "$25$",
      "$5$",
      "$10$"
    ],
    "correctAnswer": 2,
    "difficulty": 0.6,
    "discrimination": 1.1,
    "knowledgePoints": [
      "圆"
    ],
    "category": "图形的性质",
    "semester": "九年级下",
    "explanation": "由$\\pi r^2 = 25\\pi$，得$r^2 = 25$，所以$r = 5$。"
  },
  {
    "id": 77,
    "content": "在圆中，弦长等于半径的弦所对的圆心角是？",
    "options": [
      "$60°$",
      "$180°$",
      "$120°$",
      "$90°$"
    ],
    "correctAnswer": 0,
    "difficulty": 1.2,
    "discrimination": 1.4,
    "knowledgePoints": [
      "圆"
    ],
    "category": "图形的性质",
    "semester": "九年级下",
    "explanation": "弦长等于半径时，圆心角为$60°$（等边三角形的内角）。"
  },
  {
    "id": 78,
    "content": "一组数据：5, 7, 8, 9, 10的平均数是？",
    "options": [
      "$8.5$",
      "$8$",
      "$7.8$",
      "$9$"
    ],
    "correctAnswer": 2,
    "difficulty": -0.7,
    "discrimination": 0.9,
    "knowledgePoints": [
      "统计"
    ],
    "category": "统计与概率",
    "semester": "九年级下",
    "explanation": "平均数$\\bar{x} = \\frac{5+7+8+9+10}{5} = \\frac{39}{5} = 7.8$。"
  },
  {
    "id": 79,
    "content": "一组数据：2, 3, 4, 5, 6, 7的中位数是？",
    "options": [
      "$5.5$",
      "$4$",
      "$5$",
      "$4.5$"
    ],
    "correctAnswer": 3,
    "difficulty": 0.0,
    "discrimination": 1.0,
    "knowledgePoints": [
      "统计"
    ],
    "category": "统计与概率",
    "semester": "九年级下",
    "explanation": "数据个数为偶数，中位数是中间两个数的平均值：$\\frac{4+5}{2} = 4.5$。"
  },
  {
    "id": 80,
    "content": "一组数据：1, 2, 2, 3, 3, 3, 4的众数是？",
    "options": [
      "$2$和$3$",
      "没有众数",
      "$3$",
      "$2$"
    ],
    "correctAnswer": 2,
    "difficulty": 0.2,
    "discrimination": 1.0,
    "knowledgePoints": [
      "统计"
    ],
    "category": "统计与概率",
    "semester": "九年级下",
    "explanation": "数据中出现次数最多的是$3$（出现3次），所以众数是$3$。"
  },
  {
    "id": 81,
    "content": "一组数据的方差是$4$，则标准差是？",
    "options": [
      "$2$",
      "$4$",
      "$16$",
      "$\\sqrt{2}$"
    ],
    "correctAnswer": 0,
    "difficulty": 0.5,
    "discrimination": 1.1,
    "knowledgePoints": [
      "统计"
    ],
    "category": "统计与概率",
    "semester": "九年级下",
    "explanation": "标准差是方差的算术平方根：$\\sqrt{4} = 2$。"
  },
  {
    "id": 82,
    "content": "抛掷一枚骰子，出现奇数的概率是？",
    "options": [
      "$\\frac{1}{3}$",
      "$\\frac{1}{2}$",
      "$\\frac{2}{3}$",
      "$\\frac{1}{6}$"
    ],
    "correctAnswer": 1,
    "difficulty": -0.8,
    "discrimination": 0.9,
    "knowledgePoints": [
      "概率"
    ],
    "category": "统计与概率",
    "semester": "九年级下",
    "explanation": "骰子有6个面，奇数有3个（1, 3, 5），概率为$\\frac{3}{6} = \\frac{1}{2}$。"
  },
  {
    "id": 83,
    "content": "从1到10中随机选一个数，是3的倍数的概率是？",
    "options": [
      "$\\frac{1}{3}$",
      "$\\frac{3}{10}$",
      "$\\frac{2}{5}$",
      "$\\frac{1}{10}$"
    ],
    "correctAnswer": 1,
    "difficulty": 0.4,
    "discrimination": 1.1,
    "knowledgePoints": [
      "概率"
    ],
    "category": "统计与概率",
    "semester": "九年级下",
    "explanation": "1到10中，3的倍数有3个（3, 6, 9），概率为$\\frac{3}{10}$。"
  },
  {
    "id": 84,
    "content": "同时抛掷两枚硬币，至少有一个正面的概率是？",
    "options": [
      "$\\frac{3}{4}$",
      "$1$",
      "$\\frac{1}{4}$",
      "$\\frac{1}{2}$"
    ],
    "correctAnswer": 0,
    "difficulty": 0.8,
    "discrimination": 1.2,
    "knowledgePoints": [
      "概率"
    ],
    "category": "统计与概率",
    "semester": "九年级下",
    "explanation": "所有可能结果：（正，正）、（正，反）、（反，正）、（反，反）。至少一个正面的有3种，概率为$\\frac{3}{4}$。"
  },
  {
    "id": 85,
    "content": "从52张扑克牌中随机抽取一张，是红心的概率是？",
    "options": [
      "$\\frac{13}{52}$",
      "$\\frac{1}{13}$",
      "$\\frac{1}{4}$",
      "$\\frac{1}{52}$"
    ],
    "correctAnswer": 2,
    "difficulty": 0.6,
    "discrimination": 1.1,
    "knowledgePoints": [
      "概率"
    ],
    "category": "统计与概率",
    "semester": "九年级下",
    "explanation": "52张牌中红心有13张，概率为$\\frac{13}{52} = \\frac{1}{4}$。"
  },
  {
    "id": 86,
    "content": "下列关系中，$y$是$x$的函数的是？",
    "options": [
      "$|y| = x$",
      "$y^2 = x$",
      "$y = x^2$",
      "$x^2 + y^2 = 1$"
    ],
    "correctAnswer": 2,
    "difficulty": 0.3,
    "discrimination": 1.0,
    "knowledgePoints": [
      "函数概念"
    ],
    "category": "函数",
    "semester": "八年级下",
    "explanation": "函数要求对于每个$x$值，都有唯一的$y$值与之对应。$y = x^2$满足这个条件，是函数。"
  },
  {
    "id": 87,
    "content": "函数$f(x) = 2x + 1$，当$x = 3$时，$f(3) = ?$",
    "options": [
      "6",
      "8",
      "7",
      "5"
    ],
    "correctAnswer": 2,
    "difficulty": -0.5,
    "discrimination": 0.9,
    "knowledgePoints": [
      "函数概念"
    ],
    "category": "函数",
    "semester": "八年级下",
    "explanation": "将$x = 3$代入函数：$f(3) = 2 \\times 3 + 1 = 7$。"
  },
  {
    "id": 88,
    "content": "函数$y = \\frac{1}{x-1}$的自变量$x$的取值范围是？",
    "options": [
      "$x \\neq 0$",
      "$x > 1$",
      "$x \\neq 1$",
      "$x < 1$"
    ],
    "correctAnswer": 2,
    "difficulty": 0.5,
    "discrimination": 1.1,
    "knowledgePoints": [
      "函数概念"
    ],
    "category": "函数",
    "semester": "八年级下",
    "explanation": "分式的分母不能为0，所以$x - 1 \\neq 0$，即$x \\neq 1$。"
  },
  {
    "id": 89,
    "content": "下列哪个是函数的表示方法？",
    "options": [
      "解析式、图像、表格",
      "只有图像",
      "只有表格",
      "只有解析式"
    ],
    "correctAnswer": 0,
    "difficulty": -0.2,
    "discrimination": 0.8,
    "knowledgePoints": [
      "函数概念"
    ],
    "category": "函数",
    "semester": "八年级下",
    "explanation": "函数有三种表示方法：解析式法、图像法、列表法（表格法）。"
  },
  {
    "id": 90,
    "content": "函数$f(x) = x^2 - 4$，当$f(x) = 0$时，$x = ?$",
    "options": [
      "$x = 0$",
      "$x = 2$",
      "$x = \\pm 2$",
      "$x = -2$"
    ],
    "correctAnswer": 2,
    "difficulty": 0.4,
    "discrimination": 1.0,
    "knowledgePoints": [
      "函数概念"
    ],
    "category": "函数",
    "semester": "八年级下",
    "explanation": "令$f(x) = 0$：$x^2 - 4 = 0$，所以$x^2 = 4$，$x = \\pm 2$。"
  },
  {
    "id": 91,
    "content": "下列说法正确的是？",
    "options": [
      "线段可以无限延长",
      "两点确定一条直线",
      "射线没有端点",
      "两条直线一定相交"
    ],
    "correctAnswer": 1,
    "difficulty": -0.8,
    "discrimination": 0.9,
    "knowledgePoints": [
      "平面几何"
    ],
    "category": "图形的认识",
    "semester": "七年级下",
    "explanation": "基本事实：两点确定一条直线。平行线不相交，线段有端点，射线有一个端点。"
  },
  {
    "id": 92,
    "content": "在同一平面内，如果两条直线都垂直于同一条直线，则这两条直线？",
    "options": [
      "无法确定",
      "平行",
      "相交",
      "重合"
    ],
    "correctAnswer": 1,
    "difficulty": 0.2,
    "discrimination": 1.0,
    "knowledgePoints": [
      "平面几何"
    ],
    "category": "图形的认识",
    "semester": "七年级下",
    "explanation": "在同一平面内，如果两条直线都垂直于同一条直线，则这两条直线平行。"
  },
  {
    "id": 93,
    "content": "下列说法错误的是？",
    "options": [
      "角的大小可以用量角器测量",
      "角的大小与角的两边张开程度有关",
      "角的大小与边的长短无关",
      "角的大小与角的顶点位置有关"
    ],
    "correctAnswer": 3,
    "difficulty": 0.0,
    "discrimination": 0.9,
    "knowledgePoints": [
      "平面几何"
    ],
    "category": "图形的认识",
    "semester": "七年级下",
    "explanation": "角的大小只与角的两边张开程度有关，与边的长短和顶点位置无关。"
  },
  {
    "id": 94,
    "content": "下列数中，是无理数的是？",
    "options": [
      "$\\sqrt{9}$",
      "$\\sqrt{2}$",
      "$0.5$",
      "$\\frac{1}{3}$"
    ],
    "correctAnswer": 1,
    "difficulty": 0.3,
    "discrimination": 1.0,
    "knowledgePoints": [
      "实数"
    ],
    "category": "数与式",
    "semester": "七年级下",
    "explanation": "$\\sqrt{9} = 3$是有理数，$\\frac{1}{3}$和$0.5$是有理数，只有$\\sqrt{2}$是无理数。"
  },
  {
    "id": 95,
    "content": "实数$\\sqrt{3}$和$\\sqrt{5}$之间有多少个整数？",
    "options": [
      "1个",
      "0个",
      "3个",
      "2个"
    ],
    "correctAnswer": 0,
    "difficulty": 0.6,
    "discrimination": 1.1,
    "knowledgePoints": [
      "实数"
    ],
    "category": "数与式",
    "semester": "七年级下",
    "explanation": "$\\sqrt{3} \\approx 1.73$，$\\sqrt{5} \\approx 2.24$，所以它们之间有整数2，共1个。"
  },
  {
    "id": 96,
    "content": "若$|a| = 3$，则$a = ?$",
    "options": [
      "$3$",
      "$\\pm 3$",
      "$-3$",
      "$0$"
    ],
    "correctAnswer": 1,
    "difficulty": -0.3,
    "discrimination": 0.9,
    "knowledgePoints": [
      "实数"
    ],
    "category": "数与式",
    "semester": "七年级下",
    "explanation": "绝对值等于3的数有两个：$3$和$-3$，所以$a = \\pm 3$。"
  },
  {
    "id": 97,
    "content": "计算：$\\frac{x^2 + 2x + 1}{x + 1} = ?$（$x \\neq -1$）",
    "options": [
      "$x$",
      "$x + 1$",
      "$x - 1$",
      "$x^2 + 1$"
    ],
    "correctAnswer": 1,
    "difficulty": 0.4,
    "discrimination": 1.0,
    "knowledgePoints": [
      "分式"
    ],
    "category": "数与式",
    "semester": "七年级下",
    "explanation": "$\\frac{x^2 + 2x + 1}{x + 1} = \\frac{(x+1)^2}{x+1} = x + 1$（$x \\neq -1$）。"
  },
  {
    "id": 98,
    "content": "分式$\\frac{x-2}{x^2-4}$在什么条件下有意义？",
    "options": [
      "$x \\neq 0$",
      "$x \\neq \\pm 2$",
      "$x \\neq -2$",
      "$x \\neq 2$"
    ],
    "correctAnswer": 1,
    "difficulty": 0.5,
    "discrimination": 1.1,
    "knowledgePoints": [
      "分式"
    ],
    "category": "数与式",
    "semester": "七年级下",
    "explanation": "分母$x^2 - 4 = (x+2)(x-2) \\neq 0$，所以$x \\neq 2$且$x \\neq -2$，即$x \\neq \\pm 2$。"
  },
  {
    "id": 99,
    "content": "计算：$\\sqrt{18} - \\sqrt{8} = ?$",
    "options": [
      "$\\sqrt{10}$",
      "$\\sqrt{26}$",
      "$2\\sqrt{2}$",
      "$\\sqrt{2}$"
    ],
    "correctAnswer": 3,
    "difficulty": 0.7,
    "discrimination": 1.2,
    "knowledgePoints": [
      "二次根式"
    ],
    "category": "数与式",
    "semester": "八年级上",
    "explanation": "$\\sqrt{18} = 3\\sqrt{2}$，$\\sqrt{8} = 2\\sqrt{2}$，所以$\\sqrt{18} - \\sqrt{8} = 3\\sqrt{2} - 2\\sqrt{2} = \\sqrt{2}$。"
  },
  {
    "id": 100,
    "content": "化简：$\\sqrt{50} = ?$",
    "options": [
      "$10\\sqrt{5}$",
      "$25\\sqrt{2}$",
      "$5\\sqrt{10}$",
      "$5\\sqrt{2}$"
    ],
    "correctAnswer": 3,
    "difficulty": 0.5,
    "discrimination": 1.0,
    "knowledgePoints": [
      "二次根式"
    ],
    "category": "数与式",
    "semester": "八年级上",
    "explanation": "$\\sqrt{50} = \\sqrt{25 \\times 2} = 5\\sqrt{2}$。"
  },
  {
    "id": 101,
    "content": "解不等式：$3x - 2 \\geq 4$",
    "options": [
      "$x \\leq 3$",
      "$x \\geq 3$",
      "$x \\leq 2$",
      "$x \\geq 2$"
    ],
    "correctAnswer": 3,
    "difficulty": 0.3,
    "discrimination": 1.0,
    "knowledgePoints": [
      "不等式"
    ],
    "category": "方程与不等式",
    "semester": "七年级下",
    "explanation": "$3x - 2 \\geq 4$，移项得$3x \\geq 6$，所以$x \\geq 2$。"
  },
  {
    "id": 102,
    "content": "不等式组$\\begin{cases} x > 1 \\\\ x < 3 \\end{cases}$的解集是？",
    "options": [
      "$x > 1$或$x < 3$",
      "$1 < x < 3$",
      "$x < 1$",
      "$x > 3$"
    ],
    "correctAnswer": 1,
    "difficulty": 0.5,
    "discrimination": 1.1,
    "knowledgePoints": [
      "不等式"
    ],
    "category": "方程与不等式",
    "semester": "七年级下",
    "explanation": "求两个不等式的交集：同时满足$x > 1$和$x < 3$，即$1 < x < 3$。"
  },
  {
    "id": 103,
    "content": "反比例函数$y = \\frac{k}{x}$（$k \\neq 0$）的图像经过点$(2, 6)$，则$k = ?$",
    "options": [
      "8",
      "3",
      "12",
      "4"
    ],
    "correctAnswer": 2,
    "difficulty": 0.3,
    "discrimination": 1.0,
    "knowledgePoints": [
      "反比例函数"
    ],
    "category": "函数",
    "semester": "八年级下",
    "explanation": "将点$(2, 6)$代入：$6 = \\frac{k}{2}$，所以$k = 12$。"
  },
  {
    "id": 104,
    "content": "在$\\triangle ABC$中，$\\angle A = 30°$，$\\angle B = 60°$，则$\\angle C = ?$",
    "options": [
      "$30°$",
      "$120°$",
      "$90°$",
      "$60°$"
    ],
    "correctAnswer": 2,
    "difficulty": -0.5,
    "discrimination": 0.9,
    "knowledgePoints": [
      "三角形"
    ],
    "category": "图形的性质",
    "semester": "八年级下",
    "explanation": "三角形内角和为180°，所以$\\angle C = 180° - 30° - 60° = 90°$。"
  },
  {
    "id": 105,
    "content": "等边三角形的每个内角是？",
    "options": [
      "$60°$",
      "$120°$",
      "$90°$",
      "$45°$"
    ],
    "correctAnswer": 0,
    "difficulty": -0.3,
    "discrimination": 0.9,
    "knowledgePoints": [
      "三角形"
    ],
    "category": "图形的性质",
    "semester": "八年级下",
    "explanation": "等边三角形三个内角相等，每个角为$\\frac{180°}{3} = 60°$。"
  },
  {
    "id": 106,
    "content": "在$\\triangle ABC$中，$AB = 3$，$BC = 4$，$AC = 5$，则这个三角形是？",
    "options": [
      "无法确定",
      "锐角三角形",
      "钝角三角形",
      "直角三角形"
    ],
    "correctAnswer": 3,
    "difficulty": 0.7,
    "discrimination": 1.2,
    "knowledgePoints": [
      "三角形"
    ],
    "category": "图形的性质",
    "semester": "八年级下",
    "explanation": "因为$3^2+4^2=9+16=25=5^2$，满足勾股定理，所以是直角三角形。"
  },
  {
    "id": 107,
    "content": "在$\\triangle ABC$中，$\\angle A = 90°$，$AB = 8$，$BC = 10$，则$AC = ?$",
    "options": [
      "$18$",
      "$12$",
      "$2\\sqrt{41}$",
      "$6$"
    ],
    "correctAnswer": 3,
    "difficulty": 0.8,
    "discrimination": 1.2,
    "knowledgePoints": [
      "三角形"
    ],
    "category": "图形的性质",
    "semester": "八年级下",
    "explanation": "由勾股定理：$AC = \\sqrt{BC^2 - AB^2} = \\sqrt{100 - 64} = \\sqrt{36} = 6$。"
  },
  {
    "id": 108,
    "content": "等腰三角形的一个底角是$40°$，则顶角是？",
    "options": [
      "$60°$",
      "$80°$",
      "$40°$",
      "$100°$"
    ],
    "correctAnswer": 3,
    "difficulty": 0.4,
    "discrimination": 1.0,
    "knowledgePoints": [
      "三角形"
    ],
    "category": "图形的性质",
    "semester": "八年级下",
    "explanation": "等腰三角形两底角相等，设顶角为$x$，则$x + 2 \\times 40° = 180°$，所以$x = 100°$。"
  },
  {
    "id": 109,
    "content": "在$\\triangle ABC$中，$\\angle A = 45°$，$\\angle B = 45°$，则这个三角形是？",
    "options": [
      "等边三角形",
      "无法确定",
      "钝角三角形",
      "等腰直角三角形"
    ],
    "correctAnswer": 3,
    "difficulty": 0.6,
    "discrimination": 1.1,
    "knowledgePoints": [
      "三角形"
    ],
    "category": "图形的性质",
    "semester": "八年级下",
    "explanation": "因为$\\angle A = \\angle B = 45°$，所以$AB = AC$（等腰），且$\\angle C = 90°$（直角），所以是等腰直角三角形。"
  },
  {
    "id": 110,
    "content": "三角形的两边长分别为$5$和$8$，则第三边的长度范围是？",
    "options": [
      "$3 < x < 8$",
      "$3 < x < 13$",
      "$5 < x < 13$",
      "$5 < x < 8$"
    ],
    "correctAnswer": 1,
    "difficulty": 0.9,
    "discrimination": 1.3,
    "knowledgePoints": [
      "三角形"
    ],
    "category": "图形的性质",
    "semester": "八年级下",
    "explanation": "根据三角形三边关系：$8-5 < x < 8+5$，即$3 < x < 13$。"
  },
  {
    "id": 111,
    "content": "在$\\triangle ABC$中，$\\angle A = 70°$，$\\angle B = 50°$，则$\\angle C = ?$",
    "options": [
      "$80°$",
      "$50°$",
      "$70°$",
      "$60°$"
    ],
    "correctAnswer": 3,
    "difficulty": -0.8,
    "discrimination": 0.9,
    "knowledgePoints": [
      "三角形"
    ],
    "category": "图形的性质",
    "semester": "八年级下",
    "explanation": "三角形内角和为180°，所以$\\angle C = 180° - 70° - 50° = 60°$。"
  },
  {
    "id": 112,
    "content": "梯形的上底是$3$，下底是$7$，高是$4$，则面积是？",
    "options": [
      "$16$",
      "$24$",
      "$28$",
      "$20$"
    ],
    "correctAnswer": 3,
    "difficulty": 0.5,
    "discrimination": 1.1,
    "knowledgePoints": [
      "四边形"
    ],
    "category": "图形的性质",
    "semester": "八年级下",
    "explanation": "梯形面积公式：$S = \\frac{(上底+下底) \\times 高}{2} = \\frac{(3+7) \\times 4}{2} = 20$。"
  },
  {
    "id": 113,
    "content": "平行四边形的相邻两边长分别为$5$和$6$，夹角为$30°$，则面积是？",
    "options": [
      "$18$",
      "$15$",
      "$30$",
      "$12$"
    ],
    "correctAnswer": 1,
    "difficulty": 1.1,
    "discrimination": 1.3,
    "knowledgePoints": [
      "四边形"
    ],
    "category": "图形的性质",
    "semester": "八年级下",
    "explanation": "平行四边形面积$S = ab\\sin\\theta = 5 \\times 6 \\times \\sin 30° = 30 \\times \\frac{1}{2} = 15$。"
  },
  {
    "id": 114,
    "content": "矩形的长是$8$，宽是$6$，则对角线长度是？",
    "options": [
      "$12$",
      "$16$",
      "$14$",
      "$10$"
    ],
    "correctAnswer": 3,
    "difficulty": 0.7,
    "discrimination": 1.2,
    "knowledgePoints": [
      "四边形"
    ],
    "category": "图形的性质",
    "semester": "八年级下",
    "explanation": "矩形对角线$d = \\sqrt{a^2 + b^2} = \\sqrt{8^2 + 6^2} = \\sqrt{64 + 36} = \\sqrt{100} = 10$。"
  },
  {
    "id": 115,
    "content": "菱形的边长是$5$，一条对角线长是$6$，则另一条对角线长是？",
    "options": [
      "$6$",
      "$8$",
      "$12$",
      "$10$"
    ],
    "correctAnswer": 1,
    "difficulty": 1.0,
    "discrimination": 1.3,
    "knowledgePoints": [
      "四边形"
    ],
    "category": "图形的性质",
    "semester": "八年级下",
    "explanation": "菱形对角线互相垂直平分，设另一条对角线为$2x$，则$(\\frac{6}{2})^2 + x^2 = 5^2$，所以$x = 4$，另一条对角线为$8$。"
  },
  {
    "id": 116,
    "content": "正方形的边长是$a$，则对角线长度是？",
    "options": [
      "$2a$",
      "$\\frac{a\\sqrt{2}}{2}$",
      "$a\\sqrt{2}$",
      "$a\\sqrt{3}$"
    ],
    "correctAnswer": 2,
    "difficulty": 0.8,
    "discrimination": 1.2,
    "knowledgePoints": [
      "四边形"
    ],
    "category": "图形的性质",
    "semester": "八年级下",
    "explanation": "正方形对角线$d = a\\sqrt{2}$（由勾股定理：$d^2 = a^2 + a^2 = 2a^2$）。"
  },
  {
    "id": 117,
    "content": "平行四边形的对边具有什么性质？",
    "options": [
      "平行且相等",
      "既不平行也不相等",
      "只平行",
      "只相等"
    ],
    "correctAnswer": 0,
    "difficulty": 0.2,
    "discrimination": 1.0,
    "knowledgePoints": [
      "四边形"
    ],
    "category": "图形的性质",
    "semester": "八年级下",
    "explanation": "平行四边形的对边平行且相等，这是平行四边形的基本性质。"
  },
  {
    "id": 118,
    "content": "矩形的四个角都是？",
    "options": [
      "锐角",
      "钝角",
      "直角",
      "无法确定"
    ],
    "correctAnswer": 2,
    "difficulty": -0.5,
    "discrimination": 0.9,
    "knowledgePoints": [
      "四边形"
    ],
    "category": "图形的性质",
    "semester": "八年级下",
    "explanation": "矩形的定义就是四个角都是直角的平行四边形。"
  },
  {
    "id": 119,
    "content": "梯形的中位线长度等于？",
    "options": [
      "上下底和",
      "上下底差的一半",
      "上下底差",
      "上下底和的一半"
    ],
    "correctAnswer": 3,
    "difficulty": 0.7,
    "discrimination": 1.2,
    "knowledgePoints": [
      "四边形"
    ],
    "category": "图形的性质",
    "semester": "八年级下",
    "explanation": "梯形的中位线长度等于上下底和的一半，即$m = \\frac{a+b}{2}$。"
  },
  {
    "id": 120,
    "content": "已知圆的半径为$r$，则圆的周长公式是？",
    "options": [
      "$\\pi d$",
      "$\\pi r$",
      "$\\pi r^2$",
      "$2\\pi r$"
    ],
    "correctAnswer": 3,
    "difficulty": -0.7,
    "discrimination": 0.9,
    "knowledgePoints": [
      "圆"
    ],
    "category": "图形的性质",
    "semester": "九年级下",
    "explanation": "圆的周长公式是$C = 2\\pi r$。"
  },
  {
    "id": 121,
    "content": "已知圆的直径为$d$，则圆的面积是？",
    "options": [
      "$\\pi d^2$",
      "$\\frac{\\pi d^2}{4}$",
      "$2\\pi d$",
      "$\\frac{\\pi d}{2}$"
    ],
    "correctAnswer": 1,
    "difficulty": 0.6,
    "discrimination": 1.1,
    "knowledgePoints": [
      "圆"
    ],
    "category": "图形的性质",
    "semester": "九年级下",
    "explanation": "半径$r = \\frac{d}{2}$，所以面积$S = \\pi r^2 = \\pi (\\frac{d}{2})^2 = \\frac{\\pi d^2}{4}$。"
  },
  {
    "id": 122,
    "content": "在圆中，圆心角为$90°$的扇形面积是圆面积的？",
    "options": [
      "$\\frac{1}{2}$",
      "$\\frac{1}{3}$",
      "$\\frac{2}{3}$",
      "$\\frac{1}{4}$"
    ],
    "correctAnswer": 3,
    "difficulty": 0.4,
    "discrimination": 1.0,
    "knowledgePoints": [
      "圆"
    ],
    "category": "图形的性质",
    "semester": "九年级下",
    "explanation": "圆心角为$90°$，占整个圆（$360°$）的$\\frac{90}{360} = \\frac{1}{4}$。"
  },
  {
    "id": 123,
    "content": "在圆中，弦长等于直径的弦所对的圆心角是？",
    "options": [
      "$120°$",
      "$60°$",
      "$90°$",
      "$180°$"
    ],
    "correctAnswer": 3,
    "difficulty": 0.8,
    "discrimination": 1.2,
    "knowledgePoints": [
      "圆"
    ],
    "category": "图形的性质",
    "semester": "九年级下",
    "explanation": "弦长等于直径时，这条弦就是直径，所对的圆心角为$180°$（平角）。"
  },
  {
    "id": 124,
    "content": "已知圆的周长为$12\\pi$，则半径是？",
    "options": [
      "$24$",
      "$3$",
      "$12$",
      "$6$"
    ],
    "correctAnswer": 3,
    "difficulty": 0.5,
    "discrimination": 1.1,
    "knowledgePoints": [
      "圆"
    ],
    "category": "图形的性质",
    "semester": "九年级下",
    "explanation": "由$2\\pi r = 12\\pi$，得$r = 6$。"
  },
  {
    "id": 125,
    "content": "在圆中，圆周角等于所对圆心角的？",
    "options": [
      "相等",
      "一半",
      "两倍",
      "无法确定"
    ],
    "correctAnswer": 1,
    "difficulty": 1.0,
    "discrimination": 1.3,
    "knowledgePoints": [
      "圆"
    ],
    "category": "图形的性质",
    "semester": "九年级下",
    "explanation": "圆周角定理：同弧所对的圆周角等于圆心角的一半。"
  },
  {
    "id": 126,
    "content": "已知扇形的半径为$6$，圆心角为$60°$，则扇形的面积是？（取$\\pi = 3.14$）",
    "options": [
      "$37.68$",
      "$56.52$",
      "$9.42$",
      "$18.84$"
    ],
    "correctAnswer": 3,
    "difficulty": 0.9,
    "discrimination": 1.2,
    "knowledgePoints": [
      "圆"
    ],
    "category": "图形的性质",
    "semester": "九年级下",
    "explanation": "扇形面积$S = \\frac{n}{360} \\times \\pi r^2 = \\frac{60}{360} \\times 3.14 \\times 36 = \\frac{1}{6} \\times 113.04 = 18.84$。"
  },
  {
    "id": 127,
    "content": "在圆中，垂直于弦的直径会？",
    "options": [
      "无法确定",
      "与弦重合",
      "与弦平行",
      "平分这条弦"
    ],
    "correctAnswer": 3,
    "difficulty": 0.7,
    "discrimination": 1.2,
    "knowledgePoints": [
      "圆"
    ],
    "category": "图形的性质",
    "semester": "九年级下",
    "explanation": "垂径定理：垂直于弦的直径平分这条弦，并且平分弦所对的两条弧。"
  },
  {
    "id": 128,
    "content": "两条直线相交，形成的对顶角具有什么性质？",
    "options": [
      "相等",
      "互余",
      "互补",
      "无法确定"
    ],
    "correctAnswer": 0,
    "difficulty": 0.3,
    "discrimination": 1.0,
    "knowledgePoints": [
      "平面几何"
    ],
    "category": "图形的认识",
    "semester": "七年级下",
    "explanation": "对顶角相等，这是平面几何的基本性质。"
  },
  {
    "id": 129,
    "content": "两条平行线被第三条直线所截，同位角具有什么性质？",
    "options": [
      "无法确定",
      "相等",
      "互余",
      "互补"
    ],
    "correctAnswer": 1,
    "difficulty": 0.4,
    "discrimination": 1.0,
    "knowledgePoints": [
      "平面几何"
    ],
    "category": "图形的认识",
    "semester": "七年级下",
    "explanation": "平行线的性质：两直线平行，同位角相等。"
  },
  {
    "id": 130,
    "content": "两条平行线被第三条直线所截，同旁内角具有什么性质？",
    "options": [
      "相等",
      "无法确定",
      "互补",
      "互余"
    ],
    "correctAnswer": 2,
    "difficulty": 0.5,
    "discrimination": 1.1,
    "knowledgePoints": [
      "平面几何"
    ],
    "category": "图形的认识",
    "semester": "七年级下",
    "explanation": "平行线的性质：两直线平行，同旁内角互补（和为$180°$）。"
  },
  {
    "id": 131,
    "content": "一个角的补角比这个角大$30°$，则这个角是？",
    "options": [
      "$90°$",
      "$45°$",
      "$75°$",
      "$60°$"
    ],
    "correctAnswer": 2,
    "difficulty": 0.8,
    "discrimination": 1.2,
    "knowledgePoints": [
      "平面几何"
    ],
    "category": "图形的认识",
    "semester": "七年级下",
    "explanation": "设这个角为$x$，则补角为$180°-x$，由题意：$(180°-x) - x = 30°$，解得$x = 75°$。"
  },
  {
    "id": 132,
    "content": "一个角的余角是$35°$，则这个角是？",
    "options": [
      "$55°$",
      "$35°$",
      "$65°$",
      "$45°$"
    ],
    "correctAnswer": 0,
    "difficulty": 0.3,
    "discrimination": 1.0,
    "knowledgePoints": [
      "平面几何"
    ],
    "category": "图形的认识",
    "semester": "七年级下",
    "explanation": "如果两个角的和是$90°$，则这两个角互为余角。设这个角为$x$，则$x + 35° = 90°$，所以$x = 55°$。"
  },
  {
    "id": 133,
    "content": "在同一平面内，过直线外一点可以作几条直线与已知直线平行？",
    "options": [
      "0条",
      "2条",
      "无数条",
      "1条"
    ],
    "correctAnswer": 3,
    "difficulty": 0.2,
    "discrimination": 1.0,
    "knowledgePoints": [
      "平面几何"
    ],
    "category": "图形的认识",
    "semester": "七年级下",
    "explanation": "平行公理：过直线外一点，有且只有一条直线与已知直线平行。"
  },
  {
    "id": 134,
    "content": "如果两个角的两边分别平行，且其中一个角是$50°$，则另一个角是？",
    "options": [
      "无法确定",
      "$50°$或$130°$",
      "$130°$",
      "$50°$"
    ],
    "correctAnswer": 1,
    "difficulty": 1.1,
    "discrimination": 1.3,
    "knowledgePoints": [
      "平面几何"
    ],
    "category": "图形的认识",
    "semester": "七年级下",
    "explanation": "如果两个角的两边分别平行，则这两个角相等或互补。所以另一个角是$50°$或$130°$。"
  },
  {
    "id": 135,
    "content": "在平面内，如果两条直线都平行于第三条直线，则这两条直线？",
    "options": [
      "相交",
      "重合",
      "无法确定",
      "互相平行"
    ],
    "correctAnswer": 3,
    "difficulty": 0.3,
    "discrimination": 1.0,
    "knowledgePoints": [
      "平面几何"
    ],
    "category": "图形的认识",
    "semester": "七年级下",
    "explanation": "平行线的传递性：如果两条直线都平行于第三条直线，则这两条直线互相平行。"
  },
  {
    "id": 136,
    "content": "一个角的邻补角是？",
    "options": [
      "无法确定",
      "与这个角互余的角",
      "与这个角相邻且互补的角",
      "与这个角相等的角"
    ],
    "correctAnswer": 2,
    "difficulty": 0.4,
    "discrimination": 1.0,
    "knowledgePoints": [
      "平面几何"
    ],
    "category": "图形的认识",
    "semester": "七年级下",
    "explanation": "邻补角是指两个角有一条公共边，另一条边互为反向延长线，且这两个角的和是$180°$。"
  },
  {
    "id": 137,
    "content": "如果$\\angle A$和$\\angle B$互为补角，且$\\angle A = 60°$，则$\\angle B = ?$",
    "options": [
      "$30°$",
      "$90°$",
      "$120°$",
      "$60°$"
    ],
    "correctAnswer": 2,
    "difficulty": -0.5,
    "discrimination": 0.9,
    "knowledgePoints": [
      "平面几何"
    ],
    "category": "图形的认识",
    "semester": "七年级下",
    "explanation": "如果两个角的和是$180°$，则这两个角互为补角。所以$\\angle B = 180° - 60° = 120°$。"
  },
  {
    "id": 138,
    "content": "如果$\\angle 1$和$\\angle 2$互为余角，$\\angle 1 = 25°$，则$\\angle 2 = ?$",
    "options": [
      "$45°$",
      "$65°$",
      "$75°$",
      "$55°$"
    ],
    "correctAnswer": 1,
    "difficulty": -0.4,
    "discrimination": 0.9,
    "knowledgePoints": [
      "平面几何"
    ],
    "category": "图形的认识",
    "semester": "七年级下",
    "explanation": "如果两个角的和是$90°$，则这两个角互为余角。所以$\\angle 2 = 90° - 25° = 65°$。"
  },
  {
    "id": 139,
    "content": "用字母表示数：如果$a$表示一个数，则$a$的3倍可以表示为？",
    "options": [
      "$a^3$",
      "$3a$",
      "$\\frac{a}{3}$",
      "$a+3$"
    ],
    "correctAnswer": 1,
    "difficulty": -0.8,
    "discrimination": 0.9,
    "knowledgePoints": [
      "整式"
    ],
    "category": "数与式",
    "semester": "七年级上",
    "explanation": "用字母表示数时，$a$的3倍就是$3 \\times a$，通常写作$3a$。"
  },
  {
    "id": 140,
    "content": "用字母表示数：如果$m$表示一个数，则比$m$大5的数可以表示为？",
    "options": [
      "$m-5$",
      "$\\frac{m}{5}$",
      "$5m$",
      "$m+5$"
    ],
    "correctAnswer": 3,
    "difficulty": -0.7,
    "discrimination": 0.9,
    "knowledgePoints": [
      "整式"
    ],
    "category": "数与式",
    "semester": "七年级上",
    "explanation": "比$m$大5，就是$m$加上5，表示为$m+5$。"
  },
  {
    "id": 141,
    "content": "用字母表示数：如果$n$表示一个偶数，则下一个偶数可以表示为？",
    "options": [
      "$n+1$",
      "$2n$",
      "$n^2$",
      "$n+2$"
    ],
    "correctAnswer": 3,
    "difficulty": 0.2,
    "discrimination": 1.0,
    "knowledgePoints": [
      "整式"
    ],
    "category": "数与式",
    "semester": "七年级上",
    "explanation": "相邻的两个偶数相差2，所以下一个偶数是$n+2$。"
  },
  {
    "id": 142,
    "content": "用字母表示数：如果$x$表示一个数，则$x$的平方与3的和可以表示为？",
    "options": [
      "$(x+3)^2$",
      "$x^2+3$",
      "$x^2+3x$",
      "$2x+3$"
    ],
    "correctAnswer": 1,
    "difficulty": 0.0,
    "discrimination": 1.0,
    "knowledgePoints": [
      "整式"
    ],
    "category": "数与式",
    "semester": "七年级上",
    "explanation": "$x$的平方是$x^2$，与3的和就是$x^2+3$。"
  },
  {
    "id": 143,
    "content": "已知圆柱的底面半径为$r$，高为$h$，则圆柱的体积公式是？",
    "options": [
      "$\\pi r h$",
      "$2\\pi r h$",
      "$\\pi r^2 h$",
      "$\\frac{1}{3}\\pi r^2 h$"
    ],
    "correctAnswer": 2,
    "difficulty": 0.5,
    "discrimination": 1.1,
    "knowledgePoints": [
      "立体几何"
    ],
    "category": "图形的性质",
    "semester": "九年级下",
    "explanation": "圆柱的体积等于底面积乘以高，底面积是$\\pi r^2$，所以体积$V = \\pi r^2 h$。"
  },
  {
    "id": 144,
    "content": "已知圆柱的底面半径为$3$cm，高为$5$cm，则圆柱的体积是？（取$\\pi = 3.14$）",
    "options": [
      "$28.26$ cm³",
      "$47.1$ cm³",
      "$141.3$ cm³",
      "$94.2$ cm³"
    ],
    "correctAnswer": 2,
    "difficulty": 0.6,
    "discrimination": 1.1,
    "knowledgePoints": [
      "立体几何"
    ],
    "category": "图形的性质",
    "semester": "九年级下",
    "explanation": "圆柱体积$V = \\pi r^2 h = 3.14 \\times 3^2 \\times 5 = 3.14 \\times 9 \\times 5 = 141.3$ cm³。"
  },
  {
    "id": 145,
    "content": "已知圆锥的底面半径为$r$，高为$h$，则圆锥的体积公式是？",
    "options": [
      "$\\frac{1}{2}\\pi r^2 h$",
      "$\\pi r^2 h$",
      "$\\pi r h$",
      "$\\frac{1}{3}\\pi r^2 h$"
    ],
    "correctAnswer": 3,
    "difficulty": 0.7,
    "discrimination": 1.2,
    "knowledgePoints": [
      "立体几何"
    ],
    "category": "图形的性质",
    "semester": "九年级下",
    "explanation": "圆锥的体积等于同底等高的圆柱体积的三分之一，所以$V = \\frac{1}{3}\\pi r^2 h$。"
  },
  {
    "id": 146,
    "content": "已知圆锥的底面半径为$4$cm，高为$6$cm，则圆锥的体积是？（取$\\pi = 3.14$）",
    "options": [
      "$100.48$ cm³",
      "$50.24$ cm³",
      "$150.72$ cm³",
      "$75.36$ cm³"
    ],
    "correctAnswer": 0,
    "difficulty": 0.8,
    "discrimination": 1.2,
    "knowledgePoints": [
      "立体几何"
    ],
    "category": "图形的性质",
    "semester": "九年级下",
    "explanation": "圆锥体积$V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3} \\times 3.14 \\times 4^2 \\times 6 = \\frac{1}{3} \\times 3.14 \\times 16 \\times 6 = 100.48$ cm³。"
  },
  {
    "id": 147,
    "content": "已知圆柱的底面半径为$r$，高为$h$，则圆柱的侧面积公式是？",
    "options": [
      "$\\pi r^2 h$",
      "$\\pi r h$",
      "$2\\pi r h$",
      "$2\\pi r^2$"
    ],
    "correctAnswer": 2,
    "difficulty": 0.6,
    "discrimination": 1.1,
    "knowledgePoints": [
      "立体几何"
    ],
    "category": "图形的性质",
    "semester": "九年级下",
    "explanation": "圆柱的侧面展开是一个矩形，长是底面周长$2\\pi r$，宽是高$h$，所以侧面积$S = 2\\pi r h$。"
  },
  {
    "id": 148,
    "content": "已知圆锥的底面半径为$r$，母线长为$l$，则圆锥的侧面积公式是？",
    "options": [
      "$\\frac{1}{2}\\pi r l$",
      "$\\pi r^2$",
      "$\\pi r l$",
      "$2\\pi r l$"
    ],
    "correctAnswer": 2,
    "difficulty": 0.9,
    "discrimination": 1.3,
    "knowledgePoints": [
      "立体几何"
    ],
    "category": "图形的性质",
    "semester": "九年级下",
    "explanation": "圆锥的侧面展开是扇形，扇形面积$S = \\frac{1}{2} \\times 弧长 \\times 半径 = \\frac{1}{2} \\times 2\\pi r \\times l = \\pi r l$。"
  },
  {
    "id": 149,
    "content": "在平行投影中，如果投影线垂直于投影面，这种投影叫做？",
    "options": [
      "透视投影",
      "斜投影",
      "正投影",
      "中心投影"
    ],
    "correctAnswer": 2,
    "difficulty": 0.4,
    "discrimination": 1.0,
    "knowledgePoints": [
      "投影与透视"
    ],
    "category": "图形的认识",
    "semester": "九年级下",
    "explanation": "当投影线垂直于投影面时，这种投影叫做正投影。"
  },
  {
    "id": 150,
    "content": "在中心投影中，投影线都经过？",
    "options": [
      "互相平行",
      "一个平面",
      "一条直线",
      "一个点（投影中心）"
    ],
    "correctAnswer": 3,
    "difficulty": 0.5,
    "discrimination": 1.1,
    "knowledgePoints": [
      "投影与透视"
    ],
    "category": "图形的认识",
    "semester": "九年级下",
    "explanation": "中心投影的特点是所有投影线都经过一个点，这个点叫做投影中心。"
  },
  {
    "id": 151,
    "content": "在平行投影中，投影线之间的关系是？",
    "options": [
      "无法确定",
      "互相平行",
      "互相垂直",
      "都经过一点"
    ],
    "correctAnswer": 1,
    "difficulty": 0.3,
    "discrimination": 1.0,
    "knowledgePoints": [
      "投影与透视"
    ],
    "category": "图形的认识",
    "semester": "九年级下",
    "explanation": "平行投影的特点是所有投影线互相平行。"
  },
  {
    "id": 152,
    "content": "透视投影属于哪种投影类型？",
    "options": [
      "中心投影",
      "平行投影",
      "正投影",
      "斜投影"
    ],
    "correctAnswer": 0,
    "difficulty": 0.6,
    "discrimination": 1.1,
    "knowledgePoints": [
      "投影与透视"
    ],
    "category": "图形的认识",
    "semester": "九年级下",
    "explanation": "透视投影是中心投影的一种，所有投影线都经过一个投影中心。"
  },
  {
    "id": 153,
    "content": "一组数据：1, 2, 3, 4, 5, 6, 7, 8, 9, 10，这组数据的第一四分位数（Q1）是？",
    "options": [
      "$4$",
      "$3$",
      "$5$",
      "$3.5$"
    ],
    "correctAnswer": 3,
    "difficulty": 0.8,
    "discrimination": 1.2,
    "knowledgePoints": [
      "统计"
    ],
    "category": "统计与概率",
    "semester": "九年级下",
    "explanation": "第一四分位数（Q1）是将数据分成四等份的第一个分位点。对于10个数据，Q1是第2.5个位置的值，即$(3+4)/2 = 3.5$。"
  },
  {
    "id": 154,
    "content": "一组数据：2, 4, 6, 8, 10, 12, 14, 16，这组数据的中位数（第二四分位数Q2）是？",
    "options": [
      "$10$",
      "$8$",
      "$12$",
      "$9$"
    ],
    "correctAnswer": 3,
    "difficulty": 0.5,
    "discrimination": 1.1,
    "knowledgePoints": [
      "统计"
    ],
    "category": "统计与概率",
    "semester": "九年级下",
    "explanation": "中位数就是第二四分位数（Q2）。8个数据的中位数是第4和第5个数据的平均值：$(8+10)/2 = 9$。"
  },
  {
    "id": 155,
    "content": "一组数据：1, 3, 5, 7, 9, 11, 13, 15, 17, 19，这组数据的第三四分位数（Q3）是？",
    "options": [
      "$14$",
      "$16$",
      "$15$",
      "$13$"
    ],
    "correctAnswer": 0,
    "difficulty": 0.9,
    "discrimination": 1.3,
    "knowledgePoints": [
      "统计"
    ],
    "category": "统计与概率",
    "semester": "九年级下",
    "explanation": "第三四分位数（Q3）是将数据分成四等份的第三个分位点。对于10个数据，Q3是第7.5个位置的值，即$(13+15)/2 = 14$。"
  },
  {
    "id": 156,
    "content": "四分位距（IQR）等于？",
    "options": [
      "Q2 - Q1",
      "最大值 - 最小值",
      "Q3 - Q1",
      "Q3 - Q2"
    ],
    "correctAnswer": 2,
    "difficulty": 0.7,
    "discrimination": 1.2,
    "knowledgePoints": [
      "统计"
    ],
    "category": "统计与概率",
    "semester": "九年级下",
    "explanation": "四分位距（IQR）是第三四分位数与第一四分位数的差，即$IQR = Q_3 - Q_1$。"
  },
  {
    "id": 157,
    "content": "箱线图（箱形图）中，箱子的上边界表示？",
    "options": [
      "中位数",
      "第一四分位数（Q1）",
      "最大值",
      "第三四分位数（Q3）"
    ],
    "correctAnswer": 3,
    "difficulty": 0.6,
    "discrimination": 1.1,
    "knowledgePoints": [
      "统计"
    ],
    "category": "统计与概率",
    "semester": "九年级下",
    "explanation": "箱线图中，箱子的上边界表示第三四分位数（Q3），下边界表示第一四分位数（Q1）。"
  },
  {
    "id": 158,
    "content": "箱线图中，箱子内的线表示？",
    "options": [
      "四分位距",
      "众数",
      "中位数（Q2）",
      "平均数"
    ],
    "correctAnswer": 2,
    "difficulty": 0.5,
    "discrimination": 1.0,
    "knowledgePoints": [
      "统计"
    ],
    "category": "统计与概率",
    "semester": "九年级下",
    "explanation": "箱线图中，箱子内的线表示中位数（第二四分位数Q2）。"
  },
  {
    "id": 159,
    "content": "箱线图中，从箱子延伸出的\"须\"表示？",
    "options": [
      "数据的分布范围（通常到1.5倍IQR）",
      "四分位距",
      "最大值和最小值",
      "异常值"
    ],
    "correctAnswer": 0,
    "difficulty": 0.8,
    "discrimination": 1.2,
    "knowledgePoints": [
      "统计"
    ],
    "category": "统计与概率",
    "semester": "九年级下",
    "explanation": "箱线图中，从箱子延伸出的\"须\"通常延伸到$Q_1 - 1.5 \\times IQR$和$Q_3 + 1.5 \\times IQR$，表示数据的分布范围。"
  },
  {
    "id": 160,
    "content": "为了了解全校学生的身高情况，从每个年级随机抽取50名学生进行调查，这种调查方法叫做？",
    "options": [
      "抽样调查",
      "重点调查",
      "全面调查",
      "典型调查"
    ],
    "correctAnswer": 0,
    "difficulty": 0.3,
    "discrimination": 1.0,
    "knowledgePoints": [
      "统计"
    ],
    "category": "统计与概率",
    "semester": "九年级下",
    "explanation": "从总体中抽取一部分个体进行调查，这种方法叫做抽样调查。"
  },
  {
    "id": 161,
    "content": "为了确保样本具有代表性，抽样时应该？",
    "options": [
      "只选择某个班级",
      "只选择自愿参加的学生",
      "随机抽样",
      "只选择成绩好的学生"
    ],
    "correctAnswer": 2,
    "difficulty": 0.4,
    "discrimination": 1.0,
    "knowledgePoints": [
      "统计"
    ],
    "category": "统计与概率",
    "semester": "九年级下",
    "explanation": "为了确保样本具有代表性，应该采用随机抽样的方法，使每个个体被选中的机会相等。"
  },
  {
    "id": 162,
    "content": "样本容量是指？",
    "options": [
      "样本中个体的数量",
      "总体中个体的数量",
      "抽样的次数",
      "调查的项目数"
    ],
    "correctAnswer": 0,
    "difficulty": 0.2,
    "discrimination": 0.9,
    "knowledgePoints": [
      "统计"
    ],
    "category": "统计与概率",
    "semester": "九年级下",
    "explanation": "样本容量是指样本中包含的个体数量。"
  },
  {
    "id": 163,
    "content": "在数据分析中，如果样本容量越大，则？",
    "options": [
      "无法确定",
      "没有影响",
      "样本对总体的代表性越好",
      "样本对总体的代表性越差"
    ],
    "correctAnswer": 2,
    "difficulty": 0.5,
    "discrimination": 1.1,
    "knowledgePoints": [
      "统计"
    ],
    "category": "统计与概率",
    "semester": "九年级下",
    "explanation": "一般来说，样本容量越大，样本对总体的代表性越好，调查结果越可靠。"
  },
  {
    "id": 164,
    "content": "分层抽样适用于？",
    "options": [
      "所有情况",
      "总体很大但很均匀",
      "总体很小",
      "总体可以分成几个有明显差异的部分"
    ],
    "correctAnswer": 3,
    "difficulty": 0.7,
    "discrimination": 1.2,
    "knowledgePoints": [
      "统计"
    ],
    "category": "统计与概率",
    "semester": "九年级下",
    "explanation": "分层抽样适用于总体可以分成几个有明显差异的部分（层）的情况，从每一层中按比例抽取样本。"
  },
  {
    "id": 165,
    "content": "计算：$\\sqrt{20} = ?$",
    "options": [
      "$5\\sqrt{2}$",
      "$10\\sqrt{2}$",
      "$2\\sqrt{5}$",
      "$4\\sqrt{5}$"
    ],
    "correctAnswer": 2,
    "difficulty": 0.5,
    "discrimination": 1.1,
    "knowledgePoints": [
      "二次根式"
    ],
    "category": "数与式",
    "semester": "八年级上",
    "explanation": "$\\sqrt{20} = \\sqrt{4 \\times 5} = 2\\sqrt{5}$。"
  },
  {
    "id": 166,
    "content": "计算：$\\sqrt{32} = ?$",
    "options": [
      "$16\\sqrt{2}$",
      "$8\\sqrt{2}$",
      "$2\\sqrt{8}$",
      "$4\\sqrt{2}$"
    ],
    "correctAnswer": 3,
    "difficulty": 0.6,
    "discrimination": 1.1,
    "knowledgePoints": [
      "二次根式"
    ],
    "category": "数与式",
    "semester": "八年级上",
    "explanation": "$\\sqrt{32} = \\sqrt{16 \\times 2} = 4\\sqrt{2}$。"
  },
  {
    "id": 167,
    "content": "计算：$\\sqrt{45} = ?$",
    "options": [
      "$9\\sqrt{5}$",
      "$3\\sqrt{5}$",
      "$15\\sqrt{3}$",
      "$5\\sqrt{3}$"
    ],
    "correctAnswer": 1,
    "difficulty": 0.6,
    "discrimination": 1.1,
    "knowledgePoints": [
      "二次根式"
    ],
    "category": "数与式",
    "semester": "八年级上",
    "explanation": "$\\sqrt{45} = \\sqrt{9 \\times 5} = 3\\sqrt{5}$。"
  },
  {
    "id": 168,
    "content": "计算：$\\sqrt{75} = ?$",
    "options": [
      "$25\\sqrt{3}$",
      "$5\\sqrt{3}$",
      "$3\\sqrt{5}$",
      "$15\\sqrt{5}$"
    ],
    "correctAnswer": 1,
    "difficulty": 0.7,
    "discrimination": 1.2,
    "knowledgePoints": [
      "二次根式"
    ],
    "category": "数与式",
    "semester": "八年级上",
    "explanation": "$\\sqrt{75} = \\sqrt{25 \\times 3} = 5\\sqrt{3}$。"
  },
  {
    "id": 169,
    "content": "计算：$\\sqrt{98} = ?$",
    "options": [
      "$2\\sqrt{7}$",
      "$49\\sqrt{2}$",
      "$14\\sqrt{2}$",
      "$7\\sqrt{2}$"
    ],
    "correctAnswer": 3,
    "difficulty": 0.7,
    "discrimination": 1.2,
    "knowledgePoints": [
      "二次根式"
    ],
    "category": "数与式",
    "semester": "八年级上",
    "explanation": "$\\sqrt{98} = \\sqrt{49 \\times 2} = 7\\sqrt{2}$。"
  },
  {
    "id": 170,
    "content": "计算：$\\sqrt{3} \\times \\sqrt{12} = ?$",
    "options": [
      "$\\sqrt{15}$",
      "$\\sqrt{36}$",
      "$6$",
      "$15$"
    ],
    "correctAnswer": 2,
    "difficulty": 0.6,
    "discrimination": 1.1,
    "knowledgePoints": [
      "二次根式"
    ],
    "category": "数与式",
    "semester": "八年级上",
    "explanation": "$\\sqrt{3} \\times \\sqrt{12} = \\sqrt{3 \\times 12} = \\sqrt{36} = 6$。"
  },
  {
    "id": 171,
    "content": "计算：$\\sqrt{27} - \\sqrt{12} = ?$",
    "options": [
      "$\\sqrt{3}$",
      "$3\\sqrt{3}$",
      "$5\\sqrt{3}$",
      "$\\sqrt{15}$"
    ],
    "correctAnswer": 0,
    "difficulty": 0.8,
    "discrimination": 1.2,
    "knowledgePoints": [
      "二次根式"
    ],
    "category": "数与式",
    "semester": "八年级上",
    "explanation": "$\\sqrt{27} = 3\\sqrt{3}$，$\\sqrt{12} = 2\\sqrt{3}$，所以$\\sqrt{27} - \\sqrt{12} = 3\\sqrt{3} - 2\\sqrt{3} = \\sqrt{3}$。"
  },
  {
    "id": 172,
    "content": "计算：$\\sqrt{24} + \\sqrt{54} = ?$",
    "options": [
      "$7\\sqrt{6}$",
      "$5\\sqrt{6}$",
      "$6\\sqrt{5}$",
      "$8\\sqrt{6}$"
    ],
    "correctAnswer": 1,
    "difficulty": 0.9,
    "discrimination": 1.3,
    "knowledgePoints": [
      "二次根式"
    ],
    "category": "数与式",
    "semester": "八年级上",
    "explanation": "$\\sqrt{24} = 2\\sqrt{6}$，$\\sqrt{54} = 3\\sqrt{6}$，所以$\\sqrt{24} + \\sqrt{54} = 2\\sqrt{6} + 3\\sqrt{6} = 5\\sqrt{6}$。"
  },
  {
    "id": 173,
    "content": "计算：$\\frac{\\sqrt{20}}{\\sqrt{5}} = ?$",
    "options": [
      "$\\sqrt{15}$",
      "$2$",
      "$4$",
      "$\\sqrt{4}$"
    ],
    "correctAnswer": 1,
    "difficulty": 0.7,
    "discrimination": 1.2,
    "knowledgePoints": [
      "二次根式"
    ],
    "category": "数与式",
    "semester": "八年级上",
    "explanation": "$\\frac{\\sqrt{20}}{\\sqrt{5}} = \\sqrt{\\frac{20}{5}} = \\sqrt{4} = 2$。"
  },
  {
    "id": 174,
    "content": "计算：$\\sqrt{63} = ?$",
    "options": [
      "$9\\sqrt{7}$",
      "$7\\sqrt{3}$",
      "$3\\sqrt{7}$",
      "$21\\sqrt{3}$"
    ],
    "correctAnswer": 2,
    "difficulty": 0.7,
    "discrimination": 1.2,
    "knowledgePoints": [
      "二次根式"
    ],
    "category": "数与式",
    "semester": "八年级上",
    "explanation": "$\\sqrt{63} = \\sqrt{9 \\times 7} = 3\\sqrt{7}$。"
  },
  {
    "id": 175,
    "content": "计算：$\\sqrt{80} = ?$",
    "options": [
      "$8\\sqrt{5}$",
      "$10\\sqrt{8}$",
      "$4\\sqrt{5}$",
      "$5\\sqrt{4}$"
    ],
    "correctAnswer": 2,
    "difficulty": 0.7,
    "discrimination": 1.2,
    "knowledgePoints": [
      "二次根式"
    ],
    "category": "数与式",
    "semester": "八年级上",
    "explanation": "$\\sqrt{80} = \\sqrt{16 \\times 5} = 4\\sqrt{5}$。"
  },
  {
    "id": 176,
    "content": "计算：$\\sqrt{2} \\times \\sqrt{8} = ?$",
    "options": [
      "$\\sqrt{16}$",
      "$4$",
      "$\\sqrt{10}$",
      "$16$"
    ],
    "correctAnswer": 1,
    "difficulty": 0.5,
    "discrimination": 1.1,
    "knowledgePoints": [
      "二次根式"
    ],
    "category": "数与式",
    "semester": "八年级上",
    "explanation": "$\\sqrt{2} \\times \\sqrt{8} = \\sqrt{16} = 4$。"
  },
  {
    "id": 177,
    "content": "计算：$\\sqrt{28} = ?$",
    "options": [
      "$2\\sqrt{7}$",
      "$4\\sqrt{7}$",
      "$14\\sqrt{2}$",
      "$7\\sqrt{2}$"
    ],
    "correctAnswer": 0,
    "difficulty": 0.6,
    "discrimination": 1.1,
    "knowledgePoints": [
      "二次根式"
    ],
    "category": "数与式",
    "semester": "八年级上",
    "explanation": "$\\sqrt{28} = \\sqrt{4 \\times 7} = 2\\sqrt{7}$。"
  },
  {
    "id": 178,
    "content": "计算：$\\sqrt{125} = ?$",
    "options": [
      "$125$",
      "$5\\sqrt{25}$",
      "$25\\sqrt{5}$",
      "$5\\sqrt{5}$"
    ],
    "correctAnswer": 3,
    "difficulty": 0.7,
    "discrimination": 1.2,
    "knowledgePoints": [
      "二次根式"
    ],
    "category": "数与式",
    "semester": "八年级上",
    "explanation": "$\\sqrt{125} = \\sqrt{25 \\times 5} = 5\\sqrt{5}$。"
  },
  {
    "id": 179,
    "content": "计算：$\\sqrt{200} = ?$",
    "options": [
      "$20\\sqrt{2}$",
      "$10\\sqrt{2}$",
      "$100\\sqrt{2}$",
      "$2\\sqrt{10}$"
    ],
    "correctAnswer": 1,
    "difficulty": 0.8,
    "discrimination": 1.2,
    "knowledgePoints": [
      "二次根式"
    ],
    "category": "数与式",
    "semester": "八年级上",
    "explanation": "$\\sqrt{200} = \\sqrt{100 \\times 2} = 10\\sqrt{2}$。"
  },
  {
    "id": 180,
    "content": "解方程：$x^2 - 8x + 15 = 0$",
    "options": [
      "$x_1=-2, x_2=-6$",
      "$x_1=3, x_2=5$",
      "$x_1=2, x_2=6$",
      "$x_1=-3, x_2=-5$"
    ],
    "correctAnswer": 1,
    "difficulty": 0.6,
    "discrimination": 1.2,
    "knowledgePoints": [
      "一元二次方程"
    ],
    "category": "方程与不等式",
    "semester": "九年级上",
    "explanation": "因式分解得$(x-3)(x-5)=0$，所以$x_1=3, x_2=5$。"
  },
  {
    "id": 181,
    "content": "解方程：$x^2 - 10x + 21 = 0$",
    "options": [
      "$x_1=-2, x_2=-8$",
      "$x_1=3, x_2=7$",
      "$x_1=-3, x_2=-7$",
      "$x_1=2, x_2=8$"
    ],
    "correctAnswer": 1,
    "difficulty": 0.7,
    "discrimination": 1.2,
    "knowledgePoints": [
      "一元二次方程"
    ],
    "category": "方程与不等式",
    "semester": "九年级上",
    "explanation": "因式分解得$(x-3)(x-7)=0$，所以$x_1=3, x_2=7$。"
  },
  {
    "id": 182,
    "content": "解方程：$x^2 + 5x + 6 = 0$",
    "options": [
      "$x_1=2, x_2=3$",
      "$x_1=1, x_2=6$",
      "$x_1=-2, x_2=-3$",
      "$x_1=-1, x_2=-6$"
    ],
    "correctAnswer": 2,
    "difficulty": 0.5,
    "discrimination": 1.1,
    "knowledgePoints": [
      "一元二次方程"
    ],
    "category": "方程与不等式",
    "semester": "九年级上",
    "explanation": "因式分解得$(x+2)(x+3)=0$，所以$x_1=-2, x_2=-3$。"
  },
  {
    "id": 183,
    "content": "解方程：$x^2 - 9 = 0$",
    "options": [
      "$x=0$",
      "无解",
      "$x_1=3, x_2=-3$",
      "$x_1=9, x_2=-9$"
    ],
    "correctAnswer": 2,
    "difficulty": 0.4,
    "discrimination": 1.0,
    "knowledgePoints": [
      "一元二次方程"
    ],
    "category": "方程与不等式",
    "semester": "九年级上",
    "explanation": "因式分解得$(x+3)(x-3)=0$，所以$x_1=3, x_2=-3$。"
  },
  {
    "id": 184,
    "content": "解方程：$2x^2 - 7x + 3 = 0$",
    "options": [
      "$x_1=-\\frac{1}{2}, x_2=-3$",
      "$x_1=1, x_2=6$",
      "$x_1=\\frac{1}{2}, x_2=3$",
      "$x_1=-1, x_2=-6$"
    ],
    "correctAnswer": 2,
    "difficulty": 1.0,
    "discrimination": 1.3,
    "knowledgePoints": [
      "一元二次方程"
    ],
    "category": "方程与不等式",
    "semester": "九年级上",
    "explanation": "因式分解得$(2x-1)(x-3)=0$，所以$x_1=\\frac{1}{2}, x_2=3$。"
  },
  {
    "id": 185,
    "content": "解方程：$x^2 - 6x = 0$",
    "options": [
      "$x=0$",
      "$x=6$",
      "$x_1=0, x_2=-6$",
      "$x_1=0, x_2=6$"
    ],
    "correctAnswer": 3,
    "difficulty": 0.3,
    "discrimination": 1.0,
    "knowledgePoints": [
      "一元二次方程"
    ],
    "category": "方程与不等式",
    "semester": "九年级上",
    "explanation": "提取公因式：$x(x-6)=0$，所以$x_1=0, x_2=6$。"
  },
  {
    "id": 186,
    "content": "解方程：$x^2 + 8x + 16 = 0$",
    "options": [
      "$x_1=2, x_2=8$",
      "$x = 4$",
      "$x = -4$",
      "无解"
    ],
    "correctAnswer": 2,
    "difficulty": 0.5,
    "discrimination": 1.1,
    "knowledgePoints": [
      "一元二次方程"
    ],
    "category": "方程与不等式",
    "semester": "九年级上",
    "explanation": "完全平方式：$(x+4)^2=0$，所以$x = -4$。"
  },
  {
    "id": 187,
    "content": "解方程：$3x^2 - 12x = 0$",
    "options": [
      "$x=4$",
      "$x=0$",
      "$x_1=0, x_2=-4$",
      "$x_1=0, x_2=4$"
    ],
    "correctAnswer": 3,
    "difficulty": 0.4,
    "discrimination": 1.0,
    "knowledgePoints": [
      "一元二次方程"
    ],
    "category": "方程与不等式",
    "semester": "九年级上",
    "explanation": "提取公因式：$3x(x-4)=0$，所以$x_1=0, x_2=4$。"
  },
  {
    "id": 188,
    "content": "解方程：$x^2 - 11x + 30 = 0$",
    "options": [
      "$x_1=5, x_2=6$",
      "$x_1=3, x_2=10$",
      "$x_1=-5, x_2=-6$",
      "$x_1=-3, x_2=-10$"
    ],
    "correctAnswer": 0,
    "difficulty": 0.8,
    "discrimination": 1.3,
    "knowledgePoints": [
      "一元二次方程"
    ],
    "category": "方程与不等式",
    "semester": "九年级上",
    "explanation": "因式分解得$(x-5)(x-6)=0$，所以$x_1=5, x_2=6$。"
  },
  {
    "id": 189,
    "content": "解方程：$x^2 - 2x - 8 = 0$",
    "options": [
      "$x_1=-1, x_2=8$",
      "$x_1=1, x_2=-8$",
      "$x_1=-2, x_2=4$",
      "$x_1=2, x_2=-4$"
    ],
    "correctAnswer": 2,
    "difficulty": 0.6,
    "discrimination": 1.2,
    "knowledgePoints": [
      "一元二次方程"
    ],
    "category": "方程与不等式",
    "semester": "九年级上",
    "explanation": "因式分解得$(x+2)(x-4)=0$，所以$x_1=-2, x_2=4$。"
  },
  {
    "id": 190,
    "content": "解方程：$x^2 + 7x + 12 = 0$",
    "options": [
      "$x_1=-2, x_2=-6$",
      "$x_1=3, x_2=4$",
      "$x_1=-3, x_2=-4$",
      "$x_1=2, x_2=6$"
    ],
    "correctAnswer": 2,
    "difficulty": 0.5,
    "discrimination": 1.1,
    "knowledgePoints": [
      "一元二次方程"
    ],
    "category": "方程与不等式",
    "semester": "九年级上",
    "explanation": "因式分解得$(x+3)(x+4)=0$，所以$x_1=-3, x_2=-4$。"
  },
  {
    "id": 191,
    "content": "解方程：$x^2 - 13x + 36 = 0$",
    "options": [
      "$x_1=-3, x_2=-12$",
      "$x_1=3, x_2=12$",
      "$x_1=-4, x_2=-9$",
      "$x_1=4, x_2=9$"
    ],
    "correctAnswer": 3,
    "difficulty": 0.9,
    "discrimination": 1.3,
    "knowledgePoints": [
      "一元二次方程"
    ],
    "category": "方程与不等式",
    "semester": "九年级上",
    "explanation": "因式分解得$(x-4)(x-9)=0$，所以$x_1=4, x_2=9$。"
  },
  {
    "id": 192,
    "content": "二次函数$y = x^2 - 4x + 3$的对称轴方程是？",
    "options": [
      "$x = 4$",
      "$x = -4$",
      "$x = -2$",
      "$x = 2$"
    ],
    "correctAnswer": 3,
    "difficulty": 0.9,
    "discrimination": 1.3,
    "knowledgePoints": [
      "二次函数"
    ],
    "category": "函数",
    "semester": "九年级上",
    "explanation": "对称轴$x = -\\frac{b}{2a} = -\\frac{-4}{2} = 2$。"
  },
  {
    "id": 193,
    "content": "二次函数$y = x^2 + 6x + 5$的顶点坐标是？",
    "options": [
      "$(3, -4)$",
      "$(3, 4)$",
      "$(-3, -4)$",
      "$(-3, 4)$"
    ],
    "correctAnswer": 2,
    "difficulty": 1.1,
    "discrimination": 1.3,
    "knowledgePoints": [
      "二次函数"
    ],
    "category": "函数",
    "semester": "九年级上",
    "explanation": "顶点横坐标$x = -\\frac{6}{2} = -3$，纵坐标$y = (-3)^2 + 6\\times(-3) + 5 = 9 - 18 + 5 = -4$，所以顶点为$(-3, -4)$。"
  },
  {
    "id": 194,
    "content": "二次函数$y = -x^2 + 2x + 3$的最大值是？",
    "options": [
      "$4$",
      "$3$",
      "$2$",
      "$1$"
    ],
    "correctAnswer": 0,
    "difficulty": 1.2,
    "discrimination": 1.4,
    "knowledgePoints": [
      "二次函数"
    ],
    "category": "函数",
    "semester": "九年级上",
    "explanation": "顶点横坐标$x = -\\frac{2}{2\\times(-1)} = 1$，最大值$y = -1 + 2 + 3 = 4$。"
  },
  {
    "id": 195,
    "content": "二次函数$y = x^2 - 8x + 15$的零点（与$x$轴交点）的横坐标是？",
    "options": [
      "$x_1=2, x_2=6$",
      "$x_1=3, x_2=5$",
      "$x_1=-2, x_2=-6$",
      "$x_1=-3, x_2=-5$"
    ],
    "correctAnswer": 1,
    "difficulty": 0.8,
    "discrimination": 1.2,
    "knowledgePoints": [
      "二次函数"
    ],
    "category": "函数",
    "semester": "九年级上",
    "explanation": "令$y=0$：$x^2-8x+15=0$，因式分解得$(x-3)(x-5)=0$，所以$x_1=3, x_2=5$。"
  },
  {
    "id": 196,
    "content": "二次函数$y = 3x^2 - 6x + 1$的最小值是？",
    "options": [
      "$2$",
      "$-2$",
      "$0$",
      "$1$"
    ],
    "correctAnswer": 1,
    "difficulty": 1.3,
    "discrimination": 1.4,
    "knowledgePoints": [
      "二次函数"
    ],
    "category": "函数",
    "semester": "九年级上",
    "explanation": "顶点横坐标$x = -\\frac{-6}{6} = 1$，最小值$y = 3 - 6 + 1 = -2$。"
  },
  {
    "id": 197,
    "content": "二次函数$y = -2x^2 + 4x - 1$的开口方向是？",
    "options": [
      "无法确定",
      "向上",
      "水平",
      "向下"
    ],
    "correctAnswer": 3,
    "difficulty": 0.4,
    "discrimination": 1.0,
    "knowledgePoints": [
      "二次函数"
    ],
    "category": "函数",
    "semester": "九年级上",
    "explanation": "二次项系数$a = -2 < 0$，所以开口向下。"
  },
  {
    "id": 198,
    "content": "二次函数$y = x^2 + 4x - 5$的对称轴方程是？",
    "options": [
      "$x = -2$",
      "$x = 2$",
      "$x = 4$",
      "$x = -4$"
    ],
    "correctAnswer": 0,
    "difficulty": 0.9,
    "discrimination": 1.3,
    "knowledgePoints": [
      "二次函数"
    ],
    "category": "函数",
    "semester": "九年级上",
    "explanation": "对称轴$x = -\\frac{b}{2a} = -\\frac{4}{2} = -2$。"
  },
  {
    "id": 199,
    "content": "二次函数$y = x^2 - 10x + 24$的零点（与$x$轴交点）的横坐标是？",
    "options": [
      "$x_1=4, x_2=6$",
      "$x_1=-4, x_2=-6$",
      "$x_1=-3, x_2=-8$",
      "$x_1=3, x_2=8$"
    ],
    "correctAnswer": 0,
    "difficulty": 0.7,
    "discrimination": 1.2,
    "knowledgePoints": [
      "二次函数"
    ],
    "category": "函数",
    "semester": "九年级上",
    "explanation": "令$y=0$：$x^2-10x+24=0$，因式分解得$(x-4)(x-6)=0$，所以$x_1=4, x_2=6$。"
  },
  {
    "id": 200,
    "content": "二次函数$y = -x^2 + 6x - 9$的最大值是？",
    "options": [
      "$6$",
      "$3$",
      "$9$",
      "$0$"
    ],
    "correctAnswer": 3,
    "difficulty": 1.1,
    "discrimination": 1.3,
    "knowledgePoints": [
      "二次函数"
    ],
    "category": "函数",
    "semester": "九年级上",
    "explanation": "顶点横坐标$x = -\\frac{6}{2\\times(-1)} = 3$，最大值$y = -9 + 18 - 9 = 0$。"
  },
  {
    "id": 201,
    "content": "二次函数$y = 2x^2 - 8x + 6$的最小值是？",
    "options": [
      "$0$",
      "$-2$",
      "$2$",
      "$6$"
    ],
    "correctAnswer": 1,
    "difficulty": 1.2,
    "discrimination": 1.4,
    "knowledgePoints": [
      "二次函数"
    ],
    "category": "函数",
    "semester": "九年级上",
    "explanation": "顶点横坐标$x = -\\frac{-8}{4} = 2$，最小值$y = 8 - 16 + 6 = -2$。"
  },
  {
    "id": 202,
    "content": "二次函数$y = x^2 - 5x + 6$的零点（与$x$轴交点）的横坐标是？",
    "options": [
      "$x_1=1, x_2=6$",
      "$x_1=-1, x_2=-6$",
      "$x_1=2, x_2=3$",
      "$x_1=-2, x_2=-3$"
    ],
    "correctAnswer": 2,
    "difficulty": 0.6,
    "discrimination": 1.2,
    "knowledgePoints": [
      "二次函数"
    ],
    "category": "函数",
    "semester": "九年级上",
    "explanation": "令$y=0$：$x^2-5x+6=0$，因式分解得$(x-2)(x-3)=0$，所以$x_1=2, x_2=3$。"
  },
  {
    "id": 203,
    "content": "二次函数$y = -3x^2 + 12x - 9$的最大值是？",
    "options": [
      "$3$",
      "$0$",
      "$12$",
      "$9$"
    ],
    "correctAnswer": 0,
    "difficulty": 1.2,
    "discrimination": 1.4,
    "knowledgePoints": [
      "二次函数"
    ],
    "category": "函数",
    "semester": "九年级上",
    "explanation": "顶点横坐标$x = -\\frac{12}{2\\times(-3)} = 2$，最大值$y = -12 + 24 - 9 = 3$。"
  }
];

// 导出数据
if (typeof module !== "undefined" && module.exports) {
    module.exports = questionsData;
}
