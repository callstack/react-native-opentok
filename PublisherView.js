/**
 * Copyright (c) 2015-present, Callstack Sp z o.o.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { requireNativeComponent, StyleSheet, ActivityIndicator, View } from 'react-native';
import React from 'react';

const noop = () => {};

/**
 * A React component for publishing video stream over OpenTok to the
 * session provided
 *
 * `Publisher` supports default styling, just like any other View.
 *
 * After successfull session creation, the publisher view displaying live
 * preview of a stream will be appended to the container and will take available
 * space, as layed out by React.
 */
class PublisherView extends React.Component {
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
     * This function is called on publish start
     */
    onPublishStart: React.PropTypes.func,
    /**
     * This function is called on publish error
     */
    onPublishError: React.PropTypes.func,
    /**
     * This function is called on publish stop
     */
    onPublishStop: React.PropTypes.func,
    /**
     * This function is called when new client is connected to
     * the current stream
     *
     * Receives payload:
     * ```
     * {
     *   connectionId: string,
     *   creationTime: string,
     *   data: string,
     * }
     * ```
     */
    onClientConnected: React.PropTypes.func,
    /**
     * This function is called when client is disconnected from
     * the current stream
     *
     * Receives payload:
     * ```
     * {
     *   connectionId: string,
     * }
     * ```
     */
    onClientDisconnected: React.PropTypes.func,
    /**
     * Custom style of the spinner that should overwrite default
     * styling
     */
    spinnerContainerStyle: React.PropTypes.any,
  };

  static defaultProps = {
    onPublishStart: noop,
    onPublishError: noop,
    onPublishStop: noop,
    onClientConnected: noop,
    onClientDisconnected: noop,
  };

  state = {
    renderSpinner: true,
  };

  onPublishStart = () => {
    this.props.onPublishStart();
    this.setState({
      renderSpinner: false,
    });
  };

  render() {
    const { spinnerContainerStyle, ...passProps } = this.props;

    return (
      <View style={styles.container}>
        <RCTPublisherView
          {...passProps}
          onPublishStart={this.onPublishStart}
        />
      {this.state.renderSpinner && (
        <View style={[styles.spinnerContainer, spinnerContainerStyle]}>
          <ActivityIndicator
            animating
            color={spinnerColor}
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

const RCTPublisherView = requireNativeComponent('RCTOpenTokPublisherView', PublisherView);

export default PublisherView;
