package com.rnopentok;

import com.facebook.react.uimanager.ThemedReactContext;


public class RNOpenTokPublisherViewManager extends RNOpenTokViewManager<RNOpenTokPublisherView> {
    @Override
    public String getName() {
        return "RNOpenTokPublisherView";
    }

    @Override
    protected RNOpenTokPublisherView createViewInstance(ThemedReactContext reactContext) {
        return new RNOpenTokPublisherView(reactContext);
    }
}

