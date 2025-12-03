// AI 辅助苏格拉底提问 - 集成示例和高级用法

/**
 * 示例1: 基础集成
 * 如何在现有对话中集成 AI 助手
 */
class BasicIntegration {
    constructor() {
        this.assistant = new AIAssistant();
    }

    async setupBasic(config) {
        // 初始化 AI 助手
        const result = await this.assistant.initialize(config);
        if (result.success) {
            console.log('AI 助手已准备好');
            return true;
        }
        return false;
    }

    async handleUserMessage(message) {
        // 为用户的每条消息生成额外问题
        const questions = await this.assistant.generateSocraticQuestions(message);
        return questions;
    }
}

/**
 * 示例2: 高级学生档案管理
 * 完整的学生学习跟踪系统
 */
class StudentProfileManager {
    constructor() {
        this.assistant = new AIAssistant();
        this.sessionData = [];
    }

    // 记录一个完整的学习会话
    recordSession(sessionInfo) {
        const session = {
            id: Date.now(),
            startTime: new Date(),
            studentName: sessionInfo.studentName,
            gradeLevel: sessionInfo.gradeLevel,
            topic: sessionInfo.topic,
            messages: [],
            endTime: null,
            result: null
        };
        this.sessionData.push(session);
        return session.id;
    }

    // 添加消息到会话
    addMessage(sessionId, role, content) {
        const session = this.sessionData.find(s => s.id === sessionId);
        if (session) {
            session.messages.push({
                role: role,
                content: content,
                timestamp: new Date()
            });
        }
    }

    // 结束会话并生成报告
    async endSession(sessionId) {
        const session = this.sessionData.find(s => s.id === sessionId);
        if (!session) return null;

        session.endTime = new Date();
        session.duration = session.endTime - session.startTime;

        // 使用 AI 生成学习报告
        const report = await this.assistant.generateLearningReport({
            messages: session.messages,
            topic: session.topic,
            gradeLevel: session.gradeLevel,
            duration: session.duration,
            messageCount: session.messages.length
        });

        session.result = report;
        return report;
    }

    // 分析学生的学习模式
    analyzeStudentPattern(sessions) {
        const patterns = {
            averageSessionDuration: 0,
            commonMisconceptions: {},
            learningSpeed: 'medium',
            preferredQuestionTypes: {},
            progressTrend: []
        };

        if (sessions.length === 0) return patterns;

        // 计算平均会话时长
        const totalDuration = sessions.reduce(
            (sum, s) => sum + (s.duration || 0), 0
        );
        patterns.averageSessionDuration = totalDuration / sessions.length;

        // 分析误区出现频率
        sessions.forEach(session => {
            if (session.result?.analysis?.misconceptions) {
                session.result.analysis.misconceptions.forEach(m => {
                    patterns.commonMisconceptions[m] =
                        (patterns.commonMisconceptions[m] || 0) + 1;
                });
            }
        });

        // 判断学习速度
        if (patterns.averageSessionDuration < 600000) {
            patterns.learningSpeed = 'fast';
        } else if (patterns.averageSessionDuration > 1800000) {
            patterns.learningSpeed = 'slow';
        }

        return patterns;
    }
}

/**
 * 示例3: 自适应难度系统
 * 根据学生表现自动调整问题难度
 */
class AdaptiveDifficultySystem {
    constructor(assistant) {
        this.assistant = assistant;
        this.currentDifficulty = 'medium';
        this.correctCount = 0;
        this.incorrectCount = 0;
        this.threshold = 3; // 连续正确/错误 3 次时调整难度
    }

    // 更新难度基于学生回答
    async updateDifficulty(isCorrect) {
        if (isCorrect) {
            this.correctCount++;
            this.incorrectCount = 0;
        } else {
            this.incorrectCount++;
            this.correctCount = 0;
        }

        // 当连续答对时提高难度
        if (this.correctCount >= this.threshold) {
            this.increaseDifficulty();
        }

        // 当连续答错时降低难度
        if (this.incorrectCount >= this.threshold) {
            this.decreaseDifficulty();
        }

        // 更新助手的学生档案
        this.assistant.updateStudentProfile({
            currentDifficulty: this.currentDifficulty
        });
    }

    increaseDifficulty() {
        const levels = ['easy', 'medium', 'hard', 'expert'];
        const currentIndex = levels.indexOf(this.currentDifficulty);
        if (currentIndex < levels.length - 1) {
            this.currentDifficulty = levels[currentIndex + 1];
            console.log(`难度提高到: ${this.currentDifficulty}`);
            this.correctCount = 0;
        }
    }

    decreaseDifficulty() {
        const levels = ['easy', 'medium', 'hard', 'expert'];
        const currentIndex = levels.indexOf(this.currentDifficulty);
        if (currentIndex > 0) {
            this.currentDifficulty = levels[currentIndex - 1];
            console.log(`难度降低到: ${this.currentDifficulty}`);
            this.incorrectCount = 0;
        }
    }
}

/**
 * 示例4: 概念关系图谱
 * 帮助学生理解不同数学概念之间的联系
 */
class ConceptNetwork {
    constructor(assistant) {
        this.assistant = assistant;
        this.concepts = new Map();
        this.relationships = [];
    }

    // 添加概念
    addConcept(name, description, gradeLevel) {
        this.concepts.set(name, {
            name,
            description,
            gradeLevel,
            relatedConcepts: [],
            applications: []
        });
    }

    // 建立概念之间的关系
    addRelationship(concept1, concept2, relationshipType) {
        this.relationships.push({
            source: concept1,
            target: concept2,
            type: relationshipType // 'prerequisite', 'related', 'application'
        });
    }

    // 获取概念的前置条件
    getPrerequisites(concept) {
        return this.relationships
            .filter(r => r.target === concept && r.type === 'prerequisite')
            .map(r => r.source);
    }

    // 获取概念的应用
    getApplications(concept) {
        return this.relationships
            .filter(r => r.source === concept && r.type === 'application')
            .map(r => r.target);
    }

    // 获取相关概念
    getRelatedConcepts(concept) {
        return this.relationships
            .filter(r => (r.source === concept || r.target === concept) 
                    && r.type === 'related')
            .map(r => r.source === concept ? r.target : r.source);
    }

    // 生成学习路径
    generateLearningSequence(targetConcept) {
        const prerequisites = this.getPrerequisites(targetConcept);
        const sequence = [];

        // 递归获取所有前置条件
        const collect = (concept) => {
            const prereqs = this.getPrerequisites(concept);
            prereqs.forEach(p => {
                if (!sequence.includes(p)) {
                    collect(p);
                    sequence.push(p);
                }
            });
        };

        collect(targetConcept);
        sequence.push(targetConcept);

        return sequence;
    }
}

/**
 * 示例5: 智能复习调度器
 * 基于遗忘曲线的最优复习计划
 */
class SpacedRepetitionScheduler {
    constructor(assistant) {
        this.assistant = assistant;
        this.learningItems = [];
        this.schedule = [];
    }

    // Ebbinghaus 遗忘曲线的间隔时间（以天为单位）
    static INTERVALS = [1, 3, 7, 14, 30];

    // 添加学习项目
    addLearningItem(conceptName, learnDate) {
        this.learningItems.push({
            name: conceptName,
            learnDate: new Date(learnDate),
            reviewCount: 0,
            nextReviewDate: null,
            difficulty: 'medium'
        });
    }

    // 记录一次复习
    recordReview(conceptName, correct) {
        const item = this.learningItems.find(i => i.name === conceptName);
        if (!item) return;

        item.reviewCount++;

        // 根据正确性调整间隔
        const intervalIndex = Math.min(
            item.reviewCount - 1,
            SpacedRepetitionScheduler.INTERVALS.length - 1
        );
        let interval = SpacedRepetitionScheduler.INTERVALS[intervalIndex];

        // 如果答错，重置复习计数
        if (!correct) {
            item.reviewCount = Math.max(0, item.reviewCount - 1);
            interval = 1;
        }

        // 计算下次复习时间
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + interval);
        item.nextReviewDate = nextDate;
    }

    // 生成今天的复习计划
    getTodaySchedule() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return this.learningItems.filter(item => {
            if (!item.nextReviewDate) return false;
            const nextDate = new Date(item.nextReviewDate);
            nextDate.setHours(0, 0, 0, 0);
            return nextDate <= today;
        });
    }

    // 生成完整的复习计划
    async generateComprehensiveSchedule() {
        const schedule = {
            today: this.getTodaySchedule(),
            thisWeek: this.getWeekSchedule(),
            thisMonth: this.getMonthSchedule(),
            recommendations: []
        };

        // 使用 AI 生成个性化建议
        const conceptsToReview = schedule.today.map(item => item.name);
        const plan = await this.assistant.generateReviewPlan(conceptsToReview);

        schedule.recommendations = plan.data?.reviewPlan || [];
        return schedule;
    }

    // 获取本周的复习计划
    getWeekSchedule() {
        const today = new Date();
        const weekLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

        return this.learningItems.filter(item => {
            if (!item.nextReviewDate) return false;
            return item.nextReviewDate >= today && item.nextReviewDate <= weekLater;
        });
    }

    // 获取本月的复习计划
    getMonthSchedule() {
        const today = new Date();
        const monthLater = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);

        return this.learningItems.filter(item => {
            if (!item.nextReviewDate) return false;
            return item.nextReviewDate >= today && item.nextReviewDate <= monthLater;
        });
    }
}

/**
 * 示例6: 完整的教学助手实现
 * 综合所有功能的完整系统
 */
class ComprehensiveTeachingAssistant {
    constructor(config) {
        this.config = config;
        this.aiAssistant = new AIAssistant();
        this.profileManager = new StudentProfileManager();
        this.adaptiveSystem = new AdaptiveDifficultySystem(this.aiAssistant);
        this.conceptNetwork = new ConceptNetwork(this.aiAssistant);
        this.scheduler = new SpacedRepetitionScheduler(this.aiAssistant);
        this.currentSession = null;
    }

    // 初始化系统
    async initialize() {
        const result = await this.aiAssistant.initialize(this.config);
        if (!result.success) {
            throw new Error('AI 助手初始化失败');
        }

        // 初始化数学概念网络
        this.initializeMathConcepts();
        return true;
    }

    // 初始化数学概念
    initializeMathConcepts() {
        // 初中代数概念示例
        this.conceptNetwork.addConcept('整数', '正负整数和零', '7');
        this.conceptNetwork.addConcept('有理数', '可以表示为两个整数比的数', '7');
        this.conceptNetwork.addConcept('代数式', '由数和字母通过运算组成的式子', '7');
        this.conceptNetwork.addConcept('方程', '含有未知数的等式', '7');
        this.conceptNetwork.addConcept('函数', '两个变量之间的依赖关系', '8');

        // 建立关系
        this.conceptNetwork.addRelationship('整数', '有理数', 'prerequisite');
        this.conceptNetwork.addRelationship('有理数', '代数式', 'prerequisite');
        this.conceptNetwork.addRelationship('代数式', '方程', 'prerequisite');
        this.conceptNetwork.addRelationship('方程', '函数', 'prerequisite');
        this.conceptNetwork.addRelationship('代数式', '代数式', 'related');
    }

    // 开始学习会话
    async startLearningSession(studentInfo, topic) {
        const sessionId = this.profileManager.recordSession({
            studentName: studentInfo.name,
            gradeLevel: studentInfo.gradeLevel,
            topic: topic
        });

        this.currentSession = {
            id: sessionId,
            topic: topic,
            studentInfo: studentInfo
        };

        // 生成学习路径
        const learningPath = await this.aiAssistant.generateLearningPath(topic);
        return {
            sessionId,
            learningPath: learningPath.data
        };
    }

    // 处理学生消息
    async handleStudentMessage(message) {
        if (!this.currentSession) {
            throw new Error('未开始学习会话');
        }

        // 记录消息
        this.profileManager.addMessage(this.currentSession.id, 'user', message);

        // 生成苏格拉底问题
        const questions = await this.aiAssistant.generateSocraticQuestions(message);

        // 分析学生回答
        const analysis = await this.aiAssistant.analyzeStudentResponse(
            message,
            [this.currentSession.topic]
        );

        return {
            questions: questions.data?.questions || [],
            analysis: analysis.data,
            difficulty: this.adaptiveSystem.currentDifficulty
        };
    }

    // 记录学生回答评估
    recordAnswerEvaluation(isCorrect, feedback) {
        // 更新自适应难度
        this.adaptiveSystem.updateDifficulty(isCorrect);

        // 记录到会话
        if (this.currentSession) {
            this.profileManager.addMessage(
                this.currentSession.id,
                'assessment',
                {
                    correct: isCorrect,
                    feedback: feedback,
                    difficulty: this.adaptiveSystem.currentDifficulty
                }
            );
        }
    }

    // 结束学习会话并获取报告
    async endLearningSession() {
        if (!this.currentSession) {
            throw new Error('未开始学习会话');
        }

        const sessionId = this.currentSession.id;
        const report = await this.profileManager.endSession(sessionId);

        // 将概念添加到复习计划
        this.scheduler.addLearningItem(
            this.currentSession.topic,
            new Date()
        );

        this.currentSession = null;
        return report;
    }

    // 获取个性化学习建议
    async getPersonalizedRecommendations() {
        const nextTopic = await this.aiAssistant.recommendNextTopic(
            this.currentSession?.topic || ''
        );

        const reviewSchedule = await this.scheduler.generateComprehensiveSchedule();

        return {
            nextTopic: nextTopic.data,
            reviewSchedule: reviewSchedule
        };
    }

    // 导出学习数据
    exportData() {
        return {
            sessions: this.profileManager.sessionData,
            learningItems: this.scheduler.learningItems,
            studentProfile: this.aiAssistant.studentProfile,
            timestamp: new Date()
        };
    }
}

// 导出所有类供外部使用
window.StudentProfileManager = StudentProfileManager;
window.AdaptiveDifficultySystem = AdaptiveDifficultySystem;
window.ConceptNetwork = ConceptNetwork;
window.SpacedRepetitionScheduler = SpacedRepetitionScheduler;
window.ComprehensiveTeachingAssistant = ComprehensiveTeachingAssistant;
