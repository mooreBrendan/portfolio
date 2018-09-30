const dimension=600;
const numTiles=3;
const lineLength=3;

var tiles=[];
var pressed=false;
var turn=true;
var blank;
var previous;
var winner=false
function setup() {
	createCanvas(dimension, dimension);
  for(var i=0;i<pow(numTiles,2);i++){
    tiles[i]=new tile(i);
  }
  previous=pow(numTiles,2);//allow an extra loop to check final move
}

function draw() {
  background(200);
  blank=0;
  tiles.forEach((tile)=>{
    tile.show();
    if(tile.val==""){
      blank++;
    }
    tile.check();
  });
  if(previous==0&&!winner){
    console.log("Stalemate");
    noLoop();
  }
  previous=blank
}
