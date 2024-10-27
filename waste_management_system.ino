#include <WiFi.h>
#include <HTTPClient.h>

// Ultrasonic sensor pins
#define echoPin 2               // CHANGE PIN NUMBER HERE IF YOU WANT TO USE A DIFFERENT PIN
#define trigPin 4              // CHANGE PIN NUMBER HERE IF YOU WANT TO USE A DIFFERENT PIN

long duration, distance;

const char* ssid = "Pixel_9802";     // Wi-Fi SSID
const char* password = "diamondlatif"; // Wi-Fi password

// Your server's domain name with URL path or IP address with path
String serverName = "http://192.168.95.6:8000/myapp/";

// Timer settings
unsigned long lastTime = 0;
unsigned long timerDelay = 5000;  // Set timer to 5 seconds (5000 ms)

void setup() {
  // Initialize Serial Monitor and sensor pins
  Serial.begin(115200); 
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  Serial.println("Connecting to WiFi...");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
  
  Serial.println("Timer set to 5 seconds (timerDelay variable), it will take 5 seconds before publishing the first reading.");
}

void loop() {
  // Measure distance using ultrasonic sensor
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  duration = pulseIn(echoPin, HIGH);
  distance = duration / 58.2;  // Calculate distance in cm

  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println(" cm");

  // Send an HTTP GET request every 5 seconds
  if ((millis() - lastTime) > timerDelay) {
    if(WiFi.status() == WL_CONNECTED) {
      HTTPClient http;

      // Add the distance to the server path
      String serverPath = serverName + "?distance=" + String(distance);
      
      // Send HTTP GET request
      http.begin(serverPath.c_str());
      int httpResponseCode = http.GET();
      
      // Check the HTTP response code
      if (httpResponseCode > 0) {
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        String payload = http.getString();
        Serial.println(payload);
      } else {
        Serial.print("Error code: ");
        Serial.println(httpResponseCode);
      }
      
      // Free resources
      http.end();
    } else {
      Serial.println("WiFi Disconnected");
    }
    // Update the last time a request was sent
    lastTime = millis();
  }

  delay(1000);  // Delay before repeating the loop
}
