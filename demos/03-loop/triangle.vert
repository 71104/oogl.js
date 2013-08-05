uniform float Angle;

attribute vec2 in_Vertex;
attribute vec3 in_Color;

varying vec3 ex_Color;

void main() {
	gl_Position = mat4(
		2, 0, 0, 0,
		0, 2.66, 0, 0,
		0, 0, 0, 1,
		0, 0, 1, 2
	) * mat4(
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		0, 0, 2, 1
	) * mat4(
		cos(Angle), 0, sin(Angle), 0,
		0, 1, 0, 0,
		-sin(Angle), 0, cos(Angle), 0,
		0, 0, 0, 1
	) * vec4(in_Vertex, 0, 1);
	ex_Color = in_Color;
}
