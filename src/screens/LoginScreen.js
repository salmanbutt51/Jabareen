import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';
import Logo from './Logo';
export default class App extends Component<{}> {
  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.loginText}>LOGIN</Text>
        <Logo />
        <View style={styles.form}>
          <Text style={styles.inputText}>Mobile</Text>
          <TextInput style={styles.inputBox}
          placeholder="User Mobile"
          placeholderTextColor = "#a6b8d4"
          />
          <Text style={styles.inputText}>Password</Text>
          <TextInput style={styles.inputBox}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor = "#a6b8d4"
          />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
          <View style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Don't have an account? <Text style={{color: '#28609e'}}>Sign Up</Text></Text>
          </View>
        </View>
      </View>
    )
  }
}
const styles = {
  container: {
    flex: 1,
    padding: 20
  },
  loginText:{
    marginTop: 20,
    color: 'black',
    fontSize: 20
  },
  form: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  inputText:{
    fontSize: 20,
    color: 'black'
  },
  inputBox: {
    borderWidth: 1,
    borderColor: '#a6b8d4',
    fontSize: 22,
    color: 'black',
    marginTop: 10,
    marginBottom: 30,
    // paddingVertical: 13,
    paddingHorizontal: 20
  },
  button: {
    backgroundColor: '#67c2fa',
    borderRadius: 5,
    marginVertical: 10,
    paddingVertical: 13
  },
  buttonText: {
    fontSize: 22,
    fontWeight: '200',
    color: '#fff',
    textAlign: 'center'
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: 20
  },
  forgotPasswordText: {
    fontSize: 22,
  }
}
