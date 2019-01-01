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
export default class Navbar extends Component<{}> {
  render(){
    return(
      <View style={styles.navbar}>
        <View style={styles.afterImageView}>
          <View><TouchableOpacity onPress={() => this.props.navigation.openDrawer()}><Image source={require('../images/menu_icon.png')}
          resizeMode={'contain'} style={{width: 70, height: 50}}/></TouchableOpacity></View>
        </View>
      </View>
    )
  }
}
const styles = {
  navbar: {
    justifyContent: 'center',
    backgroundColor: '#f33155',
    height: 60
  },
  afterImageView:{
    alignItems: 'flex-start'
  }
