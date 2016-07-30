package io.callstack.react.opentok;

import com.facebook.react.uimanager.ThemedReactContext;

public class SubscriberViewManager extends SessionViewManager<SubscriberView> {
    @Override
    public String getName() {
        return "RCTOpenTokSubscriberView";
    }

    @Override
    protected SubscriberView createViewInstance(ThemedReactContext reactContext) {
        return new SubscriberView(reactContext);
    }
}
