import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

class MotorController:
    
    def __init__(self):
        self.pin1Motor1 = 12
        self.pin2Motor1 = 16
        self.pin1Motor2 = 20
        self.pin2Motor2 = 21
        GPIO.setup(self.pin1Motor1,GPIO.OUT)
        GPIO.setup(self.pin1Motor2,GPIO.OUT)
        GPIO.setup(self.pin2Motor1,GPIO.OUT)
        GPIO.setup(self.pin2Motor2,GPIO.OUT)
    
    def forward(self):
        self.setPinValues(True, False, True, False)
    

    def backward(self):
        self.setPinValues(False, True, False, True)
    

    def stop(self):
        self.setPinValues(False, False, False, False)
    

    def turnLeft(self):
        self.setPinValues(False, False, True, False)
    

    def turnRight(self):
        self.setPinValues(True, False, False, False)
    

    def setPinValues(self,p11,p12,p21,p22):
        if(p11):
            GPIO.output(self.pin1Motor1,GPIO.HIGH)
        else:
            GPIO.output(self.pin1Motor1,GPIO.LOW)
        if(p12):
            GPIO.output(self.pin1Motor2,GPIO.HIGH)
        else:
            GPIO.output(self.pin1Motor2,GPIO.LOW)
        if(p21):
            GPIO.output(self.pin2Motor1,GPIO.HIGH)
        else:
            GPIO.output(self.pin2Motor1,GPIO.LOW)
        if(p22):
            GPIO.output(self.pin2Motor2,GPIO.HIGH)
        else:
            GPIO.output(self.pin2Motor2,GPIO.LOW)
