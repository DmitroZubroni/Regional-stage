import {useContext, useEffect, useState} from "react";
import {AtlantContext} from "../../../core/context.jsx";
import VotingService from "../../../servise/VotingService.jsx";

const GetDelegates = () => {
    const {wallet} = useContext(AtlantContext);

    const [delegates, setDelegates] = useState([])

    useEffect(() => {
        (async () => {
            const info = await VotingService.getDelegates(wallet)
            setDelegates(info)
        })()
    },[wallet])

    return (
    <div className="container">
        <h2> ваши делегации </h2>
        {
            delegates.map((item, idx) => {
                return(
                    <div key={idx} >
                        <p> {item} </p>
                        <hr/>
                    </div>
                )
                })
        }
    </div>
    )
}
export default GetDelegates;