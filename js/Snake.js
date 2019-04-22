function Snake (snake_obj){
    this.arr = [
        {row:4,col:4},
        {row:4,col:5},
        {row:4,col:6},
        {row:4,col:7},
        {row:4,col:8}
    ];
    this.snake_head = snake_obj.head_pic;
    this.snake_body = snake_obj.body_pic;
    this.snake_tail = snake_obj.tail_pic;
    this.snake_headidx = 2;
    this.snake_tailidx = 0;

    this.direction = 39; //left 37 top 38 right 39 bottom 40
    this.lock = true;
}
// 蛇向前动
Snake.prototype.move = function (){
    // 定义蛇头，老位置
    var newHead = {
        row:this.arr[this.arr.length-1].row,
        col:this.arr[this.arr.length-1].col
    }
    // 移动后新位置
    if(this.direction===37){
        newHead.col--;
    }else if(this.direction===38){
        newHead.row--;
    }else if(this.direction===39){
        newHead.col++;
    }else if(this.direction===40){
        newHead.row++;
    }
    //改变数组 移动蛇头即放到数组最后一项，去掉蛇尾即去除数组最前一项
    this.arr.push(newHead);
    this.arr.shift();
 
    // 移动改变尾巴
    var tail = this.arr[0];
    var hip = this.arr[1];
    if(tail.row === hip.row){
        this.snake_tailidx = tail.col > hip.col ? 2 : 0;
    }else{
        this.snake_tailidx = tail.row > hip.row ? 3 : 1;
    }   
    this.lock = true;
}
// 蛇变方向
Snake.prototype.change = function(direction){
    if(!this.lock){
        return;
    }
    this.lock = false;
    var result = Math.abs(direction - this.direction);
    if(result === 2 || result === 0){
        return;
    }else {
        this.direction = direction;
    }
    // 变方向改变蛇头
    if(direction ===37){
        this.snake_headidx = 0;
    }else if (direction === 38){
        this.snake_headidx =1;
    }else if (direction === 39){
        this.snake_headidx =2;
    }else if (direction === 40){
        this.snake_headidx =3;
    }
}
// 蛇长大
Snake.prototype.growUp = function (){
    var tail = this.arr[0];
    this.arr.unshift(tail);
}