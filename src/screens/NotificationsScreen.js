import React, { Component } from 'react';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
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
import { NavigationEvents } from 'react-navigation';
import Header from '../components/Header';
import DropdownMessageAlert from '../templates/DropdownMessageAlert';
import LoadingButton from '../templates/LoadingButton';

export default class App extends Component<{}> {

  state = {
    // data: [],
    showLoader: true
  }

  async notificationsOpen(){
    const token = await AsyncStorage.getItem('user_token');
    const data = {
      token: token,
    };
    const resp = await services.sendNotifications(data);
    const responseInJson = await resp.json();
    console.log(responseInJson);
    this.setState({
      // data: responseInJson.data,
      showLoader: false
    });
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <NavigationEvents
          onWillFocus={() => this.notificationsOpen()}
        />
        <Header navigation={this.props.navigation} showNotificationIcon={false} showCartIcon={true} title={'Notifications'}/>
        {
          this.state.showLoader === true
          ? <View style={styles.loader}>
              <Bubbles size={10} color="#f33155" />
            </View>
          : <ScrollView>
              <View style={styles.container}>
                <Text></Text>
              </View>
            <DropdownMessageAlert ref={(c) => this._dropdown = c} />
          </ScrollView>
        }


      </View>
    );
  }
}
const styles = {
  container: {
    // flex: 1,
    padding: 10
  },
  logoView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
};
