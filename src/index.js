/* @flow */
import React from 'react';
import { NativeModules, NativeAppEventEmitter } from 'react-native';
import SubscriberView from './components/SubscriberView';
import PublisherView from './components/PublisherView';

import type { Message, PublisherViewProps, SubscriberViewProps } from './types';

const listeners = {};

const Session = {
  sendMessage: NativeModules.RNOpenTokSession.sendMessage,
  onMessageReceived(callback: (e: Message) => void) {
    if (!listeners.onMessageReceived) {
      listeners.onMessageReceived = NativeAppEventEmitter.addListener(
        'onMessageReceived',
        (e: Message) => callback(e)
      );
    }
  },
  stopListener() {
    if (listeners.onMessageReceived) {
      listeners.onMessageReceived.remove();
      Reflect.deleteProperty(this.props.listeners, 'onMessageReceived');
    }
  },
};

export default {
  connectToSession: (sessionId: string, token: string) => {
    NativeModules.RNOpenTok.connectToSession(sessionId, token);
  },

  Session,
  SubscriberView: (props: SubscriberViewProps) => (
    <SubscriberView listeners={listeners} {...props} />
  ),
  PublisherView: (props: PublisherViewProps) => (
    <PublisherView listeners={listeners} {...props} />
  ),
};
