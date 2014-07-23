;var on = (function () {

    // 32-bit base, because bitwise operators work on max 32 bits
    const BIT_BASE = 0x55555555;

    const ADD_LISTENER = 0x2;

    const REMOVE_LISTENER = 0x0;

    const LISTENER_FLAGS_MASK = 0x3;


    const extendedValueOf = function () {
        if (handlers.length >= 16) {
            throw new Error("Max 16 functions can be added/removed at once using on(..) syntax");
        }

        handlers.push(this);

        return 1 << ((handlers.length - 1) * 2);
    };

    var handlers;
    var modifiedValueOf;

    function on(dispatcher) {

        if (Function.prototype.valueOf == extendedValueOf) {
            console.error("on() statement has been opened, but not closed");
        } else {
            modifiedValueOf = Function.prototype.valueOf;
            Function.prototype.valueOf = extendedValueOf;
        }

        handlers = [];

        return Proxy.create({
            get: function (proxy, name) {
                return 0;
            },

            set: function (obj, prop, value) {

                //restore default valueOf
                Function.prototype.valueOf = modifiedValueOf;

                if (typeof value == "number" && handlers.length > 0) {

                    value += BIT_BASE;

                    var handlersForRemoval = [];
                    for (var i = 0; i < handlers.length; i++) {
                        var flag = (value >> (i * 2)) & LISTENER_FLAGS_MASK;

                        if (flag == ADD_LISTENER) {
                            dispatcher.addEventListener(prop, handlers[i]);
                        }
                        else if (flag == REMOVE_LISTENER) {
                            handlersForRemoval.push(handlers[i]);
                        }
                    }

                    for (i = 0; i < handlersForRemoval.length; i++) {
                        dispatcher.removeEventListener(prop, handlersForRemoval[i]);
                    }

                } else if (value instanceof Function) {
                    dispatcher.addEventListener(prop, value);
                } else {
                    console.error("Fingers doesn't support value: " + value);
                }
            }
        });
    }

    return on
})();

