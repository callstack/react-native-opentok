package com.rnopentok;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.opentok.android.Session;

public class RNOpenTokModule extends ReactContextBaseJavaModule {
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
    public void connect(String sessionId, String apiKey, String token, Promise promise) {
        Session session = RNOpenTokSessionManager.getSessionManager().connectToSession(sessionId, apiKey, token);
        session.setSessionListener(RNOpenTokSessionManager.getSessionManager());
        session.setSignalListener(RNOpenTokSessionManager.getSessionManager());
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

}
