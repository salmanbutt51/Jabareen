import React, {Component} from 'react';
import Video from 'react-native-video';
import {
  Platform,
  StyleSheet,
  View,
}
from 'react-native';
import AppContainer from './utils/router';
export default class App extends Component<{}> {


  render() {
    return (

      <AppContainer />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
