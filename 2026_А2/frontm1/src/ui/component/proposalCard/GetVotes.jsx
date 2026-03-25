import {FormLabel} from "react-bootstrap";
import {useEffect, useState} from "react";
import VotingService from "../../../servise/VotingService.jsx";

const GetVotes = ({proposalId}) => {
    const[votes, setVotes] = useState({forVotes:0, againstVotes:0});

    useEffect(() => {
        (async () => {
            const info = await VotingService.getVotes(proposalId);
            setVotes(info)
        })()
    },[proposalId])

    return (
        <div>
            <h2>Голоса по предложению</h2>
            <FormLabel column={1}>голоса за - {votes.forVotes?.toString() || 0}</FormLabel>
            <hr/>
            <FormLabel column={1}>голоса против - {votes.againstVotes?.toString() || 0}</FormLabel>
        </div>
    )
}
export default GetVotes;