import React from 'react'
import { typograph } from '../../core/typograph'

export function EmptyState({
  title = 'Голосования отсутствуют',
  description = 'В текущем смарт-контракте пока не зарегистрировано активных предложений.',
  actionLabel,
  onAction,
  secondaryLabel,
  onSecondary,
  icon,
  className = '',
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`champ-card text-center p-8 sm:p-12 border-dashed border-cyan-500/25 ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto mb-4 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
        {icon || <span className="text-2xl">🏆</span>}
      </div>
      <h3 className="text-white font-bold text-lg tracking-tight">
        {typograph(title)}
      </h3>
      <p className="text-slate-400 text-xs sm:text-sm mt-1.5 max-w-md mx-auto leading-relaxed">
        {typograph(description)}
      </p>

      {(actionLabel || secondaryLabel) && (
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          {actionLabel && onAction && (
            <button
              onClick={onAction}
              className="champ-btn-primary text-xs sm:text-sm py-2.5 px-5 cursor-pointer"
            >
              <span>{typograph(actionLabel)}</span>
            </button>
          )}
          {secondaryLabel && onSecondary && (
            <button
              onClick={onSecondary}
              className="champ-btn-secondary text-xs sm:text-sm py-2.5 px-5 cursor-pointer"
            >
              {typograph(secondaryLabel)}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export function LoadingSkeleton({ count = 2, className = '' }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={`d-flex flex-column gap-3 ${className}`}
    >
      <span className="visually-hidden">Загрузка данных голосований...</span>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="champ-card animate-pulse p-4 border-slate-700/60 bg-slate-900/60"
        >
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="h-4 w-1/3 rounded bg-slate-700/50" />
            <div className="h-6 w-20 rounded-full bg-cyan-900/40" />
          </div>
          <div className="space-y-2 mb-3">
            <div className="h-3 w-full rounded bg-slate-800" />
            <div className="h-3 w-3/4 rounded bg-slate-800" />
          </div>
          <div className="h-8 w-1/4 rounded bg-slate-800/80" />
        </div>
      ))}
    </div>
  )
}

export function ErrorState({
  title = 'Ошибка вызова смарт-контракта голосования',
  description = 'Не удалось получить данные предложения из блокчейна.',
  onRetry,
  retryLabel = 'Повторить запрос',
  className = '',
}) {
  return (
    <div
      role="alert"
      className={`champ-card text-center p-8 border-rose-500/30 bg-rose-500/5 ${className}`}
    >
      <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto mb-3 shadow-[0_0_16px_rgba(244,63,94,0.2)]">
        <span className="text-xl">⚠️</span>
      </div>
      <h3 className="text-white font-bold text-base">
        {typograph(title)}
      </h3>
      <p className="text-slate-400 text-xs mt-1 max-w-sm mx-auto">
        {typograph(description)}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="champ-btn-secondary mt-4 text-xs py-2 px-4 border-rose-400/40 text-rose-300 cursor-pointer"
        >
          {typograph(retryLabel)}
        </button>
      )}
    </div>
  )
}

export function SuccessState({
  title = 'Голос успешно учтен',
  description = 'Транзакция голосования подтверждена смарт-контрактом этапа.',
  actionLabel,
  onAction,
  className = '',
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`champ-card text-center p-8 border-emerald-500/30 bg-emerald-500/5 ${className}`}
    >
      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-3 shadow-[0_0_16px_rgba(16,185,129,0.2)]">
        <span className="text-xl">✓</span>
      </div>
      <h3 className="text-white font-bold text-base">
        {typograph(title)}
      </h3>
      <p className="text-slate-400 text-xs mt-1 max-w-sm mx-auto">
        {typograph(description)}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="champ-btn-primary mt-4 text-xs py-2 px-4 cursor-pointer"
        >
          {typograph(actionLabel)}
        </button>
      )}
    </div>
  )
}
