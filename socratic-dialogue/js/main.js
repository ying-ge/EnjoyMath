// 苏格拉底对话游戏 - 主控制器
class SocraticDialogueGame {
    constructor() {
        this.storage = new SocraticStorage();
        this.apiClient = new ApiClient();
        this.socraticEngine = new SocraticEngine();
        this.aiAssistant = new AIAssistant();  // 新增AI助手
        this.isInChat = false;
        this.currentConfig = null;

        this.init();
    }

    async init() {
        try {
            // 初始化各个组件
            await this.socraticEngine.initialize();

            // 加载保存的配置
            this.loadSavedConfig();

            // 绑定事件监听器
            this.bindEventListeners();

            // 设置自动保存
            this.setupAutoSave();

            console.log('苏格拉底对话游戏初始化成功');
        } catch (error) {
            console.error('初始化失败:', error);
            this.showError('游戏初始化失败，请刷新页面重试');
        }
    }

    // 加载保存的配置
    loadSavedConfig() {
        const savedConfig = this.storage.loadConfig();

        if (savedConfig) {
            document.getElementById('apiKey').value = savedConfig.apiKey || '';
            document.getElementById('apiProvider').value = savedConfig.apiProvider || 'openai';
            document.getElementById('customApiUrl').value = savedConfig.customApiUrl || '';
            document.getElementById('gradeLevel').value = savedConfig.gradeLevel || '7';
            document.getElementById('mathTopic').value = savedConfig.mathTopic || '';

            // 显示自定义API端点
            this.toggleCustomApiField(savedConfig.apiProvider === 'custom');
        }
    }

    // 绑定事件监听器
    bindEventListeners() {
        // 配置相关
        document.getElementById('testApi').addEventListener('click', () => this.testApiConnection());
        document.getElementById('saveConfig').addEventListener('click', () => this.saveConfiguration());
        document.getElementById('startChat').addEventListener('click', () => this.startChat());

        // API提供商切换
        document.getElementById('apiProvider').addEventListener('change', (e) => {
            this.toggleCustomApiField(e.target.value === 'custom');
        });

        // 消息输入
        const messageInput = document.getElementById('messageInput');
        messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // 发送按钮
        document.getElementById('sendBtn').addEventListener('click', () => this.sendMessage());

        // 重置配置
        document.addEventListener('resetConfig', () => {
            this.resetConfiguration();
        });

        // 导出数据
        document.addEventListener('exportData', () => {
            this.exportData();
        });

        // 页面卸载时保存
        window.addEventListener('beforeunload', () => {
            this.saveCurrentState();
        });

        // 页面可见性变化
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && this.isInChat) {
                this.saveCurrentState();
            }
        });
    }

    // 切换自定义API字段显示
    toggleCustomApiField(show) {
        const customApiGroup = document.getElementById('customApiUrlGroup');
        customApiGroup.style.display = show ? 'block' : 'none';
    }

    // 测试API连接
    async testApiConnection() {
        const config = this.getFormData();

        if (!config.apiKey) {
            this.showError('请先输入API密钥');
            return;
        }

        const testBtn = document.getElementById('testApi');
        const originalText = testBtn.innerHTML;

        try {
            testBtn.disabled = true;
            testBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 测试中...';

            this.apiClient.setConfig(config);
            const result = await this.apiClient.checkApiAvailability();

            if (result.success) {
                this.showSuccess(`API连接成功！使用${result.provider}服务`);
            } else {
                this.showError(`API连接失败：${result.error}`);
            }
        } catch (error) {
            this.showError(`连接测试失败：${error.message}`);
        } finally {
            testBtn.disabled = false;
            testBtn.innerHTML = originalText;
        }
    }

    // 保存配置
    saveConfiguration() {
        const config = this.getFormData();

        if (!config.apiKey) {
            this.showError('请输入API密钥');
            return;
        }

        if (this.storage.saveConfig(config)) {
            this.showSuccess('配置已保存');
            this.apiClient.setConfig(config);
            this.currentConfig = config;
        } else {
            this.showError('配置保存失败');
        }
    }

    // 开始聊天
    async startChat() {
        const config = this.getFormData();

        if (!config.apiKey) {
            this.showError('请先配置API密钥');
            return;
        }

        try {
            // 保存配置
            this.saveConfiguration();

            // 初始化AI助手
            const aiInitResult = await this.aiAssistant.initialize(config);
            if (!aiInitResult.success) {
                this.showError('AI助手初始化失败');
                return;
            }

            // 初始化聊天会话
            this.socraticEngine.startSession(config);

            // 切换界面
            this.showChatInterface();

            // 加载聊天历史
            this.loadChatHistory();

            this.isInChat = true;

            // 聚焦输入框
            document.getElementById('messageInput').focus();

        } catch (error) {
            this.showError(`启动聊天失败：${error.message}`);
        }
    }

    // 发送消息
    async sendMessage() {
        const input = document.getElementById('messageInput');
        const message = input.value.trim();

        if (!message) {
            return;
        }

        const sendBtn = document.getElementById('sendBtn');
        const originalHtml = sendBtn.innerHTML;

        try {
            // 禁用输入
            input.disabled = true;
            sendBtn.disabled = true;
            sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

            // 显示用户消息
            this.displayMessage({ role: 'user', content: message });
            input.value = '';

            // 更新状态
            this.updateChatStatus('思考中...', 'connecting');

            // 发送到引擎
            const response = await this.socraticEngine.sendMessage(
                message,
                this.currentConfig,
                (progress) => {
                    this.showTypingIndicator(progress);
                }
            );

            // 移除输入指示器
            this.hideTypingIndicator();

            if (response.success) {
                // 显示助手回复
                this.displayMessage({ role: 'assistant', content: response.content });

                // 使用AI生成额外的苏格拉底问题
                this.generateAISocraticQuestions(message, response.content);

                // 显示后续问题建议
                if (response.followUpQuestions && response.followUpQuestions.length > 0) {
                    this.showFollowUpQuestions(response.followUpQuestions);
                }

                this.updateChatStatus('已连接', 'connected');
            } else {
                this.showError(`发送消息失败：${response.error}`);
                this.updateChatStatus('连接异常', 'disconnected');
            }

        } catch (error) {
            this.hideTypingIndicator();
            this.showError(`发送消息失败：${error.message}`);
            this.updateChatStatus('连接异常', 'disconnected');
        } finally {
            // 恢复输入
            input.disabled = false;
            sendBtn.disabled = false;
            sendBtn.innerHTML = originalHtml;
            input.focus();
        }
    }

    // 生成AI苏格拉底问题
    async generateAISocraticQuestions(userStatement, assistantResponse) {
        try {
            // 异步生成问题，不阻塞主流程
            const result = await this.aiAssistant.generateSocraticQuestions(
                userStatement
            );

            if (result.success && result.data && result.data.questions) {
                const questions = result.data.questions.slice(0, 3); // 取前3个问题
                this.showAIGeneratedQuestions(questions);
            }
        } catch (error) {
            console.warn('生成AI问题失败:', error);
            // 静默失败，不影响主流程
        }
    }

    // 显示AI生成的问题
    showAIGeneratedQuestions(questions) {
        if (!questions || questions.length === 0) return;

        const chatContainer = document.getElementById('chatContainer');
        const suggestionElement = document.createElement('div');
        suggestionElement.className = 'message assistant';

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar socratic';
        avatar.textContent = '🤖';

        const content = document.createElement('div');
        content.className = 'message-content';

        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        
        let questionsHtml = '<strong>💭 深入思考一下：</strong><ul style="margin: 8px 0; padding-left: 20px;">';
        for (const q of questions) {
            questionsHtml += `<li>${q.question || q}</li>`;
        }
        questionsHtml += '</ul>';
        
        bubble.innerHTML = questionsHtml;

        content.appendChild(bubble);
        suggestionElement.appendChild(avatar);
        suggestionElement.appendChild(content);

        chatContainer.appendChild(suggestionElement);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // 显示消息
    displayMessage(message) {
        const chatContainer = document.getElementById('chatContainer');
        const messageElement = document.createElement('div');
        messageElement.className = `message ${message.role}`;

        const avatar = document.createElement('div');
        avatar.className = `message-avatar ${message.role}`;
        avatar.textContent = message.role === 'user' ? '你' : '苏';

        const content = document.createElement('div');
        content.className = 'message-content';

        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        bubble.innerHTML = this.formatMessage(message.content);

        const time = document.createElement('div');
        time.className = 'message-time';
        time.textContent = this.formatTime(message.timestamp || new Date());

        content.appendChild(bubble);
        content.appendChild(time);
        messageElement.appendChild(avatar);
        messageElement.appendChild(content);

        chatContainer.appendChild(messageElement);
        chatContainer.scrollTop = chatContainer.scrollHeight;

        // 保存消息
        this.storage.saveChatMessage(message);
    }

    // 格式化消息
    formatMessage(content) {
        return content
            // 数学公式标记
            .replace(/\$\$([^$]+)\$\$/g, '<div class="math-formula">$1</div>')
            // 代码块
            .replace(/```([\\s\\S]*?)```/g, '<pre><code>$1</code></pre>')
            // 内联代码
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            // 粗体
            .replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>')
            // 斜体
            .replace(/\\*(.*?)\\*/g, '<em>$1</em>')
            // 提示标记
            .replace(/💡/g, '<span class="hint">💡</span>');
    }

    // 格式化时间
    formatTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;

        if (diff < 60000) {
            return '刚刚';
        } else if (diff < 3600000) {
            return `${Math.floor(diff / 60000)}分钟前`;
        } else if (diff < 86400000) {
            return `${Math.floor(diff / 3600000)}小时前`;
        } else {
            return date.toLocaleDateString('zh-CN') + ' ' + date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
        }
    }

    // 显示输入指示器
    showTypingIndicator(text = '正在思考') {
        this.hideTypingIndicator();

        const chatContainer = document.getElementById('chatContainer');
        const typingElement = document.createElement('div');
        typingElement.className = 'message assistant typing-message';
        typingElement.id = 'typingIndicator';

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar socratic';
        avatar.textContent = '苏';

        const content = document.createElement('div');
        content.className = 'message-content';

        const bubble = document.createElement('div');
        bubble.className = 'typing-indicator';
        bubble.innerHTML = '<span></span><span></span><span></span>';

        content.appendChild(bubble);
        typingElement.appendChild(avatar);
        typingElement.appendChild(content);

        chatContainer.appendChild(typingElement);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // 隐藏输入指示器
    hideTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }

    // 显示后续问题建议
    showFollowUpQuestions(questions) {
        const chatContainer = document.getElementById('chatContainer');
        const suggestionElement = document.createElement('div');
        suggestionElement.className = 'message assistant';

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar socratic';
        avatar.textContent = '苏';

        const content = document.createElement('div');
        content.className = 'message-content';

        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        bubble.innerHTML = `
            <strong>💭 你可能想问：</strong>
            <ul style="margin: 8px 0; padding-left: 20px;">
                ${questions.map(q => `<li>${q}</li>`).join('')}
            </ul>
        `;

        content.appendChild(bubble);
        suggestionElement.appendChild(avatar);
        suggestionElement.appendChild(content);

        chatContainer.appendChild(suggestionElement);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // 更新聊天状态
    updateChatStatus(text, status) {
        const statusText = document.getElementById('statusText');
        const statusIndicator = document.getElementById('statusIndicator');

        statusText.textContent = text;
        statusIndicator.className = `status-indicator ${status}`;
    }

    // 显示聊天界面
    showChatInterface() {
        document.getElementById('configSection').style.display = 'none';
        document.getElementById('chatSection').style.display = 'block';
    }

    // 重置配置
    resetConfiguration() {
        if (confirm('确定要重置所有配置吗？')) {
            this.storage.clearConfig();
            this.storage.clearChatHistory();
            location.reload();
        }
    }

    // 导出数据
    exportData() {
        if (this.storage.exportData()) {
            this.showSuccess('数据导出成功');
        } else {
            this.showError('数据导出失败');
        }
    }

    // 加载聊天历史
    loadChatHistory() {
        const history = this.storage.getChatHistory();
        history.forEach(message => {
            this.displayMessage(message);
        });
    }

    // 自动调整输入框高度
    setupAutoSave() {
        const messageInput = document.getElementById('messageInput');

        messageInput.addEventListener('input', () => {
            messageInput.style.height = 'auto';
            messageInput.style.height = Math.min(messageInput.scrollHeight, 120) + 'px';
        });
    }

    // 保存当前状态
    saveCurrentState() {
        // 这里可以保存当前的聊天状态
        // 比如当前正在输入的消息等
    }

    // 获取表单数据
    getFormData() {
        return {
            apiKey: document.getElementById('apiKey').value.trim(),
            apiProvider: document.getElementById('apiProvider').value,
            customApiUrl: document.getElementById('customApiUrl').value.trim(),
            gradeLevel: document.getElementById('gradeLevel').value,
            mathTopic: document.getElementById('mathTopic').value
        };
    }

    // 显示成功消息
    showSuccess(message) {
        this.showToast(message, 'success');
    }

    // 显示错误消息
    showError(message) {
        this.showToast(message, 'error');
    }

    // 显示提示消息
    showToast(message, type = 'info') {
        // 移除现有的toast
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;

        // 添加样式
        Object.assign(toast.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 20px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '9999',
            opacity: '0',
            transform: 'translateY(-20px)',
            transition: 'all 0.3s ease'
        });

        // 根据类型设置背景色
        const colors = {
            success: '#48bb78',
            error: '#f56565',
            info: '#667eea',
            warning: '#ed8936'
        };

        toast.style.backgroundColor = colors[type] || colors.info;

        document.body.appendChild(toast);

        // 显示动画
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        }, 100);

        // 自动移除
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(-20px)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // 显示欢迎消息
    showWelcomeMessage() {
        const welcomeMessage = {
            role: 'assistant',
            content: `你好！我是苏格拉底数学助教。

我不会直接给你答案，而是通过提问来引导你思考。让我们一起探索数学的奥秘吧！

你可以：
• 提出你遇到的数学问题
• 告诉我你正在学习的概念
• 分享你的解题思路

记住：思考的过程比答案更重要！`,
            timestamp: new Date()
        };

        this.displayMessage(welcomeMessage);
    }
}

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    window.socraticDialogueGame = new SocraticDialogueGame();
});