import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/client'
import '../styles/Home.css'

function Home() {
  const [studentId, setStudentId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleStartTest = async () => {
    if (loading) return
    
    setLoading(true)
    setError('')
    
    try {
      const result = await api.startTest(studentId || undefined)
      // 将题目信息传递给测试页面
      ;(window as any).__TEST_STATE__ = {
        question: result.question,
        question_number: result.question_number,
        total_answered: result.total_answered,
      }
      navigate(`/test/${result.session_id}`)
    } catch (err: any) {
      setError(err.response?.data?.message || '启动测试失败，请稍后重试')
      console.error('启动测试失败:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="home">
      <div className="container">
        <div className="card home-card">
          <h1 className="title">🎓 探索你的数学能力</h1>
          <p className="subtitle">
            发现自己的强项和提升方向<br />
            通过15-20道题目，清晰了解自己的数学水平
          </p>
          
          <div className="features">
            <div className="feature">
              <div className="feature-icon">📊</div>
              <div className="feature-text">
                <h3>智能匹配</h3>
                <p>难度随你的能力自动调整</p>
              </div>
            </div>
            <div className="feature">
              <div className="feature-icon">📚</div>
              <div className="feature-text">
                <h3>全面探索</h3>
                <p>涵盖初中数学所有主要知识点</p>
              </div>
            </div>
            <div className="feature">
              <div className="feature-icon">📈</div>
              <div className="feature-text">
                <h3>能力地图</h3>
                <p>清晰看到自己的水平和成长方向</p>
              </div>
            </div>
          </div>

          <div className="form-section">
            <label className="label">学生ID（可选）</label>
            <input
              type="text"
              className="input"
              placeholder="输入你的学生ID，或留空开始探索"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleStartTest()}
            />
          </div>

          {error && <div className="error">{error}</div>}

          <button
            className="button start-button"
            onClick={handleStartTest}
            disabled={loading}
          >
            {loading ? '准备中...' : '开始探索'}
          </button>

          <div className="info">
            <p>📝 探索说明：</p>
            <ul>
              <li>大约需要完成 15-20 道题目</li>
              <li>题目难度会根据你的表现自动调整</li>
              <li>认真作答，才能准确发现自己的能力</li>
              <li>建议在安静的环境中专注探索</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

