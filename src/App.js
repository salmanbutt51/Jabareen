import React, {Component} from 'react';
// import Video from 'react-native-video';
import {
  Platform,
  StyleSheet,
  Text,
  View,
}
from 'react-native';
// import VideoScreen from './screens/VideoScreen';
import AppContainer from './utils/router';
export default class App extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <AppContainer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
