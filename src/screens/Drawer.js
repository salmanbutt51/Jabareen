import React, { Component } from 'react';
import Slideshow from 'react-native-image-slider-show';
import {
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  FlatList,
  TextInput,
  Image
} from 'react-native';
import services from '../utils/services';
export default class App extends Component<{}> {

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.screenContainer}>
          <View style={styles.screenStyle}>
              <Text>Screen A</Text>
          </View>
          <View style={styles.screenStyle}>
              <Text>Screen B</Text>
          </View>
          <View style={styles.screenStyle}>
              <Text>Screen C</Text>
          </View>
        </View>
      </View>
    );
  }

}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 5
  },

};
