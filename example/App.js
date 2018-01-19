/* @flow */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Button, View } from 'react-native';

import OpenTok, { Publisher } from "react-native-opentok"; // eslint-disable-line

import type { Ref } from 'react';

const sessionId =
  '1_MX40NTk1NTk5Mn5-MTUxMjA2NTAxODU3N34yeHJ6K0JaZ3gxYmRwbWs3WFpLUEp0akt-fg';
const token =
  'T1==cGFydG5lcl9pZD00NTk1NTk5MiZzZGtfdmVyc2lvbj1kZWJ1Z2dlciZzaWc9Zjg2ZjAyZGMxMmM3NTIyMmM2YTViN2RjMTA0MWMyNzk4ZTk5NjhjYzpzZXNzaW9uX2lkPTFfTVg0ME5UazFOVGs1TW41LU1UVXhNakEyTlRBeE9EVTNOMzR5ZUhKNkswSmFaM2d4WW1Sd2JXczNXRnBMVUVwMGFrdC1mZyZjcmVhdGVfdGltZT0xNTEyMDY1MDE4JnJvbGU9cHVibGlzaGVyJm5vbmNlPTE1MTIwNjUwMTguNjAxMTEzNTc1MDExNyZleHBpcmVfdGltZT0xNTE0NjU3MDE4';
export default class App extends Component<{}> {
  /* $FlowFixMe we ignore the fact that componentWillMount shouldn't be async. Just for example purposes */
  async componentWillMount() {
    await OpenTok.connect(sessionId, token);
    OpenTok.on(OpenTok.events.ON_SIGNAL_RECEIVED, e => console.log(e));
  }

  // async componentWillUnmount() {
  //   await OpenTok.disconnect(sessionId);
  // }

  ref: Ref<typeof Publisher>;

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={async () => {
            await OpenTok.sendSignal(sessionId, 'message', 'a');
          }}
          title="Send signal"
        />

        <Button
          onPress={() => {
            OpenTok.removeListener(OpenTok.events.ON_SIGNAL_RECEIVED);
          }}
          title="rem list"
        />
        {/* 
        <Publisher
          sessionId={sessionId}
          style={{ height: 100, width: 200, backgroundColor: 'black' }}
          ref={ref => {
            this.ref = ref;
          }}
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('example', () => App);
