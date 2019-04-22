function Game(snake,map,food,block) {
    this.snake = snake;
    this.map = map;
    this.food = food;
    this.block = block;
    this.timer = null
    this.flag = null;
    this.init();
    this.i = null;
}
// 初始化
Game.prototype.init = function(){
    this.readMap();
    this.readFood();
    this.readSnake();
    this.start();
    this.bindEvent();
    this.readBlock();
}
// 读取地图
Game.prototype.readMap = function(){
    this.map.fill();
}
// 读取食物
Game.prototype.readFood = function(){
    var row = this.food.x;
    var col = this.food.y;
    this.map.arr[row][col].style.backgroundImage = "url("+this.food.img+")";
    this.map.arr[row][col].style.backgroundSize = "cover";
 }
//读取蛇
Game.prototype.readSnake = function(){
    var head =this.snake.arr[this.snake.arr.length-1];
    this.map.arr[head.row][head.col].style.backgroundImage = "url("+this.snake.snake_head[this.snake.snake_headidx]  +")";
    for (var i = 1;i<this.snake.arr.length-1;i++){
        var row = this.snake.arr[i].row;
        var col = this.snake.arr[i].col;
        this.map.arr[row][col].style.backgroundImage = "url("+this.snake.snake_body[0]+")";
    }
  

    var tail = this.snake.arr[0];
    this.map.arr[tail.row][tail.col].style.backgroundImage = "url("+this.snake.snake_tail[this.snake.snake_tailidx] +")";
}    
// 动画开始
Game.prototype.start = function(){
    this.flag = true;
    var me = this;
    var e = 200;//运动一次时间
    this.timer =setInterval(function(){

       me.snake.move();
       me.checkMap();
       me.checkFood();
       me.cheakSnake();
       me.cheakBlock();
       if(me.flag){
        me.map.clear();
        me.readFood();
        me.readSnake(); 
        me.readBlock();
       };
      

    },e)
}
// 绑定点击事件
Game.prototype.bindEvent = function (){
    var me = this;
    document.onkeydown = function(e){
        var code = e.keyCode;
        if(code === 37 || code === 38 || code === 39 || code === 40 ){
            me.snake.change(code);
        }
    }
}
// 动画结束
Game.prototype.gameOver = function (){
    this.flag = false;
    clearInterval(this.timer);
    alert("游戏结束，按F5重新开始游戏");

}
// 地图边界判断
Game.prototype.checkMap = function (){
    var head = this.snake.arr[this.snake.arr.length - 1];
    if(head.row<0 || head.row>=this.map.row || head.col<0 || head.col >=this.map.col){
        this.gameOver();
        
    }
}
// 蛇吃食物判断
Game.prototype.checkFood = function (){
    var head = this.snake.arr[this.snake.arr.length - 1];
    var food = this.food;
    if(head.row === food.x && head.col === food.y){
        this.snake.growUp();
        this.i++;
        // 吃了食物之后就开始定位，定位值给重置食物函数 产生新食物
        this.givePosition();
    }
}
// 给食物定位置 即row col
Game.prototype.givePosition = function (){
    var row = parseInt(Math.random()*this.map.row);
    var col = parseInt(Math.random()*this.map.col);
    // 判断位置不和蛇重合
    for(var i = 0;i< this.snake.arr.length;i++){
        var one = this.snake.arr[i];
        if(one.row === row && one.col === col){
            this.givePosition();
            return;
        }
    }
    // 判断位置不和障碍物重合
    for(var i = 0;i< this.block.arr.length;i++){
        var one = this.block.arr[i];
        if(one.row === row && one.col === col){
            this.givePosition();
            return;
        }
    }
    this.food.resetFood(row,col);
}
// 蛇吃自己判断
Game.prototype.cheakSnake = function (){
    var head = this.snake.arr[this.snake.arr.length - 1]; 
    for(var i = 0; i<this.snake.arr.length -1;i++){
        var one = this.snake.arr[i];
        if(head.row === one.row && head.col === one.col){
            this.gameOver();
            
        }
    }
}
// 蛇撞障碍物判断
Game.prototype.cheakBlock = function (){
    var head = this.snake.arr[this.snake.arr.length - 1]; 
    for(var i = 0; i<this.block.arr.length;i++){
        var one = this.block.arr[i];
        if(head.row === one.row && head.col === one.col){
            this.gameOver();
          
        }
    }
}
// 读取障碍物
Game.prototype.readBlock = function (){
    for (var i = 0;i<this.block.arr.length;i++){
        var row = this.block.arr[i].row;
        var col = this.block.arr[i].col;
        this.map.arr[row][col].style.backgroundImage = "url("+this.block.img+")";
        this.map.arr[row][col].style.backgroundSize = "cover";
    }
 }