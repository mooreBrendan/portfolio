function message(start,goal,message){
  angleMode(RADIANS);
  this.start=start;
  this.goal=goal;
  this.message=message;
  this.x=nodes[this.start].x;
  this.y=nodes[this.start].y;
  this.dir=0;
  this.visited=[];
  this.started=false;
  this.final=start;
  this.complete=false;
  this.created=millis();
  this.findTarget=function(){
    if(this.started){
      if((this.dir<0&&this.y<nodes[this.final].y)||(this.dir>0&&this.y>nodes[this.final].y)||((this.dir<PI/2&&this.dir>-PI/2)&&this.x>nodes[this.final].x)||((this.dir>PI/2||this.dir<-PI/2)&&this.x<nodes[this.final].x)){//if at target
        this.started=false;
        if(this.final==this.goal){//if at goal
          this.complete=true;
          var timeTaken=millis()-this.created;
          console.log(this.goal+"\trecieved: "+this.message+" in: "+int(timeTaken)/1000);
        }
      }
    }
    if(!this.started&&!this.complete){
      this.visited[this.visited.length]=this.start;
      var unvisited=[];
      for(var i=0;i<nodes[this.final].connections.length;i++){
        if(nodes[this.final].connections[i]==this.goal){
          i=nodes[this.final].connections.length+5;
        }
        else if(checkNew(this.visited,nodes[this.final].connections[i])){
          unvisited[unvisited.length]=nodes[this.final].connections[i];
        }
      }
      this.start=this.final;
      if(i>nodes[this.final].connections.length){//found target
        this.final=this.goal;
      }
      else if(unvisited.length>0){//new node to visit
        this.final=unvisited[round(random(-.49,unvisited.length-.51))];
      }
      else{//visited all nodes
        do{
          this.final=nodes[this.final].connections[round(random(-.49,nodes[this.final].connections.length-.51))];
        }while(this.final==this.visited[this.visited.length-1]&&nodes[this.start].connections.length>1);
      }
      this.dir=atan2(nodes[this.final].y-nodes[this.start].y,nodes[this.final].x-nodes[this.start].x);
      this.x=nodes[this.start].x;
      this.y=nodes[this.start].y;
    }
  }
  this.update=function(){//parametric
    this.x+=cos(this.dir)*delta_t;
    this.y+=sin(this.dir)*delta_t;
    if(!this.started){
      this.started=true;
    }
  }
  this.show=function(){
    ellipseMode(CENTER);
    fill(200,200,50);
    ellipse(this.x,this.y,sizeM,sizeM);
  }
}
