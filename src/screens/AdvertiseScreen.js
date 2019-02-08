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
  WebView
} from 'react-native';
// import { WebView } from 'react-native-webview';
import Header from '../components/Header';
import services from '../utils/services';
import { NavigationEvents } from 'react-navigation';
export default class App extends Component<{}> {
  state = {
    data: [],
    refreshing: true
  }

  componentDidMount(){
    this.getAds();
  }

  async getAds() {
    this.setState({refreshing: true});
    const token = await AsyncStorage.getItem('user_token');
    const data = {
      token: token
    };
    const resp = await services.advertiseList(data);
    const responseInJson = await resp.json();
    console.log(responseInJson);
    this.setState({
      data: responseInJson.data,
      refreshing: false
    });
  }

  render() {
    // console.log(this.state.data.description);

    return(
      <View style={styles.container}>
        <NavigationEvents
          onDidFocus={() => this.getAds()}
        />
        <Header navigation={this.props.navigation} title={'Advertisement'} />
        <ScrollView>
          <FlatList
            contentContainerStyle={styles.flatList}
            onRefresh={() => (this.getAds())}
            refreshing={this.state.refreshing}
            ListEmptyComponent={this.emptyView()}
            data={this.state.data}
            extraData={this.state}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) =>
              <View style={styles.adView}>
                <View style={styles.nameView}>
                  <Text style={styles.nameText}>{item.title}</Text>
                </View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Advertisedetail', {adDescription: item.description})}>
                  <Image source={{uri: item.image}}
                    resizeMode={'contain'}
                    style={styles.adImage}
                  />
                </TouchableOpacity>
              </View>
            }
          />
        </ScrollView>
      </View>
    );
  }

  emptyView() {
    if (this.state.refreshing === false) {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Text style={{fontSize: 20}}>No Ads</Text>
        </View>
      );
    }
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
    height: 50,
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
    // backgroundColor: 'purple'
  },
  adView: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#f33155',
    margin: 5,
    padding: 10
  },
  adImage: {
    width: '100%',
    height: 250,
    // backgroundColor: 'blue'
  }
};
