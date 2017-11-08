package com.rnopentok;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;


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
}

