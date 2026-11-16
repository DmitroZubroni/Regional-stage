import { useState, useContext } from "react";
import { AtlantContext } from "../../../core/context.jsx";
import VotingService from "../../../servise/VotingService.jsx";
import { typograph } from "../../../core/typograph";

const Delagated = () => {
  const { wallet } = useContext(AtlantContext);
  const [proposalId, setProposalId] = useState("1");
  const [amount, setAmount] = useState("50");
  const [support, setSupport] = useState(true);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);
    try {
      await VotingService.delegated(proposalId, amount, support, wallet);
      setFeedback({ type: "success", text: `Успешно делегировано ${amount} голосов на предложение #${proposalId}!` });
    } catch {
      setFeedback({ type: "error", text: "Не удалось выполнить делегирование токенов." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="champ-card p-4 p-md-5 mb-4">
      <div className="d-flex align-items-center gap-2.5 mb-2">
        <span style={{ fontSize: 24 }}>🤝</span>
        <div>
          <h3 className="fs-5 fw-bold text-theme-main mb-0">
            {typograph("Делегирование голосов доверенному эксперту")}
          </h3>
          <p className="text-theme-muted mb-0" style={{ fontSize: "0.82rem" }}>
            {typograph("Передача веса токенов в пользу выбранной позиции голосования")}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label text-theme-main fw-semibold" style={{ fontSize: "0.85rem" }}>
              {typograph("ID предложения для делегации")}
            </label>
            <input
              type="number"
              className="champ-input mono-champ"
              value={proposalId}
              onChange={(e) => setProposalId(e.target.value)}
              min="1"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label text-theme-main fw-semibold" style={{ fontSize: "0.85rem" }}>
              {typograph("Количество токенов для делегирования")}
            </label>
            <input
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
                id="delegateSupport"
                type="checkbox"
                className="form-check-input my-0"
                checked={support}
                onChange={(e) => setSupport(e.target.checked)}
                style={{ width: 22, height: 22 }}
              />
              <label htmlFor="delegateSupport" className="form-check-label text-theme-main fw-semibold" style={{ fontSize: "0.88rem" }}>
                {typograph("Делегировать позицию «ЗА» принятие предложения")}
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
            <span aria-hidden="true">{feedback.type === "success" ? "✓" : "⚠️"}</span>
            <span>{typograph(feedback.text)}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="champ-btn-primary mt-4"
          style={{ minHeight: 44 }}
        >
          <span>{loading ? "Транзакция..." : typograph("Подтвердить делегирование")}</span>
        </button>
      </form>
    </div>
  );
};

export default Delagated;
