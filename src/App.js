import React, {Component} from 'react';
import {
Platform,
StyleSheet,
Text,
View
}
from 'react-native';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
export default class App extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <SignupScreen />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
