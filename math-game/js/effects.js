// 游戏特效管理器
// 负责视觉效果、音效、动画等

class GameEffects {
    constructor() {
        this.audioContext = null;
        this.sounds = {};
        this.particleContainer = null;
        
        this.initializeAudio();
        this.initializeParticles();
    }
    
    // 初始化音频系统
    initializeAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.createSounds();
        } catch (error) {
            console.log('音频系统初始化失败，将使用静音模式');
        }
    }
    
    // 创建音效
    createSounds() {
        if (!this.audioContext) return;
        
        // 正确答案音效
        this.sounds.correct = () => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(523.25, this.audioContext.currentTime); // C5
            oscillator.frequency.setValueAtTime(659.25, this.audioContext.currentTime + 0.1); // E5
            
            gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.3);
        };
        
        // 错误答案音效
        this.sounds.incorrect = () => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
            oscillator.frequency.setValueAtTime(150, this.audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.2);
        };
        
        // 连击音效
        this.sounds.combo = () => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(440, this.audioContext.currentTime); // A4
            oscillator.frequency.setValueAtTime(554.37, this.audioContext.currentTime + 0.05); // C#5
            oscillator.frequency.setValueAtTime(659.25, this.audioContext.currentTime + 0.1); // E5
            
            gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.2);
        };
        
        // 开始游戏音效
        this.sounds.start = () => {
            const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
            notes.forEach((frequency, index) => {
                setTimeout(() => {
                    const oscillator = this.audioContext.createOscillator();
                    const gainNode = this.audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(this.audioContext.destination);
                    
                    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
                    
                    gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.15);
                    
                    oscillator.start(this.audioContext.currentTime);
                    oscillator.stop(this.audioContext.currentTime + 0.15);
                }, index * 100);
            });
        };
        
        // 暂停音效
        this.sounds.pause = () => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(349.23, this.audioContext.currentTime); // F4
            
            gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.1);
        };
        
        // 恢复音效
        this.sounds.resume = () => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(349.23, this.audioContext.currentTime); // F4
            oscillator.frequency.setValueAtTime(440.00, this.audioContext.currentTime + 0.05); // A4
            
            gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.15);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.15);
        };
        
        // 游戏结束音效
        this.sounds.gameover = () => {
            const notes = [523.25, 392.00, 329.63, 261.63]; // C5, G4, E4, C4
            notes.forEach((frequency, index) => {
                setTimeout(() => {
                    const oscillator = this.audioContext.createOscillator();
                    const gainNode = this.audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(this.audioContext.destination);
                    
                    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
                    
                    gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
                    
                    oscillator.start(this.audioContext.currentTime);
                    oscillator.stop(this.audioContext.currentTime + 0.2);
                }, index * 150);
            });
        };
    }
    
    // 初始化粒子容器
    initializeParticles() {
        this.particleContainer = document.createElement('div');
        this.particleContainer.className = 'particle-container';
        document.body.appendChild(this.particleContainer);
    }
    
    // 播放音效
    playSound(soundName) {
        if (this.sounds[soundName]) {
            try {
                this.sounds[soundName]();
            } catch (error) {
                console.log(`播放音效 ${soundName} 失败`);
            }
        }
    }
    
    // 显示连击效果
    showComboEffect(combo) {
        const comboDiv = document.createElement('div');
        comboDiv.className = 'combo-effect';
        comboDiv.textContent = `${combo} 连击！`;
        
        document.body.appendChild(comboDiv);
        
        // 移除元素
        setTimeout(() => {
            if (comboDiv.parentNode) {
                comboDiv.parentNode.removeChild(comboDiv);
            }
        }, 1000);
        
        // 播放连击音效
        this.playSound('combo');
    }
    
    // 显示得分弹出
    showScorePopup(text, x = null, y = null) {
        const scoreDiv = document.createElement('div');
        scoreDiv.className = 'score-popup';
        scoreDiv.textContent = text;
        
        if (x && y) {
            scoreDiv.style.left = x + 'px';
            scoreDiv.style.top = y + 'px';
        } else {
            scoreDiv.style.left = '50%';
            scoreDiv.style.top = '50%';
            scoreDiv.style.transform = 'translate(-50%, -50%)';
        }
        
        document.body.appendChild(scoreDiv);
        
        // 移除元素
        setTimeout(() => {
            if (scoreDiv.parentNode) {
                scoreDiv.parentNode.removeChild(scoreDiv);
            }
        }, 2000);
    }
    
    // 显示通知
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg text-white font-semibold z-50 transition-all duration-300`;
        
        switch (type) {
            case 'success':
                notification.className += ' bg-green-500';
                break;
            case 'warning':
                notification.className += ' bg-yellow-500';
                break;
            case 'danger':
                notification.className += ' bg-red-500';
                notification.classList.add('animate-pulse');
                break;
            default:
                notification.className += ' bg-blue-500';
        }
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // 添加进入动画
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // 移除元素
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 2000);
    }
    
    // 显示粒子效果
    showParticles(count = 30) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                this.createParticle();
            }, i * 50);
        }
    }
    
    // 创建单个粒子
    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // 随机位置和颜色
        const startX = Math.random() * window.innerWidth;
        const color = this.getRandomColor();
        
        particle.style.left = startX + 'px';
        particle.style.backgroundColor = color;
        particle.style.boxShadow = `0 0 6px ${color}`;
        
        this.particleContainer.appendChild(particle);
        
        // 移除粒子
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 3000);
    }
    
    // 获取随机颜色
    getRandomColor() {
        const colors = [
            '#fbbf24', '#f59e0b', '#d97706', // 黄色系
            '#34d399', '#10b981', '#059669', // 绿色系
            '#60a5fa', '#3b82f6', '#2563eb', // 蓝色系
            '#a78bfa', '#8b5cf6', '#7c3aed', // 紫色系
            '#f87171', '#ef4444', '#dc2626'  // 红色系
        ];
        
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // 屏幕震动效果
    screenShake(intensity = 'medium') {
        const body = document.body;
        const intensities = {
            light: { distance: 2, duration: 200 },
            medium: { distance: 5, duration: 300 },
            heavy: { distance: 10, duration: 500 }
        };
        
        const config = intensities[intensity] || intensities.medium;
        
        body.classList.add('screen-shake');
        
        setTimeout(() => {
            body.classList.remove('screen-shake');
        }, config.duration);
    }
    
    // 闪光效果
    flashScreen(color = 'white', duration = 200) {
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: ${color};
            opacity: 0.8;
            z-index: 9999;
            pointer-events: none;
        `;
        
        document.body.appendChild(flash);
        
        setTimeout(() => {
            flash.style.opacity = '0';
            flash.style.transition = `opacity ${duration}ms ease-out`;
            
            setTimeout(() => {
                if (flash.parentNode) {
                    flash.parentNode.removeChild(flash);
                }
            }, duration);
        }, 50);
    }
    
    // 打字机效果
    typewriterEffect(element, text, speed = 50) {
        let index = 0;
        element.textContent = '';
        
        const typeChar = () => {
            if (index < text.length) {
                element.textContent += text[index];
                index++;
                setTimeout(typeChar, speed);
            }
        };
        
        typeChar();
    }
    
    // 脉冲效果
    pulseEffect(element, duration = 1000) {
        element.style.animation = 'pulse 1s ease-in-out infinite';
        
        setTimeout(() => {
            element.style.animation = '';
        }, duration);
    }
    
    // 淡入效果
    fadeIn(element, duration = 300) {
        element.style.opacity = '0';
        element.style.transition = `opacity ${duration}ms ease-in`;
        
        setTimeout(() => {
            element.style.opacity = '1';
        }, 10);
    }
    
    // 淡出效果
    fadeOut(element, duration = 300) {
        element.style.transition = `opacity ${duration}ms ease-out`;
        element.style.opacity = '0';
        
        setTimeout(() => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }, duration);
    }
    
    // 缩放效果
    scaleEffect(element, scale = 1.2, duration = 200) {
        element.style.transition = `transform ${duration}ms ease-in-out`;
        element.style.transform = `scale(${scale})`;
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, duration);
    }
    
    // 旋转效果
    rotateEffect(element, degrees = 360, duration = 500) {
        element.style.transition = `transform ${duration}ms ease-in-out`;
        element.style.transform = `rotate(${degrees}deg)`;
        
        setTimeout(() => {
            element.style.transform = 'rotate(0deg)';
        }, duration);
    }
    
    // 弹跳效果
    bounceEffect(element) {
        element.style.animation = 'bounce 0.6s ease-in-out';
        
        setTimeout(() => {
            element.style.animation = '';
        }, 600);
    }
}

// 导出
window.GameEffects = GameEffects;
