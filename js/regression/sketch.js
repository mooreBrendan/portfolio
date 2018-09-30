var dimension=600;
var numLines=350;
var power=2;

var sizeP=20;
var steps=10;
var variance=1;

var bestFit;
var totalFit;
var started=false;
var generation=0;
var yAvg=0;
var pressed=false;
var points=[];
var lines=[];
var parents=[];
function setup() {
  createCanvas(dimension, dimension);
  for(var i=0;i<numLines;i++){
    lines[i]=new lineG();
  }
}

function draw() {
  background(0);
  if(steps<3){
    steps=3;
  }
  if (mouseIsPressed && !pressed) {
    append(points,new pointG(mouseX,mouseY));
    pressed=true;
    yAvg=0;
    points.forEach((pointG)=>{
      yAvg+=pointG.y;
    });
    yAvg/=points.length;
  }
  else if(!mouseIsPressed){
    pressed=false;
  }
  points.forEach((pointG) =>pointG.show());
  if(keyIsDown(32)&&!started){
    started=true;
    lines.forEach((lineG)=>lineG.randInit());
  }
  if(started){
    //console.log("generation");
    totalFit=0;
    bestFit=-1000000000;
    var bestInd=0;
    var leastFit=2;
    lines.forEach((lineG,index) => {
      lineG.calcFit();
      if(lineG.fit>bestFit){
        bestFit=lineG.fit;
        bestInd=index;
      }
      if(lineG.fit<leastFit){
        leastFit=lineG.fit;
      }
    });
    bestFit-=leastFit;
    lines.forEach((lineG)=>{
      lineG.fit-=leastFit;
      totalFit+=lineG.fit;
      //lineG.show();
    });
    var tempVariance=abs(totalFit-bestFit);
    if(tempVariance<variance){
      variance=tempVariance;
    }
    var avgFit=totalFit/numLines;
    lines.forEach((lineG,index) =>{
      if(lineG<avgFit){
        lines.splice(index,1)
      }
    });
    lines[bestInd].show();
    // lines.forEach((lineG,index) =>{
    //   if(lineG.fit<=0){
    //     console.log("Fit too small: "+ index);
    //   }
    // });
    lines.forEach((lineG,index) => parents[index]=new parentVal(lineG.fit,lineG.coeffs));
    var pFit=0;
    parents.forEach((parent)=>pFit+=parent.fit);
    //lines[bestInd].show();
    // lines.forEach((line) =>{
    //   var parent1Fit = random(0, totalFit);
    //   var parent2Fit = random(0, totalFit);
    //   //console.log("BF: "+totalFit+"\tP1: "+parent1Fit+"\tP2: "+parent2Fit);
    //   var parent1;
    //   var parent2;
    //   var current = 0;
    //   while (parent1Fit > 0) {
    //     if (parent1Fit <= parents[current].fit) {
    //       parent1 = parents[current];
    //       parent1Fit = 0;
    //     } else {
    //       parent1Fit -= parents[current].fit;
    //       current++;
    //     }
    //   }
    //   current = 0;
    //   while (parent2Fit > 0) {
    //     if (parent2Fit <= parents[current].fit) {
    //       parent2 = parents[current];
    //       parent2Fit = 0;
    //     } else {
    //       parent2Fit -= parents[current].fit;
    //       current++;
    //     }
    //   }
    //   //console.log(parent1);
    //   //console.log(parent2);
    //   line.pareInit(parent1, parent2);
    // });
    // lines.forEach((lineG,index) =>{
    //   var start1 = lineG.coeffs[0];
    //   var start2 = lineG.coeffs[1];
    //   var parentFit = random(0, totalFit);
    //   //console.log("BF: "+totalFit+"\tP1: "+parent1Fit);
    //   var parent;
    //   var current = 0;
    //   while (parentFit > 0) {
    //     if (parentFit <= parents[current].fit) {
    //       parent = parents[current];
    //       parentFit = 0;
    //     } else {
    //       parentFit -= parents[current].fit;
    //       current++;
    //     }
    //   }
    //   // if(index==current){
    //   //   console.log("no change"+index);
    //   // }
    //   lineG.singInit(current);
    //   // if(start1==lineG.coeffs[0]&&start2==lineG.coeffs[1]){
    //   //   console.log("no change");
    //   // }
    // });
    for(var i=0;i<numLines;i++){
      var start1 = lines[i].coeffs[0];
      var start2 = lines[i].coeffs[1];
      var parentFit = random(0, pFit);
      //console.log("BF: "+totalFit+"\tP1: "+parent1Fit);
      var parent;
      var current = 0;
      while (parentFit > 0) {
        if (parentFit <= parents[current].fit) {
          parent = parents[current];
          parentFit = 0;
        } else {
          parentFit -= parents[current].fit;
          current++;
        }
      }
      // if(index==current){
      //   console.log("no change"+index);
      // }
      if(lines.length==i){
        lines[lines.length]=new lineG();
      }
      lines[i].singInit(current);
      // if(start1==lineG.coeffs[0]&&start2==lineG.coeffs[1]){
      //   console.log("no change");
      // }
    }
    parents.splice(0,parents.length);
    generation++;
  }
  //line(mouseX, mouseY, pmouseX, pmouseY);
}
