var dimension=600;
var numNodes=25;
var chance=50;

var sizeN=30;
var lineWeight=200;
var delta_t=1;

var sizeM=sizeN*.75;
var nodes=[];
var messArry=[];
//var mode="random";
var mode="closest";
var distance=200;

function setup() {
	createCanvas(dimension, dimension);
  for(var i=0;i<numNodes;i++){
    nodes[i]=new node(i);
  }
  if(mode=="random"){
    for(var i=0;i<numNodes;i++){
      do{
        do{
          var value=round(random(-.49,numNodes-.51));
        }while(value==i);//while not different

        if(checkNew(nodes[i].connections,value)){//add the connection to both nodes
          nodes[i].connections[nodes[i].connections.length]=value;
          nodes[value].connections[nodes[value].connections.length]=i;
        }
      }while(random(0,100)<=chance&&nodes[i].connections.length<numNodes);
    }
  }
  else if(mode=="closest"){
    nodes.forEach((node,index)=>{
      var closest=dimension;
      var closeIndex;
      for(var i=0;i<numNodes;i++){
        if(index!=i){
          var currDist=dist(node.x,node.y,nodes[i].x,nodes[i].y);
          if(currDist<closest){
            closest=currDist;
            closeIndex=i;
          }
          if(currDist<distance&&checkNew(node.connections,index)){
            node.connections[node.connections.length]=i;
            nodes[i].connections[nodes[i].connections.length]=index;
          }
        }
      }
      if(node.connections.length==0){
        node.connections[node.connections.length]=closeIndex;
        nodes[closeIndex].connections[nodes[closeIndex].connections.length]=index;
      }
    });
  }
}

function draw() {
  background(0);
  nodes.forEach((node)=>{node.show()});//show every nodes

  messArry.forEach((mess,index)=>{
        if(!mess.complete){//if not complete run the message functions
        if(keyCode!=32){
        mess.findTarget();
        mess.update();
        }
        mess.show();
      }
      else{//otherwise remove the message
        this.splice(index,1);
      }
  });
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

function newMessage(start , end , mess){
  messArry[messArry.length]=new message(start,end,mess);
}
