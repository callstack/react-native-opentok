package io.callstack.react.opentok;

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
