/**
* Initialize your data structure here.
*/
let Node = function (value) {
    this.value = value;
    this.isWord = false;
    this.child = new Map();
}

let Trie = function () {

    this.root = new Node();
};


/**
 * Inserts a word into the trie. 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
    let len = word.length;
    let p = this.root;
    for (let index = 0; index < len; index++) {
        let char = word[index];
        if (!p.child.has(char)) {
            p.child.set(char, new Node(char));
        }
        p = p.child.get(char);
    }
    p.isWord = true;
};

/**
 * Returns if the word is in the trie. 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
    let len = word.length;
    let p = this.root;
    for (let index = 0; index < len; index++) {
        let char = word[index];
        if (!p.child.has(char)) {
            return false;
        }
        p = p.child.get(char);
    }
    return true && p.isWord;
};

/**
 * Returns if there is any word in the trie that starts with the given prefix. 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {

    let len = prefix.length;
    let p = this.root;
    for (let index = 0; index < len; index++) {
        let char = prefix[index];
        if (!p.child.has(char)) {
            return false;
        }
        p = p.child.get(char);
    }
    return true;

};


// Your Trie object will be instantiated and called as such:
var obj = new Trie();
obj.insert("and");
obj.insert("at");
obj.insert("ad");
obj.insert("bf");
obj.insert("brand");
obj.insert("cat");
var param_2 = obj.search("cat");

function dsf(tirnode, tmp = []) {
    let childs = tirnode.child.size;
    if (childs == 0) {
        if (tirnode.isWord) console.log(tmp.concat(tirnode.value));
        return;
    }
    for (let chilnode of tirnode.child.values()) {
        if (tirnode.isWord) console.log(tmp.concat(tirnode.value));
        dsf(chilnode, tirnode.value === undefined ? tmp.slice() : tmp.concat(tirnode.value));
    }
}
dsf(obj.root, []);
