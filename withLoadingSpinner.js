/**
 * Copyright (c) 2015-present, Callstack Sp z o.o.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';

const withLoadingSpinner = (Component, callbackName) => class SpinnerView extends React.Component {
  static propTypes = {
    /**
     * Custom style of the spinner that should overwrite default
     * styling
     */
    spinnerContainerStyle: React.PropTypes.any,
  };

  state = {
    renderSpinner: true,
  };

  onRequestFulfilled = () => {
    if (typeof this.props[callbackName] === 'function') {
      this.props[callbackName]();
    }
    this.setState({
      renderSpinner: false,
    });
  };

  render() {
    const passProps = {
      ...this.props,
      [callbackName]: this.onRequestFulfilled,
    };

    return (
      <View style={styles.container}>
        <Component {...passProps} />
        {this.state.renderSpinner && (
          <View style={[styles.spinnerContainer, this.props.spinnerContainerStyle]}>
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

export default withLoadingSpinner;
