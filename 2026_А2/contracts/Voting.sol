// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {KSIPT, GerdaCoin} from "./Tokens.sol";
import {Governor, GovernorVotes, IVotes, GovernorVotesQuorumFraction, GovernorCountingSimple} from "./GovernanceBundle.sol";

contract Voting is Governor, GovernorVotesQuorumFraction, GovernorCountingSimple {


    // тип кворума
    enum QuorumeType {
        SuperMajority,
        SimpleMajority,
        Weigth
    }

    // тип голосования
    enum ProposalType {
        A, B, C, D, E, F
    }

    // статус голосования
    enum ProposalStatus{
        Active, Canceled, Execute
    }

    // структура голосования
    struct ProposalLib{
        uint256 proposalId; // айди голосования
        address proposer; // создатель голосования
        address payable targets; // адрес
        uint256 values; // значение сколько инвистируем или на какое значение изменяем силу тиокена
        uint256 voteStart; // время начала голосования
        uint256 voteEnd; // время окончания голосования
        QuorumeType quorumeType; // тип кворума
        ProposalType proposalType; // тип голосования
        ProposalStatus proposalStatus; // статус голосования
        uint eventType; // тип эвент
        uint priority; // приоритет
    }

    // определяем токены
    KSIPT ksipt;
    GerdaCoin gerda;

    // айди всвех голосований
    uint[] proposalIds;

    // айди выполненных голосований
    uint[] executeIds;

    //сила ксипт токена
    uint ksiptPower = 3;

    // делитель силы ксипт токена
    uint del = 2;

    // функция которая определяет силу герды 
    function gerdaPower() public view returns(uint) {
        return ksiptPower / del;
    }

    // задержка перед голососванием голосования
    uint delay = 0;

    // длительность голосования
    uint period = 0;

    // участник дао или нет
    mapping(address => bool) isMember;

    // проголосовал по определённому предложению или нет
    mapping(uint => mapping(address => bool)) isVoted;

    // каким количеством токенов проголосовал по определённому предложению
    mapping(uint => mapping(address => uint)) customHasVoted;

    // куда делегировал
    mapping(address => uint[]) delegatesUser;

    // получаем всех проголосовавших по определённому предложению
    mapping(uint => address[]) allProposal;

    // получаем структуру голосования
    mapping(uint => ProposalLib) proposal;

    // получаем голоса по определённому предложению
    mapping(uint => ProposalVote) proposalVote;

    /*
    возвращаем задержку перед голосованием
     */
    function votingDelay() public view virtual override returns(uint) {
        return delay;
    }

     /*
     возвращаем длительность голосования 
     */
     function votingPeriod() public view virtual override returns(uint) {
        return period;
    }

    /*
    конструктор функция которая вызывыается один раз при деплои контракта 
    */
    constructor(address john, address micky, address julian, address _ksipt, address _gerda) payable 
    Governor("DAO") GovernorVotes(IVotes(_ksipt)) GovernorVotesQuorumFraction(1)
    {
        ksipt = KSIPT(_ksipt);
        gerda = GerdaCoin(_gerda);

        ksipt.mint(address(this), 200_000e10); // выпускаем ксипт токен

        ksipt.transfer(address(this), john, 66_666e10); // распределяем ксипт токен между пользователями
        ksipt.transfer(address(this), micky, 66_666e10);
        ksipt.transfer(address(this), julian, 66_666e10);
        isMember[john] = true; // делаем участников членами дао
        isMember[micky] = true;
        isMember[julian] = true;

        gerda.mint(address(this), 35_000_000e8); // выпускаем герда токен
    }

     /*
     покупка герда токена
     */
    function buyRTK(uint amount) public payable {
        require(msg.value >= amount * gerda.price()); // проверка что пользователь переводить достаточно средств
        gerda.transfer(address(this), msg.sender, amount * 10 ** 8);
    }

     /*
     проверка достижения кворума
     */
    function _quorumReached(uint  proposalId) internal view virtual override(Governor, GovernorCountingSimple ) returns(bool) {
        ProposalVote storage vote = proposalVote[proposalId];
        uint totalVote = vote.forVotes + vote.againstVotes;

        if(proposal[proposalId].quorumeType == QuorumeType.SuperMajority) {
            return vote.forVotes >= totalVote * 2 /3;
        } else if(proposal[proposalId].quorumeType == QuorumeType.SuperMajority) {
            return vote.forVotes > totalVote;
        } else if(proposal[proposalId].quorumeType == QuorumeType.SuperMajority) {
            return vote.forVotes > vote.againstVotes;
        }
    }

    
     /*
     создание голосования
      (_period,   target,   value,  quorumeType,  proposalType)
      _period - длительность голосования в секундах
      target - адрес куда инвестируем или какого участника добовляем/удаляем из дао  
      value - сколько инвестируем / как изменяем силу токена
      quorumeType - тип кворума
      proposalType - тип голосования
     */
     function createProposal(uint _period, address payable target,  uint256 value, QuorumeType quorumeType,  ProposalType proposalType) public {
        require(isMember[msg.sender] == true, "you not dao"); // проверка что пользователь участник дао
        require(
            ((proposalType == ProposalType.A || proposalType == ProposalType.B ) && quorumeType == QuorumeType.Weigth) ||
            ((proposalType >= ProposalType.C) || quorumeType == QuorumeType.SuperMajority && quorumeType == QuorumeType.SimpleMajority ), 
            "ProposalType not QuorumType"
        ); // проверка на соответсвие типа кворума и типа голосования

        address[] memory targets = new address[](1);
        uint[] memory values = new uint[](1);
        bytes[] memory calldatas = new bytes[](1);

        targets[0] = target;
        values[0] = value;
        calldatas[0] = abi.encodeWithSignature("method", proposalType);

        uint ID = super.propose(targets, values, calldatas, ""); // создаём айди голосования
        proposalIds.push(ID); // записываем данные в блокчейн
        proposal[ID] = ProposalLib({
        proposalId: ID,
        proposer: msg.sender,
        targets: target,
        values: value,
        voteStart: block.timestamp,
        voteEnd: block.timestamp + _period,
        quorumeType: quorumeType,
        proposalType: proposalType,
        proposalStatus: ProposalStatus.Active,
        eventType: 1,
        priority: 1
        });

     }

     /*
     фукнкция голосования
     proposalId, amount,  support
     proposalId - айди голосования
     amount - количество 
     support - за или против
     */
    function castVoted(uint proposalId, uint amount, bool support) public  {
        require(isMember[msg.sender] == true, "you not dao"); // проверка что пользователь участник дао
        require(isVoted[proposalId][msg.sender] == false, "you voted"); // проверка что пользователь не голосовал до этого
        require(proposal[proposalId].proposalStatus == ProposalStatus.Active, "proposal not active"); // проверка что голосование активно

        ProposalVote storage vote = proposalVote[proposalId];
        if(support) {
            vote.forVotes += amount / ksiptPower; // записываем голосо пользователя
        } else {
            vote.againstVotes += amount / ksiptPower;
        }
        ksipt.transfer(msg.sender, address(this), amount * 10 ** 10); // переводим токены от пользователя на контракт
        //  записываем данные в блокчейн
        isVoted[proposalId][msg.sender] = true; 
        allProposal[proposalId].push(msg.sender); 
        customHasVoted[proposalId][msg.sender] = amount; 
    }

     /*
     функция делегирования токенов
     proposalId, amount,  support
     proposalId - айди голосования
     amount - количество 
     support - за или против
     */
     function delegated(uint proposalId, uint amount, bool support) public  {
        require(isMember[msg.sender] == false, "you  dao"); // проверка что не пользователь участник дао
        require(isVoted[proposalId][msg.sender] == false, "you voted"); // проверка что пользователь не голосовал до этого
        require(proposal[proposalId].proposalStatus == ProposalStatus.Active, "proposal not active"); // проверка что голосование активно

        ProposalVote storage vote = proposalVote[proposalId];
        if(support) {
            require(vote.forVotes > 0, "not votes "); // проверяем, что кто-то уже проголосовал подобным образом 
            vote.forVotes += amount / gerdaPower(); // записываем голосо пользователя
        } else {
            require(vote.againstVotes > 0, "not votes");
            vote.againstVotes += amount / gerdaPower();
        }
        gerda.transfer(msg.sender, address(this), amount * 10 ** 8); // переводим токены от пользователя на контракт
        //  записываем данные в блокчейн
        isVoted[proposalId][msg.sender] = true; 
        allProposal[proposalId].push(msg.sender); 
        customHasVoted[proposalId][msg.sender] = amount; 
        delegatesUser[msg.sender].push(proposalId);

    }

    /*
     функция отмены голосования
     proposalId- айдит голосования
     */
     function canceledProposal(uint proposalId) public {
        require(proposal[proposalId].proposer == msg.sender, "you not proposer"); // проверка что пользователь соз0датель голосования
        require(proposal[proposalId].proposalStatus == ProposalStatus.Active, "proposal not active"); // проверка что голосование активно

        address[] memory voters = allProposal[proposalId]; // получаем всех проголосовавших по предлоежнию

        for(uint i; i < voters.length; i++) {
            address voter = voters[i]; 
            uint amount = customHasVoted[proposalId][voter]; // смотрим сколько токенов вложил пользователь
            if(isMember[voter] == true) {
                ksipt.transfer(address(this), voter, amount * 10 ** 10); // возвращем токены обратно владельцу
            } else {
                gerda.transfer(address(this), voter, amount * 10 ** 8);
            }
        customHasVoted[proposalId][msg.sender] = 0; // обнуляем количество токенов которое вложил полтьзователь
        }
        proposal[proposalId].proposalStatus = ProposalStatus.Canceled; // ставим статус отмененно
     }

     /*
     функция выполнения голосования
     proposalId- айдит голосования
     */
     function executeProposal(uint proposalId) public {
        require(proposal[proposalId].proposer == msg.sender, "you not proposer"); // проверка что пользователь соз0датель голосования
        require(proposal[proposalId].proposalStatus == ProposalStatus.Active, "proposal not active");  // проверка что голосование активно

        if(proposal[proposalId].proposalType == ProposalType.A || proposal[proposalId].proposalType == ProposalType.B ) {
            proposal[proposalId].targets.transfer(proposal[proposalId].values); // выполняем инвестирование

        } else if(proposal[proposalId].proposalType == ProposalType.C ) {
            isMember[proposal[proposalId].targets] = true; // делаем участником дао

        } else if(proposal[proposalId].proposalType == ProposalType.D ) {
            isMember[proposal[proposalId].targets] = false; // удаляем участника из дао

        } else if(proposal[proposalId].proposalType == ProposalType.E ) {
            ksiptPower = proposal[proposalId].values; // меняем силу ксипт токена
            
        } else if(proposal[proposalId].proposalType == ProposalType.F ){
            del = proposal[proposalId].values; // меняем силу герда токена
        }
        executeIds.push(proposalId);
        proposal[proposalId].proposalStatus = ProposalStatus.Execute;
     }


     /*
     получаем информацию о пользователе 
     */
     function getPerson() public view returns(bool isDAO, uint ksiptBalance, uint gerdaBalance) {
        return (
            isMember[msg.sender],
            ksipt.balanceOf(msg.sender),
            gerda.balanceOf(msg.sender)
        );
     }

     /*
     получаем делегации пользователя
     */
     function getDelegates() public view returns(uint[] memory delegates) {
        return delegatesUser[msg.sender];
     }

     /*
     получаем айди всех созданных предложений
     */
     function getProposalIds() public view returns(uint[] memory proposalId) {
        return proposalIds;
     }

     /*
     получаем айди всех выполненных предложений
     */
     function getExecuteIds() public view returns(uint[] memory executeId){
        return executeIds;
     }

     /*
     получаем информацию об определённом голосовании
     proposalId- айдит голосования
     */
    function getProposal(uint proposalId) public view returns(
        address proposer,
        address targets,
        uint256 values, 
        uint256 voteEnd,
        QuorumeType quorumeType,
        ProposalType proposalType,
        ProposalStatus proposalStatus
    ) {
        ProposalLib storage prop = proposal[proposalId];
        proposer = prop.proposer;
        targets = prop.targets;
        values = prop.values;
        voteEnd = prop.voteEnd;
        quorumeType = prop.quorumeType;
        proposalType = prop.proposalType;
        proposalStatus = prop.proposalStatus;
    }

     /*
     получаем колличество голосов по определённому голосованию
     proposalId- айдит голосования
     */
     function getVotes(uint proposalId) public view returns(uint forVotes, uint againstVotes) {
        ProposalVote storage vote = proposalVote[proposalId];
        forVotes = vote.forVotes;
        againstVotes = vote.againstVotes;
     }


}