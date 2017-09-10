import React, { Component } from 'react';
import { requireNativeComponent, NativeAppEventEmitter } from 'react-native';

const RNOpenTokPublisherView = requireNativeComponent('RNOpenTokPublisherView', PublisherView);

const publishListeners = ['onPublishStart', 'onPublishStop', 'onPublishError'];
const NOOP = () => {};

export default class PublisherView extends Component {
  static defaultProps = {
    onPublishStart: NOOP,
    onPublishStop: NOOP,
    onPublishError: NOOP,
  }

  componentWillMount() {
    publishListeners.forEach((listener) => this.addListener(listener));
  }

  componentWillUnmount() {
    publishListeners.forEach((listener) => this.removeListener(listener));
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
      onPublishStart,
      onPublishStop,
      onPublishError,
      ...passProps
    } = this.props;

    return <RNOpenTokPublisherView {...passProps} />
  }
}
