void infiniteMonkeys(int cnt, String str);
  //prints every possible string of characters 
  //that are in the string (until memory overflow
  //inputs: the amount of characters that still need to be added
  //        the current string
  //Outputs: none
  //Based on:  "if you have infinite monkeys on infinite keyboards, they
  //           will eventually type every work of shakespear"


String alpha = "abcdefghijklmnopqrstuvwxyz "; //possible characters to be used
String strb=""; //initial values
int count = 1;

void setup() {
  Serial.begin(115200);  //open connection to serial monitor
  delay(500);
  Serial.println();
}

void loop() {
    infiniteMonkeys(count, strb);//call the function
    count++;
}

void infiniteMonkeys(int cnt, String str) {
  cnt-=1;       //decrease the count
  for (int x = 0; x < alpha.length()-1; x++) { //for every character in the string
    if (cnt > 0) {                             //if not the last character
      infiniteMonkeys(cnt, str + alpha.charAt(x));  //recursively call the function
      Serial.println("\ncycled\n");
    }
    else {
      Serial.println(str + alpha.charAt(x));    //print all the characters in that position
    }
    delay(50);
  }
}
