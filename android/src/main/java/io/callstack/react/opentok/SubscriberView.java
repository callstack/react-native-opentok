package io.callstack.react.opentok;

import android.view.View;
import android.widget.FrameLayout;
import android.widget.RelativeLayout;

import com.facebook.react.uimanager.ThemedReactContext;
import com.opentok.android.OpentokError;
import com.opentok.android.Subscriber;
import com.opentok.android.SubscriberKit;
import com.opentok.android.Session;
import com.opentok.android.Stream;


public class SubscriberView extends FrameLayout implements Session.SessionListener, SubscriberKit.SubscriberListener {
    /* package */ String apiKey;
    /* package */ String sessionId;
    /* package */ String token;

    private Session mSession;
    private Subscriber mSubscriber;

    public SubscriberView(ThemedReactContext reactContext) {
        super(reactContext);
    }

    @Override
    public void onAttachedToWindow() {
        super.onAttachedToWindow();
        if (mSession == null) {
            this.mount();
        }
    }

    private void mount() {
        mSession = new Session(getContext(), this.apiKey, this.sessionId);
        mSession.setSessionListener(this);

        mSession.connect(this.token);
    }

    private void startSubscribing(Stream stream) {
        mSubscriber = new Subscriber(getContext(), stream);
        mSession.subscribe(mSubscriber);

        attachSubscriberView();
    }

    private void attachSubscriberView() {
        addView(mSubscriber.getView(), new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT));
    }

    /** Session listener **/

    @Override
    public void onConnected(Session session) {}

    @Override
    public void onDisconnected(Session session) {}

    public void onStreamReceived(Session session, Stream stream) {
        if (mSubscriber != null) {
            startSubscribing(stream);
        }
    }

    @Override
    public void onStreamDropped(Session session, Stream stream) {}

    @Override
    public void onError(Session session, OpentokError opentokError) {}

    /** Subscriber listener **/

    @Override
    public void onConnected(SubscriberKit subscriber) {}

    @Override
    public void onDisconnected(SubscriberKit subscriber) {}

    @Override
    public void onError(SubscriberKit subscriberKit, OpentokError opentokError) {}
}
