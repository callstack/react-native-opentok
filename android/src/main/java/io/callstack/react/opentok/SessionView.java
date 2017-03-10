package io.callstack.react.opentok;

import android.widget.FrameLayout;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.opentok.android.OpentokError;
import com.opentok.android.Publisher;
import com.opentok.android.Session;
import com.opentok.android.Stream;

abstract public class SessionView extends FrameLayout implements Session.SessionListener {
    protected String mApiKey;
    protected String mSessionId;
    protected String mToken;
    protected String mCameraPos;
    protected Session mSession;

    public SessionView(ThemedReactContext context) {
        super(context);
    }

    public void setApiKey(String apiKey) {
        mApiKey = apiKey;
    }

    public void setSessionId(String sessionId) {
        mSessionId = sessionId;
    }

    public void setToken(String token) {
        mToken = token;
    }

    @Override
    public void onAttachedToWindow() {
        super.onAttachedToWindow();
        if (mSession == null) {
            this.mount();
        }
    }

    private void mount() {
        mSession = new Session(getContext(), mApiKey, mSessionId);
        mSession.setSessionListener(this);

        onSessionCreated(mSession);

        mSession.connect(mToken);
    }

    protected void onSessionCreated(Session session) {}

    protected void sendEvent(Events event, WritableMap payload) {
        ReactContext reactContext = (ReactContext)getContext();
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                getId(),
                event.toString(),
                payload
        );
    }

    /** OpenTokSessionListener **/

    @Override
    public void onConnected(Session session) {}

    @Override
    public void onDisconnected(Session session) {}

    @Override
    public void onStreamReceived(Session session, Stream stream) {}

    @Override
    public void onStreamDropped(Session session, Stream stream) {}

    @Override
    public void onError(Session session, OpentokError opentokError) {
        onError(opentokError);
    }

    // todo(mike) - send onError properly
    protected void onError(OpentokError opentokError) {
        sendEvent(Events.EVENT_ON_MESSAGE_RECIEVED, Arguments.createMap());
    }
}
