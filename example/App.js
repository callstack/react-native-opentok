/* @flow */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';

import OpenTok from "react-native-opentok"; // eslint-disable-line

const sessionId =
  '1_MX40NTk3NDk4Mn5-MTUwOTUzMjUzMjk5NH5kMlRzelFmZi9MTXd5blJmTEx0RWxnUWN-fg';
const token =
  'T1==cGFydG5lcl9pZD00NTk3NDk4MiZzZGtfdmVyc2lvbj1kZWJ1Z2dlciZzaWc9MmE1MWVmODUzZDc5YzRhZTFmYzA2ZDE4NjNkNGI3YTE4ZjRjYWRjZDpzZXNzaW9uX2lkPTFfTVg0ME5UazNORGs0TW41LU1UVXdPVFV6TWpVek1qazVOSDVrTWxSemVsRm1aaTlNVFhkNWJsSm1URXgwUld4blVXTi1mZyZjcmVhdGVfdGltZT0xNTA5NTMyNTMzJnJvbGU9cHVibGlzaGVyJm5vbmNlPTE1MDk1MzI1MzMuMDE3OTE4NDEwMjU5NzAmZXhwaXJlX3RpbWU9MTUxMjEyNDUzMw==';

export default class App extends Component<{}> {
  /* $FlowFixMe we ignore the fact that componentWillMount shouldn't be async. Just for example purposes */
  async componentWillMount() {
    await OpenTok.connect(sessionId, token);
    OpenTok.on(OpenTok.events.ON_SIGNAL_RECEIVED, e => console.log(e));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text
          style={styles.welcome}
          onPress={async () => {
            console.log(this.ref);
            this.ref.switchCameras();
            const isSent = await OpenTok.sendSignal(sessionId, 'message', 'a');
            console.log(isSent);
          }}
        >
          Send signal
        </Text>
        <OpenTok.PublisherView
          sessionId={sessionId}
          ref={ref => (this.ref = ref)}
          mute
          style={{
            width: 300,
            height: 300,
            backgroundColor: 'red',
          }}
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
