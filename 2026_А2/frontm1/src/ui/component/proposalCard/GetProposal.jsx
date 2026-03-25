import {useEffect, useState} from "react";
import VotingService from "../../../servise/VotingService.jsx";
import {FormLabel} from "react-bootstrap";

const GetProposal = ({proposalId}) => {

    const [infoProposal, setInfoProposal] = useState({proposer: "",
        targets: "",
        values: 0,
        voteEnd: 0,
        quorumeType: 0,
        proposalType: 0,
        proposalStatus: 0});

    useEffect(() => {
        (async () => {
            const info = await VotingService.getProposal(proposalId);
            setInfoProposal(info);
            console.log(info);
        })()
    },[proposalId])

    return(
        <div>
            <h2>общая информация </h2>
            <FormLabel column={1}> айди голосования - {proposalId}</FormLabel>
            <hr/>

            <FormLabel column={1}>создатель голосования - {infoProposal.proposer?.toString() || ""}</FormLabel>
            <hr/>

            <FormLabel column={1}> адрес - {infoProposal.targets?.toString() || ""}</FormLabel>
            <hr/>

            <FormLabel column={1}>количесвто -  {infoProposal.values?.toString() || 0}</FormLabel>
            <hr/>

            <FormLabel column={1}>время окончания - {new Date(Number(infoProposal.voteEnd) * 1000)?.toLocaleString() || 0} </FormLabel>
            <hr/>

            <FormLabel column={1}>тип кворума - {infoProposal.quorumeType?.toString() || 0} </FormLabel>
            <hr/>

            <FormLabel column={1}>тип голосования -  {infoProposal.proposalType?.toString() || 0}</FormLabel>
            <hr/>

            <FormLabel column={1}>статус голосования -  {infoProposal.proposalStatus?.toString() || 0}</FormLabel>

        </div>
    )
}

export default GetProposal;