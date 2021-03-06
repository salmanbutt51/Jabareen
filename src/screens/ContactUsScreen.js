import React, { Component } from 'react';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import {
  Text,
  View,
  Image,
  ScrollView,
  AsyncStorage,
  FlatList,
  Linking
} from 'react-native';
import Header from '../components/Header';
import call from 'react-native-phone-call';
import email from 'react-native-email';
import services from '../utils/services';

export default class ContactUsScreen extends Component<{}> {
  state = {
    data: [],
    refreshing: true
  }

  async componentDidMount() {
    this.getContactUs();
  }

  async getContactUs(){
    this.setState({refreshing: true});
    const token = await AsyncStorage.getItem('user_token');
    const data = {
      token: token
    };
    const resp = await services.contactUs(data);
    const responseInJson = await resp.json();
    console.log('Response in JSON: ', responseInJson);
    this.setState({
      data: responseInJson.data,
      refreshing: false
    });
  }

  openLink(link) {
    Linking.canOpenURL(link).then((supported) => {
       if (!supported) {
         console.log('Can\'t handle url: ' + link);
       } else {
         return Linking.openURL(link);
       }
      }).catch((err) => console.error('An error occurred', err));
  }

  makeCall(number) {
    const args = {
      number: number, // String value with the number to call
      prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call
    };
    call(args).catch(console.error);
  }

  handleEmail(mail) {
      email(mail).catch(console.error);
    }

  render() {
    return(
      <View style={styles.container}>
        <Header navigation={this.props.navigation} title={'Contact Us'}/>
        <FlatList
          contentContainerStyle={styles.flatList}
          onRefresh={() => (this.getContactUs())}
          refreshing={this.state.refreshing}
          ListEmptyComponent={this.emptyView()}
          data={this.state.data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) =>
          <View>
            <View style={styles.listView}>
              <View style={styles.imageView}>
                <Image source={require('../images/mobile.png')}
                resizeMode={'contain'}
                style={styles.iconImage} />
              </View>
              <View style={styles.detailView}>
                <Text onPress={() => this.makeCall(item.mobile)} style={styles.mobile}>{item.mobile}</Text>
              </View>
            </View>
            <View style={styles.listView}>
              <View style={styles.imageView}>
                <Image source={require('../images/mail.png')}
                resizeMode={'contain'}
                style={styles.iconImage} />
              </View>
              <View style={styles.detailView}>
                <Text onPress={() => this.handleEmail(item.email)} style={styles.email}>{item.email}</Text>
              </View>
            </View>
            <View style={styles.listView}>
              <View style={styles.imageView}>
                <Image source={require('../images/website.png')}
                resizeMode={'contain'}
                style={styles.iconImage} />
              </View>
              <View style={styles.detailView}>
                <Text onPress={() => this.openLink(item.website)} style={styles.website}>{item.website}</Text>
              </View>
            </View>
            <View style={styles.listView}>
              <View style={styles.imageView}>
                <Image source={require('../images/social.png')}
                resizeMode={'contain'}
                style={styles.iconImage} />
              </View>
              <View style={styles.detailView}>
                <Text onPress={() => this.openLink(item.social_link)} style={styles.social}>{item.social_link}</Text>
              </View>
            </View>
          </View>
          }
        />
      </View>
    );
  }

  emptyView() {
    if (this.state.refreshing === false) {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 100}}>
          <Text style={{fontSize: 20}}>No data available</Text>
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
  flatList: {
    padding: 10
  },
  listView: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5
  },
  iconImage: {
    width: 25,
    height: 25
  },
  imageView: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  detailView: {
    justifyContent: 'center',
    // alignItems: 'center',
    flex: 0.7
  },
  mobile: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  email: {
    fontSize: 20
  },
  website: {
    color: 'blue',
    fontSize: 18
  },
  social: {
    color: 'blue',
    fontSize: 18
  }
};
