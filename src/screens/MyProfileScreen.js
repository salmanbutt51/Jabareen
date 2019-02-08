import React, { Component } from 'react';
import Slideshow from 'react-native-image-slider-show';
import {
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  FlatList,
  TextInput
} from 'react-native';
import services from '../utils/services';
import Header from '../components/Header';
import DropdownMessageAlert from '../templates/DropdownMessageAlert';
export default class App extends Component<{}> {

  render() {
    return(
      <View style={styles.mainContainer}>
        <Header navigation={this.props.navigation} showUserIcon={false} title={'Profile Overview'} />
        <View style={styles.container}>

        </View>
      </View>
    );
  }

}

const styles = {
  mainContainer: {
    flex: 1,
    backgroundColor: '#edf1f5',
  },
  container: {
    padding: 10
  },

};
