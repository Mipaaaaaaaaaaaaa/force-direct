const Coulomb = 4000; //库伦斥力系数
const Hooke = 0.003;  //胡克引力系数
const r = 15;   //防碰撞窗口边缘检测
const L = 30;   //弹簧原形变量

function force(node, link, width, length) {
    let q = 1; //未使用，可加入node参数为node加权计算
    let result = node; //声明返回对象

    repulsion(); //计算斥力位移
    attraction();//计算引力位移
    update();   //更新节点位置

    //由主函数传入node数组，对点遍历计算斥力
    //根据公式 F=kr/r^2 && x=Ft
    //分别求得在x、y方向的Fx和Fy分力
    //即 Fx=F*distX/distAll
    //设时间变量为1
    //则可得 dx=distX*k/distAll^3
    //同理 dy=distY*k/distAll^3
    //对每个节点都要遍历其他的节点来更新它的 dx
    function repulsion(){
        for (let u in result) {
            for(let v in result){
                    let distX = result[u].x - result[v].x;
                    let distY = result[u].y - result[v].y;
                    let distAll = Math.sqrt( distX*distX + distY*distY );
                    if( u != v ) {
                        result[u].dx += distX * Coulomb / (distAll*distAll*distAll);
                        result[u].dy += distY * Coulomb / (distAll*distAll*distAll);
                        //console.log(result[u].dx);
                    }
                }
            }
        }

    //由主函数传入link数组，对边遍历计算引力
    //根据公式F=k(d - L) 其中L为原长，k为常量，d为当前距离
    //同样对不同方向的F进行分量，得Fx和Fy
    //同样根据x=Ft，得
    //在x方向上 dx= k*(distAll-L)*distX/distAll
    //在y方向上 dy= k*(distAll-l)*distY/distAll
    //对出发点，减去这个力的位移（一般向到达点移动）
    //对到达点，加上这个力的位移（一般向出发点移动）
    function attraction(){
        for (let l in link) {
            //console.log(l);
            let distX = result[link[l].source].x - result[link[l].target].x;
            let distY = result[link[l].source].y - result[link[l].target].y;
            let distAll = Math.sqrt( distX*distX + distY*distY );
            result[link[l].source].dx -=  Hooke * (distAll - L) * distX / distAll;
            result[link[l].source].dy -=  Hooke * (distAll - L) * distY / distAll;
            result[link[l].target].dx +=  Hooke * (distAll - L) * distX / distAll;
            result[link[l].target].dy +=  Hooke * (distAll - L) * distY / distAll;
            console.log(result[link[l].source].dx);
        }
    }

    //更新节点位置
    //保证节点每次更新的位置都在显示范围之内
    function update(){
        for(let v in result) {
            result[v].x = result[v].x + result[v].dx >= width - r || result[v].x + result[v].dx <= r ?
                result[v].x - result[v].dx : result[v].x + result[v].dx; //防止越界
            result[v].y = result[v].y + result[v].dy >= width - r || result[v].y + result[v].dy <= r ?
                result[v].y - result[v].dy : result[v].y + result[v].dy; //防止越界
            result[v].dx = 0; //重置位移dx
            result[v].dy = 0; //重置位移dy
        }
    }
    //返回值
    return result;
};

//初始化函数，对node的位置进行随机生成
//使得node在svg上绑定有初始位置
//也方便其他函数对node位置的更新计算
function initial(node, width, length) {
    let result = node;
    for (let v in result) {
        result[v].x = Math.trunc(width * 0.5 + width * (Math.random() - 0.5));
        result[v].y = Math.trunc(length * 0.5 + length * (Math.random() - 0.5));
        result[v].dx = 0;//初始化位移
        result[v].dy = 0;//初始化位移
        //防止越界，为x、y都加上+-r的偏移量
        if( result[v].x + r >= width ) result[v].x -= r;
        if( result[v].x - r <= 0 ) result[v].x += r;
        if( result[v].y + r >= length ) result[v].y -= r;
        if( result[v].y - r <= 0 ) result[v].y += r;
        //console.log(result[v]);
    }
    //返回值
    return result;
}