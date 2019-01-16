import React, { Component } from 'react';
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
// import { Dropdown } from 'react-native-material-dropdown';
// import services from '../utils/services';
export default class App extends Component<{}> {

  render() {
    return(
      <View style={styles.container}>
        {/*<Header navigation={this.props.navigation} title={'Rfq History'}/>*/}
        <ScrollView>
          <View style={styles.cartsView}>

          </View>
        </ScrollView>
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

};
