package ec.edu.espe.robotcontrol.ConfigurationControl


import android.os.Environment
import com.github.kittinunf.fuel.Fuel
import com.github.kittinunf.fuel.core.extensions.jsonBody
import java.io.File
import java.util.*


fun writeRobotNameFile(robotName: String,configJSON:String){
    val configFile = File(Environment.getExternalStorageDirectory(),"/Config/config.txt")
    configFile.printWriter().use { out ->
        out.println(robotName)
        out.println("@@@")
        out.println(configJSON)
    }
}

fun readConfigFile():String{
    var dataString: String = ""
    println(Environment.getExternalStorageDirectory())
    File(Environment.getExternalStorageDirectory(),"/Config/config.txt").forEachLine {
        dataString += it
        println(it)
    }
    return dataString;
}

fun postConfigFile(robotName:String, configString:String){
    Fuel.post("https://us-central1-tsrrcontrolmonit.cloudfunctions.net/addNewRobot?robot="  + robotName)
        .jsonBody(configString)
        .also { println(it) }
        .response { result ->
            println(result)
        }
}

fun robotSetup(): String{//returns the robot generated name

    var configString = readConfigFile()
    var robotName = configString.split("@@@")[0]
    var configJSON = configString.split("@@@")[1]
    if(robotName.equals("none")){
        val uuid = UUID.randomUUID()
        robotName = "robot" + uuid.toString()
        postConfigFile(robotName,configJSON)
        writeRobotNameFile(robotName,configJSON)
    }
    return robotName
}