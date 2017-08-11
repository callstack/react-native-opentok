/**
 * Copyright (c) 2016-present, Callstack Sp z o.o.
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
  Switch,
} from 'react-native';
import { PublisherView, SubscriberView, Session } from 'react-native-opentok';
import { OPENTOK_API_KEY, SESSION_ID, PUBLISHER_TOKEN, SUBSCRIBER_TOKEN } from './variables';

export default function Subscriber() {
  return (
    <SubscriberView
      apiKey={OPENTOK_API_KEY}
      sessionId={OPENTOK_SESSION_ID}
      token={OPENTOK_SUBSCRIBER_TOKEN}
      style={{ width: 300, height: 200 }}
    />
  );
}

class Basic extends Component {

  componentWillMount() {
    Session.connect(OPENTOK_API_KEY, SESSION_ID, PUBLISHER_TOKEN || SUBSCRIBER_TOKEN);
    Session.onMessageReceived((e) => console.log(e));
  }

  state = {
    isPublisher: true,
  }

  render() {
    const { isPublisher } = this.state;
    return (
      <View style={styles.container}>
        <Text onPress={() => { Session.sendMessage('test'); }}>
          {isPublisher ? 'Publisher' : 'Subscriber'}
        </Text>
        {
          isPublisher ? (
            <PublisherView
              apiKey={OPENTOK_API_KEY}
              sessionId={SESSION_ID}
              token={PUBLISHER_TOKEN}
              style={{ width: 300, height: 200 }}
            />
          ) : (
            <SubscriberView
              apiKey={OPENTOK_API_KEY}
              sessionId={SESSION_ID}
              token={SUBSCRIBER_TOKEN}
              style={{ width: 300, height: 200 }}
            />
          )
        }
        <Text>
          Is Publisher:
          <Switch
            value={isPublisher}
            onChange={() => this.setState({ isPublisher: !isPublisher })}
          />
        </Text>

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
