import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api, TestResult } from '../api/client'
import '../styles/ResultPage.css'

function ResultPage() {
  const { sessionId } = useParams<{ sessionId: string }>()
  const navigate = useNavigate()
  const [result, setResult] = useState<TestResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!sessionId) {
      navigate('/')
      return
    }

    loadResult()
  }, [sessionId, navigate])

  const loadResult = async () => {
    try {
      const data = await api.getResult(parseInt(sessionId!))
      setResult(data)
    } catch (err: any) {
      setError('加载结果失败，请重试')
      console.error('加载结果失败:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="result-page">
        <div className="loading">加载结果中...</div>
      </div>
    )
  }

  if (error || !result) {
    return (
      <div className="result-page">
        <div className="container">
          <div className="card">
            <div className="error">{error || '无法加载测试结果'}</div>
            <button className="button" onClick={() => navigate('/')}>
              返回首页
            </button>
          </div>
        </div>
      </div>
    )
  }

  const accuracyPercent = (result.accuracy * 100).toFixed(1)

  return (
    <div className="result-page">
      <div className="container">
        <div className="card result-card">
          <h1 className="result-title">🎉 测试完成</h1>
          
          <div className="result-summary">
            <div className="summary-item">
              <div className="summary-label">总体能力水平</div>
              <div className="summary-value ability-level">
                {result.ability_level}
              </div>
              <div className="summary-detail">
                能力值: {result.final_ability.toFixed(2)}
              </div>
            </div>

            <div className="summary-item">
              <div className="summary-label">答题正确率</div>
              <div className="summary-value">
                {accuracyPercent}%
              </div>
              <div className="summary-detail">
                {result.correct_count} / {result.total_questions} 题
              </div>
            </div>

            {result.scaled_score && (
              <div className="summary-item">
                <div className="summary-label">标准分数</div>
                <div className="summary-value">
                  {result.scaled_score}
                </div>
                <div className="summary-detail">
                  范围: 0-1000 (中等=500)
                </div>
              </div>
            )}

            {result.grade_equivalent && (
              <div className="summary-item">
                <div className="summary-label">年级等值</div>
                <div className="summary-value">
                  {result.grade_equivalent}
                </div>
                <div className="summary-detail">
                  相当于 {result.grade_equivalent.toFixed(1)} 年级水平
                </div>
              </div>
            )}
          </div>

          {/* 分数换算关系说明 */}
          <div className="score-explanation-section">
            <h2>📊 分数指标说明</h2>
            <div className="explanation-content">
              <p><strong>能力值（theta）</strong>：范围 -3.0 到 3.0，是 IRT 模型的核心指标。0.0 表示中等水平，正数表示高于平均水平，负数表示低于平均水平。</p>
              <p><strong>标准分数</strong>：范围 0-1000，更直观的分数。换算公式：标准分数 = 500 + (能力值 × 100)。500 分对应中等水平。</p>
              <p><strong>年级等值（GE）</strong>：表示相当于哪个年级的水平。例如 8.5 表示相当于八年级下学期水平，9.0 表示相当于九年级上学期水平。</p>
              <p><strong>难度值</strong>：题目的难度参数，范围 -3.0 到 3.0，与能力值使用相同尺度。当难度值 = 能力值时，答对概率约 50%。</p>
              <details style={{ marginTop: '12px' }}>
                <summary style={{ cursor: 'pointer', color: '#1A73E8', fontWeight: 500 }}>查看换算关系表</summary>
                <table style={{ marginTop: '12px', width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ background: '#E8F0FE' }}>
                      <th style={{ padding: '8px', border: '1px solid #DADCE0', textAlign: 'center' }}>能力值</th>
                      <th style={{ padding: '8px', border: '1px solid #DADCE0', textAlign: 'center' }}>标准分数</th>
                      <th style={{ padding: '8px', border: '1px solid #DADCE0', textAlign: 'center' }}>年级等值</th>
                      <th style={{ padding: '8px', border: '1px solid #DADCE0', textAlign: 'center' }}>说明</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td style={{ padding: '6px', border: '1px solid #DADCE0', textAlign: 'center' }}>-2.0</td><td style={{ padding: '6px', border: '1px solid #DADCE0', textAlign: 'center' }}>300</td><td style={{ padding: '6px', border: '1px solid #DADCE0', textAlign: 'center' }}>6.8</td><td style={{ padding: '6px', border: '1px solid #DADCE0' }}>基础水平</td></tr>
                    <tr><td style={{ padding: '6px', border: '1px solid #DADCE0', textAlign: 'center' }}>-1.0</td><td style={{ padding: '6px', border: '1px solid #DADCE0', textAlign: 'center' }}>400</td><td style={{ padding: '6px', border: '1px solid #DADCE0', textAlign: 'center' }}>7.2</td><td style={{ padding: '6px', border: '1px solid #DADCE0' }}>七年级上</td></tr>
                    <tr><td style={{ padding: '6px', border: '1px solid #DADCE0', textAlign: 'center' }}>0.0</td><td style={{ padding: '6px', border: '1px solid #DADCE0', textAlign: 'center' }}>500</td><td style={{ padding: '6px', border: '1px solid #DADCE0', textAlign: 'center' }}>8.0</td><td style={{ padding: '6px', border: '1px solid #DADCE0' }}>中等水平（基准）</td></tr>
                    <tr><td style={{ padding: '6px', border: '1px solid #DADCE0', textAlign: 'center' }}>1.0</td><td style={{ padding: '6px', border: '1px solid #DADCE0', textAlign: 'center' }}>600</td><td style={{ padding: '6px', border: '1px solid #DADCE0', textAlign: 'center' }}>9.0</td><td style={{ padding: '6px', border: '1px solid #DADCE0' }}>九年级上</td></tr>
                    <tr><td style={{ padding: '6px', border: '1px solid #DADCE0', textAlign: 'center' }}>2.0</td><td style={{ padding: '6px', border: '1px solid #DADCE0', textAlign: 'center' }}>700</td><td style={{ padding: '6px', border: '1px solid #DADCE0', textAlign: 'center' }}>9.7</td><td style={{ padding: '6px', border: '1px solid #DADCE0' }}>优秀水平</td></tr>
                    <tr><td style={{ padding: '6px', border: '1px solid #DADCE0', textAlign: 'center' }}>3.0</td><td style={{ padding: '6px', border: '1px solid #DADCE0', textAlign: 'center' }}>800</td><td style={{ padding: '6px', border: '1px solid #DADCE0', textAlign: 'center' }}>10.0</td><td style={{ padding: '6px', border: '1px solid #DADCE0' }}>最高水平</td></tr>
                  </tbody>
                </table>
              </details>
            </div>
          </div>

          {result.zpd && (
            <div className="zpd-section">
              <h2>🎯 最近发展区（ZPD）</h2>
              <div className="zpd-info">
                <p><strong>推荐题目难度范围</strong>: {result.zpd.recommended_range}</p>
                <p className="zpd-explanation">
                  这个范围是您通过努力可以掌握的题目难度。建议优先练习难度在 {result.zpd.lower.toFixed(1)} 到 {result.zpd.upper.toFixed(1)} 之间的题目，
                  既能巩固基础，又能适当挑战自己。
                </p>
              </div>
            </div>
          )}

          {result.prediction && (
            <div className="prediction-section">
              <h2>📈 能力预测</h2>
              <div className="prediction-info">
                <p><strong>3个月后预测能力值</strong>: {result.prediction.predicted_theta.toFixed(2)}</p>
                <p><strong>预测标准分数</strong>: {result.prediction.predicted_scaled_score}</p>
                <p><strong>预期成长速度</strong>: 每月 {result.prediction.growth_rate.toFixed(2)} 个能力单位</p>
                <p><strong>预测置信度</strong>: {(result.prediction.confidence * 100).toFixed(0)}%</p>
              </div>
            </div>
          )}

          {result.goals && (
            <div className="goals-section">
              <h2>🎯 推荐学习目标</h2>
              <div className="goals-grid">
                <div className="goal-item">
                  <h3>短期目标（1-2个月）</h3>
                  <div className="goal-value">能力值: {result.goals.short_term.theta}</div>
                  <div className="goal-detail">
                    标准分数: {result.goals.short_term.scaled_score} | 
                    年级等值: {result.goals.short_term.ge}
                  </div>
                  <p className="goal-description">{result.goals.short_term.description}</p>
                </div>
                <div className="goal-item">
                  <h3>长期目标（3-6个月）</h3>
                  <div className="goal-value">能力值: {result.goals.long_term.theta}</div>
                  <div className="goal-detail">
                    标准分数: {result.goals.long_term.scaled_score} | 
                    年级等值: {result.goals.long_term.ge}
                  </div>
                  <p className="goal-description">{result.goals.long_term.description}</p>
                </div>
              </div>
            </div>
          )}

          {result.testing_frequency && (
            <div className="testing-frequency-section">
              <h2>📅 测试频率建议</h2>
              <div className="frequency-info">
                <p><strong>推荐频率</strong>: {result.testing_frequency.frequency}</p>
                <p>{result.testing_frequency.reason}</p>
                <div className="growth-tracking-tip">
                  <p>💡 <strong>成长追踪建议</strong></p>
                  <p>{result.testing_frequency.suggestion}</p>
                  <p>您可以记录每次测试的以下数据：</p>
                  <ul>
                    <li>测试日期</li>
                    <li>能力值（theta）</li>
                    <li>标准分数（Scaled Score）</li>
                    <li>年级等值（GE）</li>
                    <li>ZPD 范围</li>
                  </ul>
                  <p>将这些数据绘制成趋势图，可以直观地看到自己的进步轨迹！</p>
                </div>
              </div>
            </div>
          )}

          {result.skill_diagnosis && (
            <div className="skill-diagnosis-section">
              <h2>🔍 技能诊断</h2>
              
              {result.skill_diagnosis.most_common_error && (
                <div className="error-pattern-section">
                  <h3>错误类型分析</h3>
                  <p><strong>最常见错误类型</strong>: {result.skill_diagnosis.most_common_error}</p>
                  <div className="error-patterns">
                    {Object.entries(result.skill_diagnosis.error_patterns).map(([type, count]) => (
                      <div key={type} className="error-pattern-item">
                        <span className="error-type">{type}</span>
                        <span className="error-count">{count} 次</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <h3>知识点子技能分析</h3>
              <div className="subskill-analysis">
                {Object.entries(result.skill_diagnosis.knowledge_diagnosis).map(([kp, diagnosis]) => {
                  const mastery = diagnosis.correct_questions / diagnosis.total_questions;
                  if (Object.keys(diagnosis.subskills).length === 0) return null;
                  
                  return (
                    <div key={kp} className="knowledge-subskill-item">
                      <h4>{kp} (掌握度: {(mastery * 100).toFixed(1)}%)</h4>
                      <div className="subskills-list">
                        {Object.entries(diagnosis.subskills).map(([subskill, stats]) => (
                          <div key={subskill} className="subskill-item">
                            <span className="subskill-name">{subskill}</span>
                            <div className="subskill-progress">
                              <div 
                                className="subskill-progress-bar"
                                style={{ width: `${stats.mastery_percent || 0}%` }}
                              />
                            </div>
                            <span className="subskill-mastery">
                              {stats.mastery_percent || 0}% ({stats.correct}/{stats.total})
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {result.semester_stats && Object.keys(result.semester_stats).length > 0 && (
            <div className="semester-section">
              <h2>📅 学期表现分析</h2>
              <div className="semester-grid">
                {Object.entries(result.semester_stats).map(([semester, stats]) => (
                  <div key={semester} className="semester-item">
                    <div className="semester-name">{semester}</div>
                    <div className="semester-progress">
                      <div 
                        className="semester-progress-bar"
                        style={{ width: `${stats.accuracy_percent}%` }}
                      />
                    </div>
                    <div className="semester-stats">
                      {stats.accuracy_percent}% ({stats.correct}/{stats.total})
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="knowledge-section">
            <h2>📚 知识点掌握情况</h2>
            <div className="knowledge-grid">
              {Object.entries(result.knowledge_stats).map(([kp, stats]) => (
                <div key={kp} className="knowledge-item">
                  <div className="knowledge-name">{kp}</div>
                  <div className="knowledge-progress">
                    <div 
                      className="knowledge-progress-bar"
                      style={{ width: `${stats.mastery_percent}%` }}
                    />
                  </div>
                  <div className="knowledge-stats">
                    {stats.mastery_percent}% ({stats.correct}/{stats.total})
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="suggestions-section">
            <h2>💡 学习建议</h2>
            {result.suggestions.map((suggestion, index) => (
              <div 
                key={index} 
                className={`suggestion ${suggestion.priority}`}
              >
                <h3>{suggestion.title}</h3>
                <p>{suggestion.content}</p>
              </div>
            ))}
          </div>

          <div className="result-actions">
            <button 
              className="button" 
              onClick={() => navigate('/')}
            >
              重新测试
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultPage

