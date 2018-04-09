package com.rnopentok;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.util.ReactFindViewUtil;
import com.opentok.android.BaseVideoCapturer;
import com.opentok.android.OpentokError;
import com.opentok.android.Session;
import com.opentok.android.Stream;
import com.opentok.android.Publisher;
import com.opentok.android.PublisherKit;

import android.hardware.Camera;
import android.support.annotation.Nullable;
import android.view.View;

public class RNOpenTokPublisherView extends RNOpenTokView implements PublisherKit.PublisherListener {
    private Publisher mPublisher;
    private Boolean mAudioEnabled;
    private Boolean mVideoEnabled;
    private Boolean mScreenCapture;
    private ReadableMap mScreenCaptureSettings;

    public enum CameraDirection {
        BACK,
        FRONT,
    };

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

    public void setCameraDirection(CameraDirection cameraDirection) {
        if (mPublisher != null && mPublisher.getCapturer() instanceof BaseVideoCapturer.CaptureSwitch) {
            ((BaseVideoCapturer.CaptureSwitch)mPublisher.getCapturer()).swapCamera(getCameraIndex(cameraDirection));
        }
    }

    private static int getCameraIndex(CameraDirection cameraDirection) {
        int facing;
        switch (cameraDirection) {
            case BACK: facing = Camera.CameraInfo.CAMERA_FACING_BACK; break;
            case FRONT: facing = Camera.CameraInfo.CAMERA_FACING_FRONT; break;
            default: throw new IllegalArgumentException("Invalid cameraDirection value");
        }

        int numCameras = Camera.getNumberOfCameras();
        for (int i = 0; i < numCameras; i++) {
            Camera.CameraInfo info = new Camera.CameraInfo();
            Camera.getCameraInfo(i, info);
            if (info.facing == facing) {
                return i;
            }
        }

        throw new MissingCameraException("Cannot find camera facing " + cameraDirection);
    }

    public void setScreenCapture(Boolean enabled) {
        mScreenCapture = enabled;

        // @TODO: recreate publisher on change
//        if (mPublisher != null) {
//            Session session = RNOpenTokSessionManager.getSessionManager().getSession(mSessionId);
//            session.unpublish(mPublisher);
//            RNOpenTokSessionManager.getSessionManager().removePublisherListener(mSessionId);
//            cleanUpPublisher();
//            startPublishing();
//        }
    }

    public void setScreenCaptureSettings(@Nullable ReadableMap screenCaptureSettings) {
        mScreenCaptureSettings = screenCaptureSettings;
    }

    private void startPublishing() {
        Publisher.Builder builder = new Publisher.Builder(getContext());
        if (mScreenCapture) {
            View captureView = ReactFindViewUtil.findView(this.getRootView(), "RN_OPENTOK_SCREEN_CAPTURE_VIEW");
            if (captureView == null) {
                sendEvent(Events.ERROR_NO_SCREEN_CAPTURE_VIEW, null);
                return;
            }
            mPublisher = builder.capturer(
                    new RNOpenTokScreenSharingCapturer(captureView, mScreenCaptureSettings)
            ).build();
        } else {
            mPublisher = builder.build();
        }

        mPublisher.setPublisherListener(this);
        mPublisher.setPublishAudio(mAudioEnabled);
        mPublisher.setPublishVideo(mVideoEnabled);

        if (mScreenCapture) {
            mPublisher.setPublisherVideoType(PublisherKit.PublisherKitVideoType.PublisherKitVideoTypeScreen);
            mPublisher.setAudioFallbackEnabled(false);
        }

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
        mPublisher.destroy();
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

    private static class MissingCameraException extends RuntimeException {
        MissingCameraException(String message) {
            super(message);
        }
    }
}
