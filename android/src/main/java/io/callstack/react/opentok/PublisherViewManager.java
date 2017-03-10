package io.callstack.react.opentok;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.ThemedReactContext;

public class PublisherViewManager extends SessionViewManager<PublisherView> {

    private PublisherView mPublisherView;
    private Camera camera;

    public PublisherViewManager(Camera camera) {
        super();
        this.camera = camera;
    }

    @Override
    public String getName() {
        return "RCTOpenTokPublisherView";
    }

    @Override
    protected PublisherView createViewInstance(ThemedReactContext reactContext) {
        mPublisherView = new PublisherView(reactContext);

        this.camera.addCameraListener(mPublisherView);

        return mPublisherView;
    }

}
