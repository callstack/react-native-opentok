import React, { Component } from 'react';
import { requireNativeComponent, NativeAppEventEmitter } from 'react-native';

const RNOpenTokSubscriberView = requireNativeComponent('RNOpenTokSubscriberView', SubscriberView);

const subscribeListeners = ['onSubscribeStart', 'onSubscribeStop', 'onSubscribeError'];
const NOOP = () => {};

export default class SubscriberView extends Component {
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

  addListener = (name) => {
    if (!this.props.listeners[name]) {
      this.props.listeners[name] = NativeAppEventEmitter.addListener(
        name,
        () => this.props[name]()
      );
    }
  }

  removeListener = (name) => {
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
