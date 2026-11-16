import React, { useState, useEffect } from "react";
import { typograph } from "../../core/typograph";

const SECTORS = [
  {
    id: "sector-a",
    letter: "A",
    name: "Модуль А2: Блокчейн и DAO",
    description: "Система консенсусного голосования, выпуск токенов RTK, децентрализованное управление и кворум.",
    tech: "Ethereum EVM · Solidity · Web3",
    status: "В эфире",
    statusColor: "emerald",
    participants: 18,
    progress: 88,
    coordinates: { x: 140, y: 110 },
    color: "#2563eb",
  },
  {
    id: "sector-b",
    letter: "B",
    name: "Модуль B2: Смарт-логистика",
    description: "Корпоративный реестр Waves Enterprise, почтовые переводы, трекинг транзитных точек и ролевой доступ.",
    tech: "Waves Enterprise · Docker · REST API",
    status: "В эфире",
    statusColor: "emerald",
    participants: 16,
    progress: 74,
    coordinates: { x: 500, y: 110 },
    color: "#38bdf8",
  },
  {
    id: "sector-c",
    letter: "C",
    name: "Модуль C2: Аудит смарт-контрактов",
    description: "Тестирование контрактов, статический анализ безопасности, поиск уязвимостей reentrancy и overflow.",
    tech: "Unit Tests · Slither · Mythril",
    status: "Подготовка",
    statusColor: "gold",
    participants: 14,
    progress: 60,
    coordinates: { x: 500, y: 290 },
    color: "#f59e0b",
  },
  {
    id: "sector-d",
    letter: "D",
    name: "Модуль D2: Защита и Презентация",
    description: "Публичная демонстрация архитектурных решений, защита перед индустриальными экспертами и жюри.",
    tech: "Keynote · Live Demo · Pitch Deck",
    status: "Финал дня",
    statusColor: "gold",
    participants: 12,
    progress: 40,
    coordinates: { x: 140, y: 290 },
    color: "#8b5cf6",
  },
];

export default function Championship3DArena({ onSelectModule }) {
  const [selectedSector, setSelectedSector] = useState(SECTORS[0]);
  const [viewMode, setViewMode] = useState("isometric"); // isometric, top, podium
  const [lighting, setLighting] = useState("championship"); // championship, cyber, gold
  const [rotation, setRotation] = useState(0);

  // Rule Д8: respect prefers-reduced-motion — the previous version drove this
  // rotation from a raw setInterval, so the global CSS `@media (prefers-reduced-motion)`
  // kill-switch in index.css (which only stops CSS animations/transitions)
  // never reached it, and it also kept re-rendering forever even when the
  // tab was in the background. Both are fixed here.
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return; // no autoplaying motion for this user

    let timer = null;
    const start = () => {
      if (timer) return;
      timer = setInterval(() => {
        setRotation((prev) => (prev + 1) % 360);
      }, 60);
    };
    const stop = () => {
      if (!timer) return;
      clearInterval(timer);
      timer = null;
    };

    const handleVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    if (!document.hidden) start();
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <div className="champ-card p-4 p-md-5 position-relative overflow-hidden mb-5">
      {/* Header of Arena */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1.5">
            <span className="champ-badge-cyan">
              <span className="pulse-glow">●</span>
              <span>3D АРЕНА ЧЕМПИОНАТА</span>
            </span>
            <span className="champ-badge-gold">СЕЗОН 2026</span>
          </div>
          <h2 className="fs-3 fw-bold text-theme-main mb-1">
            {typograph("Интерактивная 3D-арена соревнований")}
          </h2>
          <p className="text-theme-muted mb-0" style={{ fontSize: "0.875rem" }}>
            {typograph(
              "Виртуальный полигон регионального этапа: выберите сектор для осмотра рабочих модулей и телеметрии."
            )}
          </p>
        </div>

        {/* View & Lighting Controls */}
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <div className="btn-group" role="group" aria-label="Режимы камеры 3D-арены">
            <button
              onClick={() => setViewMode("isometric")}
              className={`champ-tab-btn ${viewMode === "isometric" ? "active" : ""}`}
              style={{ minHeight: 44, fontSize: "0.8rem", padding: "0.4rem 0.85rem" }}
            >
              {typograph("Изометрия")}
            </button>
            <button
              onClick={() => setViewMode("podium")}
              className={`champ-tab-btn ${viewMode === "podium" ? "active" : ""}`}
              style={{ minHeight: 44, fontSize: "0.8rem", padding: "0.4rem 0.85rem" }}
            >
              {typograph("Пьедестал")}
            </button>
            <button
              onClick={() => setViewMode("top")}
              className={`champ-tab-btn ${viewMode === "top" ? "active" : ""}`}
              style={{ minHeight: 44, fontSize: "0.8rem", padding: "0.4rem 0.85rem" }}
            >
              {typograph("План")}
            </button>
          </div>

          <button
            onClick={() =>
              setLighting((curr) =>
                curr === "championship" ? "gold" : curr === "gold" ? "cyber" : "championship"
              )
            }
            className="champ-btn-secondary"
            style={{ minHeight: 44, fontSize: "0.8rem", padding: "0.4rem 0.85rem" }}
            title="Сменить схему неонового освещения арены"
          >
            💡 {typograph(lighting === "championship" ? "Кобальт" : lighting === "gold" ? "Золото" : "Кибер")}
          </button>
        </div>
      </div>

      {/* 3D SVG Canvas */}
      <div
        className="position-relative rounded-4 p-3 mb-4 d-flex align-items-center justify-content-center"
        style={{
          minHeight: 440,
          background:
            lighting === "championship"
              ? "radial-gradient(ellipse at center, rgba(37, 99, 235, 0.12) 0%, rgba(15, 23, 42, 0.4) 70%, transparent 100%)"
              : lighting === "gold"
              ? "radial-gradient(ellipse at center, rgba(245, 158, 11, 0.12) 0%, rgba(15, 23, 42, 0.4) 70%, transparent 100%)"
              : "radial-gradient(ellipse at center, rgba(56, 189, 248, 0.15) 0%, rgba(15, 23, 42, 0.4) 70%, transparent 100%)",
          border: "1px solid var(--border)",
        }}
      >
        <svg
          viewBox="0 0 640 400"
          className="w-100 h-auto"
          style={{
            maxHeight: 460,
            transform:
              viewMode === "isometric"
                ? "perspective(800px) rotateX(24deg)"
                : viewMode === "podium"
                ? "perspective(600px) scale(1.1) translateY(-10px)"
                : "none",
            transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          aria-label="3D-модель соревновательной арены чемпионата Профессионалы 2026"
        >
          <defs>
            <linearGradient id="arenaFloorGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1e293b" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="trophyGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
            <linearGradient id="beamGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </linearGradient>
            <filter id="hologramGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Arena Floor - Isometric Hexagonal Platform */}
          <polygon
            points="320,30 580,105 580,315 320,390 60,315 60,105"
            fill="url(#arenaFloorGrad)"
            stroke="var(--border)"
            strokeWidth="2"
          />

          {/* Grid lines on floor */}
          <line x1="60" y1="105" x2="580" y2="315" stroke="var(--cyan)" strokeOpacity="0.12" strokeWidth="1.5" />
          <line x1="60" y1="315" x2="580" y2="105" stroke="var(--cyan)" strokeOpacity="0.12" strokeWidth="1.5" />
          <line x1="320" y1="30" x2="320" y2="390" stroke="var(--cyan)" strokeOpacity="0.18" strokeWidth="1.5" strokeDasharray="6 6" />

          {/* Concentric Energy Rings */}
          <ellipse cx="320" cy="210" rx="200" ry="90" fill="none" stroke="var(--primary)" strokeOpacity="0.25" strokeWidth="1.5" />
          <ellipse
            cx="320"
            cy="210"
            rx="140"
            ry="65"
            fill="none"
            stroke="var(--cyan)"
            strokeOpacity="0.4"
            strokeWidth="2"
            strokeDasharray="12 8"
            style={{ transformOrigin: "320px 210px", transform: `rotate(${rotation}deg)` }}
          />
          <ellipse
            cx="320"
            cy="210"
            rx="80"
            ry="38"
            fill="none"
            stroke="var(--gold)"
            strokeOpacity="0.6"
            strokeWidth="2"
            strokeDasharray="8 6"
            style={{ transformOrigin: "320px 210px", transform: `rotate(-${rotation * 1.5}deg)` }}
          />

          {/* Central Holographic Light Beam */}
          <polygon points="295,210 345,210 335,60 305,60" fill="url(#beamGrad)" opacity="0.4" />

          {/* Central 3D Podium & Champion Trophy */}
          <g transform="translate(320, 210)">
            {/* Podium Base */}
            <ellipse cx="0" cy="0" rx="42" ry="20" fill="#1e293b" stroke="var(--gold)" strokeWidth="2" />
            <path d="M-42 0 L-42 16 C-42 27, 42 27, 42 16 L42 0 Z" fill="#0f172a" stroke="var(--gold)" strokeWidth="1.5" />

            {/* 3D Hologram Floating Trophy */}
            <g transform={`translate(0, ${-46 + Math.sin((rotation * Math.PI) / 60) * 6})`}>
              {/* Pulsing Aura */}
              <circle cx="0" cy="-10" r="28" fill="var(--gold)" opacity="0.15" filter="url(#hologramGlow)" />
              {/* Cup */}
              <path
                d="M-18 -26 C-18 -6, -8 0, 0 0 C8 0, 18 -6, 18 -26 Z"
                fill="url(#trophyGrad)"
                stroke="#fff"
                strokeWidth="1.2"
              />
              <path d="M-18 -22 C-26 -22, -26 -10, -14 -8" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M18 -22 C26 -22, 26 -10, 14 -8" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
              {/* Trophy Star */}
              <polygon points="0,-18 2,-14 6,-14 3,-11 4,-7 0,-10 -4,-7 -3,-11 -6,-14 -2,-14" fill="#ffffff" />
              {/* Holographic Text */}
              <text x="0" y="16" fill="var(--gold-text)" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                ЛИДЕР ЭТАПА
              </text>
            </g>
          </g>

          {/* The 4 Competition Sectors */}
          {SECTORS.map((sector) => {
            const isSelected = selectedSector.id === sector.id;
            const { x, y } = sector.coordinates;

            return (
              <g
                key={sector.id}
                transform={`translate(${x}, ${y})`}
                onClick={() => setSelectedSector(sector)}
                style={{ cursor: "pointer" }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setSelectedSector(sector);
                }}
                aria-label={`Выбрать ${sector.name}`}
              >
                {/* Sector Base Plate */}
                <ellipse
                  cx="0"
                  cy="0"
                  rx={isSelected ? 48 : 40}
                  ry={isSelected ? 24 : 20}
                  fill={isSelected ? "rgba(56, 189, 248, 0.22)" : "rgba(30, 41, 59, 0.7)"}
                  stroke={isSelected ? sector.color : "var(--border)"}
                  strokeWidth={isSelected ? "2.5" : "1.2"}
                  filter={isSelected ? "url(#hologramGlow)" : "none"}
                />

                {/* Pillar */}
                <path
                  d={`M-${isSelected ? 48 : 40} 0 L-${isSelected ? 48 : 40} 12 C-${isSelected ? 48 : 40} 22, ${
                    isSelected ? 48 : 40
                  } 22, ${isSelected ? 48 : 40} 12 L${isSelected ? 48 : 40} 0 Z`}
                  fill="#0f172a"
                  stroke={isSelected ? sector.color : "var(--border)"}
                  strokeWidth="1"
                />

                {/* Sector Floating Marker / Badge */}
                <g transform="translate(0, -22)">
                  <rect
                    x="-20"
                    y="-12"
                    width="40"
                    height="20"
                    rx="6"
                    fill={sector.color}
                    stroke="#ffffff"
                    strokeWidth="1"
                  />
                  <text
                    x="0"
                    y="2"
                    fill="#ffffff"
                    fontSize="11"
                    fontWeight="bold"
                    textAnchor="middle"
                    fontFamily="sans-serif"
                  >
                    {sector.letter}
                  </text>
                </g>

                {/* Sector Label */}
                <text
                  x="0"
                  y="26"
                  fill={isSelected ? "var(--cyan)" : "var(--text)"}
                  fontSize="9.5"
                  fontWeight="bold"
                  textAnchor="middle"
                  fontFamily="sans-serif"
                >
                  {sector.letter}: {sector.name.split(":")[1]?.trim() || sector.name}
                </text>

                {/* Status Dot */}
                <circle
                  cx="0"
                  cy="36"
                  r="3.5"
                  fill={sector.statusColor === "emerald" ? "#10b981" : "#f59e0b"}
                  className="pulse-glow"
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Sector Details Card (High-Tech Telemetry) */}
      <div
        className="p-3.5 p-md-4 rounded-3 d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-4"
        style={{
          background: "var(--surface-2)",
          border: "1px solid var(--border)",
        }}
      >
        <div style={{ maxWidth: 600 }}>
          <div className="d-flex align-items-center gap-2 mb-2">
            <span
              className="d-inline-flex align-items-center justify-content-center fw-bold rounded-2 text-white"
              style={{
                width: 28,
                height: 28,
                background: selectedSector.color,
                fontSize: "0.875rem",
              }}
            >
              {selectedSector.letter}
            </span>
            <h3 className="fs-5 fw-bold text-theme-main mb-0">
              {typograph(selectedSector.name)}
            </h3>
            <span
              className={
                selectedSector.statusColor === "emerald"
                  ? "champ-badge-emerald"
                  : "champ-badge-gold"
              }
            >
              {typograph(selectedSector.status)}
            </span>
          </div>

          <p className="text-theme-muted mb-2" style={{ fontSize: "0.875rem", lineHeight: 1.5 }}>
            {typograph(selectedSector.description)}
          </p>

          <div className="d-flex align-items-center gap-3 text-theme-muted" style={{ fontSize: "0.78rem" }}>
            <span>🛠️ {typograph(selectedSector.tech)}</span>
            <span>👥 {selectedSector.participants} {typograph("участников")}</span>
          </div>
        </div>

        {/* Action Button & Telemetry */}
        <div className="d-flex flex-column align-items-lg-end gap-2.5">
          <div className="d-flex align-items-center gap-2">
            <span className="text-theme-muted" style={{ fontSize: "0.8rem" }}>
              {typograph("Прогресс сектора:")}
            </span>
            <span className="fw-bold text-theme-main mono-champ" style={{ fontSize: "1rem" }}>
              {selectedSector.progress}%
            </span>
          </div>
          <div
            className="w-100 rounded-pill overflow-hidden"
            style={{ height: 6, width: 140, background: "var(--surface-3)" }}
          >
            <div
              className="h-100 rounded-pill"
              style={{
                width: `${selectedSector.progress}%`,
                background: selectedSector.color,
                transition: "width 0.4s ease",
              }}
            />
          </div>

          {onSelectModule && (
            <button
              onClick={() => onSelectModule(selectedSector.letter)}
              className="champ-btn-primary"
              style={{ minHeight: 44, fontSize: "0.85rem", padding: "0.5rem 1rem" }}
            >
              <span>{typograph(`Открыть задачи ${selectedSector.letter}`)}</span>
              <span>→</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
