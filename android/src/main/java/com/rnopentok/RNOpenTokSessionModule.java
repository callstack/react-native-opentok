package com.rnopentok;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.opentok.android.Connection;
import com.opentok.android.OpentokError;
import com.opentok.android.Session;
import com.opentok.android.Stream;

public class RNOpenTokSessionModule extends ReactContextBaseJavaModule implements Session.SessionListener, Session.SignalListener {
    public static final String REACT_CLASS = "RNOpenTokSession";
    private static ReactApplicationContext reactContext = null;
    protected Session mSession;

    public RNOpenTokSessionModule(ReactApplicationContext context) {
        super(context);

        reactContext = context;
    }

    private void createSession() {
        Session session = RNOpenTokSessionManager.getSessionManager().getSession();
        session.setSessionListener(this);
        session.setSignalListener(this);
        this.mSession = session;
    }

    private void onMessageReceived(WritableMap payload) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(Events.EVENT_ON_MESSAGE_RECEIVED.toString(), payload);
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @ReactMethod
    public void sendMessage(String message) {
        if (mSession == null) {
            this.createSession();
        }

        mSession.sendSignal("message", message);
    }

    @Override
    public void onConnected(Session session) {

    }

    @Override
    public void onDisconnected(Session session) {
    }

    @Override
    public void onStreamReceived(Session session, Stream stream) {
    }

    @Override
    public void onStreamDropped(Session session, Stream stream) {
    }

    @Override
    public void onError(Session session, OpentokError opentokError) {
    }

    @Override
    public void onSignalReceived(Session session, String type, String data, Connection connection) {
        WritableMap payload = Arguments.createMap();
        payload.putString("message", data);

        onMessageReceived(payload);
    }
}
