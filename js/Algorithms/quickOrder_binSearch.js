//https://en.wikipedia.org/wiki/Quicksort
//https://octman.com/blog/2014-06-08-loop-invarient/
//https://en.wikipedia.org/wiki/Binary_search_algorithm
//https://octman.com/blog/2013-09-27-binary-search-and-variants/


function swap(arr, i, p) {
    var tmp = arr[i]
    arr[i] = arr[p]
    arr[p] = tmp
}

function PartitionByEvenOdd(arr) {

    var p = 0 // p 分割
    // i 遍历
    for (let i = 0; i < arr.length; i++) {
        if ((arr[i] & 1) == 0) { //isEven
            swap(arr, p, i)
            p++
        }
    }
    return p
}


function partitionByPivot(arr, lo, hi) {

    // init 
    var j = lo; //遍历
    var i = lo; //分割
    var pivot = hi; //基点

    while (j < hi) {
        //loop before;
        if (arr[j] < arr[pivot]) {
            swap(arr, i, j)
            i = i + 1;
        }
        //loop after

        j++
    }

    swap(arr, i, pivot)

    return i;

}

function quickOrder(arr, lo, hi) {
    if (lo < hi) {
        var p = partitionByPivot(arr, lo, hi)
        quickOrder(arr, lo, p - 1)
        quickOrder(arr, p + 1, hi)
    }
}

var tarr = [3, 13, 1, 5, 81, 23, 5, 1, 66, 17, 34, 52, 2]


var peo = PartitionByEvenOdd(tarr)
console.log(tarr, peo)


quickOrder(tarr, peo, tarr.length - 1)
console.log(tarr)


quickOrder(tarr, 0, peo - 1)
console.log(tarr)
