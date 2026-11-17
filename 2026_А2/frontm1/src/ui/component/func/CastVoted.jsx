import Icon from "../Icon.jsx";
import { useState, useContext } from "react";
import { AtlantContext } from "../../../core/context.jsx";
import VotingService from "../../../servise/VotingService.jsx";
import { typograph } from "../../../core/typograph";

const CastVoted = () => {
  const { wallet } = useContext(AtlantContext);
  const [proposalId, setProposalId] = useState("1");
  const [amount, setAmount] = useState("10");
  const [support, setSupport] = useState(true);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);
    try {
      await VotingService.castVoted(proposalId, amount, support, wallet);
      setFeedback({
        type: "success",
        text: `Ваш голос (${support ? "ЗА" : "ПРОТИВ"}) весом ${amount} токенов успешно зафиксирован!`,
      });
    } catch {
      setFeedback({ type: "error", text: "Не удалось зафиксировать голос в блокчейне." });
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
            {typograph("Прямое голосование по предложению")}
          </h2>
          <p className="text-theme-muted mb-0" style={{ fontSize: "0.82rem" }}>
            {typograph("Фиксация голоса в смарт-контракте с учётом персонального баланса KSIPT")}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="castvoted-field-1" className="form-label text-theme-main fw-semibold" style={{ fontSize: "0.85rem" }}>
              {typograph("ID предложения")}
            </label>
            <input id="castvoted-field-1"
              type="number"
              className="champ-input mono-champ"
              value={proposalId}
              onChange={(e) => setProposalId(e.target.value)}
              min="1"
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="castvoted-field-2" className="form-label text-theme-main fw-semibold" style={{ fontSize: "0.85rem" }}>
              {typograph("Количество отдаваемых голосов")}
            </label>
            <input id="castvoted-field-2"
              type="number"
              className="champ-input mono-champ"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
              required
            />
          </div>

          <div className="col-12">
            <div className="d-flex align-items-center gap-3 p-3 rounded-3" style={{ background: "var(--surface-2)" }}>
              <input
                id="castSupport"
                type="checkbox"
                className="form-check-input my-0"
                checked={support}
                onChange={(e) => setSupport(e.target.checked)}
                style={{ width: 22, height: 22 }}
              />
              <label htmlFor="castSupport" className="form-check-label text-theme-main fw-semibold" style={{ fontSize: "0.88rem" }}>
                {typograph("Голосовать «ЗА» принятие данного предложения")}
              </label>
            </div>
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
          <span>{loading ? "Подписание..." : typograph("Отправить голос в смарт-контракт")}</span>
        </button>
      </form>
    </div>
  );
};

export default CastVoted;
