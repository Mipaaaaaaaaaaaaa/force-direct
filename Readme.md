### 力引导布局算法

力引导算法采用多种力对节点的作用，使得该节点的位置趋向于稳定平衡。当整个系统的每个节点都处于它的平衡位置时，图像会看起来更加美观。本算法采用库伦力（斥力）及胡克力（引力）进行简单实现。

力引导算法的实现步骤为：

1. 计算受力导致的位移
2. 更新位置
3. 重复1、2直到迭代至平衡态

### force.js

该文件实现了力引导布局算法的核心代码，包括：

1. `function force（node,link,width,length）`

   该函数实现了力引导布局中对库伦斥力、胡克引力的位移计算，在每次调用时执行一次胡克引力、库伦斥力的计算，并更新计算后的位置，详细实现情况请见代码及注释。

2. `function initial (node, width,length)`

   该函数应当在页面创建时被调用，初始化各个节点的位置。

此外，可以通过对常量 `CouLomb` 、`Hooke` 、`r` 、`L`的修改满足不同的设计需求，其中 `CouLomb` 为库伦常量，增加使得节点间斥力变大；`Hooke` 为胡克常量，增加使得连线间两节点吸引力变大；`L` 为连线节点的最佳距离，增加使得节点间距离变大；`r`为节点半径，根据你指定的节点半径大小而改变，防止节点碰撞到边界。

### force-direct.html

该文件调用了d3库使用svg进行节点及连线的绘制，以及对拖拽事件的函数实现，调用自制库force.js实现了节点位置的初始化，以及对节点力引导位置变化的计算及更新。详细实现情况请见代码及注释。

### 实现效果

1. 初始化页面时位置

![image-20191118165444687](/Users/jeanne/Library/Application Support/typora-user-images/image-20191118165444687.png)

2. 稳定后位置（约2s后）

![image-20191118165553713](/Users/jeanne/Library/Application Support/typora-user-images/image-20191118165553713.png)

3. 拖拽边节点

![image-20191118165730163](/Users/jeanne/Library/Application Support/typora-user-images/image-20191118165730163.png)

在更改了布局之后，图像经过迭代变换，达到了趋于稳定的位置后停止了变换。