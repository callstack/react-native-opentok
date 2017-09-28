package com.rnopentok;

import android.widget.FrameLayout;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.ThemedReactContext;
import com.opentok.android.OpentokError;
import com.opentok.android.Session;
import com.opentok.android.Stream;

public class RNOpenTokView extends FrameLayout implements Session.SessionListener {
    protected Session mSession = null;
    private static ThemedReactContext reactContext = null;

    public RNOpenTokView(ThemedReactContext context) {
        super(context);

        this.reactContext = context;
    }

    @Override
    public void onAttachedToWindow() {
        super.onAttachedToWindow();

        if (mSession == null) {
            this.mount();
        }
    }

    private void mount() {
        Session session = RNOpenTokSessionManager.getSessionManager().getSession("");
        session.setSessionListener(this);
        this.mSession = session;
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
