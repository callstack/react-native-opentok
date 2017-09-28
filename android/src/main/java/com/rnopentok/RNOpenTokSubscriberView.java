package com.rnopentok;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.opentok.android.BaseVideoRenderer;
import com.opentok.android.Connection;
import com.opentok.android.OpentokError;
import com.opentok.android.Session;
import com.opentok.android.Stream;
import com.opentok.android.Subscriber;
import com.opentok.android.SubscriberKit;

public class RNOpenTokSubscriberView extends RNOpenTokView implements SubscriberKit.SubscriberListener, Session.ConnectionListener {
    private Subscriber mSubscriber;

    public RNOpenTokSubscriberView(ThemedReactContext context) {
        super(context);
    }

    private void startSubscribing(Stream stream) {
        mSubscriber = new Subscriber(getContext(), stream);
        mSubscriber.setSubscriberListener(this);
        mSubscriber.getRenderer().setStyle(BaseVideoRenderer.STYLE_VIDEO_SCALE,
                BaseVideoRenderer.STYLE_VIDEO_FILL);

        Session session = RNOpenTokSessionManager.getSessionManager().getSession(mSessionId);
        session.subscribe(mSubscriber);

        attachSubscriberView();
    }

    private void attachSubscriberView() {
        addView(mSubscriber.getView(), new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT));
        requestLayout();
    }

    private void cleanUpSubscriber() {
        removeView(mSubscriber.getView());
        mSubscriber = null;
    }

    /** Session listener **/

    @Override
    public void onStreamReceived(Session session, Stream stream) {
        if (mSubscriber == null) {
            startSubscribing(stream);
            sendEvent(Events.EVENT_SUBSCRIBE_START, Arguments.createMap());
        }
    }

    @Override
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

    /** Connection listener **/
    @Override
    public void onConnectionCreated(Session session, Connection connection) {
    }

    @Override
    public void onConnectionDestroyed(Session session, Connection connection) {
        cleanUpSubscriber();
    }


    @Override
    public void requestLayout() {
        super.requestLayout();
        post(mLayoutRunnable);
    }

    private final Runnable mLayoutRunnable = new Runnable() {
        @Override
        public void run() {
            measure(
                    MeasureSpec.makeMeasureSpec(getWidth(), MeasureSpec.EXACTLY),
                    MeasureSpec.makeMeasureSpec(getHeight(), MeasureSpec.EXACTLY));
            layout(getLeft(), getTop(), getRight(), getBottom());
        }
    };
}
