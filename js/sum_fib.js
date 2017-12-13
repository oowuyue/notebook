/*     

数学归纳法  【可数无穷】  【递归/ 循环/ 迭代遍历 (无穷)】

计算机      【可数有穷】  【递归/ 循环/ 迭代遍历 (有穷)】


/*
 ------公里定义------               
 [ s(n) = 1+2+....+n ]= n(n+1)/2
 -------------命题P------------------


  1: [ s(1) = 1 ] = 1(2)/2  成立

n-1: [ s(n-1) = 1+2+....+(n-1) ] = (n-1)(n)/2    假设n-1成立

  n: [ s(n)   = 1+2+....+(n-1)+(n)] = s(n-1) + (n)
                                    = (n-1)(n)/2  + (n)
                                    =  n(n+1)/2  推到出n成立
*/




/*
  无须外部状态 不可变性 函数式
  s(n)--->s(n-1) --....-->s(1)
      <---       <--...---
*/
function s1(n) {
  if (n == 1) return 1;
  return s1(n - 1) + n;
}


/*  
   tmp = 0; 外部状态维护       
   ↑         ↑
  s(1) ---> s(2) ----...-->s(n)
*/
function s2(n) {
  var sum = 0;
  for (var i = 0; i <= n; i++) {
      sum = sum + i;
  }
  return sum;
}

console.log(s1(15));
console.log(s2(15));




function fib(n) {
    var tmp;
    var prev;
    var current;

    for (let index = 0; index <= n; index++) {
        if (index == 0 || index == 1) {
            current = index;
            prev = 0;
        } else {
            tmp = current;
            current = current + prev;
            prev = tmp;
        }
    }
    return current;
}

function fib2(n) {
    if (n == 1 || n == 0) return n;
    else return fib2(n - 1) + fib2(n - 2);
}
