// 就像下面这样：
// 你不在乎下面这三个ajax的执行顺序还好
// 如果你在乎顺序呢？
$.get('url0', function () {});
$.get('url1', function () {});
$.get('url2', function () {});


/*

                                       promise                       promise
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
|   ------异步请求--->     |
|   ----------------->    |
○  <---  事件队列<----     ↓

同步 异步：     代码的执行顺序和书写看到的空间顺序 
阻塞 非阻塞：   代码线（线程..）的状态 是否在block状态 占用cpu


请求后立即得到            同步 非阻塞    正常代码
   
              |--等---   同步 阻塞      正常代码
请求后需要时间 |
              |--不等--  异步 非阻塞    回调函数 




js 《--------》 nodej核心 c 《--------》  os 《--------》 硬件（只能是同步阻塞）


https://www.zhihu.com/question/30432536

   异常软中断sync
       --错误                         cpu
       --终止                             ↖ interrupt async
app    --trap syscall-->   kernal                           ↖io硬件事件


分治
dp 选择 决策 最优子结构性质是指问题的最优解包含其子问题的最优解时  一个最优化策略的子策略总是最优的
贪心

 
http://www.cnblogs.com/lovesong/p/5572121.html    （单个时间线内 进程内，线程内）                            （多个时间线 进 线 协程间）  
                                                                                            
创建型 ○→○                                          工厂  ioc                                               fork thread 并发

结构型 对象组合  ◎虚包含
                                                    组合对象                                                进程-->线程-->协程（主动）  
                                                    统一接口   adapter                                      保存快照数据多少分的 context 隔离
                                                    增加功能   aop                                          
                                                    控制流程   continuation
    
行为型 生成消费 对象之间的通信  ◎虚包含
                                                  （单个时间线内 进程内，线程内）对象间通信                   （时间线 进程，线程）间通信  
                                                    Observer                                               （消息队列 共享内存）
                                                    pubsub                                                       如:分配任务mvc action  浏览器线程 nginx线程 间的网络通信
                                                                                                                    事件消息队列


类     对象

上帝     人     计算机
          
         类     对象 
         
人就像计算机的上帝 计算机只能看到对象 是否自省类？

类型  对象
      类型  对象
            类型  对象
      
       cdata                    odata
class                    obj1            obj1.ofun()=== cfunc(obj1_this_*)
       cfunc                  <-ofunc
       
https://www.zhihu.com/question/27699413  https://www.zhihu.com/question/30301819  https://www.zhihu.com/question/54881706


     集合              元素            运算  ==> 结构 代数结构  序结构 拓扑结构
     类型              对象实例        方法
     CPU数据指令                       CPU运算 控制指令
        内存空间         
        
    --------------------原始类型 存数据--------------------------------------

     int               1,2             + - * /
c    float             1.2,0.1
     char              a,b             

     arr                               for 遍历 排序 搜索
     struct                            

     -------------------引用类型 存指针-------------------------------------

go  struct+             new            自定义方法 以数据为中心
    func(*strcut)                      data with func

C++ class               new


--------------------------------------------------------------------------------
                        
java
Js                     一切皆对象（不考虑java js里的原始类型）
Python 
      ↑
      ↑这里的类是底层c++类的实例对象
      ↑
    class              object1 

 
    class              object1
    

    




                            A  看涨               B  看跌

                            100                    100

开仓时间   10                90                     90
和约价                       10                     10 （100%保证金）
                            +到期以10买入一份       -到期以10元卖出1份


中间时间价  7                93                     93
                            7                      7 
                            (->1@10)               (<-1@10)


中间时间   12                88 12 (->1@10)         88 12  (<-1@10)
平仓价                                              88 0   (<-1@10) [1]
                            88 2          [1]      98  0                 A
                            102                    98                    C
                           


                            95 5 (->1@10) [0]       95  5  (<-1@10) [0]     A1            
                                                    95  0  (<-1@10) [1]     A2
                            90 0          [1]       105 0                   A3
        5                  
                            95  5 (->1@10)          95  5  (<-1@10)     C1
                            95                      105                 C2
到期时间                           
交割价

        15


时间状态机

(->1@10)  买入一份以10/1份分价格
(<-1@10)  卖出一份以10/1份分价格

A  实物        期初和约价       双向交割
               ↓
B  期末交割价   期初和约价       双向交割
               ↓
C  价差交割                     单向交割
   合约价 交割价


平仓,交割     只看合约价 和 当前价 
             只看双方的合约是否匹配 (->1@10) 匹配 (<-1@10) 不必是开仓A和B原先的两个人
   
 
 
 
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
//https://cnodejs.org/topic/5640b80d3a6aa72c5e0030b6

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
  ////生产者getUrl生成代码线-->消费者await退出物理栈保存快照[协程]-->生产者异步代码线完成通知消费者恢复 [await getUrl()]整体替换 
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
// concurrent.go  https://zhuanlan.zhihu.com/p/32521576

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
