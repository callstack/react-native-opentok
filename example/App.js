/* @flow */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

/* Import should look like this: */
//import OpenTok from 'react-native-open-tok';

import OpenTok from '../';

const sessionId = 'YOUR_SESSION_ID';
const token = 'YOUR_TOKEN';

export default class App extends Component {
  async componentWillMount() {
    await OpenTok.connect(sessionId, token);
    OpenTok.onSignalReceived((e) => console.log(e));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome} onPress={
          async () => {
            const isSent = await OpenTok.sendSignal(sessionId, 'message', 'a');
            console.log(isSent);
          }
        }>
          Send signal
        </Text>
        <OpenTok.PublisherView sessionId={sessionId} />
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('example', () => App);
