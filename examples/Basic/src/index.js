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
  Text,
} from 'react-native';
import OpenTok from 'react-native-opentok';
import { fetch } from './fetch';
import { API_URL } from './variables';

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
    return (
      <View style={styles.container}>
        <Text>Hello!</Text>
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
