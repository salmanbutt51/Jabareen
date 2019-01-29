import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  FlatList,
} from 'react-native';
import services from '../utils/services';
import DropdownMessageAlert from '../templates/DropdownMessageAlert';
export default class App extends Component<{}> {
  state = {
    data: [],
    refreshing: true
  }

  category_id = this.props.navigation.state.params.category_id;

  componentDidMount() {
    this.getProducts();
  }

  async getProducts() {
    this.setState({refreshing: true});
    const token = await AsyncStorage.getItem('user_token');
    const data = {
      token: token,
      category_id: this.category_id
    };
    const resp = await services.categoryWiseProductList(data);
    const responseInJson = await resp.json();
    const categoryResp = await services.categoryList(data);
    const categoryResponseInJson = await categoryResp.json();
    console.log(responseInJson);
    console.log(categoryResponseInJson);
    this.setState({
      data: responseInJson.data,
      refreshing: false,
    });
  }

  async addToCart(p_id) {
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
        <FlatList
          contentContainerStyle={styles.flatList}
          numColumns={2}
          onRefresh={() => (this.getProducts())}
          refreshing={this.state.refreshing}
          ListEmptyComponent={this.emptyView()}
          data={this.state.data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) =>
            <View
              style={styles.item} >
              <View style={{alignItems: 'flex-start'}}>
                <Text style={styles.name}>{item.product_name}</Text>
                <Text style={styles.arabicName}>{item.product_name_arabic}</Text>
                <Text style={styles.price}>${item.price}</Text>
              </View>
              <View style={styles.buttonView}>
                <TouchableOpacity onPress={() => this.addToCart(item.id)} style={styles.addToCartButton}>
                  <Text style={styles.addToCartText}>Add to cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          }
        />
        <DropdownMessageAlert ref={(c) => this._dropdown = c} />
      </View>
    );
  }

  emptyView() {
    if (this.state.refreshing === false) {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 100}}>
          <Text style={{fontSize: 20}}>No Products</Text>
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
    // alignItems: 'center',
    // flex: 1,
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
    // justifyContent: 'center',
    flex: 1
    // width: '48%'
  },
  proImage: {
    width: '100%',
    height: 120,
    // backgroundColor: 'blue'
    // marginVertical: 10
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
    fontSize: 25,
    color: 'red'
  },
  buttonView: {
    justifyContent: 'flex-end',
    flex: 1,
    // backgroundColor: 'blue'
  },
  addToCartButton: {
    backgroundColor: '#f33155',
    // paddingVertical: 5,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30
  },
  addToCartText: {
    color: '#fff'
  },
};
