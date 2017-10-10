/* @flow */
import React from 'react';
import { NativeModules } from 'react-native';

import NativeEventEmitter from './NativeEventEmitter';
import SubscriberView from './components/SubscriberView';
import PublisherView from './components/PublisherView';

import type {
  RNOpenTokEventCallback,
  PublisherViewProps,
  SubscriberViewProps,
} from './types';

const listeners = {};

export default {
  events: {
    ON_SESSION_CONNECTION_CREATED: 'onSessionConnectionCreated',
    ON_SESSION_CONNECTION_DESTROYED: 'onSessionConnectionDestroyed',
    ON_SESSION_DID_CONNECT: 'onSessionDidConnect',
    ON_SESSION_DID_DISCONNECT: 'onSessionDidDisconnect',
    ON_SESSION_DID_FAIL_WITH_ERROR: 'onSessionDidFailWithError',
    ON_SESSION_STREAM_CREATED: 'onSessionStreamCreated',
    ON_SESSION_STREAM_DESTROYED: 'onSessionStreamDestroyed',
    ON_ARCHIVE_STARTED_WITH_ID: 'onArchiveStartedWithId',
    ON_ARCHIVE_STOPPED_WITH_ID: 'onArchiveStoppedWithId',
    ON_SESSION_DID_BEGIN_RECONNECTING: 'onSessionDidBeginReconnecting',
    ON_SESSION_DID_RECONNECT: 'onSessionDidReconnect',
  },

  connect: async (sessionId: string, token: string) => {
    await NativeModules.RNOpenTok.connect(sessionId, token);
  },

  disconnect: (sessionId: string) => {
    NativeModules.RNOpenTok.disconnect(sessionId);
  },

  disconnectAll: () => {
    NativeModules.RNOpenTok.disconnectAll();
  },

  sendSignal: async (sessionId: string, type: string, message: string) =>
    NativeModules.RNOpenTok.sendSignal(sessionId, type, message),

  on: (name: string, callback: RNOpenTokEventCallback) => {
    if (listeners[name]) {
      listeners[name].remove();
    }
    listeners[name] = NativeEventEmitter.addListener(name, callback);
  },

  removeListener: (name: string) => {
    if (listeners[name]) {
      listeners[name].remove();
      delete listeners[name];
    }
  },

  SubscriberView: (props: SubscriberViewProps) => (
    <SubscriberView listeners={listeners} {...props} />
  ),

  PublisherView: (props: PublisherViewProps) => (
    <PublisherView listeners={listeners} {...props} />
  ),
};
