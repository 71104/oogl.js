attribute vec2 in_Vertex;
attribute vec3 in_Color;

varying vec3 ex_Color;

void main() {
	gl_Position = vec4(in_Vertex, 0, 2);
	ex_Color = in_Color;
}
