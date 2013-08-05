precision mediump float;

uniform sampler2D Texture;

varying vec2 ex_TexCoord;

void main() {
	gl_FragColor = texture2D(Texture, ex_TexCoord);
}
