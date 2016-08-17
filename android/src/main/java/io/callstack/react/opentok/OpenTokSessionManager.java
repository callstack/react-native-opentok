package io.callstack.react.opentok;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.opentok.android.OpentokError;
import com.opentok.android.Session;
import com.opentok.android.Stream;
import com.opentok.android.Connection;

import java.util.Map;

public class OpenTokSessionManager extends ReactContextBaseJavaModule implements Session.SessionListener, Session.SignalListener {

    protected Session mSession;

    public OpenTokSessionManager(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "OpenTokSessionManager";
    }

    @ReactMethod
    public void connect(String apiKey, String sessionId, String token) {
        mSession = new Session(getReactApplicationContext(), apiKey, sessionId);
        mSession.setSessionListener(this);
        mSession.connect(token);
    }

    @ReactMethod
    public void sendMessage(String message) {
        mSession.sendSignal("message", message);
    }

    protected void sendEvent(Events event, WritableMap payload) {
        ReactContext reactContext = (ReactContext)getReactApplicationContext();
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(event.toString(), payload);
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
    public void onError(Session session, OpentokError opentokError) {}

    /* Signal Listener methods */

    @Override
    public void onSignalReceived(Session session, String type, String data, Connection connection) {
        WritableMap payload = Arguments.createMap();
        payload.putString("data", data);

        sendEvent(Events.EVENT_PUBLISH_ERROR, payload);
    }
}