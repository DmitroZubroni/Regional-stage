const responce = await fetch("http://localhost:6882/transactions/signAndBroadcast", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        "contractId": "",
        "fee": 10,
        "sender": "3Nu65wwizkHH6E8KcNQyckFsfnUvyFb1qvm",
        "password": "rC8qkDdNWvljS0g7JR0K_w",
        "type": 104,
        "contractName": "Contract",
        "imageHash": "",
        "params": [
            {"key": "action", "type": "string", "value": "init"},
            {"key": "name","type": "string","value": "ivan"},
            {"key": "homeAddress","type": "string", "value": "ksipt"},
        ],
        "version": 2,
        "contractVersion": 1
    })
})
const data = responce.json();
console.log(data);