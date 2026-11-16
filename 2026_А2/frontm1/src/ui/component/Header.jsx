import { useContext } from "react";
import { AtlantContext } from "../../core/context.jsx";
import { useTheme } from "../../core/themeContext.jsx";
import { NavLink, Link } from "react-router-dom";
import { typograph } from "../../core/typograph";

const Header = () => {
  const { wallet, logout, login, switchAccount, person } = useContext(AtlantContext);
  const { theme, toggleTheme } = useTheme();

  const shortAddress = wallet
    ? `${wallet.slice(0, 6)}...${wallet.slice(-4)}`
    : "";

  return (
    <header className="champ-header">
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
            <span style={{ fontSize: 20 }}>🏆</span>
          </div>
          <div>
            <div className="fw-bold tracking-tight text-theme-main leading-tight" style={{ fontSize: "1.05rem" }}>
              Профессионалы 2026
            </div>
            <div className="text-theme-muted mono-champ" style={{ fontSize: "0.68rem", letterSpacing: "0.08em" }}>
              РЕГИОНАЛЬНЫЙ ЭТАП · ЭТАЛОН КАЛИБР
            </div>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav aria-label="Разделы чемпионата" className="d-flex align-items-center gap-1.5 flex-wrap">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `champ-nav-link ${isActive ? "active" : ""}`}
          >
            🏆 {typograph("Арена")}
          </NavLink>
          <NavLink
            to="/proposal"
            className={({ isActive }) => `champ-nav-link ${isActive ? "active" : ""}`}
          >
            🗳️ {typograph("Голосования")}
          </NavLink>
          <NavLink
            to="/cabinet"
            className={({ isActive }) => `champ-nav-link ${isActive ? "active" : ""}`}
          >
            👤 {typograph("Кабинет")}
          </NavLink>
          <NavLink
            to="/func"
            className={({ isActive }) => `champ-nav-link ${isActive ? "active" : ""}`}
          >
            ⚡ {typograph("Функции DAO")}
          </NavLink>
          <NavLink
            to="/execute"
            className={({ isActive }) => `champ-nav-link ${isActive ? "active" : ""}`}
          >
            📜 {typograph("Исполненные")}
          </NavLink>
          <NavLink
            to="/logistics"
            className={({ isActive }) => `champ-nav-link ${isActive ? "active" : ""}`}
          >
            📦 {typograph("Модуль B2")}
          </NavLink>
          <NavLink
            to="/states-demo"
            className={({ isActive }) => `champ-nav-link ${isActive ? "active" : ""}`}
          >
            🎛️ {typograph("У1 Лаборатория")}
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
                  {shortAddress}
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
                {person.isDAO ? "Роль: Эксперт" : "Роль: Гость"}
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
    </header>
  );
};

export default Header;
