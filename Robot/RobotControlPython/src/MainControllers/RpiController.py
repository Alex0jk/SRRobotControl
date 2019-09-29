from HardwareControllers import MotorController

class RpiController:
    
    def __init__(self):
        self.motorControl = MotorController.MotorController()

    def setDirectionMotor(self,direction):
        if(direction == "still"):
            print(direction)
            self.motorControl.stop()
        elif(direction == "forward"):
            print(direction)
            self.motorControl.forward()
        elif(direction == "backward"):
            print(direction)
            self.motorControl.backward()
        elif(direction == "left"):
            print(direction)
            self.motorControl.left()
        elif(direction == "right"):
            print(direction)
            self.motorControl.right()
