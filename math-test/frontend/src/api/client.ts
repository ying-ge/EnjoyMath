import axios from 'axios'

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface Question {
  id: number
  content: string
  options: string[]
  difficulty: number
  discrimination: number
  knowledge_points: string[]
  category: string
  semester?: string  // 学期（如：七年级上、七年级下等）
  explanation?: string
}

export interface TestSession {
  id: number
  student_id?: string
  current_ability: number
  total_questions: number
  status: 'in_progress' | 'completed'
  created_at: string
  completed_at?: string
}

export interface StartTestResponse {
  session_id: number
  current_ability: number
  question: Question | null
  question_number: number
  total_answered: number
}

export interface SubmitAnswerResponse {
  is_correct: boolean
  correct_answer: number
  explanation?: string
  current_ability: number
  ability_change: number
  question_number: number
  should_continue: boolean
  next_question: Question | null
  status: string
}

export interface TestResult {
  session: TestSession
  final_ability: number
  ability_level: string
  scaled_score?: number  // 标准分数
  grade_equivalent?: number  // 年级等值分数
  zpd?: {  // 最近发展区
    lower: number
    upper: number
    recommended_range: string
  }
  prediction?: {  // 预测性分析
    predicted_theta: number
    predicted_scaled_score: number
    growth_rate: number
    confidence: number
    time_horizon_months: number
  }
  skill_diagnosis?: {  // 技能诊断
    knowledge_diagnosis: Record<string, {
      subskills: Record<string, {
        total: number
        correct: number
        mastery?: number
        mastery_percent?: number
      }>
      total_questions: number
      correct_questions: number
    }>
    error_patterns: Record<string, number>
    most_common_error?: string
  }
  testing_frequency?: {  // 测试频率建议
    frequency: string
    reason: string
    suggestion: string
  }
  goals?: {  // 推荐目标
    short_term: {
      theta: number
      scaled_score: number
      ge: number
      description: string
    }
    long_term: {
      theta: number
      scaled_score: number
      ge: number
      description: string
    }
  }
  total_questions: number
  correct_count: number
  accuracy: number
  knowledge_stats: Record<string, {
    correct: number
    total: number
    mastery: number
    mastery_percent: number
  }>
  semester_stats?: Record<string, {
    correct: number
    total: number
    accuracy: number
    accuracy_percent: number
  }>
  suggestions: Array<{
    type: string
    title: string
    content: string
    priority: string
  }>
  responses: Array<{
    id: number
    question_id: number
    answer: number
    is_correct: boolean
    response_time?: number
    ability_before: number
    ability_after: number
  }>
}

export const api = {
  startTest: async (studentId?: string): Promise<StartTestResponse> => {
    const response = await apiClient.post<StartTestResponse>('/test/start', {
      student_id: studentId,
    })
    return response.data
  },

  submitAnswer: async (
    sessionId: number,
    questionId: number,
    answer: number,
    responseTime: number
  ): Promise<SubmitAnswerResponse> => {
    const response = await apiClient.post<SubmitAnswerResponse>(
      `/test/${sessionId}/submit`,
      {
        question_id: questionId,
        answer,
        response_time: responseTime,
      }
    )
    return response.data
  },

  getResult: async (sessionId: number): Promise<TestResult> => {
    const response = await apiClient.get<TestResult>(`/test/${sessionId}/result`)
    return response.data
  },

  getStatus: async (sessionId: number): Promise<TestSession> => {
    const response = await apiClient.get<TestSession>(`/test/${sessionId}/status`)
    return response.data
  },

  getCurrentQuestion: async (sessionId: number): Promise<{
    question: Question | null
    question_number: number
    total_answered: number
  }> => {
    const response = await apiClient.get(`/test/${sessionId}/current-question`)
    return response.data
  },
}

export default apiClient

