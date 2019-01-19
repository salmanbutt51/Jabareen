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
import { WebView } from 'react-native-webview';
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
    const resp = await services.advertiseList(data);
    const responseInJson = await resp.json();
    console.log(responseInJson);
    this.setState({
      data: responseInJson.data
    });
  }
  render() {
    console.log(this.state.data.description);
    return(
      <View style={styles.container}>
        <Header navigation={this.props.navigation} title={'Advertisement'} />
        <ScrollView>
            <View style={styles.subContainer}>
            <FlatList
            contentContainerStyle={styles.flatList}
            // style={{flex: 1}}
            // numColumns={2}
            data={this.state.data}
            // keyExtractor={(item) => item.name}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) =>
                <View style={styles.memberView}>
                  <View style={styles.nameView}><Text style={styles.nameText}>{item.title}</Text></View>
                  <View style={styles.detailView}>
                    <Image source={{uri: item.image}}
                    resizeMode={'contain'}
                    style={styles.adImage} />
                  </View>

                </View>
            }
            />

            </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = {
  container: {
    flex: 1,
  },
  subContainer: {
    padding: 10
  },
  memberView: {

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
    // flex: 1
  },
  adImage: {
    width: '100%',
    height: 350,
    // backgroundColor: 'blue'
  }
};
