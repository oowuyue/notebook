   

/*
解法一：Clone the lists when process each num.
https://discuss.leetcode.com/topic/31838/three-ways-to-do-this-c
sub([0]) = [ [] [0] ]
sub([0..n]) = sub([0..(n-1)]) + sub([0..(n-1)]).map(itme+n) 
*/

/*
递归方式subsets([0..n]) ----> subsets([0..(n-1)]) ----...-->subsets([0])
*/
var subsets = function(nums) {
    if (nums.length == 1) return [[],[nums[0]]];
    var n = nums.pop();
    var sub1ton_1 = subsets(nums);
    return sub1ton_1.concat(sub1ton_1.map(itme => itme.concat(n)));
};

/*
循环方式
res = [ [] ] --->          --->                ------->            
                    ↑                ↑                         ↑
                subsets([0])    subsets([0..1]) --...-->  subsets([0..n])
*/
var subsets1 = function(nums) {
    return findSubsets([[]]);
    function findSubsets(res) {
        for (var i = 0; i < nums.length; i++) {
            res = res.concat(res.map( itme=>itme.concat(nums[i]) ));
        }
        return res;
    }
};

console.log(subsets([2, 3, 4]));
console.log(subsets1([2, 3, 4]));


/****************************************************************************************/
/*
  解法二：原集合每一个数字只有两种状态，要么存在，要么不存在 二叉树
  https://www.cnblogs.com/grandyang/p/4309345.html
  Back tracking ：https://discuss.leetcode.com/topic/31838/three-ways-to-do-this-c
*/
var subsets = function (nums) {
  var  set = nums;
  var  subset = []; 
  var getsubset = function(arr) {
      if(arr.length == set.length){
          var tmparr = []
          for (var i = 0; i < arr.length; i++) {
              if(arr[i]) tmparr.push(set[i]);
          }
          subset.push(tmparr);
      }
      else{
          arr.push(true);
          getsubset(arr);
          arr.pop();
          //push 完了要pop;
          arr.push(false);
          getsubset(arr);
          arr.pop();
      }
      return;//调试判断在哪个函数用
  }
  getsubset([true]);
  getsubset([false]);
  console.log(subset);
  return subset;
}    



/***
http://huaren-it.com/thread/leetcode%E7%AC%AC46%E9%A2%98-permutations/
https://discuss.leetcode.com/topic/31838/three-ways-to-do-this-c
https://discuss.leetcode.com/topic/46162/a-general-approach-to-backtracking-questions-in-java-subsets-permutations-combination-sum-palindrome-partioning

****/
