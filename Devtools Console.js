    window.inspect = (() => {
  function e(e, o) {
    var c = { seen: [], stylize: t };
    return (
      arguments.length >= 3 && (c.depth = arguments[2]),
      arguments.length >= 4 && (c.colors = arguments[3]),
      n(o) ? (c.showHidden = o) : o && b(c, o),
      r(c.showHidden) && (c.showHidden = !1),
      r(c.depth) && (c.depth = 2),
      r(c.colors) && (c.colors = !1),
      r(c.customInspect) && (c.customInspect = !0),
      c.colors && (c.stylize = i),
      d(c, e, c.depth)
    );
  }
  function t(e, t) {
    return e;
  }
  function n(e) {
    return 'boolean' == typeof e;
  }
  function r(e) {
    return void 0 === e;
  }
  function i(t, n) {
    var r = e.styles[n];
    return r ? '[' + e.colors[r][0] + 'm' + t + '[' + e.colors[r][1] + 'm' : t;
  }
  function o(e) {
    return 'function' == typeof e;
  }
  function c(e) {
    return 'string' == typeof e;
  }
  function u(e) {
    return null === e;
  }
  function l(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }
  function s(e) {
    return a(e) && '[object RegExp]' === y(e);
  }
  function a(e) {
    return 'object' == typeof e && null !== e;
  }
  function p(e) {
    return a(e) && ('[object Error]' === y(e) || e instanceof Error);
  }
  function f(e) {
    return a(e) && '[object Date]' === y(e);
  }
  function y(e) {
    return Object.prototype.toString.call(e);
  }
  function g(e) {
    return '[' + Error.prototype.toString.call(e) + ']';
  }
  function d(t, i, a) {
    if (
      t.customInspect &&
      i &&
      o(i.inspect) &&
      i.inspect !== e &&
      (!i.constructor || i.constructor.prototype !== i)
    ) {
      var y = i.inspect(a, t);
      return c(y) || (y = d(t, y, a)), y;
    }
    var b = (function (e, t) {
      if (r(t)) return e.stylize('undefined', 'undefined');
      if (c(t)) {
        var i =
          "'" +
          JSON.stringify(t)
            .replace(/^"|"$/g, '')
            .replace(/'/g, "\\'")
            .replace(/\\"/g, '"') +
          "'";
        return e.stylize(i, 'string');
      }
      if (((o = t), 'number' == typeof o)) return e.stylize('' + t, 'number');
      var o;
      if (n(t)) return e.stylize('' + t, 'boolean');
      if (u(t)) return e.stylize('null', 'null');
    })(t, i);
    if (b) return b;
    var m = Object.keys(i),
      v = (function (e) {
        var t = {};
        return (
          e.forEach(function (e, n) {
            t[e] = !0;
          }),
          t
        );
      })(m);
    try {
      t.showHidden &&
        Object.getOwnPropertyNames &&
        (m = Object.getOwnPropertyNames(i));
    } catch (e) {}
    if (p(i) && (m.indexOf('message') >= 0 || m.indexOf('description') >= 0))
      return g(i);
    if (0 === m.length) {
      if (o(i)) {
        var O = i.name ? ': ' + i.name : '';
        return t.stylize('[Function' + O + ']', 'special');
      }
      if (s(i)) return t.stylize(RegExp.prototype.toString.call(i), 'regexp');
      if (f(i)) return t.stylize(Date.prototype.toString.call(i), 'date');
      if (p(i)) return g(i);
    }
    var z,
      j = '',
      w = !1,
      S = ['{', '}'];
    (Array.isArray(i) && ((w = !0), (S = ['[', ']'])), o(i)) &&
      (j = ' [Function' + (i.name ? ': ' + i.name : '') + ']');
    return (
      s(i) && (j = ' ' + RegExp.prototype.toString.call(i)),
      f(i) && (j = ' ' + Date.prototype.toUTCString.call(i)),
      p(i) && (j = ' ' + g(i)),
      0 !== m.length || (w && 0 != i.length)
        ? a < 0
          ? s(i)
            ? t.stylize(RegExp.prototype.toString.call(i), 'regexp')
            : t.stylize('[Object]', 'special')
          : (t.seen.push(i),
            (z = w
              ? (function (e, t, n, r, i) {
                  for (var o = [], c = 0, u = t.length; c < u; ++c)
                    l(t, String(c))
                      ? o.push(h(e, t, n, r, String(c), !0))
                      : o.push('');
                  return (
                    i.forEach(function (i) {
                      i.match(/^\d+$/) || o.push(h(e, t, n, r, i, !0));
                    }),
                    o
                  );
                })(t, i, a, v, m)
              : m.map(function (e) {
                  return h(t, i, a, v, e, w);
                })),
            t.seen.pop(),
            (function (e, t, n) {
              if (
                e.reduce(function (e, t) {
                  return (
                    t.indexOf('\n') >= 0 && 0,
                    e + t.replace(/\u001b\[\d\d?m/g, '').length + 1
                  );
                }, 0) > 60
              )
                return (
                  n[0] +
                  ('' === t ? '' : t + '\n ') +
                  ' ' +
                  e.join(',\n ') +
                  ' ' +
                  n[1]
                );
              return n[0] + t + ' ' + e.join(', ') + ' ' + n[1];
            })(z, j, S))
        : S[0] + j + S[1]
    );
  }
  function h(e, t, n, i, o, c) {
    var s, a, p;
    p = { value: void 0 };
    try {
      p.value = t[o];
    } catch (e) {}
    try {
      Object.getOwnPropertyDescriptor &&
        (p = Object.getOwnPropertyDescriptor(t, o) || p);
    } catch (e) {}
    if (
      (p.get
        ? (a = p.set
            ? e.stylize('[Getter/Setter]', 'special')
            : e.stylize('[Getter]', 'special'))
        : p.set && (a = e.stylize('[Setter]', 'special')),
      l(i, o) || (s = '[' + o + ']'),
      a ||
        (e.seen.indexOf(p.value) < 0
          ? (a = u(n) ? d(e, p.value, null) : d(e, p.value, n - 1)).indexOf(
              '\n'
            ) > -1 &&
            (a = c
              ? a
                  .split('\n')
                  .map(function (e) {
                    return ' ' + e;
                  })
                  .join('\n')
                  .substr(2)
              : '\n' +
                a
                  .split('\n')
                  .map(function (e) {
                    return ' ' + e;
                  })
                  .join('\n'))
          : (a = e.stylize('[Circular]', 'special'))),
      r(s))
    ) {
      if (c && o.match(/^\d+$/)) return a;
      (s = JSON.stringify('' + o)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)
        ? ((s = s.substr(1, s.length - 2)), (s = e.stylize(s, 'name')))
        : ((s = s
            .replace(/'/g, "\\'")
            .replace(/\\"/g, '"')
            .replace(/(^"|"$)/g, "'")),
          (s = e.stylize(s, 'string')));
    }
    return s + ': ' + a;
  }
  function b(e, t) {
    if (!t || !a(t)) return e;
    for (var n = Object.keys(t), r = n.length; r--; ) e[n[r]] = t[n[r]];
    return e;
  }
  return (
    (e.colors = {
      bold: [1, 22],
      italic: [3, 23],
      underline: [4, 24],
      inverse: [7, 27],
      white: [37, 39],
      grey: [90, 39],
      black: [30, 39],
      blue: [34, 39],
      cyan: [36, 39],
      green: [32, 39],
      magenta: [35, 39],
      red: [31, 39],
      yellow: [33, 39],
    }),
    (e.styles = {
      special: 'cyan',
      number: 'yellow',
      boolean: 'yellow',
      undefined: 'grey',
      null: 'bold',
      string: 'green',
      date: 'magenta',
      regexp: 'red',
    }),
    e
  );
})();


var pan = document.createElement('div');
pan.id = 'pan';
pan.style.display = 'none';
pan.style.position = 'absolute';
pan.style.left = '20px';
pan.style.top = '50px';
pan.style.width = '500px';
pan.style.height = '300px';
pan.style.backgroundColor = '#2B2B2B';
pan.style.color = 'white';
pan.style.fontFamily = 'Consolas, monospace';
pan.style.fontSize = '14px';
pan.style.padding = '10px';
pan.style.borderRadius = '5px';
pan.style.overflowY = 'auto';

var table = document.createElement('table');
table.style.width = '100%';

var tr = document.createElement('tr');

var td1 = document.createElement('td');
var lab_text = document.createElement('div');
lab_text.id = 'lab_text';
lab_text.textContent = '>';
lab_text.style.position = 'absolute';
lab_text.style.color = '#569CD6';
lab_text.style.marginRight = '5px';
td1.appendChild(lab_text);

var td2 = document.createElement('td');
var tb_text = document.createElement('input');
tb_text.style.position = 'absolute';
tb_text.id = 'tb_text';
tb_text.style.width = '470px';
tb_text.style.padding = '5px';
tb_text.style.borderRadius = '3px';
tb_text.style.backgroundColor = '#1E1E1E';
tb_text.style.color = 'white';
tb_text.style.border = '1px solid #333';
tb_text.style.fontFamily = 'Consolas, monospace';
tb_text.style.bottom = '8px';
tb_text.style.right = '8px';
td2.appendChild(tb_text);

tr.appendChild(td1);
tr.appendChild(td2);

table.appendChild(tr);

var p = document.createElement('p');
p.id = 'p';
p.style.position = 'absolute';
p.style.bottom = '32px';
p.style.left = '32px';
p.style.paddingTop = '10px';
p.style.marginTop = '10px';
p.style.borderTop = '1px solid #333';
lab_text.style.bottom = '12px';
lab_text.style.left = '10px';
pan.appendChild(table);
pan.appendChild(p);

var show = document.createElement('button');
show.id = 'show';
show.style.position = 'absolute';
show.style.left = '20px';
show.style.top = '20px';
show.textContent = 'Show panel...';
show.style.padding = '8px 12px';
show.style.border = 'none';
show.style.borderRadius = '0px';
show.style.backgroundColor = '#000';
show.style.color = 'white';
show.style.fontFamily = 'Arial, sans-serif';
show.style.fontSize = '14px';
show.style.cursor = 'pointer';
show.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';

document.body.appendChild(show);
document.body.appendChild(pan);

var panVisible = false;
show.onclick = function() {
  if (panVisible) {
    pan.style.display = 'none';
    panVisible = false;
    show.innerText = 'Show panel...';
  } else {
    pan.style.display = '';
    panVisible = true;
    show.innerText = 'Hide panel...';
  }
};

let inputText = document.getElementById('tb_text');
let pText = document.getElementById('p');

inputText.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    try {
      pText.innerHTML += `<span style="color:#00aa00;">${window.inspect(eval(inputText.value))}</span><br>`;
    } catch (err) {
      pText.innerHTML += `<span style="color:#d12345;">${typeof err} ${err}</span><br>`;
    }
    event.preventDefault();
    inputText.value = '';
  }
});
