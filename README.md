Fingers.js
==========

Fingers is a micro JavaScript library. It hacks js `+` and `-` operators to provide a nice way of adding event listeners. 
It's not using any transcompiler, just pure JavaScript, plus a `Proxy` goodness from ES6 (already supported by Chrome, Firefox).

So, let's try:

```js

function handler1() {
    console.log("handler1");
}
function handler2() {
    console.log("handler2");
}    
var button = document.getElementById("btn");



__on(button).click += handler1 + handler2;__

button.dispatchEvent(new MouseEvent("click")); // outputs: handler1, handler2

__on(button).click -= handler1;__

button.dispatchEvent(new MouseEvent("click")); // outputs: handler2

__on(button).click -= handler2;__

button.dispatchEvent(new MouseEvent("click")); // outputs: {empty}

```

Do you find this interesting? Please help spread the word by tweeting:

Twitter:

+   \#fingersJS
+   @filip_zawada
