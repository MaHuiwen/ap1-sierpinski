export const vertexShaderSource = `#version 300 es
precision highp float;
in vec2 aPosition;
uniform mat3 uTransform;
void main(){
    vec3 p = uTransform * vec3(aPosition, 1.0);
    gl_Position = vec4(p.xy, 0.0, 1.0);
}
`;

export const fragmentShaderSource = `#version 300 es
precision highp float;
uniform vec3 uColor;
out vec4 fragColor;
void main(){
    fragColor = vec4(uColor,1.0);
}
`;
