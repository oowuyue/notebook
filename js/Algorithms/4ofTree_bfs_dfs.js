   // Helper Method of Tree
    function findIndex(arr, data) {
        var index;

        for (var i = 0; i < arr.length; i++) {
            if (arr[i].data === data) {
                index = i;
            }
        }

        return index;
    }
    // Queue onstructor
    function Queue() {
        this._oldestIndex = 1;
        this._newestIndex = 1;
        this._storage = {};
    }
    Queue.prototype.size = function () {
        return this._newestIndex - this._oldestIndex;
    };
    Queue.prototype.enqueue = function (data) {
        this._storage[this._newestIndex] = data;
        this._newestIndex++;
    };
    Queue.prototype.dequeue = function () {
        var oldestIndex = this._oldestIndex,
            newestIndex = this._newestIndex,
            deletedData;

        if (oldestIndex === newestIndex) {
            return;
        } else {
            deletedData = this._storage[oldestIndex];
            delete this._storage[oldestIndex];
            this._oldestIndex++;

            return deletedData;
        }
    };



    // 1 tree
    var comment = {
        data: 12,
        parent: null,
        children: [
            {
                data: 18,
                parent: 12,
                children: [
                    {
                        data: 44,
                        parent: 18,
                        children: [],
                    }
                ],
            },
            {
                data: 32,
                parent: 12,
                children: [],
            }
        ],
    }
    console.log(comment)


    function getArr(comment, arr) {

        var tmpObj = {}
        for (var i in comment) {
            if (i != "children") {
                tmpObj[i] = comment[i]
            }
        }
        arr.push(tmpObj)

        if (comment.children.length !== 0) {
            for (var i in comment.children) {
                getArr(comment.children[i], arr)
            }
        }
    }
    var retArr = []
    getArr(comment, retArr)
    console.log(retArr)


    function getByPid(pid) {
        var ret = []
        for (var i in retArr) {
            if (retArr[i]['parent'] == pid)
                ret.push(retArr[i])
        }
        return ret
    }

    function bfs(callback) {
        var queue = new Queue();
        queue.enqueue(getByPid(null)[0])
        while (queue.size()) {
            var currentTree = queue.dequeue()
            callback(currentTree)
            var currentTree_children = getByPid(currentTree.data)
            for (var i = 0, length = currentTree_children.length; i < length; i++) {
                queue.enqueue(currentTree_children[i]);
            }
        }
    }

    //    入
    // w
    //    出
    //    入
    //   
    //   2 tree
    //  0: {data: 12, parent: null}
    //  1: {data: 18, parent: 12}
    //  2: {data: 44, parent: 18}
    //  3: {data: 32, parent: 12}

    //                  12
    //                /    \
    //               18     32
    //              /      
    //             44 


    function dfs(currentNode) {
        currentNode['children'] = []

        for (var i = 0, childs = getByPid(currentNode.data), length = childs.length; i < length; i++) {
            currentNode['children'].push(dfs(childs[i]))
        }

        return currentNode
    };

    var whta = dfs(getByPid(null)[0])





    //3 tree
    function Node(data) {
        this.data = data;
        this.parent = null;
        this.children = [];
    }
    function Tree(data) {
        var node = new Node(data);
        this._root = node;
    }
    Tree.prototype.traverseDF = function (callback) {

        // this is a recursive and immediately-invoking function 
        (function recurse(currentNode) {

            // step 2
            for (var i = 0, length = currentNode.children.length; i < length; i++) {

                // step 3
                recurse(currentNode.children[i]);
            }

            // step 4
            callback(currentNode);

            // step 1
        })(this._root);

    };
    Tree.prototype.traverseBF = function (callback) {
        var queue = new Queue();
        queue.enqueue(this._root);

        currentTree = queue.dequeue();

        while (currentTree) {
            for (var i = 0, length = currentTree.children.length; i < length; i++) {
                queue.enqueue(currentTree.children[i]);
            }

            callback(currentTree);
            currentTree = queue.dequeue();
        }
    };
    Tree.prototype.contains = function (callback, traversal) {
        traversal.call(this, callback);
    };
    Tree.prototype.add = function (data, toData, traversal) {
        var child = new Node(data),
            parent = null,
            callback = function (node) {
                if (node.data === toData) {
                    parent = node;
                }
            };

        this.contains(callback, traversal);

        if (!parent) {
            throw new Error("Cannot add node to a non-existent parent.");
        } else {
            parent.children.push(child);
            child.parent = parent;
        }
    };
    Tree.prototype.remove = function (data, fromData, traversal) {
        var tree = this,
            parent = null,
            childToRemove = null,
            index;

        var callback = function (node) {
            if (node.data === fromData) {
                parent = node;
            }
        };

        this.contains(callback, traversal);

        if (!parent) {
            throw new Error("Parent does not exist.");

        } else {
            index = findIndex(parent.children, data);

            if (index === undefined) {
                throw new Error("Node to remove does not exist.");
            } else {
                childToRemove = parent.children.splice(index, 1);
            }

        }

        return childToRemove;
    };

    tree = new Tree(12)
    tree.add(18, 12, tree.traverseBF)
    tree.add(32, 12, tree.traverseBF)
    tree.add(44, 18, tree.traverseBF)

    console.log(tree)

    
    //4 tree
    const graph = {}
    graph[12] = [18, 32] // children
    graph[18] = [44]
    graph[32] = []
    graph[44] = []

    console.log(graph)

