precision mediump float;

uniform sampler2D Texture;

varying vec3 ex_Color;
varying vec2 ex_TexCoord;

void main() {
	gl_FragColor = texture2D(Texture, ex_TexCoord) * vec4(ex_Color, 1);
}
