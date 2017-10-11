package com.rnopentok;

import com.facebook.react.uimanager.ThemedReactContext;

public class RNOpenTokSubscriberViewManager extends RNOpenTokViewManager<RNOpenTokSubscriberView> {
    @Override
    public String getName() {
        return "RNOpenTokSubscriberView";
    }

    @Override
    protected RNOpenTokSubscriberView createViewInstance(ThemedReactContext reactContext) {
        return new RNOpenTokSubscriberView(reactContext);
    }
}
