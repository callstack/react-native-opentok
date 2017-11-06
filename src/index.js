/* @flow */
import React from 'react';
import { NativeModules } from 'react-native';

import NativeEventEmitter from './NativeEventEmitter';
import SubscriberView from './components/SubscriberView';
import PublisherView from './components/PublisherView';

import type {
  RNOpenTokEventCallback,
  OpenTokEvent,
  SubscriberProps,
  PublisherProps,
} from './types';

const listeners = {};

export default {
  events: {
    ON_SIGNAL_RECEIVED: 'onSignalReceived',
    ON_SESSION_CONNECTION_CREATED: 'onSessionConnectionCreated',
    ON_SESSION_CONNECTION_DESTROYED: 'onSessionConnectionDestroyed',
    ON_SESSION_DID_CONNECT: 'onSessionDidConnect',
    ON_SESSION_DID_DISCONNECT: 'onSessionDidDisconnect',
    ON_SESSION_DID_FAIL_WITH_ERROR: 'onSessionDidFailWithError',
    ON_SESSION_STREAM_CREATED: 'onSessionStreamCreated',
    ON_SESSION_STREAM_DESTROYED: 'onSessionStreamDestroyed',
  },

  connect: (sessionId: string, token: string): Promise<boolean | Error> =>
    NativeModules.RNOpenTok.connect(sessionId, token),

  disconnect: (sessionId: string): void => {
    NativeModules.RNOpenTok.disconnect(sessionId);
  },

  disconnectAll: (): void => {
    NativeModules.RNOpenTok.disconnectAll();
  },

  sendSignal: (
    sessionId: string,
    type: string,
    message: string
  ): Promise<boolean | Error> =>
    NativeModules.RNOpenTok.sendSignal(sessionId, type, message),

  on: (name: OpenTokEvent, callback: RNOpenTokEventCallback): void => {
    if (listeners[name]) {
      listeners[name].remove();
    }
    listeners[name] = NativeEventEmitter.addListener(name, callback);
  },

  removeListener: (name: OpenTokEvent): void => {
    if (listeners[name]) {
      listeners[name].remove();
      delete listeners[name];
    }
  },

  SubscriberView: (props: SubscriberProps) => (
    <SubscriberView listeners={listeners} {...props} />
  ),
  PublisherView: (props: PublisherProps) => (
    <PublisherView listeners={listeners} {...props} />
  ),
};
