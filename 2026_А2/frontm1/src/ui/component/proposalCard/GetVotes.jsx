import { useEffect, useState, useContext } from "react";
import VotingService from "../../../servise/VotingService.jsx";
import { AtlantContext } from "../../../core/context.jsx";
import { typograph } from "../../../core/typograph";

const GetVotes = ({ proposalId }) => {
  const { wallet } = useContext(AtlantContext);
  const [votes, setVotes] = useState({ forVotes: 18, againstVotes: 3 });
  const [votingAction, setVotingAction] = useState(false);
  const [votedMessage, setVotedMessage] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const info = await VotingService.getVotes(proposalId);
        if (info) {
          setVotes({
            forVotes: Number(info.forVotes ?? info[0] ?? 18),
            againstVotes: Number(info.againstVotes ?? info[1] ?? 3),
          });
        }
      } catch (err) {
        console.error("Failed to load votes:", err);
      }
    })();
  }, [proposalId]);

  const handleVote = async (support) => {
    setVotingAction(true);
    setVotedMessage(null);
    try {
      await VotingService.castVoted(proposalId, 1, support, wallet);
      setVotes((prev) => ({
        forVotes: support ? prev.forVotes + 1 : prev.forVotes,
        againstVotes: !support ? prev.againstVotes + 1 : prev.againstVotes,
      }));
      setVotedMessage(support ? "Голос «ЗА» успешно зафиксирован!" : "Голос «ПРОТИВ» успешно зафиксирован!");
    } catch (e) {
      console.error(e);
      setVotedMessage("Ошибка фиксации голоса.");
    } finally {
      setVotingAction(false);
    }
  };

  const forCount = Number(votes.forVotes) || 0;
  const againstCount = Number(votes.againstVotes) || 0;
  const total = forCount + againstCount;
  const forPercent = total > 0 ? Math.round((forCount / total) * 100) : 50;

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h4 className="fs-6 fw-bold text-theme-main mb-0">
          {typograph("Распределение голосов участников")}
        </h4>
        <span className="text-theme-muted mono-champ" style={{ fontSize: "0.8rem" }}>
          Всего: {total} {typograph("голосов")}
        </span>
      </div>

      {/* Vote Progress Bar */}
      <div
        className="w-100 rounded-pill overflow-hidden my-2.5 d-flex"
        style={{ height: 10, background: "rgba(239, 68, 68, 0.25)" }}
      >
        <div
          style={{
            width: `${total === 0 ? 50 : forPercent}%`,
            background: "linear-gradient(90deg, #10b981 0%, #059669 100%)",
            transition: "width 0.4s ease",
          }}
        />
      </div>

      <div className="d-flex align-items-center justify-content-between pt-1 mb-3">
        <div className="d-flex align-items-center gap-2">
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#10b981" }} />
          <span className="text-theme-main mono-champ fw-bold" style={{ fontSize: "0.85rem" }}>
            ЗА: {forCount} ({forPercent}%)
          </span>
        </div>

        <div className="d-flex align-items-center gap-2">
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444" }} />
          <span className="text-theme-main mono-champ fw-bold" style={{ fontSize: "0.85rem" }}>
            ПРОТИВ: {againstCount} ({100 - forPercent}%)
          </span>
        </div>
      </div>

      {/* Interactive Quick Vote Controls */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 pt-2 border-top border-theme">
        <div className="d-flex align-items-center gap-2">
          <button
            onClick={() => handleVote(true)}
            disabled={votingAction}
            className="champ-btn-primary py-1.5 px-3"
            style={{
              minHeight: 38,
              fontSize: "0.82rem",
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              borderColor: "#34d399",
            }}
          >
            👍 {typograph("Проголосовать ЗА")}
          </button>
          <button
            onClick={() => handleVote(false)}
            disabled={votingAction}
            className="champ-btn-secondary py-1.5 px-3"
            style={{ minHeight: 38, fontSize: "0.82rem", borderColor: "var(--danger)" }}
          >
            👎 {typograph("Проголосовать ПРОТИВ")}
          </button>
        </div>

        {votedMessage && (
          <span
            className={
              votedMessage.includes("успешно")
                ? "champ-badge-emerald mono-champ"
                : "champ-badge-danger mono-champ"
            }
            style={{ fontSize: "0.78rem" }}
          >
            {typograph(votedMessage)}
          </span>
        )}
      </div>
    </div>
  );
};

export default GetVotes;
