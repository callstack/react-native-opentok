package com.rnopentok;

import com.opentok.android.Session;

import com.facebook.react.bridge.ReactApplicationContext;


public class RNOpenTokSessionManager {
    private static RNOpenTokSessionManager instance = null;
    private ReactApplicationContext mContext = null;
    private String mApiKey = null;
    protected Session mSession = null;

    protected RNOpenTokSessionManager(ReactApplicationContext context, String apiKey, String sessionId) {
        Session session = new Session(context, apiKey, sessionId);
        this.mSession = session;
        this.mApiKey = apiKey;
        this.mContext = context;

    }

    public static RNOpenTokSessionManager initSessionManager(ReactApplicationContext context, String apiKey, String sessionId) {
        if (instance == null) {
            instance = new RNOpenTokSessionManager(context, apiKey, sessionId);
        }
        return instance;
    }

    public static RNOpenTokSessionManager getSessionManager() {
        return RNOpenTokSessionManager.initSessionManager(null, null, null);
    }

    public Session getSession() {
        return this.mSession;
    }

    public void connectToSession(String sessionId) {
        Session session = new Session(this.mContext, this.mApiKey, sessionId);
        this.mSession = session;
    }
}