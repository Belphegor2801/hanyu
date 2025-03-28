import $ from "jquery";

var HanziLookup = HanziLookup || {};

// AnalyzedCharacter class
HanziLookup.AnalyzedCharacter = function (r) {
    "use strict";
    var v = 12.5,
        f = 1.1,
        s = 1.09,
        M = Number.MAX_SAFE_INTEGER,
        l = Number.MIN_SAFE_INTEGER,
        E = Number.MAX_SAFE_INTEGER,
        c = Number.MIN_SAFE_INTEGER,
        p = [],
        N = 0;

    function t(r) {
        for (var t = 0; t != r.length; ++t)
            for (var n = 0; n != r[t].length; ++n) {
                var a = r[t][n];
                a[0] < E && (E = a[0]);
                a[0] > c && (c = a[0]);
                a[1] < M && (M = a[1]);
                a[1] > l && (l = a[1]);
            }
    }

    function n(r, t) {
        var n = r[0] - t[0],
            a = r[1] - t[1];
        return Math.sqrt(n * n + a * a);
    }

    function a(r, t) {
        var a = c - E,
            o = l - M,
            u = a > o ? a * a : o * o,
            e = Math.sqrt(u + u),
            h = n(r, t) / e;
        return Math.min(h, 1);
    }

    function o(r, t) {
        var n = r[0] - t[0],
            a = r[1] - t[1],
            o = Math.atan2(a, n);
        return Math.PI - o;
    }

    function u(r) {
        for (var t = [], a = 0; a != r.length; ++a) t.push(!1);
        var o = 0,
            u = 0,
            e = 1;
        t[0] = !0;
        for (var h = n(r[u], r[e]), i = h, a = 2; a < r.length; ++a) {
            var M = r[a],
                l = n(r[e], M);
            h += l;
            i += l;
            var E = n(r[o], M),
                c = n(r[u], M);
            (h > f * E || i > s * c) && (t[o] && n(r[o], r[e]) < v && (t[o] = !1), t[e] = !0, i = l, u = e);
            h = l;
            o = e;
            e = a;
        }
        t[e] = !0;
        t[o] && n(r[o], r[e]) < v && 0 != o && (t[o] = !1);
        for (var p = [], a = 0; a != t.length; ++a) t[a] && p.push(a);
        return p;
    }

    function e(r, t) {
        var n,
            a = (r[0] + t[0]) / 2,
            o = (r[1] + t[1]) / 2;
        if (c - E > l - M) {
            n = c - E;
            var u = l - M;
            a -= E;
            o = o - M + (n - u) / 2;
        } else {
            n = l - M;
            var e = c - E;
            a = a - E + (n - e) / 2;
            o -= M;
        }
        return [a / n, o / n];
    }

    function h(r, t) {
        for (var n = [], u = 0, h = 0; h != t.length; ++h) {
            var i = t[h];
            if (i != u) {
                var v = o(r[u], r[i]);
                v = Math.round(256 * v / Math.PI / 2);
                256 == v && (v = 0);
                var f = a(r[u], r[i]);
                f = Math.round(255 * f);
                var s = e(r[u], r[i]);
                s[0] = Math.round(15 * s[0]);
                s[1] = Math.round(15 * s[1]);
                n.push(new HanziLookup.SubStroke(v, f, s[0], s[1]));
                u = i;
            }
        }
        return n;
    }

    function i(r) {
        for (var t = 0; t != r.length; ++t) {
            var n = u(r[t]),
                a = h(r[t], n);
            N += a.length;
            p.push(new HanziLookup.AnalyzedStroke(r[t], n, a));
        }
    }

    t(r);
    i(r);
    this.top = M <= 256 ? M : 0;
    this.bottom = l >= 0 ? l : 256;
    this.left = E <= 256 ? E : 0;
    this.right = c >= 0 ? c : 256;
    this.analyzedStrokes = p;
    this.subStrokeCount = N;
};

// AnalyzedStroke class
HanziLookup.AnalyzedStroke = function (o, i, t) {
    "use strict";
    this.points = o;
    this.pivotIndexes = i;
    this.subStrokes = t;
};

// CharacterMatch class
HanziLookup.CharacterMatch = function (a, o) {
    "use strict";
    this.character = a;
    this.score = o;
};

// CubicCurve2D class
HanziLookup.CubicCurve2D = function (t, n, r, u, o, e, a, i) {
    "use strict";
    var w = t,
        l = n,
        g = r,
        k = u,
        z = o,
        C = e,
        F = a,
        H = i;

    function c() {
        return F - w - f() - p();
    }

    function h() {
        return H - l - s() - M();
    }

    function f() {
        return 3 * (z - g) - p();
    }

    function s() {
        return 3 * (C - k) - M();
    }

    function p() {
        return 3 * (g - w);
    }

    function M() {
        return 3 * (k - l);
    }

    function v(t) {
        var n = [],
            r = c(),
            u = f(),
            o = p(),
            e = w - t,
            a = (3 * o / r - u * u / (r * r)) / 3,
            i = (2 * u * u * u / (r * r * r) - 9 * u * o / (r * r) + 27 * e / r) / 27,
            h = i * i / 4 + a * a * a / 27;
        if (h > 0) {
            var s = 0 - i,
                M = s / 2 + Math.sqrt(h),
                v = Math.pow(M, .3333333333333333),
                l = v,
                g = s / 2 - Math.sqrt(h),
                k = Math.pow(0 - g, .3333333333333333),
                z = k,
                C = l - z - u / (3 * r);
            n.push(C);
        } else if (0 == a && 0 == i && 0 == h) {
            n.push(-Math.pow(e / r, 1 / 3));
        } else {
            var F = Math.sqrt(i * i / 4 - h),
                H = Math.pow(F, 1 / 3),
                L = Math.acos(-i / (2 * F)),
                q = H * -1,
                x = Math.cos(L / 3),
                N = Math.sqrt(3) * Math.sin(L / 3),
                X = u / (3 * r) * -1;
            n.push(2 * H * Math.cos(L / 3) - u / (3 * r));
            n.push(q * (x + N) + X);
            n.push(q * (x - N) + X);
        }
        return n;
    }

    return {
        x1: function () {
            return w;
        },
        x2: function () {
            return F;
        },
        getYOnCurve: function (t) {
            var n = h(),
                r = s(),
                u = M(),
                o = t * t,
                e = t * o,
                a = n * e + r * o + u * t + l;
            return a;
        },
        solveForX: function (t) {
            return v(t);
        },
        getFirstSolutionForX: function (t) {
            for (var n = v(t), r = 0; r != n.length; ++r) {
                var u = n[r];
                if (u >= -1e-8 && u <= 1.00000001) return u >= 0 && u <= 1 ? u : u < 0 ? 0 : 1;
            }
            return NaN;
        }
    };
};

// decodeCompact function
HanziLookup.decodeCompact = function (r) {
    "use strict";
    var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        t = new Uint8Array(256),
        a = 0;

    for (a = 0; a < e.length; a++) t[e.charCodeAt(a)] = a;

    var n, o, h, c, A = .75 * r.length,
        d = r.length,
        i = 0;

    "=" === r[r.length - 1] && (A--, "=" === r[r.length - 2] && A--);

    var u = new ArrayBuffer(A),
        C = new Uint8Array(u);

    for (a = 0; a < d; a += 4) {
        n = t[r.charCodeAt(a)],
            o = t[r.charCodeAt(a + 1)],
            h = t[r.charCodeAt(a + 2)],
            c = t[r.charCodeAt(a + 3)],
            C[i++] = n << 2 | o >> 4,
            C[i++] = (15 & o) << 4 | h >> 2,
            C[i++] = (3 & h) << 6 | 63 & c;
    }
    return C;
};

// DrawingBoard class
HanziLookup.DrawingBoard = function (e, t, boardSize) {
    "use strict";
    var n, h, l, f,
        v = e,
        g = t,
        c = 5,
        u = !1,
        k = -1,
        p = -1,
        d = [],
        T = null,
        m = null,
        b = !1,
        S = !1,
        y = !1;

    function n() {
        h.clearRect(0, 0, h.canvas.width, h.canvas.height);
        h.setLineDash([1, 1]);
        h.lineWidth = .5;
        h.strokeStyle = "grey";
        h.beginPath();
        h.moveTo(0, 0);
        h.lineTo(h.canvas.width, 0);
        h.lineTo(h.canvas.width, h.canvas.height);
        h.lineTo(0, h.canvas.height);
        h.lineTo(0, 0);
        h.stroke();
        h.beginPath();
        h.moveTo(0, 0);
        h.lineTo(h.canvas.width, h.canvas.height);
        h.stroke();
        h.beginPath();
        h.moveTo(h.canvas.width, 0);
        h.lineTo(0, h.canvas.height);
        h.stroke();
        h.beginPath();
        h.moveTo(h.canvas.width / 2, 0);
        h.lineTo(h.canvas.width / 2, h.canvas.height);
        h.stroke();
        h.beginPath();
        h.moveTo(0, h.canvas.height / 2);
        h.lineTo(h.canvas.width, h.canvas.height / 2);
        h.stroke();
    }

    function o(e, t) {
        u = !0;
        T = [];
        f = [e, t];
        T.push(f);
        h.strokeStyle = "grey";
        h.setLineDash([]);
        h.lineWidth = c;
        h.beginPath();
        h.moveTo(e, t);
        l = new Date();
    }

    function i(e, t) {
        if (!((new Date).getTime() - l < 50)) {
            l = new Date;
            var n = [e, t];
            n[0] == f[0] && n[1] == f[1] || (T.push(n), f = n, h.lineTo(e, t), h.stroke());
        }
    }

    function a(e, t) {
        u = !1;
        e != -1 && (h.lineTo(e, t), h.stroke(), T.push([e, t]), d.push(T), T = [], g && g());
    }

    function s() {
        for (var e in d) {
            h.strokeStyle = "grey";
            h.setLineDash([]);
            h.lineWidth = c;
            h.beginPath();
            h.moveTo(d[e][0][0], d[e][0][1]);
            for (var t = d[e].length, n = 0; n < t - 1; n++) {
                h.lineTo(d[e][n][0], d[e][n][1]), h.stroke();
            }
            h.lineTo(d[e][t - 1][0], d[e][t - 1][1]), h.stroke();
        }
        if (m) {
            if (S && (h.strokeStyle = "blue", h.setLineDash([1, 1]), h.lineWidth = .5, h.beginPath(), h.moveTo(m.left, m.top), h.lineTo(m.right, m.top), h.stroke(), h.lineTo(m.right, m.bottom), h.stroke(), h.lineTo(m.left, m.bottom), h.stroke(), h.lineTo(m.left, m.top), h.stroke()), b)
                for (var o = 0; o != m.xStrokes.length; ++o) {
                    var i = m.xStrokes[o];
                    h.strokeStyle = "red", h.setLineDash([]), h.lineWidth = 1, h.beginPath(), h.moveTo(i[0][0], i[0][1]), h.arc(i[0][0], i[0][1], 3, 0, 2 * Math.PI, !0), h.fillStyle = "red", h.fill();
                    for (var a = 1; a < i.length; ++a) {
                        h.lineTo(i[a][0], i[a][1]), h.stroke(), h.beginPath(), h.arc(i[a][0], i[a][1], 3, 0, 2 * Math.PI, !0), h.fillStyle = "red", h.fill();
                    }
                }
            if (y && m.yStrokes)
                for (var o = 0; o != m.yStrokes.length; ++o) {
                    var s = m.yStrokes[o];
                    h.strokeStyle = "#e6cee6", h.setLineDash([]), h.lineWidth = c, h.beginPath(), h.moveTo(s[0][0], s[0][1]);
                    for (var a = 1; a < s.length; ++a) h.lineTo(s[a][0], s[a][1]), h.stroke();
                }
            if (m.zStrokes)
                for (var o = 0; o != m.zStrokes.length; ++o) {
                    var i = m.zStrokes[o];
                    h.strokeStyle = "green", h.setLineDash([]), h.lineWidth = 1, h.beginPath(), h.moveTo(i[0][0], i[0][1]), h.arc(i[0][0], i[0][1], 3, 0, 2 * Math.PI, !0), h.fillStyle = "green", h.fill();
                    for (var a = 1; a < i.length; ++a) {
                        h.lineTo(i[a][0], i[a][1]), h.stroke(), h.beginPath(), h.arc(i[a][0], i[a][1], 3, 0, 2 * Math.PI, !0), h.fillStyle = "green", h.fill();
                    }
                }
        }
    }

    var r = $(`<canvas class="stroke-input-canvas" width="${boardSize}" height="${boardSize}"></canvas>`);
    v.append(r);
    h = r[0].getContext("2d");

    r.mousemove(function (e) {
        if (u) {
            var t = e.pageX - $(this).offset().left,
                n = e.pageY - $(this).offset().top;
            i(t, n);
        }
    });

    r.mousedown(function (e) {
        var t = e.pageX - $(this).offset().left,
            n = e.pageY - $(this).offset().top;
        o(t, n);
    }).mouseup(function (e) {
        var t = e.pageX - $(this).offset().left,
            n = e.pageY - $(this).offset().top;
        a(t, n);
    });

    r.bind("touchmove", function (e) {
        if (u) {
            e.preventDefault();
            var t = e.originalEvent.touches[0].pageX - $(this).offset().left;
            k = t;
            var n = e.originalEvent.touches[0].pageY - $(this).offset().top;
            p = n, i(t, n);
        }
    });

    r.bind("touchstart", function (e) {
        e.preventDefault(), document.activeElement.blur();
        var t = e.originalEvent.touches[0].pageX - $(this).offset().left,
            n = e.originalEvent.touches[0].pageY - $(this).offset().top;
        o(t, n);
    }).bind("touchend", function (e) {
        e.preventDefault(), document.activeElement.blur(), a(k, p), k = p = -1;
    });

    n();

    return {
        clearCanvas: function () {
            d.length = 0;
        },
        undoStroke: function () {
            0 != d.length && (d.length = d.length - 1);
        },
        cloneStrokes: function () {
            for (var e = [], t = 0; t != d.length; ++t) {
                for (var n = [], o = 0; o != d[t].length; ++o) n.push([d[t][o][0], d[t][o][1]]);
                e.push(n);
            }
            return e;
        },
        redraw: function () {
            n(), s();
        },
        enrich: function (e, t, o, i) {
            m = e, S = o, b = t, y = i, n(), s();
        }
    };
};

// HanziLookup data initialization
HanziLookup.data = {};

// MatchCollector class
HanziLookup.MatchCollector = function (r) {
    "use strict";
    function n(r) {
        var n;
        for (n = 0; n < c; ++n)
            if (u[n].score < r) return n;
        return n;
    }

    function t(r) {
        for (var n = -1, t = 0; t != c; ++t)
            if (u[t].character == r.character) {
                n = t;
                break;
            }
        if (n == -1) return !1;
        if (r.score <= u[n].score) return !0;
        for (var t = n; t < u.length - 1; ++t) u[t] = u[t + 1];
        return --c, !1;
    }

    function e(r) {
        if (!(c == u.length && r.score <= u[u.length - 1].score || t(r))) {
            for (var e = n(r.score), o = u.length - 1; o > e; --o) u[o] = u[o - 1];
            u[e] = r, c < u.length && ++c;
        }
    }

    function o() {
        return u.slice(0, c);
    }

    for (var c = 0, u = [], f = 0; f != r; ++f) u.push(null);
    return {
        fileMatch: function (r) {
            e(r);
        },
        getMatches: function () {
            return o();
        }
    };
};

// Constants
HanziLookup.MAX_CHARACTER_STROKE_COUNT = 48;
HanziLookup.MAX_CHARACTER_SUB_STROKE_COUNT = 64;
HanziLookup.DEFAULT_LOOSENESS = .15;
HanziLookup.AVG_SUBSTROKE_LENGTH = .33;
HanziLookup.SKIP_PENALTY_MULTIPLIER = 1.75;
HanziLookup.CORRECT_NUM_STROKES_BONUS = .1;
HanziLookup.CORRECT_NUM_STROKES_CAP = 10;

// Matcher class
HanziLookup.Matcher = function (o, n) {
    "use strict";
    function a(o, n, a) {
        R = 0, E = 0;
        var u = new HanziLookup.MatchCollector(n);
        if (0 == o.analyzedStrokes.length) return u.getMatches();
        for (var e = [], _ = 0; _ != o.analyzedStrokes.length; ++_) {
            for (var C = o.analyzedStrokes[_], T = 0; T != C.subStrokes.length; ++T) e.push(C.subStrokes[T]);
        }
        for (var S = o.analyzedStrokes.length, L = o.subStrokeCount, H = r(S), k = Math.max(S - H, 1), h = Math.min(S + H, HanziLookup.MAX_CHARACTER_STROKE_COUNT), M = t(L), A = Math.max(L - M, 1), p = Math.min(L + M, HanziLookup.MAX_CHARACTER_SUB_STROKE_COUNT), v = 0; v != O.length; ++v) {
            var z = O[v],
                f = z[1],
                c = z[2];
            if (!(f < k || f > h || c.length < A || c.length > p)) {
                var s = i(S, e, M, z);
                u.fileMatch(s);
            }
        }
        a(u.getMatches());
    }

    function r(o) {
        if (0 == M) return 0;
        if (1 == M) return HanziLookup.MAX_CHARACTER_STROKE_COUNT;
        var n = .35,
            a = .4 * o,
            r = .6,
            t = o,
            u = new HanziLookup.CubicCurve2D(0, 0, n, a, r, t, 1, HanziLookup.MAX_CHARACTER_STROKE_COUNT),
            i = u.getFirstSolutionForX(M);
        return Math.round(u.getYOnCurve(i));
    }

    function t(o) {
        if (1 == M) return HanziLookup.MAX_CHARACTER_SUB_STROKE_COUNT;
        var n = .25 * o,
            a = .4,
            r = 1.5 * n,
            t = .75,
            u = 1.5 * r,
            i = new HanziLookup.CubicCurve2D(0, n, a, r, t, u, 1, HanziLookup.MAX_CHARACTER_SUB_STROKE_COUNT),
            e = i.getFirstSolutionForX(M);
        return Math.round(i.getYOnCurve(e));
    }

    function u() {
        for (var o = HanziLookup.MAX_CHARACTER_SUB_STROKE_COUNT + 1, n = [], a = 0; a < o; a++) {
            n.push([]);
            for (var r = 0; r < o; r++) n[a].push(0);
        }
        for (var a = 0; a < o; a++) {
            var t = -HanziLookup.AVG_SUBSTROKE_LENGTH * HanziLookup.SKIP_PENALTY_MULTIPLIER * a;
            n[a][0] = t, n[0][a] = t;
        }
        return n;
    }

    function i(o, n, a, r) {
        ++R;
        var t = e(o, n, a, r);
        if (o == r[1] && o < HanziLookup.CORRECT_NUM_STROKES_CAP) {
            var u = HanziLookup.CORRECT_NUM_STROKES_BONUS * Math.max(HanziLookup.CORRECT_NUM_STROKES_CAP - o, 0) / HanziLookup.CORRECT_NUM_STROKES_CAP;
            t += u * t;
        }
        return new HanziLookup.CharacterMatch(r[0], t);
    }

    function e(o, n, a, r) {
        for (var t = 0; t < n.length; t++)
            for (var u = n[t].direction, i = n[t].length, e = [n[t].centerX, n[t].centerY], C = 0; C < r[2]; C++) {
                var T = Number.NEGATIVE_INFINITY;
                if (Math.abs(t - C) <= a) {
                    var S = A[r[3] + 3 * C],
                        L = A[r[3] + 3 * C + 1],
                        R = null,
                        E = A[r[3] + 3 * C + 2];
                    E > 0 && (R = [(240 & E) >>> 4, 15 & E]);
                    var H = p[t][C + 1] - i / 256 * HanziLookup.SKIP_PENALTY_MULTIPLIER,
                        k = p[t + 1][C] - L / 256 * HanziLookup.SKIP_PENALTY_MULTIPLIER,
                        h = Math.max(H, k),
                        M = _(u, i, S, L, e, R),
                        O = p[t][C];
                    T = Math.max(O + M, h);
                }
                p[t + 1][C + 1] = T;
            }
        return p[n.length][r[2]];
    }

    function _(o, n, a, r, t, u) {
        ++E;
        var i = S(o, a, n),
            e = L(n, r),
            _ = e * i;
        if (u) {
            var C = t[0] - u[0],
                T = t[1] - u[1],
                R = h[C * C + T * T];
            _ > 0 ? _ *= R : _ /= R;
        }
        return _;
    }

    function C() {
        var o = new HanziLookup.CubicCurve2D(0, 1, .5, 1, .25, (-2), 1, 1);
        H = T(o, 256);
        var n = new HanziLookup.CubicCurve2D(0, 0, .25, 1, .75, 1, 1, 1);
        k = T(n, 129), h = [];
        for (var a = 0; a <= 450; ++a) h.push(1 - Math.sqrt(a) / 22);
    }

    function T(o, n) {
        for (var a = o.x1(), r = o.x2(), t = r - a, u = a, i = t / n, e = [], _ = 0; _ < n; _++) {
            var C = o.getFirstSolutionForX(Math.min(u, r));
            e.push(o.getYOnCurve(C)), u += i;
        }
        return e;
    }

    function S(o, n, a) {
        var r = Math.abs(o - n),
            t = H[r];
        if (a < 64) {
            var u = Math.min(1, 1 - t),
                i = u * (1 - a / 64);
            t += i;
        }
        return t;
    }

    function L(o, n) {
        var a;
        return a = o > n ? Math.round((n << 7) / o) : Math.round((o << 7) / n), k[a];
    }

    var R, E, H, k, h, M = n || HanziLookup.DEFAULT_LOOSENESS,
        O = HanziLookup.data[o].chars,
        A = HanziLookup.data[o].substrokes,
        p = u();

    C();
    return {
        match: function (o, n, r) {
            a(o, n, r);
        },
        getCounters: function () {
            return {
                chars: R,
                subStrokes: E
            };
        }
    };
};

// StrokeInputOverlay class
HanziLookup.StrokeInputOverlay = function (t, o, i, s, h, r, e) {
    "use strict";
    this.top = t;
    this.right = o;
    this.bottom = i;
    this.left = s;
    this.xStrokes = h;
    this.yStrokes = r;
    this.zStrokes = e;
};

// SubStroke class
HanziLookup.SubStroke = function (t, i, n, o) {
    "use strict";
    this.direction = t;
    this.length = i;
    this.centerX = n;
    this.centerY = o;
};

export default HanziLookup;