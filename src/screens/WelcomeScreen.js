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
        <View style={styles.logoView}>
          <Image source={require('../images/logo.png')}
            resizeMode={'contain'}
            style={{width: '100%', height: 130}}
          />
        </View>
        <View style={styles.bothButtons}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={styles.button}>
            <Text style={styles.textButton}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')} style={styles.button}>
            <Text style={styles.textButton}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = {
  container: {
    flex: 1,
    padding: 10
  },
  logoView: {
    alignItems: 'center',
    justifyContent: 'center',
    // paddingTop: 40,
    flex: 0.8
  },
  bothButtons: {
    flex: 0.2,
    justifyContent: 'flex-end',
    // backgroundColor: 'blue',
    alignItems: 'center'
  },
  button: {
    // flex: 1,
    backgroundColor: '#f33155',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: '100%',
    borderRadius: 5,
    borderColor: '#ef1c43',
    borderWidth: 5,
    marginVertical: 5
    // paddingVertical: 30
  },
  textButton: {
    color: '#fff',
    fontSize: 20
  }
};
