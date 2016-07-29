package io.callstack.react.opentok;

import android.support.annotation.Nullable;

import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.Map;

public class PublisherViewManager extends SimpleViewManager<PublisherView> {
    @Override
    public String getName() {
        return "RCTOpenTokPublisherView";
    }

    @Override
    protected PublisherView createViewInstance(ThemedReactContext reactContext) {
        return new PublisherView(reactContext);
    }

    @ReactProp(name = "apiKey")
    public void setApiKey(PublisherView view, String apiKey) {
        view.apiKey = apiKey;
    }

    @ReactProp(name = "sessionId")
    public void setSessionId(PublisherView view, String sessionId) {
        view.sessionId = sessionId;
    }

    @ReactProp(name = "token")
    public void setToken(PublisherView view, String token) {
        view.token = token;
    }

    @Override
    @Nullable
    public Map getExportedCustomDirectEventTypeConstants() {
        MapBuilder.Builder builder = MapBuilder.builder();
        for (PublisherView.Events event : PublisherView.Events.values()) {
            builder.put(event.toString(), MapBuilder.of("registrationName", event.toString()));
        }
        return builder.build();
    }
}
