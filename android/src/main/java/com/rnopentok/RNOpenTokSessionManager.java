package com.rnopentok;

import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.opentok.android.Connection;
import com.opentok.android.OpentokError;
import com.opentok.android.Session;
import com.opentok.android.BaseVideoRenderer;
import com.opentok.android.Subscriber;

import com.facebook.react.bridge.ReactApplicationContext;
import com.opentok.android.Stream;

import java.util.HashMap;


public class RNOpenTokSessionManager implements Session.SessionListener, Session.SignalListener{
    private static RNOpenTokSessionManager instance = null;
    private ReactApplicationContext mContext;
    private String mApiKey;
    private HashMap<String, Session> mSessions;
    private HashMap<String, Subscriber> mSubscribers;
    private HashMap<String, RNOpenTokPublisherView> mPublishers;

    private RNOpenTokSessionManager(ReactApplicationContext context) {
        this.mSessions = new HashMap<>();
        this.mSubscribers = new HashMap<String, Subscriber>();
        this.mPublishers = new HashMap<String, RNOpenTokPublisherView>();
        this.mContext = context;
    }

    static RNOpenTokSessionManager initSessionManager(ReactApplicationContext context) {
        if (instance == null) {
            instance = new RNOpenTokSessionManager(context);
        }
        return instance;
    }

    static RNOpenTokSessionManager getSessionManager() {
        return RNOpenTokSessionManager.initSessionManager(null);
    }

    public Subscriber getSubscriber(String streamId) {
        return this.mSubscribers.get(streamId);
    }

    public Session connectToSession(String sessionId, String apiKey, String token) {
        this.mApiKey = apiKey;
        Session mSession = new Session.Builder(this.mContext, this.mApiKey, sessionId).build();
        mSession.setSessionListener(this);
        mSession.connect(token);
        this.mSessions.put(sessionId, mSession);

        return mSession;
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
        Subscriber mSubscriber = new Subscriber.Builder(this.mContext, stream).build();
        mSubscriber.setStyle(BaseVideoRenderer.STYLE_VIDEO_SCALE, BaseVideoRenderer.STYLE_VIDEO_FILL);
        Session mSession = this.mSessions.get(session.getSessionId());
        mSession.subscribe(mSubscriber);

        mSubscribers.put(stream.getStreamId(), mSubscriber);

        WritableMap payload = Arguments.createMap();
        payload.putString("sessionId", session.getSessionId());
        payload.putString("streamId", stream.getStreamId());

        mContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(Events.ON_SESSION_STREAM_CREATED.toString(), payload);
    }

    @Override
    public void onStreamDropped(Session session, Stream stream) {
        Subscriber mSubscriber = this.mSubscribers.remove(stream.getStreamId());
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