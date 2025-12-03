// 苏格拉底对话游戏 - UI 控制器
class UIController {
    constructor() {
        this.storage = new SocraticStorage();
        this.apiClient = new ApiClient();
        this.socraticEngine = new SocraticEngine();
        this.initEventListeners();
    }

    initEventListeners() {
        document.getElementById('testApi').addEventListener('click', () => this.testApiConnection());
        document.getElementById('saveConfig').addEventListener('click', () => this.saveConfiguration());
        document.getElementById('startChat').addEventListener('click', () => this.startChatSession());

        // API提供商切换
        document.getElementById('apiProvider').addEventListener('change', (e) => {
            const customGroup = document.getElementById('customApiUrlGroup');
            if (e.target.value === 'custom') {
                customGroup.style.display = 'block';
            } else {
                customGroup.style.display = 'none';
            }
        });

      }

    async testApiConnection() {
        const apiKey = document.getElementById('apiKey').value;
        const apiProvider = document.getElementById('apiProvider').value;
        const customApiUrl = document.getElementById('customApiUrl').value;

        if (!apiKey) {
            alert('请输入API密钥');
            return;
        }

        const btn = document.getElementById('testApi');
        btn.disabled = true;
        btn.textContent = '测试中...';

        try {
            let endpoint = '';
            if (apiProvider === 'openai') {
                endpoint = 'https://api.openai.com/v1/models';
            } else if (apiProvider === 'claude') {
                endpoint = 'https://api.anthropic.com/v1/messages';
            } else if (apiProvider === 'custom' && customApiUrl) {
                endpoint = customApiUrl;
            }

            const response = await fetch(endpoint, {
                headers: {
                    'Authorization': `Bearer ${apiKey}`
                }
            });

            if (response.ok) {
                this.showStatus('API连接成功', 'success');
            } else {
                this.showStatus('API连接失败', 'error');
            }
        } catch (error) {
            this.showStatus('API连接失败', 'error');
        } finally {
            btn.disabled = false;
            btn.textContent = '测试连接';
        }
    }

    saveConfiguration() {
        const config = {
            apiKey: document.getElementById('apiKey').value,
            apiProvider: document.getElementById('apiProvider').value,
            customApiUrl: document.getElementById('customApiUrl').value,
            gradeLevel: document.getElementById('gradeLevel').value,
            mathTopic: document.getElementById('mathTopic').value
        };

        if (this.storage.saveConfig(config)) {
            this.showStatus('配置已保存', 'success');
        } else {
            this.showStatus('配置保存失败', 'error');
        }
    }

    startChatSession() {
        const config = this.storage.loadConfig();
        if (!config.apiKey) {
            alert('请先配置API密钥');
            return;
        }

        // 切换到聊天界面
        document.getElementById('configSection').style.display = 'none';
        document.getElementById('chatSection').style.display = 'block';

        // 初始化聊天
        this.socraticEngine.startSession(config);
        this.showWelcomeMessage();
    }

    showWelcomeMessage() {
        const welcomeMessages = [
            { role: 'assistant', content: '你好！我是苏格拉底数学助教。我不会直接给你答案，而是通过提问来帮助你思考。' },
            { role: 'assistant', content: '你遇到了什么数学问题？试着用你自己的话来描述，我会引导你找到思路。' }
        ];

        welcomeMessages.forEach(msg => this.displayMessage(msg));
    }

    displayMessage(message) {
        const chatContainer = document.getElementById('chatContainer');
        const messageElement = document.createElement('div');
        messageElement.className = `message ${message.role}`;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = message.role === 'user' ? '你' : '苏';

        const content = document.createElement('div');
        content.className = 'message-content';
        content.innerHTML = this.formatMessage(message.content);

        messageElement.appendChild(avatar);
        messageElement.appendChild(content);
        chatContainer.appendChild(messageElement);

        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    formatMessage(content) {
        // 简单的Markdown支持
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>');
    }

    showStatus(message, type = 'info') {
        const statusEl = document.getElementById('statusText');
        statusEl.textContent = message;
        statusEl.className = `status-text status-${type}`;

        setTimeout(() => {
            statusEl.textContent = '';
            statusEl.className = 'status-text';
        }, 3000);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    window.uiController = new UIController();

    // 加载保存的配置
    const config = new SocraticStorage().loadConfig();
    if (config.apiKey) {
        document.getElementById('apiKey').value = config.apiKey;
        document.getElementById('apiProvider').value = config.apiProvider;
        document.getElementById('customApiUrl').value = config.customApiUrl;
        document.getElementById('gradeLevel').value = config.gradeLevel;
        document.getElementById('mathTopic').value = config.mathTopic;
    }
});