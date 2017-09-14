package com.rnopentok;

import android.util.Log;

/**
 * Created by michalchudziak on 14/09/2017.
 */

public class RNOpenTokSessionManager {
    private static RNOpenTokSessionManager instance = null;
    private String apiKey = null;

    protected RNOpenTokSessionManager(String apiKey, String sessionId) {
        this.apiKey = apiKey;

    }

    public static RNOpenTokSessionManager initSessionManager(String apiKey, String sessionId) {
        if (instance == null) {
            instance = new RNOpenTokSessionManager(apiKey, sessionId);
        }
        return instance;
    }

    public static RNOpenTokSessionManager getSessionManager() {
        return RNOpenTokSessionManager.initSessionManager(null, null);
    }

    public String getSession() {
        return this.apiKey;
    }
}