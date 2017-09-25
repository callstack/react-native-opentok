package com.rnopentok;

import com.opentok.android.Session;

import com.facebook.react.bridge.ReactApplicationContext;


public class RNOpenTokSessionManager {
    private static RNOpenTokSessionManager instance = null;
    private ReactApplicationContext mContext = null;
    private String mApiKey = null;
    protected Session mSession = null;

    protected RNOpenTokSessionManager(ReactApplicationContext context, String apiKey) {
        this.mSession = null;
        this.mApiKey = apiKey;
        this.mContext = context;
    }

    public static RNOpenTokSessionManager initSessionManager(ReactApplicationContext context, String apiKey) {
        if (instance == null) {
            instance = new RNOpenTokSessionManager(context, apiKey);
        }
        return instance;
    }

    public static RNOpenTokSessionManager getSessionManager() {
        return RNOpenTokSessionManager.initSessionManager(null, null);
    }

    public Session getSession() {
        return this.mSession;
    }

    public void connectToSession(String sessionId) {
        Session session = new Session(this.mContext, this.mApiKey, sessionId);
        this.mSession = session;
    }
}