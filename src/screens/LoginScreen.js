import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  AsyncStorage
} from 'react-native';
import Logo from './Logo';
import services from '../utils/services';
import DropdownMessageAlert from '../templates/DropdownMessageAlert';
import LoadingButton from '../templates/LoadingButton';

export default class App extends Component<{}> {

  navigation = this.props.navigation;

  state = {
    phone_number: '042435546',
    password: '123456',
    fcm_token: '',
    device_id: ''
  }

  validateForm() {
    const {state} = this;
    let phone_number = state.phone_number;
    let password = state.password;
    let isValid = false;

    if(phone_number == '') {
      this._dropdown.itemAction({title: 'Error', message: 'Mobile Number is required', type: 'error'});
    } else if(password == '') {
      this._dropdown.itemAction({title: 'Error', message: 'Password is required', type: 'error'});
    } else {
      isValid = true;
    }
    return isValid;
  }

  async login() {
    if (this.validateForm()) {
      const {state} = this;
      const data = {
        phone_number: state.phone_number,
        password: state.password,
        fcm_token: 'q3432ed44',
        device_id: 'serfe5grtdg'
      };
      this._loginBtn.showLoading(true);
      const response = await services.login(data);
      const responseJson = await response.json();
      this._loginBtn.showLoading(false);
      console.log('Response in JSON: ', responseJson);
      if (responseJson.response === 'success') {
        await AsyncStorage.multiSet([
          ['user_token', responseJson.data.token],
          ['isloggedin', '1'],
          ['userData', JSON.stringify(responseJson.data.user)]
        ]);
        this.navigation.navigate('Home');
      } else {
        this._dropdown.itemAction({type: 'error', title: 'Error', message: responseJson.message});
      }
    }
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <ScrollView keyboardDismissMode={'on-drag'}>
          <View style={styles.container}>
            <View style={styles.logoView}>
              <Image source={require('../images/logo.png')}
                resizeMode={'contain'}
                style={{width: '100%', height: 130}}
              />
            </View>
            <View style={styles.form}>
              <Text style={styles.inputText}>Mobile</Text>
              <TextInput style={styles.inputBox}
                value={this.state.phone_number}
                onChangeText={(t) => this.setState({phone_number: t})}
                placeholder="Mobile Number"
                autoCorrect={false}
                autoCapitalize='none'
                placeholderTextColor = "#a6b8d4"
              />
              <Text style={styles.inputText}>Password</Text>
              <TextInput style={styles.inputBox}
                value={this.state.password}
                onChangeText={(t) => this.setState({password: t})}
                placeholder="Password"
                secureTextEntry={true}
                autoCapitalize='none'
                placeholderTextColor = "#a6b8d4"
              />
              <LoadingButton ref={(c) => this._loginBtn = c} title='Login' style={styles.button} onPress={() => this.login()} />
            </View>
            <View style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Don't have an account? <Text style={{color: '#28609e'}} onPress={() => this.navigation.navigate('Signup')}>Sign Up</Text></Text>
            </View>
          </View>
          <DropdownMessageAlert ref={(c) => this._dropdown = c} />
        </ScrollView>
      </View>
    );
  }
}
const styles = {
  container: {
    // flex: 1,
    padding: 20
  },
  logoView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200
  },
  form: {
    // flex: 1,
    justifyContent: 'center',
    // backgroundColor: 'blue'
  },
  inputText:{
    fontSize: 18,
    color: 'black'
  },
  inputBox: {
    borderWidth: 1,
    borderColor: '#a6b8d4',
    fontSize: 18,
    color: 'black',
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 8,
    height: 40,
    borderRadius: 5,
  },
  button: {
    // flex: 1,
    backgroundColor: '#f33155',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: '100%',
    borderRadius: 5
    // paddingVertical: 30
  },
  buttonText: {
    fontSize: 22,
    fontWeight: '200',
    color: '#fff',
    textAlign: 'center'
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: 20,
    flex: 1,
    // backgroundColor: 'blue'
  },
  forgotPasswordText: {
    fontSize: 22,
  }
};
