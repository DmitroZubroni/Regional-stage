import GetProposal from "./GetProposal.jsx";
import GetVotes from "./GetVotes.jsx";

const ProposalCard =({proposalId}) => {

    return (
        <div className="container">
            <GetProposal proposalId={proposalId}/>
            <GetVotes proposalId={proposalId}/>
        </div>

    )
}
export default ProposalCard;