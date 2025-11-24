/**
 * 本地存储管理
 * 使用 localStorage 保存测试会话和结果
 */

class TestStorage {
    constructor() {
        this.prefix = 'enjoymath_';
    }

    /**
     * 生成唯一会话ID
     */
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * 保存测试会话
     */
    saveSession(sessionId, sessionData) {
        const key = this.prefix + 'session_' + sessionId;
        try {
            localStorage.setItem(key, JSON.stringify({
                ...sessionData,
                updatedAt: new Date().toISOString()
            }));
            return true;
        } catch (e) {
            console.error('保存会话失败:', e);
            return false;
        }
    }

    /**
     * 加载测试会话
     */
    loadSession(sessionId) {
        const key = this.prefix + 'session_' + sessionId;
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('加载会话失败:', e);
            return null;
        }
    }

    /**
     * 保存测试结果
     */
    saveResult(sessionId, result) {
        const key = this.prefix + 'result_' + sessionId;
        try {
            localStorage.setItem(key, JSON.stringify({
                ...result,
                savedAt: new Date().toISOString()
            }));
            
            // 同时保存到历史记录
            this.addToHistory(sessionId, result);
            return true;
        } catch (e) {
            console.error('保存结果失败:', e);
            return false;
        }
    }

    /**
     * 加载测试结果
     */
    loadResult(sessionId) {
        const key = this.prefix + 'result_' + sessionId;
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('加载结果失败:', e);
            return null;
        }
    }

    /**
     * 添加到历史记录
     */
    addToHistory(sessionId, result) {
        const key = this.prefix + 'history';
        try {
            let history = this.getHistory();
            history.unshift({
                sessionId,
                ability: result.ability,
                totalQuestions: result.totalQuestions,
                correctRate: result.correctRate,
                timestamp: new Date().toISOString()
            });
            
            // 只保留最近50条记录
            if (history.length > 50) {
                history = history.slice(0, 50);
            }
            
            localStorage.setItem(key, JSON.stringify(history));
        } catch (e) {
            console.error('保存历史记录失败:', e);
        }
    }

    /**
     * 获取历史记录
     */
    getHistory() {
        const key = this.prefix + 'history';
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            return [];
        }
    }

    /**
     * 清除会话数据
     */
    clearSession(sessionId) {
        const sessionKey = this.prefix + 'session_' + sessionId;
        const resultKey = this.prefix + 'result_' + sessionId;
        localStorage.removeItem(sessionKey);
        localStorage.removeItem(resultKey);
    }

    /**
     * 清除所有数据
     */
    clearAll() {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith(this.prefix)) {
                localStorage.removeItem(key);
            }
        });
    }
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TestStorage;
}

