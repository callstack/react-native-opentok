/* @flow */
import React from 'react';
import { NativeModules } from 'react-native';

import NativeEventEmitter from './NativeEventEmitter';
import SubscriberView from './components/SubscriberView';
import PublisherView from './components/PublisherView';

import type { Message, PublisherViewProps, SubscriberViewProps } from './types';

const listeners = {};

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

  sendSignal: async (sessionId: string, type: string, message: string) =>
    await NativeModules.RNOpenTok.sendSignal(sessionId, type, message),

  onSignalReceived: (callback: (e: MessageEvent) => void) => {
    if (!listeners.onSignalReceived) {
      listeners.onSignalReceived = NativeEventEmitter.addListener(
        'onSignalReceived',
        (e: MessageEvent) => {
          callback(e);
        }
      );
    }
  },

  removeSignalListener: () => {
    if (listeners.onSignalReceived) {
      listeners.onSignalReceived.remove();
      delete this.props.listeners.onSignalReceived;
    }
  },

  SubscriberView: (props: SubscriberViewProps) => (
    <SubscriberView listeners={listeners} {...props} />
  ),

  PublisherView: (props: PublisherViewProps) => (
    <PublisherView listeners={listeners} {...props} />
  ),
};
