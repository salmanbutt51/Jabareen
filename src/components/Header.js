import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  AsyncStorage
} from 'react-native';
import services from '../utils/services';
export default class Navbar extends Component<{}> {
  // state = {
  //   logoutData: []
  // }

  async logout(){
    const device_id = this.props.navigation.state.params.device_id;
    const token = await AsyncStorage.getItem('user_token');
    const data = {
      token: token,
      device_id: device_id
    };
    const resp = await services.logout(data);
    console.log(resp);
  }

  render(){
    return(
      <View style={styles.navbar}>
        <View style={{justifyContent: 'center'}}>
          <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}><Image source={require('../images/menu_icon.png')}
            resizeMode={'contain'} style={{width: 70, height: 50}}/>
          </TouchableOpacity>
        </View>
        <Text>{this.props.title}</Text>
        <View style={{justifyContent: 'center', flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Cart')}>
            <Image source={require('../images/cart-icon2.png')}
            resizeMode={'contain'} style={{width: 40, height: 30}}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.logout()}>
            <Image source={require('../images/logout.png')}
            resizeMode={'contain'} style={{width: 40, height: 30}}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = {
  navbar: {
    backgroundColor: '#f33155',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
}
