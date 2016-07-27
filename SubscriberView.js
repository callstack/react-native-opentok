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
    spinnerColor: React.PropTypes.string,
    token: React.PropTypes.string.isRequired,
    sessionId: React.PropTypes.string.isRequired,
    apiKey: React.PropTypes.string.isRequired,
    // Callbacks
    onSubscribeStart: React.PropTypes.func,
    onSubscribeError: React.PropTypes.func,
    onSubscribeStop: React.PropTypes.func,
    onClientConnected: React.PropTypes.func,
    onClientDisconnected: React.PropTypes.func,
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
