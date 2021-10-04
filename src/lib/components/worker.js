/*
  @license
	Rollup.js v2.33.1
	Mon, 02 Nov 2020 06:50:50 GMT - commit d861c91c068bc4e64d84db3b84232d3fb7f1d073


	https://github.com/rollup/rollup

	Released under the MIT License.
*/
for (
	var t = {}, s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=', i = 0;
	i < s.length;
	i++
)
	t[s.charCodeAt(i)] = i;
function n(e, t, s) {
	4 === s
		? e.push([t[0], t[1], t[2], t[3]])
		: 5 === s
		? e.push([t[0], t[1], t[2], t[3], t[4]])
		: 1 === s && e.push([t[0]]);
}
function r(e) {
	var t = '';
	e = e < 0 ? (-e << 1) | 1 : e << 1;
	do {
		var i = 31 & e;
		(e >>>= 5) > 0 && (i |= 32), (t += s[i]);
	} while (e > 0);
	return t;
}
var a = function e(t) {
	this.bits = t instanceof e ? t.bits.slice() : [];
};
(a.prototype.add = function (e) {
	this.bits[e >> 5] |= 1 << (31 & e);
}),
	(a.prototype.has = function (e) {
		return !!(this.bits[e >> 5] & (1 << (31 & e)));
	});
var o = function (e, t, s) {
	(this.start = e),
		(this.end = t),
		(this.original = s),
		(this.intro = ''),
		(this.outro = ''),
		(this.content = s),
		(this.storeName = !1),
		(this.edited = !1),
		Object.defineProperties(this, {
			previous: { writable: !0, value: null },
			next: { writable: !0, value: null }
		});
};
(o.prototype.appendLeft = function (e) {
	this.outro += e;
}),
	(o.prototype.appendRight = function (e) {
		this.intro = this.intro + e;
	}),
	(o.prototype.clone = function () {
		var e = new o(this.start, this.end, this.original);
		return (
			(e.intro = this.intro),
			(e.outro = this.outro),
			(e.content = this.content),
			(e.storeName = this.storeName),
			(e.edited = this.edited),
			e
		);
	}),
	(o.prototype.contains = function (e) {
		return this.start < e && e < this.end;
	}),
	(o.prototype.eachNext = function (e) {
		for (var t = this; t; ) e(t), (t = t.next);
	}),
	(o.prototype.eachPrevious = function (e) {
		for (var t = this; t; ) e(t), (t = t.previous);
	}),
	(o.prototype.edit = function (e, t, s) {
		return (
			(this.content = e),
			s || ((this.intro = ''), (this.outro = '')),
			(this.storeName = t),
			(this.edited = !0),
			this
		);
	}),
	(o.prototype.prependLeft = function (e) {
		this.outro = e + this.outro;
	}),
	(o.prototype.prependRight = function (e) {
		this.intro = e + this.intro;
	}),
	(o.prototype.split = function (e) {
		var t = e - this.start,
			s = this.original.slice(0, t),
			i = this.original.slice(t);
		this.original = s;
		var n = new o(e, this.end, i);
		return (
			(n.outro = this.outro),
			(this.outro = ''),
			(this.end = e),
			this.edited ? (n.edit('', !1), (this.content = '')) : (this.content = s),
			(n.next = this.next),
			n.next && (n.next.previous = n),
			(n.previous = this),
			(this.next = n),
			n
		);
	}),
	(o.prototype.toString = function () {
		return this.intro + this.content + this.outro;
	}),
	(o.prototype.trimEnd = function (e) {
		if (((this.outro = this.outro.replace(e, '')), this.outro.length)) return !0;
		var t = this.content.replace(e, '');
		return t.length
			? (t !== this.content && this.split(this.start + t.length).edit('', void 0, !0), !0)
			: (this.edit('', void 0, !0),
			  (this.intro = this.intro.replace(e, '')),
			  !!this.intro.length || void 0);
	}),
	(o.prototype.trimStart = function (e) {
		if (((this.intro = this.intro.replace(e, '')), this.intro.length)) return !0;
		var t = this.content.replace(e, '');
		return t.length
			? (t !== this.content && (this.split(this.end - t.length), this.edit('', void 0, !0)), !0)
			: (this.edit('', void 0, !0),
			  (this.outro = this.outro.replace(e, '')),
			  !!this.outro.length || void 0);
	});
var h = function () {
	throw new Error('Unsupported environment: `window.btoa` or `Buffer` should be supported.');
};
'undefined' != typeof window && 'function' == typeof window.btoa
	? (h = function (e) {
			return window.btoa(unescape(encodeURIComponent(e)));
	  })
	: 'function' == typeof Buffer &&
	  (h = function (e) {
			return Buffer.from(e, 'utf-8').toString('base64');
	  });
var l = function (e) {
	(this.version = 3),
		(this.file = e.file),
		(this.sources = e.sources),
		(this.sourcesContent = e.sourcesContent),
		(this.names = e.names),
		(this.mappings = (function (e) {
			for (var t = 0, s = 0, i = 0, n = 0, a = '', o = 0; o < e.length; o++) {
				var h = e[o];
				if ((o > 0 && (a += ';'), 0 !== h.length)) {
					for (var l = 0, c = [], u = 0, d = h; u < d.length; u++) {
						var p = d[u],
							f = r(p[0] - l);
						(l = p[0]),
							p.length > 1 &&
								((f += r(p[1] - t) + r(p[2] - s) + r(p[3] - i)),
								(t = p[1]),
								(s = p[2]),
								(i = p[3])),
							5 === p.length && ((f += r(p[4] - n)), (n = p[4])),
							c.push(f);
					}
					a += c.join(',');
				}
			}
			return a;
		})(e.mappings));
};
function c(e) {
	var t = e.split('\n'),
		s = t.filter(function (e) {
			return /^\t+/.test(e);
		}),
		i = t.filter(function (e) {
			return /^ {2,}/.test(e);
		});
	if (0 === s.length && 0 === i.length) return null;
	if (s.length >= i.length) return '\t';
	var n = i.reduce(function (e, t) {
		var s = /^ +/.exec(t)[0].length;
		return Math.min(s, e);
	}, 1 / 0);
	return new Array(n + 1).join(' ');
}
function u(e, t) {
	var s = e.split(/[/\\]/),
		i = t.split(/[/\\]/);
	for (s.pop(); s[0] === i[0]; ) s.shift(), i.shift();
	if (s.length) for (var n = s.length; n--; ) s[n] = '..';
	return s.concat(i).join('/');
}
(l.prototype.toString = function () {
	return JSON.stringify(this);
}),
	(l.prototype.toUrl = function () {
		return 'data:application/json;charset=utf-8;base64,' + h(this.toString());
	});
var d = Object.prototype.toString;
function p(e) {
	return '[object Object]' === d.call(e);
}
function f(e) {
	for (var t = e.split('\n'), s = [], i = 0, n = 0; i < t.length; i++)
		s.push(n), (n += t[i].length + 1);
	return function (e) {
		for (var t = 0, i = s.length; t < i; ) {
			var n = (t + i) >> 1;
			e < s[n] ? (i = n) : (t = n + 1);
		}
		var r = t - 1;
		return { line: r, column: e - s[r] };
	};
}
var m = function (e) {
	(this.hires = e),
		(this.generatedCodeLine = 0),
		(this.generatedCodeColumn = 0),
		(this.raw = []),
		(this.rawSegments = this.raw[this.generatedCodeLine] = []),
		(this.pending = null);
};
(m.prototype.addEdit = function (e, t, s, i) {
	if (t.length) {
		var n = [this.generatedCodeColumn, e, s.line, s.column];
		i >= 0 && n.push(i), this.rawSegments.push(n);
	} else this.pending && this.rawSegments.push(this.pending);
	this.advance(t), (this.pending = null);
}),
	(m.prototype.addUneditedChunk = function (e, t, s, i, n) {
		for (var r = t.start, a = !0; r < t.end; )
			(this.hires || a || n.has(r)) &&
				this.rawSegments.push([this.generatedCodeColumn, e, i.line, i.column]),
				'\n' === s[r]
					? ((i.line += 1),
					  (i.column = 0),
					  (this.generatedCodeLine += 1),
					  (this.raw[this.generatedCodeLine] = this.rawSegments = []),
					  (this.generatedCodeColumn = 0),
					  (a = !0))
					: ((i.column += 1), (this.generatedCodeColumn += 1), (a = !1)),
				(r += 1);
		this.pending = null;
	}),
	(m.prototype.advance = function (e) {
		if (e) {
			var t = e.split('\n');
			if (t.length > 1) {
				for (var s = 0; s < t.length - 1; s++)
					this.generatedCodeLine++, (this.raw[this.generatedCodeLine] = this.rawSegments = []);
				this.generatedCodeColumn = 0;
			}
			this.generatedCodeColumn += t[t.length - 1].length;
		}
	});
var g = '\n',
	y = { insertLeft: !1, insertRight: !1, storeName: !1 },
	x = function (e, t) {
		void 0 === t && (t = {});
		var s = new o(0, e.length, e);
		Object.defineProperties(this, {
			original: { writable: !0, value: e },
			outro: { writable: !0, value: '' },
			intro: { writable: !0, value: '' },
			firstChunk: { writable: !0, value: s },
			lastChunk: { writable: !0, value: s },
			lastSearchedChunk: { writable: !0, value: s },
			byStart: { writable: !0, value: {} },
			byEnd: { writable: !0, value: {} },
			filename: { writable: !0, value: t.filename },
			indentExclusionRanges: { writable: !0, value: t.indentExclusionRanges },
			sourcemapLocations: { writable: !0, value: new a() },
			storedNames: { writable: !0, value: {} },
			indentStr: { writable: !0, value: c(e) }
		}),
			(this.byStart[0] = s),
			(this.byEnd[e.length] = s);
	};
(x.prototype.addSourcemapLocation = function (e) {
	this.sourcemapLocations.add(e);
}),
	(x.prototype.append = function (e) {
		if ('string' != typeof e) throw new TypeError('outro content must be a string');
		return (this.outro += e), this;
	}),
	(x.prototype.appendLeft = function (e, t) {
		if ('string' != typeof t) throw new TypeError('inserted content must be a string');
		this._split(e);
		var s = this.byEnd[e];
		return s ? s.appendLeft(t) : (this.intro += t), this;
	}),
	(x.prototype.appendRight = function (e, t) {
		if ('string' != typeof t) throw new TypeError('inserted content must be a string');
		this._split(e);
		var s = this.byStart[e];
		return s ? s.appendRight(t) : (this.outro += t), this;
	}),
	(x.prototype.clone = function () {
		for (
			var e = new x(this.original, { filename: this.filename }),
				t = this.firstChunk,
				s = (e.firstChunk = e.lastSearchedChunk = t.clone());
			t;

		) {
			(e.byStart[s.start] = s), (e.byEnd[s.end] = s);
			var i = t.next,
				n = i && i.clone();
			n && ((s.next = n), (n.previous = s), (s = n)), (t = i);
		}
		return (
			(e.lastChunk = s),
			this.indentExclusionRanges && (e.indentExclusionRanges = this.indentExclusionRanges.slice()),
			(e.sourcemapLocations = new a(this.sourcemapLocations)),
			(e.intro = this.intro),
			(e.outro = this.outro),
			e
		);
	}),
	(x.prototype.generateDecodedMap = function (e) {
		var t = this;
		e = e || {};
		var s = Object.keys(this.storedNames),
			i = new m(e.hires),
			n = f(this.original);
		return (
			this.intro && i.advance(this.intro),
			this.firstChunk.eachNext(function (e) {
				var r = n(e.start);
				e.intro.length && i.advance(e.intro),
					e.edited
						? i.addEdit(0, e.content, r, e.storeName ? s.indexOf(e.original) : -1)
						: i.addUneditedChunk(0, e, t.original, r, t.sourcemapLocations),
					e.outro.length && i.advance(e.outro);
			}),
			{
				file: e.file ? e.file.split(/[/\\]/).pop() : null,
				sources: [e.source ? u(e.file || '', e.source) : null],
				sourcesContent: e.includeContent ? [this.original] : [null],
				names: s,
				mappings: i.raw
			}
		);
	}),
	(x.prototype.generateMap = function (e) {
		return new l(this.generateDecodedMap(e));
	}),
	(x.prototype.getIndentString = function () {
		return null === this.indentStr ? '\t' : this.indentStr;
	}),
	(x.prototype.indent = function (e, t) {
		var s = /^[^\r\n]/gm;
		if ((p(e) && ((t = e), (e = void 0)), '' === (e = void 0 !== e ? e : this.indentStr || '\t')))
			return this;
		var i = {};
		(t = t || {}).exclude &&
			('number' == typeof t.exclude[0] ? [t.exclude] : t.exclude).forEach(function (e) {
				for (var t = e[0]; t < e[1]; t += 1) i[t] = !0;
			});
		var n = !1 !== t.indentStart,
			r = function (t) {
				return n ? '' + e + t : ((n = !0), t);
			};
		this.intro = this.intro.replace(s, r);
		for (var a = 0, o = this.firstChunk; o; ) {
			var h = o.end;
			if (o.edited)
				i[a] ||
					((o.content = o.content.replace(s, r)),
					o.content.length && (n = '\n' === o.content[o.content.length - 1]));
			else
				for (a = o.start; a < h; ) {
					if (!i[a]) {
						var l = this.original[a];
						'\n' === l
							? (n = !0)
							: '\r' !== l &&
							  n &&
							  ((n = !1),
							  a === o.start
									? o.prependRight(e)
									: (this._splitChunk(o, a), (o = o.next).prependRight(e)));
					}
					a += 1;
				}
			(a = o.end), (o = o.next);
		}
		return (this.outro = this.outro.replace(s, r)), this;
	}),
	(x.prototype.insert = function () {
		throw new Error(
			'magicString.insert(...) is deprecated. Use prependRight(...) or appendLeft(...)'
		);
	}),
	(x.prototype.insertLeft = function (e, t) {
		return (
			y.insertLeft ||
				(console.warn(
					'magicString.insertLeft(...) is deprecated. Use magicString.appendLeft(...) instead'
				),
				(y.insertLeft = !0)),
			this.appendLeft(e, t)
		);
	}),
	(x.prototype.insertRight = function (e, t) {
		return (
			y.insertRight ||
				(console.warn(
					'magicString.insertRight(...) is deprecated. Use magicString.prependRight(...) instead'
				),
				(y.insertRight = !0)),
			this.prependRight(e, t)
		);
	}),
	(x.prototype.move = function (e, t, s) {
		if (s >= e && s <= t) throw new Error('Cannot move a selection inside itself');
		this._split(e), this._split(t), this._split(s);
		var i = this.byStart[e],
			n = this.byEnd[t],
			r = i.previous,
			a = n.next,
			o = this.byStart[s];
		if (!o && n === this.lastChunk) return this;
		var h = o ? o.previous : this.lastChunk;
		return (
			r && (r.next = a),
			a && (a.previous = r),
			h && (h.next = i),
			o && (o.previous = n),
			i.previous || (this.firstChunk = n.next),
			n.next || ((this.lastChunk = i.previous), (this.lastChunk.next = null)),
			(i.previous = h),
			(n.next = o || null),
			h || (this.firstChunk = i),
			o || (this.lastChunk = n),
			this
		);
	}),
	(x.prototype.overwrite = function (e, t, s, i) {
		if ('string' != typeof s) throw new TypeError('replacement content must be a string');
		for (; e < 0; ) e += this.original.length;
		for (; t < 0; ) t += this.original.length;
		if (t > this.original.length) throw new Error('end is out of bounds');
		if (e === t)
			throw new Error(
				'Cannot overwrite a zero-length range – use appendLeft or prependRight instead'
			);
		this._split(e),
			this._split(t),
			!0 === i &&
				(y.storeName ||
					(console.warn(
						'The final argument to magicString.overwrite(...) should be an options object. See https://github.com/rich-harris/magic-string'
					),
					(y.storeName = !0)),
				(i = { storeName: !0 }));
		var n = void 0 !== i && i.storeName,
			r = void 0 !== i && i.contentOnly;
		if (n) {
			var a = this.original.slice(e, t);
			this.storedNames[a] = !0;
		}
		var h = this.byStart[e],
			l = this.byEnd[t];
		if (h) {
			if (t > h.end && h.next !== this.byStart[h.end])
				throw new Error('Cannot overwrite across a split point');
			if ((h.edit(s, n, r), h !== l)) {
				for (var c = h.next; c !== l; ) c.edit('', !1), (c = c.next);
				c.edit('', !1);
			}
		} else {
			var u = new o(e, t, '').edit(s, n);
			(l.next = u), (u.previous = l);
		}
		return this;
	}),
	(x.prototype.prepend = function (e) {
		if ('string' != typeof e) throw new TypeError('outro content must be a string');
		return (this.intro = e + this.intro), this;
	}),
	(x.prototype.prependLeft = function (e, t) {
		if ('string' != typeof t) throw new TypeError('inserted content must be a string');
		this._split(e);
		var s = this.byEnd[e];
		return s ? s.prependLeft(t) : (this.intro = t + this.intro), this;
	}),
	(x.prototype.prependRight = function (e, t) {
		if ('string' != typeof t) throw new TypeError('inserted content must be a string');
		this._split(e);
		var s = this.byStart[e];
		return s ? s.prependRight(t) : (this.outro = t + this.outro), this;
	}),
	(x.prototype.remove = function (e, t) {
		for (; e < 0; ) e += this.original.length;
		for (; t < 0; ) t += this.original.length;
		if (e === t) return this;
		if (e < 0 || t > this.original.length) throw new Error('Character is out of bounds');
		if (e > t) throw new Error('end must be greater than start');
		this._split(e), this._split(t);
		for (var s = this.byStart[e]; s; )
			(s.intro = ''), (s.outro = ''), s.edit(''), (s = t > s.end ? this.byStart[s.end] : null);
		return this;
	}),
	(x.prototype.lastChar = function () {
		if (this.outro.length) return this.outro[this.outro.length - 1];
		var e = this.lastChunk;
		do {
			if (e.outro.length) return e.outro[e.outro.length - 1];
			if (e.content.length) return e.content[e.content.length - 1];
			if (e.intro.length) return e.intro[e.intro.length - 1];
		} while ((e = e.previous));
		return this.intro.length ? this.intro[this.intro.length - 1] : '';
	}),
	(x.prototype.lastLine = function () {
		var e = this.outro.lastIndexOf(g);
		if (-1 !== e) return this.outro.substr(e + 1);
		var t = this.outro,
			s = this.lastChunk;
		do {
			if (s.outro.length > 0) {
				if (-1 !== (e = s.outro.lastIndexOf(g))) return s.outro.substr(e + 1) + t;
				t = s.outro + t;
			}
			if (s.content.length > 0) {
				if (-1 !== (e = s.content.lastIndexOf(g))) return s.content.substr(e + 1) + t;
				t = s.content + t;
			}
			if (s.intro.length > 0) {
				if (-1 !== (e = s.intro.lastIndexOf(g))) return s.intro.substr(e + 1) + t;
				t = s.intro + t;
			}
		} while ((s = s.previous));
		return -1 !== (e = this.intro.lastIndexOf(g)) ? this.intro.substr(e + 1) + t : this.intro + t;
	}),
	(x.prototype.slice = function (e, t) {
		for (void 0 === e && (e = 0), void 0 === t && (t = this.original.length); e < 0; )
			e += this.original.length;
		for (; t < 0; ) t += this.original.length;
		for (var s = '', i = this.firstChunk; i && (i.start > e || i.end <= e); ) {
			if (i.start < t && i.end >= t) return s;
			i = i.next;
		}
		if (i && i.edited && i.start !== e)
			throw new Error('Cannot use replaced character ' + e + ' as slice start anchor.');
		for (var n = i; i; ) {
			!i.intro || (n === i && i.start !== e) || (s += i.intro);
			var r = i.start < t && i.end >= t;
			if (r && i.edited && i.end !== t)
				throw new Error('Cannot use replaced character ' + t + ' as slice end anchor.');
			var a = n === i ? e - i.start : 0,
				o = r ? i.content.length + t - i.end : i.content.length;
			if (((s += i.content.slice(a, o)), !i.outro || (r && i.end !== t) || (s += i.outro), r))
				break;
			i = i.next;
		}
		return s;
	}),
	(x.prototype.snip = function (e, t) {
		var s = this.clone();
		return s.remove(0, e), s.remove(t, s.original.length), s;
	}),
	(x.prototype._split = function (e) {
		if (!this.byStart[e] && !this.byEnd[e])
			for (var t = this.lastSearchedChunk, s = e > t.end; t; ) {
				if (t.contains(e)) return this._splitChunk(t, e);
				t = s ? this.byStart[t.end] : this.byEnd[t.start];
			}
	}),
	(x.prototype._splitChunk = function (e, t) {
		if (e.edited && e.content.length) {
			var s = f(this.original)(t);
			throw new Error(
				'Cannot split a chunk that has already been edited (' +
					s.line +
					':' +
					s.column +
					' – "' +
					e.original +
					'")'
			);
		}
		var i = e.split(t);
		return (
			(this.byEnd[t] = e),
			(this.byStart[t] = i),
			(this.byEnd[i.end] = i),
			e === this.lastChunk && (this.lastChunk = i),
			(this.lastSearchedChunk = e),
			!0
		);
	}),
	(x.prototype.toString = function () {
		for (var e = this.intro, t = this.firstChunk; t; ) (e += t.toString()), (t = t.next);
		return e + this.outro;
	}),
	(x.prototype.isEmpty = function () {
		var e = this.firstChunk;
		do {
			if (
				(e.intro.length && e.intro.trim()) ||
				(e.content.length && e.content.trim()) ||
				(e.outro.length && e.outro.trim())
			)
				return !1;
		} while ((e = e.next));
		return !0;
	}),
	(x.prototype.length = function () {
		var e = this.firstChunk,
			t = 0;
		do {
			t += e.intro.length + e.content.length + e.outro.length;
		} while ((e = e.next));
		return t;
	}),
	(x.prototype.trimLines = function () {
		return this.trim('[\\r\\n]');
	}),
	(x.prototype.trim = function (e) {
		return this.trimStart(e).trimEnd(e);
	}),
	(x.prototype.trimEndAborted = function (e) {
		var t = new RegExp((e || '\\s') + '+$');
		if (((this.outro = this.outro.replace(t, '')), this.outro.length)) return !0;
		var s = this.lastChunk;
		do {
			var i = s.end,
				n = s.trimEnd(t);
			if (
				(s.end !== i &&
					(this.lastChunk === s && (this.lastChunk = s.next),
					(this.byEnd[s.end] = s),
					(this.byStart[s.next.start] = s.next),
					(this.byEnd[s.next.end] = s.next)),
				n)
			)
				return !0;
			s = s.previous;
		} while (s);
		return !1;
	}),
	(x.prototype.trimEnd = function (e) {
		return this.trimEndAborted(e), this;
	}),
	(x.prototype.trimStartAborted = function (e) {
		var t = new RegExp('^' + (e || '\\s') + '+');
		if (((this.intro = this.intro.replace(t, '')), this.intro.length)) return !0;
		var s = this.firstChunk;
		do {
			var i = s.end,
				n = s.trimStart(t);
			if (
				(s.end !== i &&
					(s === this.lastChunk && (this.lastChunk = s.next),
					(this.byEnd[s.end] = s),
					(this.byStart[s.next.start] = s.next),
					(this.byEnd[s.next.end] = s.next)),
				n)
			)
				return !0;
			s = s.next;
		} while (s);
		return !1;
	}),
	(x.prototype.trimStart = function (e) {
		return this.trimStartAborted(e), this;
	});
var E = Object.prototype.hasOwnProperty,
	v = function (e) {
		void 0 === e && (e = {}),
			(this.intro = e.intro || ''),
			(this.separator = void 0 !== e.separator ? e.separator : '\n'),
			(this.sources = []),
			(this.uniqueSources = []),
			(this.uniqueSourceIndexByFilename = {});
	};
function b(e, t) {
	const s = e.split(/[/\\]/).filter(Boolean),
		i = t.split(/[/\\]/).filter(Boolean);
	for ('.' === s[0] && s.shift(), '.' === i[0] && i.shift(); s[0] && i[0] && s[0] === i[0]; )
		s.shift(), i.shift();
	for (; '..' === i[0] && s.length > 0; ) i.shift(), s.pop();
	for (; s.pop(); ) i.unshift('..');
	return i.join('/');
}
(v.prototype.addSource = function (e) {
	if (e instanceof x)
		return this.addSource({ content: e, filename: e.filename, separator: this.separator });
	if (!p(e) || !e.content)
		throw new Error(
			'bundle.addSource() takes an object with a `content` property, which should be an instance of MagicString, and an optional `filename`'
		);
	if (
		(['filename', 'indentExclusionRanges', 'separator'].forEach(function (t) {
			E.call(e, t) || (e[t] = e.content[t]);
		}),
		void 0 === e.separator && (e.separator = this.separator),
		e.filename)
	)
		if (E.call(this.uniqueSourceIndexByFilename, e.filename)) {
			var t = this.uniqueSources[this.uniqueSourceIndexByFilename[e.filename]];
			if (e.content.original !== t.content)
				throw new Error('Illegal source: same filename (' + e.filename + '), different contents');
		} else
			(this.uniqueSourceIndexByFilename[e.filename] = this.uniqueSources.length),
				this.uniqueSources.push({ filename: e.filename, content: e.content.original });
	return this.sources.push(e), this;
}),
	(v.prototype.append = function (e, t) {
		return this.addSource({ content: new x(e), separator: (t && t.separator) || '' }), this;
	}),
	(v.prototype.clone = function () {
		var e = new v({ intro: this.intro, separator: this.separator });
		return (
			this.sources.forEach(function (t) {
				e.addSource({ filename: t.filename, content: t.content.clone(), separator: t.separator });
			}),
			e
		);
	}),
	(v.prototype.generateDecodedMap = function (e) {
		var t = this;
		void 0 === e && (e = {});
		var s = [];
		this.sources.forEach(function (e) {
			Object.keys(e.content.storedNames).forEach(function (e) {
				~s.indexOf(e) || s.push(e);
			});
		});
		var i = new m(e.hires);
		return (
			this.intro && i.advance(this.intro),
			this.sources.forEach(function (e, n) {
				n > 0 && i.advance(t.separator);
				var r = e.filename ? t.uniqueSourceIndexByFilename[e.filename] : -1,
					a = e.content,
					o = f(a.original);
				a.intro && i.advance(a.intro),
					a.firstChunk.eachNext(function (t) {
						var n = o(t.start);
						t.intro.length && i.advance(t.intro),
							e.filename
								? t.edited
									? i.addEdit(r, t.content, n, t.storeName ? s.indexOf(t.original) : -1)
									: i.addUneditedChunk(r, t, a.original, n, a.sourcemapLocations)
								: i.advance(t.content),
							t.outro.length && i.advance(t.outro);
					}),
					a.outro && i.advance(a.outro);
			}),
			{
				file: e.file ? e.file.split(/[/\\]/).pop() : null,
				sources: this.uniqueSources.map(function (t) {
					return e.file ? u(e.file, t.filename) : t.filename;
				}),
				sourcesContent: this.uniqueSources.map(function (t) {
					return e.includeContent ? t.content : null;
				}),
				names: s,
				mappings: i.raw
			}
		);
	}),
	(v.prototype.generateMap = function (e) {
		return new l(this.generateDecodedMap(e));
	}),
	(v.prototype.getIndentString = function () {
		var e = {};
		return (
			this.sources.forEach(function (t) {
				var s = t.content.indentStr;
				null !== s && (e[s] || (e[s] = 0), (e[s] += 1));
			}),
			Object.keys(e).sort(function (t, s) {
				return e[t] - e[s];
			})[0] || '\t'
		);
	}),
	(v.prototype.indent = function (e) {
		var t = this;
		if ((arguments.length || (e = this.getIndentString()), '' === e)) return this;
		var s = !this.intro || '\n' === this.intro.slice(-1);
		return (
			this.sources.forEach(function (i, n) {
				var r = void 0 !== i.separator ? i.separator : t.separator,
					a = s || (n > 0 && /\r?\n$/.test(r));
				i.content.indent(e, { exclude: i.indentExclusionRanges, indentStart: a }),
					(s = '\n' === i.content.lastChar());
			}),
			this.intro &&
				(this.intro =
					e +
					this.intro.replace(/^[^\n]/gm, function (t, s) {
						return s > 0 ? e + t : t;
					})),
			this
		);
	}),
	(v.prototype.prepend = function (e) {
		return (this.intro = e + this.intro), this;
	}),
	(v.prototype.toString = function () {
		var e = this,
			t = this.sources
				.map(function (t, s) {
					var i = void 0 !== t.separator ? t.separator : e.separator;
					return (s > 0 ? i : '') + t.content.toString();
				})
				.join('');
		return this.intro + t;
	}),
	(v.prototype.isEmpty = function () {
		return (
			(!this.intro.length || !this.intro.trim()) &&
			!this.sources.some(function (e) {
				return !e.content.isEmpty();
			})
		);
	}),
	(v.prototype.length = function () {
		return this.sources.reduce(function (e, t) {
			return e + t.content.length();
		}, this.intro.length);
	}),
	(v.prototype.trimLines = function () {
		return this.trim('[\\r\\n]');
	}),
	(v.prototype.trim = function (e) {
		return this.trimStart(e).trimEnd(e);
	}),
	(v.prototype.trimStart = function (e) {
		var t = new RegExp('^' + (e || '\\s') + '+');
		if (((this.intro = this.intro.replace(t, '')), !this.intro)) {
			var s,
				i = 0;
			do {
				if (!(s = this.sources[i++])) break;
			} while (!s.content.trimStartAborted(e));
		}
		return this;
	}),
	(v.prototype.trimEnd = function (e) {
		var t,
			s = new RegExp((e || '\\s') + '+$'),
			i = this.sources.length - 1;
		do {
			if (!(t = this.sources[i--])) {
				this.intro = this.intro.replace(s, '');
				break;
			}
		} while (!t.content.trimEndAborted(e));
		return this;
	});
function S(e, t, s, i) {
	if ((t.remove(s, i), e.annotations))
		for (const i of e.annotations) {
			if (!(i.start < s)) return;
			t.remove(i.start, i.end);
		}
}
function A(e, t) {
	if ((e.annotations || 'ExpressionStatement' !== e.parent.type || (e = e.parent), e.annotations))
		for (const s of e.annotations) t.remove(s.start, s.end);
}
const P = { isNoStatement: !0 };
function C(e, t, s = 0) {
	let i, n;
	for (i = e.indexOf(t, s); ; ) {
		if (-1 === (s = e.indexOf('/', s)) || s >= i) return i;
		(n = e.charCodeAt(++s)),
			++s,
			(s = 47 === n ? e.indexOf('\n', s) + 1 : e.indexOf('*/', s) + 2) > i && (i = e.indexOf(t, s));
	}
}
const N = /\s/;
function k(e, t) {
	for (; t < e.length && N.test(e[t]); ) t++;
	return t;
}
function w(e) {
	let t,
		s,
		i = 0;
	for (t = e.indexOf('\n', i); ; ) {
		if (((i = e.indexOf('/', i)), -1 === i || i > t)) return [t, t + 1];
		if (((s = e.charCodeAt(i + 1)), 47 === s)) return [i, t + 1];
		(i = e.indexOf('*/', i + 3) + 2), i > t && (t = e.indexOf('\n', i));
	}
}
function _(e, t, s, i, n) {
	let r,
		a,
		o,
		h,
		l = e[0],
		c = !l.included || l.needsBoundaries;
	c && (h = s + w(t.original.slice(s, l.start))[1]);
	for (let s = 1; s <= e.length; s++)
		(r = l),
			(a = h),
			(o = c),
			(l = e[s]),
			(c = void 0 !== l && (!l.included || l.needsBoundaries)),
			o || c
				? ((h = r.end + w(t.original.slice(r.end, void 0 === l ? i : l.start))[1]),
				  r.included ? (o ? r.render(t, n, { end: h, start: a }) : r.render(t, n)) : S(r, t, a, h))
				: r.render(t, n);
}
function I(e, t, s, i) {
	const n = [];
	let r,
		a,
		o,
		h,
		l,
		c = s - 1;
	for (let i = 0; i < e.length; i++) {
		for (
			a = e[i],
				void 0 !== r && (c = r.end + C(t.original.slice(r.end, a.start), ',')),
				o = h = c + 1 + w(t.original.slice(c + 1, a.start))[1];
			(l = t.original.charCodeAt(o)), 32 === l || 9 === l || 10 === l || 13 === l;

		)
			o++;
		void 0 !== r && n.push({ contentEnd: h, end: o, node: r, separator: c, start: s }),
			(r = a),
			(s = o);
	}
	return n.push({ contentEnd: i, end: i, node: r, separator: null, start: s }), n;
}
function $(e, t, s) {
	for (;;) {
		const [i, n] = w(e.original.slice(t, s));
		if (-1 === i) break;
		e.remove(t + i, (t += n));
	}
}
function M(e, t) {
	const s = t.compact ? '' : ' ';
	if (1 === e.length && 1 === t.exportNamesByVariable.get(e[0]).length) {
		const i = e[0];
		return `exports('${t.exportNamesByVariable.get(i)}',${s}${i.getName()})`;
	}
	return `exports({${s}${e
		.map((e) =>
			t.exportNamesByVariable
				.get(e)
				.map((t) => `${t}:${s}${e.getName()}`)
				.join(',' + s)
		)
		.join(',' + s)}${s}})`;
}
function T(e, t, s) {
	const i = s.compact ? '' : ' ',
		n = s.compact ? '' : ';';
	return `function${i}(v)${i}{${i}return exports({${i}${e
		.map((e) =>
			s.exportNamesByVariable
				.get(e)
				.map((s) => `${s}:${i}${t ? e.getName() : 'v'}`)
				.join(',' + i)
		)
		.join(',' + i)}${i}}),${i}v${n}${i}}(`;
}
function L(e) {
	let t = '';
	do {
		const s = e % 64;
		(e = Math.floor(e / 64)),
			(t = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$'[s] + t);
	} while (0 !== e);
	return t;
}
const R = {
	__proto__: null,
	await: !0,
	break: !0,
	case: !0,
	catch: !0,
	class: !0,
	const: !0,
	continue: !0,
	debugger: !0,
	default: !0,
	delete: !0,
	do: !0,
	else: !0,
	enum: !0,
	eval: !0,
	export: !0,
	extends: !0,
	false: !0,
	finally: !0,
	for: !0,
	function: !0,
	if: !0,
	implements: !0,
	import: !0,
	in: !0,
	instanceof: !0,
	interface: !0,
	let: !0,
	new: !0,
	null: !0,
	package: !0,
	private: !0,
	protected: !0,
	public: !0,
	return: !0,
	static: !0,
	super: !0,
	switch: !0,
	this: !0,
	throw: !0,
	true: !0,
	try: !0,
	typeof: !0,
	undefined: !0,
	var: !0,
	void: !0,
	while: !0,
	with: !0,
	yield: !0
};
function O(e, t) {
	let s = e,
		i = 1;
	for (; t.has(s) || R[s]; ) s = `${e}$${L(i++)}`;
	return t.add(s), s;
}
const D = [];
function V(e, t, s) {
	const i = e.get(t);
	if (i) return i;
	const n = s();
	return e.set(t, n), n;
}
const B = Symbol('Unknown Key'),
	F = [],
	W = [B],
	U = Symbol('Entities');
class z {
	constructor() {
		this.entityPaths = Object.create(null, { [U]: { value: new Set() } });
	}
	getEntities(e) {
		let t = this.entityPaths;
		for (const s of e) t = t[s] = t[s] || Object.create(null, { [U]: { value: new Set() } });
		return t[U];
	}
}
const j = new z();
class G {
	constructor() {
		this.entityPaths = Object.create(null, { [U]: { value: new Map() } });
	}
	getEntities(e, t) {
		let s = this.entityPaths;
		for (const t of e) s = s[t] = s[t] || Object.create(null, { [U]: { value: new Map() } });
		return V(s[U], t, () => new Set());
	}
}
function H(e, t = null) {
	return Object.create(t, e);
}
const q = Symbol('Unknown Value'),
	K = {
		deoptimizePath: () => {},
		getLiteralValueAtPath: () => q,
		getReturnExpressionWhenCalledAtPath: () => K,
		hasEffectsWhenAccessedAtPath: (e) => e.length > 0,
		hasEffectsWhenAssignedAtPath: (e) => e.length > 0,
		hasEffectsWhenCalledAtPath: () => !0,
		include: () => {},
		includeCallArguments(e, t) {
			for (const s of t) s.include(e, !1);
		},
		included: !0,
		toString: () => '[[UNKNOWN]]'
	},
	X = {
		deoptimizePath: () => {},
		getLiteralValueAtPath: () => {},
		getReturnExpressionWhenCalledAtPath: () => K,
		hasEffectsWhenAccessedAtPath: (e) => e.length > 0,
		hasEffectsWhenAssignedAtPath: (e) => e.length > 0,
		hasEffectsWhenCalledAtPath: () => !0,
		include: () => {},
		includeCallArguments() {},
		included: !0,
		toString: () => 'undefined'
	},
	Y = { value: { callsArgs: null, mutatesSelf: !1, returns: null, returnsPrimitive: K } },
	Q = { value: { returns: null, returnsPrimitive: K, callsArgs: null, mutatesSelf: !0 } },
	J = { value: { returns: null, returnsPrimitive: K, callsArgs: [0], mutatesSelf: !1 } };
class Z {
	constructor() {
		this.included = !1;
	}
	deoptimizePath() {}
	getLiteralValueAtPath() {
		return q;
	}
	getReturnExpressionWhenCalledAtPath(e) {
		return 1 === e.length ? ve(me, e[0]) : K;
	}
	hasEffectsWhenAccessedAtPath(e) {
		return e.length > 1;
	}
	hasEffectsWhenAssignedAtPath(e) {
		return e.length > 1;
	}
	hasEffectsWhenCalledAtPath(e, t, s) {
		return 1 !== e.length || Ee(me, e[0], this.included, t, s);
	}
	include() {
		this.included = !0;
	}
	includeCallArguments(e, t) {
		for (const s of t) s.include(e, !1);
	}
	toString() {
		return '[[UNKNOWN ARRAY]]';
	}
}
const ee = { value: { callsArgs: null, mutatesSelf: !1, returns: Z, returnsPrimitive: null } },
	te = { value: { callsArgs: null, mutatesSelf: !0, returns: Z, returnsPrimitive: null } },
	se = { value: { callsArgs: [0], mutatesSelf: !1, returns: Z, returnsPrimitive: null } },
	ie = { value: { callsArgs: [0], mutatesSelf: !0, returns: Z, returnsPrimitive: null } },
	ne = {
		deoptimizePath: () => {},
		getLiteralValueAtPath: () => q,
		getReturnExpressionWhenCalledAtPath: (e) => (1 === e.length ? ve(ge, e[0]) : K),
		hasEffectsWhenAccessedAtPath: (e) => e.length > 1,
		hasEffectsWhenAssignedAtPath: (e) => e.length > 0,
		hasEffectsWhenCalledAtPath: (e) => {
			if (1 === e.length) {
				const t = e[0];
				return 'string' != typeof t || !ge[t];
			}
			return !0;
		},
		include: () => {},
		includeCallArguments(e, t) {
			for (const s of t) s.include(e, !1);
		},
		included: !0,
		toString: () => '[[UNKNOWN BOOLEAN]]'
	},
	re = { value: { callsArgs: null, mutatesSelf: !1, returns: null, returnsPrimitive: ne } },
	ae = { value: { callsArgs: [0], mutatesSelf: !1, returns: null, returnsPrimitive: ne } },
	oe = {
		deoptimizePath: () => {},
		getLiteralValueAtPath: () => q,
		getReturnExpressionWhenCalledAtPath: (e) => (1 === e.length ? ve(ye, e[0]) : K),
		hasEffectsWhenAccessedAtPath: (e) => e.length > 1,
		hasEffectsWhenAssignedAtPath: (e) => e.length > 0,
		hasEffectsWhenCalledAtPath: (e) => {
			if (1 === e.length) {
				const t = e[0];
				return 'string' != typeof t || !ye[t];
			}
			return !0;
		},
		include: () => {},
		includeCallArguments(e, t) {
			for (const s of t) s.include(e, !1);
		},
		included: !0,
		toString: () => '[[UNKNOWN NUMBER]]'
	},
	he = { value: { callsArgs: null, mutatesSelf: !1, returns: null, returnsPrimitive: oe } },
	le = { value: { callsArgs: null, mutatesSelf: !0, returns: null, returnsPrimitive: oe } },
	ce = { value: { callsArgs: [0], mutatesSelf: !1, returns: null, returnsPrimitive: oe } },
	ue = {
		deoptimizePath: () => {},
		getLiteralValueAtPath: () => q,
		getReturnExpressionWhenCalledAtPath: (e) => (1 === e.length ? ve(xe, e[0]) : K),
		hasEffectsWhenAccessedAtPath: (e) => e.length > 1,
		hasEffectsWhenAssignedAtPath: (e) => e.length > 0,
		hasEffectsWhenCalledAtPath: (e, t, s) => 1 !== e.length || Ee(xe, e[0], !0, t, s),
		include: () => {},
		includeCallArguments(e, t) {
			for (const s of t) s.include(e, !1);
		},
		included: !0,
		toString: () => '[[UNKNOWN STRING]]'
	},
	de = { value: { callsArgs: null, mutatesSelf: !1, returns: null, returnsPrimitive: ue } };
class pe {
	constructor() {
		this.included = !1;
	}
	deoptimizePath() {}
	getLiteralValueAtPath() {
		return q;
	}
	getReturnExpressionWhenCalledAtPath(e) {
		return 1 === e.length ? ve(fe, e[0]) : K;
	}
	hasEffectsWhenAccessedAtPath(e) {
		return e.length > 1;
	}
	hasEffectsWhenAssignedAtPath(e) {
		return e.length > 1;
	}
	hasEffectsWhenCalledAtPath(e, t, s) {
		return 1 !== e.length || Ee(fe, e[0], this.included, t, s);
	}
	include() {
		this.included = !0;
	}
	includeCallArguments(e, t) {
		for (const s of t) s.include(e, !1);
	}
	toString() {
		return '[[UNKNOWN OBJECT]]';
	}
}
const fe = H({
		hasOwnProperty: re,
		isPrototypeOf: re,
		propertyIsEnumerable: re,
		toLocaleString: de,
		toString: de,
		valueOf: Y
	}),
	me = H(
		{
			concat: ee,
			copyWithin: te,
			every: ae,
			fill: te,
			filter: se,
			find: J,
			findIndex: ce,
			forEach: J,
			includes: re,
			indexOf: he,
			join: de,
			lastIndexOf: he,
			map: se,
			pop: Q,
			push: le,
			reduce: J,
			reduceRight: J,
			reverse: te,
			shift: Q,
			slice: ee,
			some: ae,
			sort: ie,
			splice: te,
			unshift: le
		},
		fe
	),
	ge = H({ valueOf: re }, fe),
	ye = H({ toExponential: de, toFixed: de, toLocaleString: de, toPrecision: de, valueOf: he }, fe),
	xe = H(
		{
			charAt: de,
			charCodeAt: he,
			codePointAt: he,
			concat: de,
			endsWith: re,
			includes: re,
			indexOf: he,
			lastIndexOf: he,
			localeCompare: he,
			match: re,
			normalize: de,
			padEnd: de,
			padStart: de,
			repeat: de,
			replace: { value: { callsArgs: [1], mutatesSelf: !1, returns: null, returnsPrimitive: ue } },
			search: he,
			slice: de,
			split: ee,
			startsWith: re,
			substr: de,
			substring: de,
			toLocaleLowerCase: de,
			toLocaleUpperCase: de,
			toLowerCase: de,
			toUpperCase: de,
			trim: de,
			valueOf: de
		},
		fe
	);
function Ee(e, t, s, i, n) {
	if ('string' != typeof t || !e[t] || (e[t].mutatesSelf && s)) return !0;
	if (!e[t].callsArgs) return !1;
	for (const s of e[t].callsArgs)
		if (i.args[s] && i.args[s].hasEffectsWhenCalledAtPath(F, { args: D, withNew: !1 }, n))
			return !0;
	return !1;
}
function ve(e, t) {
	return 'string' == typeof t && e[t]
		? null !== e[t].returnsPrimitive
			? e[t].returnsPrimitive
			: new e[t].returns()
		: K;
}
class be {
	constructor(e) {
		(this.alwaysRendered = !1),
			(this.included = !1),
			(this.isId = !1),
			(this.isReassigned = !1),
			(this.renderBaseName = null),
			(this.renderName = null),
			(this.name = e);
	}
	addReference(e) {}
	deoptimizePath(e) {}
	getBaseVariableName() {
		return this.renderBaseName || this.renderName || this.name;
	}
	getLiteralValueAtPath(e, t, s) {
		return q;
	}
	getName() {
		const e = this.renderName || this.name;
		return this.renderBaseName ? `${this.renderBaseName}${R[e] ? `['${e}']` : '.' + e}` : e;
	}
	getReturnExpressionWhenCalledAtPath(e, t, s) {
		return K;
	}
	hasEffectsWhenAccessedAtPath(e, t) {
		return e.length > 0;
	}
	hasEffectsWhenAssignedAtPath(e, t) {
		return !0;
	}
	hasEffectsWhenCalledAtPath(e, t, s) {
		return !0;
	}
	include() {
		this.included = !0;
	}
	includeCallArguments(e, t) {
		for (const s of t) s.include(e, !1);
	}
	markCalledFromTryStatement() {}
	setRenderNames(e, t) {
		(this.renderBaseName = e), (this.renderName = t);
	}
}
class Se extends be {
	constructor(e, t) {
		super(t), (this.module = e), (this.isNamespace = '*' === t), (this.referenced = !1);
	}
	addReference(e) {
		(this.referenced = !0),
			('default' !== this.name && '*' !== this.name) || this.module.suggestName(e.name);
	}
	include() {
		this.included || ((this.included = !0), (this.module.used = !0));
	}
}
const Ae = Object.freeze(Object.create(null)),
	Pe = Object.freeze({}),
	Ce = Object.freeze([]),
	Ne = 'break case class catch const continue debugger default delete do else export extends finally for function if import in instanceof let new return super switch this throw try typeof var void while with yield enum await implements package protected static interface private public'.split(
		' '
	),
	ke = 'Infinity NaN undefined null true false eval uneval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Symbol Error EvalError InternalError RangeError ReferenceError SyntaxError TypeError URIError Number Math Date String RegExp Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array Map Set WeakMap WeakSet SIMD ArrayBuffer DataView JSON Promise Generator GeneratorFunction Reflect Proxy Intl'.split(
		' '
	),
	we = new Set(Ne.concat(ke)),
	_e = /[^$_a-zA-Z0-9]/g,
	Ie = (e) => /\d/.test(e[0]);
function $e(e) {
	return (
		(e = e.replace(/-(\w)/g, (e, t) => t.toUpperCase()).replace(_e, '_')),
		(Ie(e) || we.has(e)) && (e = '_' + e),
		e || '_'
	);
}
const Me = /^(?:\/|(?:[A-Za-z]:)?[\\|/])/,
	Te = /^\.?\.\//;
function Le(e) {
	return Me.test(e);
}
function Re(e) {
	return Te.test(e);
}
function Oe(e) {
	return e.replace(/\\/g, '/');
}
function De(e) {
	return e.split(/(\/|\\)/).pop();
}
function Ve(e) {
	const t = /(\/|\\)[^/\\]*$/.exec(e);
	if (!t) return '.';
	const s = e.slice(0, -t[0].length);
	return s || '/';
}
function Be(e) {
	const t = /\.[^.]+$/.exec(De(e));
	return t ? t[0] : '';
}
function Fe(e, t) {
	const s = e.split(/[/\\]/).filter(Boolean),
		i = t.split(/[/\\]/).filter(Boolean);
	for ('.' === s[0] && s.shift(), '.' === i[0] && i.shift(); s[0] && i[0] && s[0] === i[0]; )
		s.shift(), i.shift();
	for (; '..' === i[0] && s.length > 0; ) i.shift(), s.pop();
	for (; s.pop(); ) i.unshift('..');
	return i.join('/');
}
function We(...e) {
	let t = e.shift().split(/[/\\]/);
	return (
		e.forEach((e) => {
			if (Le(e)) t = e.split(/[/\\]/);
			else {
				const s = e.split(/[/\\]/);
				for (; '.' === s[0] || '..' === s[0]; ) {
					'..' === s.shift() && t.pop();
				}
				t.push.apply(t, s);
			}
		}),
		t.join('/')
	);
}
class Ue {
	constructor(e, t, s, i) {
		(this.options = e),
			(this.id = t),
			(this.defaultVariableName = ''),
			(this.dynamicImporters = []),
			(this.importers = []),
			(this.mostCommonSuggestion = 0),
			(this.namespaceVariableName = ''),
			(this.reexported = !1),
			(this.renderPath = void 0),
			(this.renormalizeRenderPath = !1),
			(this.used = !1),
			(this.variableName = ''),
			(this.execIndex = 1 / 0),
			(this.suggestedVariableName = $e(t.split(/[\\/]/).pop())),
			(this.nameSuggestions = Object.create(null)),
			(this.declarations = Object.create(null)),
			(this.exportedVariables = new Map());
		const n = this;
		this.info = {
			ast: null,
			code: null,
			dynamicallyImportedIds: Ce,
			get dynamicImporters() {
				return n.dynamicImporters.sort();
			},
			hasModuleSideEffects: s,
			id: t,
			implicitlyLoadedAfterOneOf: Ce,
			implicitlyLoadedBefore: Ce,
			importedIds: Ce,
			get importers() {
				return n.importers.sort();
			},
			isEntry: !1,
			isExternal: !0,
			meta: i,
			syntheticNamedExports: !1
		};
	}
	getVariableForExportName(e) {
		let t = this.declarations[e];
		return t || ((this.declarations[e] = t = new Se(this, e)), this.exportedVariables.set(t, e), t);
	}
	setRenderPath(e, t) {
		return (
			(this.renderPath = 'function' == typeof e.paths ? e.paths(this.id) : e.paths[this.id]),
			this.renderPath ||
				(Le(this.id)
					? ((this.renderPath = Oe(Fe(t, this.id))), (this.renormalizeRenderPath = !0))
					: (this.renderPath = this.id)),
			this.renderPath
		);
	}
	suggestName(e) {
		this.nameSuggestions[e] || (this.nameSuggestions[e] = 0),
			(this.nameSuggestions[e] += 1),
			this.nameSuggestions[e] > this.mostCommonSuggestion &&
				((this.mostCommonSuggestion = this.nameSuggestions[e]), (this.suggestedVariableName = e));
	}
	warnUnusedImports() {
		const e = Object.keys(this.declarations).filter((e) => {
			if ('*' === e) return !1;
			const t = this.declarations[e];
			return !t.included && !this.reexported && !t.referenced;
		});
		if (0 === e.length) return;
		const t =
			1 === e.length
				? `'${e[0]}' is`
				: `${e
						.slice(0, -1)
						.map((e) => `'${e}'`)
						.join(', ')} and '${e.slice(-1)}' are`;
		this.options.onwarn({
			code: 'UNUSED_EXTERNAL_IMPORT',
			message: `${t} imported from external module '${this.id}' but never used`,
			names: e,
			source: this.id
		});
	}
}
function ze(e) {
	e.isExecuted = !0;
	const t = [e],
		s = new Set();
	for (const e of t)
		for (const i of [...e.dependencies, ...e.implicitlyLoadedBefore])
			i instanceof Ue ||
				i.isExecuted ||
				(!i.info.hasModuleSideEffects && !e.implicitlyLoadedBefore.has(i)) ||
				s.has(i.id) ||
				((i.isExecuted = !0), s.add(i.id), t.push(i));
}
function je() {
	return { brokenFlow: 0, includedCallArguments: new Set(), includedLabels: new Set() };
}
function Ge() {
	return {
		accessed: new z(),
		assigned: new z(),
		brokenFlow: 0,
		called: new G(),
		ignore: { breaks: !1, continues: !1, labels: new Set(), returnAwaitYield: !1 },
		includedLabels: new Set(),
		instantiated: new G(),
		replacedVariableInits: new Map()
	};
}
class He extends be {
	constructor(e, t, s, i) {
		super(e),
			(this.additionalInitializers = null),
			(this.calledFromTryStatement = !1),
			(this.expressionsToBeDeoptimized = []),
			(this.declarations = t ? [t] : []),
			(this.init = s),
			(this.deoptimizationTracker = i.deoptimizationTracker),
			(this.module = i.module);
	}
	addDeclaration(e, t) {
		this.declarations.push(e),
			null === this.additionalInitializers &&
				((this.additionalInitializers = null === this.init ? [] : [this.init]),
				(this.init = K),
				(this.isReassigned = !0)),
			null !== t && this.additionalInitializers.push(t);
	}
	consolidateInitializers() {
		if (null !== this.additionalInitializers) {
			for (const e of this.additionalInitializers) e.deoptimizePath(W);
			this.additionalInitializers = null;
		}
	}
	deoptimizePath(e) {
		if (e.length > 7 || this.isReassigned) return;
		const t = this.deoptimizationTracker.getEntities(e);
		if (!t.has(this))
			if ((t.add(this), 0 === e.length)) {
				if (!this.isReassigned) {
					this.isReassigned = !0;
					const e = this.expressionsToBeDeoptimized;
					this.expressionsToBeDeoptimized = [];
					for (const t of e) t.deoptimizeCache();
					this.init && this.init.deoptimizePath(W);
				}
			} else this.init && this.init.deoptimizePath(e);
	}
	getLiteralValueAtPath(e, t, s) {
		if (this.isReassigned || !this.init || e.length > 7) return q;
		const i = t.getEntities(e);
		if (i.has(this.init)) return q;
		this.expressionsToBeDeoptimized.push(s), i.add(this.init);
		const n = this.init.getLiteralValueAtPath(e, t, s);
		return i.delete(this.init), n;
	}
	getReturnExpressionWhenCalledAtPath(e, t, s) {
		if (this.isReassigned || !this.init || e.length > 7) return K;
		const i = t.getEntities(e);
		if (i.has(this.init)) return K;
		this.expressionsToBeDeoptimized.push(s), i.add(this.init);
		const n = this.init.getReturnExpressionWhenCalledAtPath(e, t, s);
		return i.delete(this.init), n;
	}
	hasEffectsWhenAccessedAtPath(e, t) {
		if (0 === e.length) return !1;
		if (this.isReassigned || e.length > 7) return !0;
		const s = t.accessed.getEntities(e);
		return !s.has(this) && (s.add(this), this.init && this.init.hasEffectsWhenAccessedAtPath(e, t));
	}
	hasEffectsWhenAssignedAtPath(e, t) {
		if (this.included || e.length > 7) return !0;
		if (0 === e.length) return !1;
		if (this.isReassigned) return !0;
		const s = t.assigned.getEntities(e);
		return !s.has(this) && (s.add(this), this.init && this.init.hasEffectsWhenAssignedAtPath(e, t));
	}
	hasEffectsWhenCalledAtPath(e, t, s) {
		if (e.length > 7 || this.isReassigned) return !0;
		const i = (t.withNew ? s.instantiated : s.called).getEntities(e, t);
		return (
			!i.has(this) && (i.add(this), this.init && this.init.hasEffectsWhenCalledAtPath(e, t, s))
		);
	}
	include() {
		if (!this.included) {
			(this.included = !0), this.module.isExecuted || ze(this.module);
			for (const e of this.declarations) {
				e.included || e.include(je(), !1);
				let t = e.parent;
				for (; !t.included && ((t.included = !0), 'Program' !== t.type); ) t = t.parent;
			}
		}
	}
	includeCallArguments(e, t) {
		if (this.isReassigned || (this.init && e.includedCallArguments.has(this.init)))
			for (const s of t) s.include(e, !1);
		else
			this.init &&
				(e.includedCallArguments.add(this.init),
				this.init.includeCallArguments(e, t),
				e.includedCallArguments.delete(this.init));
	}
	markCalledFromTryStatement() {
		this.calledFromTryStatement = !0;
	}
}
class qe {
	constructor() {
		(this.children = []), (this.variables = new Map());
	}
	addDeclaration(e, t, s, i) {
		const n = e.name;
		let r = this.variables.get(n);
		return (
			r ? r.addDeclaration(e, s) : ((r = new He(e.name, e, s || X, t)), this.variables.set(n, r)), r
		);
	}
	contains(e) {
		return this.variables.has(e);
	}
	findVariable(e) {
		throw new Error('Internal Error: findVariable needs to be implemented by a subclass');
	}
}
class Ke extends qe {
	constructor(e) {
		super(), (this.accessedOutsideVariables = new Map()), (this.parent = e), e.children.push(this);
	}
	addAccessedDynamicImport(e) {
		(this.accessedDynamicImports || (this.accessedDynamicImports = new Set())).add(e),
			this.parent instanceof Ke && this.parent.addAccessedDynamicImport(e);
	}
	addAccessedGlobals(e, t) {
		const s = t.get(this) || new Set();
		for (const t of e) s.add(t);
		t.set(this, s), this.parent instanceof Ke && this.parent.addAccessedGlobals(e, t);
	}
	addNamespaceMemberAccess(e, t) {
		this.accessedOutsideVariables.set(e, t), this.parent.addNamespaceMemberAccess(e, t);
	}
	addReturnExpression(e) {
		this.parent instanceof Ke && this.parent.addReturnExpression(e);
	}
	addUsedOutsideNames(e, t, s, i) {
		for (const i of this.accessedOutsideVariables.values())
			i.included &&
				(e.add(i.getBaseVariableName()), 'system' === t && s.has(i) && e.add('exports'));
		const n = i.get(this);
		if (n) for (const t of n) e.add(t);
	}
	contains(e) {
		return this.variables.has(e) || this.parent.contains(e);
	}
	deconflict(e, t, s) {
		const i = new Set();
		if ((this.addUsedOutsideNames(i, e, t, s), this.accessedDynamicImports))
			for (const e of this.accessedDynamicImports)
				e.inlineNamespace && i.add(e.inlineNamespace.getBaseVariableName());
		for (const [e, t] of this.variables)
			(t.included || t.alwaysRendered) && t.setRenderNames(null, O(e, i));
		for (const i of this.children) i.deconflict(e, t, s);
	}
	findLexicalBoundary() {
		return this.parent.findLexicalBoundary();
	}
	findVariable(e) {
		const t = this.variables.get(e) || this.accessedOutsideVariables.get(e);
		if (t) return t;
		const s = this.parent.findVariable(e);
		return this.accessedOutsideVariables.set(e, s), s;
	}
}
function Xe(e, t, s) {
	if ('number' == typeof s)
		throw new Error(
			'locate takes a { startIndex, offsetLine, offsetColumn } object as the third argument'
		);
	return (function (e, t) {
		void 0 === t && (t = {});
		var s = t.offsetLine || 0,
			i = t.offsetColumn || 0,
			n = e.split('\n'),
			r = 0,
			a = n.map(function (e, t) {
				var s = r + e.length + 1,
					i = { start: r, end: s, line: t };
				return (r = s), i;
			}),
			o = 0;
		function h(e, t) {
			return e.start <= t && t < e.end;
		}
		function l(e, t) {
			return { line: s + e.line, column: i + t - e.start, character: t };
		}
		return function (t, s) {
			'string' == typeof t && (t = e.indexOf(t, s || 0));
			for (var i = a[o], n = t >= i.end ? 1 : -1; i; ) {
				if (h(i, t)) return l(i, t);
				i = a[(o += n)];
			}
		};
	})(e, s)(t, s && s.startIndex);
}
const Ye = { Literal: [], Program: ['body'] };
class Qe {
	constructor(e, t, s) {
		(this.included = !1),
			(this.esTreeNode = e),
			(this.keys =
				Ye[e.type] ||
				(function (e) {
					return (Ye[e.type] = Object.keys(e).filter((t) => 'object' == typeof e[t])), Ye[e.type];
				})(e)),
			(this.parent = t),
			(this.context = t.context),
			this.createScope(s),
			this.parseNode(e),
			this.initialise(),
			this.context.magicString.addSourcemapLocation(this.start),
			this.context.magicString.addSourcemapLocation(this.end);
	}
	bind() {
		for (const e of this.keys) {
			const t = this[e];
			if (null !== t && 'annotations' !== e)
				if (Array.isArray(t)) for (const e of t) null !== e && e.bind();
				else t.bind();
		}
	}
	createScope(e) {
		this.scope = e;
	}
	declare(e, t) {
		return [];
	}
	deoptimizePath(e) {}
	getLiteralValueAtPath(e, t, s) {
		return q;
	}
	getReturnExpressionWhenCalledAtPath(e, t, s) {
		return K;
	}
	hasEffects(e) {
		for (const t of this.keys) {
			const s = this[t];
			if (null !== s && 'annotations' !== t)
				if (Array.isArray(s)) {
					for (const t of s) if (null !== t && t.hasEffects(e)) return !0;
				} else if (s.hasEffects(e)) return !0;
		}
		return !1;
	}
	hasEffectsWhenAccessedAtPath(e, t) {
		return e.length > 0;
	}
	hasEffectsWhenAssignedAtPath(e, t) {
		return !0;
	}
	hasEffectsWhenCalledAtPath(e, t, s) {
		return !0;
	}
	include(e, t) {
		this.included = !0;
		for (const s of this.keys) {
			const i = this[s];
			if (null !== i && 'annotations' !== s)
				if (Array.isArray(i)) for (const s of i) null !== s && s.include(e, t);
				else i.include(e, t);
		}
	}
	includeCallArguments(e, t) {
		for (const s of t) s.include(e, !1);
	}
	includeWithAllDeclaredVariables(e, t) {
		this.include(t, e);
	}
	initialise() {}
	insertSemicolon(e) {
		';' !== e.original[this.end - 1] && e.appendLeft(this.end, ';');
	}
	parseNode(e) {
		for (const t of Object.keys(e)) {
			if (this.hasOwnProperty(t)) continue;
			const s = e[t];
			if ('object' != typeof s || null === s || 'annotations' === t) this[t] = s;
			else if (Array.isArray(s)) {
				this[t] = [];
				for (const e of s)
					this[t].push(
						null === e
							? null
							: new (this.context.nodeConstructors[e.type] ||
									this.context.nodeConstructors.UnknownNode)(e, this, this.scope)
					);
			} else
				this[t] = new (this.context.nodeConstructors[s.type] ||
					this.context.nodeConstructors.UnknownNode)(s, this, this.scope);
		}
	}
	render(e, t) {
		for (const s of this.keys) {
			const i = this[s];
			if (null !== i && 'annotations' !== s)
				if (Array.isArray(i)) for (const s of i) null !== s && s.render(e, t);
				else i.render(e, t);
		}
	}
	shouldBeIncluded(e) {
		return this.included || (!e.brokenFlow && this.hasEffects(Ge()));
	}
	toString() {
		return this.context.code.slice(this.start, this.end);
	}
}
class Je extends Qe {
	createScope(e) {
		this.scope = new Ke(e);
	}
	hasEffectsWhenAccessedAtPath(e) {
		return !(e.length <= 1) && (e.length > 2 || 'prototype' !== e[0]);
	}
	hasEffectsWhenAssignedAtPath(e) {
		return !(e.length <= 1) && (e.length > 2 || 'prototype' !== e[0]);
	}
	hasEffectsWhenCalledAtPath(e, t, s) {
		return (
			!t.withNew ||
			this.body.hasEffectsWhenCalledAtPath(e, t, s) ||
			(null !== this.superClass && this.superClass.hasEffectsWhenCalledAtPath(e, t, s))
		);
	}
	initialise() {
		null !== this.id && this.id.declare('class', this);
	}
}
class Ze extends Je {
	initialise() {
		super.initialise(), null !== this.id && (this.id.variable.isId = !0);
	}
	parseNode(e) {
		null !== e.id &&
			(this.id = new this.context.nodeConstructors.Identifier(e.id, this, this.scope.parent)),
			super.parseNode(e);
	}
	render(e, t) {
		'system' === t.format &&
			this.id &&
			t.exportNamesByVariable.has(this.id.variable) &&
			e.appendLeft(this.end, `${t.compact ? '' : ' '}${M([this.id.variable], t)};`),
			super.render(e, t);
	}
}
class et extends He {
	constructor(e) {
		super('arguments', null, K, e);
	}
	hasEffectsWhenAccessedAtPath(e) {
		return e.length > 1;
	}
	hasEffectsWhenAssignedAtPath() {
		return !0;
	}
	hasEffectsWhenCalledAtPath() {
		return !0;
	}
}
class tt extends He {
	constructor(e) {
		super('this', null, null, e);
	}
	getLiteralValueAtPath() {
		return q;
	}
	hasEffectsWhenAccessedAtPath(e, t) {
		return (
			this.getInit(t).hasEffectsWhenAccessedAtPath(e, t) || super.hasEffectsWhenAccessedAtPath(e, t)
		);
	}
	hasEffectsWhenAssignedAtPath(e, t) {
		return (
			this.getInit(t).hasEffectsWhenAssignedAtPath(e, t) || super.hasEffectsWhenAssignedAtPath(e, t)
		);
	}
	hasEffectsWhenCalledAtPath(e, t, s) {
		return (
			this.getInit(s).hasEffectsWhenCalledAtPath(e, t, s) ||
			super.hasEffectsWhenCalledAtPath(e, t, s)
		);
	}
	getInit(e) {
		return e.replacedVariableInits.get(this) || K;
	}
}
class st extends Qe {
	bind() {
		super.bind(), this.argument.deoptimizePath([B, B]);
	}
}
class it extends Ke {
	constructor(e, t) {
		super(e),
			(this.parameters = []),
			(this.hasRest = !1),
			(this.context = t),
			(this.hoistedBodyVarScope = new Ke(this));
	}
	addParameterDeclaration(e) {
		const t = e.name;
		let s = this.hoistedBodyVarScope.variables.get(t);
		return (
			s ? s.addDeclaration(e, null) : (s = new He(t, e, K, this.context)),
			this.variables.set(t, s),
			s
		);
	}
	addParameterVariables(e, t) {
		this.parameters = e;
		for (const t of e) for (const e of t) e.alwaysRendered = !0;
		this.hasRest = t;
	}
	includeCallArguments(e, t) {
		let s = !1,
			i = !1;
		const n = this.hasRest && this.parameters[this.parameters.length - 1];
		for (const s of t)
			if (s instanceof st) {
				for (const s of t) s.include(e, !1);
				break;
			}
		for (let r = t.length - 1; r >= 0; r--) {
			const a = this.parameters[r] || n,
				o = t[r];
			if (a) {
				s = !1;
				for (const e of a) e.included && (i = !0), e.calledFromTryStatement && (s = !0);
			}
			!i && o.shouldBeIncluded(e) && (i = !0), i && o.include(e, s);
		}
	}
}
class nt extends it {
	constructor() {
		super(...arguments), (this.returnExpression = null), (this.returnExpressions = []);
	}
	addReturnExpression(e) {
		this.returnExpressions.push(e);
	}
	getReturnExpression() {
		return null === this.returnExpression && this.updateReturnExpression(), this.returnExpression;
	}
	updateReturnExpression() {
		if (1 === this.returnExpressions.length) this.returnExpression = this.returnExpressions[0];
		else {
			this.returnExpression = K;
			for (const e of this.returnExpressions) e.deoptimizePath(W);
		}
	}
}
class rt extends nt {
	constructor(e, t) {
		super(e, t),
			this.variables.set('arguments', (this.argumentsVariable = new et(t))),
			this.variables.set('this', (this.thisVariable = new tt(t)));
	}
	findLexicalBoundary() {
		return this;
	}
	includeCallArguments(e, t) {
		if ((super.includeCallArguments(e, t), this.argumentsVariable.included))
			for (const s of t) s.included || s.include(e, !1);
	}
}
function at(e, t) {
	if ('MemberExpression' === e.type) return !e.computed && at(e.object, e);
	if ('Identifier' === e.type) {
		if (!t) return !0;
		switch (t.type) {
			case 'MemberExpression':
				return t.computed || e === t.object;
			case 'MethodDefinition':
				return t.computed;
			case 'FieldDefinition':
			case 'Property':
				return t.computed || e === t.value;
			case 'ExportSpecifier':
			case 'ImportSpecifier':
				return e === t.local;
			case 'LabeledStatement':
			case 'BreakStatement':
			case 'ContinueStatement':
				return !1;
			default:
				return !0;
		}
	}
	return !1;
}
const ot = Symbol('Value Properties'),
	ht = { pure: !0 },
	lt = { pure: !1 },
	ct = { __proto__: null, [ot]: lt },
	ut = { __proto__: null, [ot]: ht },
	dt = { __proto__: null, [ot]: lt, prototype: ct },
	pt = { __proto__: null, [ot]: ht, prototype: ct },
	ft = { __proto__: null, [ot]: ht, from: ut, of: ut, prototype: ct },
	mt = { __proto__: null, [ot]: ht, supportedLocalesOf: pt },
	gt = {
		global: ct,
		globalThis: ct,
		self: ct,
		window: ct,
		__proto__: null,
		[ot]: lt,
		Array: { __proto__: null, [ot]: lt, from: ct, isArray: ut, of: ut, prototype: ct },
		ArrayBuffer: { __proto__: null, [ot]: ht, isView: ut, prototype: ct },
		Atomics: ct,
		BigInt: dt,
		BigInt64Array: dt,
		BigUint64Array: dt,
		Boolean: pt,
		constructor: dt,
		DataView: pt,
		Date: { __proto__: null, [ot]: ht, now: ut, parse: ut, prototype: ct, UTC: ut },
		decodeURI: ut,
		decodeURIComponent: ut,
		encodeURI: ut,
		encodeURIComponent: ut,
		Error: pt,
		escape: ut,
		eval: ct,
		EvalError: pt,
		Float32Array: ft,
		Float64Array: ft,
		Function: dt,
		hasOwnProperty: ct,
		Infinity: ct,
		Int16Array: ft,
		Int32Array: ft,
		Int8Array: ft,
		isFinite: ut,
		isNaN: ut,
		isPrototypeOf: ct,
		JSON: ct,
		Map: pt,
		Math: {
			__proto__: null,
			[ot]: lt,
			abs: ut,
			acos: ut,
			acosh: ut,
			asin: ut,
			asinh: ut,
			atan: ut,
			atan2: ut,
			atanh: ut,
			cbrt: ut,
			ceil: ut,
			clz32: ut,
			cos: ut,
			cosh: ut,
			exp: ut,
			expm1: ut,
			floor: ut,
			fround: ut,
			hypot: ut,
			imul: ut,
			log: ut,
			log10: ut,
			log1p: ut,
			log2: ut,
			max: ut,
			min: ut,
			pow: ut,
			random: ut,
			round: ut,
			sign: ut,
			sin: ut,
			sinh: ut,
			sqrt: ut,
			tan: ut,
			tanh: ut,
			trunc: ut
		},
		NaN: ct,
		Number: {
			__proto__: null,
			[ot]: ht,
			isFinite: ut,
			isInteger: ut,
			isNaN: ut,
			isSafeInteger: ut,
			parseFloat: ut,
			parseInt: ut,
			prototype: ct
		},
		Object: {
			__proto__: null,
			[ot]: ht,
			create: ut,
			getNotifier: ut,
			getOwn: ut,
			getOwnPropertyDescriptor: ut,
			getOwnPropertyNames: ut,
			getOwnPropertySymbols: ut,
			getPrototypeOf: ut,
			is: ut,
			isExtensible: ut,
			isFrozen: ut,
			isSealed: ut,
			keys: ut,
			prototype: ct
		},
		parseFloat: ut,
		parseInt: ut,
		Promise: { __proto__: null, [ot]: lt, all: ut, prototype: ct, race: ut, resolve: ut },
		propertyIsEnumerable: ct,
		Proxy: ct,
		RangeError: pt,
		ReferenceError: pt,
		Reflect: ct,
		RegExp: pt,
		Set: pt,
		SharedArrayBuffer: dt,
		String: {
			__proto__: null,
			[ot]: ht,
			fromCharCode: ut,
			fromCodePoint: ut,
			prototype: ct,
			raw: ut
		},
		Symbol: { __proto__: null, [ot]: ht, for: ut, keyFor: ut, prototype: ct },
		SyntaxError: pt,
		toLocaleString: ct,
		toString: ct,
		TypeError: pt,
		Uint16Array: ft,
		Uint32Array: ft,
		Uint8Array: ft,
		Uint8ClampedArray: ft,
		unescape: ut,
		URIError: pt,
		valueOf: ct,
		WeakMap: pt,
		WeakSet: pt,
		clearInterval: dt,
		clearTimeout: dt,
		console: ct,
		Intl: {
			__proto__: null,
			[ot]: lt,
			Collator: mt,
			DateTimeFormat: mt,
			ListFormat: mt,
			NumberFormat: mt,
			PluralRules: mt,
			RelativeTimeFormat: mt
		},
		setInterval: dt,
		setTimeout: dt,
		TextDecoder: dt,
		TextEncoder: dt,
		URL: dt,
		URLSearchParams: dt,
		AbortController: dt,
		AbortSignal: dt,
		addEventListener: ct,
		alert: ct,
		AnalyserNode: dt,
		Animation: dt,
		AnimationEvent: dt,
		applicationCache: ct,
		ApplicationCache: dt,
		ApplicationCacheErrorEvent: dt,
		atob: ct,
		Attr: dt,
		Audio: dt,
		AudioBuffer: dt,
		AudioBufferSourceNode: dt,
		AudioContext: dt,
		AudioDestinationNode: dt,
		AudioListener: dt,
		AudioNode: dt,
		AudioParam: dt,
		AudioProcessingEvent: dt,
		AudioScheduledSourceNode: dt,
		AudioWorkletNode: dt,
		BarProp: dt,
		BaseAudioContext: dt,
		BatteryManager: dt,
		BeforeUnloadEvent: dt,
		BiquadFilterNode: dt,
		Blob: dt,
		BlobEvent: dt,
		blur: ct,
		BroadcastChannel: dt,
		btoa: ct,
		ByteLengthQueuingStrategy: dt,
		Cache: dt,
		caches: ct,
		CacheStorage: dt,
		cancelAnimationFrame: ct,
		cancelIdleCallback: ct,
		CanvasCaptureMediaStreamTrack: dt,
		CanvasGradient: dt,
		CanvasPattern: dt,
		CanvasRenderingContext2D: dt,
		ChannelMergerNode: dt,
		ChannelSplitterNode: dt,
		CharacterData: dt,
		clientInformation: ct,
		ClipboardEvent: dt,
		close: ct,
		closed: ct,
		CloseEvent: dt,
		Comment: dt,
		CompositionEvent: dt,
		confirm: ct,
		ConstantSourceNode: dt,
		ConvolverNode: dt,
		CountQueuingStrategy: dt,
		createImageBitmap: ct,
		Credential: dt,
		CredentialsContainer: dt,
		crypto: ct,
		Crypto: dt,
		CryptoKey: dt,
		CSS: dt,
		CSSConditionRule: dt,
		CSSFontFaceRule: dt,
		CSSGroupingRule: dt,
		CSSImportRule: dt,
		CSSKeyframeRule: dt,
		CSSKeyframesRule: dt,
		CSSMediaRule: dt,
		CSSNamespaceRule: dt,
		CSSPageRule: dt,
		CSSRule: dt,
		CSSRuleList: dt,
		CSSStyleDeclaration: dt,
		CSSStyleRule: dt,
		CSSStyleSheet: dt,
		CSSSupportsRule: dt,
		CustomElementRegistry: dt,
		customElements: ct,
		CustomEvent: dt,
		DataTransfer: dt,
		DataTransferItem: dt,
		DataTransferItemList: dt,
		defaultstatus: ct,
		defaultStatus: ct,
		DelayNode: dt,
		DeviceMotionEvent: dt,
		DeviceOrientationEvent: dt,
		devicePixelRatio: ct,
		dispatchEvent: ct,
		document: ct,
		Document: dt,
		DocumentFragment: dt,
		DocumentType: dt,
		DOMError: dt,
		DOMException: dt,
		DOMImplementation: dt,
		DOMMatrix: dt,
		DOMMatrixReadOnly: dt,
		DOMParser: dt,
		DOMPoint: dt,
		DOMPointReadOnly: dt,
		DOMQuad: dt,
		DOMRect: dt,
		DOMRectReadOnly: dt,
		DOMStringList: dt,
		DOMStringMap: dt,
		DOMTokenList: dt,
		DragEvent: dt,
		DynamicsCompressorNode: dt,
		Element: dt,
		ErrorEvent: dt,
		Event: dt,
		EventSource: dt,
		EventTarget: dt,
		external: ct,
		fetch: ct,
		File: dt,
		FileList: dt,
		FileReader: dt,
		find: ct,
		focus: ct,
		FocusEvent: dt,
		FontFace: dt,
		FontFaceSetLoadEvent: dt,
		FormData: dt,
		frames: ct,
		GainNode: dt,
		Gamepad: dt,
		GamepadButton: dt,
		GamepadEvent: dt,
		getComputedStyle: ct,
		getSelection: ct,
		HashChangeEvent: dt,
		Headers: dt,
		history: ct,
		History: dt,
		HTMLAllCollection: dt,
		HTMLAnchorElement: dt,
		HTMLAreaElement: dt,
		HTMLAudioElement: dt,
		HTMLBaseElement: dt,
		HTMLBodyElement: dt,
		HTMLBRElement: dt,
		HTMLButtonElement: dt,
		HTMLCanvasElement: dt,
		HTMLCollection: dt,
		HTMLContentElement: dt,
		HTMLDataElement: dt,
		HTMLDataListElement: dt,
		HTMLDetailsElement: dt,
		HTMLDialogElement: dt,
		HTMLDirectoryElement: dt,
		HTMLDivElement: dt,
		HTMLDListElement: dt,
		HTMLDocument: dt,
		HTMLElement: dt,
		HTMLEmbedElement: dt,
		HTMLFieldSetElement: dt,
		HTMLFontElement: dt,
		HTMLFormControlsCollection: dt,
		HTMLFormElement: dt,
		HTMLFrameElement: dt,
		HTMLFrameSetElement: dt,
		HTMLHeadElement: dt,
		HTMLHeadingElement: dt,
		HTMLHRElement: dt,
		HTMLHtmlElement: dt,
		HTMLIFrameElement: dt,
		HTMLImageElement: dt,
		HTMLInputElement: dt,
		HTMLLabelElement: dt,
		HTMLLegendElement: dt,
		HTMLLIElement: dt,
		HTMLLinkElement: dt,
		HTMLMapElement: dt,
		HTMLMarqueeElement: dt,
		HTMLMediaElement: dt,
		HTMLMenuElement: dt,
		HTMLMetaElement: dt,
		HTMLMeterElement: dt,
		HTMLModElement: dt,
		HTMLObjectElement: dt,
		HTMLOListElement: dt,
		HTMLOptGroupElement: dt,
		HTMLOptionElement: dt,
		HTMLOptionsCollection: dt,
		HTMLOutputElement: dt,
		HTMLParagraphElement: dt,
		HTMLParamElement: dt,
		HTMLPictureElement: dt,
		HTMLPreElement: dt,
		HTMLProgressElement: dt,
		HTMLQuoteElement: dt,
		HTMLScriptElement: dt,
		HTMLSelectElement: dt,
		HTMLShadowElement: dt,
		HTMLSlotElement: dt,
		HTMLSourceElement: dt,
		HTMLSpanElement: dt,
		HTMLStyleElement: dt,
		HTMLTableCaptionElement: dt,
		HTMLTableCellElement: dt,
		HTMLTableColElement: dt,
		HTMLTableElement: dt,
		HTMLTableRowElement: dt,
		HTMLTableSectionElement: dt,
		HTMLTemplateElement: dt,
		HTMLTextAreaElement: dt,
		HTMLTimeElement: dt,
		HTMLTitleElement: dt,
		HTMLTrackElement: dt,
		HTMLUListElement: dt,
		HTMLUnknownElement: dt,
		HTMLVideoElement: dt,
		IDBCursor: dt,
		IDBCursorWithValue: dt,
		IDBDatabase: dt,
		IDBFactory: dt,
		IDBIndex: dt,
		IDBKeyRange: dt,
		IDBObjectStore: dt,
		IDBOpenDBRequest: dt,
		IDBRequest: dt,
		IDBTransaction: dt,
		IDBVersionChangeEvent: dt,
		IdleDeadline: dt,
		IIRFilterNode: dt,
		Image: dt,
		ImageBitmap: dt,
		ImageBitmapRenderingContext: dt,
		ImageCapture: dt,
		ImageData: dt,
		indexedDB: ct,
		innerHeight: ct,
		innerWidth: ct,
		InputEvent: dt,
		IntersectionObserver: dt,
		IntersectionObserverEntry: dt,
		isSecureContext: ct,
		KeyboardEvent: dt,
		KeyframeEffect: dt,
		length: ct,
		localStorage: ct,
		location: ct,
		Location: dt,
		locationbar: ct,
		matchMedia: ct,
		MediaDeviceInfo: dt,
		MediaDevices: dt,
		MediaElementAudioSourceNode: dt,
		MediaEncryptedEvent: dt,
		MediaError: dt,
		MediaKeyMessageEvent: dt,
		MediaKeySession: dt,
		MediaKeyStatusMap: dt,
		MediaKeySystemAccess: dt,
		MediaList: dt,
		MediaQueryList: dt,
		MediaQueryListEvent: dt,
		MediaRecorder: dt,
		MediaSettingsRange: dt,
		MediaSource: dt,
		MediaStream: dt,
		MediaStreamAudioDestinationNode: dt,
		MediaStreamAudioSourceNode: dt,
		MediaStreamEvent: dt,
		MediaStreamTrack: dt,
		MediaStreamTrackEvent: dt,
		menubar: ct,
		MessageChannel: dt,
		MessageEvent: dt,
		MessagePort: dt,
		MIDIAccess: dt,
		MIDIConnectionEvent: dt,
		MIDIInput: dt,
		MIDIInputMap: dt,
		MIDIMessageEvent: dt,
		MIDIOutput: dt,
		MIDIOutputMap: dt,
		MIDIPort: dt,
		MimeType: dt,
		MimeTypeArray: dt,
		MouseEvent: dt,
		moveBy: ct,
		moveTo: ct,
		MutationEvent: dt,
		MutationObserver: dt,
		MutationRecord: dt,
		name: ct,
		NamedNodeMap: dt,
		NavigationPreloadManager: dt,
		navigator: ct,
		Navigator: dt,
		NetworkInformation: dt,
		Node: dt,
		NodeFilter: ct,
		NodeIterator: dt,
		NodeList: dt,
		Notification: dt,
		OfflineAudioCompletionEvent: dt,
		OfflineAudioContext: dt,
		offscreenBuffering: ct,
		OffscreenCanvas: dt,
		open: ct,
		openDatabase: ct,
		Option: dt,
		origin: ct,
		OscillatorNode: dt,
		outerHeight: ct,
		outerWidth: ct,
		PageTransitionEvent: dt,
		pageXOffset: ct,
		pageYOffset: ct,
		PannerNode: dt,
		parent: ct,
		Path2D: dt,
		PaymentAddress: dt,
		PaymentRequest: dt,
		PaymentRequestUpdateEvent: dt,
		PaymentResponse: dt,
		performance: ct,
		Performance: dt,
		PerformanceEntry: dt,
		PerformanceLongTaskTiming: dt,
		PerformanceMark: dt,
		PerformanceMeasure: dt,
		PerformanceNavigation: dt,
		PerformanceNavigationTiming: dt,
		PerformanceObserver: dt,
		PerformanceObserverEntryList: dt,
		PerformancePaintTiming: dt,
		PerformanceResourceTiming: dt,
		PerformanceTiming: dt,
		PeriodicWave: dt,
		Permissions: dt,
		PermissionStatus: dt,
		personalbar: ct,
		PhotoCapabilities: dt,
		Plugin: dt,
		PluginArray: dt,
		PointerEvent: dt,
		PopStateEvent: dt,
		postMessage: ct,
		Presentation: dt,
		PresentationAvailability: dt,
		PresentationConnection: dt,
		PresentationConnectionAvailableEvent: dt,
		PresentationConnectionCloseEvent: dt,
		PresentationConnectionList: dt,
		PresentationReceiver: dt,
		PresentationRequest: dt,
		print: ct,
		ProcessingInstruction: dt,
		ProgressEvent: dt,
		PromiseRejectionEvent: dt,
		prompt: ct,
		PushManager: dt,
		PushSubscription: dt,
		PushSubscriptionOptions: dt,
		queueMicrotask: ct,
		RadioNodeList: dt,
		Range: dt,
		ReadableStream: dt,
		RemotePlayback: dt,
		removeEventListener: ct,
		Request: dt,
		requestAnimationFrame: ct,
		requestIdleCallback: ct,
		resizeBy: ct,
		ResizeObserver: dt,
		ResizeObserverEntry: dt,
		resizeTo: ct,
		Response: dt,
		RTCCertificate: dt,
		RTCDataChannel: dt,
		RTCDataChannelEvent: dt,
		RTCDtlsTransport: dt,
		RTCIceCandidate: dt,
		RTCIceTransport: dt,
		RTCPeerConnection: dt,
		RTCPeerConnectionIceEvent: dt,
		RTCRtpReceiver: dt,
		RTCRtpSender: dt,
		RTCSctpTransport: dt,
		RTCSessionDescription: dt,
		RTCStatsReport: dt,
		RTCTrackEvent: dt,
		screen: ct,
		Screen: dt,
		screenLeft: ct,
		ScreenOrientation: dt,
		screenTop: ct,
		screenX: ct,
		screenY: ct,
		ScriptProcessorNode: dt,
		scroll: ct,
		scrollbars: ct,
		scrollBy: ct,
		scrollTo: ct,
		scrollX: ct,
		scrollY: ct,
		SecurityPolicyViolationEvent: dt,
		Selection: dt,
		ServiceWorker: dt,
		ServiceWorkerContainer: dt,
		ServiceWorkerRegistration: dt,
		sessionStorage: ct,
		ShadowRoot: dt,
		SharedWorker: dt,
		SourceBuffer: dt,
		SourceBufferList: dt,
		speechSynthesis: ct,
		SpeechSynthesisEvent: dt,
		SpeechSynthesisUtterance: dt,
		StaticRange: dt,
		status: ct,
		statusbar: ct,
		StereoPannerNode: dt,
		stop: ct,
		Storage: dt,
		StorageEvent: dt,
		StorageManager: dt,
		styleMedia: ct,
		StyleSheet: dt,
		StyleSheetList: dt,
		SubtleCrypto: dt,
		SVGAElement: dt,
		SVGAngle: dt,
		SVGAnimatedAngle: dt,
		SVGAnimatedBoolean: dt,
		SVGAnimatedEnumeration: dt,
		SVGAnimatedInteger: dt,
		SVGAnimatedLength: dt,
		SVGAnimatedLengthList: dt,
		SVGAnimatedNumber: dt,
		SVGAnimatedNumberList: dt,
		SVGAnimatedPreserveAspectRatio: dt,
		SVGAnimatedRect: dt,
		SVGAnimatedString: dt,
		SVGAnimatedTransformList: dt,
		SVGAnimateElement: dt,
		SVGAnimateMotionElement: dt,
		SVGAnimateTransformElement: dt,
		SVGAnimationElement: dt,
		SVGCircleElement: dt,
		SVGClipPathElement: dt,
		SVGComponentTransferFunctionElement: dt,
		SVGDefsElement: dt,
		SVGDescElement: dt,
		SVGDiscardElement: dt,
		SVGElement: dt,
		SVGEllipseElement: dt,
		SVGFEBlendElement: dt,
		SVGFEColorMatrixElement: dt,
		SVGFEComponentTransferElement: dt,
		SVGFECompositeElement: dt,
		SVGFEConvolveMatrixElement: dt,
		SVGFEDiffuseLightingElement: dt,
		SVGFEDisplacementMapElement: dt,
		SVGFEDistantLightElement: dt,
		SVGFEDropShadowElement: dt,
		SVGFEFloodElement: dt,
		SVGFEFuncAElement: dt,
		SVGFEFuncBElement: dt,
		SVGFEFuncGElement: dt,
		SVGFEFuncRElement: dt,
		SVGFEGaussianBlurElement: dt,
		SVGFEImageElement: dt,
		SVGFEMergeElement: dt,
		SVGFEMergeNodeElement: dt,
		SVGFEMorphologyElement: dt,
		SVGFEOffsetElement: dt,
		SVGFEPointLightElement: dt,
		SVGFESpecularLightingElement: dt,
		SVGFESpotLightElement: dt,
		SVGFETileElement: dt,
		SVGFETurbulenceElement: dt,
		SVGFilterElement: dt,
		SVGForeignObjectElement: dt,
		SVGGElement: dt,
		SVGGeometryElement: dt,
		SVGGradientElement: dt,
		SVGGraphicsElement: dt,
		SVGImageElement: dt,
		SVGLength: dt,
		SVGLengthList: dt,
		SVGLinearGradientElement: dt,
		SVGLineElement: dt,
		SVGMarkerElement: dt,
		SVGMaskElement: dt,
		SVGMatrix: dt,
		SVGMetadataElement: dt,
		SVGMPathElement: dt,
		SVGNumber: dt,
		SVGNumberList: dt,
		SVGPathElement: dt,
		SVGPatternElement: dt,
		SVGPoint: dt,
		SVGPointList: dt,
		SVGPolygonElement: dt,
		SVGPolylineElement: dt,
		SVGPreserveAspectRatio: dt,
		SVGRadialGradientElement: dt,
		SVGRect: dt,
		SVGRectElement: dt,
		SVGScriptElement: dt,
		SVGSetElement: dt,
		SVGStopElement: dt,
		SVGStringList: dt,
		SVGStyleElement: dt,
		SVGSVGElement: dt,
		SVGSwitchElement: dt,
		SVGSymbolElement: dt,
		SVGTextContentElement: dt,
		SVGTextElement: dt,
		SVGTextPathElement: dt,
		SVGTextPositioningElement: dt,
		SVGTitleElement: dt,
		SVGTransform: dt,
		SVGTransformList: dt,
		SVGTSpanElement: dt,
		SVGUnitTypes: dt,
		SVGUseElement: dt,
		SVGViewElement: dt,
		TaskAttributionTiming: dt,
		Text: dt,
		TextEvent: dt,
		TextMetrics: dt,
		TextTrack: dt,
		TextTrackCue: dt,
		TextTrackCueList: dt,
		TextTrackList: dt,
		TimeRanges: dt,
		toolbar: ct,
		top: ct,
		Touch: dt,
		TouchEvent: dt,
		TouchList: dt,
		TrackEvent: dt,
		TransitionEvent: dt,
		TreeWalker: dt,
		UIEvent: dt,
		ValidityState: dt,
		visualViewport: ct,
		VisualViewport: dt,
		VTTCue: dt,
		WaveShaperNode: dt,
		WebAssembly: ct,
		WebGL2RenderingContext: dt,
		WebGLActiveInfo: dt,
		WebGLBuffer: dt,
		WebGLContextEvent: dt,
		WebGLFramebuffer: dt,
		WebGLProgram: dt,
		WebGLQuery: dt,
		WebGLRenderbuffer: dt,
		WebGLRenderingContext: dt,
		WebGLSampler: dt,
		WebGLShader: dt,
		WebGLShaderPrecisionFormat: dt,
		WebGLSync: dt,
		WebGLTexture: dt,
		WebGLTransformFeedback: dt,
		WebGLUniformLocation: dt,
		WebGLVertexArrayObject: dt,
		WebSocket: dt,
		WheelEvent: dt,
		Window: dt,
		Worker: dt,
		WritableStream: dt,
		XMLDocument: dt,
		XMLHttpRequest: dt,
		XMLHttpRequestEventTarget: dt,
		XMLHttpRequestUpload: dt,
		XMLSerializer: dt,
		XPathEvaluator: dt,
		XPathExpression: dt,
		XPathResult: dt,
		XSLTProcessor: dt
	};
for (const e of ['window', 'global', 'self', 'globalThis']) gt[e] = gt;
function yt(e) {
	let t = gt;
	for (const s of e) {
		if ('string' != typeof s) return null;
		if (((t = t[s]), !t)) return null;
	}
	return t[ot];
}
class xt extends be {
	constructor() {
		super(...arguments), (this.isReassigned = !0);
	}
	hasEffectsWhenAccessedAtPath(e) {
		return !(function (e) {
			return 1 === e.length ? 'undefined' === e[0] || null !== yt(e) : null !== yt(e.slice(0, -1));
		})([this.name, ...e]);
	}
	hasEffectsWhenCalledAtPath(e) {
		return !(function (e) {
			const t = yt(e);
			return null !== t && t.pure;
		})([this.name, ...e]);
	}
}
class Et extends Qe {
	constructor() {
		super(...arguments), (this.variable = null), (this.bound = !1);
	}
	addExportedVariables(e, t) {
		null !== this.variable && t.has(this.variable) && e.push(this.variable);
	}
	bind() {
		this.bound ||
			((this.bound = !0),
			null === this.variable &&
				at(this, this.parent) &&
				((this.variable = this.scope.findVariable(this.name)), this.variable.addReference(this)),
			null !== this.variable &&
				this.variable instanceof He &&
				null !== this.variable.additionalInitializers &&
				this.variable.consolidateInitializers());
	}
	declare(e, t) {
		let s;
		switch (e) {
			case 'var':
				s = this.scope.addDeclaration(this, this.context, t, !0);
				break;
			case 'function':
				s = this.scope.addDeclaration(this, this.context, t, !1);
				break;
			case 'let':
			case 'const':
			case 'class':
				s = this.scope.addDeclaration(this, this.context, t, !1);
				break;
			case 'parameter':
				s = this.scope.addParameterDeclaration(this);
				break;
			default:
				throw new Error(`Internal Error: Unexpected identifier kind ${e}.`);
		}
		return [(this.variable = s)];
	}
	deoptimizePath(e) {
		this.bound || this.bind(),
			0 !== e.length || this.scope.contains(this.name) || this.disallowImportReassignment(),
			this.variable.deoptimizePath(e);
	}
	getLiteralValueAtPath(e, t, s) {
		return this.bound || this.bind(), this.variable.getLiteralValueAtPath(e, t, s);
	}
	getReturnExpressionWhenCalledAtPath(e, t, s) {
		return this.bound || this.bind(), this.variable.getReturnExpressionWhenCalledAtPath(e, t, s);
	}
	hasEffects() {
		return (
			this.context.options.treeshake.unknownGlobalSideEffects &&
			this.variable instanceof xt &&
			this.variable.hasEffectsWhenAccessedAtPath(F)
		);
	}
	hasEffectsWhenAccessedAtPath(e, t) {
		return null !== this.variable && this.variable.hasEffectsWhenAccessedAtPath(e, t);
	}
	hasEffectsWhenAssignedAtPath(e, t) {
		return !this.variable || this.variable.hasEffectsWhenAssignedAtPath(e, t);
	}
	hasEffectsWhenCalledAtPath(e, t, s) {
		return !this.variable || this.variable.hasEffectsWhenCalledAtPath(e, t, s);
	}
	include() {
		this.included ||
			((this.included = !0), null !== this.variable && this.context.includeVariable(this.variable));
	}
	includeCallArguments(e, t) {
		this.variable.includeCallArguments(e, t);
	}
	render(
		e,
		t,
		{ renderedParentType: s, isCalleeOfRenderedParent: i, isShorthandProperty: n } = Ae
	) {
		if (this.variable) {
			const t = this.variable.getName();
			t !== this.name &&
				(e.overwrite(this.start, this.end, t, { contentOnly: !0, storeName: !0 }),
				n && e.prependRight(this.start, this.name + ': ')),
				'eval' === t && 'CallExpression' === s && i && e.appendRight(this.start, '0, ');
		}
	}
	disallowImportReassignment() {
		return this.context.error(
			{ code: 'ILLEGAL_REASSIGNMENT', message: `Illegal reassignment to import '${this.name}'` },
			this.start
		);
	}
}
class vt extends Qe {
	constructor() {
		super(...arguments), (this.declarationInit = null);
	}
	addExportedVariables(e, t) {
		this.argument.addExportedVariables(e, t);
	}
	bind() {
		super.bind(), null !== this.declarationInit && this.declarationInit.deoptimizePath([B, B]);
	}
	declare(e, t) {
		return (this.declarationInit = t), this.argument.declare(e, K);
	}
	deoptimizePath(e) {
		0 === e.length && this.argument.deoptimizePath(F);
	}
	hasEffectsWhenAssignedAtPath(e, t) {
		return e.length > 0 || this.argument.hasEffectsWhenAssignedAtPath(F, t);
	}
}
class bt extends Qe {
	constructor() {
		super(...arguments), (this.isPrototypeDeoptimized = !1);
	}
	createScope(e) {
		this.scope = new rt(e, this.context);
	}
	deoptimizePath(e) {
		1 === e.length &&
			('prototype' === e[0]
				? (this.isPrototypeDeoptimized = !0)
				: e[0] === B &&
				  ((this.isPrototypeDeoptimized = !0), this.scope.getReturnExpression().deoptimizePath(W)));
	}
	getReturnExpressionWhenCalledAtPath(e) {
		return 0 === e.length ? this.scope.getReturnExpression() : K;
	}
	hasEffects() {
		return null !== this.id && this.id.hasEffects();
	}
	hasEffectsWhenAccessedAtPath(e) {
		return (
			!(e.length <= 1) && (e.length > 2 || 'prototype' !== e[0] || this.isPrototypeDeoptimized)
		);
	}
	hasEffectsWhenAssignedAtPath(e) {
		return (
			!(e.length <= 1) && (e.length > 2 || 'prototype' !== e[0] || this.isPrototypeDeoptimized)
		);
	}
	hasEffectsWhenCalledAtPath(e, t, s) {
		if (e.length > 0) return !0;
		for (const e of this.params) if (e.hasEffects(s)) return !0;
		const i = s.replacedVariableInits.get(this.scope.thisVariable);
		s.replacedVariableInits.set(this.scope.thisVariable, t.withNew ? new pe() : K);
		const { brokenFlow: n, ignore: r } = s;
		return (
			(s.ignore = { breaks: !1, continues: !1, labels: new Set(), returnAwaitYield: !0 }),
			!!this.body.hasEffects(s) ||
				((s.brokenFlow = n),
				i
					? s.replacedVariableInits.set(this.scope.thisVariable, i)
					: s.replacedVariableInits.delete(this.scope.thisVariable),
				(s.ignore = r),
				!1)
		);
	}
	include(e, t) {
		(this.included = !0), this.id && this.id.include();
		const s = this.scope.argumentsVariable.included;
		for (const i of this.params) (i instanceof Et && !s) || i.include(e, t);
		const { brokenFlow: i } = e;
		(e.brokenFlow = 0), this.body.include(e, t), (e.brokenFlow = i);
	}
	includeCallArguments(e, t) {
		this.scope.includeCallArguments(e, t);
	}
	initialise() {
		null !== this.id && this.id.declare('function', this),
			this.scope.addParameterVariables(
				this.params.map((e) => e.declare('parameter', K)),
				this.params[this.params.length - 1] instanceof vt
			),
			this.body.addImplicitReturnExpressionToScope();
	}
	parseNode(e) {
		(this.body = new this.context.nodeConstructors.BlockStatement(
			e.body,
			this,
			this.scope.hoistedBodyVarScope
		)),
			super.parseNode(e);
	}
}
bt.prototype.preventChildBlockScope = !0;
class St extends bt {
	initialise() {
		super.initialise(), null !== this.id && (this.id.variable.isId = !0);
	}
	parseNode(e) {
		null !== e.id &&
			(this.id = new this.context.nodeConstructors.Identifier(e.id, this, this.scope.parent)),
			super.parseNode(e);
	}
}
class At extends Qe {
	include(e, t) {
		super.include(e, t), t && this.context.includeVariable(this.variable);
	}
	initialise() {
		const e = this.declaration;
		(this.declarationName = (e.id && e.id.name) || this.declaration.name),
			(this.variable = this.scope.addExportDefaultDeclaration(
				this.declarationName || this.context.getModuleName(),
				this,
				this.context
			)),
			this.context.addExport(this);
	}
	render(e, t, s) {
		const { start: i, end: n } = s,
			r = (function (e, t) {
				return k(e, C(e, 'default', t) + 7);
			})(e.original, this.start);
		if (this.declaration instanceof St)
			this.renderNamedDeclaration(e, r, 'function', '(', null === this.declaration.id, t);
		else if (this.declaration instanceof Ze)
			this.renderNamedDeclaration(e, r, 'class', '{', null === this.declaration.id, t);
		else {
			if (this.variable.getOriginalVariable() !== this.variable) return void S(this, e, i, n);
			if (!this.variable.included)
				return (
					e.remove(this.start, r),
					this.declaration.render(e, t, {
						isCalleeOfRenderedParent: !1,
						renderedParentType: 'ExpressionStatement'
					}),
					void (';' !== e.original[this.end - 1] && e.appendLeft(this.end, ';'))
				);
			this.renderVariableDeclaration(e, r, t);
		}
		this.declaration.render(e, t);
	}
	renderNamedDeclaration(e, t, s, i, n, r) {
		const a = this.variable.getName();
		e.remove(this.start, t),
			n &&
				e.appendLeft(
					(function (e, t, s, i) {
						const n = C(e, t, i) + t.length;
						e = e.slice(n, C(e, s, n));
						const r = C(e, '*');
						return -1 === r ? n : n + r + 1;
					})(e.original, s, i, t),
					' ' + a
				),
			'system' === r.format &&
				this.declaration instanceof Ze &&
				r.exportNamesByVariable.has(this.variable) &&
				e.appendLeft(this.end, ` ${M([this.variable], r)};`);
	}
	renderVariableDeclaration(e, t, s) {
		const i = 59 === e.original.charCodeAt(this.end - 1),
			n = 'system' === s.format && s.exportNamesByVariable.get(this.variable);
		n
			? (e.overwrite(
					this.start,
					t,
					`${s.varOrConst} ${this.variable.getName()} = exports('${n[0]}', `
			  ),
			  e.appendRight(i ? this.end - 1 : this.end, ')' + (i ? '' : ';')))
			: (e.overwrite(this.start, t, `${s.varOrConst} ${this.variable.getName()} = `),
			  i || e.appendLeft(this.end, ';'));
	}
}
At.prototype.needsBoundaries = !0;
class Pt extends be {
	constructor() {
		super('undefined');
	}
	getLiteralValueAtPath() {}
}
class Ct extends He {
	constructor(e, t, s) {
		super(e, t, t.declaration, s),
			(this.hasId = !1),
			(this.originalId = null),
			(this.originalVariableAndDeclarationModules = null);
		const i = t.declaration;
		(i instanceof St || i instanceof Ze) && i.id
			? ((this.hasId = !0), (this.originalId = i.id))
			: i instanceof Et && (this.originalId = i);
	}
	addReference(e) {
		this.hasId || (this.name = e.name);
	}
	getAssignedVariableName() {
		return (this.originalId && this.originalId.name) || null;
	}
	getBaseVariableName() {
		const e = this.getOriginalVariable();
		return e === this ? super.getBaseVariableName() : e.getBaseVariableName();
	}
	getName() {
		const e = this.getOriginalVariable();
		return e === this ? super.getName() : e.getName();
	}
	getOriginalVariable() {
		return this.getOriginalVariableAndDeclarationModules().original;
	}
	getOriginalVariableAndDeclarationModules() {
		if (null === this.originalVariableAndDeclarationModules)
			if (
				!this.originalId ||
				(!this.hasId &&
					(this.originalId.variable.isReassigned || this.originalId.variable instanceof Pt))
			)
				this.originalVariableAndDeclarationModules = { modules: [], original: this };
			else {
				const e = this.originalId.variable;
				if (e instanceof Ct) {
					const { modules: t, original: s } = e.getOriginalVariableAndDeclarationModules();
					this.originalVariableAndDeclarationModules = {
						modules: t.concat(this.module),
						original: s
					};
				} else this.originalVariableAndDeclarationModules = { modules: [this.module], original: e };
			}
		return this.originalVariableAndDeclarationModules;
	}
}
class Nt extends be {
	constructor(e) {
		super('_missingExportShim'), (this.module = e);
	}
}
class kt extends be {
	constructor(e, t) {
		super(e.getModuleName()),
			(this.memberVariables = null),
			(this.mergedNamespaces = []),
			(this.referencedEarly = !1),
			(this.references = []),
			(this.context = e),
			(this.module = e.module),
			(this.syntheticNamedExports = t);
	}
	addReference(e) {
		this.references.push(e), (this.name = e.name);
	}
	deoptimizePath() {
		const e = this.getMemberVariables();
		for (const t of Object.keys(e)) e[t].deoptimizePath(W);
	}
	getMemberVariables() {
		if (this.memberVariables) return this.memberVariables;
		const e = Object.create(null);
		for (const t of this.context.getExports().concat(this.context.getReexports()))
			'*' !== t[0] &&
				t !== this.module.info.syntheticNamedExports &&
				(e[t] = this.context.traceExport(t));
		return (this.memberVariables = e);
	}
	include() {
		(this.included = !0), this.context.includeAllExports();
	}
	prepareNamespace(e) {
		this.mergedNamespaces = e;
		const t = this.context.getModuleExecIndex();
		for (const e of this.references)
			if (e.context.getModuleExecIndex() <= t) {
				this.referencedEarly = !0;
				break;
			}
	}
	renderBlock(e) {
		const t = e.compact ? '' : ' ',
			s = e.compact ? '' : '\n',
			i = e.indent,
			n = this.getMemberVariables(),
			r = Object.keys(n).map((s) => {
				const r = n[s];
				if (this.referencedEarly || r.isReassigned)
					return `${i}get ${s}${t}()${t}{${t}return ${r.getName()}${e.compact ? '' : ';'}${t}}`;
				return `${i}${R[s] ? `'${s}'` : s}: ${r.getName()}`;
			});
		e.namespaceToStringTag && r.unshift(`${i}[Symbol.toStringTag]:${t}'Module'`);
		const a = this.mergedNamespaces.length > 0 || this.syntheticNamedExports;
		a || r.unshift(`${i}__proto__:${t}null`);
		let o = `{${s}${r.join(',' + s)}${s}}`;
		if (a) {
			const e = ['/*#__PURE__*/Object.create(null)'];
			this.mergedNamespaces.length > 0 && e.push(...this.mergedNamespaces.map((e) => e.getName())),
				this.syntheticNamedExports && e.push(this.module.getSyntheticNamespace().getName()),
				r.length > 0 && e.push(o),
				(o = `/*#__PURE__*/Object.assign(${e.join(',' + t)})`);
		}
		e.freeze && (o = `/*#__PURE__*/Object.freeze(${o})`);
		const h = this.getName();
		return (
			(o = `${e.varOrConst} ${h}${t}=${t}${o};`),
			'system' === e.format && e.exportNamesByVariable.has(this) && (o += `${s}${M([this], e)};`),
			o
		);
	}
	renderFirst() {
		return this.referencedEarly;
	}
}
kt.prototype.isNamespace = !0;
class wt extends be {
	constructor(e, t, s) {
		super(t), (this.context = e), (this.module = e.module), (this.syntheticNamespace = s);
	}
	getBaseVariable() {
		let e = this.syntheticNamespace;
		return (
			e instanceof Ct && (e = e.getOriginalVariable()),
			e instanceof wt && (e = e.getBaseVariable()),
			e
		);
	}
	getBaseVariableName() {
		return this.syntheticNamespace.getBaseVariableName();
	}
	getName() {
		const e = this.name;
		return `${this.syntheticNamespace.getName()}${_t(e)}`;
	}
	include() {
		this.included || ((this.included = !0), this.context.includeVariable(this.syntheticNamespace));
	}
	setRenderNames(e, t) {
		super.setRenderNames(e, t);
	}
}
const _t = (e) => (!R[e] && /^(?!\d)[\w$]+$/.test(e) ? '.' + e : `[${JSON.stringify(e)}]`),
	It = {
		auto: '_interopDefault',
		default: null,
		defaultOnly: null,
		esModule: null,
		false: null,
		true: '_interopDefaultLegacy'
	};
function $t(e, t) {
	return 'esModule' === e || (t && ('auto' === e || 'true' === e));
}
const Mt = {
	auto: '_interopNamespace',
	default: '_interopNamespaceDefault',
	defaultOnly: '_interopNamespaceDefaultOnly',
	esModule: null,
	false: null,
	true: '_interopNamespace'
};
function Tt(e, t) {
	return $t(e, t) && '_interopDefault' === It[e];
}
const Lt = {
	_interopDefault: (e, t, s, i, n) =>
		`function _interopDefault${e}(e)${e}{${e}return e${e}&&${e}e.__esModule${e}?${e}${
			n ? Rt(e) : Ot(e)
		}${s}${e}}${t}${t}`,
	_interopDefaultLegacy: (e, t, s, i, n) =>
		`function _interopDefaultLegacy${e}(e)${e}{${e}return e${e}&&${e}typeof e${e}===${e}'object'${e}&&${e}'default'${e}in e${e}?${e}${
			n ? Rt(e) : Ot(e)
		}${s}${e}}${t}${t}`,
	_interopNamespace: (e, t, s, i, n, r, a, o) =>
		`function _interopNamespace(e)${e}{${t}` +
		(o.has('_interopNamespaceDefault')
			? `${i}return e${e}&&${e}e.__esModule${e}?${e}e${e}:${e}_interopNamespaceDefault(e)${s}${t}`
			: `${i}if${e}(e${e}&&${e}e.__esModule)${e}return e;${t}` + Dt(e, t, i, i, n, r, a)) +
		`}${t}${t}`,
	_interopNamespaceDefault: (e, t, s, i, n, r, a) =>
		`function _interopNamespaceDefault(e)${e}{${t}` + Dt(e, t, i, i, n, r, a) + `}${t}${t}`,
	_interopNamespaceDefaultOnly: (e, t, s, i, n, r, a) =>
		`function _interopNamespaceDefaultOnly(e)${e}{${t}${i}return ${Ft(
			`{__proto__: null,${a ? `${e}[Symbol.toStringTag]:${e}'Module',` : ''}${e}'default':${e}e}`,
			r
		)};${t}}${t}${t}`
};
function Rt(e) {
	return `e${e}:${e}{${e}'default':${e}e${e}}`;
}
function Ot(e) {
	return `e['default']${e}:${e}e`;
}
function Dt(e, t, s, i, n, r, a) {
	return (
		`${i}var n${e}=${e}${
			a ? `{__proto__:${e}null,${e}[Symbol.toStringTag]:${e}'Module'}` : 'Object.create(null)'
		};${t}${i}if${e}(e)${e}{${t}${i}${s}Object.keys(e).forEach(function${e}(k)${e}{${t}` +
		(n ? Vt : Bt)(e, t, s, i + s + s) +
		`${i}${s}});${t}` +
		`${i}}${t}` +
		`${i}n['default']${e}=${e}e;${t}` +
		`${i}return ${Ft('n', r)};${t}`
	);
}
function Vt(e, t, s, i) {
	return `${i}if${e}(k${e}!==${e}'default')${e}{${t}${i}${s}var d${e}=${e}Object.getOwnPropertyDescriptor(e,${e}k);${t}${i}${s}Object.defineProperty(n,${e}k,${e}d.get${e}?${e}d${e}:${e}{${t}${i}${s}${s}enumerable:${e}true,${t}${i}${s}${s}get:${e}function${e}()${e}{${t}${i}${s}${s}${s}return e[k];${t}${i}${s}${s}}${t}${i}${s}});${t}${i}}${t}`;
}
function Bt(e, t, s, i) {
	return `${i}n[k]${e}=${e}e[k];${t}`;
}
function Ft(e, t) {
	return t ? `Object.freeze(${e})` : e;
}
const Wt = Object.keys(Lt);
function Ut(e, t, s, i, n, r, a, o = 'return ') {
	const h = n ? '' : ' ',
		l = n ? '' : '\n';
	if (!s)
		return `${l}${l}${o}${(function (e, t, s, i) {
			if (e.length > 0) return e[0].local;
			for (const {
				defaultVariableName: e,
				id: n,
				isChunk: r,
				name: a,
				namedExportsMode: o,
				namespaceVariableName: h,
				reexports: l
			} of t)
				if (l) return zt(a, l[0].imported, o, r, e, h, s, n, i);
		})(e, t, i, a)};`;
	let c = '';
	for (const { name: e, reexports: i } of t)
		if (i && s)
			for (const t of i)
				'*' === t.reexported &&
					(c && (c += l),
					t.needsLiveBinding
						? (c += `Object.keys(${e}).forEach(function${h}(k)${h}{${l}${r}if${h}(k${h}!==${h}'default')${h}Object.defineProperty(exports,${h}k,${h}{${l}${r}${r}enumerable:${h}true,${l}${r}${r}get:${h}function${h}()${h}{${l}${r}${r}${r}return ${e}[k];${l}${r}${r}}${l}${r}});${l}});`)
						: (c += `Object.keys(${e}).forEach(function${h}(k)${h}{${l}${r}if${h}(k${h}!==${h}'default')${h}exports[k]${h}=${h}${e}[k];${l}});`));
	for (const {
		defaultVariableName: e,
		id: n,
		isChunk: o,
		name: u,
		namedExportsMode: d,
		namespaceVariableName: p,
		reexports: f
	} of t)
		if (f && s)
			for (const t of f)
				if ('*' !== t.reexported) {
					const s = zt(u, t.imported, d, o, e, p, i, n, a);
					c && (c += l),
						(c +=
							'*' !== t.imported && t.needsLiveBinding
								? `Object.defineProperty(exports,${h}'${t.reexported}',${h}{${l}${r}enumerable:${h}true,${l}${r}get:${h}function${h}()${h}{${l}${r}${r}return ${s};${l}${r}}${l}});`
								: `exports.${t.reexported}${h}=${h}${s};`);
				}
	for (const t of e) {
		const e = 'exports.' + t.exported,
			s = t.local;
		e !== s && (c && (c += l), (c += `${e}${h}=${h}${s};`));
	}
	return c ? `${l}${l}${c}` : '';
}
function zt(e, t, s, i, n, r, a, o, h) {
	if ('default' === t) {
		if (!i) {
			const t = String(a(o)),
				s = It[t] ? n : e;
			return $t(t, h) ? s + "['default']" : s;
		}
		return s ? e + "['default']" : e;
	}
	return '*' === t ? ((i ? !s : Mt[String(a(o))]) ? r : e) : `${e}.${t}`;
}
function jt(e, t, s, i, n) {
	let r = '';
	return (
		e &&
			(t &&
				(r += (function (e) {
					return `Object.defineProperty(exports,${e}'__esModule',${e}{${e}value:${e}true${e}});`;
				})(i)),
			s &&
				(r && (r += n),
				(r += (function (e) {
					return `exports[Symbol.toStringTag]${e}=${e}'Module';`;
				})(i)))),
		r
	);
}
function Gt(e, t, s, i, n, r, a, o, h, l, c) {
	const u = new Set(),
		d = [],
		p = (e, s, i) => {
			u.add(s), d.push(`${t} ${e}${o}=${o}/*#__PURE__*/${s}(${i});`);
		};
	for (const {
		defaultVariableName: t,
		imports: i,
		id: n,
		isChunk: r,
		name: a,
		namedExportsMode: o,
		namespaceVariableName: h,
		reexports: l
	} of e)
		if (r) {
			for (const { imported: e, reexported: t } of [...(i || []), ...(l || [])])
				if ('*' === e && '*' !== t) {
					o || p(h, '_interopNamespaceDefaultOnly', a);
					break;
				}
		} else {
			const e = String(s(n));
			let r = !1,
				o = !1;
			for (const { imported: s, reexported: n } of [...(i || []), ...(l || [])]) {
				let i, l;
				'default' === s
					? r || ((r = !0), t !== h && ((l = t), (i = It[e])))
					: '*' === s && '*' !== n && (o || ((o = !0), (i = Mt[e]), (l = h))),
					i && p(l, i, a);
			}
		}
	return `${(function (e, t, s, i, n, r, a, o, h) {
		return Wt.map((l) => (e.has(l) || t.has(l) ? Lt[l](s, i, n, r, a, o, h, e) : '')).join('');
	})(u, a, o, h, l, c, i, n, r)}${d.length > 0 ? `${d.join(h)}${h}${h}` : ''}`;
}
const Ht = {
	assert: !0,
	buffer: !0,
	console: !0,
	constants: !0,
	domain: !0,
	events: !0,
	http: !0,
	https: !0,
	os: !0,
	path: !0,
	process: !0,
	punycode: !0,
	querystring: !0,
	stream: !0,
	string_decoder: !0,
	timers: !0,
	tty: !0,
	url: !0,
	util: !0,
	vm: !0,
	zlib: !0
};
function qt(e, t) {
	const s = t.map(({ id: e }) => e).filter((e) => e in Ht);
	if (!s.length) return;
	e({
		code: 'MISSING_NODE_BUILTINS',
		message: `Creating a browser bundle that depends on Node.js built-in ${
			1 === s.length
				? `module ('${s[0]}')`
				: `modules (${s
						.slice(0, -1)
						.map((e) => `'${e}'`)
						.join(', ')} and '${s.slice(-1)}')`
		}. You might need to include https://github.com/ionic-team/rollup-plugin-node-polyfills`,
		modules: s
	});
}
function Kt(e) {
	return e.replace(/^\t+/, (e) => e.split('\t').join('  '));
}
function Xt(e) {
	return e.replace(/[\0?*]/g, '_');
}
function Yt(e) {
	const t = De(e);
	return t.substr(0, t.length - Be(e).length);
}
function Qt(e) {
	return 'undefined' != typeof process && Le(e) ? Fe(process.cwd(), e) : e;
}
function Jt(e) {
	return !(
		'/' === e[0] ||
		('.' === e[0] && ('/' === e[1] || '.' === e[1])) ||
		Xt(e) !== e ||
		Le(e)
	);
}
function Zt(e) {
	throw (e instanceof Error || (e = Object.assign(new Error(e.message), e)), e);
}
function es(e, t, s, i) {
	if ('object' == typeof t) {
		const { line: s, column: n } = t;
		e.loc = { file: i, line: s, column: n };
	} else {
		e.pos = t;
		const { line: n, column: r } = Xe(s, t, { offsetLine: 1 });
		e.loc = { file: i, line: n, column: r };
	}
	if (void 0 === e.frame) {
		const { line: t, column: i } = e.loc;
		e.frame = (function (e, t, s) {
			let i = e.split('\n');
			const n = Math.max(0, t - 3);
			let r = Math.min(t + 2, i.length);
			for (i = i.slice(n, r); !/\S/.test(i[i.length - 1]); ) i.pop(), (r -= 1);
			const a = String(r).length;
			return i
				.map((e, i) => {
					const r = n + i + 1 === t;
					let o = String(i + n + 1);
					for (; o.length < a; ) o = ' ' + o;
					if (r) {
						const t =
							(function (e) {
								let t = '';
								for (; e--; ) t += ' ';
								return t;
							})(a + 2 + Kt(e.slice(0, s)).length) + '^';
						return `${o}: ${Kt(e)}\n${t}`;
					}
					return `${o}: ${Kt(e)}`;
				})
				.join('\n');
		})(s, t, i);
	}
}
var ts;
function ss(e, t, s) {
	return {
		code: 'INVALID_EXPORT_OPTION',
		message: `"${e}" was specified for "output.exports", but entry module "${Qt(
			s
		)}" has the following exports: ${t.join(', ')}`
	};
}
function is(e) {
	const t = Array.from(e.implicitlyLoadedBefore, (e) => Qt(e.id)).sort();
	return {
		code: ts.MISSING_IMPLICIT_DEPENDANT,
		message: `Module "${Qt(e.id)}" that should be implicitly loaded before "${
			1 === t.length ? t[0] : `${t.slice(0, -1).join('", "')}" and "${t.slice(-1)[0]}`
		}" is not included in the module graph. Either it was not imported by an included module or only via a tree-shaken dynamic import, or no imported bindings were used and it had otherwise no side-effects.`
	};
}
function ns(e, t, s) {
	return {
		code: ts.NAMESPACE_CONFLICT,
		message: `Conflicting namespaces: ${Qt(t.id)} re-exports '${e}' from both ${Qt(
			t.exportsAll[e]
		)} and ${Qt(s.exportsAll[e])} (will be ignored)`,
		name: e,
		reexporter: t.id,
		sources: [t.exportsAll[e], s.exportsAll[e]]
	};
}
function rs(e, t, s) {
	const i = s ? 'reexport' : 'import';
	return {
		code: ts.UNEXPECTED_NAMED_IMPORT,
		id: e,
		message: `The named export "${t}" was ${i}ed from the external module ${Qt(
			e
		)} even though its interop type is "defaultOnly". Either remove or change this ${i} or change the value of the "output.interop" option.`,
		url: 'https://rollupjs.org/guide/en/#outputinterop'
	};
}
function as(e) {
	return {
		code: ts.UNEXPECTED_NAMED_IMPORT,
		id: e,
		message: `There was a namespace "*" reexport from the external module ${Qt(
			e
		)} even though its interop type is "defaultOnly". This will be ignored as namespace reexports only reexport named exports. If this is not intended, either remove or change this reexport or change the value of the "output.interop" option.`,
		url: 'https://rollupjs.org/guide/en/#outputinterop'
	};
}
function os(e) {
	return { code: ts.VALIDATION_ERROR, message: e };
}
function hs(e, t, s) {
	ls(e, t, s.onwarn, s.strictDeprecations);
}
function ls(e, t, s, i) {
	if (t || i) {
		const t = (function (e) {
			return { code: ts.DEPRECATED_FEATURE, ...('string' == typeof e ? { message: e } : e) };
		})(e);
		if (i) return Zt(t);
		s(t);
	}
}
!(function (e) {
	(e.ASSET_NOT_FINALISED = 'ASSET_NOT_FINALISED'),
		(e.ASSET_NOT_FOUND = 'ASSET_NOT_FOUND'),
		(e.ASSET_SOURCE_ALREADY_SET = 'ASSET_SOURCE_ALREADY_SET'),
		(e.ASSET_SOURCE_MISSING = 'ASSET_SOURCE_MISSING'),
		(e.BAD_LOADER = 'BAD_LOADER'),
		(e.CANNOT_EMIT_FROM_OPTIONS_HOOK = 'CANNOT_EMIT_FROM_OPTIONS_HOOK'),
		(e.CHUNK_NOT_GENERATED = 'CHUNK_NOT_GENERATED'),
		(e.DEPRECATED_FEATURE = 'DEPRECATED_FEATURE'),
		(e.FILE_NOT_FOUND = 'FILE_NOT_FOUND'),
		(e.FILE_NAME_CONFLICT = 'FILE_NAME_CONFLICT'),
		(e.INPUT_HOOK_IN_OUTPUT_PLUGIN = 'INPUT_HOOK_IN_OUTPUT_PLUGIN'),
		(e.INVALID_CHUNK = 'INVALID_CHUNK'),
		(e.INVALID_EXPORT_OPTION = 'INVALID_EXPORT_OPTION'),
		(e.INVALID_EXTERNAL_ID = 'INVALID_EXTERNAL_ID'),
		(e.INVALID_OPTION = 'INVALID_OPTION'),
		(e.INVALID_PLUGIN_HOOK = 'INVALID_PLUGIN_HOOK'),
		(e.INVALID_ROLLUP_PHASE = 'INVALID_ROLLUP_PHASE'),
		(e.MISSING_IMPLICIT_DEPENDANT = 'MISSING_IMPLICIT_DEPENDANT'),
		(e.MIXED_EXPORTS = 'MIXED_EXPORTS'),
		(e.NAMESPACE_CONFLICT = 'NAMESPACE_CONFLICT'),
		(e.NO_TRANSFORM_MAP_OR_AST_WITHOUT_CODE = 'NO_TRANSFORM_MAP_OR_AST_WITHOUT_CODE'),
		(e.PLUGIN_ERROR = 'PLUGIN_ERROR'),
		(e.PREFER_NAMED_EXPORTS = 'PREFER_NAMED_EXPORTS'),
		(e.UNEXPECTED_NAMED_IMPORT = 'UNEXPECTED_NAMED_IMPORT'),
		(e.UNRESOLVED_ENTRY = 'UNRESOLVED_ENTRY'),
		(e.UNRESOLVED_IMPORT = 'UNRESOLVED_IMPORT'),
		(e.VALIDATION_ERROR = 'VALIDATION_ERROR'),
		(e.EXTERNAL_SYNTHETIC_EXPORTS = 'EXTERNAL_SYNTHETIC_EXPORTS'),
		(e.SYNTHETIC_NAMED_EXPORTS_NEED_NAMESPACE_EXPORT =
			'SYNTHETIC_NAMED_EXPORTS_NEED_NAMESPACE_EXPORT');
})(ts || (ts = {}));
const cs = /^[a-zA-Z$_][a-zA-Z0-9$_]*$/;
function us(e) {
	return cs.test(e) ? '.' + e : `['${e}']`;
}
function ds(e) {
	return e.split('.').map(us).join('');
}
function ps(e, t, s, i, n) {
	const r = i ? '' : ' ',
		a = e.split('.');
	a[0] = ('function' == typeof s ? s(a[0]) : s[a[0]]) || a[0];
	const o = a.pop();
	let h = t,
		l = a
			.map((e) => ((h += us(e)), `${h}${r}=${r}${h}${r}||${r}{}`))
			.concat(`${h}${us(o)}`)
			.join(',' + r)
			.concat(`${r}=${r}${n}`);
	return a.length > 0 && (l = `(${l})`), l;
}
function fs(e) {
	let t = e.length;
	for (; t--; ) {
		const { imports: s, reexports: i } = e[t];
		if (s || i) return e.slice(0, t + 1);
	}
	return [];
}
const ms = (e) => 'this' + ds(e);
function gs({ dependencies: e, exports: t }) {
	const s = new Set(t.map((e) => e.exported));
	s.has('default') || s.add('default');
	for (const { reexports: t } of e)
		if (t) for (const e of t) '*' === e.imported || s.has(e.reexported) || s.add(e.reexported);
	return s;
}
function ys(e, t, s, i) {
	return 0 === e.length
		? ''
		: 1 === e.length
		? `${s}${s}${s}exports('${e[0].name}',${t}${e[0].value});${i}${i}`
		: `${s}${s}${s}exports({${i}` +
		  e.map(({ name: e, value: i }) => `${s}${s}${s}${s}${e}:${t}${i}`).join(',' + i) +
		  `${i}${s}${s}${s}});${i}${i}`;
}
function xs(e, t) {
	return e ? `${t}${ds(e)}` : 'null';
}
var Es = {
	system: function (
		e,
		{
			accessedGlobals: t,
			dependencies: s,
			exports: i,
			hasExports: n,
			indentString: r,
			intro: a,
			outro: o,
			usesTopLevelAwait: h,
			varOrConst: l
		},
		c
	) {
		const u = c.compact ? '' : '\n',
			d = c.compact ? '' : ' ',
			p = s.map((e) => `'${e.id}'`),
			f = [];
		let m;
		const g = [];
		for (const { imports: e, reexports: t } of s) {
			const n = [];
			if (e)
				for (const t of e)
					f.push(t.local),
						'*' === t.imported
							? n.push(`${t.local}${d}=${d}module;`)
							: n.push(`${t.local}${d}=${d}module.${t.imported};`);
			if (t) {
				let e = !1;
				if (
					t.length > 1 ||
					(1 === t.length && ('*' === t[0].reexported || '*' === t[0].imported))
				) {
					for (const a of t)
						'*' === a.reexported &&
							(m || (m = gs({ dependencies: s, exports: i })),
							e || (n.push(`${l} _setter${d}=${d}{};`), (e = !0)),
							n.push(`for${d}(var _$p${d}in${d}module)${d}{`),
							n.push(`${r}if${d}(!_starExcludes[_$p])${d}_setter[_$p]${d}=${d}module[_$p];`),
							n.push('}'));
					for (const e of t)
						'*' === e.imported &&
							'*' !== e.reexported &&
							n.push(`exports('${e.reexported}',${d}module);`);
					for (const s of t)
						'*' !== s.reexported &&
							'*' !== s.imported &&
							(e || (n.push(`${l} _setter${d}=${d}{};`), (e = !0)),
							n.push(`_setter.${s.reexported}${d}=${d}module.${s.imported};`));
					e && n.push('exports(_setter);');
				} else for (const e of t) n.push(`exports('${e.reexported}',${d}module.${e.imported});`);
			}
			g.push(n.join(`${u}${r}${r}${r}`));
		}
		const y = c.name ? `'${c.name}',${d}` : '',
			x = t.has('module') ? `exports,${d}module` : n ? 'exports' : '';
		let E =
			`System.register(${y}[` +
			p.join(',' + d) +
			`],${d}function${d}(${x})${d}{${u}${r}${c.strict ? "'use strict';" : ''}` +
			((e, t, s, i, n) =>
				e
					? `${n}${i}${t} _starExcludes${s}=${s}{${s}${[...e]
							.map((e) => `${e}:${s}1`)
							.join(',' + s)}${s}};`
					: '')(m, l, d, r, u) +
			((e, t, s, i) => (e.length ? `${i}${s}var ${e.join(',' + t)};` : ''))(f, d, r, u) +
			`${u}${r}return${d}{${
				g.length
					? `${u}${r}${r}setters:${d}[${g
							.map((e) =>
								e
									? `function${d}(module)${d}{${u}${r}${r}${r}${e}${u}${r}${r}}`
									: c.systemNullSetters
									? 'null'
									: `function${d}()${d}{}`
							)
							.join(',' + d)}],`
					: ''
			}${u}`;
		E +=
			`${r}${r}execute:${d}${h ? 'async' + d : ''}function${d}()${d}{${u}${u}` +
			((e, t, s, i) =>
				ys(
					e
						.filter((e) => e.hoisted || e.uninitialized)
						.map((e) => ({ name: e.exported, value: e.uninitialized ? 'void 0' : e.local })),
					t,
					s,
					i
				))(i, d, r, u);
		const v =
			`${u}${u}` +
			((e, t, s, i) =>
				ys(
					e.filter((e) => e.expression).map((e) => ({ name: e.exported, value: e.local })),
					t,
					s,
					i
				))(i, d, r, u) +
			((e, t, s, i) =>
				ys(
					e
						.filter((e) => '_missingExportShim' === e.local)
						.map((e) => ({ name: e.exported, value: '_missingExportShim' })),
					t,
					s,
					i
				))(i, d, r, u) +
			`${r}${r}}${u}${r}}${c.compact ? '' : ';'}${u}});`;
		return a && e.prepend(a), o && e.append(o), e.indent(`${r}${r}${r}`).append(v).prepend(E);
	},
	amd: function (
		e,
		{
			accessedGlobals: t,
			dependencies: s,
			exports: i,
			hasExports: n,
			indentString: r,
			intro: a,
			isEntryFacade: o,
			isModuleFacade: h,
			namedExportsMode: l,
			outro: c,
			varOrConst: u,
			warn: d
		},
		{
			amd: { define: p, id: f },
			compact: m,
			esModule: g,
			externalLiveBindings: y,
			freeze: x,
			interop: E,
			namespaceToStringTag: v,
			strict: b
		}
	) {
		qt(d, s);
		const S = s.map((e) => {
				return `'${((t = e.id), '.' === t[0] && t.endsWith('.js') ? t.slice(0, -3) : t)}'`;
				var t;
			}),
			A = s.map((e) => e.name),
			P = m ? '' : '\n',
			C = m ? '' : ';',
			N = m ? '' : ' ';
		l && n && (A.unshift('exports'), S.unshift("'exports'")),
			t.has('require') && (A.unshift('require'), S.unshift("'require'")),
			t.has('module') && (A.unshift('module'), S.unshift("'module'"));
		const k = (f ? `'${f}',${N}` : '') + (S.length ? `[${S.join(',' + N)}],${N}` : ''),
			w = b ? N + "'use strict';" : '';
		e.prepend(`${a}${Gt(s, u, E, y, x, v, t, N, P, C, r)}`);
		const _ = Ut(i, s, l, E, m, r, y);
		let I = jt(l && n, o && g, h && v, N, P);
		return (
			I && (I = P + P + I),
			e.append(`${_}${I}${c}`),
			e
				.indent(r)
				.prepend(`${p}(${k}function${N}(${A.join(',' + N)})${N}{${w}${P}${P}`)
				.append(`${P}${P}});`)
		);
	},
	cjs: function (
		e,
		{
			accessedGlobals: t,
			dependencies: s,
			exports: i,
			hasExports: n,
			indentString: r,
			intro: a,
			isEntryFacade: o,
			isModuleFacade: h,
			namedExportsMode: l,
			outro: c,
			varOrConst: u
		},
		{
			compact: d,
			esModule: p,
			externalLiveBindings: f,
			freeze: m,
			interop: g,
			namespaceToStringTag: y,
			strict: x
		}
	) {
		const E = d ? '' : '\n',
			v = d ? '' : ';',
			b = d ? '' : ' ',
			S = x ? `'use strict';${E}${E}` : '';
		let A = jt(l && n, o && p, h && y, b, E);
		A && (A += E + E);
		const P = (function (e, t, s, i, n) {
				let r = '',
					a = !1;
				for (const { id: o, name: h, reexports: l, imports: c } of e)
					l || c
						? ((r += t && a ? ',' : `${r ? ';' + i : ''}${s} `),
						  (a = !0),
						  (r += `${h}${n}=${n}require('${o}')`))
						: (r && (r += !t || a ? ';' + i : ','), (a = !1), (r += `require('${o}')`));
				if (r) return `${r};${i}${i}`;
				return '';
			})(s, d, u, E, b),
			C = Gt(s, u, g, f, m, y, t, b, E, v, r);
		e.prepend(`${S}${a}${A}${P}${C}`);
		const N = Ut(i, s, l, g, d, r, f, `module.exports${b}=${b}`);
		return e.append(`${N}${c}`);
	},
	es: function (
		e,
		{ intro: t, outro: s, dependencies: i, exports: n, varOrConst: r },
		{ compact: a }
	) {
		const o = a ? '' : ' ',
			h = a ? '' : '\n',
			l = (function (e, t) {
				const s = [];
				for (const { id: i, reexports: n, imports: r, name: a } of e)
					if (n || r) {
						if (r) {
							let e = null,
								n = null;
							const a = [];
							for (const t of r)
								'default' === t.imported ? (e = t) : '*' === t.imported ? (n = t) : a.push(t);
							n && s.push(`import${t}*${t}as ${n.local} from${t}'${i}';`),
								e && 0 === a.length
									? s.push(`import ${e.local} from${t}'${i}';`)
									: a.length > 0 &&
									  s.push(
											`import ${e ? `${e.local},${t}` : ''}{${t}${a
												.map((e) =>
													e.imported === e.local ? e.imported : `${e.imported} as ${e.local}`
												)
												.join(',' + t)}${t}}${t}from${t}'${i}';`
									  );
						}
						if (n) {
							let e = null;
							const o = [],
								h = [];
							for (const t of n)
								'*' === t.reexported ? (e = t) : '*' === t.imported ? o.push(t) : h.push(t);
							if ((e && s.push(`export${t}*${t}from${t}'${i}';`), o.length > 0)) {
								(r && r.some((e) => '*' === e.imported && e.local === a)) ||
									s.push(`import${t}*${t}as ${a} from${t}'${i}';`);
								for (const e of o)
									s.push(`export${t}{${t}${a === e.reexported ? a : `${a} as ${e.reexported}`} };`);
							}
							h.length > 0 &&
								s.push(
									`export${t}{${t}${h
										.map((e) =>
											e.imported === e.reexported ? e.imported : `${e.imported} as ${e.reexported}`
										)
										.join(',' + t)}${t}}${t}from${t}'${i}';`
								);
						}
					} else s.push(`import${t}'${i}';`);
				return s;
			})(i, o);
		l.length > 0 && (t += l.join(h) + h + h), t && e.prepend(t);
		const c = (function (e, t, s) {
			const i = [],
				n = [];
			for (const r of e)
				'default' === r.exported
					? i.push(`export default ${r.local};`)
					: (r.expression && i.push(`${s} ${r.local}${t}=${t}${r.expression};`),
					  n.push(r.exported === r.local ? r.local : `${r.local} as ${r.exported}`));
			n.length && i.push(`export${t}{${t}${n.join(',' + t)}${t}};`);
			return i;
		})(n, o, r);
		return c.length && e.append(h + h + c.join(h).trim()), s && e.append(s), e.trim();
	},
	iife: function (
		e,
		{
			accessedGlobals: t,
			dependencies: s,
			exports: i,
			hasExports: n,
			indentString: r,
			intro: a,
			namedExportsMode: o,
			outro: h,
			varOrConst: l,
			warn: c
		},
		{
			compact: u,
			esModule: d,
			extend: p,
			freeze: f,
			externalLiveBindings: m,
			globals: g,
			interop: y,
			name: x,
			namespaceToStringTag: E,
			strict: v
		}
	) {
		const b = u ? '' : ' ',
			S = u ? '' : ';',
			A = u ? '' : '\n',
			P = x && -1 !== x.indexOf('.'),
			C = !p && !P;
		if (x && C && (Ie((N = x)) || we.has(N) || _e.test(N)))
			return Zt({
				code: 'ILLEGAL_IDENTIFIER_AS_NAME',
				message: `Given name "${x}" is not a legal JS identifier. If you need this, you can try "output.extend: true".`
			});
		var N;
		qt(c, s);
		const k = fs(s),
			w = k.map((e) => e.globalName || 'null'),
			_ = k.map((e) => e.name);
		n &&
			!x &&
			c({
				code: 'MISSING_NAME_OPTION_FOR_IIFE_EXPORT',
				message:
					'If you do not supply "output.name", you may not be able to access the exports of an IIFE bundle.'
			}),
			o &&
				n &&
				(p
					? (w.unshift(`${ms(x)}${b}=${b}${ms(x)}${b}||${b}{}`), _.unshift('exports'))
					: (w.unshift('{}'), _.unshift('exports')));
		const I = v ? `${r}'use strict';${A}` : '',
			$ = Gt(s, l, y, m, f, E, t, b, A, S, r);
		e.prepend(`${a}${$}`);
		let M = `(function${b}(${_.join(',' + b)})${b}{${A}${I}${A}`;
		n &&
			(!x || (p && o) || (M = (C ? `${l} ${x}` : ms(x)) + `${b}=${b}${M}`),
			P &&
				(M =
					(function (e, t, s, i) {
						const n = i ? '' : ' ',
							r = e.split('.');
						(r[0] = ('function' == typeof s ? s(r[0]) : s[r[0]]) || r[0]), r.pop();
						let a = t;
						return (
							r
								.map((e) => ((a += us(e)), `${a}${n}=${n}${a}${n}||${n}{}${i ? '' : ';'}`))
								.join(i ? ',' : '\n') + (i && r.length ? ';' : '\n')
						);
					})(x, 'this', g, u) + M));
		let T = `${A}${A}}(${w.join(',' + b)}));`;
		n && !p && o && (T = `${A}${A}${r}return exports;${T}`);
		const L = Ut(i, s, o, y, u, r, m);
		let R = jt(o && n, d, E, b, A);
		return R && (R = A + A + R), e.append(`${L}${R}${h}`), e.indent(r).prepend(M).append(T);
	},
	umd: function (
		e,
		{
			accessedGlobals: t,
			dependencies: s,
			exports: i,
			hasExports: n,
			indentString: r,
			intro: a,
			namedExportsMode: o,
			outro: h,
			varOrConst: l,
			warn: c
		},
		{
			amd: { define: u, id: d },
			compact: p,
			esModule: f,
			extend: m,
			externalLiveBindings: g,
			freeze: y,
			interop: x,
			name: E,
			namespaceToStringTag: v,
			globals: b,
			noConflict: S,
			strict: A
		}
	) {
		const P = p ? '' : ' ',
			C = p ? '' : '\n',
			N = p ? '' : ';',
			k = p ? 'f' : 'factory',
			w = p ? 'g' : 'global';
		if (n && !E)
			return Zt({
				code: 'MISSING_NAME_OPTION_FOR_IIFE_EXPORT',
				message:
					'You must supply "output.name" for UMD bundles that have exports so that the exports are accessible in environments without a module loader.'
			});
		qt(c, s);
		const _ = s.map((e) => `'${e.id}'`),
			I = s.map((e) => `require('${e.id}')`),
			$ = fs(s),
			M = $.map((e) => xs(e.globalName, w)),
			T = $.map((e) => e.name);
		o &&
			(n || S) &&
			(_.unshift("'exports'"),
			I.unshift('exports'),
			M.unshift(ps(E, w, b, p, (m ? `${xs(E, w)}${P}||${P}` : '') + '{}')),
			T.unshift('exports'));
		const L = (d ? `'${d}',${P}` : '') + (_.length ? `[${_.join(',' + P)}],${P}` : ''),
			R = u,
			O = !o && n ? `module.exports${P}=${P}` : '',
			D = A ? `${P}'use strict';${C}` : '';
		let V;
		if (S) {
			const e = p ? 'e' : 'exports';
			let t;
			if (!o && n) t = `var ${e}${P}=${P}${ps(E, w, b, p, `${k}(${M.join(',' + P)})`)};`;
			else {
				t = `var ${e}${P}=${P}${M.shift()};${C}${r}${r}${k}(${[e].concat(M).join(',' + P)});`;
			}
			V =
				`(function${P}()${P}{${C}${r}${r}var current${P}=${P}${(function (e, t, s) {
					const i = e.split('.');
					let n = t;
					return i.map((e) => (n += us(e))).join(`${s}&&${s}`);
				})(
					E,
					w,
					P
				)};${C}${r}${r}${t}${C}${r}${r}${e}.noConflict${P}=${P}function${P}()${P}{${P}${xs(
					E,
					w
				)}${P}=${P}current;${P}return ${e}${p ? '' : '; '}};${C}` +
				r +
				'}())';
		} else (V = `${k}(${M.join(',' + P)})`), !o && n && (V = ps(E, w, b, p, V));
		const B = n || (S && o) || M.length > 0,
			F = B ? 'this,' + P : '',
			W = B
				? `(${w}${P}=${P}typeof globalThis${P}!==${P}'undefined'${P}?${P}globalThis${P}:${P}${w}${P}||${P}self,${P}`
				: '',
			U = B ? ')' : '',
			z =
				`(function${P}(${B ? `${w},${P}` : ''}${k})${P}{${C}` +
				(B
					? `${r}typeof exports${P}===${P}'object'${P}&&${P}typeof module${P}!==${P}'undefined'${P}?${P}${O}${k}(${I.join(
							',' + P
					  )})${P}:${C}`
					: '') +
				`${r}typeof ${R}${P}===${P}'function'${P}&&${P}${R}.amd${P}?${P}${R}(${L}${k})${P}:${C}` +
				`${r}${W}${V}${U};${C}` +
				`}(${F}(function${P}(${T.join(', ')})${P}{${D}${C}`,
			j = C + C + '})));';
		e.prepend(`${a}${Gt(s, l, x, g, y, v, t, P, C, N, r)}`);
		const G = Ut(i, s, o, x, p, r, g);
		let H = jt(o && n, f, v, P, C);
		return H && (H = C + C + H), e.append(`${G}${H}${h}`), e.trim().indent(r).append(j).prepend(z);
	}
};
const vs = {
		ArrayPattern(e, t) {
			for (const s of t.elements) s && vs[s.type](e, s);
		},
		AssignmentPattern(e, t) {
			vs[t.left.type](e, t.left);
		},
		Identifier(e, t) {
			e.push(t.name);
		},
		MemberExpression() {},
		ObjectPattern(e, t) {
			for (const s of t.properties)
				'RestElement' === s.type ? vs.RestElement(e, s) : vs[s.value.type](e, s.value);
		},
		RestElement(e, t) {
			vs[t.argument.type](e, t.argument);
		}
	},
	bs = function (e) {
		const t = [];
		return vs[e.type](t, e), t;
	};
class Ss extends Qe {
	hasEffects() {
		return !1;
	}
	initialise() {
		this.context.addExport(this);
	}
	render(e, t, s) {
		e.remove(s.start, s.end);
	}
}
Ss.prototype.needsBoundaries = !0;
class As extends Ke {
	addDeclaration(e, t, s, i) {
		return i ? this.parent.addDeclaration(e, t, K, i) : super.addDeclaration(e, t, s, !1);
	}
}
class Ps extends Qe {
	initialise() {
		this.directive &&
			'use strict' !== this.directive &&
			'Program' === this.parent.type &&
			this.context.warn(
				{
					code: 'MODULE_LEVEL_DIRECTIVE',
					message: `Module level directives cause errors when bundled, '${this.directive}' was ignored.`
				},
				this.start
			);
	}
	render(e, t) {
		super.render(e, t), this.included && this.insertSemicolon(e);
	}
	shouldBeIncluded(e) {
		return this.directive && 'use strict' !== this.directive
			? 'Program' !== this.parent.type
			: super.shouldBeIncluded(e);
	}
}
class Cs extends Qe {
	constructor() {
		super(...arguments), (this.directlyIncluded = !1);
	}
	addImplicitReturnExpressionToScope() {
		const e = this.body[this.body.length - 1];
		(e && 'ReturnStatement' === e.type) || this.scope.addReturnExpression(K);
	}
	createScope(e) {
		this.scope = this.parent.preventChildBlockScope ? e : new As(e);
	}
	hasEffects(e) {
		if (this.deoptimizeBody) return !0;
		for (const t of this.body) {
			if (t.hasEffects(e)) return !0;
			if (e.brokenFlow) break;
		}
		return !1;
	}
	include(e, t) {
		if (!this.deoptimizeBody || !this.directlyIncluded) {
			(this.included = !0), (this.directlyIncluded = !0), this.deoptimizeBody && (t = !0);
			for (const s of this.body) (t || s.shouldBeIncluded(e)) && s.include(e, t);
		}
	}
	initialise() {
		const e = this.body[0];
		this.deoptimizeBody = e instanceof Ps && 'use asm' === e.directive;
	}
	render(e, t) {
		this.body.length ? _(this.body, e, this.start + 1, this.end - 1, t) : super.render(e, t);
	}
}
class Ns extends Qe {
	createScope(e) {
		this.scope = new nt(e, this.context);
	}
	deoptimizePath(e) {
		1 === e.length && e[0] === B && this.scope.getReturnExpression().deoptimizePath(W);
	}
	getReturnExpressionWhenCalledAtPath(e) {
		return 0 === e.length ? this.scope.getReturnExpression() : K;
	}
	hasEffects() {
		return !1;
	}
	hasEffectsWhenAccessedAtPath(e) {
		return e.length > 1;
	}
	hasEffectsWhenAssignedAtPath(e) {
		return e.length > 1;
	}
	hasEffectsWhenCalledAtPath(e, t, s) {
		if (e.length > 0) return !0;
		for (const e of this.params) if (e.hasEffects(s)) return !0;
		const { ignore: i, brokenFlow: n } = s;
		return (
			(s.ignore = { breaks: !1, continues: !1, labels: new Set(), returnAwaitYield: !0 }),
			!!this.body.hasEffects(s) || ((s.ignore = i), (s.brokenFlow = n), !1)
		);
	}
	include(e, t) {
		this.included = !0;
		for (const s of this.params) s instanceof Et || s.include(e, t);
		const { brokenFlow: s } = e;
		(e.brokenFlow = 0), this.body.include(e, t), (e.brokenFlow = s);
	}
	includeCallArguments(e, t) {
		this.scope.includeCallArguments(e, t);
	}
	initialise() {
		this.scope.addParameterVariables(
			this.params.map((e) => e.declare('parameter', K)),
			this.params[this.params.length - 1] instanceof vt
		),
			this.body instanceof Cs
				? this.body.addImplicitReturnExpressionToScope()
				: this.scope.addReturnExpression(this.body);
	}
	parseNode(e) {
		'BlockStatement' === e.body.type &&
			(this.body = new this.context.nodeConstructors.BlockStatement(
				e.body,
				this,
				this.scope.hoistedBodyVarScope
			)),
			super.parseNode(e);
	}
}
Ns.prototype.preventChildBlockScope = !0;
const ks = {
	'!=': (e, t) => e != t,
	'!==': (e, t) => e !== t,
	'%': (e, t) => e % t,
	'&': (e, t) => e & t,
	'*': (e, t) => e * t,
	'**': (e, t) => e ** t,
	'+': (e, t) => e + t,
	'-': (e, t) => e - t,
	'/': (e, t) => e / t,
	'<': (e, t) => e < t,
	'<<': (e, t) => e << t,
	'<=': (e, t) => e <= t,
	'==': (e, t) => e == t,
	'===': (e, t) => e === t,
	'>': (e, t) => e > t,
	'>=': (e, t) => e >= t,
	'>>': (e, t) => e >> t,
	'>>>': (e, t) => e >>> t,
	'^': (e, t) => e ^ t,
	in: () => q,
	instanceof: () => q,
	'|': (e, t) => e | t
};
class ws extends Qe {
	getLiteralValueAtPath(e) {
		return e.length > 0 ||
			(null === this.value && 110 !== this.context.code.charCodeAt(this.start)) ||
			'bigint' == typeof this.value ||
			47 === this.context.code.charCodeAt(this.start)
			? q
			: this.value;
	}
	getReturnExpressionWhenCalledAtPath(e) {
		return 1 !== e.length ? K : ve(this.members, e[0]);
	}
	hasEffectsWhenAccessedAtPath(e) {
		return null === this.value ? e.length > 0 : e.length > 1;
	}
	hasEffectsWhenAssignedAtPath(e) {
		return e.length > 0;
	}
	hasEffectsWhenCalledAtPath(e, t, s) {
		return 1 !== e.length || Ee(this.members, e[0], this.included, t, s);
	}
	initialise() {
		this.members = (function (e) {
			switch (typeof e) {
				case 'boolean':
					return ge;
				case 'number':
					return ye;
				case 'string':
					return xe;
				default:
					return Object.create(null);
			}
		})(this.value);
	}
	parseNode(e) {
		(this.value = e.value), (this.regex = e.regex), super.parseNode(e);
	}
	render(e) {
		'string' == typeof this.value && e.indentExclusionRanges.push([this.start + 1, this.end - 1]);
	}
}
function _s(e) {
	return e.computed
		? (function (e) {
				if (e instanceof ws) return String(e.value);
				return null;
		  })(e.property)
		: e.property.name;
}
function Is(e) {
	const t = e.propertyKey,
		s = e.object;
	if ('string' == typeof t) {
		if (s instanceof Et)
			return [
				{ key: s.name, pos: s.start },
				{ key: t, pos: e.property.start }
			];
		if (s instanceof $s) {
			const i = Is(s);
			return i && [...i, { key: t, pos: e.property.start }];
		}
	}
	return null;
}
class $s extends Qe {
	constructor() {
		super(...arguments),
			(this.variable = null),
			(this.bound = !1),
			(this.expressionsToBeDeoptimized = []),
			(this.replacement = null),
			(this.wasPathDeoptimizedWhileOptimized = !1);
	}
	addExportedVariables() {}
	bind() {
		if (this.bound) return;
		this.bound = !0;
		const e = Is(this),
			t = e && this.scope.findVariable(e[0].key);
		if (t && t.isNamespace) {
			const s = this.resolveNamespaceVariables(t, e.slice(1));
			s
				? 'string' == typeof s
					? (this.replacement = s)
					: (s instanceof Se && s.module && s.module.suggestName(e[0].key),
					  (this.variable = s),
					  this.scope.addNamespaceMemberAccess(
							(function (e) {
								let t = e[0].key;
								for (let s = 1; s < e.length; s++) t += '.' + e[s].key;
								return t;
							})(e),
							s
					  ))
				: super.bind();
		} else super.bind(), this.getPropertyKey();
	}
	deoptimizeCache() {
		const e = this.expressionsToBeDeoptimized;
		(this.expressionsToBeDeoptimized = []),
			(this.propertyKey = B),
			this.wasPathDeoptimizedWhileOptimized && this.object.deoptimizePath(W);
		for (const t of e) t.deoptimizeCache();
	}
	deoptimizePath(e) {
		if (
			(this.bound || this.bind(),
			0 === e.length && this.disallowNamespaceReassignment(),
			this.variable)
		)
			this.variable.deoptimizePath(e);
		else {
			const t = this.getPropertyKey();
			t === B
				? this.object.deoptimizePath(W)
				: ((this.wasPathDeoptimizedWhileOptimized = !0), this.object.deoptimizePath([t, ...e]));
		}
	}
	getLiteralValueAtPath(e, t, s) {
		return (
			this.bound || this.bind(),
			null !== this.variable
				? this.variable.getLiteralValueAtPath(e, t, s)
				: (this.expressionsToBeDeoptimized.push(s),
				  this.object.getLiteralValueAtPath([this.getPropertyKey(), ...e], t, s))
		);
	}
	getReturnExpressionWhenCalledAtPath(e, t, s) {
		return (
			this.bound || this.bind(),
			null !== this.variable
				? this.variable.getReturnExpressionWhenCalledAtPath(e, t, s)
				: (this.expressionsToBeDeoptimized.push(s),
				  this.object.getReturnExpressionWhenCalledAtPath([this.getPropertyKey(), ...e], t, s))
		);
	}
	hasEffects(e) {
		return (
			this.property.hasEffects(e) ||
			this.object.hasEffects(e) ||
			(this.context.options.treeshake.propertyReadSideEffects &&
				this.object.hasEffectsWhenAccessedAtPath([this.propertyKey], e))
		);
	}
	hasEffectsWhenAccessedAtPath(e, t) {
		return (
			0 !== e.length &&
			(null !== this.variable
				? this.variable.hasEffectsWhenAccessedAtPath(e, t)
				: this.object.hasEffectsWhenAccessedAtPath([this.propertyKey, ...e], t))
		);
	}
	hasEffectsWhenAssignedAtPath(e, t) {
		return null !== this.variable
			? this.variable.hasEffectsWhenAssignedAtPath(e, t)
			: this.object.hasEffectsWhenAssignedAtPath([this.propertyKey, ...e], t);
	}
	hasEffectsWhenCalledAtPath(e, t, s) {
		return null !== this.variable
			? this.variable.hasEffectsWhenCalledAtPath(e, t, s)
			: this.object.hasEffectsWhenCalledAtPath([this.propertyKey, ...e], t, s);
	}
	include(e, t) {
		this.included ||
			((this.included = !0), null !== this.variable && this.context.includeVariable(this.variable)),
			this.object.include(e, t),
			this.property.include(e, t);
	}
	includeCallArguments(e, t) {
		this.variable ? this.variable.includeCallArguments(e, t) : super.includeCallArguments(e, t);
	}
	initialise() {
		this.propertyKey = _s(this);
	}
	render(e, t, { renderedParentType: s, isCalleeOfRenderedParent: i } = Ae) {
		const n = 'CallExpression' === s && i;
		if (this.variable || this.replacement) {
			let t = this.variable ? this.variable.getName() : this.replacement;
			n && (t = '0, ' + t),
				e.overwrite(this.start, this.end, t, { contentOnly: !0, storeName: !0 });
		} else n && e.appendRight(this.start, '0, '), super.render(e, t);
	}
	disallowNamespaceReassignment() {
		if (this.object instanceof Et) {
			this.scope.findVariable(this.object.name).isNamespace &&
				(this.variable && this.context.includeVariable(this.variable),
				this.context.warn(
					{
						code: 'ILLEGAL_NAMESPACE_REASSIGNMENT',
						message: `Illegal reassignment to import '${this.object.name}'`
					},
					this.start
				));
		}
	}
	getPropertyKey() {
		if (null === this.propertyKey) {
			this.propertyKey = B;
			const e = this.property.getLiteralValueAtPath(F, j, this);
			return (this.propertyKey = e === q ? B : String(e));
		}
		return this.propertyKey;
	}
	resolveNamespaceVariables(e, t) {
		if (0 === t.length) return e;
		if (!e.isNamespace) return null;
		const s = t[0].key,
			i = e instanceof Se ? e.module.getVariableForExportName(s) : e.context.traceExport(s);
		if (!i) {
			const i = e instanceof Se ? e.module.id : e.context.fileName;
			return (
				this.context.warn(
					{
						code: 'MISSING_EXPORT',
						exporter: Qt(i),
						importer: Qt(this.context.fileName),
						message: `'${s}' is not exported by '${Qt(i)}'`,
						missing: s,
						url: 'https://rollupjs.org/guide/en/#error-name-is-not-exported-by-module'
					},
					t[0].pos
				),
				'undefined'
			);
		}
		return this.resolveNamespaceVariables(i, t.slice(1));
	}
}
class Ms extends it {
	addDeclaration(e, t, s, i) {
		return i ? this.parent.addDeclaration(e, t, s, i) : super.addDeclaration(e, t, s, !1);
	}
}
class Ts extends Qe {
	createScope(e) {
		this.scope = new Ms(e, this.context);
	}
	initialise() {
		this.param && this.param.declare('parameter', K);
	}
	parseNode(e) {
		(this.body = new this.context.nodeConstructors.BlockStatement(e.body, this, this.scope)),
			super.parseNode(e);
	}
}
Ts.prototype.preventChildBlockScope = !0;
class Ls extends Ke {
	findLexicalBoundary() {
		return this;
	}
}
class Rs extends Qe {
	hasEffects(e) {
		return this.key.hasEffects(e);
	}
	hasEffectsWhenCalledAtPath(e, t, s) {
		return e.length > 0 || this.value.hasEffectsWhenCalledAtPath(F, t, s);
	}
}
class Os {
	constructor(e) {
		(this.included = !1), (this.expressions = e);
	}
	deoptimizePath(e) {
		for (const t of this.expressions) t.deoptimizePath(e);
	}
	getLiteralValueAtPath() {
		return q;
	}
	getReturnExpressionWhenCalledAtPath(e, t, s) {
		return new Os(this.expressions.map((i) => i.getReturnExpressionWhenCalledAtPath(e, t, s)));
	}
	hasEffectsWhenAccessedAtPath(e, t) {
		for (const s of this.expressions) if (s.hasEffectsWhenAccessedAtPath(e, t)) return !0;
		return !1;
	}
	hasEffectsWhenAssignedAtPath(e, t) {
		for (const s of this.expressions) if (s.hasEffectsWhenAssignedAtPath(e, t)) return !0;
		return !1;
	}
	hasEffectsWhenCalledAtPath(e, t, s) {
		for (const i of this.expressions) if (i.hasEffectsWhenCalledAtPath(e, t, s)) return !0;
		return !1;
	}
	include(e, t) {
		for (const s of this.expressions) s.included || s.include(e, t);
	}
	includeCallArguments() {}
}
class Ds extends Qe {
	bind() {
		null !== this.declaration && this.declaration.bind();
	}
	hasEffects(e) {
		return null !== this.declaration && this.declaration.hasEffects(e);
	}
	initialise() {
		this.context.addExport(this);
	}
	render(e, t, s) {
		const { start: i, end: n } = s;
		null === this.declaration
			? e.remove(i, n)
			: (e.remove(this.start, this.declaration.start),
			  this.declaration.render(e, t, { start: i, end: n }));
	}
}
Ds.prototype.needsBoundaries = !0;
class Vs extends As {
	constructor() {
		super(...arguments), (this.hoistedDeclarations = []);
	}
	addDeclaration(e, t, s, i) {
		return this.hoistedDeclarations.push(e), this.parent.addDeclaration(e, t, s, i);
	}
}
const Bs = Symbol('unset');
class Fs extends Qe {
	constructor() {
		super(...arguments), (this.testValue = Bs);
	}
	deoptimizeCache() {
		this.testValue = q;
	}
	hasEffects(e) {
		if (this.test.hasEffects(e)) return !0;
		const t = this.getTestValue();
		if (t === q) {
			const { brokenFlow: t } = e;
			if (this.consequent.hasEffects(e)) return !0;
			const s = e.brokenFlow;
			return (
				(e.brokenFlow = t),
				null === this.alternate
					? !1
					: !!this.alternate.hasEffects(e) ||
					  ((e.brokenFlow = e.brokenFlow < s ? e.brokenFlow : s), !1)
			);
		}
		return t
			? this.consequent.hasEffects(e)
			: null !== this.alternate && this.alternate.hasEffects(e);
	}
	include(e, t) {
		if (((this.included = !0), t)) this.includeRecursively(t, e);
		else {
			const t = this.getTestValue();
			t === q ? this.includeUnknownTest(e) : this.includeKnownTest(e, t);
		}
	}
	parseNode(e) {
		(this.consequentScope = new Vs(this.scope)),
			(this.consequent = new (this.context.nodeConstructors[e.consequent.type] ||
				this.context.nodeConstructors.UnknownNode)(e.consequent, this, this.consequentScope)),
			e.alternate &&
				((this.alternateScope = new Vs(this.scope)),
				(this.alternate = new (this.context.nodeConstructors[e.alternate.type] ||
					this.context.nodeConstructors.UnknownNode)(e.alternate, this, this.alternateScope))),
			super.parseNode(e);
	}
	render(e, t) {
		const s = this.getTestValue(),
			i = [],
			n = this.test.included,
			r = !this.context.options.treeshake;
		n ? this.test.render(e, t) : (A(this, e), e.remove(this.start, this.consequent.start)),
			this.consequent.included && (r || s === q || s)
				? this.consequent.render(e, t)
				: (e.overwrite(this.consequent.start, this.consequent.end, n ? ';' : ''),
				  i.push(...this.consequentScope.hoistedDeclarations)),
			this.alternate &&
				(!this.alternate.included || (!r && s !== q && s)
					? (n && this.shouldKeepAlternateBranch()
							? e.overwrite(this.alternate.start, this.end, ';')
							: e.remove(this.consequent.end, this.end),
					  i.push(...this.alternateScope.hoistedDeclarations))
					: (n
							? 101 === e.original.charCodeAt(this.alternate.start - 1) &&
							  e.prependLeft(this.alternate.start, ' ')
							: e.remove(this.consequent.end, this.alternate.start),
					  this.alternate.render(e, t))),
			this.renderHoistedDeclarations(i, e);
	}
	getTestValue() {
		return this.testValue === Bs
			? (this.testValue = this.test.getLiteralValueAtPath(F, j, this))
			: this.testValue;
	}
	includeKnownTest(e, t) {
		this.test.shouldBeIncluded(e) && this.test.include(e, !1),
			t && this.consequent.shouldBeIncluded(e) && this.consequent.include(e, !1),
			null !== this.alternate &&
				!t &&
				this.alternate.shouldBeIncluded(e) &&
				this.alternate.include(e, !1);
	}
	includeRecursively(e, t) {
		this.test.include(t, e),
			this.consequent.include(t, e),
			null !== this.alternate && this.alternate.include(t, e);
	}
	includeUnknownTest(e) {
		this.test.include(e, !1);
		const { brokenFlow: t } = e;
		let s = 0;
		this.consequent.shouldBeIncluded(e) &&
			(this.consequent.include(e, !1), (s = e.brokenFlow), (e.brokenFlow = t)),
			null !== this.alternate &&
				this.alternate.shouldBeIncluded(e) &&
				(this.alternate.include(e, !1), (e.brokenFlow = e.brokenFlow < s ? e.brokenFlow : s));
	}
	renderHoistedDeclarations(e, t) {
		const s = [
			...new Set(
				e.map((e) => {
					const t = e.variable;
					return t.included ? t.getName() : '';
				})
			)
		]
			.filter(Boolean)
			.join(', ');
		if (s) {
			const e = this.parent.type,
				i = 'Program' !== e && 'BlockStatement' !== e;
			t.prependRight(this.start, `${i ? '{ ' : ''}var ${s}; `), i && t.appendLeft(this.end, ' }');
		}
	}
	shouldKeepAlternateBranch() {
		let e = this.parent;
		do {
			if (e instanceof Fs && e.alternate) return !0;
			if (e instanceof Cs) return !1;
			e = e.parent;
		} while (e);
		return !1;
	}
}
class Ws extends Qe {
	bind() {}
	hasEffects() {
		return !1;
	}
	initialise() {
		this.context.addImport(this);
	}
	render(e, t, s) {
		e.remove(s.start, s.end);
	}
}
Ws.prototype.needsBoundaries = !0;
const Us = { amd: ['require'], cjs: ['require'], system: ['module'] };
const zs = 'ROLLUP_ASSET_URL_',
	js = 'ROLLUP_FILE_URL_';
const Gs = {
		amd: ['document', 'module', 'URL'],
		cjs: ['document', 'require', 'URL'],
		es: [],
		iife: ['document', 'URL'],
		system: ['module'],
		umd: ['document', 'require', 'URL']
	},
	Hs = {
		amd: ['document', 'require', 'URL'],
		cjs: ['document', 'require', 'URL'],
		es: [],
		iife: ['document', 'URL'],
		system: ['module', 'URL'],
		umd: ['document', 'require', 'URL']
	},
	qs = (e, t = 'URL') => `new ${t}(${e}).href`,
	Ks = (e) =>
		qs(`'${e}', document.currentScript && document.currentScript.src || document.baseURI`),
	Xs = (e) => (t, s) => {
		const i = e(s);
		return null === t ? `({ url: ${i} })` : 'url' === t ? i : 'undefined';
	},
	Ys = (e) =>
		`(document.currentScript && document.currentScript.src || new URL('${e}', document.baseURI).href)`,
	Qs = {
		amd: (e) => ('.' !== e[0] && (e = './' + e), qs(`require.toUrl('${e}'), document.baseURI`)),
		cjs: (e) =>
			`(typeof document === 'undefined' ? ${qs(
				`'file:' + __dirname + '/${e}'`,
				"(require('u' + 'rl').URL)"
			)} : ${Ks(e)})`,
		es: (e) => qs(`'${e}', import.meta.url`),
		iife: (e) => Ks(e),
		system: (e) => qs(`'${e}', module.meta.url`),
		umd: (e) =>
			`(typeof document === 'undefined' ? ${qs(
				`'file:' + __dirname + '/${e}'`,
				"(require('u' + 'rl').URL)"
			)} : ${Ks(e)})`
	},
	Js = {
		amd: Xs(() => qs('module.uri, document.baseURI')),
		cjs: Xs(
			(e) =>
				`(typeof document === 'undefined' ? ${qs(
					"'file:' + __filename",
					"(require('u' + 'rl').URL)"
				)} : ${Ys(e)})`
		),
		iife: Xs((e) => Ys(e)),
		system: (e) => (null === e ? 'module.meta' : 'module.meta.' + e),
		umd: Xs(
			(e) =>
				`(typeof document === 'undefined' ? ${qs(
					"'file:' + __filename",
					"(require('u' + 'rl').URL)"
				)} : ${Ys(e)})`
		)
	};
class Zs extends Qe {
	constructor() {
		super(...arguments), (this.hasCachedEffect = !1);
	}
	hasEffects(e) {
		if (this.hasCachedEffect) return !0;
		for (const t of this.body) if (t.hasEffects(e)) return (this.hasCachedEffect = !0);
		return !1;
	}
	include(e, t) {
		this.included = !0;
		for (const s of this.body) (t || s.shouldBeIncluded(e)) && s.include(e, t);
	}
	render(e, t) {
		this.body.length ? _(this.body, e, this.start, this.end, t) : super.render(e, t);
	}
}
class ei extends Qe {
	hasEffects(e) {
		if (this.test && this.test.hasEffects(e)) return !0;
		for (const t of this.consequent) {
			if (e.brokenFlow) break;
			if (t.hasEffects(e)) return !0;
		}
		return !1;
	}
	include(e, t) {
		(this.included = !0), this.test && this.test.include(e, t);
		for (const s of this.consequent) (t || s.shouldBeIncluded(e)) && s.include(e, t);
	}
	render(e, t, s) {
		if (this.consequent.length) {
			this.test && this.test.render(e, t);
			const i = this.test ? this.test.end : C(e.original, 'default', this.start) + 7,
				n = C(e.original, ':', i) + 1;
			_(this.consequent, e, n, s.end, t);
		} else super.render(e, t);
	}
}
ei.prototype.needsBoundaries = !0;
class ti extends Qe {
	getLiteralValueAtPath(e) {
		return e.length > 0 || 1 !== this.quasis.length ? q : this.quasis[0].value.cooked;
	}
	render(e, t) {
		e.indentExclusionRanges.push([this.start, this.end]), super.render(e, t);
	}
}
class si extends Ke {
	constructor(e, t) {
		super(e), (this.context = t), this.variables.set('this', new He('this', null, X, t));
	}
	addExportDefaultDeclaration(e, t, s) {
		const i = new Ct(e, t, s);
		return this.variables.set('default', i), i;
	}
	addNamespaceMemberAccess() {}
	deconflict(e, t, s) {
		for (const i of this.children) i.deconflict(e, t, s);
	}
	findLexicalBoundary() {
		return this;
	}
	findVariable(e) {
		const t = this.variables.get(e) || this.accessedOutsideVariables.get(e);
		if (t) return t;
		const s = this.context.traceVariable(e) || this.parent.findVariable(e);
		return s instanceof xt && this.accessedOutsideVariables.set(e, s), s;
	}
}
const ii = {
	'!': (e) => !e,
	'+': (e) => +e,
	'-': (e) => -e,
	delete: () => q,
	typeof: (e) => typeof e,
	void: () => {},
	'~': (e) => ~e
};
function ni(e, t) {
	return null !== e.renderBaseName && t.has(e) && e.isReassigned;
}
class ri extends Qe {
	deoptimizePath() {
		for (const e of this.declarations) e.deoptimizePath(F);
	}
	hasEffectsWhenAssignedAtPath() {
		return !1;
	}
	include(e, t) {
		this.included = !0;
		for (const s of this.declarations) (t || s.shouldBeIncluded(e)) && s.include(e, t);
	}
	includeWithAllDeclaredVariables(e, t) {
		this.included = !0;
		for (const s of this.declarations) s.include(t, e);
	}
	initialise() {
		for (const e of this.declarations) e.declareDeclarator(this.kind);
	}
	render(e, t, s = Ae) {
		if (
			(function (e, t) {
				for (const s of e) {
					if (!s.included) return !1;
					if ('Identifier' === s.id.type) {
						if (t.has(s.id.variable)) return !1;
					} else {
						const e = [];
						if ((s.id.addExportedVariables(e, t), e.length > 0)) return !1;
					}
				}
				return !0;
			})(this.declarations, t.exportNamesByVariable)
		) {
			for (const s of this.declarations) s.render(e, t);
			s.isNoStatement || 59 === e.original.charCodeAt(this.end - 1) || e.appendLeft(this.end, ';');
		} else this.renderReplacedDeclarations(e, t, s);
	}
	renderDeclarationEnd(e, t, s, i, n, r, a, o) {
		59 === e.original.charCodeAt(this.end - 1) && e.remove(this.end - 1, this.end),
			r && (t += ';'),
			null !== s
				? (10 !== e.original.charCodeAt(i - 1) ||
						(10 !== e.original.charCodeAt(this.end) && 13 !== e.original.charCodeAt(this.end)) ||
						(i--, 13 === e.original.charCodeAt(i) && i--),
				  i === s + 1 ? e.overwrite(s, n, t) : (e.overwrite(s, s + 1, t), e.remove(i, n)))
				: e.appendLeft(n, t),
			a.length > 0 && e.appendLeft(n, ` ${M(a, o)};`);
	}
	renderReplacedDeclarations(e, t, { start: s = this.start, end: i = this.end, isNoStatement: n }) {
		const r = I(
			this.declarations,
			e,
			this.start + this.kind.length,
			this.end - (59 === e.original.charCodeAt(this.end - 1) ? 1 : 0)
		);
		let a, o;
		o = /\n\s*$/.test(e.slice(this.start, r[0].start)) ? this.start + this.kind.length : r[0].start;
		let h = o - 1;
		e.remove(this.start, h);
		let l,
			c,
			u = !1,
			d = !1,
			p = '';
		const f = [];
		for (const { node: s, start: i, separator: n, contentEnd: m, end: g } of r)
			if (
				!s.included ||
				(s.id instanceof Et && ni(s.id.variable, t.exportNamesByVariable) && null === s.init)
			)
				e.remove(i, g);
			else {
				if (((l = ''), (c = ''), s.id instanceof Et && ni(s.id.variable, t.exportNamesByVariable)))
					d && (p += ';'), (u = !1);
				else {
					if ('system' === t.format && null !== s.init)
						if ('Identifier' !== s.id.type) s.id.addExportedVariables(f, t.exportNamesByVariable);
						else {
							const i = t.exportNamesByVariable.get(s.id.variable);
							if (i) {
								const n = t.compact ? '' : ' ',
									r = C(e.original, '=', s.id.end);
								e.prependLeft(
									k(e.original, r + 1),
									1 === i.length ? `exports('${i[0]}',${n}` : T([s.id.variable], !1, t)
								),
									(c += ')');
							}
						}
					u ? (p += ',') : (d && (p += ';'), (l += this.kind + ' '), (u = !0));
				}
				o === h + 1 ? e.overwrite(h, o, p + l) : (e.overwrite(h, h + 1, p), e.appendLeft(o, l)),
					s.render(e, t),
					(a = m),
					(o = g),
					(d = !0),
					(h = n),
					(p = c);
			}
		d ? this.renderDeclarationEnd(e, p, h, a, o, !n, f, t) : e.remove(s, i);
	}
}
const ai = {
	ArrayExpression: class extends Qe {
		bind() {
			super.bind();
			for (const e of this.elements) null !== e && e.deoptimizePath(W);
		}
		getReturnExpressionWhenCalledAtPath(e) {
			return 1 !== e.length ? K : ve(me, e[0]);
		}
		hasEffectsWhenAccessedAtPath(e) {
			return e.length > 1;
		}
		hasEffectsWhenCalledAtPath(e, t, s) {
			return 1 !== e.length || Ee(me, e[0], this.included, t, s);
		}
	},
	ArrayPattern: class extends Qe {
		addExportedVariables(e, t) {
			for (const s of this.elements) null !== s && s.addExportedVariables(e, t);
		}
		declare(e) {
			const t = [];
			for (const s of this.elements) null !== s && t.push(...s.declare(e, K));
			return t;
		}
		deoptimizePath(e) {
			if (0 === e.length) for (const t of this.elements) null !== t && t.deoptimizePath(e);
		}
		hasEffectsWhenAssignedAtPath(e, t) {
			if (e.length > 0) return !0;
			for (const e of this.elements)
				if (null !== e && e.hasEffectsWhenAssignedAtPath(F, t)) return !0;
			return !1;
		}
	},
	ArrowFunctionExpression: Ns,
	AssignmentExpression: class extends Qe {
		constructor() {
			super(...arguments), (this.deoptimized = !1);
		}
		hasEffects(e) {
			return (
				this.deoptimized || this.applyDeoptimizations(),
				this.right.hasEffects(e) ||
					this.left.hasEffects(e) ||
					this.left.hasEffectsWhenAssignedAtPath(F, e)
			);
		}
		hasEffectsWhenAccessedAtPath(e, t) {
			return e.length > 0 && this.right.hasEffectsWhenAccessedAtPath(e, t);
		}
		include(e, t) {
			this.deoptimized || this.applyDeoptimizations(),
				(this.included = !0),
				this.left.include(e, t),
				this.right.include(e, t);
		}
		render(e, t) {
			if ((this.left.render(e, t), this.right.render(e, t), 'system' === t.format)) {
				const s = this.left.variable && t.exportNamesByVariable.get(this.left.variable);
				if ('Identifier' === this.left.type && s) {
					const i = t.compact ? '' : ' ',
						n = C(e.original, this.operator, this.left.end),
						r = this.operator.length > 1 ? `${s[0]}${i}${this.operator.slice(0, -1)}${i}` : '';
					e.overwrite(
						n,
						k(e.original, n + this.operator.length),
						`=${i}${1 === s.length ? `exports('${s[0]}',${i}` : T([this.left.variable], !1, t)}${r}`
					),
						e.appendLeft(this.right.end, ')');
				} else {
					const s = [];
					this.left.addExportedVariables(s, t.exportNamesByVariable),
						s.length > 0 && (e.prependRight(this.start, T(s, !0, t)), e.appendLeft(this.end, ')'));
				}
			}
		}
		applyDeoptimizations() {
			(this.deoptimized = !0), this.left.deoptimizePath(F), this.right.deoptimizePath(W);
		}
	},
	AssignmentPattern: class extends Qe {
		addExportedVariables(e, t) {
			this.left.addExportedVariables(e, t);
		}
		bind() {
			super.bind(), this.left.deoptimizePath(F), this.right.deoptimizePath(W);
		}
		declare(e, t) {
			return this.left.declare(e, t);
		}
		deoptimizePath(e) {
			0 === e.length && this.left.deoptimizePath(e);
		}
		hasEffectsWhenAssignedAtPath(e, t) {
			return e.length > 0 || this.left.hasEffectsWhenAssignedAtPath(F, t);
		}
		render(e, t, { isShorthandProperty: s } = Ae) {
			this.left.render(e, t, { isShorthandProperty: s }), this.right.render(e, t);
		}
	},
	AwaitExpression: class extends Qe {
		hasEffects(e) {
			return !e.ignore.returnAwaitYield || this.argument.hasEffects(e);
		}
		include(e, t) {
			if (!this.included) {
				this.included = !0;
				e: if (!this.context.usesTopLevelAwait) {
					let e = this.parent;
					do {
						if (e instanceof bt || e instanceof Ns) break e;
					} while ((e = e.parent));
					this.context.usesTopLevelAwait = !0;
				}
			}
			this.argument.include(e, t);
		}
	},
	BinaryExpression: class extends Qe {
		deoptimizeCache() {}
		getLiteralValueAtPath(e, t, s) {
			if (e.length > 0) return q;
			const i = this.left.getLiteralValueAtPath(F, t, s);
			if (i === q) return q;
			const n = this.right.getLiteralValueAtPath(F, t, s);
			if (n === q) return q;
			const r = ks[this.operator];
			return r ? r(i, n) : q;
		}
		hasEffects(e) {
			return (
				('+' === this.operator &&
					this.parent instanceof Ps &&
					'' === this.left.getLiteralValueAtPath(F, j, this)) ||
				super.hasEffects(e)
			);
		}
		hasEffectsWhenAccessedAtPath(e) {
			return e.length > 1;
		}
	},
	BlockStatement: Cs,
	BreakStatement: class extends Qe {
		hasEffects(e) {
			if (this.label) {
				if (!e.ignore.labels.has(this.label.name)) return !0;
				e.includedLabels.add(this.label.name), (e.brokenFlow = 2);
			} else {
				if (!e.ignore.breaks) return !0;
				e.brokenFlow = 1;
			}
			return !1;
		}
		include(e) {
			(this.included = !0),
				this.label && (this.label.include(), e.includedLabels.add(this.label.name)),
				(e.brokenFlow = this.label ? 2 : 1);
		}
	},
	CallExpression: class extends Qe {
		constructor() {
			super(...arguments),
				(this.expressionsToBeDeoptimized = []),
				(this.returnExpression = null),
				(this.wasPathDeoptmizedWhileOptimized = !1);
		}
		bind() {
			if ((super.bind(), this.callee instanceof Et)) {
				this.scope.findVariable(this.callee.name).isNamespace &&
					this.context.warn(
						{
							code: 'CANNOT_CALL_NAMESPACE',
							message: `Cannot call a namespace ('${this.callee.name}')`
						},
						this.start
					),
					'eval' === this.callee.name &&
						this.context.warn(
							{
								code: 'EVAL',
								message:
									'Use of eval is strongly discouraged, as it poses security risks and may cause issues with minification',
								url: 'https://rollupjs.org/guide/en/#avoiding-eval'
							},
							this.start
						);
			}
			this.getReturnExpression(j),
				this.callee instanceof $s && !this.callee.variable && this.callee.object.deoptimizePath(W);
			for (const e of this.arguments) e.deoptimizePath(W);
		}
		deoptimizeCache() {
			if (this.returnExpression !== K) {
				this.returnExpression = null;
				const e = this.getReturnExpression(j),
					t = this.expressionsToBeDeoptimized;
				e !== K &&
					((this.expressionsToBeDeoptimized = []),
					this.wasPathDeoptmizedWhileOptimized &&
						(e.deoptimizePath(W), (this.wasPathDeoptmizedWhileOptimized = !1)));
				for (const e of t) e.deoptimizeCache();
			}
		}
		deoptimizePath(e) {
			if (0 === e.length) return;
			const t = this.context.deoptimizationTracker.getEntities(e);
			if (t.has(this)) return;
			t.add(this);
			const s = this.getReturnExpression(j);
			s !== K && ((this.wasPathDeoptmizedWhileOptimized = !0), s.deoptimizePath(e));
		}
		getLiteralValueAtPath(e, t, s) {
			const i = this.getReturnExpression(t);
			if (i === K) return q;
			const n = t.getEntities(e);
			if (n.has(i)) return q;
			this.expressionsToBeDeoptimized.push(s), n.add(i);
			const r = i.getLiteralValueAtPath(e, t, s);
			return n.delete(i), r;
		}
		getReturnExpressionWhenCalledAtPath(e, t, s) {
			const i = this.getReturnExpression(t);
			if (this.returnExpression === K) return K;
			const n = t.getEntities(e);
			if (n.has(i)) return K;
			this.expressionsToBeDeoptimized.push(s), n.add(i);
			const r = i.getReturnExpressionWhenCalledAtPath(e, t, s);
			return n.delete(i), r;
		}
		hasEffects(e) {
			for (const t of this.arguments) if (t.hasEffects(e)) return !0;
			return (
				(!this.context.options.treeshake.annotations || !this.annotatedPure) &&
				(this.callee.hasEffects(e) ||
					this.callee.hasEffectsWhenCalledAtPath(F, this.callOptions, e))
			);
		}
		hasEffectsWhenAccessedAtPath(e, t) {
			if (0 === e.length) return !1;
			const s = t.accessed.getEntities(e);
			return (
				!s.has(this) && (s.add(this), this.returnExpression.hasEffectsWhenAccessedAtPath(e, t))
			);
		}
		hasEffectsWhenAssignedAtPath(e, t) {
			if (0 === e.length) return !0;
			const s = t.assigned.getEntities(e);
			return (
				!s.has(this) && (s.add(this), this.returnExpression.hasEffectsWhenAssignedAtPath(e, t))
			);
		}
		hasEffectsWhenCalledAtPath(e, t, s) {
			const i = (t.withNew ? s.instantiated : s.called).getEntities(e, t);
			return (
				!i.has(this) && (i.add(this), this.returnExpression.hasEffectsWhenCalledAtPath(e, t, s))
			);
		}
		include(e, t) {
			t
				? (super.include(e, t),
				  'variables' === t &&
						this.callee instanceof Et &&
						this.callee.variable &&
						this.callee.variable.markCalledFromTryStatement())
				: ((this.included = !0), this.callee.include(e, !1)),
				this.callee.includeCallArguments(e, this.arguments),
				this.returnExpression.included || this.returnExpression.include(e, !1);
		}
		initialise() {
			this.callOptions = { args: this.arguments, withNew: !1 };
		}
		render(e, t, { renderedParentType: s } = Ae) {
			if ((this.callee.render(e, t), this.arguments.length > 0))
				if (this.arguments[this.arguments.length - 1].included)
					for (const s of this.arguments) s.render(e, t);
				else {
					let s = this.arguments.length - 2;
					for (; s >= 0 && !this.arguments[s].included; ) s--;
					if (s >= 0) {
						for (let i = 0; i <= s; i++) this.arguments[i].render(e, t);
						e.remove(C(e.original, ',', this.arguments[s].end), this.end - 1);
					} else e.remove(C(e.original, '(', this.callee.end) + 1, this.end - 1);
				}
			'ExpressionStatement' === s &&
				'FunctionExpression' === this.callee.type &&
				(e.appendRight(this.start, '('), e.prependLeft(this.end, ')'));
		}
		getReturnExpression(e) {
			return null === this.returnExpression
				? ((this.returnExpression = K),
				  (this.returnExpression = this.callee.getReturnExpressionWhenCalledAtPath(F, e, this)))
				: this.returnExpression;
		}
	},
	CatchClause: Ts,
	ChainExpression: class extends Qe {},
	ClassBody: class extends Qe {
		createScope(e) {
			this.scope = new Ls(e);
		}
		hasEffectsWhenCalledAtPath(e, t, s) {
			return (
				e.length > 0 ||
				(null !== this.classConstructor &&
					this.classConstructor.hasEffectsWhenCalledAtPath(F, t, s))
			);
		}
		initialise() {
			for (const e of this.body)
				if (e instanceof Rs && 'constructor' === e.kind) return void (this.classConstructor = e);
			this.classConstructor = null;
		}
	},
	ClassDeclaration: Ze,
	ClassExpression: class extends Je {},
	ConditionalExpression: class extends Qe {
		constructor() {
			super(...arguments),
				(this.expressionsToBeDeoptimized = []),
				(this.isBranchResolutionAnalysed = !1),
				(this.usedBranch = null),
				(this.wasPathDeoptimizedWhileOptimized = !1);
		}
		bind() {
			super.bind(), this.getUsedBranch();
		}
		deoptimizeCache() {
			if (null !== this.usedBranch) {
				const e = this.usedBranch === this.consequent ? this.alternate : this.consequent;
				this.usedBranch = null;
				const t = this.expressionsToBeDeoptimized;
				(this.expressionsToBeDeoptimized = []),
					this.wasPathDeoptimizedWhileOptimized && e.deoptimizePath(W);
				for (const e of t) e.deoptimizeCache();
			}
		}
		deoptimizePath(e) {
			if (e.length > 0) {
				const t = this.getUsedBranch();
				null === t
					? (this.consequent.deoptimizePath(e), this.alternate.deoptimizePath(e))
					: ((this.wasPathDeoptimizedWhileOptimized = !0), t.deoptimizePath(e));
			}
		}
		getLiteralValueAtPath(e, t, s) {
			const i = this.getUsedBranch();
			return null === i
				? q
				: (this.expressionsToBeDeoptimized.push(s), i.getLiteralValueAtPath(e, t, s));
		}
		getReturnExpressionWhenCalledAtPath(e, t, s) {
			const i = this.getUsedBranch();
			return null === i
				? new Os([
						this.consequent.getReturnExpressionWhenCalledAtPath(e, t, s),
						this.alternate.getReturnExpressionWhenCalledAtPath(e, t, s)
				  ])
				: (this.expressionsToBeDeoptimized.push(s), i.getReturnExpressionWhenCalledAtPath(e, t, s));
		}
		hasEffects(e) {
			return (
				!!this.test.hasEffects(e) ||
				(null === this.usedBranch
					? this.consequent.hasEffects(e) || this.alternate.hasEffects(e)
					: this.usedBranch.hasEffects(e))
			);
		}
		hasEffectsWhenAccessedAtPath(e, t) {
			return (
				0 !== e.length &&
				(null === this.usedBranch
					? this.consequent.hasEffectsWhenAccessedAtPath(e, t) ||
					  this.alternate.hasEffectsWhenAccessedAtPath(e, t)
					: this.usedBranch.hasEffectsWhenAccessedAtPath(e, t))
			);
		}
		hasEffectsWhenAssignedAtPath(e, t) {
			return (
				0 === e.length ||
				(null === this.usedBranch
					? this.consequent.hasEffectsWhenAssignedAtPath(e, t) ||
					  this.alternate.hasEffectsWhenAssignedAtPath(e, t)
					: this.usedBranch.hasEffectsWhenAssignedAtPath(e, t))
			);
		}
		hasEffectsWhenCalledAtPath(e, t, s) {
			return null === this.usedBranch
				? this.consequent.hasEffectsWhenCalledAtPath(e, t, s) ||
						this.alternate.hasEffectsWhenCalledAtPath(e, t, s)
				: this.usedBranch.hasEffectsWhenCalledAtPath(e, t, s);
		}
		include(e, t) {
			(this.included = !0),
				t || this.test.shouldBeIncluded(e) || null === this.usedBranch
					? (this.test.include(e, t), this.consequent.include(e, t), this.alternate.include(e, t))
					: this.usedBranch.include(e, t);
		}
		includeCallArguments(e, t) {
			null === this.usedBranch
				? (this.consequent.includeCallArguments(e, t), this.alternate.includeCallArguments(e, t))
				: this.usedBranch.includeCallArguments(e, t);
		}
		render(e, t, { renderedParentType: s, isCalleeOfRenderedParent: i, preventASI: n } = Ae) {
			if (this.test.included) super.render(e, t);
			else {
				const r = C(e.original, ':', this.consequent.end),
					a = (this.consequent.included ? C(e.original, '?', this.test.end) : r) + 1;
				n && $(e, a, this.usedBranch.start),
					e.remove(this.start, a),
					this.consequent.included && e.remove(r, this.end),
					A(this, e),
					this.usedBranch.render(e, t, {
						isCalleeOfRenderedParent: s ? i : this.parent.callee === this,
						preventASI: !0,
						renderedParentType: s || this.parent.type
					});
			}
		}
		getUsedBranch() {
			if (this.isBranchResolutionAnalysed) return this.usedBranch;
			this.isBranchResolutionAnalysed = !0;
			const e = this.test.getLiteralValueAtPath(F, j, this);
			return e === q ? null : (this.usedBranch = e ? this.consequent : this.alternate);
		}
	},
	ContinueStatement: class extends Qe {
		hasEffects(e) {
			if (this.label) {
				if (!e.ignore.labels.has(this.label.name)) return !0;
				e.includedLabels.add(this.label.name), (e.brokenFlow = 2);
			} else {
				if (!e.ignore.continues) return !0;
				e.brokenFlow = 1;
			}
			return !1;
		}
		include(e) {
			(this.included = !0),
				this.label && (this.label.include(), e.includedLabels.add(this.label.name)),
				(e.brokenFlow = this.label ? 2 : 1);
		}
	},
	DoWhileStatement: class extends Qe {
		hasEffects(e) {
			if (this.test.hasEffects(e)) return !0;
			const {
				brokenFlow: t,
				ignore: { breaks: s, continues: i }
			} = e;
			return (
				(e.ignore.breaks = !0),
				(e.ignore.continues = !0),
				!!this.body.hasEffects(e) ||
					((e.ignore.breaks = s), (e.ignore.continues = i), (e.brokenFlow = t), !1)
			);
		}
		include(e, t) {
			(this.included = !0), this.test.include(e, t);
			const { brokenFlow: s } = e;
			this.body.include(e, t), (e.brokenFlow = s);
		}
	},
	EmptyStatement: class extends Qe {
		hasEffects() {
			return !1;
		}
	},
	ExportAllDeclaration: Ss,
	ExportDefaultDeclaration: At,
	ExportNamedDeclaration: Ds,
	ExportSpecifier: class extends Qe {},
	ExpressionStatement: Ps,
	FieldDefinition: class extends Qe {
		hasEffects(e) {
			return (
				this.key.hasEffects(e) || (this.static && null !== this.value && this.value.hasEffects(e))
			);
		}
	},
	ForInStatement: class extends Qe {
		bind() {
			this.left.bind(), this.left.deoptimizePath(F), this.right.bind(), this.body.bind();
		}
		createScope(e) {
			this.scope = new As(e);
		}
		hasEffects(e) {
			if (
				(this.left && (this.left.hasEffects(e) || this.left.hasEffectsWhenAssignedAtPath(F, e))) ||
				(this.right && this.right.hasEffects(e))
			)
				return !0;
			const {
				brokenFlow: t,
				ignore: { breaks: s, continues: i }
			} = e;
			return (
				(e.ignore.breaks = !0),
				(e.ignore.continues = !0),
				!!this.body.hasEffects(e) ||
					((e.ignore.breaks = s), (e.ignore.continues = i), (e.brokenFlow = t), !1)
			);
		}
		include(e, t) {
			(this.included = !0),
				this.left.includeWithAllDeclaredVariables(t, e),
				this.left.deoptimizePath(F),
				this.right.include(e, t);
			const { brokenFlow: s } = e;
			this.body.include(e, t), (e.brokenFlow = s);
		}
		render(e, t) {
			this.left.render(e, t, P),
				this.right.render(e, t, P),
				110 === e.original.charCodeAt(this.right.start - 1) && e.prependLeft(this.right.start, ' '),
				this.body.render(e, t);
		}
	},
	ForOfStatement: class extends Qe {
		bind() {
			this.left.bind(), this.left.deoptimizePath(F), this.right.bind(), this.body.bind();
		}
		createScope(e) {
			this.scope = new As(e);
		}
		hasEffects() {
			return !0;
		}
		include(e, t) {
			(this.included = !0),
				this.left.includeWithAllDeclaredVariables(t, e),
				this.left.deoptimizePath(F),
				this.right.include(e, t);
			const { brokenFlow: s } = e;
			this.body.include(e, t), (e.brokenFlow = s);
		}
		render(e, t) {
			this.left.render(e, t, P),
				this.right.render(e, t, P),
				102 === e.original.charCodeAt(this.right.start - 1) && e.prependLeft(this.right.start, ' '),
				this.body.render(e, t);
		}
	},
	ForStatement: class extends Qe {
		createScope(e) {
			this.scope = new As(e);
		}
		hasEffects(e) {
			if (
				(this.init && this.init.hasEffects(e)) ||
				(this.test && this.test.hasEffects(e)) ||
				(this.update && this.update.hasEffects(e))
			)
				return !0;
			const {
				brokenFlow: t,
				ignore: { breaks: s, continues: i }
			} = e;
			return (
				(e.ignore.breaks = !0),
				(e.ignore.continues = !0),
				!!this.body.hasEffects(e) ||
					((e.ignore.breaks = s), (e.ignore.continues = i), (e.brokenFlow = t), !1)
			);
		}
		include(e, t) {
			(this.included = !0),
				this.init && this.init.include(e, t),
				this.test && this.test.include(e, t);
			const { brokenFlow: s } = e;
			this.update && this.update.include(e, t), this.body.include(e, t), (e.brokenFlow = s);
		}
		render(e, t) {
			this.init && this.init.render(e, t, P),
				this.test && this.test.render(e, t, P),
				this.update && this.update.render(e, t, P),
				this.body.render(e, t);
		}
	},
	FunctionDeclaration: St,
	FunctionExpression: class extends bt {},
	Identifier: Et,
	IfStatement: Fs,
	ImportDeclaration: Ws,
	ImportDefaultSpecifier: class extends Qe {},
	ImportExpression: class extends Qe {
		constructor() {
			super(...arguments),
				(this.inlineNamespace = null),
				(this.mechanism = null),
				(this.resolution = null);
		}
		hasEffects() {
			return !0;
		}
		include(e, t) {
			this.included ||
				((this.included = !0),
				this.context.includeDynamicImport(this),
				this.scope.addAccessedDynamicImport(this)),
				this.source.include(e, t);
		}
		initialise() {
			this.context.addDynamicImport(this);
		}
		render(e, t) {
			if (this.inlineNamespace) {
				const s = t.compact ? '' : ' ',
					i = t.compact ? '' : ';';
				e.overwrite(
					this.start,
					this.end,
					`Promise.resolve().then(function${s}()${s}{${s}return ${this.inlineNamespace.getName()}${i}${s}})`
				);
			} else
				this.mechanism &&
					(e.overwrite(this.start, C(e.original, '(', this.start + 6) + 1, this.mechanism.left),
					e.overwrite(this.end - 1, this.end, this.mechanism.right)),
					this.source.render(e, t);
		}
		renderFinalResolution(e, t, s, i) {
			if ((e.overwrite(this.source.start, this.source.end, t), s)) {
				const t = i.compact ? '' : ' ',
					n = i.compact ? '' : ';';
				e.prependLeft(this.end, `.then(function${t}(n)${t}{${t}return n.${s}${n}${t}})`);
			}
		}
		setExternalResolution(e, t, s, i, n) {
			this.resolution = t;
			const r = [...(Us[s.format] || [])];
			let a;
			({ helper: a, mechanism: this.mechanism } = this.getDynamicImportMechanismAndHelper(
				t,
				e,
				s,
				i
			)),
				a && r.push(a),
				r.length > 0 && this.scope.addAccessedGlobals(r, n);
		}
		setInternalResolution(e) {
			this.inlineNamespace = e;
		}
		getDynamicImportMechanismAndHelper(e, t, s, i) {
			const n = i.hookFirstSync('renderDynamicImport', [
				{
					customResolution: 'string' == typeof this.resolution ? this.resolution : null,
					format: s.format,
					moduleId: this.context.module.id,
					targetModuleId:
						this.resolution && 'string' != typeof this.resolution ? this.resolution.id : null
				}
			]);
			if (n) return { helper: null, mechanism: n };
			switch (s.format) {
				case 'cjs': {
					const i = s.compact ? '' : ' ',
						n = s.compact ? '' : ';',
						r = `Promise.resolve().then(function${i}()${i}{${i}return`,
						a = this.getInteropHelper(e, t, s.interop);
					return {
						helper: a,
						mechanism: a
							? { left: `${r} /*#__PURE__*/${a}(require(`, right: `))${n}${i}})` }
							: { left: r + ' require(', right: `)${n}${i}})` }
					};
				}
				case 'amd': {
					const i = s.compact ? '' : ' ',
						n = s.compact ? 'c' : 'resolve',
						r = s.compact ? 'e' : 'reject',
						a = this.getInteropHelper(e, t, s.interop);
					return {
						helper: a,
						mechanism: {
							left: `new Promise(function${i}(${n},${i}${r})${i}{${i}require([`,
							right: `],${i}${
								a ? `function${i}(m)${i}{${i}${n}(/*#__PURE__*/${a}(m));${i}}` : n
							},${i}${r})${i}})`
						}
					};
				}
				case 'system':
					return { helper: null, mechanism: { left: 'module.import(', right: ')' } };
				case 'es':
					if (s.dynamicImportFunction)
						return { helper: null, mechanism: { left: s.dynamicImportFunction + '(', right: ')' } };
			}
			return { helper: null, mechanism: null };
		}
		getInteropHelper(e, t, s) {
			return 'external' === t
				? Mt[String(s(e instanceof Ue ? e.id : null))]
				: 'default' === t
				? '_interopNamespaceDefaultOnly'
				: null;
		}
	},
	ImportNamespaceSpecifier: class extends Qe {},
	ImportSpecifier: class extends Qe {},
	LabeledStatement: class extends Qe {
		hasEffects(e) {
			const t = e.brokenFlow;
			return (
				e.ignore.labels.add(this.label.name),
				!!this.body.hasEffects(e) ||
					(e.ignore.labels.delete(this.label.name),
					e.includedLabels.has(this.label.name) &&
						(e.includedLabels.delete(this.label.name), (e.brokenFlow = t)),
					!1)
			);
		}
		include(e, t) {
			this.included = !0;
			const s = e.brokenFlow;
			this.body.include(e, t),
				(t || e.includedLabels.has(this.label.name)) &&
					(this.label.include(), e.includedLabels.delete(this.label.name), (e.brokenFlow = s));
		}
		render(e, t) {
			this.label.included
				? this.label.render(e, t)
				: e.remove(this.start, C(e.original, ':', this.label.end) + 1),
				this.body.render(e, t);
		}
	},
	Literal: ws,
	LogicalExpression: class extends Qe {
		constructor() {
			super(...arguments),
				(this.expressionsToBeDeoptimized = []),
				(this.isBranchResolutionAnalysed = !1),
				(this.unusedBranch = null),
				(this.usedBranch = null),
				(this.wasPathDeoptimizedWhileOptimized = !1);
		}
		bind() {
			super.bind(), this.getUsedBranch();
		}
		deoptimizeCache() {
			if (null !== this.usedBranch) {
				this.usedBranch = null;
				const e = this.expressionsToBeDeoptimized;
				(this.expressionsToBeDeoptimized = []),
					this.wasPathDeoptimizedWhileOptimized && this.unusedBranch.deoptimizePath(W);
				for (const t of e) t.deoptimizeCache();
			}
		}
		deoptimizePath(e) {
			const t = this.getUsedBranch();
			null === t
				? (this.left.deoptimizePath(e), this.right.deoptimizePath(e))
				: ((this.wasPathDeoptimizedWhileOptimized = !0), t.deoptimizePath(e));
		}
		getLiteralValueAtPath(e, t, s) {
			const i = this.getUsedBranch();
			return null === i
				? q
				: (this.expressionsToBeDeoptimized.push(s), i.getLiteralValueAtPath(e, t, s));
		}
		getReturnExpressionWhenCalledAtPath(e, t, s) {
			const i = this.getUsedBranch();
			return null === i
				? new Os([
						this.left.getReturnExpressionWhenCalledAtPath(e, t, s),
						this.right.getReturnExpressionWhenCalledAtPath(e, t, s)
				  ])
				: (this.expressionsToBeDeoptimized.push(s), i.getReturnExpressionWhenCalledAtPath(e, t, s));
		}
		hasEffects(e) {
			return (
				!!this.left.hasEffects(e) || (this.usedBranch !== this.left && this.right.hasEffects(e))
			);
		}
		hasEffectsWhenAccessedAtPath(e, t) {
			return (
				0 !== e.length &&
				(null === this.usedBranch
					? this.left.hasEffectsWhenAccessedAtPath(e, t) ||
					  this.right.hasEffectsWhenAccessedAtPath(e, t)
					: this.usedBranch.hasEffectsWhenAccessedAtPath(e, t))
			);
		}
		hasEffectsWhenAssignedAtPath(e, t) {
			return (
				0 === e.length ||
				(null === this.usedBranch
					? this.left.hasEffectsWhenAssignedAtPath(e, t) ||
					  this.right.hasEffectsWhenAssignedAtPath(e, t)
					: this.usedBranch.hasEffectsWhenAssignedAtPath(e, t))
			);
		}
		hasEffectsWhenCalledAtPath(e, t, s) {
			return null === this.usedBranch
				? this.left.hasEffectsWhenCalledAtPath(e, t, s) ||
						this.right.hasEffectsWhenCalledAtPath(e, t, s)
				: this.usedBranch.hasEffectsWhenCalledAtPath(e, t, s);
		}
		include(e, t) {
			(this.included = !0),
				t ||
				(this.usedBranch === this.right && this.left.shouldBeIncluded(e)) ||
				null === this.usedBranch
					? (this.left.include(e, t), this.right.include(e, t))
					: this.usedBranch.include(e, t);
		}
		render(e, t, { renderedParentType: s, isCalleeOfRenderedParent: i, preventASI: n } = Ae) {
			if (this.left.included && this.right.included)
				this.left.render(e, t, { preventASI: n }), this.right.render(e, t);
			else {
				const r = C(e.original, this.operator, this.left.end);
				this.right.included
					? (e.remove(this.start, r + 2), n && $(e, r + 2, this.right.start))
					: e.remove(r, this.end),
					A(this, e),
					this.usedBranch.render(e, t, {
						isCalleeOfRenderedParent: s ? i : this.parent.callee === this,
						preventASI: n,
						renderedParentType: s || this.parent.type
					});
			}
		}
		getUsedBranch() {
			if (!this.isBranchResolutionAnalysed) {
				this.isBranchResolutionAnalysed = !0;
				const e = this.left.getLiteralValueAtPath(F, j, this);
				if (e === q) return null;
				('||' === this.operator && e) ||
				('&&' === this.operator && !e) ||
				('??' === this.operator && null != e)
					? ((this.usedBranch = this.left), (this.unusedBranch = this.right))
					: ((this.usedBranch = this.right), (this.unusedBranch = this.left));
			}
			return this.usedBranch;
		}
	},
	MemberExpression: $s,
	MetaProperty: class extends Qe {
		addAccessedGlobals(e, t) {
			const s = this.metaProperty,
				i = (s && (s.startsWith(js) || s.startsWith(zs) || s.startsWith('ROLLUP_CHUNK_URL_'))
					? Hs
					: Gs)[e];
			i.length > 0 && this.scope.addAccessedGlobals(i, t);
		}
		getReferencedFileName(e) {
			const t = this.metaProperty;
			return t && t.startsWith(js) ? e.getFileName(t.substr(js.length)) : null;
		}
		hasEffects() {
			return !1;
		}
		hasEffectsWhenAccessedAtPath(e) {
			return e.length > 1;
		}
		include() {
			if (!this.included && ((this.included = !0), 'import' === this.meta.name)) {
				this.context.addImportMeta(this);
				const e = this.parent;
				this.metaProperty =
					e instanceof $s && 'string' == typeof e.propertyKey ? e.propertyKey : null;
			}
		}
		renderFinalMechanism(e, t, s, i) {
			var n;
			const r = this.parent,
				a = this.metaProperty;
			if (a && (a.startsWith(js) || a.startsWith(zs) || a.startsWith('ROLLUP_CHUNK_URL_'))) {
				let n,
					o = null,
					h = null,
					l = null;
				a.startsWith(js)
					? ((o = a.substr(js.length)), (n = i.getFileName(o)))
					: a.startsWith(zs)
					? (hs(
							`Using the "${zs}" prefix to reference files is deprecated. Use the "${js}" prefix instead.`,
							!0,
							this.context.options
					  ),
					  (h = a.substr(zs.length)),
					  (n = i.getFileName(h)))
					: (hs(
							`Using the "ROLLUP_CHUNK_URL_" prefix to reference files is deprecated. Use the "${js}" prefix instead.`,
							!0,
							this.context.options
					  ),
					  (l = a.substr('ROLLUP_CHUNK_URL_'.length)),
					  (n = i.getFileName(l)));
				const c = Oe(Fe(Ve(t), n));
				let u;
				return (
					null !== h &&
						(u = i.hookFirstSync('resolveAssetUrl', [
							{
								assetFileName: n,
								chunkId: t,
								format: s,
								moduleId: this.context.module.id,
								relativeAssetPath: c
							}
						])),
					u ||
						(u =
							i.hookFirstSync('resolveFileUrl', [
								{
									assetReferenceId: h,
									chunkId: t,
									chunkReferenceId: l,
									fileName: n,
									format: s,
									moduleId: this.context.module.id,
									referenceId: o || h || l,
									relativePath: c
								}
							]) || Qs[s](c)),
					void e.overwrite(r.start, r.end, u, { contentOnly: !0 })
				);
			}
			const o =
				i.hookFirstSync('resolveImportMeta', [
					a,
					{ chunkId: t, format: s, moduleId: this.context.module.id }
				]) || (null === (n = Js[s]) || void 0 === n ? void 0 : n.call(Js, a, t));
			'string' == typeof o &&
				(r instanceof $s
					? e.overwrite(r.start, r.end, o, { contentOnly: !0 })
					: e.overwrite(this.start, this.end, o, { contentOnly: !0 }));
		}
	},
	MethodDefinition: Rs,
	NewExpression: class extends Qe {
		bind() {
			super.bind();
			for (const e of this.arguments) e.deoptimizePath(W);
		}
		hasEffects(e) {
			for (const t of this.arguments) if (t.hasEffects(e)) return !0;
			return (
				(!this.context.options.treeshake.annotations || !this.annotatedPure) &&
				(this.callee.hasEffects(e) ||
					this.callee.hasEffectsWhenCalledAtPath(F, this.callOptions, e))
			);
		}
		hasEffectsWhenAccessedAtPath(e) {
			return e.length > 1;
		}
		initialise() {
			this.callOptions = { args: this.arguments, withNew: !0 };
		}
	},
	ObjectExpression: class extends Qe {
		constructor() {
			super(...arguments),
				(this.deoptimizedPaths = new Set()),
				(this.expressionsToBeDeoptimized = new Map()),
				(this.hasUnknownDeoptimizedProperty = !1),
				(this.propertyMap = null),
				(this.unmatchablePropertiesRead = []),
				(this.unmatchablePropertiesWrite = []);
		}
		bind() {
			super.bind(), this.getPropertyMap();
		}
		deoptimizeCache() {
			this.hasUnknownDeoptimizedProperty || this.deoptimizeAllProperties();
		}
		deoptimizePath(e) {
			if (this.hasUnknownDeoptimizedProperty) return;
			const t = this.getPropertyMap(),
				s = e[0];
			if (1 === e.length) {
				if ('string' != typeof s) return void this.deoptimizeAllProperties();
				if (!this.deoptimizedPaths.has(s)) {
					this.deoptimizedPaths.add(s);
					const e = this.expressionsToBeDeoptimized.get(s);
					if (e) for (const t of e) t.deoptimizeCache();
				}
			}
			const i = 1 === e.length ? W : e.slice(1);
			for (const e of 'string' == typeof s ? (t[s] ? t[s].propertiesRead : []) : this.properties)
				e.deoptimizePath(i);
		}
		getLiteralValueAtPath(e, t, s) {
			const i = this.getPropertyMap(),
				n = e[0];
			return 0 === e.length ||
				this.hasUnknownDeoptimizedProperty ||
				'string' != typeof n ||
				this.deoptimizedPaths.has(n)
				? q
				: 1 !== e.length || i[n] || fe[n] || 0 !== this.unmatchablePropertiesRead.length
				? !i[n] || null === i[n].exactMatchRead || i[n].propertiesRead.length > 1
					? q
					: (V(this.expressionsToBeDeoptimized, n, () => []).push(s),
					  i[n].exactMatchRead.getLiteralValueAtPath(e.slice(1), t, s))
				: void V(this.expressionsToBeDeoptimized, n, () => []).push(s);
		}
		getReturnExpressionWhenCalledAtPath(e, t, s) {
			const i = this.getPropertyMap(),
				n = e[0];
			return 0 === e.length ||
				this.hasUnknownDeoptimizedProperty ||
				'string' != typeof n ||
				this.deoptimizedPaths.has(n)
				? K
				: 1 !== e.length ||
				  !fe[n] ||
				  0 !== this.unmatchablePropertiesRead.length ||
				  (i[n] && null !== i[n].exactMatchRead)
				? !i[n] || null === i[n].exactMatchRead || i[n].propertiesRead.length > 1
					? K
					: (V(this.expressionsToBeDeoptimized, n, () => []).push(s),
					  i[n].exactMatchRead.getReturnExpressionWhenCalledAtPath(e.slice(1), t, s))
				: ve(fe, n);
		}
		hasEffectsWhenAccessedAtPath(e, t) {
			if (0 === e.length) return !1;
			const s = e[0],
				i = this.propertyMap;
			if (
				e.length > 1 &&
				(this.hasUnknownDeoptimizedProperty ||
					'string' != typeof s ||
					this.deoptimizedPaths.has(s) ||
					!i[s] ||
					null === i[s].exactMatchRead)
			)
				return !0;
			const n = e.slice(1);
			for (const e of 'string' != typeof s ? this.properties : i[s] ? i[s].propertiesRead : [])
				if (e.hasEffectsWhenAccessedAtPath(n, t)) return !0;
			return !1;
		}
		hasEffectsWhenAssignedAtPath(e, t) {
			const s = e[0],
				i = this.propertyMap;
			if (
				e.length > 1 &&
				(this.hasUnknownDeoptimizedProperty ||
					this.deoptimizedPaths.has(s) ||
					!i[s] ||
					null === i[s].exactMatchRead)
			)
				return !0;
			const n = e.slice(1);
			for (const r of 'string' != typeof s
				? this.properties
				: e.length > 1
				? i[s].propertiesRead
				: i[s]
				? i[s].propertiesWrite
				: [])
				if (r.hasEffectsWhenAssignedAtPath(n, t)) return !0;
			return !1;
		}
		hasEffectsWhenCalledAtPath(e, t, s) {
			const i = e[0];
			if (
				'string' != typeof i ||
				this.hasUnknownDeoptimizedProperty ||
				this.deoptimizedPaths.has(i) ||
				(this.propertyMap[i] ? !this.propertyMap[i].exactMatchRead : e.length > 1 || !fe[i])
			)
				return !0;
			const n = e.slice(1);
			if (this.propertyMap[i])
				for (const e of this.propertyMap[i].propertiesRead)
					if (e.hasEffectsWhenCalledAtPath(n, t, s)) return !0;
			return !(1 !== e.length || !fe[i]) && Ee(fe, i, this.included, t, s);
		}
		render(e, t, { renderedParentType: s } = Ae) {
			super.render(e, t),
				('ExpressionStatement' !== s && 'ArrowFunctionExpression' !== s) ||
					(e.appendRight(this.start, '('), e.prependLeft(this.end, ')'));
		}
		deoptimizeAllProperties() {
			this.hasUnknownDeoptimizedProperty = !0;
			for (const e of this.properties) e.deoptimizePath(W);
			for (const e of this.expressionsToBeDeoptimized.values())
				for (const t of e) t.deoptimizeCache();
		}
		getPropertyMap() {
			if (null !== this.propertyMap) return this.propertyMap;
			const e = (this.propertyMap = Object.create(null));
			for (let t = this.properties.length - 1; t >= 0; t--) {
				const s = this.properties[t];
				if (s instanceof st) {
					this.unmatchablePropertiesRead.push(s);
					continue;
				}
				const i = 'get' !== s.kind,
					n = 'set' !== s.kind;
				let r;
				if (s.computed) {
					const e = s.key.getLiteralValueAtPath(F, j, this);
					if (e === q) {
						n ? this.unmatchablePropertiesRead.push(s) : this.unmatchablePropertiesWrite.push(s);
						continue;
					}
					r = String(e);
				} else r = s.key instanceof Et ? s.key.name : String(s.key.value);
				const a = e[r];
				a
					? (n &&
							null === a.exactMatchRead &&
							((a.exactMatchRead = s), a.propertiesRead.push(s, ...this.unmatchablePropertiesRead)),
					  i &&
							!n &&
							null === a.exactMatchWrite &&
							((a.exactMatchWrite = s),
							a.propertiesWrite.push(s, ...this.unmatchablePropertiesWrite)))
					: (e[r] = {
							exactMatchRead: n ? s : null,
							exactMatchWrite: i ? s : null,
							propertiesRead: n ? [s, ...this.unmatchablePropertiesRead] : [],
							propertiesWrite: i && !n ? [s, ...this.unmatchablePropertiesWrite] : []
					  });
			}
			return e;
		}
	},
	ObjectPattern: class extends Qe {
		addExportedVariables(e, t) {
			for (const s of this.properties)
				'Property' === s.type
					? s.value.addExportedVariables(e, t)
					: s.argument.addExportedVariables(e, t);
		}
		declare(e, t) {
			const s = [];
			for (const i of this.properties) s.push(...i.declare(e, t));
			return s;
		}
		deoptimizePath(e) {
			if (0 === e.length) for (const t of this.properties) t.deoptimizePath(e);
		}
		hasEffectsWhenAssignedAtPath(e, t) {
			if (e.length > 0) return !0;
			for (const e of this.properties) if (e.hasEffectsWhenAssignedAtPath(F, t)) return !0;
			return !1;
		}
	},
	PrivateName: class extends Qe {},
	Program: Zs,
	Property: class extends Qe {
		constructor() {
			super(...arguments), (this.declarationInit = null), (this.returnExpression = null);
		}
		bind() {
			super.bind(),
				'get' === this.kind && this.getReturnExpression(),
				null !== this.declarationInit && this.declarationInit.deoptimizePath([B, B]);
		}
		declare(e, t) {
			return (this.declarationInit = t), this.value.declare(e, K);
		}
		deoptimizeCache() {}
		deoptimizePath(e) {
			'get' === this.kind
				? this.getReturnExpression().deoptimizePath(e)
				: this.value.deoptimizePath(e);
		}
		getLiteralValueAtPath(e, t, s) {
			return 'get' === this.kind
				? this.getReturnExpression().getLiteralValueAtPath(e, t, s)
				: this.value.getLiteralValueAtPath(e, t, s);
		}
		getReturnExpressionWhenCalledAtPath(e, t, s) {
			return 'get' === this.kind
				? this.getReturnExpression().getReturnExpressionWhenCalledAtPath(e, t, s)
				: this.value.getReturnExpressionWhenCalledAtPath(e, t, s);
		}
		hasEffects(e) {
			return this.key.hasEffects(e) || this.value.hasEffects(e);
		}
		hasEffectsWhenAccessedAtPath(e, t) {
			if ('get' === this.kind) {
				const s = t.accessed.getEntities(e);
				return (
					!s.has(this) &&
					(s.add(this),
					this.value.hasEffectsWhenCalledAtPath(F, this.accessorCallOptions, t) ||
						(e.length > 0 && this.returnExpression.hasEffectsWhenAccessedAtPath(e, t)))
				);
			}
			return this.value.hasEffectsWhenAccessedAtPath(e, t);
		}
		hasEffectsWhenAssignedAtPath(e, t) {
			if ('get' === this.kind) {
				const s = t.assigned.getEntities(e);
				return (
					!s.has(this) && (s.add(this), this.returnExpression.hasEffectsWhenAssignedAtPath(e, t))
				);
			}
			if ('set' === this.kind) {
				const s = t.assigned.getEntities(e);
				return (
					!s.has(this) &&
					(s.add(this), this.value.hasEffectsWhenCalledAtPath(F, this.accessorCallOptions, t))
				);
			}
			return this.value.hasEffectsWhenAssignedAtPath(e, t);
		}
		hasEffectsWhenCalledAtPath(e, t, s) {
			if ('get' === this.kind) {
				const i = (t.withNew ? s.instantiated : s.called).getEntities(e, t);
				return (
					!i.has(this) && (i.add(this), this.returnExpression.hasEffectsWhenCalledAtPath(e, t, s))
				);
			}
			return this.value.hasEffectsWhenCalledAtPath(e, t, s);
		}
		initialise() {
			this.accessorCallOptions = { args: D, withNew: !1 };
		}
		render(e, t) {
			this.shorthand || this.key.render(e, t),
				this.value.render(e, t, { isShorthandProperty: this.shorthand });
		}
		getReturnExpression() {
			return null === this.returnExpression
				? ((this.returnExpression = K),
				  (this.returnExpression = this.value.getReturnExpressionWhenCalledAtPath(F, j, this)))
				: this.returnExpression;
		}
	},
	RestElement: vt,
	ReturnStatement: class extends Qe {
		hasEffects(e) {
			return (
				!(e.ignore.returnAwaitYield && (null === this.argument || !this.argument.hasEffects(e))) ||
				((e.brokenFlow = 2), !1)
			);
		}
		include(e, t) {
			(this.included = !0), this.argument && this.argument.include(e, t), (e.brokenFlow = 2);
		}
		initialise() {
			this.scope.addReturnExpression(this.argument || K);
		}
		render(e, t) {
			this.argument &&
				(this.argument.render(e, t, { preventASI: !0 }),
				this.argument.start === this.start + 6 && e.prependLeft(this.start + 6, ' '));
		}
	},
	SequenceExpression: class extends Qe {
		deoptimizePath(e) {
			e.length > 0 && this.expressions[this.expressions.length - 1].deoptimizePath(e);
		}
		getLiteralValueAtPath(e, t, s) {
			return this.expressions[this.expressions.length - 1].getLiteralValueAtPath(e, t, s);
		}
		hasEffects(e) {
			for (const t of this.expressions) if (t.hasEffects(e)) return !0;
			return !1;
		}
		hasEffectsWhenAccessedAtPath(e, t) {
			return (
				e.length > 0 &&
				this.expressions[this.expressions.length - 1].hasEffectsWhenAccessedAtPath(e, t)
			);
		}
		hasEffectsWhenAssignedAtPath(e, t) {
			return (
				0 === e.length ||
				this.expressions[this.expressions.length - 1].hasEffectsWhenAssignedAtPath(e, t)
			);
		}
		hasEffectsWhenCalledAtPath(e, t, s) {
			return this.expressions[this.expressions.length - 1].hasEffectsWhenCalledAtPath(e, t, s);
		}
		include(e, t) {
			this.included = !0;
			for (let s = 0; s < this.expressions.length - 1; s++) {
				const i = this.expressions[s];
				(t || i.shouldBeIncluded(e)) && i.include(e, t);
			}
			this.expressions[this.expressions.length - 1].include(e, t);
		}
		render(e, t, { renderedParentType: s, isCalleeOfRenderedParent: i, preventASI: n } = Ae) {
			let r = 0;
			for (const { node: a, start: o, end: h } of I(this.expressions, e, this.start, this.end))
				a.included
					? (r++,
					  1 === r && n && $(e, o, a.start),
					  a === this.expressions[this.expressions.length - 1] && 1 === r
							? a.render(e, t, {
									isCalleeOfRenderedParent: s ? i : this.parent.callee === this,
									renderedParentType: s || this.parent.type
							  })
							: a.render(e, t))
					: S(a, e, o, h);
		}
	},
	SpreadElement: st,
	Super: class extends Qe {},
	SwitchCase: ei,
	SwitchStatement: class extends Qe {
		createScope(e) {
			this.scope = new As(e);
		}
		hasEffects(e) {
			if (this.discriminant.hasEffects(e)) return !0;
			const {
				brokenFlow: t,
				ignore: { breaks: s }
			} = e;
			let i = 1 / 0;
			e.ignore.breaks = !0;
			for (const s of this.cases) {
				if (s.hasEffects(e)) return !0;
				(i = e.brokenFlow < i ? e.brokenFlow : i), (e.brokenFlow = t);
			}
			return null !== this.defaultCase && 1 !== i && (e.brokenFlow = i), (e.ignore.breaks = s), !1;
		}
		include(e, t) {
			(this.included = !0), this.discriminant.include(e, t);
			const { brokenFlow: s } = e;
			let i = 1 / 0,
				n = t || (null !== this.defaultCase && this.defaultCase < this.cases.length - 1);
			for (let r = this.cases.length - 1; r >= 0; r--) {
				const a = this.cases[r];
				if ((a.included && (n = !0), !n)) {
					const e = Ge();
					(e.ignore.breaks = !0), (n = a.hasEffects(e));
				}
				n
					? (a.include(e, t), (i = i < e.brokenFlow ? i : e.brokenFlow), (e.brokenFlow = s))
					: (i = s);
			}
			n && null !== this.defaultCase && 1 !== i && (e.brokenFlow = i);
		}
		initialise() {
			for (let e = 0; e < this.cases.length; e++)
				if (null === this.cases[e].test) return void (this.defaultCase = e);
			this.defaultCase = null;
		}
		render(e, t) {
			this.discriminant.render(e, t),
				this.cases.length > 0 && _(this.cases, e, this.cases[0].start, this.end - 1, t);
		}
	},
	TaggedTemplateExpression: class extends Qe {
		bind() {
			if ((super.bind(), 'Identifier' === this.tag.type)) {
				const e = this.tag.name;
				this.scope.findVariable(e).isNamespace &&
					this.context.warn(
						{ code: 'CANNOT_CALL_NAMESPACE', message: `Cannot call a namespace ('${e}')` },
						this.start
					),
					'eval' === e &&
						this.context.warn(
							{
								code: 'EVAL',
								message:
									'Use of eval is strongly discouraged, as it poses security risks and may cause issues with minification',
								url: 'https://rollupjs.org/guide/en/#avoiding-eval'
							},
							this.start
						);
			}
		}
		hasEffects(e) {
			return super.hasEffects(e) || this.tag.hasEffectsWhenCalledAtPath(F, this.callOptions, e);
		}
		initialise() {
			this.callOptions = { args: D, withNew: !1 };
		}
	},
	TemplateElement: class extends Qe {
		bind() {}
		hasEffects() {
			return !1;
		}
		include() {
			this.included = !0;
		}
		parseNode(e) {
			(this.value = e.value), super.parseNode(e);
		}
		render() {}
	},
	TemplateLiteral: ti,
	ThisExpression: class extends Qe {
		bind() {
			super.bind(), (this.variable = this.scope.findVariable('this'));
		}
		hasEffectsWhenAccessedAtPath(e, t) {
			return e.length > 0 && this.variable.hasEffectsWhenAccessedAtPath(e, t);
		}
		hasEffectsWhenAssignedAtPath(e, t) {
			return this.variable.hasEffectsWhenAssignedAtPath(e, t);
		}
		initialise() {
			(this.alias =
				this.scope.findLexicalBoundary() instanceof si ? this.context.moduleContext : null),
				'undefined' === this.alias &&
					this.context.warn(
						{
							code: 'THIS_IS_UNDEFINED',
							message:
								"The 'this' keyword is equivalent to 'undefined' at the top level of an ES module, and has been rewritten",
							url: 'https://rollupjs.org/guide/en/#error-this-is-undefined'
						},
						this.start
					);
		}
		render(e) {
			null !== this.alias &&
				e.overwrite(this.start, this.end, this.alias, { contentOnly: !1, storeName: !0 });
		}
	},
	ThrowStatement: class extends Qe {
		hasEffects() {
			return !0;
		}
		include(e, t) {
			(this.included = !0), this.argument.include(e, t), (e.brokenFlow = 2);
		}
		render(e, t) {
			this.argument.render(e, t, { preventASI: !0 }),
				this.argument.start === this.start + 5 && e.prependLeft(this.start + 5, ' ');
		}
	},
	TryStatement: class extends Qe {
		constructor() {
			super(...arguments), (this.directlyIncluded = !1);
		}
		hasEffects(e) {
			return (
				(this.context.options.treeshake.tryCatchDeoptimization
					? this.block.body.length > 0
					: this.block.hasEffects(e)) ||
				(null !== this.finalizer && this.finalizer.hasEffects(e))
			);
		}
		include(e, t) {
			var s;
			const i =
					null === (s = this.context.options.treeshake) || void 0 === s
						? void 0
						: s.tryCatchDeoptimization,
				{ brokenFlow: n } = e;
			(this.directlyIncluded && i) ||
				((this.included = !0),
				(this.directlyIncluded = !0),
				this.block.include(e, i ? 'variables' : t),
				(e.brokenFlow = n)),
				null !== this.handler && (this.handler.include(e, t), (e.brokenFlow = n)),
				null !== this.finalizer && this.finalizer.include(e, t);
		}
	},
	UnaryExpression: class extends Qe {
		bind() {
			super.bind(), 'delete' === this.operator && this.argument.deoptimizePath(F);
		}
		getLiteralValueAtPath(e, t, s) {
			if (e.length > 0) return q;
			const i = this.argument.getLiteralValueAtPath(F, t, s);
			return i === q ? q : ii[this.operator](i);
		}
		hasEffects(e) {
			return (
				!('typeof' === this.operator && this.argument instanceof Et) &&
				(this.argument.hasEffects(e) ||
					('delete' === this.operator && this.argument.hasEffectsWhenAssignedAtPath(F, e)))
			);
		}
		hasEffectsWhenAccessedAtPath(e) {
			return 'void' === this.operator ? e.length > 0 : e.length > 1;
		}
	},
	UnknownNode: class extends Qe {
		hasEffects() {
			return !0;
		}
		include(e) {
			super.include(e, !0);
		}
	},
	UpdateExpression: class extends Qe {
		bind() {
			if ((super.bind(), this.argument.deoptimizePath(F), this.argument instanceof Et)) {
				this.scope.findVariable(this.argument.name).isReassigned = !0;
			}
		}
		hasEffects(e) {
			return this.argument.hasEffects(e) || this.argument.hasEffectsWhenAssignedAtPath(F, e);
		}
		hasEffectsWhenAccessedAtPath(e) {
			return e.length > 1;
		}
		render(e, t) {
			if ((this.argument.render(e, t), 'system' === t.format)) {
				const s = this.argument.variable,
					i = t.exportNamesByVariable.get(s);
				if (i && i.length) {
					const n = t.compact ? '' : ' ',
						r = s.getName();
					if (this.prefix)
						1 === i.length
							? e.overwrite(this.start, this.end, `exports('${i[0]}',${n}${this.operator}${r})`)
							: e.overwrite(
									this.start,
									this.end,
									`(${this.operator}${r},${n}${M([s], t)},${n}${r})`
							  );
					else if (i.length > 1)
						e.overwrite(this.start, this.end, `${T([s], !1, t)}${this.operator}${r})`);
					else {
						let t;
						switch (this.operator) {
							case '++':
								t = `${r}${n}+${n}1`;
								break;
							case '--':
								t = `${r}${n}-${n}1`;
						}
						e.overwrite(
							this.start,
							this.end,
							`(exports('${i[0]}',${n}${t}),${n}${r}${this.operator})`
						);
					}
				}
			}
		}
	},
	VariableDeclaration: ri,
	VariableDeclarator: class extends Qe {
		declareDeclarator(e) {
			this.id.declare(e, this.init || X);
		}
		deoptimizePath(e) {
			this.id.deoptimizePath(e);
		}
	},
	WhileStatement: class extends Qe {
		hasEffects(e) {
			if (this.test.hasEffects(e)) return !0;
			const {
				brokenFlow: t,
				ignore: { breaks: s, continues: i }
			} = e;
			return (
				(e.ignore.breaks = !0),
				(e.ignore.continues = !0),
				!!this.body.hasEffects(e) ||
					((e.ignore.breaks = s), (e.ignore.continues = i), (e.brokenFlow = t), !1)
			);
		}
		include(e, t) {
			(this.included = !0), this.test.include(e, t);
			const { brokenFlow: s } = e;
			this.body.include(e, t), (e.brokenFlow = s);
		}
	},
	YieldExpression: class extends Qe {
		bind() {
			super.bind(), null !== this.argument && this.argument.deoptimizePath(W);
		}
		hasEffects(e) {
			return !e.ignore.returnAwaitYield || (null !== this.argument && this.argument.hasEffects(e));
		}
		render(e, t) {
			this.argument &&
				(this.argument.render(e, t, { preventASI: !0 }),
				this.argument.start === this.start + 5 && e.prependLeft(this.start + 5, ' '));
		}
	}
};
function oi(e) {
	return e.id;
}
function hi(e, t, s) {
	s(e, t);
}
function li(e, t, s) {}
var ci = {};
function ui(e, t, s = e.type) {
	let i = t.commentNodes[t.commentIndex];
	for (; i && e.start >= i.end; ) di(e, i), (i = t.commentNodes[++t.commentIndex]);
	i && i.end <= e.end && ci[s](e, t, ui);
}
function di(e, t) {
	e.annotations ? e.annotations.push(t) : (e.annotations = [t]),
		'ExpressionStatement' === e.type && (e = e.expression),
		('CallExpression' !== e.type && 'NewExpression' !== e.type) || (e.annotatedPure = !0);
}
(ci.Program = ci.BlockStatement = function (e, t, s) {
	for (var i = 0, n = e.body; i < n.length; i += 1) {
		s(n[i], t, 'Statement');
	}
}),
	(ci.Statement = hi),
	(ci.EmptyStatement = li),
	(ci.ExpressionStatement = ci.ParenthesizedExpression = ci.ChainExpression = function (e, t, s) {
		return s(e.expression, t, 'Expression');
	}),
	(ci.IfStatement = function (e, t, s) {
		s(e.test, t, 'Expression'),
			s(e.consequent, t, 'Statement'),
			e.alternate && s(e.alternate, t, 'Statement');
	}),
	(ci.LabeledStatement = function (e, t, s) {
		return s(e.body, t, 'Statement');
	}),
	(ci.BreakStatement = ci.ContinueStatement = li),
	(ci.WithStatement = function (e, t, s) {
		s(e.object, t, 'Expression'), s(e.body, t, 'Statement');
	}),
	(ci.SwitchStatement = function (e, t, s) {
		s(e.discriminant, t, 'Expression');
		for (var i = 0, n = e.cases; i < n.length; i += 1) {
			var r = n[i];
			r.test && s(r.test, t, 'Expression');
			for (var a = 0, o = r.consequent; a < o.length; a += 1) {
				s(o[a], t, 'Statement');
			}
		}
	}),
	(ci.SwitchCase = function (e, t, s) {
		e.test && s(e.test, t, 'Expression');
		for (var i = 0, n = e.consequent; i < n.length; i += 1) {
			s(n[i], t, 'Statement');
		}
	}),
	(ci.ReturnStatement = ci.YieldExpression = ci.AwaitExpression = function (e, t, s) {
		e.argument && s(e.argument, t, 'Expression');
	}),
	(ci.ThrowStatement = ci.SpreadElement = function (e, t, s) {
		return s(e.argument, t, 'Expression');
	}),
	(ci.TryStatement = function (e, t, s) {
		s(e.block, t, 'Statement'),
			e.handler && s(e.handler, t),
			e.finalizer && s(e.finalizer, t, 'Statement');
	}),
	(ci.CatchClause = function (e, t, s) {
		e.param && s(e.param, t, 'Pattern'), s(e.body, t, 'Statement');
	}),
	(ci.WhileStatement = ci.DoWhileStatement = function (e, t, s) {
		s(e.test, t, 'Expression'), s(e.body, t, 'Statement');
	}),
	(ci.ForStatement = function (e, t, s) {
		e.init && s(e.init, t, 'ForInit'),
			e.test && s(e.test, t, 'Expression'),
			e.update && s(e.update, t, 'Expression'),
			s(e.body, t, 'Statement');
	}),
	(ci.ForInStatement = ci.ForOfStatement = function (e, t, s) {
		s(e.left, t, 'ForInit'), s(e.right, t, 'Expression'), s(e.body, t, 'Statement');
	}),
	(ci.ForInit = function (e, t, s) {
		'VariableDeclaration' === e.type ? s(e, t) : s(e, t, 'Expression');
	}),
	(ci.DebuggerStatement = li),
	(ci.FunctionDeclaration = function (e, t, s) {
		return s(e, t, 'Function');
	}),
	(ci.VariableDeclaration = function (e, t, s) {
		for (var i = 0, n = e.declarations; i < n.length; i += 1) {
			s(n[i], t);
		}
	}),
	(ci.VariableDeclarator = function (e, t, s) {
		s(e.id, t, 'Pattern'), e.init && s(e.init, t, 'Expression');
	}),
	(ci.Function = function (e, t, s) {
		e.id && s(e.id, t, 'Pattern');
		for (var i = 0, n = e.params; i < n.length; i += 1) {
			s(n[i], t, 'Pattern');
		}
		s(e.body, t, e.expression ? 'Expression' : 'Statement');
	}),
	(ci.Pattern = function (e, t, s) {
		'Identifier' === e.type
			? s(e, t, 'VariablePattern')
			: 'MemberExpression' === e.type
			? s(e, t, 'MemberPattern')
			: s(e, t);
	}),
	(ci.VariablePattern = li),
	(ci.MemberPattern = hi),
	(ci.RestElement = function (e, t, s) {
		return s(e.argument, t, 'Pattern');
	}),
	(ci.ArrayPattern = function (e, t, s) {
		for (var i = 0, n = e.elements; i < n.length; i += 1) {
			var r = n[i];
			r && s(r, t, 'Pattern');
		}
	}),
	(ci.ObjectPattern = function (e, t, s) {
		for (var i = 0, n = e.properties; i < n.length; i += 1) {
			var r = n[i];
			'Property' === r.type
				? (r.computed && s(r.key, t, 'Expression'), s(r.value, t, 'Pattern'))
				: 'RestElement' === r.type && s(r.argument, t, 'Pattern');
		}
	}),
	(ci.Expression = hi),
	(ci.ThisExpression = ci.Super = ci.MetaProperty = li),
	(ci.ArrayExpression = function (e, t, s) {
		for (var i = 0, n = e.elements; i < n.length; i += 1) {
			var r = n[i];
			r && s(r, t, 'Expression');
		}
	}),
	(ci.ObjectExpression = function (e, t, s) {
		for (var i = 0, n = e.properties; i < n.length; i += 1) {
			s(n[i], t);
		}
	}),
	(ci.FunctionExpression = ci.ArrowFunctionExpression = ci.FunctionDeclaration),
	(ci.SequenceExpression = function (e, t, s) {
		for (var i = 0, n = e.expressions; i < n.length; i += 1) {
			s(n[i], t, 'Expression');
		}
	}),
	(ci.TemplateLiteral = function (e, t, s) {
		for (var i = 0, n = e.quasis; i < n.length; i += 1) {
			s(n[i], t);
		}
		for (var r = 0, a = e.expressions; r < a.length; r += 1) {
			s(a[r], t, 'Expression');
		}
	}),
	(ci.TemplateElement = li),
	(ci.UnaryExpression = ci.UpdateExpression = function (e, t, s) {
		s(e.argument, t, 'Expression');
	}),
	(ci.BinaryExpression = ci.LogicalExpression = function (e, t, s) {
		s(e.left, t, 'Expression'), s(e.right, t, 'Expression');
	}),
	(ci.AssignmentExpression = ci.AssignmentPattern = function (e, t, s) {
		s(e.left, t, 'Pattern'), s(e.right, t, 'Expression');
	}),
	(ci.ConditionalExpression = function (e, t, s) {
		s(e.test, t, 'Expression'), s(e.consequent, t, 'Expression'), s(e.alternate, t, 'Expression');
	}),
	(ci.NewExpression = ci.CallExpression = function (e, t, s) {
		if ((s(e.callee, t, 'Expression'), e.arguments))
			for (var i = 0, n = e.arguments; i < n.length; i += 1) {
				s(n[i], t, 'Expression');
			}
	}),
	(ci.MemberExpression = function (e, t, s) {
		s(e.object, t, 'Expression'), e.computed && s(e.property, t, 'Expression');
	}),
	(ci.ExportNamedDeclaration = ci.ExportDefaultDeclaration = function (e, t, s) {
		e.declaration &&
			s(
				e.declaration,
				t,
				'ExportNamedDeclaration' === e.type || e.declaration.id ? 'Statement' : 'Expression'
			),
			e.source && s(e.source, t, 'Expression');
	}),
	(ci.ExportAllDeclaration = function (e, t, s) {
		e.exported && s(e.exported, t), s(e.source, t, 'Expression');
	}),
	(ci.ImportDeclaration = function (e, t, s) {
		for (var i = 0, n = e.specifiers; i < n.length; i += 1) {
			s(n[i], t);
		}
		s(e.source, t, 'Expression');
	}),
	(ci.ImportExpression = function (e, t, s) {
		s(e.source, t, 'Expression');
	}),
	(ci.ImportSpecifier = ci.ImportDefaultSpecifier = ci.ImportNamespaceSpecifier = ci.Identifier = ci.Literal = li),
	(ci.TaggedTemplateExpression = function (e, t, s) {
		s(e.tag, t, 'Expression'), s(e.quasi, t, 'Expression');
	}),
	(ci.ClassDeclaration = ci.ClassExpression = function (e, t, s) {
		return s(e, t, 'Class');
	}),
	(ci.Class = function (e, t, s) {
		e.id && s(e.id, t, 'Pattern'), e.superClass && s(e.superClass, t, 'Expression'), s(e.body, t);
	}),
	(ci.ClassBody = function (e, t, s) {
		for (var i = 0, n = e.body; i < n.length; i += 1) {
			s(n[i], t);
		}
	}),
	(ci.MethodDefinition = ci.Property = function (e, t, s) {
		e.computed && s(e.key, t, 'Expression'), s(e.value, t, 'Expression');
	}),
	(ci.FieldDefinition = function (e, t, s) {
		e.computed && s(e.key, t, 'Expression'), e.value && s(e.value, t, 'Expression');
	});
const pi = /[@#]__PURE__/,
	fi = (e) => pi.test(e.text);
const gi = new RegExp('^#\\s+sourceMappingURL=.+\\n?'),
	yi = () => {};
let xi = () => [0, 0],
	Ei = () => 0,
	vi = () => 0,
	bi = {};
function Si(e, t) {
	switch (t) {
		case 1:
			return '# ' + e;
		case 2:
			return '## ' + e;
		case 3:
			return e;
		default:
			return `${'  '.repeat(t - 4)}- ${e}`;
	}
}
function Ai(e, t = 3) {
	(e = Si(e, t)),
		bi.hasOwnProperty(e) ||
			(bi[e] = { memory: 0, startMemory: void 0, startTime: void 0, time: 0, totalMemory: 0 });
	const s = vi();
	(bi[e].startTime = xi()), (bi[e].startMemory = s);
}
function Pi(e, t = 3) {
	if (((e = Si(e, t)), bi.hasOwnProperty(e))) {
		const t = vi();
		(bi[e].time += Ei(bi[e].startTime)),
			(bi[e].totalMemory = Math.max(bi[e].totalMemory, t)),
			(bi[e].memory += t - bi[e].startMemory);
	}
}
function Ci() {
	const e = {};
	for (const t of Object.keys(bi)) e[t] = [bi[t].time, bi[t].memory, bi[t].totalMemory];
	return e;
}
let Ni = yi,
	ki = yi;
const wi = { load: !0, resolveDynamicImport: !0, resolveId: !0, transform: !0 };
function _i(e, t) {
	const s = {};
	for (const i of Object.keys(e))
		if (!0 === wi[i]) {
			let n = 'plugin ' + t;
			e.name && (n += ` (${e.name})`),
				(n += ' - ' + i),
				(s[i] = function () {
					Ni(n, 4);
					const t = e[i].apply(this === s ? e : this, arguments);
					return (
						ki(n, 4),
						t &&
							'function' == typeof t.then &&
							(Ni(n + ' (async)', 4), t.then(() => ki(n + ' (async)', 4))),
						t
					);
				});
		} else s[i] = e[i];
	return s;
}
function Ii(e) {
	e.perf
		? ((bi = {}),
		  'undefined' != typeof process && 'function' == typeof process.hrtime
				? ((xi = process.hrtime.bind(process)),
				  (Ei = (e) => {
						return 1e3 * (t = process.hrtime(e))[0] + t[1] / 1e6;
						var t;
				  }))
				: 'undefined' != typeof performance &&
				  'function' == typeof performance.now &&
				  ((xi = () => [performance.now(), 0]), (Ei = (e) => performance.now() - e[0])),
		  'undefined' != typeof process &&
				'function' == typeof process.memoryUsage &&
				(vi = () => process.memoryUsage().heapUsed),
		  (Ni = Ai),
		  (ki = Pi),
		  (e.plugins = e.plugins.map(_i)))
		: ((Ni = yi), (ki = yi));
}
function $i(e, t, s, i) {
	return t.error(
		{
			code: 'MISSING_EXPORT',
			message: `'${e}' is not exported by ${Qt(s)}, imported by ${Qt(t.id)}`,
			url: 'https://rollupjs.org/guide/en/#error-name-is-not-exported-by-module'
		},
		i
	);
}
const Mi = { identifier: null, localName: '_missingExportShim' };
function Ti(e, t, s, i = new Map()) {
	const n = i.get(t);
	if (n) {
		if (n.has(e)) return null;
		n.add(e);
	} else i.set(t, new Set([e]));
	return e.getVariableForExportName(t, s, i);
}
class Li {
	constructor(e, t, s, i, n, r, a) {
		(this.graph = e),
			(this.id = t),
			(this.options = s),
			(this.ast = null),
			(this.chunkFileNames = new Set()),
			(this.chunkName = null),
			(this.comments = []),
			(this.dependencies = new Set()),
			(this.dynamicDependencies = new Set()),
			(this.dynamicImporters = []),
			(this.dynamicImports = []),
			(this.execIndex = 1 / 0),
			(this.exportAllSources = new Set()),
			(this.exports = Object.create(null)),
			(this.exportsAll = Object.create(null)),
			(this.implicitlyLoadedAfter = new Set()),
			(this.implicitlyLoadedBefore = new Set()),
			(this.importDescriptions = Object.create(null)),
			(this.importers = []),
			(this.importMetas = []),
			(this.imports = new Set()),
			(this.includedDynamicImporters = []),
			(this.isExecuted = !1),
			(this.isUserDefinedEntryPoint = !1),
			(this.preserveSignature = this.options.preserveEntrySignatures),
			(this.reexportDescriptions = Object.create(null)),
			(this.sources = new Set()),
			(this.userChunkNames = new Set()),
			(this.usesTopLevelAwait = !1),
			(this.allExportNames = null),
			(this.exportAllModules = []),
			(this.exportNamesByVariable = null),
			(this.exportShimVariable = new Nt(this)),
			(this.relevantDependencies = null),
			(this.syntheticExports = new Map()),
			(this.syntheticNamespace = null),
			(this.transformDependencies = []),
			(this.transitiveReexports = null),
			(this.excludeFromSourcemap = /\0/.test(t)),
			(this.context = s.moduleContext(t));
		const o = this;
		this.info = {
			ast: null,
			code: null,
			get dynamicallyImportedIds() {
				const e = [];
				for (const { resolution: t } of o.dynamicImports)
					(t instanceof Li || t instanceof Ue) && e.push(t.id);
				return e;
			},
			get dynamicImporters() {
				return o.dynamicImporters.sort();
			},
			hasModuleSideEffects: n,
			id: t,
			get implicitlyLoadedAfterOneOf() {
				return Array.from(o.implicitlyLoadedAfter, oi);
			},
			get implicitlyLoadedBefore() {
				return Array.from(o.implicitlyLoadedBefore, oi);
			},
			get importedIds() {
				return Array.from(o.sources, (e) => o.resolvedIds[e].id);
			},
			get importers() {
				return o.importers.sort();
			},
			isEntry: i,
			isExternal: !1,
			meta: a,
			syntheticNamedExports: r
		};
	}
	basename() {
		const e = De(this.id),
			t = Be(this.id);
		return $e(t ? e.slice(0, -t.length) : e);
	}
	bindReferences() {
		this.ast.bind();
	}
	error(e, t) {
		return this.addLocationToLogProps(e, t), Zt(e);
	}
	getAllExportNames() {
		if (this.allExportNames) return this.allExportNames;
		const e = (this.allExportNames = new Set());
		for (const t of Object.keys(this.exports)) e.add(t);
		for (const t of Object.keys(this.reexportDescriptions)) e.add(t);
		for (const t of this.exportAllModules)
			if (t instanceof Ue) e.add('*' + t.id);
			else for (const s of t.getAllExportNames()) 'default' !== s && e.add(s);
		return e;
	}
	getDependenciesToBeIncluded() {
		if (this.relevantDependencies) return this.relevantDependencies;
		const e = new Set(),
			t = new Set(),
			s = new Set(this.dependencies);
		let i = this.imports;
		if (
			this.info.isEntry ||
			this.includedDynamicImporters.length > 0 ||
			this.namespace.included ||
			this.implicitlyLoadedAfter.size > 0
		) {
			i = new Set(i);
			for (const e of [...this.getReexports(), ...this.getExports()])
				i.add(this.getVariableForExportName(e));
		}
		for (let n of i) {
			if (n instanceof wt) n = n.getBaseVariable();
			else if (n instanceof Ct) {
				const { modules: e, original: i } = n.getOriginalVariableAndDeclarationModules();
				n = i;
				for (const i of e) t.add(i), s.add(i);
			}
			e.add(n.module);
		}
		if (this.options.treeshake && 'no-treeshake' !== this.info.hasModuleSideEffects) {
			for (const i of s)
				if ((i.info.hasModuleSideEffects || t.has(i)) && !e.has(i))
					if (i instanceof Ue || i.hasEffects()) e.add(i);
					else for (const e of i.dependencies) s.add(e);
		} else for (const t of this.dependencies) e.add(t);
		return (this.relevantDependencies = e);
	}
	getExportNamesByVariable() {
		if (this.exportNamesByVariable) return this.exportNamesByVariable;
		const e = new Map();
		for (const t of this.getAllExportNames()) {
			if (t === this.info.syntheticNamedExports) continue;
			let s = this.getVariableForExportName(t);
			if (
				(s instanceof Ct && (s = s.getOriginalVariable()), !s || !(s.included || s instanceof Se))
			)
				continue;
			const i = e.get(s);
			i ? i.push(t) : e.set(s, [t]);
		}
		return (this.exportNamesByVariable = e);
	}
	getExports() {
		return Object.keys(this.exports);
	}
	getReexports() {
		if (this.transitiveReexports) return this.transitiveReexports;
		this.transitiveReexports = [];
		const e = new Set();
		for (const t in this.reexportDescriptions) e.add(t);
		for (const t of this.exportAllModules)
			if (t instanceof Ue) e.add('*' + t.id);
			else for (const s of [...t.getReexports(), ...t.getExports()]) 'default' !== s && e.add(s);
		return (this.transitiveReexports = [...e]);
	}
	getRenderedExports() {
		const e = [],
			t = [];
		for (const s in this.exports) {
			const i = this.getVariableForExportName(s);
			(i && i.included ? e : t).push(s);
		}
		return { renderedExports: e, removedExports: t };
	}
	getSyntheticNamespace() {
		return (
			null === this.syntheticNamespace &&
				((this.syntheticNamespace = void 0),
				(this.syntheticNamespace = this.getVariableForExportName(
					'string' == typeof this.info.syntheticNamedExports
						? this.info.syntheticNamedExports
						: 'default'
				))),
			this.syntheticNamespace
				? this.syntheticNamespace
				: Zt({
						code: ts.SYNTHETIC_NAMED_EXPORTS_NEED_NAMESPACE_EXPORT,
						id: this.id,
						message: `Module "${Qt(
							this.id
						)}" that is marked with 'syntheticNamedExports: ${JSON.stringify(
							this.info.syntheticNamedExports
						)}' needs ${
							'string' == typeof this.info.syntheticNamedExports &&
							'default' !== this.info.syntheticNamedExports
								? `an export named "${this.info.syntheticNamedExports}"`
								: 'a default export'
						}.`
				  })
		);
	}
	getVariableForExportName(e, t, s) {
		if ('*' === e[0]) {
			if (1 === e.length) return this.namespace;
			return this.graph.modulesById.get(e.slice(1)).getVariableForExportName('*');
		}
		const i = this.reexportDescriptions[e];
		if (i) {
			const e = Ti(i.module, i.localName, !1, s);
			return e || $i(i.localName, this, i.module.id, i.start);
		}
		const n = this.exports[e];
		if (n) {
			if (n === Mi) return this.exportShimVariable;
			const e = n.localName;
			return this.traceVariable(e);
		}
		if ('default' !== e)
			for (const t of this.exportAllModules) {
				const i = Ti(t, e, !0, s);
				if (i) return i;
			}
		if (!t) {
			if (this.info.syntheticNamedExports) {
				let t = this.syntheticExports.get(e);
				if (!t) {
					const s = this.getSyntheticNamespace();
					return (t = new wt(this.astContext, e, s)), this.syntheticExports.set(e, t), t;
				}
				return t;
			}
			if (this.options.shimMissingExports)
				return this.shimMissingExport(e), this.exportShimVariable;
		}
		return null;
	}
	hasEffects() {
		return (
			'no-treeshake' === this.info.hasModuleSideEffects ||
			(this.ast.included && this.ast.hasEffects(Ge()))
		);
	}
	include() {
		const e = je();
		this.ast.shouldBeIncluded(e) && this.ast.include(e, !1);
	}
	includeAllExports(e) {
		this.isExecuted || ((this.graph.needsTreeshakingPass = !0), ze(this));
		for (const t of this.getExports())
			if (e || t !== this.info.syntheticNamedExports) {
				const e = this.getVariableForExportName(t);
				e.deoptimizePath(W), e.included || (e.include(), (this.graph.needsTreeshakingPass = !0));
			}
		for (const e of this.getReexports()) {
			const t = this.getVariableForExportName(e);
			t.deoptimizePath(W),
				t.included || (t.include(), (this.graph.needsTreeshakingPass = !0)),
				t instanceof Se && (t.module.reexported = !0);
		}
		e && this.namespace.prepareNamespace(this.includeAndGetAdditionalMergedNamespaces());
	}
	includeAllInBundle() {
		this.ast.include(je(), !0);
	}
	isIncluded() {
		return this.ast.included || this.namespace.included;
	}
	linkImports() {
		this.addModulesToImportDescriptions(this.importDescriptions),
			this.addModulesToImportDescriptions(this.reexportDescriptions);
		for (const e in this.exports) 'default' !== e && (this.exportsAll[e] = this.id);
		const e = [];
		for (const t of this.exportAllSources) {
			const s = this.graph.modulesById.get(this.resolvedIds[t].id);
			if (s instanceof Ue) e.push(s);
			else {
				this.exportAllModules.push(s);
				for (const e in s.exportsAll)
					e in this.exportsAll
						? this.options.onwarn(ns(e, this, s))
						: (this.exportsAll[e] = s.exportsAll[e]);
			}
		}
		this.exportAllModules.push(...e);
	}
	render(e) {
		const t = this.magicString.clone();
		return this.ast.render(t, e), (this.usesTopLevelAwait = this.astContext.usesTopLevelAwait), t;
	}
	setSource({
		alwaysRemovedCode: e,
		ast: t,
		code: s,
		customTransformCache: i,
		originalCode: n,
		originalSourcemap: r,
		resolvedIds: a,
		sourcemapChain: o,
		transformDependencies: h,
		transformFiles: l,
		...c
	}) {
		if (
			((this.info.code = s),
			(this.originalCode = n),
			(this.originalSourcemap = r),
			(this.sourcemapChain = o),
			l && (this.transformFiles = l),
			(this.transformDependencies = h),
			(this.customTransformCache = i),
			this.updateOptions(c),
			Ni('generate ast', 3),
			(this.alwaysRemovedCode = e || []),
			!t)
		) {
			t = (function (e, t, s) {
				try {
					return t.parse(e.info.code, {
						...s,
						onComment: (t, s, i, n) => e.comments.push({ block: t, text: s, start: i, end: n })
					});
				} catch (t) {
					let s = t.message.replace(/ \(\d+:\d+\)$/, '');
					return (
						e.id.endsWith('.json')
							? (s += ' (Note that you need @rollup/plugin-json to import JSON files)')
							: e.id.endsWith('.js') ||
							  (s += ' (Note that you need plugins to import files that are not JavaScript)'),
						e.error({ code: 'PARSE_ERROR', message: s, parserError: t }, t.pos)
					);
				}
			})(this, this.graph.acornParser, this.options.acorn);
			for (const e of this.comments)
				!e.block && gi.test(e.text) && this.alwaysRemovedCode.push([e.start, e.end]);
			(u = this.comments), ui(t, { commentIndex: 0, commentNodes: u.filter(fi) });
		}
		var u;
		ki('generate ast', 3), (this.resolvedIds = a || Object.create(null));
		const d = this.id;
		this.magicString = new x(s, {
			filename: this.excludeFromSourcemap ? null : d,
			indentExclusionRanges: []
		});
		for (const [e, t] of this.alwaysRemovedCode) this.magicString.remove(e, t);
		Ni('analyse ast', 3),
			(this.astContext = {
				addDynamicImport: this.addDynamicImport.bind(this),
				addExport: this.addExport.bind(this),
				addImport: this.addImport.bind(this),
				addImportMeta: this.addImportMeta.bind(this),
				code: s,
				deoptimizationTracker: this.graph.deoptimizationTracker,
				error: this.error.bind(this),
				fileName: d,
				getExports: this.getExports.bind(this),
				getModuleExecIndex: () => this.execIndex,
				getModuleName: this.basename.bind(this),
				getReexports: this.getReexports.bind(this),
				importDescriptions: this.importDescriptions,
				includeAllExports: () => this.includeAllExports(!0),
				includeDynamicImport: this.includeDynamicImport.bind(this),
				includeVariable: this.includeVariable.bind(this),
				magicString: this.magicString,
				module: this,
				moduleContext: this.context,
				nodeConstructors: ai,
				options: this.options,
				traceExport: this.getVariableForExportName.bind(this),
				traceVariable: this.traceVariable.bind(this),
				usesTopLevelAwait: !1,
				warn: this.warn.bind(this)
			}),
			(this.scope = new si(this.graph.scope, this.astContext)),
			(this.namespace = new kt(this.astContext, this.info.syntheticNamedExports)),
			(this.ast = new Zs(t, { type: 'Module', context: this.astContext }, this.scope)),
			(this.info.ast = t),
			ki('analyse ast', 3);
	}
	toJSON() {
		return {
			alwaysRemovedCode: this.alwaysRemovedCode,
			ast: this.ast.esTreeNode,
			code: this.info.code,
			customTransformCache: this.customTransformCache,
			dependencies: Array.from(this.dependencies, oi),
			id: this.id,
			meta: this.info.meta,
			moduleSideEffects: this.info.hasModuleSideEffects,
			originalCode: this.originalCode,
			originalSourcemap: this.originalSourcemap,
			resolvedIds: this.resolvedIds,
			sourcemapChain: this.sourcemapChain,
			syntheticNamedExports: this.info.syntheticNamedExports,
			transformDependencies: this.transformDependencies,
			transformFiles: this.transformFiles
		};
	}
	traceVariable(e) {
		const t = this.scope.variables.get(e);
		if (t) return t;
		if (e in this.importDescriptions) {
			const t = this.importDescriptions[e],
				s = t.module;
			if (s instanceof Li && '*' === t.name) return s.namespace;
			const i = s.getVariableForExportName(t.name);
			return i || $i(t.name, this, s.id, t.start);
		}
		return null;
	}
	updateOptions({ meta: e, moduleSideEffects: t, syntheticNamedExports: s }) {
		null != t && (this.info.hasModuleSideEffects = t),
			null != s && (this.info.syntheticNamedExports = s),
			null != e && (this.info.meta = { ...this.info.meta, ...e });
	}
	warn(e, t) {
		this.addLocationToLogProps(e, t), this.options.onwarn(e);
	}
	addDynamicImport(e) {
		let t = e.source;
		t instanceof ti
			? 1 === t.quasis.length && t.quasis[0].value.cooked && (t = t.quasis[0].value.cooked)
			: t instanceof ws && 'string' == typeof t.value && (t = t.value),
			this.dynamicImports.push({ node: e, resolution: null, argument: t });
	}
	addExport(e) {
		if (e instanceof At)
			this.exports.default = {
				identifier: e.variable.getAssignedVariableName(),
				localName: 'default'
			};
		else if (e instanceof Ss) {
			const t = e.source.value;
			if ((this.sources.add(t), e.exported)) {
				const s = e.exported.name;
				this.reexportDescriptions[s] = { localName: '*', module: null, source: t, start: e.start };
			} else this.exportAllSources.add(t);
		} else if (e.source instanceof ws) {
			const t = e.source.value;
			this.sources.add(t);
			for (const s of e.specifiers) {
				const e = s.exported.name;
				this.reexportDescriptions[e] = {
					localName: s.local.name,
					module: null,
					source: t,
					start: s.start
				};
			}
		} else if (e.declaration) {
			const t = e.declaration;
			if (t instanceof ri)
				for (const e of t.declarations)
					for (const t of bs(e.id)) this.exports[t] = { identifier: null, localName: t };
			else {
				const e = t.id.name;
				this.exports[e] = { identifier: null, localName: e };
			}
		} else
			for (const t of e.specifiers) {
				const e = t.local.name,
					s = t.exported.name;
				this.exports[s] = { identifier: null, localName: e };
			}
	}
	addImport(e) {
		const t = e.source.value;
		this.sources.add(t);
		for (const s of e.specifiers) {
			const e = 'ImportDefaultSpecifier' === s.type,
				i = 'ImportNamespaceSpecifier' === s.type,
				n = e ? 'default' : i ? '*' : s.imported.name;
			this.importDescriptions[s.local.name] = { module: null, name: n, source: t, start: s.start };
		}
	}
	addImportMeta(e) {
		this.importMetas.push(e);
	}
	addLocationToLogProps(e, t) {
		(e.id = this.id), (e.pos = t);
		let s = this.info.code,
			{ column: i, line: n } = Xe(s, t, { offsetLine: 1 });
		try {
			({ column: i, line: n } = (function (e, t) {
				const s = e.filter((e) => e.mappings);
				for (; s.length > 0; ) {
					const e = s.pop(),
						i = e.mappings[t.line - 1];
					let n = !1;
					if (void 0 !== i)
						for (const s of i)
							if (s[0] >= t.column) {
								if (1 === s.length) break;
								(t = {
									column: s[3],
									line: s[2] + 1,
									name: 5 === s.length ? e.names[s[4]] : void 0,
									source: e.sources[s[1]]
								}),
									(n = !0);
								break;
							}
					if (!n) throw new Error("Can't resolve original location of error.");
				}
				return t;
			})(this.sourcemapChain, { column: i, line: n })),
				(s = this.originalCode);
		} catch (e) {
			this.options.onwarn({
				code: 'SOURCEMAP_ERROR',
				id: this.id,
				loc: { column: i, file: this.id, line: n },
				message: 'Error when using sourcemap for reporting an error: ' + e.message,
				pos: t
			});
		}
		es(e, { column: i, line: n }, s, this.id);
	}
	addModulesToImportDescriptions(e) {
		for (const t of Object.keys(e)) {
			const s = e[t],
				i = this.resolvedIds[s.source].id;
			s.module = this.graph.modulesById.get(i);
		}
	}
	includeAndGetAdditionalMergedNamespaces() {
		const e = [];
		for (const t of this.exportAllModules)
			if (t instanceof Ue) {
				const s = t.getVariableForExportName('*');
				s.include(), this.imports.add(s), e.push(s);
			} else if (t.info.syntheticNamedExports) {
				const s = t.getSyntheticNamespace();
				s.include(), this.imports.add(s), e.push(s);
			}
		return e;
	}
	includeDynamicImport(e) {
		const t = this.dynamicImports.find((t) => t.node === e).resolution;
		t instanceof Li && (t.includedDynamicImporters.push(this), t.includeAllExports(!0));
	}
	includeVariable(e) {
		const t = e.module;
		e.included || (e.include(), (this.graph.needsTreeshakingPass = !0)),
			t && t !== this && this.imports.add(e);
	}
	shimMissingExport(e) {
		this.options.onwarn({
			code: 'SHIMMED_EXPORT',
			exporter: Qt(this.id),
			exportName: e,
			message: `Missing export "${e}" has been shimmed in module ${Qt(this.id)}.`
		}),
			(this.exports[e] = Mi);
	}
}
class Ri {
	constructor(e, t) {
		(this.isOriginal = !0), (this.filename = e), (this.content = t);
	}
	traceSegment(e, t, s) {
		return { line: e, column: t, name: s, source: this };
	}
}
class Oi {
	constructor(e, t) {
		(this.sources = t), (this.names = e.names), (this.mappings = e.mappings);
	}
	traceMappings() {
		const e = [],
			t = [],
			s = [],
			i = [];
		for (const n of this.mappings) {
			const r = [];
			for (const i of n) {
				if (1 == i.length) continue;
				const n = this.sources[i[1]];
				if (!n) continue;
				const a = n.traceSegment(i[2], i[3], 5 === i.length ? this.names[i[4]] : '');
				if (a) {
					let n = e.lastIndexOf(a.source.filename);
					if (-1 === n) (n = e.length), e.push(a.source.filename), (t[n] = a.source.content);
					else if (null == t[n]) t[n] = a.source.content;
					else if (null != a.source.content && t[n] !== a.source.content)
						return Zt({
							message: 'Multiple conflicting contents for sourcemap source ' + a.source.filename
						});
					const o = [i[0], n, a.line, a.column];
					if (a.name) {
						let e = s.indexOf(a.name);
						-1 === e && ((e = s.length), s.push(a.name)), (o[4] = e);
					}
					r.push(o);
				}
			}
			i.push(r);
		}
		return { sources: e, sourcesContent: t, names: s, mappings: i };
	}
	traceSegment(e, t, s) {
		const i = this.mappings[e];
		if (!i) return null;
		let n = 0,
			r = i.length - 1;
		for (; n <= r; ) {
			const e = (n + r) >> 1,
				a = i[e];
			if (a[0] === t) {
				if (1 == a.length) return null;
				const e = this.sources[a[1]];
				return e ? e.traceSegment(a[2], a[3], 5 === a.length ? this.names[a[4]] : s) : null;
			}
			a[0] > t ? (r = e - 1) : (n = e + 1);
		}
		return null;
	}
}
function Di(e) {
	return function (t, s) {
		return s.mappings
			? new Oi(s, [t])
			: (e({
					code: 'SOURCEMAP_BROKEN',
					message: `Sourcemap is likely to be incorrect: a plugin (${s.plugin}) was used to transform files, but didn't generate a sourcemap for the transformation. Consult the plugin documentation for help`,
					plugin: s.plugin,
					url: 'https://rollupjs.org/guide/en/#warning-sourcemap-is-likely-to-be-incorrect'
			  }),
			  new Oi({ mappings: [], names: [] }, [t]));
	};
}
function Vi(e, t, s, i, n) {
	let r;
	if (s) {
		const t = s.sources,
			i = s.sourcesContent || [],
			n = Ve(e) || '.',
			a = s.sourceRoot || '.',
			o = t.map((e, t) => new Ri(We(n, a, e), i[t]));
		r = new Oi(s, o);
	} else r = new Ri(e, t);
	return i.reduce(n, r);
}
var Bi,
	Fi,
	Wi = Ui;
function Ui(e, t) {
	if (!e) throw new Error(t || 'Assertion failed');
}
function zi(e) {
	if (e.__esModule) return e;
	var t = Object.defineProperty({}, '__esModule', { value: !0 });
	return (
		Object.keys(e).forEach(function (s) {
			var i = Object.getOwnPropertyDescriptor(e, s);
			Object.defineProperty(
				t,
				s,
				i.get
					? i
					: {
							enumerable: !0,
							get: function () {
								return e[s];
							}
					  }
			);
		}),
		t
	);
}
function ji(e, t) {
	return (
		55296 == (64512 & e.charCodeAt(t)) &&
		!(t < 0 || t + 1 >= e.length) &&
		56320 == (64512 & e.charCodeAt(t + 1))
	);
}
function Gi(e) {
	return ((e >>> 24) | ((e >>> 8) & 65280) | ((e << 8) & 16711680) | ((255 & e) << 24)) >>> 0;
}
function Hi(e) {
	return 1 === e.length ? '0' + e : e;
}
function qi(e) {
	return 7 === e.length
		? '0' + e
		: 6 === e.length
		? '00' + e
		: 5 === e.length
		? '000' + e
		: 4 === e.length
		? '0000' + e
		: 3 === e.length
		? '00000' + e
		: 2 === e.length
		? '000000' + e
		: 1 === e.length
		? '0000000' + e
		: e;
}
Ui.equal = function (e, t, s) {
	if (e != t) throw new Error(s || 'Assertion failed: ' + e + ' != ' + t);
};
var Ki = {
	inherits:
		((function (e) {
			'function' == typeof Object.create
				? (e.exports = function (e, t) {
						t &&
							((e.super_ = t),
							(e.prototype = Object.create(t.prototype, {
								constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 }
							})));
				  })
				: (e.exports = function (e, t) {
						if (t) {
							e.super_ = t;
							var s = function () {};
							(s.prototype = t.prototype), (e.prototype = new s()), (e.prototype.constructor = e);
						}
				  });
		})(
			(Fi = {
				path: Bi,
				exports: {},
				require: function (e, t) {
					return (function () {
						throw new Error(
							'Dynamic requires are not currently supported by @rollup/plugin-commonjs'
						);
					})();
				}
			}),
			Fi.exports
		),
		Fi.exports),
	toArray: function (e, t) {
		if (Array.isArray(e)) return e.slice();
		if (!e) return [];
		var s = [];
		if ('string' == typeof e)
			if (t) {
				if ('hex' === t)
					for (
						(e = e.replace(/[^a-z0-9]+/gi, '')).length % 2 != 0 && (e = '0' + e), n = 0;
						n < e.length;
						n += 2
					)
						s.push(parseInt(e[n] + e[n + 1], 16));
			} else
				for (var i = 0, n = 0; n < e.length; n++) {
					var r = e.charCodeAt(n);
					r < 128
						? (s[i++] = r)
						: r < 2048
						? ((s[i++] = (r >> 6) | 192), (s[i++] = (63 & r) | 128))
						: ji(e, n)
						? ((r = 65536 + ((1023 & r) << 10) + (1023 & e.charCodeAt(++n))),
						  (s[i++] = (r >> 18) | 240),
						  (s[i++] = ((r >> 12) & 63) | 128),
						  (s[i++] = ((r >> 6) & 63) | 128),
						  (s[i++] = (63 & r) | 128))
						: ((s[i++] = (r >> 12) | 224),
						  (s[i++] = ((r >> 6) & 63) | 128),
						  (s[i++] = (63 & r) | 128));
				}
		else for (n = 0; n < e.length; n++) s[n] = 0 | e[n];
		return s;
	},
	toHex: function (e) {
		for (var t = '', s = 0; s < e.length; s++) t += Hi(e[s].toString(16));
		return t;
	},
	htonl: Gi,
	toHex32: function (e, t) {
		for (var s = '', i = 0; i < e.length; i++) {
			var n = e[i];
			'little' === t && (n = Gi(n)), (s += qi(n.toString(16)));
		}
		return s;
	},
	zero2: Hi,
	zero8: qi,
	join32: function (e, t, s, i) {
		var n = s - t;
		Wi(n % 4 == 0);
		for (var r = new Array(n / 4), a = 0, o = t; a < r.length; a++, o += 4) {
			var h;
			(h =
				'big' === i
					? (e[o] << 24) | (e[o + 1] << 16) | (e[o + 2] << 8) | e[o + 3]
					: (e[o + 3] << 24) | (e[o + 2] << 16) | (e[o + 1] << 8) | e[o]),
				(r[a] = h >>> 0);
		}
		return r;
	},
	split32: function (e, t) {
		for (var s = new Array(4 * e.length), i = 0, n = 0; i < e.length; i++, n += 4) {
			var r = e[i];
			'big' === t
				? ((s[n] = r >>> 24),
				  (s[n + 1] = (r >>> 16) & 255),
				  (s[n + 2] = (r >>> 8) & 255),
				  (s[n + 3] = 255 & r))
				: ((s[n + 3] = r >>> 24),
				  (s[n + 2] = (r >>> 16) & 255),
				  (s[n + 1] = (r >>> 8) & 255),
				  (s[n] = 255 & r));
		}
		return s;
	},
	rotr32: function (e, t) {
		return (e >>> t) | (e << (32 - t));
	},
	rotl32: function (e, t) {
		return (e << t) | (e >>> (32 - t));
	},
	sum32: function (e, t) {
		return (e + t) >>> 0;
	},
	sum32_3: function (e, t, s) {
		return (e + t + s) >>> 0;
	},
	sum32_4: function (e, t, s, i) {
		return (e + t + s + i) >>> 0;
	},
	sum32_5: function (e, t, s, i, n) {
		return (e + t + s + i + n) >>> 0;
	},
	sum64: function (e, t, s, i) {
		var n = e[t],
			r = (i + e[t + 1]) >>> 0,
			a = (r < i ? 1 : 0) + s + n;
		(e[t] = a >>> 0), (e[t + 1] = r);
	},
	sum64_hi: function (e, t, s, i) {
		return (((t + i) >>> 0 < t ? 1 : 0) + e + s) >>> 0;
	},
	sum64_lo: function (e, t, s, i) {
		return (t + i) >>> 0;
	},
	sum64_4_hi: function (e, t, s, i, n, r, a, o) {
		var h = 0,
			l = t;
		return (
			(h += (l = (l + i) >>> 0) < t ? 1 : 0),
			(h += (l = (l + r) >>> 0) < r ? 1 : 0),
			(e + s + n + a + (h += (l = (l + o) >>> 0) < o ? 1 : 0)) >>> 0
		);
	},
	sum64_4_lo: function (e, t, s, i, n, r, a, o) {
		return (t + i + r + o) >>> 0;
	},
	sum64_5_hi: function (e, t, s, i, n, r, a, o, h, l) {
		var c = 0,
			u = t;
		return (
			(c += (u = (u + i) >>> 0) < t ? 1 : 0),
			(c += (u = (u + r) >>> 0) < r ? 1 : 0),
			(c += (u = (u + o) >>> 0) < o ? 1 : 0),
			(e + s + n + a + h + (c += (u = (u + l) >>> 0) < l ? 1 : 0)) >>> 0
		);
	},
	sum64_5_lo: function (e, t, s, i, n, r, a, o, h, l) {
		return (t + i + r + o + l) >>> 0;
	},
	rotr64_hi: function (e, t, s) {
		return ((t << (32 - s)) | (e >>> s)) >>> 0;
	},
	rotr64_lo: function (e, t, s) {
		return ((e << (32 - s)) | (t >>> s)) >>> 0;
	},
	shr64_hi: function (e, t, s) {
		return e >>> s;
	},
	shr64_lo: function (e, t, s) {
		return ((e << (32 - s)) | (t >>> s)) >>> 0;
	}
};
function Xi() {
	(this.pending = null),
		(this.pendingTotal = 0),
		(this.blockSize = this.constructor.blockSize),
		(this.outSize = this.constructor.outSize),
		(this.hmacStrength = this.constructor.hmacStrength),
		(this.padLength = this.constructor.padLength / 8),
		(this.endian = 'big'),
		(this._delta8 = this.blockSize / 8),
		(this._delta32 = this.blockSize / 32);
}
var Yi = Xi;
(Xi.prototype.update = function (e, t) {
	if (
		((e = Ki.toArray(e, t)),
		this.pending ? (this.pending = this.pending.concat(e)) : (this.pending = e),
		(this.pendingTotal += e.length),
		this.pending.length >= this._delta8)
	) {
		var s = (e = this.pending).length % this._delta8;
		(this.pending = e.slice(e.length - s, e.length)),
			0 === this.pending.length && (this.pending = null),
			(e = Ki.join32(e, 0, e.length - s, this.endian));
		for (var i = 0; i < e.length; i += this._delta32) this._update(e, i, i + this._delta32);
	}
	return this;
}),
	(Xi.prototype.digest = function (e) {
		return this.update(this._pad()), Wi(null === this.pending), this._digest(e);
	}),
	(Xi.prototype._pad = function () {
		var e = this.pendingTotal,
			t = this._delta8,
			s = t - ((e + this.padLength) % t),
			i = new Array(s + this.padLength);
		i[0] = 128;
		for (var n = 1; n < s; n++) i[n] = 0;
		if (((e <<= 3), 'big' === this.endian)) {
			for (var r = 8; r < this.padLength; r++) i[n++] = 0;
			(i[n++] = 0),
				(i[n++] = 0),
				(i[n++] = 0),
				(i[n++] = 0),
				(i[n++] = (e >>> 24) & 255),
				(i[n++] = (e >>> 16) & 255),
				(i[n++] = (e >>> 8) & 255),
				(i[n++] = 255 & e);
		} else
			for (
				i[n++] = 255 & e,
					i[n++] = (e >>> 8) & 255,
					i[n++] = (e >>> 16) & 255,
					i[n++] = (e >>> 24) & 255,
					i[n++] = 0,
					i[n++] = 0,
					i[n++] = 0,
					i[n++] = 0,
					r = 8;
				r < this.padLength;
				r++
			)
				i[n++] = 0;
		return i;
	});
var Qi = { BlockHash: Yi },
	Ji = Ki.rotr32;
function Zi(e, t, s) {
	return (e & t) ^ (~e & s);
}
function en(e, t, s) {
	return (e & t) ^ (e & s) ^ (t & s);
}
function tn(e, t, s) {
	return e ^ t ^ s;
}
var sn = {
		ft_1: function (e, t, s, i) {
			return 0 === e
				? Zi(t, s, i)
				: 1 === e || 3 === e
				? tn(t, s, i)
				: 2 === e
				? en(t, s, i)
				: void 0;
		},
		ch32: Zi,
		maj32: en,
		p32: tn,
		s0_256: function (e) {
			return Ji(e, 2) ^ Ji(e, 13) ^ Ji(e, 22);
		},
		s1_256: function (e) {
			return Ji(e, 6) ^ Ji(e, 11) ^ Ji(e, 25);
		},
		g0_256: function (e) {
			return Ji(e, 7) ^ Ji(e, 18) ^ (e >>> 3);
		},
		g1_256: function (e) {
			return Ji(e, 17) ^ Ji(e, 19) ^ (e >>> 10);
		}
	},
	nn = Ki.sum32,
	rn = Ki.sum32_4,
	an = Ki.sum32_5,
	on = sn.ch32,
	hn = sn.maj32,
	ln = sn.s0_256,
	cn = sn.s1_256,
	un = sn.g0_256,
	dn = sn.g1_256,
	pn = Qi.BlockHash,
	fn = [
		1116352408,
		1899447441,
		3049323471,
		3921009573,
		961987163,
		1508970993,
		2453635748,
		2870763221,
		3624381080,
		310598401,
		607225278,
		1426881987,
		1925078388,
		2162078206,
		2614888103,
		3248222580,
		3835390401,
		4022224774,
		264347078,
		604807628,
		770255983,
		1249150122,
		1555081692,
		1996064986,
		2554220882,
		2821834349,
		2952996808,
		3210313671,
		3336571891,
		3584528711,
		113926993,
		338241895,
		666307205,
		773529912,
		1294757372,
		1396182291,
		1695183700,
		1986661051,
		2177026350,
		2456956037,
		2730485921,
		2820302411,
		3259730800,
		3345764771,
		3516065817,
		3600352804,
		4094571909,
		275423344,
		430227734,
		506948616,
		659060556,
		883997877,
		958139571,
		1322822218,
		1537002063,
		1747873779,
		1955562222,
		2024104815,
		2227730452,
		2361852424,
		2428436474,
		2756734187,
		3204031479,
		3329325298
	];
function mn() {
	if (!(this instanceof mn)) return new mn();
	pn.call(this),
		(this.h = [
			1779033703,
			3144134277,
			1013904242,
			2773480762,
			1359893119,
			2600822924,
			528734635,
			1541459225
		]),
		(this.k = fn),
		(this.W = new Array(64));
}
Ki.inherits(mn, pn);
var gn = mn;
(mn.blockSize = 512),
	(mn.outSize = 256),
	(mn.hmacStrength = 192),
	(mn.padLength = 64),
	(mn.prototype._update = function (e, t) {
		for (var s = this.W, i = 0; i < 16; i++) s[i] = e[t + i];
		for (; i < s.length; i++) s[i] = rn(dn(s[i - 2]), s[i - 7], un(s[i - 15]), s[i - 16]);
		var n = this.h[0],
			r = this.h[1],
			a = this.h[2],
			o = this.h[3],
			h = this.h[4],
			l = this.h[5],
			c = this.h[6],
			u = this.h[7];
		for (Wi(this.k.length === s.length), i = 0; i < s.length; i++) {
			var d = an(u, cn(h), on(h, l, c), this.k[i], s[i]),
				p = nn(ln(n), hn(n, r, a));
			(u = c), (c = l), (l = h), (h = nn(o, d)), (o = a), (a = r), (r = n), (n = nn(d, p));
		}
		(this.h[0] = nn(this.h[0], n)),
			(this.h[1] = nn(this.h[1], r)),
			(this.h[2] = nn(this.h[2], a)),
			(this.h[3] = nn(this.h[3], o)),
			(this.h[4] = nn(this.h[4], h)),
			(this.h[5] = nn(this.h[5], l)),
			(this.h[6] = nn(this.h[6], c)),
			(this.h[7] = nn(this.h[7], u));
	}),
	(mn.prototype._digest = function (e) {
		return 'hex' === e ? Ki.toHex32(this.h, 'big') : Ki.split32(this.h, 'big');
	});
const yn = () => gn(),
	xn = { amd: bn, cjs: bn, es: vn, iife: bn, system: vn, umd: bn };
function En(e, t, s, i, n, r, a, o, h, l, c, u, d) {
	for (const t of e) t.scope.addUsedOutsideNames(i, n, c, u);
	!(function (e, t, s) {
		for (const i of t) {
			for (const t of i.scope.variables.values())
				t.included &&
					!(t.renderBaseName || (t instanceof Ct && t.getOriginalVariable() !== t)) &&
					t.setRenderNames(null, O(t.name, e));
			if (s.has(i)) {
				const t = i.namespace;
				t.setRenderNames(null, O(t.name, e));
			}
		}
	})(i, e, d),
		xn[n](i, s, t, r, a, o, h, l);
	for (const t of e) t.scope.deconflict(n, c, u);
}
function vn(e, t, s, i, n, r, a, o) {
	for (const t of s.dependencies)
		(n || t instanceof Ue) && (t.variableName = O(t.suggestedVariableName, e));
	for (const s of t) {
		const t = s.module,
			i = s.name;
		s.isNamespace && (n || t instanceof Ue)
			? s.setRenderNames(null, (t instanceof Ue ? t : a.get(t)).variableName)
			: t instanceof Ue && 'default' === i
			? s.setRenderNames(
					null,
					O(
						[...t.exportedVariables].some(([e, t]) => '*' === t && e.included)
							? t.suggestedVariableName + '__default'
							: t.suggestedVariableName,
						e
					)
			  )
			: s.setRenderNames(null, O(i, e));
	}
	for (const t of o) t.setRenderNames(null, O(t.name, e));
}
function bn(
	e,
	t,
	{ deconflictedDefault: s, deconflictedNamespace: i, dependencies: n },
	r,
	a,
	o,
	h
) {
	for (const t of n) t.variableName = O(t.suggestedVariableName, e);
	for (const t of i) t.namespaceVariableName = O(t.suggestedVariableName + '__namespace', e);
	for (const t of s)
		i.has(t) && Tt(String(r(t.id)), o)
			? (t.defaultVariableName = t.namespaceVariableName)
			: (t.defaultVariableName = O(t.suggestedVariableName + '__default', e));
	for (const e of t) {
		const t = e.module;
		if (t instanceof Ue) {
			const s = e.name;
			if ('default' === s) {
				const s = String(r(t.id)),
					i = It[s] ? t.defaultVariableName : t.variableName;
				$t(s, o) ? e.setRenderNames(i, 'default') : e.setRenderNames(null, i);
			} else
				'*' === s
					? e.setRenderNames(null, Mt[String(r(t.id))] ? t.namespaceVariableName : t.variableName)
					: e.setRenderNames(t.variableName, null);
		} else {
			const s = h.get(t);
			a && e.isNamespace
				? e.setRenderNames(
						null,
						'default' === s.exportMode ? s.namespaceVariableName : s.variableName
				  )
				: 'default' === s.exportMode
				? e.setRenderNames(null, s.variableName)
				: e.setRenderNames(s.variableName, s.getVariableExportName(e));
		}
	}
}
const Sn = /[\\'\r\n\u2028\u2029]/,
	An = /(['\r\n\u2028\u2029])/g,
	Pn = /\\/g;
function Cn(e) {
	return e.match(Sn) ? e.replace(Pn, '\\\\').replace(An, '\\$1') : e;
}
const Nn = (e, t) => (e.execIndex > t.execIndex ? 1 : -1);
function kn(e) {
	e.sort(Nn);
}
function wn(e, t, s) {
	const i = [Qt(e.id)];
	let n = t;
	for (; n !== e; ) i.push(Qt(n.id)), (n = s.get(n));
	return i.push(i[0]), i.reverse(), i;
}
function _n(e, { exports: t, name: s, format: i }, n, r, a) {
	const o = e.getExportNames();
	if ('default' === t) {
		if (1 !== o.length || 'default' !== o[0]) return Zt(ss('default', o, r));
	} else if ('none' === t && o.length) return Zt(ss('none', o, r));
	return (
		'auto' === t &&
			(0 === o.length
				? (t = 'none')
				: 1 === o.length && 'default' === o[0]
				? ('cjs' === i &&
						n.has('exports') &&
						a(
							(function (e) {
								const t = Qt(e);
								return {
									code: ts.PREFER_NAMED_EXPORTS,
									id: e,
									message: `Entry module "${t}" is implicitly using "default" export mode, which means for CommonJS output that its default export is assigned to "module.exports". For many tools, such CommonJS output will not be interchangeable with the original ES module. If this is intended, explicitly set "output.exports" to either "auto" or "default", otherwise you might want to consider changing the signature of "${t}" to use named exports only.`,
									url: 'https://rollupjs.org/guide/en/#outputexports'
								};
							})(r)
						),
				  (t = 'default'))
				: ('es' !== i &&
						-1 !== o.indexOf('default') &&
						a(
							(function (e, t) {
								return {
									code: ts.MIXED_EXPORTS,
									id: e,
									message: `Entry module "${Qt(
										e
									)}" is using named and default exports together. Consumers of your bundle will have to use \`${
										t || 'chunk'
									}["default"]\` to access the default export, which may not be what you want. Use \`output.exports: "named"\` to disable this warning`,
									url: 'https://rollupjs.org/guide/en/#outputexports'
								};
							})(r, s)
						),
				  (t = 'named'))),
		t
	);
}
function In(e) {
	const t = e.split('\n'),
		s = t.filter((e) => /^\t+/.test(e)),
		i = t.filter((e) => /^ {2,}/.test(e));
	if (0 === s.length && 0 === i.length) return null;
	if (s.length >= i.length) return '\t';
	const n = i.reduce((e, t) => {
		const s = /^ +/.exec(t)[0].length;
		return Math.min(s, e);
	}, 1 / 0);
	return new Array(n + 1).join(' ');
}
function $n(e) {
	if (!e) return null;
	if (('string' == typeof e && (e = JSON.parse(e)), '' === e.mappings))
		return { mappings: [], names: [], sources: [], version: 3 };
	let s;
	return (
		(s =
			'string' == typeof e.mappings
				? (function (e) {
						for (
							var s = [], i = [], r = [0, 0, 0, 0, 0], a = 0, o = 0, h = 0, l = 0;
							o < e.length;
							o++
						) {
							var c = e.charCodeAt(o);
							if (44 === c) n(i, r, a), (a = 0);
							else if (59 === c) n(i, r, a), (a = 0), s.push(i), (i = []), (r[0] = 0);
							else {
								var u = t[c];
								if (void 0 === u)
									throw new Error('Invalid character (' + String.fromCharCode(c) + ')');
								var d = 32 & u;
								if (((l += (u &= 31) << h), d)) h += 5;
								else {
									var p = 1 & l;
									(l >>>= 1), p && (l = 0 === l ? -2147483648 : -l), (r[a] += l), a++, (l = h = 0);
								}
							}
						}
						return n(i, r, a), s.push(i), s;
				  })(e.mappings)
				: e.mappings),
		{ ...e, mappings: s }
	);
}
function Mn(e, t, s, i) {
	return (
		'function' == typeof e && (e = e(i())),
		Jt(e)
			? e.replace(/\[(\w+)\]/g, (e, i) => {
					if (!s.hasOwnProperty(i))
						return Zt(os(`"[${i}]" is not a valid placeholder in "${t}" pattern.`));
					const n = s[i]();
					return Jt(n)
						? n
						: Zt(
								os(
									`Invalid substitution "${n}" for placeholder "[${i}]" in "${t}" pattern, can be neither absolute nor relative path.`
								)
						  );
			  })
			: Zt(
					os(
						`Invalid pattern "${e}" for "${t}", patterns can be neither absolute nor relative paths and must not contain invalid characters.`
					)
			  )
	);
}
function Tn(e, t) {
	const s = new Set(Object.keys(t).map((e) => e.toLowerCase()));
	if (!s.has(e.toLocaleLowerCase())) return e;
	const i = Be(e);
	e = e.substr(0, e.length - i.length);
	let n,
		r = 1;
	for (; s.has((n = e + ++r + i).toLowerCase()); );
	return n;
}
const Ln = ['.js', '.jsx', '.ts', '.tsx'];
function Rn(e, t, s, i) {
	const n = 'function' == typeof t ? t(e.id) : t[e.id];
	return (
		n ||
		(s
			? (i({
					code: 'MISSING_GLOBAL_NAME',
					guess: e.variableName,
					message: `No name was provided for external module '${e.id}' in output.globals – guessing '${e.variableName}'`,
					source: e.id
			  }),
			  e.variableName)
			: void 0)
	);
}
class On {
	constructor(e, t, s, i, n, r, a, o, h, l) {
		(this.orderedModules = e),
			(this.inputOptions = t),
			(this.outputOptions = s),
			(this.unsetOptions = i),
			(this.pluginDriver = n),
			(this.modulesById = r),
			(this.chunkByModule = a),
			(this.facadeChunkByModule = o),
			(this.includedNamespaces = h),
			(this.manualChunkAlias = l),
			(this.entryModules = []),
			(this.exportMode = 'named'),
			(this.facadeModule = null),
			(this.id = null),
			(this.namespaceVariableName = ''),
			(this.variableName = ''),
			(this.accessedGlobalsByScope = new Map()),
			(this.dependencies = new Set()),
			(this.dynamicDependencies = new Set()),
			(this.dynamicEntryModules = []),
			(this.exportNamesByVariable = new Map()),
			(this.exports = new Set()),
			(this.exportsByName = Object.create(null)),
			(this.fileName = null),
			(this.implicitEntryModules = []),
			(this.implicitlyLoadedBefore = new Set()),
			(this.imports = new Set()),
			(this.indentString = void 0),
			(this.isEmpty = !0),
			(this.name = null),
			(this.needsExportsShim = !1),
			(this.renderedDependencies = null),
			(this.renderedExports = null),
			(this.renderedHash = void 0),
			(this.renderedModules = Object.create(null)),
			(this.renderedModuleSources = new Map()),
			(this.renderedSource = null),
			(this.sortedExportNames = null),
			(this.strictFacade = !1),
			(this.usedModules = void 0),
			(this.execIndex = e.length > 0 ? e[0].execIndex : 1 / 0);
		const c = new Set(e);
		for (const t of e) {
			t.namespace.included && h.add(t),
				this.isEmpty && t.isIncluded() && (this.isEmpty = !1),
				(t.info.isEntry || s.preserveModules) && this.entryModules.push(t);
			for (const e of t.includedDynamicImporters)
				c.has(e) ||
					(this.dynamicEntryModules.push(t),
					t.info.syntheticNamedExports &&
						!s.preserveModules &&
						(h.add(t), this.exports.add(t.namespace)));
			t.implicitlyLoadedAfter.size > 0 && this.implicitEntryModules.push(t);
		}
		this.suggestedVariableName = $e(this.generateVariableName());
	}
	static generateFacade(e, t, s, i, n, r, a, o, h, l) {
		const c = new On([], e, t, s, i, n, r, a, o, null);
		c.assignFacadeName(l, h), a.has(h) || a.set(h, c);
		for (const e of h.getDependenciesToBeIncluded())
			c.dependencies.add(e instanceof Li ? r.get(e) : e);
		return (
			!c.dependencies.has(r.get(h)) &&
				h.info.hasModuleSideEffects &&
				h.hasEffects() &&
				c.dependencies.add(r.get(h)),
			c.ensureReexportsAreAvailableForModule(h),
			(c.facadeModule = h),
			(c.strictFacade = !0),
			c
		);
	}
	canModuleBeFacade(e, t) {
		const s = e.getExportNamesByVariable();
		for (const t of this.exports)
			if (!s.has(t))
				return (
					0 === s.size &&
						e.isUserDefinedEntryPoint &&
						'strict' === e.preserveSignature &&
						this.unsetOptions.has('preserveEntrySignatures') &&
						this.inputOptions.onwarn({
							code: 'EMPTY_FACADE',
							id: e.id,
							message: `To preserve the export signature of the entry module "${Qt(
								e.id
							)}", an empty facade chunk was created. This often happens when creating a bundle for a web app where chunks are placed in script tags and exports are ignored. In this case it is recommended to set "preserveEntrySignatures: false" to avoid this and reduce the number of chunks. Otherwise if this is intentional, set "preserveEntrySignatures: 'strict'" explicitly to silence this warning.`,
							url: 'https://rollupjs.org/guide/en/#preserveentrysignatures'
						}),
					!1
				);
		for (const i of t) if (!s.has(i) && i.module !== e) return !1;
		return !0;
	}
	generateExports() {
		this.sortedExportNames = null;
		const e = new Set(this.exports);
		if (
			null !== this.facadeModule &&
			(!1 !== this.facadeModule.preserveSignature || this.strictFacade)
		) {
			const t = this.facadeModule.getExportNamesByVariable();
			for (const [s, i] of t) {
				this.exportNamesByVariable.set(s, [...i]);
				for (const e of i) this.exportsByName[e] = s;
				e.delete(s);
			}
		}
		this.outputOptions.minifyInternalExports
			? (function (e, t, s) {
					let i = 0;
					for (const n of e) {
						let e = n.name[0];
						if (t[e])
							do {
								(e = L(++i)),
									49 === e.charCodeAt(0) && ((i += 9 * 64 ** (e.length - 1)), (e = L(i)));
							} while (R[e] || t[e]);
						(t[e] = n), s.set(n, [e]);
					}
			  })(e, this.exportsByName, this.exportNamesByVariable)
			: (function (e, t, s) {
					for (const i of e) {
						let e = 0,
							n = i.name;
						for (; t[n]; ) n = i.name + '$' + ++e;
						(t[n] = i), s.set(i, [n]);
					}
			  })(e, this.exportsByName, this.exportNamesByVariable),
			(this.outputOptions.preserveModules ||
				(this.facadeModule && this.facadeModule.info.isEntry)) &&
				(this.exportMode = _n(
					this,
					this.outputOptions,
					this.unsetOptions,
					this.facadeModule.id,
					this.inputOptions.onwarn
				));
	}
	generateFacades() {
		var e;
		const t = [],
			s = new Set([...this.entryModules, ...this.implicitEntryModules]),
			i = new Set(this.dynamicEntryModules.map((e) => e.namespace));
		for (const e of s)
			if (e.preserveSignature) for (const t of e.getExportNamesByVariable().keys()) i.add(t);
		for (const e of s) {
			const s = Array.from(e.userChunkNames, (e) => ({ name: e }));
			if (
				(0 === s.length && e.isUserDefinedEntryPoint && s.push({}),
				s.push(...Array.from(e.chunkFileNames, (e) => ({ fileName: e }))),
				0 === s.length && s.push({}),
				!this.facadeModule)
			) {
				const t =
					'strict' === e.preserveSignature ||
					('exports-only' === e.preserveSignature && 0 !== e.getExportNamesByVariable().size);
				(!t || this.outputOptions.preserveModules || this.canModuleBeFacade(e, i)) &&
					((this.facadeModule = e),
					this.facadeChunkByModule.set(e, this),
					e.preserveSignature &&
						((this.strictFacade = t), this.ensureReexportsAreAvailableForModule(e)),
					this.assignFacadeName(s.shift(), e));
			}
			for (const i of s)
				t.push(
					On.generateFacade(
						this.inputOptions,
						this.outputOptions,
						this.unsetOptions,
						this.pluginDriver,
						this.modulesById,
						this.chunkByModule,
						this.facadeChunkByModule,
						this.includedNamespaces,
						e,
						i
					)
				);
		}
		for (const t of this.dynamicEntryModules)
			t.info.syntheticNamedExports ||
				(!this.facadeModule && this.canModuleBeFacade(t, i)
					? ((this.facadeModule = t),
					  this.facadeChunkByModule.set(t, this),
					  (this.strictFacade = !0),
					  this.assignFacadeName({}, t))
					: this.facadeModule === t && !this.strictFacade && this.canModuleBeFacade(t, i)
					? (this.strictFacade = !0)
					: (null === (e = this.facadeChunkByModule.get(t)) || void 0 === e
							? void 0
							: e.strictFacade) || (this.includedNamespaces.add(t), this.exports.add(t.namespace)));
		return t;
	}
	generateId(e, t, s, i) {
		if (null !== this.fileName) return this.fileName;
		const [n, r] =
			this.facadeModule && this.facadeModule.isUserDefinedEntryPoint
				? [t.entryFileNames, 'output.entryFileNames']
				: [t.chunkFileNames, 'output.chunkFileNames'];
		return Tn(
			Mn(
				n,
				r,
				{
					format: () => t.format,
					hash: () => (i ? this.computeContentHashWithDependencies(e, t, s) : '[hash]'),
					name: () => this.getChunkName()
				},
				this.getChunkInfo.bind(this)
			),
			s
		);
	}
	generateIdPreserveModules(e, t, s, i) {
		const n = this.orderedModules[0].id,
			r = Xt(n);
		let a;
		if (Le(n)) {
			const s = Be(n),
				o = i.has('entryFileNames')
					? Ln.includes(s)
						? '[name].js'
						: '[name][extname].js'
					: t.entryFileNames,
				h = `${Ve(r)}/${Mn(
					o,
					'output.entryFileNames',
					{
						ext: () => s.substr(1),
						extname: () => s,
						format: () => t.format,
						name: () => this.getChunkName()
					},
					this.getChunkInfo.bind(this)
				)}`,
				{ preserveModulesRoot: l } = t;
			a = l && h.startsWith(l) ? h.slice(l.length).replace(/^[\\/]/, '') : b(e, h);
		} else a = '_virtual/' + De(r);
		return Tn(Oe(a), s);
	}
	getChunkInfo() {
		const e = this.facadeModule,
			t = this.getChunkName.bind(this);
		return {
			exports: this.getExportNames(),
			facadeModuleId: e && e.id,
			isDynamicEntry: this.dynamicEntryModules.length > 0,
			isEntry: null !== e && e.info.isEntry,
			isImplicitEntry: this.implicitEntryModules.length > 0,
			modules: this.renderedModules,
			get name() {
				return t();
			},
			type: 'chunk'
		};
	}
	getChunkInfoWithFileNames() {
		return Object.assign(this.getChunkInfo(), {
			code: void 0,
			dynamicImports: Array.from(this.dynamicDependencies, oi),
			fileName: this.id,
			implicitlyLoadedBefore: Array.from(this.implicitlyLoadedBefore, oi),
			importedBindings: this.getImportedBindingsPerDependency(),
			imports: Array.from(this.dependencies, oi),
			map: void 0,
			referencedFiles: this.getReferencedFiles()
		});
	}
	getChunkName() {
		return this.name || (this.name = Xt(this.getFallbackChunkName()));
	}
	getExportNames() {
		return (
			this.sortedExportNames || (this.sortedExportNames = Object.keys(this.exportsByName).sort())
		);
	}
	getRenderedHash() {
		if (this.renderedHash) return this.renderedHash;
		const e = yn(),
			t = this.pluginDriver.hookReduceValueSync(
				'augmentChunkHash',
				'',
				[this.getChunkInfo()],
				(e, t) => (t && (e += t), e)
			);
		return (
			e.update(t),
			e.update(this.renderedSource.toString()),
			e.update(
				this.getExportNames()
					.map((e) => {
						const t = this.exportsByName[e];
						return `${Qt(t.module.id).replace(/\\/g, '/')}:${t.name}:${e}`;
					})
					.join(',')
			),
			(this.renderedHash = e.digest('hex'))
		);
	}
	getVariableExportName(e) {
		return this.outputOptions.preserveModules && e instanceof kt
			? '*'
			: this.exportNamesByVariable.get(e)[0];
	}
	link() {
		for (const e of this.orderedModules)
			this.addDependenciesToChunk(e.getDependenciesToBeIncluded(), this.dependencies),
				this.addDependenciesToChunk(e.dynamicDependencies, this.dynamicDependencies),
				this.addDependenciesToChunk(e.implicitlyLoadedBefore, this.implicitlyLoadedBefore),
				this.setUpChunkImportsAndExportsForModule(e);
	}
	preRender(e, t) {
		const s = new v({ separator: e.compact ? '' : '\n\n' });
		(this.usedModules = []),
			(this.indentString = (function (e, t) {
				if (!0 !== t.indent) return t.indent;
				for (let t = 0; t < e.length; t++) {
					const s = In(e[t].originalCode);
					if (null !== s) return s;
				}
				return '\t';
			})(this.orderedModules, e));
		const i = e.compact ? '' : '\n',
			n = e.compact ? '' : ' ',
			r = {
				compact: e.compact,
				dynamicImportFunction: e.dynamicImportFunction,
				exportNamesByVariable: this.exportNamesByVariable,
				format: e.format,
				freeze: e.freeze,
				indent: this.indentString,
				namespaceToStringTag: e.namespaceToStringTag,
				outputPluginDriver: this.pluginDriver,
				varOrConst: e.preferConst ? 'const' : 'var'
			};
		if (
			e.hoistTransitiveImports &&
			!this.outputOptions.preserveModules &&
			null !== this.facadeModule
		)
			for (const e of this.dependencies) e instanceof On && this.inlineChunkDependencies(e);
		const a = [...this.dependencies];
		kn(a),
			(this.dependencies = new Set(a)),
			this.prepareDynamicImportsAndImportMetas(),
			this.setIdentifierRenderResolutions(e);
		let o = '';
		const h = this.renderedModules;
		for (const t of this.orderedModules) {
			let n = 0;
			if (t.isIncluded() || this.includedNamespaces.has(t)) {
				const a = t.render(r).trim();
				(n = a.length()),
					n &&
						(e.compact && -1 !== a.lastLine().indexOf('//') && a.append('\n'),
						this.renderedModuleSources.set(t, a),
						s.addSource(a),
						this.usedModules.push(t));
				const h = t.namespace;
				if (this.includedNamespaces.has(t) && !this.outputOptions.preserveModules) {
					const e = h.renderBlock(r);
					h.renderFirst() ? (o += i + e) : s.addSource(new x(e));
				}
			}
			const { renderedExports: a, removedExports: l } = t.getRenderedExports();
			h[t.id] = {
				originalLength: t.originalCode.length,
				removedExports: l,
				renderedExports: a,
				renderedLength: n
			};
		}
		if (
			(o && s.prepend(o + i + i),
			this.needsExportsShim &&
				s.prepend(`${i}${r.varOrConst} _missingExportShim${n}=${n}void 0;${i}${i}`),
			e.compact ? (this.renderedSource = s) : (this.renderedSource = s.trim()),
			(this.renderedHash = void 0),
			this.isEmpty && 0 === this.getExportNames().length && 0 === this.dependencies.size)
		) {
			const e = this.getChunkName();
			this.inputOptions.onwarn({
				chunkName: e,
				code: 'EMPTY_BUNDLE',
				message: `Generated an empty chunk: "${e}"`
			});
		}
		this.setExternalRenderPaths(e, t),
			(this.renderedDependencies = this.getChunkDependencyDeclarations(e)),
			(this.renderedExports =
				'none' === this.exportMode ? [] : this.getChunkExportDeclarations(e.format));
	}
	async render(e, t, s) {
		Ni('render format', 2);
		const i = e.format,
			n = Es[i];
		e.dynamicImportFunction &&
			'es' !== i &&
			this.inputOptions.onwarn({
				code: 'INVALID_OPTION',
				message: '"output.dynamicImportFunction" is ignored for formats other than "es".'
			});
		for (const e of this.dependencies) {
			const t = this.renderedDependencies.get(e);
			if (e instanceof Ue) {
				const s = e.renderPath;
				t.id = Cn(e.renormalizeRenderPath ? this.getRelativePath(s, !1) : s);
			} else
				(t.namedExportsMode = 'default' !== e.exportMode),
					(t.id = Cn(this.getRelativePath(e.id, !1)));
		}
		this.finaliseDynamicImports(e), this.finaliseImportMetas(i);
		const r =
			0 !== this.renderedExports.length ||
			[...this.renderedDependencies.values()].some((e) => e.reexports && 0 !== e.reexports.length);
		let a = !1;
		const o = new Set();
		for (const e of this.orderedModules) {
			e.usesTopLevelAwait && (a = !0);
			const t = this.accessedGlobalsByScope.get(e.scope);
			if (t) for (const e of t) o.add(e);
		}
		if (a && 'es' !== i && 'system' !== i)
			return Zt({
				code: 'INVALID_TLA_FORMAT',
				message: `Module format ${i} does not support top-level await. Use the "es" or "system" output formats rather.`
			});
		const h = n(
			this.renderedSource,
			{
				accessedGlobals: o,
				dependencies: [...this.renderedDependencies.values()],
				exports: this.renderedExports,
				hasExports: r,
				indentString: this.indentString,
				intro: t.intro,
				isEntryFacade:
					this.outputOptions.preserveModules ||
					(null !== this.facadeModule && this.facadeModule.info.isEntry),
				isModuleFacade: null !== this.facadeModule,
				namedExportsMode: 'default' !== this.exportMode,
				outro: t.outro,
				usesTopLevelAwait: a,
				varOrConst: e.preferConst ? 'const' : 'var',
				warn: this.inputOptions.onwarn
			},
			e
		);
		t.banner && h.prepend(t.banner), t.footer && h.append(t.footer);
		const c = h.toString();
		ki('render format', 2);
		let u = null;
		const d = [];
		let p = await (function ({
			code: e,
			options: t,
			outputPluginDriver: s,
			renderChunk: i,
			sourcemapChain: n
		}) {
			return s.hookReduceArg0('renderChunk', [e, i, t], (e, t, s) => {
				if (null == t) return e;
				if (('string' == typeof t && (t = { code: t, map: void 0 }), null !== t.map)) {
					const e = $n(t.map);
					n.push(e || { missing: !0, plugin: s.name });
				}
				return t.code;
			});
		})({
			code: c,
			options: e,
			outputPluginDriver: this.pluginDriver,
			renderChunk: s,
			sourcemapChain: d
		});
		if (e.sourcemap) {
			let t;
			Ni('sourcemap', 2),
				(t = e.file ? We(e.sourcemapFile || e.file) : e.dir ? We(e.dir, this.id) : We(this.id));
			const s = h.generateDecodedMap({});
			(u = (function (e, t, s, i, n, r) {
				const a = Di(r),
					o = s
						.filter((e) => !e.excludeFromSourcemap)
						.map((e) => Vi(e.id, e.originalCode, e.originalSourcemap, e.sourcemapChain, a));
				let h = new Oi(t, o);
				h = i.reduce(a, h);
				let { sources: c, sourcesContent: u, names: d, mappings: p } = h.traceMappings();
				if (e) {
					const t = Ve(e);
					(c = c.map((e) => Fe(t, e))), (e = De(e));
				}
				return (
					(u = n ? null : u),
					new l({ file: e, sources: c, sourcesContent: u, names: d, mappings: p })
				);
			})(t, s, this.usedModules, d, e.sourcemapExcludeSources, this.inputOptions.onwarn)),
				(u.sources = u.sources
					.map((s) => {
						const { sourcemapPathTransform: i } = e;
						if (i) {
							const e = i(s, t + '.map');
							return (
								'string' != typeof e &&
									Zt(os('sourcemapPathTransform function must return a string.')),
								e
							);
						}
						return s;
					})
					.map(Oe)),
				ki('sourcemap', 2);
		}
		return e.compact || '\n' === p[p.length - 1] || (p += '\n'), { code: p, map: u };
	}
	addDependenciesToChunk(e, t) {
		for (const s of e)
			if (s instanceof Li) {
				const e = this.chunkByModule.get(s);
				e && e !== this && t.add(e);
			} else t.add(s);
	}
	assignFacadeName({ fileName: e, name: t }, s) {
		e ? (this.fileName = e) : (this.name = Xt(t || s.chunkName || Yt(s.id)));
	}
	computeContentHashWithDependencies(e, t, s) {
		const i = yn();
		i.update([e.intro, e.outro, e.banner, e.footer].map((e) => e || '').join(':')),
			i.update(t.format);
		const n = new Set([this]);
		for (const r of n)
			if (
				(r instanceof Ue
					? i.update(':' + r.renderPath)
					: (i.update(r.getRenderedHash()), i.update(r.generateId(e, t, s, !1))),
				!(r instanceof Ue))
			)
				for (const e of [...r.dependencies, ...r.dynamicDependencies]) n.add(e);
		return i.digest('hex').substr(0, 8);
	}
	ensureReexportsAreAvailableForModule(e) {
		const t = e.getExportNamesByVariable();
		for (const e of t.keys()) {
			const t = e instanceof wt,
				s = t ? e.getBaseVariable() : e;
			if (!(s instanceof kt && this.outputOptions.preserveModules)) {
				const e = s.module;
				if (e instanceof Li) {
					const i = this.chunkByModule.get(e);
					i && i !== this && (i.exports.add(s), t && this.imports.add(s));
				}
			}
		}
	}
	finaliseDynamicImports(e) {
		const t = 'amd' === e.format;
		for (const [s, i] of this.renderedModuleSources)
			for (const { node: n, resolution: r } of s.dynamicImports) {
				const s = this.chunkByModule.get(r),
					a = this.facadeChunkByModule.get(r);
				if (!r || !n.included || s === this) continue;
				const o =
					r instanceof Li
						? `'${this.getRelativePath((a || s).id, t)}'`
						: r instanceof Ue
						? `'${r.renormalizeRenderPath ? this.getRelativePath(r.renderPath, t) : r.renderPath}'`
						: r;
				n.renderFinalResolution(
					i,
					o,
					r instanceof Li &&
						!(null == a ? void 0 : a.strictFacade) &&
						s.exportNamesByVariable.get(r.namespace)[0],
					e
				);
			}
	}
	finaliseImportMetas(e) {
		for (const [t, s] of this.renderedModuleSources)
			for (const i of t.importMetas) i.renderFinalMechanism(s, this.id, e, this.pluginDriver);
	}
	generateVariableName() {
		if (this.manualChunkAlias) return this.manualChunkAlias;
		const e =
			this.entryModules[0] ||
			this.implicitEntryModules[0] ||
			this.dynamicEntryModules[0] ||
			this.orderedModules[this.orderedModules.length - 1];
		return e ? e.chunkName || Yt(e.id) : 'chunk';
	}
	getChunkDependencyDeclarations(e) {
		const t = this.getImportSpecifiers(),
			s = this.getReexportSpecifiers(),
			i = new Map();
		for (const n of this.dependencies) {
			const r = t.get(n) || null,
				a = s.get(n) || null,
				o = n instanceof Ue || 'default' !== n.exportMode;
			i.set(n, {
				defaultVariableName: n.defaultVariableName,
				globalName:
					n instanceof Ue &&
					('umd' === e.format || 'iife' === e.format) &&
					Rn(n, e.globals, null !== (r || a), this.inputOptions.onwarn),
				id: void 0,
				imports: r,
				isChunk: n instanceof On,
				name: n.variableName,
				namedExportsMode: o,
				namespaceVariableName: n.namespaceVariableName,
				reexports: a
			});
		}
		return i;
	}
	getChunkExportDeclarations(e) {
		const t = [];
		for (const s of this.getExportNames()) {
			if ('*' === s[0]) continue;
			const i = this.exportsByName[s];
			if (!(i instanceof wt)) {
				const e = i.module;
				if (e && this.chunkByModule.get(e) !== this) continue;
			}
			let n = null,
				r = !1,
				a = !1,
				o = i.getName();
			if (i instanceof He) {
				i.init === X && (a = !0);
				for (const e of i.declarations)
					if (e.parent instanceof St || (e instanceof At && e.declaration instanceof St)) {
						r = !0;
						break;
					}
			} else i instanceof wt && ((n = o), 'es' === e && 'default' !== s && (o = i.renderName));
			t.push({ exported: s, expression: n, hoisted: r, local: o, uninitialized: a });
		}
		return t;
	}
	getDependenciesToBeDeconflicted(e, t, s) {
		const i = new Set(),
			n = new Set(),
			r = new Set();
		for (const t of [...this.exportNamesByVariable.keys(), ...this.imports])
			if (e || t.isNamespace) {
				const a = t.module;
				if (a instanceof Ue)
					i.add(a),
						e &&
							('default' === t.name
								? It[String(s(a.id))] && n.add(a)
								: '*' === t.name && Mt[String(s(a.id))] && r.add(a));
				else {
					const s = this.chunkByModule.get(a);
					s !== this && (i.add(s), e && 'default' === s.exportMode && t.isNamespace && r.add(s));
				}
			}
		if (t) for (const e of this.dependencies) i.add(e);
		return { deconflictedDefault: n, deconflictedNamespace: r, dependencies: i };
	}
	getFallbackChunkName() {
		return this.manualChunkAlias
			? this.manualChunkAlias
			: this.fileName
			? Yt(this.fileName)
			: Yt(this.orderedModules[this.orderedModules.length - 1].id);
	}
	getImportedBindingsPerDependency() {
		const e = {};
		for (const [t, s] of this.renderedDependencies) {
			const i = new Set();
			if (s.imports) for (const { imported: e } of s.imports) i.add(e);
			if (s.reexports) for (const { imported: e } of s.reexports) i.add(e);
			e[t.id] = [...i];
		}
		return e;
	}
	getImportSpecifiers() {
		const { interop: e } = this.outputOptions,
			t = new Map();
		for (const s of this.imports) {
			const i = s.module;
			let n, r;
			if (i instanceof Ue) {
				if (((n = i), (r = s.name), 'default' !== r && '*' !== r && 'defaultOnly' === e(i.id)))
					return Zt(rs(i.id, r, !1));
			} else (n = this.chunkByModule.get(i)), (r = n.getVariableExportName(s));
			V(t, n, () => []).push({ imported: r, local: s.getName() });
		}
		return t;
	}
	getReexportSpecifiers() {
		const { externalLiveBindings: e, interop: t } = this.outputOptions,
			s = new Map();
		for (let i of this.getExportNames()) {
			let n,
				r,
				a = !1;
			if ('*' === i[0]) {
				const s = i.substr(1);
				'defaultOnly' === t(s) && this.inputOptions.onwarn(as(s)),
					(a = e),
					(n = this.modulesById.get(s)),
					(r = i = '*');
			} else {
				const s = this.exportsByName[i];
				if (s instanceof wt) continue;
				const o = s.module;
				if (o instanceof Li) {
					if (((n = this.chunkByModule.get(o)), n === this)) continue;
					(r = n.getVariableExportName(s)), (a = s.isReassigned);
				} else {
					if (((n = o), (r = s.name), 'default' !== r && '*' !== r && 'defaultOnly' === t(o.id)))
						return Zt(rs(o.id, r, !0));
					a = e && ('default' !== r || $t(String(t(o.id)), !0));
				}
			}
			V(s, n, () => []).push({ imported: r, needsLiveBinding: a, reexported: i });
		}
		return s;
	}
	getReferencedFiles() {
		const e = [];
		for (const t of this.orderedModules)
			for (const s of t.importMetas) {
				const t = s.getReferencedFileName(this.pluginDriver);
				t && e.push(t);
			}
		return e;
	}
	getRelativePath(e, t) {
		let s = Oe(b(Ve(this.id), e));
		return (
			t && s.endsWith('.js') && (s = s.slice(0, -3)),
			'..' === s ? '../../' + De(e) : '' === s ? '../' + De(e) : s.startsWith('../') ? s : './' + s
		);
	}
	inlineChunkDependencies(e) {
		for (const t of e.dependencies)
			this.dependencies.has(t) ||
				(this.dependencies.add(t), t instanceof On && this.inlineChunkDependencies(t));
	}
	prepareDynamicImportsAndImportMetas() {
		var e;
		const t = this.accessedGlobalsByScope;
		for (const s of this.orderedModules) {
			for (const { node: i, resolution: n } of s.dynamicImports)
				if (i.included)
					if (n instanceof Li) {
						const s = this.chunkByModule.get(n);
						s === this
							? i.setInternalResolution(n.namespace)
							: i.setExternalResolution(
									(null === (e = this.facadeChunkByModule.get(n)) || void 0 === e
										? void 0
										: e.exportMode) || s.exportMode,
									n,
									this.outputOptions,
									this.pluginDriver,
									t
							  );
					} else i.setExternalResolution('external', n, this.outputOptions, this.pluginDriver, t);
			for (const e of s.importMetas) e.addAccessedGlobals(this.outputOptions.format, t);
		}
	}
	setExternalRenderPaths(e, t) {
		for (const s of [...this.dependencies, ...this.dynamicDependencies])
			s instanceof Ue && s.setRenderPath(e, t);
	}
	setIdentifierRenderResolutions({ format: e, interop: t }) {
		const s = new Set();
		for (const t of this.getExportNames()) {
			const i = this.exportsByName[t];
			i instanceof Nt && (this.needsExportsShim = !0),
				'es' !== e && 'system' !== e && i.isReassigned && !i.isId
					? i.setRenderNames('exports', t)
					: i instanceof wt
					? s.add(i)
					: i.setRenderNames(null, null);
		}
		const i = new Set();
		switch ((this.needsExportsShim && i.add('_missingExportShim'), e)) {
			case 'system':
				i.add('module').add('exports');
				break;
			case 'es':
				break;
			case 'cjs':
				i.add('module').add('require').add('__filename').add('__dirname');
			default:
				i.add('exports');
				for (const e of Wt) i.add(e);
		}
		En(
			this.orderedModules,
			this.getDependenciesToBeDeconflicted(
				'es' !== e && 'system' !== e,
				'amd' === e || 'umd' === e || 'iife' === e,
				t
			),
			this.imports,
			i,
			e,
			t,
			this.outputOptions.preserveModules,
			this.outputOptions.externalLiveBindings,
			this.chunkByModule,
			s,
			this.exportNamesByVariable,
			this.accessedGlobalsByScope,
			this.includedNamespaces
		);
	}
	setUpChunkImportsAndExportsForModule(e) {
		const t = new Set(e.imports);
		if (!this.outputOptions.preserveModules && this.includedNamespaces.has(e)) {
			const s = e.namespace.getMemberVariables();
			for (const e of Object.keys(s)) t.add(s[e]);
		}
		for (let e of t) {
			e instanceof Ct && (e = e.getOriginalVariable()),
				e instanceof wt && (e = e.getBaseVariable());
			const t = this.chunkByModule.get(e.module);
			t !== this &&
				(this.imports.add(e),
				!(e instanceof kt && this.outputOptions.preserveModules) &&
					e.module instanceof Li &&
					t.exports.add(e));
		}
		(this.includedNamespaces.has(e) ||
			(e.info.isEntry && !1 !== e.preserveSignature) ||
			e.includedDynamicImporters.some((e) => this.chunkByModule.get(e) !== this)) &&
			this.ensureReexportsAreAvailableForModule(e);
		for (const { node: t, resolution: s } of e.dynamicImports)
			t.included &&
				s instanceof Li &&
				this.chunkByModule.get(s) === this &&
				!this.includedNamespaces.has(s) &&
				(this.includedNamespaces.add(s), this.ensureReexportsAreAvailableForModule(s));
	}
}
const Dn = (e, t) => (t ? `${e}\n${t}` : e),
	Vn = (e, t) => (t ? `${e}\n\n${t}` : e);
function Bn(e, t) {
	const s = [],
		i = new Set(t.keys()),
		n = Object.create(null);
	for (const [e, s] of t) {
		Fn(e, (n[s] = n[s] || []), i);
	}
	for (const [e, t] of Object.entries(n)) s.push({ alias: e, modules: t });
	const r = new Map(),
		{ dependentEntryPointsByModule: a, dynamicEntryModules: o } = (function (e) {
			const t = new Set(),
				s = new Map(),
				i = new Set(e);
			for (const e of i) {
				const n = new Set([e]);
				for (const r of n) {
					V(s, r, () => new Set()).add(e);
					for (const e of r.getDependenciesToBeIncluded()) e instanceof Ue || n.add(e);
					for (const { resolution: e } of r.dynamicImports)
						e instanceof Li && e.includedDynamicImporters.length > 0 && (t.add(e), i.add(e));
					for (const e of r.implicitlyLoadedBefore) t.add(e), i.add(e);
				}
			}
			return { dependentEntryPointsByModule: s, dynamicEntryModules: t };
		})(e),
		h = (function (e, t) {
			const s = new Map();
			for (const i of t) {
				const t = V(s, i, () => new Set());
				for (const s of [...i.includedDynamicImporters, ...i.implicitlyLoadedAfter])
					for (const i of e.get(s)) t.add(i);
			}
			return s;
		})(a, o),
		l = new Set(e);
	function c(e, t) {
		const s = new Set([e]);
		for (const n of s) {
			const o = V(r, n, () => new Set());
			if (!t || !u(t, a.get(n))) {
				o.add(e);
				for (const e of n.getDependenciesToBeIncluded()) e instanceof Ue || i.has(e) || s.add(e);
			}
		}
	}
	function u(e, t) {
		const s = new Set(e);
		for (const e of s)
			if (!t.has(e)) {
				if (l.has(e)) return !1;
				const t = h.get(e);
				for (const e of t) s.add(e);
			}
		return !0;
	}
	for (const t of e) i.has(t) || c(t, null);
	for (const e of o) i.has(e) || c(e, h.get(e));
	return (
		s.push(
			...(function (e, t) {
				const s = Object.create(null);
				for (const [i, n] of t) {
					let t = '';
					for (const s of e) t += n.has(s) ? 'X' : '_';
					const r = s[t];
					r ? r.push(i) : (s[t] = [i]);
				}
				return Object.keys(s).map((e) => ({ alias: null, modules: s[e] }));
			})([...e, ...o], r)
		),
		s
	);
}
function Fn(e, t, s) {
	const i = new Set([e]);
	for (const e of i) {
		s.add(e), t.push(e);
		for (const t of e.dependencies) t instanceof Ue || s.has(t) || i.add(t);
	}
}
var Wn;
function Un(e, t, s) {
	e in t &&
		s(
			(function (e) {
				return {
					code: ts.FILE_NAME_CONFLICT,
					message: `The emitted file "${e}" overwrites a previously emitted file of the same name.`
				};
			})(e)
		),
		(t[e] = zn);
}
!(function (e) {
	(e[(e.LOAD_AND_PARSE = 0)] = 'LOAD_AND_PARSE'),
		(e[(e.ANALYSE = 1)] = 'ANALYSE'),
		(e[(e.GENERATE = 2)] = 'GENERATE');
})(Wn || (Wn = {}));
const zn = { type: 'placeholder' };
function jn(e, t, s) {
	if (!('string' == typeof e || e instanceof Uint8Array)) {
		const e = t.fileName || t.name || s;
		return Zt(
			os(
				`Could not set source for ${
					'string' == typeof e ? `asset "${e}"` : 'unnamed asset'
				}, asset source needs to be a string, Uint8Array or Buffer.`
			)
		);
	}
	return e;
}
function Gn(e, t) {
	return 'string' != typeof e.fileName
		? Zt(
				((s = e.name || t),
				{
					code: ts.ASSET_NOT_FINALISED,
					message: `Plugin error - Unable to get file name for asset "${s}". Ensure that the source is set and that generate is called first.`
				})
		  )
		: e.fileName;
	var s;
}
function Hn(e, t) {
	var s;
	const i =
		e.fileName ||
		(e.module &&
			(null === (s = null == t ? void 0 : t.get(e.module)) || void 0 === s ? void 0 : s.id));
	return (
		i ||
		Zt(
			((n = e.fileName || e.name),
			{
				code: ts.CHUNK_NOT_GENERATED,
				message: `Plugin error - Unable to get file name for chunk "${n}". Ensure that generate is called first.`
			})
		)
	);
	var n;
}
class qn {
	constructor(e, t, s) {
		(this.graph = e),
			(this.options = t),
			(this.facadeChunkByModule = null),
			(this.output = null),
			(this.assertAssetsFinalized = () => {
				for (const [t, s] of this.filesByReferenceId.entries())
					if ('asset' === s.type && 'string' != typeof s.fileName)
						return Zt(
							((e = s.name || t),
							{
								code: ts.ASSET_SOURCE_MISSING,
								message: `Plugin error creating asset "${e}" - no asset source set.`
							})
						);
				var e;
			}),
			(this.emitFile = (e) =>
				(function (e) {
					return e && ('asset' === e.type || 'chunk' === e.type);
				})(e)
					? (function (e) {
							const t = e.fileName || e.name;
							return !t || ('string' == typeof t && Jt(t));
					  })(e)
						? 'chunk' === e.type
							? this.emitChunk(e)
							: this.emitAsset(e)
						: Zt(
								os(
									`The "fileName" or "name" properties of emitted files must be strings that are neither absolute nor relative paths and do not contain invalid characters, received "${
										e.fileName || e.name
									}".`
								)
						  )
					: Zt(os(`Emitted files must be of type "asset" or "chunk", received "${e && e.type}".`))),
			(this.getFileName = (e) => {
				const t = this.filesByReferenceId.get(e);
				return t
					? 'chunk' === t.type
						? Hn(t, this.facadeChunkByModule)
						: Gn(t, e)
					: Zt(
							((s = e),
							{
								code: ts.FILE_NOT_FOUND,
								message: `Plugin error - Unable to get file name for unknown file "${s}".`
							})
					  );
				var s;
			}),
			(this.setAssetSource = (e, t) => {
				const s = this.filesByReferenceId.get(e);
				if (!s)
					return Zt(
						((i = e),
						{
							code: ts.ASSET_NOT_FOUND,
							message: `Plugin error - Unable to set the source for unknown asset "${i}".`
						})
					);
				var i, n;
				if ('asset' !== s.type)
					return Zt(
						os(`Asset sources can only be set for emitted assets but "${e}" is an emitted chunk.`)
					);
				if (void 0 !== s.source)
					return Zt(
						((n = s.name || e),
						{
							code: ts.ASSET_SOURCE_ALREADY_SET,
							message: `Unable to set the source for asset "${n}", source already set.`
						})
					);
				const r = jn(t, s, e);
				this.output ? this.finalizeAsset(s, r, e, this.output) : (s.source = r);
			}),
			(this.setOutputBundle = (e, t, s) => {
				(this.output = { assetFileNames: t, bundle: e }), (this.facadeChunkByModule = s);
				for (const e of this.filesByReferenceId.values())
					e.fileName && Un(e.fileName, this.output.bundle, this.options.onwarn);
				for (const [e, t] of this.filesByReferenceId.entries())
					'asset' === t.type &&
						void 0 !== t.source &&
						this.finalizeAsset(t, t.source, e, this.output);
			}),
			(this.filesByReferenceId = s ? new Map(s.filesByReferenceId) : new Map());
	}
	assignReferenceId(e, t) {
		let s;
		do {
			const e = yn();
			s ? e.update(s) : e.update(t), (s = e.digest('hex').substr(0, 8));
		} while (this.filesByReferenceId.has(s));
		return this.filesByReferenceId.set(s, e), s;
	}
	emitAsset(e) {
		const t = void 0 !== e.source ? jn(e.source, e, null) : void 0,
			s = { fileName: e.fileName, name: e.name, source: t, type: 'asset' },
			i = this.assignReferenceId(s, e.fileName || e.name || e.type);
		return (
			this.output &&
				(e.fileName && Un(e.fileName, this.output.bundle, this.options.onwarn),
				void 0 !== t && this.finalizeAsset(s, t, i, this.output)),
			i
		);
	}
	emitChunk(e) {
		if (this.graph.phase > Wn.LOAD_AND_PARSE)
			return Zt({
				code: ts.INVALID_ROLLUP_PHASE,
				message: 'Cannot emit chunks after module loading has finished.'
			});
		if ('string' != typeof e.id)
			return Zt(os(`Emitted chunks need to have a valid string id, received "${e.id}"`));
		const t = { fileName: e.fileName, module: null, name: e.name || e.id, type: 'chunk' };
		return (
			this.graph.moduleLoader
				.emitChunk(e)
				.then((e) => (t.module = e))
				.catch(() => {}),
			this.assignReferenceId(t, e.id)
		);
	}
	finalizeAsset(e, t, s, i) {
		const n =
				e.fileName ||
				(function (e, t) {
					for (const s of Object.keys(e)) {
						const i = e[s];
						if ('asset' === i.type && Kn(t, i.source)) return s;
					}
					return null;
				})(i.bundle, t) ||
				(function (e, t, s) {
					const i = e || 'asset';
					return Tn(
						Mn(
							s.assetFileNames,
							'output.assetFileNames',
							{
								hash() {
									const e = yn();
									return e.update(i), e.update(':'), e.update(t), e.digest('hex').substr(0, 8);
								},
								ext: () => Be(i).substr(1),
								extname: () => Be(i),
								name: () => i.substr(0, i.length - Be(i).length)
							},
							() => ({ name: e, source: t, type: 'asset' })
						),
						s.bundle
					);
				})(e.name, t, i),
			r = { ...e, source: t, fileName: n };
		this.filesByReferenceId.set(s, r);
		const a = this.options;
		i.bundle[n] = {
			fileName: n,
			name: e.name,
			get isAsset() {
				return (
					hs(
						'Accessing "isAsset" on files in the bundle is deprecated, please use "type === \'asset\'" instead',
						!0,
						a
					),
					!0
				);
			},
			source: t,
			type: 'asset'
		};
	}
}
function Kn(e, t) {
	if ('string' == typeof e) return e === t;
	if ('string' == typeof t) return !1;
	if ('equals' in e) return e.equals(t);
	if (e.length !== t.length) return !1;
	for (let s = 0; s < e.length; s++) if (e[s] !== t[s]) return !1;
	return !0;
}
class Xn {
	constructor(e, t, s, i, n) {
		(this.outputOptions = e),
			(this.unsetOptions = t),
			(this.inputOptions = s),
			(this.pluginDriver = i),
			(this.graph = n),
			(this.facadeChunkByModule = new Map()),
			(this.includedNamespaces = new Set());
	}
	async generate(e) {
		Ni('GENERATE', 1);
		const t = Object.create(null);
		this.pluginDriver.setOutputBundle(
			t,
			this.outputOptions.assetFileNames,
			this.facadeChunkByModule
		);
		try {
			await this.pluginDriver.hookParallel('renderStart', [this.outputOptions, this.inputOptions]),
				Ni('generate chunks', 2);
			const e = await this.generateChunks();
			e.length > 1 &&
				(function (e) {
					if ('umd' === e.format || 'iife' === e.format)
						return Zt({
							code: 'INVALID_OPTION',
							message: 'UMD and IIFE output formats are not supported for code-splitting builds.'
						});
					if ('string' == typeof e.file)
						return Zt({
							code: 'INVALID_OPTION',
							message:
								'When building multiple chunks, the "output.dir" option must be used, not "output.file". To inline dynamic imports, set the "inlineDynamicImports" option.'
						});
					if (e.sourcemapFile)
						Zt({
							code: 'INVALID_OPTION',
							message: '"output.sourcemapFile" is only supported for single-file builds.'
						});
				})(this.outputOptions);
			const s = (function (e) {
				if (0 === e.length) return '/';
				if (1 === e.length) return Ve(e[0]);
				const t = e.slice(1).reduce((e, t) => {
					const s = t.split(/\/+|\\+/);
					let i;
					for (i = 0; e[i] === s[i] && i < Math.min(e.length, s.length); i++);
					return e.slice(0, i);
				}, e[0].split(/\/+|\\+/));
				return t.length > 1 ? t.join('/') : '/';
			})(
				(function (e) {
					const t = [];
					for (const s of e) for (const e of s.entryModules) Le(e.id) && t.push(e.id);
					return t;
				})(e)
			);
			ki('generate chunks', 2), Ni('render modules', 2);
			const i = await (async function (e, t) {
				try {
					let [s, i, n, r] = await Promise.all([
						t.hookReduceValue('banner', e.banner(), [], Dn),
						t.hookReduceValue('footer', e.footer(), [], Dn),
						t.hookReduceValue('intro', e.intro(), [], Vn),
						t.hookReduceValue('outro', e.outro(), [], Vn)
					]);
					return (
						n && (n += '\n\n'),
						r && (r = '\n\n' + r),
						s.length && (s += '\n'),
						i.length && (i = '\n' + i),
						{ intro: n, outro: r, banner: s, footer: i }
					);
				} catch (e) {
					return Zt({
						code: 'ADDON_ERROR',
						message: `Could not retrieve ${e.hook}. Check configuration of plugin ${e.plugin}.\n\tError Message: ${e.message}`
					});
				}
			})(this.outputOptions, this.pluginDriver);
			this.prerenderChunks(e, s),
				ki('render modules', 2),
				await this.addFinalizedChunksToBundle(e, s, i, t);
		} catch (e) {
			throw (await this.pluginDriver.hookParallel('renderError', [e]), e);
		}
		return (
			await this.pluginDriver.hookSeq('generateBundle', [this.outputOptions, t, e]),
			this.finaliseAssets(t),
			ki('GENERATE', 1),
			t
		);
	}
	async addFinalizedChunksToBundle(e, t, s, i) {
		this.assignChunkIds(e, t, s, i);
		for (const t of e) i[t.id] = t.getChunkInfoWithFileNames();
		await Promise.all(
			e.map(async (e) => {
				const t = i[e.id];
				Object.assign(t, await e.render(this.outputOptions, s, t));
			})
		);
	}
	async addManualChunks(e) {
		const t = new Map(),
			s = await Promise.all(
				Object.keys(e).map(async (t) => ({
					alias: t,
					entries: await this.graph.moduleLoader.addAdditionalModules(e[t])
				}))
			);
		for (const { alias: e, entries: i } of s) for (const s of i) Qn(e, s, t);
		return t;
	}
	assignChunkIds(e, t, s, i) {
		const n = [],
			r = [];
		for (const t of e) (t.facadeModule && t.facadeModule.isUserDefinedEntryPoint ? n : r).push(t);
		const a = n.concat(r);
		for (const e of a)
			this.outputOptions.file
				? (e.id = De(this.outputOptions.file))
				: this.outputOptions.preserveModules
				? (e.id = e.generateIdPreserveModules(t, this.outputOptions, i, this.unsetOptions))
				: (e.id = e.generateId(s, this.outputOptions, i, !0)),
				(i[e.id] = zn);
	}
	assignManualChunks(e) {
		const t = new Map(),
			s = {
				getModuleIds: () => this.graph.modulesById.keys(),
				getModuleInfo: this.graph.getModuleInfo
			};
		for (const i of this.graph.modulesById.values())
			if (i instanceof Li) {
				const n = e(i.id, s);
				'string' == typeof n && Qn(n, i, t);
			}
		return t;
	}
	finaliseAssets(e) {
		for (const t of Object.keys(e)) {
			const s = e[t];
			s.type ||
				(hs(
					'A plugin is directly adding properties to the bundle object in the "generateBundle" hook. This is deprecated and will be removed in a future Rollup version, please use "this.emitFile" instead.',
					!0,
					this.inputOptions
				),
				(s.type = 'asset'));
		}
		this.pluginDriver.finaliseAssets();
	}
	async generateChunks() {
		const { manualChunks: e } = this.outputOptions,
			t = 'object' == typeof e ? await this.addManualChunks(e) : this.assignManualChunks(e),
			s = [],
			i = new Map();
		for (const { alias: e, modules: n } of this.outputOptions.inlineDynamicImports
			? [{ alias: null, modules: Yn(this.graph.modulesById) }]
			: this.outputOptions.preserveModules
			? Yn(this.graph.modulesById).map((e) => ({ alias: null, modules: [e] }))
			: Bn(this.graph.entryModules, t)) {
			kn(n);
			const t = new On(
				n,
				this.inputOptions,
				this.outputOptions,
				this.unsetOptions,
				this.pluginDriver,
				this.graph.modulesById,
				i,
				this.facadeChunkByModule,
				this.includedNamespaces,
				e
			);
			s.push(t);
			for (const e of n) i.set(e, t);
		}
		for (const e of s) e.link();
		const n = [];
		for (const e of s) n.push(...e.generateFacades());
		return [...s, ...n];
	}
	prerenderChunks(e, t) {
		for (const t of e) t.generateExports();
		for (const s of e) s.preRender(this.outputOptions, t);
	}
}
function Yn(e) {
	return [...e.values()].filter(
		(e) =>
			e instanceof Li && (e.isIncluded() || e.info.isEntry || e.includedDynamicImporters.length > 0)
	);
}
function Qn(e, t, s) {
	const i = s.get(t);
	if ('string' == typeof i && i !== e)
		return Zt(
			((n = t.id),
			(r = e),
			(a = i),
			{
				code: ts.INVALID_CHUNK,
				message: `Cannot assign ${Qt(n)} to the "${r}" chunk as it is already in the "${a}" chunk.`
			})
		);
	var n, r, a;
	s.set(t, e);
}
var Jn = {
		3: 'abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile',
		5: 'class enum extends super const export import',
		6: 'enum',
		strict: 'implements interface let package private protected public static yield',
		strictBind: 'eval arguments'
	},
	Zn =
		'break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this',
	er = {
		5: Zn,
		'5module': Zn + ' export import',
		6: Zn + ' const class extends export import super'
	},
	tr = /^in(stanceof)?$/,
	sr =
		'ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࢠ-ࢴࢶ-ࣇऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഄ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆿㇰ-ㇿ㐀-䶿一-鿼ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞿꟂ-ꟊꟵ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭩꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ',
	ir =
		'‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛࣓-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍୕-ୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ඁ-ඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ຼ່-ໍ໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠐-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᪿᫀᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭᳴᳷-᳹᷀-᷹᷻-᷿‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧ꠬ꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿',
	nr = new RegExp('[' + sr + ']'),
	rr = new RegExp('[' + sr + ir + ']');
sr = ir = null;
var ar = [
		0,
		11,
		2,
		25,
		2,
		18,
		2,
		1,
		2,
		14,
		3,
		13,
		35,
		122,
		70,
		52,
		268,
		28,
		4,
		48,
		48,
		31,
		14,
		29,
		6,
		37,
		11,
		29,
		3,
		35,
		5,
		7,
		2,
		4,
		43,
		157,
		19,
		35,
		5,
		35,
		5,
		39,
		9,
		51,
		157,
		310,
		10,
		21,
		11,
		7,
		153,
		5,
		3,
		0,
		2,
		43,
		2,
		1,
		4,
		0,
		3,
		22,
		11,
		22,
		10,
		30,
		66,
		18,
		2,
		1,
		11,
		21,
		11,
		25,
		71,
		55,
		7,
		1,
		65,
		0,
		16,
		3,
		2,
		2,
		2,
		28,
		43,
		28,
		4,
		28,
		36,
		7,
		2,
		27,
		28,
		53,
		11,
		21,
		11,
		18,
		14,
		17,
		111,
		72,
		56,
		50,
		14,
		50,
		14,
		35,
		349,
		41,
		7,
		1,
		79,
		28,
		11,
		0,
		9,
		21,
		107,
		20,
		28,
		22,
		13,
		52,
		76,
		44,
		33,
		24,
		27,
		35,
		30,
		0,
		3,
		0,
		9,
		34,
		4,
		0,
		13,
		47,
		15,
		3,
		22,
		0,
		2,
		0,
		36,
		17,
		2,
		24,
		85,
		6,
		2,
		0,
		2,
		3,
		2,
		14,
		2,
		9,
		8,
		46,
		39,
		7,
		3,
		1,
		3,
		21,
		2,
		6,
		2,
		1,
		2,
		4,
		4,
		0,
		19,
		0,
		13,
		4,
		159,
		52,
		19,
		3,
		21,
		2,
		31,
		47,
		21,
		1,
		2,
		0,
		185,
		46,
		42,
		3,
		37,
		47,
		21,
		0,
		60,
		42,
		14,
		0,
		72,
		26,
		230,
		43,
		117,
		63,
		32,
		7,
		3,
		0,
		3,
		7,
		2,
		1,
		2,
		23,
		16,
		0,
		2,
		0,
		95,
		7,
		3,
		38,
		17,
		0,
		2,
		0,
		29,
		0,
		11,
		39,
		8,
		0,
		22,
		0,
		12,
		45,
		20,
		0,
		35,
		56,
		264,
		8,
		2,
		36,
		18,
		0,
		50,
		29,
		113,
		6,
		2,
		1,
		2,
		37,
		22,
		0,
		26,
		5,
		2,
		1,
		2,
		31,
		15,
		0,
		328,
		18,
		190,
		0,
		80,
		921,
		103,
		110,
		18,
		195,
		2749,
		1070,
		4050,
		582,
		8634,
		568,
		8,
		30,
		114,
		29,
		19,
		47,
		17,
		3,
		32,
		20,
		6,
		18,
		689,
		63,
		129,
		74,
		6,
		0,
		67,
		12,
		65,
		1,
		2,
		0,
		29,
		6135,
		9,
		1237,
		43,
		8,
		8952,
		286,
		50,
		2,
		18,
		3,
		9,
		395,
		2309,
		106,
		6,
		12,
		4,
		8,
		8,
		9,
		5991,
		84,
		2,
		70,
		2,
		1,
		3,
		0,
		3,
		1,
		3,
		3,
		2,
		11,
		2,
		0,
		2,
		6,
		2,
		64,
		2,
		3,
		3,
		7,
		2,
		6,
		2,
		27,
		2,
		3,
		2,
		4,
		2,
		0,
		4,
		6,
		2,
		339,
		3,
		24,
		2,
		24,
		2,
		30,
		2,
		24,
		2,
		30,
		2,
		24,
		2,
		30,
		2,
		24,
		2,
		30,
		2,
		24,
		2,
		7,
		2357,
		44,
		11,
		6,
		17,
		0,
		370,
		43,
		1301,
		196,
		60,
		67,
		8,
		0,
		1205,
		3,
		2,
		26,
		2,
		1,
		2,
		0,
		3,
		0,
		2,
		9,
		2,
		3,
		2,
		0,
		2,
		0,
		7,
		0,
		5,
		0,
		2,
		0,
		2,
		0,
		2,
		2,
		2,
		1,
		2,
		0,
		3,
		0,
		2,
		0,
		2,
		0,
		2,
		0,
		2,
		0,
		2,
		1,
		2,
		0,
		3,
		3,
		2,
		6,
		2,
		3,
		2,
		3,
		2,
		0,
		2,
		9,
		2,
		16,
		6,
		2,
		2,
		4,
		2,
		16,
		4421,
		42717,
		35,
		4148,
		12,
		221,
		3,
		5761,
		15,
		7472,
		3104,
		541,
		1507,
		4938
	],
	or = [
		509,
		0,
		227,
		0,
		150,
		4,
		294,
		9,
		1368,
		2,
		2,
		1,
		6,
		3,
		41,
		2,
		5,
		0,
		166,
		1,
		574,
		3,
		9,
		9,
		370,
		1,
		154,
		10,
		176,
		2,
		54,
		14,
		32,
		9,
		16,
		3,
		46,
		10,
		54,
		9,
		7,
		2,
		37,
		13,
		2,
		9,
		6,
		1,
		45,
		0,
		13,
		2,
		49,
		13,
		9,
		3,
		2,
		11,
		83,
		11,
		7,
		0,
		161,
		11,
		6,
		9,
		7,
		3,
		56,
		1,
		2,
		6,
		3,
		1,
		3,
		2,
		10,
		0,
		11,
		1,
		3,
		6,
		4,
		4,
		193,
		17,
		10,
		9,
		5,
		0,
		82,
		19,
		13,
		9,
		214,
		6,
		3,
		8,
		28,
		1,
		83,
		16,
		16,
		9,
		82,
		12,
		9,
		9,
		84,
		14,
		5,
		9,
		243,
		14,
		166,
		9,
		71,
		5,
		2,
		1,
		3,
		3,
		2,
		0,
		2,
		1,
		13,
		9,
		120,
		6,
		3,
		6,
		4,
		0,
		29,
		9,
		41,
		6,
		2,
		3,
		9,
		0,
		10,
		10,
		47,
		15,
		406,
		7,
		2,
		7,
		17,
		9,
		57,
		21,
		2,
		13,
		123,
		5,
		4,
		0,
		2,
		1,
		2,
		6,
		2,
		0,
		9,
		9,
		49,
		4,
		2,
		1,
		2,
		4,
		9,
		9,
		330,
		3,
		19306,
		9,
		135,
		4,
		60,
		6,
		26,
		9,
		1014,
		0,
		2,
		54,
		8,
		3,
		82,
		0,
		12,
		1,
		19628,
		1,
		5319,
		4,
		4,
		5,
		9,
		7,
		3,
		6,
		31,
		3,
		149,
		2,
		1418,
		49,
		513,
		54,
		5,
		49,
		9,
		0,
		15,
		0,
		23,
		4,
		2,
		14,
		1361,
		6,
		2,
		16,
		3,
		6,
		2,
		1,
		2,
		4,
		262,
		6,
		10,
		9,
		419,
		13,
		1495,
		6,
		110,
		6,
		6,
		9,
		4759,
		9,
		787719,
		239
	];
function hr(e, t) {
	for (var s = 65536, i = 0; i < t.length; i += 2) {
		if ((s += t[i]) > e) return !1;
		if ((s += t[i + 1]) >= e) return !0;
	}
}
function lr(e, t) {
	return e < 65
		? 36 === e
		: e < 91 ||
				(e < 97
					? 95 === e
					: e < 123 ||
					  (e <= 65535 ? e >= 170 && nr.test(String.fromCharCode(e)) : !1 !== t && hr(e, ar)));
}
function cr(e, t) {
	return e < 48
		? 36 === e
		: e < 58 ||
				(!(e < 65) &&
					(e < 91 ||
						(e < 97
							? 95 === e
							: e < 123 ||
							  (e <= 65535
									? e >= 170 && rr.test(String.fromCharCode(e))
									: !1 !== t && (hr(e, ar) || hr(e, or))))));
}
var ur = function (e, t) {
	void 0 === t && (t = {}),
		(this.label = e),
		(this.keyword = t.keyword),
		(this.beforeExpr = !!t.beforeExpr),
		(this.startsExpr = !!t.startsExpr),
		(this.isLoop = !!t.isLoop),
		(this.isAssign = !!t.isAssign),
		(this.prefix = !!t.prefix),
		(this.postfix = !!t.postfix),
		(this.binop = t.binop || null),
		(this.updateContext = null);
};
function dr(e, t) {
	return new ur(e, { beforeExpr: !0, binop: t });
}
var pr = { beforeExpr: !0 },
	fr = { startsExpr: !0 },
	mr = {};
function gr(e, t) {
	return void 0 === t && (t = {}), (t.keyword = e), (mr[e] = new ur(e, t));
}
var yr = {
		num: new ur('num', fr),
		regexp: new ur('regexp', fr),
		string: new ur('string', fr),
		name: new ur('name', fr),
		eof: new ur('eof'),
		bracketL: new ur('[', { beforeExpr: !0, startsExpr: !0 }),
		bracketR: new ur(']'),
		braceL: new ur('{', { beforeExpr: !0, startsExpr: !0 }),
		braceR: new ur('}'),
		parenL: new ur('(', { beforeExpr: !0, startsExpr: !0 }),
		parenR: new ur(')'),
		comma: new ur(',', pr),
		semi: new ur(';', pr),
		colon: new ur(':', pr),
		dot: new ur('.'),
		question: new ur('?', pr),
		questionDot: new ur('?.'),
		arrow: new ur('=>', pr),
		template: new ur('template'),
		invalidTemplate: new ur('invalidTemplate'),
		ellipsis: new ur('...', pr),
		backQuote: new ur('`', fr),
		dollarBraceL: new ur('${', { beforeExpr: !0, startsExpr: !0 }),
		eq: new ur('=', { beforeExpr: !0, isAssign: !0 }),
		assign: new ur('_=', { beforeExpr: !0, isAssign: !0 }),
		incDec: new ur('++/--', { prefix: !0, postfix: !0, startsExpr: !0 }),
		prefix: new ur('!/~', { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
		logicalOR: dr('||', 1),
		logicalAND: dr('&&', 2),
		bitwiseOR: dr('|', 3),
		bitwiseXOR: dr('^', 4),
		bitwiseAND: dr('&', 5),
		equality: dr('==/!=/===/!==', 6),
		relational: dr('</>/<=/>=', 7),
		bitShift: dr('<</>>/>>>', 8),
		plusMin: new ur('+/-', { beforeExpr: !0, binop: 9, prefix: !0, startsExpr: !0 }),
		modulo: dr('%', 10),
		star: dr('*', 10),
		slash: dr('/', 10),
		starstar: new ur('**', { beforeExpr: !0 }),
		coalesce: dr('??', 1),
		_break: gr('break'),
		_case: gr('case', pr),
		_catch: gr('catch'),
		_continue: gr('continue'),
		_debugger: gr('debugger'),
		_default: gr('default', pr),
		_do: gr('do', { isLoop: !0, beforeExpr: !0 }),
		_else: gr('else', pr),
		_finally: gr('finally'),
		_for: gr('for', { isLoop: !0 }),
		_function: gr('function', fr),
		_if: gr('if'),
		_return: gr('return', pr),
		_switch: gr('switch'),
		_throw: gr('throw', pr),
		_try: gr('try'),
		_var: gr('var'),
		_const: gr('const'),
		_while: gr('while', { isLoop: !0 }),
		_with: gr('with'),
		_new: gr('new', { beforeExpr: !0, startsExpr: !0 }),
		_this: gr('this', fr),
		_super: gr('super', fr),
		_class: gr('class', fr),
		_extends: gr('extends', pr),
		_export: gr('export'),
		_import: gr('import', fr),
		_null: gr('null', fr),
		_true: gr('true', fr),
		_false: gr('false', fr),
		_in: gr('in', { beforeExpr: !0, binop: 7 }),
		_instanceof: gr('instanceof', { beforeExpr: !0, binop: 7 }),
		_typeof: gr('typeof', { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
		_void: gr('void', { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
		_delete: gr('delete', { beforeExpr: !0, prefix: !0, startsExpr: !0 })
	},
	xr = /\r\n?|\n|\u2028|\u2029/,
	Er = new RegExp(xr.source, 'g');
function vr(e, t) {
	return 10 === e || 13 === e || (!t && (8232 === e || 8233 === e));
}
var br = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/,
	Sr = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g,
	Ar = Object.prototype,
	Pr = Ar.hasOwnProperty,
	Cr = Ar.toString;
function Nr(e, t) {
	return Pr.call(e, t);
}
var kr =
	Array.isArray ||
	function (e) {
		return '[object Array]' === Cr.call(e);
	};
function wr(e) {
	return new RegExp('^(?:' + e.replace(/ /g, '|') + ')$');
}
var _r = function (e, t) {
	(this.line = e), (this.column = t);
};
_r.prototype.offset = function (e) {
	return new _r(this.line, this.column + e);
};
var Ir = function (e, t, s) {
	(this.start = t), (this.end = s), null !== e.sourceFile && (this.source = e.sourceFile);
};
function $r(e, t) {
	for (var s = 1, i = 0; ; ) {
		Er.lastIndex = i;
		var n = Er.exec(e);
		if (!(n && n.index < t)) return new _r(s, t - i);
		++s, (i = n.index + n[0].length);
	}
}
var Mr = {
		ecmaVersion: null,
		sourceType: 'script',
		onInsertedSemicolon: null,
		onTrailingComma: null,
		allowReserved: null,
		allowReturnOutsideFunction: !1,
		allowImportExportEverywhere: !1,
		allowAwaitOutsideFunction: !1,
		allowHashBang: !1,
		locations: !1,
		onToken: null,
		onComment: null,
		ranges: !1,
		program: null,
		sourceFile: null,
		directSourceFile: null,
		preserveParens: !1
	},
	Tr = !1;
function Lr(e) {
	var t = {};
	for (var s in Mr) t[s] = e && Nr(e, s) ? e[s] : Mr[s];
	if (
		('latest' === t.ecmaVersion
			? (t.ecmaVersion = 1e8)
			: null == t.ecmaVersion
			? (!Tr &&
					'object' == typeof console &&
					console.warn &&
					((Tr = !0),
					console.warn(
						'Since Acorn 8.0.0, options.ecmaVersion is required.\nDefaulting to 2020, but this will stop working in the future.'
					)),
			  (t.ecmaVersion = 11))
			: t.ecmaVersion >= 2015 && (t.ecmaVersion -= 2009),
		null == t.allowReserved && (t.allowReserved = t.ecmaVersion < 5),
		kr(t.onToken))
	) {
		var i = t.onToken;
		t.onToken = function (e) {
			return i.push(e);
		};
	}
	return (
		kr(t.onComment) &&
			(t.onComment = (function (e, t) {
				return function (s, i, n, r, a, o) {
					var h = { type: s ? 'Block' : 'Line', value: i, start: n, end: r };
					e.locations && (h.loc = new Ir(this, a, o)), e.ranges && (h.range = [n, r]), t.push(h);
				};
			})(t, t.onComment)),
		t
	);
}
function Rr(e, t) {
	return 2 | (e ? 4 : 0) | (t ? 8 : 0);
}
var Or = function (e, t, s) {
		(this.options = e = Lr(e)),
			(this.sourceFile = e.sourceFile),
			(this.keywords = wr(er[e.ecmaVersion >= 6 ? 6 : 'module' === e.sourceType ? '5module' : 5]));
		var i = '';
		!0 !== e.allowReserved &&
			((i = Jn[e.ecmaVersion >= 6 ? 6 : 5 === e.ecmaVersion ? 5 : 3]),
			'module' === e.sourceType && (i += ' await')),
			(this.reservedWords = wr(i));
		var n = (i ? i + ' ' : '') + Jn.strict;
		(this.reservedWordsStrict = wr(n)),
			(this.reservedWordsStrictBind = wr(n + ' ' + Jn.strictBind)),
			(this.input = String(t)),
			(this.containsEsc = !1),
			s
				? ((this.pos = s),
				  (this.lineStart = this.input.lastIndexOf('\n', s - 1) + 1),
				  (this.curLine = this.input.slice(0, this.lineStart).split(xr).length))
				: ((this.pos = this.lineStart = 0), (this.curLine = 1)),
			(this.type = yr.eof),
			(this.value = null),
			(this.start = this.end = this.pos),
			(this.startLoc = this.endLoc = this.curPosition()),
			(this.lastTokEndLoc = this.lastTokStartLoc = null),
			(this.lastTokStart = this.lastTokEnd = this.pos),
			(this.context = this.initialContext()),
			(this.exprAllowed = !0),
			(this.inModule = 'module' === e.sourceType),
			(this.strict = this.inModule || this.strictDirective(this.pos)),
			(this.potentialArrowAt = -1),
			(this.yieldPos = this.awaitPos = this.awaitIdentPos = 0),
			(this.labels = []),
			(this.undefinedExports = {}),
			0 === this.pos &&
				e.allowHashBang &&
				'#!' === this.input.slice(0, 2) &&
				this.skipLineComment(2),
			(this.scopeStack = []),
			this.enterScope(1),
			(this.regexpState = null);
	},
	Dr = {
		inFunction: { configurable: !0 },
		inGenerator: { configurable: !0 },
		inAsync: { configurable: !0 },
		allowSuper: { configurable: !0 },
		allowDirectSuper: { configurable: !0 },
		treatFunctionsAsVar: { configurable: !0 },
		inNonArrowFunction: { configurable: !0 }
	};
(Or.prototype.parse = function () {
	var e = this.options.program || this.startNode();
	return this.nextToken(), this.parseTopLevel(e);
}),
	(Dr.inFunction.get = function () {
		return (2 & this.currentVarScope().flags) > 0;
	}),
	(Dr.inGenerator.get = function () {
		return (8 & this.currentVarScope().flags) > 0;
	}),
	(Dr.inAsync.get = function () {
		return (4 & this.currentVarScope().flags) > 0;
	}),
	(Dr.allowSuper.get = function () {
		return (64 & this.currentThisScope().flags) > 0;
	}),
	(Dr.allowDirectSuper.get = function () {
		return (128 & this.currentThisScope().flags) > 0;
	}),
	(Dr.treatFunctionsAsVar.get = function () {
		return this.treatFunctionsAsVarInScope(this.currentScope());
	}),
	(Dr.inNonArrowFunction.get = function () {
		return (2 & this.currentThisScope().flags) > 0;
	}),
	(Or.extend = function () {
		for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
		for (var s = this, i = 0; i < e.length; i++) s = e[i](s);
		return s;
	}),
	(Or.parse = function (e, t) {
		return new this(t, e).parse();
	}),
	(Or.parseExpressionAt = function (e, t, s) {
		var i = new this(s, e, t);
		return i.nextToken(), i.parseExpression();
	}),
	(Or.tokenizer = function (e, t) {
		return new this(t, e);
	}),
	Object.defineProperties(Or.prototype, Dr);
var Vr = Or.prototype,
	Br = /^(?:'((?:\\.|[^'])*?)'|"((?:\\.|[^"])*?)")/;
function Fr() {
	this.shorthandAssign = this.trailingComma = this.parenthesizedAssign = this.parenthesizedBind = this.doubleProto = -1;
}
(Vr.strictDirective = function (e) {
	for (;;) {
		(Sr.lastIndex = e), (e += Sr.exec(this.input)[0].length);
		var t = Br.exec(this.input.slice(e));
		if (!t) return !1;
		if ('use strict' === (t[1] || t[2])) {
			Sr.lastIndex = e + t[0].length;
			var s = Sr.exec(this.input),
				i = s.index + s[0].length,
				n = this.input.charAt(i);
			return (
				';' === n ||
				'}' === n ||
				(xr.test(s[0]) &&
					!(/[(`.[+\-/*%<>=,?^&]/.test(n) || ('!' === n && '=' === this.input.charAt(i + 1))))
			);
		}
		(e += t[0].length),
			(Sr.lastIndex = e),
			(e += Sr.exec(this.input)[0].length),
			';' === this.input[e] && e++;
	}
}),
	(Vr.eat = function (e) {
		return this.type === e && (this.next(), !0);
	}),
	(Vr.isContextual = function (e) {
		return this.type === yr.name && this.value === e && !this.containsEsc;
	}),
	(Vr.eatContextual = function (e) {
		return !!this.isContextual(e) && (this.next(), !0);
	}),
	(Vr.expectContextual = function (e) {
		this.eatContextual(e) || this.unexpected();
	}),
	(Vr.canInsertSemicolon = function () {
		return (
			this.type === yr.eof ||
			this.type === yr.braceR ||
			xr.test(this.input.slice(this.lastTokEnd, this.start))
		);
	}),
	(Vr.insertSemicolon = function () {
		if (this.canInsertSemicolon())
			return (
				this.options.onInsertedSemicolon &&
					this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc),
				!0
			);
	}),
	(Vr.semicolon = function () {
		this.eat(yr.semi) || this.insertSemicolon() || this.unexpected();
	}),
	(Vr.afterTrailingComma = function (e, t) {
		if (this.type === e)
			return (
				this.options.onTrailingComma &&
					this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc),
				t || this.next(),
				!0
			);
	}),
	(Vr.expect = function (e) {
		this.eat(e) || this.unexpected();
	}),
	(Vr.unexpected = function (e) {
		this.raise(null != e ? e : this.start, 'Unexpected token');
	}),
	(Vr.checkPatternErrors = function (e, t) {
		if (e) {
			e.trailingComma > -1 &&
				this.raiseRecoverable(e.trailingComma, 'Comma is not permitted after the rest element');
			var s = t ? e.parenthesizedAssign : e.parenthesizedBind;
			s > -1 && this.raiseRecoverable(s, 'Parenthesized pattern');
		}
	}),
	(Vr.checkExpressionErrors = function (e, t) {
		if (!e) return !1;
		var s = e.shorthandAssign,
			i = e.doubleProto;
		if (!t) return s >= 0 || i >= 0;
		s >= 0 &&
			this.raise(s, 'Shorthand property assignments are valid only in destructuring patterns'),
			i >= 0 && this.raiseRecoverable(i, 'Redefinition of __proto__ property');
	}),
	(Vr.checkYieldAwaitInDefaultParams = function () {
		this.yieldPos &&
			(!this.awaitPos || this.yieldPos < this.awaitPos) &&
			this.raise(this.yieldPos, 'Yield expression cannot be a default value'),
			this.awaitPos && this.raise(this.awaitPos, 'Await expression cannot be a default value');
	}),
	(Vr.isSimpleAssignTarget = function (e) {
		return 'ParenthesizedExpression' === e.type
			? this.isSimpleAssignTarget(e.expression)
			: 'Identifier' === e.type || 'MemberExpression' === e.type;
	});
var Wr = Or.prototype;
Wr.parseTopLevel = function (e) {
	var t = {};
	for (e.body || (e.body = []); this.type !== yr.eof; ) {
		var s = this.parseStatement(null, !0, t);
		e.body.push(s);
	}
	if (this.inModule)
		for (var i = 0, n = Object.keys(this.undefinedExports); i < n.length; i += 1) {
			var r = n[i];
			this.raiseRecoverable(this.undefinedExports[r].start, "Export '" + r + "' is not defined");
		}
	return (
		this.adaptDirectivePrologue(e.body),
		this.next(),
		(e.sourceType = this.options.sourceType),
		this.finishNode(e, 'Program')
	);
};
var Ur = { kind: 'loop' },
	zr = { kind: 'switch' };
(Wr.isLet = function (e) {
	if (this.options.ecmaVersion < 6 || !this.isContextual('let')) return !1;
	Sr.lastIndex = this.pos;
	var t = Sr.exec(this.input),
		s = this.pos + t[0].length,
		i = this.input.charCodeAt(s);
	if (91 === i) return !0;
	if (e) return !1;
	if (123 === i) return !0;
	if (lr(i, !0)) {
		for (var n = s + 1; cr(this.input.charCodeAt(n), !0); ) ++n;
		var r = this.input.slice(s, n);
		if (!tr.test(r)) return !0;
	}
	return !1;
}),
	(Wr.isAsyncFunction = function () {
		if (this.options.ecmaVersion < 8 || !this.isContextual('async')) return !1;
		Sr.lastIndex = this.pos;
		var e = Sr.exec(this.input),
			t = this.pos + e[0].length;
		return !(
			xr.test(this.input.slice(this.pos, t)) ||
			'function' !== this.input.slice(t, t + 8) ||
			(t + 8 !== this.input.length && cr(this.input.charAt(t + 8)))
		);
	}),
	(Wr.parseStatement = function (e, t, s) {
		var i,
			n = this.type,
			r = this.startNode();
		switch ((this.isLet(e) && ((n = yr._var), (i = 'let')), n)) {
			case yr._break:
			case yr._continue:
				return this.parseBreakContinueStatement(r, n.keyword);
			case yr._debugger:
				return this.parseDebuggerStatement(r);
			case yr._do:
				return this.parseDoStatement(r);
			case yr._for:
				return this.parseForStatement(r);
			case yr._function:
				return (
					e &&
						(this.strict || ('if' !== e && 'label' !== e)) &&
						this.options.ecmaVersion >= 6 &&
						this.unexpected(),
					this.parseFunctionStatement(r, !1, !e)
				);
			case yr._class:
				return e && this.unexpected(), this.parseClass(r, !0);
			case yr._if:
				return this.parseIfStatement(r);
			case yr._return:
				return this.parseReturnStatement(r);
			case yr._switch:
				return this.parseSwitchStatement(r);
			case yr._throw:
				return this.parseThrowStatement(r);
			case yr._try:
				return this.parseTryStatement(r);
			case yr._const:
			case yr._var:
				return (
					(i = i || this.value), e && 'var' !== i && this.unexpected(), this.parseVarStatement(r, i)
				);
			case yr._while:
				return this.parseWhileStatement(r);
			case yr._with:
				return this.parseWithStatement(r);
			case yr.braceL:
				return this.parseBlock(!0, r);
			case yr.semi:
				return this.parseEmptyStatement(r);
			case yr._export:
			case yr._import:
				if (this.options.ecmaVersion > 10 && n === yr._import) {
					Sr.lastIndex = this.pos;
					var a = Sr.exec(this.input),
						o = this.pos + a[0].length,
						h = this.input.charCodeAt(o);
					if (40 === h || 46 === h) return this.parseExpressionStatement(r, this.parseExpression());
				}
				return (
					this.options.allowImportExportEverywhere ||
						(t || this.raise(this.start, "'import' and 'export' may only appear at the top level"),
						this.inModule ||
							this.raise(
								this.start,
								"'import' and 'export' may appear only with 'sourceType: module'"
							)),
					n === yr._import ? this.parseImport(r) : this.parseExport(r, s)
				);
			default:
				if (this.isAsyncFunction())
					return e && this.unexpected(), this.next(), this.parseFunctionStatement(r, !0, !e);
				var l = this.value,
					c = this.parseExpression();
				return n === yr.name && 'Identifier' === c.type && this.eat(yr.colon)
					? this.parseLabeledStatement(r, l, c, e)
					: this.parseExpressionStatement(r, c);
		}
	}),
	(Wr.parseBreakContinueStatement = function (e, t) {
		var s = 'break' === t;
		this.next(),
			this.eat(yr.semi) || this.insertSemicolon()
				? (e.label = null)
				: this.type !== yr.name
				? this.unexpected()
				: ((e.label = this.parseIdent()), this.semicolon());
		for (var i = 0; i < this.labels.length; ++i) {
			var n = this.labels[i];
			if (null == e.label || n.name === e.label.name) {
				if (null != n.kind && (s || 'loop' === n.kind)) break;
				if (e.label && s) break;
			}
		}
		return (
			i === this.labels.length && this.raise(e.start, 'Unsyntactic ' + t),
			this.finishNode(e, s ? 'BreakStatement' : 'ContinueStatement')
		);
	}),
	(Wr.parseDebuggerStatement = function (e) {
		return this.next(), this.semicolon(), this.finishNode(e, 'DebuggerStatement');
	}),
	(Wr.parseDoStatement = function (e) {
		return (
			this.next(),
			this.labels.push(Ur),
			(e.body = this.parseStatement('do')),
			this.labels.pop(),
			this.expect(yr._while),
			(e.test = this.parseParenExpression()),
			this.options.ecmaVersion >= 6 ? this.eat(yr.semi) : this.semicolon(),
			this.finishNode(e, 'DoWhileStatement')
		);
	}),
	(Wr.parseForStatement = function (e) {
		this.next();
		var t =
			this.options.ecmaVersion >= 9 &&
			(this.inAsync || (!this.inFunction && this.options.allowAwaitOutsideFunction)) &&
			this.eatContextual('await')
				? this.lastTokStart
				: -1;
		if ((this.labels.push(Ur), this.enterScope(0), this.expect(yr.parenL), this.type === yr.semi))
			return t > -1 && this.unexpected(t), this.parseFor(e, null);
		var s = this.isLet();
		if (this.type === yr._var || this.type === yr._const || s) {
			var i = this.startNode(),
				n = s ? 'let' : this.value;
			return (
				this.next(),
				this.parseVar(i, !0, n),
				this.finishNode(i, 'VariableDeclaration'),
				(this.type === yr._in || (this.options.ecmaVersion >= 6 && this.isContextual('of'))) &&
				1 === i.declarations.length
					? (this.options.ecmaVersion >= 9 &&
							(this.type === yr._in ? t > -1 && this.unexpected(t) : (e.await = t > -1)),
					  this.parseForIn(e, i))
					: (t > -1 && this.unexpected(t), this.parseFor(e, i))
			);
		}
		var r = new Fr(),
			a = this.parseExpression(!0, r);
		return this.type === yr._in || (this.options.ecmaVersion >= 6 && this.isContextual('of'))
			? (this.options.ecmaVersion >= 9 &&
					(this.type === yr._in ? t > -1 && this.unexpected(t) : (e.await = t > -1)),
			  this.toAssignable(a, !1, r),
			  this.checkLValPattern(a),
			  this.parseForIn(e, a))
			: (this.checkExpressionErrors(r, !0), t > -1 && this.unexpected(t), this.parseFor(e, a));
	}),
	(Wr.parseFunctionStatement = function (e, t, s) {
		return this.next(), this.parseFunction(e, Gr | (s ? 0 : Hr), !1, t);
	}),
	(Wr.parseIfStatement = function (e) {
		return (
			this.next(),
			(e.test = this.parseParenExpression()),
			(e.consequent = this.parseStatement('if')),
			(e.alternate = this.eat(yr._else) ? this.parseStatement('if') : null),
			this.finishNode(e, 'IfStatement')
		);
	}),
	(Wr.parseReturnStatement = function (e) {
		return (
			this.inFunction ||
				this.options.allowReturnOutsideFunction ||
				this.raise(this.start, "'return' outside of function"),
			this.next(),
			this.eat(yr.semi) || this.insertSemicolon()
				? (e.argument = null)
				: ((e.argument = this.parseExpression()), this.semicolon()),
			this.finishNode(e, 'ReturnStatement')
		);
	}),
	(Wr.parseSwitchStatement = function (e) {
		var t;
		this.next(),
			(e.discriminant = this.parseParenExpression()),
			(e.cases = []),
			this.expect(yr.braceL),
			this.labels.push(zr),
			this.enterScope(0);
		for (var s = !1; this.type !== yr.braceR; )
			if (this.type === yr._case || this.type === yr._default) {
				var i = this.type === yr._case;
				t && this.finishNode(t, 'SwitchCase'),
					e.cases.push((t = this.startNode())),
					(t.consequent = []),
					this.next(),
					i
						? (t.test = this.parseExpression())
						: (s && this.raiseRecoverable(this.lastTokStart, 'Multiple default clauses'),
						  (s = !0),
						  (t.test = null)),
					this.expect(yr.colon);
			} else t || this.unexpected(), t.consequent.push(this.parseStatement(null));
		return (
			this.exitScope(),
			t && this.finishNode(t, 'SwitchCase'),
			this.next(),
			this.labels.pop(),
			this.finishNode(e, 'SwitchStatement')
		);
	}),
	(Wr.parseThrowStatement = function (e) {
		return (
			this.next(),
			xr.test(this.input.slice(this.lastTokEnd, this.start)) &&
				this.raise(this.lastTokEnd, 'Illegal newline after throw'),
			(e.argument = this.parseExpression()),
			this.semicolon(),
			this.finishNode(e, 'ThrowStatement')
		);
	});
var jr = [];
(Wr.parseTryStatement = function (e) {
	if ((this.next(), (e.block = this.parseBlock()), (e.handler = null), this.type === yr._catch)) {
		var t = this.startNode();
		if ((this.next(), this.eat(yr.parenL))) {
			t.param = this.parseBindingAtom();
			var s = 'Identifier' === t.param.type;
			this.enterScope(s ? 32 : 0),
				this.checkLValPattern(t.param, s ? 4 : 2),
				this.expect(yr.parenR);
		} else this.options.ecmaVersion < 10 && this.unexpected(), (t.param = null), this.enterScope(0);
		(t.body = this.parseBlock(!1)),
			this.exitScope(),
			(e.handler = this.finishNode(t, 'CatchClause'));
	}
	return (
		(e.finalizer = this.eat(yr._finally) ? this.parseBlock() : null),
		e.handler || e.finalizer || this.raise(e.start, 'Missing catch or finally clause'),
		this.finishNode(e, 'TryStatement')
	);
}),
	(Wr.parseVarStatement = function (e, t) {
		return (
			this.next(),
			this.parseVar(e, !1, t),
			this.semicolon(),
			this.finishNode(e, 'VariableDeclaration')
		);
	}),
	(Wr.parseWhileStatement = function (e) {
		return (
			this.next(),
			(e.test = this.parseParenExpression()),
			this.labels.push(Ur),
			(e.body = this.parseStatement('while')),
			this.labels.pop(),
			this.finishNode(e, 'WhileStatement')
		);
	}),
	(Wr.parseWithStatement = function (e) {
		return (
			this.strict && this.raise(this.start, "'with' in strict mode"),
			this.next(),
			(e.object = this.parseParenExpression()),
			(e.body = this.parseStatement('with')),
			this.finishNode(e, 'WithStatement')
		);
	}),
	(Wr.parseEmptyStatement = function (e) {
		return this.next(), this.finishNode(e, 'EmptyStatement');
	}),
	(Wr.parseLabeledStatement = function (e, t, s, i) {
		for (var n = 0, r = this.labels; n < r.length; n += 1) {
			r[n].name === t && this.raise(s.start, "Label '" + t + "' is already declared");
		}
		for (
			var a = this.type.isLoop ? 'loop' : this.type === yr._switch ? 'switch' : null,
				o = this.labels.length - 1;
			o >= 0;
			o--
		) {
			var h = this.labels[o];
			if (h.statementStart !== e.start) break;
			(h.statementStart = this.start), (h.kind = a);
		}
		return (
			this.labels.push({ name: t, kind: a, statementStart: this.start }),
			(e.body = this.parseStatement(i ? (-1 === i.indexOf('label') ? i + 'label' : i) : 'label')),
			this.labels.pop(),
			(e.label = s),
			this.finishNode(e, 'LabeledStatement')
		);
	}),
	(Wr.parseExpressionStatement = function (e, t) {
		return (e.expression = t), this.semicolon(), this.finishNode(e, 'ExpressionStatement');
	}),
	(Wr.parseBlock = function (e, t, s) {
		for (
			void 0 === e && (e = !0),
				void 0 === t && (t = this.startNode()),
				t.body = [],
				this.expect(yr.braceL),
				e && this.enterScope(0);
			this.type !== yr.braceR;

		) {
			var i = this.parseStatement(null);
			t.body.push(i);
		}
		return (
			s && (this.strict = !1),
			this.next(),
			e && this.exitScope(),
			this.finishNode(t, 'BlockStatement')
		);
	}),
	(Wr.parseFor = function (e, t) {
		return (
			(e.init = t),
			this.expect(yr.semi),
			(e.test = this.type === yr.semi ? null : this.parseExpression()),
			this.expect(yr.semi),
			(e.update = this.type === yr.parenR ? null : this.parseExpression()),
			this.expect(yr.parenR),
			(e.body = this.parseStatement('for')),
			this.exitScope(),
			this.labels.pop(),
			this.finishNode(e, 'ForStatement')
		);
	}),
	(Wr.parseForIn = function (e, t) {
		var s = this.type === yr._in;
		return (
			this.next(),
			'VariableDeclaration' === t.type &&
				null != t.declarations[0].init &&
				(!s ||
					this.options.ecmaVersion < 8 ||
					this.strict ||
					'var' !== t.kind ||
					'Identifier' !== t.declarations[0].id.type) &&
				this.raise(
					t.start,
					(s ? 'for-in' : 'for-of') + ' loop variable declaration may not have an initializer'
				),
			(e.left = t),
			(e.right = s ? this.parseExpression() : this.parseMaybeAssign()),
			this.expect(yr.parenR),
			(e.body = this.parseStatement('for')),
			this.exitScope(),
			this.labels.pop(),
			this.finishNode(e, s ? 'ForInStatement' : 'ForOfStatement')
		);
	}),
	(Wr.parseVar = function (e, t, s) {
		for (e.declarations = [], e.kind = s; ; ) {
			var i = this.startNode();
			if (
				(this.parseVarId(i, s),
				this.eat(yr.eq)
					? (i.init = this.parseMaybeAssign(t))
					: 'const' !== s ||
					  this.type === yr._in ||
					  (this.options.ecmaVersion >= 6 && this.isContextual('of'))
					? 'Identifier' === i.id.type || (t && (this.type === yr._in || this.isContextual('of')))
						? (i.init = null)
						: this.raise(
								this.lastTokEnd,
								'Complex binding patterns require an initialization value'
						  )
					: this.unexpected(),
				e.declarations.push(this.finishNode(i, 'VariableDeclarator')),
				!this.eat(yr.comma))
			)
				break;
		}
		return e;
	}),
	(Wr.parseVarId = function (e, t) {
		(e.id = this.parseBindingAtom()), this.checkLValPattern(e.id, 'var' === t ? 1 : 2, !1);
	});
var Gr = 1,
	Hr = 2;
(Wr.parseFunction = function (e, t, s, i) {
	this.initFunction(e),
		(this.options.ecmaVersion >= 9 || (this.options.ecmaVersion >= 6 && !i)) &&
			(this.type === yr.star && t & Hr && this.unexpected(), (e.generator = this.eat(yr.star))),
		this.options.ecmaVersion >= 8 && (e.async = !!i),
		t & Gr &&
			((e.id = 4 & t && this.type !== yr.name ? null : this.parseIdent()),
			!e.id ||
				t & Hr ||
				this.checkLValSimple(
					e.id,
					this.strict || e.generator || e.async ? (this.treatFunctionsAsVar ? 1 : 2) : 3
				));
	var n = this.yieldPos,
		r = this.awaitPos,
		a = this.awaitIdentPos;
	return (
		(this.yieldPos = 0),
		(this.awaitPos = 0),
		(this.awaitIdentPos = 0),
		this.enterScope(Rr(e.async, e.generator)),
		t & Gr || (e.id = this.type === yr.name ? this.parseIdent() : null),
		this.parseFunctionParams(e),
		this.parseFunctionBody(e, s, !1),
		(this.yieldPos = n),
		(this.awaitPos = r),
		(this.awaitIdentPos = a),
		this.finishNode(e, t & Gr ? 'FunctionDeclaration' : 'FunctionExpression')
	);
}),
	(Wr.parseFunctionParams = function (e) {
		this.expect(yr.parenL),
			(e.params = this.parseBindingList(yr.parenR, !1, this.options.ecmaVersion >= 8)),
			this.checkYieldAwaitInDefaultParams();
	}),
	(Wr.parseClass = function (e, t) {
		this.next();
		var s = this.strict;
		(this.strict = !0), this.parseClassId(e, t), this.parseClassSuper(e);
		var i = this.startNode(),
			n = !1;
		for (i.body = [], this.expect(yr.braceL); this.type !== yr.braceR; ) {
			var r = this.parseClassElement(null !== e.superClass);
			r &&
				(i.body.push(r),
				'MethodDefinition' === r.type &&
					'constructor' === r.kind &&
					(n && this.raise(r.start, 'Duplicate constructor in the same class'), (n = !0)));
		}
		return (
			(this.strict = s),
			this.next(),
			(e.body = this.finishNode(i, 'ClassBody')),
			this.finishNode(e, t ? 'ClassDeclaration' : 'ClassExpression')
		);
	}),
	(Wr.parseClassElement = function (e) {
		var t = this;
		if (this.eat(yr.semi)) return null;
		var s = this.startNode(),
			i = function (e, i) {
				void 0 === i && (i = !1);
				var n = t.start,
					r = t.startLoc;
				return (
					!!t.eatContextual(e) &&
					(!(t.type === yr.parenL || (i && t.canInsertSemicolon())) ||
						(s.key && t.unexpected(),
						(s.computed = !1),
						(s.key = t.startNodeAt(n, r)),
						(s.key.name = e),
						t.finishNode(s.key, 'Identifier'),
						!1))
				);
			};
		(s.kind = 'method'), (s.static = i('static'));
		var n = this.eat(yr.star),
			r = !1;
		n ||
			(this.options.ecmaVersion >= 8 && i('async', !0)
				? ((r = !0), (n = this.options.ecmaVersion >= 9 && this.eat(yr.star)))
				: i('get')
				? (s.kind = 'get')
				: i('set') && (s.kind = 'set')),
			s.key || this.parsePropertyName(s);
		var a = s.key,
			o = !1;
		return (
			s.computed ||
			s.static ||
			!(
				('Identifier' === a.type && 'constructor' === a.name) ||
				('Literal' === a.type && 'constructor' === a.value)
			)
				? s.static &&
				  'Identifier' === a.type &&
				  'prototype' === a.name &&
				  this.raise(a.start, 'Classes may not have a static property named prototype')
				: ('method' !== s.kind && this.raise(a.start, "Constructor can't have get/set modifier"),
				  n && this.raise(a.start, "Constructor can't be a generator"),
				  r && this.raise(a.start, "Constructor can't be an async method"),
				  (s.kind = 'constructor'),
				  (o = e)),
			this.parseClassMethod(s, n, r, o),
			'get' === s.kind &&
				0 !== s.value.params.length &&
				this.raiseRecoverable(s.value.start, 'getter should have no params'),
			'set' === s.kind &&
				1 !== s.value.params.length &&
				this.raiseRecoverable(s.value.start, 'setter should have exactly one param'),
			'set' === s.kind &&
				'RestElement' === s.value.params[0].type &&
				this.raiseRecoverable(s.value.params[0].start, 'Setter cannot use rest params'),
			s
		);
	}),
	(Wr.parseClassMethod = function (e, t, s, i) {
		return (e.value = this.parseMethod(t, s, i)), this.finishNode(e, 'MethodDefinition');
	}),
	(Wr.parseClassId = function (e, t) {
		this.type === yr.name
			? ((e.id = this.parseIdent()), t && this.checkLValSimple(e.id, 2, !1))
			: (!0 === t && this.unexpected(), (e.id = null));
	}),
	(Wr.parseClassSuper = function (e) {
		e.superClass = this.eat(yr._extends) ? this.parseExprSubscripts() : null;
	}),
	(Wr.parseExport = function (e, t) {
		if ((this.next(), this.eat(yr.star)))
			return (
				this.options.ecmaVersion >= 11 &&
					(this.eatContextual('as')
						? ((e.exported = this.parseIdent(!0)),
						  this.checkExport(t, e.exported.name, this.lastTokStart))
						: (e.exported = null)),
				this.expectContextual('from'),
				this.type !== yr.string && this.unexpected(),
				(e.source = this.parseExprAtom()),
				this.semicolon(),
				this.finishNode(e, 'ExportAllDeclaration')
			);
		if (this.eat(yr._default)) {
			var s;
			if (
				(this.checkExport(t, 'default', this.lastTokStart),
				this.type === yr._function || (s = this.isAsyncFunction()))
			) {
				var i = this.startNode();
				this.next(), s && this.next(), (e.declaration = this.parseFunction(i, 4 | Gr, !1, s));
			} else if (this.type === yr._class) {
				var n = this.startNode();
				e.declaration = this.parseClass(n, 'nullableID');
			} else (e.declaration = this.parseMaybeAssign()), this.semicolon();
			return this.finishNode(e, 'ExportDefaultDeclaration');
		}
		if (this.shouldParseExportStatement())
			(e.declaration = this.parseStatement(null)),
				'VariableDeclaration' === e.declaration.type
					? this.checkVariableExport(t, e.declaration.declarations)
					: this.checkExport(t, e.declaration.id.name, e.declaration.id.start),
				(e.specifiers = []),
				(e.source = null);
		else {
			if (
				((e.declaration = null),
				(e.specifiers = this.parseExportSpecifiers(t)),
				this.eatContextual('from'))
			)
				this.type !== yr.string && this.unexpected(), (e.source = this.parseExprAtom());
			else {
				for (var r = 0, a = e.specifiers; r < a.length; r += 1) {
					var o = a[r];
					this.checkUnreserved(o.local), this.checkLocalExport(o.local);
				}
				e.source = null;
			}
			this.semicolon();
		}
		return this.finishNode(e, 'ExportNamedDeclaration');
	}),
	(Wr.checkExport = function (e, t, s) {
		e && (Nr(e, t) && this.raiseRecoverable(s, "Duplicate export '" + t + "'"), (e[t] = !0));
	}),
	(Wr.checkPatternExport = function (e, t) {
		var s = t.type;
		if ('Identifier' === s) this.checkExport(e, t.name, t.start);
		else if ('ObjectPattern' === s)
			for (var i = 0, n = t.properties; i < n.length; i += 1) {
				var r = n[i];
				this.checkPatternExport(e, r);
			}
		else if ('ArrayPattern' === s)
			for (var a = 0, o = t.elements; a < o.length; a += 1) {
				var h = o[a];
				h && this.checkPatternExport(e, h);
			}
		else
			'Property' === s
				? this.checkPatternExport(e, t.value)
				: 'AssignmentPattern' === s
				? this.checkPatternExport(e, t.left)
				: 'RestElement' === s
				? this.checkPatternExport(e, t.argument)
				: 'ParenthesizedExpression' === s && this.checkPatternExport(e, t.expression);
	}),
	(Wr.checkVariableExport = function (e, t) {
		if (e)
			for (var s = 0, i = t; s < i.length; s += 1) {
				var n = i[s];
				this.checkPatternExport(e, n.id);
			}
	}),
	(Wr.shouldParseExportStatement = function () {
		return (
			'var' === this.type.keyword ||
			'const' === this.type.keyword ||
			'class' === this.type.keyword ||
			'function' === this.type.keyword ||
			this.isLet() ||
			this.isAsyncFunction()
		);
	}),
	(Wr.parseExportSpecifiers = function (e) {
		var t = [],
			s = !0;
		for (this.expect(yr.braceL); !this.eat(yr.braceR); ) {
			if (s) s = !1;
			else if ((this.expect(yr.comma), this.afterTrailingComma(yr.braceR))) break;
			var i = this.startNode();
			(i.local = this.parseIdent(!0)),
				(i.exported = this.eatContextual('as') ? this.parseIdent(!0) : i.local),
				this.checkExport(e, i.exported.name, i.exported.start),
				t.push(this.finishNode(i, 'ExportSpecifier'));
		}
		return t;
	}),
	(Wr.parseImport = function (e) {
		return (
			this.next(),
			this.type === yr.string
				? ((e.specifiers = jr), (e.source = this.parseExprAtom()))
				: ((e.specifiers = this.parseImportSpecifiers()),
				  this.expectContextual('from'),
				  (e.source = this.type === yr.string ? this.parseExprAtom() : this.unexpected())),
			this.semicolon(),
			this.finishNode(e, 'ImportDeclaration')
		);
	}),
	(Wr.parseImportSpecifiers = function () {
		var e = [],
			t = !0;
		if (this.type === yr.name) {
			var s = this.startNode();
			if (
				((s.local = this.parseIdent()),
				this.checkLValSimple(s.local, 2),
				e.push(this.finishNode(s, 'ImportDefaultSpecifier')),
				!this.eat(yr.comma))
			)
				return e;
		}
		if (this.type === yr.star) {
			var i = this.startNode();
			return (
				this.next(),
				this.expectContextual('as'),
				(i.local = this.parseIdent()),
				this.checkLValSimple(i.local, 2),
				e.push(this.finishNode(i, 'ImportNamespaceSpecifier')),
				e
			);
		}
		for (this.expect(yr.braceL); !this.eat(yr.braceR); ) {
			if (t) t = !1;
			else if ((this.expect(yr.comma), this.afterTrailingComma(yr.braceR))) break;
			var n = this.startNode();
			(n.imported = this.parseIdent(!0)),
				this.eatContextual('as')
					? (n.local = this.parseIdent())
					: (this.checkUnreserved(n.imported), (n.local = n.imported)),
				this.checkLValSimple(n.local, 2),
				e.push(this.finishNode(n, 'ImportSpecifier'));
		}
		return e;
	}),
	(Wr.adaptDirectivePrologue = function (e) {
		for (var t = 0; t < e.length && this.isDirectiveCandidate(e[t]); ++t)
			e[t].directive = e[t].expression.raw.slice(1, -1);
	}),
	(Wr.isDirectiveCandidate = function (e) {
		return (
			'ExpressionStatement' === e.type &&
			'Literal' === e.expression.type &&
			'string' == typeof e.expression.value &&
			('"' === this.input[e.start] || "'" === this.input[e.start])
		);
	});
var qr = Or.prototype;
(qr.toAssignable = function (e, t, s) {
	if (this.options.ecmaVersion >= 6 && e)
		switch (e.type) {
			case 'Identifier':
				this.inAsync &&
					'await' === e.name &&
					this.raise(e.start, "Cannot use 'await' as identifier inside an async function");
				break;
			case 'ObjectPattern':
			case 'ArrayPattern':
			case 'AssignmentPattern':
			case 'RestElement':
				break;
			case 'ObjectExpression':
				(e.type = 'ObjectPattern'), s && this.checkPatternErrors(s, !0);
				for (var i = 0, n = e.properties; i < n.length; i += 1) {
					var r = n[i];
					this.toAssignable(r, t),
						'RestElement' !== r.type ||
							('ArrayPattern' !== r.argument.type && 'ObjectPattern' !== r.argument.type) ||
							this.raise(r.argument.start, 'Unexpected token');
				}
				break;
			case 'Property':
				'init' !== e.kind &&
					this.raise(e.key.start, "Object pattern can't contain getter or setter"),
					this.toAssignable(e.value, t);
				break;
			case 'ArrayExpression':
				(e.type = 'ArrayPattern'),
					s && this.checkPatternErrors(s, !0),
					this.toAssignableList(e.elements, t);
				break;
			case 'SpreadElement':
				(e.type = 'RestElement'),
					this.toAssignable(e.argument, t),
					'AssignmentPattern' === e.argument.type &&
						this.raise(e.argument.start, 'Rest elements cannot have a default value');
				break;
			case 'AssignmentExpression':
				'=' !== e.operator &&
					this.raise(e.left.end, "Only '=' operator can be used for specifying default value."),
					(e.type = 'AssignmentPattern'),
					delete e.operator,
					this.toAssignable(e.left, t);
				break;
			case 'ParenthesizedExpression':
				this.toAssignable(e.expression, t, s);
				break;
			case 'ChainExpression':
				this.raiseRecoverable(e.start, 'Optional chaining cannot appear in left-hand side');
				break;
			case 'MemberExpression':
				if (!t) break;
			default:
				this.raise(e.start, 'Assigning to rvalue');
		}
	else s && this.checkPatternErrors(s, !0);
	return e;
}),
	(qr.toAssignableList = function (e, t) {
		for (var s = e.length, i = 0; i < s; i++) {
			var n = e[i];
			n && this.toAssignable(n, t);
		}
		if (s) {
			var r = e[s - 1];
			6 === this.options.ecmaVersion &&
				t &&
				r &&
				'RestElement' === r.type &&
				'Identifier' !== r.argument.type &&
				this.unexpected(r.argument.start);
		}
		return e;
	}),
	(qr.parseSpread = function (e) {
		var t = this.startNode();
		return (
			this.next(), (t.argument = this.parseMaybeAssign(!1, e)), this.finishNode(t, 'SpreadElement')
		);
	}),
	(qr.parseRestBinding = function () {
		var e = this.startNode();
		return (
			this.next(),
			6 === this.options.ecmaVersion && this.type !== yr.name && this.unexpected(),
			(e.argument = this.parseBindingAtom()),
			this.finishNode(e, 'RestElement')
		);
	}),
	(qr.parseBindingAtom = function () {
		if (this.options.ecmaVersion >= 6)
			switch (this.type) {
				case yr.bracketL:
					var e = this.startNode();
					return (
						this.next(),
						(e.elements = this.parseBindingList(yr.bracketR, !0, !0)),
						this.finishNode(e, 'ArrayPattern')
					);
				case yr.braceL:
					return this.parseObj(!0);
			}
		return this.parseIdent();
	}),
	(qr.parseBindingList = function (e, t, s) {
		for (var i = [], n = !0; !this.eat(e); )
			if ((n ? (n = !1) : this.expect(yr.comma), t && this.type === yr.comma)) i.push(null);
			else {
				if (s && this.afterTrailingComma(e)) break;
				if (this.type === yr.ellipsis) {
					var r = this.parseRestBinding();
					this.parseBindingListItem(r),
						i.push(r),
						this.type === yr.comma &&
							this.raise(this.start, 'Comma is not permitted after the rest element'),
						this.expect(e);
					break;
				}
				var a = this.parseMaybeDefault(this.start, this.startLoc);
				this.parseBindingListItem(a), i.push(a);
			}
		return i;
	}),
	(qr.parseBindingListItem = function (e) {
		return e;
	}),
	(qr.parseMaybeDefault = function (e, t, s) {
		if (((s = s || this.parseBindingAtom()), this.options.ecmaVersion < 6 || !this.eat(yr.eq)))
			return s;
		var i = this.startNodeAt(e, t);
		return (
			(i.left = s), (i.right = this.parseMaybeAssign()), this.finishNode(i, 'AssignmentPattern')
		);
	}),
	(qr.checkLValSimple = function (e, t, s) {
		void 0 === t && (t = 0);
		var i = 0 !== t;
		switch (e.type) {
			case 'Identifier':
				this.strict &&
					this.reservedWordsStrictBind.test(e.name) &&
					this.raiseRecoverable(
						e.start,
						(i ? 'Binding ' : 'Assigning to ') + e.name + ' in strict mode'
					),
					i &&
						(2 === t &&
							'let' === e.name &&
							this.raiseRecoverable(e.start, 'let is disallowed as a lexically bound name'),
						s &&
							(Nr(s, e.name) && this.raiseRecoverable(e.start, 'Argument name clash'),
							(s[e.name] = !0)),
						5 !== t && this.declareName(e.name, t, e.start));
				break;
			case 'ChainExpression':
				this.raiseRecoverable(e.start, 'Optional chaining cannot appear in left-hand side');
				break;
			case 'MemberExpression':
				i && this.raiseRecoverable(e.start, 'Binding member expression');
				break;
			case 'ParenthesizedExpression':
				return (
					i && this.raiseRecoverable(e.start, 'Binding parenthesized expression'),
					this.checkLValSimple(e.expression, t, s)
				);
			default:
				this.raise(e.start, (i ? 'Binding' : 'Assigning to') + ' rvalue');
		}
	}),
	(qr.checkLValPattern = function (e, t, s) {
		switch ((void 0 === t && (t = 0), e.type)) {
			case 'ObjectPattern':
				for (var i = 0, n = e.properties; i < n.length; i += 1) {
					var r = n[i];
					this.checkLValInnerPattern(r, t, s);
				}
				break;
			case 'ArrayPattern':
				for (var a = 0, o = e.elements; a < o.length; a += 1) {
					var h = o[a];
					h && this.checkLValInnerPattern(h, t, s);
				}
				break;
			default:
				this.checkLValSimple(e, t, s);
		}
	}),
	(qr.checkLValInnerPattern = function (e, t, s) {
		switch ((void 0 === t && (t = 0), e.type)) {
			case 'Property':
				this.checkLValInnerPattern(e.value, t, s);
				break;
			case 'AssignmentPattern':
				this.checkLValPattern(e.left, t, s);
				break;
			case 'RestElement':
				this.checkLValPattern(e.argument, t, s);
				break;
			default:
				this.checkLValPattern(e, t, s);
		}
	});
var Kr = Or.prototype;
(Kr.checkPropClash = function (e, t, s) {
	if (
		!(
			(this.options.ecmaVersion >= 9 && 'SpreadElement' === e.type) ||
			(this.options.ecmaVersion >= 6 && (e.computed || e.method || e.shorthand))
		)
	) {
		var i,
			n = e.key;
		switch (n.type) {
			case 'Identifier':
				i = n.name;
				break;
			case 'Literal':
				i = String(n.value);
				break;
			default:
				return;
		}
		var r = e.kind;
		if (this.options.ecmaVersion >= 6)
			'__proto__' === i &&
				'init' === r &&
				(t.proto &&
					(s
						? s.doubleProto < 0 && (s.doubleProto = n.start)
						: this.raiseRecoverable(n.start, 'Redefinition of __proto__ property')),
				(t.proto = !0));
		else {
			var a = t[(i = '$' + i)];
			if (a)
				('init' === r ? (this.strict && a.init) || a.get || a.set : a.init || a[r]) &&
					this.raiseRecoverable(n.start, 'Redefinition of property');
			else a = t[i] = { init: !1, get: !1, set: !1 };
			a[r] = !0;
		}
	}
}),
	(Kr.parseExpression = function (e, t) {
		var s = this.start,
			i = this.startLoc,
			n = this.parseMaybeAssign(e, t);
		if (this.type === yr.comma) {
			var r = this.startNodeAt(s, i);
			for (r.expressions = [n]; this.eat(yr.comma); )
				r.expressions.push(this.parseMaybeAssign(e, t));
			return this.finishNode(r, 'SequenceExpression');
		}
		return n;
	}),
	(Kr.parseMaybeAssign = function (e, t, s) {
		if (this.isContextual('yield')) {
			if (this.inGenerator) return this.parseYield(e);
			this.exprAllowed = !1;
		}
		var i = !1,
			n = -1,
			r = -1;
		t
			? ((n = t.parenthesizedAssign),
			  (r = t.trailingComma),
			  (t.parenthesizedAssign = t.trailingComma = -1))
			: ((t = new Fr()), (i = !0));
		var a = this.start,
			o = this.startLoc;
		(this.type !== yr.parenL && this.type !== yr.name) || (this.potentialArrowAt = this.start);
		var h = this.parseMaybeConditional(e, t);
		if ((s && (h = s.call(this, h, a, o)), this.type.isAssign)) {
			var l = this.startNodeAt(a, o);
			return (
				(l.operator = this.value),
				this.type === yr.eq && (h = this.toAssignable(h, !1, t)),
				i || (t.parenthesizedAssign = t.trailingComma = t.doubleProto = -1),
				t.shorthandAssign >= h.start && (t.shorthandAssign = -1),
				this.type === yr.eq ? this.checkLValPattern(h) : this.checkLValSimple(h),
				(l.left = h),
				this.next(),
				(l.right = this.parseMaybeAssign(e)),
				this.finishNode(l, 'AssignmentExpression')
			);
		}
		return (
			i && this.checkExpressionErrors(t, !0),
			n > -1 && (t.parenthesizedAssign = n),
			r > -1 && (t.trailingComma = r),
			h
		);
	}),
	(Kr.parseMaybeConditional = function (e, t) {
		var s = this.start,
			i = this.startLoc,
			n = this.parseExprOps(e, t);
		if (this.checkExpressionErrors(t)) return n;
		if (this.eat(yr.question)) {
			var r = this.startNodeAt(s, i);
			return (
				(r.test = n),
				(r.consequent = this.parseMaybeAssign()),
				this.expect(yr.colon),
				(r.alternate = this.parseMaybeAssign(e)),
				this.finishNode(r, 'ConditionalExpression')
			);
		}
		return n;
	}),
	(Kr.parseExprOps = function (e, t) {
		var s = this.start,
			i = this.startLoc,
			n = this.parseMaybeUnary(t, !1);
		return this.checkExpressionErrors(t) || (n.start === s && 'ArrowFunctionExpression' === n.type)
			? n
			: this.parseExprOp(n, s, i, -1, e);
	}),
	(Kr.parseExprOp = function (e, t, s, i, n) {
		var r = this.type.binop;
		if (null != r && (!n || this.type !== yr._in) && r > i) {
			var a = this.type === yr.logicalOR || this.type === yr.logicalAND,
				o = this.type === yr.coalesce;
			o && (r = yr.logicalAND.binop);
			var h = this.value;
			this.next();
			var l = this.start,
				c = this.startLoc,
				u = this.parseExprOp(this.parseMaybeUnary(null, !1), l, c, r, n),
				d = this.buildBinary(t, s, e, u, h, a || o);
			return (
				((a && this.type === yr.coalesce) ||
					(o && (this.type === yr.logicalOR || this.type === yr.logicalAND))) &&
					this.raiseRecoverable(
						this.start,
						'Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses'
					),
				this.parseExprOp(d, t, s, i, n)
			);
		}
		return e;
	}),
	(Kr.buildBinary = function (e, t, s, i, n, r) {
		var a = this.startNodeAt(e, t);
		return (
			(a.left = s),
			(a.operator = n),
			(a.right = i),
			this.finishNode(a, r ? 'LogicalExpression' : 'BinaryExpression')
		);
	}),
	(Kr.parseMaybeUnary = function (e, t) {
		var s,
			i = this.start,
			n = this.startLoc;
		if (
			this.isContextual('await') &&
			(this.inAsync || (!this.inFunction && this.options.allowAwaitOutsideFunction))
		)
			(s = this.parseAwait()), (t = !0);
		else if (this.type.prefix) {
			var r = this.startNode(),
				a = this.type === yr.incDec;
			(r.operator = this.value),
				(r.prefix = !0),
				this.next(),
				(r.argument = this.parseMaybeUnary(null, !0)),
				this.checkExpressionErrors(e, !0),
				a
					? this.checkLValSimple(r.argument)
					: this.strict && 'delete' === r.operator && 'Identifier' === r.argument.type
					? this.raiseRecoverable(r.start, 'Deleting local variable in strict mode')
					: (t = !0),
				(s = this.finishNode(r, a ? 'UpdateExpression' : 'UnaryExpression'));
		} else {
			if (((s = this.parseExprSubscripts(e)), this.checkExpressionErrors(e))) return s;
			for (; this.type.postfix && !this.canInsertSemicolon(); ) {
				var o = this.startNodeAt(i, n);
				(o.operator = this.value),
					(o.prefix = !1),
					(o.argument = s),
					this.checkLValSimple(s),
					this.next(),
					(s = this.finishNode(o, 'UpdateExpression'));
			}
		}
		return !t && this.eat(yr.starstar)
			? this.buildBinary(i, n, s, this.parseMaybeUnary(null, !1), '**', !1)
			: s;
	}),
	(Kr.parseExprSubscripts = function (e) {
		var t = this.start,
			s = this.startLoc,
			i = this.parseExprAtom(e);
		if (
			'ArrowFunctionExpression' === i.type &&
			')' !== this.input.slice(this.lastTokStart, this.lastTokEnd)
		)
			return i;
		var n = this.parseSubscripts(i, t, s);
		return (
			e &&
				'MemberExpression' === n.type &&
				(e.parenthesizedAssign >= n.start && (e.parenthesizedAssign = -1),
				e.parenthesizedBind >= n.start && (e.parenthesizedBind = -1)),
			n
		);
	}),
	(Kr.parseSubscripts = function (e, t, s, i) {
		for (
			var n =
					this.options.ecmaVersion >= 8 &&
					'Identifier' === e.type &&
					'async' === e.name &&
					this.lastTokEnd === e.end &&
					!this.canInsertSemicolon() &&
					e.end - e.start == 5 &&
					this.potentialArrowAt === e.start,
				r = !1;
			;

		) {
			var a = this.parseSubscript(e, t, s, i, n, r);
			if ((a.optional && (r = !0), a === e || 'ArrowFunctionExpression' === a.type)) {
				if (r) {
					var o = this.startNodeAt(t, s);
					(o.expression = a), (a = this.finishNode(o, 'ChainExpression'));
				}
				return a;
			}
			e = a;
		}
	}),
	(Kr.parseSubscript = function (e, t, s, i, n, r) {
		var a = this.options.ecmaVersion >= 11,
			o = a && this.eat(yr.questionDot);
		i &&
			o &&
			this.raise(
				this.lastTokStart,
				'Optional chaining cannot appear in the callee of new expressions'
			);
		var h = this.eat(yr.bracketL);
		if (h || (o && this.type !== yr.parenL && this.type !== yr.backQuote) || this.eat(yr.dot)) {
			var l = this.startNodeAt(t, s);
			(l.object = e),
				(l.property = h
					? this.parseExpression()
					: this.parseIdent('never' !== this.options.allowReserved)),
				(l.computed = !!h),
				h && this.expect(yr.bracketR),
				a && (l.optional = o),
				(e = this.finishNode(l, 'MemberExpression'));
		} else if (!i && this.eat(yr.parenL)) {
			var c = new Fr(),
				u = this.yieldPos,
				d = this.awaitPos,
				p = this.awaitIdentPos;
			(this.yieldPos = 0), (this.awaitPos = 0), (this.awaitIdentPos = 0);
			var f = this.parseExprList(yr.parenR, this.options.ecmaVersion >= 8, !1, c);
			if (n && !o && !this.canInsertSemicolon() && this.eat(yr.arrow))
				return (
					this.checkPatternErrors(c, !1),
					this.checkYieldAwaitInDefaultParams(),
					this.awaitIdentPos > 0 &&
						this.raise(
							this.awaitIdentPos,
							"Cannot use 'await' as identifier inside an async function"
						),
					(this.yieldPos = u),
					(this.awaitPos = d),
					(this.awaitIdentPos = p),
					this.parseArrowExpression(this.startNodeAt(t, s), f, !0)
				);
			this.checkExpressionErrors(c, !0),
				(this.yieldPos = u || this.yieldPos),
				(this.awaitPos = d || this.awaitPos),
				(this.awaitIdentPos = p || this.awaitIdentPos);
			var m = this.startNodeAt(t, s);
			(m.callee = e),
				(m.arguments = f),
				a && (m.optional = o),
				(e = this.finishNode(m, 'CallExpression'));
		} else if (this.type === yr.backQuote) {
			(o || r) &&
				this.raise(
					this.start,
					'Optional chaining cannot appear in the tag of tagged template expressions'
				);
			var g = this.startNodeAt(t, s);
			(g.tag = e),
				(g.quasi = this.parseTemplate({ isTagged: !0 })),
				(e = this.finishNode(g, 'TaggedTemplateExpression'));
		}
		return e;
	}),
	(Kr.parseExprAtom = function (e) {
		this.type === yr.slash && this.readRegexp();
		var t,
			s = this.potentialArrowAt === this.start;
		switch (this.type) {
			case yr._super:
				return (
					this.allowSuper || this.raise(this.start, "'super' keyword outside a method"),
					(t = this.startNode()),
					this.next(),
					this.type !== yr.parenL ||
						this.allowDirectSuper ||
						this.raise(t.start, 'super() call outside constructor of a subclass'),
					this.type !== yr.dot &&
						this.type !== yr.bracketL &&
						this.type !== yr.parenL &&
						this.unexpected(),
					this.finishNode(t, 'Super')
				);
			case yr._this:
				return (t = this.startNode()), this.next(), this.finishNode(t, 'ThisExpression');
			case yr.name:
				var i = this.start,
					n = this.startLoc,
					r = this.containsEsc,
					a = this.parseIdent(!1);
				if (
					this.options.ecmaVersion >= 8 &&
					!r &&
					'async' === a.name &&
					!this.canInsertSemicolon() &&
					this.eat(yr._function)
				)
					return this.parseFunction(this.startNodeAt(i, n), 0, !1, !0);
				if (s && !this.canInsertSemicolon()) {
					if (this.eat(yr.arrow)) return this.parseArrowExpression(this.startNodeAt(i, n), [a], !1);
					if (this.options.ecmaVersion >= 8 && 'async' === a.name && this.type === yr.name && !r)
						return (
							(a = this.parseIdent(!1)),
							(!this.canInsertSemicolon() && this.eat(yr.arrow)) || this.unexpected(),
							this.parseArrowExpression(this.startNodeAt(i, n), [a], !0)
						);
				}
				return a;
			case yr.regexp:
				var o = this.value;
				return ((t = this.parseLiteral(o.value)).regex = { pattern: o.pattern, flags: o.flags }), t;
			case yr.num:
			case yr.string:
				return this.parseLiteral(this.value);
			case yr._null:
			case yr._true:
			case yr._false:
				return (
					((t = this.startNode()).value = this.type === yr._null ? null : this.type === yr._true),
					(t.raw = this.type.keyword),
					this.next(),
					this.finishNode(t, 'Literal')
				);
			case yr.parenL:
				var h = this.start,
					l = this.parseParenAndDistinguishExpression(s);
				return (
					e &&
						(e.parenthesizedAssign < 0 &&
							!this.isSimpleAssignTarget(l) &&
							(e.parenthesizedAssign = h),
						e.parenthesizedBind < 0 && (e.parenthesizedBind = h)),
					l
				);
			case yr.bracketL:
				return (
					(t = this.startNode()),
					this.next(),
					(t.elements = this.parseExprList(yr.bracketR, !0, !0, e)),
					this.finishNode(t, 'ArrayExpression')
				);
			case yr.braceL:
				return this.parseObj(!1, e);
			case yr._function:
				return (t = this.startNode()), this.next(), this.parseFunction(t, 0);
			case yr._class:
				return this.parseClass(this.startNode(), !1);
			case yr._new:
				return this.parseNew();
			case yr.backQuote:
				return this.parseTemplate();
			case yr._import:
				return this.options.ecmaVersion >= 11 ? this.parseExprImport() : this.unexpected();
			default:
				this.unexpected();
		}
	}),
	(Kr.parseExprImport = function () {
		var e = this.startNode();
		this.containsEsc && this.raiseRecoverable(this.start, 'Escape sequence in keyword import');
		var t = this.parseIdent(!0);
		switch (this.type) {
			case yr.parenL:
				return this.parseDynamicImport(e);
			case yr.dot:
				return (e.meta = t), this.parseImportMeta(e);
			default:
				this.unexpected();
		}
	}),
	(Kr.parseDynamicImport = function (e) {
		if ((this.next(), (e.source = this.parseMaybeAssign()), !this.eat(yr.parenR))) {
			var t = this.start;
			this.eat(yr.comma) && this.eat(yr.parenR)
				? this.raiseRecoverable(t, 'Trailing comma is not allowed in import()')
				: this.unexpected(t);
		}
		return this.finishNode(e, 'ImportExpression');
	}),
	(Kr.parseImportMeta = function (e) {
		this.next();
		var t = this.containsEsc;
		return (
			(e.property = this.parseIdent(!0)),
			'meta' !== e.property.name &&
				this.raiseRecoverable(
					e.property.start,
					"The only valid meta property for import is 'import.meta'"
				),
			t && this.raiseRecoverable(e.start, "'import.meta' must not contain escaped characters"),
			'module' !== this.options.sourceType &&
				this.raiseRecoverable(e.start, "Cannot use 'import.meta' outside a module"),
			this.finishNode(e, 'MetaProperty')
		);
	}),
	(Kr.parseLiteral = function (e) {
		var t = this.startNode();
		return (
			(t.value = e),
			(t.raw = this.input.slice(this.start, this.end)),
			110 === t.raw.charCodeAt(t.raw.length - 1) &&
				(t.bigint = t.raw.slice(0, -1).replace(/_/g, '')),
			this.next(),
			this.finishNode(t, 'Literal')
		);
	}),
	(Kr.parseParenExpression = function () {
		this.expect(yr.parenL);
		var e = this.parseExpression();
		return this.expect(yr.parenR), e;
	}),
	(Kr.parseParenAndDistinguishExpression = function (e) {
		var t,
			s = this.start,
			i = this.startLoc,
			n = this.options.ecmaVersion >= 8;
		if (this.options.ecmaVersion >= 6) {
			this.next();
			var r,
				a = this.start,
				o = this.startLoc,
				h = [],
				l = !0,
				c = !1,
				u = new Fr(),
				d = this.yieldPos,
				p = this.awaitPos;
			for (this.yieldPos = 0, this.awaitPos = 0; this.type !== yr.parenR; ) {
				if ((l ? (l = !1) : this.expect(yr.comma), n && this.afterTrailingComma(yr.parenR, !0))) {
					c = !0;
					break;
				}
				if (this.type === yr.ellipsis) {
					(r = this.start),
						h.push(this.parseParenItem(this.parseRestBinding())),
						this.type === yr.comma &&
							this.raise(this.start, 'Comma is not permitted after the rest element');
					break;
				}
				h.push(this.parseMaybeAssign(!1, u, this.parseParenItem));
			}
			var f = this.start,
				m = this.startLoc;
			if ((this.expect(yr.parenR), e && !this.canInsertSemicolon() && this.eat(yr.arrow)))
				return (
					this.checkPatternErrors(u, !1),
					this.checkYieldAwaitInDefaultParams(),
					(this.yieldPos = d),
					(this.awaitPos = p),
					this.parseParenArrowList(s, i, h)
				);
			(h.length && !c) || this.unexpected(this.lastTokStart),
				r && this.unexpected(r),
				this.checkExpressionErrors(u, !0),
				(this.yieldPos = d || this.yieldPos),
				(this.awaitPos = p || this.awaitPos),
				h.length > 1
					? (((t = this.startNodeAt(a, o)).expressions = h),
					  this.finishNodeAt(t, 'SequenceExpression', f, m))
					: (t = h[0]);
		} else t = this.parseParenExpression();
		if (this.options.preserveParens) {
			var g = this.startNodeAt(s, i);
			return (g.expression = t), this.finishNode(g, 'ParenthesizedExpression');
		}
		return t;
	}),
	(Kr.parseParenItem = function (e) {
		return e;
	}),
	(Kr.parseParenArrowList = function (e, t, s) {
		return this.parseArrowExpression(this.startNodeAt(e, t), s);
	});
var Xr = [];
(Kr.parseNew = function () {
	this.containsEsc && this.raiseRecoverable(this.start, 'Escape sequence in keyword new');
	var e = this.startNode(),
		t = this.parseIdent(!0);
	if (this.options.ecmaVersion >= 6 && this.eat(yr.dot)) {
		e.meta = t;
		var s = this.containsEsc;
		return (
			(e.property = this.parseIdent(!0)),
			'target' !== e.property.name &&
				this.raiseRecoverable(
					e.property.start,
					"The only valid meta property for new is 'new.target'"
				),
			s && this.raiseRecoverable(e.start, "'new.target' must not contain escaped characters"),
			this.inNonArrowFunction ||
				this.raiseRecoverable(e.start, "'new.target' can only be used in functions"),
			this.finishNode(e, 'MetaProperty')
		);
	}
	var i = this.start,
		n = this.startLoc,
		r = this.type === yr._import;
	return (
		(e.callee = this.parseSubscripts(this.parseExprAtom(), i, n, !0)),
		r && 'ImportExpression' === e.callee.type && this.raise(i, 'Cannot use new with import()'),
		this.eat(yr.parenL)
			? (e.arguments = this.parseExprList(yr.parenR, this.options.ecmaVersion >= 8, !1))
			: (e.arguments = Xr),
		this.finishNode(e, 'NewExpression')
	);
}),
	(Kr.parseTemplateElement = function (e) {
		var t = e.isTagged,
			s = this.startNode();
		return (
			this.type === yr.invalidTemplate
				? (t ||
						this.raiseRecoverable(this.start, 'Bad escape sequence in untagged template literal'),
				  (s.value = { raw: this.value, cooked: null }))
				: (s.value = {
						raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, '\n'),
						cooked: this.value
				  }),
			this.next(),
			(s.tail = this.type === yr.backQuote),
			this.finishNode(s, 'TemplateElement')
		);
	}),
	(Kr.parseTemplate = function (e) {
		void 0 === e && (e = {});
		var t = e.isTagged;
		void 0 === t && (t = !1);
		var s = this.startNode();
		this.next(), (s.expressions = []);
		var i = this.parseTemplateElement({ isTagged: t });
		for (s.quasis = [i]; !i.tail; )
			this.type === yr.eof && this.raise(this.pos, 'Unterminated template literal'),
				this.expect(yr.dollarBraceL),
				s.expressions.push(this.parseExpression()),
				this.expect(yr.braceR),
				s.quasis.push((i = this.parseTemplateElement({ isTagged: t })));
		return this.next(), this.finishNode(s, 'TemplateLiteral');
	}),
	(Kr.isAsyncProp = function (e) {
		return (
			!e.computed &&
			'Identifier' === e.key.type &&
			'async' === e.key.name &&
			(this.type === yr.name ||
				this.type === yr.num ||
				this.type === yr.string ||
				this.type === yr.bracketL ||
				this.type.keyword ||
				(this.options.ecmaVersion >= 9 && this.type === yr.star)) &&
			!xr.test(this.input.slice(this.lastTokEnd, this.start))
		);
	}),
	(Kr.parseObj = function (e, t) {
		var s = this.startNode(),
			i = !0,
			n = {};
		for (s.properties = [], this.next(); !this.eat(yr.braceR); ) {
			if (i) i = !1;
			else if (
				(this.expect(yr.comma), this.options.ecmaVersion >= 5 && this.afterTrailingComma(yr.braceR))
			)
				break;
			var r = this.parseProperty(e, t);
			e || this.checkPropClash(r, n, t), s.properties.push(r);
		}
		return this.finishNode(s, e ? 'ObjectPattern' : 'ObjectExpression');
	}),
	(Kr.parseProperty = function (e, t) {
		var s,
			i,
			n,
			r,
			a = this.startNode();
		if (this.options.ecmaVersion >= 9 && this.eat(yr.ellipsis))
			return e
				? ((a.argument = this.parseIdent(!1)),
				  this.type === yr.comma &&
						this.raise(this.start, 'Comma is not permitted after the rest element'),
				  this.finishNode(a, 'RestElement'))
				: (this.type === yr.parenL &&
						t &&
						(t.parenthesizedAssign < 0 && (t.parenthesizedAssign = this.start),
						t.parenthesizedBind < 0 && (t.parenthesizedBind = this.start)),
				  (a.argument = this.parseMaybeAssign(!1, t)),
				  this.type === yr.comma && t && t.trailingComma < 0 && (t.trailingComma = this.start),
				  this.finishNode(a, 'SpreadElement'));
		this.options.ecmaVersion >= 6 &&
			((a.method = !1),
			(a.shorthand = !1),
			(e || t) && ((n = this.start), (r = this.startLoc)),
			e || (s = this.eat(yr.star)));
		var o = this.containsEsc;
		return (
			this.parsePropertyName(a),
			!e && !o && this.options.ecmaVersion >= 8 && !s && this.isAsyncProp(a)
				? ((i = !0),
				  (s = this.options.ecmaVersion >= 9 && this.eat(yr.star)),
				  this.parsePropertyName(a, t))
				: (i = !1),
			this.parsePropertyValue(a, e, s, i, n, r, t, o),
			this.finishNode(a, 'Property')
		);
	}),
	(Kr.parsePropertyValue = function (e, t, s, i, n, r, a, o) {
		if (((s || i) && this.type === yr.colon && this.unexpected(), this.eat(yr.colon)))
			(e.value = t
				? this.parseMaybeDefault(this.start, this.startLoc)
				: this.parseMaybeAssign(!1, a)),
				(e.kind = 'init');
		else if (this.options.ecmaVersion >= 6 && this.type === yr.parenL)
			t && this.unexpected(),
				(e.kind = 'init'),
				(e.method = !0),
				(e.value = this.parseMethod(s, i));
		else if (
			t ||
			o ||
			!(this.options.ecmaVersion >= 5) ||
			e.computed ||
			'Identifier' !== e.key.type ||
			('get' !== e.key.name && 'set' !== e.key.name) ||
			this.type === yr.comma ||
			this.type === yr.braceR ||
			this.type === yr.eq
		)
			this.options.ecmaVersion >= 6 && !e.computed && 'Identifier' === e.key.type
				? ((s || i) && this.unexpected(),
				  this.checkUnreserved(e.key),
				  'await' !== e.key.name || this.awaitIdentPos || (this.awaitIdentPos = n),
				  (e.kind = 'init'),
				  t
						? (e.value = this.parseMaybeDefault(n, r, this.copyNode(e.key)))
						: this.type === yr.eq && a
						? (a.shorthandAssign < 0 && (a.shorthandAssign = this.start),
						  (e.value = this.parseMaybeDefault(n, r, this.copyNode(e.key))))
						: (e.value = this.copyNode(e.key)),
				  (e.shorthand = !0))
				: this.unexpected();
		else {
			(s || i) && this.unexpected(),
				(e.kind = e.key.name),
				this.parsePropertyName(e),
				(e.value = this.parseMethod(!1));
			var h = 'get' === e.kind ? 0 : 1;
			if (e.value.params.length !== h) {
				var l = e.value.start;
				'get' === e.kind
					? this.raiseRecoverable(l, 'getter should have no params')
					: this.raiseRecoverable(l, 'setter should have exactly one param');
			} else
				'set' === e.kind &&
					'RestElement' === e.value.params[0].type &&
					this.raiseRecoverable(e.value.params[0].start, 'Setter cannot use rest params');
		}
	}),
	(Kr.parsePropertyName = function (e) {
		if (this.options.ecmaVersion >= 6) {
			if (this.eat(yr.bracketL))
				return (
					(e.computed = !0), (e.key = this.parseMaybeAssign()), this.expect(yr.bracketR), e.key
				);
			e.computed = !1;
		}
		return (e.key =
			this.type === yr.num || this.type === yr.string
				? this.parseExprAtom()
				: this.parseIdent('never' !== this.options.allowReserved));
	}),
	(Kr.initFunction = function (e) {
		(e.id = null),
			this.options.ecmaVersion >= 6 && (e.generator = e.expression = !1),
			this.options.ecmaVersion >= 8 && (e.async = !1);
	}),
	(Kr.parseMethod = function (e, t, s) {
		var i = this.startNode(),
			n = this.yieldPos,
			r = this.awaitPos,
			a = this.awaitIdentPos;
		return (
			this.initFunction(i),
			this.options.ecmaVersion >= 6 && (i.generator = e),
			this.options.ecmaVersion >= 8 && (i.async = !!t),
			(this.yieldPos = 0),
			(this.awaitPos = 0),
			(this.awaitIdentPos = 0),
			this.enterScope(64 | Rr(t, i.generator) | (s ? 128 : 0)),
			this.expect(yr.parenL),
			(i.params = this.parseBindingList(yr.parenR, !1, this.options.ecmaVersion >= 8)),
			this.checkYieldAwaitInDefaultParams(),
			this.parseFunctionBody(i, !1, !0),
			(this.yieldPos = n),
			(this.awaitPos = r),
			(this.awaitIdentPos = a),
			this.finishNode(i, 'FunctionExpression')
		);
	}),
	(Kr.parseArrowExpression = function (e, t, s) {
		var i = this.yieldPos,
			n = this.awaitPos,
			r = this.awaitIdentPos;
		return (
			this.enterScope(16 | Rr(s, !1)),
			this.initFunction(e),
			this.options.ecmaVersion >= 8 && (e.async = !!s),
			(this.yieldPos = 0),
			(this.awaitPos = 0),
			(this.awaitIdentPos = 0),
			(e.params = this.toAssignableList(t, !0)),
			this.parseFunctionBody(e, !0, !1),
			(this.yieldPos = i),
			(this.awaitPos = n),
			(this.awaitIdentPos = r),
			this.finishNode(e, 'ArrowFunctionExpression')
		);
	}),
	(Kr.parseFunctionBody = function (e, t, s) {
		var i = t && this.type !== yr.braceL,
			n = this.strict,
			r = !1;
		if (i) (e.body = this.parseMaybeAssign()), (e.expression = !0), this.checkParams(e, !1);
		else {
			var a = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(e.params);
			(n && !a) ||
				((r = this.strictDirective(this.end)) &&
					a &&
					this.raiseRecoverable(
						e.start,
						"Illegal 'use strict' directive in function with non-simple parameter list"
					));
			var o = this.labels;
			(this.labels = []),
				r && (this.strict = !0),
				this.checkParams(e, !n && !r && !t && !s && this.isSimpleParamList(e.params)),
				this.strict && e.id && this.checkLValSimple(e.id, 5),
				(e.body = this.parseBlock(!1, void 0, r && !n)),
				(e.expression = !1),
				this.adaptDirectivePrologue(e.body.body),
				(this.labels = o);
		}
		this.exitScope();
	}),
	(Kr.isSimpleParamList = function (e) {
		for (var t = 0, s = e; t < s.length; t += 1) {
			if ('Identifier' !== s[t].type) return !1;
		}
		return !0;
	}),
	(Kr.checkParams = function (e, t) {
		for (var s = {}, i = 0, n = e.params; i < n.length; i += 1) {
			var r = n[i];
			this.checkLValInnerPattern(r, 1, t ? null : s);
		}
	}),
	(Kr.parseExprList = function (e, t, s, i) {
		for (var n = [], r = !0; !this.eat(e); ) {
			if (r) r = !1;
			else if ((this.expect(yr.comma), t && this.afterTrailingComma(e))) break;
			var a = void 0;
			s && this.type === yr.comma
				? (a = null)
				: this.type === yr.ellipsis
				? ((a = this.parseSpread(i)),
				  i && this.type === yr.comma && i.trailingComma < 0 && (i.trailingComma = this.start))
				: (a = this.parseMaybeAssign(!1, i)),
				n.push(a);
		}
		return n;
	}),
	(Kr.checkUnreserved = function (e) {
		var t = e.start,
			s = e.end,
			i = e.name;
		(this.inGenerator &&
			'yield' === i &&
			this.raiseRecoverable(t, "Cannot use 'yield' as identifier inside a generator"),
		this.inAsync &&
			'await' === i &&
			this.raiseRecoverable(t, "Cannot use 'await' as identifier inside an async function"),
		this.keywords.test(i) && this.raise(t, "Unexpected keyword '" + i + "'"),
		this.options.ecmaVersion < 6 && -1 !== this.input.slice(t, s).indexOf('\\')) ||
			((this.strict ? this.reservedWordsStrict : this.reservedWords).test(i) &&
				(this.inAsync ||
					'await' !== i ||
					this.raiseRecoverable(t, "Cannot use keyword 'await' outside an async function"),
				this.raiseRecoverable(t, "The keyword '" + i + "' is reserved")));
	}),
	(Kr.parseIdent = function (e, t) {
		var s = this.startNode();
		return (
			this.type === yr.name
				? (s.name = this.value)
				: this.type.keyword
				? ((s.name = this.type.keyword),
				  ('class' !== s.name && 'function' !== s.name) ||
						(this.lastTokEnd === this.lastTokStart + 1 &&
							46 === this.input.charCodeAt(this.lastTokStart)) ||
						this.context.pop())
				: this.unexpected(),
			this.next(!!e),
			this.finishNode(s, 'Identifier'),
			e ||
				(this.checkUnreserved(s),
				'await' !== s.name || this.awaitIdentPos || (this.awaitIdentPos = s.start)),
			s
		);
	}),
	(Kr.parseYield = function (e) {
		this.yieldPos || (this.yieldPos = this.start);
		var t = this.startNode();
		return (
			this.next(),
			this.type === yr.semi ||
			this.canInsertSemicolon() ||
			(this.type !== yr.star && !this.type.startsExpr)
				? ((t.delegate = !1), (t.argument = null))
				: ((t.delegate = this.eat(yr.star)), (t.argument = this.parseMaybeAssign(e))),
			this.finishNode(t, 'YieldExpression')
		);
	}),
	(Kr.parseAwait = function () {
		this.awaitPos || (this.awaitPos = this.start);
		var e = this.startNode();
		return (
			this.next(),
			(e.argument = this.parseMaybeUnary(null, !1)),
			this.finishNode(e, 'AwaitExpression')
		);
	});
var Yr = Or.prototype;
(Yr.raise = function (e, t) {
	var s = $r(this.input, e);
	t += ' (' + s.line + ':' + s.column + ')';
	var i = new SyntaxError(t);
	throw ((i.pos = e), (i.loc = s), (i.raisedAt = this.pos), i);
}),
	(Yr.raiseRecoverable = Yr.raise),
	(Yr.curPosition = function () {
		if (this.options.locations) return new _r(this.curLine, this.pos - this.lineStart);
	});
var Qr = Or.prototype,
	Jr = function (e) {
		(this.flags = e), (this.var = []), (this.lexical = []), (this.functions = []);
	};
(Qr.enterScope = function (e) {
	this.scopeStack.push(new Jr(e));
}),
	(Qr.exitScope = function () {
		this.scopeStack.pop();
	}),
	(Qr.treatFunctionsAsVarInScope = function (e) {
		return 2 & e.flags || (!this.inModule && 1 & e.flags);
	}),
	(Qr.declareName = function (e, t, s) {
		var i = !1;
		if (2 === t) {
			var n = this.currentScope();
			(i = n.lexical.indexOf(e) > -1 || n.functions.indexOf(e) > -1 || n.var.indexOf(e) > -1),
				n.lexical.push(e),
				this.inModule && 1 & n.flags && delete this.undefinedExports[e];
		} else if (4 === t) {
			this.currentScope().lexical.push(e);
		} else if (3 === t) {
			var r = this.currentScope();
			(i = this.treatFunctionsAsVar
				? r.lexical.indexOf(e) > -1
				: r.lexical.indexOf(e) > -1 || r.var.indexOf(e) > -1),
				r.functions.push(e);
		} else
			for (var a = this.scopeStack.length - 1; a >= 0; --a) {
				var o = this.scopeStack[a];
				if (
					(o.lexical.indexOf(e) > -1 && !(32 & o.flags && o.lexical[0] === e)) ||
					(!this.treatFunctionsAsVarInScope(o) && o.functions.indexOf(e) > -1)
				) {
					i = !0;
					break;
				}
				if (
					(o.var.push(e),
					this.inModule && 1 & o.flags && delete this.undefinedExports[e],
					3 & o.flags)
				)
					break;
			}
		i && this.raiseRecoverable(s, "Identifier '" + e + "' has already been declared");
	}),
	(Qr.checkLocalExport = function (e) {
		-1 === this.scopeStack[0].lexical.indexOf(e.name) &&
			-1 === this.scopeStack[0].var.indexOf(e.name) &&
			(this.undefinedExports[e.name] = e);
	}),
	(Qr.currentScope = function () {
		return this.scopeStack[this.scopeStack.length - 1];
	}),
	(Qr.currentVarScope = function () {
		for (var e = this.scopeStack.length - 1; ; e--) {
			var t = this.scopeStack[e];
			if (3 & t.flags) return t;
		}
	}),
	(Qr.currentThisScope = function () {
		for (var e = this.scopeStack.length - 1; ; e--) {
			var t = this.scopeStack[e];
			if (3 & t.flags && !(16 & t.flags)) return t;
		}
	});
var Zr = function (e, t, s) {
		(this.type = ''),
			(this.start = t),
			(this.end = 0),
			e.options.locations && (this.loc = new Ir(e, s)),
			e.options.directSourceFile && (this.sourceFile = e.options.directSourceFile),
			e.options.ranges && (this.range = [t, 0]);
	},
	ea = Or.prototype;
function ta(e, t, s, i) {
	return (
		(e.type = t),
		(e.end = s),
		this.options.locations && (e.loc.end = i),
		this.options.ranges && (e.range[1] = s),
		e
	);
}
(ea.startNode = function () {
	return new Zr(this, this.start, this.startLoc);
}),
	(ea.startNodeAt = function (e, t) {
		return new Zr(this, e, t);
	}),
	(ea.finishNode = function (e, t) {
		return ta.call(this, e, t, this.lastTokEnd, this.lastTokEndLoc);
	}),
	(ea.finishNodeAt = function (e, t, s, i) {
		return ta.call(this, e, t, s, i);
	}),
	(ea.copyNode = function (e) {
		var t = new Zr(this, e.start, this.startLoc);
		for (var s in e) t[s] = e[s];
		return t;
	});
var sa = function (e, t, s, i, n) {
		(this.token = e),
			(this.isExpr = !!t),
			(this.preserveSpace = !!s),
			(this.override = i),
			(this.generator = !!n);
	},
	ia = {
		b_stat: new sa('{', !1),
		b_expr: new sa('{', !0),
		b_tmpl: new sa('${', !1),
		p_stat: new sa('(', !1),
		p_expr: new sa('(', !0),
		q_tmpl: new sa('`', !0, !0, function (e) {
			return e.tryReadTemplateToken();
		}),
		f_stat: new sa('function', !1),
		f_expr: new sa('function', !0),
		f_expr_gen: new sa('function', !0, !1, null, !0),
		f_gen: new sa('function', !1, !1, null, !0)
	},
	na = Or.prototype;
(na.initialContext = function () {
	return [ia.b_stat];
}),
	(na.braceIsBlock = function (e) {
		var t = this.curContext();
		return (
			t === ia.f_expr ||
			t === ia.f_stat ||
			(e !== yr.colon || (t !== ia.b_stat && t !== ia.b_expr)
				? e === yr._return || (e === yr.name && this.exprAllowed)
					? xr.test(this.input.slice(this.lastTokEnd, this.start))
					: e === yr._else ||
					  e === yr.semi ||
					  e === yr.eof ||
					  e === yr.parenR ||
					  e === yr.arrow ||
					  (e === yr.braceL
							? t === ia.b_stat
							: e !== yr._var && e !== yr._const && e !== yr.name && !this.exprAllowed)
				: !t.isExpr)
		);
	}),
	(na.inGeneratorContext = function () {
		for (var e = this.context.length - 1; e >= 1; e--) {
			var t = this.context[e];
			if ('function' === t.token) return t.generator;
		}
		return !1;
	}),
	(na.updateContext = function (e) {
		var t,
			s = this.type;
		s.keyword && e === yr.dot
			? (this.exprAllowed = !1)
			: (t = s.updateContext)
			? t.call(this, e)
			: (this.exprAllowed = s.beforeExpr);
	}),
	(yr.parenR.updateContext = yr.braceR.updateContext = function () {
		if (1 !== this.context.length) {
			var e = this.context.pop();
			e === ia.b_stat && 'function' === this.curContext().token && (e = this.context.pop()),
				(this.exprAllowed = !e.isExpr);
		} else this.exprAllowed = !0;
	}),
	(yr.braceL.updateContext = function (e) {
		this.context.push(this.braceIsBlock(e) ? ia.b_stat : ia.b_expr), (this.exprAllowed = !0);
	}),
	(yr.dollarBraceL.updateContext = function () {
		this.context.push(ia.b_tmpl), (this.exprAllowed = !0);
	}),
	(yr.parenL.updateContext = function (e) {
		var t = e === yr._if || e === yr._for || e === yr._with || e === yr._while;
		this.context.push(t ? ia.p_stat : ia.p_expr), (this.exprAllowed = !0);
	}),
	(yr.incDec.updateContext = function () {}),
	(yr._function.updateContext = yr._class.updateContext = function (e) {
		!e.beforeExpr ||
		e === yr._else ||
		(e === yr.semi && this.curContext() !== ia.p_stat) ||
		(e === yr._return && xr.test(this.input.slice(this.lastTokEnd, this.start))) ||
		((e === yr.colon || e === yr.braceL) && this.curContext() === ia.b_stat)
			? this.context.push(ia.f_stat)
			: this.context.push(ia.f_expr),
			(this.exprAllowed = !1);
	}),
	(yr.backQuote.updateContext = function () {
		this.curContext() === ia.q_tmpl ? this.context.pop() : this.context.push(ia.q_tmpl),
			(this.exprAllowed = !1);
	}),
	(yr.star.updateContext = function (e) {
		if (e === yr._function) {
			var t = this.context.length - 1;
			this.context[t] === ia.f_expr
				? (this.context[t] = ia.f_expr_gen)
				: (this.context[t] = ia.f_gen);
		}
		this.exprAllowed = !0;
	}),
	(yr.name.updateContext = function (e) {
		var t = !1;
		this.options.ecmaVersion >= 6 &&
			e !== yr.dot &&
			(('of' === this.value && !this.exprAllowed) ||
				('yield' === this.value && this.inGeneratorContext())) &&
			(t = !0),
			(this.exprAllowed = t);
	});
var ra =
		'ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS',
	aa = ra + ' Extended_Pictographic',
	oa = {
		9: ra,
		10: aa,
		11: aa,
		12: 'ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS Extended_Pictographic EBase EComp EMod EPres ExtPict'
	},
	ha =
		'Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu',
	la =
		'Adlam Adlm Ahom Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb',
	ca =
		la +
		' Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd',
	ua = ca + ' Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho',
	da = {
		9: la,
		10: ca,
		11: ua,
		12: 'Adlam Adlm Ahom Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi'
	},
	pa = {};
function fa(e) {
	var t = (pa[e] = {
		binary: wr(oa[e] + ' ' + ha),
		nonBinary: { General_Category: wr(ha), Script: wr(da[e]) }
	});
	(t.nonBinary.Script_Extensions = t.nonBinary.Script),
		(t.nonBinary.gc = t.nonBinary.General_Category),
		(t.nonBinary.sc = t.nonBinary.Script),
		(t.nonBinary.scx = t.nonBinary.Script_Extensions);
}
fa(9), fa(10), fa(11), fa(12);
var ma = Or.prototype,
	ga = function (e) {
		(this.parser = e),
			(this.validFlags =
				'gim' + (e.options.ecmaVersion >= 6 ? 'uy' : '') + (e.options.ecmaVersion >= 9 ? 's' : '')),
			(this.unicodeProperties = pa[e.options.ecmaVersion >= 12 ? 12 : e.options.ecmaVersion]),
			(this.source = ''),
			(this.flags = ''),
			(this.start = 0),
			(this.switchU = !1),
			(this.switchN = !1),
			(this.pos = 0),
			(this.lastIntValue = 0),
			(this.lastStringValue = ''),
			(this.lastAssertionIsQuantifiable = !1),
			(this.numCapturingParens = 0),
			(this.maxBackReference = 0),
			(this.groupNames = []),
			(this.backReferenceNames = []);
	};
function ya(e) {
	return e <= 65535
		? String.fromCharCode(e)
		: ((e -= 65536), String.fromCharCode(55296 + (e >> 10), 56320 + (1023 & e)));
}
function xa(e) {
	return (
		36 === e ||
		(e >= 40 && e <= 43) ||
		46 === e ||
		63 === e ||
		(e >= 91 && e <= 94) ||
		(e >= 123 && e <= 125)
	);
}
function Ea(e) {
	return (e >= 65 && e <= 90) || (e >= 97 && e <= 122);
}
function va(e) {
	return Ea(e) || 95 === e;
}
function ba(e) {
	return va(e) || Sa(e);
}
function Sa(e) {
	return e >= 48 && e <= 57;
}
function Aa(e) {
	return (e >= 48 && e <= 57) || (e >= 65 && e <= 70) || (e >= 97 && e <= 102);
}
function Pa(e) {
	return e >= 65 && e <= 70 ? e - 65 + 10 : e >= 97 && e <= 102 ? e - 97 + 10 : e - 48;
}
function Ca(e) {
	return e >= 48 && e <= 55;
}
(ga.prototype.reset = function (e, t, s) {
	var i = -1 !== s.indexOf('u');
	(this.start = 0 | e),
		(this.source = t + ''),
		(this.flags = s),
		(this.switchU = i && this.parser.options.ecmaVersion >= 6),
		(this.switchN = i && this.parser.options.ecmaVersion >= 9);
}),
	(ga.prototype.raise = function (e) {
		this.parser.raiseRecoverable(
			this.start,
			'Invalid regular expression: /' + this.source + '/: ' + e
		);
	}),
	(ga.prototype.at = function (e, t) {
		void 0 === t && (t = !1);
		var s = this.source,
			i = s.length;
		if (e >= i) return -1;
		var n = s.charCodeAt(e);
		if ((!t && !this.switchU) || n <= 55295 || n >= 57344 || e + 1 >= i) return n;
		var r = s.charCodeAt(e + 1);
		return r >= 56320 && r <= 57343 ? (n << 10) + r - 56613888 : n;
	}),
	(ga.prototype.nextIndex = function (e, t) {
		void 0 === t && (t = !1);
		var s = this.source,
			i = s.length;
		if (e >= i) return i;
		var n,
			r = s.charCodeAt(e);
		return (!t && !this.switchU) ||
			r <= 55295 ||
			r >= 57344 ||
			e + 1 >= i ||
			(n = s.charCodeAt(e + 1)) < 56320 ||
			n > 57343
			? e + 1
			: e + 2;
	}),
	(ga.prototype.current = function (e) {
		return void 0 === e && (e = !1), this.at(this.pos, e);
	}),
	(ga.prototype.lookahead = function (e) {
		return void 0 === e && (e = !1), this.at(this.nextIndex(this.pos, e), e);
	}),
	(ga.prototype.advance = function (e) {
		void 0 === e && (e = !1), (this.pos = this.nextIndex(this.pos, e));
	}),
	(ga.prototype.eat = function (e, t) {
		return void 0 === t && (t = !1), this.current(t) === e && (this.advance(t), !0);
	}),
	(ma.validateRegExpFlags = function (e) {
		for (var t = e.validFlags, s = e.flags, i = 0; i < s.length; i++) {
			var n = s.charAt(i);
			-1 === t.indexOf(n) && this.raise(e.start, 'Invalid regular expression flag'),
				s.indexOf(n, i + 1) > -1 && this.raise(e.start, 'Duplicate regular expression flag');
		}
	}),
	(ma.validateRegExpPattern = function (e) {
		this.regexp_pattern(e),
			!e.switchN &&
				this.options.ecmaVersion >= 9 &&
				e.groupNames.length > 0 &&
				((e.switchN = !0), this.regexp_pattern(e));
	}),
	(ma.regexp_pattern = function (e) {
		(e.pos = 0),
			(e.lastIntValue = 0),
			(e.lastStringValue = ''),
			(e.lastAssertionIsQuantifiable = !1),
			(e.numCapturingParens = 0),
			(e.maxBackReference = 0),
			(e.groupNames.length = 0),
			(e.backReferenceNames.length = 0),
			this.regexp_disjunction(e),
			e.pos !== e.source.length &&
				(e.eat(41) && e.raise("Unmatched ')'"),
				(e.eat(93) || e.eat(125)) && e.raise('Lone quantifier brackets')),
			e.maxBackReference > e.numCapturingParens && e.raise('Invalid escape');
		for (var t = 0, s = e.backReferenceNames; t < s.length; t += 1) {
			var i = s[t];
			-1 === e.groupNames.indexOf(i) && e.raise('Invalid named capture referenced');
		}
	}),
	(ma.regexp_disjunction = function (e) {
		for (this.regexp_alternative(e); e.eat(124); ) this.regexp_alternative(e);
		this.regexp_eatQuantifier(e, !0) && e.raise('Nothing to repeat'),
			e.eat(123) && e.raise('Lone quantifier brackets');
	}),
	(ma.regexp_alternative = function (e) {
		for (; e.pos < e.source.length && this.regexp_eatTerm(e); );
	}),
	(ma.regexp_eatTerm = function (e) {
		return this.regexp_eatAssertion(e)
			? (e.lastAssertionIsQuantifiable &&
					this.regexp_eatQuantifier(e) &&
					e.switchU &&
					e.raise('Invalid quantifier'),
			  !0)
			: !!(e.switchU ? this.regexp_eatAtom(e) : this.regexp_eatExtendedAtom(e)) &&
					(this.regexp_eatQuantifier(e), !0);
	}),
	(ma.regexp_eatAssertion = function (e) {
		var t = e.pos;
		if (((e.lastAssertionIsQuantifiable = !1), e.eat(94) || e.eat(36))) return !0;
		if (e.eat(92)) {
			if (e.eat(66) || e.eat(98)) return !0;
			e.pos = t;
		}
		if (e.eat(40) && e.eat(63)) {
			var s = !1;
			if ((this.options.ecmaVersion >= 9 && (s = e.eat(60)), e.eat(61) || e.eat(33)))
				return (
					this.regexp_disjunction(e),
					e.eat(41) || e.raise('Unterminated group'),
					(e.lastAssertionIsQuantifiable = !s),
					!0
				);
		}
		return (e.pos = t), !1;
	}),
	(ma.regexp_eatQuantifier = function (e, t) {
		return void 0 === t && (t = !1), !!this.regexp_eatQuantifierPrefix(e, t) && (e.eat(63), !0);
	}),
	(ma.regexp_eatQuantifierPrefix = function (e, t) {
		return e.eat(42) || e.eat(43) || e.eat(63) || this.regexp_eatBracedQuantifier(e, t);
	}),
	(ma.regexp_eatBracedQuantifier = function (e, t) {
		var s = e.pos;
		if (e.eat(123)) {
			var i = 0,
				n = -1;
			if (
				this.regexp_eatDecimalDigits(e) &&
				((i = e.lastIntValue),
				e.eat(44) && this.regexp_eatDecimalDigits(e) && (n = e.lastIntValue),
				e.eat(125))
			)
				return -1 !== n && n < i && !t && e.raise('numbers out of order in {} quantifier'), !0;
			e.switchU && !t && e.raise('Incomplete quantifier'), (e.pos = s);
		}
		return !1;
	}),
	(ma.regexp_eatAtom = function (e) {
		return (
			this.regexp_eatPatternCharacters(e) ||
			e.eat(46) ||
			this.regexp_eatReverseSolidusAtomEscape(e) ||
			this.regexp_eatCharacterClass(e) ||
			this.regexp_eatUncapturingGroup(e) ||
			this.regexp_eatCapturingGroup(e)
		);
	}),
	(ma.regexp_eatReverseSolidusAtomEscape = function (e) {
		var t = e.pos;
		if (e.eat(92)) {
			if (this.regexp_eatAtomEscape(e)) return !0;
			e.pos = t;
		}
		return !1;
	}),
	(ma.regexp_eatUncapturingGroup = function (e) {
		var t = e.pos;
		if (e.eat(40)) {
			if (e.eat(63) && e.eat(58)) {
				if ((this.regexp_disjunction(e), e.eat(41))) return !0;
				e.raise('Unterminated group');
			}
			e.pos = t;
		}
		return !1;
	}),
	(ma.regexp_eatCapturingGroup = function (e) {
		if (e.eat(40)) {
			if (
				(this.options.ecmaVersion >= 9
					? this.regexp_groupSpecifier(e)
					: 63 === e.current() && e.raise('Invalid group'),
				this.regexp_disjunction(e),
				e.eat(41))
			)
				return (e.numCapturingParens += 1), !0;
			e.raise('Unterminated group');
		}
		return !1;
	}),
	(ma.regexp_eatExtendedAtom = function (e) {
		return (
			e.eat(46) ||
			this.regexp_eatReverseSolidusAtomEscape(e) ||
			this.regexp_eatCharacterClass(e) ||
			this.regexp_eatUncapturingGroup(e) ||
			this.regexp_eatCapturingGroup(e) ||
			this.regexp_eatInvalidBracedQuantifier(e) ||
			this.regexp_eatExtendedPatternCharacter(e)
		);
	}),
	(ma.regexp_eatInvalidBracedQuantifier = function (e) {
		return this.regexp_eatBracedQuantifier(e, !0) && e.raise('Nothing to repeat'), !1;
	}),
	(ma.regexp_eatSyntaxCharacter = function (e) {
		var t = e.current();
		return !!xa(t) && ((e.lastIntValue = t), e.advance(), !0);
	}),
	(ma.regexp_eatPatternCharacters = function (e) {
		for (var t = e.pos, s = 0; -1 !== (s = e.current()) && !xa(s); ) e.advance();
		return e.pos !== t;
	}),
	(ma.regexp_eatExtendedPatternCharacter = function (e) {
		var t = e.current();
		return (
			!(
				-1 === t ||
				36 === t ||
				(t >= 40 && t <= 43) ||
				46 === t ||
				63 === t ||
				91 === t ||
				94 === t ||
				124 === t
			) && (e.advance(), !0)
		);
	}),
	(ma.regexp_groupSpecifier = function (e) {
		if (e.eat(63)) {
			if (this.regexp_eatGroupName(e))
				return (
					-1 !== e.groupNames.indexOf(e.lastStringValue) && e.raise('Duplicate capture group name'),
					void e.groupNames.push(e.lastStringValue)
				);
			e.raise('Invalid group');
		}
	}),
	(ma.regexp_eatGroupName = function (e) {
		if (((e.lastStringValue = ''), e.eat(60))) {
			if (this.regexp_eatRegExpIdentifierName(e) && e.eat(62)) return !0;
			e.raise('Invalid capture group name');
		}
		return !1;
	}),
	(ma.regexp_eatRegExpIdentifierName = function (e) {
		if (((e.lastStringValue = ''), this.regexp_eatRegExpIdentifierStart(e))) {
			for (e.lastStringValue += ya(e.lastIntValue); this.regexp_eatRegExpIdentifierPart(e); )
				e.lastStringValue += ya(e.lastIntValue);
			return !0;
		}
		return !1;
	}),
	(ma.regexp_eatRegExpIdentifierStart = function (e) {
		var t = e.pos,
			s = this.options.ecmaVersion >= 11,
			i = e.current(s);
		return (
			e.advance(s),
			92 === i && this.regexp_eatRegExpUnicodeEscapeSequence(e, s) && (i = e.lastIntValue),
			(function (e) {
				return lr(e, !0) || 36 === e || 95 === e;
			})(i)
				? ((e.lastIntValue = i), !0)
				: ((e.pos = t), !1)
		);
	}),
	(ma.regexp_eatRegExpIdentifierPart = function (e) {
		var t = e.pos,
			s = this.options.ecmaVersion >= 11,
			i = e.current(s);
		return (
			e.advance(s),
			92 === i && this.regexp_eatRegExpUnicodeEscapeSequence(e, s) && (i = e.lastIntValue),
			(function (e) {
				return cr(e, !0) || 36 === e || 95 === e || 8204 === e || 8205 === e;
			})(i)
				? ((e.lastIntValue = i), !0)
				: ((e.pos = t), !1)
		);
	}),
	(ma.regexp_eatAtomEscape = function (e) {
		return (
			!!(
				this.regexp_eatBackReference(e) ||
				this.regexp_eatCharacterClassEscape(e) ||
				this.regexp_eatCharacterEscape(e) ||
				(e.switchN && this.regexp_eatKGroupName(e))
			) ||
			(e.switchU &&
				(99 === e.current() && e.raise('Invalid unicode escape'), e.raise('Invalid escape')),
			!1)
		);
	}),
	(ma.regexp_eatBackReference = function (e) {
		var t = e.pos;
		if (this.regexp_eatDecimalEscape(e)) {
			var s = e.lastIntValue;
			if (e.switchU) return s > e.maxBackReference && (e.maxBackReference = s), !0;
			if (s <= e.numCapturingParens) return !0;
			e.pos = t;
		}
		return !1;
	}),
	(ma.regexp_eatKGroupName = function (e) {
		if (e.eat(107)) {
			if (this.regexp_eatGroupName(e)) return e.backReferenceNames.push(e.lastStringValue), !0;
			e.raise('Invalid named reference');
		}
		return !1;
	}),
	(ma.regexp_eatCharacterEscape = function (e) {
		return (
			this.regexp_eatControlEscape(e) ||
			this.regexp_eatCControlLetter(e) ||
			this.regexp_eatZero(e) ||
			this.regexp_eatHexEscapeSequence(e) ||
			this.regexp_eatRegExpUnicodeEscapeSequence(e, !1) ||
			(!e.switchU && this.regexp_eatLegacyOctalEscapeSequence(e)) ||
			this.regexp_eatIdentityEscape(e)
		);
	}),
	(ma.regexp_eatCControlLetter = function (e) {
		var t = e.pos;
		if (e.eat(99)) {
			if (this.regexp_eatControlLetter(e)) return !0;
			e.pos = t;
		}
		return !1;
	}),
	(ma.regexp_eatZero = function (e) {
		return 48 === e.current() && !Sa(e.lookahead()) && ((e.lastIntValue = 0), e.advance(), !0);
	}),
	(ma.regexp_eatControlEscape = function (e) {
		var t = e.current();
		return 116 === t
			? ((e.lastIntValue = 9), e.advance(), !0)
			: 110 === t
			? ((e.lastIntValue = 10), e.advance(), !0)
			: 118 === t
			? ((e.lastIntValue = 11), e.advance(), !0)
			: 102 === t
			? ((e.lastIntValue = 12), e.advance(), !0)
			: 114 === t && ((e.lastIntValue = 13), e.advance(), !0);
	}),
	(ma.regexp_eatControlLetter = function (e) {
		var t = e.current();
		return !!Ea(t) && ((e.lastIntValue = t % 32), e.advance(), !0);
	}),
	(ma.regexp_eatRegExpUnicodeEscapeSequence = function (e, t) {
		void 0 === t && (t = !1);
		var s,
			i = e.pos,
			n = t || e.switchU;
		if (e.eat(117)) {
			if (this.regexp_eatFixedHexDigits(e, 4)) {
				var r = e.lastIntValue;
				if (n && r >= 55296 && r <= 56319) {
					var a = e.pos;
					if (e.eat(92) && e.eat(117) && this.regexp_eatFixedHexDigits(e, 4)) {
						var o = e.lastIntValue;
						if (o >= 56320 && o <= 57343)
							return (e.lastIntValue = 1024 * (r - 55296) + (o - 56320) + 65536), !0;
					}
					(e.pos = a), (e.lastIntValue = r);
				}
				return !0;
			}
			if (
				n &&
				e.eat(123) &&
				this.regexp_eatHexDigits(e) &&
				e.eat(125) &&
				(s = e.lastIntValue) >= 0 &&
				s <= 1114111
			)
				return !0;
			n && e.raise('Invalid unicode escape'), (e.pos = i);
		}
		return !1;
	}),
	(ma.regexp_eatIdentityEscape = function (e) {
		if (e.switchU)
			return !!this.regexp_eatSyntaxCharacter(e) || (!!e.eat(47) && ((e.lastIntValue = 47), !0));
		var t = e.current();
		return !(99 === t || (e.switchN && 107 === t)) && ((e.lastIntValue = t), e.advance(), !0);
	}),
	(ma.regexp_eatDecimalEscape = function (e) {
		e.lastIntValue = 0;
		var t = e.current();
		if (t >= 49 && t <= 57) {
			do {
				(e.lastIntValue = 10 * e.lastIntValue + (t - 48)), e.advance();
			} while ((t = e.current()) >= 48 && t <= 57);
			return !0;
		}
		return !1;
	}),
	(ma.regexp_eatCharacterClassEscape = function (e) {
		var t = e.current();
		if (
			(function (e) {
				return 100 === e || 68 === e || 115 === e || 83 === e || 119 === e || 87 === e;
			})(t)
		)
			return (e.lastIntValue = -1), e.advance(), !0;
		if (e.switchU && this.options.ecmaVersion >= 9 && (80 === t || 112 === t)) {
			if (
				((e.lastIntValue = -1),
				e.advance(),
				e.eat(123) && this.regexp_eatUnicodePropertyValueExpression(e) && e.eat(125))
			)
				return !0;
			e.raise('Invalid property name');
		}
		return !1;
	}),
	(ma.regexp_eatUnicodePropertyValueExpression = function (e) {
		var t = e.pos;
		if (this.regexp_eatUnicodePropertyName(e) && e.eat(61)) {
			var s = e.lastStringValue;
			if (this.regexp_eatUnicodePropertyValue(e)) {
				var i = e.lastStringValue;
				return this.regexp_validateUnicodePropertyNameAndValue(e, s, i), !0;
			}
		}
		if (((e.pos = t), this.regexp_eatLoneUnicodePropertyNameOrValue(e))) {
			var n = e.lastStringValue;
			return this.regexp_validateUnicodePropertyNameOrValue(e, n), !0;
		}
		return !1;
	}),
	(ma.regexp_validateUnicodePropertyNameAndValue = function (e, t, s) {
		Nr(e.unicodeProperties.nonBinary, t) || e.raise('Invalid property name'),
			e.unicodeProperties.nonBinary[t].test(s) || e.raise('Invalid property value');
	}),
	(ma.regexp_validateUnicodePropertyNameOrValue = function (e, t) {
		e.unicodeProperties.binary.test(t) || e.raise('Invalid property name');
	}),
	(ma.regexp_eatUnicodePropertyName = function (e) {
		var t = 0;
		for (e.lastStringValue = ''; va((t = e.current())); ) (e.lastStringValue += ya(t)), e.advance();
		return '' !== e.lastStringValue;
	}),
	(ma.regexp_eatUnicodePropertyValue = function (e) {
		var t = 0;
		for (e.lastStringValue = ''; ba((t = e.current())); ) (e.lastStringValue += ya(t)), e.advance();
		return '' !== e.lastStringValue;
	}),
	(ma.regexp_eatLoneUnicodePropertyNameOrValue = function (e) {
		return this.regexp_eatUnicodePropertyValue(e);
	}),
	(ma.regexp_eatCharacterClass = function (e) {
		if (e.eat(91)) {
			if ((e.eat(94), this.regexp_classRanges(e), e.eat(93))) return !0;
			e.raise('Unterminated character class');
		}
		return !1;
	}),
	(ma.regexp_classRanges = function (e) {
		for (; this.regexp_eatClassAtom(e); ) {
			var t = e.lastIntValue;
			if (e.eat(45) && this.regexp_eatClassAtom(e)) {
				var s = e.lastIntValue;
				!e.switchU || (-1 !== t && -1 !== s) || e.raise('Invalid character class'),
					-1 !== t && -1 !== s && t > s && e.raise('Range out of order in character class');
			}
		}
	}),
	(ma.regexp_eatClassAtom = function (e) {
		var t = e.pos;
		if (e.eat(92)) {
			if (this.regexp_eatClassEscape(e)) return !0;
			if (e.switchU) {
				var s = e.current();
				(99 === s || Ca(s)) && e.raise('Invalid class escape'), e.raise('Invalid escape');
			}
			e.pos = t;
		}
		var i = e.current();
		return 93 !== i && ((e.lastIntValue = i), e.advance(), !0);
	}),
	(ma.regexp_eatClassEscape = function (e) {
		var t = e.pos;
		if (e.eat(98)) return (e.lastIntValue = 8), !0;
		if (e.switchU && e.eat(45)) return (e.lastIntValue = 45), !0;
		if (!e.switchU && e.eat(99)) {
			if (this.regexp_eatClassControlLetter(e)) return !0;
			e.pos = t;
		}
		return this.regexp_eatCharacterClassEscape(e) || this.regexp_eatCharacterEscape(e);
	}),
	(ma.regexp_eatClassControlLetter = function (e) {
		var t = e.current();
		return !(!Sa(t) && 95 !== t) && ((e.lastIntValue = t % 32), e.advance(), !0);
	}),
	(ma.regexp_eatHexEscapeSequence = function (e) {
		var t = e.pos;
		if (e.eat(120)) {
			if (this.regexp_eatFixedHexDigits(e, 2)) return !0;
			e.switchU && e.raise('Invalid escape'), (e.pos = t);
		}
		return !1;
	}),
	(ma.regexp_eatDecimalDigits = function (e) {
		var t = e.pos,
			s = 0;
		for (e.lastIntValue = 0; Sa((s = e.current())); )
			(e.lastIntValue = 10 * e.lastIntValue + (s - 48)), e.advance();
		return e.pos !== t;
	}),
	(ma.regexp_eatHexDigits = function (e) {
		var t = e.pos,
			s = 0;
		for (e.lastIntValue = 0; Aa((s = e.current())); )
			(e.lastIntValue = 16 * e.lastIntValue + Pa(s)), e.advance();
		return e.pos !== t;
	}),
	(ma.regexp_eatLegacyOctalEscapeSequence = function (e) {
		if (this.regexp_eatOctalDigit(e)) {
			var t = e.lastIntValue;
			if (this.regexp_eatOctalDigit(e)) {
				var s = e.lastIntValue;
				t <= 3 && this.regexp_eatOctalDigit(e)
					? (e.lastIntValue = 64 * t + 8 * s + e.lastIntValue)
					: (e.lastIntValue = 8 * t + s);
			} else e.lastIntValue = t;
			return !0;
		}
		return !1;
	}),
	(ma.regexp_eatOctalDigit = function (e) {
		var t = e.current();
		return Ca(t) ? ((e.lastIntValue = t - 48), e.advance(), !0) : ((e.lastIntValue = 0), !1);
	}),
	(ma.regexp_eatFixedHexDigits = function (e, t) {
		var s = e.pos;
		e.lastIntValue = 0;
		for (var i = 0; i < t; ++i) {
			var n = e.current();
			if (!Aa(n)) return (e.pos = s), !1;
			(e.lastIntValue = 16 * e.lastIntValue + Pa(n)), e.advance();
		}
		return !0;
	});
var Na = function (e) {
		(this.type = e.type),
			(this.value = e.value),
			(this.start = e.start),
			(this.end = e.end),
			e.options.locations && (this.loc = new Ir(e, e.startLoc, e.endLoc)),
			e.options.ranges && (this.range = [e.start, e.end]);
	},
	ka = Or.prototype;
function wa(e) {
	return 'function' != typeof BigInt ? null : BigInt(e.replace(/_/g, ''));
}
function _a(e) {
	return e <= 65535
		? String.fromCharCode(e)
		: ((e -= 65536), String.fromCharCode(55296 + (e >> 10), 56320 + (1023 & e)));
}
(ka.next = function (e) {
	!e &&
		this.type.keyword &&
		this.containsEsc &&
		this.raiseRecoverable(this.start, 'Escape sequence in keyword ' + this.type.keyword),
		this.options.onToken && this.options.onToken(new Na(this)),
		(this.lastTokEnd = this.end),
		(this.lastTokStart = this.start),
		(this.lastTokEndLoc = this.endLoc),
		(this.lastTokStartLoc = this.startLoc),
		this.nextToken();
}),
	(ka.getToken = function () {
		return this.next(), new Na(this);
	}),
	'undefined' != typeof Symbol &&
		(ka[Symbol.iterator] = function () {
			var e = this;
			return {
				next: function () {
					var t = e.getToken();
					return { done: t.type === yr.eof, value: t };
				}
			};
		}),
	(ka.curContext = function () {
		return this.context[this.context.length - 1];
	}),
	(ka.nextToken = function () {
		var e = this.curContext();
		return (
			(e && e.preserveSpace) || this.skipSpace(),
			(this.start = this.pos),
			this.options.locations && (this.startLoc = this.curPosition()),
			this.pos >= this.input.length
				? this.finishToken(yr.eof)
				: e.override
				? e.override(this)
				: void this.readToken(this.fullCharCodeAtPos())
		);
	}),
	(ka.readToken = function (e) {
		return lr(e, this.options.ecmaVersion >= 6) || 92 === e
			? this.readWord()
			: this.getTokenFromCode(e);
	}),
	(ka.fullCharCodeAtPos = function () {
		var e = this.input.charCodeAt(this.pos);
		return e <= 55295 || e >= 57344
			? e
			: (e << 10) + this.input.charCodeAt(this.pos + 1) - 56613888;
	}),
	(ka.skipBlockComment = function () {
		var e,
			t = this.options.onComment && this.curPosition(),
			s = this.pos,
			i = this.input.indexOf('*/', (this.pos += 2));
		if (
			(-1 === i && this.raise(this.pos - 2, 'Unterminated comment'),
			(this.pos = i + 2),
			this.options.locations)
		)
			for (Er.lastIndex = s; (e = Er.exec(this.input)) && e.index < this.pos; )
				++this.curLine, (this.lineStart = e.index + e[0].length);
		this.options.onComment &&
			this.options.onComment(!0, this.input.slice(s + 2, i), s, this.pos, t, this.curPosition());
	}),
	(ka.skipLineComment = function (e) {
		for (
			var t = this.pos,
				s = this.options.onComment && this.curPosition(),
				i = this.input.charCodeAt((this.pos += e));
			this.pos < this.input.length && !vr(i);

		)
			i = this.input.charCodeAt(++this.pos);
		this.options.onComment &&
			this.options.onComment(
				!1,
				this.input.slice(t + e, this.pos),
				t,
				this.pos,
				s,
				this.curPosition()
			);
	}),
	(ka.skipSpace = function () {
		e: for (; this.pos < this.input.length; ) {
			var e = this.input.charCodeAt(this.pos);
			switch (e) {
				case 32:
				case 160:
					++this.pos;
					break;
				case 13:
					10 === this.input.charCodeAt(this.pos + 1) && ++this.pos;
				case 10:
				case 8232:
				case 8233:
					++this.pos, this.options.locations && (++this.curLine, (this.lineStart = this.pos));
					break;
				case 47:
					switch (this.input.charCodeAt(this.pos + 1)) {
						case 42:
							this.skipBlockComment();
							break;
						case 47:
							this.skipLineComment(2);
							break;
						default:
							break e;
					}
					break;
				default:
					if (!((e > 8 && e < 14) || (e >= 5760 && br.test(String.fromCharCode(e))))) break e;
					++this.pos;
			}
		}
	}),
	(ka.finishToken = function (e, t) {
		(this.end = this.pos), this.options.locations && (this.endLoc = this.curPosition());
		var s = this.type;
		(this.type = e), (this.value = t), this.updateContext(s);
	}),
	(ka.readToken_dot = function () {
		var e = this.input.charCodeAt(this.pos + 1);
		if (e >= 48 && e <= 57) return this.readNumber(!0);
		var t = this.input.charCodeAt(this.pos + 2);
		return this.options.ecmaVersion >= 6 && 46 === e && 46 === t
			? ((this.pos += 3), this.finishToken(yr.ellipsis))
			: (++this.pos, this.finishToken(yr.dot));
	}),
	(ka.readToken_slash = function () {
		var e = this.input.charCodeAt(this.pos + 1);
		return this.exprAllowed
			? (++this.pos, this.readRegexp())
			: 61 === e
			? this.finishOp(yr.assign, 2)
			: this.finishOp(yr.slash, 1);
	}),
	(ka.readToken_mult_modulo_exp = function (e) {
		var t = this.input.charCodeAt(this.pos + 1),
			s = 1,
			i = 42 === e ? yr.star : yr.modulo;
		return (
			this.options.ecmaVersion >= 7 &&
				42 === e &&
				42 === t &&
				(++s, (i = yr.starstar), (t = this.input.charCodeAt(this.pos + 2))),
			61 === t ? this.finishOp(yr.assign, s + 1) : this.finishOp(i, s)
		);
	}),
	(ka.readToken_pipe_amp = function (e) {
		var t = this.input.charCodeAt(this.pos + 1);
		if (t === e) {
			if (this.options.ecmaVersion >= 12)
				if (61 === this.input.charCodeAt(this.pos + 2)) return this.finishOp(yr.assign, 3);
			return this.finishOp(124 === e ? yr.logicalOR : yr.logicalAND, 2);
		}
		return 61 === t
			? this.finishOp(yr.assign, 2)
			: this.finishOp(124 === e ? yr.bitwiseOR : yr.bitwiseAND, 1);
	}),
	(ka.readToken_caret = function () {
		return 61 === this.input.charCodeAt(this.pos + 1)
			? this.finishOp(yr.assign, 2)
			: this.finishOp(yr.bitwiseXOR, 1);
	}),
	(ka.readToken_plus_min = function (e) {
		var t = this.input.charCodeAt(this.pos + 1);
		return t === e
			? 45 !== t ||
			  this.inModule ||
			  62 !== this.input.charCodeAt(this.pos + 2) ||
			  (0 !== this.lastTokEnd && !xr.test(this.input.slice(this.lastTokEnd, this.pos)))
				? this.finishOp(yr.incDec, 2)
				: (this.skipLineComment(3), this.skipSpace(), this.nextToken())
			: 61 === t
			? this.finishOp(yr.assign, 2)
			: this.finishOp(yr.plusMin, 1);
	}),
	(ka.readToken_lt_gt = function (e) {
		var t = this.input.charCodeAt(this.pos + 1),
			s = 1;
		return t === e
			? ((s = 62 === e && 62 === this.input.charCodeAt(this.pos + 2) ? 3 : 2),
			  61 === this.input.charCodeAt(this.pos + s)
					? this.finishOp(yr.assign, s + 1)
					: this.finishOp(yr.bitShift, s))
			: 33 !== t ||
			  60 !== e ||
			  this.inModule ||
			  45 !== this.input.charCodeAt(this.pos + 2) ||
			  45 !== this.input.charCodeAt(this.pos + 3)
			? (61 === t && (s = 2), this.finishOp(yr.relational, s))
			: (this.skipLineComment(4), this.skipSpace(), this.nextToken());
	}),
	(ka.readToken_eq_excl = function (e) {
		var t = this.input.charCodeAt(this.pos + 1);
		return 61 === t
			? this.finishOp(yr.equality, 61 === this.input.charCodeAt(this.pos + 2) ? 3 : 2)
			: 61 === e && 62 === t && this.options.ecmaVersion >= 6
			? ((this.pos += 2), this.finishToken(yr.arrow))
			: this.finishOp(61 === e ? yr.eq : yr.prefix, 1);
	}),
	(ka.readToken_question = function () {
		var e = this.options.ecmaVersion;
		if (e >= 11) {
			var t = this.input.charCodeAt(this.pos + 1);
			if (46 === t) {
				var s = this.input.charCodeAt(this.pos + 2);
				if (s < 48 || s > 57) return this.finishOp(yr.questionDot, 2);
			}
			if (63 === t) {
				if (e >= 12)
					if (61 === this.input.charCodeAt(this.pos + 2)) return this.finishOp(yr.assign, 3);
				return this.finishOp(yr.coalesce, 2);
			}
		}
		return this.finishOp(yr.question, 1);
	}),
	(ka.getTokenFromCode = function (e) {
		switch (e) {
			case 46:
				return this.readToken_dot();
			case 40:
				return ++this.pos, this.finishToken(yr.parenL);
			case 41:
				return ++this.pos, this.finishToken(yr.parenR);
			case 59:
				return ++this.pos, this.finishToken(yr.semi);
			case 44:
				return ++this.pos, this.finishToken(yr.comma);
			case 91:
				return ++this.pos, this.finishToken(yr.bracketL);
			case 93:
				return ++this.pos, this.finishToken(yr.bracketR);
			case 123:
				return ++this.pos, this.finishToken(yr.braceL);
			case 125:
				return ++this.pos, this.finishToken(yr.braceR);
			case 58:
				return ++this.pos, this.finishToken(yr.colon);
			case 96:
				if (this.options.ecmaVersion < 6) break;
				return ++this.pos, this.finishToken(yr.backQuote);
			case 48:
				var t = this.input.charCodeAt(this.pos + 1);
				if (120 === t || 88 === t) return this.readRadixNumber(16);
				if (this.options.ecmaVersion >= 6) {
					if (111 === t || 79 === t) return this.readRadixNumber(8);
					if (98 === t || 66 === t) return this.readRadixNumber(2);
				}
			case 49:
			case 50:
			case 51:
			case 52:
			case 53:
			case 54:
			case 55:
			case 56:
			case 57:
				return this.readNumber(!1);
			case 34:
			case 39:
				return this.readString(e);
			case 47:
				return this.readToken_slash();
			case 37:
			case 42:
				return this.readToken_mult_modulo_exp(e);
			case 124:
			case 38:
				return this.readToken_pipe_amp(e);
			case 94:
				return this.readToken_caret();
			case 43:
			case 45:
				return this.readToken_plus_min(e);
			case 60:
			case 62:
				return this.readToken_lt_gt(e);
			case 61:
			case 33:
				return this.readToken_eq_excl(e);
			case 63:
				return this.readToken_question();
			case 126:
				return this.finishOp(yr.prefix, 1);
		}
		this.raise(this.pos, "Unexpected character '" + _a(e) + "'");
	}),
	(ka.finishOp = function (e, t) {
		var s = this.input.slice(this.pos, this.pos + t);
		return (this.pos += t), this.finishToken(e, s);
	}),
	(ka.readRegexp = function () {
		for (var e, t, s = this.pos; ; ) {
			this.pos >= this.input.length && this.raise(s, 'Unterminated regular expression');
			var i = this.input.charAt(this.pos);
			if ((xr.test(i) && this.raise(s, 'Unterminated regular expression'), e)) e = !1;
			else {
				if ('[' === i) t = !0;
				else if (']' === i && t) t = !1;
				else if ('/' === i && !t) break;
				e = '\\' === i;
			}
			++this.pos;
		}
		var n = this.input.slice(s, this.pos);
		++this.pos;
		var r = this.pos,
			a = this.readWord1();
		this.containsEsc && this.unexpected(r);
		var o = this.regexpState || (this.regexpState = new ga(this));
		o.reset(s, n, a), this.validateRegExpFlags(o), this.validateRegExpPattern(o);
		var h = null;
		try {
			h = new RegExp(n, a);
		} catch (e) {}
		return this.finishToken(yr.regexp, { pattern: n, flags: a, value: h });
	}),
	(ka.readInt = function (e, t, s) {
		for (
			var i = this.options.ecmaVersion >= 12 && void 0 === t,
				n = s && 48 === this.input.charCodeAt(this.pos),
				r = this.pos,
				a = 0,
				o = 0,
				h = 0,
				l = null == t ? 1 / 0 : t;
			h < l;
			++h, ++this.pos
		) {
			var c = this.input.charCodeAt(this.pos),
				u = void 0;
			if (i && 95 === c)
				n &&
					this.raiseRecoverable(
						this.pos,
						'Numeric separator is not allowed in legacy octal numeric literals'
					),
					95 === o &&
						this.raiseRecoverable(this.pos, 'Numeric separator must be exactly one underscore'),
					0 === h &&
						this.raiseRecoverable(
							this.pos,
							'Numeric separator is not allowed at the first of digits'
						),
					(o = c);
			else {
				if (
					(u =
						c >= 97 ? c - 97 + 10 : c >= 65 ? c - 65 + 10 : c >= 48 && c <= 57 ? c - 48 : 1 / 0) >=
					e
				)
					break;
				(o = c), (a = a * e + u);
			}
		}
		return (
			i &&
				95 === o &&
				this.raiseRecoverable(
					this.pos - 1,
					'Numeric separator is not allowed at the last of digits'
				),
			this.pos === r || (null != t && this.pos - r !== t) ? null : a
		);
	}),
	(ka.readRadixNumber = function (e) {
		var t = this.pos;
		this.pos += 2;
		var s = this.readInt(e);
		return (
			null == s && this.raise(this.start + 2, 'Expected number in radix ' + e),
			this.options.ecmaVersion >= 11 && 110 === this.input.charCodeAt(this.pos)
				? ((s = wa(this.input.slice(t, this.pos))), ++this.pos)
				: lr(this.fullCharCodeAtPos()) && this.raise(this.pos, 'Identifier directly after number'),
			this.finishToken(yr.num, s)
		);
	}),
	(ka.readNumber = function (e) {
		var t = this.pos;
		e || null !== this.readInt(10, void 0, !0) || this.raise(t, 'Invalid number');
		var s = this.pos - t >= 2 && 48 === this.input.charCodeAt(t);
		s && this.strict && this.raise(t, 'Invalid number');
		var i = this.input.charCodeAt(this.pos);
		if (!s && !e && this.options.ecmaVersion >= 11 && 110 === i) {
			var n = wa(this.input.slice(t, this.pos));
			return (
				++this.pos,
				lr(this.fullCharCodeAtPos()) && this.raise(this.pos, 'Identifier directly after number'),
				this.finishToken(yr.num, n)
			);
		}
		s && /[89]/.test(this.input.slice(t, this.pos)) && (s = !1),
			46 !== i || s || (++this.pos, this.readInt(10), (i = this.input.charCodeAt(this.pos))),
			(69 !== i && 101 !== i) ||
				s ||
				((43 !== (i = this.input.charCodeAt(++this.pos)) && 45 !== i) || ++this.pos,
				null === this.readInt(10) && this.raise(t, 'Invalid number')),
			lr(this.fullCharCodeAtPos()) && this.raise(this.pos, 'Identifier directly after number');
		var r,
			a =
				((r = this.input.slice(t, this.pos)), s ? parseInt(r, 8) : parseFloat(r.replace(/_/g, '')));
		return this.finishToken(yr.num, a);
	}),
	(ka.readCodePoint = function () {
		var e;
		if (123 === this.input.charCodeAt(this.pos)) {
			this.options.ecmaVersion < 6 && this.unexpected();
			var t = ++this.pos;
			(e = this.readHexChar(this.input.indexOf('}', this.pos) - this.pos)),
				++this.pos,
				e > 1114111 && this.invalidStringToken(t, 'Code point out of bounds');
		} else e = this.readHexChar(4);
		return e;
	}),
	(ka.readString = function (e) {
		for (var t = '', s = ++this.pos; ; ) {
			this.pos >= this.input.length && this.raise(this.start, 'Unterminated string constant');
			var i = this.input.charCodeAt(this.pos);
			if (i === e) break;
			92 === i
				? ((t += this.input.slice(s, this.pos)), (t += this.readEscapedChar(!1)), (s = this.pos))
				: (vr(i, this.options.ecmaVersion >= 10) &&
						this.raise(this.start, 'Unterminated string constant'),
				  ++this.pos);
		}
		return (t += this.input.slice(s, this.pos++)), this.finishToken(yr.string, t);
	});
var Ia = {};
(ka.tryReadTemplateToken = function () {
	this.inTemplateElement = !0;
	try {
		this.readTmplToken();
	} catch (e) {
		if (e !== Ia) throw e;
		this.readInvalidTemplateToken();
	}
	this.inTemplateElement = !1;
}),
	(ka.invalidStringToken = function (e, t) {
		if (this.inTemplateElement && this.options.ecmaVersion >= 9) throw Ia;
		this.raise(e, t);
	}),
	(ka.readTmplToken = function () {
		for (var e = '', t = this.pos; ; ) {
			this.pos >= this.input.length && this.raise(this.start, 'Unterminated template');
			var s = this.input.charCodeAt(this.pos);
			if (96 === s || (36 === s && 123 === this.input.charCodeAt(this.pos + 1)))
				return this.pos !== this.start ||
					(this.type !== yr.template && this.type !== yr.invalidTemplate)
					? ((e += this.input.slice(t, this.pos)), this.finishToken(yr.template, e))
					: 36 === s
					? ((this.pos += 2), this.finishToken(yr.dollarBraceL))
					: (++this.pos, this.finishToken(yr.backQuote));
			if (92 === s)
				(e += this.input.slice(t, this.pos)), (e += this.readEscapedChar(!0)), (t = this.pos);
			else if (vr(s)) {
				switch (((e += this.input.slice(t, this.pos)), ++this.pos, s)) {
					case 13:
						10 === this.input.charCodeAt(this.pos) && ++this.pos;
					case 10:
						e += '\n';
						break;
					default:
						e += String.fromCharCode(s);
				}
				this.options.locations && (++this.curLine, (this.lineStart = this.pos)), (t = this.pos);
			} else ++this.pos;
		}
	}),
	(ka.readInvalidTemplateToken = function () {
		for (; this.pos < this.input.length; this.pos++)
			switch (this.input[this.pos]) {
				case '\\':
					++this.pos;
					break;
				case '$':
					if ('{' !== this.input[this.pos + 1]) break;
				case '`':
					return this.finishToken(yr.invalidTemplate, this.input.slice(this.start, this.pos));
			}
		this.raise(this.start, 'Unterminated template');
	}),
	(ka.readEscapedChar = function (e) {
		var t = this.input.charCodeAt(++this.pos);
		switch ((++this.pos, t)) {
			case 110:
				return '\n';
			case 114:
				return '\r';
			case 120:
				return String.fromCharCode(this.readHexChar(2));
			case 117:
				return _a(this.readCodePoint());
			case 116:
				return '\t';
			case 98:
				return '\b';
			case 118:
				return '\v';
			case 102:
				return '\f';
			case 13:
				10 === this.input.charCodeAt(this.pos) && ++this.pos;
			case 10:
				return this.options.locations && ((this.lineStart = this.pos), ++this.curLine), '';
			case 56:
			case 57:
				if ((this.strict && this.invalidStringToken(this.pos - 1, 'Invalid escape sequence'), e)) {
					var s = this.pos - 1;
					return this.invalidStringToken(s, 'Invalid escape sequence in template string'), null;
				}
			default:
				if (t >= 48 && t <= 55) {
					var i = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0],
						n = parseInt(i, 8);
					return (
						n > 255 && ((i = i.slice(0, -1)), (n = parseInt(i, 8))),
						(this.pos += i.length - 1),
						(t = this.input.charCodeAt(this.pos)),
						('0' === i && 56 !== t && 57 !== t) ||
							(!this.strict && !e) ||
							this.invalidStringToken(
								this.pos - 1 - i.length,
								e ? 'Octal literal in template string' : 'Octal literal in strict mode'
							),
						String.fromCharCode(n)
					);
				}
				return vr(t) ? '' : String.fromCharCode(t);
		}
	}),
	(ka.readHexChar = function (e) {
		var t = this.pos,
			s = this.readInt(16, e);
		return null === s && this.invalidStringToken(t, 'Bad character escape sequence'), s;
	}),
	(ka.readWord1 = function () {
		this.containsEsc = !1;
		for (
			var e = '', t = !0, s = this.pos, i = this.options.ecmaVersion >= 6;
			this.pos < this.input.length;

		) {
			var n = this.fullCharCodeAtPos();
			if (cr(n, i)) this.pos += n <= 65535 ? 1 : 2;
			else {
				if (92 !== n) break;
				(this.containsEsc = !0), (e += this.input.slice(s, this.pos));
				var r = this.pos;
				117 !== this.input.charCodeAt(++this.pos) &&
					this.invalidStringToken(this.pos, 'Expecting Unicode escape sequence \\uXXXX'),
					++this.pos;
				var a = this.readCodePoint();
				(t ? lr : cr)(a, i) || this.invalidStringToken(r, 'Invalid Unicode escape'),
					(e += _a(a)),
					(s = this.pos);
			}
			t = !1;
		}
		return e + this.input.slice(s, this.pos);
	}),
	(ka.readWord = function () {
		var e = this.readWord1(),
			t = yr.name;
		return this.keywords.test(e) && (t = mr[e]), this.finishToken(t, e);
	});
Or.acorn = {
	Parser: Or,
	version: '8.0.3',
	defaultOptions: Mr,
	Position: _r,
	SourceLocation: Ir,
	getLineInfo: $r,
	Node: Zr,
	TokenType: ur,
	tokTypes: yr,
	keywordTypes: mr,
	TokContext: sa,
	tokContexts: ia,
	isIdentifierChar: cr,
	isIdentifierStart: lr,
	Token: Na,
	isNewLine: vr,
	lineBreak: xr,
	lineBreakG: Er,
	nonASCIIwhitespace: br
};
var $a = Object.freeze({
	__proto__: null,
	Node: Zr,
	Parser: Or,
	Position: _r,
	SourceLocation: Ir,
	TokContext: sa,
	Token: Na,
	TokenType: ur,
	defaultOptions: Mr,
	getLineInfo: $r,
	isIdentifierChar: cr,
	isIdentifierStart: lr,
	isNewLine: vr,
	keywordTypes: mr,
	lineBreak: xr,
	lineBreakG: Er,
	nonASCIIwhitespace: br,
	parse: function (e, t) {
		return Or.parse(e, t);
	},
	parseExpressionAt: function (e, t, s) {
		return Or.parseExpressionAt(e, t, s);
	},
	tokContexts: ia,
	tokTypes: yr,
	tokenizer: function (e, t) {
		return Or.tokenizer(e, t);
	},
	version: '8.0.3'
});
class Ma extends qe {
	constructor() {
		super(), this.variables.set('undefined', new Pt());
	}
	findVariable(e) {
		let t = this.variables.get(e);
		return t || ((t = new xt(e)), this.variables.set(e, t)), t;
	}
}
const Ta = (e) => (...t) => {
		throw Object.assign(
			new Error(
				`Cannot access the file system (via "fs.${e}") when using the browser build of Rollup. Make sure you supply a plugin with custom resolveId and load hooks to Rollup.`
			),
			{ code: 'NO_FS_IN_BROWSER', url: 'https://rollupjs.org/guide/en/#a-simple-example' }
		);
	},
	La = Ta('lstatSync'),
	Ra = Ta('readdirSync'),
	Oa = Ta('readFile'),
	Da = Ta('realpathSync'),
	Va = Ta('writeFile');
async function Ba(e, t, s, i, n, r) {
	const a = await i.hookFirst('resolveId', [e, t, { custom: r }], null, n);
	return null != a
		? a
		: void 0 === t || Le(e) || '.' === e[0]
		? (function (e, t) {
				let s = Fa(e, t);
				return s || ((s = Fa(e + '.mjs', t)), s || ((s = Fa(e + '.js', t)), s));
		  })(We(t ? Ve(t) : We(), e), s)
		: null;
}
function Fa(e, t) {
	try {
		const s = La(e);
		if (!t && s.isSymbolicLink()) return Fa(Da(e), t);
		if ((t && s.isSymbolicLink()) || s.isFile()) {
			const t = De(e);
			if (-1 !== Ra(Ve(e)).indexOf(t)) return e;
		}
	} catch (e) {}
}
function Wa(e, t, { hook: s, id: i } = {}) {
	return (
		'string' == typeof e && (e = { message: e }),
		e.code && e.code !== ts.PLUGIN_ERROR && (e.pluginCode = e.code),
		(e.code = ts.PLUGIN_ERROR),
		(e.plugin = t),
		s && (e.hook = s),
		i && (e.id = i),
		Zt(e)
	);
}
const Ua = [{ active: !0, deprecated: 'resolveAssetUrl', replacement: 'resolveFileUrl' }];
const za = { has: () => !1, get() {}, set() {}, delete: () => !1 };
function ja(e) {
	return e.startsWith('at position ') || e.startsWith('at output position ')
		? Zt({
				code: 'ANONYMOUS_PLUGIN_CACHE',
				message:
					'A plugin is trying to use the Rollup cache but is not declaring a plugin name or cacheKey.'
		  })
		: Zt({
				code: 'DUPLICATE_PLUGIN_NAME',
				message: `The plugin name ${e} is being used twice in the same build. Plugin names must be distinct or provide a cacheKey (please post an issue to the plugin if you are a plugin user).`
		  });
}
function Ga(e, t, s, i) {
	const n = t.id,
		r = [];
	let a = null === e.map ? null : $n(e.map);
	const o = e.code;
	let h = e.ast;
	const c = [],
		u = [];
	let d = !1;
	const p = () => (d = !0);
	let f;
	const m = e.code;
	return s
		.hookReduceArg0(
			'transform',
			[m, n],
			function (e, s, n) {
				let a, o;
				if ('string' == typeof s) a = s;
				else {
					if (!s || 'object' != typeof s) return e;
					if ((t.updateOptions(s), null == s.code))
						return (
							(s.map || s.ast) &&
								i(
									((l = n.name),
									{
										code: ts.NO_TRANSFORM_MAP_OR_AST_WITHOUT_CODE,
										message: `The plugin "${l}" returned a "map" or "ast" without returning a "code". This will be ignored.`
									})
								),
							e
						);
					({ code: a, map: o, ast: h } = s);
				}
				var l;
				return (
					null !== o &&
						r.push($n('string' == typeof o ? JSON.parse(o) : o) || { missing: !0, plugin: n.name }),
					a
				);
			},
			(e, t) => {
				return (
					(f = t),
					{
						...e,
						cache: d
							? e.cache
							: ((h = e.cache),
							  (g = p),
							  {
									has: (e) => (g(), h.has(e)),
									get: (e) => (g(), h.get(e)),
									set: (e, t) => (g(), h.set(e, t)),
									delete: (e) => (g(), h.delete(e))
							  }),
						warn(t, s) {
							'string' == typeof t && (t = { message: t }),
								s && es(t, s, m, n),
								(t.id = n),
								(t.hook = 'transform'),
								e.warn(t);
						},
						error: (t, s) => (
							'string' == typeof t && (t = { message: t }),
							s && es(t, s, m, n),
							(t.id = n),
							(t.hook = 'transform'),
							e.error(t)
						),
						emitAsset: (t, s) => (u.push({ type: 'asset', name: t, source: s }), e.emitAsset(t, s)),
						emitChunk: (t, s) => (
							u.push({ type: 'chunk', id: t, name: s && s.name }), e.emitChunk(t, s)
						),
						emitFile: (e) => (u.push(e), s.emitFile(e)),
						addWatchFile(t) {
							c.push(t), e.addWatchFile(t);
						},
						setAssetSource() {
							return this.error({
								code: 'INVALID_SETASSETSOURCE',
								message:
									'setAssetSource cannot be called in transform for caching reasons. Use emitFile with a source, or call setAssetSource in another hook.'
							});
						},
						getCombinedSourcemap() {
							const e = (function (e, t, s, i, n) {
								return i.length ? { version: 3, ...Vi(e, t, s, i, Di(n)).traceMappings() } : s;
							})(n, o, a, r, i);
							if (!e) {
								return new x(o).generateMap({ includeContent: !0, hires: !0, source: n });
							}
							return (
								a !== e && ((a = e), (r.length = 0)),
								new l({ ...e, file: null, sourcesContent: e.sourcesContent })
							);
						}
					}
				);
				var h, g;
			}
		)
		.catch((e) => Wa(e, f.name, { hook: 'transform', id: n }))
		.then(
			(e) => (
				d || (u.length && (t.transformFiles = u)),
				{
					ast: h,
					code: e,
					customTransformCache: d,
					meta: t.info.meta,
					originalCode: o,
					originalSourcemap: a,
					sourcemapChain: r,
					transformDependencies: c
				}
			)
		);
}
class Ha {
	constructor(e, t, s, i) {
		(this.graph = e),
			(this.modulesById = t),
			(this.options = s),
			(this.pluginDriver = i),
			(this.implicitEntryModules = new Set()),
			(this.indexedEntryModules = []),
			(this.latestLoadModulesPromise = Promise.resolve()),
			(this.nextEntryModuleIndex = 0),
			(this.hasModuleSideEffects = s.treeshake ? s.treeshake.moduleSideEffects : () => !0);
	}
	async addAdditionalModules(e) {
		const t = this.extendLoadModulesPromise(
			Promise.all(e.map((e) => this.loadEntryModule(e, !1, void 0, null)))
		);
		return await this.awaitLoadModulesPromise(), t;
	}
	async addEntryModules(e, t) {
		const s = this.nextEntryModuleIndex;
		this.nextEntryModuleIndex += e.length;
		const i = await this.extendLoadModulesPromise(
			Promise.all(e.map(({ id: e, importer: t }) => this.loadEntryModule(e, !0, t, null))).then(
				(i) => {
					let n = s;
					for (let s = 0; s < i.length; s++) {
						const r = i[s];
						(r.isUserDefinedEntryPoint = r.isUserDefinedEntryPoint || t), Ka(r, e[s], t);
						const a = this.indexedEntryModules.find((e) => e.module === r);
						a
							? (a.index = Math.min(a.index, n))
							: this.indexedEntryModules.push({ module: r, index: n }),
							n++;
					}
					return this.indexedEntryModules.sort(({ index: e }, { index: t }) => (e > t ? 1 : -1)), i;
				}
			)
		);
		return (
			await this.awaitLoadModulesPromise(),
			{
				entryModules: this.indexedEntryModules.map(({ module: e }) => e),
				implicitEntryModules: [...this.implicitEntryModules],
				newEntryModules: i
			}
		);
	}
	async emitChunk({
		fileName: e,
		id: t,
		importer: s,
		name: i,
		implicitlyLoadedAfterOneOf: n,
		preserveSignature: r
	}) {
		const a = { fileName: e || null, id: t, importer: s, name: i || null },
			o = n
				? await this.addEntryWithImplicitDependants(a, n)
				: (await this.addEntryModules([a], !1)).newEntryModules[0];
		return null != r && (o.preserveSignature = r), o;
	}
	async resolveId(e, t, s, i = null) {
		return this.addDefaultsToResolvedId(
			this.getNormalizedResolvedIdWithoutDefaults(
				!this.options.external(e, t, !1) &&
					(await Ba(e, t, this.options.preserveSymlinks, this.pluginDriver, i, s)),
				t,
				e
			)
		);
	}
	addDefaultsToResolvedId(e) {
		var t, s;
		if (!e) return null;
		const i = e.external || !1;
		return {
			external: i,
			id: e.id,
			meta: e.meta || Pe,
			moduleSideEffects:
				null !== (t = e.moduleSideEffects) && void 0 !== t ? t : this.hasModuleSideEffects(e.id, i),
			syntheticNamedExports: null !== (s = e.syntheticNamedExports) && void 0 !== s && s
		};
	}
	addEntryWithImplicitDependants(e, t) {
		return this.extendLoadModulesPromise(
			this.loadEntryModule(e.id, !1, e.importer, null).then(async (s) => {
				if ((Ka(s, e, !1), !s.info.isEntry)) {
					this.implicitEntryModules.add(s);
					const i = await Promise.all(t.map((t) => this.loadEntryModule(t, !1, e.importer, s.id)));
					for (const e of i) s.implicitlyLoadedAfter.add(e);
					for (const e of s.implicitlyLoadedAfter) e.implicitlyLoadedBefore.add(s);
				}
				return s;
			})
		);
	}
	async addModuleSource(e, t, s) {
		var i;
		let n;
		Ni('load modules', 3);
		try {
			n =
				null !== (i = await this.pluginDriver.hookFirst('load', [e])) && void 0 !== i
					? i
					: await Oa(e);
		} catch (s) {
			ki('load modules', 3);
			let i = 'Could not load ' + e;
			throw (t && (i += ` (imported by ${Qt(t)})`), (i += ': ' + s.message), (s.message = i), s);
		}
		ki('load modules', 3);
		const r =
				'string' == typeof n
					? { code: n }
					: 'object' == typeof n && 'string' == typeof n.code
					? n
					: Zt(
							(function (e) {
								return {
									code: ts.BAD_LOADER,
									message: `Error loading ${Qt(
										e
									)}: plugin load hook should return a string, a { code, map } object, or nothing/null`
								};
							})(e)
					  ),
			a = this.graph.cachedModules.get(e);
		if (a && !a.customTransformCache && a.originalCode === r.code) {
			if (a.transformFiles) for (const e of a.transformFiles) this.pluginDriver.emitFile(e);
			s.setSource(a);
		} else s.updateOptions(r), s.setSource(await Ga(r, s, this.pluginDriver, this.options.onwarn));
	}
	async awaitLoadModulesPromise() {
		let e;
		do {
			(e = this.latestLoadModulesPromise), await e;
		} while (e !== this.latestLoadModulesPromise);
	}
	extendLoadModulesPromise(e) {
		return (
			(this.latestLoadModulesPromise = Promise.all([e, this.latestLoadModulesPromise])),
			this.latestLoadModulesPromise.catch(() => {}),
			e
		);
	}
	async fetchDynamicDependencies(e) {
		const t = await Promise.all(
			e.dynamicImports.map(async (t) => {
				const s = await this.resolveDynamicImport(
					e,
					'string' == typeof t.argument ? t.argument : t.argument.esTreeNode,
					e.id
				);
				return null === s
					? null
					: 'string' == typeof s
					? ((t.resolution = s), null)
					: (t.resolution = await this.fetchResolvedDependency(Qt(s.id), e.id, s));
			})
		);
		for (const s of t) s && (e.dynamicDependencies.add(s), s.dynamicImporters.push(e.id));
	}
	async fetchModule({ id: e, meta: t, moduleSideEffects: s, syntheticNamedExports: i }, n, r) {
		const a = this.modulesById.get(e);
		if (a instanceof Li) {
			if (r) {
				(a.info.isEntry = !0), this.implicitEntryModules.delete(a);
				for (const e of a.implicitlyLoadedAfter) e.implicitlyLoadedBefore.delete(a);
				a.implicitlyLoadedAfter.clear();
			}
			return a;
		}
		const o = new Li(this.graph, e, this.options, r, s, i, t);
		return (
			this.modulesById.set(e, o),
			(this.graph.watchFiles[e] = !0),
			await this.addModuleSource(e, n, o),
			await this.pluginDriver.hookParallel('moduleParsed', [o.info]),
			await Promise.all([this.fetchStaticDependencies(o), this.fetchDynamicDependencies(o)]),
			o.linkImports(),
			o
		);
	}
	fetchResolvedDependency(e, t, s) {
		if (s.external) {
			this.modulesById.has(s.id) ||
				this.modulesById.set(s.id, new Ue(this.options, s.id, s.moduleSideEffects, s.meta));
			const i = this.modulesById.get(s.id);
			return i instanceof Ue
				? Promise.resolve(i)
				: Zt(
						(function (e, t) {
							return {
								code: ts.INVALID_EXTERNAL_ID,
								message: `'${e}' is imported as an external by ${Qt(
									t
								)}, but is already an existing non-external module id.`
							};
						})(e, t)
				  );
		}
		return this.fetchModule(s, t, !1);
	}
	async fetchStaticDependencies(e) {
		for (const t of await Promise.all(
			Array.from(e.sources, async (t) =>
				this.fetchResolvedDependency(
					t,
					e.id,
					(e.resolvedIds[t] =
						e.resolvedIds[t] || this.handleResolveId(await this.resolveId(t, e.id, Pe), t, e.id))
				)
			)
		))
			e.dependencies.add(t), t.importers.push(e.id);
	}
	getNormalizedResolvedIdWithoutDefaults(e, t, s) {
		if (e) {
			if ('object' == typeof e)
				return { ...e, external: e.external || this.options.external(e.id, t, !0) };
			const s = this.options.external(e, t, !0);
			return { external: s, id: s ? qa(e, t) : e };
		}
		const i = qa(s, t);
		return !1 === e || this.options.external(i, t, !0) ? { external: !0, id: i } : null;
	}
	handleResolveId(e, t, s) {
		return null === e
			? Re(t)
				? Zt(
						(function (e, t) {
							return {
								code: ts.UNRESOLVED_IMPORT,
								message: `Could not resolve '${e}' from ${Qt(t)}`
							};
						})(t, s)
				  )
				: (this.options.onwarn(
						(function (e, t) {
							return {
								code: ts.UNRESOLVED_IMPORT,
								importer: Qt(t),
								message: `'${e}' is imported by ${Qt(
									t
								)}, but could not be resolved – treating it as an external dependency`,
								source: e,
								url: 'https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency'
							};
						})(t, s)
				  ),
				  {
						external: !0,
						id: t,
						meta: Pe,
						moduleSideEffects: this.hasModuleSideEffects(t, !0),
						syntheticNamedExports: !1
				  })
			: (e.external &&
					e.syntheticNamedExports &&
					this.options.onwarn(
						(function (e, t) {
							return {
								code: ts.EXTERNAL_SYNTHETIC_EXPORTS,
								importer: Qt(t),
								message: `External '${e}' can not have 'syntheticNamedExports' enabled.`,
								source: e
							};
						})(t, s)
					),
			  e);
	}
	async loadEntryModule(e, t, s, i) {
		const n = await Ba(e, s, this.options.preserveSymlinks, this.pluginDriver, null, Pe);
		return null == n
			? Zt(
					null === i
						? (function (e) {
								return {
									code: ts.UNRESOLVED_ENTRY,
									message: `Could not resolve entry module (${Qt(e)}).`
								};
						  })(e)
						: (function (e, t) {
								return {
									code: ts.MISSING_IMPLICIT_DEPENDANT,
									message: `Module "${Qt(e)}" that should be implicitly loaded before "${Qt(
										t
									)}" could not be resolved.`
								};
						  })(e, i)
			  )
			: !1 === n || ('object' == typeof n && n.external)
			? Zt(
					null === i
						? (function (e) {
								return {
									code: ts.UNRESOLVED_ENTRY,
									message: `Entry module cannot be external (${Qt(e)}).`
								};
						  })(e)
						: (function (e, t) {
								return {
									code: ts.MISSING_IMPLICIT_DEPENDANT,
									message: `Module "${Qt(e)}" that should be implicitly loaded before "${Qt(
										t
									)}" cannot be external.`
								};
						  })(e, i)
			  )
			: this.fetchModule(
					this.addDefaultsToResolvedId('object' == typeof n ? n : { id: n }),
					void 0,
					t
			  );
	}
	async resolveDynamicImport(e, t, s) {
		const i = await this.pluginDriver.hookFirst('resolveDynamicImport', [t, s]);
		return 'string' != typeof t
			? 'string' == typeof i
				? i
				: i
				? { external: !1, moduleSideEffects: !0, ...i }
				: null
			: null == i
			? (e.resolvedIds[t] =
					e.resolvedIds[t] || this.handleResolveId(await this.resolveId(t, e.id, Pe), t, e.id))
			: this.handleResolveId(
					this.addDefaultsToResolvedId(this.getNormalizedResolvedIdWithoutDefaults(i, s, t)),
					t,
					s
			  );
	}
}
function qa(e, t) {
	return Re(e) ? (t ? We(t, '..', e) : We(e)) : e;
}
function Ka(e, { fileName: t, name: s }, i) {
	null !== t
		? e.chunkFileNames.add(t)
		: null !== s && (null === e.chunkName && (e.chunkName = s), i && e.userChunkNames.add(s));
}
function Xa(e, t, s, i, n, r) {
	let a = !1;
	return (...o) => (
		a ||
			((a = !0),
			hs(
				{
					message: `The "this.${t}" plugin context function used by plugin ${i} is deprecated. The "this.${s}" plugin context function should be used instead.`,
					plugin: i
				},
				n,
				r
			)),
		e(...o)
	);
}
function Ya(e, t, s, i) {
	const n = new Set();
	return (r, a) => {
		let o,
			h = !0;
		if (
			('string' != typeof r.cacheKey &&
				(r.name.startsWith('at position ') ||
				r.name.startsWith('at output position ') ||
				n.has(r.name)
					? (h = !1)
					: n.add(r.name)),
			e)
		)
			if (h) {
				const t = r.cacheKey || r.name;
				(c = e[t] || (e[t] = Object.create(null))),
					(o = {
						has(e) {
							const t = c[e];
							return !!t && ((t[0] = 0), !0);
						},
						get(e) {
							const t = c[e];
							if (t) return (t[0] = 0), t[1];
						},
						set(e, t) {
							c[e] = [0, t];
						},
						delete: (e) => delete c[e]
					});
			} else
				(l = r.name),
					(o = { has: () => ja(l), get: () => ja(l), set: () => ja(l), delete: () => ja(l) });
		else o = za;
		var l, c;
		return {
			addWatchFile(e) {
				if (t.phase >= Wn.GENERATE)
					return this.error({
						code: ts.INVALID_ROLLUP_PHASE,
						message: 'Cannot call addWatchFile after the build has finished.'
					});
				t.watchFiles[e] = !0;
			},
			cache: o,
			emitAsset: Xa(
				(e, t) => i.emitFile({ type: 'asset', name: e, source: t }),
				'emitAsset',
				'emitFile',
				r.name,
				!0,
				s
			),
			emitChunk: Xa(
				(e, t) => i.emitFile({ type: 'chunk', id: e, name: t && t.name }),
				'emitChunk',
				'emitFile',
				r.name,
				!0,
				s
			),
			emitFile: i.emitFile,
			error: (e) => Wa(e, r.name),
			getAssetFileName: Xa(i.getFileName, 'getAssetFileName', 'getFileName', r.name, !0, s),
			getChunkFileName: Xa(i.getFileName, 'getChunkFileName', 'getFileName', r.name, !0, s),
			getFileName: i.getFileName,
			getModuleIds: () => t.modulesById.keys(),
			getModuleInfo: t.getModuleInfo,
			getWatchFiles: () => Object.keys(t.watchFiles),
			isExternal: Xa((e, t, i = !1) => s.external(e, t, i), 'isExternal', 'resolve', r.name, !0, s),
			meta: { rollupVersion: '2.33.1', watchMode: t.watchMode },
			get moduleIds() {
				const e = t.modulesById.keys();
				return (function* () {
					hs(
						{
							message: `Accessing "this.moduleIds" on the plugin context by plugin ${r.name} is deprecated. The "this.getModuleIds" plugin context function should be used instead.`,
							plugin: r.name
						},
						!1,
						s
					),
						yield* e;
				})();
			},
			parse: t.contextParse,
			resolve: (e, s, { custom: i, skipSelf: n } = Ae) =>
				t.moduleLoader.resolveId(e, s, i, n ? a : null),
			resolveId: Xa(
				(e, s) => t.moduleLoader.resolveId(e, s, Ae).then((e) => e && e.id),
				'resolveId',
				'resolve',
				r.name,
				!0,
				s
			),
			setAssetSource: i.setAssetSource,
			warn(e) {
				'string' == typeof e && (e = { message: e }),
					e.code && (e.pluginCode = e.code),
					(e.code = 'PLUGIN_WARNING'),
					(e.plugin = r.name),
					s.onwarn(e);
			}
		};
	};
}
const Qa = Object.keys({
	buildEnd: 1,
	buildStart: 1,
	closeWatcher: 1,
	load: 1,
	moduleParsed: 1,
	options: 1,
	resolveDynamicImport: 1,
	resolveId: 1,
	transform: 1,
	watchChange: 1
});
function Ja(e, t) {
	return Zt({
		code: 'INVALID_PLUGIN_HOOK',
		message: `Error running plugin hook ${e} for ${t}, expected a function hook.`
	});
}
class Za {
	constructor(e, t, s, i, n) {
		if (
			((this.graph = e),
			(this.options = t),
			(function (e, t) {
				for (const { active: s, deprecated: i, replacement: n } of Ua)
					for (const r of e)
						i in r &&
							hs(
								{
									message: `The "${i}" hook used by plugin ${r.name} is deprecated. The "${n}" hook should be used instead.`,
									plugin: r.name
								},
								s,
								t
							);
			})(s, t),
			(this.pluginCache = i),
			(this.fileEmitter = new qn(e, t, n && n.fileEmitter)),
			(this.emitFile = this.fileEmitter.emitFile),
			(this.getFileName = this.fileEmitter.getFileName),
			(this.finaliseAssets = this.fileEmitter.assertAssetsFinalized),
			(this.setOutputBundle = this.fileEmitter.setOutputBundle),
			(this.plugins = s.concat(n ? n.plugins : [])),
			(this.pluginContexts = this.plugins.map(Ya(i, e, t, this.fileEmitter))),
			n)
		)
			for (const e of s)
				for (const s of Qa)
					s in e &&
						t.onwarn(
							((r = e.name),
							(a = s),
							{
								code: ts.INPUT_HOOK_IN_OUTPUT_PLUGIN,
								message: `The "${a}" hook used by the output plugin ${r} is a build time hook and will not be run for that plugin. Either this plugin cannot be used as an output plugin, or it should have an option to configure it as an output plugin.`
							})
						);
		var r, a;
	}
	createOutputPluginDriver(e) {
		return new Za(this.graph, this.options, e, this.pluginCache, this);
	}
	hookFirst(e, t, s, i) {
		let n = Promise.resolve(void 0);
		for (let r = 0; r < this.plugins.length; r++)
			i !== r && (n = n.then((i) => (null != i ? i : this.runHook(e, t, r, !1, s))));
		return n;
	}
	hookFirstSync(e, t, s) {
		for (let i = 0; i < this.plugins.length; i++) {
			const n = this.runHookSync(e, t, i, s);
			if (null != n) return n;
		}
		return null;
	}
	hookParallel(e, t, s) {
		const i = [];
		for (let n = 0; n < this.plugins.length; n++) {
			const r = this.runHook(e, t, n, !1, s);
			r && i.push(r);
		}
		return Promise.all(i).then(() => {});
	}
	hookReduceArg0(e, [t, ...s], i, n) {
		let r = Promise.resolve(t);
		for (let t = 0; t < this.plugins.length; t++)
			r = r.then((r) => {
				const a = [r, ...s],
					o = this.runHook(e, a, t, !1, n);
				return o ? o.then((e) => i.call(this.pluginContexts[t], r, e, this.plugins[t])) : r;
			});
		return r;
	}
	hookReduceArg0Sync(e, [t, ...s], i, n) {
		for (let r = 0; r < this.plugins.length; r++) {
			const a = [t, ...s],
				o = this.runHookSync(e, a, r, n);
			t = i.call(this.pluginContexts[r], t, o, this.plugins[r]);
		}
		return t;
	}
	hookReduceValue(e, t, s, i, n) {
		let r = Promise.resolve(t);
		for (let t = 0; t < this.plugins.length; t++)
			r = r.then((r) => {
				const a = this.runHook(e, s, t, !0, n);
				return a ? a.then((e) => i.call(this.pluginContexts[t], r, e, this.plugins[t])) : r;
			});
		return r;
	}
	hookReduceValueSync(e, t, s, i, n) {
		let r = t;
		for (let t = 0; t < this.plugins.length; t++) {
			const a = this.runHookSync(e, s, t, n);
			r = i.call(this.pluginContexts[t], r, a, this.plugins[t]);
		}
		return r;
	}
	hookSeq(e, t, s) {
		let i = Promise.resolve();
		for (let n = 0; n < this.plugins.length; n++) i = i.then(() => this.runHook(e, t, n, !1, s));
		return i;
	}
	hookSeqSync(e, t, s) {
		for (let i = 0; i < this.plugins.length; i++) this.runHookSync(e, t, i, s);
	}
	runHook(e, t, s, i, n) {
		const r = this.plugins[s],
			a = r[e];
		if (!a) return;
		let o = this.pluginContexts[s];
		return (
			n && (o = n(o, r)),
			Promise.resolve()
				.then(() => ('function' != typeof a ? (i ? a : Ja(e, r.name)) : a.apply(o, t)))
				.catch((t) => Wa(t, r.name, { hook: e }))
		);
	}
	runHookSync(e, t, s, i) {
		const n = this.plugins[s],
			r = n[e];
		if (!r) return;
		let a = this.pluginContexts[s];
		i && (a = i(a, n));
		try {
			return 'function' != typeof r ? Ja(e, n.name) : r.apply(a, t);
		} catch (t) {
			return Wa(t, n.name, { hook: e });
		}
	}
}
class eo {
	constructor(e, t) {
		var s, i;
		if (
			((this.options = e),
			(this.entryModules = []),
			(this.modulesById = new Map()),
			(this.needsTreeshakingPass = !1),
			(this.phase = Wn.LOAD_AND_PARSE),
			(this.watchFiles = Object.create(null)),
			(this.watchMode = !1),
			(this.externalModules = []),
			(this.implicitEntryModules = []),
			(this.modules = []),
			(this.getModuleInfo = (e) => {
				const t = this.modulesById.get(e);
				return t ? t.info : null;
			}),
			(this.deoptimizationTracker = new z()),
			(this.cachedModules = new Map()),
			!1 !== e.cache)
		) {
			if (null === (s = e.cache) || void 0 === s ? void 0 : s.modules)
				for (const t of e.cache.modules) this.cachedModules.set(t.id, t);
			this.pluginCache =
				(null === (i = e.cache) || void 0 === i ? void 0 : i.plugins) || Object.create(null);
			for (const e in this.pluginCache) {
				const t = this.pluginCache[e];
				for (const e of Object.keys(t)) t[e][0]++;
			}
		}
		if (
			((this.contextParse = (e, t = {}) =>
				this.acornParser.parse(e, { ...this.options.acorn, ...t })),
			t)
		) {
			this.watchMode = !0;
			const e = (...e) => this.pluginDriver.hookSeqSync('watchChange', e),
				s = () => this.pluginDriver.hookSeqSync('closeWatcher', []);
			t.on('change', e),
				t.on('close', s),
				t.once('restart', () => {
					t.removeListener('change', e), t.removeListener('close', s);
				});
		}
		(this.pluginDriver = new Za(this, e, e.plugins, this.pluginCache)),
			(this.scope = new Ma()),
			(this.acornParser = Or.extend(...e.acornInjectPlugins)),
			(this.moduleLoader = new Ha(this, this.modulesById, this.options, this.pluginDriver));
	}
	async build() {
		Ni('generate module graph', 2),
			await this.generateModuleGraph(),
			ki('generate module graph', 2),
			Ni('sort modules', 2),
			(this.phase = Wn.ANALYSE),
			this.sortModules(),
			ki('sort modules', 2),
			Ni('mark included statements', 2),
			this.includeStatements(),
			ki('mark included statements', 2),
			(this.phase = Wn.GENERATE);
	}
	getCache() {
		for (const e in this.pluginCache) {
			const t = this.pluginCache[e];
			let s = !0;
			for (const e of Object.keys(t))
				t[e][0] >= this.options.experimentalCacheExpiry ? delete t[e] : (s = !1);
			s && delete this.pluginCache[e];
		}
		return { modules: this.modules.map((e) => e.toJSON()), plugins: this.pluginCache };
	}
	async generateModuleGraph() {
		var e;
		if (
			(({
				entryModules: this.entryModules,
				implicitEntryModules: this.implicitEntryModules
			} = await this.moduleLoader.addEntryModules(
				((e = this.options.input),
				Array.isArray(e)
					? e.map((e) => ({
							fileName: null,
							id: e,
							implicitlyLoadedAfter: [],
							importer: void 0,
							name: null
					  }))
					: Object.keys(e).map((t) => ({
							fileName: null,
							id: e[t],
							implicitlyLoadedAfter: [],
							importer: void 0,
							name: t
					  }))),
				!0
			)),
			0 === this.entryModules.length)
		)
			throw new Error('You must supply options.input to rollup');
		for (const e of this.modulesById.values())
			e instanceof Li ? this.modules.push(e) : this.externalModules.push(e);
	}
	includeStatements() {
		for (const e of [...this.entryModules, ...this.implicitEntryModules])
			!1 !== e.preserveSignature ? e.includeAllExports(!1) : ze(e);
		if (this.options.treeshake) {
			let e = 1;
			do {
				Ni('treeshaking pass ' + e, 3), (this.needsTreeshakingPass = !1);
				for (const e of this.modules)
					e.isExecuted &&
						('no-treeshake' === e.info.hasModuleSideEffects ? e.includeAllInBundle() : e.include());
				ki('treeshaking pass ' + e++, 3);
			} while (this.needsTreeshakingPass);
		} else for (const e of this.modules) e.includeAllInBundle();
		for (const e of this.externalModules) e.warnUnusedImports();
		for (const e of this.implicitEntryModules)
			for (const t of e.implicitlyLoadedAfter) t.info.isEntry || t.isIncluded() || Zt(is(t));
	}
	sortModules() {
		const { orderedModules: e, cyclePaths: t } = (function (e) {
			let t = 0;
			const s = [],
				i = new Set(),
				n = new Set(),
				r = new Map(),
				a = [],
				o = (e) => {
					if (e instanceof Li) {
						for (const t of e.dependencies)
							r.has(t) ? i.has(t) || s.push(wn(t, e, r)) : (r.set(t, e), o(t));
						for (const t of e.implicitlyLoadedBefore) n.add(t);
						for (const { resolution: t } of e.dynamicImports) t instanceof Li && n.add(t);
						a.push(e);
					}
					(e.execIndex = t++), i.add(e);
				};
			for (const t of e) r.has(t) || (r.set(t, null), o(t));
			for (const e of n) r.has(e) || (r.set(e, null), o(e));
			return { orderedModules: a, cyclePaths: s };
		})(this.entryModules);
		for (const e of t)
			this.options.onwarn({
				code: 'CIRCULAR_DEPENDENCY',
				cycle: e,
				importer: e[0],
				message: 'Circular dependency: ' + e.join(' -> ')
			});
		this.modules = e;
		for (const e of this.modules) e.bindReferences();
		this.warnForMissingExports();
	}
	warnForMissingExports() {
		for (const e of this.modules)
			for (const t of Object.keys(e.importDescriptions)) {
				const s = e.importDescriptions[t];
				'*' === s.name ||
					s.module.getVariableForExportName(s.name) ||
					e.warn(
						{
							code: 'NON_EXISTENT_EXPORT',
							message: `Non-existent export '${s.name}' is imported from ${Qt(s.module.id)}`,
							name: s.name,
							source: s.module.id
						},
						s.start
					);
			}
	}
}
function to(e) {
	return Array.isArray(e) ? e.filter(Boolean) : e ? [e] : [];
}
var so = zi($a);
const io = Object.getPrototypeOf || ((e) => e.__proto__);
var no = function (e) {
		if (e.prototype.parsePrivateName) return e;
		const t = ((e) => {
			if (e.acorn) return e.acorn;
			const t = so;
			if (
				0 != t.version.indexOf('6.') &&
				0 == t.version.indexOf('6.0.') &&
				0 != t.version.indexOf('7.')
			)
				throw new Error(
					'acorn-private-class-elements requires acorn@^6.1.0 or acorn@7.0.0, not ' + t.version
				);
			for (let s = e; s && s !== t.Parser; s = io(s))
				if (s !== t.Parser)
					throw new Error(
						'acorn-private-class-elements does not support mixing different acorn copies'
					);
			return t;
		})(e);
		return (
			((e = class extends e {
				_branch() {
					return (
						(this.__branch =
							this.__branch || new e({ ecmaVersion: this.options.ecmaVersion }, this.input)),
						(this.__branch.end = this.end),
						(this.__branch.pos = this.pos),
						(this.__branch.type = this.type),
						(this.__branch.value = this.value),
						(this.__branch.containsEsc = this.containsEsc),
						this.__branch
					);
				}
				parsePrivateClassElementName(e) {
					(e.computed = !1),
						(e.key = this.parsePrivateName()),
						'constructor' == e.key.name &&
							this.raise(e.key.start, 'Classes may not have a private element named constructor');
					const t = { get: 'set', set: 'get' }[e.kind],
						s = this._privateBoundNames;
					return (
						Object.prototype.hasOwnProperty.call(s, e.key.name) &&
							s[e.key.name] !== t &&
							this.raise(e.start, 'Duplicate private element'),
						(s[e.key.name] = e.kind || !0),
						delete this._unresolvedPrivateNames[e.key.name],
						e.key
					);
				}
				parsePrivateName() {
					const e = this.startNode();
					return (
						(e.name = this.value),
						this.next(),
						this.finishNode(e, 'PrivateName'),
						'never' == this.options.allowReserved && this.checkUnreserved(e),
						e
					);
				}
				getTokenFromCode(e) {
					if (35 === e) {
						++this.pos;
						const e = this.readWord1();
						return this.finishToken(this.privateNameToken, e);
					}
					return super.getTokenFromCode(e);
				}
				parseClass(e, t) {
					const s = this._outerPrivateBoundNames;
					(this._outerPrivateBoundNames = this._privateBoundNames),
						(this._privateBoundNames = Object.create(this._privateBoundNames || null));
					const i = this._outerUnresolvedPrivateNames;
					(this._outerUnresolvedPrivateNames = this._unresolvedPrivateNames),
						(this._unresolvedPrivateNames = Object.create(null));
					const n = super.parseClass(e, t),
						r = this._unresolvedPrivateNames;
					if (
						((this._privateBoundNames = this._outerPrivateBoundNames),
						(this._outerPrivateBoundNames = s),
						(this._unresolvedPrivateNames = this._outerUnresolvedPrivateNames),
						(this._outerUnresolvedPrivateNames = i),
						this._unresolvedPrivateNames)
					)
						Object.assign(this._unresolvedPrivateNames, r);
					else {
						const e = Object.keys(r);
						e.length &&
							(e.sort((e, t) => r[e] - r[t]),
							this.raise(r[e[0]], 'Usage of undeclared private name'));
					}
					return n;
				}
				parseClassSuper(e) {
					const t = this._privateBoundNames;
					this._privateBoundNames = this._outerPrivateBoundNames;
					const s = this._unresolvedPrivateNames;
					this._unresolvedPrivateNames = this._outerUnresolvedPrivateNames;
					const i = super.parseClassSuper(e);
					return (this._privateBoundNames = t), (this._unresolvedPrivateNames = s), i;
				}
				parseSubscript(e, s, i, n, r, a) {
					const o = this.options.ecmaVersion >= 11 && t.tokTypes.questionDot,
						h = this._branch();
					if (
						!(h.eat(t.tokTypes.dot) || (o && h.eat(t.tokTypes.questionDot))) ||
						h.type != this.privateNameToken
					)
						return super.parseSubscript.apply(this, arguments);
					let l = !1;
					this.eat(t.tokTypes.dot) || (this.expect(t.tokTypes.questionDot), (l = !0));
					let c = this.startNodeAt(s, i);
					return (
						(c.object = e),
						(c.computed = !1),
						o && (c.optional = l),
						this.type == this.privateNameToken
							? ('Super' == e.type &&
									this.raise(this.start, 'Cannot access private element on super'),
							  (c.property = this.parsePrivateName()),
							  (this._privateBoundNames && this._privateBoundNames[c.property.name]) ||
									(this._unresolvedPrivateNames ||
										this.raise(c.property.start, 'Usage of undeclared private name'),
									(this._unresolvedPrivateNames[c.property.name] = c.property.start)))
							: (c.property = this.parseIdent(!0)),
						this.finishNode(c, 'MemberExpression')
					);
				}
				parseMaybeUnary(e, t) {
					const s = super.parseMaybeUnary(e, t);
					return (
						'delete' == s.operator &&
							'MemberExpression' == s.argument.type &&
							'PrivateName' == s.argument.property.type &&
							this.raise(s.start, 'Private elements may not be deleted'),
						s
					);
				}
			}).prototype.privateNameToken = new t.TokenType('privateName')),
			e
		);
	},
	ro = function (e) {
		const t = (e.acorn || so).tokTypes;
		return (
			(e = no(e)),
			class extends e {
				_maybeParseFieldValue(e) {
					if (this.eat(t.eq)) {
						const s = this._inFieldValue;
						(this._inFieldValue = !0),
							this.type === t.name &&
							'await' === this.value &&
							(this.inAsync || this.options.allowAwaitOutsideFunction)
								? (e.value = this.parseAwait())
								: (e.value = this.parseExpression()),
							(this._inFieldValue = s);
					} else e.value = null;
				}
				parseClassElement(e) {
					if (
						this.options.ecmaVersion >= 8 &&
						(this.type == t.name ||
							this.type.keyword ||
							this.type == this.privateNameToken ||
							this.type == t.bracketL ||
							this.type == t.string ||
							this.type == t.num)
					) {
						const e = this._branch();
						if (e.type == t.bracketL) {
							let s = 0;
							do {
								e.eat(t.bracketL) ? ++s : e.eat(t.bracketR) ? --s : e.next();
							} while (s > 0);
						} else e.next(!0);
						let s = e.type == t.eq || e.type == t.semi;
						if ((!s && e.canInsertSemicolon() && (s = e.type != t.parenL), s)) {
							const e = this.startNode();
							return (
								this.type == this.privateNameToken
									? this.parsePrivateClassElementName(e)
									: this.parsePropertyName(e),
								(('Identifier' === e.key.type && 'constructor' === e.key.name) ||
									('Literal' === e.key.type && 'constructor' === e.key.value)) &&
									this.raise(e.key.start, 'Classes may not have a field called constructor'),
								this.enterScope(67),
								this._maybeParseFieldValue(e),
								this.exitScope(),
								this.finishNode(e, 'FieldDefinition'),
								this.semicolon(),
								e
							);
						}
					}
					return super.parseClassElement.apply(this, arguments);
				}
				parseIdent(e, t) {
					const s = super.parseIdent(e, t);
					return (
						this._inFieldValue &&
							'arguments' == s.name &&
							this.raise(s.start, 'A class field initializer may not contain arguments'),
						s
					);
				}
			}
		);
	};
var ao = function (e) {
		const t = e.acorn || so;
		return (t.version.startsWith('6.') &&
			!(t.version.startsWith('6.0.') || t.version.startsWith('6.1.'))) ||
			t.version.startsWith('7.')
			? (function (e, t) {
					return class extends t {
						readInt(e, t) {
							if (null != t) return super.readInt(e, t);
							let s = this.pos,
								i = 0,
								n = !1;
							for (;;) {
								let t,
									s = this.input.charCodeAt(this.pos);
								if (s >= 97) t = s - 97 + 10;
								else {
									if (95 == s) {
										n || this.raise(this.pos, 'Invalid numeric separator'), ++this.pos, (n = !1);
										continue;
									}
									t = s >= 65 ? s - 65 + 10 : s >= 48 && s <= 57 ? s - 48 : 1 / 0;
								}
								if (t >= e) break;
								++this.pos, (i = i * e + t), (n = !0);
							}
							return this.pos === s
								? null
								: (n || this.raise(this.pos - 1, 'Invalid numeric separator'), i);
						}
						readNumber(t) {
							let s = this.pos;
							t || null !== this.readInt(10) || this.raise(s, 'Invalid number');
							let i = this.pos - s >= 2 && 48 === this.input.charCodeAt(s),
								n = !1;
							i && this.strict && this.raise(s, 'Invalid number');
							let r = this.input.charCodeAt(this.pos);
							if (!i && !t && this.options.ecmaVersion >= 11 && 110 === r) {
								let t = this.getNumberInput(s, this.pos),
									i = 'undefined' != typeof BigInt ? BigInt(t) : null;
								return (
									++this.pos,
									e.isIdentifierStart(this.fullCharCodeAtPos()) &&
										this.raise(this.pos, 'Identifier directly after number'),
									this.finishToken(e.tokTypes.num, i)
								);
							}
							i && /[89]/.test(this.input.slice(s, this.pos)) && ((i = !1), (n = !0)),
								46 !== r ||
									i ||
									(++this.pos, this.readInt(10), (r = this.input.charCodeAt(this.pos))),
								(69 !== r && 101 !== r) ||
									i ||
									((r = this.input.charCodeAt(++this.pos)),
									(43 !== r && 45 !== r) || ++this.pos,
									null === this.readInt(10) && this.raise(s, 'Invalid number')),
								e.isIdentifierStart(this.fullCharCodeAtPos()) &&
									this.raise(this.pos, 'Identifier directly after number');
							let a = this.getNumberInput(s, this.pos);
							(i || n) && a.length < this.pos - s && this.raise(s, 'Invalid number');
							let o = i ? parseInt(a, 8) : parseFloat(a);
							return this.finishToken(e.tokTypes.num, o);
						}
						parseLiteral(e) {
							const t = super.parseLiteral(e);
							return t.bigint && (t.bigint = t.bigint.replace(/_/g, '')), t;
						}
						readRadixNumber(t) {
							let s = this.pos;
							this.pos += 2;
							let i = this.readInt(t);
							if (
								(null == i && this.raise(this.start + 2, 'Expected number in radix ' + t),
								this.options.ecmaVersion >= 11 && 110 === this.input.charCodeAt(this.pos))
							) {
								let e = this.getNumberInput(s, this.pos);
								(i = 'undefined' != typeof BigInt ? BigInt(e) : null), ++this.pos;
							} else
								e.isIdentifierStart(this.fullCharCodeAtPos()) &&
									this.raise(this.pos, 'Identifier directly after number');
							return this.finishToken(e.tokTypes.num, i);
						}
						getNumberInput(e, t) {
							return this.input.slice(e, t).replace(/_/g, '');
						}
					};
			  })(t, e)
			: (function (e, t) {
					return class extends t {
						readInt(e, t) {
							if (null != t) return super.readInt(e, t);
							let s = this.pos,
								i = 0,
								n = !1;
							for (;;) {
								let t,
									s = this.input.charCodeAt(this.pos);
								if (s >= 97) t = s - 97 + 10;
								else {
									if (95 == s) {
										n || this.raise(this.pos, 'Invalid numeric separator'), ++this.pos, (n = !1);
										continue;
									}
									t = s >= 65 ? s - 65 + 10 : s >= 48 && s <= 57 ? s - 48 : 1 / 0;
								}
								if (t >= e) break;
								++this.pos, (i = i * e + t), (n = !0);
							}
							return this.pos === s
								? null
								: (n || this.raise(this.pos - 1, 'Invalid numeric separator'), i);
						}
						readNumber(e) {
							const t = super.readNumber(e);
							let s = this.end - this.start >= 2 && 48 === this.input.charCodeAt(this.start);
							const i = this.getNumberInput(this.start, this.end);
							return (
								i.length < this.end - this.start &&
									(s && this.raise(this.start, 'Invalid number'), (this.value = parseFloat(i))),
								t
							);
						}
						getNumberInput(e, t) {
							return this.input.slice(e, t).replace(/_/g, '');
						}
					};
			  })(0, e);
	},
	oo = function (e) {
		const t = no(e),
			s = (e.acorn || so).tokTypes;
		return class extends t {
			_maybeParseFieldValue(e) {
				if (this.eat(s.eq)) {
					const t = this._inStaticFieldScope;
					(this._inStaticFieldScope = this.currentThisScope()),
						(e.value = this.parseExpression()),
						(this._inStaticFieldScope = t);
				} else e.value = null;
			}
			parseClassElement(e) {
				if (this.options.ecmaVersion < 8 || !this.isContextual('static'))
					return super.parseClassElement.apply(this, arguments);
				const t = this._branch();
				if (
					(t.next(),
					-1 == [s.name, s.bracketL, s.string, s.num, this.privateNameToken].indexOf(t.type) &&
						!t.type.keyword)
				)
					return super.parseClassElement.apply(this, arguments);
				if (t.type == s.bracketL) {
					let e = 0;
					do {
						t.eat(s.bracketL) ? ++e : t.eat(s.bracketR) ? --e : t.next();
					} while (e > 0);
				} else t.next();
				if (t.type != s.eq && !t.canInsertSemicolon() && t.type != s.semi)
					return super.parseClassElement.apply(this, arguments);
				const i = this.startNode();
				return (
					(i.static = this.eatContextual('static')),
					this.type == this.privateNameToken
						? this.parsePrivateClassElementName(i)
						: this.parsePropertyName(i),
					(('Identifier' === i.key.type && 'constructor' === i.key.name) ||
						('Literal' === i.key.type && !i.computed && 'constructor' === i.key.value)) &&
						this.raise(i.key.start, 'Classes may not have a field called constructor'),
					'prototype' !== (i.key.name || i.key.value) ||
						i.computed ||
						this.raise(i.key.start, 'Classes may not have a static property named prototype'),
					this.enterScope(67),
					this._maybeParseFieldValue(i),
					this.exitScope(),
					this.finishNode(i, 'FieldDefinition'),
					this.semicolon(),
					i
				);
			}
			parsePropertyName(e) {
				e.static && this.type == this.privateNameToken
					? this.parsePrivateClassElementName(e)
					: super.parsePropertyName(e);
			}
			parseIdent(e, t) {
				const s = super.parseIdent(e, t);
				return (
					this._inStaticFieldScope &&
						this.currentThisScope() === this._inStaticFieldScope &&
						'arguments' == s.name &&
						this.raise(s.start, 'A static class field initializer may not contain arguments'),
					s
				);
			}
		};
	};
const ho = (e) => console.warn(e.message || e);
function lo(e, t, s, i, n = /$./) {
	const r = new Set(t),
		a = Object.keys(e).filter((e) => !(r.has(e) || n.test(e)));
	a.length > 0 &&
		i({
			code: 'UNKNOWN_OPTION',
			message: `Unknown ${s}: ${a.join(', ')}. Allowed options: ${[...r].sort().join(', ')}`
		});
}
const co = (e) =>
		e.onwarn
			? (t) => {
					(t.toString = () => {
						let e = '';
						return (
							t.plugin && (e += `(${t.plugin} plugin) `),
							t.loc && (e += `${Qt(t.loc.file)} (${t.loc.line}:${t.loc.column}) `),
							(e += t.message),
							e
						);
					}),
						e.onwarn(t, ho);
			  }
			: ho,
	uo = (e) => ({
		allowAwaitOutsideFunction: !0,
		ecmaVersion: 'latest',
		preserveParens: !1,
		sourceType: 'module',
		...e.acorn
	}),
	po = (e) => [ro, oo, ao, ...to(e.acornInjectPlugins)],
	fo = (e) => {
		var t;
		return (null === (t = e.cache) || void 0 === t ? void 0 : t.cache) || e.cache;
	},
	mo = (e) => {
		if (!0 === e) return () => !0;
		if ('function' == typeof e) return (t, ...s) => (!t.startsWith('\0') && e(t, ...s)) || !1;
		if (e) {
			const t = new Set(),
				s = [];
			for (const i of to(e)) i instanceof RegExp ? s.push(i) : t.add(i);
			return (e, ...i) => t.has(e) || s.some((t) => t.test(e));
		}
		return () => !1;
	},
	go = (e, t, s) => {
		const i = e.inlineDynamicImports;
		return (
			i &&
				ls(
					'The "inlineDynamicImports" option is deprecated. Use the "output.inlineDynamicImports" option instead.',
					!1,
					t,
					s
				),
			i
		);
	},
	yo = (e) => {
		const t = e.input;
		return null == t ? [] : 'string' == typeof t ? [t] : t;
	},
	xo = (e, t, s) => {
		const i = e.manualChunks;
		return (
			i &&
				ls(
					'The "manualChunks" option is deprecated. Use the "output.manualChunks" option instead.',
					!1,
					t,
					s
				),
			i
		);
	},
	Eo = (e, t) => {
		const s = e.moduleContext;
		if ('function' == typeof s)
			return (e) => {
				var i;
				return null !== (i = s(e)) && void 0 !== i ? i : t;
			};
		if (s) {
			const e = Object.create(null);
			for (const t of Object.keys(s)) e[We(t)] = s[t];
			return (s) => e[s] || t;
		}
		return () => t;
	},
	vo = (e, t) => {
		const s = e.preserveEntrySignatures;
		return null == s && t.add('preserveEntrySignatures'), null != s ? s : 'strict';
	},
	bo = (e, t, s) => {
		const i = e.preserveModules;
		return (
			i &&
				ls(
					'The "preserveModules" option is deprecated. Use the "output.preserveModules" option instead.',
					!1,
					t,
					s
				),
			i
		);
	},
	So = (e, t, s) => {
		const i = e.treeshake;
		return (
			!1 !== i &&
			(i && !0 !== i
				? (void 0 !== i.pureExternalModules &&
						ls(
							'The "treeshake.pureExternalModules" option is deprecated. The "treeshake.moduleSideEffects" option should be used instead. "treeshake.pureExternalModules: true" is equivalent to "treeshake.moduleSideEffects: \'no-external\'"',
							!0,
							t,
							s
						),
				  {
						annotations: !1 !== i.annotations,
						moduleSideEffects: Ao(i.moduleSideEffects, i.pureExternalModules, t),
						propertyReadSideEffects: !1 !== i.propertyReadSideEffects,
						tryCatchDeoptimization: !1 !== i.tryCatchDeoptimization,
						unknownGlobalSideEffects: !1 !== i.unknownGlobalSideEffects
				  })
				: {
						annotations: !0,
						moduleSideEffects: () => !0,
						propertyReadSideEffects: !0,
						tryCatchDeoptimization: !0,
						unknownGlobalSideEffects: !0
				  })
		);
	},
	Ao = (e, t, s) => {
		if ('boolean' == typeof e) return () => e;
		if ('no-external' === e) return (e, t) => !t;
		if ('function' == typeof e) return (t, s) => !!t.startsWith('\0') || !1 !== e(t, s);
		if (Array.isArray(e)) {
			const t = new Set(e);
			return (e) => t.has(e);
		}
		var i, n;
		e &&
			s(
				((i = 'treeshake.moduleSideEffects'),
				(n = 'please use one of false, "no-external", a function or an array'),
				{ code: ts.INVALID_OPTION, message: `Invalid value for option "${i}" - ${n}.` })
			);
		const r = mo(t);
		return (e, t) => !(t && r(e));
	};
const Po = (e, t, s) => {
		const i = e.file;
		if ('string' == typeof i) {
			if (t)
				return Zt({
					code: 'INVALID_OPTION',
					message:
						'You must set "output.dir" instead of "output.file" when using the "output.preserveModules" option.'
				});
			if (!Array.isArray(s.input))
				return Zt({
					code: 'INVALID_OPTION',
					message: 'You must set "output.dir" instead of "output.file" when providing named inputs.'
				});
		}
		return i;
	},
	Co = (e) => {
		const t = e.format;
		switch (t) {
			case void 0:
			case 'es':
			case 'esm':
			case 'module':
				return 'es';
			case 'cjs':
			case 'commonjs':
				return 'cjs';
			case 'system':
			case 'systemjs':
				return 'system';
			case 'amd':
			case 'iife':
			case 'umd':
				return t;
			default:
				return Zt({
					message:
						'You must specify "output.format", which can be one of "amd", "cjs", "system", "es", "iife" or "umd".',
					url: 'https://rollupjs.org/guide/en/#outputformat'
				});
		}
	},
	No = (e, t) => {
		var s;
		const i =
				(null !== (s = e.inlineDynamicImports) && void 0 !== s ? s : t.inlineDynamicImports) || !1,
			{ input: n } = t;
		return i && (Array.isArray(n) ? n : Object.keys(n)).length > 1
			? Zt({
					code: 'INVALID_OPTION',
					message: 'Multiple inputs are not supported for "output.inlineDynamicImports".'
			  })
			: i;
	},
	ko = (e, t, s) => {
		var i;
		const n = (null !== (i = e.preserveModules) && void 0 !== i ? i : s.preserveModules) || !1;
		if (n) {
			if (t)
				return Zt({
					code: 'INVALID_OPTION',
					message:
						'The "output.inlineDynamicImports" option is not supported for "output.preserveModules".'
				});
			if (!1 === s.preserveEntrySignatures)
				return Zt({
					code: 'INVALID_OPTION',
					message:
						'Setting "preserveEntrySignatures" to "false" is not supported for "output.preserveModules".'
				});
		}
		return n;
	},
	wo = (e) => {
		const t = e.preserveModulesRoot;
		if (null != t) return We(t);
	},
	_o = (e) => ({ define: 'define', ...e.amd }),
	Io = (e, t) => {
		const s = e[t];
		return 'function' == typeof s ? s : () => s || '';
	},
	$o = (e, t) => {
		const s = e.dir;
		return 'string' == typeof s && 'string' == typeof t
			? Zt({
					code: 'INVALID_OPTION',
					message:
						'You must set either "output.file" for a single-file build or "output.dir" when generating multiple chunks.'
			  })
			: s;
	},
	Mo = (e, t) => {
		const s = e.dynamicImportFunction;
		return (
			s &&
				hs(
					'The "output.dynamicImportFunction" option is deprecated. Use the "renderDynamicImport" plugin hook instead.',
					!1,
					t
				),
			s
		);
	},
	To = (e, t) => {
		const s = e.entryFileNames;
		return null == s && t.add('entryFileNames'), null != s ? s : '[name].js';
	};
function Lo(e, t) {
	const s = e.exports;
	if (null == s) t.add('exports');
	else if (!['default', 'named', 'none', 'auto'].includes(s))
		return Zt(
			((i = s),
			{
				code: ts.INVALID_EXPORT_OPTION,
				message: `"output.exports" must be "default", "named", "none", "auto", or left unspecified (defaults to "auto"), received "${i}"`,
				url: 'https://rollupjs.org/guide/en/#outputexports'
			})
		);
	var i;
	return s || 'auto';
}
const Ro = (e, t) => {
		if (t) return '';
		const s = e.indent;
		return !1 === s ? '' : null == s || s;
	},
	Oo = new Set(['auto', 'esModule', 'default', 'defaultOnly', !0, !1]),
	Do = (e, t) => {
		const s = e.interop,
			i = new Set(),
			n = (e) => {
				if (!i.has(e)) {
					if ((i.add(e), !Oo.has(e)))
						return Zt({
							code: 'INVALID_OPTION',
							message: `The value ${JSON.stringify(
								e
							)} is not supported for "output.interop". Use one of ${Array.from(Oo.values(), (e) =>
								JSON.stringify(e)
							).join(', ')} instead.`,
							url: 'https://rollupjs.org/guide/en/#outputinterop'
						});
					'boolean' == typeof e &&
						hs(
							{
								message: `The boolean value "${e}" for the "output.interop" option is deprecated. Use ${
									e ? '"auto"' : '"esModule", "default" or "defaultOnly"'
								} instead.`,
								url: 'https://rollupjs.org/guide/en/#outputinterop'
							},
							!1,
							t
						);
				}
				return e;
			};
		if ('function' == typeof s) {
			const e = Object.create(null);
			let t = null;
			return (i) => (null === i ? t || n((t = s(i))) : i in e ? e[i] : n((e[i] = s(i))));
		}
		return void 0 === s ? () => !0 : () => n(s);
	},
	Vo = (e, t, s, i) => {
		const n = e.manualChunks || i.manualChunks;
		if (n) {
			if (t)
				return Zt({
					code: 'INVALID_OPTION',
					message:
						'The "output.manualChunks" option is not supported for "output.inlineDynamicImports".'
				});
			if (s)
				return Zt({
					code: 'INVALID_OPTION',
					message: 'The "output.manualChunks" option is not supported for "output.preserveModules".'
				});
		}
		return n || {};
	},
	Bo = (e, t, s) => {
		var i;
		return null !== (i = e.minifyInternalExports) && void 0 !== i
			? i
			: s || 'es' === t || 'system' === t;
	};
function Fo(e) {
	return (async function (e, t) {
		const { options: s, unsetOptions: i } = await (async function (e, t) {
			if (!e) throw new Error('You must supply an options object to rollup');
			const s = to(e.plugins),
				{ options: i, unsetOptions: n } = (function (e) {
					var t, s;
					const i = new Set(),
						n = null !== (t = e.context) && void 0 !== t ? t : 'undefined',
						r = co(e),
						a = e.strictDeprecations || !1,
						o = {
							acorn: uo(e),
							acornInjectPlugins: po(e),
							cache: fo(e),
							context: n,
							experimentalCacheExpiry:
								null !== (s = e.experimentalCacheExpiry) && void 0 !== s ? s : 10,
							external: mo(e.external),
							inlineDynamicImports: go(e, r, a),
							input: yo(e),
							manualChunks: xo(e, r, a),
							moduleContext: Eo(e, n),
							onwarn: r,
							perf: e.perf || !1,
							plugins: to(e.plugins),
							preserveEntrySignatures: vo(e, i),
							preserveModules: bo(e, r, a),
							preserveSymlinks: e.preserveSymlinks || !1,
							shimMissingExports: e.shimMissingExports || !1,
							strictDeprecations: a,
							treeshake: So(e, r, a)
						};
					return (
						lo(e, [...Object.keys(o), 'watch'], 'input options', o.onwarn, /^(output)$/),
						{ options: o, unsetOptions: i }
					);
				})(
					await s.reduce(
						(function (e) {
							return async (t, s) =>
								(s.options &&
									s.options.call({ meta: { rollupVersion: '2.33.1', watchMode: e } }, await t)) ||
								t;
						})(t),
						Promise.resolve(e)
					)
				);
			return Wo(i.plugins, 'at position '), { options: i, unsetOptions: n };
		})(e, null !== t);
		Ii(s);
		const n = new eo(s, t),
			r = !1 !== e.cache;
		delete s.cache, delete e.cache, Ni('BUILD', 1);
		try {
			await n.pluginDriver.hookParallel('buildStart', [s]), await n.build();
		} catch (e) {
			const t = Object.keys(n.watchFiles);
			throw (
				(t.length > 0 && (e.watchFiles = t), await n.pluginDriver.hookParallel('buildEnd', [e]), e)
			);
		}
		await n.pluginDriver.hookParallel('buildEnd', []), ki('BUILD', 1);
		const a = {
			cache: r ? n.getCache() : void 0,
			generate: async (e) => Uo(!1, s, i, e, n),
			watchFiles: Object.keys(n.watchFiles),
			write: async (e) => Uo(!0, s, i, e, n)
		};
		s.perf && (a.getTimings = Ci);
		return a;
	})(e, null);
}
function Wo(e, t) {
	for (let s = 0; s < e.length; s++) {
		const i = e[s];
		i.name || (i.name = `${t}${s + 1}`);
	}
}
async function Uo(e, t, s, i, n) {
	const { options: r, outputPluginDriver: a, unsetOptions: o } = (function (e, t, s, i) {
			if (!e) throw new Error('You must supply an options object');
			const n = to(e.plugins);
			Wo(n, 'at output position ');
			const r = t.createOutputPluginDriver(n);
			return { ...zo(s, i, e, r), outputPluginDriver: r };
		})(i, n.pluginDriver, t, s),
		h = new Xn(r, o, t, a, n),
		l = await h.generate(e);
	if (e) {
		if (!r.dir && !r.file)
			return Zt({
				code: 'MISSING_OPTION',
				message: 'You must specify "output.file" or "output.dir" for the build.'
			});
		await Promise.all(
			Object.keys(l).map((e) =>
				(function (e, t) {
					const s = We(t.dir || Ve(t.file), e.fileName);
					let i, n;
					if ('asset' === e.type) n = e.source;
					else if (((n = e.code), t.sourcemap && e.map)) {
						let r;
						'inline' === t.sourcemap
							? (r = e.map.toUrl())
							: ((r = De(e.fileName) + '.map'), (i = Va(s + '.map', e.map.toString()))),
							'hidden' !== t.sourcemap && (n += `//# sourceMappingURL=${r}\n`);
					}
					return Promise.all([Va(s, n), i]);
				})(l[e], r)
			)
		),
			await a.hookParallel('writeBundle', [r, l]);
	}
	return (
		(c = l),
		{
			output: Object.keys(c)
				.map((e) => c[e])
				.filter((e) => Object.keys(e).length > 0)
				.sort((e, t) => {
					const s = Go(e),
						i = Go(t);
					return s === i ? 0 : s < i ? -1 : 1;
				})
		}
	);
	var c;
}
function zo(e, t, s, i) {
	return (function (e, t, s) {
		var i, n, r, a, o, h, l;
		const c = new Set(s),
			u = e.compact || !1,
			d = Co(e),
			p = No(e, t),
			f = ko(e, p, t),
			m = Po(e, f, t),
			g = {
				amd: _o(e),
				assetFileNames:
					null !== (i = e.assetFileNames) && void 0 !== i ? i : 'assets/[name]-[hash][extname]',
				banner: Io(e, 'banner'),
				chunkFileNames: null !== (n = e.chunkFileNames) && void 0 !== n ? n : '[name]-[hash].js',
				compact: u,
				dir: $o(e, m),
				dynamicImportFunction: Mo(e, t),
				entryFileNames: To(e, c),
				esModule: null === (r = e.esModule) || void 0 === r || r,
				exports: Lo(e, c),
				extend: e.extend || !1,
				externalLiveBindings: null === (a = e.externalLiveBindings) || void 0 === a || a,
				file: m,
				footer: Io(e, 'footer'),
				format: d,
				freeze: null === (o = e.freeze) || void 0 === o || o,
				globals: e.globals || {},
				hoistTransitiveImports: null === (h = e.hoistTransitiveImports) || void 0 === h || h,
				indent: Ro(e, u),
				inlineDynamicImports: p,
				interop: Do(e, t),
				intro: Io(e, 'intro'),
				manualChunks: Vo(e, p, f, t),
				minifyInternalExports: Bo(e, d, u),
				name: e.name,
				namespaceToStringTag: e.namespaceToStringTag || !1,
				noConflict: e.noConflict || !1,
				outro: Io(e, 'outro'),
				paths: e.paths || {},
				plugins: to(e.plugins),
				preferConst: e.preferConst || !1,
				preserveModules: f,
				preserveModulesRoot: wo(e),
				sourcemap: e.sourcemap || !1,
				sourcemapExcludeSources: e.sourcemapExcludeSources || !1,
				sourcemapFile: e.sourcemapFile,
				sourcemapPathTransform: e.sourcemapPathTransform,
				strict: null === (l = e.strict) || void 0 === l || l,
				systemNullSetters: e.systemNullSetters || !1
			};
		return lo(e, Object.keys(g), 'output options', t.onwarn), { options: g, unsetOptions: c };
	})(
		i.hookReduceArg0Sync(
			'outputOptions',
			[s.output || s],
			(e, t) => t || e,
			(e) => {
				const t = () =>
					e.error({
						code: ts.CANNOT_EMIT_FROM_OPTIONS_HOOK,
						message:
							'Cannot emit files or set asset sources in the "outputOptions" hook, use the "renderStart" hook instead.'
					});
				return { ...e, emitFile: t, setAssetSource: t };
			}
		),
		e,
		t
	);
}
var jo;
function Go(e) {
	return 'asset' === e.type ? jo.ASSET : e.isEntry ? jo.ENTRY_CHUNK : jo.SECONDARY_CHUNK;
}
!(function (e) {
	(e[(e.ENTRY_CHUNK = 0)] = 'ENTRY_CHUNK'),
		(e[(e.SECONDARY_CHUNK = 1)] = 'SECONDARY_CHUNK'),
		(e[(e.ASSET = 2)] = 'ASSET');
})(jo || (jo = {}));

const CDN_URL = 'https://cdn.jsdelivr.net/npm';
importScripts(`${CDN_URL}/svelte/compiler.js`);

const packages = new Map();
const cache = new Map();
const component_lookup = new Map();

function generate_lookup(components) {
	components.forEach((component) =>
		component_lookup.set(`./${component.name}.${component.type}`, component)
	);
}

self.addEventListener('message', async (event) => {
	generate_lookup(event.data);

	const bundle = await Fo({
		input: './App.svelte',
		plugins: [
			{
				name: 'json',
				transform: (code, id) => {
					if (!id.endsWith('.json')) return;

					return {
						code: `export default ${code};`,
						map: null
					};
				}
			},
			{
				name: 'repl-plugin',
				async resolveId(importee, importer) {
					// import x from svelte or svelte/x
					if (importee.startsWith('svelte')) return `${CDN_URL}/${importee}/index.mjs`;

					// import x from './file
					if (importer && importer.startsWith(`${CDN_URL}/svelte`)) {
						const resolved = new URL(importee, importer).href;
						if (resolved.endsWith('.mjs')) {
							return resolved;
						}
						return `${resolved}/index.mjs`;
					}

					// from local REPL
					if (component_lookup.has(importee)) return importee;
					if (packages.has(importee)) return packages.get(importee);

					// other local import
					if (importee.startsWith('.')) {
						const url = new URL(importee, importer).href;
						packages.set(importee, url);
						return url;
					}

					// from npm
					const pkg_url = `${CDN_URL}/${importee}/package.json`;
					const pkg = await fetch(pkg_url).then((res) => res.json());

					if (pkg.svelte || pkg.module || pkg.main) {
						const base_url = pkg_url.replace(/\/package\.json$/, '');
						const url = new URL(pkg.svelte || pkg.module || pkg.main, `${base_url}/`).href;
						packages.set(importee, url);
						return url;
					}
				},
				async load(id) {
					if (component_lookup.has(id)) return component_lookup.get(id).source;

					if (cache.has(id)) return cache.get(id);

					const code = (await fetch(id)).text();
					cache.set(id, code);

					return code;
				},
				transform(code, id) {
					if (/.*\.svelte/.test(id)) return svelte.compile(code).js.code;
					else return code;
				}
			}
		]
	});
	const output = (await bundle.generate({ format: 'esm' })).output[0].code;

	self.postMessage(output);
});
//# sourceMappingURL=worker.js.map
