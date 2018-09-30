var dimension=600;
var incoming=3;
var gSpeed=10;

var tiles=[];
var stor;
var curr;
var income=[];
function setup() {
	createCanvas(dimension, dimension);
  for(var j=0;j<20;j++){
    for(var i=0;i<10;i++){
      tiles[j*10+i]=new tile(i,j);
    }
  }
  stor=new store();
  curr=new pieceT();
  curr.generate();
  for(var k=0;k<incoming;k++){
    income[k]=new pieceT();
    income[k].generate();
  }
}

function draw() {
  frameRate(gSpeed);
  background(0);
  stor.show();
  stor.change();
  curr.update();
  for(var i=0;i<200;i++){
    tiles[i].show();
  }
}
