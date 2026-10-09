// MV.js
function vec2(x, y) {
    if(Array.isArray(x)) return new Float32Array(x);
    return new Float32Array([x, y]);
}
function vec3(x, y, z) {
    if(Array.isArray(x)) return new Float32Array(x);
    return new Float32Array([x, y, z]);
}
function vec4(x, y, z, w) {
    if(Array.isArray(x)) return new Float32Array(x);
    return new Float32Array([x, y, z, w]);
}
function mat3() {
    if(arguments.length === 0) return new Float32Array([1,0,0, 0,1,0, 0,0,1]);
    return new Float32Array(arguments);
}
function mat4() {
    if(arguments.length === 0) return new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]);
    return new Float32Array(arguments);
}
function flatten(a) {
    return new Float32Array(a);
}
function mult(a,b) {
    if(typeof a === 'number'){
        let res = [];
        for(let i=0;i<b.length;i++) res.push(a*b[i]);
        return vec2(res);
    }
    if(b.length === 2 && a.length ===9){
        let x = a[0]*b[0]+a[1]*b[1]+a[2];
        let y = a[3]*b[0]+a[4]*b[1]+a[5];
        return vec2(x,y);
    }
    return b;
}
function add(u,v){
    return vec2(u[0]+v[0], u[1]+v[1]);
}
function translate(x,y){
    return mat3(1,0,0, 0,1,0, x,y,1);
}
function scale(x,y){
    return mat3(x,0,0, 0,y,0, 0,0,1);
}
