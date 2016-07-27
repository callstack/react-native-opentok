/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  StyleSheet,
} from 'react-native';
import { PublisherView } from 'react-native-opentok';
import { fetch } from './fetch';
import { OPENTOK_API_KEY, API_URL } from './variables';

class Basic extends Component {
  state = {
    sessionId: '',
    publisherToken: '',
    subscriberToken: '',
  }

  async componentWillMount() {
    const { sessionId } = await fetch(`${API_URL}/create-session`, { method: 'GET' });

    const publisher = await fetch(`${API_URL}/create-token`, {
      method: 'POST',
      body: {
        sessionId,
        options: {
          role: 'publisher',
          data: 'username=testpublisher',
        },
      },
    });

    const subscriber = await fetch(`${API_URL}/create-token`, {
      method: 'POST',
      body: {
        sessionId,
        options: {
          role: 'subscriber',
          data: 'username=testsubscriber',
        },
      },
    });

    this.setState({
      sessionId,
      publisherToken: publisher.token,
      subscriberToken: subscriber.token,
    });
  }

  render() {
    const { sessionId, publisherToken } = this.state;
    return (
      <View style={styles.container}>
        {!!publisherToken && (
          <PublisherView
            apiKey={OPENTOK_API_KEY}
            sessionId={sessionId}
            token={publisherToken}
            onConnected={() => console.log('Session connected')}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('Basic', () => Basic);
