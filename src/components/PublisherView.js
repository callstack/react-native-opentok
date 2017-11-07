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

export default class PublisherView extends React.Component<
  PublisherViewProps,
  { camera: number }
> {
  static defaultProps = {
    onPublishStart: NOOP,
    onPublishStop: NOOP,
    onPublishError: NOOP,
    sessionId: '',
    audioDisabled: false,
    videoDisabled: false,
  };

  state = {
    camera: 0,
  };

  componentWillMount() {
    publishListeners.forEach(listener => this._addListener(listener));
  }

  componentWillUnmount() {
    publishListeners.forEach(listener => this._removeListener(listener));
  }

  _addListener = (name: string) => {
    if (!this.props.listeners[name]) {
      this.props.listeners[name] = NativeEventEmitter.addListener(name, e =>
        this.props[name](e)
      );
    }
  };

  _removeListener = (name: string) => {
    if (this.props.listeners[name]) {
      this.props.listeners[name].remove();
      delete this.props.listeners[name];
    }
  };

  switchCamera = () => {
    this.setState(prevState => ({ camera: prevState.camera + 1 }));
  };

  render() {
    const {
      listeners,
      onPublishStart,
      onPublishStop,
      onPublishError,
      ...passProps
    } = this.props;

    return <RNOpenTokPublisherView camera={'front'} {...passProps} />;
  }
}
