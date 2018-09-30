//*******************repCount***************************
#define REP 5 //multiple that will cause repetitions
#define NUM 3 //number of values to be repeated

//******************conversion**************************
#define cnv 1023 //largest number that can be converted between systems without overflow

//*******************HOPPABLE***************
#define arr_len(x)  (sizeof(x)/sizeof(*x))
int b[] = {4,2,0,0,2,0,0};


void fizzBuzz(int start, int limit);  
  //prints consecutive numbers and replaces the value
  //with a phrase if the current number is a multiple
  //of other predefined numbers
  //Inputs: starting value
  //        ending value
  //Outputs: none
  //based on: https://www.youtube.com/watch?v=QPZ0pIK_wsc
  
String test(int curr, int num, String str1);
  //Used by fizz Buzz to determine if a number is a 
  //multiple of a number and prints a string
  //Inputs: current number
  //        number to be tested against
  //        string to be printed if it is a multiple
  //Outputs: string to be printed or null

void repCount(int s, int f);
  //counts in a range of values and goes back a
  //predefined number of times when the number is
  //a multiple of another predefined number (occurs
  //once per number)
  //Inputs: starting value
  //        ending value
  //Outputs: none
  
long conv(int val, int ns);
  //converts a number into a different number
  //system (number system is between binary and
  //decimal)
  //Inputs: value to be converted
  //        number system to be converted to
  //Outputs: the representation in the other system
  
char recurChar(String str);
  //prints the first recurring Character in a 
  //string
  //Inputs: string to be analyzed
  //Outputs: character
  //based on: https://www.youtube.com/watch?v=GJdiM-muYqc
  
bool is_hoppable(int pos, int h[],int l);
  //analyzes an array and uses the values to
  //change index of the array depending on the value
  //An array is deemed "hoppable" if the values in the
  //array can be combined to move the index beyond its
  //limit
  //Inputs: starting position an the array
  //        the array
  //        the length of the array
  //Outputs: wether or not the array is "hoppable"
  //based on: https://www.youtube.com/watch?v=kHWy5nEfRIQ&t=191s

void setup() {
  Serial.begin(115200);//initialize the serial monitor
  delay(1000); //wait a second for connection to be established
  Serial.println(); //print a newline
  //  pinMode(pin, INPUT);
}

void loop() {
  Serial.println("*********************************************HOPPABLE*******************************");
  if (is_hoppable(0, b, arr_len(b))) {
    Serial.println("hoppable");
  }
  else {
    Serial.println("not hoppable");
  }
  Serial.println("****************************************REPEATING*CHAR******************************");
  Serial.println(recurChar("abca")); //returns a
  delay(50);
  Serial.println(recurChar("abcdb")); //returns b
  delay(50);
  Serial.println(recurChar("abcdefghijklmnopqrstuvwxyz!@#$%^&*)-_=+,<.>/?:;[{]}|")); //return null
  delay(50);
  Serial.println("****************************************Conversion****************************************");
  for (int x = 2; x < 10; x++) { //
    Serial.println();
    Serial.print("Current System: ");
    Serial.println(x);
    delay(50);
    Serial.print("In System: \t");
    Serial.println(conv(cnv, x));
    Serial.print("Decimal: \t");
    Serial.println(fromDec(conv(cnv, x), x));
  }
  Serial.println("****************************************REPETITION COUNT**********************************");
  repCount(1, 50);
  Serial.println("****************************************FIZZ*BUZZ***************************************");
  fizzBuzz(1, 50);
  while (1) {
    delay(5000);//stop
  }
}

//********************FUNCTIONS*****************************************************************
//Fizzbuzz
void fizzBuzz(int start, int limit) {
  if (start > limit) {            //cancel if start is beyond end
    Serial.println("Start exceeds limit");
    return;
  }
  for (int x = start; x <= limit; x++) {  //run through every value in between
    String str = "";
    str += test(x, 3, "Fizz ");   //test the values
    str += test(x, 5, "Buzz ");
    str += test(x, 11, "Fozz ");
    if (str == "") {  //if string is null print the number
      str = x;
    }
    Serial.print(x);
    Serial.print(":  \t");
    Serial.println(str);
    delay(10);
  }
}

String test(int curr, int number, String str1) {  //limits repeating code
  if (curr % number == 0) { //check the number
    return(str1);
  }
  else {
    return("");
  }
}

//*********************************************REP*COUNT********************************************
//counts up a range of numbers and repeats last n numbers when a multiple of value r is reached
//then continues counting (skipping previous value)
void repCount(int s, int f) {
  if (s >= f) {                     //cancel if start value exceed end value
    Serial.println("Exited:");
    Serial.println("Start>End");
    return;
  }
  int skipped = s - (NUM + 1);            //set the initial previously skipped value to a number that cant be reached
  for (int i = s; i <= f; i++) {          //run through every value
    Serial.print(i);
    if (i % REP == 0 && i > skipped && i != f) {  //if value is a multiple of the number and not on a previously skipped value
      skipped = i;  //update the previous value and go back
      i = i - NUM;
      Serial.print("\t return");
    }
    Serial.println();       //print the value
    delay(10);              //prevents soft reset
  }
}

//*********************************************CONVERTER****************************************************
//converter dec to any 1<x<10
int fromDec(long val, int ns) {
  int store = 0;  //initialize values
  int count = 0;
  while (val != 0) {
    store = store + (val % 10) * pow(ns, count);  //increase stored value by the modulous
    val = val / 10;
    count++;
  }
  return store;
}

//*************************************************REP*CHAR***********************************************
//give the first recurring character
char recurChar(String str) {
  for (int x = 0; x < str.length(); x++) {    //check value in string
    for (int y = 0; y < x; y++) {             //check value against previous values
      if (str.charAt(y) == str.charAt(x)) {   //determine if character has already happened
        return str.charAt(x);
      }
    }
  }
}

//**************************************************HOPPABLE******************************************
bool is_hoppable(int pos, int h[],int l) {
  if(pos>=l){     //if pos is beyond length, return true
    return true;
  }
  delay(50);
  for (int j = h[pos]; j >0; j--) {  //check the if the value at current index allows to jump forward to another value
    Serial.println("U\tl\tp\tj"); //print the values
    Serial.print(h[pos]);
    Serial.print("\t");
    Serial.print(l);
    Serial.print("\t");
    Serial.print(pos);
    Serial.print("\t");
    Serial.println(j);
    if (is_hoppable(pos + j, h,l)) { //if value can jump to another value recursively jump to that position
      Serial.print(pos);
      Serial.println("\ttrue");
      return true;
    }
  }
  Serial.print(h[pos]);
    Serial.print("\t");
    Serial.print(l);
  Serial.print("\t");
  Serial.print(pos);
  Serial.println("\th[pos]<j\texiting");
  return false;  //if can't jump return false
}
