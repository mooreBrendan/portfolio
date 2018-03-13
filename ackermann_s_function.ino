int ack(int m, int n);

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  for (int i = 0; i < 6; i++)
  {
    for (int j = 0; j < 6; j++)
    {
      int val=ack(i,j);
      Serial.print("ackerman ");
      Serial.print(i);
      Serial.print(", ");
      Serial.print(j);
      Serial.print(" is:");
      Serial.println(val);
    }
  }
}

void loop() {
  // put your main code here, to run repeatedly:

}


int ack(int m, int n) {
  int ans;
  if (m == 0)
  {
    ans = n + 1;
  }
  else if (n == 0)
  {
    ans = ack(m - 1, 1);
  }
  else
  {
    ans = ack(m - 1, ack(m, n - 1));
  }
  return (ans);
}


