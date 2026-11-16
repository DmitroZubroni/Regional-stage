import { Web3 } from "web3";
import abi from "./abi.json";

// Realistic Championship Mock Fixtures (PROMPT.md: Ресурсосбережение без тяжёлых нод Docker)
const INITIAL_PROPOSALS = [
  {
    id: 1,
    title: "Фиксация регламента модуля А2: Консенсус 66% для кворума",
    description: "Утверждение минимального порога кворума в 66% для голосования по протоколу RTK на чемпионате 2026.",
    target: "0x72d98788997e874819a3E6371f47Fe8E46348193",
    value: 0,
    period: 1731900000,
    quorumType: 1,
    proposalType: 0,
    votesFor: 18,
    votesAgainst: 3,
    totalVoted: 21,
    quorumNeeded: 24,
    status: "Активно",
    executed: false,
    canceled: false,
  },
  {
    id: 2,
    title: "Выпуск наградного пула токенов GERDA для призёров региона",
    description: "Эмиссия 10 000 токенов GERDA в наградной смарт-контракт регионального этапа.",
    target: "0x15c851762fd9098ce3ce50c6972e66d546410522",
    value: 50,
    period: 1731950000,
    quorumType: 2,
    proposalType: 1,
    votesFor: 26,
    votesAgainst: 1,
    totalVoted: 27,
    quorumNeeded: 24,
    status: "Кворум достигнут",
    executed: false,
    canceled: false,
  },
  {
    id: 3,
    title: "Интеграция шлюза данных логистического реестра Waves Enterprise",
    description: "Настройка кросс-чейн моста между EVM-голосованием модуля А2 и почтовыми смарт-контрактами модуля B2.",
    target: "0xae07bb296119b6f2bad36121af1b9c1a9f21f267",
    value: 120,
    period: 1732000000,
    quorumType: 1,
    proposalType: 2,
    votesFor: 14,
    votesAgainst: 9,
    totalVoted: 23,
    quorumNeeded: 24,
    status: "Активно",
    executed: false,
    canceled: false,
  },
];

const INITIAL_EXECUTED = [
  {
    id: 99,
    title: "Активация смарт-контракта голосования регионального этапа 2026",
    executedAt: "16 ноября 2026",
    txHash: "0x4a9f...e102",
  },
  {
    id: 98,
    title: "Регистрация экспертного пула жюри чемпионата",
    executedAt: "15 ноября 2026",
    txHash: "0x7b3d...99aa",
  },
];

class VotingService {
  contractAddress = "0x72d98788997e874819a3E6371f47Fe8E46348193";
  web3 = null;
  contrcat = null;
  mockProposals = [...INITIAL_PROPOSALS];
  mockExecuted = [...INITIAL_EXECUTED];
  mockDelegates = [
    "0x71562b71999873db5b286df957af199ec94617f7",
    "0xae07bb296119b6f2bad36121af1b9c1a9f21f267",
    "0xd2b64c47e49a3b4da34a434a12995aaccafbc88f",
  ];

  constructor() {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        this.web3 = new Web3(window.ethereum);
        this.contrcat = new this.web3.eth.Contract(abi, this.contractAddress);
      } catch (e) {
        console.warn("Web3 initialization warning:", e);
      }
    }
  }

  isLiveWeb3Available() {
    return Boolean(this.web3 && this.contrcat && window.ethereum?.selectedAddress);
  }

  async buyRTK(amount, valueAmount, wallet) {
    if (this.isLiveWeb3Available()) {
      return await this.contrcat.methods.buyRTK(amount).send({ from: wallet, value: valueAmount });
    }
    // Mock simulation
    await new Promise((res) => setTimeout(res, 400));
    return { status: true, txHash: "0xmock" + Math.random().toString(16).slice(2) };
  }

  async createProposal(period, target, value, quorumeType, proposalType, wallet) {
    if (this.isLiveWeb3Available()) {
      return await this.contrcat.methods
        .createProposal(period, target, value, quorumeType, proposalType)
        .send({ from: wallet });
    }
    // Mock simulation
    await new Promise((res) => setTimeout(res, 400));
    const newId = this.mockProposals.length + 1;
    const newProposal = {
      id: newId,
      title: `Предложение #${newId}: Инициатива чемпионата`,
      description: `Смарт-контракт цель: ${target || "0x..."}. Тип кворума: ${quorumeType}`,
      target: target || "0x72d98788997e874819a3E6371f47Fe8E46348193",
      value: value || 0,
      period: Math.floor(Date.now() / 1000) + Number(period || 86400),
      quorumType: Number(quorumeType) || 1,
      proposalType: Number(proposalType) || 0,
      votesFor: 1,
      votesAgainst: 0,
      totalVoted: 1,
      quorumNeeded: 24,
      status: "Активно",
      executed: false,
      canceled: false,
    };
    this.mockProposals.push(newProposal);
    return { status: true, id: newId };
  }

  async castVoted(proposalId, amount, support, wallet) {
    if (this.isLiveWeb3Available()) {
      return await this.contrcat.methods.castVoted(proposalId, amount, support).send({ from: wallet });
    }
    await new Promise((res) => setTimeout(res, 400));
    const prop = this.mockProposals.find((p) => p.id === Number(proposalId));
    if (prop) {
      if (support) prop.votesFor += Number(amount) || 1;
      else prop.votesAgainst += Number(amount) || 1;
      prop.totalVoted = prop.votesFor + prop.votesAgainst;
      if (prop.votesFor >= prop.quorumNeeded) {
        prop.status = "Кворум достигнут";
      }
    }
    return { status: true };
  }

  async delegated(proposalId, amount, support, wallet) {
    if (this.isLiveWeb3Available()) {
      return await this.contrcat.methods.delegated(proposalId, amount).send({ from: wallet });
    }
    await new Promise((res) => setTimeout(res, 300));
    return { status: true };
  }

  async canceledProposal(proposalId, wallet) {
    if (this.isLiveWeb3Available()) {
      return await this.contrcat.methods.canceledProposal(proposalId).send({ from: wallet });
    }
    await new Promise((res) => setTimeout(res, 300));
    const prop = this.mockProposals.find((p) => p.id === Number(proposalId));
    if (prop) prop.canceled = true;
    return { status: true };
  }

  async executeProposal(proposalId, wallet) {
    if (this.isLiveWeb3Available()) {
      return await this.contrcat.methods.executeProposal(proposalId, wallet);
    }
    await new Promise((res) => setTimeout(res, 400));
    const prop = this.mockProposals.find((p) => p.id === Number(proposalId));
    if (prop) {
      prop.executed = true;
      this.mockExecuted.unshift({
        id: prop.id,
        title: prop.title,
        executedAt: new Date().toLocaleDateString("ru-RU"),
        txHash: "0xexec" + Math.random().toString(16).slice(2, 8),
      });
    }
    return { status: true };
  }

  async getPerson(wallet) {
    if (this.isLiveWeb3Available()) {
      try {
        return await this.contrcat.methods.getPerson().call({ from: wallet });
      } catch (e) {
        console.warn("Live getPerson failed, using demo state:", e);
      }
    }
    return {
      isDAO: true,
      ksiptBalance: 1250,
      gerdaBalance: 340,
      role: "Эксперт компетенции",
      reputation: 98,
    };
  }

  async getDelegates(wallet) {
    if (this.isLiveWeb3Available()) {
      try {
        return await this.contrcat.methods.getDelegates().call({ from: wallet });
      } catch (e) {
        console.warn("Live getDelegates failed, using demo:", e);
      }
    }
    return this.mockDelegates;
  }

  async getProposalIds() {
    if (this.isLiveWeb3Available()) {
      try {
        const ids = await this.contrcat.methods.getProposalIds().call();
        if (ids && ids.length) return ids;
      } catch (e) {
        console.warn("Live getProposalIds failed, using fixtures:", e);
      }
    }
    return this.mockProposals.map((p) => p.id);
  }

  async getExecuteIds() {
    if (this.isLiveWeb3Available()) {
      try {
        const ids = await this.contrcat.methods.getExecuteIds().call();
        if (ids && ids.length) return ids;
      } catch (e) {
        console.warn("Live getExecuteIds failed, using fixtures:", e);
      }
    }
    return this.mockExecuted.map((e) => e.id);
  }

  async getProposal(proposalId) {
    if (this.isLiveWeb3Available()) {
      try {
        return await this.contrcat.methods.getProposal(proposalId).call();
      } catch (e) {
        console.warn("Live getProposal failed, using fixtures:", e);
      }
    }
    const prop = this.mockProposals.find((p) => p.id === Number(proposalId));
    if (prop) {
      return {
        0: prop.period,
        1: prop.target,
        2: prop.value,
        3: prop.quorumType,
        4: prop.proposalType,
        5: prop.title,
        6: prop.description,
        period: prop.period,
        target: prop.target,
        value: prop.value,
        quorumeType: prop.quorumType,
        proposalType: prop.proposalType,
        title: prop.title,
        description: prop.description,
        votesFor: prop.votesFor,
        votesAgainst: prop.votesAgainst,
        totalVoted: prop.totalVoted,
        quorumNeeded: prop.quorumNeeded,
      };
    }
    return null;
  }

  async getVotes(proposalId) {
    if (this.isLiveWeb3Available()) {
      try {
        return await this.contrcat.methods.getVotes(proposalId).call();
      } catch (e) {
        console.warn("Live getVotes failed, using fixtures:", e);
      }
    }
    const prop = this.mockProposals.find((p) => p.id === Number(proposalId));
    return {
      0: prop ? prop.votesFor : 12,
      1: prop ? prop.votesAgainst : 2,
      votesFor: prop ? prop.votesFor : 12,
      votesAgainst: prop ? prop.votesAgainst : 2,
    };
  }
}

export default new VotingService();
