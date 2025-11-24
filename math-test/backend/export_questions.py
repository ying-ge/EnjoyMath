"""
导出题库到文件
支持导出为 Markdown 和 HTML 格式
"""
from app import app
from models import db, Question
from datetime import datetime
import os
import re

def render_latex_in_html(text):
    """将LaTeX公式转换为HTML格式（用于KaTeX渲染）"""
    if not text:
        return text
    
    # 处理行内公式 $...$
    def replace_inline(match):
        formula = match.group(1)
        return f'<span class="katex-inline">{formula}</span>'
    
    text = re.sub(r'\$([^$]+)\$', replace_inline, text)
    
    # 处理块级公式 $$...$$
    def replace_block(match):
        formula = match.group(1)
        return f'<div class="katex-block">{formula}</div>'
    
    text = re.sub(r'\$\$([^$]+)\$\$', replace_block, text)
    
    return text

def export_to_markdown(output_file='题库.md'):
    """导出题库为 Markdown 格式"""
    with app.app_context():
        questions = Question.query.order_by(Question.semester, Question.category, Question.id).all()
        
        content = []
        content.append("# 数学水平测试系统 - 题库\n")
        content.append(f"**导出时间**: {datetime.now().strftime('%Y年%m月%d日 %H:%M:%S')}\n")
        content.append(f"**题目总数**: {len(questions)} 道\n")
        content.append("\n---\n")
        
        # 按学期分组
        current_semester = None
        current_category = None
        
        for i, q in enumerate(questions, 1):
            # 学期标题
            if q.semester != current_semester:
                current_semester = q.semester
                if current_semester:
                    content.append(f"\n## 📚 {current_semester}\n")
                else:
                    content.append(f"\n## 📚 未分类\n")
            
            # 分类小标题
            if q.category != current_category:
                current_category = q.category
                content.append(f"\n### {current_category}\n")
            
            # 题目内容
            content.append(f"\n#### 第 {i} 题 (ID: {q.id})\n")
            
            # 题目信息
            info_tags = []
            if q.semester:
                info_tags.append(f"**学期**: {q.semester}")
            info_tags.append(f"**难度**: {q.difficulty:.1f}")
            info_tags.append(f"**知识点**: {', '.join(q.knowledge_points)}")
            content.append(f"{' | '.join(info_tags)}\n")
            
            # 题目内容
            content.append(f"**题目**: {q.content}\n")
            
            # 选项
            content.append("**选项**:\n")
            for idx, option in enumerate(q.options):
                correct_mark = " ✅" if idx == q.correct_answer else ""
                content.append(f"{chr(65 + idx)}. {option}{correct_mark}\n")
            
            # 答案
            content.append(f"\n**正确答案**: {chr(65 + q.correct_answer)}\n")
            
            # 解析
            if q.explanation:
                content.append(f"\n**解析**: {q.explanation}\n")
            
            content.append("\n---\n")
        
        # 写入文件
        output_path = os.path.join(os.path.dirname(__file__), '..', output_file)
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(''.join(content))
        
        print(f"✅ Markdown 文件已导出: {output_path}")
        return output_path


def export_to_html(output_file='题库.html'):
    """导出题库为 HTML 格式（包含KaTeX数学公式渲染）"""
    with app.app_context():
        questions = Question.query.order_by(Question.semester, Question.category, Question.id).all()
        
        html = []
        html.append('<!DOCTYPE html>')
        html.append('<html lang="zh-CN">')
        html.append('<head>')
        html.append('  <meta charset="UTF-8">')
        html.append('  <meta name="viewport" content="width=device-width, initial-scale=1.0">')
        html.append('  <title>数学水平测试系统 - 题库</title>')
        html.append('  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">')
        html.append('  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>')
        html.append('  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>')
        html.append('  <style>')
        html.append('    body { font-family: "Microsoft YaHei", "PingFang SC", Arial, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; line-height: 1.8; background: #f5f5f5; }')
        html.append('    .container { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }')
        html.append('    h1 { color: #667eea; border-bottom: 3px solid #667eea; padding-bottom: 10px; margin-top: 0; }')
        html.append('    h2 { color: #764ba2; margin-top: 40px; border-left: 4px solid #764ba2; padding-left: 15px; background: #f8f9fa; padding: 10px 15px; border-radius: 4px; }')
        html.append('    h3 { color: #555; margin-top: 25px; padding-bottom: 5px; border-bottom: 2px dashed #ddd; }')
        html.append('    h4 { color: #333; margin-top: 20px; margin-bottom: 10px; }')
        html.append('    .question { background: #f8f9fa; padding: 25px; margin: 25px 0; border-radius: 10px; border-left: 5px solid #667eea; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }')
        html.append('    .question-info { background: #e8ebff; padding: 12px; border-radius: 6px; margin-bottom: 15px; font-size: 0.9em; display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }')
        html.append('    .question-content { font-size: 1.15em; margin: 15px 0; padding: 10px; background: white; border-radius: 4px; }')
        html.append('    .options { margin: 15px 0; }')
        html.append('    .option { padding: 10px 15px; margin: 8px 0; background: white; border-radius: 6px; border: 2px solid #e0e0e0; transition: all 0.2s; }')
        html.append('    .option.correct { background: #e8f5e9; border-left: 4px solid #4caf50; font-weight: bold; }')
        html.append('    .option:hover { background: #f5f5f5; }')
        html.append('    .answer { background: #e8f5e9; padding: 12px; border-radius: 6px; margin: 15px 0; border-left: 4px solid #4caf50; font-weight: 600; }')
        html.append('    .explanation { background: #fff3e0; padding: 15px; border-radius: 6px; margin-top: 15px; border-left: 4px solid #ff9800; }')
        html.append('    .stats { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; margin-bottom: 30px; }')
        html.append('    .stats p { margin: 8px 0; }')
        html.append('    .semester-badge { background: #E8F0FE; color: #1A73E8; padding: 6px 12px; border-radius: 15px; font-size: 0.9em; font-weight: 600; border: 1px solid #1A73E8; }')
        html.append('    .katex-inline { display: inline-block; margin: 0 2px; }')
        html.append('    .katex-block { margin: 15px 0; text-align: center; }')
        html.append('    @media print { body { background: white; } .question { page-break-inside: avoid; margin: 15px 0; } }')
        html.append('    @media (max-width: 768px) { body { padding: 10px; } .container { padding: 15px; } }')
        html.append('  </style>')
        html.append('</head>')
        html.append('<body>')
        html.append('<div class="container">')
        
        # 标题和统计
        html.append('<h1>📚 数学水平测试系统 - 完整题库</h1>')
        html.append('<div class="stats">')
        html.append(f'<p><strong>导出时间</strong>: {datetime.now().strftime("%Y年%m月%d日 %H:%M:%S")}</p>')
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
        html.append('</div>')
        
        # 按学期分组输出题目
        current_semester = None
        current_category = None
        
        for i, q in enumerate(questions, 1):
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
            
            # 题目
            html.append('<div class="question">')
            html.append(f'<h4>第 {i} 题 (ID: {q.id})</h4>')
            
            # 题目信息
            html.append('<div class="question-info">')
            if q.semester:
                html.append(f'<span class="semester-badge">📅 {q.semester}</span>')
            html.append(f'<span><strong>难度</strong>: {q.difficulty:.1f}</span>')
            html.append(f'<span><strong>知识点</strong>: {", ".join(q.knowledge_points)}</span>')
            html.append('</div>')
            
            # 题目内容（保留LaTeX，由KaTeX渲染）
            html.append(f'<div class="question-content"><strong>题目</strong>: {q.content}</div>')
            
            # 选项
            html.append('<div class="options"><strong>选项</strong>:<br>')
            for idx, option in enumerate(q.options):
                correct_class = ' correct' if idx == q.correct_answer else ''
                html.append(f'<div class="option{correct_class}">{chr(65 + idx)}. {option}</div>')
            html.append('</div>')
            
            # 答案
            html.append(f'<div class="answer">✅ <strong>正确答案</strong>: {chr(65 + q.correct_answer)} ({q.options[q.correct_answer]})</div>')
            
            # 解析
            if q.explanation:
                html.append(f'<div class="explanation"><strong>📖 解析</strong>: {q.explanation}</div>')
            
            html.append('</div>')
        
        html.append('</div>')  # container结束
        
        # 添加KaTeX自动渲染脚本
        html.append('<script>')
        html.append('document.addEventListener("DOMContentLoaded", function() {')
        html.append('  renderMathInElement(document.body, {')
        html.append('    delimiters: [')
        html.append('      {left: "$$", right: "$$", display: true},')
        html.append('      {left: "$", right: "$", display: false}')
        html.append('    ]')
        html.append('  });')
        html.append('});')
        html.append('</script>')
        
        html.append('</body>')
        html.append('</html>')
        
        # 写入文件
        output_path = os.path.join(os.path.dirname(__file__), '..', output_file)
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write('\n'.join(html))
        
        print(f"✅ HTML 文件已导出: {output_path}")
        return output_path


def export_to_pdf_format(output_file='题库_打印版.txt'):
    """导出为纯文本格式（适合打印）"""
    with app.app_context():
        questions = Question.query.order_by(Question.semester, Question.category, Question.id).all()
        
        lines = []
        lines.append("=" * 80)
        lines.append("数学水平测试系统 - 题库（打印版）")
        lines.append("=" * 80)
        lines.append(f"导出时间: {datetime.now().strftime('%Y年%m月%d日 %H:%M:%S')}")
        lines.append(f"题目总数: {len(questions)} 道")
        lines.append("=" * 80)
        lines.append("")
        
        current_semester = None
        current_category = None
        
        for i, q in enumerate(questions, 1):
            # 学期标题
            if q.semester != current_semester:
                current_semester = q.semester
                lines.append("")
                lines.append("=" * 80)
                if current_semester:
                    lines.append(f"【{current_semester}】")
                else:
                    lines.append("【未分类】")
                lines.append("=" * 80)
                lines.append("")
            
            # 分类
            if q.category != current_category:
                current_category = q.category
                lines.append("")
                lines.append(f"分类: {current_category}")
                lines.append("-" * 80)
                lines.append("")
            
            # 题目编号
            lines.append(f"第 {i} 题 (ID: {q.id})")
            
            # 题目信息
            info = []
            if q.semester:
                info.append(f"学期: {q.semester}")
            info.append(f"难度: {q.difficulty:.1f}")
            info.append(f"知识点: {', '.join(q.knowledge_points)}")
            lines.append(" | ".join(info))
            lines.append("")
            
            # 题目内容
            lines.append(f"题目: {q.content}")
            lines.append("")
            
            # 选项
            lines.append("选项:")
            for idx, option in enumerate(q.options):
                correct_mark = " [正确答案]" if idx == q.correct_answer else ""
                lines.append(f"  {chr(65 + idx)}. {option}{correct_mark}")
            lines.append("")
            
            # 解析
            if q.explanation:
                lines.append(f"解析: {q.explanation}")
                lines.append("")
            
            lines.append("-" * 80)
            lines.append("")
        
        # 写入文件
        output_path = os.path.join(os.path.dirname(__file__), '..', output_file)
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write('\n'.join(lines))
        
        print(f"✅ 文本文件已导出: {output_path}")
        return output_path


def export_all_formats():
    """导出所有格式"""
    print("=" * 60)
    print("📚 导出题库")
    print("=" * 60)
    print()
    
    md_file = export_to_markdown()
    html_file = export_to_html()
    txt_file = export_to_pdf_format()
    
    print()
    print("=" * 60)
    print("✅ 所有格式导出完成！")
    print("=" * 60)
    print(f"📄 Markdown: {md_file}")
    print(f"🌐 HTML: {html_file} （推荐给家长）")
    print(f"📝 文本: {txt_file} （适合打印）")
    print()
    print("💡 提示：HTML文件可以直接在浏览器中打开，支持数学公式渲染")

if __name__ == '__main__':
    export_all_formats()
