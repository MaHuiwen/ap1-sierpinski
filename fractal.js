// 谢尔宾斯基基础三角形，标准化在[-1,1]NDC坐标系
const baseTriangle = [
    vec2(-1.0, -0.8),
    vec2( 1.0, -0.8),
    vec2( 0.0,  0.8)
];

/**
 * 混沌游戏生成点数组
 * @param {number} count 总点数
 * @returns {Float32Array} 顶点数组
 */
export function chaosGame(count){
    const verts = [];
    //初始随机点
    let p = vec2(Math.random()*2-1, Math.random()*2-1);
    const vertices = [...baseTriangle];
    for(let i=0; i<count; i++){
        const idx = Math.floor(Math.random()*3);
        const v = vertices[idx];
        p = mult(0.5, add(p, v));
        verts.push(p[0], p[1]);
    }
    return new Float32Array(verts);
}

/**
 * 递归细分
 * @param {Array} tri [v0,v1,v2] 三个vec2
 * @param {number} depth
 * @param {Array} output 输出顶点数组
 */
function subdivide(tri, depth, output){
    const [a,b,c] = tri;
    if(depth <=0){
        output.push(a[0],a[1]);
        output.push(b[0],b[1]);
        output.push(c[0],c[1]);
        return;
    }
    //三边中点
    const ab = mult(0.5, add(a,b));
    const bc = mult(0.5, add(b,c));
    const ca = mult(0.5, add(c,a));
    //4个子三角形递归
    subdivide([a,ab,ca], depth-1, output);
    subdivide([ab,b,bc], depth-1, output);
    subdivide([ca,bc,c], depth-1, output);
    subdivide([ab,bc,ca], depth-1, output);
}

/**
 * 调用递归细分获取顶点
 * @param {number} depth
 * @returns {Float32Array}
 */
export function getSubdivideVertices(depth){
    const buf = [];
    subdivide(baseTriangle, depth, buf);
    return new Float32Array(buf);
}
