//can be altered before
const dimension = 800;


var types = ["R", "G", "B", "W"]; //types
var rArry = [200, 0, 0, 200];
var gArry = [0, 200, 0, 200];
var bArry = [0, 0, 200, 200];

var numAnts = 300; //amount of ants on the screen
var sizeA = 20; //size of ants
var delta_t = .5; //movement speed
var tolerance = 2; //tolerance for variance
var distA = 36; //distance for interactions
var inter = 4; //seconds

//can not be altered
var ants = [];
var current = [];
function setup() {//initialize
  checkVar();
	createCanvas(dimension, dimension);
	for (i = 0; i < numAnts; i++) {
		ants[i] = new ant();
	}
}

function draw() {
	background(0);
  types.forEach((type,index) => current[index]=0);
  checkVar();
  ants.forEach((ant) =>{
    ant.check();
    ant.update();
    ant.show();
    types.forEach((type,index) =>{
      if (types[index] == ant.type) {
        current[index]++;
      }
    })
  });
}

function printAnts() {
  types.forEach((type,index) => console.log(type + ": " + current[index] + "\t%: " + current[index] / numAnts));
}

function addColor(color,r,g,b){
  if(isNaN(r)||isNaN(g)||isNaN(b)){
    return;
  }
  append(types,str(color));
  append(rArry,r);
  append(gArry,g);
  append(bArry,b);
}

function changeNumAnts(newNum){
  if(newNum<0){
    return;
  }
  if(newNum>ants.length){
    while (newNum > ants.length) {
      append(ants, new ant());
    }
  }
  else{
    ants.splice(newNum,ants.length);
  }
}

function checkVar() {
	if (sizeA <= 0) {
		sizeA = 20;
	}
	if (distA <= 0) {
		distA = 6;
	}
	if (inter <= 0) {
		inter = 4;
	}
	if (tolerance < 0) {
		tolerance = 1;
	}
}
