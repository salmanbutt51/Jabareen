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
    const resp = await services.category(data);
    const responseInJson = await resp.json();
    console.log(responseInJson);
    this.setState({
      data: responseInJson.data
    });
  }
  render() {
    return(
      <View style={styles.container}>
        <Header navigation={this.props.navigation} />

          <View style={styles.nameView}><Text style={styles.nameText}>Categories</Text></View>
          <FlatList
          contentContainerStyle={styles.flatList}
          // style={{flex: 1}}
          numColumns={2}
          data={this.state.data}
          // keyExtractor={(item) => item.name}
          renderItem={({item}) =>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Subcategory', {category_id: item.id})} style={styles.item} >
              <Text style={styles.name} >{item.name}</Text>
              <Text style={styles.name} >{item.arabic_name}</Text>
              <Image source={{uri: item.image}}
              resizeMode={'contain'}
              style={styles.proImage} />
            </TouchableOpacity>
          }
          />

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
  flexView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 13,
    flex: 1,
    height: 200,
  },
  tile: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#f33155',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 0.46
    // marginHorizontal: 10
  },
  tileText: {
    fontSize: 17,
    color: '#f994a7',
    textAlign: 'center'
  },
  proImage: {
    width: 150,
    height: 120,
    marginTop: 10
  }
}
