/**
 * Copyright (c) 2015-present, Callstack Sp z o.o.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { requireNativeComponent, ActivityIndicator, View, StyleSheet } from 'react-native';
import React from 'react';

const noop = () => {};

/**
 * A React component for subscribing to video stream over OpenTok to the
 * session provided
 *
 * `Subscriber` supports default styling, just like any other View.
 *
 * After successfull session creation, the subscriber view displaying live
 * preview of a stream will be appended to the container and will take available
 * space, as layed out by React.
 */
class SubscriberView extends React.Component {
  static propTypes = {
    ...View.propTypes,
    /**
     * OpenTok token to use when publishing
     */
    token: React.PropTypes.string.isRequired,
    /**
     * OpenTok sessionId to use when publishing
     */
    sessionId: React.PropTypes.string.isRequired,
    /**
     * OpenTok API Key to be used
     */
    apiKey: React.PropTypes.string.isRequired,
    /**
     * This function is called on subscribe start
     */
    onSubscribeStart: React.PropTypes.func,
    /**
     * This function is called on subscribe error
     */
    onSubscribeError: React.PropTypes.func,
    /**
     * This function is called on subscribe stop
     */
    onSubscribeStop: React.PropTypes.func,
    /**
     * Custom style of the spinner that should overwrite default
     * styling
     */
    spinnerContainerStyle: React.PropTypes.any,
  };

  static defaultProps = {
    onSubscribeStart: noop,
    onSubscribeError: noop,
    onSubscribeStop: noop,
    onClientConnected: noop,
    onClientDisconnected: noop,
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
    const { spinnerContainerStyle, ...passProps } = this.props;

    return (
      <View>
        <RCTSubscriberView
          {...passProps}
          onSubscribeStart={this.onSubscribeStart}
        />
        {this.state.renderSpinner && (
          <View style={[styles.spinnerContainer, spinnerContainerStyle]}>
            <ActivityIndicator
              animating
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  spinnerContainer: {
    backgroundColor: '#f1f1f1',
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const RCTSubscriberView = requireNativeComponent('RCTOpenTokSubscriberView', SubscriberView);

export default SubscriberView;
