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
import { WebView } from "react-native-webview";
import Header from '../components/Header';
import services from '../utils/services';
export default class App extends Component<{}> {
  state = {
    data: {}
  }
  async componentDidMount(){
    const token = await AsyncStorage.getItem('user_token');
    const data = {
      token: token
    };
    const resp = await services.whoWeAre(data);
    const responseInJson = await resp.json();
    console.log(responseInJson);
    this.setState({
      data: responseInJson.data
    });
  }
  render() {
    console.log(this.state.data.value);
    return(
      <View style={styles.container}>
        <Header navigation={this.props.navigation} />
        <WebView
          source={{ html: this.state.data.value }}
          style={{ marginTop: 20 }}
          originWhitelist={['*']}
        />
      </View>
    );
  }
}
const styles = {
  container: {
    flex: 1,
    backgroundColor: '#edf1f5',
  },
  nameView: {
    height: 60,
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
  ownerText: {
    fontSize: 20,
    marginBottom: 10
  },
  aboutText: {
    fontSize: 20,
  },
  aboutText2: {
    fontSize: 20,
    marginBottom: 10
  },
  withinText: {
    color: '#57b3ec',
    fontSize: 20,
    marginBottom: 10
  }
}
