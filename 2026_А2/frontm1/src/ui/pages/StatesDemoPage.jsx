import React, { useState } from "react";
import Header from "../component/Header.jsx";
import { typograph } from "../../core/typograph";
import {
  EmptyState,
  LoadingSkeleton,
  ErrorState,
  SuccessState,
  StateSwitcherBar,
} from "../component/States.jsx";

export default function StatesDemoPage() {
  const [activeState, setActiveState] = useState("normal");
  const [retryCount, setRetryCount] = useState(0);

  const handleRetry = () => {
    setRetryCount((c) => c + 1);
    setActiveState("loading");
    setTimeout(() => {
      setActiveState("normal");
    }, 800);
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <Header />

      <main className="container">
        <section className="champ-hero-card p-4 p-md-5 mb-5">
          <div className="d-flex align-items-center gap-2 mb-2">
            <span className="champ-badge-gold">СТАНДАРТ «КАЛИБР»</span>
            <span className="champ-badge-cyan">ПРАВИЛО У1 · 4 СОСТОЯНИЯ</span>
          </div>
          <h1 className="fs-3 fw-bold text-theme-main mb-2">
            {typograph("Интерактивная лаборатория состояний экрана (У1)")}
          </h1>
          <p className="text-theme-muted mb-0" style={{ maxWidth: 650, fontSize: "0.9rem", lineHeight: 1.6 }}>
            {typograph(
              "Согласно правилу У1 методички Калибр, каждый экран обязан иметь 4 проработанных состояния: Пустое (Empty), Загрузка (LoadingSkeleton без скачков макета), Ошибка (с человеческим пояснением и кнопкой повтора) и Успех (Success)."
            )}
          </p>
        </section>

        {/* State Switcher Controls */}
        <StateSwitcherBar activeState={activeState} onChangeState={setActiveState} />

        <div className="champ-card p-4 p-md-5 mb-4">
          <div className="d-flex align-items-center justify-content-between mb-4 pb-3 border-bottom border-theme">
            <div>
              <span className="text-theme-muted mono-champ" style={{ fontSize: "0.75rem" }}>
                ТЕКУЩЕЕ СОСТОЯНИЕ В ЭФИРЕ:
              </span>
              <h2 className="fs-4 fw-bold text-theme-main mb-0 text-uppercase">
                {activeState === "normal" && "Штатный режим с данными (Normal)"}
                {activeState === "loading" && "Загрузка данных (Skeleton)"}
                {activeState === "empty" && "Пустое состояние (EmptyState)"}
                {activeState === "error" && `Состояние сбоя (ErrorState) · Повторов: ${retryCount}`}
                {activeState === "success" && "Успешное завершение действия (SuccessState)"}
              </h2>
            </div>
            <span className="champ-badge-cyan mono-champ">
              {activeState.toUpperCase()}
            </span>
          </div>

          {/* Dynamic Switcher */}
          {activeState === "loading" && (
            <div>
              <div className="mb-3 text-theme-muted" style={{ fontSize: "0.85rem" }}>
                {typograph(
                  "Скелетон повторяет геометрию реальных карточек голосований, полностью исключая сдвиг макета (CLS = 0)."
                )}
              </div>
              <LoadingSkeleton count={3} />
            </div>
          )}

          {activeState === "empty" && (
            <EmptyState
              title="Предложения голосования отсутствуют"
              description="В данном смарт-контракте ещё не зарегистрировано инициатив. Нажмите кнопку ниже, чтобы создать первое предложение."
              actionLabel="Создать предложение"
              onAction={() => setActiveState("normal")}
              secondaryLabel="Обновить данные"
              onSecondary={() => setActiveState("loading")}
            />
          )}

          {activeState === "error" && (
            <ErrorState
              title="Не удалось связаться со смарт-контрактом голосования"
              description="RPC-нода блокчейна отклонила входящий запрос или превышен интервал ожидания подтверждения блока. Проверьте сеть."
              errorCode="RPC_TIMEOUT_GATEWAY_504"
              onRetry={handleRetry}
              retryLabel={`Повторить запрос (Попытка ${retryCount + 1})`}
            />
          )}

          {activeState === "success" && (
            <SuccessState
              title="Транзакция голосования успешно подтверждена"
              description="Ваш голос весом 50 KSIPT учтён в смарт-контракте. Кворум предложения пересчитан в реальном времени."
              txHash="0x72d98788997e874819a3E6371f47Fe8E46348193a89bc"
              actionLabel="Просмотреть в реестре предложений"
              onAction={() => (window.location.href = "/proposal")}
            />
          )}

          {activeState === "normal" && (
            <div>
              <div className="p-3.5 rounded-3 mb-4" style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
                <div className="d-flex align-items-center gap-2 text-theme-main fw-bold mb-1">
                  <span>✓</span>
                  <span>Штатный режим отображения данных готов к работе</span>
                </div>
                <p className="text-theme-muted mb-0" style={{ fontSize: "0.85rem" }}>
                  {typograph(
                    "Используйте переключатель вверху страницы для проверки каждого из 4 состояний. Все цвета синхронизированы через токены и мгновенно адаптируются при переключении темы (☀️/🌙)."
                  )}
                </p>
              </div>

              {/* Sample card in normal state */}
              <div className="p-4 rounded-3 border border-theme" style={{ background: "var(--surface)" }}>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h3 className="fs-5 fw-bold text-theme-main mb-0">
                    {typograph("Пример рабочей карточки: Предложение #1")}
                  </h3>
                  <span className="champ-badge-emerald">АКТИВНО · КВОРУМ 75%</span>
                </div>
                <p className="text-theme-muted mb-3" style={{ fontSize: "0.85rem" }}>
                  {typograph(
                    "Фиксация протокола начисления наградных баллов за прохождение модулей А2, B2, C2, D2."
                  )}
                </p>
                <div className="d-flex align-items-center gap-2">
                  <button onClick={() => setActiveState("loading")} className="champ-btn-secondary py-1.5 px-3" style={{ minHeight: 38, fontSize: "0.8rem" }}>
                    Эмулировать загрузку
                  </button>
                  <button onClick={() => setActiveState("empty")} className="champ-btn-secondary py-1.5 px-3" style={{ minHeight: 38, fontSize: "0.8rem" }}>
                    Эмулировать пусто
                  </button>
                  <button onClick={() => setActiveState("error")} className="champ-btn-secondary py-1.5 px-3" style={{ minHeight: 38, fontSize: "0.8rem", borderColor: "var(--danger)" }}>
                    Эмулировать ошибку
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
