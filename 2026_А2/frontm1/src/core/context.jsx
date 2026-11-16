import { createContext, useEffect, useState } from "react";
import VotingService from "../servise/VotingService.jsx";

const AtlantContext = createContext({});

const DEMO_WALLET = "0x71562b71999873db5b286df957af199ec94617f7";

const AppProvider = ({ children }) => {
  const [wallet, setWallet] = useState(() => {
    return localStorage.getItem("champ-wallet") || DEMO_WALLET;
  });
  const [person, setPerson] = useState({
    isDAO: true,
    ksiptBalance: 1250,
    gerdaBalance: 340,
    role: "Эксперт компетенции",
    reputation: 98,
  });
  const [isDemo, setIsDemo] = useState(true);

  const login = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const info = await window.ethereum.request({ method: "eth_requestAccounts" });
        const walletAddress = info[0];
        setWallet(walletAddress);
        setIsDemo(false);
        localStorage.setItem("champ-wallet", walletAddress);
        return;
      } catch (err) {
        console.warn("MetaMask connection rejected or failed, falling back to demo account:", err);
      }
    }
    // Fallback demo account
    setWallet(DEMO_WALLET);
    setIsDemo(true);
    localStorage.setItem("champ-wallet", DEMO_WALLET);
  };

  const logout = () => {
    setWallet("");
    localStorage.removeItem("champ-wallet");
  };

  const switchAccount = (type) => {
    if (type === "expert") {
      setWallet("0x71562b71999873db5b286df957af199ec94617f7");
      setPerson({ isDAO: true, ksiptBalance: 1250, gerdaBalance: 340, role: "Главный эксперт", reputation: 99 });
    } else {
      setWallet("0xae07bb296119b6f2bad36121af1b9c1a9f21f267");
      setPerson({ isDAO: false, ksiptBalance: 300, gerdaBalance: 50, role: "Участник этапа", reputation: 82 });
    }
  };

  useEffect(() => {
    (async () => {
      try {
        if (wallet) {
          const info = await VotingService.getPerson(wallet);
          if (info) {
            setPerson({
              isDAO: Boolean(info.isDAO ?? true),
              ksiptBalance: Number(info.ksiptBalance || 1250),
              gerdaBalance: Number(info.gerdaBalance || 340),
              role: info.role || "Участник чемпионата",
              reputation: info.reputation || 95,
            });
          }
        }
      } catch (e) {
        console.warn("Failed to load person data:", e);
      }
    })();
  }, [wallet]);

  const values = {
    wallet,
    person,
    isDemo,
    login,
    logout,
    switchAccount,
    setWallet,
  };

  return <AtlantContext.Provider value={values}>{children}</AtlantContext.Provider>;
};

export { AppProvider, AtlantContext };
