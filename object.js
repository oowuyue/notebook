function Foo1() {
    this.secret = 'default';
}
Foo1.prototype.set_secret = function(secret) {
    this.secret = secret;
};
Foo1.prototype.get_secret = function() {
    return this.secret;
};
var foo1 = new Foo1();

console.log(foo1.get_secret());
console.log(foo1.secret);
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
console.log(foo2.secret);
foo2.set_secret('a new secret');
console.log(foo2.get_secret());
console.log('--------------------------------------------------');

/**************************************************************************/


var foo3 = (function() {
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
})();

//var Foo3 = function() {
//    this.secret = 'default';
//    console.log(this);
//    return {
//        get_secret: function() {
//            console.log(this);
//            return this.secret;
//
//        },
//        set_secret: function(new_secret) {
//            console.log(this);
//            this.secret = new_secret;
//        }
//    };
//};
//var foo3 = new Foo3();


console.log(foo3.get_secret());
console.log(foo3.secret);
foo3.set_secret('a new secret');
console.log(foo3.get_secret());
console.log('--------------------------------------------------');



// http://www.zhihu.com/question/20292224
// http://www.zhihu.com/question/20348948
// http://www.zhihu.com/question/19554716
// http://www.zhihu.com/question/19636194/answer/12504495
