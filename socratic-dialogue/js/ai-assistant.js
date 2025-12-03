// AI 辅助苏格拉底提问引擎
class AIAssistant {
    constructor() {
        this.apiClient = new ApiClient();
        this.storage = new SocraticStorage();
        this.conversationHistory = [];
        this.studentProfile = {
            gradeLevel: '7',
            mathTopic: '',
            learningSpeed: 'medium',
            preferredStyle: 'visual', // visual, analytical, collaborative
            currentDifficulty: 'medium',
            masteredConcepts: [],
            strugglingConcepts: [],
            strengths: [],
            weaknesses: []
        };

        // 苏格拉底提问模板
        this.socraticTemplates = {
            'clarification': [
                '你能用自己的话解释一下{concept}吗？',
                '为什么{concept}很重要？',
                '{concept}在日常生活中有什么应用？'
            ],
            'probing_assumptions': [
                '你为什么认为{assumption}？',
                '有没有反例与{assumption}不符？',
                '如果改变{variable}，{assumption}还成立吗？'
            ],
            'evidence': [
                '你能给我举个例子来说明{statement}吗？',
                '怎样才能证明{statement}是对的？',
                '你是从哪里得出{statement}这个结论的？'
            ],
            'alternative': [
                '有没有其他方法来解决这个问题？',
                '你觉得{alternative}这种方法怎么样？',
                '比较一下{method1}和{method2}的优缺点'
            ],
            'consequence': [
                '如果{condition}成立，会导致什么后果？',
                '这个结论对后续的步骤有什么影响？',
                '你能推断出什么新的结论吗？'
            ],
            'metacognition': [
                '回顾一下，你是怎么解决这个问题的？',
                '下次遇到类似的问题，你会怎么办？',
                '对比之前的方法，这次有什么改进？'
            ]
        };

        // AI 提问生成提示词模板
        this.questionGenerationPrompt = `你是一位资深的数学教育专家，专门设计苏格拉底式提问来启发初中生的数学思维。

学生信息：
- 年级：{gradeLevel}年级
- 当前主题：{mathTopic}
- 学习水平：{studentLevel}
- 学习风格：{learningStyle}

学生的回答或陈述：
{studentStatement}

请生成3-5个循序渐进的苏格拉底式提问，用来：
1. 帮助学生深化理解
2. 引导学生发现错误（如果有）
3. 激发更深层的思考
4. 连接已知和未知的概念

要求：
- 每个问题都要用"你"开头，直接和学生交流
- 问题应该是开放式的，而非是/否问题
- 逐步增加思考的深度
- 避免给出答案或提示
- 使用学生能理解的语言
- 如果可能，结合生活中的例子

请用JSON格式返回：
{
    "questions": [
        {
            "question": "第一个提问",
            "type": "clarification|probing|evidence|alternative|consequence|metacognition",
            "purpose": "这个问题的目的",
            "difficulty": 1-5
        }
    ],
    "analysis": {
        "understanding": "学生的理解程度分析",
        "misconceptions": "发现的常见误区",
        "strengths": "学生表现出的优势",
        "nextStep": "建议的下一步学习方向"
    }
}`;

        // 学习分析提示词
        this.analysisPrompt = `分析以下对话中学生的学习情况，并提供个性化的建议。

对话历史：
{conversationHistory}

学生年级：{gradeLevel}
主题：{mathTopic}

请从以下方面分析：
1. 学生对该概念的理解程度
2. 学生的思维方式和学习特点
3. 需要加强的薄弱环节
4. 推荐的学习资源或练习

返回JSON格式：
{
    "comprehensionLevel": "基础|初级|中级|高级",
    "thinkingPatterns": ["模式1", "模式2"],
    "weakPoints": ["薄弱点1", "薄弱点2"],
    "recommendations": ["建议1", "建议2"],
    "nextTopics": ["推荐主题1", "推荐主题2"]
}`;
    }

    // 初始化助手
    async initialize(config) {
        try {
            this.apiClient.setConfig(config);
            this.studentProfile.gradeLevel = config.gradeLevel || '7';
            this.studentProfile.mathTopic = config.mathTopic || '';
            console.log('AI助手初始化成功');
            return { success: true };
        } catch (error) {
            console.error('AI助手初始化失败:', error);
            return { success: false, error: error.message };
        }
    }

    // 生成AI苏格拉底问题
    async generateSocraticQuestions(studentStatement, conversationContext = null) {
        try {
            // 构建提示词
            let prompt = this.questionGenerationPrompt
                .replace('{gradeLevel}', this.studentProfile.gradeLevel)
                .replace('{mathTopic}', this.studentProfile.mathTopic || '无特定主题')
                .replace('{studentLevel}', this.studentProfile.currentDifficulty)
                .replace('{learningStyle}', this.studentProfile.preferredStyle)
                .replace('{studentStatement}', studentStatement);

            // 调用API生成问题
            const messages = [
                {
                    role: 'system',
                    content: '你是一位资深的数学教育专家，擅长设计启发性的提问。'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ];

            const response = await this.apiClient.sendMessage(
                prompt,
                messages,
                this.studentProfile.gradeLevel,
                this.studentProfile.mathTopic,
                () => {} // 不需要进度回调
            );

            if (!response.success) {
                return { success: false, error: response.error };
            }

            // 解析JSON响应
            try {
                const jsonMatch = response.content.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    const result = JSON.parse(jsonMatch[0]);
                    return { success: true, data: result };
                }
            } catch (e) {
                console.warn('无法解析JSON响应，返回原始内容');
            }

            // 如果无法解析JSON，返回原始内容
            return {
                success: true,
                data: {
                    questions: this.parseQuestionsFromText(response.content),
                    analysis: { understanding: response.content }
                }
            };

        } catch (error) {
            console.error('生成问题失败:', error);
            return { success: false, error: error.message };
        }
    }

    // 从文本中解析问题
    parseQuestionsFromText(text) {
        const questions = [];
        const lines = text.split('\n');
        let i = 0;

        for (const line of lines) {
            // 查找问题（以？结尾的句子）
            if (line.trim().endsWith('？') || line.trim().endsWith('?')) {
                questions.push({
                    question: line.trim(),
                    type: 'probing',
                    purpose: '启发思考',
                    difficulty: Math.min(5, Math.floor(questions.length) + 1)
                });

                if (questions.length >= 5) break;
            }
        }

        return questions;
    }

    // 实时分析学生回答
    async analyzeStudentResponse(studentResponse, expectedConcepts = []) {
        try {
            const prompt = `分析学生的以下回答，评估他们对数学概念的理解。

学生回答：
"${studentResponse}"

预期理解的概念：${expectedConcepts.join(', ')}
学生年级：${this.studentProfile.gradeLevel}

请评估：
1. 回答的正确性（百分比）
2. 理解深度（表面理解 vs 深层理解）
3. 识别的常见误区
4. 建议的跟进问题

返回JSON格式：
{
    "correctness": 85,
    "comprehensionDepth": "中层理解",
    "misconceptions": ["误区1", "误区2"],
    "followUpQuestions": ["跟进问题1", "跟进问题2"],
    "feedback": "具体反馈"
}`;

            const messages = [
                { role: 'user', content: prompt }
            ];

            const response = await this.apiClient.sendMessage(
                prompt,
                messages,
                this.studentProfile.gradeLevel,
                this.studentProfile.mathTopic,
                () => {}
            );

            if (response.success) {
                try {
                    const jsonMatch = response.content.match(/\{[\s\S]*\}/);
                    if (jsonMatch) {
                        return { success: true, data: JSON.parse(jsonMatch[0]) };
                    }
                } catch (e) {
                    console.warn('无法解析分析结果');
                }
            }

            return { success: true, data: { feedback: response.content } };

        } catch (error) {
            console.error('分析回答失败:', error);
            return { success: false, error: error.message };
        }
    }

    // 生成个性化学习路径
    async generateLearningPath(currentConcept) {
        try {
            const prompt = `基于学生当前学习的概念"${currentConcept}"，为${this.studentProfile.gradeLevel}年级学生生成一个个性化的学习路径。

学习特点：
- 学习风格：${this.studentProfile.preferredStyle}
- 当前难度：${this.studentProfile.currentDifficulty}
- 已掌握的概念：${this.studentProfile.masteredConcepts.join(', ') || '无'}
- 困难的概念：${this.studentProfile.strugglingConcepts.join(', ') || '无'}

请提供：
1. 前置概念（需要复习的内容）
2. 核心学习步骤
3. 关键概念的直观解释
4. 实际应用示例
5. 常见的错误和陷阱

返回JSON格式：
{
    "prerequisites": ["概念1", "概念2"],
    "learningSteps": [
        {
            "step": 1,
            "title": "标题",
            "description": "描述",
            "keyPoints": ["要点1", "要点2"],
            "visualAid": "建议的可视化方式"
        }
    ],
    "commonMistakes": ["错误1", "错误2"],
    "realWorldApplications": ["应用1", "应用2"]
}`;

            const messages = [
                { role: 'user', content: prompt }
            ];

            const response = await this.apiClient.sendMessage(
                prompt,
                messages,
                this.studentProfile.gradeLevel,
                this.studentProfile.mathTopic,
                () => {}
            );

            if (response.success) {
                try {
                    const jsonMatch = response.content.match(/\{[\s\S]*\}/);
                    if (jsonMatch) {
                        return { success: true, data: JSON.parse(jsonMatch[0]) };
                    }
                } catch (e) {
                    console.warn('无法解析学习路径');
                }
            }

            return { success: true, data: { steps: response.content } };

        } catch (error) {
            console.error('生成学习路径失败:', error);
            return { success: false, error: error.message };
        }
    }

    // 生成复习计划
    async generateReviewPlan(conceptsToReview = []) {
        try {
            const prompt = `为${this.studentProfile.gradeLevel}年级学生生成一个有效的复习计划。

需要复习的概念：${conceptsToReview.join(', ')}
学生的学习风格：${this.studentProfile.preferredStyle}

请设计一个5步的复习计划，包括：
1. 概念回顾
2. 原理理解
3. 变式练习
4. 应用拓展
5. 自我检测

返回JSON格式：
{
    "reviewPlan": [
        {
            "phase": "阶段名称",
            "duration": "10分钟",
            "activities": ["活动1", "活动2"],
            "expectedOutcome": "预期成果"
        }
    ],
    "reviewQuestions": ["问题1", "问题2"],
    "estimatedTime": "总耗时"
}`;

            const messages = [
                { role: 'user', content: prompt }
            ];

            const response = await this.apiClient.sendMessage(
                prompt,
                messages,
                this.studentProfile.gradeLevel,
                this.studentProfile.mathTopic,
                () => {}
            );

            if (response.success) {
                try {
                    const jsonMatch = response.content.match(/\{[\s\S]*\}/);
                    if (jsonMatch) {
                        return { success: true, data: JSON.parse(jsonMatch[0]) };
                    }
                } catch (e) {
                    console.warn('无法解析复习计划');
                }
            }

            return { success: true, data: { plan: response.content } };

        } catch (error) {
            console.error('生成复习计划失败:', error);
            return { success: false, error: error.message };
        }
    }

    // 更新学生档案
    updateStudentProfile(updates) {
        this.studentProfile = {
            ...this.studentProfile,
            ...updates
        };
        // 保存到本地存储
        localStorage.setItem(
            'student-profile',
            JSON.stringify(this.studentProfile)
        );
    }

    // 加载学生档案
    loadStudentProfile() {
        const saved = localStorage.getItem('student-profile');
        if (saved) {
            this.studentProfile = JSON.parse(saved);
        }
        return this.studentProfile;
    }

    // 获取当前学生水平
    assessStudentLevel(correctAnswers, totalQuestions) {
        const correctRate = correctAnswers / totalQuestions;

        if (correctRate >= 0.9) {
            return 'advanced';
        } else if (correctRate >= 0.7) {
            return 'intermediate';
        } else if (correctRate >= 0.5) {
            return 'beginner';
        } else {
            return 'struggling';
        }
    }

    // 推荐下一个学习主题
    async recommendNextTopic(currentTopic) {
        try {
            const prompt = `基于学生刚学完的"${currentTopic}"主题，推荐最合适的下一个学习主题。

学生年级：${this.studentProfile.gradeLevel}
已掌握的概念：${this.studentProfile.masteredConcepts.join(', ')}
困难的概念：${this.studentProfile.strugglingConcepts.join(', ')}

请考虑：
1. 学习的逻辑进度
2. 学生的当前水平
3. 知识的关联性
4. 学生的学习兴趣

返回JSON格式：
{
    "recommendedTopic": "推荐主题",
    "reasoning": "推荐原因",
    "difficulty": "简单|中等|困难",
    "prerequisites": ["前置条件"],
    "estimatedLearningTime": "预计学习时间"
}`;

            const messages = [
                { role: 'user', content: prompt }
            ];

            const response = await this.apiClient.sendMessage(
                prompt,
                messages,
                this.studentProfile.gradeLevel,
                this.studentProfile.mathTopic,
                () => {}
            );

            if (response.success) {
                try {
                    const jsonMatch = response.content.match(/\{[\s\S]*\}/);
                    if (jsonMatch) {
                        return { success: true, data: JSON.parse(jsonMatch[0]) };
                    }
                } catch (e) {
                    console.warn('无法解析主题推荐');
                }
            }

            return { success: true, data: { recommendation: response.content } };

        } catch (error) {
            console.error('推荐主题失败:', error);
            return { success: false, error: error.message };
        }
    }

    // 生成学习报告
    async generateLearningReport(sessionData) {
        try {
            const prompt = `根据以下学习会话数据，生成一份详细的学习报告。

会话数据：
${JSON.stringify(sessionData, null, 2)}

请生成包含以下内容的报告：
1. 本次学习的成果总结
2. 学生的优势和需要改进的地方
3. 建议的后续学习方向
4. 鼓励性的反馈

返回JSON格式：
{
    "summary": "总结",
    "achievements": ["成就1", "成就2"],
    "areasForImprovement": ["改进点1", "改进点2"],
    "recommendations": ["建议1", "建议2"],
    "encouragement": "鼓励性反馈"
}`;

            const messages = [
                { role: 'user', content: prompt }
            ];

            const response = await this.apiClient.sendMessage(
                prompt,
                messages,
                this.studentProfile.gradeLevel,
                this.studentProfile.mathTopic,
                () => {}
            );

            if (response.success) {
                try {
                    const jsonMatch = response.content.match(/\{[\s\S]*\}/);
                    if (jsonMatch) {
                        return { success: true, data: JSON.parse(jsonMatch[0]) };
                    }
                } catch (e) {
                    console.warn('无法解析学习报告');
                }
            }

            return { success: true, data: { report: response.content } };

        } catch (error) {
            console.error('生成学习报告失败:', error);
            return { success: false, error: error.message };
        }
    }
}

// 导出AI助手
window.AIAssistant = AIAssistant;
