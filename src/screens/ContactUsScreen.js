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
  AsyncStorage
} from 'react-native';
import Header from '../components/Header';
import services from '../utils/services';
export default class App extends Component<{}> {
  // state = {
  //   data: []
  // }
  async componentDidMount(){
    const token = await AsyncStorage.getItem('user_token');
    const data = {
      token: token
    };
    const resp = await services.contactUs(data);
    const responseInJson = await resp.json();
    console.log('Response in JSON: ', responseInJson);
    // this.setState({
    //   data: responseInJson.data
    // });
  }
  render() {
    return(
      <View style={styles.container}>
        <Header navigation={this.props.navigation} />
        <ScrollView>
          <View style={styles.aboutView}>
            <View style={styles.nameView}><Text style={styles.nameText}>Contact Us</Text></View>
            <Text>No data in API</Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}
const styles = {
  container: {
    flex: 1,
    backgroundColor: '#edf1f5',
  },
  nameView: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  nameText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black'
  },
  aboutView: {
    padding: 10
  },
}
