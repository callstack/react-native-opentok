package com.rnopentok;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.opentok.android.OpentokError;
import com.opentok.android.Session;
import com.opentok.android.Stream;
import com.opentok.android.Publisher;
import com.opentok.android.PublisherKit;

public class RNOpenTokPublisherView extends RNOpenTokView implements PublisherKit.PublisherListener {
    private Publisher mPublisher;
    private Boolean mAudioEnabled;
    private Boolean mVideoEnabled;

    public RNOpenTokPublisherView(ThemedReactContext context) {
        super(context);
    }

    @Override
    public void onAttachedToWindow() {
        super.onAttachedToWindow();
        RNOpenTokSessionManager.getSessionManager().setPublisherListener(mSessionId, this);
    }

    @Override
    protected void onDetachedFromWindow() {
        super.onDetachedFromWindow();
        RNOpenTokSessionManager.getSessionManager().removePublisherListener(mSessionId);
    }

    public void setAudio(Boolean enabled) {
        if (mPublisher != null) {
            mPublisher.setPublishAudio(enabled);
        }

        mAudioEnabled = enabled;
    }

    public void setVideo(Boolean enabled) {
        if (mPublisher != null) {
            mPublisher.setPublishVideo(enabled);
        }

        mVideoEnabled = enabled;
    }

    public void cycleCamera() {
        if (mPublisher != null) {
            mPublisher.cycleCamera();
        }
    }

    private void startPublishing() {
        mPublisher = new Publisher(getContext());
        mPublisher.setPublisherListener(this);

        mPublisher.setPublishAudio(mAudioEnabled);
        mPublisher.setPublishVideo(mVideoEnabled);

        Session session = RNOpenTokSessionManager.getSessionManager().getSession(mSessionId);
        session.publish(mPublisher);

        attachPublisherView();
    }

    private void attachPublisherView() {
        addView(mPublisher.getView(), new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT));
        requestLayout();
    }

    private void cleanUpPublisher() {
        removeView(mPublisher.getView());
        // mPublisher.destroy();
        mPublisher = null;
    }

    public void onConnected(Session session) {
        startPublishing();
    }

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
        WritableMap payload = Arguments.createMap();
        payload.putString("connectionId", opentokError.toString());

        sendEvent(Events.EVENT_PUBLISH_ERROR, payload);
        cleanUpPublisher();
    }
}
