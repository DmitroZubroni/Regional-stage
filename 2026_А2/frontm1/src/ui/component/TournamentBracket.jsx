import React, { useState, useEffect } from "react";
import { typograph } from "../../core/typograph";

const BRACKET_DATA = {
  quarterFinals: [
    {
      id: "qf-1",
      team1: { name: "Москва (Сборная ИТ-хаба)", score: 98.4, won: true, region: "ЦФО" },
      team2: { name: "Новосибирская обл.", score: 91.2, won: false, region: "СФО" },
      status: "Завершен",
    },
    {
      id: "qf-2",
      team1: { name: "Санкт-Петербург (Политех)", score: 96.0, won: true, region: "СЗФО" },
      team2: { name: "Свердловская обл.", score: 93.8, won: false, region: "УрФО" },
      status: "Завершен",
    },
    {
      id: "qf-3",
      team1: { name: "Республика Татарстан (Иннополис)", score: 95.2, won: true, region: "ПФО" },
      team2: { name: "Самарская обл.", score: 89.6, won: false, region: "ПФО" },
      status: "Завершен",
    },
    {
      id: "qf-4",
      team1: { name: "Томская обл.", score: 92.5, won: true, region: "СФО" },
      team2: { name: "Ростовская обл.", score: 88.0, won: false, region: "ЮФО" },
      status: "Завершен",
    },
  ],
  semiFinals: [
    {
      id: "sf-1",
      team1: { name: "Москва (Сборная ИТ-хаба)", score: 99.1, won: true, region: "ЦФО" },
      team2: { name: "Санкт-Петербург (Политех)", score: 96.8, won: false, region: "СЗФО" },
      status: "Завершен",
    },
    {
      id: "sf-2",
      team1: { name: "Республика Татарстан (Иннополис)", score: 97.4, won: true, region: "ПФО" },
      team2: { name: "Томская обл.", score: 93.1, won: false, region: "СФО" },
      status: "Завершен",
    },
  ],
  grandFinal: {
    id: "gf-1",
    team1: {
      name: "Москва (Сборная ИТ-хаба)",
      score: 99.8,
      won: true,
      region: "ЦФО",
      isChampion: true,
    },
    team2: {
      name: "Республика Татарстан (Иннополис)",
      score: 98.6,
      won: false,
      region: "ПФО",
    },
    status: "Финал завершен",
  },
};

const LEADERBOARD = [
  { rank: 1, name: "Москва · Команда «Кибер-Авангард»", points: 99.8, medal: "🥇", badge: "Золото", region: "Москва" },
  { rank: 2, name: "Татарстан · Команда «Инно-Тех»", points: 98.6, medal: "🥈", badge: "Серебро", region: "Казань" },
  { rank: 3, name: "Санкт-Петербург · Команда «Невский Бит»", points: 96.8, medal: "🥉", badge: "Бронза", region: "СПб" },
  { rank: 4, name: "Свердловская обл. · Команда «Урал-Чейн»", points: 93.8, medal: "4", badge: "Финалист", region: "Екатеринбург" },
  { rank: 5, name: "Томская обл. · Команда «Сибирский Смарт»", points: 93.1, medal: "5", badge: "Финалист", region: "Томск" },
];

export default function TournamentBracket() {
  const [activeTab, setActiveTab] = useState("bracket"); // bracket, podium, table
  const [activeMatch, setActiveMatch] = useState(null);

  // Live Timer Countdown State
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 42, seconds: 18 });
  const [timerRunning, setTimerRunning] = useState(true);

  useEffect(() => {
    if (!timerRunning) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning]);

  return (
    <div className="champ-card p-4 p-md-5 mb-5">
      {/* Timer & Stage Banner */}
      <div
        className="p-3.5 p-md-4 rounded-4 mb-4 d-flex flex-wrap align-items-center justify-content-between gap-3"
        style={{
          background: "linear-gradient(135deg, var(--primary-soft) 0%, var(--surface-2) 100%)",
          border: "1px solid var(--border)",
        }}
      >
        <div className="d-flex align-items-center gap-3">
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: "var(--primary)",
              color: "#ffffff",
              display: "grid",
              placeItems: "center",
              fontSize: 24,
              boxShadow: "var(--primary-glow)",
            }}
          >
            ⏱️
          </div>
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="champ-badge-emerald">
                <span className="pulse-glow">●</span>
                <span>ПРЯМОЙ ЭФИР СОРЕВНОВАНИЙ</span>
              </span>
              <span className="text-theme-muted mono-champ" style={{ fontSize: "0.78rem" }}>
                РАУНД 2 ИЗ 3
              </span>
            </div>
            <h3 className="fs-5 fw-bold text-theme-main mb-0">
              {typograph("Таймер контрольного времени этапа")}
            </h3>
            <p className="text-theme-muted mb-0" style={{ fontSize: "0.82rem" }}>
              {typograph("До окончания приёма и проверки решений смарт-контрактов осталось:")}
            </p>
          </div>
        </div>

        {/* Dynamic Countdown Clock */}
        <div className="d-flex align-items-center gap-3">
          <div className="d-flex align-items-center gap-1.5 mono-champ">
            <div
              className="p-2 px-3 rounded-3 text-center"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", minWidth: 54 }}
            >
              <div className="fs-4 fw-bold text-theme-main">
                {String(timeLeft.hours).padStart(2, "0")}
              </div>
              <div className="text-theme-muted" style={{ fontSize: "0.65rem" }}>
                ЧАСОВ
              </div>
            </div>
            <span className="fs-4 fw-bold text-theme-muted">:</span>
            <div
              className="p-2 px-3 rounded-3 text-center"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", minWidth: 54 }}
            >
              <div className="fs-4 fw-bold text-cyan">
                {String(timeLeft.minutes).padStart(2, "0")}
              </div>
              <div className="text-theme-muted" style={{ fontSize: "0.65rem" }}>
                МИНУТ
              </div>
            </div>
            <span className="fs-4 fw-bold text-theme-muted">:</span>
            <div
              className="p-2 px-3 rounded-3 text-center"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", minWidth: 54 }}
            >
              <div className="fs-4 fw-bold text-gold">
                {String(timeLeft.seconds).padStart(2, "0")}
              </div>
              <div className="text-theme-muted" style={{ fontSize: "0.65rem" }}>
                СЕКУНД
              </div>
            </div>
          </div>

          <button
            onClick={() => setTimerRunning((r) => !r)}
            className="champ-btn-secondary"
            style={{ minHeight: 44, fontSize: "0.82rem", padding: "0.4rem 0.85rem" }}
            title="Пауза / запуск таймера соревнований"
          >
            {timerRunning ? "⏸ Пауза" : "▶ Старт"}
          </button>
        </div>
      </div>

      {/* Brackets Navigation Tabs */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4 border-bottom border-theme pb-3">
        <div>
          <h2 className="fs-4 fw-bold text-theme-main mb-0">
            {typograph("Турнирный трек соревнований")}
          </h2>
          <p className="text-theme-muted mb-0" style={{ fontSize: "0.85rem" }}>
            {typograph("Сетка плей-офф, результаты очных поединков и пьедестал лидеров региона")}
          </p>
        </div>

        <div className="d-flex align-items-center gap-1.5 p-1 rounded-3 bg-theme-surface-2">
          <button
            onClick={() => setActiveTab("bracket")}
            className={`champ-tab-btn ${activeTab === "bracket" ? "active" : ""}`}
            style={{ minHeight: 38, fontSize: "0.82rem", padding: "0.4rem 0.9rem" }}
          >
            📊 {typograph("Сетка плей-офф")}
          </button>
          <button
            onClick={() => setActiveTab("podium")}
            className={`champ-tab-btn ${activeTab === "podium" ? "active" : ""}`}
            style={{ minHeight: 38, fontSize: "0.82rem", padding: "0.4rem 0.9rem" }}
          >
            🏆 {typograph("Пьедестал")}
          </button>
          <button
            onClick={() => setActiveTab("table")}
            className={`champ-tab-btn ${activeTab === "table" ? "active" : ""}`}
            style={{ minHeight: 38, fontSize: "0.82rem", padding: "0.4rem 0.9rem" }}
          >
            📋 {typograph("Рейтинг регионов")}
          </button>
        </div>
      </div>

      {/* TAB 1: High-Tech Tournament Bracket Tree */}
      {activeTab === "bracket" && (
        <div className="overflow-x-auto py-2">
          <div
            className="d-flex align-items-stretch justify-content-between gap-4"
            style={{ minWidth: 860 }}
          >
            {/* Column 1: Quarter Finals */}
            <div className="d-flex flex-column justify-content-around gap-3 flex-grow-1">
              <div className="text-theme-muted fw-bold mono-champ mb-2" style={{ fontSize: "0.78rem" }}>
                1/4 ФИНАЛА (ЧЕТВЕРТЬФИНАЛЫ)
              </div>
              {BRACKET_DATA.quarterFinals.map((match) => (
                <div
                  key={match.id}
                  onClick={() => setActiveMatch(match)}
                  className="p-3 rounded-3 cursor-pointer transition-all"
                  style={{
                    background: activeMatch?.id === match.id ? "var(--cyan-soft)" : "var(--surface)",
                    border: activeMatch?.id === match.id ? "1.5px solid var(--cyan)" : "1px solid var(--border)",
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-semibold text-theme-main" style={{ fontSize: "0.82rem" }}>
                      {match.team1.name}
                    </span>
                    <span
                      className="mono-champ fw-bold"
                      style={{ color: match.team1.won ? "var(--cyan)" : "var(--text-muted)", fontSize: "0.85rem" }}
                    >
                      {match.team1.score}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-theme-muted" style={{ fontSize: "0.82rem" }}>
                      {match.team2.name}
                    </span>
                    <span
                      className="mono-champ fw-bold"
                      style={{ color: match.team2.won ? "var(--cyan)" : "var(--text-muted)", fontSize: "0.85rem" }}
                    >
                      {match.team2.score}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 2: Semi Finals */}
            <div className="d-flex flex-column justify-content-around gap-3 flex-grow-1">
              <div className="text-theme-muted fw-bold mono-champ mb-2" style={{ fontSize: "0.78rem" }}>
                1/2 ФИНАЛА (ПОЛУФИНАЛЫ)
              </div>
              {BRACKET_DATA.semiFinals.map((match) => (
                <div
                  key={match.id}
                  onClick={() => setActiveMatch(match)}
                  className="p-3.5 rounded-3 cursor-pointer transition-all my-auto"
                  style={{
                    background: activeMatch?.id === match.id ? "var(--cyan-soft)" : "var(--surface)",
                    border: activeMatch?.id === match.id ? "1.5px solid var(--cyan)" : "1px solid var(--border)",
                    boxShadow: "var(--shadow-card)",
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center mb-1.5">
                    <span className="fw-bold text-theme-main" style={{ fontSize: "0.85rem" }}>
                      {match.team1.name}
                    </span>
                    <span className="mono-champ fw-bold text-cyan" style={{ fontSize: "0.9rem" }}>
                      {match.team1.score}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-theme-muted" style={{ fontSize: "0.85rem" }}>
                      {match.team2.name}
                    </span>
                    <span className="mono-champ text-theme-muted" style={{ fontSize: "0.9rem" }}>
                      {match.team2.score}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 3: Grand Final */}
            <div className="d-flex flex-column justify-content-center gap-3 flex-grow-1">
              <div className="text-gold fw-bold mono-champ mb-2" style={{ fontSize: "0.78rem" }}>
                🏆 ГРАНД-ФИНАЛ ЧЕМПИОНАТА
              </div>
              <div
                className="p-4 rounded-4 position-relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, var(--gold-soft) 0%, var(--surface) 100%)",
                  border: "2px solid var(--gold)",
                  boxShadow: "var(--gold-glow)",
                }}
              >
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <span className="champ-badge-gold">ПОБЕДИТЕЛЬ 2026</span>
                  <span className="fs-4">👑</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div>
                    <div className="fw-bold fs-6 text-theme-main">
                      {BRACKET_DATA.grandFinal.team1.name}
                    </div>
                    <div className="text-gold fw-semibold" style={{ fontSize: "0.75rem" }}>
                      Чемпион регионального этапа
                    </div>
                  </div>
                  <span className="fs-5 fw-bold mono-champ text-gold">
                    {BRACKET_DATA.grandFinal.team1.score}
                  </span>
                </div>
                <hr className="my-2 border-theme" />
                <div className="d-flex justify-content-between align-items-center">
                  <div className="text-theme-muted" style={{ fontSize: "0.85rem" }}>
                    {BRACKET_DATA.grandFinal.team2.name}
                  </div>
                  <span className="mono-champ fw-semibold text-theme-muted" style={{ fontSize: "0.85rem" }}>
                    {BRACKET_DATA.grandFinal.team2.score}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Podium of Winners */}
      {activeTab === "podium" && (
        <div className="py-4">
          <div className="d-flex align-items-end justify-content-center gap-3 gap-md-4 text-center">
            {/* 2nd Place */}
            <div className="d-flex flex-column align-items-center" style={{ width: "28%" }}>
              <div className="fs-2 mb-1">🥈</div>
              <div className="fw-bold text-theme-main mb-1" style={{ fontSize: "0.9rem" }}>
                Татарстан (Иннополис)
              </div>
              <span className="champ-badge-cyan mb-2">98.6 балла</span>
              <div
                className="w-100 rounded-top-4 p-3 d-flex flex-column justify-content-center"
                style={{
                  height: 140,
                  background: "linear-gradient(180deg, var(--surface-3) 0%, var(--surface-2) 100%)",
                  border: "1px solid var(--border)",
                }}
              >
                <span className="fs-1 fw-bold text-theme-muted mono-champ">2</span>
                <span className="text-theme-muted" style={{ fontSize: "0.75rem" }}>МЕСТО</span>
              </div>
            </div>

            {/* 1st Place */}
            <div className="d-flex flex-column align-items-center" style={{ width: "34%" }}>
              <div className="fs-1 mb-1 float-slow">🏆</div>
              <div className="fw-bold text-theme-main mb-1" style={{ fontSize: "1.05rem" }}>
                Москва (ИТ-хаб)
              </div>
              <span className="champ-badge-gold mb-2">99.8 балла</span>
              <div
                className="w-100 rounded-top-4 p-3 d-flex flex-column justify-content-center position-relative"
                style={{
                  height: 190,
                  background: "linear-gradient(180deg, var(--gold-soft) 0%, var(--surface-2) 100%)",
                  border: "2px solid var(--gold)",
                  boxShadow: "var(--gold-glow)",
                }}
              >
                <span className="fs-1 fw-bold text-gold mono-champ">1</span>
                <span className="text-gold fw-bold" style={{ fontSize: "0.85rem" }}>ЧЕМПИОН ЭТАПА</span>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="d-flex flex-column align-items-center" style={{ width: "28%" }}>
              <div className="fs-2 mb-1">🥉</div>
              <div className="fw-bold text-theme-main mb-1" style={{ fontSize: "0.9rem" }}>
                Санкт-Петербург
              </div>
              <span className="champ-badge-cyan mb-2">96.8 балла</span>
              <div
                className="w-100 rounded-top-4 p-3 d-flex flex-column justify-content-center"
                style={{
                  height: 105,
                  background: "linear-gradient(180deg, var(--surface-3) 0%, var(--surface-2) 100%)",
                  border: "1px solid var(--border)",
                }}
              >
                <span className="fs-1 fw-bold text-theme-muted mono-champ">3</span>
                <span className="text-theme-muted" style={{ fontSize: "0.75rem" }}>МЕСТО</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Leaderboard Standings Table */}
      {activeTab === "table" && (
        <div className="table-responsive">
          <table className="table table-borderless align-middle mb-0" style={{ background: "transparent" }}>
            <thead>
              <tr className="border-bottom border-theme text-theme-muted" style={{ fontSize: "0.75rem", background: "transparent" }}>
                <th scope="col" style={{ width: 60, background: "transparent" }}>РАНГ</th>
                <th scope="col" style={{ background: "transparent" }}>КОМАНДА / РЕГИОН</th>
                <th scope="col" style={{ background: "transparent" }}>СТАТУС</th>
                <th scope="col" className="text-end" style={{ background: "transparent" }}>ИТОГОВЫЙ БАЛЛ</th>
              </tr>
            </thead>
            <tbody>
              {LEADERBOARD.map((item) => (
                <tr key={item.rank} className="border-bottom border-theme" style={{ background: "transparent" }}>
                  <td className="fw-bold fs-5 mono-champ" style={{ background: "transparent" }}>{item.medal}</td>
                  <td style={{ background: "transparent" }}>
                    <div className="fw-bold text-theme-main">{item.name}</div>
                    <div className="text-theme-muted" style={{ fontSize: "0.75rem" }}>
                      Субъект: {item.region}
                    </div>
                  </td>
                  <td style={{ background: "transparent" }}>
                    <span
                      className={
                        item.rank === 1
                          ? "champ-badge-gold"
                          : item.rank <= 3
                          ? "champ-badge-cyan"
                          : "champ-badge-emerald"
                      }
                    >
                      {item.badge}
                    </span>
                  </td>
                  <td className="text-end fw-bold mono-champ fs-6 text-theme-main" style={{ background: "transparent" }}>
                    {item.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
