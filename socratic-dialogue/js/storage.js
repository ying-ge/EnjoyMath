// 苏格拉底对话游戏 - 存储管理类
class SocraticStorage {
    constructor() {
        this.storageKey = 'socratic-dialogue-config';
        this.chatKey = 'socratic-dialogue-history';
        this.maxHistoryItems = 100;
    }

    // 保存API配置
    saveConfig(config) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(config));
            return true;
        } catch (error) {
            console.error('保存配置失败:', error);
            return false;
        }
    }

    // 加载API配置
    loadConfig() {
        try {
            const configStr = localStorage.getItem(this.storageKey);
            if (configStr) {
                return JSON.parse(configStr);
            }
        } catch (error) {
            console.error('加载配置失败:', error);
        }

        // 返回默认配置
        return {
            apiKey: '',
            apiProvider: 'openai',
            customApiUrl: '',
            gradeLevel: '7',
            mathTopic: ''
        };
    }

    // 清除配置
    clearConfig() {
        try {
            localStorage.removeItem(this.storageKey);
            return true;
        } catch (error) {
            console.error('清除配置失败:', error);
            return false;
        }
    }

    // 保存聊天记录
    saveChatMessage(message) {
        try {
            const history = this.getChatHistory();
            history.push({
                ...message,
                timestamp: new Date().toISOString()
            });

            // 限制历史记录数量
            if (history.length > this.maxHistoryItems) {
                history.splice(0, history.length - this.maxHistoryItems);
            }

            localStorage.setItem(this.chatKey, JSON.stringify(history));
            return true;
        } catch (error) {
            console.error('保存聊天记录失败:', error);
            return false;
        }
    }

    // 获取聊天记录
    getChatHistory() {
        try {
            const historyStr = localStorage.getItem(this.chatKey);
            if (historyStr) {
                return JSON.parse(historyStr);
            }
        } catch (error) {
            console.error('加载聊天记录失败:', error);
        }

        return [];
    }

    // 清除聊天记录
    clearChatHistory() {
        try {
            localStorage.removeItem(this.chatKey);
            return true;
        } catch (error) {
            console.error('清除聊天记录失败:', error);
            return false;
        }
    }

    // 导出配置和聊天记录
    exportData() {
        try {
            const data = {
                config: this.loadConfig(),
                chatHistory: this.getChatHistory(),
                exportDate: new Date().toISOString()
            };

            const blob = new Blob([JSON.stringify(data, null, 2)], {
                type: 'application/json'
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `socratic-dialogue-backup-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);

            return true;
        } catch (error) {
            console.error('导出数据失败:', error);
            return false;
        }
    }

    // 导入配置和聊天记录
    importData(file) {
        return new Promise((resolve, reject) => {
            try {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const data = JSON.parse(e.target.result);

                        // 导入配置
                        if (data.config) {
                            this.saveConfig(data.config);
                        }

                        // 导入聊天记录
                        if (data.chatHistory) {
                            const history = data.chatHistory.slice(-this.maxHistoryItems);
                            localStorage.setItem(this.chatKey, JSON.stringify(history));
                        }

                        resolve(data);
                    } catch (parseError) {
                        reject(new Error('文件格式错误'));
                    }
                };

                reader.onerror = () => {
                    reject(new Error('文件读取失败'));
                };

                reader.readAsText(file);
            } catch (error) {
                reject(error);
            }
        });
    }

    // 获取存储统计信息
    getStorageStats() {
        try {
            const config = this.loadConfig();
            const history = this.getChatHistory();

            return {
                hasConfig: !!config.apiKey,
                configSize: JSON.stringify(config).length,
                chatHistorySize: history.length,
                lastMessage: history.length > 0 ? history[history.length - 1].timestamp : null,
                storageUsage: JSON.stringify(localStorage).length
            };
        } catch (error) {
            console.error('获取统计信息失败:', error);
            return null;
        }
    }
}

// 导出存储类
window.SocraticStorage = SocraticStorage;