import { useContext } from "react";
import { AtlantContext } from "../../core/context.jsx";
import { NavLink, Link } from "react-router-dom";
import { typograph } from "../../core/typograph";

const Header = () => {
  const { isAuthorized, logout } = useContext(AtlantContext);

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
            <span style={{ fontSize: 18 }}>📦</span>
          </div>
          <div>
            <div className="fw-bold tracking-tight text-white leading-tight" style={{ fontSize: "1.05rem" }}>
              Waves Post Office
            </div>
            <div className="text-secondary mono-champ" style={{ fontSize: "0.68rem", letterSpacing: "0.08em" }}>
              ПРОФЕССИОНАЛЫ 2026 · МОДУЛЬ B2
            </div>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav aria-label="Разделы логистического сервиса" className="d-flex align-items-center gap-1.5 flex-wrap">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `champ-nav-link ${isActive ? "active" : ""}`}
          >
            {typograph("Отправления")}
          </NavLink>
          <NavLink
            to="/state"
            className={({ isActive }) => `champ-nav-link ${isActive ? "active" : ""}`}
          >
            {typograph("Реестр блокчейна")}
          </NavLink>
          <NavLink
            to="/userInfo"
            className={({ isActive }) => `champ-nav-link ${isActive ? "active" : ""}`}
          >
            {typograph("Профиль клиента")}
          </NavLink>
          {isAuthorized && (
            <>
              <NavLink
                to="/employee"
                className={({ isActive }) => `champ-nav-link ${isActive ? "active" : ""}`}
              >
                {typograph("Сотрудник")}
              </NavLink>
              <NavLink
                to="/admin"
                className={({ isActive }) => `champ-nav-link ${isActive ? "active" : ""}`}
              >
                {typograph("Администрирование")}
              </NavLink>
            </>
          )}
        </nav>

        {/* Session Status */}
        <div className="d-flex align-items-center gap-2">
          {isAuthorized ? (
            <div className="d-flex align-items-center gap-2">
              <span className="champ-badge-emerald">● Сессия активна</span>
              <button
                onClick={logout}
                className="champ-btn-secondary py-1.5 px-3"
                style={{ minHeight: 38, fontSize: "0.8rem" }}
              >
                {typograph("Выйти")}
              </button>
            </div>
          ) : (
            <span className="champ-badge-amber">Требуется авторизация</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
