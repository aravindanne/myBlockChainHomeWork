const {BlockChain, Transaction} = require('./myblockchain');

let coin = new BlockChain();

console.log('Given Interface 1 - init() - BlockChain created...');
coin.init([100, 100, 500], [[0, 1, 50], [1, 2, 80], [2, 0, 450]], 3);
console.log(JSON.stringify(coin, null, 4));

console.log('--------------------------------------------------------');
console.log('Given Interface 2 - getAccountBalance()');
console.log("Balance is: ", coin.getAccountBalance(1));