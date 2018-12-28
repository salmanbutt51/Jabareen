import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
export default class Logo extends Component<{}> {
  render() {
    return(
      <View style={styles.logo}>
        <Image source={require('../images/logo.png')}
        resizeMode={'center'}
        style={{width: 300, height: 150}} />
      </View>
    )
  }
}
const styles = {
  logo: {
    // flex: 0.25,
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    marginBottom: 30
    // backgroundColor: 'blue'
  }
}
