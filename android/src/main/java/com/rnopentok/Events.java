package com.rnopentok;

enum Events {
    EVENT_PUBLISH_START("onPublishStart"),
    EVENT_PUBLISH_STOP("onPublishStop"),
    EVENT_PUBLISH_ERROR("onPublishError"),
    EVENT_SUBSCRIBE_START("onSubscribeStart"),
    EVENT_SUBSCRIBE_STOP("onSubscribeStop"),
    EVENT_SUBSCRIBE_ERROR("onSubscribeError"),
    EVENT_ON_SIGNAL_RECEIVED("onSignalReceived");

    private final String mName;

    Events(final String name) {
        mName = name;
    }

    @Override
    public String toString() {
        return mName;
    }
}