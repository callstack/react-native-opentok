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
    public void setApiKey(SubscriberView view, String apiKey) {
        view.apiKey = apiKey;
    }

    @ReactProp(name = "sessionId")
    public void setSessionId(SubscriberView view, String sessionId) {
        view.sessionId = sessionId;
    }

    @ReactProp(name = "token")
    public void setToken(SubscriberView view, String token) {
        view.token = token;
    }
}
