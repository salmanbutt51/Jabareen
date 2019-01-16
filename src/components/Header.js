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
import PropTypes from 'prop-types';
export default class Navbar extends Component<{}> {
  // state = {
  //   logoutData: []
  // }

  static propTypes = {
    showDrawer: PropTypes.bool
  }

  async logout(){
    await AsyncStorage.removeItem('user_token');
    this.props.navigation.navigate('Auth');
  }

  render(){
    return(
      <View style={styles.navbar}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          {
            this.props.showDrawer !== true
            ? <TouchableOpacity onPress={() => this.props.navigation.navigate('Dashboard')}>
              <Image source={require('../images/Back-arrow.png')}
                resizeMode={'contain'} style={{width: 30, height: 30, marginLeft: 10}}
              />
            </TouchableOpacity>
            : <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
              <Image source={require('../images/menu_icon.png')}
                resizeMode={'contain'} style={{width: 70, height: 50}}
              />
            </TouchableOpacity>
          }


        </View>
        <View style={styles.headerTextView}><Text style={styles.headerText}>{this.props.title}</Text></View>
        <View style={{justifyContent: 'center', flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Cart')}>
            <Image source={require('../images/cart-icon2.png')}
            resizeMode={'contain'} style={{width: 40, height: 30}}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.logout()}>
            <Image source={require('../images/logout.png')}
            resizeMode={'contain'} style={{width: 30, height: 25}}/>
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
  },
  headerTextView:{
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#fff'
  }
}
