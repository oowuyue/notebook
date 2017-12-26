// 就像下面这样：
// 你不在乎下面这三个ajax的执行顺序还好
// 如果你在乎顺序呢？
$.get('url0', function () {});
$.get('url1', function () {});
$.get('url2', function () {});


/*

                                       promise                     promise
callback  ---->  promise ----->                        -------->
                                   *Generator  Yield               async  await
                                 
                                 
                                      -----协程算法状态机
                             Iterator 
                                      -----数据结构


消费者1 依赖 生产者1
              ↓
            消费者2  依赖 生产者2 

双方交流通信
  同步 消费者立即或等待获得生产者的结果                        
  异步 调用立即返回，消费者继续下面执行， 生产者可能是 耗时算法（CPU） 或 耗时数据（IO，真实数据需异步获取。

单方状态
  阻塞  
  非阻塞
  
  

子程序(函数)就是协程的一种特例
协程多个状态，   可中断 保存现场 恢复现场 继续。 多个协程是相互独立 平等的 每个协程算法线都有自己的栈
子程序(函数) 只有一种状态即输出。  函数调用属于被调用函数是属于调用函数的一部分  每个线程算法线都有自己的栈         



消费者  -----请求-------> 生产者 

|                         |   
|                         |
|   -----------------     |
|   -----------------     |
↓ 事件                    ↓

同步 异步：     代码的执行顺序和书写看到的空间顺序 
阻塞 非阻塞：   代码线（线程..）的状态 是否在block状态 占用cpu


请求后立即得到            同步 非阻塞    正常代码
   
              |--等---   同步 阻塞      正常代码
请求后需要时间 |
              |--不等--  异步 非阻塞    回调函数 




js 《--------》 nodej核心 c 《--------》  os 《--------》 硬件（只能是同步阻塞）





分治
dp 选择 决策 最优子结构性质是指问题的最优解包含其子问题的最优解时  一个最优化策略的子策略总是最优的
贪心

https://www.zhihu.com/question/30432536

   异常软中断sync
       --错误                         cpu
       --终止                             ↖ interrupt async
app    --trap syscall-->   kernal                           ↖io硬件

类     对象

上帝     人     计算机
          
         类     对象 
         
人就像计算机的上帝 计算机只能看到对象 是否自省类？
 
*/

/*-----第一种callback-------*/

//生产者1        消费者1
$.get('url0', function (data0) {
    //data0 => url1  
    //(消费者1转)生产者2   消费者2 
    $.get('url1', function (data1) {
        //data1 => url2
        //(消费者2转)生产者3   消费者3   
        $.get('url2', function (lastData) {
            console.log(lastData);
        });
    });
});


/*-----第二种Promise-------

              --reject()--> rejcted 生产失败  value
pending 生产中
              --resolve()-> resolved 生产成功 reason
生产者1
*/
new Promise($.get('url0', function (data0) {
    data0 ? resolve(data0) : reject("error");
})).then(function (data0) {//消费者1
    //data0 => url1
    //(消费者1转)生产者2
    return new Promise($.get('url1', function (data1) {
        data1 ? resolve(data1) : reject("error");
    }));
}).then(function (data1) {//消费者2
    //data1 => url2
    //(消费者2转)生产者3
    return new Promise($.get('url2', function (data2) {
        data2 ? resolve(lastData) : reject("error");
    }));
}).then(function (lastData) {//消费者3
    console.info(lastData);
}).catch(function (error) {
    console.info(error);
});


/*-----第三种 async  await   基于协程（* yield ） -------*/

const getUrl = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function(error, data) {
      if (error) return reject(error);
      resolve(data);
    });
  });
};

function* asyncGet() {
  const f1 = yield getUrl('/etc/fstab');
  const f2 = yield getUrl('/etc/shells');
};

async function asyncGet() {
  //            消费者1   生产者1
  const data0 =  await   getUrl('url0');
  //            消费者2   生产者2
  const data1 =  await   getUrl('url1');
  
  //生产者3 (自动包装成resolved的promise)
  return data1;
};

//生产者3
asyncGet().then(// 消费者3
  v => console.log(v),
  e => console.log(e)
)


/*****golang ********/


// concurrent.go
package main

import (
     "fmt"
     "net/http"
     "io/ioutil"
)


func main() {
  ch0 := make(chan string)
  ch1 := make(chan string)
  go MakeRequest("http://api.juheapi.com/japi/toh", ch0 , nil)
  go MakeRequest("http://api.juheapi.com/", ch1 , ch0)
  fmt.Println(<-ch1)
}

func MakeRequest(url string, wch chan string, rch chan string) {
    
    if (rch != nil && wch != nil) {
        <- rch
        resp, err := http.Get(url)
        if err != nil {
            panic(err)
        }
        defer resp.Body.Close()
        body, err := ioutil.ReadAll(resp.Body)
        text := string(body)
        fmt.Println(text)
        wch <- text
        return
    }

    if wch != nil {
        resp, err := http.Get(url)
        if err != nil {
            panic(err)
        }
        defer resp.Body.Close()
        body, err := ioutil.ReadAll(resp.Body)
        text := string(body)
        fmt.Println(text)
        wch <- text
        return
    }
}
