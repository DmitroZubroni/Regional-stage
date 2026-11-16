import { useState, useContext } from "react";
import { AtlantContext } from "../../../core/context.jsx";
import VotingService from "../../../servise/VotingService.jsx";
import { typograph } from "../../../core/typograph";

const CreateProposal = () => {
  const { wallet } = useContext(AtlantContext);
  const [formData, setFormData] = useState({
    period: 86400,
    target: "0x72d98788997e874819a3E6371f47Fe8E46348193",
    value: 0,
    quorumeType: 1,
    proposalType: 0,
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);
    try {
      await VotingService.createProposal(
        formData.period,
        formData.target,
        formData.value,
        formData.quorumeType,
        formData.proposalType,
        wallet
      );
      setFeedback({ type: "success", text: "Предложение успешно создано и зарегистрировано в блокчейне!" });
    } catch {
      setFeedback({ type: "error", text: "Не удалось создать предложение. Проверьте права DAO." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="champ-card p-4 p-md-5 mb-4">
      <div className="d-flex align-items-center gap-2.5 mb-2">
        <span style={{ fontSize: 24 }}>📝</span>
        <div>
          <h3 className="fs-5 fw-bold text-theme-main mb-0">
            {typograph("Создание нового предложения DAO")}
          </h3>
          <p className="text-theme-muted mb-0" style={{ fontSize: "0.82rem" }}>
            {typograph("Регистрация смарт-контракта инициативы с параметрами кворума и таймера")}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label text-theme-main fw-semibold" style={{ fontSize: "0.85rem" }}>
              {typograph("Целевой контракт (Target Address)")}
            </label>
            <input
              type="text"
              className="champ-input mono-champ"
              value={formData.target}
              onChange={(e) => setFormData({ ...formData, target: e.target.value })}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label text-theme-main fw-semibold" style={{ fontSize: "0.85rem" }}>
              {typograph("Период голосования (сек)")}
            </label>
            <input
              type="number"
              className="champ-input"
              value={formData.period}
              onChange={(e) => setFormData({ ...formData, period: e.target.value })}
              min="300"
              required
            />
          </div>

          <div className="col-sm-4">
            <label className="form-label text-theme-main fw-semibold" style={{ fontSize: "0.85rem" }}>
              {typograph("Значение (Value)")}
            </label>
            <input
              type="number"
              className="champ-input"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              min="0"
              required
            />
          </div>

          <div className="col-sm-4">
            <label className="form-label text-theme-main fw-semibold" style={{ fontSize: "0.85rem" }}>
              {typograph("Тип кворума")}
            </label>
            <select
              className="champ-input"
              value={formData.quorumeType}
              onChange={(e) => setFormData({ ...formData, quorumeType: Number(e.target.value) })}
            >
              <option value={1}>{typograph("1 — Простое большинство (51%)")}</option>
              <option value={2}>{typograph("2 — Супербольшинство (66%)")}</option>
              <option value={3}>{typograph("3 — Консенсус экспертов (75%)")}</option>
            </select>
          </div>

          <div className="col-sm-4">
            <label className="form-label text-theme-main fw-semibold" style={{ fontSize: "0.85rem" }}>
              {typograph("Тип предложения")}
            </label>
            <select
              className="champ-input"
              value={formData.proposalType}
              onChange={(e) => setFormData({ ...formData, proposalType: Number(e.target.value) })}
            >
              <option value={0}>{typograph("0 — Фиксация регламента")}</option>
              <option value={1}>{typograph("1 — Выпуск токенов")}</option>
              <option value={2}>{typograph("2 — Интеграция модулей")}</option>
            </select>
          </div>
        </div>

        {feedback && (
          <div
            className={`p-3 rounded-3 mt-3 ${
              feedback.type === "success" ? "champ-badge-emerald" : "champ-badge-danger"
            }`}
            style={{ width: "100%", fontSize: "0.85rem" }}
          >
            {typograph(feedback.text)}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="champ-btn-primary mt-4"
          style={{ minHeight: 44 }}
        >
          <span>{loading ? "Формирование блока..." : typograph("Опубликовать предложение")}</span>
        </button>
      </form>
    </div>
  );
};

export default CreateProposal;
