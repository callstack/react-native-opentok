/**
 * Copyright (c) 2015-present, Callstack Sp z o.o.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { requireNativeComponent, View } from 'react-native';
import React from 'react';

const noop = () => {};

class PublisherView extends React.Component {
  static propTypes = {
    ...View.propTypes,
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
     * Called when there was an error during publishing
     */
    onPublishError: React.PropTypes.func,
    /**
     * Called when an unknown error happens during either
     * establishing a new session or publishing to the session
     */
    onUnknownError: React.PropTypes.func,
    /**
     * Called when stream is created by publisher
     */
    onStreamCreated: React.PropTypes.func,
    /**
     * Called when stream is destroyed by publisher
     */
    onStreamDestroyed: React.PropTypes.func,
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
    onStreamCreated: noop,
    onStreamDestroyed: noop,
    onConnectionCreated: noop,
    onConnectionDestroyed: noop,
    onUnknownError: noop,
    onPublishError: noop,
  };

  render() {
    return <RCTPublisherView {...this.props} />;
  }
}

const RCTPublisherView = requireNativeComponent('RCTOpenTokPublisherView', PublisherView);

export default PublisherView;
