import { useContext } from "react";
import { AtlantContext } from "../../core/context.jsx";
import { useTheme } from "../../core/theme.js";
import { NavLink, Link } from "react-router-dom";
import { typograph } from "../../core/typograph";

const Header = () => {
  const { isAuthorized, logout } = useContext(AtlantContext);
  const { theme, toggleTheme } = useTheme();

  return (
    <><a className="skip-link" href="#main-content">К содержимому</a><header className="champ-header">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 max-w-7xl mx-auto">
        {/* Championship Brand */}
        <Link to="/" className="d-flex align-items-center gap-2.5 text-decoration-none">
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              background: "linear-gradient(135deg, var(--primary) 0%, #1d4ed8 100%)",
              display: "grid",
              placeItems: "center",
              boxShadow: "var(--primary-glow)",
              border: "1px solid var(--cyan)",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 5h18v14H3zM3 5l9 8 9-8" stroke="currentColor" strokeWidth="2"/></svg>
          </div>
          <div>
            <div className="fw-bold tracking-tight text-theme-main leading-tight" style={{ fontSize: "1.05rem" }}>
              Waves Post Office
            </div>
            <div className="text-theme-muted mono-champ" style={{ fontSize: "0.68rem", letterSpacing: "0.08em" }}>
              Отправления и переводы
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

        {/* Session Status & Theme Toggle */}
        <div className="d-flex align-items-center gap-2">
          {/* Theme Switcher Button (WCAG 2.2 AA target size >= 44x44px, Rule Ц7, Ц8) */}
          <button
            onClick={toggleTheme}
            className="champ-btn-secondary"
            style={{ width: 44, height: 44, padding: 0 }}
            aria-label={`Переключить на ${theme === "dark" ? "светлую" : "тёмную"} тему`}
            title={`Текущая тема: ${theme === "dark" ? "Тёмная" : "Светлая"}. Нажмите для смены`}
          >
            <span style={{ fontSize: 18 }} aria-hidden="true">{theme === "dark" ? "☀️" : "🌙"}</span>
          </button>

          {isAuthorized ? (
            <div className="d-flex align-items-center gap-2">
              <span className="champ-badge-emerald">
                <span className="pulse-glow" aria-hidden="true">●</span>
                <span>{typograph("Сессия активна")}</span>
              </span>
              <button
                onClick={logout}
                className="champ-btn-secondary py-1.5 px-3"
                style={{ minHeight: 44, fontSize: "0.8rem" }}
              >
                {typograph("Выйти")}
              </button>
            </div>
          ) : (
            <span className="champ-badge-warning">{typograph("Требуется авторизация")}</span>
          )}
        </div>
      </div>
    </header></>
  );
};

export default Header;
