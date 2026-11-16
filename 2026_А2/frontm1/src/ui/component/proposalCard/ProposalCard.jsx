import GetProposal from "./GetProposal.jsx";
import GetVotes from "./GetVotes.jsx";

const ProposalCard = ({ proposalId }) => {
  return (
    <div className="champ-card p-4 p-md-5 mb-4">
      <GetProposal proposalId={proposalId} />
      <hr className="my-4 border-theme" />
      <GetVotes proposalId={proposalId} />
    </div>
  );
};

export default ProposalCard;
