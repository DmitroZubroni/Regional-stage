import { useContext } from "react";
import { AtlantContext } from "../../../core/context.jsx";
import { typograph } from "../../../core/typograph";

const GetPerson = () => {
  const { person, wallet, isDemo } = useContext(AtlantContext);

  const shortAddress = wallet
    ? `${wallet.slice(0, 10)}...${wallet.slice(-8)}`
    : "—";

  return (
    <div className="champ-card p-4 p-md-5 mb-4">
      {/* Profile Header */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div className="d-flex align-items-center gap-3">
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: 16,
              background: "linear-gradient(135deg, var(--primary) 0%, var(--cyan) 100%)",
              display: "grid",
              placeItems: "center",
              fontSize: 28,
              boxShadow: "var(--primary-glow)",
              border: "2px solid #ffffff",
            }}
          >
            👨‍💻
          </div>
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <h2 className="fs-4 fw-bold text-theme-main mb-0">
                {typograph(isDemo ? "Демо-профиль DAO" : (person.role || "Участник DAO"))}
              </h2>
              <span className={person.isDAO ? "champ-badge-cyan" : "champ-badge-gold"}>
                {person.isDAO ? "Член DAO" : "Кандидат"}
              </span>
            </div>
            <div className="text-theme-muted mono-champ" style={{ fontSize: "0.82rem" }}>
              Адрес: {shortAddress}
            </div>
          </div>
        </div>

        <div className="d-flex align-items-center gap-3">
          <div
            className="p-2.5 px-3 rounded-3 text-center"
            style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
          >
            <div className="text-theme-muted mono-champ" style={{ fontSize: "0.72rem" }}>
              РЕПУТАЦИЯ
            </div>
            <div className="fs-5 fw-bold text-gold mono-champ">
              {person.reputation || 98} / 100
            </div>
          </div>
        </div>
      </div>

      {/* Balance & DAO Tokens Grid */}
      <div className="row g-3">
        {/* DAO Membership */}
        <div className="col-md-4">
          <div
            className="p-3.5 rounded-3 h-100"
            style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
          >
            <div className="text-theme-muted mono-champ mb-1" style={{ fontSize: "0.75rem" }}>
              {typograph("СТАТУС В СИСТЕМЕ DAO")}
            </div>
            <div className="fs-5 fw-bold text-theme-main mb-1">
              {person.isDAO ? "Полноправный участник" : "Требуется покупка RTK"}
            </div>
            <p className="text-theme-muted mb-0" style={{ fontSize: "0.78rem" }}>
              {person.isDAO
                ? typograph("Право создания предложений и прямого голосования активно.")
                : typograph("Приобретите токены RTK в модуле функций для вступления.")}
            </p>
          </div>
        </div>

        {/* Balance KSIPT */}
        <div className="col-md-4">
          <div
            className="p-3.5 rounded-3 h-100"
            style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
          >
            <div className="d-flex align-items-center justify-content-between mb-1">
              <span className="text-theme-muted mono-champ" style={{ fontSize: "0.75rem" }}>
                {typograph("БАЛАНС KSIPT")}
              </span>
              <span className="champ-badge-cyan" style={{ fontSize: "0.68rem" }}>ГОЛОСА</span>
            </div>
            <div className="fs-4 fw-bold mono-champ text-cyan mb-1">
              {Number(person.ksiptBalance || 0).toLocaleString("ru-RU")} KSIPT
            </div>
            <p className="text-theme-muted mb-0" style={{ fontSize: "0.78rem" }}>
              {typograph("Управленческий токен для голосования в DAO.")}
            </p>
          </div>
        </div>

        {/* Balance GERDA */}
        <div className="col-md-4">
          <div
            className="p-3.5 rounded-3 h-100"
            style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
          >
            <div className="d-flex align-items-center justify-content-between mb-1">
              <span className="text-theme-muted mono-champ" style={{ fontSize: "0.75rem" }}>
                {typograph("БАЛАНС GERDA")}
              </span>
              <span className="champ-badge-gold" style={{ fontSize: "0.68rem" }}>НАГРАДЫ</span>
            </div>
            <div className="fs-4 fw-bold mono-champ text-gold mb-1">
              {Number(person.gerdaBalance || 0).toLocaleString("ru-RU")} GERDA
            </div>
            <p className="text-theme-muted mb-0" style={{ fontSize: "0.78rem" }}>
              {typograph("Баланс токенов GERDA в вашем кошельке.")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetPerson;
