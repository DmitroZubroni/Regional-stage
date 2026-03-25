import Header from "../component/Header.jsx";
import {useContext} from "react";
import {AtlantContext} from "../../core/context.jsx";
import BuyRTK from "../component/func/BuyRTK.jsx";
import Delagated from "../component/func/Delagated.jsx";
import CreateProposal from "../component/func/CreateProposal.jsx";
import CastVoted from "../component/func/CastVoted.jsx";
import CanceledProposal from "../component/func/CanceledProposal.jsx";
import ExecuteProposal from "../component/func/ExecuteProposal.jsx";

const Function = () => {

    const {person} =useContext(AtlantContext);

    return (
        <div>
            <Header/>
            {
                person.isDAO === false ?
                    <>
                        <BuyRTK/>
                        <Delagated/>
                    </>:
                    <>
                        <CreateProposal/>
                        <CastVoted/>
                        <CanceledProposal/>
                        <ExecuteProposal/>
                    </>
            }
        </div>
    )
}
export default Function