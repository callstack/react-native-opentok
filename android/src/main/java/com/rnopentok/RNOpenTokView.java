package com.rnopentok;

import android.widget.FrameLayout;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.ThemedReactContext;
import com.opentok.android.OpentokError;
import com.opentok.android.Session;
import com.opentok.android.Stream;

public class RNOpenTokView extends FrameLayout implements Session.SessionListener {
    protected String mSessionId;
    private static ThemedReactContext reactContext = null;

    public RNOpenTokView(ThemedReactContext context) {
        super(context);

        reactContext = context;
    }

    public void setSessionId(String sessionId) {
        mSessionId = sessionId;
    }

    @Override
    public void onAttachedToWindow() {
        super.onAttachedToWindow();

        Session session = RNOpenTokSessionManager.getSessionManager().getSession(mSessionId);
        session.setSessionListener(this);
    }

    protected void sendEvent(Events event, WritableMap payload) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(event.toString(), payload);
    }

    /** OpenTokSessionListener **/

    @Override
    public void onConnected(Session session) {}

    @Override
    public void onDisconnected(Session session) {}

    @Override
    public void onStreamReceived(Session session, Stream stream) {}

    @Override
    public void onStreamDropped(Session session, Stream stream) {}

    @Override
    public void onError(Session session, OpentokError opentokError) {}
}
