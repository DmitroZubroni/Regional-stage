import { useEffect, useState } from "react";
import VotingService from "../../../servise/VotingService.jsx";
import { typograph } from "../../../core/typograph";

const STATUS_LABELS = {
  0: "Создано / Ожидание",
  1: "Идет голосование",
  2: "Кворум достигнут",
  3: "Исполнено",
  4: "Отклонено",
};

const GetProposal = ({ proposalId }) => {
  const [infoProposal, setInfoProposal] = useState({
    proposer: "",
    targets: "",
    values: 0,
    voteEnd: 0,
    quorumeType: 0,
    proposalType: 0,
    proposalStatus: 0,
  });

  useEffect(() => {
    (async () => {
      try {
        const info = await VotingService.getProposal(proposalId);
        if (info) setInfoProposal(info);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [proposalId]);

  const endDate = infoProposal.voteEnd
    ? new Date(Number(infoProposal.voteEnd) * 1000).toLocaleString("ru-RU")
    : "—";

  const statusNum = Number(infoProposal.proposalStatus) || 0;
  const statusLabel = STATUS_LABELS[statusNum] || `Статус ${statusNum}`;

  return (
    <div>
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
        <div className="d-flex align-items-center gap-2">
          <span style={{ fontSize: 22 }}>📋</span>
          <h3 className="fs-5 fw-bold text-white mb-0">
            {typograph(`Голосование #${proposalId}`)}
          </h3>
        </div>
        <span className={statusNum === 3 ? "champ-badge-emerald" : "champ-badge-cyan"}>
          {typograph(statusLabel)}
        </span>
      </div>

      <div
        className="p-3.5 rounded-3"
        style={{ background: "#080D1A", border: "1px solid rgba(255, 255, 255, 0.06)" }}
      >
        <div className="row g-3">
          <div className="col-md-6">
            <span className="text-secondary mono-champ d-block" style={{ fontSize: "0.75rem" }}>
              {typograph("Создатель предложения (Proposer)")}
            </span>
            <div className="text-white mono-champ text-truncate" style={{ fontSize: "0.85rem" }}>
              {infoProposal.proposer?.toString() || "—"}
            </div>
          </div>

          <div className="col-md-6">
            <span className="text-secondary mono-champ d-block" style={{ fontSize: "0.75rem" }}>
              {typograph("Целевой адрес контракта (Target)")}
            </span>
            <div className="text-white mono-champ text-truncate" style={{ fontSize: "0.85rem" }}>
              {infoProposal.targets?.toString() || "—"}
            </div>
          </div>

          <div className="col-sm-4">
            <span className="text-secondary mono-champ d-block" style={{ fontSize: "0.75rem" }}>
              {typograph("Значение (Value)")}
            </span>
            <div className="text-white mono-champ fw-bold">
              {infoProposal.values?.toString() || 0}
            </div>
          </div>

          <div className="col-sm-4">
            <span className="text-secondary mono-champ d-block" style={{ fontSize: "0.75rem" }}>
              {typograph("Тип кворума")}
            </span>
            <div className="text-info mono-champ fw-bold">
              {infoProposal.quorumeType?.toString() || 0}
            </div>
          </div>

          <div className="col-sm-4">
            <span className="text-secondary mono-champ d-block" style={{ fontSize: "0.75rem" }}>
              {typograph("Окончание голосования")}
            </span>
            <div className="mono-champ text-white" style={{ fontSize: "0.85rem" }}>
              {endDate}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetProposal;
