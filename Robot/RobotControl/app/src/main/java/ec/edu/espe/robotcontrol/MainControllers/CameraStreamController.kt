package ec.edu.espe.robotcontrol.MainControllers

import android.content.Context
import android.util.Log
import android.view.SurfaceView
import com.pedro.rtplibrary.rtmp.RtmpCamera2
import net.ossrs.rtmp.ConnectCheckerRtmp

class CameraStreamController {
    companion object {
        private var etUrl: String = "RTMP LINK"
        private var rtmpCamera2: RtmpCamera2? = null

        public fun initializeCamera(surfaceView:SurfaceView, context:ConnectCheckerRtmp){
            rtmpCamera2 = RtmpCamera2(surfaceView, context)
        }
        public fun getRtmpCamera2():RtmpCamera2?{
            return rtmpCamera2;
        }
        public fun startStreamAction() {
            if(rtmpCamera2!=null) {
                if (!rtmpCamera2!!.isStreaming) {
                    rtmpCamera2!!.disableAudio()
                    if (rtmpCamera2!!.prepareVideo(1280, 720, 30, 1200 * 1024, false, 4, 0)
                        && rtmpCamera2!!.prepareAudio()
                    ) {
                        //rtmpCamera2!!.disableAudio()

                        //button_start_stop!!.text = "stop"
                        rtmpCamera2!!.startStream(etUrl)
                    } else {
                        Log.v("err", "streaming opening error")
                    }
                }
            }
        }

        public fun stopStreamAction() {
            if(rtmpCamera2!=null) {
                if (rtmpCamera2!!.isStreaming) {
                    rtmpCamera2!!.stopStream()
                }
            }
        }
    }
}