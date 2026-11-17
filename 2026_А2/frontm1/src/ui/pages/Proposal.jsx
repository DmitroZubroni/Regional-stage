import Header from "../component/Header.jsx";
import { useEffect, useState } from "react";
import VotingService from "../../servise/VotingService.jsx";
import ProposalCard from "../component/proposalCard/ProposalCard.jsx";
import { typograph } from "../../core/typograph";
import ChampionshipHeroArt from "../component/ChampionshipHeroArt.jsx";
import {
  LoadingSkeleton,
  EmptyState,
  ErrorState,
  SuccessState,
  StateSwitcherBar,
} from "../component/States.jsx";
import { Link } from "react-router-dom";

const Proposal = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeState, setActiveState] = useState("normal"); // normal, loading, empty, error, success
  const [searchQuery, setSearchQuery] = useState("");

  const loadProposals = async () => {
    setLoading(true);
    try {
      const info = await VotingService.getProposalIds();
      setProposals(Array.isArray(info) ? info : []);
    } catch (err) {
      console.error("Failed to load proposals:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProposals();
  }, []);

  const filteredProposals = proposals.filter((id) =>
    searchQuery ? String(id).includes(searchQuery) : true
  );

  return (
    <div style={{ minHeight: "100vh" }}>
      <Header />

      <main id="main-content" className="container">
        {/* Championship Hero Banner */}
        <section className="champ-hero-card p-4 p-md-5 mb-5">
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <div className="champ-badge-cyan mb-3">
                <span className="pulse-glow">●</span>
                <span>{typograph("Предложения DAO")}</span>
              </div>
              <h1 className="fw-bold text-theme-main mb-2" style={{ fontSize: "clamp(1.75rem, 4vw, 2.35rem)" }}>
                {typograph("Система консенсусного голосования и DAO")}
              </h1>
              <p className="text-theme-muted fs-6 mb-4" style={{ lineHeight: 1.6 }}>
                {typograph(
                  "Создавайте предложения, голосуйте и следите за исполнением решений DAO."
                )}
              </p>

              <div className="d-flex flex-wrap gap-3">
                <div
                  className="px-3.5 py-2.5 rounded-3"
                  style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
                >
                  <div className="text-theme-muted mono-champ" style={{ fontSize: "0.75rem" }}>
                    {typograph("АКТИВНЫХ ГОЛОСОВАНИЙ")}
                  </div>
                  <div className="fs-5 fw-bold text-theme-main mono-champ">
                    {proposals.length}
                  </div>
                </div>

                <div
                  className="px-3.5 py-2.5 rounded-3"
                  style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
                >
                  <div className="text-theme-muted mono-champ" style={{ fontSize: "0.75rem" }}>
                    {typograph("СТАТУС КОНТРАКТА")}
                  </div>
                  <div className="fs-5 fw-bold mono-champ text-cyan">
                    DEPLOYED · ACTIVE
                  </div>
                </div>

                <Link
                  to="/func"
                  className="champ-btn-primary ms-auto my-auto"
                  style={{ minHeight: 44 }}
                >
                  <span>➕ {typograph("Создать предложение")}</span>
                </Link>
              </div>
            </div>

            <div className="col-lg-5 text-center">
              <ChampionshipHeroArt width={340} height={200} className="w-100 h-auto" />
            </div>
          </div>
        </section>

        {/* Rule У1 Demonstration Toolbar */}
        {["review", "dev"].some(key => new URLSearchParams(window.location.search).has(key)) && (<details className="preview-states"><summary>Предпросмотр состояний интерфейса</summary><p>Демонстрационные сообщения не отражают состояние транзакций.</p><StateSwitcherBar activeState={activeState} onChangeState={setActiveState} /></details>)}

        {/* Dynamic Render based on Active State */}
        {activeState === "loading" && <LoadingSkeleton count={3} />}

        {activeState === "empty" && (
          <EmptyState
            title="Нет зарегистрированных голосований"
            description="В текущем раунде ещё не опубликовано активных инициатив. Вы можете создать первое предложение через модуль функций смарт-контракта."
            actionLabel="Перейти к созданию предложения"
            onAction={() => (window.location.href = "/func")}
          />
        )}

        {activeState === "error" && (
          <ErrorState
            title="Ошибка синхронизации смарт-контракта голосования"
            description="Узел блокчейна не ответил вовремя при вызове getProposalIds(). Нажмите кнопку ниже для повторной попытки."
            onRetry={() => {
              setActiveState("normal");
              loadProposals();
            }}
          />
        )}

        {activeState === "success" && (
          <SuccessState
            title="Голосование успешно завершено"
            description="Предпросмотр сообщения об успешном завершении голосования."
            actionLabel="Смотреть список исполненных"
            onAction={() => (window.location.href = "/execute")}
          />
        )}

        {activeState === "normal" && (
          <>
            {loading ? (
              <LoadingSkeleton count={3} />
            ) : filteredProposals.length === 0 ? (
              <EmptyState
                title="Предложений не найдено"
                description="Нет предложений, удовлетворяющих заданным критериям поиска."
                actionLabel="Сбросить поиск"
                onAction={() => setSearchQuery("")}
              />
            ) : (
              <section>
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
                  <div>
                    <h2 className="fs-4 fw-bold text-theme-main mb-0">
                      {typograph("Все зарегистрированные голосования")}
                    </h2>
                    <p className="text-theme-muted mb-0" style={{ fontSize: "0.85rem" }}>
                      {typograph("Голосуйте и следите за статусом достижения кворума")}
                    </p>
                  </div>

                  <div className="d-flex align-items-center gap-3">
                    <label htmlFor="proposal-search">Поиск по ID<input
                      id="proposal-search"
                      type="text"
                      className="champ-input"
                      placeholder="ID предложения"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ maxWidth: 180, minHeight: 44, fontSize: "0.82rem" }}
                    /></label>
                    <span className="champ-badge-gold">
                      {filteredProposals.length} {typograph("предложений")}
                    </span>
                  </div>
                </div>

                <div className="d-flex flex-column gap-3">
                  {filteredProposals.map((id) => (
                    <ProposalCard key={id} proposalId={id} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Proposal;
