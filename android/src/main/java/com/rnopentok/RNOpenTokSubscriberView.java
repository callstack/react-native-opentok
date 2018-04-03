package com.rnopentok;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.opentok.android.OpentokError;
import com.opentok.android.Session;
import com.opentok.android.Stream;
import com.opentok.android.Subscriber;
import com.opentok.android.SubscriberKit;

public class RNOpenTokSubscriberView extends RNOpenTokView implements SubscriberKit.SubscriberListener {
    private Subscriber mSubscriber;
    private Boolean mAudioEnabled;
    private Boolean mVideoEnabled;

    public RNOpenTokSubscriberView(ThemedReactContext context) {
        super(context);
    }

    @Override
    public void onAttachedToWindow() {
        super.onAttachedToWindow();
        RNOpenTokSessionManager.getSessionManager().setSubscriberListener(mSessionId, this);
    }

    public void setAudio(Boolean enabled) {
        if (mSubscriber != null) {
            mSubscriber.setSubscribeToAudio(enabled);
        }

        mAudioEnabled = enabled;
    }

    public void setVideo(Boolean enabled) {
        if (mSubscriber != null) {
            mSubscriber.setSubscribeToVideo(enabled);
        }

        mVideoEnabled = enabled;
    }

    @Override
    protected void onDetachedFromWindow() {
        super.onDetachedFromWindow();
        RNOpenTokSessionManager.getSessionManager().removeSubscriberListener(mSessionId);
    }

    private void startSubscribing(Stream stream) {
        Subscriber.Builder builder = new Subscriber.Builder(getContext(), stream);
        builder.renderer(getVideoRenderer());

        mSubscriber = builder.build();
        mSubscriber.setSubscriberListener(this);
        mSubscriber.setSubscribeToAudio(mAudioEnabled);
        mSubscriber.setSubscribeToVideo(mVideoEnabled);

        Session session = RNOpenTokSessionManager.getSessionManager().getSession(mSessionId);
        session.subscribe(mSubscriber);

        attachVideoView();
    }

    private void cleanUpSubscriber() {
        detachVideoView();
        mSubscriber = null;
    }

    public void onStreamReceived(Session session, Stream stream) {
        if (mSubscriber == null) {
            startSubscribing(stream);
            sendEvent(Events.EVENT_SUBSCRIBE_START, Arguments.createMap());
        }
    }

    public void onStreamDropped(Session session, Stream stream) {
        sendEvent(Events.EVENT_SUBSCRIBE_STOP, Arguments.createMap());
    }

    /** Subscribe listener **/

    @Override
    public void onConnected(SubscriberKit subscriberKit) {}

    @Override
    public void onDisconnected(SubscriberKit subscriberKit) {}

    @Override
    public void onError(SubscriberKit subscriberKit, OpentokError opentokError) {
        WritableMap payload = Arguments.createMap();
        payload.putString("connectionId", opentokError.toString());

        sendEvent(Events.EVENT_SUBSCRIBE_ERROR, payload);
    }
}
