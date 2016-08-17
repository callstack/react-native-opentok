package io.callstack.react.opentok;

enum Events {
    EVENT_PUBLISH_START("onPublishStart"),
    EVENT_PUBLISH_STOP("onPublishStop"),
    EVENT_PUBLISH_ERROR("onPublishError"),
    EVENT_SUBSCRIBE_START("onSubscribeStart"),
    EVENT_SUBSCRIBE_STOP("onSubscribeStop"),
    EVENT_SUBSCRIBE_ERROR("onSubscribeError"),
    EVENT_CLIENT_CONNECTED("onClientConnected"),
    EVENT_CLIENT_DISCONNECTED("onClientDisconnected"),
    EVENT_ON_MESSAGE_RECIEVED("onMessageRecieved");

    private final String mName;

    Events(final String name) {
        mName = name;
    }

    @Override
    public String toString() {
        return mName;
    }
}
