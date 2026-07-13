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
import { buildMockExam } from './utils/mockExam'
import type { Question } from './types/quiz'

type Screen = 'home' | 'quiz' | 'summary'

export function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const { history, saveAnswer } = useHistory()
  const { quiz, currentQuestion, isFinished, start, resume, answer, next } = useQuiz()

  const [lastPool, setLastPool] = useState<Question[]>([])
  const [lastDomainId, setLastDomainId] = useState<string | null>(null)
  const [lastIsMockExam, setLastIsMockExam] = useState(false)
  const [savedSession, setSavedSession] = useState<QuizSession | null>(() => readSession())

  const startQuiz = useCallback((domainId: string) => {
    clearSession()
    const pool = QUESTIONS.filter(q => q.domainId === domainId)
    setLastPool(pool)
    setLastDomainId(domainId)
    setLastIsMockExam(false)
    start(pool)
    setScreen('quiz')
    window.scrollTo({ top: 0 })
  }, [start])

  const startMockExam = useCallback(() => {
    clearSession()
    const pool = buildMockExam(QUESTIONS)
    setLastPool(pool)
    setLastDomainId(null)
    setLastIsMockExam(true)
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
    const pool = lastIsMockExam ? buildMockExam(QUESTIONS) : shuffle([...lastPool])
    setLastPool(pool)
    start(pool)
    setScreen('quiz')
    window.scrollTo({ top: 0 })
  }, [start, lastPool, lastIsMockExam])

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
      isMockExam: lastIsMockExam,
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
      <footer className="fixed bottom-0 left-0 right-0 text-center text-xs text-gray-400 py-2 bg-white/80">
        © 2026 kouboyz
      </footer>
      <main className="max-w-2xl mx-auto px-6 pt-24 pb-24">
        {screen === 'home' && (
          <HomeScreen
            history={history}
            onStartDomain={startQuiz}
            onStartMockExam={startMockExam}
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
            isMockExam={lastIsMockExam}
            onRetry={handleRetry}
            onReviewWrong={handleReviewWrong}
            onHome={handleHome}
          />
        )}
      </main>
    </>
  )
}
