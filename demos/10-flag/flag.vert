uniform vec3 Angle;
uniform float Step;

attribute vec2 in_Vertex;

varying vec2 ex_TexCoord;

void main() {
	gl_Position = mat4(
		1, 0, 0, 0,
		0, 1.33, 0, 0,
		0, 0, 0, 1,
		0, 0, 0.1, 0
	) * mat4(
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		0, 0, 2, 1
	) * mat4(
		cos(Angle.z), -sin(Angle.z), 0, 0,
		sin(Angle.z), cos(Angle.z), 0, 0,
		0, 0, 1, 0,
		0, 0, 0, 1
	) * mat4(
		cos(Angle.y), 0, -sin(Angle.y), 0,
		0, 1, 0, 0,
		sin(Angle.y), 0, cos(Angle.y), 0,
		0, 0, 0, 1
	) * mat4(
		1, 0, 0, 0,
		0, cos(Angle.x), -sin(Angle.x), 0,
		0, sin(Angle.x), cos(Angle.x), 0,
		0, 0, 0, 1
	) * vec4(in_Vertex * 2.0 - vec2(1), sin(in_Vertex.x * (Step / 45.0) * acos(-1.0) * 2.0) * 0.3, 1);
	ex_TexCoord = vec2(in_Vertex.x, 1.0 - in_Vertex.y);
}
