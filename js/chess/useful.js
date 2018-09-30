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

function checkNew(arry,value){
  var valid=true;
  arry.forEach((element)=>{//determine if any element already exists in the array
    if(element==value){
      valid=false;
    }
  });
  return(valid);
}

function genPrime(lower,upper){
  lower=int(lower);
  upper=int(upper);
  if(lower<=1||upper<=1||upper<lower){
    return(null);
  }
  var val=round(random(lower,upper));
  for(var i=3;i<val;i+=2){
    if(val%i==0||val%2==0){//if value is divisible by the current value or is even
      i=2;
      val=round(random(lower,upper));//regenerate the number
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
  for(var i=0;i<length;i++){
    key+=random(0,1)>=.5?"1":"0";
  }
  return(key);
}

function fact(val){
  var out=1;
  val=int(val);
  if(val<0){
    return(null);
  }
  else{
    for(var i=1;i<val;i++){
      out*=i+1;
    }
  }
  return(out);
}

function clickedIndex(numInner,numOuter,dimen){
  var i=-1;
  var j=-1;
  var numGreater=numInner;
  if(mouseIsPressed){
    var clickedX=mouseX;
    var clickedY=mouseY;
  }
  else{
    return(-1);
  }
  if(numGreater<numOuter){
    numGreater=numOuter;
  }
  for(var k=0;k<=numOuter;k++){
    if(clickedX>k*dimen/numInner){
      i++;
    }
    if(clickedY>k*dimen/numOuter){
      j++;
    }
  }
  if(j>-1&&j<numOuter&&i>-1&&i<numInner){
    return(j*numInner+i);
  }
  else{
    return(-1);
  }
}

function compArry(arry1,arry2){
  if(arry1.length!=arry2.length){
    return(false);
  }
  else{
    var valid=true;
    arry1.forEach((element,index)=>{
      if(element!=arry2[index]){
        valid=false;
      }
    });
    return(valid);
  }
}
