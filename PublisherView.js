import { requireNativeComponent, View } from 'react-native';
import React from 'react';

const noop = () => {};

class PublisherView extends React.Component {
  static propTypes = {
    onStartFailure: React.PropTypes.func,
    onConnected: React.PropTypes.func,
    onDisconnected: React.PropTypes.func,
    onStreamCreated: React.PropTypes.func,
    onStreamDestroyed: React.PropTypes.func,
    onConnectionCreated: React.PropTypes.func,
    onConnectionDestroyed: React.PropTypes.func,
    onUnknownError: React.PropTypes.func,
    onPublishError: React.PropTypes.func,
    token: React.PropTypes.string.isRequired,
    sessionId: React.PropTypes.string.isRequired,
    apiKey: React.PropTypes.string.isRequired,
    ...View.propTypes,
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
