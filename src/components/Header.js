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
    showCartIcon: PropTypes.bool,
    showNotificationIcon: PropTypes.bool,
    showUserIcon: PropTypes.bool,
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
            ? <TouchableOpacity style={{width: 50, justifyContent: 'center', alignItems: 'center'}} onPress={() => this.props.navigation.navigate('Dashboard')}>
                <Image source={require('../images/Back-arrow.png')}
                  resizeMode={'contain'} style={{width: '100%', height: 20}}
                />
              </TouchableOpacity>
            : <TouchableOpacity style={{width: 50, justifyContent: 'center'}} onPress={() => this.props.navigation.openDrawer()}>
                <Image source={require('../images/menu_icon.png')}
                  resizeMode={'contain'} style={{width: '100%', height: 40}}
                />
              </TouchableOpacity>
          }


        </View>
        <View style={styles.headerTextView}><Text style={styles.headerText}>{this.props.title}</Text></View>
        <View style={{justifyContent: 'center', flexDirection: 'row', alignItems: 'center',position: 'absolute', right: 0}}>
          {
            this.props.showUserIcon !== false
            ? <TouchableOpacity style={styles.icon} onPress={() => this.props.navigation.navigate('Profile')}>
                <Image source={require('../images/user-icon1.png')}
                resizeMode={'contain'} style={styles.iconImage}/>
              </TouchableOpacity>
            : null
          }
          {
            this.props.showCartIcon == true
            ? <TouchableOpacity style={styles.icon} onPress={() => this.props.navigation.navigate('Cart')}>
                <Image source={require('../images/cart-icon2.png')}
                resizeMode={'contain'} style={styles.iconImage}/>
              </TouchableOpacity>
            : null
          }
          {
            this.props.showNotificationIcon !== false
            ? <TouchableOpacity style={styles.icon} onPress={() => this.props.navigation.navigate('Notifications')}>
                <Image source={require('../images/notification.png')}
                resizeMode={'contain'} style={styles.iconImage}/>
              </TouchableOpacity>
            : null
          }
          <TouchableOpacity style={styles.icon} onPress={() => this.popupVisible()}>
            <Image source={require('../images/logout.png')}
            resizeMode={'contain'} style={{width: 30, height: 20}}/>
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
              <View style={{flexDirection: 'row', height: 40, alignItems: 'center', justifyContent: 'space-between'}}>
                <View>
                  <Image source={require('../images/logo.png')}
                    resizeMode={'contain'}
                    style={{
                      width: 45,
                      height: 25,
                      // marginRight: 5
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
    height: 50,
    flexDirection: 'row',
    alignItems: 'center'
    // justifyContent: 'space-between'
  },
  headerTextView:{
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#fff'
  },
  icon: {
    width: 35,
    // height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    width: 40,
    height: 25
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
