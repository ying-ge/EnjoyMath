import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api, Question } from '../api/client'
import QuestionDisplay from './QuestionDisplay'
import '../styles/TestPage.css'

function TestPage() {
  const { sessionId } = useParams<{ sessionId: string }>()
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [questionNumber, setQuestionNumber] = useState(1)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [resultData, setResultData] = useState<any>(null)
  const [nextQuestion, setNextQuestion] = useState<Question | null>(null)
  const startTimeRef = useRef<number>(Date.now())

  useEffect(() => {
    if (!sessionId) {
      navigate('/')
      return
    }

    // 检查是否是从首页跳转过来的（location.state中可能有题目信息）
    const locationState = (window as any).__TEST_STATE__
    if (locationState?.question) {
      setCurrentQuestion(locationState.question)
      setQuestionNumber(locationState.question_number || 1)
      setTotalQuestions(locationState.total_answered || 0)
      setLoading(false)
      delete (window as any).__TEST_STATE__
    } else {
      // 否则加载当前测试状态
      loadTestState()
    }
  }, [sessionId, navigate])

  const loadTestState = async () => {
    try {
      const status = await api.getStatus(parseInt(sessionId!))
      
      if (status.status === 'completed') {
        // 测试已完成，跳转到结果页
        navigate(`/result/${sessionId}`)
        return
      }

      setTotalQuestions(status.total_questions)
      
      // 获取当前应该回答的题目
      try {
        const questionData = await api.getCurrentQuestion(parseInt(sessionId!))
        if (questionData.question) {
          setCurrentQuestion(questionData.question)
          setQuestionNumber(questionData.question_number)
          setTotalQuestions(questionData.total_answered)
        } else {
          // 没有当前题目，可能是需要先提交上一题的答案
          setError('无法获取当前题目，请刷新页面重试')
        }
      } catch (err: any) {
        setError('加载题目失败，请重试')
        console.error('获取当前题目失败:', err)
      }
      
      setLoading(false)
    } catch (err: any) {
      setError('加载测试失败，请重试')
      console.error('加载测试状态失败:', err)
      setLoading(false)
    }
  }

  const handleSubmitAnswer = async () => {
    if (selectedAnswer === null || !currentQuestion || !sessionId || submitting) {
      return
    }

    setSubmitting(true)
    setError('')

    try {
      const responseTime = (Date.now() - startTimeRef.current) / 1000 // 转换为秒
      
      const result = await api.submitAnswer(
        parseInt(sessionId),
        currentQuestion.id,
        selectedAnswer,
        responseTime
      )

      // 显示结果
      setShowResult(true)
      setResultData({
        is_correct: result.is_correct,
        explanation: result.explanation,
        correct_answer: result.correct_answer,
        should_continue: result.should_continue,
      })

      // 保存下一题（如果有）
      if (result.next_question) {
        setNextQuestion(result.next_question)
      }

      // 如果测试继续，等待用户查看结果后加载下一题
      if (!result.should_continue) {
        // 测试结束，跳转到结果页
        setTimeout(() => {
          navigate(`/result/${sessionId}`)
        }, 3000)
      }

      // 更新题目编号和总数
      setTotalQuestions(result.question_number)
      setQuestionNumber(result.question_number)
    } catch (err: any) {
      setError(err.response?.data?.message || '提交答案失败，请重试')
      console.error('提交答案失败:', err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleNextQuestion = async () => {
    if (!sessionId || !resultData?.should_continue) return

    // 使用保存的下一题
    if (nextQuestion) {
      setCurrentQuestion(nextQuestion)
      setShowResult(false)
      setSelectedAnswer(null)
      setNextQuestion(null)
      startTimeRef.current = Date.now()
    } else {
      // 如果没有保存的下一题，从后端获取
      try {
        setLoading(true)
        const questionData = await api.getCurrentQuestion(parseInt(sessionId))
        if (questionData.question) {
          setCurrentQuestion(questionData.question)
          setQuestionNumber(questionData.question_number)
          setTotalQuestions(questionData.total_answered)
          setShowResult(false)
          setSelectedAnswer(null)
          startTimeRef.current = Date.now()
        }
      } catch (err) {
        console.error('获取下一题失败:', err)
        setError('获取下一题失败，请刷新页面')
      } finally {
        setLoading(false)
      }
    }
  }

  // 简化版本：直接显示题目（实际应该从后端获取）
  // 这里我们需要修改后端或添加获取当前题目的接口
  
  if (loading && !currentQuestion) {
    return (
      <div className="test-page">
        <div className="loading">加载题目中...</div>
      </div>
    )
  }

  if (!currentQuestion && !loading) {
    return (
      <div className="test-page">
        <div className="error">无法加载题目，请返回首页重新开始</div>
        <button className="button" onClick={() => navigate('/')}>
          返回首页
        </button>
      </div>
    )
  }

  const progress = totalQuestions > 0 ? (questionNumber / 20) * 100 : 5 // 假设最多20题

  return (
    <div className="test-page">
      <div className="container">
        <div className="card">
          <div className="test-header">
            <h2>数学水平测试</h2>
            <div className="question-counter">
              第 {questionNumber} 题
            </div>
          </div>

          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>

          {error && <div className="error">{error}</div>}

          {showResult && resultData ? (
            <div className="result-feedback">
              <div className={`feedback ${resultData.is_correct ? 'correct' : 'incorrect'}`}>
                <h3>{resultData.is_correct ? '✓ 回答正确！' : '✗ 回答错误'}</h3>
                {resultData.explanation && (
                  <div className="explanation">
                    <strong>解析：</strong>
                    <div dangerouslySetInnerHTML={{ __html: resultData.explanation }} />
                  </div>
                )}
              </div>
              <button
                className="button"
                onClick={handleNextQuestion}
              >
                下一题
              </button>
            </div>
          ) : currentQuestion ? (
            <>
              <QuestionDisplay
                question={currentQuestion}
                selectedAnswer={selectedAnswer}
                onAnswerSelect={setSelectedAnswer}
              />

              <div className="test-actions">
                <button
                  className="button"
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null || submitting}
                >
                  {submitting ? '提交中...' : '提交答案'}
                </button>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default TestPage

