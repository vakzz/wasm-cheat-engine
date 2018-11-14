/* eslint-disable */
// https://github.com/infusion/bitset.js
(function(q){function p(a){a-=a>>>1&1431655765;a=(a&858993459)+(a>>>2&858993459);return 16843009*(a+(a>>>4)&252645135)>>>24}function r(a,b){for(var c=0,d=0;d<a.length;d++){c*=2;var e=(a[d]+c)/b|0;c=(a[d]+c)%b;a[d]=e}return c}function n(a,b){if(null==b)a.data=[0,0,0,0,0,0,0,0,0,0],a._=0;else if(b instanceof g)a.data=b.data,a._=b._;else switch(typeof b){case "number":a.data=[b|0];a._=0;break;case "string":var c=2,d=32;0===b.indexOf("0b")?b=b.substr(2):0===b.indexOf("0x")&&(b=b.substr(2),c=16,d=8);a.data=
[];a._=0;var e=b.length-d,f=b.length;do{var h=parseInt(b.slice(0<e?e:0,f),c);if(isNaN(h))throw SyntaxError("Invalid param");a.data.push(h|0);if(0>=e)break;e-=d;f-=d}while(1);break;default:if(a.data=[0],c=a.data,b instanceof Array)for(d=b.length-1;0<=d;d--)e=b[d],Infinity===e?a._=-1:(m(a,e),c[e>>>5]|=1<<e);else if(Uint8Array&&b instanceof Uint8Array)for(m(a,8*b.length),d=0;d<b.length;d++)for(e=b[d],f=0;8>f;f++)h=8*d+f,c[h>>>5]|=(e>>f&1)<<h;else throw SyntaxError("Invalid param");}}function g(a){if(!(this instanceof
g))return new g(a);n(this,a);this.data=this.data.slice()}function m(a,b){for(var c=b>>>5,d=a.data,e=a._,f=d.length;c>=f;c--)d.push(e)}var k={data:[],_:0};g.prototype={data:[],_:0,set:function(a,b){a|=0;m(this,a);this.data[a>>>5]=void 0===b||b?this.data[a>>>5]|1<<a:this.data[a>>>5]&~(1<<a);return this},get:function(a){a|=0;var b=this.data,c=a>>>5;return c>b.length?this._&1:b[c]>>>a&1},not:function(){for(var a=this.clone(),b=a.data,c=0;c<b.length;c++)b[c]=~b[c];a._=~a._;return a},and:function(a){n(k,
a);a=this.clone();var b=a.data,c=k.data,d=c.length,e=k._;0!==a._&&m(a,32*d-1);var f=b.length;d=Math.min(d,f);for(var h=0;h<d;h++)b[h]&=c[h];for(;h<f;h++)b[h]&=e;a._&=e;return a},or:function(a){n(k,a);a=this.clone();for(var b=a.data,c=k.data,d=c.length-1,e=Math.min(b.length-1,d);d>e;d--)b[d]=c[d];for(;0<=d;d--)b[d]|=c[d];a._|=k._;return a},xor:function(a){n(k,a);a=this.clone();var b=a.data,c=k.data,d=a._,e=k._,f,h=b.length-1,g=c.length-1;for(f=h;f>g;f--)b[f]^=e;for(f=g;f>h;f--)b[f]=d^c[f];for(;0<=
f;f--)b[f]^=c[f];a._^=e;return a},andNot:function(a){return this.and((new g(a)).flip())},flip:function(a,b){if(void 0===a){for(var c=this.data,d=0;d<c.length;d++)c[d]=~c[d];this._=~this._}else if(void 0===b)m(this,a),this.data[a>>>5]^=1<<a;else if(0<=a&&a<=b)for(m(this,b),d=a;d<=b;d++)this.data[d>>>5]^=1<<d;return this},clear:function(a,b){var c=this.data;if(void 0===a){for(var d=c.length-1;0<=d;d--)c[d]=0;this._=0}else if(void 0===b)a|=0,m(this,a),c[a>>>5]&=~(1<<a);else if(a<=b)for(m(this,b),d=a;d<=
b;d++)c[d>>>5]&=~(1<<d);return this},slice:function(a,b){if(void 0===a)return this.clone();if(void 0===b){b=32*this.data.length;var c=Object.create(g.prototype);c._=this._;c.data=[0];for(var d=a;d<=b;d++)c.set(d-a,this.get(d));return c}if(a<=b&&0<=a){c=Object.create(g.prototype);c.data=[0];for(d=a;d<=b;d++)c.set(d-a,this.get(d));return c}return null},setRange:function(a,b,c){for(;a<=b;a++)this.set(a,c);return this},clone:function(){var a=Object.create(g.prototype);a.data=this.data.slice();a._=this._;
return a},toArray:Math.clz32?function(){for(var a=[],b=this.data,c=b.length-1;0<=c;c--)for(var d=b[c];0!==d;){var e=31-Math.clz32(d);d^=1<<e;a.unshift(32*c+e)}0!==this._&&a.push(Infinity);return a}:function(){for(var a=[],b=this.data,c=0;c<b.length;c++)for(var d=b[c];0!==d;){var e=d&-d;d^=e;a.push(32*c+p(e-1))}0!==this._&&a.push(Infinity);return a},toString:function(a){var b=this.data;a||(a=2);if(0===(a&a-1)&&36>a){for(var c="",d=2+Math.log(4294967295)/Math.log(a)|0,e=b.length-1;0<=e;e--){var f=b[e];
0>f&&(f+=4294967296);f=f.toString(a);""!==c&&(c+="0".repeat(d-f.length-1));c+=f}return 0===this._?(c=c.replace(/^0+/,""),""===c&&(c="0"),c):("1111"+c).replace(/^1+/,"...1111")}if(2>a||36<a)throw SyntaxError("Invalid base");c=[];d=[];for(e=b.length;e--;)for(f=32;f--;)d.push(b[e]>>>f&1);do c.unshift(r(d,a).toString(a));while(!d.every(function(a){return 0===a}));return c.join("")},isEmpty:function(){if(0!==this._)return!1;for(var a=this.data,b=a.length-1;0<=b;b--)if(0!==a[b])return!1;return!0},cardinality:function(){if(0!==
this._)return Infinity;for(var a=0,b=this.data,c=0;c<b.length;c++){var d=b[c];0!==d&&(a+=p(d))}return a},msb:Math.clz32?function(){if(0!==this._)return Infinity;for(var a=this.data,b=a.length;0<b--;){var c=Math.clz32(a[b]);if(32!==c)return 32*b+32-1-c}return Infinity}:function(){if(0!==this._)return Infinity;for(var a=this.data,b=a.length;0<b--;){var c=a[b],d=0;if(c){for(;0<(c>>>=1);d++);return 32*b+d}}return Infinity},ntz:function(){for(var a=this.data,b=0;b<a.length;b++){var c=a[b];if(0!==c)return c=
(c^c-1)>>>1,32*b+p(c)}return Infinity},lsb:function(){for(var a=this.data,b=0;b<a.length;b++){var c=a[b],d=0;if(c){for(a=c&-c;a>>>=1;d++);return 32*b+d}}return this._&1},equals:function(a){n(k,a);a=this.data;var b=k.data,c=this._,d=k._,e=a.length-1,f=b.length-1;if(d!==c)return!1;for(var g=e<f?e:f,l=0;l<=g;l++)if(a[l]!==b[l])return!1;for(l=e;l>f;l--)if(a[l]!==d)return!1;for(l=f;l>e;l--)if(b[l]!==c)return!1;return!0}};g.fromBinaryString=function(a){return new g("0b"+a)};g.fromHexString=function(a){return new g("0x"+
a)};g.Random=function(a){if(void 0===a||0>a)a=32;var b=a%32,c=[];a=Math.ceil(a/32);for(var d=Object.create(g.prototype),e=0;e<a;e++)c.push(4294967296*Math.random()|0);0<b&&(c[a-1]&=(1<<b)-1);d.data=c;d._=0;return d};"function"===typeof define&&define.amd?define([],function(){return g}):"object"===typeof exports?(Object.defineProperty(exports,"__esModule",{value:!0}),g["default"]=g,g.BitSet=g,module.exports=g):q.BitSet=g})(this);
/* eslint-enable */

/* eslint-disable no-console */
var CheatEngine = class {
  constructor(module) {
    this.module = module;
    this.fixed = [];
    this.heap = "HEAP32";
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

  gt() {
    this.fn((stored, current) => current > stored);
  }

  lt() {
    this.fn((stored, current) => current < stored);
  }

  fn(test) {
    for (var i = this.matched.lsb(); i < this.matched.msb(); i++) {
      if (this.matched.get(i) && !test(this.stored[i], this.orig[i])) {
        this.matched.set(i, 0);
      }
    }
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
    return this.matched.cardinality();
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
  const cheat = window.cheat;
  send("msg", "loaded");

  window.addEventListener("message", function(event) {
    // console.log("cheat.js window mesg", event);
    const data = event.data.data;
    switch (event.data.type) {
    case "save":
      cheat.save();
      send("result", `save - ${cheat.count} results`);
      break;
    case "eq":
      cheat.eq(data);
      send("result", `eq - ${cheat.count} results eq ${data}`);
      break;
    case "ne":
      cheat.ne(data);
      send("result", `ne - ${cheat.count} results ne ${data}`);
      break;
    case "lt":
      cheat.lt(data);
      send("result", `lt - ${cheat.count} results lt ${data}`);
      break;
    case "gt":
      cheat.gt(data);
      send("result", `gt - ${cheat.count} results gt ${data}`);
      break;
    case "fixAll":
      cheat.fixAll(data);
      send("result", `fixAll - ${cheat.count} fixed to ${data}`);
      break;
    case "show":
      send("result", cheat.list().join("\n"));
      break;
    case "count":
      send("result", `${cheat.count} results`);
      break;
    case "heap":
      cheat.setHeap(data);
      send("result", `heap is now ${data}`);
      break;
    }
  });
})();