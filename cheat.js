/* eslint-disable no-console */
var CheatEngine = class {
  constructor(module) {
    this.module = module;
    this.fixed = [];
    this.heap = "HEAP32";
    this.stored = null;
  }

  save() {
    this.stored = this.orig.slice();
    const bs = new BitSet;
    bs.setRange(0, this.stored.length - 1, 1);
    this.matched = bs;
    console.log("saved");
  }

  setHeap(value) {
    this.heap = value;
  }

  get orig() {
    return this.module[this.heap];
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

  gt(val) {
    if (val === undefined || val === null) {
      this.fn((stored, current) => current > stored);
    } else {
      this.fn((stored, current) => current > val);
    }
  }

  lt(val) {
    if (val === undefined || val === null) {
      this.fn((stored, current) => current < stored);
    } else {
      this.fn((stored, current) => current < val);
    }
  }

  fn(test) {
    for (var i = this.matched.lsb(); i < this.matched.msb(); i++) {
      if (this.matched.get(i) && !test(this.stored[i], this.orig[i])) {
        this.matched.set(i, 0);
      }
    }
    this.stored = this.orig.slice();
    console.log("done");
  }

  show() {
    const res = {};
    for (var i = this.matched.lsb(); i < this.matched.msb(); i++) {
      if (this.matched.get(i)) {
        res[i] = this.orig[i];
      }
    }
    return res;
  }

  list() {
    const res = [];
    for (var i = this.matched.lsb(); i < this.matched.msb(); i++) {
      if (this.matched.get(i)) {
        res.push(`0x${i.toString(16)}: ${this.orig[i]}`);
      }
    }
    return res;
  }

  get count() {
    return this.matched.cardinality() - 1;
  }

  print() {
    console.log(this.show());
  }

  fix(index, value) {
    this.fixed[index] = setInterval(() => (this.orig[index] = value), 200);
  }

  unfix(index) {
    clearInterval(this.fixed[index]);
    delete this.fixed[index];
  }

  fixAll(value) {
    for (var i = this.matched.lsb(); i < this.matched.msb(); i++) {
      if (this.matched.get(i)) {
        if (value === undefined || value === null) {
          this.fix(i, value);
        } else {
          this.fix(i, this.stored[i]);
        }
      }
    }
  }

  unfixAll() {
    this.fixed.forEach((v, i) => {
      this.unfix(i);
    });
  }
};

const send = (type, data) => {
  window.postMessage(
    {
      type: type,
      data: data
    },
    "*"
  );
};

(async () => {
  while (!window.Module || !window.Module.HEAP32) {
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  window.cheat = new CheatEngine(window.Module);
  send("msg", "loaded");

  window.addEventListener("message", function(event) {
    const cheat = window.cheat;
    const data = event.data.data;
    const type = (data === undefined || data === null) ? "previous value" : data;
    switch (event.data.type) {
    case "save":
      cheat.save();
      send("result", `save - ${cheat.count} results`);
      break;
    case "eq":
      cheat.eq(data);
      send("result", `eq - ${cheat.count} results eq ${type}`);
      break;
    case "ne":
      cheat.ne(data);
      send("result", `ne - ${cheat.count} results ne ${type}`);
      break;
    case "lt":
      cheat.lt(data);
      send("result", `lt - ${cheat.count} results lt ${type}`);
      break;
    case "gt":
      cheat.gt(data);
      send("result", `gt - ${cheat.count} results gt ${type}`);
      break;
    case "fixAll":
      cheat.fixAll(data);
      send("result", `fixAll - ${cheat.count} fixed to ${type}`);
      break;
    case "unfixAll":
      cheat.unfixAll();
      send("result", "unfixed all");
      break;
    case "show":
      send("result", cheat.list().join("\n"));
      break;
    case "count":
      send("result", `${cheat.count} results`);
      break;
    case "heap":
      cheat.setHeap(data);
      break;
    }
  });
})();