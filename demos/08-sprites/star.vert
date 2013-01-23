uniform float Spin;
uniform vec2 Angle;

attribute vec2 in_Vertex;
attribute vec2 in_Center;
attribute float in_Angle;
attribute vec3 in_Color;
attribute vec2 in_TexCoord;

varying vec3 ex_Color;
varying vec2 ex_TexCoord;

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
		0, 0, 1, 1
	) * mat4(
		cos(Spin), sin(Spin), 0, 0,
		-sin(Spin), cos(Spin), 0, 0,
		0, 0, 1, 0,
		0, 0, 0, 1
	) * mat4(
		1, 0, 0, 0,
		0, cos(Angle.y), sin(Angle.y), 0,
		0, -sin(Angle.y), cos(Angle.y), 0,
		0, 0, 0, 1
	) * mat4(
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		in_Center, 0, 1
	) * mat4(
		cos(in_Angle + Angle.x), sin(in_Angle + Angle.x), 0, 0,
		-sin(in_Angle + Angle.x), cos(in_Angle + Angle.x), 0, 0,
		0, 0, 1, 0,
		0, 0, 0, 1
	) * vec4(in_Vertex / 5.0, 0, 1);
	ex_Color = in_Color;
	ex_TexCoord = in_TexCoord;
}
