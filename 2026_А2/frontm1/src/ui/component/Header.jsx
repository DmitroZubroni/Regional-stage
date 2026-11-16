import { useContext } from "react";
import { AtlantContext } from "../../core/context.jsx";
import { NavLink, Link } from "react-router-dom";
import { typograph } from "../../core/typograph";

const Header = () => {
  const { wallet, logout } = useContext(AtlantContext);

  const shortAddress = wallet
    ? `${wallet.slice(0, 6)}...${wallet.slice(-4)}`
    : "";

  return (
    <header className="champ-header">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 max-w-7xl mx-auto">
        {/* Championship Brand */}
        <Link to="/" className="d-flex align-items-center gap-2.5 text-decoration-none text-white">
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
              display: "grid",
              placeItems: "center",
              boxShadow: "0 0 16px rgba(56, 189, 248, 0.4)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <span style={{ fontSize: 18 }}>🏆</span>
          </div>
          <div>
            <div className="fw-bold tracking-tight text-white leading-tight" style={{ fontSize: "1.05rem" }}>
              Профессионалы 2026
            </div>
            <div className="text-secondary mono-champ" style={{ fontSize: "0.68rem", letterSpacing: "0.08em" }}>
              РЕГИОНАЛЬНЫЙ ЭТАП · БЛОКЧЕЙН
            </div>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav aria-label="Разделы голосования чемпионата" className="d-flex align-items-center gap-1.5 flex-wrap">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `champ-nav-link ${isActive ? "active" : ""}`}
          >
            {typograph("Кабинет")}
          </NavLink>
          <NavLink
            to="/proposal"
            className={({ isActive }) => `champ-nav-link ${isActive ? "active" : ""}`}
          >
            {typograph("Все голосования")}
          </NavLink>
          <NavLink
            to="/execute"
            className={({ isActive }) => `champ-nav-link ${isActive ? "active" : ""}`}
          >
            {typograph("Исполненные предложения")}
          </NavLink>
          <NavLink
            to="/func"
            className={({ isActive }) => `champ-nav-link ${isActive ? "active" : ""}`}
          >
            {typograph("Функции")}
          </NavLink>
        </nav>

        {/* Wallet Status */}
        <div className="d-flex align-items-center gap-2">
          {wallet ? (
            <div className="d-flex align-items-center gap-2">
              <div
                className="d-flex align-items-center gap-2 px-3 py-1.5 rounded-3"
                style={{
                  background: "#1E293B",
                  border: "1px solid rgba(56, 189, 248, 0.3)",
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#10B981",
                    boxShadow: "0 0 8px #10B981",
                  }}
                />
                <span className="mono-champ text-white fw-semibold" style={{ fontSize: "0.85rem" }}>
                  {shortAddress}
                </span>
              </div>
              <button
                onClick={logout}
                className="champ-btn-secondary py-1.5 px-3"
                style={{ minHeight: 38, fontSize: "0.8rem" }}
                title="Отключить аккаунт"
              >
                {typograph("Выйти")}
              </button>
            </div>
          ) : (
            <span className="champ-badge-amber">Не авторизован</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
