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

class PublisherView extends React.Component {
  static propTypes = {
    ...View.propTypes,
    // Custom spinner container style to override
    // default style
    spinnerContainerStyle: React.PropTypes.any,
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
