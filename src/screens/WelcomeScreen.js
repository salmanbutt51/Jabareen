import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
export default class App extends Component<{}> {

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image source={require('../images/logo.png')}
            resizeMode={'contain'}
            style={{width: 300, height: 150}} />
        </View>
        <View style={styles.bothButtons}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={styles.loginButton}>
            <Text style={styles.textButton}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')} style={styles.signupButton}>
            <Text style={styles.textButton}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
const styles = {
  container: {
    flex: 1,
  },
  logo: {
    alignItems: 'center',
    paddingTop: 40,
  },
  bothButtons: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  loginButton: {
    // flex: 1,
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30
  },
  signupButton: {
    // flex: 1,
    backgroundColor: '#1f7f80',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30
  },
  textButton: {
    color: '#fff',
    fontSize: 30
  }
}
