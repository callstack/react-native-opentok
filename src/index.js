/* @flow */
import React from 'react';
import { NativeModules, NativeAppEventEmitter } from 'react-native';
import SubscriberView from './components/SubscriberView';
import PublisherView from './components/PublisherView';

import type { Message, PublisherViewProps, SubscriberViewProps } from './types';

const listeners = {};

const Session = {
  sendMessage: NativeModules.RNOpenTokSession.sendMessage,
  onMessageReceived(callback: (e: MessageEvent) => void) {
    if (!listeners.onMessageReceived) {
      listeners.onMessageReceived = NativeAppEventEmitter.addListener(
        'onMessageReceived',
        (e: MessageEvent) => {
          callback(e);
        }
      );
    }
  },
  stopListener() {
    if (listeners.onMessageReceived) {
      listeners.onMessageReceived.remove();
      delete this.props.listeners.onMessageReceived;
    }
  },
};

export default {
  connect: (sessionId: string, token: string) => {
    NativeModules.RNOpenTok.connect(sessionId, token);
  },

  disconnect: (sessionId: string) => {
    NativeModules.RNOpenTok.disconnect(sessionId);
  },

  disconnectAll: () => {
    NativeModules.RNOpenTok.disconnectAll();
  },

  Session,
  SubscriberView: (props: SubscriberViewProps) => (
    <SubscriberView listeners={listeners} {...props} />
  ),
  PublisherView: (props: PublisherViewProps) => (
    <PublisherView listeners={listeners} {...props} />
  ),
};
