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
    showLoader: true
  }

  async adsOpen() {
    const token = await AsyncStorage.getItem('user_token');
    const data = {
      token: token
    };
    const resp = await services.advertiseList(data);
    const responseInJson = await resp.json();
    console.log(responseInJson);
    this.setState({
      data: responseInJson.data,
      showLoader: false
    });
  }

  render() {
    // console.log(this.state.data.description);

    return(
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={() => this.adsOpen()}
        />
        <Header navigation={this.props.navigation} title={'Advertisement'} />
        {
          this.state.showLoader === true
          ? <View style={styles.loader}>
              <Bubbles size={10} color="#f33155" />
            </View>
          : <ScrollView>
            <View style={styles.subContainer}>
              <FlatList
              contentContainerStyle={styles.flatList}
              // style={{flex: 1}}
              // numColumns={2}
              data={this.state.data}
              keyExtractor={(item) => item.id.toString()}
              // keyExtractor={(item) => item.name}
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
            </View>
          </ScrollView>
        }

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
    padding: 10,
    // backgroundColor: 'red'
  },
  memberView: {
    // backgroundColor: 'green',
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
    // backgroundColor: 'purple'
  },
  adImage: {
    width: '100%',
    height: 350,
    // backgroundColor: 'blue'
  }
};
