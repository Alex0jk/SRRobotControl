from ConfigurationControll import ConfigFileManager
from MainControllers import FirebaseController

def main():
    robotName = ConfigFileManager.robotSetup()
    firebase = FirebaseController.FirebaseController()
    firebase.initializeDBListener(robotName)
    print(robotName)

if __name__ == "__main__":
    main()