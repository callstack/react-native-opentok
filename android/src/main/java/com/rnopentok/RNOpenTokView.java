package com.rnopentok;

import android.view.SurfaceView;
import android.widget.FrameLayout;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.ThemedReactContext;
import com.opentok.android.BaseVideoRenderer;
import com.opentok.android.VideoRenderFactory;

public class RNOpenTokView extends FrameLayout {
    protected String mSessionId;
    private static ThemedReactContext reactContext = null;
    private BaseVideoRenderer renderer;

    public RNOpenTokView(ThemedReactContext context) {
        super(context);

        reactContext = context;

        renderer = VideoRenderFactory.constructRenderer(getContext());
    }

    public void setSessionId(String sessionId) {
        mSessionId = sessionId;
    }

    protected BaseVideoRenderer getVideoRenderer() {
        return renderer;
    }

    protected void attachVideoView() {
        addView(renderer.getView(), new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT));
        requestLayout();
    }

    protected void detachVideoView() {
        removeView(renderer.getView());
    }

    public void setZOrderMediaOverlay(boolean value) {
        if (renderer.getView() instanceof SurfaceView) {
            ((SurfaceView)renderer.getView()).setZOrderMediaOverlay(value);
            int index = indexOfChild(renderer.getView());
            if (index != -1) {
                removeViewAt(index);
                attachVideoView();
            }
        }
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
