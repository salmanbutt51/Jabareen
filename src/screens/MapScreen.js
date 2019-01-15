import React, { Component } from 'react';
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
  FlatList
} from 'react-native';
import Header from '../components/Header';
// import services from '../utils/services';
export default class App extends Component<{}> {

  render() {
    return(
      <View style={styles.container}>
        <Header navigation={this.props.navigation} title={'Company Map'}/>

      </View>
    );
  }
}
const styles = {
  container: {
    flex: 1,
    backgroundColor: '#edf1f5',
  },

}
