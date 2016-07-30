package io.callstack.react.opentok;

import android.support.annotation.Nullable;

import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.Map;

abstract class SessionViewManager<T extends SessionView> extends SimpleViewManager<T> {
    @ReactProp(name = "apiKey")
    public void setApiKey(T view, String apiKey) {
        view.setApiKey(apiKey);
    }

    @ReactProp(name = "sessionId")
    public void setSessionId(T view, String sessionId) {
        view.setSessionId(sessionId);
    }

    @ReactProp(name = "token")
    public void setToken(T view, String token) {
        view.setToken(token);
    }

    @Override
    @Nullable
    public Map getExportedCustomDirectEventTypeConstants() {
        MapBuilder.Builder builder = MapBuilder.builder();
        for (Events event : Events.values()) {
            builder.put(event.toString(), MapBuilder.of("registrationName", event.toString()));
        }
        return builder.build();
    }
}
