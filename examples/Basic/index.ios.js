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
import { PublisherView } from 'react-native-opentok';

class Basic extends Component {
  render() {
    return (
      <View style={styles.container}>
        <PublisherView
          apiKey="45624372"
          sessionId="1_MX40NTYyNDM3Mn5-MTQ2OTQ1NTQwNDQ3MX5Vam1ISkVHcVdCV3NyRVU4cVBRZEwvVGV-fg"
          token="T1==cGFydG5lcl9pZD00NTYyNDM3MiZzaWc9YTdmZTI3MDAzN2M0Y2M3MWVlYTJlMWRjYTk0NDI4ZDEwYWIxNGIzODpzZXNzaW9uX2lkPTFfTVg0ME5UWXlORE0zTW41LU1UUTJPVFExTlRRd05EUTNNWDVWYW0xSVNrVkhjVmRDVjNOeVJWVTRjVkJSWkV3dlZHVi1mZyZjcmVhdGVfdGltZT0xNDY5NDU1NDUyJm5vbmNlPTAuMjI5NTUxNTE2MjQwNDYyNjYmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTQ2OTU0MTg1MiZjb25uZWN0aW9uX2RhdGE9dXNlcm5hbWUlM0RtaWtl"
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

AppRegistry.registerComponent('Basic', () => Basic);
