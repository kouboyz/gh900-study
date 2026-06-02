import { useState, useCallback } from 'react'
import { Nav } from './components/Nav'
import { HomeScreen } from './screens/HomeScreen'
import { QuizScreen } from './screens/QuizScreen'
import { SummaryScreen } from './screens/SummaryScreen'
import { useHistory } from './hooks/useHistory'
import { useQuiz } from './hooks/useQuiz'
import { QUESTIONS } from './data/loader'
import { shuffle } from './utils/shuffle'
import type { Question } from './types/quiz'

type Screen = 'home' | 'quiz' | 'summary'

export function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const { history, saveAnswer } = useHistory()
  const { quiz, currentQuestion, isFinished, start, answer, next } = useQuiz()

  const [lastPool, setLastPool] = useState<Question[]>([])

  const startQuiz = useCallback((domainId: string | null) => {
    const pool = domainId
      ? QUESTIONS.filter(q => q.domainId === domainId)
      : [...QUESTIONS]
    setLastPool(pool)
    start(pool)
    setScreen('quiz')
    window.scrollTo({ top: 0 })
  }, [start])

  const handleAnswer = useCallback((selectedIds: string[]) => {
    answer(selectedIds, saveAnswer)
  }, [answer, saveAnswer])

  const handleNext = useCallback(() => {
    next()
    window.scrollTo({ top: 0 })
  }, [next])

  const handleFinish = useCallback(() => {
    setScreen('summary')
    window.scrollTo({ top: 0 })
  }, [])

  const handleHome = useCallback(() => {
    setScreen('home')
    window.scrollTo({ top: 0 })
  }, [])

  const handleRetry = useCallback(() => {
    start(lastPool)
    setScreen('quiz')
    window.scrollTo({ top: 0 })
  }, [start, lastPool])

  const handleReviewWrong = useCallback(() => {
    const wrongIds = quiz.answers.filter(a => !a.isCorrect).map(a => a.questionId)
    const wrongQs = QUESTIONS.filter(q => wrongIds.includes(q.id))
    setLastPool(wrongQs)
    start(shuffle(wrongQs))
    setScreen('quiz')
    window.scrollTo({ top: 0 })
  }, [quiz.answers, start])

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
          <HomeScreen history={history} onStartDomain={startQuiz} />
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
