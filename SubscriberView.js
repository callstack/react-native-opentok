/**
 * Copyright (c) 2015-present, Callstack Sp z o.o.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { requireNativeComponent, View } from 'react-native';
import React from 'react';
import SessionViewProps from './SessionViewProps';
import withLoadingSpinner from './withLoadingSpinner';

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
    ...SessionViewProps,
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
  };

  static defaultProps = {
    onSubscribeStart: noop,
    onSubscribeError: noop,
    onSubscribeStop: noop,
  };

  render() {
    return <RCTSubscriberView {...this.props} />;
  }
}
const RCTSubscriberView = requireNativeComponent('RCTOpenTokSubscriberView', SubscriberView);

export default withLoadingSpinner(SubscriberView);
