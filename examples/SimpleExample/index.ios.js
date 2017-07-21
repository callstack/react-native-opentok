/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { SubscriberView } from 'react-native-opentok';

export default class SimpleExample extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SubscriberView
          apiKey="45921772"
          sessionId="2_MX40NTkyMTc3Mn5-MTUwMDYzODY5MzEzN353c1FIM3NvWTh1MnpWWWo0azdaenl4ZFN-fg"
          token="T1==cGFydG5lcl9pZD00NTkyMTc3MiZzZGtfdmVyc2lvbj1kZWJ1Z2dlciZzaWc9Njk1YTY1YjJkY2U2Y2NmNzljN2ZmZmE0Mzk3YmU3M2NiMzJjMmM4YTpzZXNzaW9uX2lkPTJfTVg0ME5Ua3lNVGMzTW41LU1UVXdNRFl6T0RZNU16RXpOMzUzYzFGSU0zTnZXVGgxTW5wV1dXbzBhemRhZW5sNFpGTi1mZyZjcmVhdGVfdGltZT0xNTAwNjM4ODYwJnJvbGU9c3Vic2NyaWJlciZub25jZT0xNTAwNjM4ODYwLjQ1NjkxMzM4NTY5ODMxJmV4cGlyZV90aW1lPTE1MDMyMzA4NjA="
          style={{ width: 300, height: 200 }}
        />
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
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

AppRegistry.registerComponent('SimpleExample', () => SimpleExample);
