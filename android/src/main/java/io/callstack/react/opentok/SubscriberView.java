package io.callstack.react.opentok;

import android.view.View;

import com.facebook.react.uimanager.ThemedReactContext;

public class SubscriberView extends View {
    private String apiKey;
    private String sessionId;
    private String token;

    public SubscriberView(ThemedReactContext reactContext) {
        super(reactContext);
    }

    public void setApiKey(String apiKey) {
        this.apiKey = apiKey;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
