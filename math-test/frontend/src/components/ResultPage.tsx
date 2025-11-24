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
          </div>

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

