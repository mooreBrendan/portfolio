var dimension=600;
//var testing=[false,true,true,false,false,false,true,true];
//var testing=[false,false,false,false,false,false,false,false];
//var testing=[true,true,true,true,true,true,true,true];
//var testing=[-1,1,1,-1,-1,-1,1,1];
var testing=[-1,-1,-1,-1,-1,-1,-1,-1];
//var testing=[0,0,0,0,0,0,0,0];
//var testing=[1,1,1,1,1,1,1,1]
var startNodes=3;
var hiddenLayers=3;
var hiddenWidth=5;
var endNodes=1;
var numNets=100;

var mutationRate=.1;
var overRide=false;

var nets=[];
var best=0;
var cost=1000;
var bestInd=0;
var numConnections;
var curConnection=0;
var connections=[];
var inputNodes=[];
var hiddenNodes=[];
var outputNodes=[];
var sizeN=30;
var mousePressed=false;
function setup() {
	createCanvas(dimension, dimension);
  numConnections=hiddenWidth*startNodes;
  for(var i=0;i<hiddenLayers-1;i++){
    numConnections+=hiddenWidth*hiddenWidth;
  }
  numConnections+=endNodes*hiddenWidth;
  for(i=0;i<numNets;i++){
    nets[i]=new net();
    for(var j=0;j<numConnections;j++){
      nets[i].weights[j]=random(-1,1);
    }
  }

  for(i=0;i<startNodes;i++){
    inputNodes[i]=new node(.5*dimension/(hiddenLayers+2),(i+.5)*dimension/startNodes);
  }
  for(i=0;i<hiddenLayers;i++){
    for(j=0;j<hiddenWidth;j++){
      var index=i*hiddenWidth+j;
      hiddenNodes[index]=new node((i+1.5)*dimension/(hiddenLayers+2),(j+.5)*dimension/hiddenWidth);
      if(i<1){
        for(var k=0;k<startNodes;k++){
          hiddenNodes[index].connections[k]=inputNodes[k];
          hiddenNodes[index].weight[k]=curConnection;
          curConnection++;
        }
      }
      else{
        for(var k=0;k<hiddenWidth;k++){
          hiddenNodes[index].connections[k]=hiddenNodes[floor((index/hiddenWidth)-1)*hiddenWidth+k];
          hiddenNodes[index].weight[k]=curConnection;
          curConnection++;
        }
      }
    }
  }
  for(i=0;i<endNodes;i++){
    outputNodes[i]=new node(dimension*(1-.5/(hiddenLayers+2)),(i+.5)*dimension/endNodes);
    for(j=1;j<=hiddenWidth;j++){
      outputNodes[i].connections[j]=hiddenNodes[hiddenNodes.length-j];
      outputNodes[i].weight[j]=curConnection;
      curConnection++;
    }
  }
}

function draw() {
  background(125);
  var arry=nets[0].weights;
  if(best==pow(2,startNodes) || overRide){
    arry=nets[bestInd].weights;
    inputNodes.forEach((node) => {
      if(dist(node.x,node.y,mouseX,mouseY)<sizeN&&mouseIsPressed&&!mousePressed){
        mousePressed=true;
        if(node.val>0){
          node.val=-1;
        }
        else{
          node.val=1;
        }
      }
      else if(!mouseIsPressed){
        mousePressed=false;
      }
    });
    hiddenNodes.forEach((node) => node.update(arry));
    outputNodes.forEach((node) => node.update(arry));
  }
  else{
    best=0;
    nets.forEach((net,index)=>{
      net.fit=test(net.weights);
      if(net.fit>best || (net.fit==best&&random(0,100)<50)){
        best=net.fit;
        bestInd=index;
      }
    })
    if(best!=pow(2,startNodes)){//if not fully correct, mutate
      nets.forEach((net)=>{
        net.weights.forEach((weight,index)=>{
          weight=nets[bestInd].weights[index];
          weight+=random(-mutationRate,mutationRate);
          weight=constrain(weight,-1,1);
        });
      });
    }
    else{
      inputNodes.forEach((node)=>node.val=0);
    }
  }
  inputNodes.forEach((node) => node.show(arry));
  hiddenNodes.forEach((node) => node.show(arry));
  outputNodes.forEach((node) => node.show(arry));
}

function test(arry){
  var attempt=[];
  var current=[];
  var score=0;
  var position=0;
  cost=0;
  for(var i=0;i<startNodes;i++){//value to test
    current[i]=false;
  }
  for(i=0;i<pow(2,startNodes);i++){//all attempts
    attempt[i]=false;
  }
  //test
  attempt.forEach((condition,index1) => {//for every condition
    var correct=true;
    current.forEach((value,index) =>{//set the value
      if(value){
        inputNodes[index].val=1;
      }
      else{
        inputNodes[index].val=-1;
      }
    });
    for(j=current.length-1;j>=0;j--){
      var flip=true;
      for(i=0;i<j;i++){
        if(!current[i]){//if any previous are false don't flip
          flip=false;
        }
      }
      if(flip){
        current[j]=!current[j];
      }
    }
    hiddenNodes.forEach((node) => node.update(arry));//update all nodes
    outputNodes.forEach((node) => node.update(arry));
    cost+=abs(testing[index1]-outputNodes[0].val);
    if((outputNodes[0].val<0&&1==testing[index1])||(outputNodes[0].val>=0&&-1==testing[index1])){
      correct=false;
    }
    if(correct){
      score++;
    }
  });
  return(score);
}
