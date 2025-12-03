// 数学冲刺挑战游戏主入口文件
// 负责初始化游戏、全局函数绑定和页面交互

// 全局游戏实例
let gameEngine = null;

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeGame();
    bindGlobalFunctions();
    updateHighScores();
});

// 初始化游戏
function initializeGame() {
    try {
        // 确保所有依赖类都已加载
        if (typeof GameEngine === 'undefined') {
            console.error('GameEngine 类未加载');
            return;
        }

        if (typeof QuestionManager === 'undefined') {
            console.error('QuestionManager 类未加载');
            return;
        }

        if (typeof GameStorage === 'undefined') {
            console.error('GameStorage 类未加载');
            return;
        }

        gameEngine = new GameEngine();

        // 初始化学期选择界面
        if (gameEngine && typeof gameEngine.displaySemesters === 'function') {
            console.log('正在初始化学期选择...');
            gameEngine.displaySemesters();
            console.log('学期选择初始化完成');
        } else {
            console.error('displaySemesters 方法不存在');
        }
    } catch (error) {
        console.error('游戏初始化失败:', error);
        // 不显示弹窗，只在控制台记录
    }

    // 添加页面可见性变化监听
    document.addEventListener('visibilitychange', function() {
        if (document.hidden && gameEngine && !gameEngine.isGameOver && !gameEngine.isPaused) {
            gameEngine.pauseGame();
        }
    });

    // 添加窗口失焦监听
    window.addEventListener('blur', function() {
        if (gameEngine && !gameEngine.isGameOver && !gameEngine.isPaused) {
            gameEngine.pauseGame();
        }
    });

    console.log('记忆风暴游戏已初始化');
}

// 绑定全局函数
function bindGlobalFunctions() {
    // 游戏控制函数
    window.startGame = function(mode, knowledgePoint = null) {
        if (gameEngine) {
            gameEngine.startGame(mode, knowledgePoint);
        }
    };
    
    window.pauseGame = function() {
        if (gameEngine) {
            gameEngine.pauseGame();
        }
    };
    
    window.resumeGame = function() {
        if (gameEngine) {
            gameEngine.resumeGame();
        }
    };
    
    window.restartGame = function() {
        if (gameEngine) {
            gameEngine.restartGame();
        }
    };
    
    window.playAgain = function() {
        if (gameEngine) {
            gameEngine.playAgain();
        }
    };
    
    window.backToMenu = function() {
        if (gameEngine) {
            gameEngine.backToMenu();
        }
        updateHighScores();
    };
    
  
    // 学期选择函数
    window.selectSemester = function(semester) {
        if (gameEngine) {
            gameEngine.selectSemester(semester);
        }
    };

    window.clearSemester = function() {
        if (gameEngine) {
            gameEngine.clearSemester();
        }
    };
    
    // 工具函数
    window.exportGameData = function() {
        const storage = new GameStorage();
        const data = storage.exportData();
        
        // 创建下载链接
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `math-rush-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };
    
    window.clearGameData = function() {
        if (confirm('确定要清除所有游戏数据吗？此操作不可恢复！')) {
            const storage = new GameStorage();
            storage.clearAllData();
            updateHighScores();
            alert('游戏数据已清除');
        }
    };
    
    window.toggleSound = function() {
        // 可以在这里添加音效开关逻辑
        alert('音效开关功能开发中...');
    };
}

// 更新高分显示
function updateHighScores() {
    try {
        // 确保GameStorage类已加载
        if (typeof GameStorage === 'undefined') {
            console.warn('GameStorage 类未加载，跳过高分更新');
            return;
        }

        const storage = new GameStorage();
        const highScoresContainer = document.getElementById('highScores');

        if (!highScoresContainer) return;

        const overallLeaderboard = storage.getOverallLeaderboard();
    
    if (overallLeaderboard.length === 0) {
        highScoresContainer.innerHTML = '<p class="text-gray-400">暂无记录</p>';
        return;
    }
    
    let html = '';
    overallLeaderboard.slice(0, 5).forEach((score, index) => {
        const date = new Date(score.date);
        const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
        const modeText = getModeText(score.gameMode);
        
        html += `
            <div class="high-score-item flex justify-between items-center p-3 rounded-lg">
                <div class="flex items-center">
                    <span class="text-2xl mr-3">${getMedalEmoji(index)}</span>
                    <div>
                        <div class="font-bold text-yellow-400">${score.score} 分</div>
                        <div class="text-sm text-gray-400">${modeText} - ${dateStr}</div>
                    </div>
                </div>
                ${score.knowledgePoint ? `<div class="text-xs bg-gray-700 px-2 py-1 rounded">${score.knowledgePoint}</div>` : ''}
            </div>
        `;
    });
    
    highScoresContainer.innerHTML = html;
}

// 获取模式文本
function getModeText(mode) {
    const modeTexts = {
        'speed': '极限挑战',
        'memory': '记忆风暴',
        'race': '知识竞速',
        'knowledge': '专题突破'
    };
    return modeTexts[mode] || mode;
}

// 获取奖牌emoji
function getMedalEmoji(index) {
    const medals = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];
    return medals[index] || `${index + 1}`;
}

// 添加键盘快捷键提示
document.addEventListener('DOMContentLoaded', function() {
    // 创建快捷键提示
    const shortcuts = document.createElement('div');
    shortcuts.className = 'fixed bottom-4 left-4 text-xs text-gray-500 bg-gray-900 bg-opacity-50 p-2 rounded';
    shortcuts.innerHTML = `
        <div class="font-semibold mb-1">快捷键：</div>
        <div>1-4: 选择答案</div>
        <div>空格: 暂停/继续</div>
    `;
    document.body.appendChild(shortcuts);
    
    // 5秒后淡出
    setTimeout(() => {
        shortcuts.style.transition = 'opacity 1s';
        shortcuts.style.opacity = '0';
        setTimeout(() => {
            if (shortcuts.parentNode) {
                shortcuts.parentNode.removeChild(shortcuts);
            }
        }, 1000);
    }, 5000);
});

// 添加页面加载动画
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 错误处理 - 仅记录严重错误，避免频繁弹出小窗口
window.addEventListener('error', function(event) {
    console.error('游戏发生错误:', event.error);

    // 只在严重错误时显示提示，避免频繁弹出
    if (event.error && event.error.name === 'TypeError' && event.error.message.includes('Cannot read propert')) {
        // 静默处理常见的属性读取错误
        return;
    }

    // 检查是否已经有错误提示显示，避免重复
    const existingError = document.querySelector('.game-error-popup');
    if (existingError) {
        return;
    }

    // 只显示一次错误提示
    const errorDiv = document.createElement('div');
    errorDiv.className = 'game-error-popup fixed top-4 right-4 bg-yellow-600 text-white p-3 rounded-lg z-50 max-w-sm';
    errorDiv.innerHTML = `
        <div class="flex items-center">
            <span class="text-xl mr-2">⚠️</span>
            <div>
                <h3 class="font-bold text-sm">游戏提醒</h3>
                <p class="text-xs">如遇问题请刷新页面</p>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">×</button>
        </div>
    `;
    document.body.appendChild(errorDiv);

    // 5秒后自动移除
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 5000);
});

// 性能监控
let performanceTimer = null;
function startPerformanceMonitoring() {
    performanceTimer = setInterval(() => {
        if (performance && performance.memory) {
            const memoryInfo = performance.memory;
            const memoryUsage = (memoryInfo.usedJSHeapSize / 1024 / 1024).toFixed(2);
            
            // 如果内存使用过高，可以采取一些优化措施
            if (memoryUsage > 100) {
                console.warn(`内存使用较高: ${memoryUsage}MB`);
                // 可以在这里添加清理逻辑
            }
        }
    }, 30000); // 每30秒检查一次
}

// 启动性能监控
startPerformanceMonitoring();

// 添加触摸设备支持
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // 为移动设备添加触摸反馈
    document.addEventListener('touchstart', function(e) {
        const target = e.target.closest('button');
        if (target) {
            target.style.transform = 'scale(0.95)';
        }
    });
    
    document.addEventListener('touchend', function(e) {
        const target = e.target.closest('button');
        if (target) {
            setTimeout(() => {
                target.style.transform = '';
            }, 100);
        }
    });
}

// 添加深色模式支持（如果系统支持）
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-mode');
}

// 监听深色模式变化
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (e.matches) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    });
}

// 添加分享功能
window.shareGame = function() {
    const shareData = {
        title: '数学冲刺挑战',
        text: '在紧张刺激的环境中记忆和理解数学概念！',
        url: window.location.href
    };
    
    if (navigator.share) {
        navigator.share(shareData).catch(err => {
            console.log('分享失败:', err);
        });
    } else {
        // 复制链接到剪贴板
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert('游戏链接已复制到剪贴板！');
        }).catch(() => {
            alert('分享功能不可用');
        });
    }
};

// 添加全屏功能
window.toggleFullscreen = function() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log('全屏请求失败:', err);
        });
    } else {
        document.exitFullscreen();
    }
};

// 导出全局函数供调试使用
window.debugGame = {
    getGameState: () => gameEngine ? {
        score: gameEngine.score,
        combo: gameEngine.combo,
        questionCount: gameEngine.questionCount,
        correctCount: gameEngine.correctCount,
        timeLeft: gameEngine.timeLeft,
        difficulty: gameEngine.difficulty,
        gameMode: gameEngine.gameMode
    } : null,

    addScore: (points) => {
        if (gameEngine) {
            gameEngine.score += points;
            gameEngine.updateDisplay();
        }
    },

    skipQuestion: () => {
        if (gameEngine && !gameEngine.isGameOver && !gameEngine.isPaused) {
            gameEngine.loadNextQuestion();
        }
    },

    endTime: () => {
        if (gameEngine) {
            gameEngine.endGame();
        }
    },

    // 调试学期选择功能
    initSemesters: () => {
        if (gameEngine && gameEngine.displaySemesters) {
            console.log('手动调用学期选择初始化...');
            gameEngine.displaySemesters();
            console.log('学期选择初始化完成');
        } else {
            console.error('gameEngine 或 displaySemesters 不存在');
        }
    },

    // 显示学期选择容器信息
    checkSemesterContainer: () => {
        const container = document.getElementById('semesterSelection');
        console.log('学期选择容器:', container);
        console.log('容器内容:', container ? container.innerHTML : '容器不存在');
        console.log('容器子元素:', container ? container.children.length : 0);
        return container;
    },

    // 手动创建学期按钮
    createSemesterButtons: () => {
        console.log('手动创建学期按钮...');

        const container = document.getElementById('semesterSelection');
        if (!container) {
            console.error('找不到学期选择容器');
            return;
        }

        // 清空容器
        container.innerHTML = '';

        // 简单的学期数据
        const semesters = [
            { key: '七年级上', display: '七年级上学期' },
            { key: '七年级下', display: '七年级下学期' },
            { key: '八年级上', display: '八年级上学期' },
            { key: '八年级下', display: '八年级下学期' },
            { key: '九年级上', display: '九年级上学期' },
            { key: '九年级下', display: '九年级下学期' }
        ];

        semesters.forEach((semester, index) => {
            const button = document.createElement('button');
            button.className = 'semester-button p-3 sm:p-4 rounded-lg text-white font-semibold transition-all duration-200 text-sm sm:text-base';
            button.style.backgroundColor = '#8b5cf6';
            button.style.borderColor = '#8b5cf6';
            button.style.color = 'white';
            button.style.border = '2px solid #8b5cf6';
            button.style.marginBottom = '8px';
            button.style.cursor = 'pointer';

            button.innerHTML = `
                <div class="font-bold text-sm sm:text-base">${semester.display}</div>
                <div class="text-xs sm:text-sm opacity-75 mt-1">包含该学期及之前内容</div>
            `;

            button.onclick = () => {
                console.log('点击学期:', semester.key);
                alert(`选择了${semester.display}`);
            };

            container.appendChild(button);
            console.log(`创建按钮 ${index + 1}: ${semester.display}`);
        });

        console.log(`共创建了 ${semesters.length} 个学期按钮`);
        return container;
    },

    // 检查游戏引擎状态
    checkGameEngine: () => {
        console.log('游戏引擎状态:', gameEngine);
        console.log('QuestionManager:', gameEngine ? gameEngine.questionManager : '不存在');
        console.log('可用学期:', gameEngine && gameEngine.questionManager ? gameEngine.questionManager.getSemesters() : '未知');
    }
};

console.log('记忆风暴游戏主模块加载完成');
