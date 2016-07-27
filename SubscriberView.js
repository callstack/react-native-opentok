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

class SubscriberView extends React.Component {
  static propTypes = {
    ...View.propTypes,
    token: React.PropTypes.string.isRequired,
    sessionId: React.PropTypes.string.isRequired,
    apiKey: React.PropTypes.string.isRequired,
    // Callbacks
    onSubscribeStart: React.PropTypes.func,
    onSubscribeError: React.PropTypes.func,
    onSubscribeStop: React.PropTypes.func,
    onClientConnected: React.PropTypes.func,
    onClientDisconnected: React.PropTypes.func,
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
