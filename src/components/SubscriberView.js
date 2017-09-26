/* @flow */
import React from 'react';
import { requireNativeComponent, NativeAppEventEmitter } from 'react-native';

import type { SubscriberViewProps } from '../types';

/* $FlowFixMe - We are disabling flow here, because refernece is needed at this point */
const RNOpenTokSubscriberView = requireNativeComponent('RNOpenTokSubscriberView', SubscriberView);

const subscribeListeners = ['onSubscribeStart', 'onSubscribeStop', 'onSubscribeError'];
const NOOP = () => {};

export default class SubscriberView extends React.Component {
  props: SubscriberViewProps;
  
  static defaultProps = {
    onSubscribeStart: NOOP,
    onSubscribeStop: NOOP,
    onSubscribeError: NOOP,
  }

  componentWillMount() {
    subscribeListeners.forEach((listener) => this.addListener(listener));
  }

  componentWillUnmount() {
    subscribeListeners.forEach((listener) => this.removeListener(listener));
  }

  addListener = (name: string) => {
    if (!this.props.listeners[name]) {
      this.props.listeners[name] = NativeAppEventEmitter.addListener(
        name,
        () => this.props[name]()
      );
    }
  }

  removeListener = (name: string) => {
    if (this.props.listeners[name]) {
      this.props.listeners[name].remove();
      Reflect.deleteProperty(this.props.listeners, name);
    }
  }

  render () {
    const {
      listeners,
      onSubscribeStart,
      onSubscribeStop,
      onSubscribeError,
      ...passProps
    } = this.props;

    return <RNOpenTokSubscriberView {...passProps} />
  }
}
