import React, { Component } from 'react';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import Dialog, { SlideAnimation, DialogContent, ScaleAnimation } from 'react-native-popup-dialog';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
  AsyncStorage,
  FlatList,
  ActivityIndicator,
  WebView
} from 'react-native';
import Header from '../components/Header';
import services from '../utils/services';
import { NavigationEvents } from 'react-navigation';
import DropdownMessageAlert from '../templates/DropdownMessageAlert';
import { Dropdown } from 'react-native-material-dropdown';
export default class App extends Component<{}> {
  state = {
    data: [],
    showLoader: true
  }

  adDescription = this.props.navigation.state.params.adDescription;

  render() {

    return(
      <View style={styles.container}>
          <WebView
            source={{html: this.adDescription}}
          />


      </View>
    );
  }
}
const styles = {
  container: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  subContainer: {
    padding: 10
  },

};
