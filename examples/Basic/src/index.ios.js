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
  Dimensions,
  NativeModules,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Session, PublisherView, SubscriberView } from 'react-native-opentok';
import { OPENTOK_API_KEY, SESSION_ID, PUBLISHER_TOKEN, SUBSCRIBER_TOKEN } from './variables';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight= Dimensions.get('window').height;
const publisherWidth = deviceWidth - 20;
const publisherHeight = 2 * deviceHeight / 3 - 10;
const subscriberWidth = deviceWidth / 2 - 10;
const subscriberHeight = deviceHeight / 3 - 20;

const PublisherManager =  NativeModules.OpenTokPublisherViewManager;

class Basic extends Component {
  componentWillMount() {
    Session.connect(OPENTOK_API_KEY, SESSION_ID, PUBLISHER_TOKEN || SUBSCRIBER_TOKEN);
    Session.onMessageRecieved((e) => console.log(e));
  }

  updateCameraPos() {
    PublisherManager.cameraPosChanged();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.videoContainer}>
          <PublisherView
            apiKey={OPENTOK_API_KEY}
            sessionId={SESSION_ID}
            token={PUBLISHER_TOKEN}
            style={{ width: publisherWidth, height: publisherHeight }} />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.blockLeft}>
            <SubscriberView
              apiKey={OPENTOK_API_KEY}
              sessionId={SESSION_ID}
              token={SUBSCRIBER_TOKEN}
              style={{ width: subscriberWidth, height: subscriberHeight }} />
          </View>
          <View style={styles.blockRight}>
            <View style={styles.rowContainer}>
              <TouchableOpacity
                onPress={() => this.updateCameraPos()}
                style={styles.buttonContainer}
              >
                <Text style={styles.normalText}>Swap Camera</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
  videoContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderWidth: 1,
    borderColor: 'grey',
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  blockLeft: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginBottom: 10,
  },
  blockRight: {
    flex: 1,
    flexDirection: 'column',
    marginRight: 10,
    marginBottom: 10,
  },
  clientVideoContainer: {
    flex: 1,
    flexDirection: 'column',
    borderColor: 'grey',
    borderWidth: 1,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    padding: 10,
    backgroundColor: 'green',
  },
  normalText: {
    fontSize: 16,
  },
});

AppRegistry.registerComponent('Basic', () => Basic);
