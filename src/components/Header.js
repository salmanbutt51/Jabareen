import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import services from '../utils/services';
export default class Navbar extends Component<{}> {
  // state = {
  //   logoutData: []
  // }
  //
  // async logout(){
  //   const data = {
  //     token: 'asaaaaaaaaaa',
  //     device_id: 'asaaaaaaaaa'
  //   };
  //   const resp = await services.logout(data);
  //   console.log(resp);
  // }

  render(){
    return(
      <View style={styles.navbar}>
        <View style={{justifyContent: 'center'}}>
          <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}><Image source={require('../images/menu_icon.png')}
            resizeMode={'contain'} style={{width: 70, height: 50}}/>
          </TouchableOpacity>
        </View>
        <Text>{this.props.title}</Text>
        <View style={{justifyContent: 'center'}}>
          <TouchableOpacity>
            <Image source={require('../images/logout.png')}
            resizeMode={'contain'} style={{width: 40, height: 30}}/>
          </TouchableOpacity>
        </View>
      </View>
    )
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
