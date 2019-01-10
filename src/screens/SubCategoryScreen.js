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
  // state = {
  //   data: []
  // }
  category_id = this.props.navigation.state.params.category_id;
  async componentDidMount(){
    const token = await AsyncStorage.getItem('user_token');
    const data = {
      token: token,
      category_id: this.category_id
    };
    const resp = await services.subCategory(data);
    const responseInJson = await resp.json();
    console.log(responseInJson);
    // this.setState({
    //   data: responseInJson.data
    // });
  }
  render() {
    return(
      <View style={styles.container}>
        <Header navigation={this.props.navigation} title={'Sub Categories'} />

          <View style={styles.nameView}><Text style={styles.nameText}>Sub Categories</Text></View>


      </View>
    )
  }
}
const styles = {
  container: {
    flex: 1,
    backgroundColor: '#edf1f5',
  },
  flatList: {
    // backgroundColor: 'red',
    justifyContent: 'space-around',
    alignItems: 'center',
    // flex: 1,
  },
  item: {
    backgroundColor: '#fff',
    margin: 5,
    borderWidth: 2,
    borderColor: '#f33155',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    // width: '100%'
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20
    // fontFamily: 'Kapra-Regular',
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
  proImage: {
    width: 150,
    height: 120,
    marginTop: 10
  }
}
