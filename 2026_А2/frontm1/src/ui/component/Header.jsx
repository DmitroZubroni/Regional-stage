import { useContext } from "react";
import { AtlantContext } from "../../core/context.jsx";
import { useTheme } from "../../core/theme.js";
import { NavLink, Link } from "react-router-dom";
import { typograph } from "../../core/typograph";

const Header = () => {
  const { wallet, logout, login, switchAccount, person, isDemo } = useContext(AtlantContext);
  const { theme, toggleTheme } = useTheme();

  const shortAddress = wallet
    ? `${wallet.slice(0, 6)}...${wallet.slice(-4)}`
    : "";

  return (
    <><a className="skip-link" href="#main-content">К содержимому</a><header className="champ-header">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 max-w-7xl mx-auto">
        {/* Championship Brand */}
        <Link to="/" className="d-flex align-items-center gap-2.5 text-decoration-none">
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              background: "linear-gradient(135deg, var(--primary) 0%, #1d4ed8 100%)",
              display: "grid",
              placeItems: "center",
              boxShadow: "var(--primary-glow)",
              border: "1px solid var(--cyan)",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 4h14v16H5zM8 11l3 3 5-7" stroke="currentColor" strokeWidth="2"/></svg>
          </div>
          <div>
            <div className="fw-bold tracking-tight text-theme-main leading-tight" style={{ fontSize: "1.05rem" }}>
              Совет DAO
            </div>
            <div className="text-theme-muted mono-champ" style={{ fontSize: "0.68rem", letterSpacing: "0.08em" }}>
              Предложения и решения
            </div>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav aria-label="Разделы DAO" className="d-flex align-items-center gap-1.5 flex-wrap">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `champ-nav-link ${isActive ? "active" : ""}`}
          >
            {typograph("Обзор")}
          </NavLink>
          <NavLink
            to="/proposal"
            className={({ isActive }) => `champ-nav-link ${isActive ? "active" : ""}`}
          >
            {typograph("Голосования")}
          </NavLink>
          <NavLink
            to="/cabinet"
            className={({ isActive }) => `champ-nav-link ${isActive ? "active" : ""}`}
          >
            {typograph("Кабинет")}
          </NavLink>
          <NavLink
            to="/func"
            className={({ isActive }) => `champ-nav-link ${isActive ? "active" : ""}`}
          >
            {typograph("Функции DAO")}
          </NavLink>
          <NavLink
            to="/execute"
            className={({ isActive }) => `champ-nav-link ${isActive ? "active" : ""}`}
          >
            {typograph("Исполненные")}
          </NavLink>
        </nav>

        {/* Action Controls & Theme Toggle */}
        <div className="d-flex align-items-center gap-2">
          {/* Theme Switcher Button (WCAG 2.2 AA target size >= 44x44px, Rule Ц7, Ц8) */}
          <button
            onClick={toggleTheme}
            className="champ-btn-secondary"
            style={{ width: 44, height: 44, padding: 0 }}
            aria-label={`Переключить на ${theme === "dark" ? "светлую" : "тёмную"} тему`}
            title={`Текущая тема: ${theme === "dark" ? "Тёмная" : "Светлая"}. Нажмите для смены`}
          >
            <span style={{ fontSize: 18 }}>{theme === "dark" ? "☀️" : "🌙"}</span>
          </button>

          {/* Wallet / Authorization State */}
          {wallet ? (
            <div className="d-flex align-items-center gap-2">
              <div
                className="d-flex align-items-center gap-2 px-3 py-1.5 rounded-3"
                style={{
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "var(--success)",
                    boxShadow: "0 0 8px var(--success)",
                  }}
                />
                <span className="mono-champ text-theme-main fw-semibold" style={{ fontSize: "0.85rem" }}>
                  {isDemo ? "Демо · " : ""}{shortAddress}
                </span>
                <span
                  className="badge px-1.5 py-0.5 rounded-pill"
                  style={{
                    fontSize: "0.68rem",
                    background: person.isDAO ? "var(--cyan-soft)" : "var(--surface-3)",
                    color: person.isDAO ? "var(--cyan-text)" : "var(--text-muted)",
                  }}
                >
                  {person.isDAO ? "DAO" : "Гость"}
                </span>
              </div>

              {/* Role Switcher Menu */}
              <button
                onClick={() => switchAccount(person.isDAO ? "guest" : "expert")}
                className="champ-btn-secondary py-1.5 px-2.5"
                style={{ minHeight: 44, fontSize: "0.78rem" }}
                title="Сменить роль (Эксперт DAO / Гость) для тестирования прав"
              >
                {person.isDAO ? "Демо: участник" : "Демо: гость"}
              </button>

              <button
                onClick={logout}
                className="champ-btn-secondary py-1.5 px-3"
                style={{ minHeight: 44, fontSize: "0.78rem" }}
                title="Выйти из аккаунта"
              >
                {typograph("Выйти")}
              </button>
            </div>
          ) : (
            <button
              onClick={login}
              className="champ-btn-primary py-1.5 px-3.5"
              style={{ minHeight: 44, fontSize: "0.82rem" }}
            >
              <span>🔑</span>
              <span>{typograph("Войти (MetaMask / Демо)")}</span>
            </button>
          )}
        </div>
      </div>
    </header></>
  );
};

export default Header;
