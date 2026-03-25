import {Web3} from "web3";
import abi from "./abi.json"

class VotingService {

    web3 = new Web3(window.ethereum)
    contractAddress = "0x72d98788997e874819a3E6371f47Fe8E46348193"
    contrcat = new this.web3.eth.Contract(abi, this.contractAddress)

    async buyRTK(amount, valueAmount, wallet) {
        await this.contrcat.methods.buyRTK(amount).send({from: wallet, value: valueAmount});
    }

    async createProposal(period,   target,   value,  quorumeType,  proposalType, wallet) {
        await this.contrcat.methods.createProposal(period,   target,   value,  quorumeType,  proposalType).send({from: wallet});
    }

    async castVoted(proposalId, amount,  support, wallet) {
        await this.contrcat.methods.castVoted(proposalId, amount,  support).send({from: wallet});
    }

    async delegated(proposalId, amount,  support, wallet) {
        await this.contrcat.methods.delegated(proposalId, amount).send({from: wallet});
    }

    async canceledProposal(proposalId, wallet) {
        await this.contrcat.methods.canceledProposal(proposalId).send({from: wallet});
    }
    async executeProposal(proposalId, wallet) {
        await this.contrcat.methods.executeProposal(proposalId, wallet);
    }

    async getPerson(wallet){
        return await this.contrcat.methods.getPerson().call({from: wallet});
    }

    async getDelegates(wallet){
        return await this.contrcat.methods.getDelegates().call({from: wallet});
    }
    async getProposalIds(){
        return await this.contrcat.methods.getProposalIds().call();
    }

    async getExecuteIds(){
        return await this.contrcat.methods.getExecuteIds().call();
    }

    async getProposal(proposalId){
        return await this.contrcat.methods.getProposal(proposalId).call();
    }

    async getVotes(proposalId){
        return await this.contrcat.methods.getVotes(proposalId).call();
    }
}
export default new VotingService();