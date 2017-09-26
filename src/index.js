/* @flow */
import React from 'react';
import { NativeModules, NativeAppEventEmitter } from 'react-native';
import SubscriberView from './components/SubscriberView';
import PublisherView from './components/PublisherView';

const listeners = {};
let isInitialized = false;

const Session = {
  sendMessage: NativeModules.RNOpenTokSession.sendMessage,
  onMessageReceived(callback) {
    if (!listeners.onMessageReceived) {
      listeners.onMessageReceived = NativeAppEventEmitter.addListener(
        'onMessageReceived',
        (e: Object) => callback(e)
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
  initSession: (sessionId: string) => {
    if (!isInitialized) {
      NativeModules.RNOpenTok.initSession(sessionId);
      isInitialized = true;
    } else {
      NativeModules.RNOpenTok.changeSession(sessionId);
    }
  },

  connectWithToken: (token: string): void => {
    NativeModules.RNOpenTok.connectWithToken(token);
  },

  Session,
  SubscriberView: (props) => <SubscriberView listeners={listeners} {...props} />,
  PublisherView: (props) => <PublisherView listeners={listeners} {...props} />,
};
