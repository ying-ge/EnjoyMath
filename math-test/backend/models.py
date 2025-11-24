"""
数据库模型定义
"""
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Question(db.Model):
    """题目表"""
    __tablename__ = 'questions'
    
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)  # 题目内容（支持LaTeX）
    options = db.Column(db.JSON, nullable=False)  # 选项（JSON格式）
    correct_answer = db.Column(db.Integer, nullable=False)  # 正确答案索引
    difficulty = db.Column(db.Float, nullable=False)  # 难度系数 (-3到3)
    discrimination = db.Column(db.Float, default=1.0)  # 区分度
    knowledge_points = db.Column(db.JSON, nullable=False)  # 知识点列表
    category = db.Column(db.String(50), nullable=False)  # 题目分类
    semester = db.Column(db.String(20))  # 学期（如：七年级上、七年级下、八年级上、八年级下、九年级上、九年级下）
    explanation = db.Column(db.Text)  # 题目解析
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'options': self.options,
            'difficulty': self.difficulty,
            'discrimination': self.discrimination,
            'knowledge_points': self.knowledge_points,
            'category': self.category,
            'semester': self.semester,
            'explanation': self.explanation
        }


class TestSession(db.Model):
    """测试会话表"""
    __tablename__ = 'test_sessions'
    
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.String(100))  # 学生标识（可选）
    current_ability = db.Column(db.Float, default=0.0)  # 当前能力估计值
    total_questions = db.Column(db.Integer, default=0)  # 已回答题目数
    status = db.Column(db.String(20), default='in_progress')  # in_progress, completed
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    completed_at = db.Column(db.DateTime)
    
    # 关系
    responses = db.relationship('TestResponse', backref='session', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'student_id': self.student_id,
            'current_ability': self.current_ability,
            'total_questions': self.total_questions,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'completed_at': self.completed_at.isoformat() if self.completed_at else None
        }


class TestResponse(db.Model):
    """答题记录表"""
    __tablename__ = 'test_responses'
    
    id = db.Column(db.Integer, primary_key=True)
    session_id = db.Column(db.Integer, db.ForeignKey('test_sessions.id'), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'), nullable=False)
    answer = db.Column(db.Integer, nullable=False)  # 选择的答案索引
    is_correct = db.Column(db.Boolean, nullable=False)  # 是否正确
    response_time = db.Column(db.Float)  # 答题耗时（秒）
    ability_before = db.Column(db.Float)  # 答题前的能力估计
    ability_after = db.Column(db.Float)  # 答题后的能力估计
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # 关系
    question = db.relationship('Question', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'session_id': self.session_id,
            'question_id': self.question_id,
            'answer': self.answer,
            'is_correct': self.is_correct,
            'response_time': self.response_time,
            'ability_before': self.ability_before,
            'ability_after': self.ability_after,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class KnowledgePoint(db.Model):
    """知识点表"""
    __tablename__ = 'knowledge_points'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)  # 知识点名称
    category = db.Column(db.String(50), nullable=False)  # 所属分类
    description = db.Column(db.Text)  # 知识点描述
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'category': self.category,
            'description': self.description
        }
