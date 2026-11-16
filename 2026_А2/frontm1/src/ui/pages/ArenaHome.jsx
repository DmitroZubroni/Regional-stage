import React from "react";
import Header from "../component/Header.jsx";
import Championship3DArena from "../component/Championship3DArena.jsx";
import TournamentBracket from "../component/TournamentBracket.jsx";
import ChampionshipHeroArt from "../component/ChampionshipHeroArt.jsx";
import { typograph } from "../../core/typograph";
import { Link, useNavigate } from "react-router-dom";

export default function ArenaHome() {
  const navigate = useNavigate();

  const handleSelectModule = (letter) => {
    if (letter === "A") navigate("/proposal");
    else if (letter === "B") navigate("/logistics");
    else if (letter === "C") navigate("/func");
    else navigate("/cabinet");
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <Header />

      <main className="container">
        {/* Championship Grand Hero Banner */}
        <section className="champ-hero-card p-4 p-md-5 mb-5">
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <div className="d-flex align-items-center gap-2 mb-3">
                <span className="champ-badge-cyan">
                  <span className="pulse-glow">●</span>
                  <span>{typograph("Всероссийский чемпионат «Профессионалы 2026»")}</span>
                </span>
                <span className="champ-badge-gold">РЕГИОНАЛЬНЫЙ ЭТАП</span>
              </div>

              <h1 className="fw-bold text-theme-main mb-2.5" style={{ fontSize: "clamp(2rem, 4.5vw, 2.75rem)", lineHeight: 1.15 }}>
                {typograph("Цифровая арена чемпионата высоких технологий")}
              </h1>

              <p className="text-theme-muted fs-6 mb-4" style={{ lineHeight: 1.65, maxWidth: 620 }}>
                {typograph(
                  "Компетенция «Блокчейн-технологии и смарт-контракты». Официальная платформа регионального этапа: интерактивная 3D-арена, динамичные турнирные сетки, голосование DAO и сквозная логистика."
                )}
              </p>

              <div className="d-flex flex-wrap align-items-center gap-3">
                <Link to="/proposal" className="champ-btn-primary">
                  <span>🗳️</span>
                  <span>{typograph("Открыть голосования DAO (Модуль А2)")}</span>
                </Link>
                <Link to="/logistics" className="champ-btn-secondary">
                  <span>📦</span>
                  <span>{typograph("Смарт-логистика (Модуль B2)")}</span>
                </Link>
                <Link to="/cabinet" className="champ-btn-secondary">
                  <span>👤</span>
                  <span>{typograph("Личный кабинет")}</span>
                </Link>
              </div>
            </div>

            <div className="col-lg-5 text-center">
              <ChampionshipHeroArt width={360} height={210} className="w-100 h-auto" />
            </div>
          </div>
        </section>

        {/* 1. Interactive 3D Arena */}
        <section aria-label="3D Арена соревнований">
          <Championship3DArena onSelectModule={handleSelectModule} />
        </section>

        {/* 2. Dynamic Tournament Brackets & Countdown Timers */}
        <section aria-label="Турнирная сетка и таймер этапа">
          <TournamentBracket />
        </section>

        {/* 3. The 4 Championship Modules Grid */}
        <section className="mb-5">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div>
              <h2 className="fs-4 fw-bold text-theme-main mb-0">
                {typograph("Соревновательные модули чемпионата")}
              </h2>
              <p className="text-theme-muted mb-0" style={{ fontSize: "0.85rem" }}>
                {typograph("Архитектура заданий и критерии оценивания экспертного сообщества")}
              </p>
            </div>
            <span className="champ-badge-gold">4 МОДУЛЯ</span>
          </div>

          <div className="row g-4">
            {/* Module A2 */}
            <div className="col-md-6">
              <div className="champ-card p-4 h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span className="champ-badge-cyan">МОДУЛЬ А2 · EVM</span>
                    <span className="mono-champ text-theme-muted" style={{ fontSize: "0.78rem" }}>ВЕС: 35 БАЛЛОВ</span>
                  </div>
                  <h3 className="fs-5 fw-bold text-theme-main mb-2">
                    {typograph("Система консенсусного голосования и DAO")}
                  </h3>
                  <p className="text-theme-muted mb-3" style={{ fontSize: "0.875rem", lineHeight: 1.5 }}>
                    {typograph(
                      "Разработка смарт-контрактов голосования, выпуск токенов RTK, делегирование прав и автоматическое исполнение решений при достижении кворума."
                    )}
                  </p>
                </div>
                <div className="d-flex align-items-center justify-content-between pt-3 border-top border-theme">
                  <span className="mono-champ fw-bold text-cyan" style={{ fontSize: "0.82rem" }}>
                    Solidity · Web3 · React
                  </span>
                  <Link to="/proposal" className="champ-btn-primary py-1.5 px-3" style={{ minHeight: 38, fontSize: "0.82rem" }}>
                    {typograph("Открыть модуль →")}
                  </Link>
                </div>
              </div>
            </div>

            {/* Module B2 */}
            <div className="col-md-6">
              <div className="champ-card p-4 h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span className="champ-badge-cyan">МОДУЛЬ B2 · WAVES</span>
                    <span className="mono-champ text-theme-muted" style={{ fontSize: "0.78rem" }}>ВЕС: 30 БАЛЛОВ</span>
                  </div>
                  <h3 className="fs-5 fw-bold text-theme-main mb-2">
                    {typograph("Смарт-реестр логистики и почтовых отправлений")}
                  </h3>
                  <p className="text-theme-muted mb-3" style={{ fontSize: "0.875rem", lineHeight: 1.5 }}>
                    {typograph(
                      "Корпоративная блокчейн-сеть Waves Enterprise: отслеживание маршрутов почтовых отправлений, фиксация транзитных точек и ролевое управление сотрудниками."
                    )}
                  </p>
                </div>
                <div className="d-flex align-items-center justify-content-between pt-3 border-top border-theme">
                  <span className="mono-champ fw-bold text-cyan" style={{ fontSize: "0.82rem" }}>
                    Waves Enterprise · Docker API
                  </span>
                  <Link to="/logistics" className="champ-btn-primary py-1.5 px-3" style={{ minHeight: 38, fontSize: "0.82rem" }}>
                    {typograph("Открыть модуль →")}
                  </Link>
                </div>
              </div>
            </div>

            {/* Module C2 */}
            <div className="col-md-6">
              <div className="champ-card p-4 h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span className="champ-badge-gold">МОДУЛЬ C2 · AUDIT</span>
                    <span className="mono-champ text-theme-muted" style={{ fontSize: "0.78rem" }}>ВЕС: 20 БАЛЛОВ</span>
                  </div>
                  <h3 className="fs-5 fw-bold text-theme-main mb-2">
                    {typograph("Аудит безопасности и тестирование контрактов")}
                  </h3>
                  <p className="text-theme-muted mb-3" style={{ fontSize: "0.875rem", lineHeight: 1.5 }}>
                    {typograph(
                      "Статический и динамический анализ смарт-контрактов, проверка на reentrancy, integer overflow, права доступа и составление экспертного отчёта."
                    )}
                  </p>
                </div>
                <div className="d-flex align-items-center justify-content-between pt-3 border-top border-theme">
                  <span className="mono-champ fw-bold text-gold" style={{ fontSize: "0.82rem" }}>
                    Hardhat · Slither · Unit Tests
                  </span>
                  <Link to="/func" className="champ-btn-secondary py-1.5 px-3" style={{ minHeight: 38, fontSize: "0.82rem" }}>
                    {typograph("Тестировать функции →")}
                  </Link>
                </div>
              </div>
            </div>

            {/* Module D2 */}
            <div className="col-md-6">
              <div className="champ-card p-4 h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <span className="champ-badge-emerald">МОДУЛЬ D2 · DEFENSE</span>
                    <span className="mono-champ text-theme-muted" style={{ fontSize: "0.78rem" }}>ВЕС: 15 БАЛЛОВ</span>
                  </div>
                  <h3 className="fs-5 fw-bold text-theme-main mb-2">
                    {typograph("Презентация и публичная защита решения")}
                  </h3>
                  <p className="text-theme-muted mb-3" style={{ fontSize: "0.875rem", lineHeight: 1.5 }}>
                    {typograph(
                      "Защита архитектуры и бизнес-логики перед индустриальными экспертами и представителями ведущих ИТ-компаний России."
                    )}
                  </p>
                </div>
                <div className="d-flex align-items-center justify-content-between pt-3 border-top border-theme">
                  <span className="mono-champ fw-bold text-theme-main" style={{ fontSize: "0.82rem" }}>
                    Keynote · Live Demo
                  </span>
                  <Link to="/cabinet" className="champ-btn-secondary py-1.5 px-3" style={{ minHeight: 38, fontSize: "0.82rem" }}>
                    {typograph("Панель эксперта →")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
