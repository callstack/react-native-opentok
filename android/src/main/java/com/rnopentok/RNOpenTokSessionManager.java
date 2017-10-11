package com.rnopentok;

import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.opentok.android.Connection;
import com.opentok.android.OpentokError;
import com.opentok.android.Session;

import com.facebook.react.bridge.ReactApplicationContext;
import com.opentok.android.Stream;

import java.util.HashMap;


public class RNOpenTokSessionManager implements Session.SessionListener, Session.SignalListener{
    private static RNOpenTokSessionManager instance = null;
    private ReactApplicationContext mContext;
    private String mApiKey;
    private HashMap<String, Session> mSessions;
    private HashMap<String, RNOpenTokSubscriberView> mSubscribers;
    private HashMap<String, RNOpenTokPublisherView> mPublishers;

    private RNOpenTokSessionManager(ReactApplicationContext context, String apiKey) {
        this.mSessions = new HashMap<>();
        this.mSubscribers = new HashMap<String, RNOpenTokSubscriberView>();
        this.mPublishers = new HashMap<String, RNOpenTokPublisherView>();
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

    public void setSubscriberListener (String sessionId, RNOpenTokSubscriberView subscriber) {
        this.mSubscribers.put(sessionId, subscriber);
    }

    public void removeSubscriberListener (String sessionId) {
        this.mSubscribers.remove(sessionId);
    }

    public void setPublisherListener (String sessionId, RNOpenTokPublisherView publisher) {
        this.mPublishers.put(sessionId, publisher);
    }

    public void removePublisherListener (String sessionId) {
        this.mPublishers.remove(sessionId);
    }

    @Override
    public void onConnected(Session session) {
        RNOpenTokPublisherView publisherView = this.mPublishers.get(session.getSessionId());
        if( publisherView != null) {
            publisherView.onConnected(session);
        }
        WritableMap payload = Arguments.createMap();
        payload.putString("sessionId", session.getSessionId());

        mContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(Events.ON_SESSION_DID_CONNECT.toString(), payload);
    }

    @Override
    public void onDisconnected(Session session) {
        WritableMap payload = Arguments.createMap();
        payload.putString("sessionId", session.getSessionId());

        mContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(Events.ON_SESSION_DID_DISCONNECT.toString(), payload);
    }

    @Override
    public void onStreamReceived(Session session, Stream stream) {
        RNOpenTokSubscriberView subscriberView = this.mSubscribers.get(session.getSessionId());
        if( subscriberView != null) {
            subscriberView.onStreamReceived(session, stream);
        }
        WritableMap payload = Arguments.createMap();
        payload.putString("sessionId", session.getSessionId());
        payload.putString("streamId", stream.getStreamId());

        mContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(Events.ON_SESSION_STREAM_CREATED.toString(), payload);
    }

    @Override
    public void onStreamDropped(Session session, Stream stream) {
        RNOpenTokSubscriberView subscriberView = this.mSubscribers.get(session.getSessionId());
        if( subscriberView != null) {
            subscriberView.onStreamDropped(session, stream);
        }
        WritableMap payload = Arguments.createMap();
        payload.putString("sessionId", session.getSessionId());
        payload.putString("streamId", stream.getStreamId());

        mContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(Events.ON_SESSION_STREAM_DESTROYED.toString(), payload);
    }

    @Override
    public void onError(Session session, OpentokError opentokError) {
        WritableMap payload = Arguments.createMap();
        payload.putString("sessionId", session.getSessionId());
        payload.putString("error", opentokError.getMessage());

        mContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(Events.ON_SESSION_DID_FAIL_WITH_ERROR.toString(), payload);
    }

    @Override
    public void onSignalReceived(Session session, String type, String data, Connection connection) {
        WritableMap payload = Arguments.createMap();
        payload.putString("sessionId", session.getSessionId());
        payload.putString("type", type);
        payload.putString("data", data);

        mContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(Events.EVENT_ON_SIGNAL_RECEIVED.toString(), payload);
    }
}