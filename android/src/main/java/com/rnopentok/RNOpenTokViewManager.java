package com.rnopentok;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.annotations.ReactProp;

/* Left here for future prop implementations. */
abstract class RNOpenTokViewManager<T extends RNOpenTokView> extends SimpleViewManager<T> {
    @ReactProp(name = "sessionId")
    public void setSessionId(T view, String sessionId) {
        view.setSessionId(sessionId);
    }

    @ReactProp(name = "videoScale")
    public void setVideoScale(T view, String videoScale) {
        view.setVideoScale(RNOpenTokView.VideoScale.valueOf(videoScale.toUpperCase()));
    }

    @ReactProp(name = "zOrderMediaOverlay")
    public void setZOrderMediaOverlay(T view, boolean value) {
        view.setZOrderMediaOverlay(value);
    }
}
