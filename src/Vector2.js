OOGL.Vector2 = function (x, y) {
	this.x = x;
	this.y = y;
};

OOGL.Vector2.prototype = {
	length: function () {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	},
	normalize: function () {
		var length = Math.sqrt(this.x * this.x + this.y * this.y);
		this.x /= length;
		this.y /= length;
		return this;
	},
	getNormal: function () {
		var length = Math.sqrt(this.x * this.x + this.y * this.y);
		return new OOGL.Vector2(this.x / length, this.y / length);
	},
	add: function (v) {
		this.x += v.x;
		this.y += v.y;
		return this;
	},
	plus: function (v) {
		return new OOGL.Vector2(this.x + v.x, this.y + v.y);
	},
	subtract: function (v) {
		this.x -= v.x;
		this.y -= v.y;
		return this;
	},
	minus: function (v) {
		return new OOGL.Vector2(this.x - v.x, this.y - v.y);
	},
	multiply: function (f) {
		this.x *= f;
		this.y *= f;
		return this;
	},
	divide: function (f) {
		this.x /= f;
		this.y /= f;
		return this;
	},
	by: function (f) {
		return new OOGL.Vector2(this.x * f, this.y * f);
	},
	dot: function (v) {
		return this.x * v.x + this.y * v.y;
	},
	reflect: function (n) {
		var dot = this.x * n.x + this.y * n.y;
		this.x -= 2 * dot * n.x;
		this.y -= 2 * dot * n.y;
		return this;
	},
	getReflected: function (n) {
		var dot = this.x * n.x + this.y * n.y;
		return new OOGL.Vector2(this.x - 2 * dot * n.x, this.y - 2 * dot * n.y);
	},
	refract: function (n, eta) {
		var dot = this.x * n.x + this.y * n.y;
		var k = 1 - eta * eta * (1 - dot * dot);
		if (k < 0) {
			this.x = 0;
			this.y = 0;
		} else {
			this.x = eta * this.x - (eta * dot + sqrt(k)) * n.x;
			this.y = eta * this.y - (eta * dot + sqrt(k)) * n.y;
		}
		return this;
	},
	getRefracted: function (n, eta) {
		var dot = this.x * n.x + this.y * n.y;
		var k = 1 - eta * eta * (1 - dot * dot);
		if (k < 0) {
			return OOGL.Vector2.NULL;
		} else {
			return new OOGL.Vector2(eta * this.x - (eta * dot + sqrt(k)) * n.x, eta * this.y - (eta * dot + sqrt(k)) * n.y);
		}
	}
};

OOGL.Vector2.NULL = new OOGL.Vector2(0, 0);
OOGL.Vector2.I = new OOGL.Vector2(1, 0);
OOGL.Vector2.J = new OOGL.Vector2(0, 1);
