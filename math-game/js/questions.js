// 数学冲刺挑战游戏题库 - 基于2025年新版教材
// 包含所有初中数学知识点，专门为紧张刺激的游戏环境设计

// 学期定义和顺序
const SEMESTERS = {
    '七年级上': { order: 1, display: '七年级上学期' },
    '七年级下': { order: 2, display: '七年级下学期' },
    '八年级上': { order: 3, display: '八年级上学期' },
    '八年级下': { order: 4, display: '八年级下学期' },
    '九年级上': { order: 5, display: '九年级上学期' },
    '九年级下': { order: 6, display: '九年级下学期' }
};

// 知识点定义
const KNOWLEDGE_POINTS = {
    '有理数': {
        category: '代数',
        semester: '七年级上',
        color: '#ef4444',
        description: '有理数的概念、运算和性质'
    },
    '整式': {
        category: '代数',
        semester: '七年级上',
        color: '#f59e0b',
        description: '整式的加减乘除和因式分解'
    },
    '一元一次方程': {
        category: '代数',
        semester: '七年级上',
        color: '#eab308',
        description: '一元一次方程的解法和应用'
    },
    '基础几何': {
        category: '几何',
        semester: '七年级上',
        color: '#84cc16',
        description: '点、线、面、角的基本概念'
    },
    '实数': {
        category: '代数',
        semester: '七年级下',
        color: '#22c55e',
        description: '实数的概念和运算'
    },
    '分式': {
        category: '代数',
        semester: '七年级下',
        color: '#10b981',
        description: '分式的运算和方程'
    },
    '二元一次方程组': {
        category: '代数',
        semester: '七年级下',
        color: '#14b8a6',
        description: '二元一次方程组的解法'
    },
    '不等式': {
        category: '代数',
        semester: '七年级下',
        color: '#06b6d4',
        description: '不等式的性质和解法'
    },
    '平面几何': {
        category: '几何',
        semester: '七年级下',
        color: '#0ea5e9',
        description: '三角形、四边形的性质'
    },
    '二次根式': {
        category: '代数',
        semester: '八年级上',
        color: '#3b82f6',
        description: '二次根式的运算和化简'
    },
    '函数概念': {
        category: '函数',
        semester: '八年级下',
        color: '#6366f1',
        description: '函数的概念和表示方法'
    },
    '一次函数': {
        category: '函数',
        semester: '八年级下',
        color: '#8b5cf6',
        description: '一次函数的图像和性质'
    },
    '反比例函数': {
        category: '函数',
        semester: '八年级下',
        color: '#a855f7',
        description: '反比例函数的图像和性质'
    },
    '三角形': {
        category: '几何',
        semester: '八年级下',
        color: '#c026d3',
        description: '三角形的性质和判定'
    },
    '四边形': {
        category: '几何',
        semester: '八年级下',
        color: '#e11d48',
        description: '平行四边形、梯形的性质'
    },
    '一元二次方程': {
        category: '代数',
        semester: '九年级上',
        color: '#dc2626',
        description: '一元二次方程的解法'
    },
    '二次函数': {
        category: '函数',
        semester: '九年级上',
        color: '#ea580c',
        description: '二次函数的图像和性质'
    },
    '圆': {
        category: '几何',
        semester: '九年级下',
        color: '#d97706',
        description: '圆的性质和计算'
    },
    '统计': {
        category: '统计',
        semester: '九年级下',
        color: '#ca8a04',
        description: '数据分析与统计图表'
    },
    '概率': {
        category: '概率',
        semester: '九年级下',
        color: '#a16207',
        description: '概率的基本概念和计算'
    },
    // 补充遗漏的重要知识点
    '科学记数法': {
        category: '代数',
        semester: '七年级上',
        color: '#f97316',
        description: '科学记数法的表示和应用'
    },
    '近似数': {
        category: '代数',
        semester: '七年级上',
        color: '#fbbf24',
        description: '有效数字和近似数的概念'
    },
    '整式乘法': {
        category: '代数',
        semester: '七年级上',
        color: '#f59e0b',
        description: '多项式的乘法运算'
    },
    '因式分解': {
        category: '代数',
        semester: '七年级上',
        color: '#10b981',
        description: '多项式的因式分解方法'
    },
    '整式除法': {
        category: '代数',
        semester: '七年级上',
        color: '#06b6d4',
        description: '多项式除以单项式或多项式'
    },
    '立体图形': {
        category: '几何',
        semester: '七年级上',
        color: '#3b82f6',
        description: '立体图形的认识和表面积'
    },
    '三视图': {
        category: '几何',
        semester: '七年级上',
        color: '#6366f1',
        description: '主视图、左视图、俯视图'
    },
    '轴对称': {
        category: '几何',
        semester: '八年级上',
        color: '#a16207',
        description: '轴对称图形的性质和判别'
    },
    '平移旋转': {
        category: '几何',
        semester: '八年级上',
        color: '#f87172',
        description: '图形的平移和旋转变换'
    },
    '相似三角形': {
        category: '几何',
        semester: '八年级下',
        color: '#8b5cf6',
        description: '相似三角形的判定和性质'
    },
    '解直角三角形': {
        category: '几何',
        semester: '八年级下',
        color: '#a855f7',
        description: '利用勾股定理解直角三角形'
    },
    '锐角三角函数': {
        category: '函数',
        semester: '九年级下',
        color: '#ec4899',
        description: '正弦、余弦、正切函数'
    },
    '投影与视图': {
        category: '几何',
        semester: '九年级下',
        color: '#f43f5e',
        description: '平行投影和中心投影'
    },
    '几何变换': {
        category: '几何',
        semester: '八年级下',
        color: '#0ea5e9',
        description: '平移、旋转、轴对称变换'
    },
    '数据分析': {
        category: '统计',
        semester: '七年级下',
        color: '#14b8a6',
        description: '数据的收集、整理和分析'
    },
    '统计图': {
        category: '统计',
        semester: '七年级下',
        color: '#22c55e',
        description: '条形图、折线图、扇形图'
    },
    '离散型随机变量': {
        category: '概率',
        semester: '九年级下',
        color: '#dc2626',
        description: '离散型随机变量的分布'
    },
    '方程组应用': {
        category: '代数',
        semester: '七年级下',
        color: '#059669',
        description: '二元一次方程组的实际应用'
    },
    '函数图像变换': {
        category: '函数',
        semester: '八年级下',
        color: '#7c3aed',
        description: '函数图像的平移和伸缩变换'
    },
    '不等式组': {
        category: '代数',
        semester: '七年级下',
        color: '#c026d3',
        description: '一元一次不等式组的解法'
    },
    '无理数与实数': {
        category: '代数',
        semester: '七年级下',
        color: '#e11d48',
        description: '实数的分类和数轴'
    }
};

// 游戏题目数据库 - 优化选项分布
const GAME_QUESTIONS = [
    // 有理数题目
    {
        id: 1,
        content: "计算：(-3) × (-4) + 5 = ?",
        options: ["17", "12", "7", "19"],
        correct: 2,
        knowledge_point: "有理数",
        difficulty: 1,
        time_limit: 10
    },
    {
        id: 2,
        content: "下列数中，最大的数是？",
        options: ["2", "-1", "0", "-3"],
        correct: 1,
        knowledge_point: "有理数",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 3,
        content: "计算：| -5 | + | 3 | = ?",
        options: ["2", "15", "8", "5"],
        correct: 2,
        knowledge_point: "有理数",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 4,
        content: "计算：-8 + 15 - 3 = ?",
        options: ["4", "10", "-4", "8"],
        correct: 1,
        knowledge_point: "有理数",
        difficulty: 1,
        time_limit: 6
    },
    
    // 整式题目
    {
        id: 5,
        content: "化简：3x + 2y - x + y = ?",
        options: ["4x + y", "2x + 3y", "2x + y", "x + 3y"],
        correct: 1,
        knowledge_point: "整式",
        difficulty: 1,
        time_limit: 12
    },
    {
        id: 6,
        content: "计算：(x + 2)(x - 3) = ?",
        options: ["x² - x - 6", "x² - 6", "x² + x - 6", "x² - x + 6"],
        correct: 2,
        knowledge_point: "整式",
        difficulty: 2,
        time_limit: 15
    },
    {
        id: 7,
        content: "因式分解：x² - 4 = ?",
        options: ["(x - 2)(x + 2)", "(x - 2)²", "(x + 2)²", "x(x - 4)"],
        correct: 3,
        knowledge_point: "整式",
        difficulty: 2,
        time_limit: 15
    },
    {
        id: 8,
        content: "化简：2a + 3b - a + 2b = ?",
        options: ["a + 5b", "3a + b", "a + b", "3a + 5b"],
        correct: 0,
        knowledge_point: "整式",
        difficulty: 1,
        time_limit: 10
    },
    
    // 一元一次方程题目
    {
        id: 9,
        content: "解方程：2x + 3 = 11，则x = ?",
        options: ["3", "4", "5", "6"],
        correct: 1,
        knowledge_point: "一元一次方程",
        difficulty: 1,
        time_limit: 12
    },
    {
        id: 10,
        content: "如果3x - 7 = 8，那么x = ?",
        options: ["3", "4", "5", "6"],
        correct: 2,
        knowledge_point: "一元一次方程",
        difficulty: 1,
        time_limit: 10
    },
    {
        id: 11,
        content: "解方程：5x - 8 = 12，则x = ?",
        options: ["3", "4", "5", "6"],
        correct: 1,
        knowledge_point: "一元一次方程",
        difficulty: 1,
        time_limit: 10
    },
    {
        id: 12,
        content: "如果4x + 9 = 25，那么x = ?",
        options: ["2", "3", "4", "5"],
        correct: 2,
        knowledge_point: "一元一次方程",
        difficulty: 1,
        time_limit: 10
    },
    
    // 基础几何题目
    {
        id: 13,
        content: "三角形的内角和等于多少度？",
        options: ["90°", "180°", "120°", "360°"],
        correct: 1,
        knowledge_point: "基础几何",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 14,
        content: "平角的度数是？",
        options: ["180°", "90°", "120°", "360°"],
        correct: 1,
        knowledge_point: "基础几何",
        difficulty: 1,
        time_limit: 6
    },
    {
        id: 15,
        content: "直角的度数是？",
        options: ["90°", "45°", "180°", "270°"],
        correct: 0,
        knowledge_point: "基础几何",
        difficulty: 1,
        time_limit: 6
    },
    {
        id: 16,
        content: "周角的度数是？",
        options: ["360°", "180°", "90°", "270°"],
        correct: 2,
        knowledge_point: "基础几何",
        difficulty: 1,
        time_limit: 6
    },
    
    // 实数题目
    {
        id: 17,
        content: "√16 = ?",
        options: ["4", "2", "8", "16"],
        correct: 3,
        knowledge_point: "实数",
        difficulty: 1,
        time_limit: 6
    },
    {
        id: 18,
        content: "下列哪个数是无理数？",
        options: ["√2", "0.5", "3/4", "7"],
        correct: 0,
        knowledge_point: "实数",
        difficulty: 2,
        time_limit: 10
    },
    {
        id: 19,
        content: "√25 = ?",
        options: ["5", "25", "10", "2.5"],
        correct: 1,
        knowledge_point: "实数",
        difficulty: 1,
        time_limit: 6
    },
    {
        id: 20,
        content: "下列哪个数是有理数？",
        options: ["3.14", "π", "√3", "e"],
        correct: 3,
        knowledge_point: "实数",
        difficulty: 2,
        time_limit: 8
    },
    
    // 分式题目
    {
        id: 21,
        content: "化简：(x²)/(xy) = ?",
        options: ["x/y", "y", "x", "y/x"],
        correct: 2,
        knowledge_point: "分式",
        difficulty: 1,
        time_limit: 10
    },
    {
        id: 22,
        content: "计算：1/2 + 1/3 = ?",
        options: ["5/6", "1/5", "2/5", "2/3"],
        correct: 3,
        knowledge_point: "分式",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 23,
        content: "化简：(ab)/(ac) = ?",
        options: ["b/c", "c/b", "a/b", "a/c"],
        correct: 1,
        knowledge_point: "分式",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 24,
        content: "计算：2/3 - 1/4 = ?",
        options: ["5/12", "1/12", "3/12", "1/6"],
        correct: 0,
        knowledge_point: "分式",
        difficulty: 2,
        time_limit: 10
    },
    
    // 二元一次方程组题目
    {
        id: 25,
        content: "方程组：x + y = 5, x - y = 1，则x = ?",
        options: ["3", "1", "2", "4"],
        correct: 2,
        knowledge_point: "二元一次方程组",
        difficulty: 2,
        time_limit: 15
    },
    {
        id: 26,
        content: "方程组：2x + y = 7, x - y = 1，则x = ?",
        options: ["8/3", "2", "3", "4"],
        correct: 0,
        knowledge_point: "二元一次方程组",
        difficulty: 2,
        time_limit: 15
    },
    
    // 不等式题目
    {
        id: 27,
        content: "解不等式：2x > 6，则x > ?",
        options: ["3", "1", "2", "4"],
        correct: 1,
        knowledge_point: "不等式",
        difficulty: 1,
        time_limit: 10
    },
    {
        id: 28,
        content: "解不等式：3x ≤ 12，则x ≤ ?",
        options: ["4", "2", "3", "6"],
        correct: 2,
        knowledge_point: "不等式",
        difficulty: 1,
        time_limit: 10
    },
    
    // 二次根式题目
    {
        id: 29,
        content: "化简：√12 = ?",
        options: ["2√3", "3√2", "4√3", "6"],
        correct: 3,
        knowledge_point: "二次根式",
        difficulty: 2,
        time_limit: 12
    },
    {
        id: 30,
        content: "计算：√3 × √12 = ?",
        options: ["6", "3√4", "2√9", "√36"],
        correct: 0,
        knowledge_point: "二次根式",
        difficulty: 2,
        time_limit: 15
    },
    {
        id: 31,
        content: "化简：√18 = ?",
        options: ["3√2", "2√3", "√9", "2√9"],
        correct: 0,
        knowledge_point: "二次根式",
        difficulty: 2,
        time_limit: 12
    },
    {
        id: 32,
        content: "计算：√8 × √2 = ?",
        options: ["4", "2√4", "√16", "2√2"],
        correct: 0,
        knowledge_point: "二次根式",
        difficulty: 2,
        time_limit: 12
    },
    
    // 函数概念题目
    {
        id: 33,
        content: "函数y = 2x + 1中，当x = 3时，y = ?",
        options: ["7", "5", "6", "8"],
        correct: 0,
        knowledge_point: "函数概念",
        difficulty: 1,
        time_limit: 10
    },
    {
        id: 34,
        content: "点(2, 4)在哪个函数的图像上？",
        options: ["y = 2x", "y = x", "y = x + 2", "y = 2x + 1"],
        correct: 0,
        knowledge_point: "函数概念",
        difficulty: 2,
        time_limit: 12
    },
    {
        id: 35,
        content: "函数y = 3x - 2中，当x = 2时，y = ?",
        options: ["4", "8", "6", "2"],
        correct: 0,
        knowledge_point: "函数概念",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 36,
        content: "点(1, 5)在哪个函数的图像上？",
        options: ["y = 3x + 2", "y = 2x + 3", "y = x + 4", "y = 4x + 1"],
        correct: 0,
        knowledge_point: "函数概念",
        difficulty: 2,
        time_limit: 12
    },
    
    // 一次函数题目
    {
        id: 37,
        content: "一次函数y = kx + b中，k表示？",
        options: ["斜率", "截距", "横坐标", "纵坐标"],
        correct: 0,
        knowledge_point: "一次函数",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 38,
        content: "直线y = 2x + 3与y轴的交点是？",
        options: ["(0, 3)", "(2, 0)", "(0, 2)", "(3, 0)"],
        correct: 0,
        knowledge_point: "一次函数",
        difficulty: 2,
        time_limit: 12
    },
    {
        id: 39,
        content: "一次函数y = -2x + 4的斜率是？",
        options: ["-2", "2", "4", "-4"],
        correct: 0,
        knowledge_point: "一次函数",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 40,
        content: "直线y = x + 5与x轴的交点是？",
        options: ["(-5, 0)", "(0, 5)", "(5, 0)", "(0, -5)"],
        correct: 0,
        knowledge_point: "一次函数",
        difficulty: 2,
        time_limit: 12
    },
    
    // 反比例函数题目
    {
        id: 41,
        content: "反比例函数y = k/x的图像经过点(2, 3)，则k = ?",
        options: ["6", "3", "1", "12"],
        correct: 0,
        knowledge_point: "反比例函数",
        difficulty: 2,
        time_limit: 12
    },
    {
        id: 42,
        content: "反比例函数y = 6/x中，当x = 3时，y = ?",
        options: ["2", "6", "3", "18"],
        correct: 0,
        knowledge_point: "反比例函数",
        difficulty: 1,
        time_limit: 8
    },
    
    // 三角形题目
    {
        id: 43,
        content: "等腰三角形的两个底角相等吗？",
        options: ["相等", "不相等", "有时相等", "无法确定"],
        correct: 0,
        knowledge_point: "三角形",
        difficulty: 1,
        time_limit: 6
    },
    {
        id: 44,
        content: "直角三角形中，斜边是最长的边吗？",
        options: ["是", "不是", "有时是", "无法确定"],
        correct: 0,
        knowledge_point: "三角形",
        difficulty: 1,
        time_limit: 6
    },
    {
        id: 45,
        content: "等边三角形的每个内角是多少度？",
        options: ["60°", "45°", "90°", "30°"],
        correct: 0,
        knowledge_point: "三角形",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 46,
        content: "三角形两边之和大于第三边吗？",
        options: ["是", "不是", "有时是", "无法确定"],
        correct: 0,
        knowledge_point: "三角形",
        difficulty: 1,
        time_limit: 6
    },
    
    // 四边形题目
    {
        id: 47,
        content: "平行四边形的对边平行且相等吗？",
        options: ["是", "不是", "有时是", "无法确定"],
        correct: 0,
        knowledge_point: "四边形",
        difficulty: 1,
        time_limit: 6
    },
    {
        id: 48,
        content: "矩形的对角线相等吗？",
        options: ["相等", "不相等", "有时相等", "无法确定"],
        correct: 0,
        knowledge_point: "四边形",
        difficulty: 1,
        time_limit: 6
    },
    
    // 一元二次方程题目
    {
        id: 49,
        content: "解方程：x² - 9 = 0，则x = ?",
        options: ["±3", "3", "-3", "0"],
        correct: 0,
        knowledge_point: "一元二次方程",
        difficulty: 2,
        time_limit: 12
    },
    {
        id: 50,
        content: "方程x² - 5x + 6 = 0的解是？",
        options: ["2, 3", "1, 6", "-2, -3", "0, 6"],
        correct: 0,
        knowledge_point: "一元二次方程",
        difficulty: 3,
        time_limit: 15
    },
    {
        id: 51,
        content: "解方程：x² = 16，则x = ?",
        options: ["±4", "4", "-4", "8"],
        correct: 0,
        knowledge_point: "一元二次方程",
        difficulty: 2,
        time_limit: 10
    },
    {
        id: 52,
        content: "方程x² + x - 2 = 0的解是？",
        options: ["1, -2", "2, -1", "-1, 2", "-2, 1"],
        correct: 0,
        knowledge_point: "一元二次方程",
        difficulty: 3,
        time_limit: 15
    },
    
    // 二次函数题目
    {
        id: 53,
        content: "二次函数y = x² + 2x + 1的顶点坐标是？",
        options: ["(-1, 0)", "(0, 1)", "(1, 0)", "(0, -1)"],
        correct: 0,
        knowledge_point: "二次函数",
        difficulty: 3,
        time_limit: 15
    },
    {
        id: 54,
        content: "函数y = -x² + 4的开口方向是？",
        options: ["向下", "向上", "向左", "向右"],
        correct: 0,
        knowledge_point: "二次函数",
        difficulty: 2,
        time_limit: 8
    },
    {
        id: 55,
        content: "二次函数y = x² - 4x + 3的顶点坐标是？",
        options: ["(2, -1)", "(0, 3)", "(1, -2)", "(3, 0)"],
        correct: 0,
        knowledge_point: "二次函数",
        difficulty: 3,
        time_limit: 15
    },
    {
        id: 56,
        content: "函数y = 2x² - 8x + 6的开口方向是？",
        options: ["向上", "向下", "向左", "向右"],
        correct: 0,
        knowledge_point: "二次函数",
        difficulty: 2,
        time_limit: 8
    },
    
    // 圆的题目
    {
        id: 57,
        content: "圆的周长公式是？",
        options: ["2πr", "πr²", "πr", "2πr²"],
        correct: 0,
        knowledge_point: "圆",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 58,
        content: "圆的面积公式是？",
        options: ["πr²", "2πr", "πr", "2πr²"],
        correct: 0,
        knowledge_point: "圆",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 59,
        content: "圆的直径公式是？(r为半径)",
        options: ["2r", "r/2", "πr", "r²"],
        correct: 0,
        knowledge_point: "圆",
        difficulty: 1,
        time_limit: 6
    },
    {
        id: 60,
        content: "半圆的面积公式是？(r为半径)",
        options: ["(1/2)πr²", "πr²", "2πr", "πr²/4"],
        correct: 0,
        knowledge_point: "圆",
        difficulty: 2,
        time_limit: 10
    },
    
    // 统计题目
    {
        id: 61,
        content: "数据：2, 3, 5, 7, 8的中位数是？",
        options: ["5", "3", "7", "8"],
        correct: 0,
        knowledge_point: "统计",
        difficulty: 1,
        time_limit: 10
    },
    {
        id: 62,
        content: "数据：1, 2, 3, 4, 5的平均数是？",
        options: ["3", "2", "4", "5"],
        correct: 0,
        knowledge_point: "统计",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 63,
        content: "数据：1, 2, 3, 4, 5的众数是？",
        options: ["无", "1", "3", "5"],
        correct: 0,
        knowledge_point: "统计",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 64,
        content: "数据：2, 4, 6, 8的极差是？",
        options: ["6", "4", "8", "2"],
        correct: 0,
        knowledge_point: "统计",
        difficulty: 1,
        time_limit: 8
    },
    
    // 概率题目
    {
        id: 65,
        content: "抛掷一枚均匀的硬币，出现正面的概率是？",
        options: ["1/2", "0", "1", "无法确定"],
        correct: 0,
        knowledge_point: "概率",
        difficulty: 1,
        time_limit: 6
    },
    {
        id: 66,
        content: "掷一个骰子，出现偶数的概率是？",
        options: ["1/2", "1/6", "1/3", "2/3"],
        correct: 0,
        knowledge_point: "概率",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 67,
        content: "从52张扑克牌中抽取一张，抽到A的概率是？",
        options: ["1/13", "1/52", "1/4", "1/26"],
        correct: 0,
        knowledge_point: "概率",
        difficulty: 2,
        time_limit: 10
    },
    {
        id: 68,
        content: "袋中有3红球2白球，摸到红球的概率是？",
        options: ["3/5", "2/5", "1/5", "1/3"],
        correct: 0,
        knowledge_point: "概率",
        difficulty: 2,
        time_limit: 10
    },

    // 补充新知识点的题目

    // 科学记数法题目
    {
        id: 69,
        content: "用科学记数法表示3000000 = ?",
        options: ["3×10⁶", "3×10⁵", "30×10⁵", "300×10⁴"],
        correct: 0,
        knowledge_point: "科学记数法",
        difficulty: 2,
        time_limit: 10
    },
    {
        id: 70,
        content: "2.5×10⁴写成普通数字是？",
        options: ["25000", "2500", "250000", "250"],
        correct: 0,
        knowledge_point: "科学记数法",
        difficulty: 1,
        time_limit: 8
    },

    // 近似数题目
    {
        id: 71,
        content: "3.14159精确到百分位约等于？",
        options: ["3.14", "3.141", "3.1", "3.142"],
        correct: 0,
        knowledge_point: "近似数",
        difficulty: 1,
        time_limit: 6
    },
    {
        id: 72,
        content: "把25.678四舍五入到十分位得？",
        options: ["25.7", "25.6", "26", "25"],
        correct: 0,
        knowledge_point: "近似数",
        difficulty: 1,
        time_limit: 6
    },

    // 整式乘法题目
    {
        id: 73,
        content: "计算：(x + 2)(x + 3) = ?",
        options: ["x² + 5x + 6", "x² + 6", "x² + 2x + 3", "x² + 6x"],
        correct: 0,
        knowledge_point: "整式乘法",
        difficulty: 2,
        time_limit: 12
    },
    {
        id: 74,
        content: "计算：(2a - b)(3a + 2b) = ?",
        options: ["6a² + ab - 2b²", "6a² + ab + 2b²", "6a² - ab - 2b²", "6a² - ab + 2b²"],
        correct: 0,
        knowledge_point: "整式乘法",
        difficulty: 3,
        time_limit: 15
    },

    // 因式分解题目
    {
        id: 75,
        content: "因式分解：x² + 6x + 8 = ?",
        options: ["(x + 2)(x + 4)", "(x + 1)(x + 8)", "(x + 2)(x + 3)", "(x + 4)(x + 2)"],
        correct: 0,
        knowledge_point: "因式分解",
        difficulty: 2,
        time_limit: 15
    },
    {
        id: 76,
        content: "因式分解：x² - 9 = ?",
        options: ["(x - 3)(x + 3)", "(x - 9)(x + 1)", "(x - 3)²", "(x - 1)(x + 9)"],
        correct: 0,
        knowledge_point: "因式分解",
        difficulty: 2,
        time_limit: 12
    },

    // 整式除法题目
    {
        id: 77,
        content: "计算：(x² + 5x + 6) ÷ (x + 2) = ?",
        options: ["x + 3", "x + 2", "x + 1", "x + 6"],
        correct: 0,
        knowledge_point: "整式除法",
        difficulty: 3,
        time_limit: 15
    },
    {
        id: 78,
        content: "计算：(2x² + 8x) ÷ 2x = ?",
        options: ["x + 4", "2x + 8", "x + 8", "x² + 4"],
        correct: 0,
        knowledge_point: "整式除法",
        difficulty: 2,
        time_limit: 12
    },

    // 八年级上几何题目 - 轴对称
    {
        id: 79,
        content: "等腰三角形是轴对称图形吗？",
        options: ["是", "不是", "有时是", "无法确定"],
        correct: 0,
        knowledge_point: "轴对称",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 80,
        content: "下列图形中，哪些是轴对称图形？",
        options: ["正方形、等腰三角形", "平行四边形、梯形", "正三角形、正五边形"],
        correct: 0,
        knowledge_point: "轴对称",
        difficulty: 2,
        time_limit: 12
    },
    {
        id: 81,
        content: "圆的对称轴有？条",
        options: ["无数", "1", "2", "4"],
        correct: 0,
        knowledge_point: "轴对称",
        difficulty: 2,
        time_limit: 10
    },

    // 八年级上几何题目 - 平移旋转
    {
        id: 82,
        content: "点(3, 4)向右平移5个单位后坐标是？",
        options: ["(8, 4)", "(3, 9)", "(-2, 4)", "(3, -1)"],
        correct: 0,
        knowledge_point: "平移旋转",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 83,
        content: "点(2, -3)向上平移4个单位后坐标是？",
        options: ["(2, 1)", "(6, -3)", "(-2, 1)", "(2, -7)"],
        correct: 0,
        knowledge_point: "平移旋转",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 84,
        content: "点A(1, 2)绕原点顺时针旋转90°后坐标是？",
        options: ["(2, -1)", "(-2, 1)", "(-1, -2)", "(1, 2)"],
        correct: 0,
        knowledge_point: "平移旋转",
        difficulty: 3,
        time_limit: 15
    },
    {
        id: 85,
        content: "将三角形ABC绕点O旋转180°，得到的三角形与原三角形的关系是？",
        options: ["全等", "相似", "关于O对称", "面积相等"],
        correct: 0,
        knowledge_point: "平移旋转",
        difficulty: 2,
        time_limit: 12
    },

    // 立体图形题目
    {
        id: 86,
        content: "正方体的表面积公式是？（边长为a）",
        options: ["6a²", "a³", "12a", "4a"],
        correct: 0,
        knowledge_point: "立体图形",
        difficulty: 2,
        time_limit: 10
    },
    {
        id: 80,
        content: "长方体的体积公式是？（长宽高分别为a、b、c）",
        options: ["abc", "a + b + c", "ab + bc + ca", "a² + b² + c²"],
        correct: 0,
        knowledge_point: "立体图形",
        difficulty: 1,
        time_limit: 8
    },

    // 三视图题目
    {
        id: 81,
        content: "从正面看物体得到的视图叫做？",
        options: ["主视图", "左视图", "俯视图", "侧视图"],
        correct: 0,
        knowledge_point: "三视图",
        difficulty: 1,
        time_limit: 6
    },
    {
        id: 82,
        content: "从上面看物体得到的视图叫做？",
        options: ["俯视图", "主视图", "左视图", "后视图"],
        correct: 0,
        knowledge_point: "三视图",
        difficulty: 1,
        time_limit: 6
    },

    // 相似三角形题目
    {
        id: 83,
        content: "两个三角形相似，对应边之比等于？",
        options: ["相似比", "周长比", "面积比", "角度比"],
        correct: 0,
        knowledge_point: "相似三角形",
        difficulty: 2,
        time_limit: 10
    },
    {
        id: 84,
        content: "相似三角形的对应角？",
        options: ["相等", "互补", "和为180°", "成比例"],
        correct: 0,
        knowledge_point: "相似三角形",
        difficulty: 1,
        time_limit: 8
    },

    // 解直角三角形题目
    {
        id: 85,
        content: "直角三角形中，两直角边分别是3和4，斜边是？",
        options: ["5", "√7", "7", "12"],
        correct: 0,
        knowledge_point: "解直角三角形",
        difficulty: 2,
        time_limit: 10
    },
    {
        id: 86,
        content: "直角三角形中，斜边为13，一条直角边为5，另一直角边是？",
        options: ["12", "√194", "8", "18"],
        correct: 0,
        knowledge_point: "解直角三角形",
        difficulty: 3,
        time_limit: 12
    },

    // 锐角三角函数题目
    {
        id: 87,
        content: "在直角三角形中，sinα = ?",
        options: ["对边/斜边", "邻边/斜边", "对边/邻边", "邻边/对边"],
        correct: 0,
        knowledge_point: "锐角三角函数",
        difficulty: 2,
        time_limit: 10
    },
    {
        id: 88,
        content: "在直角三角形中，cosα = ?",
        options: ["邻边/斜边", "对边/斜边", "邻边/对边", "对边/邻边"],
        correct: 0,
        knowledge_point: "锐角三角函数",
        difficulty: 2,
        time_limit: 10
    },

    // 几何变换题目
    {
        id: 89,
        content: "点(3, 2)向右平移4个单位后坐标是？",
        options: ["(7, 2)", "(3, 6)", "(-1, 2)", "(3, -2)"],
        correct: 0,
        knowledge_point: "几何变换",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 90,
        content: "点(2, -1)向上平移3个单位后坐标是？",
        options: ["(2, 2)", "(5, -1)", "(-1, 2)", "(2, -4)"],
        correct: 0,
        knowledge_point: "几何变换",
        difficulty: 1,
        time_limit: 8
    },

    // 数据分析题目
    {
        id: 91,
        content: "收集数据的方法不包括？",
        options: ["猜测", "测量", "调查", "实验"],
        correct: 0,
        knowledge_point: "数据分析",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 92,
        content: "整理数据的主要目的是？",
        options: ["便于分析", "增加数据量", "改变数据值", "使数据更复杂"],
        correct: 0,
        knowledge_point: "数据分析",
        difficulty: 1,
        time_limit: 8
    },

    // 统计图题目
    {
        id: 93,
        content: "条形图主要用于表示？",
        options: ["数量多少", "变化趋势", "部分与整体关系", "概率分布"],
        correct: 0,
        knowledge_point: "统计图",
        difficulty: 1,
        time_limit: 6
    },
    {
        id: 94,
        content: "扇形图主要用于表示？",
        options: ["部分与整体关系", "变化趋势", "数量多少", "相关关系"],
        correct: 0,
        knowledge_point: "统计图",
        difficulty: 1,
        time_limit: 6
    },

    // 方程组应用题目
    {
        id: 95,
        content: "鸡兔同笼：鸡有x只，兔有y只，头共20个，脚共56只，方程组是？",
        options: ["x + y = 20, 2x + 4y = 56", "x + y = 56, 2x + 4y = 20", "x + y = 20, x + 2y = 56", "x + 2y = 20, 2x + 4y = 56"],
        correct: 0,
        knowledge_point: "方程组应用",
        difficulty: 3,
        time_limit: 15
    },

    // 函数图像变换题目
    {
        id: 96,
        content: "函数y = f(x)向左平移2个单位后是？",
        options: ["y = f(x + 2)", "y = f(x - 2)", "y = f(2x)", "y = f(x) + 2"],
        correct: 0,
        knowledge_point: "函数图像变换",
        difficulty: 2,
        time_limit: 10
    },
    {
        id: 97,
        content: "函数y = 2f(x)的图像？",
        options: ["纵向伸长2倍", "横向压缩2倍", "向上平移2个单位", "向右平移2个单位"],
        correct: 0,
        knowledge_point: "函数图像变换",
        difficulty: 2,
        time_limit: 10
    },

    // 不等式组题目
    {
        id: 98,
        content: "不等式组：x > 2, x < 5的解集是？",
        options: ["2 < x < 5", "x > 2", "x < 5", "2 < x"],
        correct: 0,
        knowledge_point: "不等式组",
        difficulty: 2,
        time_limit: 12
    },
    {
        id: 99,
        content: "不等式组：x ≤ 3, x ≥ 1的整数解有？个",
        options: ["3", "4", "2", "无限"],
        correct: 0,
        knowledge_point: "不等式组",
        difficulty: 2,
        time_limit: 10
    },

    // 无理数与实数题目
    {
        id: 100,
        content: "实数包括？",
        options: ["有理数和无理数", "整数和分数", "正数和负数", "自然数"],
        correct: 0,
        knowledge_point: "无理数与实数",
        difficulty: 2,
        time_limit: 8
    },
    {
        id: 101,
        content: "数轴上的点与实数是？关系",
        options: ["一一对应", "多对一", "一对多", "没有关系"],
        correct: 0,
        knowledge_point: "无理数与实数",
        difficulty: 1,
        time_limit: 8
    }
];

// 填空题数据库 - 针对所有概念关键词
const FILL_IN_BLANK_QUESTIONS = [
    // 有理数填空题
    // 补充新知识点的填空题

    // 科学记数法填空题
    {
        id: 101,
        content: "在有理数中，既不是正数也不是负数的数是______",
        options: ["0", "1", "-1", "整数"],
        correct: 0,
        knowledge_point: "有理数",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 102,
        content: "科学记数法a×10ⁿ中，a叫做______数",
        options: ["有效", "系数", "指数", "底数"],
        correct: 0,
        knowledge_point: "科学记数法",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 103,
        content: "科学记数法中，10的整数次幂叫做______",
        options: ["指数", "系数", "有效数字", "科学计数法"],
        correct: 0,
        knowledge_point: "科学记数法",
        difficulty: 1,
        time_limit: 8
    },

    // 近似数填空题
    {
        id: 104,
        content: "一个近似数的近似程度用______表示",
        options: ["精确度", "误差", "有效数字", "准确度"],
        correct: 0,
        knowledge_point: "近似数",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 105,
        content: "四舍五入得到的数是原数的______",
        options: ["近似值", "准确值", "绝对值", "相对值"],
        correct: 0,
        knowledge_point: "近似数",
        difficulty: 1,
        time_limit: 6
    },

    // 整式乘法填空题
    {
        id: 106,
        content: "多项式乘以单项式时，用单项式______多项式的每一项",
        options: ["遍乘", "加上", "乘以", "减去"],
        correct: 0,
        knowledge_point: "整式乘法",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 107,
        content: "多项式与多项式相乘，先用一个多项式的______乘以另一个多项式的每一项",
        options: ["每一项", "第一项", "最后一项", "中间项"],
        correct: 0,
        knowledge_point: "整式乘法",
        difficulty: 1,
        time_limit: 8
    },

    // 因式分解填空题
    {
        id: 108,
        content: "把一个多项式化为几个______的乘积形式叫做因式分解",
        options: ["整式", "分式", "单项式", "根式"],
        correct: 0,
        knowledge_point: "因式分解",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 109,
        content: "x² - a²类型的因式分解结果中，两个因式中间是______号",
        options: ["减", "加", "乘", "除"],
        correct: 0,
        knowledge_point: "因式分解",
        difficulty: 2,
        time_limit: 10
    },

    // 整式除法填空题
    {
        id: 110,
        content: "多项式除以单项式时，先把多项式的______分别除以这个单项式",
        options: ["每一项", "第一项", "常数项", "最高次项"],
        correct: 0,
        knowledge_point: "整式除法",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 111,
        content: "多项式除以多项式的结果是______和余式",
        options: ["商式", "商数", "除式", "积分"],
        correct: 0,
        knowledge_point: "整式除法",
        difficulty: 2,
        time_limit: 10
    },

    // 立体图形填空题
    {
        id: 112,
        content: "正方体有______个面、______条棱、______个顶点",
        options: ["6", "8", "12", "4"],
        correct: 0,
        knowledge_point: "立体图形",
        difficulty: 1,
        time_limit: 10
    },

    // 轴对称填空题
    {
        id: 133,
        content: "如果一个图形沿一条直线对折后两部分能完全重合，这个图形叫做______",
        options: ["轴对称图形", "中心对称图形", "对称图形", "全等图形"],
        correct: 0,
        knowledge_point: "轴对称",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 134,
        content: "轴对称图形的对称轴叫做______轴",
        options: ["对称", "中心", "旋转", "反射"],
        correct: 0,
        knowledge_point: "轴对称",
        difficulty: 1,
        time_limit: 6
    },
    {
        id: 135,
        content: "圆有______条对称轴",
        options: ["无数", "1", "2", "4"],
        correct: 0,
        knowledge_point: "轴对称",
        difficulty: 1,
        time_limit: 6
    },

    // 平移旋转填空题
    {
        id: 136,
        content: "图形在平面内沿某个方向移动一定距离，叫做图形的______",
        options: ["平移", "旋转", "对称", "放缩"],
        correct: 0,
        knowledge_point: "平移旋转",
        difficulty: 1,
        time_limit: 6
    },
    {
        id: 137,
        content: "图形绕一个点按一定方向旋转一定角度，叫做图形的______",
        options: ["旋转", "平移", "对称", "放缩"],
        correct: 0,
        knowledge_point: "平移旋转",
        difficulty: 1,
        time_limit: 6
    },
    {
        id: 138,
        content: "图形的平移改变图形的______，不改变图形的______",
        options: ["位置、形状和大小", "形状、位置和大小", "大小、形状和位置", "位置、形状和方向"],
        correct: 0,
        knowledge_point: "平移旋转",
        difficulty: 2,
        time_limit: 10
    },
    {
        id: 113,
        content: "长方体的表面积公式是（长宽高分别为a、b、c）：______",
        options: ["2(ab+bc+ca)", "ab+bc+ca", "abc", "a²+b²+c²"],
        correct: 0,
        knowledge_point: "立体图形",
        difficulty: 2,
        time_limit: 12
    },

    // 三视图填空题
    {
        id: 114,
        content: "从正面看到的图形称为______",
        options: ["主视图", "左视图", "俯视图", "侧视图"],
        correct: 0,
        knowledge_point: "三视图",
        difficulty: 1,
        time_limit: 6
    },
    {
        id: 115,
        content: "从上面看到的图形称为______",
        options: ["俯视图", "主视图", "左视图", "后视图"],
        correct: 0,
        knowledge_point: "三视图",
        difficulty: 1,
        time_limit: 6
    },

    // 相似三角形填空题
    {
        id: 116,
        content: "两个三角形的对应角______，对应边成比例",
        options: ["相等", "互补", "和为180°", "相差90°"],
        correct: 0,
        knowledge_point: "相似三角形",
        difficulty: 2,
        time_limit: 10
    },
    {
        id: 117,
        content: "相似三角形的对应边之比等于______之比",
        options: ["周长", "面积", "高", "对应角"],
        correct: 0,
        knowledge_point: "相似三角形",
        difficulty: 2,
        time_limit: 10
    },

    // 解直角三角形填空题
    {
        id: 118,
        content: "在直角三角形中，sinA = ______/斜边",
        options: ["对边", "邻边", "斜边", "高"],
        correct: 0,
        knowledge_point: "解直角三角形",
        difficulty: 2,
        time_limit: 10
    },
    {
        id: 119,
        content: "在直角三角形中，cosA = ______/斜边",
        options: ["邻边", "对边", "斜边", "高"],
        correct: 0,
        knowledge_point: "解直角三角形",
        difficulty: 2,
        time_limit: 10
    },

    // 几何变换填空题
    {
        id: 120,
        content: "图形的平行移动叫做______",
        options: ["平移", "旋转", "对称", "放缩"],
        correct: 0,
        knowledge_point: "几何变换",
        difficulty: 1,
        time_limit: 6
    },
    {
        id: 121,
        content: "图形绕一个点转动叫做______",
        options: ["旋转", "平移", "对称", "反射"],
        correct: 0,
        knowledge_point: "几何变换",
        difficulty: 1,
        time_limit: 6
    },

    // 数据分析填空题
    {
        id: 122,
        content: "收集数据的常用方法不包括______",
        options: ["猜测", "测量", "调查", "实验"],
        correct: 0,
        knowledge_point: "数据分析",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 123,
        content: "整理数据的主要目的是便于______",
        options: ["分析", "记忆", "计算", "比较"],
        correct: 0,
        knowledge_point: "数据分析",
        difficulty: 1,
        time_limit: 8
    },

    // 统计图填空题
    {
        id: 124,
        content: "条形图主要用于表示数据的______",
        options: ["数量多少", "变化趋势", "部分与整体关系", "概率分布"],
        correct: 0,
        knowledge_point: "统计图",
        difficulty: 1,
        time_limit: 6
    },
    {
        id: 125,
        content: "扇形图主要用于表示数据的______",
        options: ["部分与整体关系", "变化趋势", "数量多少", "相关关系"],
        correct: 0,
        knowledge_point: "统计图",
        difficulty: 1,
        time_limit: 6
    },

    // 方程组应用填空题
    {
        id: 126,
        content: "解决应用问题时，首先要根据题意______",
        options: ["列方程组", "解方程", "计算结果", "验证答案"],
        correct: 0,
        knowledge_point: "方程组应用",
        difficulty: 2,
        time_limit: 10
    },

    // 函数图像变换填空题
    {
        id: 127,
        content: "函数图像向左平移a个单位，函数表达式变为______",
        options: ["f(x+a)", "f(x-a)", "f(a)x", "f(x)+a"],
        correct: 0,
        knowledge_point: "函数图像变换",
        difficulty: 2,
        time_limit: 12
    },
    {
        id: 128,
        content: "函数图像向上平移b个单位，函数表达式变为______",
        options: ["f(x)+b", "f(x)-b", "f(x+b)", "f(x)-b"],
        correct: 0,
        knowledge_point: "函数图像变换",
        difficulty: 2,
        time_limit: 12
    },

    // 不等式组填空题
    {
        id: 129,
        content: "不等式组的解集是各个不等式解集的______",
        options: ["交集", "并集", "补集", "差集"],
        correct: 0,
        knowledge_point: "不等式组",
        difficulty: 2,
        time_limit: 10
    },

    // 无理数与实数填空题
    {
        id: 130,
        content: "实数可以分为______数和无理数",
        options: ["有理", "整", "自然", "负"],
        correct: 0,
        knowledge_point: "无理数与实数",
        difficulty: 2,
        time_limit: 8
    },
    {
        id: 131,
        content: "数轴上的______与实数一一对应",
        options: ["点", "线段", "距离", "区间"],
        correct: 0,
        knowledge_point: "无理数与实数",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 102,
        content: "相反数相加的和等于______",
        options: ["0", "1", "-1", "原数"],
        correct: 0,
        knowledge_point: "有理数",
        difficulty: 1,
        time_limit: 6
    },
    {
        id: 103,
        content: "绝对值等于本身的数是______",
        options: ["非负数", "正数", "负数", "整数"],
        correct: 0,
        knowledge_point: "有理数",
        difficulty: 2,
        time_limit: 8
    },
    
    // 整式填空题
    {
        id: 104,
        content: "单项式中，数字因数叫做字母的______",
        options: ["系数", "指数", "次数", "底数"],
        correct: 0,
        knowledge_point: "整式",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 105,
        content: "多项式中，次数最高的项叫做______项",
        options: ["最高次", "常数", "一次", "二次"],
        correct: 0,
        knowledge_point: "整式",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 106,
        content: "合并同类项时，______不变",
        options: ["字母部分", "系数", "次数", "符号"],
        correct: 0,
        knowledge_point: "整式",
        difficulty: 1,
        time_limit: 6
    },
    
    // 一元一次方程填空题
    {
        id: 107,
        content: "一元一次方程的标准形式是ax + b = 0，其中a______",
        options: ["≠0", "=0", ">0", "<0"],
        correct: 0,
        knowledge_point: "一元一次方程",
        difficulty: 2,
        time_limit: 8
    },
    {
        id: 108,
        content: "解方程的原理是等式两边同时______同一个数",
        options: ["加减乘除", "加上", "减去", "乘以"],
        correct: 0,
        knowledge_point: "一元一次方程",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 109,
        content: "方程的解是使等式成立的______的值",
        options: ["未知数", "已知数", "系数", "常数"],
        correct: 0,
        knowledge_point: "一元一次方程",
        difficulty: 1,
        time_limit: 8
    },
    
    // 基础几何填空题
    {
        id: 110,
        content: "两点确定一条______",
        options: ["直线", "射线", "线段", "平面"],
        correct: 0,
        knowledge_point: "基础几何",
        difficulty: 1,
        time_limit: 6
    },
    {
        id: 111,
        content: "两直线相交有一个______",
        options: ["交点", "端点", "中点", "垂点"],
        correct: 0,
        knowledge_point: "基础几何",
        difficulty: 1,
        time_limit: 6
    },
    {
        id: 112,
        content: "角的两边是______",
        options: ["射线", "直线", "线段", "曲线"],
        correct: 0,
        knowledge_point: "基础几何",
        difficulty: 1,
        time_limit: 6
    },
    
    // 实数填空题
    {
        id: 113,
        content: "无理数也叫______数",
        options: ["无限不循环小", "无限循环小", "有限小", "整数"],
        correct: 0,
        knowledge_point: "实数",
        difficulty: 2,
        time_limit: 8
    },
    {
        id: 114,
        content: "√a中的a叫做______数",
        options: ["被开方", "开方", "根", "底"],
        correct: 0,
        knowledge_point: "实数",
        difficulty: 2,
        time_limit: 8
    },
    {
        id: 115,
        content: "实数包括______数和无理数",
        options: ["有理", "整数", "自然", "分数"],
        correct: 0,
        knowledge_point: "实数",
        difficulty: 1,
        time_limit: 6
    },
    
    // 分式填空题
    {
        id: 116,
        content: "分式中，______不能为零",
        options: ["分母", "分子", "系数", "字母"],
        correct: 0,
        knowledge_point: "分式",
        difficulty: 1,
        time_limit: 6
    },
    {
        id: 117,
        content: "分式约分时，约去______",
        options: ["公因式", "系数", "字母", "次数"],
        correct: 0,
        knowledge_point: "分式",
        difficulty: 2,
        time_limit: 8
    },
    {
        id: 118,
        content: "异分母分式相加减要先______",
        options: ["通分", "约分", "化简", "分解"],
        correct: 0,
        knowledge_point: "分式",
        difficulty: 1,
        time_limit: 8
    },
    
    // 二元一次方程组填空题
    {
        id: 119,
        content: "二元一次方程组的解是使两个方程都成立的______",
        options: ["数对", "数", "方程", "表达式"],
        correct: 0,
        knowledge_point: "二元一次方程组",
        difficulty: 2,
        time_limit: 8
    },
    {
        id: 120,
        content: "消元法是通过消去一个______来解方程组",
        options: ["未知数", "方程", "系数", "常数"],
        correct: 0,
        knowledge_point: "二元一次方程组",
        difficulty: 2,
        time_limit: 10
    },
    
    // 不等式填空题
    {
        id: 121,
        content: "不等式两边同时乘以负数，______方向改变",
        options: ["不等号", "等号", "变量", "系数"],
        correct: 0,
        knowledge_point: "不等式",
        difficulty: 2,
        time_limit: 8
    },
    {
        id: 122,
        content: "不等式的解集表示所有满足不等式的______",
        options: ["未知数值", "方程", "等式", "函数"],
        correct: 0,
        knowledge_point: "不等式",
        difficulty: 1,
        time_limit: 8
    },
    
    // 二次根式填空题
    {
        id: 123,
        content: "√a² = |a|，这叫做二次根式的______性质",
        options: ["算术平方根", "代数", "几何", "物理"],
        correct: 0,
        knowledge_point: "二次根式",
        difficulty: 3,
        time_limit: 10
    },
    {
        id: 124,
        content: "被开方数必须是______数",
        options: ["非负", "正", "负", "整数"],
        correct: 0,
        knowledge_point: "二次根式",
        difficulty: 2,
        time_limit: 8
    },
    {
        id: 125,
        content: "二次根式化简时要开尽______因数",
        options: ["平方", "立方", "四次方", "质"],
        correct: 0,
        knowledge_point: "二次根式",
        difficulty: 2,
        time_limit: 10
    },
    
    // 函数概念填空题
    {
        id: 126,
        content: "函数的定义域是自变量x的______",
        options: ["取值范围", "值域", "图像", "表达式"],
        correct: 0,
        knowledge_point: "函数概念",
        difficulty: 2,
        time_limit: 8
    },
    {
        id: 127,
        content: "函数的值域是函数值y的______",
        options: ["取值范围", "定义域", "变量", "常量"],
        correct: 0,
        knowledge_point: "函数概念",
        difficulty: 2,
        time_limit: 8
    },
    {
        id: 128,
        content: "函数图像上每一点的横坐标是______值",
        options: ["自变量", "因变量", "函数", "常数"],
        correct: 0,
        knowledge_point: "函数概念",
        difficulty: 1,
        time_limit: 8
    },
    
    // 一次函数填空题
    {
        id: 129,
        content: "一次函数y = kx + b中，b叫做______",
        options: ["截距", "斜率", "变量", "系数"],
        correct: 0,
        knowledge_point: "一次函数",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 130,
        content: "正比例函数是当______时的一次函数",
        options: ["b=0", "k=0", "x=0", "y=0"],
        correct: 0,
        knowledge_point: "一次函数",
        difficulty: 2,
        time_limit: 8
    },
    {
        id: 131,
        content: "一次函数的图像是______",
        options: ["直线", "曲线", "抛物线", "双曲线"],
        correct: 0,
        knowledge_point: "一次函数",
        difficulty: 1,
        time_limit: 6
    },
    
    // 反比例函数填空题
    {
        id: 132,
        content: "反比例函数的一般形式是y = ____",
        options: ["k/x", "kx", "x/k", "kx+b"],
        correct: 0,
        knowledge_point: "反比例函数",
        difficulty: 1,
        time_limit: 6
    },
    {
        id: 133,
        content: "反比例函数的图像是______",
        options: ["双曲线", "直线", "抛物线", "圆"],
        correct: 0,
        knowledge_point: "反比例函数",
        difficulty: 2,
        time_limit: 8
    },
    {
        id: 134,
        content: "反比例函数中k>0时，图像在第______象限",
        options: ["一、三", "一、二", "二、四", "三、四"],
        correct: 0,
        knowledge_point: "反比例函数",
        difficulty: 2,
        time_limit: 10
    },
    
    // 三角形填空题
    {
        id: 135,
        content: "三角形内角和定理：三角形三个内角的和等于______",
        options: ["180°", "90°", "360°", "270°"],
        correct: 0,
        knowledge_point: "三角形",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 136,
        content: "三角形两边之和______第三边",
        options: ["大于", "小于", "等于", "不大于"],
        correct: 0,
        knowledge_point: "三角形",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 137,
        content: "等腰三角形的______相等",
        options: ["底角", "腰角", "顶角", "所有角"],
        correct: 0,
        knowledge_point: "三角形",
        difficulty: 1,
        time_limit: 6
    },
    {
        id: 138,
        content: "直角三角形中，勾股定理：a² + b² = ____",
        options: ["c²", "c", "2c", "√c"],
        correct: 0,
        knowledge_point: "三角形",
        difficulty: 2,
        time_limit: 8
    },
    
    // 四边形填空题
    {
        id: 139,
        content: "平行四边形的对边______",
        options: ["平行且相等", "垂直", "相等", "平行"],
        correct: 0,
        knowledge_point: "四边形",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 140,
        content: "矩形的四个角都是______角",
        options: ["直", "锐", "钝", "平"],
        correct: 0,
        knowledge_point: "四边形",
        difficulty: 1,
        time_limit: 6
    },
    {
        id: 141,
        content: "菱形的四条边都______",
        options: ["相等", "平行", "垂直", "相等且平行"],
        correct: 0,
        knowledge_point: "四边形",
        difficulty: 1,
        time_limit: 6
    },
    
    // 一元二次方程填空题
    {
        id: 142,
        content: "一元二次方程的一般形式是ax² + bx + c = 0，其中a______",
        options: ["≠0", "=0", ">0", "<0"],
        correct: 0,
        knowledge_point: "一元二次方程",
        difficulty: 2,
        time_limit: 8
    },
    {
        id: 143,
        content: "判别式Δ = b² - 4ac，当Δ>0时，方程有______实根",
        options: ["两个不等", "两个相等", "一个", "无"],
        correct: 0,
        knowledge_point: "一元二次方程",
        difficulty: 3,
        time_limit: 10
    },
    {
        id: 144,
        content: "一元二次方程的求根公式中，被开方数是______",
        options: ["判别式", "二次项系数", "一次项系数", "常数项"],
        correct: 0,
        knowledge_point: "一元二次方程",
        difficulty: 3,
        time_limit: 12
    },
    
    // 二次函数填空题
    {
        id: 145,
        content: "二次函数y = ax² + bx + c中，a决定______",
        options: ["开口方向", "开口大小", "顶点位置", "对称轴"],
        correct: 0,
        knowledge_point: "二次函数",
        difficulty: 2,
        time_limit: 8
    },
    {
        id: 146,
        content: "二次函数的顶点横坐标是______",
        options: ["-b/2a", "b/2a", "-b/a", "b/a"],
        correct: 0,
        knowledge_point: "二次函数",
        difficulty: 3,
        time_limit: 12
    },
    {
        id: 147,
        content: "二次函数的对称轴是直线x = ____",
        options: ["-b/2a", "b/2a", "-b/a", "b/a"],
        correct: 0,
        knowledge_point: "二次函数",
        difficulty: 3,
        time_limit: 12
    },
    
    // 圆填空题
    {
        id: 148,
        content: "圆的周长公式C = ____",
        options: ["2πr", "πr²", "πd", "πr"],
        correct: 0,
        knowledge_point: "圆",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 149,
        content: "圆的面积公式S = ____",
        options: ["πr²", "2πr", "πd", "πr"],
        correct: 0,
        knowledge_point: "圆",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 150,
        content: "圆中连接圆心和圆上任意一点的线段叫做______",
        options: ["半径", "直径", "弦", "切线"],
        correct: 0,
        knowledge_point: "圆",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 151,
        content: "圆中通过圆心的弦叫做______",
        options: ["直径", "半径", "切线", "割线"],
        correct: 0,
        knowledge_point: "圆",
        difficulty: 1,
        time_limit: 6
    },
    
    // 统计填空题
    {
        id: 152,
        content: "一组数据中出现次数最多的数叫做______",
        options: ["众数", "中位数", "平均数", "方差"],
        correct: 0,
        knowledge_point: "统计",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 153,
        content: "将数据按大小排列，最中间的数叫做______",
        options: ["中位数", "众数", "平均数", "极差"],
        correct: 0,
        knowledge_point: "统计",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 154,
        content: "数据的平均数等于数据总和除以______",
        options: ["数据个数", "最大值", "最小值", "极差"],
        correct: 0,
        knowledge_point: "统计",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 155,
        content: "最大值减最小值得到______",
        options: ["极差", "方差", "标准差", "平均差"],
        correct: 0,
        knowledge_point: "统计",
        difficulty: 2,
        time_limit: 8
    },
    
    // 概率填空题
    {
        id: 156,
        content: "随机事件的概率在______之间",
        options: ["0和1", "-1和1", "0和2", "-1和0"],
        correct: 0,
        knowledge_point: "概率",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 157,
        content: "必然事件的概率等于______",
        options: ["1", "0", "0.5", "不确定"],
        correct: 0,
        knowledge_point: "概率",
        difficulty: 1,
        time_limit: 6
    },
    {
        id: 158,
        content: "不可能事件的概率等于______",
        options: ["0", "1", "0.5", "不确定"],
        correct: 0,
        knowledge_point: "概率",
        difficulty: 1,
        time_limit: 6
    },
    {
        id: 159,
        content: "古典概型中，P(A) = ____",
        options: ["事件A包含的基本事件数/基本事件总数", "基本事件总数/事件A包含的基本事件数", "事件A的次数/总次数", "有利结果数/不利结果数"],
        correct: 0,
        knowledge_point: "概率",
        difficulty: 3,
        time_limit: 12
    }
];

// 记录正确答案分布的历史记录
class AnswerDistributionAnalyzer {
    constructor() {
        this.recentAnswers = []; // 记录最近N个题目的正确答案位置
        this.maxHistorySize = 20; // 记录最近20个题目
        this.distributionTarget = [0.25, 0.25, 0.25, 0.25]; // 目标分布：每个位置25%
    }

    // 添加新的正确答案记录
    addAnswer(position) {
        this.recentAnswers.push(position);
        if (this.recentAnswers.length > this.maxHistorySize) {
            this.recentAnswers.shift();
        }
    }

    // 计算当前位置的实际分布
    getCurrentDistribution() {
        const distribution = [0, 0, 0, 0];
        const total = this.recentAnswers.length;
        
        if (total === 0) return distribution;
        
        this.recentAnswers.forEach(pos => {
            distribution[pos]++;
        });
        
        return distribution.map(count => count / total);
    }

    // 计算每个位置的"饥饿度"（越少出现越饥饿）
    calculateHunger() {
        const currentDist = this.getCurrentDistribution();
        return currentDist.map((actual, index) => {
            return this.distributionTarget[index] - actual;
        });
    }

    // 获取最需要补充的位置（最饥饿的位置）
    getMostNeededPositions() {
        const hunger = this.calculateHunger();
        const maxHunger = Math.max(...hunger);
        
        // 返回所有具有最大饥饿度的位置
        return hunger.map((h, index) => h === maxHunger ? index : -1)
                     .filter(index => index !== -1);
    }

    // 重置历史记录
    reset() {
        this.recentAnswers = [];
    }

    // 获取分布统计信息
    getStatistics() {
        if (this.recentAnswers.length === 0) {
            return { total: 0, distribution: [0, 0, 0, 0], variance: 0 };
        }

        const distribution = [0, 0, 0, 0];
        this.recentAnswers.forEach(pos => {
            distribution[pos]++;
        });

        const total = this.recentAnswers.length;
        const percentages = distribution.map(count => (count / total) * 100);

        // 计算方差（衡量分布均匀程度）
        const expected = 25; // 期望每个位置25%
        const variance = percentages.reduce((sum, actual) => {
            return sum + Math.pow(actual - expected, 2);
        }, 0) / 4;

        return {
            total,
            distribution: percentages,
            variance: Math.round(variance * 100) / 100
        };
    }
}

// 记忆风暴专用题目（纯概念定义填空）
const MEMORY_QUESTIONS = [
    // 数的概念
    {
        id: 201,
        content: "既不是正数也不是负数的数是______",
        options: ["零", "正数", "负数", "整数"],
        correct: 0,
        knowledge_point: "有理数",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 202,
        content: "相反数相加的和等于______",
        options: ["零", "一", "正数", "负数"],
        correct: 0,
        knowledge_point: "有理数",
        difficulty: 1,
        time_limit: 6
    },
    {
        id: 203,
        content: "绝对值等于本身的数是______",
        options: ["非负数", "正数", "负数", "整数"],
        correct: 0,
        knowledge_point: "有理数",
        difficulty: 2,
        time_limit: 8
    },

    // 代数概念
    {
        id: 204,
        content: "单项式中，数字因数叫做字母的______",
        options: ["系数", "指数", "次数", "底数"],
        correct: 0,
        knowledge_point: "整式",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 205,
        content: "多项式中，次数最高的项叫做______项",
        options: ["最高次", "常数", "一次", "二次"],
        correct: 0,
        knowledge_point: "整式",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 206,
        content: "合并同类项时，______不变",
        options: ["字母部分", "系数", "次数", "符号"],
        correct: 0,
        knowledge_point: "整式",
        difficulty: 1,
        time_limit: 6
    },

    // 方程概念
    {
        id: 207,
        content: "一元一次方程的标准形式是ax + b = 0，其中a______",
        options: ["不等于零", "等于零", "大于零", "小于零"],
        correct: 0,
        knowledge_point: "一元一次方程",
        difficulty: 2,
        time_limit: 8
    },
    {
        id: 208,
        content: "方程的解是使等式成立的______的值",
        options: ["未知数", "已知数", "系数", "常数"],
        correct: 0,
        knowledge_point: "一元一次方程",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 209,
        content: "一元二次方程的一般形式是ax² + bx + c = 0，其中a______",
        options: ["不等于零", "等于零", "大于零", "小于零"],
        correct: 0,
        knowledge_point: "一元二次方程",
        difficulty: 2,
        time_limit: 8
    },

    // 几何概念
    {
        id: 210,
        content: "两点确定一条______",
        options: ["直线", "射线", "线段", "平面"],
        correct: 0,
        knowledge_point: "基础几何",
        difficulty: 1,
        time_limit: 6
    },
    {
        id: 211,
        content: "角的两边是______",
        options: ["射线", "直线", "线段", "曲线"],
        correct: 0,
        knowledge_point: "基础几何",
        difficulty: 1,
        time_limit: 6
    },
    {
        id: 212,
        content: "三角形内角和定理：三角形三个内角的和等于______",
        options: ["180°", "90°", "360°", "270°"],
        correct: 0,
        knowledge_point: "三角形",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 213,
        content: "等腰三角形的两个______相等",
        options: ["底角", "腰角", "顶角", "所有角"],
        correct: 0,
        knowledge_point: "三角形",
        difficulty: 1,
        time_limit: 6
    },
    {
        id: 214,
        content: "直角三角形中，勾股定理：a² + b² = ______",
        options: ["c²", "c", "2c", "√c"],
        correct: 0,
        knowledge_point: "三角形",
        difficulty: 2,
        time_limit: 8
    },

    // 函数概念
    {
        id: 215,
        content: "函数的定义域是自变量x的______",
        options: ["取值范围", "值域", "图像", "表达式"],
        correct: 0,
        knowledge_point: "函数概念",
        difficulty: 2,
        time_limit: 8
    },
    {
        id: 216,
        content: "函数的值域是函数值y的______",
        options: ["取值范围", "定义域", "变量", "常量"],
        correct: 0,
        knowledge_point: "函数概念",
        difficulty: 2,
        time_limit: 8
    },
    {
        id: 217,
        content: "一次函数的一般形式是y = kx + b，其中k叫做______",
        options: ["斜率", "截距", "变量", "系数"],
        correct: 0,
        knowledge_point: "一次函数",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 218,
        content: "一次函数y = kx + b中，b叫做______",
        options: ["截距", "斜率", "变量", "系数"],
        correct: 0,
        knowledge_point: "一次函数",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 219,
        content: "反比例函数的一般形式是y = ______",
        options: ["k/x", "kx", "x/k", "kx+b"],
        correct: 0,
        knowledge_point: "反比例函数",
        difficulty: 1,
        time_limit: 6
    },

    // 统计概念
    {
        id: 220,
        content: "一组数据中出现次数最多的数叫做______",
        options: ["众数", "中位数", "平均数", "极差"],
        correct: 0,
        knowledge_point: "统计",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 221,
        content: "将数据按大小排列，最中间的数叫做______",
        options: ["中位数", "众数", "平均数", "极差"],
        correct: 0,
        knowledge_point: "统计",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 222,
        content: "数据的平均数等于数据总和除以______",
        options: ["数据个数", "最大值", "最小值", "极差"],
        correct: 0,
        knowledge_point: "统计",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 223,
        content: "最大值减最小值得到______",
        options: ["极差", "方差", "标准差", "平均差"],
        correct: 0,
        knowledge_point: "统计",
        difficulty: 2,
        time_limit: 8
    },

    // 概率概念
    {
        id: 224,
        content: "随机事件的概率在______之间",
        options: ["0和1", "-1和1", "0和2", "-1和0"],
        correct: 0,
        knowledge_point: "概率",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 225,
        content: "必然事件的概率等于______",
        options: ["1", "0", "0.5", "不确定"],
        correct: 0,
        knowledge_point: "概率",
        difficulty: 1,
        time_limit: 6
    },
    {
        id: 226,
        content: "不可能事件的概率等于______",
        options: ["0", "1", "0.5", "不确定"],
        correct: 0,
        knowledge_point: "概率",
        difficulty: 1,
        time_limit: 6
    },

    // 根式概念
    {
        id: 227,
        content: "无理数也叫______小数",
        options: ["无限不循环", "无限循环", "有限", "整数"],
        correct: 0,
        knowledge_point: "实数",
        difficulty: 2,
        time_limit: 8
    },
    {
        id: 228,
        content: "√a中的a叫做______数",
        options: ["被开方", "开方", "根", "底"],
        correct: 0,
        knowledge_point: "实数",
        difficulty: 2,
        time_limit: 8
    },
    {
        id: 229,
        content: "二次根式化简时要开尽______因数",
        options: ["平方", "立方", "四次方", "质"],
        correct: 0,
        knowledge_point: "二次根式",
        difficulty: 2,
        time_limit: 10
    },

    // 分式概念
    {
        id: 230,
        content: "分式中，______不能为零",
        options: ["分母", "分子", "系数", "字母"],
        correct: 0,
        knowledge_point: "分式",
        difficulty: 1,
        time_limit: 6
    },
    {
        id: 231,
        content: "分式约分时，约去______",
        options: ["公因式", "系数", "字母", "次数"],
        correct: 0,
        knowledge_point: "分式",
        difficulty: 2,
        time_limit: 8
    },
    {
        id: 232,
        content: "异分母分式相加减要先______",
        options: ["通分", "约分", "化简", "分解"],
        correct: 0,
        knowledge_point: "分式",
        difficulty: 1,
        time_limit: 8
    },

    // 不等式概念
    {
        id: 233,
        content: "不等式两边同时乘以负数，______方向改变",
        options: ["不等号", "等号", "变量", "系数"],
        correct: 0,
        knowledge_point: "不等式",
        difficulty: 2,
        time_limit: 8
    },
    {
        id: 234,
        content: "不等式的解集表示所有满足不等式的______",
        options: ["未知数值", "方程", "等式", "函数"],
        correct: 0,
        knowledge_point: "不等式",
        difficulty: 1,
        time_limit: 8
    },

    // 圆的概念
    {
        id: 235,
        content: "圆的周长公式是______",
        options: ["2πr", "πr²", "πd", "πr"],
        correct: 0,
        knowledge_point: "圆",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 236,
        content: "圆的面积公式是______",
        options: ["πr²", "2πr", "πd", "πr"],
        correct: 0,
        knowledge_point: "圆",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 237,
        content: "圆中连接圆心和圆上任意一点的线段叫做______",
        options: ["半径", "直径", "弦", "切线"],
        correct: 0,
        knowledge_point: "圆",
        difficulty: 1,
        time_limit: 8
    },
    {
        id: 238,
        content: "圆中通过圆心的弦叫做______",
        options: ["直径", "半径", "切线", "割线"],
        correct: 0,
        knowledge_point: "圆",
        difficulty: 1,
        time_limit: 6
    }
];

// 题目管理器
class QuestionManager {
    constructor() {
        this.allQuestions = [...GAME_QUESTIONS, ...FILL_IN_BLANK_QUESTIONS, ...MEMORY_QUESTIONS];
        this.usedQuestions = [];
        this.currentDifficulty = 1;
        this.correctAnswerDistribution = [0, 0, 0, 0]; // 跟踪A, B, C, D选项被用作正确答案的次数
        this.currentSemester = null; // 当前选择的学期
        this.distributionAnalyzer = new AnswerDistributionAnalyzer(); // 新的分布分析器
    }

    // 设置学期筛选
    setSemester(semester) {
        this.currentSemester = semester;
        this.reset(); // 重置已使用题目
    }

    // 获取学期筛选后的题目
    getFilteredQuestions() {
        if (!this.currentSemester) {
            return this.allQuestions;
        }

        const targetOrder = SEMESTERS[this.currentSemester].order;
        return this.allQuestions.filter(question => {
            const questionSemester = question.knowledge_point;
            const kpInfo = KNOWLEDGE_POINTS[questionSemester];
            if (!kpInfo || !kpInfo.semester) return true;

            const questionOrder = SEMESTERS[kpInfo.semester]?.order || 6; // 如果没有学期信息，默认为最高年级
            return questionOrder <= targetOrder;
        });
    }
    
    // 获取随机题目，使用新的智能分布算法
    getRandomQuestion(knowledgePoint = null, difficulty = null) {
        let baseQuestions = this.getFilteredQuestions();
        let availableQuestions = baseQuestions.filter(q => !this.usedQuestions.includes(q.id));

        if (knowledgePoint) {
            availableQuestions = availableQuestions.filter(q => q.knowledge_point === knowledgePoint);
        }

        if (difficulty) {
            availableQuestions = availableQuestions.filter(q => q.difficulty === difficulty);
        }

        if (availableQuestions.length === 0) {
            this.usedQuestions = [];
            this.correctAnswerDistribution = [0, 0, 0, 0]; // 重置分布计数
            this.distributionAnalyzer.reset(); // 重置分布分析器
            availableQuestions = baseQuestions;
            if (knowledgePoint) {
                availableQuestions = availableQuestions.filter(q => q.knowledge_point === knowledgePoint);
            }
            if (difficulty) {
                availableQuestions = availableQuestions.filter(q => q.difficulty === difficulty);
            }
        }

        // 使用新的智能分布算法选择题目
        const selectedQuestion = this.selectQuestionWithSmartDistribution(availableQuestions);
        
        // 标记题目为已使用
        this.usedQuestions.push(selectedQuestion.id);
        
        // 更新分布计数
        this.correctAnswerDistribution[selectedQuestion.correct]++;
        
        // 更新分布分析器
        this.distributionAnalyzer.addAnswer(selectedQuestion.correct);

        return selectedQuestion;
    }

    // 智能分布算法选择题目
    selectQuestionWithSmartDistribution(availableQuestions) {
        if (availableQuestions.length === 1) {
            return availableQuestions[0];
        }

        // 获取最需要补充的位置
        const mostNeededPositions = this.distributionAnalyzer.getMostNeededPositions();
        
        // 如果有多个位置需求程度相同，优先选择出现次数最少的
        let candidateQuestions = [];
        
        if (mostNeededPositions.length > 0) {
            // 找到在需求位置上的题目
            candidateQuestions = availableQuestions.filter(q => 
                mostNeededPositions.includes(q.correct)
            );
        }

        // 如果在需求位置上找到题目，从中随机选择
        if (candidateQuestions.length > 0) {
            const randomIndex = Math.floor(Math.random() * candidateQuestions.length);
            return candidateQuestions[randomIndex];
        }

        // 如果没有找到，使用传统的平衡算法作为备选
        return this.findBalancedQuestion(availableQuestions);
    }

    // 找到能够平衡正确答案分布的题目（保留原算法作为备选）
    findBalancedQuestion(availableQuestions) {
        if (availableQuestions.length === 1) {
            return availableQuestions[0];
        }

        // 找到当前使用次数最少的正确答案位置
        const minCount = Math.min(...this.correctAnswerDistribution);
        const preferredPositions = [];
        for (let i = 0; i < 4; i++) {
            if (this.correctAnswerDistribution[i] === minCount) {
                preferredPositions.push(i);
            }
        }

        // 优先选择正确答案在偏好位置的问题
        const preferredQuestions = availableQuestions.filter(q =>
            preferredPositions.includes(q.correct)
        );

        if (preferredQuestions.length > 0) {
            const randomIndex = Math.floor(Math.random() * preferredQuestions.length);
            return preferredQuestions[randomIndex];
        }

        // 如果没有找到，从所有可用题目中随机选择
        const randomIndex = Math.floor(Math.random() * availableQuestions.length);
        return availableQuestions[randomIndex];
    }
    
    // 根据难度获取题目（使用平衡分布）
    getQuestionByDifficulty(currentScore, combo) {
        let targetDifficulty = 1;

        // 根据分数和连击调整难度
        if (currentScore >= 100 && combo >= 5) {
            targetDifficulty = 3;
        } else if (currentScore >= 50 || combo >= 3) {
            targetDifficulty = 2;
        }

        return this.getRandomQuestion(null, targetDifficulty);
    }
    
    // 获取记忆风暴题目（使用智能分布）
    getMemoryQuestion() {
        let memoryQuestions = this.getFilteredQuestions().filter(q =>
            MEMORY_QUESTIONS.some(mq => mq.id === q.id) && !this.usedQuestions.includes(q.id)
        );

        if (memoryQuestions.length === 0) {
            this.usedQuestions = [];
            this.correctAnswerDistribution = [0, 0, 0, 0]; // 重置分布计数
            this.distributionAnalyzer.reset(); // 重置分布分析器
            memoryQuestions = this.getFilteredQuestions().filter(q =>
                MEMORY_QUESTIONS.some(mq => mq.id === q.id)
            );
        }

        // 使用智能分布算法选择题目
        const selectedQuestion = this.selectQuestionWithSmartDistribution(memoryQuestions);
        this.usedQuestions.push(selectedQuestion.id);
        this.correctAnswerDistribution[selectedQuestion.correct]++;
        this.distributionAnalyzer.addAnswer(selectedQuestion.correct);

        return selectedQuestion;
    }
    
    // 获取填空题（使用智能分布）
    getFillInBlankQuestion(knowledgePoint = null) {
        let fillInQuestions = this.getFilteredQuestions().filter(q =>
            FILL_IN_BLANK_QUESTIONS.some(fq => fq.id === q.id) && !this.usedQuestions.includes(q.id)
        );

        if (knowledgePoint) {
            fillInQuestions = fillInQuestions.filter(q => q.knowledge_point === knowledgePoint);
        }

        if (fillInQuestions.length === 0) {
            this.usedQuestions = [];
            this.correctAnswerDistribution = [0, 0, 0, 0]; // 重置分布计数
            this.distributionAnalyzer.reset(); // 重置分布分析器
            fillInQuestions = this.getFilteredQuestions().filter(q =>
                FILL_IN_BLANK_QUESTIONS.some(fq => fq.id === q.id)
            );
            if (knowledgePoint) {
                fillInQuestions = fillInQuestions.filter(q => q.knowledge_point === knowledgePoint);
            }
        }

        // 使用智能分布算法选择题目
        const selectedQuestion = this.selectQuestionWithSmartDistribution(fillInQuestions);
        this.usedQuestions.push(selectedQuestion.id);
        this.correctAnswerDistribution[selectedQuestion.correct]++;
        this.distributionAnalyzer.addAnswer(selectedQuestion.correct);

        return selectedQuestion;
    }
    
    // 获取知识点列表
    getKnowledgePoints() {
        let knowledgePoints = Object.keys(KNOWLEDGE_POINTS);

        // 如果设置了学期筛选，只返回该学期及之前的知识点
        if (this.currentSemester) {
            const targetOrder = SEMESTERS[this.currentSemester].order;
            knowledgePoints = knowledgePoints.filter(kp => {
                const kpInfo = KNOWLEDGE_POINTS[kp];
                if (!kpInfo || !kpInfo.semester) return true;

                const kpOrder = SEMESTERS[kpInfo.semester]?.order || 6;
                return kpOrder <= targetOrder;
            });
        }

        return knowledgePoints;
    }

    // 获取学期列表
    getSemesters() {
        return Object.keys(SEMESTERS);
    }

    // 获取学期信息
    getSemesterInfo(semester) {
        return SEMESTERS[semester];
    }
    
    // 获取知识点信息
    getKnowledgePointInfo(knowledgePoint) {
        return KNOWLEDGE_POINTS[knowledgePoint];
    }
    
    // 重置已使用题目
    reset() {
        this.usedQuestions = [];
        this.currentDifficulty = 1;
        this.correctAnswerDistribution = [0, 0, 0, 0]; // 重置正确答案分布计数
        this.distributionAnalyzer.reset(); // 重置分布分析器
    }
}

// 导出
window.QuestionManager = QuestionManager;
window.KNOWLEDGE_POINTS = KNOWLEDGE_POINTS;
