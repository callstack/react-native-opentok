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

class PublisherView extends React.Component {
  static propTypes = {
    ...View.propTypes,
    spinnerColor: React.PropTypes.string,
    token: React.PropTypes.string.isRequired,
    sessionId: React.PropTypes.string.isRequired,
    apiKey: React.PropTypes.string.isRequired,
    // Callbacks
    onPublishStart: React.PropTypes.func,
    onPublishError: React.PropTypes.func,
    onPublishStop: React.PropTypes.func,
    onClientConnected: React.PropTypes.func,
    onClientDisconnected: React.PropTypes.func,
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
    const { spinnerColor, ...passProps } = this.props;

    return (
      <View>
        <RCTPublisherView
          {...passProps}
          onPublishStart={this.onPublishStart}
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

const RCTPublisherView = requireNativeComponent('RCTOpenTokPublisherView', PublisherView);

export default PublisherView;
