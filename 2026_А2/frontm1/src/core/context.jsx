import {createContext, useEffect, useState} from "react";
import VotingService from "../servise/VotingService.jsx";
const AtlantContext = createContext({})

const AppProvider = ({ children }) => {
    const [wallet, setWallet] = useState("");
    const [person, setPerson] = useState({isDAO: false, ksiptBalance:0, gerdaBalance:0});

    const login = async () => {
        const info = await window.ethereum.request({method: "eth_requestAccounts"});
        const walletAddress = info[0]
        setWallet(walletAddress)
        /*
        localStorage.setItem("wallet", walletAddress)
         */
    }

    const logout = async () => {
        setWallet("")
        /*
        localStorage.removeItem("wallet")
         */
    }

    useEffect(() => {
        (async () => {
            const info = await VotingService.getPerson(wallet);
            setPerson(info)
        })()
    },[wallet])
    const values = {
        wallet,
        person,
        login,
        logout,
    }

    return <AtlantContext.Provider value={values}>{children}</AtlantContext.Provider>
}

export {AppProvider, AtlantContext}