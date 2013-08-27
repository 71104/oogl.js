precision mediump float;

uniform float Offset;
uniform vec2 Angle;

attribute vec3 in_Vertex;
attribute vec3 in_Color;

varying vec3 ex_Color;

void main() {
	gl_Position = mat4(
		1, 0, 0, 0,
		0, 1.33, 0, 0,
		0, 0, 0, 1,
		0, 0, 1, 1
	) * mat4(
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		Offset, 0, 3, 1
	) * mat4(
		1, 0, 0, 0,
		0, cos(Angle.x), -sin(Angle.x), 0,
		0, sin(Angle.x), cos(Angle.x), 0,
		0, 0, 0, 1
	) * mat4(
		cos(Angle.y), 0, sin(Angle.y), 0,
		0, 1, 0, 0,
		-sin(Angle.y), 0, cos(Angle.y), 0,
		0, 0, 0, 1
	) * vec4(in_Vertex, 1);
	ex_Color = in_Color;
}
