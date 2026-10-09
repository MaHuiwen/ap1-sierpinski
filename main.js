import {chaosGame, getSubdivideVertices} from "./fractal.js";
import {initUI} from "./ui.js";

// ========== Shader源码 ==========
const vertexShaderSource = `#version 300 es
precision highp float;
in vec2 aPosition;
uniform mat3 uTransform;
uniform float uPointSize;
void main(){
    vec3 p = uTransform * vec3(aPosition, 1.0);
    gl_Position = vec4(p.xy, 0.0, 1.0);
    gl_PointSize = uPointSize;
}
`;

const fragmentShaderSource = `#version 300 es
precision highp float;
uniform vec3 uColor;
out vec4 fragColor;
void main(){
    fragColor = vec4(uColor,1.0);
}
`;
// ===============================================================

let gl;
let program;

//全局状态
export let appState = {
    renderMode:0, //0 POINTS 1 LINES 2 TRIANGLES
    maxPointCount:8000,
    currentPointCount:0,
    recursionDepth:3,
    pointSize:2,
    colorScheme:0,
    animPaused:false,

    scale:1.0,
    offsetX:0.0,
    offsetY:0.0,

    drag:false,
    lastMouseX:0,
    lastMouseY:0
};

//配色
export const colorPalettes = [
    [1,1,1],        //白色
    [0.3,0.2,0.9],  //蓝紫
    [0.1,0.9,0.8]   //青
];

window.onload = main;
async function main(){
    const canvas = document.getElementById("glcanvas");
    gl = canvas.getContext("webgl2");
    if(!gl){ alert("浏览器不支持WebGL2"); return; }

    program = initShaders(gl, vertexShaderSource, fragmentShaderSource);
    gl.useProgram(program);

    appState.loc_aPosition = gl.getAttribLocation(program, "aPosition");
    appState.loc_uTransform = gl.getUniformLocation(program, "uTransform");
    appState.loc_uColor = gl.getUniformLocation(program, "uColor");
    appState.loc_uPointSize = gl.getUniformLocation(program, "uPointSize");

    appState.vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, appState.vbo);

    canvas.onmousedown = (ev)=>{
        appState.drag=true;
        appState.lastMouseX = ev.clientX;
        appState.lastMouseY = ev.clientY;
    };
    canvas.onmouseup = ()=> appState.drag=false;
    canvas.onmousemove = handleMouseMove;
    canvas.onwheel = handleMouseWheel;

    window.onkeydown = handleKeyDown;

    initUI();

    requestAnimationFrame(renderLoop);
}

function handleMouseMove(ev){
    if(!appState.drag) return;
    const dx = ev.clientX - appState.lastMouseX;
    const dy = ev.clientY - appState.lastMouseY;
    const pxToNdc = 2.0 / 600.0 / appState.scale;
    appState.offsetX += dx * pxToNdc;
    appState.offsetY -= dy * pxToNdc;
    appState.lastMouseX = ev.clientX;
    appState.lastMouseY = ev.clientY;
}

function handleMouseWheel(ev){
    ev.preventDefault();
    const factor = ev.deltaY>0 ? 0.95 : 1.05;
    appState.scale *= factor;
}

function handleKeyDown(e){
    switch(e.key){
        case '1': appState.renderMode=0; break;
        case '2': appState.renderMode=1; break;
        case '3': appState.renderMode=2; break;
        case ' ':
            e.preventDefault();
            appState.animPaused = !appState.animPaused;
            break;
    }
}

function renderLoop(){
    gl.clearColor(0,0,0,1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    let trans = mat3();
    trans = mult(trans, translate(appState.offsetX, appState.offsetY));
    trans = mult(trans, scale(appState.scale, appState.scale));
    gl.uniformMatrix3fv(appState.loc_uTransform, false, flatten(trans));

    const c = colorPalettes[appState.colorScheme];
    gl.uniform3fv(appState.loc_uColor, c);
    gl.uniform1f(appState.loc_uPointSize, appState.pointSize);

    if(!appState.animPaused){
        appState.currentPointCount = Math.min(appState.currentPointCount+15, appState.maxPointCount);
    }

    let vertexData;
    if(appState.renderMode ===0){
        vertexData = chaosGame(appState.currentPointCount);
    }else{
        vertexData = getSubdivideVertices(appState.recursionDepth);
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, appState.vbo);
    gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.DYNAMIC_DRAW);

    gl.enableVertexAttribArray(appState.loc_aPosition);
    gl.vertexAttribPointer(appState.loc_aPosition, 2, gl.FLOAT, false, 0, 0);

    const n = vertexData.length / 2;
    switch(appState.renderMode){
        case 0:
            gl.drawArrays(gl.POINTS, 0, n);
            break;
        case 1:
            gl.drawArrays(gl.LINES,0,n);
            break;
        case 2:
            gl.drawArrays(gl.TRIANGLES,0,n);
            break;
    }

    requestAnimationFrame(renderLoop);
}
