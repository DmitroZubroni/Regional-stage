import { useEffect, useState } from "react";
import VotingService from "../../../servise/VotingService.jsx";
import { typograph } from "../../../core/typograph";

const GetVotes = ({ proposalId }) => {
  const [votes, setVotes] = useState({ forVotes: 0, againstVotes: 0 });

  useEffect(() => {
    (async () => {
      try {
        const info = await VotingService.getVotes(proposalId);
        if (info) setVotes(info);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [proposalId]);

  const forCount = Number(votes.forVotes) || 0;
  const againstCount = Number(votes.againstVotes) || 0;
  const total = forCount + againstCount;
  const forPercent = total > 0 ? Math.round((forCount / total) * 100) : 50;

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h4 className="fs-6 fw-bold text-white mb-0">
          {typograph("Распределение голосов участников")}
        </h4>
        <span className="text-secondary mono-champ" style={{ fontSize: "0.8rem" }}>
          Всего: {total} {typograph("голосов")}
        </span>
      </div>

      {/* Vote Progress Bar */}
      <div
        className="w-100 rounded-pill overflow-hidden my-2.5 d-flex"
        style={{ height: 10, background: "rgba(244, 63, 94, 0.3)" }}
      >
        <div
          style={{
            width: `${total === 0 ? 50 : forPercent}%`,
            background: "linear-gradient(90deg, #10B981 0%, #059669 100%)",
            transition: "width 0.3s ease",
          }}
        />
      </div>

      <div className="d-flex align-items-center justify-content-between pt-1">
        <div className="d-flex align-items-center gap-2">
          <span
            style={{ width: 10, height: 10, borderRadius: "50%", background: "#10B981" }}
          />
          <span className="text-white mono-champ fw-bold" style={{ fontSize: "0.85rem" }}>
            ЗА: {forCount} ({forPercent}%)
          </span>
        </div>

        <div className="d-flex align-items-center gap-2">
          <span
            style={{ width: 10, height: 10, borderRadius: "50%", background: "#F43F5E" }}
          />
          <span className="text-white mono-champ fw-bold" style={{ fontSize: "0.85rem" }}>
            ПРОТИВ: {againstCount} ({100 - forPercent}%)
          </span>
        </div>
      </div>
    </div>
  );
};

export default GetVotes;
