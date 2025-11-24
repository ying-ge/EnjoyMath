"""
数据库迁移：为questions表添加semester字段
"""
from app import app
from models import db
import sqlite3
import os

def migrate_add_semester():
    """添加semester字段到questions表"""
    with app.app_context():
        # 获取数据库路径
        db_path = app.config['SQLALCHEMY_DATABASE_URI'].replace('sqlite:///', '')
        
        if not os.path.exists(db_path):
            print("数据库文件不存在，将在初始化时创建")
            return
        
        # 使用SQLite直接操作
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        try:
            # 检查semester列是否已存在
            cursor.execute("PRAGMA table_info(questions)")
            columns = [column[1] for column in cursor.fetchall()]
            
            if 'semester' in columns:
                print("semester字段已存在，跳过迁移")
                conn.close()
                return
            
            # 添加semester列
            print("正在添加semester字段...")
            cursor.execute("ALTER TABLE questions ADD COLUMN semester TEXT")
            conn.commit()
            print("✅ semester字段添加成功")
            
        except Exception as e:
            print(f"❌ 迁移失败: {e}")
            conn.rollback()
        finally:
            conn.close()

if __name__ == '__main__':
    migrate_add_semester()

