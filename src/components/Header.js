import React, { Component } from 'react';
import Dialog, { SlideAnimation, DialogContent, ScaleAnimation } from 'react-native-popup-dialog';
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
  state = {
    popupVisible: false,
  }

  static propTypes = {
    showDrawer: PropTypes.bool,
    showCartIcon: PropTypes.bool
  }

  async logout(){
    this.setState({
      popupVisible: false
    });
    await AsyncStorage.removeItem('user_token');
    this.props.navigation.navigate('Auth');

  }

  popupVisible(){
    this.setState({
      popupVisible: true
    });
  }

  render(){
    return(
      <View style={styles.navbar}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          {
            this.props.showDrawer !== true
            ? <TouchableOpacity onPress={() => this.props.navigation.navigate('Dashboard')}>
                <Image source={require('../images/Back-arrow.png')}
                  resizeMode={'contain'} style={{width: 70, height: 25}}
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
          {
            this.props.showCartIcon == true
            ? <TouchableOpacity onPress={() => this.props.navigation.navigate('Cart')}>
                <Image source={require('../images/cart-icon2.png')}
                resizeMode={'contain'} style={{width: 40, height: 30}}/>
              </TouchableOpacity>
            : <View style={{width: 40, height: 30}}></View>
          }

          <TouchableOpacity onPress={() => this.popupVisible()}>
            <Image source={require('../images/logout.png')}
            resizeMode={'contain'} style={{width: 30, height: 25}}/>
          </TouchableOpacity>
        </View>
        <Dialog
          visible={this.state.popupVisible}
          width={0.8}
          // height={350}
          onTouchOutside={() => {
            this.setState({ popupVisible: false });
          }}
          dialogAnimation={new ScaleAnimation({
            toValue: 0,
            useNativeDriver: true,
          })}
        >
          <DialogContent>
            <View>
              <Text>Are you sure you want to logout?</Text>
              <View>
                <TouchableOpacity onPress={() => this.logout()} style={styles.rfmButton}>
                  <Text style={styles.rfmText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  this.setState({ popupVisible: false });
                }} style={styles.rfmButton}>
                  <Text style={styles.rfmText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </DialogContent>
        </Dialog>
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
