uniform float Angle;

attribute vec2 in_Vertex;
attribute vec3 in_Color;
attribute vec2 in_TexCoord;

varying vec3 ex_Color;
varying vec2 ex_TexCoord;

void main() {
	gl_Position = mat4(
		1, 0, 0, 0,
		0, cos(Angle), sin(Angle), 0,
		0, -sin(Angle), cos(Angle), 0,
		0, 0, 0, 1
	) * vec4(in_Vertex, 0, 1);
	ex_Color = in_Color;
	ex_TexCoord = in_TexCoord;
}
