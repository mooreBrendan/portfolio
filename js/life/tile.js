function tile(x,y){
  this.x=(x+.5)*sizeT;
  this.y=(y+.5)*sizeT;
  this.index=y*cols+x;
  this.life=false;
  this.neighbors=0;
  this.show=function(){
    fill(200);
    if(this.life){
      fill(50);
    }
    rectMode(CENTER);
    rect(this.x,this.y,sizeT*.95,sizeT*.95);
  }
  this.checkNeighbors=function(){
    this.neighbors=0;//initial
    if(this.index>cols&&this.index%cols!=0){//top left
      if(arry1[this.index-cols-1].life){
        this.neighbors++;
      }
    }
    if(this.index>=cols){//top
      if(arry1[this.index-cols].life){
        this.neighbors++;
      }
    }
    if(this.index>=cols&&this.index%cols!=cols-1){//top right
      if(arry1[this.index-cols+1].life){
        this.neighbors++;
      }
    }
    if(this.index>0&&this.index%cols!=0){//left
      if(arry1[this.index-1].life){
        this.neighbors++;
      }
    }
    if(this.index<rows*cols-cols){//bottom
      if(arry1[this.index+cols].life){
        this.neighbors++;
      }
    }
    if(this.index<rows*cols-cols-1&&this.index%cols!=cols-1){//bottom right
      if(arry1[this.index+cols+1].life){
        this.neighbors++;
      }
    }
    if(this.index<rows*cols-cols&&this.index%cols!=0){//bottom left
      if(arry1[this.index+cols-1].life){
        this.neighbors++;
      }
    }
    if(this.index<rows*cols-1&&this.index%cols!=cols-1){//right
      if(arry1[this.index+1].life){
        this.neighbors++;
      }
    }

    if(arry1[this.index].life){//life or death
      if(this.neighbors<2||this.neighbors>3){
        this.life=false;
      }
      else{
        this.life=true;
      }
    }
    else if(this.neighbors==3){
      this.life=true;
    }
  }
}
