import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
}
from 'react-native';
export default class App extends Component<{}> {
  render() {
    return (
      <View>
        <Video source={require('../videos/video.webm')}   // Can be a URL or a local file.
         />
      </View>
    );
  }
}
