import pyrebase
import os
import signal
import subprocess
from MainControllers import RpiController

class FirebaseController:

    def __init__(self):
        self.config = {
            "apiKey": "AIzaSyCVjeIUnXoM85uAjNYVbMX5qkCFsELgI5w",
            "authDomain": "tsrrcontrolmonit.firebaseapp.com",
            "databaseURL": "https://tsrrcontrolmonit.firebaseio.com",
            "storageBucket": "tsrrcontrolmonit.appspot.com",
        }
        self.firebase = pyrebase.initialize_app(self.config)
        self.controller = RpiController.RpiController()
        self.pro = None

    def changeListener(self,message):
        print(message["event"])
        print(message["path"])
        print(message["data"])
        if(message["event"] ==  "put"):
            if(message["path"]=="/movement_command"):
                print(message["data"])
                self.controller.setDirectionMotor(message["data"])
            if(message["path"]=="/camera_state"):
                print(message["data"])
                
                if(message["data"] == "on"):
                    command = "raspivid -o - -t 0 -vf -hf -fps 10 -b 400000 | ffmpeg -re -ar 44100 -ac 2 -acodec pcm_s16le -f s16le -ac 2 -i /dev/zero -f h264 -i - -vcodec copy -acodec aac -ab 128k -g 50 -strict experimental -f flv rtmp://a.rtmp.youtube.com/live2/yrjs-gqud-kvqg-82my"
                    self.pro = subprocess.Popen(command, stdout=subprocess.PIPE,shell=True, preexec_fn=os.setsid)
                else:
                    os.killpg(os.getpgid(self.pro.pid), signal.SIGTERM)


    def initializeDBListener(self,robotName):
        db = self.firebase.database()
        db.child(robotName).stream(self.changeListener)

#There is a need for the GPS controllers
