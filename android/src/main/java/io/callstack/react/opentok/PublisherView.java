package io.callstack.react.opentok;

import android.view.View;
import android.widget.FrameLayout;

import com.facebook.react.uimanager.ThemedReactContext;
import com.opentok.android.OpentokError;
import com.opentok.android.Publisher;
import com.opentok.android.PublisherKit;
import com.opentok.android.Session;
import com.opentok.android.Stream;

public class PublisherView extends FrameLayout implements Session.SessionListener, PublisherKit.PublisherListener {
    /* package */ String apiKey;
    /* package */ String sessionId;
    /* package */ String token;

    private Session mSession;
    private Publisher mPublisher;

    public PublisherView(ThemedReactContext reactContext) {
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

    private void startPublishing() {
        mPublisher = new Publisher(getContext());
        mPublisher.setPublisherListener(this);

        mSession.publish(mPublisher);

        attachPublisherView();
    }

    private void attachPublisherView() {
        addView(mPublisher.getView(), new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT));
    }

    /** Session listener **/

    @Override
    public void onConnected(Session session) {
        startPublishing();
    }

    @Override
    public void onDisconnected(Session session) {}

    @Override
    public void onStreamReceived(Session session, Stream stream) {}

    @Override
    public void onStreamDropped(Session session, Stream stream) {}

    @Override
    public void onError(Session session, OpentokError opentokError) {}

    /** Publisher listener **/

    @Override
    public void onStreamCreated(PublisherKit publisherKit, Stream stream) {}

    @Override
    public void onStreamDestroyed(PublisherKit publisherKit, Stream stream) {}

    @Override
    public void onError(PublisherKit publisherKit, OpentokError opentokError) {}
}
