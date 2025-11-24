/**
 * IRT (Item Response Theory) 算法实现
 * 基于 2PL (Two-Parameter Logistic) 模型
 */

class IRTAlgorithm {
    /**
     * 计算答对概率
     * P(θ) = 1 / (1 + exp(-a * (θ - b)))
     * 
     * @param {number} ability - 能力值 (theta)
     * @param {number} difficulty - 题目难度 (b)
     * @param {number} discrimination - 题目区分度 (a)
     * @returns {number} 答对概率
     */
    probability(ability, difficulty, discrimination) {
        const exponent = -discrimination * (ability - difficulty);
        return 1 / (1 + Math.exp(exponent));
    }

    /**
     * 计算 Fisher 信息量
     * I(θ) = a² * P(θ) * (1 - P(θ))
     * 
     * @param {number} ability - 能力值
     * @param {number} difficulty - 题目难度
     * @param {number} discrimination - 题目区分度
     * @returns {number} 信息量
     */
    fisherInformation(ability, difficulty, discrimination) {
        const prob = this.probability(ability, difficulty, discrimination);
        return Math.pow(discrimination, 2) * prob * (1 - prob);
    }

    /**
     * 使用最大似然估计（MLE）估计能力值
     * 
     * @param {Array} responses - 答题记录 [{question, isCorrect}, ...]
     * @returns {number} 估计的能力值
     */
    estimateAbilityMLE(responses) {
        if (responses.length === 0) {
            return 0.0;
        }

        // 如果题目太少，使用简化方法
        if (responses.length < 3) {
            return this._simpleAbilityEstimate(responses);
        }

        // 定义负对数似然函数
        const negLogLikelihood = (theta) => {
            let logLikelihood = 0.0;
            
            for (const response of responses) {
                const { question, isCorrect } = response;
                const prob = this.probability(
                    theta,
                    question.difficulty,
                    question.discrimination
                );
                
                // 避免 log(0)
                const safeProb = Math.max(prob, 1e-10);
                const safeOneMinusProb = Math.max(1 - prob, 1e-10);
                
                if (isCorrect) {
                    logLikelihood += Math.log(safeProb);
                } else {
                    logLikelihood += Math.log(safeOneMinusProb);
                }
            }
            
            return -logLikelihood;
        };

        // 使用二分法在 [-3, 3] 范围内搜索最优值
        return this._binarySearch(negLogLikelihood, -3, 3, 0.01);
    }

    /**
     * 简化能力估计（用于题目较少时）
     */
    _simpleAbilityEstimate(responses) {
        let ability = 0.0;
        const correctRate = responses.filter(r => r.isCorrect).length / responses.length;
        
        // 根据正确率调整能力值
        if (correctRate > 0.8) {
            ability = 1.0;
        } else if (correctRate > 0.6) {
            ability = 0.5;
        } else if (correctRate < 0.4) {
            ability = -0.5;
        } else if (correctRate < 0.2) {
            ability = -1.0;
        }
        
        return ability;
    }

    /**
     * 二分法搜索最优值
     */
    _binarySearch(func, min, max, precision) {
        let left = min;
        let right = max;
        let best = 0;
        let bestValue = Infinity;

        while (right - left > precision) {
            const mid1 = left + (right - left) / 3;
            const mid2 = right - (right - left) / 3;
            
            const value1 = func(mid1);
            const value2 = func(mid2);
            
            if (value1 < value2) {
                right = mid2;
                if (value1 < bestValue) {
                    bestValue = value1;
                    best = mid1;
                }
            } else {
                left = mid1;
                if (value2 < bestValue) {
                    bestValue = value2;
                    best = mid2;
                }
            }
        }

        return Math.max(-3, Math.min(3, best)); // 限制在 [-3, 3] 范围内
    }

    /**
     * 选择下一题（信息量最大化）
     * 
     * @param {number} currentAbility - 当前能力估计值
     * @param {Array} availableQuestions - 可用题目列表
     * @param {Array} answeredIds - 已答题目的ID列表
     * @returns {Object|null} 选中的题目
     */
    selectNextQuestion(currentAbility, availableQuestions, answeredIds) {
        if (availableQuestions.length === 0) {
            return null;
        }

        // 过滤已答题目
        const unanswered = availableQuestions.filter(q => !answeredIds.includes(q.id));
        
        if (unanswered.length === 0) {
            return null;
        }

        // 计算所有题目的信息量
        const questionScores = unanswered.map(question => {
            const information = this.fisherInformation(
                currentAbility,
                question.difficulty,
                question.discrimination
            );

            // 同时考虑难度与能力的匹配度
            const distance = Math.abs(question.difficulty - currentAbility);
            const adjustedInformation = information / (1 + distance * 0.1);

            return {
                question,
                score: adjustedInformation
            };
        });

        // 按分数排序（降序）
        questionScores.sort((a, b) => b.score - a.score);

        // 找到最高分
        const maxScore = questionScores[0].score;
        
        // 找出所有分数接近最高分的题目（在最高分的95%以上）
        const topCandidates = questionScores.filter(
            item => item.score >= maxScore * 0.95
        );

        // 如果有多个候选，随机选择一个（增加随机性）
        if (topCandidates.length > 1) {
            const randomIndex = Math.floor(Math.random() * topCandidates.length);
            return topCandidates[randomIndex].question;
        }

        // 否则返回最高分的题目
        return questionScores[0].question;
    }

    /**
     * 计算标准分数（Scaled Score）
     * 将 IRT 能力值（theta，-3 到 3）转换为 0-1000 的标准分数
     * 
     * @param {number} theta - IRT 能力值
     * @returns {number} 标准分数（0-1000）
     */
    calculateScaledScore(theta) {
        const scaled = 500 + (theta * 100);
        return Math.max(0, Math.min(1000, Math.round(scaled)));
    }

    /**
     * 计算年级等值分数（Grade Equivalent, GE）
     * 表示学生的能力相当于哪个年级的水平
     * 
     * @param {number} theta - IRT 能力值
     * @returns {number} 年级等值分数（如 7.5 表示七年级下学期水平）
     */
    calculateGradeEquivalent(theta) {
        let ge;
        if (theta < -1.5) {
            ge = 6.5 + (theta + 3) * 0.5 / 1.5;
        } else if (theta < -0.5) {
            ge = 7.0 + (theta + 1.5) * 0.5 / 1.0;
        } else if (theta < 0.0) {
            ge = 7.5 + (theta + 0.5) * 0.5 / 0.5;
        } else if (theta < 0.5) {
            ge = 8.0 + theta * 0.5 / 0.5;
        } else if (theta < 1.0) {
            ge = 8.5 + (theta - 0.5) * 0.5 / 0.5;
        } else if (theta < 1.5) {
            ge = 9.0 + (theta - 1.0) * 0.5 / 0.5;
        } else {
            ge = 9.5 + Math.min((theta - 1.5) * 0.5 / 1.5, 1.0);
        }
        return Math.round(ge * 10) / 10;
    }

    /**
     * 计算最近发展区（Zone of Proximal Development, ZPD）
     * 学生能够通过努力掌握的难度范围
     * 
     * @param {number} theta - IRT 能力值
     * @returns {Object} {lower: 下界, upper: 上界, recommended_range: 推荐范围字符串}
     */
    calculateZPD(theta) {
        const lowerBound = theta - 0.5;
        const upperBound = theta + 1.0;
        return {
            lower: Math.round(lowerBound * 100) / 100,
            upper: Math.round(upperBound * 100) / 100,
            recommended_range: `${Math.round(lowerBound * 10) / 10} ~ ${Math.round(upperBound * 10) / 10}`
        };
    }

    /**
     * 预测未来能力值（Predictive Analytics）
     * 
     * @param {number} currentTheta - 当前能力值
     * @param {number} timeHorizonMonths - 预测时间范围（月），默认3个月
     * @returns {Object} 预测结果
     */
    predictFutureAbility(currentTheta, timeHorizonMonths = 3) {
        let monthlyGrowth;
        if (currentTheta < 0) {
            monthlyGrowth = 0.15;
        } else if (currentTheta < 1.0) {
            monthlyGrowth = 0.12;
        } else {
            monthlyGrowth = 0.10;
        }
        
        const predictedTheta = Math.min(currentTheta + monthlyGrowth * timeHorizonMonths, 3.0);
        const confidence = 0.7 + 0.2 * (1 - Math.abs(currentTheta) / 3);
        
        return {
            predicted_theta: Math.round(predictedTheta * 100) / 100,
            predicted_scaled_score: this.calculateScaledScore(predictedTheta),
            growth_rate: Math.round(monthlyGrowth * 100) / 100,
            confidence: Math.round(confidence * 100) / 100,
            time_horizon_months: timeHorizonMonths
        };
    }

    /**
     * 推荐学习目标
     * 
     * @param {number} currentTheta - 当前能力值
     * @param {Object} zpd - 最近发展区
     * @returns {Object} 推荐目标
     */
    recommendGoals(currentTheta, zpd) {
        // 短期目标（1-2个月）：较小的提升，基于预期成长速度
        // 每月成长约 0.1-0.15，1-2个月约提升 0.2-0.3
        const monthlyGrowth = currentTheta < 0 ? 0.15 : (currentTheta < 1.0 ? 0.12 : 0.10);
        const shortTermTheta = Math.min(currentTheta + monthlyGrowth * 1.5, 3.0); // 1.5个月平均
        
        // 长期目标（3-6个月）：较大的提升，可以挑战 ZPD 上界
        // 3-6个月约提升 0.4-0.9，或达到 ZPD 上界
        const longTermGrowth = monthlyGrowth * 4.5; // 4.5个月平均
        const longTermTheta = Math.min(
            Math.max(currentTheta + longTermGrowth, zpd.upper * 0.9), // 至少达到 ZPD 上界的 90%
            3.0
        );
        
        return {
            short_term: {
                theta: Math.round(shortTermTheta * 100) / 100,
                scaled_score: this.calculateScaledScore(shortTermTheta),
                ge: this.calculateGradeEquivalent(shortTermTheta),
                description: `短期目标（1-2个月）：达到能力值 ${Math.round(shortTermTheta * 100) / 100}，相当于 ${this.calculateGradeEquivalent(shortTermTheta)} 年级水平`
            },
            long_term: {
                theta: Math.round(longTermTheta * 100) / 100,
                scaled_score: this.calculateScaledScore(longTermTheta),
                ge: this.calculateGradeEquivalent(longTermTheta),
                description: `长期目标（3-6个月）：达到能力值 ${Math.round(longTermTheta * 100) / 100}，相当于 ${this.calculateGradeEquivalent(longTermTheta)} 年级水平`
            }
        };
    }

    /**
     * 推荐测试频率
     * 
     * @param {number} currentAbility - 当前能力值
     * @returns {Object} 测试频率建议
     */
    recommendTestingFrequency(currentAbility) {
        let frequency, reason;
        if (currentAbility < -0.5) {
            frequency = '每2周一次';
            reason = '您的数学基础需要加强，建议每2周测试一次，及时追踪进步情况，发现问题及时调整学习计划。';
        } else if (currentAbility < 0.5) {
            frequency = '每月一次';
            reason = '您的数学水平处于中等，建议每月测试一次，保持对学习进度的追踪，及时发现薄弱环节。';
        } else if (currentAbility < 1.5) {
            frequency = '每6-8周一次';
            reason = '您的数学能力良好，建议每6-8周测试一次，追踪长期进步趋势。';
        } else {
            frequency = '每2-3个月一次';
            reason = '您的数学能力优秀，建议每2-3个月测试一次，保持对整体水平的了解。';
        }
        
        return {
            frequency,
            reason,
            suggestion: '建议您记录每次测试的分数，绘制成长趋势图，这样可以更直观地看到自己的进步。'
        };
    }
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IRTAlgorithm;
}

