await fetch("http://localhost:6882/transactions/signAndBroadcast", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        "type": 103,
        "version": 2,
        "sender": "3Nu65wwizkHH6E8KcNQyckFsfnUvyFb1qvm",
        "password": "rC8qkDdNWvljS0g7JR0K_w",
        "image": "registry.hub.docker.com/apolanir/profik:2.0.0",
        "contractName": "Contract1",
        "imageHash": "406d154ea02f0f0af095cc7f1d44767ebaca579691863612f69da1cf71294145",
        "params": [
            {
                "type": "string",
                "key": "action",
                "value": "init"
            }
        ],
        "fee": 100000000,
        "timestamp": Date.now(),
        "feeAssetId": null
    })
})
.then(response => response.json())
.then(data => {console.log(data)})
.catch(error => {console.log(error)});