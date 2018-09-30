var dimension=600;

var numNodes=50;
var delta_t=.5;
var range=50;

var sizeN=dimension/600*30;
var sizeM=sizeN*.95;
var nodes=[];
var messages=[];
var current=0;
function setup() {
	createCanvas(dimension, dimension);
  for(var i=0;i<numNodes;i++){
    nodes[i]=new node(i);
    current++;
  }
}

function draw() {
  background(0);
  for(var i=0;i<nodes.length;i++){
    nodes[i].check();
    nodes[i].show();
  }
  for(i=0;i<messages.length;i++){
    messages[i].update();
    messages[i].show();
  }

}

function sendMessage(start,end,message){
  messages[messages.length]=new message(start,start,end,message);
  //messages[messages.length-1].findTarget();
  messages[messages.length-1].update();
}
