import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
}
from 'react-native';
// import HomeScreen from './screens/HomeScreen';
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
  },
});
