const dimension=600;
const numSquare=3;
const padding=10;
const defaultPuzzle=c1;
var numTiles;
var sizeT;

var current=[];
var previous=[];
var remaining=[];
var tiles=[];
function setup() {
	createCanvas(dimension+padding*(numSquare-1), dimension+padding*(numSquare-1));
  numTiles=pow(numSquare,2);
  sizeT=dimension/numTiles;
  for(var y=0;y<numTiles;y++){
    for(var x=0;x<numTiles;x++){
      tiles[y*numTiles+x]=new tile(x,y);
    }
  }
  init(defaultPuzzle);
}



function draw() {
  background(0);
  var comp=true;
  current.forEach((val,index) => {
    previous[index]=val;
  })
  for(var i=0;i<numTiles;i++){
    remaining[i]=numTiles;
  }
  //frameRate(0);
  tiles.forEach((tile,index)=>{
    if(!tile.val){
      tile.check();
    }
    tile.show();
    current[index]=tile.val;
    if(tile.val!=0){
      remaining[tile.val-1]--;
    }
    else{
      comp=false;
      if(tile.possible.length==0){
        console.log("not possible");
        noLoop();
      }
    }
  });
  if(comp){
    console.log("completed");
    noLoop();
  }
  else if(compArry(current,previous)){
    console.log("multiple solutions");
    noLoop();
  }
}

function init(initial){
  tiles.forEach((tile,index) => {
    tile.initialize(initial)
    current[index]=tile.val;
    previous[index]=0;
  });
  loop();
}

function checkNew(arry,value){
  var valid=true;
  arry.forEach((element)=>{//determine if any element already exists in the array
    if(element==value){
      valid=false;
    }
  });
  return(valid);
}

function compArry(arry1,arry2){
  if(arry1.length!=arry2.length){
    return(false);
  }
  else{
    var valid=true;
    arry1.forEach((element,index)=>{
      if(element!=arry2[index]){
        valid=false;
      }
    });
    return(valid);
  }
}

function printRemain(){
  for(var i=1;i<=numTiles;i++){
    console.log(i+":\t"+remaining[i-1]);
  }
}

function arrayIn(arrayMajor,arrayMinor){
  if(arrayMinor.length>=arrayMajor.length){
    return(false);
  }
  var valid=true;
  arrayMinor.forEach((val)=>{
    if(valid){
      valid=arrayMajor.includes(val);
    }
  });
  return(valid);
}
