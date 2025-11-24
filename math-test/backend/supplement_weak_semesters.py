"""
补充题目较少的学期
重点补充：八年级上（仅6道）、九年级上（仅12道）
"""
from models import db, Question

# 补充题目数据
supplement_questions = [
    # ========== 八年级上 - 二次根式（补充更多题目）==========
    {
        'content': '计算：$\\sqrt{20} = ?$',
        'options': ['$2\\sqrt{5}$', '$4\\sqrt{5}$', '$5\\sqrt{2}$', '$10\\sqrt{2}$'],
        'correct_answer': 0,
        'difficulty': 0.5,
        'discrimination': 1.1,
        'knowledge_points': ['二次根式'],
        'category': '数与式',
        'semester': '八年级上',
        'explanation': '$\\sqrt{20} = \\sqrt{4 \\times 5} = 2\\sqrt{5}$。'
    },
    {
        'content': '计算：$\\sqrt{32} = ?$',
        'options': ['$4\\sqrt{2}$', '$8\\sqrt{2}$', '$2\\sqrt{8}$', '$16\\sqrt{2}$'],
        'correct_answer': 0,
        'difficulty': 0.6,
        'discrimination': 1.1,
        'knowledge_points': ['二次根式'],
        'category': '数与式',
        'semester': '八年级上',
        'explanation': '$\\sqrt{32} = \\sqrt{16 \\times 2} = 4\\sqrt{2}$。'
    },
    {
        'content': '计算：$\\sqrt{45} = ?$',
        'options': ['$3\\sqrt{5}$', '$5\\sqrt{3}$', '$9\\sqrt{5}$', '$15\\sqrt{3}$'],
        'correct_answer': 0,
        'difficulty': 0.6,
        'discrimination': 1.1,
        'knowledge_points': ['二次根式'],
        'category': '数与式',
        'semester': '八年级上',
        'explanation': '$\\sqrt{45} = \\sqrt{9 \\times 5} = 3\\sqrt{5}$。'
    },
    {
        'content': '计算：$\\sqrt{75} = ?$',
        'options': ['$5\\sqrt{3}$', '$3\\sqrt{5}$', '$15\\sqrt{5}$', '$25\\sqrt{3}$'],
        'correct_answer': 0,
        'difficulty': 0.7,
        'discrimination': 1.2,
        'knowledge_points': ['二次根式'],
        'category': '数与式',
        'semester': '八年级上',
        'explanation': '$\\sqrt{75} = \\sqrt{25 \\times 3} = 5\\sqrt{3}$。'
    },
    {
        'content': '计算：$\\sqrt{98} = ?$',
        'options': ['$7\\sqrt{2}$', '$2\\sqrt{7}$', '$14\\sqrt{2}$', '$49\\sqrt{2}$'],
        'correct_answer': 0,
        'difficulty': 0.7,
        'discrimination': 1.2,
        'knowledge_points': ['二次根式'],
        'category': '数与式',
        'semester': '八年级上',
        'explanation': '$\\sqrt{98} = \\sqrt{49 \\times 2} = 7\\sqrt{2}$。'
    },
    {
        'content': '计算：$\\sqrt{3} \\times \\sqrt{12} = ?$',
        'options': ['$6$', '$\\sqrt{15}$', '$\\sqrt{36}$', '$15$'],
        'correct_answer': 0,
        'difficulty': 0.6,
        'discrimination': 1.1,
        'knowledge_points': ['二次根式'],
        'category': '数与式',
        'semester': '八年级上',
        'explanation': '$\\sqrt{3} \\times \\sqrt{12} = \\sqrt{3 \\times 12} = \\sqrt{36} = 6$。'
    },
    {
        'content': '计算：$\\sqrt{27} - \\sqrt{12} = ?$',
        'options': ['$\\sqrt{3}$', '$\\sqrt{15}$', '$3\\sqrt{3}$', '$5\\sqrt{3}$'],
        'correct_answer': 0,
        'difficulty': 0.8,
        'discrimination': 1.2,
        'knowledge_points': ['二次根式'],
        'category': '数与式',
        'semester': '八年级上',
        'explanation': '$\\sqrt{27} = 3\\sqrt{3}$，$\\sqrt{12} = 2\\sqrt{3}$，所以$\\sqrt{27} - \\sqrt{12} = 3\\sqrt{3} - 2\\sqrt{3} = \\sqrt{3}$。'
    },
    {
        'content': '计算：$\\sqrt{24} + \\sqrt{54} = ?$',
        'options': ['$5\\sqrt{6}$', '$7\\sqrt{6}$', '$6\\sqrt{5}$', '$8\\sqrt{6}$'],
        'correct_answer': 0,
        'difficulty': 0.9,
        'discrimination': 1.3,
        'knowledge_points': ['二次根式'],
        'category': '数与式',
        'semester': '八年级上',
        'explanation': '$\\sqrt{24} = 2\\sqrt{6}$，$\\sqrt{54} = 3\\sqrt{6}$，所以$\\sqrt{24} + \\sqrt{54} = 2\\sqrt{6} + 3\\sqrt{6} = 5\\sqrt{6}$。'
    },
    {
        'content': '计算：$\\frac{\\sqrt{20}}{\\sqrt{5}} = ?$',
        'options': ['$2$', '$\\sqrt{4}$', '$\\sqrt{15}$', '$4$'],
        'correct_answer': 0,
        'difficulty': 0.7,
        'discrimination': 1.2,
        'knowledge_points': ['二次根式'],
        'category': '数与式',
        'semester': '八年级上',
        'explanation': '$\\frac{\\sqrt{20}}{\\sqrt{5}} = \\sqrt{\\frac{20}{5}} = \\sqrt{4} = 2$。'
    },
    {
        'content': '计算：$\\sqrt{63} = ?$',
        'options': ['$3\\sqrt{7}$', '$7\\sqrt{3}$', '$9\\sqrt{7}$', '$21\\sqrt{3}$'],
        'correct_answer': 0,
        'difficulty': 0.7,
        'discrimination': 1.2,
        'knowledge_points': ['二次根式'],
        'category': '数与式',
        'semester': '八年级上',
        'explanation': '$\\sqrt{63} = \\sqrt{9 \\times 7} = 3\\sqrt{7}$。'
    },
    {
        'content': '计算：$\\sqrt{80} = ?$',
        'options': ['$4\\sqrt{5}$', '$5\\sqrt{4}$', '$8\\sqrt{5}$', '$10\\sqrt{8}$'],
        'correct_answer': 0,
        'difficulty': 0.7,
        'discrimination': 1.2,
        'knowledge_points': ['二次根式'],
        'category': '数与式',
        'semester': '八年级上',
        'explanation': '$\\sqrt{80} = \\sqrt{16 \\times 5} = 4\\sqrt{5}$。'
    },
    {
        'content': '计算：$\\sqrt{2} \\times \\sqrt{8} = ?$',
        'options': ['$4$', '$\\sqrt{10}$', '$\\sqrt{16}$', '$16$'],
        'correct_answer': 0,
        'difficulty': 0.5,
        'discrimination': 1.1,
        'knowledge_points': ['二次根式'],
        'category': '数与式',
        'semester': '八年级上',
        'explanation': '$\\sqrt{2} \\times \\sqrt{8} = \\sqrt{16} = 4$。'
    },
    {
        'content': '计算：$\\sqrt{28} = ?$',
        'options': ['$2\\sqrt{7}$', '$7\\sqrt{2}$', '$4\\sqrt{7}$', '$14\\sqrt{2}$'],
        'correct_answer': 0,
        'difficulty': 0.6,
        'discrimination': 1.1,
        'knowledge_points': ['二次根式'],
        'category': '数与式',
        'semester': '八年级上',
        'explanation': '$\\sqrt{28} = \\sqrt{4 \\times 7} = 2\\sqrt{7}$。'
    },
    {
        'content': '计算：$\\sqrt{125} = ?$',
        'options': ['$5\\sqrt{5}$', '$25\\sqrt{5}$', '$5\\sqrt{25}$', '$125$'],
        'correct_answer': 0,
        'difficulty': 0.7,
        'discrimination': 1.2,
        'knowledge_points': ['二次根式'],
        'category': '数与式',
        'semester': '八年级上',
        'explanation': '$\\sqrt{125} = \\sqrt{25 \\times 5} = 5\\sqrt{5}$。'
    },
    {
        'content': '计算：$\\sqrt{200} = ?$',
        'options': ['$10\\sqrt{2}$', '$2\\sqrt{10}$', '$20\\sqrt{2}$', '$100\\sqrt{2}$'],
        'correct_answer': 0,
        'difficulty': 0.8,
        'discrimination': 1.2,
        'knowledge_points': ['二次根式'],
        'category': '数与式',
        'semester': '八年级上',
        'explanation': '$\\sqrt{200} = \\sqrt{100 \\times 2} = 10\\sqrt{2}$。'
    },
    
    # ========== 九年级上 - 一元二次方程（补充更多题目）==========
    {
        'content': '解方程：$x^2 - 8x + 15 = 0$',
        'options': ['$x_1=3, x_2=5$', '$x_1=-3, x_2=-5$', '$x_1=2, x_2=6$', '$x_1=-2, x_2=-6$'],
        'correct_answer': 0,
        'difficulty': 0.6,
        'discrimination': 1.2,
        'knowledge_points': ['一元二次方程'],
        'category': '方程与不等式',
        'semester': '九年级上',
        'explanation': '因式分解得$(x-3)(x-5)=0$，所以$x_1=3, x_2=5$。'
    },
    {
        'content': '解方程：$x^2 - 10x + 21 = 0$',
        'options': ['$x_1=3, x_2=7$', '$x_1=-3, x_2=-7$', '$x_1=2, x_2=8$', '$x_1=-2, x_2=-8$'],
        'correct_answer': 0,
        'difficulty': 0.7,
        'discrimination': 1.2,
        'knowledge_points': ['一元二次方程'],
        'category': '方程与不等式',
        'semester': '九年级上',
        'explanation': '因式分解得$(x-3)(x-7)=0$，所以$x_1=3, x_2=7$。'
    },
    {
        'content': '解方程：$x^2 + 5x + 6 = 0$',
        'options': ['$x_1=-2, x_2=-3$', '$x_1=2, x_2=3$', '$x_1=-1, x_2=-6$', '$x_1=1, x_2=6$'],
        'correct_answer': 0,
        'difficulty': 0.5,
        'discrimination': 1.1,
        'knowledge_points': ['一元二次方程'],
        'category': '方程与不等式',
        'semester': '九年级上',
        'explanation': '因式分解得$(x+2)(x+3)=0$，所以$x_1=-2, x_2=-3$。'
    },
    {
        'content': '解方程：$x^2 - 9 = 0$',
        'options': ['$x_1=3, x_2=-3$', '$x_1=9, x_2=-9$', '$x=0$', '无解'],
        'correct_answer': 0,
        'difficulty': 0.4,
        'discrimination': 1.0,
        'knowledge_points': ['一元二次方程'],
        'category': '方程与不等式',
        'semester': '九年级上',
        'explanation': '因式分解得$(x+3)(x-3)=0$，所以$x_1=3, x_2=-3$。'
    },
    {
        'content': '解方程：$2x^2 - 7x + 3 = 0$',
        'options': ['$x_1=\\frac{1}{2}, x_2=3$', '$x_1=-\\frac{1}{2}, x_2=-3$', '$x_1=1, x_2=6$', '$x_1=-1, x_2=-6$'],
        'correct_answer': 0,
        'difficulty': 1.0,
        'discrimination': 1.3,
        'knowledge_points': ['一元二次方程'],
        'category': '方程与不等式',
        'semester': '九年级上',
        'explanation': '因式分解得$(2x-1)(x-3)=0$，所以$x_1=\\frac{1}{2}, x_2=3$。'
    },
    {
        'content': '解方程：$x^2 - 6x = 0$',
        'options': ['$x_1=0, x_2=6$', '$x_1=0, x_2=-6$', '$x=0$', '$x=6$'],
        'correct_answer': 0,
        'difficulty': 0.3,
        'discrimination': 1.0,
        'knowledge_points': ['一元二次方程'],
        'category': '方程与不等式',
        'semester': '九年级上',
        'explanation': '提取公因式：$x(x-6)=0$，所以$x_1=0, x_2=6$。'
    },
    {
        'content': '解方程：$x^2 + 8x + 16 = 0$',
        'options': ['$x = -4$', '$x = 4$', '$x_1=2, x_2=8$', '无解'],
        'correct_answer': 0,
        'difficulty': 0.5,
        'discrimination': 1.1,
        'knowledge_points': ['一元二次方程'],
        'category': '方程与不等式',
        'semester': '九年级上',
        'explanation': '完全平方式：$(x+4)^2=0$，所以$x = -4$。'
    },
    {
        'content': '解方程：$3x^2 - 12x = 0$',
        'options': ['$x_1=0, x_2=4$', '$x_1=0, x_2=-4$', '$x=0$', '$x=4$'],
        'correct_answer': 0,
        'difficulty': 0.4,
        'discrimination': 1.0,
        'knowledge_points': ['一元二次方程'],
        'category': '方程与不等式',
        'semester': '九年级上',
        'explanation': '提取公因式：$3x(x-4)=0$，所以$x_1=0, x_2=4$。'
    },
    {
        'content': '解方程：$x^2 - 11x + 30 = 0$',
        'options': ['$x_1=5, x_2=6$', '$x_1=-5, x_2=-6$', '$x_1=3, x_2=10$', '$x_1=-3, x_2=-10$'],
        'correct_answer': 0,
        'difficulty': 0.8,
        'discrimination': 1.3,
        'knowledge_points': ['一元二次方程'],
        'category': '方程与不等式',
        'semester': '九年级上',
        'explanation': '因式分解得$(x-5)(x-6)=0$，所以$x_1=5, x_2=6$。'
    },
    {
        'content': '解方程：$x^2 - 2x - 8 = 0$',
        'options': ['$x_1=-2, x_2=4$', '$x_1=2, x_2=-4$', '$x_1=-1, x_2=8$', '$x_1=1, x_2=-8$'],
        'correct_answer': 0,
        'difficulty': 0.6,
        'discrimination': 1.2,
        'knowledge_points': ['一元二次方程'],
        'category': '方程与不等式',
        'semester': '九年级上',
        'explanation': '因式分解得$(x+2)(x-4)=0$，所以$x_1=-2, x_2=4$。'
    },
    {
        'content': '解方程：$x^2 + 7x + 12 = 0$',
        'options': ['$x_1=-3, x_2=-4$', '$x_1=3, x_2=4$', '$x_1=-2, x_2=-6$', '$x_1=2, x_2=6$'],
        'correct_answer': 0,
        'difficulty': 0.5,
        'discrimination': 1.1,
        'knowledge_points': ['一元二次方程'],
        'category': '方程与不等式',
        'semester': '九年级上',
        'explanation': '因式分解得$(x+3)(x+4)=0$，所以$x_1=-3, x_2=-4$。'
    },
    {
        'content': '解方程：$x^2 - 13x + 36 = 0$',
        'options': ['$x_1=4, x_2=9$', '$x_1=-4, x_2=-9$', '$x_1=3, x_2=12$', '$x_1=-3, x_2=-12$'],
        'correct_answer': 0,
        'difficulty': 0.9,
        'discrimination': 1.3,
        'knowledge_points': ['一元二次方程'],
        'category': '方程与不等式',
        'semester': '九年级上',
        'explanation': '因式分解得$(x-4)(x-9)=0$，所以$x_1=4, x_2=9$。'
    },
    
    # ========== 九年级上 - 二次函数（补充更多题目）==========
    {
        'content': '二次函数$y = x^2 - 4x + 3$的对称轴方程是？',
        'options': ['$x = 2$', '$x = -2$', '$x = 4$', '$x = -4$'],
        'correct_answer': 0,
        'difficulty': 0.9,
        'discrimination': 1.3,
        'knowledge_points': ['二次函数'],
        'category': '函数',
        'semester': '九年级上',
        'explanation': '对称轴$x = -\\frac{b}{2a} = -\\frac{-4}{2} = 2$。'
    },
    {
        'content': '二次函数$y = x^2 + 6x + 5$的顶点坐标是？',
        'options': ['$(-3, -4)$', '$(3, -4)$', '$(-3, 4)$', '$(3, 4)$'],
        'correct_answer': 0,
        'difficulty': 1.1,
        'discrimination': 1.3,
        'knowledge_points': ['二次函数'],
        'category': '函数',
        'semester': '九年级上',
        'explanation': '顶点横坐标$x = -\\frac{6}{2} = -3$，纵坐标$y = (-3)^2 + 6\\times(-3) + 5 = 9 - 18 + 5 = -4$，所以顶点为$(-3, -4)$。'
    },
    {
        'content': '二次函数$y = -x^2 + 2x + 3$的最大值是？',
        'options': ['$4$', '$3$', '$2$', '$1$'],
        'correct_answer': 0,
        'difficulty': 1.2,
        'discrimination': 1.4,
        'knowledge_points': ['二次函数'],
        'category': '函数',
        'semester': '九年级上',
        'explanation': '顶点横坐标$x = -\\frac{2}{2\\times(-1)} = 1$，最大值$y = -1 + 2 + 3 = 4$。'
    },
    {
        'content': '二次函数$y = x^2 - 8x + 15$的零点（与$x$轴交点）的横坐标是？',
        'options': ['$x_1=3, x_2=5$', '$x_1=-3, x_2=-5$', '$x_1=2, x_2=6$', '$x_1=-2, x_2=-6$'],
        'correct_answer': 0,
        'difficulty': 0.8,
        'discrimination': 1.2,
        'knowledge_points': ['二次函数'],
        'category': '函数',
        'semester': '九年级上',
        'explanation': '令$y=0$：$x^2-8x+15=0$，因式分解得$(x-3)(x-5)=0$，所以$x_1=3, x_2=5$。'
    },
    {
        'content': '二次函数$y = 3x^2 - 6x + 1$的最小值是？',
        'options': ['$-2$', '$0$', '$1$', '$2$'],
        'correct_answer': 0,
        'difficulty': 1.3,
        'discrimination': 1.4,
        'knowledge_points': ['二次函数'],
        'category': '函数',
        'semester': '九年级上',
        'explanation': '顶点横坐标$x = -\\frac{-6}{6} = 1$，最小值$y = 3 - 6 + 1 = -2$。'
    },
    {
        'content': '二次函数$y = -2x^2 + 4x - 1$的开口方向是？',
        'options': ['向下', '向上', '水平', '无法确定'],
        'correct_answer': 0,
        'difficulty': 0.4,
        'discrimination': 1.0,
        'knowledge_points': ['二次函数'],
        'category': '函数',
        'semester': '九年级上',
        'explanation': '二次项系数$a = -2 < 0$，所以开口向下。'
    },
    {
        'content': '二次函数$y = x^2 + 4x - 5$的对称轴方程是？',
        'options': ['$x = -2$', '$x = 2$', '$x = -4$', '$x = 4$'],
        'correct_answer': 0,
        'difficulty': 0.9,
        'discrimination': 1.3,
        'knowledge_points': ['二次函数'],
        'category': '函数',
        'semester': '九年级上',
        'explanation': '对称轴$x = -\\frac{b}{2a} = -\\frac{4}{2} = -2$。'
    },
    {
        'content': '二次函数$y = x^2 - 10x + 24$的零点（与$x$轴交点）的横坐标是？',
        'options': ['$x_1=4, x_2=6$', '$x_1=-4, x_2=-6$', '$x_1=3, x_2=8$', '$x_1=-3, x_2=-8$'],
        'correct_answer': 0,
        'difficulty': 0.7,
        'discrimination': 1.2,
        'knowledge_points': ['二次函数'],
        'category': '函数',
        'semester': '九年级上',
        'explanation': '令$y=0$：$x^2-10x+24=0$，因式分解得$(x-4)(x-6)=0$，所以$x_1=4, x_2=6$。'
    },
    {
        'content': '二次函数$y = -x^2 + 6x - 9$的最大值是？',
        'options': ['$0$', '$3$', '$6$', '$9$'],
        'correct_answer': 0,
        'difficulty': 1.1,
        'discrimination': 1.3,
        'knowledge_points': ['二次函数'],
        'category': '函数',
        'semester': '九年级上',
        'explanation': '顶点横坐标$x = -\\frac{6}{2\\times(-1)} = 3$，最大值$y = -9 + 18 - 9 = 0$。'
    },
    {
        'content': '二次函数$y = 2x^2 - 8x + 6$的最小值是？',
        'options': ['$-2$', '$0$', '$2$', '$6$'],
        'correct_answer': 0,
        'difficulty': 1.2,
        'discrimination': 1.4,
        'knowledge_points': ['二次函数'],
        'category': '函数',
        'semester': '九年级上',
        'explanation': '顶点横坐标$x = -\\frac{-8}{4} = 2$，最小值$y = 8 - 16 + 6 = -2$。'
    },
    {
        'content': '二次函数$y = x^2 - 5x + 6$的零点（与$x$轴交点）的横坐标是？',
        'options': ['$x_1=2, x_2=3$', '$x_1=-2, x_2=-3$', '$x_1=1, x_2=6$', '$x_1=-1, x_2=-6$'],
        'correct_answer': 0,
        'difficulty': 0.6,
        'discrimination': 1.2,
        'knowledge_points': ['二次函数'],
        'category': '函数',
        'semester': '九年级上',
        'explanation': '令$y=0$：$x^2-5x+6=0$，因式分解得$(x-2)(x-3)=0$，所以$x_1=2, x_2=3$。'
    },
    {
        'content': '二次函数$y = -3x^2 + 12x - 9$的最大值是？',
        'options': ['$3$', '$0$', '$9$', '$12$'],
        'correct_answer': 0,
        'difficulty': 1.2,
        'discrimination': 1.4,
        'knowledge_points': ['二次函数'],
        'category': '函数',
        'semester': '九年级上',
        'explanation': '顶点横坐标$x = -\\frac{12}{2\\times(-3)} = 2$，最大值$y = -12 + 24 - 9 = 3$。'
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
        
        # 统计各学期题目数
        semester_stats = {}
        for sem in ['七年级上', '七年级下', '八年级上', '八年级下', '九年级上', '九年级下']:
            semester_stats[sem] = Question.query.filter_by(semester=sem).count()
        
        print("=" * 60)
        print("📚 补充题目较少的学期完成！")
        print("=" * 60)
        print(f"新增题目: {added_count} 道")
        print(f"跳过重复: {skipped_count} 道")
        print(f"题库总题目数: {Question.query.count()} 道")
        print()
        print("各学期题目分布:")
        for sem, count in semester_stats.items():
            status = "⚠️" if count < 15 else "✅"
            print(f"  {status} {sem}: {count}道")
        print("=" * 60)
        
        return added_count, skipped_count

if __name__ == '__main__':
    load_supplement_questions()

