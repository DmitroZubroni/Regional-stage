import Header from "../component/Header.jsx";
import { useContext, useState } from "react";
import { AtlantContext } from "../../core/context.jsx";
import BuyRTK from "../component/func/BuyRTK.jsx";
import Delagated from "../component/func/Delagated.jsx";
import CreateProposal from "../component/func/CreateProposal.jsx";
import CastVoted from "../component/func/CastVoted.jsx";
import CanceledProposal from "../component/func/CanceledProposal.jsx";
import ExecuteProposal from "../component/func/ExecuteProposal.jsx";
import { typograph } from "../../core/typograph";

const FunctionPage = () => {
  const { person } = useContext(AtlantContext);
  const [activeTab, setActiveTab] = useState(person.isDAO ? "create" : "buy");

  return (
    <div style={{ minHeight: "100vh" }}>
      <Header />

      <main id="main-content" className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <h1 className="fs-3 fw-bold text-theme-main mb-0">
                {typograph("Интерфейс функций смарт-контракта DAO")}
              </h1>
              <span className="champ-badge-cyan">МОДУЛЬ А2</span>
            </div>
            <p className="text-theme-muted mb-0" style={{ fontSize: "0.88rem" }}>
              {typograph(
                "Прямое взаимодействие с методами контракта: эмиссия токенов, подача предложений, делегирование и исполнение."
              )}
            </p>
          </div>

          <div className="d-flex align-items-center gap-2">
            <span
              className={person.isDAO ? "champ-badge-emerald" : "champ-badge-gold"}
              style={{ fontSize: "0.8rem" }}
            >
              {person.isDAO ? "Статус: Участник DAO" : "Статус: Кандидат (Купите RTK)"}
            </span>
          </div>
        </div>

        {/* Function Categories Navigation Tabs */}
        <div className="d-flex flex-wrap align-items-center gap-2 mb-4 p-1.5 rounded-3 bg-theme-surface-2 border border-theme">
          <button
            onClick={() => setActiveTab("create")}
            className={`champ-tab-btn ${activeTab === "create" ? "active" : ""}`}
            style={{ minHeight: 44, fontSize: "0.85rem" }}
          >
            📝 {typograph("Создать предложение")}
          </button>
          <button
            onClick={() => setActiveTab("vote")}
            className={`champ-tab-btn ${activeTab === "vote" ? "active" : ""}`}
            style={{ minHeight: 44, fontSize: "0.85rem" }}
          >
            🗳️ {typograph("Голосование")}
          </button>
          <button
            onClick={() => setActiveTab("buy")}
            className={`champ-tab-btn ${activeTab === "buy" ? "active" : ""}`}
            style={{ minHeight: 44, fontSize: "0.85rem" }}
          >
            🪙 {typograph("Купить GERDA")}
          </button>
          <button
            onClick={() => setActiveTab("delegate")}
            className={`champ-tab-btn ${activeTab === "delegate" ? "active" : ""}`}
            style={{ minHeight: 44, fontSize: "0.85rem" }}
          >
            🤝 {typograph("Делегирование")}
          </button>
          <button
            onClick={() => setActiveTab("execute")}
            className={`champ-tab-btn ${activeTab === "execute" ? "active" : ""}`}
            style={{ minHeight: 44, fontSize: "0.85rem" }}
          >
            ⚡ {typograph("Исполнить")}
          </button>
          <button
            onClick={() => setActiveTab("cancel")}
            className={`champ-tab-btn ${activeTab === "cancel" ? "active" : ""}`}
            style={{ minHeight: 44, fontSize: "0.85rem" }}
          >
            🛑 {typograph("Отменить")}
          </button>
        </div>

        {/* Active Function Card */}
        {activeTab === "create" && <CreateProposal />}
        {activeTab === "vote" && <CastVoted />}
        {activeTab === "buy" && <BuyRTK />}
        {activeTab === "delegate" && <Delagated />}
        {activeTab === "execute" && <ExecuteProposal />}
        {activeTab === "cancel" && <CanceledProposal />}
      </main>
    </div>
  );
};

export default FunctionPage;
