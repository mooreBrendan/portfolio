const dimension=600;

var p1;
var p2;
var bl;
var p1Score=0;
var p2Score=0;

function setup() {
	createCanvas(dimension, dimension);
  p1=new player(20);
  p2=new player(dimension-20);
  bl=new ball();
  bl.init();
}

function draw() {
  background(51);

  p1.keys(87,83);
  p2.keys(UP_ARROW,DOWN_ARROW);
  bl.values();

  p1.update();
  p2.update();

  bl.check(p1);
  bl.check(p2);
  bl.update();

  p1.show();
  p2.show();
  bl.show();
  textSize(32);
  textAlign(RIGHT);
  text(p1Score,dimension/4,dimension/6);
  textAlign(LEFT);
  text(p2Score,3*dimension/4,dimension/6);
}
