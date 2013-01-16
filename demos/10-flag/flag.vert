uniform float Step;
uniform vec3 Angle;

attribute vec2 in_Vertex;

varying vec2 ex_TexCoord;

void main() {
	gl_Position = mat4(
		1, 0, 0, 0,
		0, 1.33, 0, 0,
		0, 0, 0, 1,
		0, 0, 1, 0
	) * vec4(in_Vertex * 2.0 - vec2(1), sin(in_Vertex.x * acos(-1.0) * 2.0), 1);
	ex_TexCoord = in_Vertex;
}
