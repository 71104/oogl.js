uniform float Zoom;
uniform vec2 Angle;

attribute vec3 in_Vertex;
attribute vec2 in_TexCoord;

varying vec4 ex_Vertex;
varying vec2 ex_TexCoord;

void main() {
	ex_Vertex = mat4(
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		0, 0, 3, 1
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
	gl_Position = mat4(
		2.0 * Zoom, 0, 0, 0,
		0, 2.66 * Zoom, 0, 0,
		0, 0, 0, 1,
		0, 0, 1, 2
	) * ex_Vertex;
	ex_TexCoord = in_TexCoord;
}
