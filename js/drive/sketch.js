const dimension=600;
const turnCircle=100;

var accelInc=1;
var showCircles=true;
var tSizeL=40;
var tSizeW=tSizeL/4;

var trk;
function setup() {
	createCanvas(dimension, dimension);
  trk=new truck();
}

function draw() {
  background(0);
  trk.keys();
  trk.update();
  trk.show();
}
