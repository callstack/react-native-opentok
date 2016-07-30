package io.callstack.react.opentok;

import com.facebook.react.uimanager.ThemedReactContext;
import com.opentok.android.Subscriber;
import com.opentok.android.Session;
import com.opentok.android.Stream;

public class SubscriberView extends SessionView {
    private Subscriber mSubscriber;

    public SubscriberView(ThemedReactContext reactContext) {
        super(reactContext);
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
    public void onStreamReceived(Session session, Stream stream) {
        if (mSubscriber != null) {
            startSubscribing(stream);
        }
    }
}
