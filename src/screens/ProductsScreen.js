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
          <FlatList
          contentContainerStyle={styles.flatList}
          // style={{flex: 1}}
          numColumns={2}
          data={this.state.data}
          // keyExtractor={(item) => item.name}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) =>
            <TouchableOpacity onPress={
              item.has_sub_category == 1
              ? () => this.props.navigation.navigate('Subcategory', {category_id: item.id})
              : () => this.props.navigation.navigate('Productslist', {category_id: item.id})
              }
              style={styles.item} >
              <View style={{alignItems: 'center'}}>
                <Image source={{uri: item.image}}
                resizeMode={'contain'}
                style={styles.proImage} />
              </View>
              <View style={{alignItems: 'flex-start'}}>
                <Text style={styles.name} >{item.name}</Text>
                <Text style={styles.name} >{item.arabic_name}</Text>
              </View>

            </TouchableOpacity>
          }
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
  flatList: {
    // backgroundColor: 'red',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    // padding: 20,
    // backgroundColor: 'blue'
  },
  item: {
    backgroundColor: '#fff',
    margin: 5,
    borderWidth: 2,
    borderColor: '#f33155',
    padding: 8,
    // alignItems: 'center',
    justifyContent: 'center',
    // flex: 1
    // width: '100%'
  },
  proImage: {
    width: 150,
    height: 120,
    marginVertical: 10
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20
    // fontFamily: 'Kapra-Regular',
  },
}
