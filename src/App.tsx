import { useState, useCallback, useEffect } from 'react'
import { Nav } from './components/Nav'
import { HomeScreen } from './screens/HomeScreen'
import { QuizScreen } from './screens/QuizScreen'
import { SummaryScreen } from './screens/SummaryScreen'
import { useHistory } from './hooks/useHistory'
import { useQuiz } from './hooks/useQuiz'
import { readSession, saveSession, clearSession } from './hooks/useQuizSession'
import type { QuizSession } from './hooks/useQuizSession'
import { QUESTIONS } from './data/loader'
import { shuffle } from './utils/shuffle'
import type { Question } from './types/quiz'

type Screen = 'home' | 'quiz' | 'summary'

export function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const { history, saveAnswer } = useHistory()
  const { quiz, currentQuestion, isFinished, start, resume, answer, next } = useQuiz()

  const [lastPool, setLastPool] = useState<Question[]>([])
  const [lastDomainId, setLastDomainId] = useState<string | null>(null)
  const [savedSession, setSavedSession] = useState<QuizSession | null>(() => readSession())

  const startQuiz = useCallback((domainId: string | null) => {
    clearSession()
    const pool = domainId
      ? QUESTIONS.filter(q => q.domainId === domainId)
      : [...QUESTIONS]
    setLastPool(pool)
    setLastDomainId(domainId)
    start(pool)
    setScreen('quiz')
    window.scrollTo({ top: 0 })
  }, [start])

  const handleResumeSession = useCallback(() => {
    if (!savedSession) return
    const orderedQs = savedSession.questionIds
      .map(id => QUESTIONS.find(q => q.id === id))
      .filter((q): q is Question => q !== undefined)
    if (orderedQs.length === 0) return
    setLastPool(orderedQs)
    setLastDomainId(savedSession.domainId)
    resume(orderedQs, savedSession.index, savedSession.answers)
    setScreen('quiz')
    window.scrollTo({ top: 0 })
  }, [savedSession, resume])

  const handleAnswer = useCallback((selectedIds: string[]) => {
    answer(selectedIds, saveAnswer)
  }, [answer, saveAnswer])

  const handleNext = useCallback(() => {
    next()
    window.scrollTo({ top: 0 })
  }, [next])

  const handleFinish = useCallback(() => {
    clearSession()
    setScreen('summary')
    window.scrollTo({ top: 0 })
  }, [])

  const handleHome = useCallback(() => {
    setSavedSession(readSession())
    setScreen('home')
    window.scrollTo({ top: 0 })
  }, [])

  const handleRetry = useCallback(() => {
    clearSession()
    start(lastPool)
    setScreen('quiz')
    window.scrollTo({ top: 0 })
  }, [start, lastPool])

  const handleReviewWrong = useCallback(() => {
    clearSession()
    const wrongIds = quiz.answers.filter(a => !a.isCorrect).map(a => a.questionId)
    const wrongQs = QUESTIONS.filter(q => wrongIds.includes(q.id))
    setLastPool(wrongQs)
    setLastDomainId(null)
    start(shuffle(wrongQs))
    setScreen('quiz')
    window.scrollTo({ top: 0 })
  }, [quiz.answers, start])

  // クイズ進行中にセッションを保存する
  useEffect(() => {
    if (screen !== 'quiz' || quiz.questions.length === 0) return
    saveSession({
      questionIds: quiz.questions.map(q => q.id),
      index: quiz.index,
      answers: quiz.answers,
      domainId: lastDomainId,
      savedAt: new Date().toISOString(),
    })
  }, [screen, quiz, lastDomainId])

  const quizInfo = screen === 'quiz' && currentQuestion
    ? `${quiz.index + 1} / ${quiz.questions.length}`
    : undefined

  return (
    <>
      <Nav
        onHome={handleHome}
        showBack={screen !== 'home'}
        quizInfo={quizInfo}
      />
      <main className="max-w-2xl mx-auto px-6 pt-24 pb-24">
        {screen === 'home' && (
          <HomeScreen
            history={history}
            onStartDomain={startQuiz}
            savedSession={savedSession}
            onResumeSession={handleResumeSession}
          />
        )}
        {screen === 'quiz' && currentQuestion && !isFinished && (
          <QuizScreen
            key={`${quiz.index}-${currentQuestion.id}`}
            questions={quiz.questions}
            index={quiz.index}
            answers={quiz.answers}
            onAnswer={handleAnswer}
            onNext={handleNext}
            onFinish={handleFinish}
          />
        )}
        {screen === 'summary' && (
          <SummaryScreen
            answers={quiz.answers}
            onRetry={handleRetry}
            onReviewWrong={handleReviewWrong}
            onHome={handleHome}
          />
        )}
      </main>
    </>
  )
}
