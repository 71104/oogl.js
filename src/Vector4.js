/*global OOGL: false */

OOGL.Vector4 = function (x, y, z, w) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.w = w;
};

OOGL.Vector4.prototype = {
	toStandard: function () {
		return new OOGL.Vector3(this.x / this.w, this.y / this.w, this.z / this.w);
	}
};
