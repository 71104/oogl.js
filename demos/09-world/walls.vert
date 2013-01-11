uniform struct {
	vec2 Angle;
	vec2 Position;
} Camera;

attribute vec3 in_Vertex;
attribute vec2 in_TexCoord;

varying vec2 ex_TexCoord;

void main() {
	gl_Position = mat4(
		1, 0, 0, 0,
		0, 1.33, 0, 0,
		0, 0, 0, 1,
		0, 0, 0.1, 0
	) * mat4(
		1, 0, 0, 0,
		0, cos(Camera.Angle.y), -sin(Camera.Angle.y), 0,
		0, sin(Camera.Angle.y), cos(Camera.Angle.y), 0,
		0, 0, 0, 1
	) * mat4(
		cos(Camera.Angle.x), 0, -sin(Camera.Angle.x), 0,
		0, 1, 0, 0,
		sin(Camera.Angle.x), 0, cos(Camera.Angle.x), 0,
		0, 0, 0, 1
	) * mat4(
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		-Camera.Position.x, -0.5, -Camera.Position.y, 1
	) * vec4(in_Vertex, 1);
	ex_TexCoord = in_TexCoord;
}
