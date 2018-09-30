function snakeHead(){
  this.ydir=0;
  this.xdir=1;
  this.length=1;
  this.index=round(numTiles*numTiles/2)+numTiles/2;
  this.changeDir=function(){
    if(keyIsDown(UP_ARROW)&&this.ydir!=1){
      this.ydir=-1;
      this.xdir=0;
    }
    else if(keyIsDown(DOWN_ARROW)&&this.ydir!=-1){
      this.ydir=1;
      this.xdir=0;
    }
    else if(keyIsDown(RIGHT_ARROW)&&this.xdir!=-1){
      this.ydir=0;
      this.xdir=1;
    }
    else if(keyIsDown(LEFT_ARROW)&&this.xdir!=1){
      this.ydir=0;
      this.xdir=-1;
    }
  }
  this.update=function(){
    if(head.index+head.ydir*numTiles<numTiles*numTiles&&head.index+head.ydir*numTiles>0){//check up/down
      if(!((head.xdir==1&&head.index%numTiles==numTiles-1)||(head.xdir==-1&&head.index%numTiles==0))){//check left/right
        if(!tiles[this.index+this.ydir*numTiles+this.xdir].snake){
          this.index+=this.ydir*numTiles+this.xdir;
          tiles[this.index].snake=true;
        }
        else{
          nonLoop=true;
        }
      }
      else{
        nonLoop=true;
      }
    }
    else{
      nonLoop=true;
    }
    if(nonLoop){
      console.log("You Lose!\nPress Space to Restart");
    }
  }
}
function snakeTail(){
  this.index;
}
