# AP1 交互式2D分形 - 谢尔宾斯基垫片
> WebGL2实现，课程AP1作业

## 运行方式
本项目为Web网页项目，**不能直接双击index.html打开**，会出现跨域报错。
1. 使用静态Web服务器运行，例如VSCode Live Server，或者Python内置http.server。
2. 浏览器访问服务地址即可运行。

## 实现要点
### 两种分形生成算法
1. **混沌游戏算法（Chaos Game）**
给定三角形三个固定顶点，生成一个随机初始点。循环迭代：随机选取三角形其中一个顶点，新点 = (当前点 + 选中顶点)/2。不断迭代生成大量采样点，使用`gl.POINTS`渲染形成谢尔宾斯基垫片图形，支持点数从0逐步增长的动画。

2. **递归细分算法 subdivide(triangle, depth)**
输入三角形与递归深度depth。
- 递归终止条件 depth = 0，直接输出三角形顶点；
- depth>0，计算三角形三边中点，分割为4个更小子三角形，对子三角形递归调用subdivide。
支持三种渲染图元：`gl.POINTS`点云、`gl.LINES`线框、`gl.TRIANGLES`实体填充。递归深度范围0‑6。

### 交互操作说明
1. HTML控制面板
- 最大点数：控制混沌游戏生成点的总数量；
- 递归深度：控制细分模式递归等级；
- 点大小：调整点云绘制点的尺寸；
- 配色方案：3套配色切换；
- 按钮切换三种渲染模式。

2. 鼠标交互
- 左键按住拖拽：平移整个分形图形；
- 鼠标滚轮：缩放视图。

3. 键盘交互
- `1`：点云模式；`2`：线框模式；`3`：实体填充模式；
- `空格`：暂停 / 继续逐点生长动画。

## 截图
- screenshot‑points.png：点云POINTS渲染模式
- screenshot‑lines.png：线框LINES渲染模式
- screenshot‑triangles.png：实体TRIANGLES渲染模式

## 引用说明
使用教材《Interactive Computer Graphics》配套Common库：`initShaders.js`、`MV.js`、`webgl‑utils.js`；算法参考教材Ch2‑Ch3章节。代码独立实现。

## 选做扩展
本版本保留n边形混沌游戏函数骨架，可继续扩展实现加分项E1。
