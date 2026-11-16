import React from "react";
import { typograph } from "../../core/typograph";

export function EmptyState({
  title = "Предложения отсутствуют",
  description = "В текущем смарт-контракте пока не зарегистрировано активных предложений. Вы можете создать первое голосование.",
  actionLabel = "Создать предложение",
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
        {icon || <span>🏆</span>}
      </div>
      <h3 className="fs-5 fw-bold text-theme-main mb-1.5">
        {typograph(title)}
      </h3>
      <p className="text-theme-muted mx-auto mb-4" style={{ maxWidth: 460, fontSize: "0.875rem", lineHeight: 1.6 }}>
        {typograph(description)}
      </p>

      {(actionLabel || secondaryLabel) && (
        <div className="d-flex flex-wrap align-items-center justify-content-center gap-2.5">
          {actionLabel && onAction && (
            <button
              onClick={onAction}
              className="champ-btn-primary"
              style={{ minHeight: 44, fontSize: "0.875rem" }}
            >
              <span>{typograph(actionLabel)}</span>
            </button>
          )}
          {secondaryLabel && onSecondary && (
            <button
              onClick={onSecondary}
              className="champ-btn-secondary"
              style={{ minHeight: 44, fontSize: "0.875rem" }}
            >
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
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={`d-flex flex-column gap-3 ${className}`}
    >
      <span className="visually-hidden">Загрузка данных чемпионата...</span>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="champ-card p-4"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            opacity: 0.85,
          }}
        >
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div
              className="rounded-3"
              style={{
                height: 20,
                width: "40%",
                background: "var(--surface-3)",
                animation: "pulseGlow 1.8s infinite ease-in-out",
              }}
            />
            <div
              className="rounded-pill"
              style={{
                height: 24,
                width: 90,
                background: "var(--cyan-soft)",
              }}
            />
          </div>
          <div className="d-flex flex-column gap-2 mb-3">
            <div
              className="rounded-2"
              style={{ height: 14, width: "100%", background: "var(--surface-2)" }}
            />
            <div
              className="rounded-2"
              style={{ height: 14, width: "75%", background: "var(--surface-2)" }}
            />
          </div>
          <div className="d-flex align-items-center justify-content-between pt-2">
            <div
              className="rounded-3"
              style={{ height: 38, width: 140, background: "var(--surface-3)" }}
            />
            <div
              className="rounded-3"
              style={{ height: 38, width: 90, background: "var(--surface-3)" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ErrorState({
  title = "Ошибка вызова смарт-контракта",
  description = "Не удалось подтвердить транзакцию или получить данные узла блокчейна. Проверьте соединение с сетью или переключитесь в демо-режим.",
  onRetry,
  retryLabel = "Повторить запрос",
  errorCode = "EVM_CALL_TIMEOUT",
  className = "",
}) {
  return (
    <div
      role="alert"
      className={`champ-card text-center p-4 p-md-5 ${className}`}
      style={{
        border: "1.5px solid var(--danger)",
        background: "var(--surface)",
      }}
    >
      <div
        className="rounded-3 d-inline-flex align-items-center justify-content-center mx-auto mb-3"
        style={{
          width: 56,
          height: 56,
          background: "var(--danger-soft)",
          border: "1px solid var(--danger)",
          fontSize: 26,
          color: "var(--danger-text)",
        }}
      >
        ⚠️
      </div>
      <h3 className="fs-5 fw-bold text-theme-main mb-1.5">
        {typograph(title)}
      </h3>
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
        <button
          onClick={onRetry}
          className="champ-btn-secondary"
          style={{ minHeight: 44, fontSize: "0.875rem", borderColor: "var(--danger)" }}
        >
          🔄 {typograph(retryLabel)}
        </button>
      )}
    </div>
  );
}

export function SuccessState({
  title = "Транзакция успешно подтверждена",
  description = "Голос или команда смарт-контракта зафиксированы в блоке с подтверждением кворума.",
  txHash = "0x8fa4c3b7...d219",
  actionLabel = "Вернуться к списку",
  onAction,
  className = "",
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`champ-card text-center p-4 p-md-5 ${className}`}
      style={{
        border: "1.5px solid var(--success)",
        background: "var(--surface)",
      }}
    >
      <div
        className="rounded-3 d-inline-flex align-items-center justify-content-center mx-auto mb-3"
        style={{
          width: 56,
          height: 56,
          background: "var(--success-soft)",
          border: "1px solid var(--success)",
          fontSize: 26,
          color: "var(--success-text)",
        }}
      >
        ✓
      </div>
      <h3 className="fs-5 fw-bold text-theme-main mb-1.5">
        {typograph(title)}
      </h3>
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
        <button
          onClick={onAction}
          className="champ-btn-primary"
          style={{ minHeight: 44, fontSize: "0.875rem" }}
        >
          {typograph(actionLabel)}
        </button>
      )}
    </div>
  );
}

export function StateSwitcherBar({ activeState, onChangeState }) {
  return (
    <div
      className="p-2.5 rounded-3 mb-4 d-flex flex-wrap align-items-center justify-content-between gap-2"
      style={{
        background: "var(--surface-2)",
        border: "1px solid var(--border)",
      }}
      role="toolbar"
      aria-label="Демонстратор 4 состояний экрана по правилу У1"
    >
      <div className="d-flex align-items-center gap-2">
        <span className="champ-badge-gold" style={{ fontSize: "0.7rem" }}>
          ПРАВИЛО У1
        </span>
        <span className="text-theme-muted" style={{ fontSize: "0.8rem", fontWeight: 600 }}>
          {typograph("Эмуляция состояний экрана:")}
        </span>
      </div>

      <div className="d-flex align-items-center gap-1.5 flex-wrap">
        {[
          { key: "normal", label: "Штатный (Success/Data)", icon: "🟢" },
          { key: "loading", label: "Загрузка (Skeleton)", icon: "⏳" },
          { key: "empty", label: "Пусто (EmptyState)", icon: "📭" },
          { key: "error", label: "Ошибка (Error + Retry)", icon: "⚠️" },
          { key: "success", label: "Успех (Action Done)", icon: "✅" },
        ].map((s) => (
          <button
            key={s.key}
            onClick={() => onChangeState(s.key)}
            className={`champ-tab-btn ${activeState === s.key ? "active" : ""}`}
            style={{ minHeight: 44, fontSize: "0.78rem", padding: "0.3rem 0.75rem" }}
          >
            <span>{s.icon}</span>
            <span>{typograph(s.label)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
