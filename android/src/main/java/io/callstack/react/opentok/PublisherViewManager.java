package io.callstack.react.opentok;

import com.facebook.react.uimanager.ThemedReactContext;

public class PublisherViewManager extends SessionViewManager<PublisherView> {
    @Override
    public String getName() {
        return "RCTOpenTokPublisherView";
    }

    @Override
    protected PublisherView createViewInstance(ThemedReactContext reactContext) {
        return new PublisherView(reactContext);
    }
}
