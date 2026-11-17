import Icon from "../Icon.jsx";
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
    title: "",
    description: "",
    proposer: "",
    targets: "",
    values: 0,
    voteEnd: 0,
    quorumeType: 1,
    proposalType: 0,
    proposalStatus: 1,
  });

  useEffect(() => {
    (async () => {
      try {
        const info = await VotingService.getProposal(proposalId);
        if (info) {
          setInfoProposal({
            title: info.title || `Голосование #${proposalId}`,
            description: info.description || "Описание предложения не указано.",
            proposer: info.proposer || info.target || "0x72d98788997e874819a3E6371f47Fe8E46348193",
            targets: info.targets || info.target || "0x72d98788997e874819a3E6371f47Fe8E46348193",
            values: info.values || info.value || 0,
            voteEnd: info.voteEnd || info.period || 0,
            quorumeType: info.quorumeType || info.quorumType || 1,
            proposalType: info.proposalType || 0,
            proposalStatus: info.proposalStatus || (info.executed ? 3 : 1),
          });
        }
      } catch (err) {
        console.error("Failed to load proposal details:", err);
      }
    })();
  }, [proposalId]);

  const endDate = infoProposal.voteEnd
    ? new Date(Number(infoProposal.voteEnd) * 1000).toLocaleString("ru-RU")
    : "18 ноября 2026, 18:00";

  const statusNum = Number(infoProposal.proposalStatus) || 1;
  const statusLabel = STATUS_LABELS[statusNum] || `Статус ${statusNum}`;

  return (
    <div>
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
        <div className="d-flex align-items-center gap-2.5">
          <Icon kind="document" />
          <div>
            <h3 className="fs-5 fw-bold text-theme-main mb-0">
              {typograph(infoProposal.title || `Голосование #${proposalId}`)}
            </h3>
            <span className="text-theme-muted mono-champ" style={{ fontSize: "0.75rem" }}>
              ID ПРЕДЛОЖЕНИЯ: #{proposalId}
            </span>
          </div>
        </div>
        <span className={statusNum === 3 ? "champ-badge-emerald" : "champ-badge-cyan"}>
          {typograph(statusLabel)}
        </span>
      </div>

      <p className="text-theme-muted mb-3" style={{ fontSize: "0.875rem", lineHeight: 1.6 }}>
        {typograph(infoProposal.description)}
      </p>

      <div
        className="p-3.5 rounded-3 mb-3"
        style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
      >
        <div className="row g-3">
          <div className="col-md-6">
            <span className="text-theme-muted mono-champ d-block" style={{ fontSize: "0.72rem" }}>
              {typograph("Создатель предложения (Proposer)")}
            </span>
            <div className="text-theme-main mono-champ text-truncate" style={{ fontSize: "0.85rem" }}>
              {infoProposal.proposer?.toString() || "0x72d9...8193"}
            </div>
          </div>

          <div className="col-md-6">
            <span className="text-theme-muted mono-champ d-block" style={{ fontSize: "0.72rem" }}>
              {typograph("Целевой контракт (Target)")}
            </span>
            <div className="text-theme-main mono-champ text-truncate" style={{ fontSize: "0.85rem" }}>
              {infoProposal.targets?.toString() || "0x72d9...8193"}
            </div>
          </div>

          <div className="col-sm-4">
            <span className="text-theme-muted mono-champ d-block" style={{ fontSize: "0.72rem" }}>
              {typograph("Значение (Value RTK)")}
            </span>
            <div className="text-theme-main mono-champ fw-bold" style={{ fontSize: "0.95rem" }}>
              {infoProposal.values?.toString() || 0} RTK
            </div>
          </div>

          <div className="col-sm-4">
            <span className="text-theme-muted mono-champ d-block" style={{ fontSize: "0.72rem" }}>
              {typograph("Тип кворума")}
            </span>
            <div className="text-cyan mono-champ fw-bold" style={{ fontSize: "0.95rem" }}>
              {infoProposal.quorumeType === 2 ? "Супербольшинство (75%)" : "Простое (51%)"}
            </div>
          </div>

          <div className="col-sm-4">
            <span className="text-theme-muted mono-champ d-block" style={{ fontSize: "0.72rem" }}>
              {typograph("Окончание приёма")}
            </span>
            <div className="mono-champ text-theme-main" style={{ fontSize: "0.85rem" }}>
              {endDate}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetProposal;
