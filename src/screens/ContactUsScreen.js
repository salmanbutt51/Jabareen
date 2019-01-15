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
import services from '../utils/services';
export default class App extends Component<{}> {
  state = {
    data: []
  }
  async componentDidMount(){
    const token = await AsyncStorage.getItem('user_token');
    const data = {
      token: token
    };
    const resp = await services.contactUs(data);
    const responseInJson = await resp.json();
    console.log('Response in JSON: ', responseInJson);
    this.setState({
      data: responseInJson.data
    });
  }
  render() {
    return(
      <View style={styles.container}>
        <Header navigation={this.props.navigation} title={'Contact Us'}/>
        <ScrollView>
          <View style={styles.aboutView}>
            <FlatList
            contentContainerStyle={styles.flatList}
            // style={{flex: 1}}
            // numColumns={2}
            data={this.state.data}
            // keyExtractor={(item) => item.name}
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
                    <Text style={styles.mobile}>{item.mobile}</Text>
                  </View>
                </View>
                <View style={styles.listView}>
                  <View style={styles.imageView}>
                    <Image source={require('../images/mail.png')}
                    resizeMode={'contain'}
                    style={styles.iconImage} />
                  </View>
                  <View style={styles.detailView}>
                    <Text style={styles.email}>{item.email}</Text>
                  </View>
                </View>
                <View style={styles.listView}>
                  <View style={styles.imageView}>
                    <Image source={require('../images/website.png')}
                    resizeMode={'contain'}
                    style={styles.iconImage} />
                  </View>
                  <View style={styles.detailView}>
                    <Text style={styles.website}>{item.website}</Text>
                  </View>
                </View>
                <View style={styles.listView}>
                  <View style={styles.imageView}>
                    <Image source={require('../images/social.png')}
                    resizeMode={'contain'}
                    style={styles.iconImage} />
                  </View>
                  <View style={styles.detailView}>
                    <Text style={styles.social}>{item.social_link}</Text>
                  </View>
                </View>
              </View>
            }
            />
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
  aboutView: {
    padding: 10
  },
  listView: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    // height: 80
  },
  iconImage: {
    width: 50,
    height: 50
  },
  imageView: {
    flex: 0.3,
    alignItems: 'center'
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
