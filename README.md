chronograph.js
==========================
A very simple library to track method execution time, very handy when tracking execution time before callbacks are executed.

```javascript
var Chronograph  = require('chronograph');
var chronograph = new Chronograph(
    new Chronograph.ConsoleReporter(),
    {namespace: 'example'}
);

/**************** After examples ****************/
function foo(amount) {
    for (var i = 0; i < amount; i++){
        Math.floor(i + i/1000 * i * Date.now());
    }
    return i;
}

var result1 = chronograph.after(foo)(10);
console.log(result1);
// It will report something like: ConsoleReporter example.foo 0

var result2 = chronograph.after(foo)(9000000);
console.log(result2);
// It will report something like: ConsoleReporter example.foo 1190

/**************** Before examples ****************/
function callback(result) {
    console.log(result);
}

function itWillCallback(amount, callback) {
    for (var i = 0; i < amount; i++){
        Math.floor(i + i/1000 * i * Date.now());
    }
    callback(i);
}

itWillCallback(10, chronograph.before(callback));
// It will report something like: ConsoleReporter example.callback 0

itWillCallback(9000000, chronograph.before(callback));
// It will report something like: ConsoleReporter example.callback 1256

```
