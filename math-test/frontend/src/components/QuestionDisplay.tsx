import { Question } from '../api/client'
import { InlineMath, BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import '../styles/QuestionDisplay.css'

interface QuestionDisplayProps {
  question: Question
  selectedAnswer: number | null
  onAnswerSelect: (answerIndex: number) => void
}

function QuestionDisplay({ question, selectedAnswer, onAnswerSelect }: QuestionDisplayProps) {
  // 处理LaTeX公式和普通文本混合的内容
  const renderContent = (content: string) => {
    // 简单的LaTeX检测和渲染
    const parts = content.split(/(\$\$?[^$]+\$\$?)/g)
    
    return parts.map((part, index) => {
      if (part.startsWith('$$')) {
        // 块级公式
        const formula = part.slice(2, -2)
        return <BlockMath key={index} math={formula} />
      } else if (part.startsWith('$')) {
        // 行内公式
        const formula = part.slice(1, -1)
        return <InlineMath key={index} math={formula} />
      } else {
        return <span key={index} dangerouslySetInnerHTML={{ __html: part }} />
      }
    })
  }

  return (
    <div className="question-display">
      <div className="question-content">
        <div className="question-text">
          {renderContent(question.content)}
        </div>
      </div>

      <div className="options">
        {question.options.map((option, index) => (
          <label
            key={index}
            className={`option ${selectedAnswer === index ? 'selected' : ''}`}
          >
            <input
              type="radio"
              name="answer"
              value={index}
              checked={selectedAnswer === index}
              onChange={() => onAnswerSelect(index)}
            />
            <span className="option-label">
              {String.fromCharCode(65 + index)}. {renderContent(option)}
            </span>
          </label>
        ))}
      </div>

      <div className="question-info">
        {question.semester && (
          <span className="info-tag semester-tag">📚 {question.semester}</span>
        )}
        <span className="info-tag">难度: {question.difficulty.toFixed(1)}</span>
        <span className="info-tag">分类: {question.category}</span>
        {question.knowledge_points && question.knowledge_points.length > 0 && (
          <span className="info-tag">
            知识点: {question.knowledge_points.join(', ')}
          </span>
        )}
      </div>
    </div>
  )
}

export default QuestionDisplay

