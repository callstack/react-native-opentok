package com.rnopentok;

import android.support.annotation.Nullable;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.bridge.ReadableMap;


public class RNOpenTokPublisherViewManager extends RNOpenTokViewManager<RNOpenTokPublisherView> {
    @Override
    public String getName() {
        return "RNOpenTokPublisherView";
    }

    @Override
    protected RNOpenTokPublisherView createViewInstance(ThemedReactContext reactContext) {
        return new RNOpenTokPublisherView(reactContext);
    }

    @ReactProp(name = "mute")
    public void setMute(RNOpenTokPublisherView view, Boolean mute) {
        view.setAudio(!mute);
    }

    @ReactProp(name = "video")
    public void setVideo(RNOpenTokPublisherView view, Boolean video) {
        view.setVideo(video);
    }

    @ReactProp(name = "camera")
    public void setCamera(RNOpenTokPublisherView view, Integer camera) {
        if (camera != 0) {
            view.cycleCamera();
        }
    }

    @ReactProp(name = "cameraDirection")
    public void setCameraDirection(RNOpenTokPublisherView view, String cameraDirection) {
        view.setCameraDirection(RNOpenTokPublisherView.CameraDirection.valueOf(cameraDirection.toUpperCase()));
    }

    @ReactProp(name = "screenCapture")
    public void setScreenCapture(RNOpenTokPublisherView view, Boolean screenCapture) {
        view.setScreenCapture(screenCapture);
    }

    @ReactProp(name = "screenCaptureSettings")
    public void setScreenCaptureSettings(RNOpenTokPublisherView view, @Nullable ReadableMap screenCaptureSettings) {
        view.setScreenCaptureSettings(screenCaptureSettings);
    }
}

