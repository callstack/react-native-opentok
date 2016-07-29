package io.callstack.react.opentok;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

public class SubscriberViewManager extends SimpleViewManager<SubscriberView> {
    @Override
    public String getName() {
        return "RCTOpenTokSubscriberView";
    }

    @Override
    protected SubscriberView createViewInstance(ThemedReactContext reactContext) {
        return new SubscriberView(reactContext);
    }

    @ReactProp(name = "apiKey")
    public void setApiKey(PublisherView view, String apiKey) {
        view.setApiKey(apiKey);
    }

    @ReactProp(name = "sessionId")
    public void setSessionId(PublisherView view, String sessionId) {
        view.setSessionId(sessionId);
    }

    @ReactProp(name = "token")
    public void setToken(PublisherView view, String token) {
        view.setToken(token);
    }
}
