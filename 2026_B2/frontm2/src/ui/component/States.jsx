import React from "react";
import { typograph } from "../../core/typograph";

/**
 * 4 screen states (Rule У1), rewritten for module B2 (design audit, 2026-11-17).
 *
 * The previous version of this file used bare Tailwind utility classes
 * (`text-white`, `bg-slate-900/60`, `border-cyan-500/25`, …). Tailwind is not
 * a dependency of frontm2 (package.json has no tailwindcss, and nothing
 * configures it) — those classes were silently inert, so every state
 * rendered as unstyled default HTML, and the hardcoded slate/white colours
 * would never have adapted to the light theme even if they had worked
 * (Rule Ц7). It also copied frontm1's DAO/voting copy verbatim ("Голосования
 * отсутствуют") into the postal/logistics module. Rewritten on the same
 * champ-card token system as module A2, with module B2 copy, and this
 * component is now actually imported by the module's pages (see
 * BlockchainState.jsx / UserInfo.jsx).
 */

export function EmptyState({
  title = "Записи отсутствуют",
  description = "В реестре блокчейна пока нет записей по этому разделу.",
  actionLabel,
  onAction,
  secondaryLabel,
  onSecondary,
  icon,
  className = "",
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`champ-card text-center p-4 p-md-5 ${className}`}
      style={{
        border: "1.5px dashed var(--cyan)",
        background: "var(--surface)",
      }}
    >
      <div
        className="rounded-3 d-inline-flex align-items-center justify-content-center mx-auto mb-3"
        style={{
          width: 56,
          height: 56,
          background: "var(--cyan-soft)",
          border: "1px solid var(--cyan)",
          fontSize: 26,
        }}
      >
        {icon || <span>📦</span>}
      </div>
      <h2 className="fs-5 fw-bold text-theme-main mb-1.5">{typograph(title)}</h2>
      <p className="text-theme-muted mx-auto mb-4" style={{ maxWidth: 460, fontSize: "0.875rem", lineHeight: 1.6 }}>
        {typograph(description)}
      </p>

      {(actionLabel || secondaryLabel) && (
        <div className="d-flex flex-wrap align-items-center justify-content-center gap-2.5">
          {actionLabel && onAction && (
            <button onClick={onAction} className="champ-btn-primary" style={{ minHeight: 44, fontSize: "0.875rem" }}>
              <span>{typograph(actionLabel)}</span>
            </button>
          )}
          {secondaryLabel && onSecondary && (
            <button onClick={onSecondary} className="champ-btn-secondary" style={{ minHeight: 44, fontSize: "0.875rem" }}>
              {typograph(secondaryLabel)}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export function LoadingSkeleton({ count = 3, className = "" }) {
  return (
    <div role="status" aria-live="polite" aria-busy="true" className={`d-flex flex-column gap-3 ${className}`}>
      <span className="visually-hidden">Загрузка данных реестра...</span>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="champ-card p-4"
          style={{ background: "var(--surface)", border: "1px solid var(--border)", opacity: 0.85 }}
        >
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div
              className="rounded-3"
              style={{ height: 20, width: "40%", background: "var(--surface-3)", animation: "pulseGlow 1.8s infinite ease-in-out" }}
            />
            <div className="rounded-pill" style={{ height: 24, width: 90, background: "var(--cyan-soft)" }} />
          </div>
          <div className="d-flex flex-column gap-2 mb-3">
            <div className="rounded-2" style={{ height: 14, width: "100%", background: "var(--surface-2)" }} />
            <div className="rounded-2" style={{ height: 14, width: "75%", background: "var(--surface-2)" }} />
          </div>
          <div className="d-flex align-items-center justify-content-between pt-2">
            <div className="rounded-3" style={{ height: 38, width: 140, background: "var(--surface-3)" }} />
            <div className="rounded-3" style={{ height: 38, width: 90, background: "var(--surface-3)" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ErrorState({
  title = "Не удалось получить данные реестра",
  description = "Не удалось подтвердить запрос или получить данные узла блокчейна. Проверьте соединение с сетью.",
  onRetry,
  retryLabel = "Повторить запрос",
  errorCode = "NODE_REQUEST_FAILED",
  className = "",
}) {
  return (
    <div
      role="alert"
      className={`champ-card text-center p-4 p-md-5 ${className}`}
      style={{ border: "1.5px solid var(--danger)", background: "var(--surface)" }}
    >
      <div
        className="rounded-3 d-inline-flex align-items-center justify-content-center mx-auto mb-3"
        style={{ width: 56, height: 56, background: "var(--danger-soft)", border: "1px solid var(--danger)", fontSize: 26, color: "var(--danger-text)" }}
      >
        ⚠️
      </div>
      <h2 className="fs-5 fw-bold text-theme-main mb-1.5">{typograph(title)}</h2>
      <p className="text-theme-muted mx-auto mb-2" style={{ maxWidth: 440, fontSize: "0.875rem", lineHeight: 1.6 }}>
        {typograph(description)}
      </p>
      {errorCode && (
        <div className="mb-4">
          <span className="champ-badge-danger mono-champ" style={{ fontSize: "0.72rem" }}>
            КОД ОШИБКИ: {errorCode}
          </span>
        </div>
      )}
      {onRetry && (
        <button onClick={onRetry} className="champ-btn-secondary" style={{ minHeight: 44, fontSize: "0.875rem", borderColor: "var(--danger)" }}>
          🔄 {typograph(retryLabel)}
        </button>
      )}
    </div>
  );
}

export function SuccessState({
  title = "Операция подтверждена",
  description = "Транзакция зафиксирована в блокчейне и подтверждена узлом сети.",
  txHash,
  actionLabel = "Вернуться к списку",
  onAction,
  className = "",
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`champ-card text-center p-4 p-md-5 ${className}`}
      style={{ border: "1.5px solid var(--success)", background: "var(--surface)" }}
    >
      <div
        className="rounded-3 d-inline-flex align-items-center justify-content-center mx-auto mb-3"
        style={{ width: 56, height: 56, background: "var(--success-soft)", border: "1px solid var(--success)", fontSize: 26, color: "var(--success-text)" }}
      >
        ✓
      </div>
      <h2 className="fs-5 fw-bold text-theme-main mb-1.5">{typograph(title)}</h2>
      <p className="text-theme-muted mx-auto mb-2" style={{ maxWidth: 440, fontSize: "0.875rem", lineHeight: 1.6 }}>
        {typograph(description)}
      </p>
      {txHash && (
        <div className="mb-4">
          <span className="champ-badge-emerald mono-champ" style={{ fontSize: "0.75rem" }}>
            TX HASH: {txHash}
          </span>
        </div>
      )}
      {actionLabel && onAction && (
        <button onClick={onAction} className="champ-btn-primary" style={{ minHeight: 44, fontSize: "0.875rem" }}>
          {typograph(actionLabel)}
        </button>
      )}
    </div>
  );
}
