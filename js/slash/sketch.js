const dimension=600;

var numTiles=60;
var strk=10;
var chance=50;

var sizet;
var tiles=[];
var pressed=false;
var current;
function setup() {
	createCanvas(dimension, dimension);
  for(var i=0;i<numTiles*numTiles;i++){
    tiles[i]=new tile(i);
    tiles[i].generate();
  }
  current=numTiles*numTiles;
}

function draw() {
  sizeT=dimension/numTiles;
  background(200);
  while(current<numTiles*numTiles){
    tiles[current]=new tile(current);
    tiles[current].generate();
    current++;
  }
  if(keyIsDown(32)&&!pressed){
    tiles.forEach((tile)=>tile.generate());
    pressed=true;
  }
  else if(!keyIsDown(32)){
    pressed=false;
  }
  tiles.forEach((tile)=>tile.show());
  if(numTiles<=0){
    numTiles=10;
  }
  if(chance<0||chance>100){
    chance=50;
  }
}
