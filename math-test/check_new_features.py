#!/usr/bin/env python3
"""
检查新功能是否正常工作
"""
import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

from app import app, test_engine
from models import db, TestSession

def check_new_features():
    with app.app_context():
        # 查找一个已完成的测试会话
        session = TestSession.query.filter_by(status='completed').first()
        
        if not session:
            print("❌ 没有找到已完成的测试会话")
            print("   请先完成一次测试，然后再检查")
            return False
        
        print(f"✅ 找到测试会话 ID: {session.id}")
        print(f"   能力值: {session.current_ability:.2f}")
        print()
        
        # 测试所有新功能
        features = {
            '标准分数 (Scaled Score)': test_engine.calculate_scaled_score(session.current_ability),
            '年级等值 (GE)': test_engine.calculate_grade_equivalent(session.current_ability),
            'ZPD': test_engine.calculate_zpd(session.current_ability),
            '预测性分析': test_engine.predict_future_ability(session.current_ability),
            '技能诊断': test_engine.diagnose_skill_levels(session.id),
            '测试频率建议': test_engine.recommend_testing_frequency(session.current_ability),
            '推荐目标': test_engine.recommend_goals(session.current_ability, test_engine.calculate_zpd(session.current_ability))
        }
        
        print("📊 新功能检查结果:")
        print("=" * 60)
        all_ok = True
        for name, result in features.items():
            if result:
                print(f"✅ {name}: 正常")
            else:
                print(f"❌ {name}: 异常")
                all_ok = False
        
        print("=" * 60)
        
        if all_ok:
            print("\n✅ 所有新功能都正常工作！")
            print("\n💡 如果前端看不到新功能，请尝试：")
            print("   1. 重启后端服务: ./start_backend.sh")
            print("   2. 重启前端服务: ./start_frontend.sh")
            print("   3. 清除浏览器缓存: Ctrl+Shift+R (Windows) 或 Cmd+Shift+R (Mac)")
            print("   4. 完成一次新的测试")
        else:
            print("\n❌ 部分功能异常，请检查代码")
        
        return all_ok

if __name__ == '__main__':
    check_new_features()

