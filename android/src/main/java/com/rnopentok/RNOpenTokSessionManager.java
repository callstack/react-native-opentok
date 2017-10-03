package com.rnopentok;

import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;

import com.opentok.android.Session;

import com.facebook.react.bridge.ReactApplicationContext;

import java.util.HashMap;


public class RNOpenTokSessionManager {
    private static RNOpenTokSessionManager instance = null;
    private ReactApplicationContext mContext;
    private String mApiKey;
    private HashMap<String, Session> mSessions;

    private RNOpenTokSessionManager(ReactApplicationContext context, String apiKey) {
        this.mSessions = new HashMap();
        this.mApiKey = apiKey;
        this.mContext = context;
    }

    static RNOpenTokSessionManager initSessionManager(ReactApplicationContext context) {
        if (instance == null) {
            String apiKey = "";
            ApplicationInfo ai = null;
            try {
                ai = context.getPackageManager().getApplicationInfo(context.getPackageName(), PackageManager.GET_META_DATA);
                apiKey = ai.metaData.get("OPENTOK_API_KEY").toString();
            } catch (PackageManager.NameNotFoundException | NullPointerException e) {
                e.printStackTrace();
            }
            instance = new RNOpenTokSessionManager(context, apiKey);
        }
        return instance;
    }

    static RNOpenTokSessionManager getSessionManager() {
        return RNOpenTokSessionManager.initSessionManager(null);
    }

    public Session connectToSession(String sessionId, String token) {
        Session session = new Session(this.mContext, this.mApiKey, sessionId);
        session.connect(token);
        this.mSessions.put(sessionId, session);

        return session;
    }

    public Session getSession(String sessionId) {
        return this.mSessions.get(sessionId);
    }

    public void disconnectSession(String sessionId) {
        Session session = this.mSessions.get(sessionId);

        if (session != null) {
            session.disconnect();
            this.mSessions.remove(sessionId);
        }
    }

    public void disconnectAllSessions() {
        for (Session session: this.mSessions.values()) {
            session.disconnect();
        }
        this.mSessions.clear();
    }


}