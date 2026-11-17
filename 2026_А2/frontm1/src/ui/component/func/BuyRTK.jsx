import Icon from "../Icon.jsx";
import { useState, useContext } from "react";
import { AtlantContext } from "../../../core/context.jsx";
import VotingService from "../../../servise/VotingService.jsx";
import { typograph } from "../../../core/typograph";

const BuyRTK = () => {
  const { wallet } = useContext(AtlantContext);
  const [amount, setAmount] = useState(100);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);
    try {
      const valueAmount = amount * 10 ** 11;
      await VotingService.buyRTK(amount, valueAmount, wallet);
      setFeedback({ type: "success", text: `Успешно приобретено ${amount} токенов GERDA!` });
    } catch {
      setFeedback({ type: "error", text: "Не удалось выполнить покупку токенов в смарт-контракте." });
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
            {typograph("Приобретение наградных токенов GERDA")}
          </h2>
          <p className="text-theme-muted mb-0" style={{ fontSize: "0.82rem" }}>
            {typograph("Покупка токенов смарт-контракта для участия в пулах наград и валидации")}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="rtkAmount" className="form-label text-theme-main fw-semibold" style={{ fontSize: "0.85rem" }}>
            {typograph("Количество токенов GERDA для покупки")}
          </label>
          <input
            id="rtkAmount"
            type="number"
            className="champ-input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1"
            placeholder="100"
            required
          />
          <div className="text-theme-muted mt-1" style={{ fontSize: "0.75rem" }}>
            {typograph("Эквивалент списания: ")}{(amount * 0.0001).toFixed(4)} ETH
          </div>
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
            <span aria-hidden="true">{feedback.type === "success" ? <Icon kind="check" /> : <Icon kind="warning" />}</span>
            <span>{typograph(feedback.text)}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="champ-btn-primary"
          style={{ minHeight: 44 }}
        >
          <span>{loading ? "Обработка..." : typograph("Купить токены GERDA")}</span>
        </button>
      </form>
    </div>
  );
};

export default BuyRTK;
