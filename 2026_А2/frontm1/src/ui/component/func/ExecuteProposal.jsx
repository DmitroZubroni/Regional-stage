import { useState, useContext } from "react";
import { AtlantContext } from "../../../core/context.jsx";
import VotingService from "../../../servise/VotingService.jsx";
import { typograph } from "../../../core/typograph";

const ExecuteProposal = () => {
  const { wallet } = useContext(AtlantContext);
  const [proposalId, setProposalId] = useState("2");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);
    try {
      await VotingService.executeProposal(proposalId, wallet);
      setFeedback({
        type: "success",
        text: `Предложение #${proposalId} успешно исполнено смарт-контрактом!`,
      });
    } catch {
      setFeedback({
        type: "error",
        text: "Не удалось исполнить предложение. Проверьте, достигнут ли кворум.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="champ-card p-4 p-md-5 mb-4">
      <div className="d-flex align-items-center gap-2.5 mb-2">
        <span style={{ fontSize: 24 }}>⚡</span>
        <div>
          <h3 className="fs-5 fw-bold text-theme-main mb-0">
            {typograph("Исполнение решения, достигшего кворума")}
          </h3>
          <p className="text-theme-muted mb-0" style={{ fontSize: "0.82rem" }}>
            {typograph("Приведение в действие смарт-контракта после завершения голосования")}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label text-theme-main fw-semibold" style={{ fontSize: "0.85rem" }}>
            {typograph("ID предложения для исполнения")}
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

        {feedback && (
          <div
            role={feedback.type === "success" ? "status" : "alert"}
            aria-live="polite"
            className={`p-3 rounded-3 mb-3 d-flex align-items-start gap-2 ${
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
          className="champ-btn-primary"
          style={{ minHeight: 44, background: "linear-gradient(135deg, #10b981 0%, #059669 100%)", borderColor: "#34d399" }}
        >
          <span>{loading ? "Вызов контракта..." : typograph("Исполнить предложение")}</span>
        </button>
      </form>
    </div>
  );
};

export default ExecuteProposal;
