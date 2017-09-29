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
