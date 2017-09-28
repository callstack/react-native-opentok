/* @flow */
import React from 'react';
import { NativeModules, NativeEventEmitter } from 'react-native';
import SubscriberView from './components/SubscriberView';
import PublisherView from './components/PublisherView';

import type { Message, PublisherViewProps, SubscriberViewProps } from './types';

const listeners = {};

const Session = {
  sendMessage: async (sessionId: string, message: string) => {
    return await NativeModules.RNOpenTok.sendMessage(sessionId, message);
  },

  onMessageReceived: (callback: (e: MessageEvent) => void) => {
    const sessionEventEmitter = new NativeEventEmitter(NativeModules.RNOpenTok);
    if (!listeners.onMessageReceived) {
      listeners.onMessageReceived = sessionEventEmitter.addListener(
        'onMessageReceived',
        (e: MessageEvent) => {
          callback(e);
        }
      );
    }
  },

  stopListener: () => {
    if (listeners.onMessageReceived) {
      listeners.onMessageReceived.remove();
      delete this.props.listeners.onMessageReceived;
    }
  },
};

export default {
  connect: async (sessionId: string, token: string) => {
    await NativeModules.RNOpenTok.connect(sessionId, token);
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
