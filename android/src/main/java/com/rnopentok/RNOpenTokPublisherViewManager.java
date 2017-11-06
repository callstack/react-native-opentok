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

    @ReactProp(name = "audioDisabled")
    public void setAudioDisabled(RNOpenTokPublisherView view, Boolean audioDisabled) {
        view.setAudio(!audioDisabled);
    }

    @ReactProp(name = "videoDisabled")
    public void setVideoDisabled(RNOpenTokPublisherView view, Boolean videoDisabled) {
        view.setVideo(!videoDisabled);
    }

    @ReactProp(name = "camera")
    public void setCamera(RNOpenTokPublisherView view, Integer camera) {
        if (camera != 0) {
            view.cycleCamera();
        }
    }
}

