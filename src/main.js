const {BlockChain, Transaction} = require('./myblockchain');

let coin = new BlockChain();

 // Test Case 1
 console.log('Given Interface 1 - init() - BlockChain created...');
 coin.init([100, 100, 500], [[0, 1, 50], [1, 2, 80], [2, 0, 450]], 3);
 console.log(JSON.stringify(coin, null, 4));

 console.log('--------------------------------------------------------');
 console.log('Given Interface 2 - getAccountBalance()');
 console.log("Balance is: ", coin.getAccountBalance(1));


// // Test Case 2
// console.log('Given Interface 1 - init() - BlockChain created...');
// coin.init([20, 20, 500], [[0, 1, 50], [1, 2, 80], [2, 0, 450]], 3);
// console.log(JSON.stringify(coin, null, 4));
//
// console.log('--------------------------------------------------------');
// console.log('Given Interface 2 - getAccountBalance()');
// console.log("Balance is: ", coin.getAccountBalance(1));

// // Test Case 3
// console.log('Given Interface 1 - init() - BlockChain created...');
// coin.init([20, 20, 500], [[0, 1, 50], [1, 2, 80], [2, 0, 450]], 2);
// console.log(JSON.stringify(coin, null, 4));
//
// console.log('--------------------------------------------------------');
// console.log('Given Interface 2 - getAccountBalance()');
// console.log("Balance is: ", coin.getAccountBalance(1));
