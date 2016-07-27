/**
 * Copyright (c) 2015-present, Callstack Sp z o.o.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { requireNativeComponent, ActivityIndicator, View } from 'react-native';
import React from 'react';

const noop = () => {};

class SubscriberView extends React.Component {
  static propTypes = {
    ...View.propTypes,
    /**
     * Color of the Spinner (defaults to gray)
     */
    spinnerColor: React.PropTypes.string,
    /**
     * {String} token
     */
    token: React.PropTypes.string.isRequired,
    /**
     * {String} sessionId
     */
    sessionId: React.PropTypes.string.isRequired,
    /**
     * {String} apiKey
     */
    apiKey: React.PropTypes.string.isRequired,
    /**
     * Called when there was an error during creating a new session
     */
    onStartFailure: React.PropTypes.func,
    /**
     * Called when session is created and we connected successfully
     */
    onConnected: React.PropTypes.func,
    /**
     * Called when session was disconnected
     */
    onDisconnected: React.PropTypes.func,
    /**
     * Called when subscribing is about to start
     */
    onSubscribeStart: React.PropTypes.func,
    /**
     * Called when there was an error during subscribing
     */
    onSubscribeError: React.PropTypes.func,
    /**
     * Called when an unknown error happens during either
     * establishing a new session or publishing to the session
     */
    onUnknownError: React.PropTypes.func,
    /**
     * Called when subscriber joins stream
     */
    onStreamConnected: React.PropTypes.func,
    /**
     * Called when when subscriber is disconnected from stream
     */
    onStreamDisconnected: React.PropTypes.func,
    /**
     * Called when when subscriber reconnects to stream
     */
    onStreamReconnected: React.PropTypes.func,
    /**
     * Called when connection is successfully created
     */
    onConnectionCreated: React.PropTypes.func,
    /**
     * Called when connection is lost
     */
    onConnectionDestroyed: React.PropTypes.func,
  };

  static defaultProps = {
    onStartFailure: noop,
    onConnected: noop,
    onDisconnected: noop,
    onStreamConnected: noop,
    onStreamDisconnected: noop,
    onStreamReconnected: noop,
    onConnectionCreated: noop,
    onConnectionDestroyed: noop,
    onUnknownError: noop,
    onSubscribeStart: noop,
    onSubscribeError: noop,
  };

  state = {
    renderSpinner: true,
  };

  onSubscribeStart = () => {
    this.props.onSubscribeStart();
    this.setState({
      renderSpinner: false,
    });
  };

  render() {
    const { spinnerColor, ...passProps } = this.props;

    return (
      <View>
        <RCTPublisherView
          {...passProps}
          onSubscribeStart={this.onSubscribeStart}
        />
        {this.state.renderSpinner && (
          <ActivityIndicator
            animating
            color={spinnerColor}
          />
        )}
      </View>
    );
  }
}

const RCTSubscriberView = requireNativeComponent('RCTOpenTokSubscriberView', SubscriberView);

export default SubscriberView;
