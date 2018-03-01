package com.rnopentok;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

public class RNOpenTokSubscriberViewManager extends RNOpenTokViewManager<RNOpenTokSubscriberView> {
    @Override
    public String getName() {
        return "RNOpenTokSubscriberView";
    }

    @Override
    protected RNOpenTokSubscriberView createViewInstance(ThemedReactContext reactContext) {
        return new RNOpenTokSubscriberView(reactContext);
    }

    @ReactProp(name = "mute")
    public void setMute(RNOpenTokSubscriberView view, Boolean mute) {
        view.setAudio(!mute);
    }

    @ReactProp(name = "video")
    public void setVideo(RNOpenTokSubscriberView view, Boolean video) {
        view.setVideo(video);
    }

    @ReactProp(name = "streamId")
    public void setStreamId(RNOpenTokSubscriberView view, String streamId) {
        view.setStreamId(streamId);
    }
}
