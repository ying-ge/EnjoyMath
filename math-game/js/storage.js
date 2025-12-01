// 游戏存储管理器
// 负责本地存储、高分记录、统计数据等功能

class GameStorage {
    constructor() {
        this.storageKey = 'mathRushGame';
        this.highScoresKey = 'mathRushHighScores';
        this.achievementsKey = 'mathRushAchievements';
        this.statsKey = 'mathRushStats';
        
        this.initializeStorage();
    }
    
    // 初始化存储
    initializeStorage() {
        if (!localStorage.getItem(this.highScoresKey)) {
            localStorage.setItem(this.highScoresKey, JSON.stringify({
                speed: [],
                memory: [],
                race: [],
                knowledge: {}
            }));
        }
        
        if (!localStorage.getItem(this.achievementsKey)) {
            localStorage.setItem(this.achievementsKey, JSON.stringify([]));
        }
        
        if (!localStorage.getItem(this.statsKey)) {
            localStorage.setItem(this.statsKey, JSON.stringify({
                totalGames: 0,
                totalScore: 0,
                totalCorrect: 0,
                totalQuestions: 0,
                bestCombo: 0,
                totalTime: 0,
                knowledgePointStats: {}
            }));
        }
    }
    
    // 保存高分
    saveHighScore(score, gameMode, knowledgePoint = null) {
        const highScores = this.getHighScores();
        const isNewRecord = this.checkNewRecord(score, gameMode, knowledgePoint);
        
        const scoreEntry = {
            score: score,
            gameMode: gameMode,
            knowledgePoint: knowledgePoint,
            date: new Date().toISOString(),
            accuracy: 0, // 需要从游戏引擎获取
            combo: 0, // 需要从游戏引擎获取
            questions: 0 // 需要从游戏引擎获取
        };
        
        if (knowledgePoint) {
            // 专题模式的高分
            if (!highScores.knowledge[knowledgePoint]) {
                highScores.knowledge[knowledgePoint] = [];
            }
            highScores.knowledge[knowledgePoint].push(scoreEntry);
            highScores.knowledge[knowledgePoint].sort((a, b) => b.score - a.score);
            highScores.knowledge[knowledgePoint] = highScores.knowledge[knowledgePoint].slice(0, 10);
        } else {
            // 普通模式的高分
            if (!highScores[gameMode]) {
                highScores[gameMode] = [];
            }
            highScores[gameMode].push(scoreEntry);
            highScores[gameMode].sort((a, b) => b.score - a.score);
            highScores[gameMode] = highScores[gameMode].slice(0, 10);
        }
        
        localStorage.setItem(this.highScoresKey, JSON.stringify(highScores));
        return isNewRecord;
    }
    
    // 检查是否为新纪录
    checkNewRecord(score, gameMode, knowledgePoint = null) {
        const highScores = this.getHighScores();
        
        if (knowledgePoint) {
            if (!highScores.knowledge[knowledgePoint] || highScores.knowledge[knowledgePoint].length === 0) {
                return true;
            }
            return score > highScores.knowledge[knowledgePoint][0].score;
        } else {
            if (!highScores[gameMode] || highScores[gameMode].length === 0) {
                return true;
            }
            return score > highScores[gameMode][0].score;
        }
    }
    
    // 获取高分记录
    getHighScores(gameMode = null, knowledgePoint = null) {
        const highScores = JSON.parse(localStorage.getItem(this.highScoresKey) || '{}');
        
        if (gameMode && knowledgePoint) {
            return highScores.knowledge?.[knowledgePoint] || [];
        } else if (gameMode) {
            return highScores[gameMode] || [];
        } else {
            return highScores;
        }
    }
    
    // 获取最高分
    getHighestScore(gameMode, knowledgePoint = null) {
        const scores = this.getHighScores(gameMode, knowledgePoint);
        return scores.length > 0 ? scores[0].score : 0;
    }
    
    // 更新统计数据
    updateStats(gameData) {
        const stats = this.getStats();
        
        stats.totalGames++;
        stats.totalScore += gameData.score || 0;
        stats.totalCorrect += gameData.correctCount || 0;
        stats.totalQuestions += gameData.questionCount || 0;
        stats.bestCombo = Math.max(stats.bestCombo, gameData.maxCombo || 0);
        stats.totalTime += (gameData.totalTime || 0);
        
        // 更新知识点统计
        if (gameData.knowledgePoint) {
            if (!stats.knowledgePointStats[gameData.knowledgePoint]) {
                stats.knowledgePointStats[gameData.knowledgePoint] = {
                    games: 0,
                    score: 0,
                    correct: 0,
                    questions: 0
                };
            }
            
            const kpStats = stats.knowledgePointStats[gameData.knowledgePoint];
            kpStats.games++;
            kpStats.score += gameData.score || 0;
            kpStats.correct += gameData.correctCount || 0;
            kpStats.questions += gameData.questionCount || 0;
        }
        
        localStorage.setItem(this.statsKey, JSON.stringify(stats));
        
        // 检查成就
        this.checkAchievements(gameData, stats);
    }
    
    // 获取统计数据
    getStats() {
        return JSON.parse(localStorage.getItem(this.statsKey) || '{}');
    }
    
    // 检查成就
    checkAchievements(gameData, stats) {
        const achievements = this.getAchievements();
        const newAchievements = [];
        
        // 首次游戏成就
        if (stats.totalGames === 1 && !achievements.find(a => a.id === 'first_game')) {
            newAchievements.push({
                id: 'first_game',
                name: '初学者',
                description: '完成第一次游戏',
                icon: '🎮',
                unlockedAt: new Date().toISOString()
            });
        }
        
        // 得分成就
        if (gameData.score >= 100 && !achievements.find(a => a.id === 'score_100')) {
            newAchievements.push({
                id: 'score_100',
                name: '百分达人',
                description: '单局得分超过100分',
                icon: '💯',
                unlockedAt: new Date().toISOString()
            });
        }
        
        if (gameData.score >= 500 && !achievements.find(a => a.id === 'score_500')) {
            newAchievements.push({
                id: 'score_500',
                name: '数学高手',
                description: '单局得分超过500分',
                icon: '🏆',
                unlockedAt: new Date().toISOString()
            });
        }
        
        // 连击成就
        if (gameData.maxCombo >= 10 && !achievements.find(a => a.id === 'combo_10')) {
            newAchievements.push({
                id: 'combo_10',
                name: '连击大师',
                description: '达到10连击',
                icon: '🔥',
                unlockedAt: new Date().toISOString()
            });
        }
        
        // 正确率成就
        const accuracy = gameData.questionCount > 0 ? (gameData.correctCount / gameData.questionCount) * 100 : 0;
        if (accuracy >= 90 && gameData.questionCount >= 10 && !achievements.find(a => a.id === 'accuracy_90')) {
            newAchievements.push({
                id: 'accuracy_90',
                name: '精准射手',
                description: '10题以上正确率达到90%',
                icon: '🎯',
                unlockedAt: new Date().toISOString()
            });
        }
        
        // 游戏次数成就
        if (stats.totalGames >= 10 && !achievements.find(a => a.id === 'games_10')) {
            newAchievements.push({
                id: 'games_10',
                name: '坚持不懈',
                description: '完成10次游戏',
                icon: '⭐',
                unlockedAt: new Date().toISOString()
            });
        }
        
        if (stats.totalGames >= 50 && !achievements.find(a => a.id === 'games_50')) {
            newAchievements.push({
                id: 'games_50',
                name: '数学达人',
                description: '完成50次游戏',
                icon: '🌟',
                unlockedAt: new Date().toISOString()
            });
        }
        
        // 保存新成就
        if (newAchievements.length > 0) {
            achievements.push(...newAchievements);
            localStorage.setItem(this.achievementsKey, JSON.stringify(achievements));
            
            // 显示成就解锁通知
            newAchievements.forEach(achievement => {
                this.showAchievementNotification(achievement);
            });
        }
    }
    
    // 获取成就列表
    getAchievements() {
        return JSON.parse(localStorage.getItem(this.achievementsKey) || '[]');
    }
    
    // 显示成就解锁通知
    showAchievementNotification(achievement) {
        // 创建成就通知元素
        const notification = document.createElement('div');
        notification.className = 'achievement-popup';
        notification.innerHTML = `
            <div class="flex items-center">
                <span class="text-2xl mr-3">${achievement.icon}</span>
                <div>
                    <div class="font-bold">🎉 成就解锁！</div>
                    <div>${achievement.name}</div>
                    <div class="text-sm opacity-75">${achievement.description}</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // 3秒后自动移除
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }
    
    // 清除所有数据
    clearAllData() {
        localStorage.removeItem(this.highScoresKey);
        localStorage.removeItem(this.achievementsKey);
        localStorage.removeItem(this.statsKey);
        this.initializeStorage();
    }
    
    // 导出数据
    exportData() {
        const data = {
            highScores: this.getHighScores(),
            achievements: this.getAchievements(),
            stats: this.getStats(),
            exportDate: new Date().toISOString()
        };
        
        return JSON.stringify(data, null, 2);
    }
    
    // 导入数据
    importData(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            
            if (data.highScores) {
                localStorage.setItem(this.highScoresKey, JSON.stringify(data.highScores));
            }
            
            if (data.achievements) {
                localStorage.setItem(this.achievementsKey, JSON.stringify(data.achievements));
            }
            
            if (data.stats) {
                localStorage.setItem(this.statsKey, JSON.stringify(data.stats));
            }
            
            return true;
        } catch (error) {
            console.error('导入数据失败:', error);
            return false;
        }
    }
    
    // 获取知识点排行榜
    getKnowledgePointLeaderboard(knowledgePoint) {
        return this.getHighScores('knowledge', knowledgePoint);
    }
    
    // 获取总体排行榜
    getOverallLeaderboard() {
        const allScores = [];
        const highScores = this.getHighScores();
        
        // 收集所有模式的高分
        ['speed', 'memory', 'race'].forEach(mode => {
            if (highScores[mode]) {
                highScores[mode].forEach(score => {
                    allScores.push({ ...score, mode });
                });
            }
        });
        
        // 收集所有专题的高分
        Object.keys(highScores.knowledge || {}).forEach(kp => {
            highScores.knowledge[kp].forEach(score => {
                allScores.push({ ...score, knowledgePoint: kp });
            });
        });
        
        // 按分数排序
        allScores.sort((a, b) => b.score - a.score);
        
        return allScores.slice(0, 20);
    }
}

// 导出
window.GameStorage = GameStorage;
