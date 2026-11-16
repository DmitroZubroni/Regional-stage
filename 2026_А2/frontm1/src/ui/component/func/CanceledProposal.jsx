import { useState, useContext } from "react";
import { AtlantContext } from "../../../core/context.jsx";
import VotingService from "../../../servise/VotingService.jsx";
import { typograph } from "../../../core/typograph";

const CanceledProposal = () => {
  const { wallet } = useContext(AtlantContext);
  const [proposalId, setProposalId] = useState("1");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);
    try {
      await VotingService.canceledProposal(proposalId, wallet);
      setFeedback({ type: "success", text: `Предложение #${proposalId} успешно отменено создателем!` });
    } catch {
      setFeedback({ type: "error", text: "Не удалось отменить предложение. Проверьте права автора." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="champ-card p-4 p-md-5 mb-4">
      <div className="d-flex align-items-center gap-2.5 mb-2">
        <span style={{ fontSize: 24 }}>🛑</span>
        <div>
          <h3 className="fs-5 fw-bold text-theme-main mb-0">
            {typograph("Отзыв и отмена предложения")}
          </h3>
          <p className="text-theme-muted mb-0" style={{ fontSize: "0.82rem" }}>
            {typograph("Доступно автору инициативы до момента достижения кворума")}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label text-theme-main fw-semibold" style={{ fontSize: "0.85rem" }}>
            {typograph("ID предложения для отмены")}
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
            className={`p-3 rounded-3 mb-3 ${
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
          className="champ-btn-secondary"
          style={{ minHeight: 44, borderColor: "var(--danger)", color: "var(--danger-text)" }}
        >
          <span>{loading ? "Отмена..." : typograph("Отозвать предложение")}</span>
        </button>
      </form>
    </div>
  );
};

export default CanceledProposal;
