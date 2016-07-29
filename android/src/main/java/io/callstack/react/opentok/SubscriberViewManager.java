package io.callstack.react.opentok;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

public class SubscriberViewManager extends SimpleViewManager<SubscriberView> {
    @Override
    public String getName() {
        return "RCTOpenTokSubscriberView";
    }

    @Override
    protected SubscriberView createViewInstance(ThemedReactContext reactContext) {
        return new SubscriberView(reactContext);
    }
}
