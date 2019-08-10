const {BlockChain, Transaction} = require('./myblockchain');

test('Test case 1.a', () =>{
	let coin = new BlockChain();
	coin.init([100, 100, 500], [[0, 1, 50], [1, 2, 80], [2, 0, 450]], 3);
	expect(coin.getAccountBalance(0)).toBe(500);
});

test('Test case 1.b', () =>{
	let coin = new BlockChain();
	coin.init([100, 100, 500], [[0, 1, 50], [1, 2, 80], [2, 0, 450]], 3);
	expect(coin.getAccountBalance(1)).toBe(70);
});

test('Test case 1.c', () =>{
	let coin = new BlockChain();
	coin.init([100, 100, 500], [[0, 1, 50], [1, 2, 80], [2, 0, 450]], 3);
	expect(coin.getAccountBalance(2)).toBe(130);
});

test('Test case 1.d', () =>{
	let coin = new BlockChain();
	coin.init([100, 100, 500], [[0, 1, 50], [1, 2, 80], [2, 0, 450]], 3);
	expect(coin.chain[1].hash).toBe("002583a82835756a0988f6da6141860661bdf3f9");
	expect(coin.chain[1].previousHash).toBe("c2206e5e2a346273f7634b06d0b96335867cc050");
	expect(coin.chain[1].nonce).toBe(1303);
});

test('Test case 2.a', () =>{
	let coin = new BlockChain();
	coin.init([20, 100, 500], [[0, 1, 50], [1, 2, 80], [2, 0, 450]], 3);
	expect(coin.getAccountBalance(0)).toBe(470);
});

test('Test case 2.b', () =>{
	let coin = new BlockChain();
	coin.init([20, 100, 500], [[0, 1, 50], [1, 2, 80], [2, 0, 450]], 3);
	expect(coin.getAccountBalance(1)).toBe(20);
});
