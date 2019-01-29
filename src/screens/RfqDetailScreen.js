import React, { Component } from 'react';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
// import Dialog, { SlideAnimation, DialogContent } from 'react-native-popup-dialog';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
  TextInput,
  AsyncStorage,
  FlatList
} from 'react-native';
import Header from '../components/Header';
import services from '../utils/services';
import { NavigationEvents } from 'react-navigation';
// import { Dropdown } from 'react-native-material-dropdown';
// import services from '../utils/services';
export default class App extends Component<{}> {

  state = {
    showLoader: true
  }

  group_id = this.props.navigation.state.params.group_id;
  async rfqHistoryDetailOpen(){
    const token = await AsyncStorage.getItem('user_token');
    const data = {
      token: token,
      group_id: this.group_id
    };
    const resp = await services.rfqHistoryDetail(data);
    const responseInJson = await resp.json();
    console.log('Rfq response',responseInJson);
    this.setState({
      showLoader: false
    });
  }

  render() {
    return(
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={() => this.rfqHistoryDetailOpen()}
        />
        {/*<Header navigation={this.props.navigation} title={'Rfq History'}/>*/}
        {
          this.state.showLoader === true
          ? <View style={styles.loader}>
              <Bubbles size={10} color="#f33155" />
            </View>
          : <ScrollView>
              <View style={styles.cartsView}>

              </View>
          </ScrollView>
        }

      </View>
    );
  }
}
const styles = {
  container: {
    flex: 1,
    backgroundColor: '#edf1f5',
  },
  cartsView: {
    padding: 10
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
};
