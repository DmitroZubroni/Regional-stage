import {createContext, useState} from "react";
const AtlantContext = createContext({})

const AppProvider = ({ children }) => {

    const [url,setUrl] = useState("")
    const [sender, setSender] = useState("")
    const [keypairPassword, setKeypairPassword] = useState("")
    const [contractId, setContractId] = useState("")

    const[isAuthorized, setIsAuthorized] = useState();

    const login = ({ url, sender, password, contractId }) => {
        setUrl(url);
        setSender(sender);
        setKeypairPassword(password);
        setContractId(contractId);
        setIsAuthorized(true);
    };

    const logout =  async () =>  {
        await setIsAuthorized(false)
        setUrl("")
        setSender("")
        setKeypairPassword("")
        setContractId("")
    }
    const post = async (params) => {
        try {
            const res = await fetch(`http://localhost:${url}/transactions/signAndBroadcast`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contractId: contractId,
                    fee: 10,
                    sender: sender,
                    password: keypairPassword,
                    type: 104,
                    params: params,
                    version: 2,
                    contractVersion: 1,
                }),
            });

            const result = await res.json();
            console.log(result);
            alert("успешно");
        } catch  {
            alert("не получилось выполнить транзакцию")
        }
    };


    const values = {
        url,
        sender,
        keypairPassword,
        isAuthorized,
        contractId,
        setUrl,
        setSender,
        setKeypairPassword,
        setIsAuthorized,
        setContractId,
        login,
        logout,
        post
    }

    return <AtlantContext.Provider value={values}>{children}</AtlantContext.Provider>
}
export {AppProvider, AtlantContext}