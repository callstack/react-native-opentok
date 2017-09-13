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

// Import should look like this:
//import OpenTok from 'react-native-open-tok';

import OpenTok from '../';

export default class App extends Component {
  componentWillMount() {
    OpenTok.initSession('YOUR_SESSION_ID');
    OpenTok.connectWithToken('YOUR_TOKEN');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome} onPress={() => OpenTok.Session.sendMessage('a')}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <OpenTok.SubscriberView
          style={{ width: 200, height: 100, backgroundColor: 'white'}}
        />
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
