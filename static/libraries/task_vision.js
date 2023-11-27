/**
 * Skipped minification because the original files appears to be already minified.
 * Original file: /npm/@mediapipe/tasks-vision@0.10.8/vision_bundle.mjs
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
var t = "undefined" != typeof self ? self : {};
function e(e, n) {
    t: {
        for (var r = ["CLOSURE_FLAGS"], i = t, s = 0; s < r.length; s++)
            if (null == (i = i[r[s]])) {
                r = null;
                break t
            }
        r = i
    }
    return null != (e = r && r[e]) ? e : n
}
function n() {
    throw Error("Invalid UTF8")
}
function r(t, e) {
    return e = String.fromCharCode.apply(null, e),
    null == t ? e : t + e
}
let i, s;
const o = "undefined" != typeof TextDecoder;
let a;
const c = "undefined" != typeof TextEncoder;
function h(t) {
    if (c)
        t = (a ||= new TextEncoder).encode(t);
    else {
        let n = 0;
        const r = new Uint8Array(3 * t.length);
        for (let i = 0; i < t.length; i++) {
            var e = t.charCodeAt(i);
            if (128 > e)
                r[n++] = e;
            else {
                if (2048 > e)
                    r[n++] = e >> 6 | 192;
                else {
                    if (55296 <= e && 57343 >= e) {
                        if (56319 >= e && i < t.length) {
                            const s = t.charCodeAt(++i);
                            if (56320 <= s && 57343 >= s) {
                                e = 1024 * (e - 55296) + s - 56320 + 65536,
                                r[n++] = e >> 18 | 240,
                                r[n++] = e >> 12 & 63 | 128,
                                r[n++] = e >> 6 & 63 | 128,
                                r[n++] = 63 & e | 128;
                                continue
                            }
                            i--
                        }
                        e = 65533
                    }
                    r[n++] = e >> 12 | 224,
                    r[n++] = e >> 6 & 63 | 128
                }
                r[n++] = 63 & e | 128
            }
        }
        t = n === r.length ? r : r.subarray(0, n)
    }
    return t
}
var u, l = e(610401301, !1), f = e(572417392, e(1, !0));
const d = t.navigator;
function p(t) {
    return !!l && (!!u && u.brands.some((({brand: e})=>e && -1 != e.indexOf(t))))
}
function g(e) {
    var n;
    return (n = t.navigator) && (n = n.userAgent) || (n = ""),
    -1 != n.indexOf(e)
}
function m() {
    return !!l && (!!u && 0 < u.brands.length)
}
function y() {
    return m() ? p("Chromium") : (g("Chrome") || g("CriOS")) && !(!m() && g("Edge")) || g("Silk")
}
u = d && d.userAgentData || null;
var v = !m() && (g("Trident") || g("MSIE"));
!g("Android") || y(),
y(),
g("Safari") && (y() || !m() && g("Coast") || !m() && g("Opera") || !m() && g("Edge") || (m() ? p("Microsoft Edge") : g("Edg/")) || m() && p("Opera"));
var _ = {}
  , w = null;
function b(t) {
    var e = t.length
      , n = 3 * e / 4;
    n % 3 ? n = Math.floor(n) : -1 != "=.".indexOf(t[e - 1]) && (n = -1 != "=.".indexOf(t[e - 2]) ? n - 2 : n - 1);
    var r = new Uint8Array(n)
      , i = 0;
    return function(t, e) {
        function n(e) {
            for (; r < t.length; ) {
                var n = t.charAt(r++)
                  , i = w[n];
                if (null != i)
                    return i;
                if (!/^[\s\xa0]*$/.test(n))
                    throw Error("Unknown base64 encoding at char: " + n)
            }
            return e
        }
        E();
        for (var r = 0; ; ) {
            var i = n(-1)
              , s = n(0)
              , o = n(64)
              , a = n(64);
            if (64 === a && -1 === i)
                break;
            e(i << 2 | s >> 4),
            64 != o && (e(s << 4 & 240 | o >> 2),
            64 != a && e(o << 6 & 192 | a))
        }
    }(t, (function(t) {
        r[i++] = t
    }
    )),
    i !== n ? r.subarray(0, i) : r
}
function E() {
    if (!w) {
        w = {};
        for (var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), e = ["+/=", "+/", "-_=", "-_.", "-_"], n = 0; 5 > n; n++) {
            var r = t.concat(e[n].split(""));
            _[n] = r;
            for (var i = 0; i < r.length; i++) {
                var s = r[i];
                void 0 === w[s] && (w[s] = i)
            }
        }
    }
}
var A = "undefined" != typeof Uint8Array
  , T = !v && "function" == typeof btoa;
function k(t) {
    if (!T) {
        var e;
        void 0 === e && (e = 0),
        E(),
        e = _[e];
        var n = Array(Math.floor(t.length / 3))
          , r = e[64] || "";
        let c = 0
          , h = 0;
        for (; c < t.length - 2; c += 3) {
            var i = t[c]
              , s = t[c + 1]
              , o = t[c + 2]
              , a = e[i >> 2];
            i = e[(3 & i) << 4 | s >> 4],
            s = e[(15 & s) << 2 | o >> 6],
            o = e[63 & o],
            n[h++] = a + i + s + o
        }
        switch (a = 0,
        o = r,
        t.length - c) {
        case 2:
            o = e[(15 & (a = t[c + 1])) << 2] || r;
        case 1:
            t = t[c],
            n[h] = e[t >> 2] + e[(3 & t) << 4 | a >> 4] + o + r
        }
        return n.join("")
    }
    for (e = "",
    n = 0,
    r = t.length - 10240; n < r; )
        e += String.fromCharCode.apply(null, t.subarray(n, n += 10240));
    return e += String.fromCharCode.apply(null, n ? t.subarray(n) : t),
    btoa(e)
}
const S = /[-_.]/g
  , x = {
    "-": "+",
    _: "/",
    ".": "="
};
function F(t) {
    return x[t] || ""
}
function L(t) {
    if (!T)
        return b(t);
    S.test(t) && (t = t.replace(S, F)),
    t = atob(t);
    const e = new Uint8Array(t.length);
    for (let n = 0; n < t.length; n++)
        e[n] = t.charCodeAt(n);
    return e
}
function M(t) {
    return A && null != t && t instanceof Uint8Array
}
let O;
function P() {
    return O ||= new Uint8Array(0)
}
var I = {};
let C;
function R(t) {
    if (t !== I)
        throw Error("illegal external caller")
}
function D() {
    return C ||= new U(null,I)
}
function B(t) {
    R(I);
    var e = t.T;
    return null == (e = null == e || M(e) ? e : "string" == typeof e ? L(e) : null) ? e : t.T = e
}
var U = class {
    constructor(t, e) {
        if (R(e),
        this.T = t,
        null != t && 0 === t.length)
            throw Error("ByteString should be constructed with non-empty values")
    }
    qa() {
        const t = B(this);
        return t ? new Uint8Array(t) : P()
    }
}
;
function N(t, e) {
    return Error(`Invalid wire type: ${t} (at position ${e})`)
}
function G() {
    return Error("Failed to read varint, encoding is invalid.")
}
function j(t, e) {
    return Error(`Tried to read past the end of the data ${e} > ${t}`)
}
function V(t) {
    return 0 == t.length ? D() : new U(t,I)
}
function z(t) {
    if ("string" == typeof t)
        return {
            buffer: L(t),
            H: !1
        };
    if (Array.isArray(t))
        return {
            buffer: new Uint8Array(t),
            H: !1
        };
    if (t.constructor === Uint8Array)
        return {
            buffer: t,
            H: !1
        };
    if (t.constructor === ArrayBuffer)
        return {
            buffer: new Uint8Array(t),
            H: !1
        };
    if (t.constructor === U)
        return {
            buffer: B(t) || P(),
            H: !0
        };
    if (t instanceof Uint8Array)
        return {
            buffer: new Uint8Array(t.buffer,t.byteOffset,t.byteLength),
            H: !1
        };
    throw Error("Type not convertible to a Uint8Array, expected a Uint8Array, an ArrayBuffer, a base64 encoded string, a ByteString or an Array of numbers")
}
function W() {
    return "function" == typeof BigInt
}
var X = !f;
let H = !f;
const Y = "function" == typeof Uint8Array.prototype.slice;
let K, $ = 0, q = 0;
function J(t) {
    const e = 0 > t;
    let n = (t = Math.abs(t)) >>> 0;
    if (t = Math.floor((t - n) / 4294967296),
    e) {
        const [e,r] = st(n, t);
        t = r,
        n = e
    }
    $ = n >>> 0,
    q = t >>> 0
}
function Z(t) {
    const e = K ||= new DataView(new ArrayBuffer(8));
    e.setFloat32(0, +t, !0),
    q = 0,
    $ = e.getUint32(0, !0)
}
function Q(t, e) {
    return 4294967296 * e + (t >>> 0)
}
function tt(t, e) {
    const n = 2147483648 & e;
    return n && (e = ~e >>> 0,
    0 == (t = 1 + ~t >>> 0) && (e = e + 1 >>> 0)),
    t = Q(t, e),
    n ? -t : t
}
function et(t, e) {
    if (t >>>= 0,
    2097151 >= (e >>>= 0))
        var n = "" + (4294967296 * e + t);
    else
        W() ? n = "" + (BigInt(e) << BigInt(32) | BigInt(t)) : (t = (16777215 & t) + 6777216 * (n = 16777215 & (t >>> 24 | e << 8)) + 6710656 * (e = e >> 16 & 65535),
        n += 8147497 * e,
        e *= 2,
        1e7 <= t && (n += Math.floor(t / 1e7),
        t %= 1e7),
        1e7 <= n && (e += Math.floor(n / 1e7),
        n %= 1e7),
        n = e + nt(n) + nt(t));
    return n
}
function nt(t) {
    return t = String(t),
    "0000000".slice(t.length) + t
}
function rt() {
    var t = $
      , e = q;
    if (2147483648 & e)
        if (W())
            t = "" + (BigInt(0 | e) << BigInt(32) | BigInt(t >>> 0));
        else {
            const [n,r] = st(t, e);
            t = "-" + et(n, r)
        }
    else
        t = et(t, e);
    return t
}
function it(t) {
    if (16 > t.length)
        J(Number(t));
    else if (W())
        t = BigInt(t),
        $ = Number(t & BigInt(4294967295)) >>> 0,
        q = Number(t >> BigInt(32) & BigInt(4294967295));
    else {
        const e = +("-" === t[0]);
        q = $ = 0;
        const n = t.length;
        for (let r = e, i = (n - e) % 6 + e; i <= n; r = i,
        i += 6) {
            const e = Number(t.slice(r, i));
            q *= 1e6,
            $ = 1e6 * $ + e,
            4294967296 <= $ && (q += Math.trunc($ / 4294967296),
            q >>>= 0,
            $ >>>= 0)
        }
        if (e) {
            const [t,e] = st($, q);
            $ = t,
            q = e
        }
    }
}
function st(t, e) {
    return e = ~e,
    t ? t = 1 + ~t : e += 1,
    [t, e]
}
function ot(t, e, {W: n=!1}={}) {
    t.W = n,
    e && (e = z(e),
    t.h = e.buffer,
    t.u = e.H,
    t.v = 0,
    t.l = t.h.length,
    t.g = t.v)
}
function at(t, e) {
    if (t.g = e,
    e > t.l)
        throw j(t.l, e)
}
function ct(t, e) {
    let n, r = 0, i = 0, s = 0;
    const o = t.h;
    let a = t.g;
    do {
        n = o[a++],
        r |= (127 & n) << s,
        s += 7
    } while (32 > s && 128 & n);
    for (32 < s && (i |= (127 & n) >> 4),
    s = 3; 32 > s && 128 & n; s += 7)
        n = o[a++],
        i |= (127 & n) << s;
    if (at(t, a),
    128 > n)
        return e(r >>> 0, i >>> 0);
    throw G()
}
function ht(t) {
    let e = 0
      , n = t.g;
    const r = n + 10
      , i = t.h;
    for (; n < r; ) {
        const r = i[n++];
        if (e |= r,
        0 == (128 & r))
            return at(t, n),
            !!(127 & e)
    }
    throw G()
}
function ut(t) {
    var e = t.h;
    const n = t.g
      , r = e[n]
      , i = e[n + 1]
      , s = e[n + 2];
    return e = e[n + 3],
    at(t, t.g + 4),
    (r << 0 | i << 8 | s << 16 | e << 24) >>> 0
}
function lt(t, e) {
    if (0 > e)
        throw Error(`Tried to read a negative byte length: ${e}`);
    const n = t.g
      , r = n + e;
    if (r > t.l)
        throw j(e, t.l - n);
    return t.g = r,
    n
}
function ft(t, e) {
    if (0 == e)
        return D();
    var n = lt(t, e);
    return t.W && t.u ? n = t.h.subarray(n, n + e) : (t = t.h,
    n = n === (e = n + e) ? P() : Y ? t.slice(n, e) : new Uint8Array(t.subarray(n, e))),
    V(n)
}
var dt = class {
    constructor(t, e) {
        this.h = null,
        this.u = !1,
        this.g = this.l = this.v = 0,
        ot(this, t, e)
    }
    clear() {
        this.h = null,
        this.u = !1,
        this.g = this.l = this.v = 0,
        this.W = !1
    }
    m() {
        const t = this.h;
        let e = this.g
          , n = t[e++]
          , r = 127 & n;
        if (128 & n && (n = t[e++],
        r |= (127 & n) << 7,
        128 & n && (n = t[e++],
        r |= (127 & n) << 14,
        128 & n && (n = t[e++],
        r |= (127 & n) << 21,
        128 & n && (n = t[e++],
        r |= n << 28,
        128 & n && 128 & t[e++] && 128 & t[e++] && 128 & t[e++] && 128 & t[e++] && 128 & t[e++])))))
            throw G();
        return at(this, e),
        r
    }
    j() {
        return this.m() >>> 0
    }
    B() {
        var t = ut(this);
        const e = 2 * (t >> 31) + 1
          , n = t >>> 23 & 255;
        return t &= 8388607,
        255 == n ? t ? NaN : 1 / 0 * e : 0 == n ? e * Math.pow(2, -149) * t : e * Math.pow(2, n - 150) * (t + Math.pow(2, 23))
    }
    C() {
        return this.m()
    }
}
  , pt = [];
function gt(t) {
    var e = t.g;
    if (e.g == e.l)
        return !1;
    t.l = t.g.g;
    var n = t.g.j();
    if (e = n >>> 3,
    !(0 <= (n &= 7) && 5 >= n))
        throw N(n, t.l);
    if (1 > e)
        throw Error(`Invalid field number: ${e} (at position ${t.l})`);
    return t.m = e,
    t.h = n,
    !0
}
function mt(t) {
    switch (t.h) {
    case 0:
        0 != t.h ? mt(t) : ht(t.g);
        break;
    case 1:
        at(t = t.g, t.g + 8);
        break;
    case 2:
        if (2 != t.h)
            mt(t);
        else {
            var e = t.g.j();
            at(t = t.g, t.g + e)
        }
        break;
    case 5:
        at(t = t.g, t.g + 4);
        break;
    case 3:
        for (e = t.m; ; ) {
            if (!gt(t))
                throw Error("Unmatched start-group tag: stream EOF");
            if (4 == t.h) {
                if (t.m != e)
                    throw Error("Unmatched end-group tag");
                break
            }
            mt(t)
        }
        break;
    default:
        throw N(t.h, t.l)
    }
}
function yt(t, e, n) {
    const r = t.g.l
      , i = t.g.j()
      , s = t.g.g + i;
    let o = s - r;
    if (0 >= o && (t.g.l = s,
    n(e, t, void 0, void 0, void 0),
    o = s - t.g.g),
    o)
        throw Error(`Message parsing ended unexpectedly. Expected to read ${i} bytes, instead read ${i - o} bytes, either the data ended unexpectedly or the message misreported its own length`);
    return t.g.g = s,
    t.g.l = r,
    e
}
function vt(t) {
    var e = t.g.j()
      , a = lt(t = t.g, e);
    if (t = t.h,
    o) {
        var c, h = t;
        (c = s) || (c = s = new TextDecoder("utf-8",{
            fatal: !0
        })),
        t = a + e,
        h = 0 === a && t === h.length ? h : h.subarray(a, t);
        try {
            var u = c.decode(h)
        } catch (t) {
            if (void 0 === i) {
                try {
                    c.decode(new Uint8Array([128]))
                } catch (t) {}
                try {
                    c.decode(new Uint8Array([97])),
                    i = !0
                } catch (t) {
                    i = !1
                }
            }
            throw !i && (s = void 0),
            t
        }
    } else {
        e = (u = a) + e,
        a = [];
        let i, s = null;
        for (; u < e; ) {
            var l = t[u++];
            128 > l ? a.push(l) : 224 > l ? u >= e ? n() : (i = t[u++],
            194 > l || 128 != (192 & i) ? (u--,
            n()) : a.push((31 & l) << 6 | 63 & i)) : 240 > l ? u >= e - 1 ? n() : (i = t[u++],
            128 != (192 & i) || 224 === l && 160 > i || 237 === l && 160 <= i || 128 != (192 & (h = t[u++])) ? (u--,
            n()) : a.push((15 & l) << 12 | (63 & i) << 6 | 63 & h)) : 244 >= l ? u >= e - 2 ? n() : (i = t[u++],
            128 != (192 & i) || 0 != i - 144 + (l << 28) >> 30 || 128 != (192 & (h = t[u++])) || 128 != (192 & (c = t[u++])) ? (u--,
            n()) : (l = (7 & l) << 18 | (63 & i) << 12 | (63 & h) << 6 | 63 & c,
            l -= 65536,
            a.push(55296 + (l >> 10 & 1023), 56320 + (1023 & l)))) : n(),
            8192 <= a.length && (s = r(s, a),
            a.length = 0)
        }
        u = r(s, a)
    }
    return u
}
function _t(t) {
    const e = t.g.j();
    return ft(t.g, e)
}
function wt(t, e, n) {
    var r = t.g.j();
    for (r = t.g.g + r; t.g.g < r; )
        n.push(e.call(t.g))
}
var bt = [];
function Et(t) {
    return t ? /^\d+$/.test(t) ? (it(t),
    new At($,q)) : null : Tt ||= new At(0,0)
}
var At = class {
    constructor(t, e) {
        this.h = t >>> 0,
        this.g = e >>> 0
    }
}
;
let Tt;
function kt(t) {
    return t ? /^-?\d+$/.test(t) ? (it(t),
    new St($,q)) : null : xt ||= new St(0,0)
}
var St = class {
    constructor(t, e) {
        this.h = t >>> 0,
        this.g = e >>> 0
    }
}
;
let xt;
function Ft(t, e, n) {
    for (; 0 < n || 127 < e; )
        t.g.push(127 & e | 128),
        e = (e >>> 7 | n << 25) >>> 0,
        n >>>= 7;
    t.g.push(e)
}
function Lt(t, e) {
    for (; 127 < e; )
        t.g.push(127 & e | 128),
        e >>>= 7;
    t.g.push(e)
}
function Mt(t, e) {
    if (0 <= e)
        Lt(t, e);
    else {
        for (let n = 0; 9 > n; n++)
            t.g.push(127 & e | 128),
            e >>= 7;
        t.g.push(1)
    }
}
function Ot(t, e) {
    t.g.push(e >>> 0 & 255),
    t.g.push(e >>> 8 & 255),
    t.g.push(e >>> 16 & 255),
    t.g.push(e >>> 24 & 255)
}
function Pt(t, e) {
    0 !== e.length && (t.l.push(e),
    t.h += e.length)
}
function It(t, e, n) {
    Lt(t.g, 8 * e + n)
}
function Ct(t, e) {
    return It(t, e, 2),
    e = t.g.end(),
    Pt(t, e),
    e.push(t.h),
    e
}
function Rt(t, e) {
    var n = e.pop();
    for (n = t.h + t.g.length() - n; 127 < n; )
        e.push(127 & n | 128),
        n >>>= 7,
        t.h++;
    e.push(n),
    t.h++
}
function Dt(t, e, n) {
    It(t, e, 2),
    Lt(t.g, n.length),
    Pt(t, t.g.end()),
    Pt(t, n)
}
function Bt(t, e, n, r) {
    null != n && (e = Ct(t, e),
    r(n, t),
    Rt(t, e))
}
class Ut {
    constructor(t, e, n, r) {
        this.g = t,
        this.h = e,
        this.l = n,
        this.la = r
    }
}
function Nt(t) {
    return Array.prototype.slice.call(t)
}
const Gt = "function" == typeof Symbol && "symbol" == typeof Symbol() ? Symbol() : void 0;
var jt = Gt ? (t,e)=>{
    t[Gt] |= e
}
: (t,e)=>{
    void 0 !== t.D ? t.D |= e : Object.defineProperties(t, {
        D: {
            value: e,
            configurable: !0,
            writable: !0,
            enumerable: !1
        }
    })
}
;
function Vt(t) {
    const e = Xt(t);
    1 != (1 & e) && (Object.isFrozen(t) && (t = Nt(t)),
    Yt(t, 1 | e))
}
var zt = Gt ? (t,e)=>{
    t[Gt] &= ~e
}
: (t,e)=>{
    void 0 !== t.D && (t.D &= ~e)
}
;
function Wt(t, e, n) {
    return n ? t | e : t & ~e
}
var Xt = Gt ? t=>0 | t[Gt] : t=>0 | t.D
  , Ht = Gt ? t=>t[Gt] : t=>t.D
  , Yt = Gt ? (t,e)=>{
    t[Gt] = e
}
: (t,e)=>{
    void 0 !== t.D ? t.D = e : Object.defineProperties(t, {
        D: {
            value: e,
            configurable: !0,
            writable: !0,
            enumerable: !1
        }
    })
}
;
function Kt() {
    var t = [];
    return jt(t, 1),
    t
}
function $t(t) {
    return jt(t, 34),
    t
}
function qt(t, e) {
    Yt(e, -14591 & (0 | t))
}
function Jt(t, e) {
    Yt(e, -14557 & (34 | t))
}
function Zt(t) {
    return 0 === (t = t >> 14 & 1023) ? 536870912 : t
}
var Qt = {}
  , te = {};
function ee(t) {
    return !(!t || "object" != typeof t || t.Ia !== te)
}
function ne(t) {
    return null !== t && "object" == typeof t && !Array.isArray(t) && t.constructor === Object
}
let re = !f;
function ie(t, e, n) {
    if (null != t)
        if ("string" == typeof t)
            t = t ? new U(t,I) : D();
        else if (t.constructor !== U)
            if (M(t))
                t = n ? V(t) : t.length ? new U(new Uint8Array(t),I) : D();
            else {
                if (!e)
                    throw Error();
                t = void 0
            }
    return t
}
function se(t, e, n) {
    if (!Array.isArray(t) || t.length)
        return !1;
    const r = Xt(t);
    return !!(1 & r) || !(!e || !(Array.isArray(e) ? e.includes(n) : e.has(n))) && (Yt(t, 1 | r),
    !0)
}
var oe;
const ae = [];
function ce(t) {
    if (2 & t)
        throw Error()
}
Yt(ae, 55),
oe = Object.freeze(ae);
class he {
    constructor(t, e, n) {
        this.l = 0,
        this.g = t,
        this.h = e,
        this.m = n
    }
    next() {
        if (this.l < this.g.length) {
            const t = this.g[this.l++];
            return {
                done: !1,
                value: this.h ? this.h.call(this.m, t) : t
            }
        }
        return {
            done: !0,
            value: void 0
        }
    }
    [Symbol.iterator]() {
        return new he(this.g,this.h,this.m)
    }
}
var ue = {};
let le, fe;
function de(t, e) {
    (e = le ? e[le] : void 0) && (t[le] = Nt(e))
}
function pe(t, e) {
    t.__closure__error__context__984382 || (t.__closure__error__context__984382 = {}),
    t.__closure__error__context__984382.severity = e
}
function ge(t) {
    return pe(t = Error(t), "warning"),
    t
}
function me(t) {
    return null == t ? t : "number" == typeof t || "NaN" === t || "Infinity" === t || "-Infinity" === t ? Number(t) : void 0
}
function ye(t) {
    return null == t ? t : "boolean" == typeof t || "number" == typeof t ? !!t : void 0
}
const ve = /^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;
function _e(t) {
    const e = typeof t;
    return "number" === e ? Number.isFinite(t) : "string" === e && ve.test(t)
}
function we(t) {
    if (null == t)
        return t;
    if ("string" == typeof t) {
        if (!t)
            return;
        t = +t
    }
    return "number" == typeof t ? t : void 0
}
function be(t) {
    if (null == t)
        return t;
    if ("string" == typeof t) {
        if (!t)
            return;
        t = +t
    }
    return "number" == typeof t ? t : void 0
}
function Ee(t) {
    return Math.trunc(t)
}
function Ae(t, e) {
    var n = Math.trunc(Number(t));
    return Number.isSafeInteger(n) ? String(n) : (-1 !== (n = t.indexOf(".")) && (t = t.substring(0, n)),
    e && (it(t),
    t = rt()),
    t)
}
function Te(t) {
    return null == t ? t : _e(t) ? "number" == typeof t ? Ee(t) : Ae(t, !1) : void 0
}
function ke(t) {
    if ("string" != typeof t)
        throw Error();
    return t
}
function Se(t) {
    if (null != t && "string" != typeof t)
        throw Error();
    return t
}
function xe(t) {
    return null == t || "string" == typeof t ? t : void 0
}
function Fe(t, e, n, r) {
    if (null != t && "object" == typeof t && t.P === Qt)
        return t;
    if (!Array.isArray(t))
        return n ? 2 & r ? (t = e[Le]) ? e = t : ($t((t = new e).s),
        e = e[Le] = t) : e = new e : e = void 0,
        e;
    let i = n = Xt(t);
    return 0 === i && (i |= 32 & r),
    i |= 2 & r,
    i !== n && Yt(t, i),
    new e(t)
}
const Le = "function" == typeof Symbol && "symbol" == typeof Symbol() ? Symbol() : "di";
function Me(t) {
    return t
}
function Oe(t, e, n) {
    if (e) {
        var r = !!r;
        if (!_e(e = t))
            throw ge("int64");
        "string" == typeof e ? r = Ae(e, r) : r ? (e = Math.trunc(e),
        !r || Number.isSafeInteger(e) ? r = String(e) : (J(e),
        r = rt())) : r = Ee(e)
    } else
        r = Te(t);
    return "string" == typeof (n = null == (t = r) ? n ? 0 : void 0 : t) && (r = +n,
    Number.isSafeInteger(r)) ? r : n
}
let Pe, Ie, Ce;
function Re(t) {
    switch (typeof t) {
    case "boolean":
        return Ie ||= [0, void 0, !0];
    case "number":
        return 0 < t ? void 0 : 0 === t ? Ce ||= [0, void 0] : [-t, void 0];
    case "string":
        return [0, t];
    case "object":
        return t
    }
}
function De(t, e) {
    return Be(t, e[0], e[1])
}
function Be(t, e, n) {
    if (null == t && (t = Pe),
    Pe = void 0,
    null == t) {
        var r = 96;
        n ? (t = [n],
        r |= 512) : t = [],
        e && (r = -16760833 & r | (1023 & e) << 14)
    } else {
        if (!Array.isArray(t))
            throw Error();
        if (64 & (r = Xt(t)))
            return fe && delete t[fe],
            t;
        if (r |= 64,
        n && (r |= 512,
        n !== t[0]))
            throw Error();
        t: {
            if (n = r,
            r = t.length) {
                const i = r - 1;
                if (ne(t[i])) {
                    if (1024 <= (e = i - (+!!(512 & (n |= 256)) - 1)))
                        throw Error();
                    r = -16760833 & n | (1023 & e) << 14;
                    break t
                }
            }
            if (e) {
                if (1024 < (e = Math.max(e, r - (+!!(512 & n) - 1))))
                    throw Error();
                r = -16760833 & n | (1023 & e) << 14
            } else
                r = n
        }
    }
    return Yt(t, r),
    t
}
let Ue = function() {
    try {
        return new class extends Map {
            constructor() {
                super()
            }
        }
        ,
        !1
    } catch {
        return !0
    }
}();
class Ne {
    constructor() {
        this.g = new Map
    }
    get(t) {
        return this.g.get(t)
    }
    set(t, e) {
        return this.g.set(t, e),
        this.size = this.g.size,
        this
    }
    delete(t) {
        return t = this.g.delete(t),
        this.size = this.g.size,
        t
    }
    clear() {
        this.g.clear(),
        this.size = this.g.size
    }
    has(t) {
        return this.g.has(t)
    }
    entries() {
        return this.g.entries()
    }
    keys() {
        return this.g.keys()
    }
    values() {
        return this.g.values()
    }
    forEach(t, e) {
        return this.g.forEach(t, e)
    }
    [Symbol.iterator]() {
        return this.entries()
    }
}
const Ge = Ue ? (Object.setPrototypeOf(Ne.prototype, Map.prototype),
Object.defineProperties(Ne.prototype, {
    size: {
        value: 0,
        configurable: !0,
        enumerable: !0,
        writable: !0
    }
}),
Ne) : class extends Map {
    constructor() {
        super()
    }
}
;
function je(t) {
    if (2 & t.I)
        throw Error("Cannot mutate an immutable Map")
}
var Ve = class extends Ge {
    constructor(t, e, n=Me, r=Me) {
        super();
        let i = Xt(t);
        i |= 64,
        Yt(t, i),
        this.I = i,
        this.O = e,
        this.J = n || Me,
        this.S = this.O ? ze : r || Me;
        for (let s = 0; s < t.length; s++) {
            const o = t[s]
              , a = n(o[0], !1, !0);
            let c = o[1];
            e ? void 0 === c && (c = null) : c = r(o[1], !1, !0, void 0, void 0, i),
            super.set(a, c)
        }
    }
    ka(t=We) {
        return this.R(t)
    }
    R(t=We) {
        const e = []
          , n = super.entries();
        for (var r; !(r = n.next()).done; )
            (r = r.value)[0] = t(r[0]),
            r[1] = t(r[1]),
            e.push(r);
        return e
    }
    clear() {
        je(this),
        super.clear()
    }
    delete(t) {
        return je(this),
        super.delete(this.J(t, !0, !1))
    }
    entries() {
        var t = this.ha();
        return new he(t,Xe,this)
    }
    keys() {
        return this.Ha()
    }
    values() {
        var t = this.ha();
        return new he(t,Ve.prototype.get,this)
    }
    forEach(t, e) {
        super.forEach(((n,r)=>{
            t.call(e, this.get(r), r, this)
        }
        ))
    }
    set(t, e) {
        return je(this),
        null == (t = this.J(t, !0, !1)) ? this : null == e ? (super.delete(t),
        this) : super.set(t, this.S(e, !0, !0, this.O, !1, this.I))
    }
    Oa(t) {
        const e = this.J(t[0], !1, !0);
        t = t[1],
        t = this.O ? void 0 === t ? null : t : this.S(t, !1, !0, void 0, !1, this.I),
        super.set(e, t)
    }
    has(t) {
        return super.has(this.J(t, !1, !1))
    }
    get(t) {
        t = this.J(t, !1, !1);
        const e = super.get(t);
        if (void 0 !== e) {
            var n = this.O;
            return n ? ((n = this.S(e, !1, !0, n, this.ra, this.I)) !== e && super.set(t, n),
            n) : e
        }
    }
    ha() {
        return Array.from(super.keys())
    }
    Ha() {
        return super.keys()
    }
    [Symbol.iterator]() {
        return this.entries()
    }
}
;
function ze(t, e, n, r, i, s) {
    return t = Fe(t, r, n, s),
    i && (t = Qe(t)),
    t
}
function We(t) {
    return t
}
function Xe(t) {
    return [t, this.get(t)]
}
function He(t, e, n, r, i, s) {
    if (null != t) {
        if (Array.isArray(t))
            t = i && 0 == t.length && 1 & Xt(t) ? void 0 : s && 2 & Xt(t) ? t : Ye(t, e, n, void 0 !== r, i, s);
        else if (ne(t)) {
            const o = {};
            for (let a in t)
                o[a] = He(t[a], e, n, r, i, s);
            t = o
        } else
            t = e(t, r);
        return t
    }
}
function Ye(t, e, n, r, i, s) {
    const o = r || n ? Xt(t) : 0;
    r = r ? !!(32 & o) : void 0;
    const a = Nt(t);
    for (let t = 0; t < a.length; t++)
        a[t] = He(a[t], e, n, r, i, s);
    return n && (de(a, t),
    n(o, a)),
    a
}
function Ke(t) {
    return He(t, $e, void 0, void 0, !1, !1)
}
function $e(t) {
    return t.P === Qt ? t.toJSON() : t instanceof Ve ? t.ka(Ke) : function(t) {
        switch (typeof t) {
        case "number":
            return isFinite(t) ? t : String(t);
        case "boolean":
            return t ? 1 : 0;
        case "object":
            if (t) {
                if (Array.isArray(t))
                    return re || !se(t, void 0, 9999) ? t : void 0;
                if (M(t))
                    return k(t);
                if (t instanceof U) {
                    const e = t.T;
                    return null == e ? "" : "string" == typeof e ? e : t.T = k(e)
                }
                if (t instanceof Ve)
                    return t = t.ka(),
                    X || 0 !== t.length ? t : void 0
            }
        }
        return t
    }(t)
}
function qe(t, e, n=Jt) {
    if (null != t) {
        if (A && t instanceof Uint8Array)
            return e ? t : new Uint8Array(t);
        if (Array.isArray(t)) {
            var r = Xt(t);
            return 2 & r ? t : (e &&= 0 === r || !!(32 & r) && !(64 & r || !(16 & r)),
            e ? (Yt(t, -12293 & (34 | r)),
            t) : Ye(t, qe, 4 & r ? Jt : n, !0, !1, !0))
        }
        return t.P === Qt ? (n = t.s,
        t = 2 & (r = Ht(n)) ? t : Je(t, n, r, !0)) : t instanceof Ve && (n = $t(t.R(qe)),
        t = new Ve(n,t.O,t.J,t.S)),
        t
    }
}
function Je(t, e, n, r) {
    return t = t.constructor,
    Pe = e = Ze(e, n, r),
    e = new t(e),
    Pe = void 0,
    e
}
function Ze(t, e, n) {
    const r = n || 2 & e ? Jt : qt
      , i = !!(32 & e);
    return t = function(t, e, n) {
        const r = Nt(t);
        var i = r.length;
        const s = 256 & e ? r[i - 1] : void 0;
        for (i += s ? -1 : 0,
        e = 512 & e ? 1 : 0; e < i; e++)
            r[e] = n(r[e]);
        if (s) {
            e = r[e] = {};
            for (const t in s)
                e[t] = n(s[t])
        }
        return de(r, t),
        r
    }(t, e, (t=>qe(t, i, r))),
    jt(t, 32 | (n ? 2 : 0)),
    t
}
function Qe(t) {
    const e = t.s
      , n = Ht(e);
    return 2 & n ? Je(t, e, n, !1) : t
}
function tn(t, e) {
    return en(t = t.s, Ht(t), e)
}
function en(t, e, n, r) {
    if (-1 === n)
        return null;
    if (n >= Zt(e)) {
        if (256 & e)
            return t[t.length - 1][n]
    } else {
        var i = t.length;
        if (r && 256 & e && null != (r = t[i - 1][n]))
            return r;
        if ((e = n + (+!!(512 & e) - 1)) < i)
            return t[e]
    }
}
function nn(t, e, n, r) {
    const i = t.s;
    let s = Ht(i);
    return ce(s),
    rn(i, s, e, n, r),
    t
}
function rn(t, e, n, r, i) {
    var s = Zt(e);
    if (n >= s || i) {
        if (i = e,
        256 & e)
            s = t[t.length - 1];
        else {
            if (null == r)
                return i;
            s = t[s + (+!!(512 & e) - 1)] = {},
            i |= 256
        }
        return s[n] = r,
        i !== e && Yt(t, i),
        i
    }
    return t[n + (+!!(512 & e) - 1)] = r,
    256 & e && (n in (t = t[t.length - 1]) && delete t[n]),
    e
}
function sn(t, e, n, r, i) {
    var s = 2 & e;
    let o = en(t, e, n, i);
    Array.isArray(o) || (o = oe);
    const a = !(2 & r);
    r = !(1 & r);
    const c = !!(32 & e);
    let h = Xt(o);
    return 0 !== h || !c || s || a ? 1 & h || (h |= 1,
    Yt(o, h)) : (h |= 33,
    Yt(o, h)),
    s ? (t = !1,
    2 & h || ($t(o),
    t = !!(4 & h)),
    (r || t) && Object.freeze(o)) : (s = !!(2 & h) || !!(2048 & h),
    r && s ? (o = Nt(o),
    r = 1,
    c && !a && (r |= 32),
    Yt(o, r),
    rn(t, e, n, o, i)) : a && 32 & h && !s && zt(o, 32)),
    o
}
function on(t, e) {
    t = t.s;
    let n = Ht(t);
    const r = en(t, n, e)
      , i = me(r);
    return null != i && i !== r && rn(t, n, e, i),
    i
}
function an(t) {
    t = t.s;
    let e = Ht(t);
    const n = en(t, e, 1)
      , r = ie(n, !0, !!(34 & e));
    return null != r && r !== n && rn(t, e, 1, r),
    r
}
function cn(t, e, n) {
    var r = 2;
    t = t.s;
    let i = Ht(t);
    2 & i && (r = 1);
    let s = sn(t, i, e, 1);
    i = Ht(t);
    var o = Xt(s);
    let a = o
      , c = !!(2 & o);
    const h = c && !!(4 & o);
    if (!(4 & o)) {
        Object.isFrozen(s) && (s = Nt(s),
        a = 0,
        c = !!(2 & (o = Tn(o, i, !1))),
        i = rn(t, i, e, s)),
        o = Wt(o, 4, !1),
        o = Wt(o, 4096, !1),
        o = Wt(o, 8192, !1);
        let r = 0
          , h = 0;
        for (; r < s.length; r++) {
            const t = n(s[r]);
            null != t && (s[h++] = t)
        }
        h < r && (s.length = h),
        o = Wt(o, 20, !0)
    }
    return h || ((n = 1 === r) && (o = Wt(o, 2, !0)),
    o !== a && Yt(s, o),
    (n || c) && Object.freeze(s)),
    2 === r && c && (s = Nt(s),
    o = Tn(o, i, !1),
    Yt(s, o),
    rn(t, i, e, s)),
    s
}
let hn;
function un() {
    return hn ??= new Ve($t([]),void 0,void 0,void 0,ue)
}
function ln(t) {
    t = Nt(t);
    for (let e = 0; e < t.length; e++) {
        const n = t[e] = Nt(t[e]);
        Array.isArray(n[1]) && (n[1] = $t(n[1]))
    }
    return t
}
function fn(t, e, n) {
    {
        const o = t.s;
        let a = Ht(o);
        if (ce(a),
        null == n)
            rn(o, a, e);
        else {
            var r = t = Xt(n)
              , i = !!(2 & t) || Object.isFrozen(n)
              , s = !i && !1;
            if (!(4 & t)) {
                t = 21,
                i && (n = Nt(n),
                r = 0,
                t = Tn(t, a, !0)),
                i = !!(4 & t) && !!(4096 & t);
                for (let t = 0; t < n.length; t++)
                    n[t] = ke(n[t])
            }
            s && (t = Wt(t, 2, !0)),
            t !== r && Yt(n, t),
            s && Object.freeze(n),
            rn(o, a, e, n)
        }
    }
}
function dn(t, e, n, r) {
    const i = Ht(t);
    ce(i),
    t = sn(t, i, e, 2),
    r = n(r, !!(4 & (e = Xt(t))) && !!(4096 & e)),
    t.push(r)
}
function pn(t) {
    return t
}
function gn(t, e) {
    return mn(t = t.s, Ht(t), os) === e ? e : -1
}
function mn(t, e, n) {
    let r = 0;
    for (let i = 0; i < n.length; i++) {
        const s = n[i];
        null != en(t, e, s) && (0 !== r && (e = rn(t, e, r)),
        r = s)
    }
    return r
}
function yn(t, e, n, r) {
    let i = Ht(t);
    ce(i);
    const s = en(t, i, n, r);
    let o;
    if (null != s && s.P === Qt)
        return (e = Qe(s)) !== s && rn(t, i, n, e, r),
        e.s;
    if (Array.isArray(s)) {
        const t = Xt(s);
        o = 2 & t ? Ze(s, t, !1) : s,
        o = De(o, e)
    } else
        o = De(void 0, e);
    return o !== s && rn(t, i, n, o, r),
    o
}
function vn(t, e, n, r) {
    t = t.s;
    let i = Ht(t);
    const s = en(t, i, n, r);
    return (e = Fe(s, e, !1, i)) !== s && null != e && rn(t, i, n, e, r),
    e
}
function _n(t, e, n, r=!1) {
    if (null == (e = vn(t, e, n, r)))
        return e;
    t = t.s;
    let i = Ht(t);
    if (!(2 & i)) {
        const s = Qe(e);
        s !== e && rn(t, i, n, e = s, r)
    }
    return e
}
function wn(t, e, n, r, i, s, o) {
    const a = 1 === i;
    i = 2 === i,
    s = !!s;
    var c = !!(2 & e) && i;
    let h = sn(t, e, r, 3);
    e = Ht(t);
    var u = Xt(h)
      , l = !!(2 & u);
    const f = !!(4 & u)
      , d = !!(32 & u);
    let p = l && f || !!(2048 & u);
    if (!f) {
        var g = h
          , m = e;
        const t = !!(2 & u);
        t && (m = Wt(m, 2, !0));
        let r = !t
          , i = !0
          , s = 0
          , o = 0;
        for (; s < g.length; s++) {
            const e = Fe(g[s], n, !1, m);
            if (e instanceof n) {
                if (!t) {
                    const t = !!(2 & Xt(e.s));
                    r &&= !t,
                    i &&= t
                }
                g[o++] = e
            }
        }
        o < s && (g.length = o),
        u = Wt(u, 4, !0),
        u = Wt(u, 16, i),
        u = Wt(u, 8, r),
        Yt(g, u),
        l && !c && (Object.freeze(h),
        p = !0)
    }
    if (n = u,
    c = !!(8 & u) || a && !h.length,
    o && !c) {
        for (p && (h = Nt(h),
        p = !1,
        n = 0,
        u = Tn(u, e, s),
        e = rn(t, e, r, h)),
        o = h,
        c = u,
        l = 0; l < o.length; l++)
            (g = o[l]) !== (u = Qe(g)) && (o[l] = u);
        c = Wt(c, 8, !0),
        u = c = Wt(c, 16, !o.length)
    }
    return p || (a ? u = Wt(u, !h.length || 16 & u && (!f || d) ? 2 : 2048, !0) : s || (u = Wt(u, 32, !1)),
    u !== n && Yt(h, u),
    a && (Object.freeze(h),
    p = !0)),
    i && p && (h = Nt(h),
    u = Tn(u, e, s),
    Yt(h, u),
    rn(t, e, r, h)),
    h
}
function bn(t, e, n) {
    t = t.s;
    const r = Ht(t)
      , i = !!(2 & r);
    return wn(t, r, e, n, i ? 1 : 2, !1, !i)
}
function En(t, e, n, r, i) {
    return null == r && (r = void 0),
    nn(t, n, r, i)
}
function An(t, e, n, r) {
    null == r && (r = void 0),
    t = t.s;
    let i = Ht(t);
    ce(i),
    (n = mn(t, i, n)) && n !== e && null != r && (i = rn(t, i, n)),
    rn(t, i, e, r)
}
function Tn(t, e, n) {
    return t = Wt(t, 2, !!(2 & e)),
    t = Wt(t, 32, !!(32 & e) && n),
    Wt(t, 2048, !1)
}
function kn(t, e, n) {
    t = t.s;
    const r = Ht(t);
    ce(r),
    t = wn(t, r, e, 1, 2),
    e = null != n ? n : new e,
    t.push(e),
    2 & Xt(e.s) ? zt(t, 8) : zt(t, 16)
}
function Sn(t, e) {
    return we(tn(t, e))
}
function xn(t, e) {
    return xe(tn(t, e))
}
function Fn(t) {
    return t ?? 0
}
function Ln(t, e) {
    return Fn(on(t, e))
}
function Mn(t, e, n) {
    if (null != n) {
        if ("boolean" != typeof n)
            throw t = typeof n,
            Error(`Expected boolean but got ${"object" != t ? t : n ? Array.isArray(n) ? "array" : t : "null"}: ${n}`);
        n = !!n
    }
    nn(t, e, n)
}
function On(e, n, r) {
    if (null != r) {
        if ("number" != typeof r)
            throw ge("int32");
        if (!Number.isFinite(r)) {
            const e = Error();
            pe(e, "incident"),
            function(e) {
                t.setTimeout((()=>{
                    throw e
                }
                ), 0)
            }(e)
        }
    }
    nn(e, n, r)
}
function Pn(t, e, n) {
    if (null != n && "number" != typeof n)
        throw Error(`Value of float/double field must be a number, found ${typeof n}: ${n}`);
    nn(t, e, n)
}
function In(t, e, n) {
    e.g ? e.m(t, e.g, e.h, n, !0) : e.m(t, e.h, n, !0)
}
Ve.prototype.toJSON = void 0,
Ve.prototype.Ia = te,
Object.freeze({});
var Cn = class {
    constructor(t, e) {
        this.s = Be(t, e)
    }
    toJSON() {
        return Rn(this, Ye(this.s, $e, void 0, void 0, !1, !1), !0)
    }
    l() {
        var t = no;
        return t.g ? t.l(this, t.g, t.h, !0, 2) : t.l(this, t.h, t.defaultValue, !0)
    }
    clone() {
        const t = this.s;
        return Je(this, t, Ht(t), !1)
    }
    H() {
        return !!(2 & Xt(this.s))
    }
}
;
function Rn(t, e, n) {
    const r = t.constructor.A;
    var i = Ht(n ? t.s : e)
      , s = Zt(i)
      , o = !1;
    if (r && re) {
        if (!n) {
            var a;
            if ((e = Nt(e)).length && ne(a = e[e.length - 1]))
                for (o = 0; o < r.length; o++)
                    if (r[o] >= s) {
                        Object.assign(e[e.length - 1] = {}, a);
                        break
                    }
            o = !0
        }
        var c;
        s = e,
        n = !n,
        t = Zt(a = Ht(t.s)),
        a = +!!(512 & a) - 1;
        for (let e = 0; e < r.length; e++) {
            var h = r[e];
            if (h < t) {
                var u = s[h += a];
                null == u ? s[h] = n ? oe : Kt() : n && u !== oe && Vt(u)
            } else {
                if (!c) {
                    var l = void 0;
                    s.length && ne(l = s[s.length - 1]) ? c = l : s.push(c = {})
                }
                u = c[h],
                null == c[h] ? c[h] = n ? oe : Kt() : n && u !== oe && Vt(u)
            }
        }
    }
    if (!(c = e.length))
        return e;
    let f, d;
    if (ne(l = e[c - 1])) {
        t: {
            var p = l;
            for (var g in s = {},
            n = !1,
            p)
                t = p[g],
                Array.isArray(t) && (a = t,
                (!H && se(t, r, +g) || !X && ee(t) && 0 === t.size) && (t = null),
                t != a && (n = !0)),
                null != t ? s[g] = t : n = !0;
            if (n) {
                for (let t in s) {
                    p = s;
                    break t
                }
                p = null
            }
        }
        p != l && (f = !0),
        c--
    }
    for (i = +!!(512 & i) - 1; 0 < c && (null == (l = e[g = c - 1]) || !H && se(l, r, g - i) || !X && ee(l) && 0 === l.size); c--)
        d = !0;
    return f || d ? (e = o ? e : Array.prototype.slice.call(e, 0, c),
    o && (e.length = c),
    p && e.push(p),
    e) : e
}
function Dn(t) {
    return Array.isArray(t) ? t[0]instanceof Ut ? t : [Rr, t] : [t, void 0]
}
function Bn(t, e) {
    if (Array.isArray(e)) {
        var n = Xt(e);
        if (4 & n)
            return e;
        for (var r = 0, i = 0; r < e.length; r++) {
            const n = t(e[r]);
            null != n && (e[i++] = n)
        }
        return i < r && (e.length = i),
        Yt(e, -12289 & (5 | n)),
        2 & n && Object.freeze(e),
        e
    }
}
Cn.prototype.P = Qt,
Cn.prototype.toString = function() {
    return Rn(this, this.s, !1).toString()
}
;
const Un = Symbol();
function Nn(t) {
    let e = t[Un];
    if (!e) {
        const n = Hn(t)
          , r = ir(t)
          , i = r.g;
        e = i ? (t,e)=>i(t, e, r) : (t,e)=>{
            for (; gt(e) && 4 != e.h; ) {
                var i = e.m
                  , s = r[i];
                if (!s) {
                    var o = r.fa;
                    o && (o = o[i]) && (s = r[i] = Gn(o))
                }
                s && s(e, t, i) || (i = (s = e).l,
                mt(s),
                s.ea ? s = void 0 : (o = s.g.g - i,
                s.g.g = i,
                s = ft(s.g, o)),
                i = t,
                s && (le ||= Symbol(),
                (o = i[le]) ? o.push(s) : i[le] = [s]))
            }
            n === jn || n === Vn || n.Ja || (t[fe ||= Symbol()] = n)
        }
        ,
        t[Un] = e
    }
    return e
}
function Gn(t) {
    const e = (t = Dn(t))[0].g;
    if (t = t[1]) {
        const n = Nn(t)
          , r = ir(t).K;
        return (t,i,s)=>e(t, i, s, r, n)
    }
    return e
}
let jn, Vn;
const zn = Symbol();
function Wn(t, e, n) {
    const r = n[1];
    let i;
    if (r) {
        const n = r[zn];
        i = n ? n.K : Re(r[0]),
        t[e] = n ?? r
    }
    i && i === Ie ? (t.ia || (t.ia = [])).push(e) : n[0] && (t.ja || (t.ja = [])).push(e)
}
function Xn(t, e) {
    return [t.l, !e || 0 < e[0] ? void 0 : e]
}
function Hn(t) {
    var e = t[zn];
    if (e)
        return e;
    if (!(e = Kn(t, t[zn] = {}, Xn, Xn, Wn)).ja && !e.ia) {
        let n = !0;
        for (let t in e) {
            isNaN(t) || (n = !1);
            break
        }
        n ? (e = Re(t[0]) === Ie,
        e = t[zn] = e ? Vn ||= {
            K: Re(!0)
        } : jn ||= {}) : e.Ja = !0
    }
    return e
}
function Yn(t, e, n) {
    t[e] = n
}
function Kn(t, e, n, r, i=Yn) {
    e.K = Re(t[0]);
    let s = 0;
    var o = t[++s];
    o && o.constructor === Object && (e.fa = o,
    "function" == typeof (o = t[++s]) && (e.g = o,
    e.h = t[++s],
    o = t[++s]));
    const a = {};
    for (; Array.isArray(o) && "number" == typeof o[0] && 0 < o[0]; ) {
        for (var c = 0; c < o.length; c++)
            a[o[c]] = o;
        o = t[++s]
    }
    for (c = 1; void 0 !== o; ) {
        let l;
        "number" == typeof o && (c += o,
        o = t[++s]);
        var h = void 0;
        if (o instanceof Ut ? l = o : (l = Dr,
        s--),
        l.la) {
            o = t[++s],
            h = t;
            var u = s;
            "function" == typeof o && (o = o(),
            h[u] = o),
            h = o
        }
        for (u = c + 1,
        "number" == typeof (o = t[++s]) && 0 > o && (u -= o,
        o = t[++s]); c < u; c++) {
            const t = a[c];
            i(e, c, h ? r(l, h, t) : n(l, t))
        }
    }
    return e
}
const $n = Symbol();
function qn(t) {
    let e = t[$n];
    if (!e) {
        const n = tr(t);
        e = (t,e)=>or(t, e, n),
        t[$n] = e
    }
    return e
}
const Jn = Symbol();
function Zn(t) {
    return t.h
}
function Qn(t, e) {
    let n, r;
    const i = t.h;
    return (t,s,o)=>i(t, s, o, r ||= tr(e).K, n ||= qn(e))
}
function tr(t) {
    let e = t[Jn];
    return e || (e = Kn(t, t[Jn] = {}, Zn, Qn),
    er in t && Jn in t && (t.length = 0),
    e)
}
const er = Symbol();
function nr(t, e) {
    const n = t.g;
    return e ? (t,r,i)=>n(t, r, i, e) : n
}
function rr(t, e, n) {
    const r = t.g;
    let i, s;
    return (t,o,a)=>r(t, o, a, s ||= ir(e).K, i ||= Nn(e), n)
}
function ir(t) {
    let e = t[er];
    return e || (Hn(t),
    e = Kn(t, t[er] = {}, nr, rr),
    er in t && Jn in t && (t.length = 0),
    e)
}
function sr(t, e) {
    var n = t[e];
    if (n)
        return n;
    if ((n = t.fa) && (n = n[e])) {
        var r = (n = Dn(n))[0].h;
        if (n = n[1]) {
            const e = qn(n)
              , i = tr(n).K;
            n = (n = t.h) ? n(i, e) : (t,n,s)=>r(t, n, s, i, e)
        } else
            n = r;
        return t[e] = n
    }
}
function or(t, e, n) {
    for (var r = Ht(t), i = +!!(512 & r) - 1, s = t.length, o = 512 & r ? 1 : 0, a = s + (256 & r ? -1 : 0); o < a; o++) {
        const r = t[o];
        if (null == r)
            continue;
        const s = o - i
          , a = sr(n, s);
        a && a(e, r, s)
    }
    if (256 & r) {
        r = t[s - 1];
        for (let t in r)
            i = +t,
            Number.isNaN(i) || null != (s = r[t]) && (a = sr(n, i)) && a(e, s, i)
    }
    if (t = le ? t[le] : void 0)
        for (Pt(e, e.g.end()),
        n = 0; n < t.length; n++)
            Pt(e, B(t[n]) || P())
}
function ar(t, e) {
    return new Ut(t,e,!1,!1)
}
function cr(t, e) {
    return new Ut(t,e,!0,!1)
}
function hr(t, e) {
    return new Ut(t,e,!1,!0)
}
function ur(t, e, n) {
    rn(t, Ht(t), e, n)
}
var lr = hr((function(t, e, n, r, i) {
    return 2 === t.h && (t = yt(t, De([void 0, void 0], r), i),
    ce(r = Ht(e)),
    (i = en(e, r, n))instanceof Ve ? 0 != (2 & i.I) ? ((i = i.R()).push(t),
    rn(e, r, n, i)) : i.Oa(t) : Array.isArray(i) ? (2 & Xt(i) && rn(e, r, n, i = ln(i)),
    i.push(t)) : rn(e, r, n, [t]),
    !0)
}
), (function(t, e, n, r, i) {
    if (e instanceof Ve)
        e.forEach(((e,s)=>{
            Bt(t, n, De([s, e], r), i)
        }
        ));
    else if (Array.isArray(e))
        for (let s = 0; s < e.length; s++) {
            const o = e[s];
            Array.isArray(o) && Bt(t, n, De(o, r), i)
        }
}
));
function fr(t, e, n) {
    t: if (null != e) {
        if (_e(e)) {
            if ("string" == typeof e) {
                e = Ae(e, !1);
                break t
            }
            if ("number" == typeof e) {
                e = Ee(e);
                break t
            }
        }
        e = void 0
    }
    null != e && ("string" == typeof e && kt(e),
    null != e && (It(t, n, 0),
    "number" == typeof e ? (t = t.g,
    J(e),
    Ft(t, $, q)) : (n = kt(e),
    Ft(t.g, n.h, n.g))))
}
function dr(t, e, n) {
    null != (e = we(e)) && null != e && (It(t, n, 0),
    Mt(t.g, e))
}
function pr(t, e, n) {
    null != (e = ye(e)) && (It(t, n, 0),
    t.g.g.push(e ? 1 : 0))
}
function gr(t, e, n) {
    null != (e = xe(e)) && Dt(t, n, h(e))
}
function mr(t, e, n, r, i) {
    Bt(t, n, e instanceof Cn ? e.s : Array.isArray(e) ? De(e, r) : void 0, i)
}
function yr(t, e, n) {
    null != (e = null == e || "string" == typeof e || M(e) || e instanceof U ? e : void 0) && Dt(t, n, z(e).buffer)
}
function vr(t, e, n) {
    return (5 === t.h || 2 === t.h) && (e = sn(e, Ht(e), n, 2, !1),
    2 == t.h ? wt(t, dt.prototype.B, e) : e.push(t.g.B()),
    !0)
}
var _r, wr = ar((function(t, e, n) {
    if (1 !== t.h)
        return !1;
    var r = t.g;
    t = ut(r);
    const i = ut(r);
    r = 2 * (i >> 31) + 1;
    const s = i >>> 20 & 2047;
    return t = 4294967296 * (1048575 & i) + t,
    ur(e, n, 2047 == s ? t ? NaN : 1 / 0 * r : 0 == s ? r * Math.pow(2, -1074) * t : r * Math.pow(2, s - 1075) * (t + 4503599627370496)),
    !0
}
), (function(t, e, n) {
    null != (e = me(e)) && (It(t, n, 1),
    t = t.g,
    (n = K ||= new DataView(new ArrayBuffer(8))).setFloat64(0, +e, !0),
    $ = n.getUint32(0, !0),
    q = n.getUint32(4, !0),
    Ot(t, $),
    Ot(t, q))
}
)), br = ar((function(t, e, n) {
    return 5 === t.h && (ur(e, n, t.g.B()),
    !0)
}
), (function(t, e, n) {
    null != (e = me(e)) && (It(t, n, 5),
    t = t.g,
    Z(e),
    Ot(t, $))
}
)), Er = cr(vr, (function(t, e, n) {
    if (null != (e = Bn(me, e)))
        for (let s = 0; s < e.length; s++) {
            var r = t
              , i = e[s];
            null != i && (It(r, n, 5),
            r = r.g,
            Z(i),
            Ot(r, $))
        }
}
)), Ar = cr(vr, (function(t, e, n) {
    if (null != (e = Bn(me, e)) && e.length) {
        It(t, n, 2),
        Lt(t.g, 4 * e.length);
        for (let r = 0; r < e.length; r++)
            n = t.g,
            Z(e[r]),
            Ot(n, $)
    }
}
)), Tr = ar((function(t, e, n) {
    return 0 === t.h && (ur(e, n, ct(t.g, tt)),
    !0)
}
), fr), kr = ar((function(t, e, n) {
    return 0 === t.h && (ur(e, n, 0 === (t = ct(t.g, tt)) ? void 0 : t),
    !0)
}
), fr), Sr = ar((function(t, e, n) {
    return 0 === t.h && (ur(e, n, ct(t.g, Q)),
    !0)
}
), (function(t, e, n) {
    t: if (null != e) {
        if (_e(e)) {
            if ("string" == typeof e) {
                var r = Math.trunc(Number(e));
                Number.isSafeInteger(r) ? e = String(r) : (-1 !== (r = e.indexOf(".")) && (e = e.substring(0, r)),
                it(e),
                e = et($, q));
                break t
            }
            if ("number" == typeof e) {
                e = Math.trunc(e);
                break t
            }
        }
        e = void 0
    }
    null != e && ("string" == typeof e && Et(e),
    null != e && (It(t, n, 0),
    "number" == typeof e ? (t = t.g,
    J(e),
    Ft(t, $, q)) : (n = Et(e),
    Ft(t.g, n.h, n.g))))
}
)), xr = ar((function(t, e, n) {
    return 0 === t.h && (ur(e, n, t.g.m()),
    !0)
}
), dr), Fr = cr((function(t, e, n) {
    return (0 === t.h || 2 === t.h) && (e = sn(e, Ht(e), n, 2, !1),
    2 == t.h ? wt(t, dt.prototype.m, e) : e.push(t.g.m()),
    !0)
}
), (function(t, e, n) {
    if (null != (e = Bn(we, e)) && e.length) {
        n = Ct(t, n);
        for (let n = 0; n < e.length; n++)
            Mt(t.g, e[n]);
        Rt(t, n)
    }
}
)), Lr = ar((function(t, e, n) {
    return 0 === t.h && (ur(e, n, 0 === (t = t.g.m()) ? void 0 : t),
    !0)
}
), dr), Mr = ar((function(t, e, n) {
    return 0 === t.h && (ur(e, n, ht(t.g)),
    !0)
}
), pr), Or = ar((function(t, e, n) {
    return 0 === t.h && (ur(e, n, !1 === (t = ht(t.g)) ? void 0 : t),
    !0)
}
), pr), Pr = cr((function(t, e, n) {
    return 2 === t.h && (dn(e, n, pn, t = vt(t)),
    !0)
}
), (function(t, e, n) {
    if (null != (e = Bn(xe, e)))
        for (let i = 0; i < e.length; i++) {
            var r = e[i];
            null != r && Dt(t, n, h(r))
        }
}
)), Ir = ar((function(t, e, n) {
    return 2 === t.h && (ur(e, n, "" === (t = vt(t)) ? void 0 : t),
    !0)
}
), gr), Cr = ar((function(t, e, n) {
    return 2 === t.h && (ur(e, n, vt(t)),
    !0)
}
), gr), Rr = hr((function(t, e, n, r, i) {
    return 2 === t.h && (yt(t, yn(e, r, n, !0), i),
    !0)
}
), mr), Dr = hr((function(t, e, n, r, i) {
    return 2 === t.h && (yt(t, yn(e, r, n), i),
    !0)
}
), mr);
_r = new Ut((function(t, e, n, r, i) {
    if (2 !== t.h)
        return !1;
    r = De(void 0, r);
    let s = Ht(e);
    ce(s);
    let o = sn(e, s, n, 3);
    return s = Ht(e),
    4 & Xt(o) && (o = Nt(o),
    Yt(o, -2079 & (1 | Xt(o))),
    rn(e, s, n, o)),
    o.push(r),
    yt(t, r, i),
    !0
}
),(function(t, e, n, r, i) {
    if (Array.isArray(e))
        for (let s = 0; s < e.length; s++)
            mr(t, e[s], n, r, i)
}
),!0,!0);
var Br = hr((function(t, e, n, r, i, s) {
    if (2 !== t.h)
        return !1;
    let o = Ht(e);
    return ce(o),
    (s = mn(e, o, s)) && n !== s && rn(e, o, s),
    yt(t, e = yn(e, r, n), i),
    !0
}
), mr)
  , Ur = ar((function(t, e, n) {
    return 2 === t.h && (ur(e, n, _t(t)),
    !0)
}
), yr)
  , Nr = cr((function(t, e, n) {
    return (0 === t.h || 2 === t.h) && (e = sn(e, Ht(e), n, 2, !1),
    2 == t.h ? wt(t, dt.prototype.j, e) : e.push(t.g.j()),
    !0)
}
), (function(t, e, n) {
    if (null != (e = Bn(be, e)))
        for (let s = 0; s < e.length; s++) {
            var r = t
              , i = e[s];
            null != i && (It(r, n, 0),
            Lt(r.g, i))
        }
}
))
  , Gr = ar((function(t, e, n) {
    return 0 === t.h && (ur(e, n, t.g.m()),
    !0)
}
), (function(t, e, n) {
    null != (e = we(e)) && (e = parseInt(e, 10),
    It(t, n, 0),
    Mt(t.g, e))
}
))
  , jr = cr((function(t, e, n) {
    return (0 === t.h || 2 === t.h) && (e = sn(e, Ht(e), n, 2, !1),
    2 == t.h ? wt(t, dt.prototype.C, e) : e.push(t.g.m()),
    !0)
}
), (function(t, e, n) {
    if (null != (e = Bn(we, e)) && e.length) {
        n = Ct(t, n);
        for (let n = 0; n < e.length; n++)
            Mt(t.g, e[n]);
        Rt(t, n)
    }
}
));
class Vr {
    constructor(t, e) {
        this.h = t,
        this.g = e,
        this.l = _n,
        this.m = En,
        this.defaultValue = void 0
    }
}
function zr(t, e) {
    return new Vr(t,e)
}
function Wr(t, e) {
    return (n,r)=>{
        t: {
            if (bt.length) {
                const t = bt.pop();
                t.o(r),
                ot(t.g, n, r),
                n = t
            } else
                n = new class {
                    constructor(t, e) {
                        if (pt.length) {
                            const n = pt.pop();
                            ot(n, t, e),
                            t = n
                        } else
                            t = new dt(t,e);
                        this.g = t,
                        this.l = this.g.g,
                        this.h = this.m = -1,
                        this.o(e)
                    }
                    o({ea: t=!1}={}) {
                        this.ea = t
                    }
                }
                (n,r);
            try {
                const r = new t
                  , s = r.s;
                Nn(e)(s, n),
                fe && delete s[fe];
                var i = r;
                break t
            } finally {
                n.g.clear(),
                n.m = -1,
                n.h = -1,
                100 > bt.length && bt.push(n)
            }
            i = void 0
        }
        return i
    }
}
function Xr(t) {
    return function() {
        const e = new class {
            constructor() {
                this.l = [],
                this.h = 0,
                this.g = new class {
                    constructor() {
                        this.g = []
                    }
                    length() {
                        return this.g.length
                    }
                    end() {
                        const t = this.g;
                        return this.g = [],
                        t
                    }
                }
            }
        }
        ;
        or(this.s, e, tr(t)),
        Pt(e, e.g.end());
        const n = new Uint8Array(e.h)
          , r = e.l
          , i = r.length;
        let s = 0;
        for (let t = 0; t < i; t++) {
            const e = r[t];
            n.set(e, s),
            s += e.length
        }
        return e.l = [n],
        n
    }
}
var Hr = [0, Ir, ar((function(t, e, n) {
    return 2 === t.h && (ur(e, n, (t = _t(t)) === D() ? void 0 : t),
    !0)
}
), (function(t, e, n) {
    if (null != e) {
        if (e instanceof Cn) {
            const r = e.Qa;
            return void (r && (e = r(e),
            null != e && Dt(t, n, z(e).buffer)))
        }
        if (Array.isArray(e))
            return
    }
    yr(t, e, n)
}
))]
  , Yr = [0, Cr]
  , Kr = [0, xr, Gr, Mr, -1, Fr, Gr, -1]
  , $r = [0, Mr, -1]
  , qr = class extends Cn {
    constructor() {
        super()
    }
}
;
qr.A = [6];
var Jr = [0, Mr, Cr, Mr, Gr, -1, jr, Cr, -1, $r, Gr]
  , Zr = [0, Cr, -2]
  , Qr = class extends Cn {
    constructor() {
        super()
    }
}
  , ti = [0]
  , ei = [0, xr, Mr, -2]
  , ni = class extends Cn {
    constructor(t) {
        super(t, 2)
    }
}
  , ri = {}
  , ii = [-2, ri, Mr];
ri[336783863] = [0, Cr, Mr, -1, xr, [0, [1, 2, 3, 4, 5], Br, ti, Br, Jr, Br, Zr, Br, ei, Br, Kr], Yr];
var si = [0, Ir, Or]
  , oi = [0, kr, -1, Or, -3, kr, Fr, Ir, Lr, kr, -1, Or, Lr, Or, -2, Ir]
  , ai = [-1, {}]
  , ci = [0, Cr, 1, ai]
  , hi = [0, Cr, Pr, ai];
function ui(t, e) {
    e = Se(e),
    t = t.s;
    let n = Ht(t);
    ce(n),
    rn(t, n, 2, "" === e ? void 0 : e)
}
function li(t, e) {
    dn(t.s, 3, ke, e)
}
function fi(t, e) {
    dn(t.s, 4, ke, e)
}
var di = class extends Cn {
    constructor(t) {
        super(t, 500)
    }
    o(t) {
        return En(this, 0, 7, t)
    }
}
;
di.A = [3, 4, 5, 6, 8, 13, 17, 1005];
var pi = [-500, Ir, -1, Pr, -3, ii, _r, Hr, Lr, -1, ci, hi, _r, si, Ir, oi, Lr, Pr, 987, Pr]
  , gi = [0, Ir, -1, ai]
  , mi = [-500, Cr, -1, [-1, {}], 998, Cr]
  , yi = [-500, Cr, Pr, -1, [-2, {}, Mr], 997, Pr, -1]
  , vi = [-500, Cr, Pr, ai, 998, Pr];
function _i(t, e) {
    kn(t, di, e)
}
function wi(t, e) {
    dn(t.s, 10, ke, e)
}
function bi(t, e) {
    dn(t.s, 15, ke, e)
}
var Ei = class extends Cn {
    constructor(t) {
        super(t, 500)
    }
    o(t) {
        return En(this, 0, 1001, t)
    }
}
;
Ei.A = [1, 6, 7, 9, 10, 15, 16, 17, 14, 1002];
var Ai = [-500, _r, pi, 4, _r, mi, _r, yi, Lr, _r, vi, Pr, Lr, ci, hi, _r, gi, Pr, -2, oi, Ir, -1, Or, 979, ai, _r, Hr]
  , Ti = Wr(Ei, Ai);
Ei.prototype.g = Xr(Ai);
var ki = [0, _r, [0, xr, -2]]
  , Si = class extends Cn {
    constructor(t) {
        super(t)
    }
}
  , xi = [0, xr, br, Cr, -1]
  , Fi = class extends Cn {
    constructor(t) {
        super(t)
    }
    g() {
        return bn(this, Si, 1)
    }
}
;
Fi.A = [1];
var Li = [0, _r, xi]
  , Mi = Wr(Fi, Li)
  , Oi = [0, xr, br]
  , Pi = [0, xr, -1, ki]
  , Ii = class extends Cn {
    constructor(t) {
        super(t)
    }
}
  , Ci = [0, xr, -3]
  , Ri = [0, br, -3]
  , Di = class extends Cn {
    constructor(t) {
        super(t)
    }
}
  , Bi = [0, br, -1, Cr, br]
  , Ui = class extends Cn {
    constructor(t) {
        super(t)
    }
    h() {
        return _n(this, Ii, 2)
    }
    g() {
        return bn(this, Di, 5)
    }
}
;
Ui.A = [5];
var Ni = [0, Gr, Ci, Ri, Pi, _r, Bi]
  , Gi = class extends Cn {
    constructor(t) {
        super(t)
    }
}
;
Gi.A = [1, 2, 3, 8, 9];
var ji = Wr(Gi, [0, Pr, Fr, Ar, Ni, Cr, -1, Tr, _r, Oi, Pr, Tr])
  , Vi = class extends Cn {
    constructor(t) {
        super(t)
    }
}
  , zi = [0, br, -4]
  , Wi = class extends Cn {
    constructor(t) {
        super(t)
    }
}
;
Wi.A = [1];
var Xi = Wr(Wi, [0, _r, zi])
  , Hi = class extends Cn {
    constructor(t) {
        super(t)
    }
}
  , Yi = [0, br, -4]
  , Ki = class extends Cn {
    constructor(t) {
        super(t)
    }
}
;
Ki.A = [1];
var $i = Wr(Ki, [0, _r, Yi])
  , qi = class extends Cn {
    constructor(t) {
        super(t)
    }
}
;
qi.A = [3];
var Ji = [0, xr, -1, Ar, Gr]
  , Zi = class extends Cn {
    constructor() {
        super()
    }
}
;
Zi.prototype.g = Xr([0, br, -4, Tr]);
var Qi = class extends Cn {
    constructor(t) {
        super(t)
    }
}
  , ts = [0, 1, xr, Cr, Li]
  , es = class extends Cn {
    constructor(t) {
        super(t)
    }
}
;
es.A = [1];
var ns = Wr(es, [0, _r, ts, Tr])
  , rs = class extends Cn {
    constructor(t) {
        super(t)
    }
}
;
rs.A = [1];
var is = class extends Cn {
    constructor(t) {
        super(t)
    }
    oa() {
        const t = an(this);
        return null == t ? D() : t
    }
}
  , ss = class extends Cn {
    constructor(t) {
        super(t)
    }
}
  , os = [1, 2]
  , as = [0, os, Br, [0, Ar], Br, [0, Ur], xr, Cr]
  , cs = class extends Cn {
    constructor(t) {
        super(t)
    }
}
;
cs.A = [1];
var hs = Wr(cs, [0, _r, as, Tr])
  , us = class extends Cn {
    constructor(t) {
        super(t)
    }
}
;
us.A = [4, 5];
var ls = [0, Cr, xr, br, Pr, -1]
  , fs = class extends Cn {
    constructor(t) {
        super(t)
    }
}
  , ds = [0, Mr, -1]
  , ps = class extends Cn {
    constructor(t) {
        super(t)
    }
}
  , gs = [1, 2, 3, 4, 5]
  , ms = class extends Cn {
    constructor(t) {
        super(t)
    }
    g() {
        return null != an(this)
    }
    h() {
        return null != xn(this, 2)
    }
}
  , ys = [0, Ur, Cr, [0, xr, Tr, -1], [0, Sr, Tr]]
  , vs = class extends Cn {
    constructor(t) {
        super(t)
    }
    g() {
        return ye(tn(this, 2)) ?? !1
    }
}
  , _s = [0, ys, Mr, [0, gs, Br, ei, Br, Jr, Br, Kr, Br, ti, Br, Zr], Gr]
  , ws = class extends Cn {
    constructor(t) {
        super(t)
    }
}
  , bs = [0, _s, br, -1, xr]
  , Es = zr(502141897, ws);
ri[502141897] = bs;
var As = [0, ys];
ri[512499200] = As;
var Ts = [0, As];
ri[515723506] = Ts;
var ks = Wr(class extends Cn {
    constructor(t) {
        super(t)
    }
}
, [0, [0, Gr, -1, Er, Nr], Ji])
  , Ss = [0, _s];
ri[508981768] = Ss;
var xs = class extends Cn {
    constructor(t) {
        super(t)
    }
}
  , Fs = [0, _s, br, Ss, Mr]
  , Ls = class extends Cn {
    constructor(t) {
        super(t)
    }
}
  , Ms = [0, _s, bs, Fs, br, Ts];
ri[508968149] = Fs;
var Os = zr(508968150, Ls);
ri[508968150] = Ms;
var Ps = class extends Cn {
    constructor(t) {
        super(t)
    }
}
  , Is = zr(513916220, Ps);
ri[513916220] = [0, _s, Ms, xr];
var Cs = class extends Cn {
    constructor(t) {
        super(t)
    }
    h() {
        return _n(this, us, 2)
    }
    g() {
        nn(this, 2)
    }
}
  , Rs = [0, _s, ls];
ri[478825465] = Rs;
var Ds = [0, _s];
ri[478825422] = Ds;
var Bs = class extends Cn {
    constructor(t) {
        super(t)
    }
}
  , Us = [0, _s, Ds, Rs, -1]
  , Ns = class extends Cn {
    constructor(t) {
        super(t)
    }
}
  , Gs = [0, _s, br, xr]
  , js = class extends Cn {
    constructor(t) {
        super(t)
    }
}
  , Vs = [0, _s, br]
  , zs = class extends Cn {
    constructor(t) {
        super(t)
    }
}
  , Ws = [0, _s, Gs, Vs, br]
  , Xs = class extends Cn {
    constructor(t) {
        super(t)
    }
}
  , Hs = [0, _s, Ws, Us];
ri[463370452] = Us,
ri[464864288] = Gs,
ri[474472470] = Vs;
var Ys = zr(462713202, zs);
ri[462713202] = Ws;
var Ks = zr(479097054, Xs);
ri[479097054] = Hs;
var $s = class extends Cn {
    constructor(t) {
        super(t)
    }
}
  , qs = zr(456383383, $s);
ri[456383383] = [0, _s, ls];
var Js = class extends Cn {
    constructor(t) {
        super(t)
    }
}
  , Zs = zr(476348187, Js);
ri[476348187] = [0, _s, ds];
var Qs = class extends Cn {
    constructor(t) {
        super(t)
    }
}
  , to = [0, Gr, -1]
  , eo = class extends Cn {
    constructor(t) {
        super(t)
    }
}
;
eo.A = [3];
var no = zr(458105876, class extends Cn {
    constructor(t) {
        super(t)
    }
    g() {
        var t = this.s;
        const e = Ht(t);
        var n = 2 & e;
        return t = function(t, e, n) {
            var r = eo;
            const i = 2 & e;
            let s = !1;
            if (null == n) {
                if (i)
                    return un();
                n = []
            } else if (n.constructor === Ve) {
                if (0 == (2 & n.I) || i)
                    return n;
                n = n.R()
            } else
                Array.isArray(n) ? s = !!(2 & Xt(n)) : n = [];
            if (i) {
                if (!n.length)
                    return un();
                s || (s = !0,
                $t(n))
            } else
                s && (s = !1,
                n = ln(n));
            return s || (64 & Xt(n) ? zt(n, 32) : 32 & e && jt(n, 32)),
            rn(t, e, 2, r = new Ve(n,r,Oe,void 0), !1),
            r
        }(t, e, en(t, e, 2)),
        null == t || !n && eo && (t.ra = !0),
        n = t
    }
}
);
ri[458105876] = [0, to, lr, [!0, Tr, [0, Cr, -1, Pr]]];
var ro = class extends Cn {
    constructor(t) {
        super(t)
    }
}
  , io = zr(458105758, ro);
ri[458105758] = [0, _s, Cr, to];
var so = class extends Cn {
    constructor(t) {
        super(t)
    }
}
;
so.A = [5, 6];
var oo = zr(443442058, so);
ri[443442058] = [0, _s, Cr, xr, br, Pr, -1];
var ao = class extends Cn {
    constructor(t) {
        super(t)
    }
}
  , co = [0, _s, br, -1, xr];
ri[514774813] = co;
var ho = class extends Cn {
    constructor(t) {
        super(t)
    }
}
  , uo = [0, _s, br, Mr]
  , lo = class extends Cn {
    constructor(t) {
        super(t)
    }
}
  , fo = [0, _s, co, uo, br];
ri[518928384] = uo;
var po = zr(516587230, lo);
function go(t, e) {
    return e = e ? e.clone() : new us,
    void 0 !== t.displayNamesLocale ? nn(e, 1, Se(t.displayNamesLocale)) : void 0 === t.displayNamesLocale && nn(e, 1),
    void 0 !== t.maxResults ? On(e, 2, t.maxResults) : "maxResults"in t && nn(e, 2),
    void 0 !== t.scoreThreshold ? Pn(e, 3, t.scoreThreshold) : "scoreThreshold"in t && nn(e, 3),
    void 0 !== t.categoryAllowlist ? fn(e, 4, t.categoryAllowlist) : "categoryAllowlist"in t && nn(e, 4),
    void 0 !== t.categoryDenylist ? fn(e, 5, t.categoryDenylist) : "categoryDenylist"in t && nn(e, 5),
    e
}
function mo(t, e=-1, n="") {
    return {
        categories: t.map((t=>({
            index: Fn(Sn(t, 1)) ?? -1,
            score: Ln(t, 2) ?? 0,
            categoryName: xn(t, 3) ?? "" ?? "",
            displayName: xn(t, 4) ?? "" ?? ""
        }))),
        headIndex: e,
        headName: n
    }
}
function yo(t) {
    var e = cn(t, 3, me)
      , n = cn(t, 2, we);
    const r = cn(t, 1, xe)
      , i = cn(t, 9, xe)
      , s = {
        categories: [],
        keypoints: []
    };
    for (let t = 0; t < e.length; t++)
        s.categories.push({
            score: e[t],
            index: n[t] ?? -1,
            categoryName: r[t] ?? "",
            displayName: i[t] ?? ""
        });
    if ((e = _n(t, Ui, 4)?.h()) && (s.boundingBox = {
        originX: Sn(e, 1) ?? 0,
        originY: Sn(e, 2) ?? 0,
        width: Sn(e, 3) ?? 0,
        height: Sn(e, 4) ?? 0,
        angle: 0
    }),
    _n(t, Ui, 4)?.g().length)
        for (const e of _n(t, Ui, 4).g())
            s.keypoints.push({
                x: on(e, 1) ?? 0,
                y: on(e, 2) ?? 0,
                score: on(e, 4) ?? 0,
                label: xn(e, 3) ?? ""
            });
    return s
}
function vo(t) {
    const e = [];
    for (const n of bn(t, Hi, 1))
        e.push({
            x: Ln(n, 1) ?? 0,
            y: Ln(n, 2) ?? 0,
            z: Ln(n, 3) ?? 0
        });
    return e
}
function _o(t) {
    const e = [];
    for (const n of bn(t, Vi, 1))
        e.push({
            x: Ln(n, 1) ?? 0,
            y: Ln(n, 2) ?? 0,
            z: Ln(n, 3) ?? 0
        });
    return e
}
function wo(t) {
    return Array.from(t, (t=>127 < t ? t - 256 : t))
}
function bo(t, e) {
    if (t.length !== e.length)
        throw Error(`Cannot compute cosine similarity between embeddings of different sizes (${t.length} vs. ${e.length}).`);
    let n = 0
      , r = 0
      , i = 0;
    for (let s = 0; s < t.length; s++)
        n += t[s] * e[s],
        r += t[s] * t[s],
        i += e[s] * e[s];
    if (0 >= r || 0 >= i)
        throw Error("Cannot compute cosine similarity on embedding with 0 norm.");
    return n / Math.sqrt(r * i)
}
let Eo;
ri[516587230] = fo;
const Ao = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10, 1, 8, 0, 65, 0, 253, 15, 253, 98, 11]);
async function To() {
    if (void 0 === Eo)
        try {
            await WebAssembly.instantiate(Ao),
            Eo = !0
        } catch {
            Eo = !1
        }
    return Eo
}
async function ko(t, e="") {
    const n = await To() ? "wasm_internal" : "wasm_nosimd_internal";
    return {
        wasmLoaderPath: `${e}/${t}_ ${n}.js`,
        wasmBinaryPath: `${e}/${t}_ ${n}.wasm`
    }
}
var So = class {
}
;
function xo() {
    const t = navigator.userAgent;
    return t.includes("Safari") && !t.includes("Chrome")
}
async function Fo(t) {
    if ("function" != typeof importScripts) {
        const e = document.createElement("script");
        return e.src = t.toString(),
        e.crossOrigin = "anonymous",
        new Promise(((t,n)=>{
            e.addEventListener("load", (()=>{
                t()
            }
            ), !1),
            e.addEventListener("error", (t=>{
                n(t)
            }
            ), !1),
            document.body.appendChild(e)
        }
        ))
    }
    importScripts(t.toString())
}
function Lo(t, e, n) {
    t.m || console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target"),
    n(e = t.i.stringToNewUTF8(e)),
    t.i._free(e)
}
function Mo(t, e, n) {
    if (!t.i.canvas)
        throw Error("No OpenGL canvas configured.");
    if (n ? t.i._bindTextureToStream(n) : t.i._bindTextureToCanvas(),
    !(n = t.i.canvas.getContext("webgl2") || t.i.canvas.getContext("webgl")))
        throw Error("Failed to obtain WebGL context from the provided canvas. `getContext()` should only be invoked with `webgl` or `webgl2`.");
    return t.i.gpuOriginForWebTexturesIsBottomLeft && n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL, !0),
    n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, n.RGBA, n.UNSIGNED_BYTE, e),
    t.i.gpuOriginForWebTexturesIsBottomLeft && n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL, !1),
    e.videoWidth ? (n = e.videoWidth,
    e = e.videoHeight) : e.naturalWidth ? (n = e.naturalWidth,
    e = e.naturalHeight) : (n = e.width,
    e = e.height),
    !t.l || n === t.i.canvas.width && e === t.i.canvas.height || (t.i.canvas.width = n,
    t.i.canvas.height = e),
    [n, e]
}
function Oo(t, e, n) {
    t.m || console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target");
    const r = new Uint32Array(e.length);
    for (let n = 0; n < e.length; n++)
        r[n] = t.i.stringToNewUTF8(e[n]);
    e = t.i._malloc(4 * r.length),
    t.i.HEAPU32.set(r, e >> 2),
    n(e);
    for (const e of r)
        t.i._free(e);
    t.i._free(e)
}
function Po(t, e, n) {
    t.i.simpleListeners = t.i.simpleListeners || {},
    t.i.simpleListeners[e] = n
}
function Io(t, e, n) {
    let r = [];
    t.i.simpleListeners = t.i.simpleListeners || {},
    t.i.simpleListeners[e] = (t,e,i)=>{
        e ? (n(r, i),
        r = []) : r.push(t)
    }
}
So.forVisionTasks = function(t) {
    return ko("vision", t)
}
,
So.forTextTasks = function(t) {
    return ko("text", t)
}
,
So.forAudioTasks = function(t) {
    return ko("audio", t)
}
,
So.isSimdSupported = function() {
    return To()
}
;
async function Co(t, e, n, r) {
    return t = await (async(t,e,n,r,i)=>{
        if (e && await Fo(e),
        !self.ModuleFactory)
            throw Error("ModuleFactory not set.");
        if (n && (await Fo(n),
        !self.ModuleFactory))
            throw Error("ModuleFactory not set.");
        return self.Module && i && ((e = self.Module).locateFile = i.locateFile,
        i.mainScriptUrlOrBlob && (e.mainScriptUrlOrBlob = i.mainScriptUrlOrBlob)),
        i = await self.ModuleFactory(self.Module || i),
        self.ModuleFactory = self.Module = void 0,
        new t(i,r)
    }
    )(t, n.wasmLoaderPath, n.assetLoaderPath, e, {
        locateFile: t=>t.endsWith(".wasm") ? n.wasmBinaryPath.toString() : n.assetBinaryPath && t.endsWith(".data") ? n.assetBinaryPath.toString() : t
    }),
    await t.o(r),
    t
}
function Ro(t, e) {
    const n = _n(t.baseOptions, ms, 1) || new ms;
    "string" == typeof e ? (nn(n, 2, Se(e)),
    nn(n, 1)) : e instanceof Uint8Array && (nn(n, 1, ie(e, !1, !1)),
    nn(n, 2)),
    En(t.baseOptions, 0, 1, n)
}
function Do(t) {
    try {
        const e = t.L.length;
        if (1 === e)
            throw Error(t.L[0].message);
        if (1 < e)
            throw Error("Encountered multiple errors: " + t.L.map((t=>t.message)).join(", "))
    } finally {
        t.L = []
    }
}
function Bo(t, e) {
    t.N = Math.max(t.N, e)
}
function Uo(t, e) {
    t.B = new di,
    ui(t.B, "PassThroughCalculator"),
    li(t.B, "free_memory"),
    fi(t.B, "free_memory_unused_out"),
    wi(e, "free_memory"),
    _i(e, t.B)
}
function No(t, e) {
    li(t.B, e),
    fi(t.B, e + "_unused_out")
}
function Go(t) {
    t.g.addBoolToStream(!0, "free_memory", t.N)
}
var jo = class {
    constructor(t) {
        this.g = t,
        this.L = [],
        this.N = 0,
        this.g.setAutoRenderToScreen(!1)
    }
    l(t, e=!0) {
        if (e) {
            const e = t.baseOptions || {};
            if (t.baseOptions?.modelAssetBuffer && t.baseOptions?.modelAssetPath)
                throw Error("Cannot set both baseOptions.modelAssetPath and baseOptions.modelAssetBuffer");
            if (!(_n(this.baseOptions, ms, 1)?.g() || _n(this.baseOptions, ms, 1)?.h() || t.baseOptions?.modelAssetBuffer || t.baseOptions?.modelAssetPath))
                throw Error("Either baseOptions.modelAssetPath or baseOptions.modelAssetBuffer must be set");
            if (function(t, e) {
                let n = _n(t.baseOptions, ps, 3);
                if (!n) {
                    var r = n = new ps
                      , i = new Qr;
                    An(r, 4, gs, i)
                }
                "delegate"in e && ("GPU" === e.delegate ? (e = n,
                r = new qr,
                An(e, 2, gs, r)) : (e = n,
                r = new Qr,
                An(e, 4, gs, r))),
                En(t.baseOptions, 0, 3, n)
            }(this, e),
            e.modelAssetPath)
                return fetch(e.modelAssetPath.toString()).then((t=>{
                    if (t.ok)
                        return t.arrayBuffer();
                    throw Error(`Failed to fetch model: ${e.modelAssetPath} (${t.status})`)
                }
                )).then((t=>{
                    try {
                        this.g.i.FS_unlink("/model.dat")
                    } catch {}
                    this.g.i.FS_createDataFile("/", "model.dat", new Uint8Array(t), !0, !1, !1),
                    Ro(this, "/model.dat"),
                    this.m(),
                    this.V()
                }
                ));
            Ro(this, e.modelAssetBuffer)
        }
        return this.m(),
        this.V(),
        Promise.resolve()
    }
    V() {}
    aa() {
        let t;
        if (this.g.aa((e=>{
            t = Ti(e)
        }
        )),
        !t)
            throw Error("Failed to retrieve CalculatorGraphConfig");
        return t
    }
    setGraph(t, e) {
        this.g.attachErrorListener(((t,e)=>{
            this.L.push(Error(e))
        }
        )),
        this.g.Ma(),
        this.g.setGraph(t, e),
        this.B = void 0,
        Do(this)
    }
    finishProcessing() {
        this.g.finishProcessing(),
        Do(this)
    }
    close() {
        this.B = void 0,
        this.g.closeGraph()
    }
}
;
function Vo(t, e) {
    if (null === t)
        throw Error(`Unable to obtain required WebGL resource: ${e}`);
    return t
}
jo.prototype.close = jo.prototype.close;
class zo {
    constructor(t, e, n, r) {
        this.g = t,
        this.h = e,
        this.m = n,
        this.l = r
    }
    bind() {
        this.g.bindVertexArray(this.h)
    }
    close() {
        this.g.deleteVertexArray(this.h),
        this.g.deleteBuffer(this.m),
        this.g.deleteBuffer(this.l)
    }
}
function Wo(t, e, n) {
    const r = t.h;
    if (n = Vo(r.createShader(n), "Failed to create WebGL shader"),
    r.shaderSource(n, e),
    r.compileShader(n),
    !r.getShaderParameter(n, r.COMPILE_STATUS))
        throw Error(`Could not compile WebGL shader: ${r.getShaderInfoLog(n)}`);
    return r.attachShader(t.g, n),
    n
}
function Xo(t, e) {
    const n = t.h
      , r = Vo(n.createVertexArray(), "Failed to create vertex array");
    n.bindVertexArray(r);
    const i = Vo(n.createBuffer(), "Failed to create buffer");
    n.bindBuffer(n.ARRAY_BUFFER, i),
    n.enableVertexAttribArray(t.u),
    n.vertexAttribPointer(t.u, 2, n.FLOAT, !1, 0, 0),
    n.bufferData(n.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), n.STATIC_DRAW);
    const s = Vo(n.createBuffer(), "Failed to create buffer");
    return n.bindBuffer(n.ARRAY_BUFFER, s),
    n.enableVertexAttribArray(t.B),
    n.vertexAttribPointer(t.B, 2, n.FLOAT, !1, 0, 0),
    n.bufferData(n.ARRAY_BUFFER, new Float32Array(e ? [0, 1, 0, 0, 1, 0, 1, 1] : [0, 0, 0, 1, 1, 1, 1, 0]), n.STATIC_DRAW),
    n.bindBuffer(n.ARRAY_BUFFER, null),
    n.bindVertexArray(null),
    new zo(n,r,i,s)
}
function Ho(t, e) {
    if (t.h) {
        if (e !== t.h)
            throw Error("Cannot change GL context once initialized")
    } else
        t.h = e
}
function Yo(t, e, n, r) {
    if (Ho(t, e),
    !t.g) {
        const e = t.h;
        if (t.g = Vo(e.createProgram(), "Failed to create WebGL program"),
        t.C = Wo(t, "\n  attribute vec2 aVertex;\n  attribute vec2 aTex;\n  varying vec2 vTex;\n  void main(void) {\n    gl_Position = vec4(aVertex, 0.0, 1.0);\n    vTex = aTex;\n  }", e.VERTEX_SHADER),
        t.v = Wo(t, "\n  precision mediump float;\n  varying vec2 vTex;\n  uniform sampler2D inputTexture;\n  void main() {\n    gl_FragColor = texture2D(inputTexture, vTex);\n  }\n ", e.FRAGMENT_SHADER),
        e.linkProgram(t.g),
        !e.getProgramParameter(t.g, e.LINK_STATUS))
            throw Error(`Error during program linking: ${e.getProgramInfoLog(t.g)}`);
        t.u = e.getAttribLocation(t.g, "aVertex"),
        t.B = e.getAttribLocation(t.g, "aTex")
    }
    return n ? (t.m || (t.m = Xo(t, !0)),
    n = t.m) : (t.j || (t.j = Xo(t, !1)),
    n = t.j),
    e.useProgram(t.g),
    n.bind(),
    t = r(),
    n.g.bindVertexArray(null),
    t
}
function Ko(t, e, n) {
    Ho(t, e),
    t.l || (t.l = Vo(e.createFramebuffer(), "Failed to create framebuffe.")),
    e.bindFramebuffer(e.FRAMEBUFFER, t.l),
    e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, n, 0)
}
function $o(t) {
    t.h?.bindFramebuffer(t.h.FRAMEBUFFER, null)
}
var qo = class {
    close() {
        if (this.g) {
            const t = this.h;
            t.deleteProgram(this.g),
            t.deleteShader(this.C),
            t.deleteShader(this.v)
        }
        this.l && this.h.deleteFramebuffer(this.l),
        this.j && this.j.close(),
        this.m && this.m.close()
    }
}
;
function Jo(t, e) {
    switch (e) {
    case 0:
        return t.g.find((t=>t instanceof Uint8Array));
    case 1:
        return t.g.find((t=>t instanceof Float32Array));
    case 2:
        return t.g.find((t=>"undefined" != typeof WebGLTexture && t instanceof WebGLTexture));
    default:
        throw Error(`Type is not supported: ${e}`)
    }
}
function Zo(t) {
    var e = Jo(t, 1);
    if (!e) {
        if (e = Jo(t, 0))
            e = new Float32Array(e).map((t=>t / 255));
        else {
            e = new Float32Array(t.width * t.height);
            const r = ta(t);
            var n = na(t);
            if (Ko(n, r, Qo(t)),
            "iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";").includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend"in self.document) {
                n = new Float32Array(t.width * t.height * 4),
                r.readPixels(0, 0, t.width, t.height, r.RGBA, r.FLOAT, n);
                for (let t = 0, r = 0; t < e.length; ++t,
                r += 4)
                    e[t] = n[r]
            } else
                r.readPixels(0, 0, t.width, t.height, r.RED, r.FLOAT, e)
        }
        t.g.push(e)
    }
    return e
}
function Qo(t) {
    let e = Jo(t, 2);
    if (!e) {
        const n = ta(t);
        e = ia(t);
        const r = Zo(t)
          , i = ea(t);
        n.texImage2D(n.TEXTURE_2D, 0, i, t.width, t.height, 0, n.RED, n.FLOAT, r),
        sa(t)
    }
    return e
}
function ta(t) {
    if (!t.canvas)
        throw Error("Conversion to different image formats require that a canvas is passed when initializing the image.");
    return t.h || (t.h = Vo(t.canvas.getContext("webgl2"), "You cannot use a canvas that is already bound to a different type of rendering context.")),
    t.h
}
function ea(t) {
    if (t = ta(t),
    !oa)
        if (t.getExtension("EXT_color_buffer_float") && t.getExtension("OES_texture_float_linear") && t.getExtension("EXT_float_blend"))
            oa = t.R32F;
        else {
            if (!t.getExtension("EXT_color_buffer_half_float"))
                throw Error("GPU does not fully support 4-channel float32 or float16 formats");
            oa = t.R16F
        }
    return oa
}
function na(t) {
    return t.l || (t.l = new qo),
    t.l
}
function ra(t) {
    (t = ta(t)).texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE),
    t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE),
    t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.NEAREST),
    t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.NEAREST)
}
function ia(t) {
    const e = ta(t);
    e.viewport(0, 0, t.width, t.height),
    e.activeTexture(e.TEXTURE0);
    let n = Jo(t, 2);
    return n ? e.bindTexture(e.TEXTURE_2D, n) : (n = Vo(e.createTexture(), "Failed to create texture"),
    t.g.push(n),
    t.m = !0,
    e.bindTexture(e.TEXTURE_2D, n),
    ra(t)),
    n
}
function sa(t) {
    t.h.bindTexture(t.h.TEXTURE_2D, null)
}
var oa, aa = class {
    constructor(t, e, n, r, i, s) {
        this.g = t,
        this.m = e,
        this.canvas = n,
        this.l = r,
        this.width = i,
        this.height = s,
        this.m && (0 === --ca && console.error("You seem to be creating MPMask instances without invoking .close(). This leaks resources."))
    }
    Ga() {
        return !!Jo(this, 0)
    }
    Ea() {
        return !!Jo(this, 1)
    }
    M() {
        return !!Jo(this, 2)
    }
    Ca() {
        return (e = Jo(t = this, 0)) || (e = Zo(t),
        e = new Uint8Array(e.map((t=>255 * t))),
        t.g.push(e)),
        e;
        var t, e
    }
    za() {
        return Zo(this)
    }
    Z() {
        return Qo(this)
    }
    clone() {
        const t = [];
        for (const e of this.g) {
            let n;
            if (e instanceof Uint8Array)
                n = new Uint8Array(e);
            else if (e instanceof Float32Array)
                n = new Float32Array(e);
            else {
                if (!(e instanceof WebGLTexture))
                    throw Error(`Type is not supported: ${e}`);
                {
                    const t = ta(this)
                      , e = na(this);
                    t.activeTexture(t.TEXTURE1),
                    n = Vo(t.createTexture(), "Failed to create texture"),
                    t.bindTexture(t.TEXTURE_2D, n),
                    ra(this);
                    const r = ea(this);
                    t.texImage2D(t.TEXTURE_2D, 0, r, this.width, this.height, 0, t.RED, t.FLOAT, null),
                    t.bindTexture(t.TEXTURE_2D, null),
                    Ko(e, t, n),
                    Yo(e, t, !1, (()=>{
                        ia(this),
                        t.clearColor(0, 0, 0, 0),
                        t.clear(t.COLOR_BUFFER_BIT),
                        t.drawArrays(t.TRIANGLE_FAN, 0, 4),
                        sa(this)
                    }
                    )),
                    $o(e),
                    sa(this)
                }
            }
            t.push(n)
        }
        return new aa(t,this.M(),this.canvas,this.l,this.width,this.height)
    }
    close() {
        this.m && ta(this).deleteTexture(Jo(this, 2)),
        ca = -1
    }
}
;
aa.prototype.close = aa.prototype.close,
aa.prototype.clone = aa.prototype.clone,
aa.prototype.getAsWebGLTexture = aa.prototype.Z,
aa.prototype.getAsFloat32Array = aa.prototype.za,
aa.prototype.getAsUint8Array = aa.prototype.Ca,
aa.prototype.hasWebGLTexture = aa.prototype.M,
aa.prototype.hasFloat32Array = aa.prototype.Ea,
aa.prototype.hasUint8Array = aa.prototype.Ga;
var ca = 250;
const ha = {
    color: "white",
    lineWidth: 4,
    radius: 6
};
function ua(t) {
    return {
        ...ha,
        fillColor: (t = t || {}).color,
        ...t
    }
}
function la(t, e) {
    return t instanceof Function ? t(e) : t
}
function fa(t, e, n) {
    return Math.max(Math.min(e, n), Math.min(Math.max(e, n), t))
}
function da(t) {
    if (!t.g)
        throw Error("CPU rendering requested but CanvasRenderingContext2D not provided.");
    return t.g
}
var pa = class {
    constructor(t) {
        (t instanceof CanvasRenderingContext2D || t instanceof OffscreenCanvasRenderingContext2D) && (this.g = t)
    }
    wa(t, e) {
        if (t) {
            var n = da(this);
            e = ua(e),
            n.save();
            var r = n.canvas
              , i = 0;
            for (const s of t)
                n.fillStyle = la(e.fillColor, {
                    index: i,
                    from: s
                }),
                n.strokeStyle = la(e.color, {
                    index: i,
                    from: s
                }),
                n.lineWidth = la(e.lineWidth, {
                    index: i,
                    from: s
                }),
                (t = new Path2D).arc(s.x * r.width, s.y * r.height, la(e.radius, {
                    index: i,
                    from: s
                }), 0, 2 * Math.PI),
                n.fill(t),
                n.stroke(t),
                ++i;
            n.restore()
        }
    }
    va(t, e, n) {
        if (t && e) {
            var r = da(this);
            n = ua(n),
            r.save();
            var i = r.canvas
              , s = 0;
            for (const o of e) {
                r.beginPath(),
                e = t[o.start];
                const a = t[o.end];
                e && a && (r.strokeStyle = la(n.color, {
                    index: s,
                    from: e,
                    to: a
                }),
                r.lineWidth = la(n.lineWidth, {
                    index: s,
                    from: e,
                    to: a
                }),
                r.moveTo(e.x * i.width, e.y * i.height),
                r.lineTo(a.x * i.width, a.y * i.height)),
                ++s,
                r.stroke()
            }
            r.restore()
        }
    }
    ua(t, e) {
        const n = da(this);
        e = ua(e),
        n.save(),
        n.beginPath(),
        n.lineWidth = la(e.lineWidth, {}),
        n.strokeStyle = la(e.color, {}),
        n.fillStyle = la(e.fillColor, {}),
        n.moveTo(t.originX, t.originY),
        n.lineTo(t.originX + t.width, t.originY),
        n.lineTo(t.originX + t.width, t.originY + t.height),
        n.lineTo(t.originX, t.originY + t.height),
        n.lineTo(t.originX, t.originY),
        n.stroke(),
        n.fill(),
        n.restore()
    }
    close() {
        this.h?.close(),
        this.h = void 0,
        this.l?.close(),
        this.l = void 0
    }
}
;
function ga(t, e) {
    switch (e) {
    case 0:
        return t.g.find((t=>t instanceof ImageData));
    case 1:
        return t.g.find((t=>"undefined" != typeof ImageBitmap && t instanceof ImageBitmap));
    case 2:
        return t.g.find((t=>"undefined" != typeof WebGLTexture && t instanceof WebGLTexture));
    default:
        throw Error(`Type is not supported: ${e}`)
    }
}
function ma(t) {
    var e = ga(t, 0);
    if (!e) {
        e = va(t);
        const n = _a(t)
          , r = new Uint8Array(t.width * t.height * 4);
        Ko(n, e, ya(t)),
        e.readPixels(0, 0, t.width, t.height, e.RGBA, e.UNSIGNED_BYTE, r),
        $o(n),
        e = new ImageData(new Uint8ClampedArray(r.buffer),t.width,t.height),
        t.g.push(e)
    }
    return e
}
function ya(t) {
    let e = ga(t, 2);
    if (!e) {
        const n = va(t);
        e = ba(t);
        const r = ga(t, 1) || ma(t);
        n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, n.RGBA, n.UNSIGNED_BYTE, r),
        Ea(t)
    }
    return e
}
function va(t) {
    if (!t.canvas)
        throw Error("Conversion to different image formats require that a canvas is passed when iniitializing the image.");
    return t.h || (t.h = Vo(t.canvas.getContext("webgl2"), "You cannot use a canvas that is already bound to a different type of rendering context.")),
    t.h
}
function _a(t) {
    return t.l || (t.l = new qo),
    t.l
}
function wa(t) {
    (t = va(t)).texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE),
    t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE),
    t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR),
    t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR)
}
function ba(t) {
    const e = va(t);
    e.viewport(0, 0, t.width, t.height),
    e.activeTexture(e.TEXTURE0);
    let n = ga(t, 2);
    return n ? e.bindTexture(e.TEXTURE_2D, n) : (n = Vo(e.createTexture(), "Failed to create texture"),
    t.g.push(n),
    t.m = !0,
    e.bindTexture(e.TEXTURE_2D, n),
    wa(t)),
    n
}
function Ea(t) {
    t.h.bindTexture(t.h.TEXTURE_2D, null)
}
function Aa(t) {
    const e = va(t);
    return Yo(_a(t), e, !0, (()=>function(t, e) {
        const n = t.canvas;
        if (n.width === t.width && n.height === t.height)
            return e();
        const r = n.width
          , i = n.height;
        return n.width = t.width,
        n.height = t.height,
        t = e(),
        n.width = r,
        n.height = i,
        t
    }(t, (()=>{
        if (e.bindFramebuffer(e.FRAMEBUFFER, null),
        e.clearColor(0, 0, 0, 0),
        e.clear(e.COLOR_BUFFER_BIT),
        e.drawArrays(e.TRIANGLE_FAN, 0, 4),
        !(t.canvas instanceof OffscreenCanvas))
            throw Error("Conversion to ImageBitmap requires that the MediaPipe Tasks is initialized with an OffscreenCanvas");
        return t.canvas.transferToImageBitmap()
    }
    ))))
}
pa.prototype.close = pa.prototype.close,
pa.prototype.drawBoundingBox = pa.prototype.ua,
pa.prototype.drawConnectors = pa.prototype.va,
pa.prototype.drawLandmarks = pa.prototype.wa,
pa.lerp = function(t, e, n, r, i) {
    return fa(r * (1 - (t - e) / (n - e)) + i * (1 - (n - t) / (n - e)), r, i)
}
,
pa.clamp = fa;
var Ta = class {
    constructor(t, e, n, r, i, s, o) {
        this.g = t,
        this.j = e,
        this.m = n,
        this.canvas = r,
        this.l = i,
        this.width = s,
        this.height = o,
        (this.j || this.m) && (0 === --ka && console.error("You seem to be creating MPImage instances without invoking .close(). This leaks resources."))
    }
    Fa() {
        return !!ga(this, 0)
    }
    ga() {
        return !!ga(this, 1)
    }
    M() {
        return !!ga(this, 2)
    }
    Ba() {
        return ma(this)
    }
    Aa() {
        var t = ga(this, 1);
        return t || (ya(this),
        ba(this),
        t = Aa(this),
        Ea(this),
        this.g.push(t),
        this.j = !0),
        t
    }
    Z() {
        return ya(this)
    }
    clone() {
        const t = [];
        for (const e of this.g) {
            let n;
            if (e instanceof ImageData)
                n = new ImageData(e.data,this.width,this.height);
            else if (e instanceof WebGLTexture) {
                const t = va(this)
                  , e = _a(this);
                t.activeTexture(t.TEXTURE1),
                n = Vo(t.createTexture(), "Failed to create texture"),
                t.bindTexture(t.TEXTURE_2D, n),
                wa(this),
                t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, this.width, this.height, 0, t.RGBA, t.UNSIGNED_BYTE, null),
                t.bindTexture(t.TEXTURE_2D, null),
                Ko(e, t, n),
                Yo(e, t, !1, (()=>{
                    ba(this),
                    t.clearColor(0, 0, 0, 0),
                    t.clear(t.COLOR_BUFFER_BIT),
                    t.drawArrays(t.TRIANGLE_FAN, 0, 4),
                    Ea(this)
                }
                )),
                $o(e),
                Ea(this)
            } else {
                if (!(e instanceof ImageBitmap))
                    throw Error(`Type is not supported: ${e}`);
                ya(this),
                ba(this),
                n = Aa(this),
                Ea(this)
            }
            t.push(n)
        }
        return new Ta(t,this.ga(),this.M(),this.canvas,this.l,this.width,this.height)
    }
    close() {
        this.j && ga(this, 1).close(),
        this.m && va(this).deleteTexture(ga(this, 2)),
        ka = -1
    }
}
;
Ta.prototype.close = Ta.prototype.close,
Ta.prototype.clone = Ta.prototype.clone,
Ta.prototype.getAsWebGLTexture = Ta.prototype.Z,
Ta.prototype.getAsImageBitmap = Ta.prototype.Aa,
Ta.prototype.getAsImageData = Ta.prototype.Ba,
Ta.prototype.hasWebGLTexture = Ta.prototype.M,
Ta.prototype.hasImageBitmap = Ta.prototype.ga,
Ta.prototype.hasImageData = Ta.prototype.Fa;
var ka = 250;
function Sa(...t) {
    return t.map((([t,e])=>({
        start: t,
        end: e
    })))
}
const xa = function(t) {
    return class extends t {
        Ma() {
            this.i._registerModelResourcesGraphService()
        }
    }
}((Fa = class {
    constructor(t, e) {
        this.l = !0,
        this.i = t,
        this.g = null,
        this.h = 0,
        this.m = "function" == typeof this.i._addIntToInputStream,
        void 0 !== e ? this.i.canvas = e : "undefined" == typeof OffscreenCanvas || xo() ? (console.warn("OffscreenCanvas not supported and GraphRunner constructor glCanvas parameter is undefined. Creating backup canvas."),
        this.i.canvas = document.createElement("canvas")) : this.i.canvas = new OffscreenCanvas(1,1)
    }
    async initializeGraph(t) {
        const e = await (await fetch(t)).arrayBuffer();
        t = !(t.endsWith(".pbtxt") || t.endsWith(".textproto")),
        this.setGraph(new Uint8Array(e), t)
    }
    setGraphFromString(t) {
        this.setGraph((new TextEncoder).encode(t), !1)
    }
    setGraph(t, e) {
        const n = t.length
          , r = this.i._malloc(n);
        this.i.HEAPU8.set(t, r),
        e ? this.i._changeBinaryGraph(n, r) : this.i._changeTextGraph(n, r),
        this.i._free(r)
    }
    configureAudio(t, e, n, r, i) {
        this.i._configureAudio || console.warn('Attempting to use configureAudio without support for input audio. Is build dep ":gl_graph_runner_audio" missing?'),
        Lo(this, r || "input_audio", (r=>{
            Lo(this, i = i || "audio_header", (i=>{
                this.i._configureAudio(r, i, t, e, n)
            }
            ))
        }
        ))
    }
    setAutoResizeCanvas(t) {
        this.l = t
    }
    setAutoRenderToScreen(t) {
        this.i._setAutoRenderToScreen(t)
    }
    setGpuBufferVerticalFlip(t) {
        this.i.gpuOriginForWebTexturesIsBottomLeft = t
    }
    aa(t) {
        Po(this, "__graph_config__", (e=>{
            t(e)
        }
        )),
        Lo(this, "__graph_config__", (t=>{
            this.i._getGraphConfig(t, void 0)
        }
        )),
        delete this.i.simpleListeners.__graph_config__
    }
    attachErrorListener(t) {
        this.i.errorListener = t
    }
    attachEmptyPacketListener(t, e) {
        this.i.emptyPacketListeners = this.i.emptyPacketListeners || {},
        this.i.emptyPacketListeners[t] = e
    }
    addAudioToStream(t, e, n) {
        this.addAudioToStreamWithShape(t, 0, 0, e, n)
    }
    addAudioToStreamWithShape(t, e, n, r, i) {
        const s = 4 * t.length;
        this.h !== s && (this.g && this.i._free(this.g),
        this.g = this.i._malloc(s),
        this.h = s),
        this.i.HEAPF32.set(t, this.g / 4),
        Lo(this, r, (t=>{
            this.i._addAudioToInputStream(this.g, e, n, t, i)
        }
        ))
    }
    addGpuBufferToStream(t, e, n) {
        Lo(this, e, (e=>{
            const [r,i] = Mo(this, t, e);
            this.i._addBoundTextureToStream(e, r, i, n)
        }
        ))
    }
    addBoolToStream(t, e, n) {
        Lo(this, e, (e=>{
            this.i._addBoolToInputStream(t, e, n)
        }
        ))
    }
    addDoubleToStream(t, e, n) {
        Lo(this, e, (e=>{
            this.i._addDoubleToInputStream(t, e, n)
        }
        ))
    }
    addFloatToStream(t, e, n) {
        Lo(this, e, (e=>{
            this.i._addFloatToInputStream(t, e, n)
        }
        ))
    }
    addIntToStream(t, e, n) {
        Lo(this, e, (e=>{
            this.i._addIntToInputStream(t, e, n)
        }
        ))
    }
    addStringToStream(t, e, n) {
        Lo(this, e, (e=>{
            Lo(this, t, (t=>{
                this.i._addStringToInputStream(t, e, n)
            }
            ))
        }
        ))
    }
    addStringRecordToStream(t, e, n) {
        Lo(this, e, (e=>{
            Oo(this, Object.keys(t), (r=>{
                Oo(this, Object.values(t), (i=>{
                    this.i._addFlatHashMapToInputStream(r, i, Object.keys(t).length, e, n)
                }
                ))
            }
            ))
        }
        ))
    }
    addProtoToStream(t, e, n, r) {
        Lo(this, n, (n=>{
            Lo(this, e, (e=>{
                const i = this.i._malloc(t.length);
                this.i.HEAPU8.set(t, i),
                this.i._addProtoToInputStream(i, t.length, e, n, r),
                this.i._free(i)
            }
            ))
        }
        ))
    }
    addEmptyPacketToStream(t, e) {
        Lo(this, t, (t=>{
            this.i._addEmptyPacketToInputStream(t, e)
        }
        ))
    }
    addBoolVectorToStream(t, e, n) {
        Lo(this, e, (e=>{
            const r = this.i._allocateBoolVector(t.length);
            if (!r)
                throw Error("Unable to allocate new bool vector on heap.");
            for (const e of t)
                this.i._addBoolVectorEntry(r, e);
            this.i._addBoolVectorToInputStream(r, e, n)
        }
        ))
    }
    addDoubleVectorToStream(t, e, n) {
        Lo(this, e, (e=>{
            const r = this.i._allocateDoubleVector(t.length);
            if (!r)
                throw Error("Unable to allocate new double vector on heap.");
            for (const e of t)
                this.i._addDoubleVectorEntry(r, e);
            this.i._addDoubleVectorToInputStream(r, e, n)
        }
        ))
    }
    addFloatVectorToStream(t, e, n) {
        Lo(this, e, (e=>{
            const r = this.i._allocateFloatVector(t.length);
            if (!r)
                throw Error("Unable to allocate new float vector on heap.");
            for (const e of t)
                this.i._addFloatVectorEntry(r, e);
            this.i._addFloatVectorToInputStream(r, e, n)
        }
        ))
    }
    addIntVectorToStream(t, e, n) {
        Lo(this, e, (e=>{
            const r = this.i._allocateIntVector(t.length);
            if (!r)
                throw Error("Unable to allocate new int vector on heap.");
            for (const e of t)
                this.i._addIntVectorEntry(r, e);
            this.i._addIntVectorToInputStream(r, e, n)
        }
        ))
    }
    addStringVectorToStream(t, e, n) {
        Lo(this, e, (e=>{
            const r = this.i._allocateStringVector(t.length);
            if (!r)
                throw Error("Unable to allocate new string vector on heap.");
            for (const e of t)
                Lo(this, e, (t=>{
                    this.i._addStringVectorEntry(r, t)
                }
                ));
            this.i._addStringVectorToInputStream(r, e, n)
        }
        ))
    }
    addBoolToInputSidePacket(t, e) {
        Lo(this, e, (e=>{
            this.i._addBoolToInputSidePacket(t, e)
        }
        ))
    }
    addDoubleToInputSidePacket(t, e) {
        Lo(this, e, (e=>{
            this.i._addDoubleToInputSidePacket(t, e)
        }
        ))
    }
    addFloatToInputSidePacket(t, e) {
        Lo(this, e, (e=>{
            this.i._addFloatToInputSidePacket(t, e)
        }
        ))
    }
    addIntToInputSidePacket(t, e) {
        Lo(this, e, (e=>{
            this.i._addIntToInputSidePacket(t, e)
        }
        ))
    }
    addStringToInputSidePacket(t, e) {
        Lo(this, e, (e=>{
            Lo(this, t, (t=>{
                this.i._addStringToInputSidePacket(t, e)
            }
            ))
        }
        ))
    }
    addProtoToInputSidePacket(t, e, n) {
        Lo(this, n, (n=>{
            Lo(this, e, (e=>{
                const r = this.i._malloc(t.length);
                this.i.HEAPU8.set(t, r),
                this.i._addProtoToInputSidePacket(r, t.length, e, n),
                this.i._free(r)
            }
            ))
        }
        ))
    }
    addBoolVectorToInputSidePacket(t, e) {
        Lo(this, e, (e=>{
            const n = this.i._allocateBoolVector(t.length);
            if (!n)
                throw Error("Unable to allocate new bool vector on heap.");
            for (const e of t)
                this.i._addBoolVectorEntry(n, e);
            this.i._addBoolVectorToInputSidePacket(n, e)
        }
        ))
    }
    addDoubleVectorToInputSidePacket(t, e) {
        Lo(this, e, (e=>{
            const n = this.i._allocateDoubleVector(t.length);
            if (!n)
                throw Error("Unable to allocate new double vector on heap.");
            for (const e of t)
                this.i._addDoubleVectorEntry(n, e);
            this.i._addDoubleVectorToInputSidePacket(n, e)
        }
        ))
    }
    addFloatVectorToInputSidePacket(t, e) {
        Lo(this, e, (e=>{
            const n = this.i._allocateFloatVector(t.length);
            if (!n)
                throw Error("Unable to allocate new float vector on heap.");
            for (const e of t)
                this.i._addFloatVectorEntry(n, e);
            this.i._addFloatVectorToInputSidePacket(n, e)
        }
        ))
    }
    addIntVectorToInputSidePacket(t, e) {
        Lo(this, e, (e=>{
            const n = this.i._allocateIntVector(t.length);
            if (!n)
                throw Error("Unable to allocate new int vector on heap.");
            for (const e of t)
                this.i._addIntVectorEntry(n, e);
            this.i._addIntVectorToInputSidePacket(n, e)
        }
        ))
    }
    addStringVectorToInputSidePacket(t, e) {
        Lo(this, e, (e=>{
            const n = this.i._allocateStringVector(t.length);
            if (!n)
                throw Error("Unable to allocate new string vector on heap.");
            for (const e of t)
                Lo(this, e, (t=>{
                    this.i._addStringVectorEntry(n, t)
                }
                ));
            this.i._addStringVectorToInputSidePacket(n, e)
        }
        ))
    }
    attachBoolListener(t, e) {
        Po(this, t, e),
        Lo(this, t, (t=>{
            this.i._attachBoolListener(t)
        }
        ))
    }
    attachBoolVectorListener(t, e) {
        Io(this, t, e),
        Lo(this, t, (t=>{
            this.i._attachBoolVectorListener(t)
        }
        ))
    }
    attachIntListener(t, e) {
        Po(this, t, e),
        Lo(this, t, (t=>{
            this.i._attachIntListener(t)
        }
        ))
    }
    attachIntVectorListener(t, e) {
        Io(this, t, e),
        Lo(this, t, (t=>{
            this.i._attachIntVectorListener(t)
        }
        ))
    }
    attachDoubleListener(t, e) {
        Po(this, t, e),
        Lo(this, t, (t=>{
            this.i._attachDoubleListener(t)
        }
        ))
    }
    attachDoubleVectorListener(t, e) {
        Io(this, t, e),
        Lo(this, t, (t=>{
            this.i._attachDoubleVectorListener(t)
        }
        ))
    }
    attachFloatListener(t, e) {
        Po(this, t, e),
        Lo(this, t, (t=>{
            this.i._attachFloatListener(t)
        }
        ))
    }
    attachFloatVectorListener(t, e) {
        Io(this, t, e),
        Lo(this, t, (t=>{
            this.i._attachFloatVectorListener(t)
        }
        ))
    }
    attachStringListener(t, e) {
        Po(this, t, e),
        Lo(this, t, (t=>{
            this.i._attachStringListener(t)
        }
        ))
    }
    attachStringVectorListener(t, e) {
        Io(this, t, e),
        Lo(this, t, (t=>{
            this.i._attachStringVectorListener(t)
        }
        ))
    }
    attachProtoListener(t, e, n) {
        Po(this, t, e),
        Lo(this, t, (t=>{
            this.i._attachProtoListener(t, n || !1)
        }
        ))
    }
    attachProtoVectorListener(t, e, n) {
        Io(this, t, e),
        Lo(this, t, (t=>{
            this.i._attachProtoVectorListener(t, n || !1)
        }
        ))
    }
    attachAudioListener(t, e, n) {
        this.i._attachAudioListener || console.warn('Attempting to use attachAudioListener without support for output audio. Is build dep ":gl_graph_runner_audio_out" missing?'),
        Po(this, t, ((t,n)=>{
            t = new Float32Array(t.buffer,t.byteOffset,t.length / 4),
            e(t, n)
        }
        )),
        Lo(this, t, (t=>{
            this.i._attachAudioListener(t, n || !1)
        }
        ))
    }
    finishProcessing() {
        this.i._waitUntilIdle()
    }
    closeGraph() {
        this.i._closeGraph(),
        this.i.simpleListeners = void 0,
        this.i.emptyPacketListeners = void 0
    }
}
,
class extends Fa {
    get ca() {
        return this.i
    }
    pa(t, e, n) {
        Lo(this, e, (e=>{
            const [r,i] = Mo(this, t, e);
            this.ca._addBoundTextureAsImageToStream(e, r, i, n)
        }
        ))
    }
    X(t, e) {
        Po(this, t, e),
        Lo(this, t, (t=>{
            this.ca._attachImageListener(t)
        }
        ))
    }
    Y(t, e) {
        Io(this, t, e),
        Lo(this, t, (t=>{
            this.ca._attachImageVectorListener(t)
        }
        ))
    }
}
));
var Fa, La = class extends xa {
}
;
async function Ma(t, e, n) {
    return async function(t, e, n, r) {
        return Co(t, e, n, r)
    }(t, n.canvas ?? ("undefined" == typeof OffscreenCanvas || xo() ? document.createElement("canvas") : void 0), e, n)
}
function Oa(t, e, n, r) {
    if (t.da) {
        const s = new Zi;
        if (n?.regionOfInterest) {
            if (!t.na)
                throw Error("This task doesn't support region-of-interest.");
            var i = n.regionOfInterest;
            if (i.left >= i.right || i.top >= i.bottom)
                throw Error("Expected RectF with left < right and top < bottom.");
            if (0 > i.left || 0 > i.top || 1 < i.right || 1 < i.bottom)
                throw Error("Expected RectF values to be in [0,1].");
            Pn(s, 1, (i.left + i.right) / 2),
            Pn(s, 2, (i.top + i.bottom) / 2),
            Pn(s, 4, i.right - i.left),
            Pn(s, 3, i.bottom - i.top)
        } else
            Pn(s, 1, .5),
            Pn(s, 2, .5),
            Pn(s, 4, 1),
            Pn(s, 3, 1);
        if (n?.rotationDegrees) {
            if (0 != n?.rotationDegrees % 90)
                throw Error("Expected rotation to be a multiple of 90°.");
            if (Pn(s, 5, -Math.PI * n.rotationDegrees / 180),
            0 != n?.rotationDegrees % 180) {
                const [t,r] = void 0 !== e.videoWidth ? [e.videoWidth, e.videoHeight] : void 0 !== e.naturalWidth ? [e.naturalWidth, e.naturalHeight] : [e.width, e.height];
                n = Ln(s, 3) * r / t,
                i = Ln(s, 4) * t / r,
                Pn(s, 4, n),
                Pn(s, 3, i)
            }
        }
        t.g.addProtoToStream(s.g(), "mediapipe.NormalizedRect", t.da, r)
    }
    t.g.pa(e, t.ma, r ?? performance.now()),
    t.finishProcessing()
}
function Pa(t, e, n) {
    if (t.baseOptions?.g())
        throw Error("Task is not initialized with image mode. 'runningMode' must be set to 'IMAGE'.");
    Oa(t, e, n, t.N + 1)
}
function Ia(t, e, n, r) {
    if (!t.baseOptions?.g())
        throw Error("Task is not initialized with video mode. 'runningMode' must be set to 'VIDEO'.");
    Oa(t, e, n, r)
}
function Ca(t, e, n) {
    var r = e.data;
    const i = e.width
      , s = i * (e = e.height);
    if ((r instanceof Uint8Array || r instanceof Float32Array) && r.length !== s)
        throw Error("Unsupported channel count: " + r.length / s);
    return t = new aa([r],!1,t.g.i.canvas,t.U,i,e),
    n ? t.clone() : t
}
var Ra = class extends jo {
    constructor(t, e, n, r) {
        super(t),
        this.g = t,
        this.ma = e,
        this.da = n,
        this.na = r,
        this.U = new qo
    }
    l(t, e=!0) {
        if ("runningMode"in t && Mn(this.baseOptions, 2, !!t.runningMode && "IMAGE" !== t.runningMode),
        void 0 !== t.canvas && this.g.i.canvas !== t.canvas)
            throw Error("You must create a new task to reset the canvas.");
        return super.l(t, e)
    }
    close() {
        this.U.close(),
        super.close()
    }
}
;
Ra.prototype.close = Ra.prototype.close;
var Da = class extends Ra {
    constructor(t, e) {
        super(new La(t,e), "image_in", "norm_rect_in", !1),
        this.j = {
            detections: []
        },
        this.h = new ws,
        t = new vs,
        En(this.h, 0, 1, t),
        Pn(this.h, 2, .5),
        Pn(this.h, 3, .3)
    }
    get baseOptions() {
        return _n(this.h, vs, 1)
    }
    set baseOptions(t) {
        En(this.h, 0, 1, t)
    }
    o(t) {
        return "minDetectionConfidence"in t && Pn(this.h, 2, t.minDetectionConfidence ?? .5),
        "minSuppressionThreshold"in t && Pn(this.h, 3, t.minSuppressionThreshold ?? .3),
        this.l(t)
    }
    F(t, e) {
        return this.j = {
            detections: []
        },
        Pa(this, t, e),
        this.j
    }
    G(t, e, n) {
        return this.j = {
            detections: []
        },
        Ia(this, t, n, e),
        this.j
    }
    m() {
        var t = new Ei;
        wi(t, "image_in"),
        wi(t, "norm_rect_in"),
        bi(t, "detections");
        const e = new ni;
        In(e, Es, this.h);
        const n = new di;
        ui(n, "mediapipe.tasks.vision.face_detector.FaceDetectorGraph"),
        li(n, "IMAGE:image_in"),
        li(n, "NORM_RECT:norm_rect_in"),
        fi(n, "DETECTIONS:detections"),
        n.o(e),
        _i(t, n),
        this.g.attachProtoVectorListener("detections", ((t,e)=>{
            for (const e of t)
                t = ji(e),
                this.j.detections.push(yo(t));
            Bo(this, e)
        }
        )),
        this.g.attachEmptyPacketListener("detections", (t=>{
            Bo(this, t)
        }
        )),
        t = t.g(),
        this.setGraph(new Uint8Array(t), !0)
    }
}
;
Da.prototype.detectForVideo = Da.prototype.G,
Da.prototype.detect = Da.prototype.F,
Da.prototype.setOptions = Da.prototype.o,
Da.createFromModelPath = async function(t, e) {
    return Ma(Da, t, {
        baseOptions: {
            modelAssetPath: e
        }
    })
}
,
Da.createFromModelBuffer = function(t, e) {
    return Ma(Da, t, {
        baseOptions: {
            modelAssetBuffer: e
        }
    })
}
,
Da.createFromOptions = function(t, e) {
    return Ma(Da, t, e)
}
;
var Ba = Sa([61, 146], [146, 91], [91, 181], [181, 84], [84, 17], [17, 314], [314, 405], [405, 321], [321, 375], [375, 291], [61, 185], [185, 40], [40, 39], [39, 37], [37, 0], [0, 267], [267, 269], [269, 270], [270, 409], [409, 291], [78, 95], [95, 88], [88, 178], [178, 87], [87, 14], [14, 317], [317, 402], [402, 318], [318, 324], [324, 308], [78, 191], [191, 80], [80, 81], [81, 82], [82, 13], [13, 312], [312, 311], [311, 310], [310, 415], [415, 308])
  , Ua = Sa([263, 249], [249, 390], [390, 373], [373, 374], [374, 380], [380, 381], [381, 382], [382, 362], [263, 466], [466, 388], [388, 387], [387, 386], [386, 385], [385, 384], [384, 398], [398, 362])
  , Na = Sa([276, 283], [283, 282], [282, 295], [295, 285], [300, 293], [293, 334], [334, 296], [296, 336])
  , Ga = Sa([474, 475], [475, 476], [476, 477], [477, 474])
  , ja = Sa([33, 7], [7, 163], [163, 144], [144, 145], [145, 153], [153, 154], [154, 155], [155, 133], [33, 246], [246, 161], [161, 160], [160, 159], [159, 158], [158, 157], [157, 173], [173, 133])
  , Va = Sa([46, 53], [53, 52], [52, 65], [65, 55], [70, 63], [63, 105], [105, 66], [66, 107])
  , za = Sa([469, 470], [470, 471], [471, 472], [472, 469])
  , Wa = Sa([10, 338], [338, 297], [297, 332], [332, 284], [284, 251], [251, 389], [389, 356], [356, 454], [454, 323], [323, 361], [361, 288], [288, 397], [397, 365], [365, 379], [379, 378], [378, 400], [400, 377], [377, 152], [152, 148], [148, 176], [176, 149], [149, 150], [150, 136], [136, 172], [172, 58], [58, 132], [132, 93], [93, 234], [234, 127], [127, 162], [162, 21], [21, 54], [54, 103], [103, 67], [67, 109], [109, 10])
  , Xa = [...Ba, ...Ua, ...Na, ...ja, ...Va, ...Wa]
  , Ha = Sa([127, 34], [34, 139], [139, 127], [11, 0], [0, 37], [37, 11], [232, 231], [231, 120], [120, 232], [72, 37], [37, 39], [39, 72], [128, 121], [121, 47], [47, 128], [232, 121], [121, 128], [128, 232], [104, 69], [69, 67], [67, 104], [175, 171], [171, 148], [148, 175], [118, 50], [50, 101], [101, 118], [73, 39], [39, 40], [40, 73], [9, 151], [151, 108], [108, 9], [48, 115], [115, 131], [131, 48], [194, 204], [204, 211], [211, 194], [74, 40], [40, 185], [185, 74], [80, 42], [42, 183], [183, 80], [40, 92], [92, 186], [186, 40], [230, 229], [229, 118], [118, 230], [202, 212], [212, 214], [214, 202], [83, 18], [18, 17], [17, 83], [76, 61], [61, 146], [146, 76], [160, 29], [29, 30], [30, 160], [56, 157], [157, 173], [173, 56], [106, 204], [204, 194], [194, 106], [135, 214], [214, 192], [192, 135], [203, 165], [165, 98], [98, 203], [21, 71], [71, 68], [68, 21], [51, 45], [45, 4], [4, 51], [144, 24], [24, 23], [23, 144], [77, 146], [146, 91], [91, 77], [205, 50], [50, 187], [187, 205], [201, 200], [200, 18], [18, 201], [91, 106], [106, 182], [182, 91], [90, 91], [91, 181], [181, 90], [85, 84], [84, 17], [17, 85], [206, 203], [203, 36], [36, 206], [148, 171], [171, 140], [140, 148], [92, 40], [40, 39], [39, 92], [193, 189], [189, 244], [244, 193], [159, 158], [158, 28], [28, 159], [247, 246], [246, 161], [161, 247], [236, 3], [3, 196], [196, 236], [54, 68], [68, 104], [104, 54], [193, 168], [168, 8], [8, 193], [117, 228], [228, 31], [31, 117], [189, 193], [193, 55], [55, 189], [98, 97], [97, 99], [99, 98], [126, 47], [47, 100], [100, 126], [166, 79], [79, 218], [218, 166], [155, 154], [154, 26], [26, 155], [209, 49], [49, 131], [131, 209], [135, 136], [136, 150], [150, 135], [47, 126], [126, 217], [217, 47], [223, 52], [52, 53], [53, 223], [45, 51], [51, 134], [134, 45], [211, 170], [170, 140], [140, 211], [67, 69], [69, 108], [108, 67], [43, 106], [106, 91], [91, 43], [230, 119], [119, 120], [120, 230], [226, 130], [130, 247], [247, 226], [63, 53], [53, 52], [52, 63], [238, 20], [20, 242], [242, 238], [46, 70], [70, 156], [156, 46], [78, 62], [62, 96], [96, 78], [46, 53], [53, 63], [63, 46], [143, 34], [34, 227], [227, 143], [123, 117], [117, 111], [111, 123], [44, 125], [125, 19], [19, 44], [236, 134], [134, 51], [51, 236], [216, 206], [206, 205], [205, 216], [154, 153], [153, 22], [22, 154], [39, 37], [37, 167], [167, 39], [200, 201], [201, 208], [208, 200], [36, 142], [142, 100], [100, 36], [57, 212], [212, 202], [202, 57], [20, 60], [60, 99], [99, 20], [28, 158], [158, 157], [157, 28], [35, 226], [226, 113], [113, 35], [160, 159], [159, 27], [27, 160], [204, 202], [202, 210], [210, 204], [113, 225], [225, 46], [46, 113], [43, 202], [202, 204], [204, 43], [62, 76], [76, 77], [77, 62], [137, 123], [123, 116], [116, 137], [41, 38], [38, 72], [72, 41], [203, 129], [129, 142], [142, 203], [64, 98], [98, 240], [240, 64], [49, 102], [102, 64], [64, 49], [41, 73], [73, 74], [74, 41], [212, 216], [216, 207], [207, 212], [42, 74], [74, 184], [184, 42], [169, 170], [170, 211], [211, 169], [170, 149], [149, 176], [176, 170], [105, 66], [66, 69], [69, 105], [122, 6], [6, 168], [168, 122], [123, 147], [147, 187], [187, 123], [96, 77], [77, 90], [90, 96], [65, 55], [55, 107], [107, 65], [89, 90], [90, 180], [180, 89], [101, 100], [100, 120], [120, 101], [63, 105], [105, 104], [104, 63], [93, 137], [137, 227], [227, 93], [15, 86], [86, 85], [85, 15], [129, 102], [102, 49], [49, 129], [14, 87], [87, 86], [86, 14], [55, 8], [8, 9], [9, 55], [100, 47], [47, 121], [121, 100], [145, 23], [23, 22], [22, 145], [88, 89], [89, 179], [179, 88], [6, 122], [122, 196], [196, 6], [88, 95], [95, 96], [96, 88], [138, 172], [172, 136], [136, 138], [215, 58], [58, 172], [172, 215], [115, 48], [48, 219], [219, 115], [42, 80], [80, 81], [81, 42], [195, 3], [3, 51], [51, 195], [43, 146], [146, 61], [61, 43], [171, 175], [175, 199], [199, 171], [81, 82], [82, 38], [38, 81], [53, 46], [46, 225], [225, 53], [144, 163], [163, 110], [110, 144], [52, 65], [65, 66], [66, 52], [229, 228], [228, 117], [117, 229], [34, 127], [127, 234], [234, 34], [107, 108], [108, 69], [69, 107], [109, 108], [108, 151], [151, 109], [48, 64], [64, 235], [235, 48], [62, 78], [78, 191], [191, 62], [129, 209], [209, 126], [126, 129], [111, 35], [35, 143], [143, 111], [117, 123], [123, 50], [50, 117], [222, 65], [65, 52], [52, 222], [19, 125], [125, 141], [141, 19], [221, 55], [55, 65], [65, 221], [3, 195], [195, 197], [197, 3], [25, 7], [7, 33], [33, 25], [220, 237], [237, 44], [44, 220], [70, 71], [71, 139], [139, 70], [122, 193], [193, 245], [245, 122], [247, 130], [130, 33], [33, 247], [71, 21], [21, 162], [162, 71], [170, 169], [169, 150], [150, 170], [188, 174], [174, 196], [196, 188], [216, 186], [186, 92], [92, 216], [2, 97], [97, 167], [167, 2], [141, 125], [125, 241], [241, 141], [164, 167], [167, 37], [37, 164], [72, 38], [38, 12], [12, 72], [38, 82], [82, 13], [13, 38], [63, 68], [68, 71], [71, 63], [226, 35], [35, 111], [111, 226], [101, 50], [50, 205], [205, 101], [206, 92], [92, 165], [165, 206], [209, 198], [198, 217], [217, 209], [165, 167], [167, 97], [97, 165], [220, 115], [115, 218], [218, 220], [133, 112], [112, 243], [243, 133], [239, 238], [238, 241], [241, 239], [214, 135], [135, 169], [169, 214], [190, 173], [173, 133], [133, 190], [171, 208], [208, 32], [32, 171], [125, 44], [44, 237], [237, 125], [86, 87], [87, 178], [178, 86], [85, 86], [86, 179], [179, 85], [84, 85], [85, 180], [180, 84], [83, 84], [84, 181], [181, 83], [201, 83], [83, 182], [182, 201], [137, 93], [93, 132], [132, 137], [76, 62], [62, 183], [183, 76], [61, 76], [76, 184], [184, 61], [57, 61], [61, 185], [185, 57], [212, 57], [57, 186], [186, 212], [214, 207], [207, 187], [187, 214], [34, 143], [143, 156], [156, 34], [79, 239], [239, 237], [237, 79], [123, 137], [137, 177], [177, 123], [44, 1], [1, 4], [4, 44], [201, 194], [194, 32], [32, 201], [64, 102], [102, 129], [129, 64], [213, 215], [215, 138], [138, 213], [59, 166], [166, 219], [219, 59], [242, 99], [99, 97], [97, 242], [2, 94], [94, 141], [141, 2], [75, 59], [59, 235], [235, 75], [24, 110], [110, 228], [228, 24], [25, 130], [130, 226], [226, 25], [23, 24], [24, 229], [229, 23], [22, 23], [23, 230], [230, 22], [26, 22], [22, 231], [231, 26], [112, 26], [26, 232], [232, 112], [189, 190], [190, 243], [243, 189], [221, 56], [56, 190], [190, 221], [28, 56], [56, 221], [221, 28], [27, 28], [28, 222], [222, 27], [29, 27], [27, 223], [223, 29], [30, 29], [29, 224], [224, 30], [247, 30], [30, 225], [225, 247], [238, 79], [79, 20], [20, 238], [166, 59], [59, 75], [75, 166], [60, 75], [75, 240], [240, 60], [147, 177], [177, 215], [215, 147], [20, 79], [79, 166], [166, 20], [187, 147], [147, 213], [213, 187], [112, 233], [233, 244], [244, 112], [233, 128], [128, 245], [245, 233], [128, 114], [114, 188], [188, 128], [114, 217], [217, 174], [174, 114], [131, 115], [115, 220], [220, 131], [217, 198], [198, 236], [236, 217], [198, 131], [131, 134], [134, 198], [177, 132], [132, 58], [58, 177], [143, 35], [35, 124], [124, 143], [110, 163], [163, 7], [7, 110], [228, 110], [110, 25], [25, 228], [356, 389], [389, 368], [368, 356], [11, 302], [302, 267], [267, 11], [452, 350], [350, 349], [349, 452], [302, 303], [303, 269], [269, 302], [357, 343], [343, 277], [277, 357], [452, 453], [453, 357], [357, 452], [333, 332], [332, 297], [297, 333], [175, 152], [152, 377], [377, 175], [347, 348], [348, 330], [330, 347], [303, 304], [304, 270], [270, 303], [9, 336], [336, 337], [337, 9], [278, 279], [279, 360], [360, 278], [418, 262], [262, 431], [431, 418], [304, 408], [408, 409], [409, 304], [310, 415], [415, 407], [407, 310], [270, 409], [409, 410], [410, 270], [450, 348], [348, 347], [347, 450], [422, 430], [430, 434], [434, 422], [313, 314], [314, 17], [17, 313], [306, 307], [307, 375], [375, 306], [387, 388], [388, 260], [260, 387], [286, 414], [414, 398], [398, 286], [335, 406], [406, 418], [418, 335], [364, 367], [367, 416], [416, 364], [423, 358], [358, 327], [327, 423], [251, 284], [284, 298], [298, 251], [281, 5], [5, 4], [4, 281], [373, 374], [374, 253], [253, 373], [307, 320], [320, 321], [321, 307], [425, 427], [427, 411], [411, 425], [421, 313], [313, 18], [18, 421], [321, 405], [405, 406], [406, 321], [320, 404], [404, 405], [405, 320], [315, 16], [16, 17], [17, 315], [426, 425], [425, 266], [266, 426], [377, 400], [400, 369], [369, 377], [322, 391], [391, 269], [269, 322], [417, 465], [465, 464], [464, 417], [386, 257], [257, 258], [258, 386], [466, 260], [260, 388], [388, 466], [456, 399], [399, 419], [419, 456], [284, 332], [332, 333], [333, 284], [417, 285], [285, 8], [8, 417], [346, 340], [340, 261], [261, 346], [413, 441], [441, 285], [285, 413], [327, 460], [460, 328], [328, 327], [355, 371], [371, 329], [329, 355], [392, 439], [439, 438], [438, 392], [382, 341], [341, 256], [256, 382], [429, 420], [420, 360], [360, 429], [364, 394], [394, 379], [379, 364], [277, 343], [343, 437], [437, 277], [443, 444], [444, 283], [283, 443], [275, 440], [440, 363], [363, 275], [431, 262], [262, 369], [369, 431], [297, 338], [338, 337], [337, 297], [273, 375], [375, 321], [321, 273], [450, 451], [451, 349], [349, 450], [446, 342], [342, 467], [467, 446], [293, 334], [334, 282], [282, 293], [458, 461], [461, 462], [462, 458], [276, 353], [353, 383], [383, 276], [308, 324], [324, 325], [325, 308], [276, 300], [300, 293], [293, 276], [372, 345], [345, 447], [447, 372], [352, 345], [345, 340], [340, 352], [274, 1], [1, 19], [19, 274], [456, 248], [248, 281], [281, 456], [436, 427], [427, 425], [425, 436], [381, 256], [256, 252], [252, 381], [269, 391], [391, 393], [393, 269], [200, 199], [199, 428], [428, 200], [266, 330], [330, 329], [329, 266], [287, 273], [273, 422], [422, 287], [250, 462], [462, 328], [328, 250], [258, 286], [286, 384], [384, 258], [265, 353], [353, 342], [342, 265], [387, 259], [259, 257], [257, 387], [424, 431], [431, 430], [430, 424], [342, 353], [353, 276], [276, 342], [273, 335], [335, 424], [424, 273], [292, 325], [325, 307], [307, 292], [366, 447], [447, 345], [345, 366], [271, 303], [303, 302], [302, 271], [423, 266], [266, 371], [371, 423], [294, 455], [455, 460], [460, 294], [279, 278], [278, 294], [294, 279], [271, 272], [272, 304], [304, 271], [432, 434], [434, 427], [427, 432], [272, 407], [407, 408], [408, 272], [394, 430], [430, 431], [431, 394], [395, 369], [369, 400], [400, 395], [334, 333], [333, 299], [299, 334], [351, 417], [417, 168], [168, 351], [352, 280], [280, 411], [411, 352], [325, 319], [319, 320], [320, 325], [295, 296], [296, 336], [336, 295], [319, 403], [403, 404], [404, 319], [330, 348], [348, 349], [349, 330], [293, 298], [298, 333], [333, 293], [323, 454], [454, 447], [447, 323], [15, 16], [16, 315], [315, 15], [358, 429], [429, 279], [279, 358], [14, 15], [15, 316], [316, 14], [285, 336], [336, 9], [9, 285], [329, 349], [349, 350], [350, 329], [374, 380], [380, 252], [252, 374], [318, 402], [402, 403], [403, 318], [6, 197], [197, 419], [419, 6], [318, 319], [319, 325], [325, 318], [367, 364], [364, 365], [365, 367], [435, 367], [367, 397], [397, 435], [344, 438], [438, 439], [439, 344], [272, 271], [271, 311], [311, 272], [195, 5], [5, 281], [281, 195], [273, 287], [287, 291], [291, 273], [396, 428], [428, 199], [199, 396], [311, 271], [271, 268], [268, 311], [283, 444], [444, 445], [445, 283], [373, 254], [254, 339], [339, 373], [282, 334], [334, 296], [296, 282], [449, 347], [347, 346], [346, 449], [264, 447], [447, 454], [454, 264], [336, 296], [296, 299], [299, 336], [338, 10], [10, 151], [151, 338], [278, 439], [439, 455], [455, 278], [292, 407], [407, 415], [415, 292], [358, 371], [371, 355], [355, 358], [340, 345], [345, 372], [372, 340], [346, 347], [347, 280], [280, 346], [442, 443], [443, 282], [282, 442], [19, 94], [94, 370], [370, 19], [441, 442], [442, 295], [295, 441], [248, 419], [419, 197], [197, 248], [263, 255], [255, 359], [359, 263], [440, 275], [275, 274], [274, 440], [300, 383], [383, 368], [368, 300], [351, 412], [412, 465], [465, 351], [263, 467], [467, 466], [466, 263], [301, 368], [368, 389], [389, 301], [395, 378], [378, 379], [379, 395], [412, 351], [351, 419], [419, 412], [436, 426], [426, 322], [322, 436], [2, 164], [164, 393], [393, 2], [370, 462], [462, 461], [461, 370], [164, 0], [0, 267], [267, 164], [302, 11], [11, 12], [12, 302], [268, 12], [12, 13], [13, 268], [293, 300], [300, 301], [301, 293], [446, 261], [261, 340], [340, 446], [330, 266], [266, 425], [425, 330], [426, 423], [423, 391], [391, 426], [429, 355], [355, 437], [437, 429], [391, 327], [327, 326], [326, 391], [440, 457], [457, 438], [438, 440], [341, 382], [382, 362], [362, 341], [459, 457], [457, 461], [461, 459], [434, 430], [430, 394], [394, 434], [414, 463], [463, 362], [362, 414], [396, 369], [369, 262], [262, 396], [354, 461], [461, 457], [457, 354], [316, 403], [403, 402], [402, 316], [315, 404], [404, 403], [403, 315], [314, 405], [405, 404], [404, 314], [313, 406], [406, 405], [405, 313], [421, 418], [418, 406], [406, 421], [366, 401], [401, 361], [361, 366], [306, 408], [408, 407], [407, 306], [291, 409], [409, 408], [408, 291], [287, 410], [410, 409], [409, 287], [432, 436], [436, 410], [410, 432], [434, 416], [416, 411], [411, 434], [264, 368], [368, 383], [383, 264], [309, 438], [438, 457], [457, 309], [352, 376], [376, 401], [401, 352], [274, 275], [275, 4], [4, 274], [421, 428], [428, 262], [262, 421], [294, 327], [327, 358], [358, 294], [433, 416], [416, 367], [367, 433], [289, 455], [455, 439], [439, 289], [462, 370], [370, 326], [326, 462], [2, 326], [326, 370], [370, 2], [305, 460], [460, 455], [455, 305], [254, 449], [449, 448], [448, 254], [255, 261], [261, 446], [446, 255], [253, 450], [450, 449], [449, 253], [252, 451], [451, 450], [450, 252], [256, 452], [452, 451], [451, 256], [341, 453], [453, 452], [452, 341], [413, 464], [464, 463], [463, 413], [441, 413], [413, 414], [414, 441], [258, 442], [442, 441], [441, 258], [257, 443], [443, 442], [442, 257], [259, 444], [444, 443], [443, 259], [260, 445], [445, 444], [444, 260], [467, 342], [342, 445], [445, 467], [459, 458], [458, 250], [250, 459], [289, 392], [392, 290], [290, 289], [290, 328], [328, 460], [460, 290], [376, 433], [433, 435], [435, 376], [250, 290], [290, 392], [392, 250], [411, 416], [416, 433], [433, 411], [341, 463], [463, 464], [464, 341], [453, 464], [464, 465], [465, 453], [357, 465], [465, 412], [412, 357], [343, 412], [412, 399], [399, 343], [360, 363], [363, 440], [440, 360], [437, 399], [399, 456], [456, 437], [420, 456], [456, 363], [363, 420], [401, 435], [435, 288], [288, 401], [372, 383], [383, 353], [353, 372], [339, 255], [255, 249], [249, 339], [448, 261], [261, 255], [255, 448], [133, 243], [243, 190], [190, 133], [133, 155], [155, 112], [112, 133], [33, 246], [246, 247], [247, 33], [33, 130], [130, 25], [25, 33], [398, 384], [384, 286], [286, 398], [362, 398], [398, 414], [414, 362], [362, 463], [463, 341], [341, 362], [263, 359], [359, 467], [467, 263], [263, 249], [249, 255], [255, 263], [466, 467], [467, 260], [260, 466], [75, 60], [60, 166], [166, 75], [238, 239], [239, 79], [79, 238], [162, 127], [127, 139], [139, 162], [72, 11], [11, 37], [37, 72], [121, 232], [232, 120], [120, 121], [73, 72], [72, 39], [39, 73], [114, 128], [128, 47], [47, 114], [233, 232], [232, 128], [128, 233], [103, 104], [104, 67], [67, 103], [152, 175], [175, 148], [148, 152], [119, 118], [118, 101], [101, 119], [74, 73], [73, 40], [40, 74], [107, 9], [9, 108], [108, 107], [49, 48], [48, 131], [131, 49], [32, 194], [194, 211], [211, 32], [184, 74], [74, 185], [185, 184], [191, 80], [80, 183], [183, 191], [185, 40], [40, 186], [186, 185], [119, 230], [230, 118], [118, 119], [210, 202], [202, 214], [214, 210], [84, 83], [83, 17], [17, 84], [77, 76], [76, 146], [146, 77], [161, 160], [160, 30], [30, 161], [190, 56], [56, 173], [173, 190], [182, 106], [106, 194], [194, 182], [138, 135], [135, 192], [192, 138], [129, 203], [203, 98], [98, 129], [54, 21], [21, 68], [68, 54], [5, 51], [51, 4], [4, 5], [145, 144], [144, 23], [23, 145], [90, 77], [77, 91], [91, 90], [207, 205], [205, 187], [187, 207], [83, 201], [201, 18], [18, 83], [181, 91], [91, 182], [182, 181], [180, 90], [90, 181], [181, 180], [16, 85], [85, 17], [17, 16], [205, 206], [206, 36], [36, 205], [176, 148], [148, 140], [140, 176], [165, 92], [92, 39], [39, 165], [245, 193], [193, 244], [244, 245], [27, 159], [159, 28], [28, 27], [30, 247], [247, 161], [161, 30], [174, 236], [236, 196], [196, 174], [103, 54], [54, 104], [104, 103], [55, 193], [193, 8], [8, 55], [111, 117], [117, 31], [31, 111], [221, 189], [189, 55], [55, 221], [240, 98], [98, 99], [99, 240], [142, 126], [126, 100], [100, 142], [219, 166], [166, 218], [218, 219], [112, 155], [155, 26], [26, 112], [198, 209], [209, 131], [131, 198], [169, 135], [135, 150], [150, 169], [114, 47], [47, 217], [217, 114], [224, 223], [223, 53], [53, 224], [220, 45], [45, 134], [134, 220], [32, 211], [211, 140], [140, 32], [109, 67], [67, 108], [108, 109], [146, 43], [43, 91], [91, 146], [231, 230], [230, 120], [120, 231], [113, 226], [226, 247], [247, 113], [105, 63], [63, 52], [52, 105], [241, 238], [238, 242], [242, 241], [124, 46], [46, 156], [156, 124], [95, 78], [78, 96], [96, 95], [70, 46], [46, 63], [63, 70], [116, 143], [143, 227], [227, 116], [116, 123], [123, 111], [111, 116], [1, 44], [44, 19], [19, 1], [3, 236], [236, 51], [51, 3], [207, 216], [216, 205], [205, 207], [26, 154], [154, 22], [22, 26], [165, 39], [39, 167], [167, 165], [199, 200], [200, 208], [208, 199], [101, 36], [36, 100], [100, 101], [43, 57], [57, 202], [202, 43], [242, 20], [20, 99], [99, 242], [56, 28], [28, 157], [157, 56], [124, 35], [35, 113], [113, 124], [29, 160], [160, 27], [27, 29], [211, 204], [204, 210], [210, 211], [124, 113], [113, 46], [46, 124], [106, 43], [43, 204], [204, 106], [96, 62], [62, 77], [77, 96], [227, 137], [137, 116], [116, 227], [73, 41], [41, 72], [72, 73], [36, 203], [203, 142], [142, 36], [235, 64], [64, 240], [240, 235], [48, 49], [49, 64], [64, 48], [42, 41], [41, 74], [74, 42], [214, 212], [212, 207], [207, 214], [183, 42], [42, 184], [184, 183], [210, 169], [169, 211], [211, 210], [140, 170], [170, 176], [176, 140], [104, 105], [105, 69], [69, 104], [193, 122], [122, 168], [168, 193], [50, 123], [123, 187], [187, 50], [89, 96], [96, 90], [90, 89], [66, 65], [65, 107], [107, 66], [179, 89], [89, 180], [180, 179], [119, 101], [101, 120], [120, 119], [68, 63], [63, 104], [104, 68], [234, 93], [93, 227], [227, 234], [16, 15], [15, 85], [85, 16], [209, 129], [129, 49], [49, 209], [15, 14], [14, 86], [86, 15], [107, 55], [55, 9], [9, 107], [120, 100], [100, 121], [121, 120], [153, 145], [145, 22], [22, 153], [178, 88], [88, 179], [179, 178], [197, 6], [6, 196], [196, 197], [89, 88], [88, 96], [96, 89], [135, 138], [138, 136], [136, 135], [138, 215], [215, 172], [172, 138], [218, 115], [115, 219], [219, 218], [41, 42], [42, 81], [81, 41], [5, 195], [195, 51], [51, 5], [57, 43], [43, 61], [61, 57], [208, 171], [171, 199], [199, 208], [41, 81], [81, 38], [38, 41], [224, 53], [53, 225], [225, 224], [24, 144], [144, 110], [110, 24], [105, 52], [52, 66], [66, 105], [118, 229], [229, 117], [117, 118], [227, 34], [34, 234], [234, 227], [66, 107], [107, 69], [69, 66], [10, 109], [109, 151], [151, 10], [219, 48], [48, 235], [235, 219], [183, 62], [62, 191], [191, 183], [142, 129], [129, 126], [126, 142], [116, 111], [111, 143], [143, 116], [118, 117], [117, 50], [50, 118], [223, 222], [222, 52], [52, 223], [94, 19], [19, 141], [141, 94], [222, 221], [221, 65], [65, 222], [196, 3], [3, 197], [197, 196], [45, 220], [220, 44], [44, 45], [156, 70], [70, 139], [139, 156], [188, 122], [122, 245], [245, 188], [139, 71], [71, 162], [162, 139], [149, 170], [170, 150], [150, 149], [122, 188], [188, 196], [196, 122], [206, 216], [216, 92], [92, 206], [164, 2], [2, 167], [167, 164], [242, 141], [141, 241], [241, 242], [0, 164], [164, 37], [37, 0], [11, 72], [72, 12], [12, 11], [12, 38], [38, 13], [13, 12], [70, 63], [63, 71], [71, 70], [31, 226], [226, 111], [111, 31], [36, 101], [101, 205], [205, 36], [203, 206], [206, 165], [165, 203], [126, 209], [209, 217], [217, 126], [98, 165], [165, 97], [97, 98], [237, 220], [220, 218], [218, 237], [237, 239], [239, 241], [241, 237], [210, 214], [214, 169], [169, 210], [140, 171], [171, 32], [32, 140], [241, 125], [125, 237], [237, 241], [179, 86], [86, 178], [178, 179], [180, 85], [85, 179], [179, 180], [181, 84], [84, 180], [180, 181], [182, 83], [83, 181], [181, 182], [194, 201], [201, 182], [182, 194], [177, 137], [137, 132], [132, 177], [184, 76], [76, 183], [183, 184], [185, 61], [61, 184], [184, 185], [186, 57], [57, 185], [185, 186], [216, 212], [212, 186], [186, 216], [192, 214], [214, 187], [187, 192], [139, 34], [34, 156], [156, 139], [218, 79], [79, 237], [237, 218], [147, 123], [123, 177], [177, 147], [45, 44], [44, 4], [4, 45], [208, 201], [201, 32], [32, 208], [98, 64], [64, 129], [129, 98], [192, 213], [213, 138], [138, 192], [235, 59], [59, 219], [219, 235], [141, 242], [242, 97], [97, 141], [97, 2], [2, 141], [141, 97], [240, 75], [75, 235], [235, 240], [229, 24], [24, 228], [228, 229], [31, 25], [25, 226], [226, 31], [230, 23], [23, 229], [229, 230], [231, 22], [22, 230], [230, 231], [232, 26], [26, 231], [231, 232], [233, 112], [112, 232], [232, 233], [244, 189], [189, 243], [243, 244], [189, 221], [221, 190], [190, 189], [222, 28], [28, 221], [221, 222], [223, 27], [27, 222], [222, 223], [224, 29], [29, 223], [223, 224], [225, 30], [30, 224], [224, 225], [113, 247], [247, 225], [225, 113], [99, 60], [60, 240], [240, 99], [213, 147], [147, 215], [215, 213], [60, 20], [20, 166], [166, 60], [192, 187], [187, 213], [213, 192], [243, 112], [112, 244], [244, 243], [244, 233], [233, 245], [245, 244], [245, 128], [128, 188], [188, 245], [188, 114], [114, 174], [174, 188], [134, 131], [131, 220], [220, 134], [174, 217], [217, 236], [236, 174], [236, 198], [198, 134], [134, 236], [215, 177], [177, 58], [58, 215], [156, 143], [143, 124], [124, 156], [25, 110], [110, 7], [7, 25], [31, 228], [228, 25], [25, 31], [264, 356], [356, 368], [368, 264], [0, 11], [11, 267], [267, 0], [451, 452], [452, 349], [349, 451], [267, 302], [302, 269], [269, 267], [350, 357], [357, 277], [277, 350], [350, 452], [452, 357], [357, 350], [299, 333], [333, 297], [297, 299], [396, 175], [175, 377], [377, 396], [280, 347], [347, 330], [330, 280], [269, 303], [303, 270], [270, 269], [151, 9], [9, 337], [337, 151], [344, 278], [278, 360], [360, 344], [424, 418], [418, 431], [431, 424], [270, 304], [304, 409], [409, 270], [272, 310], [310, 407], [407, 272], [322, 270], [270, 410], [410, 322], [449, 450], [450, 347], [347, 449], [432, 422], [422, 434], [434, 432], [18, 313], [313, 17], [17, 18], [291, 306], [306, 375], [375, 291], [259, 387], [387, 260], [260, 259], [424, 335], [335, 418], [418, 424], [434, 364], [364, 416], [416, 434], [391, 423], [423, 327], [327, 391], [301, 251], [251, 298], [298, 301], [275, 281], [281, 4], [4, 275], [254, 373], [373, 253], [253, 254], [375, 307], [307, 321], [321, 375], [280, 425], [425, 411], [411, 280], [200, 421], [421, 18], [18, 200], [335, 321], [321, 406], [406, 335], [321, 320], [320, 405], [405, 321], [314, 315], [315, 17], [17, 314], [423, 426], [426, 266], [266, 423], [396, 377], [377, 369], [369, 396], [270, 322], [322, 269], [269, 270], [413, 417], [417, 464], [464, 413], [385, 386], [386, 258], [258, 385], [248, 456], [456, 419], [419, 248], [298, 284], [284, 333], [333, 298], [168, 417], [417, 8], [8, 168], [448, 346], [346, 261], [261, 448], [417, 413], [413, 285], [285, 417], [326, 327], [327, 328], [328, 326], [277, 355], [355, 329], [329, 277], [309, 392], [392, 438], [438, 309], [381, 382], [382, 256], [256, 381], [279, 429], [429, 360], [360, 279], [365, 364], [364, 379], [379, 365], [355, 277], [277, 437], [437, 355], [282, 443], [443, 283], [283, 282], [281, 275], [275, 363], [363, 281], [395, 431], [431, 369], [369, 395], [299, 297], [297, 337], [337, 299], [335, 273], [273, 321], [321, 335], [348, 450], [450, 349], [349, 348], [359, 446], [446, 467], [467, 359], [283, 293], [293, 282], [282, 283], [250, 458], [458, 462], [462, 250], [300, 276], [276, 383], [383, 300], [292, 308], [308, 325], [325, 292], [283, 276], [276, 293], [293, 283], [264, 372], [372, 447], [447, 264], [346, 352], [352, 340], [340, 346], [354, 274], [274, 19], [19, 354], [363, 456], [456, 281], [281, 363], [426, 436], [436, 425], [425, 426], [380, 381], [381, 252], [252, 380], [267, 269], [269, 393], [393, 267], [421, 200], [200, 428], [428, 421], [371, 266], [266, 329], [329, 371], [432, 287], [287, 422], [422, 432], [290, 250], [250, 328], [328, 290], [385, 258], [258, 384], [384, 385], [446, 265], [265, 342], [342, 446], [386, 387], [387, 257], [257, 386], [422, 424], [424, 430], [430, 422], [445, 342], [342, 276], [276, 445], [422, 273], [273, 424], [424, 422], [306, 292], [292, 307], [307, 306], [352, 366], [366, 345], [345, 352], [268, 271], [271, 302], [302, 268], [358, 423], [423, 371], [371, 358], [327, 294], [294, 460], [460, 327], [331, 279], [279, 294], [294, 331], [303, 271], [271, 304], [304, 303], [436, 432], [432, 427], [427, 436], [304, 272], [272, 408], [408, 304], [395, 394], [394, 431], [431, 395], [378, 395], [395, 400], [400, 378], [296, 334], [334, 299], [299, 296], [6, 351], [351, 168], [168, 6], [376, 352], [352, 411], [411, 376], [307, 325], [325, 320], [320, 307], [285, 295], [295, 336], [336, 285], [320, 319], [319, 404], [404, 320], [329, 330], [330, 349], [349, 329], [334, 293], [293, 333], [333, 334], [366, 323], [323, 447], [447, 366], [316, 15], [15, 315], [315, 316], [331, 358], [358, 279], [279, 331], [317, 14], [14, 316], [316, 317], [8, 285], [285, 9], [9, 8], [277, 329], [329, 350], [350, 277], [253, 374], [374, 252], [252, 253], [319, 318], [318, 403], [403, 319], [351, 6], [6, 419], [419, 351], [324, 318], [318, 325], [325, 324], [397, 367], [367, 365], [365, 397], [288, 435], [435, 397], [397, 288], [278, 344], [344, 439], [439, 278], [310, 272], [272, 311], [311, 310], [248, 195], [195, 281], [281, 248], [375, 273], [273, 291], [291, 375], [175, 396], [396, 199], [199, 175], [312, 311], [311, 268], [268, 312], [276, 283], [283, 445], [445, 276], [390, 373], [373, 339], [339, 390], [295, 282], [282, 296], [296, 295], [448, 449], [449, 346], [346, 448], [356, 264], [264, 454], [454, 356], [337, 336], [336, 299], [299, 337], [337, 338], [338, 151], [151, 337], [294, 278], [278, 455], [455, 294], [308, 292], [292, 415], [415, 308], [429, 358], [358, 355], [355, 429], [265, 340], [340, 372], [372, 265], [352, 346], [346, 280], [280, 352], [295, 442], [442, 282], [282, 295], [354, 19], [19, 370], [370, 354], [285, 441], [441, 295], [295, 285], [195, 248], [248, 197], [197, 195], [457, 440], [440, 274], [274, 457], [301, 300], [300, 368], [368, 301], [417, 351], [351, 465], [465, 417], [251, 301], [301, 389], [389, 251], [394, 395], [395, 379], [379, 394], [399, 412], [412, 419], [419, 399], [410, 436], [436, 322], [322, 410], [326, 2], [2, 393], [393, 326], [354, 370], [370, 461], [461, 354], [393, 164], [164, 267], [267, 393], [268, 302], [302, 12], [12, 268], [312, 268], [268, 13], [13, 312], [298, 293], [293, 301], [301, 298], [265, 446], [446, 340], [340, 265], [280, 330], [330, 425], [425, 280], [322, 426], [426, 391], [391, 322], [420, 429], [429, 437], [437, 420], [393, 391], [391, 326], [326, 393], [344, 440], [440, 438], [438, 344], [458, 459], [459, 461], [461, 458], [364, 434], [434, 394], [394, 364], [428, 396], [396, 262], [262, 428], [274, 354], [354, 457], [457, 274], [317, 316], [316, 402], [402, 317], [316, 315], [315, 403], [403, 316], [315, 314], [314, 404], [404, 315], [314, 313], [313, 405], [405, 314], [313, 421], [421, 406], [406, 313], [323, 366], [366, 361], [361, 323], [292, 306], [306, 407], [407, 292], [306, 291], [291, 408], [408, 306], [291, 287], [287, 409], [409, 291], [287, 432], [432, 410], [410, 287], [427, 434], [434, 411], [411, 427], [372, 264], [264, 383], [383, 372], [459, 309], [309, 457], [457, 459], [366, 352], [352, 401], [401, 366], [1, 274], [274, 4], [4, 1], [418, 421], [421, 262], [262, 418], [331, 294], [294, 358], [358, 331], [435, 433], [433, 367], [367, 435], [392, 289], [289, 439], [439, 392], [328, 462], [462, 326], [326, 328], [94, 2], [2, 370], [370, 94], [289, 305], [305, 455], [455, 289], [339, 254], [254, 448], [448, 339], [359, 255], [255, 446], [446, 359], [254, 253], [253, 449], [449, 254], [253, 252], [252, 450], [450, 253], [252, 256], [256, 451], [451, 252], [256, 341], [341, 452], [452, 256], [414, 413], [413, 463], [463, 414], [286, 441], [441, 414], [414, 286], [286, 258], [258, 441], [441, 286], [258, 257], [257, 442], [442, 258], [257, 259], [259, 443], [443, 257], [259, 260], [260, 444], [444, 259], [260, 467], [467, 445], [445, 260], [309, 459], [459, 250], [250, 309], [305, 289], [289, 290], [290, 305], [305, 290], [290, 460], [460, 305], [401, 376], [376, 435], [435, 401], [309, 250], [250, 392], [392, 309], [376, 411], [411, 433], [433, 376], [453, 341], [341, 464], [464, 453], [357, 453], [453, 465], [465, 357], [343, 357], [357, 412], [412, 343], [437, 343], [343, 399], [399, 437], [344, 360], [360, 440], [440, 344], [420, 437], [437, 456], [456, 420], [360, 420], [420, 363], [363, 360], [361, 401], [401, 288], [288, 361], [265, 372], [372, 353], [353, 265], [390, 339], [339, 249], [249, 390], [339, 448], [448, 255], [255, 339]);
function Ya(t) {
    t.j = {
        faceLandmarks: [],
        faceBlendshapes: [],
        facialTransformationMatrixes: []
    }
}
var Ka = class extends Ra {
    constructor(t, e) {
        super(new La(t,e), "image_in", "norm_rect", !1),
        this.j = {
            faceLandmarks: [],
            faceBlendshapes: [],
            facialTransformationMatrixes: []
        },
        this.outputFacialTransformationMatrixes = this.outputFaceBlendshapes = !1,
        this.h = new Ls,
        t = new vs,
        En(this.h, 0, 1, t),
        this.v = new xs,
        En(this.h, 0, 3, this.v),
        this.u = new ws,
        En(this.h, 0, 2, this.u),
        On(this.u, 4, 1),
        Pn(this.u, 2, .5),
        Pn(this.v, 2, .5),
        Pn(this.h, 4, .5)
    }
    get baseOptions() {
        return _n(this.h, vs, 1)
    }
    set baseOptions(t) {
        En(this.h, 0, 1, t)
    }
    o(t) {
        return "numFaces"in t && On(this.u, 4, t.numFaces ?? 1),
        "minFaceDetectionConfidence"in t && Pn(this.u, 2, t.minFaceDetectionConfidence ?? .5),
        "minTrackingConfidence"in t && Pn(this.h, 4, t.minTrackingConfidence ?? .5),
        "minFacePresenceConfidence"in t && Pn(this.v, 2, t.minFacePresenceConfidence ?? .5),
        "outputFaceBlendshapes"in t && (this.outputFaceBlendshapes = !!t.outputFaceBlendshapes),
        "outputFacialTransformationMatrixes"in t && (this.outputFacialTransformationMatrixes = !!t.outputFacialTransformationMatrixes),
        this.l(t)
    }
    F(t, e) {
        return Ya(this),
        Pa(this, t, e),
        this.j
    }
    G(t, e, n) {
        return Ya(this),
        Ia(this, t, n, e),
        this.j
    }
    m() {
        var t = new Ei;
        wi(t, "image_in"),
        wi(t, "norm_rect"),
        bi(t, "face_landmarks");
        const e = new ni;
        In(e, Os, this.h);
        const n = new di;
        ui(n, "mediapipe.tasks.vision.face_landmarker.FaceLandmarkerGraph"),
        li(n, "IMAGE:image_in"),
        li(n, "NORM_RECT:norm_rect"),
        fi(n, "NORM_LANDMARKS:face_landmarks"),
        n.o(e),
        _i(t, n),
        this.g.attachProtoVectorListener("face_landmarks", ((t,e)=>{
            for (const e of t)
                t = $i(e),
                this.j.faceLandmarks.push(vo(t));
            Bo(this, e)
        }
        )),
        this.g.attachEmptyPacketListener("face_landmarks", (t=>{
            Bo(this, t)
        }
        )),
        this.outputFaceBlendshapes && (bi(t, "blendshapes"),
        fi(n, "BLENDSHAPES:blendshapes"),
        this.g.attachProtoVectorListener("blendshapes", ((t,e)=>{
            if (this.outputFaceBlendshapes)
                for (const e of t)
                    t = Mi(e),
                    this.j.faceBlendshapes.push(mo(t.g() ?? []));
            Bo(this, e)
        }
        )),
        this.g.attachEmptyPacketListener("blendshapes", (t=>{
            Bo(this, t)
        }
        ))),
        this.outputFacialTransformationMatrixes && (bi(t, "face_geometry"),
        fi(n, "FACE_GEOMETRY:face_geometry"),
        this.g.attachProtoVectorListener("face_geometry", ((t,e)=>{
            if (this.outputFacialTransformationMatrixes)
                for (const e of t)
                    (t = _n(ks(e), qi, 2)) && this.j.facialTransformationMatrixes.push({
                        rows: Fn(Sn(t, 1)) ?? 0,
                        columns: Fn(Sn(t, 2)) ?? 0,
                        data: cn(t, 3, me) ?? []
                    });
            Bo(this, e)
        }
        )),
        this.g.attachEmptyPacketListener("face_geometry", (t=>{
            Bo(this, t)
        }
        ))),
        t = t.g(),
        this.setGraph(new Uint8Array(t), !0)
    }
}
;
Ka.prototype.detectForVideo = Ka.prototype.G,
Ka.prototype.detect = Ka.prototype.F,
Ka.prototype.setOptions = Ka.prototype.o,
Ka.createFromModelPath = function(t, e) {
    return Ma(Ka, t, {
        baseOptions: {
            modelAssetPath: e
        }
    })
}
,
Ka.createFromModelBuffer = function(t, e) {
    return Ma(Ka, t, {
        baseOptions: {
            modelAssetBuffer: e
        }
    })
}
,
Ka.createFromOptions = function(t, e) {
    return Ma(Ka, t, e)
}
,
Ka.FACE_LANDMARKS_LIPS = Ba,
Ka.FACE_LANDMARKS_LEFT_EYE = Ua,
Ka.FACE_LANDMARKS_LEFT_EYEBROW = Na,
Ka.FACE_LANDMARKS_LEFT_IRIS = Ga,
Ka.FACE_LANDMARKS_RIGHT_EYE = ja,
Ka.FACE_LANDMARKS_RIGHT_EYEBROW = Va,
Ka.FACE_LANDMARKS_RIGHT_IRIS = za,
Ka.FACE_LANDMARKS_FACE_OVAL = Wa,
Ka.FACE_LANDMARKS_CONTOURS = Xa,
Ka.FACE_LANDMARKS_TESSELATION = Ha;
var $a = class extends Ra {
    constructor(t, e) {
        super(new La(t,e), "image_in", "norm_rect", !0),
        this.j = new Ps,
        t = new vs,
        En(this.j, 0, 1, t)
    }
    get baseOptions() {
        return _n(this.j, vs, 1)
    }
    set baseOptions(t) {
        En(this.j, 0, 1, t)
    }
    o(t) {
        return super.l(t)
    }
    Pa(t, e, n) {
        const r = "function" != typeof e ? e : {};
        if (this.h = "function" == typeof e ? e : n,
        Pa(this, t, r ?? {}),
        !this.h)
            return this.u
    }
    m() {
        var t = new Ei;
        wi(t, "image_in"),
        wi(t, "norm_rect"),
        bi(t, "stylized_image");
        const e = new ni;
        In(e, Is, this.j);
        const n = new di;
        ui(n, "mediapipe.tasks.vision.face_stylizer.FaceStylizerGraph"),
        li(n, "IMAGE:image_in"),
        li(n, "NORM_RECT:norm_rect"),
        fi(n, "STYLIZED_IMAGE:stylized_image"),
        n.o(e),
        _i(t, n),
        this.g.X("stylized_image", ((t,e)=>{
            var n = !this.h
              , r = t.data
              , i = t.width;
            const s = i * (t = t.height);
            if (r instanceof Uint8Array)
                if (r.length === 3 * s) {
                    const e = new Uint8ClampedArray(4 * s);
                    for (let t = 0; t < s; ++t)
                        e[4 * t] = r[3 * t],
                        e[4 * t + 1] = r[3 * t + 1],
                        e[4 * t + 2] = r[3 * t + 2],
                        e[4 * t + 3] = 255;
                    r = new ImageData(e,i,t)
                } else {
                    if (r.length !== 4 * s)
                        throw Error("Unsupported channel count: " + r.length / s);
                    r = new ImageData(new Uint8ClampedArray(r.buffer,r.byteOffset,r.length),i,t)
                }
            else if (!(r instanceof WebGLTexture))
                throw Error(`Unsupported format: ${r.constructor.name}`);
            i = new Ta([r],!1,!1,this.g.i.canvas,this.U,i,t),
            this.u = n = n ? i.clone() : i,
            this.h && this.h(n),
            Bo(this, e)
        }
        )),
        this.g.attachEmptyPacketListener("stylized_image", (t=>{
            this.u = null,
            this.h && this.h(null),
            Bo(this, t)
        }
        )),
        t = t.g(),
        this.setGraph(new Uint8Array(t), !0)
    }
}
;
$a.prototype.stylize = $a.prototype.Pa,
$a.prototype.setOptions = $a.prototype.o,
$a.createFromModelPath = function(t, e) {
    return Ma($a, t, {
        baseOptions: {
            modelAssetPath: e
        }
    })
}
,
$a.createFromModelBuffer = function(t, e) {
    return Ma($a, t, {
        baseOptions: {
            modelAssetBuffer: e
        }
    })
}
,
$a.createFromOptions = function(t, e) {
    return Ma($a, t, e)
}
;
var qa = Sa([0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [5, 9], [9, 10], [10, 11], [11, 12], [9, 13], [13, 14], [14, 15], [15, 16], [13, 17], [0, 17], [17, 18], [18, 19], [19, 20]);
function Ja(t) {
    t.gestures = [],
    t.landmarks = [],
    t.worldLandmarks = [],
    t.handedness = []
}
function Za(t) {
    return 0 === t.gestures.length ? {
        gestures: [],
        landmarks: [],
        worldLandmarks: [],
        handedness: [],
        handednesses: []
    } : {
        gestures: t.gestures,
        landmarks: t.landmarks,
        worldLandmarks: t.worldLandmarks,
        handedness: t.handedness,
        handednesses: t.handedness
    }
}
function Qa(t, e=!0) {
    const n = [];
    for (const i of t) {
        var r = Mi(i);
        t = [];
        for (const n of r.g())
            r = e && null != Sn(n, 1) ? Fn(Sn(n, 1)) : -1,
            t.push({
                score: Ln(n, 2) ?? 0,
                index: r,
                categoryName: xn(n, 3) ?? "" ?? "",
                displayName: xn(n, 4) ?? "" ?? ""
            });
        n.push(t)
    }
    return n
}
var tc = class extends Ra {
    constructor(t, e) {
        super(new La(t,e), "image_in", "norm_rect", !1),
        this.gestures = [],
        this.landmarks = [],
        this.worldLandmarks = [],
        this.handedness = [],
        this.v = new Xs,
        t = new vs,
        En(this.v, 0, 1, t),
        this.C = new zs,
        En(this.v, 0, 2, this.C),
        this.u = new js,
        En(this.C, 0, 3, this.u),
        this.h = new Ns,
        En(this.C, 0, 2, this.h),
        this.j = new Bs,
        En(this.v, 0, 3, this.j),
        Pn(this.h, 2, .5),
        Pn(this.C, 4, .5),
        Pn(this.u, 2, .5)
    }
    get baseOptions() {
        return _n(this.v, vs, 1)
    }
    set baseOptions(t) {
        En(this.v, 0, 1, t)
    }
    o(t) {
        if (On(this.h, 3, t.numHands ?? 1),
        "minHandDetectionConfidence"in t && Pn(this.h, 2, t.minHandDetectionConfidence ?? .5),
        "minTrackingConfidence"in t && Pn(this.C, 4, t.minTrackingConfidence ?? .5),
        "minHandPresenceConfidence"in t && Pn(this.u, 2, t.minHandPresenceConfidence ?? .5),
        t.cannedGesturesClassifierOptions) {
            var e = new Cs
              , n = go(t.cannedGesturesClassifierOptions, _n(this.j, Cs, 3)?.h());
            En(e, 0, 2, n),
            En(this.j, 0, 3, e)
        } else
            void 0 === t.cannedGesturesClassifierOptions && _n(this.j, Cs, 3)?.g();
        return t.customGesturesClassifierOptions ? (En(e = new Cs, 0, 2, n = go(t.customGesturesClassifierOptions, _n(this.j, Cs, 4)?.h())),
        En(this.j, 0, 4, e)) : void 0 === t.customGesturesClassifierOptions && _n(this.j, Cs, 4)?.g(),
        this.l(t)
    }
    Ka(t, e) {
        return Ja(this),
        Pa(this, t, e),
        Za(this)
    }
    La(t, e, n) {
        return Ja(this),
        Ia(this, t, n, e),
        Za(this)
    }
    m() {
        var t = new Ei;
        wi(t, "image_in"),
        wi(t, "norm_rect"),
        bi(t, "hand_gestures"),
        bi(t, "hand_landmarks"),
        bi(t, "world_hand_landmarks"),
        bi(t, "handedness");
        const e = new ni;
        In(e, Ks, this.v);
        const n = new di;
        ui(n, "mediapipe.tasks.vision.gesture_recognizer.GestureRecognizerGraph"),
        li(n, "IMAGE:image_in"),
        li(n, "NORM_RECT:norm_rect"),
        fi(n, "HAND_GESTURES:hand_gestures"),
        fi(n, "LANDMARKS:hand_landmarks"),
        fi(n, "WORLD_LANDMARKS:world_hand_landmarks"),
        fi(n, "HANDEDNESS:handedness"),
        n.o(e),
        _i(t, n),
        this.g.attachProtoVectorListener("hand_landmarks", ((t,e)=>{
            for (const e of t) {
                t = $i(e);
                const n = [];
                for (const e of bn(t, Hi, 1))
                    n.push({
                        x: Ln(e, 1) ?? 0,
                        y: Ln(e, 2) ?? 0,
                        z: Ln(e, 3) ?? 0
                    });
                this.landmarks.push(n)
            }
            Bo(this, e)
        }
        )),
        this.g.attachEmptyPacketListener("hand_landmarks", (t=>{
            Bo(this, t)
        }
        )),
        this.g.attachProtoVectorListener("world_hand_landmarks", ((t,e)=>{
            for (const e of t) {
                t = Xi(e);
                const n = [];
                for (const e of bn(t, Vi, 1))
                    n.push({
                        x: Ln(e, 1) ?? 0,
                        y: Ln(e, 2) ?? 0,
                        z: Ln(e, 3) ?? 0
                    });
                this.worldLandmarks.push(n)
            }
            Bo(this, e)
        }
        )),
        this.g.attachEmptyPacketListener("world_hand_landmarks", (t=>{
            Bo(this, t)
        }
        )),
        this.g.attachProtoVectorListener("hand_gestures", ((t,e)=>{
            this.gestures.push(...Qa(t, !1)),
            Bo(this, e)
        }
        )),
        this.g.attachEmptyPacketListener("hand_gestures", (t=>{
            Bo(this, t)
        }
        )),
        this.g.attachProtoVectorListener("handedness", ((t,e)=>{
            this.handedness.push(...Qa(t)),
            Bo(this, e)
        }
        )),
        this.g.attachEmptyPacketListener("handedness", (t=>{
            Bo(this, t)
        }
        )),
        t = t.g(),
        this.setGraph(new Uint8Array(t), !0)
    }
}
;
function ec(t) {
    return {
        landmarks: t.landmarks,
        worldLandmarks: t.worldLandmarks,
        handednesses: t.handedness,
        handedness: t.handedness
    }
}
tc.prototype.recognizeForVideo = tc.prototype.La,
tc.prototype.recognize = tc.prototype.Ka,
tc.prototype.setOptions = tc.prototype.o,
tc.createFromModelPath = function(t, e) {
    return Ma(tc, t, {
        baseOptions: {
            modelAssetPath: e
        }
    })
}
,
tc.createFromModelBuffer = function(t, e) {
    return Ma(tc, t, {
        baseOptions: {
            modelAssetBuffer: e
        }
    })
}
,
tc.createFromOptions = function(t, e) {
    return Ma(tc, t, e)
}
,
tc.HAND_CONNECTIONS = qa;
var nc = class extends Ra {
    constructor(t, e) {
        super(new La(t,e), "image_in", "norm_rect", !1),
        this.landmarks = [],
        this.worldLandmarks = [],
        this.handedness = [],
        this.j = new zs,
        t = new vs,
        En(this.j, 0, 1, t),
        this.u = new js,
        En(this.j, 0, 3, this.u),
        this.h = new Ns,
        En(this.j, 0, 2, this.h),
        On(this.h, 3, 1),
        Pn(this.h, 2, .5),
        Pn(this.u, 2, .5),
        Pn(this.j, 4, .5)
    }
    get baseOptions() {
        return _n(this.j, vs, 1)
    }
    set baseOptions(t) {
        En(this.j, 0, 1, t)
    }
    o(t) {
        return "numHands"in t && On(this.h, 3, t.numHands ?? 1),
        "minHandDetectionConfidence"in t && Pn(this.h, 2, t.minHandDetectionConfidence ?? .5),
        "minTrackingConfidence"in t && Pn(this.j, 4, t.minTrackingConfidence ?? .5),
        "minHandPresenceConfidence"in t && Pn(this.u, 2, t.minHandPresenceConfidence ?? .5),
        this.l(t)
    }
    F(t, e) {
        return this.landmarks = [],
        this.worldLandmarks = [],
        this.handedness = [],
        Pa(this, t, e),
        ec(this)
    }
    G(t, e, n) {
        return this.landmarks = [],
        this.worldLandmarks = [],
        this.handedness = [],
        Ia(this, t, n, e),
        ec(this)
    }
    m() {
        var t = new Ei;
        wi(t, "image_in"),
        wi(t, "norm_rect"),
        bi(t, "hand_landmarks"),
        bi(t, "world_hand_landmarks"),
        bi(t, "handedness");
        const e = new ni;
        In(e, Ys, this.j);
        const n = new di;
        ui(n, "mediapipe.tasks.vision.hand_landmarker.HandLandmarkerGraph"),
        li(n, "IMAGE:image_in"),
        li(n, "NORM_RECT:norm_rect"),
        fi(n, "LANDMARKS:hand_landmarks"),
        fi(n, "WORLD_LANDMARKS:world_hand_landmarks"),
        fi(n, "HANDEDNESS:handedness"),
        n.o(e),
        _i(t, n),
        this.g.attachProtoVectorListener("hand_landmarks", ((t,e)=>{
            for (const e of t)
                t = $i(e),
                this.landmarks.push(vo(t));
            Bo(this, e)
        }
        )),
        this.g.attachEmptyPacketListener("hand_landmarks", (t=>{
            Bo(this, t)
        }
        )),
        this.g.attachProtoVectorListener("world_hand_landmarks", ((t,e)=>{
            for (const e of t)
                t = Xi(e),
                this.worldLandmarks.push(_o(t));
            Bo(this, e)
        }
        )),
        this.g.attachEmptyPacketListener("world_hand_landmarks", (t=>{
            Bo(this, t)
        }
        )),
        this.g.attachProtoVectorListener("handedness", ((t,e)=>{
            var n = this.handedness
              , r = n.push;
            const i = [];
            for (const e of t) {
                t = Mi(e);
                const n = [];
                for (const e of t.g())
                    n.push({
                        score: Ln(e, 2) ?? 0,
                        index: Fn(Sn(e, 1)) ?? -1,
                        categoryName: xn(e, 3) ?? "" ?? "",
                        displayName: xn(e, 4) ?? "" ?? ""
                    });
                i.push(n)
            }
            r.call(n, ...i),
            Bo(this, e)
        }
        )),
        this.g.attachEmptyPacketListener("handedness", (t=>{
            Bo(this, t)
        }
        )),
        t = t.g(),
        this.setGraph(new Uint8Array(t), !0)
    }
}
;
nc.prototype.detectForVideo = nc.prototype.G,
nc.prototype.detect = nc.prototype.F,
nc.prototype.setOptions = nc.prototype.o,
nc.createFromModelPath = function(t, e) {
    return Ma(nc, t, {
        baseOptions: {
            modelAssetPath: e
        }
    })
}
,
nc.createFromModelBuffer = function(t, e) {
    return Ma(nc, t, {
        baseOptions: {
            modelAssetBuffer: e
        }
    })
}
,
nc.createFromOptions = function(t, e) {
    return Ma(nc, t, e)
}
,
nc.HAND_CONNECTIONS = qa;
var rc = class extends Ra {
    constructor(t, e) {
        super(new La(t,e), "input_image", "norm_rect", !0),
        this.j = {
            classifications: []
        },
        this.h = new $s,
        t = new vs,
        En(this.h, 0, 1, t)
    }
    get baseOptions() {
        return _n(this.h, vs, 1)
    }
    set baseOptions(t) {
        En(this.h, 0, 1, t)
    }
    o(t) {
        var e = go(t, _n(this.h, us, 2));
        return En(this.h, 0, 2, e),
        this.l(t)
    }
    sa(t, e) {
        return this.j = {
            classifications: []
        },
        Pa(this, t, e),
        this.j
    }
    ta(t, e, n) {
        return this.j = {
            classifications: []
        },
        Ia(this, t, n, e),
        this.j
    }
    m() {
        var t = new Ei;
        wi(t, "input_image"),
        wi(t, "norm_rect"),
        bi(t, "classifications");
        const e = new ni;
        In(e, qs, this.h);
        const n = new di;
        ui(n, "mediapipe.tasks.vision.image_classifier.ImageClassifierGraph"),
        li(n, "IMAGE:input_image"),
        li(n, "NORM_RECT:norm_rect"),
        fi(n, "CLASSIFICATIONS:classifications"),
        n.o(e),
        _i(t, n),
        this.g.attachProtoListener("classifications", ((t,e)=>{
            this.j = function(t) {
                const e = {
                    classifications: bn(t, Qi, 1).map((t=>mo(_n(t, Fi, 4)?.g() ?? [], Fn(Sn(t, 2)), xn(t, 3) ?? "")))
                };
                return null != Te(tn(t, 2)) && (e.timestampMs = Fn(Te(tn(t, 2)))),
                e
            }(ns(t)),
            Bo(this, e)
        }
        )),
        this.g.attachEmptyPacketListener("classifications", (t=>{
            Bo(this, t)
        }
        )),
        t = t.g(),
        this.setGraph(new Uint8Array(t), !0)
    }
}
;
rc.prototype.classifyForVideo = rc.prototype.ta,
rc.prototype.classify = rc.prototype.sa,
rc.prototype.setOptions = rc.prototype.o,
rc.createFromModelPath = function(t, e) {
    return Ma(rc, t, {
        baseOptions: {
            modelAssetPath: e
        }
    })
}
,
rc.createFromModelBuffer = function(t, e) {
    return Ma(rc, t, {
        baseOptions: {
            modelAssetBuffer: e
        }
    })
}
,
rc.createFromOptions = function(t, e) {
    return Ma(rc, t, e)
}
;
var ic = class extends Ra {
    constructor(t, e) {
        super(new La(t,e), "image_in", "norm_rect", !0),
        this.h = new Js,
        this.embeddings = {
            embeddings: []
        },
        t = new vs,
        En(this.h, 0, 1, t)
    }
    get baseOptions() {
        return _n(this.h, vs, 1)
    }
    set baseOptions(t) {
        En(this.h, 0, 1, t)
    }
    o(t) {
        var e = this.h
          , n = _n(this.h, fs, 2);
        return n = n ? n.clone() : new fs,
        void 0 !== t.l2Normalize ? Mn(n, 1, t.l2Normalize) : "l2Normalize"in t && nn(n, 1),
        void 0 !== t.quantize ? Mn(n, 2, t.quantize) : "quantize"in t && nn(n, 2),
        En(e, 0, 2, n),
        this.l(t)
    }
    xa(t, e) {
        return Pa(this, t, e),
        this.embeddings
    }
    ya(t, e, n) {
        return Ia(this, t, n, e),
        this.embeddings
    }
    m() {
        var t = new Ei;
        wi(t, "image_in"),
        wi(t, "norm_rect"),
        bi(t, "embeddings_out");
        const e = new ni;
        In(e, Zs, this.h);
        const n = new di;
        ui(n, "mediapipe.tasks.vision.image_embedder.ImageEmbedderGraph"),
        li(n, "IMAGE:image_in"),
        li(n, "NORM_RECT:norm_rect"),
        fi(n, "EMBEDDINGS:embeddings_out"),
        n.o(e),
        _i(t, n),
        this.g.attachProtoListener("embeddings_out", ((t,e)=>{
            t = hs(t),
            this.embeddings = function(t) {
                return {
                    embeddings: bn(t, ss, 1).map((t=>{
                        const e = {
                            headIndex: Fn(Sn(t, 3)) ?? -1,
                            headName: xn(t, 4) ?? "" ?? ""
                        };
                        if (void 0 !== vn(t, rs, gn(t, 1)))
                            t = cn(t = _n(t, rs, gn(t, 1)), 1, me),
                            e.floatEmbedding = t;
                        else {
                            const n = new Uint8Array(0);
                            e.quantizedEmbedding = _n(t, is, gn(t, 2))?.oa()?.qa() ?? n
                        }
                        return e
                    }
                    )),
                    timestampMs: Fn(Te(tn(t, 2)))
                }
            }(t),
            Bo(this, e)
        }
        )),
        this.g.attachEmptyPacketListener("embeddings_out", (t=>{
            Bo(this, t)
        }
        )),
        t = t.g(),
        this.setGraph(new Uint8Array(t), !0)
    }
}
;
ic.cosineSimilarity = function(t, e) {
    if (t.floatEmbedding && e.floatEmbedding)
        t = bo(t.floatEmbedding, e.floatEmbedding);
    else {
        if (!t.quantizedEmbedding || !e.quantizedEmbedding)
            throw Error("Cannot compute cosine similarity between quantized and float embeddings.");
        t = bo(wo(t.quantizedEmbedding), wo(e.quantizedEmbedding))
    }
    return t
}
,
ic.prototype.embedForVideo = ic.prototype.ya,
ic.prototype.embed = ic.prototype.xa,
ic.prototype.setOptions = ic.prototype.o,
ic.createFromModelPath = function(t, e) {
    return Ma(ic, t, {
        baseOptions: {
            modelAssetPath: e
        }
    })
}
,
ic.createFromModelBuffer = function(t, e) {
    return Ma(ic, t, {
        baseOptions: {
            modelAssetBuffer: e
        }
    })
}
,
ic.createFromOptions = function(t, e) {
    return Ma(ic, t, e)
}
;
var sc = class {
    constructor(t, e, n) {
        this.confidenceMasks = t,
        this.categoryMask = e,
        this.qualityScores = n
    }
    close() {
        this.confidenceMasks?.forEach((t=>{
            t.close()
        }
        )),
        this.categoryMask?.close()
    }
}
;
function oc(t) {
    t.categoryMask = void 0,
    t.confidenceMasks = void 0,
    t.qualityScores = void 0
}
function ac(t) {
    try {
        const e = new sc(t.confidenceMasks,t.categoryMask,t.qualityScores);
        if (!t.j)
            return e;
        t.j(e)
    } finally {
        Go(t)
    }
}
sc.prototype.close = sc.prototype.close;
var cc = class extends Ra {
    constructor(t, e) {
        super(new La(t,e), "image_in", "norm_rect", !1),
        this.u = [],
        this.outputCategoryMask = !1,
        this.outputConfidenceMasks = !0,
        this.h = new ro,
        this.v = new Qs,
        En(this.h, 0, 3, this.v),
        t = new vs,
        En(this.h, 0, 1, t)
    }
    get baseOptions() {
        return _n(this.h, vs, 1)
    }
    set baseOptions(t) {
        En(this.h, 0, 1, t)
    }
    o(t) {
        return void 0 !== t.displayNamesLocale ? nn(this.h, 2, Se(t.displayNamesLocale)) : "displayNamesLocale"in t && nn(this.h, 2),
        "outputCategoryMask"in t && (this.outputCategoryMask = t.outputCategoryMask ?? !1),
        "outputConfidenceMasks"in t && (this.outputConfidenceMasks = t.outputConfidenceMasks ?? !0),
        super.l(t)
    }
    V() {
        !function(t) {
            const e = bn(t.aa(), di, 1).filter((t=>(xn(t, 1) ?? "").includes("mediapipe.tasks.TensorsToSegmentationCalculator")));
            if (t.u = [],
            1 < e.length)
                throw Error("The graph has more than one mediapipe.tasks.TensorsToSegmentationCalculator.");
            1 === e.length && (_n(e[0], ni, 7)?.l()?.g() ?? new Map).forEach(((e,n)=>{
                t.u[Number(n)] = xn(e, 1) ?? ""
            }
            ))
        }(this)
    }
    ba(t, e, n) {
        const r = "function" != typeof e ? e : {};
        return this.j = "function" == typeof e ? e : n,
        oc(this),
        Pa(this, t, r),
        ac(this)
    }
    Na(t, e, n, r) {
        const i = "function" != typeof n ? n : {};
        return this.j = "function" == typeof n ? n : r,
        oc(this),
        Ia(this, t, i, e),
        ac(this)
    }
    Da() {
        return this.u
    }
    m() {
        var t = new Ei;
        wi(t, "image_in"),
        wi(t, "norm_rect");
        const e = new ni;
        In(e, io, this.h);
        const n = new di;
        ui(n, "mediapipe.tasks.vision.image_segmenter.ImageSegmenterGraph"),
        li(n, "IMAGE:image_in"),
        li(n, "NORM_RECT:norm_rect"),
        n.o(e),
        _i(t, n),
        Uo(this, t),
        this.outputConfidenceMasks && (bi(t, "confidence_masks"),
        fi(n, "CONFIDENCE_MASKS:confidence_masks"),
        No(this, "confidence_masks"),
        this.g.Y("confidence_masks", ((t,e)=>{
            this.confidenceMasks = t.map((t=>Ca(this, t, !this.j))),
            Bo(this, e)
        }
        )),
        this.g.attachEmptyPacketListener("confidence_masks", (t=>{
            this.confidenceMasks = [],
            Bo(this, t)
        }
        ))),
        this.outputCategoryMask && (bi(t, "category_mask"),
        fi(n, "CATEGORY_MASK:category_mask"),
        No(this, "category_mask"),
        this.g.X("category_mask", ((t,e)=>{
            this.categoryMask = Ca(this, t, !this.j),
            Bo(this, e)
        }
        )),
        this.g.attachEmptyPacketListener("category_mask", (t=>{
            this.categoryMask = void 0,
            Bo(this, t)
        }
        ))),
        bi(t, "quality_scores"),
        fi(n, "QUALITY_SCORES:quality_scores"),
        this.g.attachFloatVectorListener("quality_scores", ((t,e)=>{
            this.qualityScores = t,
            Bo(this, e)
        }
        )),
        this.g.attachEmptyPacketListener("quality_scores", (t=>{
            this.categoryMask = void 0,
            Bo(this, t)
        }
        )),
        t = t.g(),
        this.setGraph(new Uint8Array(t), !0)
    }
}
;
cc.prototype.getLabels = cc.prototype.Da,
cc.prototype.segmentForVideo = cc.prototype.Na,
cc.prototype.segment = cc.prototype.ba,
cc.prototype.setOptions = cc.prototype.o,
cc.createFromModelPath = function(t, e) {
    return Ma(cc, t, {
        baseOptions: {
            modelAssetPath: e
        }
    })
}
,
cc.createFromModelBuffer = function(t, e) {
    return Ma(cc, t, {
        baseOptions: {
            modelAssetBuffer: e
        }
    })
}
,
cc.createFromOptions = function(t, e) {
    return Ma(cc, t, e)
}
;
var hc = class {
    constructor(t, e, n) {
        this.confidenceMasks = t,
        this.categoryMask = e,
        this.qualityScores = n
    }
    close() {
        this.confidenceMasks?.forEach((t=>{
            t.close()
        }
        )),
        this.categoryMask?.close()
    }
}
;
hc.prototype.close = hc.prototype.close;
var uc = class extends Cn {
    constructor(t) {
        super(t)
    }
}
  , lc = [0, xr, -2]
  , fc = [0, wr, -3, Mr]
  , dc = [0, wr, -3, Mr, wr, -1]
  , pc = [0, dc]
  , gc = [0, pc, lc]
  , mc = [0, dc, lc]
  , yc = [0, dc, xr, -1]
  , vc = [0, yc, lc]
  , _c = [0, wr, -3, Mr, lc, -1]
  , wc = [0, wr, -3, Mr, Gr]
  , bc = class extends Cn {
    constructor(t) {
        super(t)
    }
}
  , Ec = [0, wr, -1, Mr]
  , Ac = class extends Cn {
    constructor() {
        super()
    }
}
;
Ac.A = [1];
var Tc = class extends Cn {
    constructor(t) {
        super(t)
    }
}
  , kc = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 15]
  , Sc = [0, kc, Br, dc, Br, mc, Br, pc, Br, gc, Br, Ec, Br, wc, Br, fc, Br, [0, Cr, wr, -2, Mr, xr, Mr, -1, 2, wr, lc], Br, yc, Br, vc, wr, lc, Cr, Br, _c, Br, [0, _r, Ec]]
  , xc = [0, Cr, xr, -1, Mr]
  , Fc = class extends Cn {
    constructor() {
        super()
    }
}
;
Fc.A = [1],
Fc.prototype.g = Xr([0, _r, Sc, Cr, xc]);
var Lc = class extends Ra {
    constructor(t, e) {
        super(new La(t,e), "image_in", "norm_rect_in", !1),
        this.outputCategoryMask = !1,
        this.outputConfidenceMasks = !0,
        this.h = new ro,
        this.v = new Qs,
        En(this.h, 0, 3, this.v),
        t = new vs,
        En(this.h, 0, 1, t)
    }
    get baseOptions() {
        return _n(this.h, vs, 1)
    }
    set baseOptions(t) {
        En(this.h, 0, 1, t)
    }
    o(t) {
        return "outputCategoryMask"in t && (this.outputCategoryMask = t.outputCategoryMask ?? !1),
        "outputConfidenceMasks"in t && (this.outputConfidenceMasks = t.outputConfidenceMasks ?? !0),
        super.l(t)
    }
    ba(t, e, n, r) {
        const i = "function" != typeof n ? n : {};
        this.j = "function" == typeof n ? n : r,
        this.qualityScores = this.categoryMask = this.confidenceMasks = void 0,
        n = this.N + 1,
        r = new Fc;
        const s = new Tc;
        var o = new uc;
        if (On(o, 1, 255),
        En(s, 0, 12, o),
        e.keypoint && e.scribble)
            throw Error("Cannot provide both keypoint and scribble.");
        if (e.keypoint) {
            var a = new bc;
            Mn(a, 3, !0),
            Pn(a, 1, e.keypoint.x),
            Pn(a, 2, e.keypoint.y),
            An(s, 5, kc, a)
        } else {
            if (!e.scribble)
                throw Error("Must provide either a keypoint or a scribble.");
            for (a of (o = new Ac,
            e.scribble))
                Mn(e = new bc, 3, !0),
                Pn(e, 1, a.x),
                Pn(e, 2, a.y),
                kn(o, bc, e);
            An(s, 15, kc, o)
        }
        kn(r, Tc, s),
        this.g.addProtoToStream(r.g(), "drishti.RenderData", "roi_in", n),
        Pa(this, t, i);
        t: {
            try {
                const t = new hc(this.confidenceMasks,this.categoryMask,this.qualityScores);
                if (!this.j) {
                    var c = t;
                    break t
                }
                this.j(t)
            } finally {
                Go(this)
            }
            c = void 0
        }
        return c
    }
    m() {
        var t = new Ei;
        wi(t, "image_in"),
        wi(t, "roi_in"),
        wi(t, "norm_rect_in");
        const e = new ni;
        In(e, io, this.h);
        const n = new di;
        ui(n, "mediapipe.tasks.vision.interactive_segmenter.InteractiveSegmenterGraph"),
        li(n, "IMAGE:image_in"),
        li(n, "ROI:roi_in"),
        li(n, "NORM_RECT:norm_rect_in"),
        n.o(e),
        _i(t, n),
        Uo(this, t),
        this.outputConfidenceMasks && (bi(t, "confidence_masks"),
        fi(n, "CONFIDENCE_MASKS:confidence_masks"),
        No(this, "confidence_masks"),
        this.g.Y("confidence_masks", ((t,e)=>{
            this.confidenceMasks = t.map((t=>Ca(this, t, !this.j))),
            Bo(this, e)
        }
        )),
        this.g.attachEmptyPacketListener("confidence_masks", (t=>{
            this.confidenceMasks = [],
            Bo(this, t)
        }
        ))),
        this.outputCategoryMask && (bi(t, "category_mask"),
        fi(n, "CATEGORY_MASK:category_mask"),
        No(this, "category_mask"),
        this.g.X("category_mask", ((t,e)=>{
            this.categoryMask = Ca(this, t, !this.j),
            Bo(this, e)
        }
        )),
        this.g.attachEmptyPacketListener("category_mask", (t=>{
            this.categoryMask = void 0,
            Bo(this, t)
        }
        ))),
        bi(t, "quality_scores"),
        fi(n, "QUALITY_SCORES:quality_scores"),
        this.g.attachFloatVectorListener("quality_scores", ((t,e)=>{
            this.qualityScores = t,
            Bo(this, e)
        }
        )),
        this.g.attachEmptyPacketListener("quality_scores", (t=>{
            this.categoryMask = void 0,
            Bo(this, t)
        }
        )),
        t = t.g(),
        this.setGraph(new Uint8Array(t), !0)
    }
}
;
Lc.prototype.segment = Lc.prototype.ba,
Lc.prototype.setOptions = Lc.prototype.o,
Lc.createFromModelPath = function(t, e) {
    return Ma(Lc, t, {
        baseOptions: {
            modelAssetPath: e
        }
    })
}
,
Lc.createFromModelBuffer = function(t, e) {
    return Ma(Lc, t, {
        baseOptions: {
            modelAssetBuffer: e
        }
    })
}
,
Lc.createFromOptions = function(t, e) {
    return Ma(Lc, t, e)
}
;
var Mc = class extends Ra {
    constructor(t, e) {
        super(new La(t,e), "input_frame_gpu", "norm_rect", !1),
        this.j = {
            detections: []
        },
        this.h = new so,
        t = new vs,
        En(this.h, 0, 1, t)
    }
    get baseOptions() {
        return _n(this.h, vs, 1)
    }
    set baseOptions(t) {
        En(this.h, 0, 1, t)
    }
    o(t) {
        return void 0 !== t.displayNamesLocale ? nn(this.h, 2, Se(t.displayNamesLocale)) : "displayNamesLocale"in t && nn(this.h, 2),
        void 0 !== t.maxResults ? On(this.h, 3, t.maxResults) : "maxResults"in t && nn(this.h, 3),
        void 0 !== t.scoreThreshold ? Pn(this.h, 4, t.scoreThreshold) : "scoreThreshold"in t && nn(this.h, 4),
        void 0 !== t.categoryAllowlist ? fn(this.h, 5, t.categoryAllowlist) : "categoryAllowlist"in t && nn(this.h, 5),
        void 0 !== t.categoryDenylist ? fn(this.h, 6, t.categoryDenylist) : "categoryDenylist"in t && nn(this.h, 6),
        this.l(t)
    }
    F(t, e) {
        return this.j = {
            detections: []
        },
        Pa(this, t, e),
        this.j
    }
    G(t, e, n) {
        return this.j = {
            detections: []
        },
        Ia(this, t, n, e),
        this.j
    }
    m() {
        var t = new Ei;
        wi(t, "input_frame_gpu"),
        wi(t, "norm_rect"),
        bi(t, "detections");
        const e = new ni;
        In(e, oo, this.h);
        const n = new di;
        ui(n, "mediapipe.tasks.vision.ObjectDetectorGraph"),
        li(n, "IMAGE:input_frame_gpu"),
        li(n, "NORM_RECT:norm_rect"),
        fi(n, "DETECTIONS:detections"),
        n.o(e),
        _i(t, n),
        this.g.attachProtoVectorListener("detections", ((t,e)=>{
            for (const e of t)
                t = ji(e),
                this.j.detections.push(yo(t));
            Bo(this, e)
        }
        )),
        this.g.attachEmptyPacketListener("detections", (t=>{
            Bo(this, t)
        }
        )),
        t = t.g(),
        this.setGraph(new Uint8Array(t), !0)
    }
}
;
Mc.prototype.detectForVideo = Mc.prototype.G,
Mc.prototype.detect = Mc.prototype.F,
Mc.prototype.setOptions = Mc.prototype.o,
Mc.createFromModelPath = async function(t, e) {
    return Ma(Mc, t, {
        baseOptions: {
            modelAssetPath: e
        }
    })
}
,
Mc.createFromModelBuffer = function(t, e) {
    return Ma(Mc, t, {
        baseOptions: {
            modelAssetBuffer: e
        }
    })
}
,
Mc.createFromOptions = function(t, e) {
    return Ma(Mc, t, e)
}
;
function Oc(t) {
    t.landmarks = [],
    t.worldLandmarks = [],
    t.v = void 0
}
function Pc(t) {
    try {
        const e = new class {
            constructor(t, e, n) {
                this.landmarks = t,
                this.worldLandmarks = e,
                this.g = n
            }
            close() {
                this.g?.forEach((t=>{
                    t.close()
                }
                ))
            }
        }
        (t.landmarks,t.worldLandmarks,t.v);
        if (!t.u)
            return e;
        t.u(e)
    } finally {
        Go(t)
    }
}
var Ic = class extends Ra {
    constructor(t, e) {
        super(new La(t,e), "image_in", "norm_rect", !1),
        this.landmarks = [],
        this.worldLandmarks = [],
        this.outputSegmentationMasks = !1,
        this.h = new lo,
        t = new vs,
        En(this.h, 0, 1, t),
        this.C = new ho,
        En(this.h, 0, 3, this.C),
        this.j = new ao,
        En(this.h, 0, 2, this.j),
        On(this.j, 4, 1),
        Pn(this.j, 2, .5),
        Pn(this.C, 2, .5),
        Pn(this.h, 4, .5)
    }
    get baseOptions() {
        return _n(this.h, vs, 1)
    }
    set baseOptions(t) {
        En(this.h, 0, 1, t)
    }
    o(t) {
        return "numPoses"in t && On(this.j, 4, t.numPoses ?? 1),
        "minPoseDetectionConfidence"in t && Pn(this.j, 2, t.minPoseDetectionConfidence ?? .5),
        "minTrackingConfidence"in t && Pn(this.h, 4, t.minTrackingConfidence ?? .5),
        "minPosePresenceConfidence"in t && Pn(this.C, 2, t.minPosePresenceConfidence ?? .5),
        "outputSegmentationMasks"in t && (this.outputSegmentationMasks = t.outputSegmentationMasks ?? !1),
        this.l(t)
    }
    F(t, e, n) {
        const r = "function" != typeof e ? e : {};
        return this.u = "function" == typeof e ? e : n,
        Oc(this),
        Pa(this, t, r),
        Pc(this)
    }
    G(t, e, n, r) {
        const i = "function" != typeof n ? n : {};
        return this.u = "function" == typeof n ? n : r,
        Oc(this),
        Ia(this, t, i, e),
        Pc(this)
    }
    m() {
        var t = new Ei;
        wi(t, "image_in"),
        wi(t, "norm_rect"),
        bi(t, "normalized_landmarks"),
        bi(t, "world_landmarks"),
        bi(t, "segmentation_masks");
        const e = new ni;
        In(e, po, this.h);
        const n = new di;
        ui(n, "mediapipe.tasks.vision.pose_landmarker.PoseLandmarkerGraph"),
        li(n, "IMAGE:image_in"),
        li(n, "NORM_RECT:norm_rect"),
        fi(n, "NORM_LANDMARKS:normalized_landmarks"),
        fi(n, "WORLD_LANDMARKS:world_landmarks"),
        n.o(e),
        _i(t, n),
        Uo(this, t),
        this.g.attachProtoVectorListener("normalized_landmarks", ((t,e)=>{
            this.landmarks = [];
            for (const e of t)
                t = $i(e),
                this.landmarks.push(vo(t));
            Bo(this, e)
        }
        )),
        this.g.attachEmptyPacketListener("normalized_landmarks", (t=>{
            this.landmarks = [],
            Bo(this, t)
        }
        )),
        this.g.attachProtoVectorListener("world_landmarks", ((t,e)=>{
            this.worldLandmarks = [];
            for (const e of t)
                t = Xi(e),
                this.worldLandmarks.push(_o(t));
            Bo(this, e)
        }
        )),
        this.g.attachEmptyPacketListener("world_landmarks", (t=>{
            this.worldLandmarks = [],
            Bo(this, t)
        }
        )),
        this.outputSegmentationMasks && (fi(n, "SEGMENTATION_MASK:segmentation_masks"),
        No(this, "segmentation_masks"),
        this.g.Y("segmentation_masks", ((t,e)=>{
            this.v = t.map((t=>Ca(this, t, !this.u))),
            Bo(this, e)
        }
        )),
        this.g.attachEmptyPacketListener("segmentation_masks", (t=>{
            this.v = [],
            Bo(this, t)
        }
        ))),
        t = t.g(),
        this.setGraph(new Uint8Array(t), !0)
    }
}
;
Ic.prototype.detectForVideo = Ic.prototype.G,
Ic.prototype.detect = Ic.prototype.F,
Ic.prototype.setOptions = Ic.prototype.o,
Ic.createFromModelPath = function(t, e) {
    return Ma(Ic, t, {
        baseOptions: {
            modelAssetPath: e
        }
    })
}
,
Ic.createFromModelBuffer = function(t, e) {
    return Ma(Ic, t, {
        baseOptions: {
            modelAssetBuffer: e
        }
    })
}
,
Ic.createFromOptions = function(t, e) {
    return Ma(Ic, t, e)
}
,
Ic.POSE_CONNECTIONS = Sa([0, 1], [1, 2], [2, 3], [3, 7], [0, 4], [4, 5], [5, 6], [6, 8], [9, 10], [11, 12], [11, 13], [13, 15], [15, 17], [15, 19], [15, 21], [17, 19], [12, 14], [14, 16], [16, 18], [16, 20], [16, 22], [18, 20], [11, 23], [12, 24], [23, 24], [23, 25], [24, 26], [25, 27], [26, 28], [27, 29], [28, 30], [29, 31], [30, 32], [27, 31], [28, 32]);
export {pa as DrawingUtils, Da as FaceDetector, Ka as FaceLandmarker, $a as FaceStylizer, So as FilesetResolver, tc as GestureRecognizer, nc as HandLandmarker, rc as ImageClassifier, ic as ImageEmbedder, cc as ImageSegmenter, sc as ImageSegmenterResult, Lc as InteractiveSegmenter, hc as InteractiveSegmenterResult, Ta as MPImage, aa as MPMask, Mc as ObjectDetector, Ic as PoseLandmarker, jo as TaskRunner, Ra as VisionTaskRunner};
//# sourceMappingURL=vision_bundle_mjs.js.map