//***************************************************************************LIBRARIES*********************************************************
#include <ESP8266WiFi.h>
#include "Adafruit_MQTT.h"
#include "Adafruit_MQTT_Client.h"
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <Servo.h>
#include <ESP8266mDNS.h>

//***************************************************************************DECLARATIONS*****************************************************
MDNSResponder mdns;
Servo Dservo;
Servo Mservo;

//***************************************************************************CONSTANTS********************************************************
const int DetectDistance = 1000;
const int countLimit = 49;
const int Delvalue = 50;
const char *ssid = "BM-FB";
const char *pass = "controller";

//***************************************************************************VARIABLES********************************************************
int dValue[] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
int distanceA = 0;
int wDistance = 20;
int distance = 0;
int spd = 10;
int count1 = 0;
int count2 = 0;
int state1 = 0;
int state2 = 0;
int state3 = 0;
int modes = 1;
int a = 1;

String webString = "";
String webPage = "";

//**************************************************************************WIFI*NETWORK*******************************************************
//#define    WLAN_SSID           "HHS-ROBOTICS"
//#define    WLAN_PASS           "Robotics0126"

//#define    WLAN_SSID         "SCH-I5457C97"
//#define    WLAN_PASS         "lhwf132*"

#define    WLAN_SSID         "MooreNet"
#define    WLAN_PASS         "2ztzoccy4lz9stvx"

//*************************************************************************ADAFRUIT.IO*SETUP*******************************************************
#define AIO_SERVER      "io.adafruit.com"
#define AIO_SERVERPORT  1883                   // use 8883 for SSL
#define AIO_USERNAME    "littleweirdy"
#define AIO_KEY         "8a86529592a84833bdbdc842f5af4c07"

//**************************************************************************GLOBAL*STATE********************************************************
WiFiClient client;
Adafruit_MQTT_Client mqtt(&client, AIO_SERVER, AIO_SERVERPORT, AIO_USERNAME, AIO_KEY);


//***************************************************************************FEED*SETUP**********************************************************

//paths for Adafruit IO follow the form: <username>/feeds/<feedname>
Adafruit_MQTT_Subscribe cmode = Adafruit_MQTT_Subscribe(&mqtt, AIO_USERNAME "/feeds/cmode");
Adafruit_MQTT_Subscribe FR = Adafruit_MQTT_Subscribe(&mqtt, AIO_USERNAME "/feeds/fr");
Adafruit_MQTT_Subscribe LR = Adafruit_MQTT_Subscribe(&mqtt, AIO_USERNAME "/feeds/lr");

Adafruit_MQTT_Publish onoffbutton = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/Fdistance");

//*****************************************************************************WEB*SERVER***********************************************
ESP8266WebServer server(80);

//*************************************************************************FUNCTION*DECLARATION*****************************************************
void MQTT_connect();
void disp();
void exec();

void setup() {
  //******************************************************************************PIN*MODES***********************************************************
  pinMode(0, OUTPUT);//LED Red
  pinMode(2, OUTPUT);//LED Blue
  pinMode(16, OUTPUT);//warning LED

  pinMode(13, INPUT);//controller switch
  Mservo.attach(12);//servo f/d
  Dservo.attach(14);//servo l/r
  Serial.begin(115200);

  //****************************************************************************STARTING*POSITION***************************************************
  Dservo.write(90);
  Mservo.write(90);
  digitalWrite(0, HIGH);
  digitalWrite(2, HIGH);

  //******************************************************************************CONNECT*WIFI******************************************************
  if (digitalRead(13) == HIGH)//if 13 is on, recieve from wifi
  {
    Serial.println(F("Adafruit MQTT"));
    Serial.println();
    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(WLAN_SSID);
    WiFi.begin(WLAN_SSID, WLAN_PASS);
    while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.print(".");
    }
    Serial.println();
    Serial.println("WiFi connected");
    Serial.print("IP address:   ");
    Serial.println(WiFi.localIP());

    //***************************************************************************SUBSCRIPTIONS************************************************************
    mqtt.subscribe(&cmode);
    mqtt.subscribe(&FR);
    mqtt.subscribe(&LR);
    state3 = 1;
  }
  if (digitalRead(13) == LOW)//recieve from other huzzah
  {
    digitalWrite(0, LOW);
    webPage += "<h1>RC Car Controls</h1><p><a href=\"Forward\"><button style='height:50px;width:150px'>Forward</button></a>&nbsp;<a href=\"stop\"><button style='height:50px;width:150px'>stop</button></a>&nbsp;<a href=\"back\"><button style='height:50px;width:150px'>back</button></a>&nbsp;";
    webPage += "<p><a href=\"left\"><button style='height:50px;width:150px'>left</button></a>&nbsp;<a href=\"center\"><button style='height:50px;width:150px'>center</button></a>&nbsp;<a href=\"right\"><button style='height:50px;width:150px'>right</button></a></p>";
    webPage += "<p><a href=\"cmodeon\"><button style='height:50px;width:150px'>mode</button></a><p>";
    webPage += "<p><a href=\"SU\"><button style='height:50px;width:150px'>Speed Up</button></a><a href=\"SD\"><button style='height:50px;width:150px'>Speed Down</button></a><p>";
    Serial.println();
    Serial.print("Configuring access point...");
    WiFi.softAP(ssid, pass);
    IPAddress myIP = WiFi.softAPIP();
    //IPAddress myIP = srvr;
    Serial.print("AP IP address: ");
    Serial.println(myIP);
    while (!mdns.begin("esp8266", WiFi.localIP())) {
      delay(100);
      Serial.print(".");
    }
    Serial.println("MDNS responder started");
    server.on("/", []() {
      server.send(200, "text/html", webPage);
    });
    server.on("/Forward", []() {
      server.send(200, "text/html", webPage);
      state1 = 1;
      Serial.println("forward");
      delay(Delvalue);
    });
    server.on("/stop", []() {
      server.send(200, "text/html", webPage);
      state1 = 0;
      Serial.println("stop");
      delay(Delvalue);
    });
    server.on("/back", []() {
      server.send(200, "text/html", webPage);
      state1 = -1;
      Serial.println("back");
      delay(Delvalue);
    });
    server.on("/left", []() {
      server.send(200, "text/html", webPage);
      state2 = -1;
      Serial.println("left");
      delay(Delvalue);
    });
    server.on("/center", []() {
      server.send(200, "text/html", webPage);
      state2 = 0;
      Serial.println("center");
      delay(Delvalue);
    });
    server.on("/right", []() {
      server.send(200, "text/html", webPage);
      state2 = 1;
      Serial.println("right");
      delay(Delvalue);
    });
    server.on("/SU", []() {
      server.send(200, "text/html", webPage);
      if (spd < 40)
      {
        spd = spd + 5;
      }
      Serial.println(spd);
      delay(Delvalue);
    });
    server.on("/SD", []() {
      server.send(200, "text/html", webPage);
      if (spd > 5)
      {
        spd = spd - 5;
      }
      Serial.println(spd);
      delay(Delvalue);
    });
    server.on("/cmodeon", []() {
      server.send(200, "text/html", webPage);
      if (state3 == 0)
      {
        //modes = 1;
        state3 = -1;
        Serial.println("on");
      }
      else {
        //modes = 0;
        state3 = 0;
        Serial.println("off");
      }
      delay(Delvalue);
    });
    server.begin();
    Serial.print("HTTP server started:   ");
    Serial.println(ssid);
    delay(1000);
    state3 = 0;
  }
  Serial.println(digitalRead(13));
  a = 1;
}

//**********************************************************************************MAIN****************************************************************
uint32_t x = 0;

void loop() {
  if (state3 == 1)//adafruit
  {
    digitalWrite(2, HIGH);
    MQTT_connect();
    //**********************************************************************************WIFI*******************************************************************
    Adafruit_MQTT_Subscribe *subscription;
    if (count1 == 1)
    {
      onoffbutton.publish(distanceA);
    }
    if (count1 == 25 || count1 == 50)
    {
      while ((subscription = mqtt.readSubscription(10)))
      {
        if (subscription == &cmode)
        {
          if (strcmp((char *)cmode.lastread, "wireless") == 0)
          {
            modes = 1;
          }
          if (strcmp((char *)cmode.lastread, "auto") == 0)
          {
            modes = 0;
          }
        }
        if (subscription == &LR)
        {
          if (strcmp((char *)LR.lastread, "-1") == 0)
          {
            state2 = -1;
          }
          if (strcmp((char *)LR.lastread, "0") == 0)
          {
            state2 = 0;
          }
          if (strcmp((char *)LR.lastread, "1") == 0)
          {
            state2 = 1;
          }
        }
        if (subscription == &FR)
        {
          if (strcmp((char *)FR.lastread, "-1") == 0)
          {
            state1 = -1;
          }
          if (strcmp((char *)FR.lastread, "0") == 0)
          {
            state1 = 0;
          }
          if (strcmp((char *)FR.lastread, "1") == 0)
          {
            state1 = 1;
          }
        }
      }
    }
    delay(75);
  }

  if (state3 == 0)//webserver
  {
    delay(50);
    server.handleClient();
    Adafruit_MQTT_Subscribe *subscription;
    while ((subscription = mqtt.readSubscription(10)))
    {
      if (subscription == &cmode)
      {
        if (strcmp((char *)cmode.lastread, "wireless") == 0)
        {
          modes = 1;
        }
        if (strcmp((char *)cmode.lastread, "auto") == 0)
        {
          modes = 0;
        }
      }
    }
    digitalWrite(2, LOW);
  }
  if (state3 == -1)//automatic
  {
    delay(10);
    server.handleClient();
    state1 = 0;
    state2 = 0;
    if (modes == 0 && (count1 == 1 || count1 == 26))
    {
      digitalWrite(2, HIGH);
      modes = 1;
    }
    else if ( count1 == 1 || count1 == 26) {
      digitalWrite(2, LOW);
      modes = 0;
    }
  }
  distance = analogRead(A0);
  distance = map(distance, 0, DetectDistance, 0, 100);
  distance = constrain(distance, 0, 100);
  wDistance = spd + 10;
  exec();
  //********************************************************************AVERAGE*DISTANCE****************************************************************
  count1 = count1 + 1;
  if (distance < wDistance)
  {
    count2 = count2 + 1;
  }
  else
  {
    digitalWrite(0, LOW);
    count2 = 0;
  }
  if (count1 > countLimit + 1)
  {
    count1 = 0;
  }
  if (count1 == 4 || count1 == 9 || count1 == 14 || count1 == 19 || count1 == 24 || count1 == 29 || count1 == 34 || count1 == 39 || count1 == 44)
  {
    dValue[a] = distance;
    a = a + 1;
  }
  if (count1 == countLimit)
  {
    a = 1;
    dValue[10] = distance;
    distanceA = (dValue[1] + dValue[2] + dValue[3] + dValue[4] + dValue[5] + dValue[6] + dValue[7] + dValue[8] + dValue[9] + dValue[10]) / 10;
  }
  disp();
}

//************************************************************************FUNCTIONS*********************************************************************
void MQTT_connect()
{
  int8_t ret;
  if (mqtt.connected())  // Stop if already connected.
  {
    return;
  }
  Serial.print("Connecting to MQTT... ");
  uint8_t retries = 1;
  while ((ret = mqtt.connect()) != 0)// connect will return 0 for connected
  {
    Serial.println(mqtt.connectErrorString(ret));
    Serial.println("wifi couldn't connect");
    mqtt.disconnect();
    delay(250);
    retries--;
    if (retries == 0) {
      return;
    }
  }
  Serial.println("MQTT Connected!");
}

void disp() {
  Serial.print(count1);
  Serial.print("               ");
  Serial.print(state1);
  Serial.print("       ");
  Serial.print(state2);
  Serial.print("       ");
  Serial.print(state3);
  Serial.print("       ");
  Serial.print(modes);
  Serial.print("       ");
  Serial.print(spd);
  Serial.print("       ");
  Serial.println(wDistance);
}

void exec() {
  if (state1 == 1 && count2 == 0) //forward
  {
    Mservo.write(90 + spd);
  }
  if ( state1 == -1 )//back
  {
    Mservo.write(90 - spd);
  }
  if (count2 > 0 && count2 < 10 && state1 == 1)
  {
    Mservo.write(90);
    digitalWrite(0, HIGH);
  }
  if (count2 > 10 && state1 == 1)
  {
    digitalWrite(0, LOW);
    Mservo.write(80);
  }
  if (state1 == 0)//stop
  {
    Mservo.write(90);
  }
  if (state2 == 1)//right
  {
    Dservo.write(60);
  }
  if (state2 == -1) //left
  {
    Dservo.write(120);
  }
  if (state2 == 0) //center
  {
    Dservo.write(90);
  }
  if (state1 == -2)
  {
    Mservo.write(45);
  }
  if (state1 == 2)
  {
    Mservo.write(135);
  }
  if (distance < wDistance)
  {
    digitalWrite(16, HIGH);
  }
  if (distance >= wDistance)
  {
    digitalWrite(16, LOW);
  }
}
