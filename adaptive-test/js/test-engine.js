/**
 * 自适应测试引擎
 * 管理整个测试流程
 */

class AdaptiveTestEngine {
    constructor(questions, storage) {
        // 保存所有题目
        this.allQuestions = questions;
        // 初始化时使用所有题目（稍后根据学期过滤）
        this.questions = this._shuffleArray([...questions]);
        this.storage = storage;
        this.irt = new IRTAlgorithm();
        this.sessionId = null;
        this.currentAbility = 0.0;
        this.answeredQuestions = [];
        this.responses = [];
        this.maxQuestions = 20;
        this.minQuestions = 10;
        this.selectedSemester = null;
        
        // 定义学期顺序（用于判断哪些学期是"之前"的）
        this.semesterOrder = [
            '七年级上',
            '七年级下',
            '八年级上',
            '八年级下',
            '九年级上',
            '九年级下'
        ];
    }
    
    /**
     * 根据选择的学期过滤题目
     * 只保留当前学期及之前学期的题目
     */
    filterQuestionsBySemester(semester) {
        if (!semester) {
            // 如果没有选择学期，使用所有题目
            return this._shuffleArray([...this.allQuestions]);
        }
        
        const semesterIndex = this.semesterOrder.indexOf(semester);
        if (semesterIndex === -1) {
            // 如果学期不在列表中，使用所有题目
            console.warn(`未知学期: ${semester}，使用所有题目`);
            return this._shuffleArray([...this.allQuestions]);
        }
        
        // 获取当前学期及之前的所有学期
        const allowedSemesters = this.semesterOrder.slice(0, semesterIndex + 1);
        
        // 过滤题目
        const filteredQuestions = this.allQuestions.filter(q => {
            const qSemester = q.semester || '';
            return allowedSemesters.includes(qSemester);
        });
        
        console.log(`选择学期: ${semester}，可用题目数: ${filteredQuestions.length}`);
        
        // 随机打乱并返回
        return this._shuffleArray([...filteredQuestions]);
    }
    
    /**
     * 随机打乱数组（Fisher-Yates 洗牌算法）
     */
    _shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    /**
     * 开始新测试
     * @param {string} studentId - 学生ID
     * @param {string} semester - 选择的学期（如：七年级上）
     */
    startTest(studentId = '', semester = null) {
        // 保存选择的学期
        this.selectedSemester = semester;
        
        // 根据学期过滤题目
        this.questions = this.filterQuestionsBySemester(semester);
        
        // 检查是否有可用题目
        if (this.questions.length === 0) {
            throw new Error('所选学期没有可用题目，请选择其他学期');
        }
        
        // 生成会话ID
        this.sessionId = this.storage.generateSessionId();
        this.currentAbility = 0.0;
        this.answeredQuestions = [];
        this.responses = [];

        // 选择第一题（中等难度）
        const firstQuestion = this._selectFirstQuestion();

        // 保存会话（包含完整状态和学期信息）
        this._saveSession(studentId, firstQuestion, semester);

        return {
            sessionId: this.sessionId,
            question: firstQuestion,
            questionNumber: 1,
            totalAnswered: 0
        };
    }

    /**
     * 保存会话
     */
    _saveSession(studentId, currentQuestion, semester = null) {
        this.storage.saveSession(this.sessionId, {
            studentId,
            semester: semester || this.selectedSemester,
            currentAbility: this.currentAbility,
            totalQuestions: this.responses.length,
            status: 'in_progress',
            answeredQuestions: [...this.answeredQuestions],
            responses: this.responses.map(r => ({
                questionId: r.question.id,
                isCorrect: r.isCorrect,
                answer: r.answer,
                abilityBefore: r.abilityBefore
            })),
            currentQuestionId: currentQuestion ? currentQuestion.id : null,
            startedAt: new Date().toISOString()
        });
    }

    /**
     * 选择第一题（中等难度，随机选择）
     */
    _selectFirstQuestion() {
        // 选择难度接近0的题目，如果有多个，随机选择一个
        const candidates = [];
        let minDistance = Infinity;

        // 找到所有难度接近0的题目
        for (const question of this.questions) {
            const distance = Math.abs(question.difficulty);
            if (distance < minDistance) {
                minDistance = distance;
                candidates.length = 0; // 清空之前的候选
                candidates.push(question);
            } else if (Math.abs(distance - minDistance) < 0.1) {
                // 如果难度非常接近，也加入候选
                candidates.push(question);
            }
        }

        // 如果有多个候选，随机选择一个
        if (candidates.length > 0) {
            return candidates[Math.floor(Math.random() * candidates.length)];
        }

        // 如果没有找到，随机选择一个中等难度的题目（难度在-1到1之间）
        const mediumDifficulty = this.questions.filter(q => 
            q.difficulty >= -1 && q.difficulty <= 1
        );
        
        if (mediumDifficulty.length > 0) {
            return mediumDifficulty[Math.floor(Math.random() * mediumDifficulty.length)];
        }

        // 最后，随机选择一个题目
        return this.questions[Math.floor(Math.random() * this.questions.length)];
    }

    /**
     * 提交答案
     */
    submitAnswer(questionId, answer, responseTime = 0) {
        const question = this.questions.find(q => q.id === questionId);
        if (!question) {
            throw new Error('题目不存在');
        }

        const isCorrect = answer === question.correctAnswer;
        const abilityBefore = this.currentAbility;

        // 记录答题
        this.answeredQuestions.push(questionId);
        this.responses.push({
            question,
            isCorrect,
            answer,
            responseTime,
            abilityBefore
        });

        // 更新能力估计
        this.currentAbility = this.irt.estimateAbilityMLE(this.responses);

        // 判断是否继续
        const shouldContinue = this._shouldContinue();

        // 获取下一题
        let nextQuestion = null;
        if (shouldContinue) {
            nextQuestion = this.irt.selectNextQuestion(
                this.currentAbility,
                this.questions,
                this.answeredQuestions
            );
            
            // 保存会话（保持学期信息）
            const session = this.storage.loadSession(this.sessionId);
            this._saveSession(
                session?.studentId || '',
                nextQuestion,
                session?.semester || this.selectedSemester
            );
        } else {
            // 测试结束
            this._finishTest();
        }

        return {
            isCorrect,
            explanation: question.explanation,
            abilityBefore,
            abilityAfter: this.currentAbility,
            nextQuestion,
            questionNumber: this.responses.length + 1,
            totalAnswered: this.responses.length,
            shouldContinue
        };
    }

    /**
     * 判断是否继续测试
     */
    _shouldContinue() {
        const answered = this.responses.length;
        
        // 最少题目数
        if (answered < this.minQuestions) {
            return true;
        }
        
        // 最多题目数
        if (answered >= this.maxQuestions) {
            return false;
        }
        
        // 如果能力估计已经比较稳定，可以提前结束
        if (answered >= this.minQuestions) {
            // 检查最近几题的能力变化
            const recentResponses = this.responses.slice(-5);
            if (recentResponses.length >= 3) {
                const recentAbilities = recentResponses.map(r => r.abilityBefore);
                const variance = this._calculateVariance(recentAbilities);
                // 如果方差很小，说明能力估计已经稳定
                if (variance < 0.1) {
                    return false;
                }
            }
        }
        
        return true;
    }

    /**
     * 计算方差
     */
    _calculateVariance(values) {
        if (values.length === 0) return 0;
        const mean = values.reduce((a, b) => a + b, 0) / values.length;
        const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
        return variance;
    }

    /**
     * 完成测试
     */
    _finishTest() {
        const result = this.getResult();
        this.storage.saveResult(this.sessionId, result);
        
        // 更新会话状态
        this.storage.saveSession(this.sessionId, {
            status: 'completed',
            completedAt: new Date().toISOString()
        });
    }

    /**
     * 获取测试结果
     */
    getResult() {
        const totalQuestions = this.responses.length;
        const correctCount = this.responses.filter(r => r.isCorrect).length;
        const correctRate = totalQuestions > 0 ? correctCount / totalQuestions : 0;

        // 分析知识点掌握情况
        const knowledgePointStats = this._analyzeKnowledgePoints();
        
        // 分析学期表现
        const semesterStats = this._analyzeSemesterPerformance();
        
        // 分析难度分布
        const difficultyStats = this._analyzeDifficultyDistribution();
        
        // 能力等级
        const abilityLevel = this._getAbilityLevel(this.currentAbility);

        // 生成具体的学习建议
        const suggestions = this._generateSuggestions(knowledgePointStats, semesterStats, abilityLevel);

        return {
            sessionId: this.sessionId,
            ability: this.currentAbility,
            abilityLevel,
            totalQuestions,
            correctCount,
            correctRate,
            knowledgePointStats,
            semesterStats,
            difficultyStats,
            suggestions,
            responses: this.responses.map(r => ({
                questionId: r.question.id,
                isCorrect: r.isCorrect,
                abilityBefore: r.abilityBefore
            }))
        };
    }
    
    /**
     * 分析难度分布
     */
    _analyzeDifficultyDistribution() {
        const difficultyRanges = {
            '非常简单': { min: -3, max: -1, correct: 0, total: 0, label: '非常简单（难度 -3.0 到 -1.0）' },
            '基础': { min: -1, max: 0, correct: 0, total: 0, label: '基础题（难度 -1.0 到 0.0）' },
            '中等': { min: 0, max: 1, correct: 0, total: 0, label: '中等题（难度 0.0 到 1.0）' },
            '较难': { min: 1, max: 2, correct: 0, total: 0, label: '较难题（难度 1.0 到 2.0）' },
            '困难': { min: 2, max: 3, correct: 0, total: 0, label: '困难题（难度 2.0 到 3.0）' }
        };
        
        // 统计各难度范围的答题情况
        for (const response of this.responses) {
            const difficulty = response.question.difficulty;
            
            for (const [rangeName, range] of Object.entries(difficultyRanges)) {
                // 处理边界情况：最后一个范围包含最大值
                if (rangeName === '困难') {
                    if (difficulty >= range.min && difficulty <= range.max) {
                        range.total++;
                        if (response.isCorrect) {
                            range.correct++;
                        }
                        break;
                    }
                } else {
                    if (difficulty >= range.min && difficulty < range.max) {
                        range.total++;
                        if (response.isCorrect) {
                            range.correct++;
                        }
                        break;
                    }
                }
            }
        }
        
        // 计算正确率和平均难度
        let totalDifficulty = 0;
        let answeredDifficulty = 0;
        for (const response of this.responses) {
            totalDifficulty += response.question.difficulty;
            answeredDifficulty++;
        }
        const avgDifficulty = answeredDifficulty > 0 ? totalDifficulty / answeredDifficulty : 0;
        
        // 计算各难度范围的正确率
        const stats = {};
        for (const [rangeName, range] of Object.entries(difficultyRanges)) {
            if (range.total > 0) {
                stats[rangeName] = {
                    label: range.label,
                    total: range.total,
                    correct: range.correct,
                    accuracy: range.correct / range.total,
                    accuracyPercent: (range.correct / range.total * 100).toFixed(1)
                };
            }
        }
        
        return {
            distribution: stats,
            averageDifficulty: avgDifficulty,
            totalAnswered: answeredDifficulty
        };
    }
    
    /**
     * 生成具体的学习建议
     */
    _generateSuggestions(knowledgePointStats, semesterStats, abilityLevel) {
        const suggestions = {
            weakPoints: [],
            strongPoints: [],
            learningPath: [],
            practiceQuestions: [],
            overallAdvice: ''
        };
        
        // 1. 分析薄弱知识点（掌握度 < 60%）
        const weakKps = Object.entries(knowledgePointStats)
            .filter(([kp, stats]) => stats.mastery < 0.6 && stats.total >= 1)
            .sort((a, b) => a[1].mastery - b[1].mastery)
            .slice(0, 5);
        
        for (const [kp, stats] of weakKps) {
            const guidance = this._getKnowledgePointGuidance(kp);
            const practiceQIds = this._getPracticeQuestions(kp, stats.mastery);
            
            suggestions.weakPoints.push({
                knowledgePoint: kp,
                mastery: stats.masteryPercent,
                guidance: guidance,
                practiceQuestionIds: practiceQIds,
                priority: stats.mastery < 0.4 ? 'high' : 'medium'
            });
        }
        
        // 2. 分析强项知识点（掌握度 >= 80%）
        const strongKps = Object.entries(knowledgePointStats)
            .filter(([kp, stats]) => stats.mastery >= 0.8 && stats.total >= 2)
            .sort((a, b) => b[1].mastery - a[1].mastery)
            .slice(0, 3);
        
        for (const [kp, stats] of strongKps) {
            suggestions.strongPoints.push({
                knowledgePoint: kp,
                mastery: stats.masteryPercent
            });
        }
        
        // 3. 生成学习路径建议
        suggestions.learningPath = this._generateLearningPath(weakKps, abilityLevel);
        
        // 4. 推荐适合当前水平的练习题
        suggestions.practiceQuestions = this._recommendPracticeQuestions(abilityLevel);
        
        // 5. 生成总体建议
        suggestions.overallAdvice = this._generateOverallAdvice(abilityLevel, weakKps.length, strongKps.length);
        
        return suggestions;
    }
    
    /**
     * 获取知识点学习指导
     */
    _getKnowledgePointGuidance(knowledgePoint) {
        const guidanceMap = {
            '有理数': {
                focus: ['正负数的加减运算', '有理数的乘除运算', '有理数的混合运算'],
                method: '建议从数轴理解正负数，通过大量计算练习巩固运算规则。',
                tips: ['注意符号的处理', '掌握运算顺序', '多做混合运算练习']
            },
            '分式': {
                focus: ['分式的约分', '分式的通分', '分式的加减乘除'],
                method: '重点掌握因式分解，这是分式运算的基础。',
                tips: ['先因式分解再约分', '注意分母不能为0', '通分时找最小公倍数']
            },
            '一元一次方程': {
                focus: ['移项法则', '去括号', '去分母'],
                method: '通过大量练习掌握解方程的基本步骤，注意检验。',
                tips: ['移项要变号', '去括号注意符号', '最后要检验解']
            },
            '二元一次方程组': {
                focus: ['代入消元法', '加减消元法', '实际应用'],
                method: '掌握两种消元方法，根据题目特点选择合适的方法。',
                tips: ['先化简再消元', '注意符号变化', '代入后要检验']
            },
            '一元二次方程': {
                focus: ['因式分解法', '配方法', '公式法'],
                method: '优先尝试因式分解，不行再用公式法。',
                tips: ['先看能否因式分解', '注意判别式', '有两个解时都要写出']
            },
            '一次函数': {
                focus: ['函数概念', '一次函数图像', '一次函数性质'],
                method: '通过画图理解函数性质，掌握k和b的意义。',
                tips: ['理解函数定义', '掌握图像特征', '注意实际应用']
            },
            '二次函数': {
                focus: ['二次函数图像', '顶点坐标', '对称轴'],
                method: '重点掌握配方法和顶点式，理解图像变换。',
                tips: ['掌握配方法', '理解顶点意义', '注意开口方向']
            },
            '三角形': {
                focus: ['三角形内角和', '全等三角形', '相似三角形'],
                method: '通过画图理解性质，掌握判定定理。',
                tips: ['画图辅助理解', '掌握判定条件', '注意对应关系']
            },
            '四边形': {
                focus: ['平行四边形', '矩形', '菱形', '正方形'],
                method: '理解各种四边形的性质和判定，注意区别和联系。',
                tips: ['掌握性质定理', '理解判定条件', '注意特殊关系']
            }
        };
        
        return guidanceMap[knowledgePoint] || {
            focus: ['基础概念', '基本运算', '实际应用'],
            method: '建议系统复习该知识点的基础内容，多做相关练习。',
            tips: ['理解基本概念', '掌握基本方法', '多做练习巩固']
        };
    }
    
    /**
     * 获取推荐练习题ID
     */
    _getPracticeQuestions(knowledgePoint, mastery) {
        // 根据掌握度选择合适难度的题目
        let targetDifficulty = 0;
        if (mastery < 0.3) {
            targetDifficulty = -1.0; // 基础题
        } else if (mastery < 0.5) {
            targetDifficulty = -0.5; // 简单题
        } else {
            targetDifficulty = 0.0; // 中等题
        }
        
        // 找到该知识点的题目，按难度匹配
        const candidates = this.allQuestions
            .filter(q => 
                q.knowledgePoints.includes(knowledgePoint) &&
                !this.answeredQuestions.includes(q.id) &&
                Math.abs(q.difficulty - targetDifficulty) < 0.5
            )
            .sort((a, b) => Math.abs(a.difficulty - targetDifficulty) - Math.abs(b.difficulty - targetDifficulty))
            .slice(0, 5)
            .map(q => q.id);
        
        return candidates;
    }
    
    /**
     * 生成学习路径建议
     */
    _generateLearningPath(weakKps, abilityLevel) {
        const path = [];
        
        if (weakKps.length === 0) {
            path.push({
                step: 1,
                action: '保持当前学习节奏',
                description: '你的知识点掌握情况良好，建议继续保持，可以挑战更有难度的题目。'
            });
            return path;
        }
        
        // 按优先级排序
        const sortedWeakKps = weakKps.sort((a, b) => {
            // 先按优先级，再按掌握度
            if (a[1].mastery !== b[1].mastery) {
                return a[1].mastery - b[1].mastery;
            }
            return 0;
        });
        
        sortedWeakKps.forEach(([kp, stats], index) => {
            path.push({
                step: index + 1,
                knowledgePoint: kp,
                mastery: stats.masteryPercent,
                action: `重点复习${kp}`,
                description: `掌握度${stats.masteryPercent}%，建议先理解基础概念，再通过练习巩固。`,
                priority: stats.mastery < 0.4 ? '高' : '中'
            });
        });
        
        return path;
    }
    
    /**
     * 推荐适合当前水平的练习题
     */
    _recommendPracticeQuestions(abilityLevel) {
        let targetDifficulty = 0;
        let difficultyRange = 0.5;
        
        if (abilityLevel === '优秀') {
            targetDifficulty = 1.0;
            difficultyRange = 0.8;
        } else if (abilityLevel === '良好') {
            targetDifficulty = 0.3;
            difficultyRange = 0.7;
        } else if (abilityLevel === '中等') {
            targetDifficulty = -0.3;
            difficultyRange = 0.6;
        } else {
            targetDifficulty = -0.8;
            difficultyRange = 0.5;
        }
        
        // 找到未答的题目，按难度匹配，返回完整题目数据
        const candidates = this.allQuestions
            .filter(q => 
                !this.answeredQuestions.includes(q.id) &&
                Math.abs(q.difficulty - targetDifficulty) <= difficultyRange
            )
            .sort((a, b) => Math.abs(a.difficulty - targetDifficulty) - Math.abs(b.difficulty - targetDifficulty))
            .slice(0, 10)
            .map(q => ({
                id: q.id,
                content: q.content,
                options: q.options,
                correctAnswer: q.correctAnswer,
                difficulty: q.difficulty,
                knowledgePoints: q.knowledgePoints,
                explanation: q.explanation || ''
            }));
        
        return candidates;
    }
    
    /**
     * 生成总体建议
     */
    _generateOverallAdvice(abilityLevel, weakCount, strongCount) {
        if (abilityLevel === '优秀') {
            return `你的数学能力很强！已掌握${strongCount}个知识点。建议继续保持，可以挑战更有难度的题目，注重数学思维的拓展和实际应用能力的提升。`;
        } else if (abilityLevel === '良好') {
            if (weakCount === 0) {
                return `你的数学基础扎实，各知识点掌握均衡。建议在保持现有水平的基础上，适当挑战更有难度的题目，提升解题技巧。`;
            } else {
                return `你的数学能力良好，但还有${weakCount}个知识点需要加强。建议重点复习薄弱环节，同时保持优势知识点的练习。`;
            }
        } else if (abilityLevel === '中等') {
            return `你的数学水平处于中等，有${weakCount}个知识点需要重点加强。建议制定系统的复习计划，从基础概念开始，逐步提升。每天坚持练习，相信很快会有进步。`;
        } else {
            return `你的数学基础需要加强，有${weakCount}个知识点掌握不足。建议从最基础的概念开始系统复习，不要急于求成。每天坚持练习，逐步建立信心。可以寻求老师或同学的帮助，共同进步。`;
        }
    }

    /**
     * 获取能力等级
     */
    _getAbilityLevel(ability) {
        if (ability >= 1.5) return '优秀';
        if (ability >= 0.5) return '良好';
        if (ability >= -0.5) return '中等';
        if (ability >= -1.5) return '一般';
        return '需要加强';
    }

    /**
     * 分析知识点掌握情况
     */
    _analyzeKnowledgePoints() {
        const kpStats = {};
        
        for (const response of this.responses) {
            const question = response.question;
            for (const kp of question.knowledgePoints) {
                if (!kpStats[kp]) {
                    kpStats[kp] = { total: 0, correct: 0 };
                }
                kpStats[kp].total++;
                if (response.isCorrect) {
                    kpStats[kp].correct++;
                }
            }
        }

        // 计算掌握度
        const result = {};
        for (const [kp, stats] of Object.entries(kpStats)) {
            result[kp] = {
                total: stats.total,
                correct: stats.correct,
                mastery: stats.total > 0 ? stats.correct / stats.total : 0,
                masteryPercent: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100 * 10) / 10 : 0
            };
        }

        return result;
    }

    /**
     * 分析学期表现
     */
    _analyzeSemesterPerformance() {
        const semesterStats = {};
        
        for (const response of this.responses) {
            const semester = response.question.semester || '未分类';
            if (!semesterStats[semester]) {
                semesterStats[semester] = { total: 0, correct: 0 };
            }
            semesterStats[semester].total++;
            if (response.isCorrect) {
                semesterStats[semester].correct++;
            }
        }

        // 计算准确率
        const result = {};
        for (const [semester, stats] of Object.entries(semesterStats)) {
            result[semester] = {
                total: stats.total,
                correct: stats.correct,
                accuracy: stats.total > 0 ? stats.correct / stats.total : 0,
                accuracyPercent: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100 * 10) / 10 : 0
            };
        }

        return result;
    }

    /**
     * 恢复测试会话
     */
    restoreSession(sessionId) {
        const session = this.storage.loadSession(sessionId);
        if (!session) {
            return null;
        }
        
        if (session.status === 'completed') {
            return null; // 已完成，不能恢复
        }

        // 恢复学期信息并重新过滤题目
        if (session.semester) {
            this.selectedSemester = session.semester;
            this.questions = this.filterQuestionsBySemester(session.semester);
        }

        this.sessionId = sessionId;
        this.currentAbility = session.currentAbility || 0.0;
        this.answeredQuestions = session.answeredQuestions || [];
        
        // 恢复答题记录（需要从存储的响应中重建）
        if (session.responses && session.responses.length > 0) {
            this.responses = session.responses.map(r => {
                const question = this.questions.find(q => q.id === r.questionId);
                if (!question) {
                    console.warn(`题目 ID ${r.questionId} 未找到`);
                    return null;
                }
                return {
                    question,
                    isCorrect: r.isCorrect,
                    answer: r.answer,
                    abilityBefore: r.abilityBefore || 0.0
                };
            }).filter(r => r !== null); // 过滤掉找不到的题目
            
            // 重新计算能力值
            if (this.responses.length > 0) {
                this.currentAbility = this.irt.estimateAbilityMLE(this.responses);
            }
        }

        // 获取当前题目
        let currentQuestion = null;
        if (session.currentQuestionId) {
            currentQuestion = this.questions.find(q => q.id === session.currentQuestionId);
            if (!currentQuestion) {
                console.warn(`当前题目 ID ${session.currentQuestionId} 未找到`);
            }
        }
        
        if (!currentQuestion) {
            // 选择下一题
            currentQuestion = this.irt.selectNextQuestion(
                this.currentAbility,
                this.questions,
                this.answeredQuestions
            );
        }

        return {
            session,
            currentQuestion
        };
    }
    
    /**
     * 获取当前题目（用于调试）
     */
    getCurrentQuestion() {
        if (this.answeredQuestions.length === 0) {
            return this._selectFirstQuestion();
        }
        return this.irt.selectNextQuestion(
            this.currentAbility,
            this.questions,
            this.answeredQuestions
        );
    }
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdaptiveTestEngine;
}
