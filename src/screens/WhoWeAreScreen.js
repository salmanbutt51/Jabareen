import React, { Component } from 'react';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
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
  WebView,
  ActivityIndicator
} from 'react-native';
// import { WebView } from 'react-native-webview';
import Header from '../components/Header';
import services from '../utils/services';
import { NavigationEvents } from 'react-navigation';
export default class App extends Component<{}> {
  state = {
    data: {},
    showLoader: true
  }
  async whoWeAreOpen(){
    const token = await AsyncStorage.getItem('user_token');
    const data = {
      token: token
    };
    const resp = await services.whoWeAre(data);
    const responseInJson = await resp.json();
    console.log(responseInJson);
    this.setState({
      data: responseInJson.data,
      showLoader: false
    });
  }
  render() {
    return(
      <View style={styles.container}>
        <NavigationEvents
          onDidFocus={() => this.whoWeAreOpen()}
        />
        <Header navigation={this.props.navigation} title={'Who We Are'} />
        {
          this.state.showLoader === true
          ? <View style={styles.loader}>
              <Bubbles size={10} color="#f33155" />
            </View>
          : <WebView
              source={{ html: this.state.data.value }}
              // style={{ marginTop: 20 }}
              // originWhitelist={['*']}
            />
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
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
};
