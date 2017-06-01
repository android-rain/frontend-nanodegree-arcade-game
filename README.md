# 经典游戏练习
控制`上、下、左、右`键，移动小人通过机动车道，到达蓝色的水里，就算赢。不能和忙碌的甲壳虫汽车相撞，否则判输，游戏重新开始。
## 代码说明
1. 在engine.js中实现两个函数：`checkCollisions()`和`checkPlayerWin()`,用来检测碰撞和到达河岸；
2. 在engine.js中完善两个函数: `update()`和`reset()`,用来在网页中更新结果和重置游戏；
3. 在app.js中创建player伪类并实现其`update()`和`handleInput()`方法；
4. 在app.js中实例化1个player和5个enemy，其中enemy的起始位置和速度通过`random()`随机赋值。
## 安装
下载代码，可在浏览器内直接运行。
## 依赖
无
## Liscence
[MIT](https://choosealicense.com/licenses/mit/)
