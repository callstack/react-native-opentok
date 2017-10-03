package com.rnopentok;

import android.widget.FrameLayout;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.ThemedReactContext;

public class RNOpenTokView extends FrameLayout {
    protected String mSessionId;
    private static ThemedReactContext reactContext = null;

    public RNOpenTokView(ThemedReactContext context) {
        super(context);

        reactContext = context;
    }

    public void setSessionId(String sessionId) {
        mSessionId = sessionId;
    }

    protected void sendEvent(Events event, WritableMap payload) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(event.toString(), payload);
    }

    /** View methods **/

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
