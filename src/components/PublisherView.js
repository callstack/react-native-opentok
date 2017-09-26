/* @flow */
import React from 'react';
import { requireNativeComponent, NativeAppEventEmitter } from 'react-native';

import type { PublisherViewProps } from '../types';

/* $FlowFixMe - We are disabling flow here, because refernece is needed at this point */
const RNOpenTokPublisherView = requireNativeComponent('RNOpenTokPublisherView', PublisherView);

const publishListeners = ['onPublishStart', 'onPublishStop', 'onPublishError'];
const NOOP = () => {};

export default class PublisherView extends React.Component {
  porps: PublisherViewProps;
  
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
      onPublishStart,
      onPublishStop,
      onPublishError,
      ...passProps
    } = this.props;

    return <RNOpenTokPublisherView {...passProps} />
  }
}
