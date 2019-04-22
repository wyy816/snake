function Map(row,col,width,height){
    this.row = row;
    this.col = col;
    this.width = width;
    this.height = height;
    this.arr = [];
    this.dom = document.createElement("div");
}
//   方法
Map.prototype.fill = function (){
    for(var i= 0;i<this.row;i++){
       var Map_row = document.createElement("div");
       var arrrow = [];
       Map_row.className = "row";
          for(var j = 0;j<this.col;j++){
            var Map_col = document.createElement("span");
            Map_col.className = "col";
            Map_row.appendChild(Map_col);
            arrrow.push(Map_col);
          }
        this.dom.appendChild(Map_row);
        this.arr.push(arrrow);
        this.dom.className = "box";
    }
    document.body.appendChild(this.dom);
}
Map.prototype.clear =function(){
  for(var i = 0;i< this.row;i++){
    for(var j = 0;j< this.col;j++){
      this.arr[i][j].style.backgroundImage = "none";
    }
  }
}
