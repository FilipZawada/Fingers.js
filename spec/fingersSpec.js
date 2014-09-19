"use strict";

describe("fingers", function () {
    var event = null;
    var elem = null;
    var handler = null;
    var handler2 = null;

    beforeEach(function () {
        event = new MouseEvent("click");

        elem = document.createElement("span");
        elem.click = elem.dispatchEvent.bind(elem, event);

        handler = jasmine.createSpy('handler');
        handler2 = jasmine.createSpy('handler2');

    });

    afterEach(function () {
        elem = null;
        handler = null;
        handler2 = null;
        event = null;
    });

    describe("smoke tests", function () {

        it("adds listener without error", function () {
            on(elem).click += handler;
        });

        it("removes listener without error", function () {
            on(elem).click -= handler;
        });

        it("adds & removes listener at once without error", function () {
            on(elem).click += handler - handler2;
        });

        it("sets any elem listener without error", function () {
            on(elem).click = handler;
        });

        it("on(elem).click = -handler; -- removing not-added handler does nothing", function () {
            on(elem).click = -handler;
        });

    });

    describe("core mechanism", function () {

        it("on(elem).click = handler; -- handler gets called with MouseEvent argument", function () {
            on(elem).click = handler;

            elem.click();

            expect(handler).toHaveBeenCalledWith(event);
        });

        it("on(elem).click += handler; -- handler gets called with MouseEvent argument", function () {
            on(elem).click += handler;

            elem.click();

            expect(handler).toHaveBeenCalledWith(event);
        });

        it("on(elem).click -= handler; -- handler is removed and not called", function () {
            on(elem).click += handler;
            on(elem).click -= handler;

            elem.click();

            expect(handler).not.toHaveBeenCalled();
        });


        it("on(elem).click += handler + handler2; -- both handlers get called", function () {
            on(elem).click += handler + handler2;

            elem.click();

            expect(handler).toHaveBeenCalled();
            expect(handler2).toHaveBeenCalled();
        });

        it("on(elem).click = handler + handler2; -- both handlers get called", function () {
            on(elem).click = handler + handler2;

            elem.click();

            expect(handler).toHaveBeenCalled();
            expect(handler2).toHaveBeenCalled();
        });

        it("on(elem).click = handler + handler; -- handler gets called only once", function () {
            on(elem).click = handler + handler;

            elem.click();

            expect(handler.calls.count()).toEqual(1);
        });

        it("on(elem).click = handler - handler; -- handler is not added", function () {
            on(elem).click = handler - handler;

            elem.click();

            expect(handler).not.toHaveBeenCalled();
        });

      it("on(elem).click = -handler + handler; -- handler is not added", function () {
            on(elem).click = -handler + handler;

            elem.click();

            expect(handler).not.toHaveBeenCalled();
        });

    });

    describe("valueOf tests", function () {

        it("externally modified Function.prototype.valueOf() is preserved", function () {
            // prepare
            const originalValueOf = Function.prototype.valueOf;
            const customValueOf = function () {
            };
            Function.prototype.valueOf = customValueOf;

            // execute
            on(elem).click += handler + handler2;
            elem.click();

            // verify
            expect(Function.prototype.valueOf).toBe(customValueOf);

            // clean up
            Function.prototype.valueOf = originalValueOf;
        });

        it("default Function.prototype.valueOf is preserved", function () {
            const valueOf = Function.prototype.valueOf;

            on(elem).click += handler;

            elem.click();
            expect(Function.prototype.valueOf).toBe(valueOf);
        });

    });

    describe("edge cases", function () {

        beforeEach(function () {
            spyOn(console, "error");
        });

        it("on(elem).click -= 5; -- logs error", function () {
            on(elem).click -= 5;

            expect(console.error).toHaveBeenCalledWith(jasmine.any(String));
        });

        it("on(elem).click += 5; -- logs error", function () {
            on(elem).click += 5;

            expect(console.error).toHaveBeenCalledWith(jasmine.any(String));
        });

        it("on(elem).click += {}; -- logs error", function () {
            on(elem).click += {};

            expect(console.error).toHaveBeenCalledWith(jasmine.any(String));
        });

        it("on(elem).click += 'unrelated'; -- logs error", function () {
            on(elem).click += 'unrelated';

            expect(console.error).toHaveBeenCalledWith(jasmine.any(String));
        });

        xit("on(elem).click += handler - 2; -- logs error", function () {
            on(elem).click += handler - 2;

            expect(console.error).toHaveBeenCalledWith(jasmine.any(String));

            // unfortunately this kind of edge cases are impossible to detect
        });

    });
});