import React, { Component } from 'react';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import Slideshow from 'react-native-image-slider-show';
import ImageSlider from 'react-native-image-slider';
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
    refreshing: true,
  }

  sub_category_id = this.props.navigation.state.params.sub_category_id;

  componentDidMount() {
    this.getSubCategoriesList();
  }

  async getSubCategoriesList() {
    this.setState({refreshing: true});
    const token = await AsyncStorage.getItem('user_token');
    const data = {
      token: token,
      sub_category_id: this.sub_category_id
    };
    const resp = await services.subCategoryList(data);
    const responseInJson = await resp.json();
    console.log(responseInJson);
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
          data={this.state.data}
          onRefresh={() => (this.getSubCategoriesList())}
          refreshing={this.state.refreshing}
          ListEmptyComponent={this.emptyView()}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) =>
            <View
              style={styles.item} >
              <View style={{alignItems: 'flex-start'}}>
                <View style={styles.dashboardView}>
                  <Slideshow
                    dataSource={[
                      { url: item.product_image_one },
                      { url: item.product_image_two },
                      { url: item.product_image_three }
                    ]}
                    arrowSize={8}
                  />
                </View>
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
          <Text style={{fontSize: 20}}>There are no sub categories</Text>
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
  dashboardView: {
    // height: 180,
    // justifyContent: 'center',
    marginBottom: 13
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
