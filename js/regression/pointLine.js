function pointG(x,y){
  this.x=x/100;
  this.y=(dimension-y)/100;
  this.show=function(){
    fill(200);
    ellipseMode(CENTER);
    ellipse(100*this.x,dimension-100*this.y,sizeP,sizeP);
  }
}


function lineG(){
  this.coeffs=[];
  this.fit=0;
  this.randInit=function(){
    this.fit=0;
    for(var i=0;i<power+1;i++){
      this.coeffs[i]=random(-dimension/100,dimension/100);
    }
  }
  this.singInit=function(parentInd){
    this.coeffs.splice(0,this.coeffs.length);
    parents[parentInd].coeffs.forEach((coeff,index) => this.coeffs[index]=coeff);
    this.mutate();
  }
  this.pareInit=function(parent1,parent2){
    this.fit=0;
    var totalFit=parent1.fit+parent2.fit;
    //this.coeffs.forEach((coeff, index) => coeff=(parent1.fit/totalFit)*parent1.coeffs[index]+(parent2.fit/totalFit)*parent2.coeffs[index]);
    this.coeffs.forEach((coeff, index) => coeff=(parent1.coeffs[index]+parent2.coeffs[index])/2);
    this.mutate();
  }
  this.calcFit=function(){
    var SSE=0;
    var SST=0;
    points.forEach((pointG) => {
      var value=0;
      this.coeffs.forEach((coeff,indexC) =>{
        value+=coeff*pow(pointG.x,indexC);
      });
      SSE+=pow(pointG.y-value,2);
      SST+=pow(pointG.y-yAvg,2);
    });
    this.fit=1-(SSE/SST);
    //console.log("SSE: "+SSE+"\tSST: "+SST+"\tFit: "+this.fit);
  }
  this.mutate=function(){
    this.coeffs.forEach((coeff,index) =>{
      this.coeffs[index]+=random(-variance,variance);
    });
    //console.log("mutating");
  }
  this.show=function(){
    var stepVal=dimension/steps;
    for(var i=0;i<=dimension-stepVal;i+=stepVal){
      var val1=0;
      var val2=0;
      this.coeffs.forEach((coeff,indexC) =>{
        val1+=coeff*pow(i,indexC);
      });
      this.coeffs.forEach((coeff,indexC) =>{
        val2+=coeff*pow(i+stepVal,indexC);
      });
      fill(255);
      stroke(150);
      line(i*100,dimension-100*val1,100*(i+stepVal),dimension-val2*100);
    }
  }
}

function parentVal(fit,coeffs){
  this.fit=fit;
  this.coeffs=[];
  coeffs.forEach((coeff,index) => this.coeffs[index]=coeff);

}
