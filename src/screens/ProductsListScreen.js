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
  category_id = this.props.navigation.state.params.category_id;
  async componentDidMount(){
    const token = await AsyncStorage.getItem('user_token');
    const data = {
      token: token,
      category_id: this.category_id
    };
    const resp = await services.categoryWiseProductList(data);
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

              <View style={styles.nameView}><Text style={styles.nameText}>Products Lists</Text></View>
              <ScrollView>
              <FlatList
              contentContainerStyle={styles.flatList}
              // style={{flex: 1}}
              numColumns={2}
              data={this.state.data}
              // keyExtractor={(item) => item.name}
              renderItem={({item}) =>
                <TouchableOpacity
                  style={styles.item} >
                  <View style={{alignItems: 'center'}}>
                    <Image source={require('../images/crockery3.png')}
                    resizeMode={'contain'}
                    style={styles.proImage}
                     />
                  </View>
                  <View style={{alignItems: 'flex-start'}}>
                    <Text style={styles.name} >{item.product_name}</Text>
                    <Text style={styles.arabicName} >{item.product_name_arabic}</Text>
                    <Text style={styles.price}>${item.price}</Text>
                  </View>
                  <TouchableOpacity style={styles.addToCartButton}>
                    <Text style={styles.addToCartText}>Add to cart</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              }
              />
          </ScrollView>
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
  flatList: {
    // backgroundColor: 'red',
    // justifyContent: 'space-around',
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
  arabicName: {
    fontSize: 25
  },
  price: {
    fontSize: 30,
    color: 'red'
  },
  addToCartButton: {
    backgroundColor: '#f33155',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
    width: '100%',
    alignItems: 'center'
  },
  addToCartText: {
    color: '#fff'
  },
}
