import {appState} from "./main.js";

export function initUI(){
    //点数滑块
    const pointSlider = document.getElementById("pointCount");
    const pointValSpan = document.getElementById("pointCountVal");
    pointSlider.oninput = function(){
        appState.maxPointCount = Number(this.value);
        pointValSpan.innerText = this.value;
        appState.currentPointCount=0; //重置动画从0开始生长
    };

    //递归深度
    const depthSlider = document.getElementById("depthSlider");
    const depthValSpan = document.getElementById("depthVal");
    depthSlider.oninput = function(){
        appState.recursionDepth = Number(this.value);
        depthValSpan.innerText = this.value;
    };

    //点大小
    document.getElementById("pointSize").oninput = function(){
        appState.pointSize = Number(this.value);
    };

    //配色
    document.getElementById("colorScheme").onchange = function(){
        appState.colorScheme = Number(this.value);
    };

    //渲染模式按钮
    document.getElementById("modePoints").onclick = ()=>{appState.renderMode=0;};
    document.getElementById("modeLines").onclick = ()=>{appState.renderMode=1;};
    document.getElementById("modeTriangles").onclick = ()=>{appState.renderMode=2;};
}
