package com.rnopentok;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.opentok.android.Connection;
import com.opentok.android.OpentokError;
import com.opentok.android.Session;
import com.opentok.android.Stream;

public class RNOpenTokModule extends ReactContextBaseJavaModule implements Session.SessionListener, Session.SignalListener {
    public static final String REACT_CLASS = "RNOpenTok";
    private static ReactApplicationContext reactContext = null;

    public RNOpenTokModule(ReactApplicationContext context) {
        super(context);

        RNOpenTokSessionManager.initSessionManager(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @ReactMethod
    public void connect(String sessionId, String token, Promise promise) {
        Session session = RNOpenTokSessionManager.getSessionManager().connectToSession(sessionId, token);
        session.setSessionListener(this);
        session.setSignalListener(this);
        promise.resolve(Boolean.valueOf(true));
    }

    @ReactMethod
    public void disconnect(String sessionId) {
        RNOpenTokSessionManager.getSessionManager().disconnectSession(sessionId);
    }

    @ReactMethod
    public void disconnectAll() {
        RNOpenTokSessionManager.getSessionManager().disconnectAllSessions();
    }

    @ReactMethod
    public void sendSignal(String sessionId, String type, String data, Promise promise) {
        Session session = RNOpenTokSessionManager.getSessionManager().getSession(sessionId);

        session.sendSignal(type, data);
        promise.resolve(Boolean.valueOf(true));
    }

    private void onMessageReceived(WritableMap payload) {

        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(Events.EVENT_ON_SIGNAL_RECEIVED.toString(), payload);
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
        payload.putString("sessionId", session.getSessionId());
        payload.putString("type", type);
        payload.putString("data", data);

        onMessageReceived(payload);
    }

}
