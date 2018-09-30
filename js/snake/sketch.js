const dimension=600;
const numTiles=60;
var tiles=[];
var head;
var snak=[];
var gSpeed=10;
var food;
var nonLoop=false;
function setup() {
	createCanvas(dimension, dimension);
  for(var j=0;j<numTiles;j++){
    for(var i=0;i<numTiles;i++){
      tiles[j*numTiles+i]=new tile(i,j);
    }
  }
  head=new snakeHead();
  snak[0]=head;
  food=round(random(0,numTiles-1))*numTiles+round(random(0,numTiles-1));
  tiles[food].food=true;
}

function draw() {
  background(0);
  frameRate(gSpeed);
  if(!nonLoop){
    head.changeDir();
    for(i=head.length-1;i>0;i--){
      snak[i].index=snak[i-1].index;
      tiles[snak[i-1].index].snake=true;
    }
    head.update();
  }
  else{
    gSpeed=10;
    if(keyIsDown(32)){
      nonLoop=false;
      head.ydir=0;
      head.xdir=1;
      head.length=1;
      head.index=round(numTiles*numTiles/2)+numTiles/2;
      while(snak.length>1){
        snak.pop();
      }
      food=round(random(-.49,numTiles*numTiles-.51));
      tiles[food].food=true;
    }
  }

  tiles.forEach((tile)=>{
    tile.show();
    tile.snake=false;
    if(nonLoop){
      tile.food=false;
    }
  });

}
