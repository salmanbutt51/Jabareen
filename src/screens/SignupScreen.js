import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native';
import Logo from './Logo';
export default class App extends Component<{}> {
  render() {
    return(
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.loginText}>REGISTRATION</Text>
          <Logo />
          <View style={styles.form}>
            <Text style={styles.inputText}>Full Name<Text style={{color: 'red'}}>*</Text></Text>
            <TextInput style={styles.inputBox}
            placeholder="Full Name"
            autoCapitalize='none'
            placeholderTextColor = "#a6b8d4"
            />
            <Text style={styles.inputText}>Mobile<Text style={{color: 'red'}}>*</Text></Text>
            <TextInput style={styles.inputBox}
            placeholder="Mobile Number"
            placeholderTextColor = "#a6b8d4"
            />
            <Text style={styles.inputText}>Address<Text style={{color: 'red'}}>*</Text></Text>
            <TextInput style={styles.inputBox}
            placeholder="Address"
            placeholderTextColor = "#a6b8d4"
            />
            <Text style={styles.inputText}>Password<Text style={{color: 'red'}}>*</Text></Text>
            <TextInput style={styles.inputBox}
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor = "#a6b8d4"
            />
            <Text style={styles.inputText}>Confirm Password<Text style={{color: 'red'}}>*</Text></Text>
            <TextInput style={styles.inputBox}
            placeholder="Confirm Password"
            secureTextEntry={true}
            placeholderTextColor = "#a6b8d4"
            />
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>CONTINUE</Text>
            </TouchableOpacity>
            <View style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Go back to login <Text style={{color: '#28609e'}}> Log In</Text></Text>
              <Text style={{fontSize: 20, marginTop: 20}}>Powered by:</Text>
              <Image source={require('../images/powered_by.png')}
              resizeMode={'center'}
              style={{width: 300, height: 200, marginTop: 20}} />
            </View>
          </View>
        </View>
      </ScrollView>
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
    fontSize: 20,
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
