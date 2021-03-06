function Foo1() { // new struct()
    this.secret = 'default';   // struct {} 模板
}
Foo1.prototype.set_secret = function(secret) {
    this.secret = secret;
};
Foo1.prototype.get_secret = function() {
    return this.secret;
};
var foo1 = new Foo1();   // new struct()  实例 golang

/*
if(a<b)   控制指令
   var  a =  a-b    数据指令   运算指令
*/

console.log(foo1.get_secret());
console.log(foo1.secret); //ok
foo1.set_secret('a new secret');
console.log(foo1.get_secret());
console.log('--------------------------------------------------');

/**************************************************************************/
var foo2 = (function() {
    var secret = 'default';
    return {
        get_secret: function() {
            return secret;
        },
        set_secret: function(new_secret) {
            secret = new_secret;
        }
    };
}());//定义一个函数并立刻调用

console.log(foo2.get_secret());
console.log(foo2.secret); // fale 不能从外部访问 实现了类似private
foo2.set_secret('a new secret');
console.log(foo2.get_secret());
console.log('--------------------------------------------------');

/**************************************************************************/
var foo3 = (function() {
    this.secret = 'default'; //windos
    console.log(this);
    return {
        get_secret: function() {
            console.log(this); // return的{} 谁调用函数谁就是函数里的this
            return this.secret;

        },
        set_secret: function(new_secret) {
            console.log(this);
            this.secret = new_secret;
        }
    };
})();

/*
var Foo3 = function() {
    this.secret = 'default';
    console.log(this);
    return {
        get_secret: function() {
            console.log(this);
            return this.secret;

        },
        set_secret: function(new_secret) {
            console.log(this);
            this.secret = new_secret;
        }
    };
};
var foo3 = new Foo3();
*/

console.log(foo3.get_secret());
console.log(foo3.secret);
foo3.set_secret('a new secret');
console.log(foo3.get_secret());
console.log('--------------------------------------------------');


// http://www.zhihu.com/question/20292224
// http://www.zhihu.com/question/20348948
// http://www.zhihu.com/question/19554716
// http://www.zhihu.com/question/19636194/answer/12504495
//call和apply操作符可以随意改变this指向
//匿名函数的this指向是window
