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
	}
}

class BlockChain{
	constructor(){
		this.chain = [this.createGenesisBlock()];
		this.difficulty = 2;
		this.pendingTransactions = [];
		this.miningReward = 1;
		this.balances = [];
		this.blockSize = 0;
	}

	createGenesisBlock(){
		return new Block("Genesis block", "0");
	}

	getLatestBlock(){
		return this.chain[this.chain.length -1];
	}

	minePendingTransactions(){
		let block = new Block(this.pendingTransactions, this.getLatestBlock().hash);
		block.mineBlock(this.difficulty);

		this.chain.push(block);

		this.pendingTransactions= [];
	}
	
	createTransaction(transaction){
		this.pendingTransactions.push(transaction);
	}
	
	addInitialBalances(initialBalances){
		this.balances = initialBalances;
	}
	
	getAccountBalance(accountIndex){
		let balance = 0;
		for(const block of this.chain){
			for(const trans of block.transactions){
				if(trans.fromAddress === accountIndex){
					balance = this.balances[trans.fromAddress];
					
					if(balance < trans.value){
						console.log('Invalid', trans);
						continue;
					}
					
					balance -= trans.value;
					this.balances[trans.fromAddress] = balance;
				}
				if(trans.toAddress === accountIndex){
					balance = this.balances[trans.toAddress];
					
					if(this.balances[trans.fromAddress] < trans.value){
						console.log('Invalid', trans);
						continue;
					}
					
					balance += trans.value;
					this.balances[trans.toAddress] = balance;
				}
			}
		}
		return balance;
	} 
	
	init(initialBalances, transactions, blockSize){
		this.addInitialBalances(initialBalances);
		this.blockSize = blockSize;

		let count = 0;
		for(const trans of transactions){
			if(count === this.blockSize){
				break;
			}
			count++;
			this.createTransaction(new Transaction(trans[0], trans[1], trans[2]));
		}
		this.minePendingTransactions();
		
	}	
}

module.exports.BlockChain = BlockChain;
module.exports.Transaction = Transaction;