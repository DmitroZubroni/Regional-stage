import Icon from "../Icon.jsx";
import { useEffect, useState } from "react";
import VotingService from "../../../servise/VotingService.jsx";
import { typograph } from "../../../core/typograph";
import { EmptyState, LoadingSkeleton } from "../States.jsx";
import { Link } from "react-router-dom";

const GetExecute = () => {
  const [execute, setExecute] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const info = await VotingService.getExecuteIds();
        setExecute(Array.isArray(info) ? info : []);
      } catch (e) {
        console.error("Failed to load executed proposals:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="champ-card p-4 p-md-5 mb-4">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <h2 className="fs-4 fw-bold text-theme-main mb-0">
              {typograph("Реестр исполненных смарт-контрактом решений")}
            </h2>
            <span className="champ-badge-emerald">
              {execute.length} {typograph("решений")}
            </span>
          </div>
          <p className="text-theme-muted mb-0" style={{ fontSize: "0.85rem" }}>
            {typograph(
              "Предложения, успешно преодолевшие порог кворума и автоматически исполненные контрактом голосования."
            )}
          </p>
        </div>

        <Link to="/proposal" className="champ-btn-secondary py-2 px-3" style={{ minHeight: 44, fontSize: "0.82rem" }}>
          <span><Icon kind="vote" /> {typograph("Текущие голосования")}</span>
        </Link>
      </div>

      {loading ? (
        <LoadingSkeleton count={2} />
      ) : execute.length === 0 ? (
        <EmptyState
          title="Нет исполненных решений"
          description="Пока ни одно предложение не завершило цикл исполнения. Проверьте статус активных голосований."
          actionLabel="Перейти к голосованиям"
          onAction={() => (window.location.href = "/proposal")}
        />
      ) : (
        <div className="d-flex flex-column gap-3">
          {execute.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-3 d-flex flex-wrap align-items-center justify-content-between gap-3"
              style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
            >
              <div className="d-flex align-items-center gap-3">
                <div
                  className="rounded-3 d-grid place-items-center text-white"
                  style={{
                    width: 44,
                    height: 44,
                    background: "linear-gradient(135deg, var(--success) 0%, #059669 100%)",
                    fontSize: 20,
                  }}
                >
                  <Icon kind="check" />
                </div>
                <div>
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <h3 className="fs-6 fw-bold text-theme-main mb-0">
                      {typograph(`Исполненное решение #${item}`)}
                    </h3>
                    <span className="champ-badge-emerald" style={{ fontSize: "0.7rem" }}>
                      ИСПОЛНЕНО В СЕТИ
                    </span>
                  </div>
                  <div className="text-theme-muted mono-champ" style={{ fontSize: "0.78rem" }}>
                    ID контракта: 0x72d9...8193 · Статус: Кворум 100% зафиксирован
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2">
                <span className="text-theme-muted mono-champ" style={{ fontSize: "0.8rem" }}>
                  Блок #14209
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetExecute;
