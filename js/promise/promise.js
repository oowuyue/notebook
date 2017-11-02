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
            
生产者可能是 耗时算法（CPU） 或 耗时数据（IO）


子程序(函数)就是协程的一种特例
协程多个状态，   可中断 保存现场 恢复现场 继续。 多个协程是相互独立 平等的
子程序(函数) 只有一种状态即输出。  函数调用属于被调用函数是属于调用函数的一部分                                     
                                                            
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

const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function(error, data) {
      if (error) return reject(error);
      resolve(data);
    });
  });
};

function* asyncReadFile() {
  const f1 = yield readFile('/etc/fstab');
  const f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};

async function asyncReadFile() {
  //         消费者1   生产者1
  const f1 =  await   readFile('/etc/fstab');
  //         消费者2   生产者2
  const f2 =  await   readFile('/etc/shells');
  
  //生产者3
  return 'hello world';
};

//生产者3
asyncReadFile().then(// 消费者3
  v => console.log(v),
  e => console.log(e)
)

