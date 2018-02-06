/* @flow */
import React from 'react';
import { requireNativeComponent } from 'react-native';

import NativeEventEmitter from '../NativeEventEmitter';
import RNOpenTok from '../';

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
    mute: false,
    video: true,
    screenCapture: false,
    screenCaptureSettings: {},
  };

  state = {
    camera: 0,
  };

  componentWillMount() {
    publishListeners.forEach(listener => this._addListener(listener));
    RNOpenTok.on(RNOpenTok.events.ERROR_NO_SCREEN_CAPTURE_VIEW, () => {
      throw new Error(
        'Could not find screen capture view. Make sure you are using <ScreenCapture> component.'
      );
    });
  }

  componentWillUnmount() {
    publishListeners.forEach(listener => this._removeListener(listener));
    RNOpenTok.removeListener(RNOpenTok.events.ERROR_NO_SCREEN_CAPTURE_VIEW);
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

    return <RNOpenTokPublisherView camera={this.state.camera} {...passProps} />;
  }
}
