import Icon from "../Icon.jsx";
import { useState, useContext } from "react";
import { AtlantContext } from "../../../core/context.jsx";
import VotingService from "../../../servise/VotingService.jsx";
import { typograph } from "../../../core/typograph";
import Select from "../Select.jsx";

const QUORUM_OPTIONS = [
  { value: 1, label: "1 — Простое большинство (51%)" },
  { value: 2, label: "2 — Супербольшинство (66%)" },
  { value: 3, label: "3 — Консенсус экспертов (75%)" },
];

const PROPOSAL_TYPE_OPTIONS = [
  { value: 0, label: "0 — Фиксация регламента" },
  { value: 1, label: "1 — Выпуск токенов" },
  { value: 2, label: "2 — Интеграция модулей" },
];

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
        <Icon kind="document" />
        <div>
          <h2 className="fs-5 fw-bold text-theme-main mb-0">
            {typograph("Создание нового предложения DAO")}
          </h2>
          <p className="text-theme-muted mb-0" style={{ fontSize: "0.82rem" }}>
            {typograph("Регистрация смарт-контракта инициативы с параметрами кворума и таймера")}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="createproposal-field-1" className="form-label text-theme-main fw-semibold" style={{ fontSize: "0.85rem" }}>
              {typograph("Целевой контракт (Target Address)")}
            </label>
            <input id="createproposal-field-1"
              type="text"
              className="champ-input mono-champ"
              value={formData.target}
              onChange={(e) => setFormData({ ...formData, target: e.target.value })}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="createproposal-field-2" className="form-label text-theme-main fw-semibold" style={{ fontSize: "0.85rem" }}>
              {typograph("Период голосования (сек)")}
            </label>
            <input id="createproposal-field-2"
              type="number"
              className="champ-input"
              value={formData.period}
              onChange={(e) => setFormData({ ...formData, period: e.target.value })}
              min="300"
              required
            />
          </div>

          <div className="col-sm-4">
            <label htmlFor="createproposal-field-3" className="form-label text-theme-main fw-semibold" style={{ fontSize: "0.85rem" }}>
              {typograph("Значение (Value)")}
            </label>
            <input id="createproposal-field-3"
              type="number"
              className="champ-input"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              min="0"
              required
            />
          </div>

          <div className="col-sm-4">
            <Select
              label={typograph("Тип кворума")}
              options={QUORUM_OPTIONS}
              value={formData.quorumeType}
              onChange={(v) => setFormData({ ...formData, quorumeType: v })}
            />
          </div>

          <div className="col-sm-4">
            <Select
              label={typograph("Тип предложения")}
              options={PROPOSAL_TYPE_OPTIONS}
              value={formData.proposalType}
              onChange={(v) => setFormData({ ...formData, proposalType: v })}
            />
          </div>
        </div>

        {feedback && (
          <div
            role={feedback.type === "success" ? "status" : "alert"}
            aria-live="polite"
            className={`p-3 rounded-3 mt-3 d-flex align-items-start gap-2 ${
              feedback.type === "success" ? "champ-badge-emerald" : "champ-badge-danger"
            }`}
            style={{ width: "100%", fontSize: "0.85rem" }}
          >
            <span aria-hidden="true">{feedback.type === "success" ? <Icon kind="check" /> : <Icon kind="warning" />}</span>
            <span>{typograph(feedback.text)}</span>
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
