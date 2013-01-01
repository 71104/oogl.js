uniform vec2 Angle;

attribute vec3 in_Vertex;
attribute vec2 in_TexCoord;

varying vec2 ex_TexCoord;

void main() {
	gl_Position = mat4(
		2, 0, 0, 0,
		0, 2, 0, 0,
		0, 0, 0, 1,
		0, 0, 1, 2
	) * mat4(
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
	ex_TexCoord = in_TexCoord;
}
