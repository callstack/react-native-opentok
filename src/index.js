/* @flow */
import React from 'react';
import { NativeModules, Platform, NativeEventEmitter, DeviceEventEmitter } from 'react-native';
import SubscriberView from './components/SubscriberView';
import PublisherView from './components/PublisherView';

import type { Message, PublisherViewProps, SubscriberViewProps } from './types';

const listeners = {};

const onSignalReceivedIOS = (callback: (e: MessageEvent) => void) => {
  const sessionEventEmitter = new NativeEventEmitter(NativeModules.RNOpenTok);
  if (!listeners.onSignalReceived) {
    listeners.onSignalReceived = sessionEventEmitter.addListener(
      'onSignalReceived',
      (e: MessageEvent) => {
        callback(e);
      }
    );
  }
};

const onSignalReceivedAndroid = (callback: (e: MessageEvent) => void) => {
  if (!listeners.onSignalReceived) {
    listeners.onSignalReceived = DeviceEventEmitter.addListener(
      'onSignalReceived',
      (e: MessageEvent) => {
        callback(e);
      }
    );
  }
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

  sendSignal: async (sessionId: string, type: string, message: string) => {
    return await NativeModules.RNOpenTok.sendSignal(sessionId, type, message);
  },

  onSignalReceived: Platform.select({
    ios: onSignalReceivedIOS,
    android: onSignalReceivedAndroid,
  }),

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
