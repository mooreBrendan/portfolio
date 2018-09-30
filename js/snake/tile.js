function tile(x,y){
  this.size=dimension/numTiles;
  this.x=(x+.5)*this.size;
  this.y=(y+.5)*this.size;
  this.index=y*numTiles+x;
  this.snake=false;
  this.food=false;
  this.show=function(){
    if(this.snake&&this.food){
      snak[head.length]=new snakeTail;
      snak[head.length].index=snak[head.length-1].index;
      head.length++;
      this.food=false;
      food=round(random(-.49,numTiles*numTiles-.51));
      tiles[food].food=true;
      gSpeed++;
    }
    if(this.snake){
      fill(50);
    }
    else if(this.food){
      fill(100);
    }
    else{
      fill(200);
    }
    rectMode(CENTER);
    rect(this.x,this.y,this.size*.95,this.size*.95);
  }
}
