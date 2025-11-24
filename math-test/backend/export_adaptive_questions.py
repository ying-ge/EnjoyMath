"""
导出题目数据到 adaptive-test/js/questions.js
随机打乱选项顺序，使正确答案分布更均匀
"""
import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from app import app
from models import db, Question
import json
import random

def export_adaptive_questions():
    """导出题目数据到JavaScript文件，随机打乱选项顺序"""
    with app.app_context():
        questions = Question.query.order_by(Question.id).all()
        
        print(f'📊 导出 {len(questions)} 道题目...')
        
        # 统计原始分布
        original_dist = {0: 0, 1: 0, 2: 0, 3: 0}
        for q in questions:
            if q.correct_answer < 4:
                original_dist[q.correct_answer] += 1
        
        print('\n原始正确答案分布:')
        for idx, count in original_dist.items():
            print(f'  选项{chr(65+idx)}: {count}题 ({count/len(questions)*100:.1f}%)')
        
        # 随机打乱选项顺序（保持正确答案对应）
        shuffled_questions = []
        new_dist = {0: 0, 1: 0, 2: 0, 3: 0}
        
        # 设置随机种子，确保每次导出结果一致（可选）
        # random.seed(42)
        
        for q in questions:
            options = q.options.copy()
            correct_idx = q.correct_answer
            correct_answer = options[correct_idx]
            
            # 创建索引列表并打乱
            indices = list(range(len(options)))
            random.shuffle(indices)
            
            # 重新排列选项
            shuffled_options = [options[i] for i in indices]
            
            # 找到正确答案的新索引
            new_correct_idx = shuffled_options.index(correct_answer)
            new_dist[new_correct_idx] += 1
            
            shuffled_questions.append({
                'id': q.id,
                'content': q.content,
                'options': shuffled_options,
                'correctAnswer': new_correct_idx,
                'difficulty': q.difficulty,
                'discrimination': q.discrimination,
                'knowledgePoints': q.knowledge_points,
                'category': q.category,
                'semester': q.semester,
                'explanation': q.explanation
            })
        
        print('\n打乱后的正确答案分布:')
        for idx, count in new_dist.items():
            print(f'  选项{chr(65+idx)}: {count}题 ({count/len(questions)*100:.1f}%)')
        
        # 生成JavaScript文件内容
        js_content = []
        js_content.append('// 题库数据 - 共 {} 道题目\n'.format(len(shuffled_questions)))
        js_content.append('// 从数据库导出，选项顺序已随机打乱，使正确答案分布更均匀\n')
        js_content.append('const questionsData = ')
        js_content.append(json.dumps(shuffled_questions, ensure_ascii=False, indent=2))
        js_content.append(';\n\n')
        js_content.append('// 导出数据\n')
        js_content.append('if (typeof module !== "undefined" && module.exports) {\n')
        js_content.append('    module.exports = questionsData;\n')
        js_content.append('}\n')
        
        # 写入文件
        output_path = os.path.join(
            os.path.dirname(__file__), 
            '..', 
            '..', 
            'adaptive-test', 
            'js', 
            'questions.js'
        )
        
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(''.join(js_content))
        
        print(f'\n✅ 题目数据已导出到: {output_path}')
        return output_path

if __name__ == '__main__':
    export_adaptive_questions()

