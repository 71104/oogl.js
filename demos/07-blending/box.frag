precision mediump float;

uniform sampler2D Texture;

varying vec4 ex_Vertex;
varying vec2 ex_TexCoord;

void main() {
	vec3 Color = vec3(texture2D(Texture, ex_TexCoord)) / pow(length(vec3(ex_Vertex) / ex_Vertex.w) - 0.7, 1.3);
	gl_FragColor = vec4(Color, 1);
}
