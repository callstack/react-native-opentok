package com.rnopentok;

enum Events {
    EVENT_PUBLISH_START("onPublishStart"),
    EVENT_PUBLISH_STOP("onPublishStop"),
    EVENT_PUBLISH_ERROR("onPublishError"),
    EVENT_SUBSCRIBE_START("onSubscribeStart"),
    EVENT_SUBSCRIBE_STOP("onSubscribeStop"),
    EVENT_SUBSCRIBE_ERROR("onSubscribeError"),
    EVENT_ON_SIGNAL_RECEIVED("onSignalReceived"),
    ON_ARCHIVE_STARTED_WITH_ID("onArchiveStartedWithId"),
    ON_ARCHIVE_STOPPED_WITH_ID("onArchiveStoppedWithId"),
    ON_SESSION_CONNECTION_CREATED("onSessionConnectionCreated"),
    ON_SESSION_CONNECTION_DESTROYED("onSessionConnectionDestroyed"),
    ON_SESSION_DID_RECONNECTING("onSessionDidReconnect"),
    ON_SESSION_DID_BEGIN_RECONNECTING("onSessionDidBeginReconnecting"),
    ON_SESSION_DID_CONNECT("onSessionDidConnect"),
    ON_SESSION_DID_DISCONNECT("onSessionDidDisconnect"),
    ON_SESSION_DID_FAIL_WITH_ERROR("onSessionDidFailWithError"),
    ON_SESSION_STREAM_CREATED("onSessionStreamCreated"),
    ON_SESSION_STREAM_DESTROYED("onSessionStreamDestroyed"),
    ERROR_NO_SCREEN_CAPTURE_VIEW("errorNoScreenCaptureView");


    private final String mName;

    Events(final String name) {
        mName = name;
    }

    @Override
    public String toString() {
        return mName;
    }
}