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
import services from '../utils/services';
import DropdownMessageAlert from '../templates/DropdownMessageAlert';

export default class App extends Component<{}> {
  state = {
    user_name: '',
    password: '',
    phone_number: '',
    address: '',
  }

  async handleRegister() {
    const {state} = this;
    const data = {
      user_name: state.user_name,
      password: state.password,
      phone_number: state.phone_number,
      address: state.address,
    };
    const response = await services.signup(data);
    const responseJson = await response.json();
    console.log(responseJson);
    if (responseJson.response === 'success') {
      this._dropdown.itemAction({type: 'success', title: 'Account Created', message: 'Your account has been created successfully.'});
    } else {
      this._dropdown.itemAction({type: 'error', title: 'Error', message: 'There was some error in creating your account, please try again.'});
    }
  }

  render() {
    return(
        <View style={styles.container}>
          <ScrollView contentContainerStyle={{padding: 20}} >
          <Text style={styles.loginText}>REGISTRATION</Text>
          <Logo />
          <View style={styles.form}>
            <Text style={styles.inputText}>User Name<Text style={{color: 'red'}}>*</Text></Text>
            <TextInput style={styles.inputBox}
              onChangeText={(t) => this.setState({user_name: t})}
              placeholder="User Name"
              placeholderTextColor = "#a6b8d4"
            />
            <Text style={styles.inputText}>Mobile<Text style={{color: 'red'}}>*</Text></Text>
            <TextInput style={styles.inputBox}
              onChangeText={(t) => this.setState({phone_number: t})}
              placeholder="Mobile Number"
              secureTextEntry={true}
              placeholderTextColor = "#a6b8d4"
            />
            <Text style={styles.inputText}>Address<Text style={{color: 'red'}}>*</Text></Text>
            <TextInput style={styles.inputBox}
              onChangeText={(t) => this.setState({address: t})}
              placeholder="Address"
              placeholderTextColor = "#a6b8d4"
            />
            <Text style={styles.inputText}>Password<Text style={{color: 'red'}}>*</Text></Text>
            <TextInput style={styles.inputBox}
              onChangeText={(t) => this.setState({password: t})}
              placeholder="Password"
              placeholderTextColor = "#a6b8d4"
            />
            <Text style={styles.inputText}>Confirm Password<Text style={{color: 'red'}}>*</Text></Text>
            <TextInput style={styles.inputBox}
              placeholder = "Confirm Password"
              placeholderTextColor = "#a6b8d4"
            />
            <TouchableOpacity onPress={() => this.handleRegister()} style={styles.button}>
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
          </ScrollView>
          <DropdownMessageAlert ref={(c) => this._dropdown = c} />
        </View>
    )
  }
}
const styles = {
  container: {
    flex: 1,
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
    fontSize: 20,
    color: 'black',
    marginTop: 10,
    marginBottom: 30,
    height: 42,
    paddingHorizontal: 8
  },
  button: {
    backgroundColor: '#67c2fa',
    borderRadius: 5,
    marginVertical: 10,
    height: 43,
    justifyContent: 'center',
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
