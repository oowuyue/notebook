// 就像下面这样：
// 你不在乎下面这三个ajax的执行顺序还好
// 如果你在乎顺序呢？
$.get('url0', function () {});
$.get('url1', function () {});
$.get('url2', function () {});
///第一种
$.get('url0', function (data0) {
    //data0 => url1 
    $.get('url1', function (data1) {
        //data1 => url2
        $.get('url2', function (lastData) {
            console.log(lastData);
        });
    });
});
//第二种
var f0 = function (url0, cb) {
    $.get('url0', function (data0) {
        cb(data0, f2);
    });
};
var f1 = function (data0, cb) {
    //data0 => url1
    $.get('url1', function (data1) {
        cb(data1, f2);
    });
};
var f2 = function (data1, cb) {
    //data1 => url2
    $.get('url2', function (lastData) {
        console.log(lastData);
    });
};
f(url0, f1);

//第三种 promise
new Promise($.get('url0', function (data0) {
    data0 ? resolve(data0) : reject("error");
})).then(function (data0) {
    //data0 => url1
    return new Promise($.get('url1', function (data1) {
        data1 ? resolve(data1) : reject("error");
    }));
}).then(function (data1) {
    //data1 => url2
    return new Promise($.get('url2', function (data2) {
        data2 ? resolve(lastData) : reject("error");
    }));
}).then(function (lastData) {
    console.info(lastData);
}).catch(function (error) {
    console.info(error);
});
