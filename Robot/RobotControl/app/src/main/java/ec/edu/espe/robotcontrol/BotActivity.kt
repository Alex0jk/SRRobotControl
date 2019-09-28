package ec.edu.espe.robotcontrol

import android.app.Activity
import android.os.Bundle
import android.view.SurfaceHolder
import android.view.SurfaceView
import android.widget.TextView
import android.widget.Toast
import ec.edu.espe.robotcontrol.ConfigurationControl.robotSetup
import ec.edu.espe.robotcontrol.MainControllers.CameraStreamController
import ec.edu.espe.robotcontrol.MainControllers.FirebaseRpiController
import net.ossrs.rtmp.ConnectCheckerRtmp

class BotActivity : Activity(), ConnectCheckerRtmp,
    SurfaceHolder.Callback  {

    private lateinit var mFireBaseControl: FirebaseRpiController
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_bot)
        val text = findViewById<TextView>(R.id.dataText)
        val robotName = robotSetup()
        text.text = robotName
        mFireBaseControl = FirebaseRpiController(robotName)

        val surfaceView = findViewById<SurfaceView>(R.id.surfaceView)
        CameraStreamController.initializeCamera(surfaceView,this)
        surfaceView.holder.addCallback(this)
        mFireBaseControl.initializeDBListeners()
        mFireBaseControl.initializeGPSCapture(this)
    }

    override fun onDestroy() {
        super.onDestroy()
        CameraStreamController.stopStreamAction()
        if (CameraStreamController.getRtmpCamera2()!!.isOnPreview) {
            CameraStreamController.getRtmpCamera2()!!.stopPreview()
        }

    }

    override fun onConnectionSuccessRtmp() {
        runOnUiThread {
            Toast.makeText(this, "Connection success", Toast.LENGTH_SHORT)
                .show()
        }
    }

    override fun onConnectionFailedRtmp(reason: String) {
        runOnUiThread {
            Toast.makeText(
                this, "Connection failed. $reason",
                Toast.LENGTH_SHORT
            ).show()
            CameraStreamController.stopStreamAction()
        }
    }

    override fun onDisconnectRtmp() {
        runOnUiThread { Toast.makeText(this@BotActivity, "Disconnected", Toast.LENGTH_SHORT).show() }
    }

    override fun onAuthErrorRtmp() {
        runOnUiThread { Toast.makeText(this@BotActivity, "Auth error", Toast.LENGTH_SHORT).show() }
    }

    override fun onAuthSuccessRtmp() {
        runOnUiThread { Toast.makeText(this@BotActivity, "Auth success", Toast.LENGTH_SHORT).show() }
    }


    override fun surfaceCreated(surfaceHolder: SurfaceHolder) {

    }

    override fun surfaceChanged(surfaceHolder: SurfaceHolder, i: Int, i1: Int, i2: Int) {
        CameraStreamController.getRtmpCamera2()!!.startPreview()
    }

    override fun surfaceDestroyed(surfaceHolder: SurfaceHolder) {
        if (CameraStreamController.getRtmpCamera2()!!.isStreaming) {
            CameraStreamController.getRtmpCamera2()!!.stopStream()
        }
        CameraStreamController.getRtmpCamera2()!!.stopPreview()
    }
}