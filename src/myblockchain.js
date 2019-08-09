const SHA1 = require('js-sha1');

class Transaction{
	constructor(fromAddress, toAddress, value){
		this.fromAddress = fromAddress;
		this.toAddress = toAddress;
		this.value = value;
	}
}

class Block{
	constructor(transactions, previousHash=''){
		this.transactions = transactions;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
		this.nonce = 1234;
	}

	calculateHash(){
		return SHA1(this.previousHash + this.nonce +JSON.stringify(this.transactions)).toString();
	}
	
	mineBlock(difficulty){
		while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
			this.nonce++;
			this.hash = this.calculateHash();
		} 
		console.log("Block mined: "+this.hash);
	}
}

class BlockChain{
	constructor(){
		this.chain = [this.createGenesisBlock()];
		this.difficulty = 2;
		this.pendingTransactions = [];
		this.miningReward = 1;
		this.balances = [];
	}

	createGenesisBlock(){
		return new Block("Genesis block", "0");
	}

	getLatestBlock(){
		return this.chain[this.chain.length -1];
	}

	minePendingTransactions(miningRewardAddress){
		let block = new Block(this.pendingTransactions);
		block.mineBlock(this.difficulty);

		console.log("Block successfully mined...");
		this.chain.push(block);

		this.pendingTransactions= [
			new Transaction(null, miningRewardAddress, this.miningReward)
			];
	}
	
	createTransaction(transaction){
		this.pendingTransactions.push(transaction);
	}
	
	addInitialBalances(initialBalances){
		this.balances = initialBalances;
	}
	
	getBalanceOfAddress(address){
		let balance = 0;
		for(const block of this.chain){
			for(const trans of block.transactions){
				if(trans.fromAddress === address){
					balance -= trans.value;
				}
				if(trans.toAddress === address){
					balance += trans.value;
				}
			}
		}
		return balance;
	} 
}

let coin = new BlockChain();

coin.addInitialBalances([100, 100, 500]);
coin.createTransaction(new Transaction(0, 1, 50));
coin.createTransaction(new Transaction(1, 2, 80));
coin.createTransaction(new Transaction(2, 0, 450));


console.log("Starting the miner...");
coin.minePendingTransactions(0);
console.log("Balance of danne is: ", coin.getBalanceOfAddress(0));




console.log(JSON.stringify(coin, null, 4));


