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
     * @todo investigate the following callbacks
     */
    onStreamCreated: React.PropTypes.func,
    onStreamDestroyed: React.PropTypes.func,
    onConnectionCreated: React.PropTypes.func,
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
