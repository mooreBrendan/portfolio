var standardColour=200;
function tile(x,y){
  this.size=dimension/20;
  this.x=dimension/4+x*this.size;
  this.y=(y+.5)*this.size;
  this.index=y*10+x;
  this.r=standardColour;
  this.g=standardColour;
  this.b=standardColour;
  this.show=function(){
    fill(this.r,this.g,this.b);
    rectMode(CENTER);
    rect(this.x,this.y,this.size*.95,this.size*.95);
  }
}



function store(){
  this.piece="";
  this.key=false;
  this.size=(dimension/8)*.95;
  this.x=dimension/8;
  this.y=dimension/8;
  this.r=standardColour;
  this.g=standardColour;
  this.b=standardColour;
  this.show=function(){
    fill(standardColour);
    rectMode(CENTER);
    rect(this.x,this.y,this.size,this.size);
    //if(piece==""){//todo}
  }
  this.change=function(){
    if(keyIsDown(83)&&!this.key){
      this.key=true;
      if(this.piece!=""){
        var tempP=this.piece;
        var tempR=this.r;
        var tempG=this.g;
        var tempB=this.g;
        this.piece=curr.piece;
        this.r=curr.r;
        this.g=curr.g;
        this.b=curr.b;
        curr.piece=tempP;
        curr.r=tempR;
        curr.g=tempG;
        curr.b=tempB;
      }
      else{
        this.piece=curr.piece
        this.r=curr.r;
        this.g=curr.g;
        this.b=curr.b;
        curr.piece=income[0].piece;
        curr.r=income[0].r;
        curr.g=income[0].g;
        curr.b=income[0].b;
        for(var i=0;i<incoming-1;i++){
          income[i].piece=incoming[i+1].piece;
          income[i].r=income[i+1].r;
          income[i].g=income[i+1].g;
          income[i].b=income[i+1].b;
        }
      }
    }
    else if(!keyIsDown(83)){
      this.key=false;
    }
  }
}
