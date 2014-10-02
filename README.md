Fingers.js
==========

Fingers is a proof-of-concept micro JavaScript library. It hacks js `+` and `-` operators to provide a nice way of adding event listeners. 
It's not using any transcompiler, just pure JavaScript, plus a `Proxy` goodness from ES6 (already supported by Chrome, Firefox).

So, let's try:

```js
var button = document.getElementById("btn");



on(button).click += handler1 + handler2;

click(); // outputs: handler1, handler2

on(button).click -= handler1;

click(); // outputs: handler2

on(button).click -= handler2;

click(); // outputs: {empty}

///// utils /////

function handler1() {
    console.log("handler1");
}
function handler2() {
    console.log("handler2");
}    
function click() {
    // simulate user click
    button.dispatchEvent(new MouseEvent("click"));
}
```

Do you find this interesting? Please help spread the word by tweeting [\#fingersJS](https://twitter.com/intent/tweet?&text=Fingers.js%2C%20operator%20overloading%20in%20JavaScript%3A%20on%28elem%29.click%20%2B%3D%20handler1%20%2B%20function%28%29%7B%7D%3B%20%23FingersJS%20%23JS)


Links:

+ [Article](http://filimanjaro.com/2012/operators-overloading-in-as3-javascript-too-%E2%80%93-workaround/) explaining core mechanism used here
+ Fingers AS3 [website](http://filimanjaro.com/fingers) and [github](https://github.com/FilipZawada/FingersAS3)

Author:

+   [Filip Zawada](http://filimanjaro.com/)   
+   Follow [@filip_zawada](https://twitter.com/filip_zawada)

