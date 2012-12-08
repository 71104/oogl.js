OOGL.Vector3 = function (x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;
};

OOGL.Vector3.prototype = {
	length: function () {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	},
	normalize: function () {
		var length = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
		this.x /= length;
		this.y /= length;
		this.z /= length;
		return this;
	},
	getNormal: function () {
		var length = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
		return new OOGL.Vector3(this.x / length, this.y / length, this.z / length);
	},
	add: function (v) {
		this.x += v.x;
		this.y += v.y;
		this.z += v.z;
		return this;
	},
	plus: function (v) {
		return new OOGL.Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
	},
	subtract: function (v) {
		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;
		return this;
	},
	minus: function (v) {
		return new OOGL.Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
	},
	multiply: function (f) {
		this.x *= f;
		this.y *= f;
		this.z *= f;
		return this;
	},
	divide: function (f) {
		this.x /= f;
		this.y /= f;
		this.z /= f;
		return this;
	},
	by: function (f) {
		return new OOGL.Vector3(this.x * f, this.y * f, this.z * f);
	},
	dot: function (v) {
		return this.x * v.x + this.y * v.y + this.z * v.z;
	},
	cross: function (v) {
		var x = this.y * v.z - this.z * v.y;
		var y = this.z * v.x - this.x * v.z;
		var z = this.x * v.y - this.y * v.x;
		this.x = x;
		this.y = y;
		this.z = z;
		return this;
	},
	getCrossProduct: function (v) {
		return new OOGL.Vector3(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x);
	},
	reflect: function (n) {
		var dot = this.x * n.x + this.y * n.y + this.z * v.z;
		this.x -= 2 * dot * n.x;
		this.y -= 2 * dot * n.y;
		this.z -= 2 * dot * n.z;
		return this;
	},
	getReflected: function (n) {
		var dot = this.x * n.x + this.y * n.y + this.z * v.z;
		return new OOGL.Vector3(this.x - 2 * dot * n.x, this.y - 2 * dot * n.y, this.z - 2 * dot * n.z);
	},
	refract: function (n, eta) {
		var dot = this.x * n.x + this.y * n.y + this.z * v.z;
		var k = 1 - eta * eta * (1 - dot * dot);
		if (k < 0) {
			this.x = 0;
			this.y = 0;
			this.z = 0;
		} else {
			this.x = eta * this.x - (eta * dot + sqrt(k)) * n.x;
			this.y = eta * this.y - (eta * dot + sqrt(k)) * n.y;
			this.z = eta * this.z - (eta * dot + sqrt(k)) * n.z;
		}
		return this;
	},
	getRefracted: function (n, eta) {
		var dot = this.x * n.x + this.y * n.y + this.z * v.z;
		var k = 1 - eta * eta * (1 - dot * dot);
		if (k < 0) {
			return OOGL.Vector3.NULL;
		} else {
			return new OOGL.Vector3(eta * this.x - (eta * dot + sqrt(k)) * n.x, eta * this.y - (eta * dot + sqrt(k)) * n.y, eta * this.z - (eta * dot + sqrt(k)) * n.z);
		}
	}
};

OOGL.Vector3.NULL = new OOGL.Vector3(0, 0, 0);
OOGL.Vector3.I = new OOGL.Vector3(1, 0, 0);
OOGL.Vector3.J = new OOGL.Vector3(0, 1, 0);
OOGL.Vector3.K = new OOGL.Vector3(0, 0, 1);
