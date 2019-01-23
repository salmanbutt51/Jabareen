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
    await AsyncStorage.removeItem('isloggedin');
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
            ? <TouchableOpacity style={{width: 50, height: 60, justifyContent: 'center', alignItems: 'center'}} onPress={() => this.props.navigation.navigate('Dashboard')}>
                <Image source={require('../images/Back-arrow.png')}
                  resizeMode={'contain'} style={{height: 25}}
                />
              </TouchableOpacity>
            : <TouchableOpacity style={{width: 70, height: 60, justifyContent: 'center'}} onPress={() => this.props.navigation.openDrawer()}>
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
            ? <TouchableOpacity style={{width: 40, height: 60, alignItems: 'center', justifyContent: 'center'}} onPress={() => this.props.navigation.navigate('Cart')}>
                <Image source={require('../images/cart-icon2.png')}
                resizeMode={'contain'} style={{width: 40, height: 30}}/>
              </TouchableOpacity>
            : <View style={{width: 40, height: 30}}></View>
          }

          <TouchableOpacity style={{width: 40, height: 60, alignItems: 'center', justifyContent: 'center'}} onPress={() => this.popupVisible()}>
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
          dialogAnimation={new SlideAnimation({
            toValue: 0,
            useNativeDriver: true,
            slideFrom: 'top'
          })}
        >
          <DialogContent>
            <View>
              <View style={{flexDirection: 'row', height: 40, alignItems: 'center'}}>
                <View>
                  <Image source={require('../images/logo.png')}
                    resizeMode={'contain'}
                    style={{
                      width: 45,
                      height: 25,
                      marginRight: 5
                    }}
                  />
                </View>
                <Text style={{fontSize: 15, fontWeight: 'bold'}}>Are you sure you want to logout?</Text>
              </View>

              <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 15}}>
                <TouchableOpacity onPress={() => this.logout()} style={styles.rfmButton}>
                  <Text style={styles.rfmText}>Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  this.setState({ popupVisible: false });
                }} style={styles.rfmButton}>
                  <Text style={styles.rfmText}>Cancel</Text>
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
  },
  rfmButton: {
    // backgroundColor: '#f33155',
    height: 25,
    borderRadius: 5,
    // paddingVertical: 5,
    // paddingHorizontal: 8,
    // marginTop: 3,
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  rfmText: {
    color: '#f33155',
    fontSize: 15
  },
};
