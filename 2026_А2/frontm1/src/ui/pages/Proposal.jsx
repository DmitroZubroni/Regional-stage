import Header from "../component/Header.jsx";
import { useEffect, useState } from "react";
import VotingService from "../../servise/VotingService.jsx";
import ProposalCard from "../component/proposalCard/ProposalCard.jsx";
import { typograph } from "../../core/typograph";
import ChampionshipHeroArt from "../component/ChampionshipHeroArt.jsx";
import { LoadingSkeleton, EmptyState } from "../component/States.jsx";

const Proposal = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const info = await VotingService.getProposalIds();
        setProposals(Array.isArray(info) ? info : []);
      } catch (err) {
        console.error("Failed to load proposals:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#080D1A" }}>
      <Header />

      <main className="container">
        {/* Championship Hero Banner */}
        <section
          className="champ-card p-4 p-md-5 mb-5"
          style={{
            background: "linear-gradient(135deg, #0F172A 0%, #1E293B 60%, #080D1A 100%)",
            border: "1px solid rgba(56, 189, 248, 0.25)",
          }}
        >
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <div className="champ-badge-cyan mb-3">
                <span>●</span>
                <span>{typograph("Чемпионат «Профессионалы 2026»")}</span>
              </div>
              <h1 className="fw-bold text-white mb-2" style={{ fontSize: "clamp(1.75rem, 4vw, 2.35rem)" }}>
                {typograph("Система консенсусного голосования и DAO")}
              </h1>
              <p className="text-secondary fs-6 mb-4" style={{ lineHeight: 1.6 }}>
                {typograph(
                  "Модуль децентрализованного голосования регионального этапа. Формирование предложений, учет кворума и автоматическое исполнение принятых смарт-контрактом решений."
                )}
              </p>

              <div className="d-flex flex-wrap gap-3">
                <div
                  className="px-3.5 py-2.5 rounded-3"
                  style={{ background: "rgba(15, 23, 42, 0.8)", border: "1px solid rgba(255, 255, 255, 0.08)" }}
                >
                  <div className="text-secondary mono-champ" style={{ fontSize: "0.75rem" }}>
                    {typograph("АКТИВНЫХ ГОЛОСОВАНИЙ")}
                  </div>
                  <div className="fs-5 fw-bold text-white mono-champ">
                    {proposals.length}
                  </div>
                </div>

                <div
                  className="px-3.5 py-2.5 rounded-3"
                  style={{ background: "rgba(15, 23, 42, 0.8)", border: "1px solid rgba(255, 255, 255, 0.08)" }}
                >
                  <div className="text-secondary mono-champ" style={{ fontSize: "0.75rem" }}>
                    {typograph("СТАТУС КОНТРАКТА")}
                  </div>
                  <div className="fs-5 fw-bold mono-champ" style={{ color: "#38BDF8" }}>
                    DEPOLYED
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-5 text-center">
              <ChampionshipHeroArt width={340} height={200} className="w-100 h-auto" />
            </div>
          </div>
        </section>

        {/* Proposals List */}
        <section>
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div>
              <h2 className="fs-4 fw-bold text-white mb-0">
                {typograph("Все зарегистрированные голосования")}
              </h2>
              <p className="text-secondary mb-0" style={{ fontSize: "0.85rem" }}>
                {typograph("Голосуйте и следите за статусом достижения кворума")}
              </p>
            </div>
            <span className="champ-badge-gold">
              {proposals.length} {typograph("предложений")}
            </span>
          </div>

          {loading ? (
            <LoadingSkeleton count={3} />
          ) : proposals.length === 0 ? (
            <EmptyState
              title="Голосования отсутствуют"
              description="В блокчейне пока не создано активных предложений для голосования."
            />
          ) : (
            <div className="d-flex flex-column gap-4">
              {proposals.map((item, idx) => (
                <div key={idx}>
                  <ProposalCard proposalId={item} />
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Proposal;
