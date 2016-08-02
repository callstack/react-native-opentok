/**
 * Copyright (c) 2015-present, Callstack Sp z o.o.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { PublisherView, SubscriberView } from 'react-native-opentok';
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

    // const subscriber = await fetch(`${API_URL}/create-token`, {
    //   method: 'POST',
    //   body: {
    //     sessionId,
    //     options: {
    //       role: 'subscriber',
    //       data: 'username=testsubscriber',
    //     },
    //   },
    // });

    this.setState({
      sessionId,
      publisherToken: publisher.token,
      // subscriberToken: subscriber.token,
    });
  }

  // <Text>Subscriber</Text>
  // {!!subscriberToken && (
  //   <SubscriberView
  //     apiKey={OPENTOK_API_KEY}
  //     sessionId={sessionId}
  //     token={subscriberToken}
  //     style={{ width: 300, height: 200 }}
  //   />
  // )}

  render() {
    const {
      sessionId,
      publisherToken,
      // subscriberToken,
    } = this.state;

    return (
      <View style={styles.container}>
        <Text>Publisher</Text>
        {!!publisherToken && (
          <PublisherView
            apiKey={OPENTOK_API_KEY}
            sessionId={sessionId}
            token={publisherToken}
            style={{ width: 300, height: 200 }}
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
