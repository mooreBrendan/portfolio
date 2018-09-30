const dimension=600;
const numNodes=20;
const distance=200;
const costLimit=10;
const uppPrime=numNodes*2000;
const lowPrime=numNodes*50;
var N_VAL;

var sizeN=20;
var sizeM=sizeN*.75;
var gSpeed=20;

var messages=[];
var nodes=[];
function setup() {
	createCanvas(dimension, dimension);
  N_VAL=genPrime(lowPrime*2,uppPrime*2);
  for(var i=0;i<numNodes;i++){
    nodes[i]=new node(i);
  }
  nodes.forEach((nodeMajor) => {
    nodes.forEach((nodeMinor)=>{
      if(dist(nodeMajor.x,nodeMajor.y,nodeMinor.x,nodeMinor.y)<distance&&nodeMajor.index!=nodeMinor.index){
        if(checkNew(nodeMajor.connections,nodeMinor.index)){
          var cost=round(random(1,costLimit));
          append(nodeMajor.connections,nodeMinor.index);
          append(nodeMajor.connCost,cost);
          append(nodeMinor.connections,nodeMajor.index);
          append(nodeMinor.connCost,cost);
        }
      }
    });
    if(nodeMajor.connections.length==0){//if no close connections connect to closest
      var minIndex;
      var minDist=Infinity;
      nodes.forEach((nodeMinor) =>{
        if(nodeMajor.index != nodeMinor.index && dist(nodeMajor.x,nodeMajor.y,nodeMinor.x,nodeMinor.y)<minDist){
          minIndex=nodeMinor.index;
          minDist=dist(nodeMajor.x,nodeMajor.y,nodeMinor.x,nodeMinor.y);
        }
      })
      var cost=round(random(1,costLimit));
      append(nodeMajor.connections,minIndex);
      append(nodeMajor.connCost,cost);
      append(nodes[minIndex].connections,nodeMajor.index);
      append(nodes[minIndex].connCost,cost);
    }
  });
  nodes.forEach( (node) => node.connCost.sort( ( a , b ) => { return(a-b) } ) );
}

function draw() {
  background(0);
  nodes.forEach((node) => node.showConn());
  nodes.forEach((node) => node.showNode());
  messages.forEach((message,index) =>{
    if(message.update()){
      nodes[message.arry[0]].synch="00000000";
      nodes[message.arry[message.arry.length-1]].synch="00000000";
      messages.splice(index,1);
    }
    else{
      message.show();
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

function Dijkstra(start,end){
  var unvisited=[]; //S: 1
  var distance=[];
  var connections=[];
  var path=[];
  for(var i=0;i<numNodes;i++){
    unvisited[i]=true;
    if(i!=start){
      distance[i]=Infinity;
      connections[i]=-1;
    }
    else{
      distance[i]=0;
      connections[i]=-2;
    }
  }
  do{
    var shortest=Infinity;
    var current=-1;
    for(i=0;i<numNodes;i++){
      if(distance[i]<shortest && unvisited[i]){//find shortest that is unvisited to be current node
        current=i;
        shortest=distance[i];
      }
    }
    if(current!=-1){
      nodes[current].connections.forEach((connection,index) =>{ //S: 3
        if(nodes[current].connCost[index]+distance[current]<distance[connection]){//if tenative distance is smaller replace it
          distance[connection]=nodes[current].connCost[index]+distance[current];
          connections[connection]=current;
        }
      });
    }
    unvisited[current]=false; //S: 4
  }while(unvisited[end] && current != -1);

  if(connections[end] != -1){
    current=end;
    while(connections[current] != -2){
      path.unshift(current);
      current=connections[current];
    }
    path.unshift(current);
    return(path);
  }
  else{
    console.log("no connection")
  }
}
function aStar(start,end){
  var unvisited=[]; //S: 1
  var distance=[];
  var connections=[];
  var path=[];
  for(var i=0;i<numNodes;i++){
    unvisited[i]=true;
    if(i!=start){
      distance[i]=Infinity;
      connections[i]=-1;
    }
    else{
      distance[i]=0;
      connections[i]=-2;
    }
  }
  do{
    var shortest=Infinity;
    var current=-1;
    for(i=0;i<numNodes;i++){
      if(distance[i]<shortest && unvisited[i]){//find shortest that is unvisited to be current node
        current=i;
        shortest=distance[i];
      }
    }
    if(current!=-1){
      nodes[current].connections.forEach((connection,index) =>{ //S: 3
        var nodeD=dist(nodes[current].x,nodes[current].y,nodes[end].x,nodes[end].y);
        if(nodes[current].connCost[index] + distance[current] + map(nodeD,0,sqrt(2)*dimension,0,costLimit) < distance[connection]){//if tenative distance is smaller replace it
          distance[connection]=nodes[current].connCost[index]+distance[current]+map(nodeD,0,sqrt(2)*dimension,0,costLimit);
          connections[connection]=current;
        }
      });
    }
    unvisited[current]=false; //S: 4
  }while(unvisited[end] && current!=-1);//if there is a connection
  if(connections[end] != -1){
    current=end;
    while(connections[current] != -2){//determine the path
      path.unshift(current);
      current=connections[current];
    }
    path.unshift(current);
    return(path)
  }
  else{
    console.log("no connection");
  }
}

function changeCost(node1,node2,newCost){
  var index=-1
  nodes[node1].connections.forEach((connection,index1)=>{//find index
    if(connection==node2){
      index=index1;
    }
  });
  if(index!=-1){//if found index
    nodes[node1].connCost[index]=newCost;

    index=-1
    nodes[node2].connections.forEach((connection,index2)=>{
      if(connection==node1){
        index=index2;
      }
    });
    nodes[node2].connCost[index]=newCost;
  }
  else{
    console.log("no connection");
  }
}

function doubleBubble(majour,minor){//bubble sort minor with respect to majour
  var tempMaj;
  var tempMin;
  for(var i=0;i<majour.length-1;i++){
    for(var j=0;j<majour.length-i;j++){
      if(majour[j]>majour[j+1]){
        tempMaj=majour[j+1];
        tempMin=minor[j+1];

        majour[j+1]=majour[j];
        minor[j+1]=minor[j];

        majour[j]=tempMaj;
        minor[j]=tempMin;
      }
    }
  }
}

function genPrime(lower,upper){
  lower=int(lower);
  upper=int(upper);
  if(lower<=1||upper<=1||upper<lower){
    return(null);
  }
  var val=round(random(lower,upper));
  for(var i=2;i<val;i++){
    if(val%i==0){
      i=2;
      val=round(random(lower,upper));
    }
  }
  return(val);
}

function convertBin(str){
  var out="";
  for(var i=0;i<str.length;i++){
    out+="0";//make 8 characters long
    out+=str.charCodeAt(i).toString(2);
  }
  return(out);
}
function convertStr(bin){
  var out="";
  var temp;
  for(var i=0;i<bin.length;i+=8){
    temp=0;
    for(var j=8;j>0;j--){
      temp+=pow(2,j-1)*bin[i+8-j];
    }
    out+=String.fromCharCode(temp);
  }
  return(out);
}

function synchEncrypt(key,val){
  var output="";
  val=str(val);
  if(val.length%key.length!=0){
    return;
  }
  else{
    for(var i=0;i<val.length/key.length;i++){
      for(var j=0;j<key.length;j++){
        output+=str(key[j]^parseInt(val[i*key.length+j],2));//xor
      }
    }
  }
  return(output);
}

function genBiKey(length){
  var key=""
  length=int(length);
  if(length<=0){
    return(key);
  }
  for(var i=0;i<length;i++){
    key+=random(0,1)>=.5?"1":"0";
  }
  return(key);
}

function asynchEncrypt(nodeMajor,nodeMinor,val){
  //console.log("WIP");
  //en=m^(p1*p2)%n
  var out="";
  for(var i=0;i<val.length;i++){
    out+=str(pow(val.charCodeAt(i),nodeMajor.public*nodeMinor.public)%N_VAL);
  }
  return(out);
}

function asynchDecrypt(key,val){
  console.log("todo");
}

function newMessage(start,end,mess,method,encryption){
  var path=[];
  var messBi=convertBin(mess);
  if(method=="aStar"||method=="ASTAR"||method=="astar"){
    path=aStar(start,end);
  }
  else{
    path=Dijkstra(start,end);
  }
  if(encryption=="synch"||encryption=="Synch"||encryption=="SYNCH"||encryption=="synchronous"){
    do{
      nodes[start].synch=genBiKey(8);
    }while(nodes[start].synch=="00000000");
    nodes[end].synch=nodes[start].synch;
    messBi=synchEncrypt(nodes[start].synch,messBi);
  }
  else if(encryption=="asynch"||encryption=="aSynch"||encryption=="ASYNCH"||encryption=="asynchronous"){
    console.log("todo");
  }
  append(messages,new message(path,0,messBi));

}
