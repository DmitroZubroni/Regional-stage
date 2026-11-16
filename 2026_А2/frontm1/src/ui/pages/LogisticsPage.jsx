import React, { useState } from "react";
import Header from "../component/Header.jsx";
import { typograph } from "../../core/typograph";
import { StateSwitcherBar, LoadingSkeleton, EmptyState, ErrorState, SuccessState } from "../component/States.jsx";

const SAMPLE_POSTALS = [
  {
    id: "RU-2026-9041",
    sender: "Москва, Склад №1 (ИТ-хаб)",
    receiver: "Казань, Иннополис, блок 4",
    status: "В пути · Транзитная точка #2",
    weight: "2.4 кг",
    transitPoints: ["Москва-Сортировочная", "Нижний Новгород (Хаб)"],
    currentPoint: "Нижний Новгород (Хаб)",
    timestamp: "16 ноября 2026, 14:32",
    delivered: false,
  },
  {
    id: "RU-2026-8812",
    sender: "Санкт-Петербург, Политех",
    receiver: "Новосибирск, Академгородок",
    status: "Доставлено адресату",
    weight: "0.85 кг",
    transitPoints: ["СПб-Центральный", "Москва-Транзит", "Омск", "Новосибирск"],
    currentPoint: "Новосибирск-Северный",
    timestamp: "15 ноября 2026, 11:20",
    delivered: true,
  },
];

const SAMPLE_TRANSFERS = [
  {
    id: "TRX-7701",
    sender: "3N7h...9a21",
    receiver: "3M4k...e810",
    amount: "450 WAVES",
    fee: "0.005 WAVES",
    blockHeight: 184920,
    timestamp: "16 ноября 2026, 19:40",
  },
  {
    id: "TRX-7689",
    sender: "3P1x...b442",
    receiver: "3N7h...9a21",
    amount: "1,200 WAVES",
    fee: "0.005 WAVES",
    blockHeight: 184905,
    timestamp: "16 ноября 2026, 17:15",
  },
];

export default function LogisticsPage() {
  const [activeTab, setActiveTab] = useState("postals"); // postals, transfers, blockchain
  const [postals, setPostals] = useState(SAMPLE_POSTALS);
  const [searchCode, setSearchCode] = useState("");
  const [newPostal, setNewPostal] = useState({ sender: "", receiver: "", weight: "" });
  const [stateMode, setStateMode] = useState("normal");
  const [feedback, setFeedback] = useState(null);

  const handleCreatePostal = (e) => {
    e.preventDefault();
    if (!newPostal.sender || !newPostal.receiver) return;
    const newId = `RU-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setPostals([
      {
        id: newId,
        sender: newPostal.sender,
        receiver: newPostal.receiver,
        status: "Зарегистрировано в смарт-реестре",
        weight: newPostal.weight || "1.0 кг",
        transitPoints: [newPostal.sender],
        currentPoint: newPostal.sender,
        timestamp: "Только что",
        delivered: false,
      },
      ...postals,
    ]);
    setNewPostal({ sender: "", receiver: "", weight: "" });
    setFeedback({ type: "success", text: `Отправление ${newId} зафиксировано в блокчейне Waves Enterprise!` });
  };

  const filteredPostals = postals.filter(
    (p) =>
      p.id.toLowerCase().includes(searchCode.toLowerCase()) ||
      p.sender.toLowerCase().includes(searchCode.toLowerCase()) ||
      p.receiver.toLowerCase().includes(searchCode.toLowerCase())
  );

  return (
    <div style={{ minHeight: "100vh" }}>
      <Header />

      <main className="container">
        {/* Banner */}
        <section className="champ-hero-card p-4 p-md-5 mb-5">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
            <div>
              <div className="d-flex align-items-center gap-2 mb-2">
                <span className="champ-badge-cyan">МОДУЛЬ B2</span>
                <span className="champ-badge-gold">WAVES ENTERPRISE</span>
              </div>
              <h1 className="fs-3 fw-bold text-theme-main mb-1.5">
                {typograph("Смарт-логистика и блокчейн-реестр почтовых отправлений")}
              </h1>
              <p className="text-theme-muted mb-0" style={{ maxWidth: 640, fontSize: "0.88rem", lineHeight: 1.6 }}>
                {typograph(
                  "Модуль корпоративного блокчейн-реестра регионального этапа: отслеживание жизненного цикла почтовых посылок, фиксация транзитных точек и неизменяемый аудит денежных переводов."
                )}
              </p>
            </div>

            <div className="d-flex align-items-center gap-3">
              <div
                className="p-3 rounded-3 text-center"
                style={{ background: "var(--surface-2)", border: "1px solid var(--border)", minWidth: 120 }}
              >
                <div className="text-theme-muted mono-champ" style={{ fontSize: "0.72rem" }}>
                  ВЫСОТА ЦЕПИ
                </div>
                <div className="fs-5 fw-bold mono-champ text-cyan">#184,924</div>
              </div>
            </div>
          </div>
        </section>

        {/* State Switcher Bar (Rule У1) */}
        <StateSwitcherBar activeState={stateMode} onChangeState={setStateMode} />

        {stateMode === "loading" && <LoadingSkeleton count={3} />}
        {stateMode === "empty" && (
          <EmptyState
            title="Почтовые отправления не найдены"
            description="В текущем узле Waves Enterprise нет зарегистрированных посылок."
            actionLabel="Создать отправление"
            onAction={() => setStateMode("normal")}
          />
        )}
        {stateMode === "error" && (
          <ErrorState
            title="Ошибка связи с нодой Waves Enterprise"
            description="Порт REST API ноды не отвечает. Проверьте статус контейнера или используйте мок-режим."
            onRetry={() => setStateMode("normal")}
          />
        )}
        {stateMode === "success" && (
          <SuccessState
            title="Транзитная точка успешно подтверждена"
            description="Транзакция типа 104 подписана и включена в блокчейн-реестр."
            actionLabel="Вернуться к списку"
            onAction={() => setStateMode("normal")}
          />
        )}

        {stateMode === "normal" && (
          <>
            {/* Tabs */}
            <div className="d-flex flex-wrap align-items-center gap-2 mb-4 p-1.5 rounded-3 bg-theme-surface-2 border border-theme">
              <button
                onClick={() => setActiveTab("postals")}
                className={`champ-tab-btn ${activeTab === "postals" ? "active" : ""}`}
                style={{ minHeight: 40 }}
              >
                📦 {typograph("Почтовые посылки")}
              </button>
              <button
                onClick={() => setActiveTab("new-postal")}
                className={`champ-tab-btn ${activeTab === "new-postal" ? "active" : ""}`}
                style={{ minHeight: 40 }}
              >
                ➕ {typograph("Оформить отправление")}
              </button>
              <button
                onClick={() => setActiveTab("transfers")}
                className={`champ-tab-btn ${activeTab === "transfers" ? "active" : ""}`}
                style={{ minHeight: 40 }}
              >
                💸 {typograph("Денежные переводы")}
              </button>
              <button
                onClick={() => setActiveTab("blockchain")}
                className={`champ-tab-btn ${activeTab === "blockchain" ? "active" : ""}`}
                style={{ minHeight: 40 }}
              >
                ⛓️ {typograph("Телеметрия сети")}
              </button>
            </div>

            {/* TAB 1: Postals List */}
            {activeTab === "postals" && (
              <div className="champ-card p-4 p-md-5">
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
                  <div>
                    <h2 className="fs-5 fw-bold text-theme-main mb-0">
                      {typograph("Реестр отправлений в сети Waves Enterprise")}
                    </h2>
                    <p className="text-theme-muted mb-0" style={{ fontSize: "0.82rem" }}>
                      {typograph("Все транзитные точки фиксируются криптографической подписью")}
                    </p>
                  </div>

                  <input
                    type="text"
                    className="champ-input"
                    placeholder="Поиск по трек-номеру или городу..."
                    value={searchCode}
                    onChange={(e) => setSearchCode(e.target.value)}
                    style={{ maxWidth: 280, minHeight: 40, fontSize: "0.82rem" }}
                  />
                </div>

                <div className="d-flex flex-column gap-3">
                  {filteredPostals.map((postal) => (
                    <div
                      key={postal.id}
                      className="p-3.5 rounded-3"
                      style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
                    >
                      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
                        <div className="d-flex align-items-center gap-2">
                          <span className="fw-bold mono-champ text-cyan fs-6">{postal.id}</span>
                          <span
                            className={postal.delivered ? "champ-badge-emerald" : "champ-badge-gold"}
                          >
                            {typograph(postal.status)}
                          </span>
                        </div>
                        <span className="text-theme-muted mono-champ" style={{ fontSize: "0.78rem" }}>
                          {postal.timestamp}
                        </span>
                      </div>

                      <div className="row g-2 mb-2">
                        <div className="col-md-6">
                          <span className="text-theme-muted" style={{ fontSize: "0.75rem" }}>
                            Откуда:
                          </span>
                          <div className="text-theme-main fw-semibold" style={{ fontSize: "0.85rem" }}>
                            {postal.sender}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <span className="text-theme-muted" style={{ fontSize: "0.75rem" }}>
                            Куда:
                          </span>
                          <div className="text-theme-main fw-semibold" style={{ fontSize: "0.85rem" }}>
                            {postal.receiver}
                          </div>
                        </div>
                      </div>

                      {/* Transit Track Route */}
                      <div className="pt-2 border-top border-theme d-flex align-items-center gap-2 flex-wrap">
                        <span className="text-theme-muted" style={{ fontSize: "0.75rem" }}>
                          Транзитный маршрут:
                        </span>
                        {postal.transitPoints.map((pt, i) => (
                          <span key={i} className="badge bg-theme-surface border border-theme text-theme-main">
                            {i + 1}. {pt}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: New Postal Form */}
            {activeTab === "new-postal" && (
              <div className="champ-card p-4 p-md-5">
                <h2 className="fs-5 fw-bold text-theme-main mb-1">
                  {typograph("Регистрация нового почтового отправления")}
                </h2>
                <p className="text-theme-muted mb-4" style={{ fontSize: "0.82rem" }}>
                  {typograph("Создание записи в смарт-контракте Contract.java модуля B2")}
                </p>

                {feedback && (
                  <div
                    className={`p-3 rounded-3 mb-4 ${
                      feedback.type === "success" ? "champ-badge-emerald" : "champ-badge-danger"
                    }`}
                    style={{ width: "100%", fontSize: "0.85rem" }}
                  >
                    {typograph(feedback.text)}
                  </div>
                )}

                <form onSubmit={handleCreatePostal}>
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label text-theme-main fw-semibold" style={{ fontSize: "0.85rem" }}>
                        {typograph("Пункт отправления")}
                      </label>
                      <input
                        type="text"
                        className="champ-input"
                        placeholder="Например: Москва, Центральный хаб"
                        value={newPostal.sender}
                        onChange={(e) => setNewPostal({ ...newPostal, sender: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-theme-main fw-semibold" style={{ fontSize: "0.85rem" }}>
                        {typograph("Пункт назначения")}
                      </label>
                      <input
                        type="text"
                        className="champ-input"
                        placeholder="Например: Казань, Офис соревнований"
                        value={newPostal.receiver}
                        onChange={(e) => setNewPostal({ ...newPostal, receiver: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label text-theme-main fw-semibold" style={{ fontSize: "0.85rem" }}>
                        {typograph("Вес отправления")}
                      </label>
                      <input
                        type="text"
                        className="champ-input"
                        placeholder="Например: 1.5 кг"
                        value={newPostal.weight}
                        onChange={(e) => setNewPostal({ ...newPostal, weight: e.target.value })}
                      />
                    </div>
                  </div>

                  <button type="submit" className="champ-btn-primary" style={{ minHeight: 44 }}>
                    <span>{typograph("Зарегистрировать в блокчейне Waves")}</span>
                  </button>
                </form>
              </div>
            )}

            {/* TAB 3: Money Transfers */}
            {activeTab === "transfers" && (
              <div className="champ-card p-4 p-md-5">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <h2 className="fs-5 fw-bold text-theme-main mb-0">
                    {typograph("Реестр трансферных переводов")}
                  </h2>
                  <span className="champ-badge-gold">СУММА: 1,650 WAVES</span>
                </div>

                <div className="d-flex flex-column gap-3">
                  {SAMPLE_TRANSFERS.map((t) => (
                    <div
                      key={t.id}
                      className="p-3.5 rounded-3 d-flex flex-wrap align-items-center justify-content-between gap-3"
                      style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
                    >
                      <div>
                        <div className="d-flex align-items-center gap-2 mb-1">
                          <span className="fw-bold mono-champ text-theme-main">{t.id}</span>
                          <span className="champ-badge-emerald">ПОДТВЕРЖДЕНО</span>
                        </div>
                        <div className="text-theme-muted mono-champ" style={{ fontSize: "0.78rem" }}>
                          От: {t.sender} → Кому: {t.receiver} · Блок #{t.blockHeight}
                        </div>
                      </div>

                      <div className="text-end">
                        <div className="fs-6 fw-bold mono-champ text-gold">{t.amount}</div>
                        <div className="text-theme-muted mono-champ" style={{ fontSize: "0.72rem" }}>
                          Комиссия: {t.fee}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: Blockchain Telemetry */}
            {activeTab === "blockchain" && (
              <div className="champ-card p-4 p-md-5">
                <h2 className="fs-5 fw-bold text-theme-main mb-3">
                  {typograph("Телеметрия узла Waves Enterprise")}
                </h2>

                <div className="row g-3">
                  {[
                    { label: "ТЕКУЩИЙ БЛОК", value: "184,924", color: "cyan" },
                    { label: "ВРЕМЯ ГЕНЕРАЦИИ БЛОКА", value: "3.2 сек", color: "gold" },
                    { label: "АКТИВНЫХ НОД", value: "8 валидаторов", color: "emerald" },
                    { label: "ВЕРСИЯ СМАРТ-КОНТРАКТА", value: "v2.1 Enterprise", color: "primary" },
                  ].map((m, idx) => (
                    <div key={idx} className="col-sm-6 col-lg-3">
                      <div
                        className="p-3.5 rounded-3 h-100"
                        style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
                      >
                        <div className="text-theme-muted mono-champ" style={{ fontSize: "0.72rem" }}>
                          {m.label}
                        </div>
                        <div className="fs-4 fw-bold mono-champ text-theme-main mt-1">
                          {m.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
