function node(index){
  this.x=random(sizeN/2,dimension-sizeN/2);
  this.y=random(sizeN/2,dimension-sizeN/2);
  this.index=index;
  this.valid=false;
  for(var i=0;i<current;i++){
    if(dist(this.x,this.y,nodes[i].x,nodes[i].y)<sizeN){
      i=-1;
      this.x=random(0,dimension);
      this.y=random(0,dimension);
    }
  }
  this.r=50;
  this.g=250;
  this.b=50;
  this.show=function(){
    ellipseMode(CENTER);
    fill(this.r,this.g,this.b);
    ellipse(this.x,this.y,sizeN,sizeN);
  }
  this.check=function(){
    for(var i=0;i<messages.length;i++){
      if(dist(messages[i].x,messages[i].y,this.x,this.y)<sizeN/2&&this.index!=messages[i].previous){
        //console.log(this.index+": Received");
        var tempOrigin=messages[i].start;
        var tempGoal=messages[i].goal;
        var tempMessage=messages[i].message;
        for(var j=i;j<messages.length-1;j++){
          messages[j]=messages[j+1];
        }
        var voidMess=messages.pop();
        i--;
        if(tempGoal!=this.index){
          messages[messages.length]=new message(tempOrigin,this.index,tempGoal,tempMessage);
        }
        else{
          console.log(this.index+": "+tempMessage);
        }
      }
    }
  }
}
