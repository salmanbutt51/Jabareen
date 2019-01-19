import React, { Component } from 'react';
import {
  View,
  AsyncStorage
} from 'react-native';

export default class Root extends Component<{}> {

async componentDidMount() {
  console.log('Root component mounted');
  try {
    const isLoggedIn = await AsyncStorage.getItem('isloggedin')
    //await functions.removeUserData();
    console.log(isLoggedIn);
    if (isLoggedIn === '1') {
        this.props.navigation.navigate('Home');
      } else {
        this.props.navigation.navigate('Auth');
      }
  } catch (error) {
    console.log(error);
  }
}

  render() {
    return(
      <View>
      </View>
    );
  }
}
