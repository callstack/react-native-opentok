package io.callstack.react.opentok;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by hiroki on 3/8/17.
 */

public class Camera {

    private List<CameraListener> listeners = new ArrayList<CameraListener>();


    public void addCameraListener(CameraListener cameraListener)
    {
        listeners.add(cameraListener);
    }



    public void onCameraChanged(){
        for (CameraListener cl : listeners) {
            cl.onCameraPosChanged();
        }
    }
}
