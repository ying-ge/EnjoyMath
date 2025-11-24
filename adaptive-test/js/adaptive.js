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
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IRTAlgorithm;
}

