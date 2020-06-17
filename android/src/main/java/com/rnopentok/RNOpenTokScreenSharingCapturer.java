package com.rnopentok;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.os.Handler;
import android.view.View;
import android.support.annotation.Nullable;

import com.opentok.android.BaseVideoCapturer;
import com.facebook.react.bridge.ReadableMap;


public class RNOpenTokScreenSharingCapturer extends BaseVideoCapturer {

    private boolean capturing = false;
    private View mView;

    private int fps = 15;
    private int width = 0;
    private int height = 0;

    private int[] frame;
    private Bitmap bmp;
    private Canvas canvas;

    private Handler mHandler = new Handler();

    private Runnable newFrame = new Runnable() {
        @Override
        public void run() {
            if (capturing) {
                int width = mView.getWidth();
                int height = mView.getHeight();

                if (
                    frame == null ||
                    RNOpenTokScreenSharingCapturer.this.width != width ||
                    RNOpenTokScreenSharingCapturer.this.height != height
                ) {
                    RNOpenTokScreenSharingCapturer.this.width = width;
                    RNOpenTokScreenSharingCapturer.this.height = height;

                    if (bmp != null) {
                        bmp.recycle();
                        bmp = null;
                    }

                    bmp = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888);

                    canvas = new Canvas(bmp);
                    frame = new int[width * height];
                }
                canvas.save();
                canvas.translate(-mView.getScrollX(), -mView.getScrollY());
                mView.draw(canvas);
                bmp.getPixels(frame, 0, width, 0, 0, width, height);

                provideIntArrayFrame(frame, ARGB, width, height, 0, false);

                canvas.restore();

                mHandler.postDelayed(newFrame, 1000 / fps);

            }
        }
    };

    public RNOpenTokScreenSharingCapturer(View view, @Nullable ReadableMap captureSettings) {
        mView = view;
        if (captureSettings != null) {
            fps = captureSettings.hasKey("fps") ? captureSettings.getInt("fps") : fps;
            width = captureSettings.hasKey("width") ? captureSettings.getInt("width") : width;
            height = captureSettings.hasKey("height") ? captureSettings.getInt("height") : height;
        }
    }

    @Override
    public void init() {

    }

    @Override
    public int startCapture() {
        capturing = true;
        mHandler.postDelayed(newFrame, 1000 / fps);
        return 0;
    }

    @Override
    public int stopCapture() {
        capturing = false;
        mHandler.removeCallbacks(newFrame);
        return 0;
    }

    @Override
    public boolean isCaptureStarted() {
        return capturing;
    }

    @Override
    public CaptureSettings getCaptureSettings() {
        CaptureSettings settings = new CaptureSettings();
        settings.fps = fps;
        settings.width = width;
        settings.height = height;
        settings.format = ARGB;
        return settings;
    }

    @Override
    public void destroy() {

    }

    @Override
    public void onPause() {

    }

    @Override
    public void onResume() {

    }

}
