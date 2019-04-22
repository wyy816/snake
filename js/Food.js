function Food(x,y,img){
    this.x = x;
    this.y =y;
    this.img = img;
}
Food.prototype.resetFood = function(row,col){
    this.x = row;
    this.y = col;

}