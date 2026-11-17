import Icon from "../Icon.jsx";
import { useContext, useEffect, useState } from "react";
import { AtlantContext } from "../../../core/context.jsx";
import VotingService from "../../../servise/VotingService.jsx";
import { typograph } from "../../../core/typograph";
import { EmptyState } from "../States.jsx";
import { Link } from "react-router-dom";

const GetDelegates = () => {
  const { wallet } = useContext(AtlantContext);
  const [delegates, setDelegates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const info = await VotingService.getDelegates(wallet);
        setDelegates(Array.isArray(info) ? info : []);
      } catch (err) {
        console.error("Failed to load delegates:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [wallet]);

  return (
    <div className="champ-card p-4 p-md-5 mb-4">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <h3 className="fs-5 fw-bold text-theme-main mb-0">
              {typograph("Активные делегации голосов")}
            </h3>
            <span className="champ-badge-cyan">
              {delegates.length} {typograph("адресов")}
            </span>
          </div>
          <p className="text-theme-muted mb-0" style={{ fontSize: "0.85rem" }}>
            {typograph(
              "Адреса доверенных экспертов и участников, которым передано право голосования вашим весом токенов."
            )}
          </p>
        </div>

        <Link to="/func" className="champ-btn-primary py-2 px-3" style={{ minHeight: 44, fontSize: "0.82rem" }}>
          <span><Icon kind="plus" /> {typograph("Делегировать голоса")}</span>
        </Link>
      </div>

      {loading ? (
        <div className="d-flex flex-column gap-2.5">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="p-3.5 rounded-3"
              style={{ background: "var(--surface-2)", height: 64, animation: "pulseGlow 2s infinite ease-in-out" }}
            />
          ))}
        </div>
      ) : delegates.length === 0 ? (
        <EmptyState
          title="Делегации отсутствуют"
          description="Вы ещё не делегировали право голоса другим экспертам. Вы голосуете самостоятельно."
          actionLabel="Настроить делегирование"
          onAction={() => (window.location.href = "/func")}
        />
      ) : (
        <div className="d-flex flex-column gap-3">
          {delegates.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-3 d-flex flex-wrap align-items-center justify-content-between gap-3"
              style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
            >
              <div className="d-flex align-items-center gap-3">
                <div
                  className="rounded-2 d-grid place-items-center fw-bold text-white mono-champ"
                  style={{
                    width: 36,
                    height: 36,
                    background: "var(--primary)",
                    fontSize: "0.85rem",
                  }}
                >
                  #{idx + 1}
                </div>
                <div>
                  <div className="fw-semibold text-theme-main mono-champ" style={{ fontSize: "0.88rem" }}>
                    {item}
                  </div>
                  <div className="text-theme-muted" style={{ fontSize: "0.75rem" }}>
                    Статус: Активный делегат · Кворум подтверждён
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2">
                <span className="champ-badge-emerald">Активно</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetDelegates;
