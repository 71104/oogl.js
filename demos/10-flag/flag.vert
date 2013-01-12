attribute vec3 in_Vertex;
attribute vec2 in_TexCoord;

varying vec2 ex_TexCoord;

void main() {
	gl_Position = mat4(
		1, 0, 0, 0,
		0, 1.33, 0, 0,
		0, 0, 0, 1,
		0, 0, 1, 0
	) * vec4(in_Vertex, 1);
	ex_TexCoord = in_TexCoord;
}
