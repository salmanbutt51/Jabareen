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
  FlatList,
  WebView
} from 'react-native';
// import { WebView } from 'react-native-webview';
import Header from '../components/Header';
import services from '../utils/services';
export default class App extends Component<{}> {
  state = {
    data: []
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem('user_token');
    const data = {
      token: token
    };
    const resp = await services.advertiseList(data);
    const responseInJson = await resp.json();
    console.log(responseInJson);
    this.setState({
      data: responseInJson.data
    });
  }

  render() {
    // console.log(this.state.data.description);
    const {data} = this.state;
    var html = '';
    if (data.length > 0) {
      html = this.state.data[0].description;
    }
    return(
      <View style={styles.container}>
        <Header navigation={this.props.navigation} title={'Advertisement'} />
        <WebView
          source={{html: html}}
        />
      </View>
    );
  }
}
const styles = {
  container: {
    flex: 1,
  },
  subContainer: {
    padding: 10,
    backgroundColor: 'red'
  },
  memberView: {
    backgroundColor: 'green',
  },
  nameView: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'center'
  },
  nameText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black'
  },
  flatList: {
    flex: 1,
    backgroundColor: 'purple'
  },
  adImage: {
    width: '100%',
    height: 350,
    // backgroundColor: 'blue'
  }
};
