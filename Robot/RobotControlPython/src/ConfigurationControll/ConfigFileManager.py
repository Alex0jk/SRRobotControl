import uuid
import requests
import json

def writeRobotNameFile(robotName,configJSON):
    configFile = open("/home/pi/RobotControlPython/src/Config.txt","w+")
    configFile.write(robotName)
    configFile.write("@@@")
    configFile.write(configJSON)
    configFile.close()

def readConfigFile():
    fileContents = ""
    configFile = open("/home/pi/RobotControlPython/src/Config.txt","r")
    if(configFile.mode == "r"):
        fileContents = configFile.read()
        print(fileContents)
    return fileContents

def postConfigFile(robotName, configJSON):
    response = requests.post("https://us-central1-tsrrcontrolmonit.cloudfunctions.net/addNewRobot?robot="  + robotName, json= json.loads(configJSON))
    print(response.status_code, response.reason)

def robotSetup():
    configFileData = readConfigFile().split("@@@")
    robotName = configFileData[0]
    configJSON = configFileData[1]
    if(robotName == "none\n" or robotName == "none" ):
        robotName =  "robot" + str(uuid.uuid1())
        postConfigFile(robotName,configJSON)
        writeRobotNameFile(robotName,configJSON)
    return robotName
