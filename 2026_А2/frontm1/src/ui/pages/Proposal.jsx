import Header from "../component/Header.jsx";
import {useEffect, useState} from "react";
import VotingService from "../../servise/VotingService.jsx";
import ProposalCard from "../component/proposalCard/ProposalCard.jsx";

const Proposal = () => {

    const [proposals, setProposals] = useState([]);

    useEffect(() => {
        (async () => {
            const info = await VotingService.getProposalIds()
            setProposals(info)
        })()
    },[])

    return (
        <div>
            <Header/>
            <h2 className='container'>все существующие голосования в системе </h2>
            {
                proposals.map((item, idx) => {
                    return(
                        <div key={idx} >
                            <ProposalCard proposalId={item} />
                            <hr/>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Proposal