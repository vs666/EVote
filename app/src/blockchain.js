import Vote from './vote';

const SHA256 = require('crypto-js/sha256');
// run -> npm install --save crypto-js

class Block {

    constructor(vote, time, previousHash = '') {
        this.time = time;
        this.prevoiusHash = previousHash;
        this.vote = vote;
        this.hash = this.getHash();
        this.nonce = 0;
    }
    getHash() {
        return SHA256((this.index + this.prevoiusHash + this.time + JSON.stringify(this.dataval) + JSON.stringify(this.nonce)).toString());
    }
    // since the block hash depends on the previous hash, changing one hash implies change in all previous hashes
    // thus tampering one hash means we need to change all following hashes to make the chain valid
    // tampering multiple hashes is of high complexity 


    mineBlock(difficulty) {
        while (this.hash.toString().substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.getHash();
         
        }
    }
}


class BlockChain {
    
    constructor() {
        this.chain = [this.createFirstBlock()];
        this.totalVotes=0;
        this.difficulty = 2;
        this.pendingVotes = [];
        // approx 50 seconds for difficulty 5
    }
    createFirstBlock() {
        return new Block(new Vote({ 'elect': "00000000000000000000000000000000", 'vote': 1 }), Date.now(), "231212e21efa1fefafefafa1aacdafee231212e21efa1fefafefafa1aacdafee");
    }

    increaseDifficulty()
    {
        if((this.totalVotes)%5==0){
            this.totalVotes=0;
            this.difficulty++;
        }
    }

    getSize(){
        return this.chain.length;
    }

    castVote(vote) {
        this.totalVotes++;
        this.increaseDifficulty();
        this.pendingVotes.push(vote);
        let block = new Block(vote, Date.now(), this.chain[this.chain.length - 1].hash);
        block.mineBlock(this.difficulty);
        this.chain.push(block); // add block to the chain
    }

    countVotesOf(votee) {
        let votes = 0;
        for (let block of this.chain) {
            if (block.vote.voted == votee) {
                votes++;
            }
        }
        console.log("Candidate " + votee + " got " + votes + " votes.")
        return votes;
    }

    getBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.prevoiusHash = this.getBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    checkChain() {
        let valid = true;
        for (let a = 1; a < this.chain.length; a++) {
            if (this.chain[a].hash != this.chain[a].getHash()) {
                valid = false;
            } else if (this.chain[a].hash != this.chain[a - 1].prevoiusHash) {
                valid = false;
            }
            if (valid == false) break;
        }
    }
}

export default BlockChain;

