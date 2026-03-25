await fetch("http://localhost:6882/transactions/signAndBroadcast", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        "contractId": "496Kq2wJn1n4ikGt9TCgKBGF89rscg4UL7mqFAsUFJr6",
        "fee": 10,
        "sender": "3Nu65wwizkHH6E8KcNQyckFsfnUvyFb1qvm",
        "password": "rC8qkDdNWvljS0g7JR0K_w",
        "type": 104,
        "params": [
            { "key": "action", "type": "string", "value": "setPersonInfo" },
            { "key": "name", "type": "string", "value": "ivan" },
            { "key": "homeAddress", "type": "string", "value": "apolonia" },
        ],
        "version": 2,
        "contractVersion": 1
    })
})