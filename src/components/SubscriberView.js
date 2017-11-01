/* @flow */
import React from 'react';
import { requireNativeComponent } from 'react-native';

import NativeEventEmitter from '../NativeEventEmitter';

import type { SubscriberViewPropsWithListeners } from '../types';

const RNOpenTokSubscriberView = requireNativeComponent(
  'RNOpenTokSubscriberView',
  /* $FlowFixMe - We are disabling flow here, because refernece is needed at this point */
  SubscriberView
);

const subscribeListeners = [
  'onSubscribeStart',
  'onSubscribeStop',
  'onSubscribeError',
];
const NOOP = () => {};

export default class SubscriberView extends React.Component<
  SubscriberViewPropsWithListeners
> {
  props: SubscriberViewPropsWithListeners;

  static defaultProps = {
    onSubscribeStart: NOOP,
    onSubscribeStop: NOOP,
    onSubscribeError: NOOP,
  };

  componentWillMount() {
    subscribeListeners.forEach(listener => this.addListener(listener));
  }

  componentWillUnmount() {
    subscribeListeners.forEach(listener => this.removeListener(listener));
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
      onSubscribeStart,
      onSubscribeStop,
      onSubscribeError,
      ...passProps
    } = this.props;

    return <RNOpenTokSubscriberView {...passProps} />;
  }
}
