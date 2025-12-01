// 数学冲刺挑战游戏引擎
// 负责游戏逻辑、状态管理和核心功能

class GameEngine {
    constructor() {
        this.gameMode = null;
        this.score = 0;
        this.combo = 0;
        this.maxCombo = 0;
        this.questionCount = 0;
        this.correctCount = 0;
        this.timeLeft = 60;
        this.difficulty = 1;
        this.isPaused = false;
        this.isGameOver = false;
        this.currentQuestion = null;
        this.questionStartTime = null;
        this.timer = null;
        this.knowledgePoint = null;
        
        this.questionManager = new QuestionManager();
        this.storage = new GameStorage();
        this.effects = new GameEffects();
        
        this.initializeEventListeners();
    }
    
    // 初始化事件监听器
    initializeEventListeners() {
        // 键盘快捷键
        document.addEventListener('keydown', (e) => {
            if (this.isGameOver || this.isPaused) return;

            // A, B, C, D键选择答案
            const keyMap = { 'a': 0, 'b': 1, 'c': 2, 'd': 3, 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
            if (keyMap.hasOwnProperty(e.key)) {
                this.selectAnswer(keyMap[e.key]);
            }

            // 保留数字键1-4作为备用选择方式
            if (e.key >= '1' && e.key <= '4') {
                const optionIndex = parseInt(e.key) - 1;
                this.selectAnswer(optionIndex);
            }

            // 空格键暂停
            if (e.key === ' ') {
                e.preventDefault();
                this.pauseGame();
            }
        });
    }
    
    // 开始游戏
    startGame(mode, knowledgePoint = null) {
        this.gameMode = mode;
        this.knowledgePoint = knowledgePoint;
        this.resetGameState();
        
        // 切换界面
        this.showScreen('gameScreen');
        
        // 根据游戏模式设置时间
        switch (mode) {
            case 'speed':
                this.timeLeft = 60;
                break;
            case 'memory':
                this.timeLeft = 90;
                break;
            case 'race':
                this.timeLeft = 120;
                break;
            case 'knowledge':
                this.timeLeft = 90;
                break;
        }
        
        // 加载第一题
        this.loadNextQuestion();
        
        // 开始计时
        this.startTimer();
        
        // 播放开始音效
        this.effects.playSound('start');
    }
    
    // 重置游戏状态
    resetGameState() {
        this.score = 0;
        this.combo = 0;
        this.maxCombo = 0;
        this.questionCount = 0;
        this.correctCount = 0;
        this.difficulty = 1;
        this.isPaused = false;
        this.isGameOver = false;
        this.currentQuestion = null;
        this.questionStartTime = null;
        
        this.questionManager.reset();
        this.updateDisplay();
    }
    
    // 加载下一题
    loadNextQuestion() {
        if (this.isGameOver || this.isPaused) return;
        
        let question;
        
        switch (this.gameMode) {
            case 'speed':
                question = this.questionManager.getQuestionByDifficulty(this.score, this.combo);
                break;
            case 'memory':
                question = this.questionManager.getMemoryQuestion();
                break;
            case 'race':
                // 竞速模式：随机不同知识点
                const knowledgePoints = this.questionManager.getKnowledgePoints();
                const randomKP = knowledgePoints[Math.floor(Math.random() * knowledgePoints.length)];
                question = this.questionManager.getRandomQuestion(randomKP);
                break;
            case 'knowledge':
                question = this.questionManager.getRandomQuestion(this.knowledgePoint);
                break;
            default:
                question = this.questionManager.getRandomQuestion();
        }
        
        this.currentQuestion = question;
        this.questionStartTime = Date.now();
        this.questionCount++;
        
        this.displayQuestion();
        this.updateDisplay();
    }
    
    // 显示题目
    displayQuestion() {
        const questionContent = document.getElementById('questionContent');
        const optionsContainer = document.getElementById('optionsContainer');
        const questionCategory = document.getElementById('questionCategory');
        const questionNumber = document.getElementById('questionNumber');

        // 显示题目内容
        questionContent.textContent = this.currentQuestion.content;

        // 显示知识点
        const kpInfo = this.questionManager.getKnowledgePointInfo(this.currentQuestion.knowledge_point);
        questionCategory.textContent = kpInfo.category + ' - ' + this.currentQuestion.knowledge_point;
        questionCategory.style.backgroundColor = kpInfo.color;

        // 显示题目编号
        questionNumber.textContent = `第 ${this.questionCount} 题`;

        // 清空选项容器
        optionsContainer.innerHTML = '';

        // 重新排列选项顺序
        const shuffledData = this.shuffleOptions(this.currentQuestion.options, this.currentQuestion.correct);

        // 生成选项按钮
        const optionLabels = ['A', 'B', 'C', 'D'];
        shuffledData.shuffledOptions.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-button bg-gray-700 bg-opacity-50 text-white p-4 rounded-lg text-lg font-semibold hover:bg-opacity-70 transition-all duration-200 border-2 border-gray-600';
            button.textContent = `${optionLabels[index]}. ${option}`;
            button.onclick = () => this.selectAnswer(index);

            // 添加键盘提示 (A=1, B=2, C=3, D=4)
            button.setAttribute('data-key', optionLabels[index]);

            optionsContainer.appendChild(button);
        });

        // 更新当前题目的正确答案索引
        this.currentQuestion.correct = shuffledData.newCorrectIndex;

        // 隐藏反馈
        this.hideFeedback();
    }

    // 重新排列选项顺序并返回新的数据
    shuffleOptions(options, correctIndex) {
        // 创建索引数组 [0, 1, 2, 3]
        const indices = Array.from({length: options.length}, (_, i) => i);

        // Fisher-Yates 洗牌算法
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }

        // 根据洗牌后的索引重新排列选项
        const shuffledOptions = indices.map(index => options[index]);

        // 找到正确答案的新位置
        const newCorrectIndex = indices.indexOf(correctIndex);

        return {
            shuffledOptions: shuffledOptions,
            newCorrectIndex: newCorrectIndex,
            originalOrder: indices
        };
    }
    
    // 选择答案
    selectAnswer(answerIndex) {
        if (!this.currentQuestion || this.isGameOver || this.isPaused) return;
        
        const isCorrect = answerIndex === this.currentQuestion.correct;
        const responseTime = (Date.now() - this.questionStartTime) / 1000;
        
        // 计算得分
        const points = this.calculatePoints(isCorrect, responseTime);
        
        // 更新统计
        if (isCorrect) {
            this.correctCount++;
            this.combo++;
            this.score += points;
            this.maxCombo = Math.max(this.maxCombo, this.combo);
            
            // 连击奖励
            if (this.combo >= 3) {
                const bonusPoints = this.combo * 5;
                this.score += bonusPoints;
                this.showComboEffect(this.combo, bonusPoints);
            }
        } else {
            this.combo = 0;
        }
        
        // 更新难度
        this.updateDifficulty();
        
        // 显示反馈
        this.showFeedback(isCorrect, answerIndex);
        
        // 禁用所有选项
        this.disableAllOptions();
        
        // 延迟后加载下一题
        setTimeout(() => {
            this.loadNextQuestion();
        }, 1500);
        
        // 播放音效
        this.effects.playSound(isCorrect ? 'correct' : 'incorrect');
        
        this.updateDisplay();
    }
    
    // 计算得分
    calculatePoints(isCorrect, responseTime) {
        if (!isCorrect) return 0;
        
        let basePoints = 10;
        
        // 难度加成
        basePoints *= this.currentQuestion.difficulty;
        
        // 时间奖励（快速答题）
        if (responseTime < 3) {
            basePoints += 5;
        } else if (responseTime < 5) {
            basePoints += 2;
        }
        
        // 模式加成
        switch (this.gameMode) {
            case 'speed':
                basePoints *= 1.5;
                break;
            case 'memory':
                basePoints *= 1.3;
                break;
            case 'race':
                basePoints *= 1.2;
                break;
        }
        
        return Math.round(basePoints);
    }
    
    // 更新难度
    updateDifficulty() {
        const oldDifficulty = this.difficulty;
        
        if (this.score >= 100) {
            this.difficulty = 3;
        } else if (this.score >= 50) {
            this.difficulty = 2;
        } else {
            this.difficulty = 1;
        }
        
        // 难度提升时显示效果
        if (this.difficulty > oldDifficulty) {
            this.showDifficultyUpgrade(this.difficulty);
        }
    }
    
    // 显示反馈
    showFeedback(isCorrect, selectedAnswer) {
        const feedback = document.getElementById('feedback');
        const feedbackText = document.getElementById('feedbackText');
        const feedbackIcon = document.getElementById('feedbackIcon');
        const options = document.querySelectorAll('.option-button');
        
        feedback.classList.remove('hidden');
        
        if (isCorrect) {
            feedbackText.textContent = '回答正确！';
            feedbackText.className = 'text-lg text-green-400 font-bold';
            feedbackIcon.textContent = '✅';
            options[selectedAnswer].classList.add('correct');
        } else {
            feedbackText.textContent = `回答错误！正确答案是：${this.currentQuestion.options[this.currentQuestion.correct]}`;
            feedbackText.className = 'text-lg text-red-400 font-bold';
            feedbackIcon.textContent = '❌';
            options[selectedAnswer].classList.add('incorrect');
            options[this.currentQuestion.correct].classList.add('correct');
        }
    }
    
    // 隐藏反馈
    hideFeedback() {
        const feedback = document.getElementById('feedback');
        feedback.classList.add('hidden');
    }
    
    // 禁用所有选项
    disableAllOptions() {
        const options = document.querySelectorAll('.option-button');
        options.forEach(option => {
            option.disabled = true;
            option.style.cursor = 'not-allowed';
        });
    }
    
    // 显示连击效果
    showComboEffect(combo, bonusPoints) {
        this.effects.showComboEffect(combo);
        this.effects.showScorePopup(`+${bonusPoints} 连击奖励！`);
    }
    
    // 显示难度升级效果
    showDifficultyUpgrade(newDifficulty) {
        this.effects.showNotification(`难度提升到 ${newDifficulty} 级！`, 'warning');
    }
    
    // 开始计时器
    startTimer() {
        this.timer = setInterval(() => {
            if (!this.isPaused && !this.isGameOver) {
                this.timeLeft--;
                this.updateTimer();
                
                // 时间警告
                if (this.timeLeft <= 10) {
                    this.showTimeWarning();
                }
                
                // 时间到，游戏结束
                if (this.timeLeft <= 0) {
                    this.endGame();
                }
            }
        }, 1000);
    }
    
    // 更新计时器显示
    updateTimer() {
        const timerElement = document.getElementById('timer');
        timerElement.textContent = this.timeLeft;
        
        // 时间警告样式
        if (this.timeLeft <= 5) {
            timerElement.className = 'text-2xl font-bold text-red-400 ml-2 timer-critical';
        } else if (this.timeLeft <= 10) {
            timerElement.className = 'text-2xl font-bold text-yellow-400 ml-2 timer-warning';
        } else {
            timerElement.className = 'text-2xl font-bold text-cyan-400 ml-2';
        }
    }
    
    // 显示时间警告
    showTimeWarning() {
        if (this.timeLeft === 10) {
            this.effects.showNotification('时间不多了！', 'warning');
        } else if (this.timeLeft === 5) {
            this.effects.showNotification('最后5秒！', 'danger');
        }
    }
    
    // 暂停游戏
    pauseGame() {
        if (this.isGameOver) return;
        
        this.isPaused = true;
        this.showScreen('pauseScreen');
        this.effects.playSound('pause');
    }
    
    // 恢复游戏
    resumeGame() {
        this.isPaused = false;
        this.showScreen('gameScreen');
        this.effects.playSound('resume');
    }
    
    // 重新开始游戏
    restartGame() {
        this.startGame(this.gameMode, this.knowledgePoint);
    }
    
    // 结束游戏
    endGame() {
        this.isGameOver = true;
        clearInterval(this.timer);
        
        // 保存高分
        const isNewRecord = this.storage.saveHighScore(this.score, this.gameMode, this.knowledgePoint);
        
        // 显示结果
        this.showResult(isNewRecord);
        
        // 播放结束音效
        this.effects.playSound('gameover');
    }
    
    // 显示结果
    showResult(isNewRecord) {
        this.showScreen('resultScreen');
        
        // 更新结果显示
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('accuracy').textContent = this.questionCount > 0 ? 
            Math.round((this.correctCount / this.questionCount) * 100) + '%' : '0%';
        document.getElementById('maxCombo').textContent = this.maxCombo;
        document.getElementById('totalQuestions').textContent = this.questionCount;
        
        // 显示新纪录
        if (isNewRecord) {
            document.getElementById('newRecord').classList.remove('hidden');
            this.effects.showParticles();
        } else {
            document.getElementById('newRecord').classList.add('hidden');
        }
    }
    
    // 更新显示
    updateDisplay() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('combo').textContent = this.combo;
        document.getElementById('difficulty').textContent = this.difficulty;
        
        // 更新进度条
        const progress = this.questionCount > 0 ? (this.correctCount / this.questionCount) * 100 : 0;
        document.getElementById('progressBar').style.width = progress + '%';
    }
    
    // 显示界面
    showScreen(screenId) {
        const screens = ['mainMenu', 'gameScreen', 'knowledgePointsScreen', 'pauseScreen', 'resultScreen'];
        screens.forEach(screen => {
            const element = document.getElementById(screen);
            if (screen === screenId) {
                element.classList.remove('hidden');
                element.classList.add('mode-transition');
            } else {
                element.classList.add('hidden');
            }
        });
    }
    
    // 再玩一次
    playAgain() {
        this.startGame(this.gameMode, this.knowledgePoint);
    }
    
    // 返回主菜单
    backToMenu() {
        clearInterval(this.timer);
        this.showScreen('mainMenu');
    }
    
    // 显示知识点选择
    showKnowledgePoints() {
        this.showScreen('knowledgePointsScreen');
        this.displayKnowledgePoints();
    }
    
    // 显示知识点列表
    displayKnowledgePoints() {
        const container = document.getElementById('knowledgePointsGrid');
        container.innerHTML = '';

        const knowledgePoints = this.questionManager.getKnowledgePoints();

        knowledgePoints.forEach(kp => {
            const kpInfo = this.questionManager.getKnowledgePointInfo(kp);
            const button = document.createElement('button');
            button.className = 'knowledge-point-button p-4 rounded-lg text-white font-semibold transition-all duration-200';
            button.style.backgroundColor = kpInfo.color + '20';
            button.style.borderColor = kpInfo.color;
            button.onclick = () => this.startGame('knowledge', kp);

            button.innerHTML = `
                <div class="text-lg font-bold">${kp}</div>
                <div class="text-sm opacity-75">${kpInfo.semester}</div>
                <div class="text-xs opacity-50 mt-1">${kpInfo.description}</div>
            `;

            container.appendChild(button);
        });
    }

    // 显示学期选择
    displaySemesters() {
        const container = document.getElementById('semesterSelection');
        container.innerHTML = '';

        const semesters = this.questionManager.getSemesters();

        semesters.forEach(semester => {
            const semesterInfo = this.questionManager.getSemesterInfo(semester);
            const button = document.createElement('button');
            button.className = 'semester-button p-4 rounded-lg text-white font-semibold transition-all duration-200';
            button.style.backgroundColor = '#8b5cf6';
            button.style.borderColor = '#8b5cf6';
            button.onclick = () => this.selectSemester(semester);

            button.innerHTML = `
                <div class="text-lg font-bold">${semesterInfo.display}</div>
                <div class="text-sm opacity-75">包含该学期及之前内容</div>
            `;

            container.appendChild(button);
        });

        // 添加学期选中状态显示
        if (this.questionManager.currentSemester) {
            this.showCurrentSemester();
        }
    }

    // 选择学期
    selectSemester(semester) {
        this.questionManager.setSemester(semester);
        this.showCurrentSemester();

        // 更新知识点选择界面（如果正在显示）
        if (!document.getElementById('knowledgePointsScreen').classList.contains('hidden')) {
            this.displayKnowledgePoints();
        }

        // 显示选中效果
        this.effects.showNotification(`已选择：${this.questionManager.getSemesterInfo(semester).display}`, 'success');
        this.effects.playSound('select');
    }

    // 清除学期限制
    clearSemester() {
        this.questionManager.setSemester(null);
        this.hideCurrentSemester();

        // 更新知识点选择界面（如果正在显示）
        if (!document.getElementById('knowledgePointsScreen').classList.contains('hidden')) {
            this.displayKnowledgePoints();
        }

        // 显示清除效果
        this.effects.showNotification('已清除学期限制', 'info');
        this.effects.playSound('select');
    }

    // 显示当前选中的学期
    showCurrentSemester() {
        // 移除已存在的显示
        this.hideCurrentSemester();

        if (this.questionManager.currentSemester) {
            const semesterInfo = this.questionManager.getSemesterInfo(this.questionManager.currentSemester);
            const display = document.createElement('div');
            display.id = 'currentSemesterDisplay';
            display.className = 'bg-purple-600 bg-opacity-80 text-white px-4 py-2 rounded-lg text-center mb-4';
            display.innerHTML = `
                <div class="text-sm font-bold">📚 当前学期</div>
                <div class="text-lg">${semesterInfo.display}</div>
            `;

            // 插入到主菜单标题后面
            const mainMenu = document.getElementById('mainMenu');
            const h1 = mainMenu.querySelector('h1');
            h1.parentNode.insertBefore(display, h1.nextSibling);
        }
    }

    // 隐藏当前选中的学期
    hideCurrentSemester() {
        const display = document.getElementById('currentSemesterDisplay');
        if (display) {
            display.remove();
        }
    }
}

// 导出
window.GameEngine = GameEngine;
