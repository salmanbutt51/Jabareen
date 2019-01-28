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
  FlatList
} from 'react-native';
import Header from '../components/Header';
import services from '../utils/services';
import DropdownMessageAlert from '../templates/DropdownMessageAlert';
export default class App extends Component<{}> {
  state = {
    data: [],
    showLoader: true
  }

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
    this.setState({
      data: responseInJson.data,
      showLoader: false
    });
  }

  async addToCart(p_id){
    const token = await AsyncStorage.getItem('user_token');
    const data = {
      token: token,
      product_id: p_id
    };
    const resp = await services.addToCart(data);
    const responseInJson = await resp.json();
    console.log(responseInJson);
    if (responseInJson.response === 'success') {
      this._dropdown.itemAction({type: 'success', title: 'Product added to cart', message: responseInJson.message});
    } else {
      this._dropdown.itemAction({type: 'error', title: 'Error', message: responseInJson.message});
    }
    // this.setState({
    //   data: responseInJson.data
    // });
  }

  render() {
    return(
      <View style={styles.container}>
        {
          this.state.showLoader === true
          ? <View style={styles.loader}>
              <Bubbles size={10} color="#f33155" />
            </View>
          : <FlatList
          contentContainerStyle={styles.flatList}
          // style={{flex: 1}}
          numColumns={2}
          data={this.state.data}
          // keyExtractor={(item) => item.name}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) =>
            <View
              style={styles.item} >
              <View style={{alignItems: 'center'}}>

              </View>
              <View style={{alignItems: 'flex-start'}}>
                <Text style={styles.name} >{item.name}</Text>
                <Text style={styles.arabicName} >{item.arabic_name}</Text>
              </View>
              <TouchableOpacity onPress={() => this.addToCart(item.id)} style={styles.addToCartButton}>
                <Text style={styles.addToCartText}>Add to cart</Text>
              </TouchableOpacity>
            </View>
          }
          />
        }
        <DropdownMessageAlert ref={(c) => this._dropdown = c} />
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
    // justifyContent: 'space-around',
    // alignItems: 'center',
    // flex: 1,
  },
  item: {
    backgroundColor: '#fff',
    margin: 5,
    borderWidth: 2,
    borderColor: '#f33155',
    padding: 8,
    flex: 1
    // alignItems: 'center',
    // justifyContent: 'center',
    // width: '100%'
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20
    // fontFamily: 'Kapra-Regular',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
    paddingVertical: 5,
    marginTop: 10,
    width: '100%',
    alignItems: 'center'
  },
  addToCartText: {
    color: '#fff'
  },
};
