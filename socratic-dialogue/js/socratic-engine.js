// 苏格拉底对话游戏 - 对话引擎类
class SocraticEngine {
    constructor() {
        this.apiClient = new ApiClient();
        this.storage = new SocraticStorage();
        this.conversationHistory = [];
        this.isActive = false;
        this.currentSession = null;
        this.mathKeywords = [
            '方程', '函数', '几何', '代数', '概率', '统计', '三角', '向量',
            '数列', '不等式', '集合', '逻辑', '证明', '坐标', '图形',
            '角度', '面积', '体积', '比例', '分数', '小数', '整数',
            '质数', '因数', '倍数', '最大公约数', '最小公倍数',
            '平方根', '立方根', '指数', '对数', '组合', '排列'
        ];
        this.socraticQuestions = [
            '你认为为什么是这样？',
            '能解释一下你的想法吗？',
            '你是如何得出这个结论的？',
            '有没有其他可能的方法？',
            '这个概念在生活中有什么应用？',
            '如果你把这个数字改大一些，结果会怎么样？',
            '你能用一个简单的例子来解释吗？',
            '这个规律对你解决问题有帮助吗？',
            '你能用不同的方式来表达这个想法吗？',
            '你有没有考虑过边界情况？',
            '这和之前学过的什么内容有关联？',
            '你能预测下一步会发生什么吗？'
        ];
    }

    // 初始化引擎
    async initialize() {
        try {
            // 加载配置
            const config = this.storage.loadConfig();
            if (config.apiKey) {
                this.apiClient.setConfig(config);
            }

            // 加载历史记录
            this.conversationHistory = this.storage.getChatHistory();

            return { success: true };
        } catch (error) {
            console.error('初始化失败:', error);
            return { success: false, error: error.message };
        }
    }

    // 开始新的对话会话
    startSession(config) {
        this.currentSession = {
            id: this.generateSessionId(),
            startTime: new Date(),
            config: config,
            messages: []
        };

        this.isActive = true;
        this.conversationHistory = [];

        return this.currentSession;
    }

    // 结束当前会话
    endSession() {
        if (this.currentSession) {
            this.currentSession.endTime = new Date();
            this.currentSession.duration = this.currentSession.endTime - this.currentSession.startTime;

            // 保存会话统计
            this.saveSessionStats(this.currentSession);

            this.currentSession = null;
            this.isActive = false;
        }
    }

    // 发送消息
    async sendMessage(userMessage, config, onProgress) {
        if (!this.isActive) {
            return { success: false, error: '会话未激活' };
        }

        try {
            // 添加用户消息到历史
            const userMsg = {
                role: 'user',
                content: userMessage,
                timestamp: new Date().toISOString()
            };

            this.conversationHistory.push(userMsg);
            this.storage.saveChatMessage(userMsg);

            // 分析用户输入
            const analysis = this.analyzeUserInput(userMessage);

            // 如果是数学问题，添加苏格拉底引导
            let enhancedMessage = userMessage;
            if (analysis.isMathRelated) {
                enhancedMessage = this.enhanceWithSocraticGuidance(userMessage, analysis);
            }

            // 调用API
            const response = await this.apiClient.sendMessage(
                enhancedMessage,
                this.conversationHistory,
                config.gradeLevel,
                config.mathTopic,
                onProgress
            );

            if (response.success) {
                // 添加助手消息到历史
                const assistantMsg = {
                    role: 'assistant',
                    content: response.content,
                    timestamp: new Date().toISOString()
                };

                this.conversationHistory.push(assistantMsg);
                this.storage.saveChatMessage(assistantMsg);

                // 生成后续问题建议
                const followUpQuestions = this.generateFollowUpQuestions(analysis, response.content);

                return {
                    success: true,
                    content: response.content,
                    analysis: analysis,
                    followUpQuestions: followUpQuestions
                };
            } else {
                return response;
            }

        } catch (error) {
            console.error('发送消息失败:', error);
            return { success: false, error: error.message };
        }
    }

    // 分析用户输入
    analyzeUserInput(message) {
        const analysis = {
            isMathRelated: false,
            keywords: [],
            concepts: [],
            difficulty: 'medium',
            questionType: 'unknown'
        };

        // 检查是否包含数学关键词
        const lowerMessage = message.toLowerCase();
        for (const keyword of this.mathKeywords) {
            if (lowerMessage.includes(keyword)) {
                analysis.isMathRelated = true;
                analysis.keywords.push(keyword);
            }
        }

        // 检测问题类型
        if (lowerMessage.includes('为什么') || lowerMessage.includes('怎么')) {
            analysis.questionType = 'explanation';
        } else if (lowerMessage.includes('等于') || lowerMessage.includes('计算')) {
            analysis.questionType = 'calculation';
        } else if (lowerMessage.includes('证明') || lowerMessage.includes('验证')) {
            analysis.questionType = 'proof';
        } else if (lowerMessage.includes('解') || lowerMessage.includes('求')) {
            analysis.questionType = 'problem_solving';
        } else if (lowerMessage.includes('比较') || lowerMessage.includes('哪个')) {
            analysis.questionType = 'comparison';
        }

        // 估算难度
        if (analysis.keywords.length > 3) {
            analysis.difficulty = 'high';
        } else if (analysis.keywords.length > 1) {
            analysis.difficulty = 'medium';
        } else {
            analysis.difficulty = 'low';
        }

        return analysis;
    }

    // 用苏格拉底引导增强消息
    enhanceWithSocraticGuidance(message, analysis) {
        let enhancement = '';

        // 根据问题类型添加引导
        switch (analysis.questionType) {
            case 'calculation':
                enhancement = '\\n\\n请用苏格拉底式的方法，引导学生思考计算过程，而不是直接给出答案。';
                break;
            case 'explanation':
                enhancement = '\\n\\n请用简单的例子和类比来解释，并经常提问确认学生是否理解。';
                break;
            case 'proof':
                enhancement = '\\n\\n帮助学生逐步构建证明思路，每一步都要让学生思考为什么。';
                break;
            case 'problem_solving':
                enhancement = '\\n\\n引导学生分析问题，尝试不同的方法，鼓励探索和试错。';
                break;
            case 'comparison':
                enhancement = '\\n\\n帮助学生比较不同概念，找到相同点和不同点。';
                break;
        }

        // 根据难度添加额外指导
        if (analysis.difficulty === 'high') {
            enhancement += '\\n\\n这个问题涉及多个概念，请分解为更容易理解的步骤。';
        }

        return message + enhancement;
    }

    // 生成后续问题建议
    generateFollowUpQuestions(analysis, assistantResponse) {
        const questions = [];

        // 基于问题类型生成建议问题
        switch (analysis.questionType) {
            case 'calculation':
                questions.push(
                    '你能用自己的话解释一下计算步骤吗？',
                    '如果数字发生变化，结果会如何变化？',
                    '这个计算在实际生活中有什么应用？'
                );
                break;
            case 'explanation':
                questions.push(
                    '你能举个具体的例子吗？',
                    '这个概念和你之前学过的什么内容有关？',
                    '如果你向同学解释这个概念，你会怎么说？'
                );
                break;
            case 'proof':
                questions.push(
                    '你认为证明的关键步骤是什么？',
                    '有没有其他方法来证明这个结论？',
                    '你能画个图来帮助理解吗？'
                );
                break;
        }

        // 基于关键词生成相关概念问题
        for (const keyword of analysis.keywords.slice(0, 2)) {
            if (keyword === '函数') {
                questions.push('这个函数的图像是什么样的？');
                questions.push('自变量和因变量之间有什么关系？');
            } else if (keyword === '方程') {
                questions.push('方程的解代表什么意思？');
                questions.push('你能验证一下你的答案是否正确吗？');
            }
        }

        // 返回随机选择的3-5个问题
        const shuffled = questions.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, Math.min(4, shuffled.length));
    }

    // 生成会话ID
    generateSessionId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // 保存会话统计
    saveSessionStats(session) {
        try {
            const stats = {
                sessionId: session.id,
                startTime: session.startTime.toISOString(),
                endTime: session.endTime?.toISOString(),
                duration: session.duration,
                messageCount: session.messages.length,
                gradeLevel: session.config.gradeLevel,
                mathTopic: session.config.mathTopic,
                apiProvider: session.config.apiProvider
            };

            // 保存到统计记录
            const allStats = JSON.parse(localStorage.getItem('socratic-session-stats') || '[]');
            allStats.push(stats);

            // 只保留最近50个会话的统计
            if (allStats.length > 50) {
                allStats.splice(0, allStats.length - 50);
            }

            localStorage.setItem('socratic-session-stats', JSON.stringify(allStats));
        } catch (error) {
            console.error('保存会话统计失败:', error);
        }
    }

    // 获取会话统计
    getSessionStats() {
        try {
            return JSON.parse(localStorage.getItem('socratic-session-stats') || '[]');
        } catch (error) {
            console.error('获取会话统计失败:', error);
            return [];
        }
    }

    // 获取学习进度分析
    getLearningProgress() {
        try {
            const history = this.conversationHistory;
            const stats = this.getSessionStats();

            const progress = {
                totalSessions: stats.length,
                totalMessages: history.length,
                averageSessionDuration: 0,
                mostDiscussedTopics: [],
                improvementAreas: [],
                strengthsAreas: [],
                recentActivity: []
            };

            // 计算平均会话时长
            if (stats.length > 0) {
                const totalDuration = stats.reduce((sum, session) => sum + (session.duration || 0), 0);
                progress.averageSessionDuration = totalDuration / stats.length;
            }

            // 分析讨论最多的主题
            const topicCounts = {};
            for (const session of stats) {
                const topic = session.mathTopic || 'general';
                topicCounts[topic] = (topicCounts[topic] || 0) + 1;
            }

            progress.mostDiscussedTopics = Object.entries(topicCounts)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 5)
                .map(([topic, count]) => ({ topic, count }));

            // 分析最近活动
            progress.recentActivity = stats
                .sort((a, b) => new Date(b.startTime) - new Date(a.startTime))
                .slice(0, 10);

            return progress;
        } catch (error) {
            console.error('获取学习进度失败:', error);
            return null;
        }
    }

    // 获取当前状态
    getCurrentState() {
        return {
            isActive: this.isActive,
            currentSession: this.currentSession,
            conversationLength: this.conversationHistory.length,
            lastActivity: this.conversationHistory.length > 0 ?
                this.conversationHistory[this.conversationHistory.length - 1].timestamp : null
        };
    }

    // 中断当前请求
    abortCurrentRequest() {
        this.apiClient.abortRequest();
    }

    // 清理资源
    cleanup() {
        this.endSession();
        this.abortCurrentRequest();
    }
}

// 导出引擎类
window.SocraticEngine = SocraticEngine;