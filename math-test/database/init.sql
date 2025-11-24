-- 数据库初始化脚本
-- 注意：实际使用中，SQLAlchemy会自动创建表结构
-- 此文件主要用于参考和手动初始化

-- 题目表
CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    options TEXT NOT NULL,  -- JSON格式存储选项
    correct_answer INTEGER NOT NULL,
    difficulty REAL NOT NULL,
    discrimination REAL DEFAULT 1.0,
    knowledge_points TEXT NOT NULL,  -- JSON格式存储知识点列表
    category TEXT NOT NULL,
    explanation TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 测试会话表
CREATE TABLE IF NOT EXISTS test_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id TEXT,
    current_ability REAL DEFAULT 0.0,
    total_questions INTEGER DEFAULT 0,
    status TEXT DEFAULT 'in_progress',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME
);

-- 答题记录表
CREATE TABLE IF NOT EXISTS test_responses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id INTEGER NOT NULL,
    question_id INTEGER NOT NULL,
    answer INTEGER NOT NULL,
    is_correct BOOLEAN NOT NULL,
    response_time REAL,
    ability_before REAL,
    ability_after REAL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES test_sessions(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions(id)
);

-- 知识点表
CREATE TABLE IF NOT EXISTS knowledge_points (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    description TEXT
);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_questions_category ON questions(category);
CREATE INDEX IF NOT EXISTS idx_questions_difficulty ON questions(difficulty);
CREATE INDEX IF NOT EXISTS idx_responses_session ON test_responses(session_id);
CREATE INDEX IF NOT EXISTS idx_responses_question ON test_responses(question_id);
CREATE INDEX IF NOT EXISTS idx_sessions_student ON test_sessions(student_id);
CREATE INDEX IF NOT EXISTS idx_sessions_status ON test_sessions(status);

