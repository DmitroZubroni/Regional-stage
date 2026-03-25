// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Token} from "./Token.sol";
import {Test, console} from "forge-std/Test.sol";

contract TokenTest is Test {
    Token token;

    // Генерируем "чистые" адреса для тестов (EOA), они автоматически принимают ETH
    address owner = makeAddr("owner");
    address privProv = makeAddr("privateProvider");
    address pubProv = makeAddr("publicProvider");
    address inv1 = makeAddr("investor1");
    address inv2 = makeAddr("investor2");
    address bf = makeAddr("bf");
    
    address user1 = makeAddr("user1");
    address user2 = makeAddr("user2");

    uint256 constant DECIMALS = 10**12;

    function setUp() public {
        // Начисляем тестовый эфир пользователям
        vm.deal(user1, 100 ether);
        vm.deal(user2, 100 ether);
        vm.deal(owner, 1 ether);

        // Чтобы владельцем в контракте стал наш адрес 'owner', вызываем деплой через prank
        vm.startPrank(owner);
        token = new Token(
            privProv,
            pubProv,
            inv1,
            inv2,
            bf
        );
        vm.stopPrank();
    }

    /**
     * @dev Тест signIn()
     */
    function test_SignIn() public {
        string memory login = "atlant";
        string memory pass = "12345";

        vm.startPrank(user1);
        token.signUp(login, pass);

        // Проверяем вход
        Token.User memory user = token.signIn(login, pass);
        assertEq(user.login, login);
        assertEq(user.wallet, user1);
        vm.stopPrank();
    }

    /**
     * @dev Тест buyToken() 
     * Исправлено: проверка баланса через getBalance() вместо прямого доступа к mapping
     */
    function test_BuyToken() public {
        // --- ПОДГОТОВКА ---
        vm.startPrank(user1);
        token.signUp("buyer", "123");
        vm.stopPrank();
        
        vm.startPrank(user1);
        token.sendRequestToWhitelist();
        vm.stopPrank();

        vm.startPrank(privProv);
        token.takeWhitelistRequest(0, true);
        vm.stopPrank();


        skip(6 minutes);

        // Передаем токены провайдеру (делает овнер)
        vm.startPrank(owner);
        token.transferToProvider(2);

        uint256 amountPriv = 1000 * DECIMALS;
        uint256 costPriv = (amountPriv / DECIMALS) * 0.00075 ether;

        vm.stopPrank();

        vm.startPrank(user1);
        token.buyToken{value: costPriv}(amountPriv);

        vm.stopPrank();

        // ПРОВЕРКА: используем getBalance(), который возвращает баланс msg.sender
        vm.startPrank(user1);
        ( , , uint256 balPriv, ) = token.getBalance(); 
        assertEq(balPriv, amountPriv, "User didn't receive private tokens");
        assertEq(owner.balance, 1 ether + costPriv, "ETH didn't reach the owner");

        vm.stopPrank();

        // --- PUBLIC PHASE (пропускаем еще 10 минут) ---
        skip(11 minutes);

        vm.startPrank(owner);
        token.transferToProvider(3);

        uint256 amountPub = 5000 * DECIMALS; // минимум по коду
        uint256 costPub = (amountPub / DECIMALS) * 0.001 ether;

        vm.stopPrank();

        vm.startPrank(user1);
        token.buyToken{value: costPub}(amountPub);

        vm.stopPrank();

        vm.startPrank(user1);
        ( , , , uint256 balPub) = token.getBalance();
        assertEq(balPub, amountPub, "User didn't receive public tokens");
        
        vm.stopPrank();
    }

    /**
     * @dev Тест takeMyAllowance()
     */
    function test_TakeMyAllowance() public {
        vm.startPrank(user1);
        token.signUp("alice", "1");
        vm.stopPrank();

        vm.startPrank(user2);
        token.signUp("bob", "2");
        vm.stopPrank();

        uint256 amount = 1000 * DECIMALS;
        
        // 1. Овнер дает токены Алисе (тип 1 - seed)
        vm.startPrank(owner);
        token.transferToken(user1, amount, 1);
        vm.stopPrank();

        // 2. Алиса дает разрешение Бобу
        vm.startPrank(user1);
        token.approveToken(user2, amount, 1);
        vm.stopPrank();

        // 3. Боб забирает токены по индексу 0
        vm.startPrank(user2);
        token.takeMyAllowance(0);
        vm.stopPrank();

        // 4. Проверка баланса Боба
        vm.startPrank(user2);
        ( , uint256 u2Seed, , ) = token.getBalance();
        assertEq(u2Seed, amount, "Bob should have received seed tokens");
        
        // Список заявок должен стать пустым
        assertEq(token.getApproveList().length, 0);
        vm.stopPrank();
    }
}