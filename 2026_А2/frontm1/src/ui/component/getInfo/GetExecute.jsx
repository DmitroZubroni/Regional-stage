import { useEffect, useState} from "react";
import VotingService from "../../../servise/VotingService.jsx";

const GetDelegates = () => {

    const [execute, setExecute] = useState([])

    useEffect(() => {
        (async () => {
            const info = await VotingService.getExecuteIds()
            setExecute(info)
        })()
    },[])

    return (
        <div className="container">
            <h2> выполненные предложения </h2>
            {
                execute.map((item, idx) => {
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