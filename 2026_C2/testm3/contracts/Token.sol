pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20("CryptoMonster", "CMON") {
    enum Role {
        User,
        publicProvider,
        privateProvider,
        Owner
    }

    struct User {
        string login;
        address wallet;
        uint256 seedTokens;
        uint256 privateTokens;
        uint256 publicTokens;
        bool whitelist;
        Role role;
    }

    struct Whitelist {
        string login;
        address wallet;
        bool status;
    }

    struct Approve {
        address owner;
        address spender;
        uint256 amount;
        uint256 tokenType;
    }

    uint256 public startTime;
    uint256 Time_dif;
    uint256 privPhase = 10 minutes;
    uint256 seedPhase = 5 minutes;

    uint256 privPrice = 0.00075 ether;
    uint256 pubPrice = 0.001 ether;
    uint256 dec = 10**decimals();
    uint256 privAmount;
    uint256 pubAmount;
    uint256 public counterToProvider = 0;
    uint256 private availableOwnerTokens = 0;

    address owner;
    address privProv;
    address pubProv;
    address inv1;
    address inv2;
    address bf;

    address[] private requests;
    Whitelist[] private whitelist;
    Approve[] private approveList;

    mapping(string => address) loginMap;
    mapping(address => User) userMap;
    mapping(string => bytes32) passwordMap;

    constructor(
        address _privProv,
        address _pubProv,
        address _inv1,
        address _inv2,
        address _bf
    ) {
        owner = msg.sender;
        privProv = _privProv;
        pubProv = _pubProv;
        inv1 = _inv1;
        inv2 = _inv2;
        bf = _bf;

        startTime = block.timestamp;
        _mint(owner, 10_000_000 * dec);
        privAmount = (balanceOf(owner) * 30) / 100;
        pubAmount = (balanceOf(owner) * 60) / 100;
        _transfer(owner, _inv1, 300_000 * dec);
        _transfer(owner, _inv2, 400_000 * dec);
        _transfer(owner, _bf, 200_000 * dec);

        userMap[owner] = User(
            "owner",
            owner,
            100_000 * dec,
            privAmount,
            pubAmount,
            false,
            Role.Owner
        );
        loginMap["owner"] = owner;
        passwordMap["owner"] = keccak256(abi.encode("123"));

        userMap[_pubProv] = User(
            "pubProv",
            _pubProv,
            0,
            0,
            0,
            false,
            Role.publicProvider
        );
        loginMap["pubProv"] = _pubProv;
        passwordMap["pubProv"] = keccak256(abi.encode("123"));

        userMap[_privProv] = User(
            "privProv",
            _privProv,
            0,
            0,
            0,
            true,
            Role.privateProvider
        );
        loginMap["privProv"] = _privProv;
        passwordMap["privProv"] = keccak256(abi.encode("123"));

        userMap[_inv1] = User(
            "inv1",
            _inv1,
            balanceOf(_inv1),
            0,
            0,
            false,
            Role.User
        );
        loginMap["inv1"] = _inv1;
        passwordMap["inv1"] = keccak256(abi.encode("123"));

        userMap[_inv2] = User(
            "inv2",
            _inv2,
            balanceOf(_inv2),
            0,
            0,
            false,
            Role.User
        );
        loginMap["inv2"] = _inv2;
        passwordMap["inv2"] = keccak256(abi.encode("123"));

        userMap[_bf] = User("bf", _bf, balanceOf(_bf), 0, 0, false, Role.User);
        loginMap["bf"] = _bf;
        passwordMap["bf"] = keccak256(abi.encode("123"));
    }

    modifier AccessControl(Role _role) {
        require(userMap[msg.sender].role == _role, unicode"у вас неподходящая роль");
        _;
    }

    function signUp(string memory _login, string memory _password) external {
        require(
            loginMap[_login] == address(0),
            unicode"Пользователь с таким логином уже существует"
        );
        require(
            userMap[msg.sender].wallet == address(0),
            unicode"Пользователь с таким адресом уже существует"
        );
        userMap[msg.sender] = User(
            _login,
            msg.sender,
            0,
            0,
            0,
            false,
            Role.User
        );
        loginMap[_login] = msg.sender;
        passwordMap[_login] = keccak256(abi.encode(_password));
    }

    function signIn(string memory _login, string memory _password)
        external
        view
        returns (User memory)
    {
        require(
            passwordMap[_login] == keccak256(abi.encode(_password)),
            unicode"неверный пароль"
        );
        return userMap[loginMap[_login]];
    }

    function addMinute() external {
        Time_dif += 1 minutes;
    }

    function sendRequestToWhitelist() external {
        require(
            getLifeTime() <= seedPhase,
            unicode"Заявку можно подать только во время подготовительной фазы"
        );
        require(!userMap[msg.sender].whitelist, unicode"Вы уже в вайтлисте");
        for (uint256 i = 0; i < requests.length; i++) {
            require(
                requests[i] != msg.sender,
                unicode"Вы уже подали заявку в вайтлист"
            );
        }
        requests.push(msg.sender);
    }

    function takeWhitelistRequest(uint256 _index, bool _solution)
        external
        AccessControl(Role.privateProvider)
    {
        if (_solution) {
            whitelist.push(
                Whitelist(userMap[requests[_index]].login, requests[_index], true)
            );
            userMap[requests[_index]].whitelist = true;
        }
        requests[_index] = requests[requests.length - 1];
        requests.pop();
    }

    function buyToken(uint256 _amount) external payable {
        uint256 tokenPrice = getTokenPrice();
        if (tokenPrice == pubPrice) {
            require(
                _amount / dec >= 5_000,
                unicode"Максимальное кол-во - 5.000 CMON"
            );
            payable(owner).transfer(msg.value);
            _transfer(pubProv, msg.sender, _amount);
            userMap[msg.sender].publicTokens += _amount;
            userMap[pubProv].publicTokens -= _amount;
        } else if (tokenPrice == privPrice) {
            require(userMap[msg.sender].whitelist, unicode"вас нет в списке тех кто может купить токен");
            require(
                _amount / dec <= 100_000,
                unicode"Максимальное кол-во - 100.000 CMON"
            );
            payable(owner).transfer(msg.value);
            _transfer(privProv, msg.sender, _amount);
            userMap[msg.sender].privateTokens += _amount;
            userMap[privProv].privateTokens -= _amount;
        } else {
            revert(
                unicode"Во время подготовительной фазы нельзя покупать CMON"
            );
        }
    }

    function stopPublicPhase() external AccessControl(Role.Owner) {
        _transfer(pubProv, msg.sender, userMap[pubProv].publicTokens);
        userMap[msg.sender].publicTokens += userMap[pubProv].publicTokens;
        availableOwnerTokens += userMap[pubProv].publicTokens;
        userMap[pubProv].publicTokens = 0;
    }

    function transferToProvider(uint256 _phase)
        external
        AccessControl(Role.Owner)
    {
        if (_phase == 2) {
            require(counterToProvider == 0, unicode"Токены уже были переданы провайдеру");
            _transfer(msg.sender, privProv, privAmount);
            userMap[msg.sender].privateTokens -= privAmount;
            userMap[privProv].privateTokens += privAmount;
            counterToProvider = 1;
            availableOwnerTokens += 100_000 * dec;
        } else if (_phase == 3) {
            require(counterToProvider == 1, unicode"Токены уже были переданы провайдеру");
            _transfer(owner, pubProv, pubAmount);
            userMap[owner].publicTokens -= pubAmount;  // Исправлено с msg.sender на owner
            userMap[pubProv].publicTokens += pubAmount;
            counterToProvider = 2;
            _transfer(privProv, owner, userMap[privProv].privateTokens);  // Исправлено на owner
            userMap[owner].privateTokens += userMap[privProv].privateTokens;
            availableOwnerTokens += userMap[privProv].privateTokens;
            userMap[privProv].privateTokens = 0;
        }
    }

    function transferToken(
        address _receiver,
        uint256 _amount,
        uint256 _type
    ) external {
        if (msg.sender != owner) {
            require(
                availableOwnerTokens >= _amount,
                unicode"Вы не можете использовать токены для дальнейшей продажи"
            );
        }
        if (_type == 1) {
            require(userMap[msg.sender].seedTokens >= _amount, unicode"у вас нет необходимого количества токенов");
            userMap[msg.sender].seedTokens -= _amount;
            userMap[_receiver].seedTokens += _amount;
        } else if (_type == 2) {
            require(
                userMap[msg.sender].privateTokens >= _amount,
                unicode"У Вас недостаточно private CMON"
            );
            userMap[msg.sender].privateTokens -= _amount;
            userMap[_receiver].privateTokens += _amount;
        } else if (_type == 3) {
            require(
                userMap[msg.sender].publicTokens >= _amount,
                unicode"У Вас недостаточно public CMON"
            );
            userMap[msg.sender].publicTokens -= _amount;
            userMap[_receiver].publicTokens += _amount;
        } else {
            revert (unicode"Указан неправильный тип токена");
        }
            _transfer(msg.sender, _receiver, _amount);
        if (_receiver != owner) {
            availableOwnerTokens += _amount;
        }
    }

    function approveToken(
        address spender,
        uint256 amount,
        uint256 _type
     ) external {
        if (_type == 1) {
            require(
                userMap[msg.sender].seedTokens >= amount,
                unicode"У Вас недостаточно seed CMON"
            );
        } else if (_type == 2) {
            require(
                userMap[msg.sender].privateTokens >= amount,
                unicode"У Вас недостаточно private CMON"
            );
        } else if (_type == 3) {
            require(
                userMap[msg.sender].publicTokens >= amount,
                unicode"У Вас недостаточно public CMON"
            );
        } else {
            revert (unicode"Указан неправильный тип токена");
        }
        approveList.push(Approve(msg.sender, spender, amount, _type));
        uint256 approved = allowance(msg.sender, spender);
        approve(spender, approved + amount);
    }

    function takeMyAllowance(uint256 _index) external {
        require(approveList[_index].spender == msg.sender, unicode"вы не являетесь получателем токенов");
        transferFrom(
            approveList[_index].owner,
            approveList[_index].spender,
            approveList[_index].amount
        );
        if (approveList[_index].tokenType == 1) {
            userMap[approveList[_index].owner].seedTokens -= approveList[_index] // нужно вычитать у овнераЫ
                .amount;
            userMap[approveList[_index].spender].seedTokens += approveList[
                _index
            ].amount;
        } else if (approveList[_index].tokenType == 2) {
            userMap[approveList[_index].owner].privateTokens -= approveList[
                _index
            ].amount;
            userMap[approveList[_index].spender].privateTokens += approveList[
                _index
            ].amount;
        } else if (approveList[_index].tokenType == 3) {
            userMap[approveList[_index].owner].publicTokens -= approveList[
                _index
            ].amount;
            userMap[approveList[_index].spender].publicTokens += approveList[
                _index
            ].amount;
        }
        approveList[_index] = approveList[approveList.length - 1];
        approveList.pop();
    }

    function changePublicPrice(uint256 _price)
        external
        AccessControl(Role.publicProvider)
    {
        pubPrice = _price;
    }

    function giveReward(address _receiver, uint256 _amount)
        external
        AccessControl(Role.publicProvider)
    {
        require(
            userMap[pubProv].publicTokens >= _amount,
            unicode"Недостаточно public CMON"
        );
        transfer(_receiver, _amount);
        userMap[msg.sender].publicTokens -= _amount;
        userMap[_receiver].publicTokens += _amount;
    }

    function getUserData(address _wallet)
        external
        view
        AccessControl(Role.Owner)
        returns (User memory)
    {
        return userMap[_wallet];
    }

    function getUserPublicTokens(address _wallet)
        external
        view
        AccessControl(Role.publicProvider)
        returns (uint256)
    {
        return userMap[_wallet].publicTokens;
    }

    function getUserPrivateTokens(address _wallet)
        external
        view
        AccessControl(Role.privateProvider)
        returns (uint256)
    {
        return userMap[_wallet].privateTokens;
    }

    function getWhitelist()
        external
        view
        AccessControl(Role.privateProvider)
        returns (Whitelist[] memory)
    {
        return whitelist;
    }

    function getApproveList() external view returns (Approve[] memory) {
        return approveList;
    }

    function getWhitelistRequests()
        external
        view
        AccessControl(Role.privateProvider)
        returns (address[] memory)
    {
        return requests;
    }

    function getBalance()
        external
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256
        )
    {
        User storage userInfo = userMap[msg.sender];
        return (
            msg.sender.balance,
            userInfo.seedTokens,
            userInfo.privateTokens,
            userInfo.publicTokens
        );
    }

    function decimals() public pure override returns (uint8) {
        return 12;
    }

    function getTokenPrice() public view returns (uint256) {
        uint256 tokenPrice = 0;
        if (getLifeTime() > seedPhase + privPhase) {
            tokenPrice = pubPrice;
        } else if (getLifeTime() > seedPhase) {
            tokenPrice = privPrice;
        }
        return tokenPrice;
    }

    function getLifeTime() public view returns (uint256) {
        return block.timestamp + Time_dif - startTime;
    }
}