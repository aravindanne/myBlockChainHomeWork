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
					balance = this.balances[trans.fromAddress];
					
					if(balance < trans.value){
						console.log(trans, ' is invalid.');
						continue;
					}
					
					balance -= trans.value;
					this.balances[trans.fromAddress] = balance;
				}
				if(trans.toAddress === address){
					balance = this.balances[trans.toAddress];
					
					if(this.balances[trans.fromAddress] < trans.value){
						console.log(trans, ' is invalid.');
						continue;
					}
					
					balance += trans.value;
					this.balances[trans.toAddress] = balance;
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

coin.minePendingTransactions(2);
console.log("Balance is: ", coin.getBalanceOfAddress(0));



// console.log(JSON.stringify(coin, null, 4));


