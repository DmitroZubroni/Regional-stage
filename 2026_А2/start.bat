cd ./network
START geth --datadir "" --dev --http --http.api="eth,web3,net" --http.corsdomain "*" --http.port 8545
cd ../frontm1
START npm run dev