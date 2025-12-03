// 苏格拉底对话游戏 - API客户端类
class ApiClient {
    constructor() {
        this.config = null;
        this.controller = null;
        this.isSupported = false;
    }

    // 设置配置
    setConfig(config) {
        this.config = config;
        this.isSupported = true;
    }

    // 检查API可用性
    async checkApiAvailability() {
        if (!this.config || !this.config.apiKey) {
            return { success: false, error: '未配置API密钥' };
        }

        try {
            let endpoint = '';
            let headers = {};
            let testMessage = '你好，请简单回复确认连接';

            if (this.config.apiProvider === 'glm') {
                // 智谱AI GLM API
                endpoint = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';
                headers = {
                    'Authorization': `Bearer ${this.config.apiKey}`,
                    'Content-Type': 'application/json'
                };
            } else {
                // 使用现有的测试逻辑
                const response = await this.makeRequest('你好，请简单回复确认连接', 'system-check');
                return response.success ?
                    { success: true, provider: this.config.apiProvider } :
                    { success: false, error: response.error || '连接失败' };
            }

            // 智谱AI的测试请求
            const testBody = {
                model: 'glm-4.6',
                messages: [
                    { role: 'user', content: testMessage }
                ],
                temperature: 0.7,
                max_tokens: 50
            };

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(testBody)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error?.message || `HTTP ${response.status}`);
            }

            const data = await response.json();
            if (data.choices && data.choices[0]?.message?.content) {
                return { success: true, provider: this.config.apiProvider };
            } else {
                return { success: false, error: '智谱API响应格式错误' };
            }

        } catch (error) {
            console.error('API连接检查失败:', error);
            return { success: false, error: error.message };
        }
    }

    // 生成苏格拉底式提示
    generateSocraticPrompt(userMessage, conversationHistory, gradeLevel, mathTopic) {
        let systemPrompt = `你是苏格拉底数学助教，专门启发初中生（${gradeLevel}年级）的数学思维。

核心原则：
1. 从不直接给出答案，而是通过提问引导学生思考
2. 用简单易懂的语言，适合初中生理解
3. 鼓励学生探索不同的解题方法
4. 适时给予正面的鼓励和肯定
5. 当学生思路正确时，给予提示引导到下一步
6. 帮助学生发现并纠正自己的错误

对话风格：
- 温和耐心，像一位经验丰富的数学老师
- 用"你觉得呢？"、"为什么会这样？"、"能解释一下你的想法吗？"等引导性问题
- 分解复杂问题为简单的步骤
- 使用类比和生活中的例子帮助理解

当前年级：${gradeLevel}年级
当前主题：${mathTopic || '不限主题'}

请用中文回复，语气友好但专业。记住，思考过程比答案更重要。`;

        // 构建对话历史
        const messages = [
            { role: 'system', content: systemPrompt }
        ];

        // 添加最近的对话历史（限制数量以避免token过多）
        const recentHistory = conversationHistory.slice(-6); // 最近3轮对话
        for (const msg of recentHistory) {
            if (msg.role === 'user' || msg.role === 'assistant') {
                messages.push({
                    role: msg.role === 'user' ? 'user' : 'assistant',
                    content: msg.content
                });
            }
        }

        // 添加当前用户消息
        messages.push({ role: 'user', content: userMessage });

        return messages;
    }

    // 发送聊天请求
    async sendMessage(userMessage, conversationHistory, gradeLevel, mathTopic, onProgress) {
        if (!this.isSupported) {
            return { success: false, error: 'API未配置' };
        }

        try {
            // 生成苏格拉底式提示
            const messages = this.generateSocraticPrompt(
                userMessage,
                conversationHistory,
                gradeLevel,
                mathTopic
            );

            // 创建控制器以支持中断
            this.controller = new AbortController();

            // 发送请求
            const response = await this.makeRequestStream(messages, onProgress);

            return response;
        } catch (error) {
            if (error.name === 'AbortError') {
                return { success: false, error: '请求已取消' };
            }
            return { success: false, error: error.message };
        } finally {
            this.controller = null;
        }
    }

    // 中断当前请求
    abortRequest() {
        if (this.controller) {
            this.controller.abort();
            this.controller = null;
        }
    }

    // 发送请求（基础版本）
    async makeRequest(messages, mode = 'chat') {
        try {
            const provider = this.config.apiProvider;
            let url, headers, body;

            if (provider === 'openai') {
                url = 'https://api.openai.com/v1/chat/completions';
                headers = {
                    'Authorization': `Bearer ${this.config.apiKey}`,
                    'Content-Type': 'application/json'
                };
                body = {
                    model: 'gpt-3.5-turbo',
                    messages: messages,
                    temperature: 0.7,
                    max_tokens: 1000,
                    stream: false
                };
            } else if (provider === 'claude') {
                url = 'https://api.anthropic.com/v1/messages';
                headers = {
                    'x-api-key': this.config.apiKey,
                    'Content-Type': 'application/json',
                    'anthropic-version': '2023-06-01'
                };
                body = {
                    model: 'claude-3-haiku-20240307',
                    messages: messages,
                    max_tokens: 1000,
                    temperature: 0.7
                };
            } else if (provider === 'glm') {
                // 智谱AI GLM-4.6
                url = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';
                headers = {
                    'Authorization': `Bearer ${this.config.apiKey}`,
                    'Content-Type': 'application/json'
                };
                body = {
                    model: 'glm-4.6',
                    messages: messages,
                    temperature: 0.7,
                    max_tokens: 1000,
                    stream: false
                };
            } else if (provider === 'custom') {
                if (!this.config.customApiUrl) {
                    return { success: false, error: '自定义API端点未配置' };
                }
                url = this.config.customApiUrl;
                headers = {
                    'Authorization': `Bearer ${this.config.apiKey}`,
                    'Content-Type': 'application/json'
                };
                body = {
                    messages: messages,
                    temperature: 0.7,
                    max_tokens: 1000
                };
            } else {
                return { success: false, error: '不支持的API提供商' };
            }

            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body),
                signal: this.controller?.signal
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error?.message || `HTTP ${response.status}`);
            }

            const data = await response.json();

            // 解析不同API的响应格式
            let content = '';
            if (provider === 'openai') {
                content = data.choices?.[0]?.message?.content || '';
            } else if (provider === 'claude') {
                content = data.content?.[0]?.text || '';
            } else if (provider === 'custom') {
                content = data.choices?.[0]?.message?.content || data.content || '';
            }

            if (!content) {
                return { success: false, error: 'API返回空内容' };
            }

            return { success: true, content: content.trim() };

        } catch (error) {
            console.error('API请求失败:', error);
            return { success: false, error: error.message };
        }
    }

    // 发送流式请求（如果支持）
    async makeRequestStream(messages, onProgress) {
        const provider = this.config.apiProvider;

        // 目前OpenAI和智谱支持流式响应
        if (provider !== 'openai' && provider !== 'glm') {
            // 对于不支持流式的API，使用普通请求并模拟进度
            onProgress('正在思考中...');
            const response = await this.makeRequest(messages);

            if (response.success) {
                onProgress(response.content);
            }

            return response;
        }

        try {
            let endpoint, headers, streamBody;

            if (this.config.apiProvider === 'glm') {
                // 智谱GLM流式请求
                endpoint = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';
                headers = {
                    'Authorization': `Bearer ${this.config.apiKey}`,
                    'Content-Type': 'application/json'
                };
                streamBody = {
                    model: 'glm-4.6',
                    messages: messages,
                    temperature: 0.7,
                    max_tokens: 1000,
                    stream: true
                };
            } else {
                // OpenAI流式请求
                endpoint = 'https://api.openai.com/v1/chat/completions';
                headers = {
                    'Authorization': `Bearer ${this.config.apiKey}`,
                    'Content-Type': 'application/json'
                };
                streamBody = {
                    model: 'gpt-3.5-turbo',
                    messages: messages,
                    temperature: 0.7,
                    max_tokens: 1000,
                    stream: true
                };
            }

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(streamBody),
                signal: this.controller?.signal
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error?.message || `HTTP ${response.status}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let content = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split('\n');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6);
                        if (data === '[DONE]') continue;

                        try {
                            const parsed = JSON.parse(data);
                            let delta;

                            if (this.config.apiProvider === 'glm') {
                                // 智谱API格式
                                delta = parsed.choices?.[0]?.delta;
                            } else {
                                // OpenAI API格式
                                delta = parsed.choices?.[0]?.delta;
                            }

                            if (delta?.content) {
                                content += delta.content;
                                onProgress(content);
                            }
                        } catch (e) {
                            // 忽略解析错误
                        }
                    }
                }
            }

            return { success: true, content: content.trim() };

        } catch (error) {
            if (error.name === 'AbortError') {
                throw error;
            }
            console.error('流式请求失败:', error);

            // 流式失败，回退到普通请求
            onProgress('正在重试...');
            return await this.makeRequest(messages);
        }
    }

    // 获取支持的功能
    getSupportedFeatures() {
        const features = {
            streaming: this.config.apiProvider === 'openai',
            markdown: true,
            mathFormulas: true,
            codeFormatting: true
        };

        return features;
    }
}

// 导出API客户端
window.ApiClient = ApiClient;