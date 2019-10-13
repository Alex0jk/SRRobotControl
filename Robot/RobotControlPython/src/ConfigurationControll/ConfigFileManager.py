import uuid
import requests
import json

def writeRobotNameFile(robotName,configJSON):
    configFile = open("/home/pi/RobotControlPython/src/Config.txt","w+")
    configFile.write(robotName)
    configFile.write("@@@")
    configFile.write(configJSON)
    configFile.close()

def writeRobotMapFile(robotName,mapJSON):
    configFile = open("/home/pi/RobotControlPython/src/Map.txt","w+")
    configFile.write(robotName)
    configFile.write("@@@")
    configFile.write(mapJSON)
    configFile.close()

def readConfigFile():
    fileContents = ""
    configFile = open("/home/pi/RobotControlPython/src/Config.txt","r")
    if(configFile.mode == "r"):
        fileContents = configFile.read()
        print(fileContents)
    return fileContents

def readMapFile():
    fileContents = ""
    configFile = open("/home/pi/RobotControlPython/src/Map.txt","r")
    if(configFile.mode == "r"):
        fileContents = configFile.read()
        print(fileContents)
    return fileContents

def postConfigFile(robotName, configJSON):
    response = requests.post("https://us-central1-tsrrcontrolmonit.cloudfunctions.net/addNewRobot?robot="  + robotName, json= json.loads(configJSON))
    print(response.status_code, response.reason)

def postMapFile(robotName, mapJSON):
    response = requests.post("https://us-central1-tsrrcontrolmonit.cloudfunctions.net/addNewRobotMapping?robot="  + robotName, json= json.loads(mapJSON))
    print(response.status_code, response.reason)

def robotSetup():
    configFileData = readConfigFile().split("@@@")
    mapFileData = readMapFile().split("@@@")
    robotName = configFileData[0]
    configJSON = configFileData[1]
    robotMapName = mapFileData[0]
    mapJSON = mapFileData[1]
    if(robotName == "none\n" or robotName == "none" ):
        robotName =  "robot" + str(uuid.uuid1())
        postConfigFile(robotName,configJSON)
        writeRobotNameFile(robotName,configJSON)
    if(robotMapName == "none\n" or robotMapName == "none" ):
        robotMapName =  robotName
        postMapFile(robotMapName,mapJSON)
        writeRobotNameFile(robotMapName,mapJSON)

    return robotName
