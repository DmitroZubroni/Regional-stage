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
        "image": "registry.hub.docker.com/apolanir/profik:1.0.0",
        "contractName": "Contract",
        "imageHash": "3a1e4d8375702cf8e79c998716f09905d1e64824206fa4e6093ed58f5463f1c7",
        "params": [
            {
                "type": "string",
                "key": "init",
                "value": "action"
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