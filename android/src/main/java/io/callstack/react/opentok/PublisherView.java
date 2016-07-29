package io.callstack.react.opentok;

import android.support.annotation.Nullable;
import android.view.View;
import android.widget.FrameLayout;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.facebook.react.views.art.ARTGroupShadowNode;
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

    public enum Events {
        EVENT_PUBLISH_START("onPublishStart"),
        EVENT_PUBLISH_STOP("onPublishStop"),
        EVENT_PUBLISH_ERROR("onPublishError"),
        EVENT_CLIENT_CONNECTED("onClientConnected"),
        EVENT_CLIENT_DISCONNECTED("onClientDisconnected");

        private final String mName;

        Events(final String name) {
            mName = name;
        }

        @Override
        public String toString() {
            return mName;
        }
    }

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

    private void sendEvent(Events event, WritableMap payload) {
        ReactContext reactContext = (ReactContext)getContext();
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                getId(),
                event.toString(),
                payload
        );
    }

    private void cleanUpPublisher() {
        removeView(mPublisher.getView());
        mPublisher = null;
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
    public void onStreamCreated(PublisherKit publisherKit, Stream stream) {
        sendEvent(Events.EVENT_PUBLISH_START, Arguments.createMap());
    }

    @Override
    public void onStreamDestroyed(PublisherKit publisherKit, Stream stream) {
        sendEvent(Events.EVENT_PUBLISH_STOP, Arguments.createMap());
        cleanUpPublisher();
    }

    @Override
    public void onError(PublisherKit publisherKit, OpentokError opentokError) {
        // @todo pass proper error here
        sendEvent(Events.EVENT_PUBLISH_ERROR, Arguments.createMap());
        cleanUpPublisher();
    }
}
