"""
导出交互式题库HTML - 可在GitHub Pages运行
支持点击答题、显示解析、知识点和能力评价
"""
from app import app
from models import db, Question
from datetime import datetime
import os
import json

def export_interactive_html(output_file='题库.html'):
    """导出交互式HTML题库"""
    with app.app_context():
        # 定义学期顺序
        semester_order = {
            '七年级上': 1,
            '七年级下': 2,
            '八年级上': 3,
            '八年级下': 4,
            '九年级上': 5,
            '九年级下': 6,
        }
        
        # 获取所有题目
        all_questions = Question.query.all()
        
        # 按学期顺序、分类、ID排序
        questions = sorted(
            all_questions,
            key=lambda q: (
                semester_order.get(q.semester, 99),  # 学期顺序，未分类的排在最后
                q.category or '',  # 分类
                q.id  # ID
            )
        )
        
        # 将题目数据序列化为JSON，嵌入到HTML中
        questions_data = []
        for q in questions:
            questions_data.append({
                'id': q.id,
                'content': q.content,
                'options': q.options,
                'correct_answer': q.correct_answer,
                'difficulty': q.difficulty,
                'knowledge_points': q.knowledge_points,
                'category': q.category,
                'semester': q.semester,
                'explanation': q.explanation
            })
        
        html = []
        html.append('<!DOCTYPE html>')
        html.append('<html lang="zh-CN">')
        html.append('<head>')
        html.append('  <meta charset="UTF-8">')
        html.append('  <meta name="viewport" content="width=device-width, initial-scale=1.0">')
        html.append('  <title>数学水平测试系统 - 交互式题库</title>')
        html.append('  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">')
        html.append('  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>')
        html.append('  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>')
        html.append('  <style>')
        html.append('    * { margin: 0; padding: 0; box-sizing: border-box; }')
        html.append('    body { font-family: "Google Sans", "Microsoft YaHei", "PingFang SC", Arial, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; line-height: 1.6; background: #FAFAFA; }')
        html.append('    .container { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }')
        html.append('    h1 { color: #202124; font-size: 2rem; font-weight: 400; margin-bottom: 16px; }')
        html.append('    h2 { color: #5F6368; font-size: 1.5rem; font-weight: 400; margin-top: 32px; padding-bottom: 8px; border-bottom: 1px solid #E0E0E0; }')
        html.append('    h3 { color: #202124; font-size: 1.125rem; font-weight: 500; margin-top: 24px; }')
        html.append('    h4 { color: #202124; font-size: 1rem; font-weight: 500; margin-top: 20px; margin-bottom: 12px; }')
        html.append('    .stats { background: #4285F4; color: white; padding: 24px; border-radius: 8px; margin-bottom: 32px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }')
        html.append('    .stats p { margin: 8px 0; }')
        html.append('    .question { background: white; padding: 24px; margin: 24px 0; border-radius: 8px; border: 1px solid #E0E0E0; box-shadow: 0 1px 2px rgba(0,0,0,0.1); transition: box-shadow 0.2s; }')
        html.append('    .question:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.15); }')
        html.append('    .question-info { background: #E8F0FE; padding: 12px; border-radius: 4px; margin-bottom: 16px; font-size: 0.875rem; display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }')
        html.append('    .question-content { font-size: 1.125rem; margin: 16px 0; padding: 12px; background: #FAFAFA; border-radius: 4px; }')
        html.append('    .options { margin: 16px 0; }')
        html.append('    .option { padding: 12px 16px; margin: 8px 0; background: white; border-radius: 4px; border: 1px solid #E0E0E0; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; }')
        html.append('    .option:hover:not(.answered) { background: #E8F0FE; border-color: #4285F4; }')
        html.append('    .option.selected { background: #E8F0FE; border-color: #4285F4; }')
        html.append('    .option.correct { background: #E8F5E9; border-color: #34A853; color: #1E7E34; }')
        html.append('    .option.incorrect { background: #FFEBEE; border-color: #EA4335; color: #C62828; }')
        html.append('    .option.answered { cursor: default; }')
        html.append('    .option-label { flex: 1; }')
        html.append('    .option-status { margin-left: 8px; font-weight: 600; }')
        html.append('    .feedback { margin-top: 16px; padding: 16px; border-radius: 4px; display: none; }')
        html.append('    .feedback.show { display: block; }')
        html.append('    .feedback.correct-feedback { background: #E8F5E9; border-left: 4px solid #34A853; }')
        html.append('    .feedback.incorrect-feedback { background: #FFEBEE; border-left: 4px solid #EA4335; }')
        html.append('    .explanation { background: #FFF3E0; padding: 16px; border-radius: 4px; margin-top: 12px; border-left: 4px solid #FBBC04; }')
        html.append('    .semester-badge { background: #E8F0FE; color: #1A73E8; padding: 4px 12px; border-radius: 16px; font-size: 0.875rem; font-weight: 500; border: 1px solid #1A73E8; }')
        html.append('    .result-panel { position: fixed; bottom: 0; left: 0; right: 0; background: white; box-shadow: 0 -2px 8px rgba(0,0,0,0.1); padding: 24px; border-top: 1px solid #E0E0E0; display: none; z-index: 1000; max-height: 80vh; overflow-y: auto; }')
        html.append('    .result-panel.show { display: block; }')
        html.append('    .result-content { max-width: 1200px; margin: 0 auto; }')
        html.append('    .result-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }')
        html.append('    .result-title { font-size: 1.5rem; font-weight: 400; color: #202124; }')
        html.append('    .close-btn { background: #E0E0E0; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-size: 0.875rem; }')
        html.append('    .close-btn:hover { background: #D0D0D0; }')
        html.append('    .knowledge-item { background: #FAFAFA; padding: 12px; border-radius: 4px; margin: 8px 0; border-left: 3px solid #4285F4; }')
        html.append('    .knowledge-name { font-weight: 500; color: #202124; margin-bottom: 4px; }')
        html.append('    .knowledge-progress { width: 100%; height: 8px; background: #E0E0E0; border-radius: 4px; overflow: hidden; margin: 8px 0; }')
        html.append('    .knowledge-progress-bar { height: 100%; background: #4285F4; transition: width 0.3s; }')
        html.append('    .ability-level { text-align: center; padding: 24px; background: #E8F0FE; border-radius: 8px; margin: 16px 0; }')
        html.append('    .ability-value { font-size: 2rem; font-weight: 500; color: #1A73E8; }')
        html.append('    .btn { background: #4285F4; color: white; border: none; padding: 10px 24px; border-radius: 4px; cursor: pointer; font-size: 0.875rem; font-weight: 500; margin: 8px 4px; }')
        html.append('    .btn:hover { background: #357AE8; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }')
        html.append('    .btn:active { box-shadow: 0 1px 2px rgba(0,0,0,0.1); }')
        html.append('    @media (max-width: 768px) { body { padding: 10px; } .container { padding: 16px; } }')
        html.append('  </style>')
        html.append('</head>')
        html.append('<body>')
        
        # 嵌入题目数据
        html.append(f'<script>')
        html.append('  const questionsData = ' + json.dumps(questions_data, ensure_ascii=False) + ';')
        html.append('  let userAnswers = {};')  # 存储用户答案
        html.append('  let answeredCount = 0;')
        html.append('</script>')
        
        html.append('<div class="container">')
        html.append('<h1>📚 数学水平测试系统 - 交互式题库</h1>')
        html.append('<div class="stats">')
        html.append(f'<p><strong>题目总数</strong>: {len(questions)} 道</p>')
        
        # 学期统计
        semester_count = {}
        for q in questions:
            semester = q.semester or '未分类'
            semester_count[semester] = semester_count.get(semester, 0) + 1
        
        html.append('<p><strong>学期分布</strong>: ')
        semester_list = []
        for semester in ['七年级上', '七年级下', '八年级上', '八年级下', '九年级上', '九年级下']:
            if semester in semester_count:
                semester_list.append(f'{semester} {semester_count[semester]}道')
        html.append(' | '.join(semester_list))
        html.append('</p>')
        html.append('<p style="margin-top: 16px;"><strong>使用说明</strong>: 点击选项进行答题，答题后显示解析。完成答题后可查看知识点掌握情况和能力评价。</p>')
        html.append('</div>')
        
        # 控制按钮
        html.append('<div style="margin-bottom: 24px; text-align: center;">')
        html.append('<button class="btn" onclick="showAllAnswers()">显示所有答案</button>')
        html.append('<button class="btn" onclick="hideAllAnswers()">隐藏所有答案</button>')
        html.append('<button class="btn" onclick="showResults()" style="background: #34A853;">查看评价结果</button>')
        html.append('<button class="btn" onclick="resetAll()" style="background: #EA4335;">重置所有答题</button>')
        html.append('</div>')
        
        # 按学期分组输出题目
        current_semester = None
        current_category = None
        question_index = 0
        
        for q in questions:
            # 学期标题
            if q.semester != current_semester:
                current_semester = q.semester
                if current_semester:
                    html.append(f'<h2>📚 {current_semester}</h2>')
                else:
                    html.append(f'<h2>📚 未分类</h2>')
            
            # 分类小标题
            if q.category != current_category:
                current_category = q.category
                html.append(f'<h3>{current_category}</h3>')
            
            # 题目容器
            html.append(f'<div class="question" data-question-id="{q.id}" data-question-index="{question_index}">')
            html.append(f'<h4>第 {question_index + 1} 题 (ID: {q.id})</h4>')
            
            # 题目信息
            html.append('<div class="question-info">')
            if q.semester:
                html.append(f'<span class="semester-badge">📅 {q.semester}</span>')
            html.append(f'<span><strong>难度</strong>: {q.difficulty:.1f}</span>')
            html.append(f'<span><strong>知识点</strong>: {", ".join(q.knowledge_points)}</span>')
            html.append('</div>')
            
            # 题目内容
            html.append(f'<div class="question-content"><strong>题目</strong>: {q.content}</div>')
            
            # 选项
            html.append('<div class="options">')
            for idx, option in enumerate(q.options):
                html.append(f'<div class="option" data-option-index="{idx}" onclick="selectOption({question_index}, {idx})">')
                html.append(f'<span class="option-label">{chr(65 + idx)}. {option}</span>')
                html.append(f'<span class="option-status" id="status-{question_index}-{idx}"></span>')
                html.append('</div>')
            html.append('</div>')
            
            # 反馈区域
            html.append(f'<div class="feedback" id="feedback-{question_index}">')
            html.append(f'<div id="feedback-content-{question_index}"></div>')
            if q.explanation:
                html.append(f'<div class="explanation"><strong>📖 解析</strong>: {q.explanation}</div>')
            html.append('</div>')
            
            html.append('</div>')
            question_index += 1
        
        html.append('</div>')
        
        # 结果面板
        html.append('<div class="result-panel" id="resultPanel">')
        html.append('<div class="result-content">')
        html.append('<div class="result-header">')
        html.append('<h2 class="result-title">📊 测试结果与能力评价</h2>')
        html.append('<button class="close-btn" onclick="closeResultPanel()">关闭</button>')
        html.append('</div>')
        html.append('<div id="resultContent"></div>')
        html.append('</div>')
        html.append('</div>')
        
        # JavaScript代码
        html.append('<script>')
        html.append('''
function selectOption(questionIndex, optionIndex) {
    const question = document.querySelector(`[data-question-index="${questionIndex}"]`);
    const questionData = questionsData[questionIndex];
    
    // 如果已经答过，不允许修改
    if (userAnswers[questionIndex] !== undefined) {
        return;
    }
    
    // 记录答案
    userAnswers[questionIndex] = optionIndex;
    answeredCount++;
    
    // 标记所有选项为已答
    question.querySelectorAll('.option').forEach(opt => {
        opt.classList.add('answered');
        opt.onclick = null;
    });
    
    const isCorrect = optionIndex === questionData.correct_answer;
    const selectedOption = question.querySelector(`[data-option-index="${optionIndex}"]`);
    const correctOption = question.querySelector(`[data-option-index="${questionData.correct_answer}"]`);
    
    // 标记选中选项
    selectedOption.classList.add('selected');
    if (isCorrect) {
        selectedOption.classList.add('correct');
        selectedOption.querySelector('.option-status').textContent = '✓ 正确';
    } else {
        selectedOption.classList.add('incorrect');
        selectedOption.querySelector('.option-status').textContent = '✗ 错误';
        correctOption.classList.add('correct');
        correctOption.querySelector('.option-status').textContent = '✓ 正确答案';
    }
    
    // 显示反馈
    const feedback = question.querySelector('#feedback-' + questionIndex);
    const feedbackContent = question.querySelector('#feedback-content-' + questionIndex);
    
    if (isCorrect) {
        feedback.className = 'feedback show correct-feedback';
        feedbackContent.innerHTML = '<strong>✓ 回答正确！</strong> 你做得很棒！';
    } else {
        feedback.className = 'feedback show incorrect-feedback';
        feedbackContent.innerHTML = `<strong>✗ 回答错误。</strong> 正确答案是 <strong>${String.fromCharCode(65 + questionData.correct_answer)}</strong>。`;
    }
    
    // 重新渲染数学公式
    if (typeof renderMathInElement !== 'undefined') {
        renderMathInElement(feedback, {
            delimiters: [
                {left: "$$", right: "$$", display: true},
                {left: "$", right: "$", display: false}
            ]
        });
    }
}

function showAllAnswers() {
    questionsData.forEach((q, index) => {
        if (userAnswers[index] === undefined) {
            selectOption(index, q.correct_answer);
        }
    });
}

function hideAllAnswers() {
    // 隐藏所有反馈，但不移除答案标记
    document.querySelectorAll('.feedback').forEach(f => {
        f.classList.remove('show');
    });
}

function resetAll() {
    if (confirm('确定要重置所有答题吗？这将清除所有答题记录。')) {
        userAnswers = {};
        answeredCount = 0;
        location.reload();
    }
}

function showResults() {
    if (answeredCount === 0) {
        alert('请先完成一些题目后再查看结果。');
        return;
    }
    
    // 计算统计信息
    let correctCount = 0;
    const knowledgeStats = {};
    const categoryStats = {};
    const semesterStats = {};
    let totalDifficulty = 0;
    
    questionsData.forEach((q, index) => {
        if (userAnswers[index] !== undefined) {
            const isCorrect = userAnswers[index] === q.correct_answer;
            if (isCorrect) correctCount++;
            
            // 知识点统计
            q.knowledge_points.forEach(kp => {
                if (!knowledgeStats[kp]) {
                    knowledgeStats[kp] = { correct: 0, total: 0 };
                }
                knowledgeStats[kp].total++;
                if (isCorrect) knowledgeStats[kp].correct++;
            });
            
            // 分类统计
            if (!categoryStats[q.category]) {
                categoryStats[q.category] = { correct: 0, total: 0 };
            }
            categoryStats[q.category].total++;
            if (isCorrect) categoryStats[q.category].correct++;
            
            // 学期统计
            if (q.semester) {
                if (!semesterStats[q.semester]) {
                    semesterStats[q.semester] = { correct: 0, total: 0 };
                }
                semesterStats[q.semester].total++;
                if (isCorrect) semesterStats[q.semester].correct++;
            }
            
            // 难度统计
            totalDifficulty += q.difficulty;
        }
    });
    
    const totalAnswered = answeredCount;
    const accuracy = (correctCount / totalAnswered * 100).toFixed(1);
    const avgDifficulty = totalDifficulty / totalAnswered;
    
    // 估算能力值（简化版IRT）
    let estimatedAbility = 0;
    if (totalAnswered >= 3) {
        // 根据正确率和平均难度估算
        const correctRate = correctCount / totalAnswered;
        estimatedAbility = (correctRate - 0.5) * 3 + avgDifficulty;
        estimatedAbility = Math.max(-3, Math.min(3, estimatedAbility));
    }
    
    // 能力等级
    let abilityLevel = '';
    let abilityDesc = '';
    if (estimatedAbility >= 2) {
        abilityLevel = '优秀';
        abilityDesc = '你的数学水平非常出色！';
    } else if (estimatedAbility >= 1) {
        abilityLevel = '良好';
        abilityDesc = '你的数学水平良好，继续保持！';
    } else if (estimatedAbility >= 0) {
        abilityLevel = '中等';
        abilityDesc = '你的数学水平处于中等水平，还有提升空间。';
    } else if (estimatedAbility >= -1) {
        abilityLevel = '一般';
        abilityDesc = '建议加强基础知识的复习和练习。';
    } else {
        abilityLevel = '需要加强';
        abilityDesc = '建议系统性地复习基础知识，多做练习。';
    }
    
    // 生成结果HTML
    let resultHTML = `
        <div class="ability-level">
            <div style="font-size: 1.125rem; color: #5F6368; margin-bottom: 8px;">总体能力水平</div>
            <div class="ability-value">${abilityLevel}</div>
            <div style="font-size: 0.875rem; color: #5F6368; margin-top: 8px;">${abilityDesc}</div>
            <div style="font-size: 0.875rem; color: #5F6368; margin-top: 4px;">能力值: ${estimatedAbility.toFixed(2)}</div>
        </div>
        
        <div style="background: #FAFAFA; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <h3 style="margin-top: 0;">答题统计</h3>
            <p><strong>已答题数</strong>: ${totalAnswered} / ${questionsData.length}</p>
            <p><strong>正确题数</strong>: ${correctCount}</p>
            <p><strong>正确率</strong>: ${accuracy}%</p>
        </div>
    `;
    
    // 知识点掌握情况
    if (Object.keys(knowledgeStats).length > 0) {
        resultHTML += '<h3>📚 知识点掌握情况</h3>';
        Object.entries(knowledgeStats)
            .sort((a, b) => {
                const masteryA = a[1].correct / a[1].total;
                const masteryB = b[1].correct / b[1].total;
                return masteryA - masteryB;
            })
            .forEach(([kp, stats]) => {
                const mastery = (stats.correct / stats.total * 100).toFixed(1);
                const masteryPercent = stats.correct / stats.total;
                resultHTML += `
                    <div class="knowledge-item">
                        <div class="knowledge-name">${kp}</div>
                        <div class="knowledge-progress">
                            <div class="knowledge-progress-bar" style="width: ${masteryPercent * 100}%"></div>
                        </div>
                        <div style="font-size: 0.875rem; color: #5F6368;">
                            掌握度: ${mastery}% (${stats.correct}/${stats.total})
                        </div>
                    </div>
                `;
            });
    }
    
    // 学期表现
    if (Object.keys(semesterStats).length > 0) {
        resultHTML += '<h3 style="margin-top: 24px;">📅 学期表现</h3>';
        const semesterOrder = ['七年级上', '七年级下', '八年级上', '八年级下', '九年级上', '九年级下'];
        semesterOrder.forEach(semester => {
            if (semesterStats[semester]) {
                const stats = semesterStats[semester];
                const accuracy = (stats.correct / stats.total * 100).toFixed(1);
                resultHTML += `
                    <div class="knowledge-item">
                        <div class="knowledge-name">${semester}</div>
                        <div class="knowledge-progress">
                            <div class="knowledge-progress-bar" style="width: ${stats.correct / stats.total * 100}%"></div>
                        </div>
                        <div style="font-size: 0.875rem; color: #5F6368;">
                            正确率: ${accuracy}% (${stats.correct}/${stats.total})
                        </div>
                    </div>
                `;
            }
        });
    }
    
    // 知识点学习指导映射
    const knowledgeGuides = {
        '有理数': {
            guide: '有理数包括正数、负数和零。掌握有理数的四则运算是基础。建议：1) 理解正负数在数轴上的表示；2) 熟练掌握加法、减法的运算法则；3) 掌握乘除法的符号规律；4) 练习混合运算的运算顺序。',
            focus: ['理解正负数的概念', '掌握运算法则', '熟练进行四则运算']
        },
        '整式': {
            guide: '整式是代数式的基础。建议：1) 理解单项式和多项式的概念；2) 掌握合并同类项的方法；3) 熟练运用乘法公式（平方差、完全平方等）；4) 学会因式分解的基本方法。',
            focus: ['合并同类项', '乘法公式', '因式分解']
        },
        '分式': {
            guide: '分式运算需要特别注意分母不为零。建议：1) 理解分式的基本性质；2) 掌握通分和约分的方法；3) 熟练进行分式的加减乘除运算；4) 注意分式方程的解要检验。',
            focus: ['通分约分', '分式运算', '分式方程']
        },
        '二次根式': {
            guide: '二次根式化简是关键。建议：1) 理解二次根式的概念和性质；2) 掌握最简二次根式的判断；3) 熟练进行二次根式的化简；4) 掌握二次根式的加减乘除运算。',
            focus: ['二次根式化简', '最简二次根式', '二次根式运算']
        },
        '一元一次方程': {
            guide: '一元一次方程是最基础的方程类型。建议：1) 理解等式的性质；2) 掌握移项、合并同类项的方法；3) 熟练解一元一次方程；4) 会列一元一次方程解决实际问题。',
            focus: ['等式性质', '移项合并', '列方程解应用题']
        },
        '二元一次方程组': {
            guide: '二元一次方程组有多种解法。建议：1) 掌握代入消元法和加减消元法；2) 理解两种方法的选择依据；3) 能根据题目特点选择合适的方法；4) 会列方程组解决实际问题。',
            focus: ['代入消元法', '加减消元法', '列方程组解应用题']
        },
        '一元二次方程': {
            guide: '一元二次方程解法多样。建议：1) 掌握直接开平方法、配方法、公式法、因式分解法；2) 理解判别式的作用；3) 根据方程特点选择合适方法；4) 会列一元二次方程解决实际问题。',
            focus: ['配方法', '公式法', '判别式', '实际应用']
        },
        '不等式': {
            guide: '不等式与等式有相似性但也有区别。建议：1) 理解不等式的性质，特别注意不等式两边同时乘除负数时不等号方向改变；2) 掌握一元一次不等式的解法；3) 会解不等式组；4) 能在数轴上表示不等式的解集。',
            focus: ['不等式性质', '不等号方向', '不等式组的解']
        },
        '一次函数': {
            guide: '一次函数是函数的基础。建议：1) 理解函数的概念和一次函数的一般形式；2) 掌握一次函数的图像和性质；3) 理解k和b的几何意义；4) 会用待定系数法求函数解析式。',
            focus: ['函数概念', '图像性质', '待定系数法']
        },
        '二次函数': {
            guide: '二次函数是重要的函数类型。建议：1) 理解二次函数的图像是抛物线；2) 掌握开口方向、顶点、对称轴的确定；3) 会用配方法求顶点坐标；4) 理解二次函数与一元二次方程的关系。',
            focus: ['开口方向', '顶点坐标', '对称轴', '最值问题']
        },
        '反比例函数': {
            guide: '反比例函数的特点要重点掌握。建议：1) 理解反比例函数的概念；2) 掌握反比例函数的图像和性质；3) 理解k的几何意义；4) 会利用性质解决实际问题。',
            focus: ['反比例函数概念', '图像性质', 'k的几何意义']
        },
        '三角形': {
            guide: '三角形是几何的基础。建议：1) 理解三角形内角和定理；2) 掌握等腰三角形、等边三角形的性质；3) 理解全等三角形的判定方法；4) 掌握勾股定理及其逆定理。',
            focus: ['内角和', '等腰三角形', '全等判定', '勾股定理']
        },
        '四边形': {
            guide: '四边形的性质和判定要对应记忆。建议：1) 掌握平行四边形、矩形、菱形、正方形的性质和判定；2) 理解各种四边形之间的关系；3) 会利用性质和判定证明和计算。',
            focus: ['平行四边形', '矩形菱形正方形', '性质和判定']
        },
        '圆': {
            guide: '圆的性质较多，需要系统掌握。建议：1) 理解圆的有关概念（圆心、半径、弦、弧等）；2) 掌握垂径定理；3) 理解圆周角定理；4) 掌握切线的性质和判定。',
            focus: ['圆的概念', '垂径定理', '圆周角定理', '切线']
        },
        '统计': {
            guide: '统计的核心是数据的处理和分析。建议：1) 理解平均数、中位数、众数的意义；2) 掌握计算方法和使用场景；3) 理解方差和标准差的意义；4) 会从统计图表中获取信息。',
            focus: ['平均数中位数众数', '方差标准差', '统计图表']
        },
        '概率': {
            guide: '概率要理解随机事件的本质。建议：1) 理解概率的意义；2) 掌握等可能事件的概率计算；3) 会用列表法或树状图分析概率；4) 理解频率与概率的关系。',
            focus: ['概率意义', '等可能事件', '列表法和树状图']
        }
    };
    
    // 学习建议和针对性指导
    resultHTML += '<h3 style="margin-top: 24px;">💡 针对性学习指导</h3>';
    const weakKnowledge = Object.entries(knowledgeStats)
        .filter(([kp, stats]) => stats.correct / stats.total < 0.6)
        .sort((a, b) => {
            const masteryA = a[1].correct / a[1].total;
            const masteryB = b[1].correct / b[1].total;
            return masteryA - masteryB;
        })
        .slice(0, 5);
    
    if (weakKnowledge.length > 0) {
        weakKnowledge.forEach(([kp, stats], idx) => {
            const mastery = (stats.correct / stats.total * 100).toFixed(1);
            const guide = knowledgeGuides[kp] || {
                guide: '建议系统复习该知识点的基础内容，多做相关练习，加强理解。',
                focus: ['基础复习', '多做练习']
            };
            
            resultHTML += `
                <div style="background: #FFF3E0; padding: 20px; border-radius: 8px; border-left: 4px solid #FBBC04; margin: 16px 0;">
                    <h4 style="margin-top: 0; color: #E65100;">${idx + 1}. ${kp}（掌握度: ${mastery}%）</h4>
                    <div style="margin: 12px 0; line-height: 1.8;">
                        <strong>📖 学习指导：</strong><br>
                        ${guide.guide}
                    </div>
                    <div style="margin: 12px 0;">
                        <strong>🎯 重点内容：</strong>
                        <ul style="margin: 8px 0; padding-left: 24px;">
                            ${guide.focus.map(f => `<li>${f}</li>`).join('')}
                        </ul>
                    </div>
                    <div style="margin-top: 16px;">
                        <button class="btn" onclick="showPracticeQuestions('${kp}')" style="background: #4285F4;">
                            查看 ${kp} 相关练习题 →
                        </button>
                    </div>
                </div>
            `;
        });
    } else {
        resultHTML += '<div style="background: #E8F5E9; padding: 16px; border-radius: 4px; border-left: 4px solid #34A853; margin: 8px 0;">';
        resultHTML += '<strong>表现优秀！</strong> 你在各个知识点上都有良好的掌握。建议继续深入学习，挑战更高难度的题目。';
        resultHTML += '</div>';
    }
    
    // 能力水平提升建议
    resultHTML += '<h3 style="margin-top: 32px;">📈 能力提升建议</h3>';
    let abilityAdvice = '';
    if (estimatedAbility >= 1.5) {
        abilityAdvice = `
            <div style="background: #E8F5E9; padding: 16px; border-radius: 4px; border-left: 4px solid #34A853;">
                <strong>优秀水平 - 进一步提升建议：</strong>
                <ul style="margin: 8px 0; padding-left: 24px;">
                    <li>挑战更高难度的综合题和压轴题</li>
                    <li>注重数学思想方法的总结和应用</li>
                    <li>加强一题多解的训练，培养发散思维</li>
                    <li>尝试数学竞赛题目，拓展数学视野</li>
                </ul>
            </div>
        `;
    } else if (estimatedAbility >= 0.5) {
        abilityAdvice = `
            <div style="background: #E3F2FD; padding: 16px; border-radius: 4px; border-left: 4px solid #2196F3;">
                <strong>良好水平 - 巩固提升建议：</strong>
                <ul style="margin: 8px 0; padding-left: 24px;">
                    <li>系统梳理已学知识点，查漏补缺</li>
                    <li>加强中等难度题目的训练</li>
                    <li>注重解题方法的总结和归纳</li>
                    <li>适当挑战一些较难的题目，提升能力</li>
                </ul>
            </div>
        `;
    } else if (estimatedAbility >= -0.5) {
        abilityAdvice = `
            <div style="background: #FFF3E0; padding: 16px; border-radius: 4px; border-left: 4px solid #FBBC04;">
                <strong>中等水平 - 提升建议：</strong>
                <ul style="margin: 8px 0; padding-left: 24px;">
                    <li>夯实基础，熟练掌握基本概念和运算法则</li>
                    <li>加强基础题和中档题的练习</li>
                    <li>建立错题本，及时复习巩固</li>
                    <li>多问多练，遇到问题及时解决</li>
                </ul>
            </div>
        `;
    } else {
        abilityAdvice = `
            <div style="background: #FFEBEE; padding: 16px; border-radius: 4px; border-left: 4px solid #EA4335;">
                <strong>需要加强 - 基础强化建议：</strong>
                <ul style="margin: 8px 0; padding-left: 24px;">
                    <li>重点复习基础知识，理解基本概念</li>
                    <li>从简单题目开始，循序渐进</li>
                    <li>每天坚持练习，培养数学感觉</li>
                    <li>寻求老师或同学的帮助，及时解决疑问</li>
                    <li>建立信心，数学是可以学好的</li>
                </ul>
            </div>
        `;
    }
    resultHTML += abilityAdvice;
    
    // 推荐练习题部分
    resultHTML += '<h3 style="margin-top: 32px;">📝 推荐练习题</h3>';
    resultHTML += '<div id="practiceQuestionsArea"></div>';
    
    document.getElementById('resultContent').innerHTML = resultHTML;
    document.getElementById('resultPanel').classList.add('show');
    
    // 生成推荐练习题（在DOM更新后）
    setTimeout(() => {
        generateRecommendedQuestions(knowledgeStats, estimatedAbility, totalAnswered, weakKnowledge);
    }, 100);
    
    // 重新渲染数学公式
    setTimeout(() => {
        if (typeof renderMathInElement !== 'undefined') {
            renderMathInElement(document.getElementById('resultContent'), {
                delimiters: [
                    {left: "$$", right: "$$", display: true},
                    {left: "$", right: "$", display: false}
                ]
            });
        }
    }, 200);
}

function generateRecommendedQuestions(knowledgeStats, estimatedAbility, totalAnswered, weakKnowledge) {
    const area = document.getElementById('practiceQuestionsArea');
    if (!area) return;
    
    let recommendedHTML = '';
    
    // 根据薄弱知识点推荐题目
    if (weakKnowledge.length > 0) {
        recommendedHTML += '<h4 style="margin-top: 16px;">针对薄弱知识点的练习题</h4>';
        
        weakKnowledge.forEach(([kp, stats]) => {
            // 找到该知识点的所有题目
            const relatedQuestions = questionsData
                .map((q, idx) => ({...q, index: idx}))
                .filter(q => q.knowledge_points.includes(kp))
                .slice(0, 5); // 每个知识点推荐5道题
            
            if (relatedQuestions.length > 0) {
                recommendedHTML += `
                    <div style="background: #FAFAFA; padding: 16px; border-radius: 4px; margin: 12px 0; border-left: 3px solid #4285F4;">
                        <strong style="color: #1A73E8;">${kp}（推荐 ${relatedQuestions.length} 道题）</strong>
                        <ul style="margin: 8px 0; padding-left: 20px; list-style: none;">
                `;
                
                relatedQuestions.forEach((q, qIdx) => {
                    const questionNum = q.index + 1;
                    recommendedHTML += `
                        <li style="margin: 6px 0;">
                            <a href="#" onclick="scrollToQuestion(${q.index}); return false;" 
                               style="color: #1A73E8; text-decoration: none; display: flex; align-items: center;">
                                <span style="margin-right: 8px;">${qIdx + 1}.</span>
                                <span>第${questionNum}题</span>
                                <span style="margin-left: 8px; font-size: 0.875rem; color: #5F6368;">
                                    （难度: ${q.difficulty > 0 ? q.difficulty.toFixed(1) : q.difficulty.toFixed(1)}）
                                </span>
                            </a>
                        </li>
                    `;
                });
                
                recommendedHTML += '</ul></div>';
            }
        });
    }
    
    // 根据能力水平推荐合适难度的题目
    let recommendedDifficulty = '';
    if (estimatedAbility >= 1.5) {
        recommendedDifficulty = '较难（难度 1.0-2.0）';
    } else if (estimatedAbility >= 0.5) {
        recommendedDifficulty = '中等（难度 0.0-1.0）';
    } else {
        recommendedDifficulty = '基础（难度 -1.0-0.0）';
    }
    
    // 找到未答题的合适难度题目
    const unansweredQuestions = questionsData
        .map((q, idx) => ({...q, index: idx}))
        .filter((q, idx) => userAnswers[idx] === undefined)
        .filter(q => {
            if (estimatedAbility >= 1.5) {
                return q.difficulty >= 1.0 && q.difficulty <= 2.0;
            } else if (estimatedAbility >= 0.5) {
                return q.difficulty >= 0.0 && q.difficulty <= 1.0;
            } else {
                return q.difficulty >= -1.0 && q.difficulty <= 0.0;
            }
        })
        .slice(0, 5);
    
    if (unansweredQuestions.length > 0) {
        recommendedHTML += `
            <h4 style="margin-top: 24px;">适合你当前水平的练习题（${recommendedDifficulty}）</h4>
            <div style="background: #E8F5E9; padding: 16px; border-radius: 4px; margin: 12px 0; border-left: 3px solid #34A853;">
                <p style="margin: 0 0 8px 0;">以下题目难度适合你当前的能力水平，建议优先练习：</p>
                <ul style="margin: 8px 0; padding-left: 20px; list-style: none;">
        `;
        
        unansweredQuestions.forEach((q, qIdx) => {
            const questionNum = q.index + 1;
            const kpList = q.knowledge_points.join('、');
            recommendedHTML += `
                <li style="margin: 6px 0;">
                    <a href="#" onclick="scrollToQuestion(${q.index}); return false;" 
                       style="color: #1A73E8; text-decoration: none; display: flex; align-items: center;">
                        <span style="margin-right: 8px;">${qIdx + 1}.</span>
                        <span>第${questionNum}题</span>
                        <span style="margin-left: 8px; font-size: 0.875rem; color: #5F6368;">
                            （${kpList}，难度: ${q.difficulty.toFixed(1)}）
                        </span>
                    </a>
                </li>
            `;
        });
        
        recommendedHTML += '</ul></div>';
    }
    
    area.innerHTML = recommendedHTML;
}

function showPracticeQuestions(knowledgePoint) {
    // 滚动到该知识点的相关题目区域
    const questions = questionsData
        .map((q, idx) => ({...q, index: idx}))
        .filter(q => q.knowledge_points.includes(knowledgePoint));
    
    if (questions.length > 0) {
        // 滚动到第一道相关题目
        scrollToQuestion(questions[0].index);
        closeResultPanel();
    }
}

function scrollToQuestion(questionIndex) {
    const question = document.querySelector(`[data-question-index="${questionIndex}"]`);
    if (question) {
        question.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // 高亮显示
        question.style.transition = 'box-shadow 0.3s';
        question.style.boxShadow = '0 4px 12px rgba(66, 133, 244, 0.4)';
        setTimeout(() => {
            question.style.boxShadow = '';
        }, 2000);
    }
}

function closeResultPanel() {
    document.getElementById('resultPanel').classList.remove('show');
}

// 初始化KaTeX渲染
document.addEventListener('DOMContentLoaded', function() {
    if (typeof renderMathInElement !== 'undefined') {
        renderMathInElement(document.body, {
            delimiters: [
                {left: "$$", right: "$$", display: true},
                {left: "$", right: "$", display: false}
            ]
        });
    }
});
        ''')
        html.append('</script>')
        
        html.append('</body>')
        html.append('</html>')
        
        # 写入文件
        output_path = os.path.join(os.path.dirname(__file__), '..', output_file)
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write('\n'.join(html))
        
        print(f"✅ 交互式HTML文件已导出: {output_path}")
        return output_path

if __name__ == '__main__':
    export_interactive_html()

