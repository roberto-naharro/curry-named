const curry = require("../index.js");

describe("curry", () => {
  const getFn = (a, b, c) => a[b] + (c ? c : 0);
  const expectFn = val => expect(typeof val).toBe("function");

  it("should throw an error", () => {
    expect(() => curry()).toThrow();
  });

  it("one argument, simple function", () => {
    debugger;
    const getFnC = curry(getFn);

    expectFn(getFnC);
    expectFn(getFnC({ a: 1 }));
    expectFn(getFnC({ a: 1 }, "a"));
    expect(getFnC({ a: 1 }, "a", 0)).toBe(1);
  });

  it("2 arguments, with number of parameters", () => {
    debugger;
    const getFnC = curry(2, getFn);

    expectFn(getFnC);
    expectFn(getFnC({ a: 1 }));
    expect(getFnC({ a: 1 }, "a")).toBe(1);
  });

  it("2 arguments, with named parameters", () => {
    debugger;
    const getFnC = curry(["obj", "k", "add"], getFn);

    expectFn(getFnC);
    expectFn(getFnC({ obj: { a: 1 } }));
    expectFn(getFnC({ obj: { a: 1 }, k: "a" }));
    expect(getFnC({ obj: { a: 1 }, k: "a", add: 0 })).toBe(1);
    expect(getFnC({ obj: { a: 1 }, k: "a" })({ add: 0 })).toBe(1);
  });
});
