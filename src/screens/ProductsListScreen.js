import React, { Component } from 'react';
import Slideshow from 'react-native-image-slider-show';
import {
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  FlatList,
  TextInput,
  Image,
  ImageBackground
} from 'react-native';
import services from '../utils/services';
import DropdownMessageAlert from '../templates/DropdownMessageAlert';
export default class App extends Component<{}> {
  state = {
    data: [],
    search_product: '',
    refreshing: true
  }

  category_id = this.props.navigation.state.params.category_id;

  componentDidMount() {
    this.getProducts();
  }

  async searchProduct() {
    this.setState({refreshing: true});
    const token = await AsyncStorage.getItem('user_token');
    const data = {
      token: token,
      product_name: this.state.search_product
    };
    const resp = await services.search(data);
    const responseInJson = await resp.json();
    console.log('search', responseInJson);
    this.setState({
      refreshing: false,
      data: responseInJson.data
    });
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
    // const categoryResp = await services.categoryList(data);
    // const categoryResponseInJson = await categoryResp.json();
    console.log('categories', responseInJson);
    // console.log('slider list', categoryResponseInJson);
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
        <View style={{padding: 7, flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextInput style={styles.inputBox}
            // value={this.state.phone_number}
            onChangeText={(t) => this.setState({search_product: t})}
            onSubmitEditing={() => this.searchProduct()}
            returnKeyType={'search'}
            placeholder="Search product ..."
            autoCorrect={false}
            autoCapitalize='none'
            placeholderTextColor = "#a6b8d4"
          />
          <TouchableOpacity onPress={() => this.searchProduct()}>
            <Image source={require('../images/search-icon.png')}
              resizeMode={'contain'}
              style={styles.searchImage}
            />
          </TouchableOpacity>
        </View>
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
                <ImageBackground imageStyle={{resizeMode: 'contain', width: '100%', height: '100%'}} style={{height: 200}} source={{uri: item.product_image_one}}>
                  {item.is_offer === '1' ? <Image style={{width: 35, height: 35, resizeMode: 'contain'}} source={require('../images/offerTag.png')} /> : null}
                  {item.is_new === '1' ? <Image style={{width: 35, height: 35, resizeMode: 'contain'}} source={require('../images/newTag.png')} /> : null}
                </ImageBackground>
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
    padding: 5
  },
  inputBox: {
    borderBottomWidth: 1,
    borderColor: '#a6b8d4',
    fontSize: 18,
    color: 'black',
    paddingHorizontal: 8,
    height: 40,
    // borderRadius: 5,
    // backgroundColor: '#fff',
    width: '90%'
  },
  searchImage: {
    width: 40,
    height: 40,
    // position: 'absolute',
    // right: 0
  },
  rfmButton: {
    backgroundColor: '#f33155',
    height: 40,
    borderRadius: 5,
    // marginTop: 10,
    width: '18%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  rfmText: {
    color: '#fff',
    fontSize: 15
  },
  dashboardView: {
    // height: 300,
    // justifyContent: 'center',
    marginBottom: 13
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
