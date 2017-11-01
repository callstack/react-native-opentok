/* @flow */
import React from 'react';
import { requireNativeComponent } from 'react-native';

import NativeEventEmitter from '../NativeEventEmitter';

import type { PublisherViewProps } from '../types';

const RNOpenTokPublisherView = requireNativeComponent(
  'RNOpenTokPublisherView',
  /* $FlowFixMe - We are disabling flow here, because refernece is needed at this point */
  PublisherView
);

const publishListeners = ['onPublishStart', 'onPublishStop', 'onPublishError'];
const NOOP = () => {};

export default class PublisherView extends React.Component<PublisherViewProps> {
  static defaultProps = {
    onPublishStart: NOOP,
    onPublishStop: NOOP,
    onPublishError: NOOP,
    sessionId: '',
  };

  componentWillMount() {
    publishListeners.forEach(listener => this.addListener(listener));
  }

  componentWillUnmount() {
    publishListeners.forEach(listener => this.removeListener(listener));
  }

  addListener = (name: string) => {
    if (!this.props.listeners[name]) {
      this.props.listeners[name] = NativeEventEmitter.addListener(name, e =>
        this.props[name](e)
      );
    }
  };

  removeListener = (name: string) => {
    if (this.props.listeners[name]) {
      this.props.listeners[name].remove();
      delete this.props.listeners[name];
    }
  };

  render() {
    const {
      listeners,
      onPublishStart,
      onPublishStop,
      onPublishError,
      ...passProps
    } = this.props;

    return <RNOpenTokPublisherView {...passProps} />;
  }
}
