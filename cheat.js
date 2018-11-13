/* eslint-disable no-console */

var CheatEngine = class {
  constructor(module) {
    this.module = module;
    this.fixed = [];
  }

  save() {
    this.stored = this.orig.slice();
    this.matched = Array(this.stored.length).fill(null);
    console.log("saved");
  }

  get orig() {
    return this.module.HEAP32;
  }

  eq(val) {
    if (val === undefined || val === null) {
      this.fn((stored, current) => stored === current);
    } else {
      this.fn((stored, current) => current === val);
    }
  }

  ne(val) {
    if (val === undefined || val === null) {
      this.fn((stored, current) => stored !== current);
    } else {
      this.fn((stored, current) => current !== val);
    }
  }

  gt() {
    this.fn((stored, current) => current > stored);
  }

  lt() {
    this.fn((stored, current) => current < stored);
  }

  fn(test) {
    this.matched.forEach((v, i) => {
      if (!test(this.stored[i], this.orig[i])) {
        delete this.matched[i];
      }
    });
    console.log("done");
  }

  show() {
    const res = {};
    this.matched.forEach((v, i) => {
      res[i] = this.orig[i];
    });
    return res;
  }

  print() {
    console.log(this.show());
  }

  fix(index, value) {
    this.fixed[index] = setInterval(() => (this.orig[index] = value), 200);
  }

  unfix(index) {
    clearInterval(this.fixed[index]);
  }

  fixAll(value) {
    this.matched.forEach((v, i) => {
      this.fix(i, value);
    });
  }

  unfixAll() {
    this.fixed.forEach((v, i) => {
      this.unfix(i);
    });
  }
};

(async () => {
  while (!window.Module || !window.Module.HEAP32) {
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  window.cheat = new CheatEngine(window.Module);

  console.log("cheat.js posting message");
  window.postMessage({
    type: "aType",
    data: "someData"
  }, "*");
})();
