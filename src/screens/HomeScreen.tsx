import type { AnswerHistory } from '../types/quiz'
import type { QuizSession } from '../hooks/useQuizSession'
import { DOMAINS } from '../data/domains'
import { QUESTIONS } from '../data/loader'
import { APP_CONFIG, buildShareText } from '../config/app'
import { DomainCard } from '../components/DomainCard'
import { ProgressBar } from '../components/ProgressBar'
import { ShareButtons } from '../components/ShareButtons'

type Props = {
  history: AnswerHistory
  onStartDomain: (domainId: string) => void
  onStartMockExam: () => void
  savedSession: QuizSession | null
  onResumeSession: () => void
}

export function HomeScreen({ history, onStartDomain, onStartMockExam, savedSession, onResumeSession }: Props) {
  const totalQ = QUESTIONS.length
  const answered = Object.keys(history).length
  const correct = Object.values(history).filter(h => h.lastCorrect).length
  const overallPct = answered > 0 ? Math.round((correct / answered) * 100) : null
  const progressPct = totalQ > 0 ? Math.round((answered / totalQ) * 100) : 0

  const shareText = overallPct !== null ? buildShareText(answered, totalQ, overallPct) : ''

  return (
    <div className="animate-[fadeIn_0.25s_ease]">
      <div className="mb-12">
        <p className="text-xs tracking-widest uppercase text-gray-400 mb-2">{APP_CONFIG.examLabel}</p>
        <h1 className="text-2xl font-light tracking-tight mb-3">
          {APP_CONFIG.appName}
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed">
          {APP_CONFIG.description}
        </p>
        <p className="text-xs text-gray-400 mt-2">
          {APP_CONFIG.studyGuideVersion}対応 / 最終更新: {APP_CONFIG.lastUpdated}
        </p>
      </div>

      {/* Resume banner */}
      {savedSession && (
        <div className="mb-8 flex items-center justify-between gap-4 rounded border border-gray-200 px-4 py-3">
          <div className="min-w-0">
            <p className="text-xs text-gray-400 mb-0.5">前回の続きがあります</p>
            <p className="text-sm text-gray-700">
              {savedSession.index + 1} / {savedSession.questionIds.length} 問目
              {savedSession.isMockExam ? '（模擬試験）' : savedSession.domainId ? `（${savedSession.domainId}）` : '（全ドメイン）'}
            </p>
          </div>
          <button
            onClick={onResumeSession}
            className="shrink-0 text-sm px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors cursor-pointer"
          >
            再開
          </button>
        </div>
      )}

      {/* Overall Progress */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs tracking-widest uppercase text-gray-400">Overall Progress</p>
          <p className="text-xs text-gray-400">
            {overallPct !== null ? `${overallPct}% 正解` : '未回答'}
          </p>
        </div>
        <ProgressBar value={progressPct} />
        <div className="flex items-center justify-between mt-1.5">
          <p className="text-xs text-gray-400">{answered} / {totalQ} 問回答済み</p>
          {overallPct !== null && (
            <ShareButtons text={shareText} layout="icon" />
          )}
        </div>
      </div>

      {/* Domain list */}
      <div className="mb-8">
        <p className="text-xs tracking-widest uppercase text-gray-400 mb-6">Domains</p>
        <div>
          {DOMAINS.map(d => (
            <DomainCard
              key={d.id}
              domain={d}
              questions={QUESTIONS.filter(q => q.domainId === d.id)}
              history={history}
              onClick={onStartDomain}
            />
          ))}
        </div>
      </div>

      <div className="pt-6 mb-12">
        <button
          onClick={onStartMockExam}
          className="w-full py-3 text-sm bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors cursor-pointer"
        >
          模擬試験を受ける（50問・本番比率）
        </button>
      </div>

      {/* Disclaimer */}
      <div className="mb-12 text-xs text-gray-400 leading-relaxed border-t border-gray-100 pt-6">
        このコンテンツは一般公開されている GitHub Foundations の公式ドキュメントに基づいています。サポートされるすべての構成で検&#35388;されたわけではありません。最新のドキュメントとの整合を維持するよう努めていますが、意思決定を行う前に、公式の GitHub ドキュメントで詳細を確認することをお勧めします。
      </div>

      {/* Official Resources */}
      {APP_CONFIG.officialLinks.length > 0 && (
      <div>
        <p className="text-xs tracking-widest uppercase text-gray-400 mb-6">Official Resources</p>
        <div className="divide-y divide-gray-100">
          {APP_CONFIG.officialLinks.map(link => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group -mx-3 px-3 py-4 rounded hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs text-gray-400 mb-0.5">{link.category}</p>
                  <p className="text-sm group-hover:text-gray-600 transition-colors">{link.title}</p>
                  {link.note && (
                    <p className="text-xs text-gray-400 mt-0.5">{link.note}</p>
                  )}
                </div>
                <svg className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 transition-colors mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
      )}
    </div>
  )
}
