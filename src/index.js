import React from 'react';
import { NativeModules, NativeAppEventEmitter } from 'react-native';
import SubscriberView from './components/SubscriberView';
import PublisherView from './components/PublisherView';

const listeners = {};

const Session = {
  sendMessage: NativeModules.RNOpenTokSession.sendMessage,
  onMessageRecieved(callback) {
    if (!listeners.onMessageRecieved) {
      listeners.onMessageRecieved = NativeAppEventEmitter.addListener(
        'onMessageRecieved',
        (e) => callback(e)
      );
    }
  },
  stopListener() {
    if (listeners.onMessageRecieved) {
      listeners.onMessageRecieved.remove();
      Reflect.deleteProperty(this.props.listeners, 'onMessageRecieved');
    }
  },
};

export default {
  ...NativeModules.RNOpenTok,
  Session,
  SubscriberView: (props) => <SubscriberView listeners={listeners} {...props} />,
  PublisherView: (props) => <PublisherView listeners={listeners} {...props} />,
};
