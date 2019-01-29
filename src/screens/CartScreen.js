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
  TextInput,
  AsyncStorage,
  FlatList,
  ActivityIndicator
} from 'react-native';
import Header from '../components/Header';
import services from '../utils/services';
import { Dropdown } from 'react-native-material-dropdown';
import { NavigationEvents } from 'react-navigation';
import DropdownMessageAlert from '../templates/DropdownMessageAlert';
import LoadingButton from '../components/LoadingButton';
export default class App extends Component<{}> {
  state = {
    data: [],
    quantity: [],
    unit: '',
    showLoader: true,
    noData: true
    // enterQuantity: '1'
  }

  quantity = [];
  unit = [];

  async cartOpen(){
    const token = await AsyncStorage.getItem('user_token');
    const data = {
      token: token,
    };
    const resp = await services.cartList(data);
    const responseInJson = await resp.json();
    console.log(responseInJson);
    responseInJson.data.map((item)=>{
      this.quantity.push(1);
    });
    this.setState({
      data: responseInJson.data,
      showLoader: false,
      quantity: this.quantity
    });
    if (this.state.data.length !== 0) {
      this.setState({
        noData: false
      });
    } else {
      this.setState({
        noData: true
      });
    }
  }

  async deleteCartItem(item){
    var cartItems = this.state.data;
    this.state.data.map((cartItem, index) => {
      if (item.id === cartItem.id) {
        cartItems.splice(index, 1);
      }
    });

    this.setState({data: cartItems});

    const token = await AsyncStorage.getItem('user_token');
    const data = {
      token: token,
      cart_id: item.id
    };
    const resp = await services.deleteCart(data);
    const responseInJson = await resp.json();
    console.log(responseInJson);
    if (responseInJson.response === 'success') {
      this._dropdown.itemAction({type: 'success', title: 'Success', message: responseInJson.message});
    } else {
      this._dropdown.itemAction({type: 'error', title: 'Error', message: responseInJson.message});
    }

    // this.setState({
    //   data: responseInJson.data,
    // });
  }

  _textQuantity = (quantity) => {
    console.log('quantitySelected from TextInput: ', quantity);
    this.quantity.push(quantity);
    this.setState({
      // enterQuantity: quantity,
      quantity: quantity
    });
  }

  _dropdownUnit = (unit) => {
    console.log('unitSelected from button: ', unit);
    this.unit.push(unit);
    this.setState({
      unit: unit
    });
  }

  async sendRfq() {
      this._loadingButton.showLoading(true);
      const token = await AsyncStorage.getItem('user_token');
      let cart_id = [];
      this.state.data.map((item) => {
        cart_id.push(item.id);
      });
      console.log('both ids: ', cart_id);
      const data = {
        token: token,
        cart_id: cart_id,
        quantity: this.state.quantity,
        unit: this.unit,
      };
      const resp = await services.sendRfq(data);
      this._loadingButton.showLoading(false);
      const responseInJson = await resp.json();
      console.log(responseInJson);
      if (responseInJson.response === 'success') {
        this._dropdown.itemAction({type: 'success', title: 'Quotation Sent', message: responseInJson.message});
      } else {
        this._dropdown.itemAction({type: 'error', title: 'Error', message: 'Please enter quantity and units'});
      }
    }


  // deleteItemFromCart(item) {
  //   // console.log(item);
  //   var cartItems = this.state.data;
  //   this.state.data.map((cartItem, index) => {
  //     if (item.id === cartItem.id) {
  //       cartItems.splice(index, 1);
  //     }
  //   });
  //   console.log(cartItems);
  //   this.setState({data: cartItems});
  // }

  render() {
    let dropdownUnit = [
      {
        value: 'كرتونه',
      },
      {
        value: 'قطعة',
      },
      {
        value: 'دزينة',
      },
      {
        value: 'رزمة',
      },
      {
        value: 'رول',
      },
    ];
    return(
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={() => this.cartOpen()}
        />
        <Header navigation={this.props.navigation} title={'My Cart'}/>
        {
          this.state.showLoader === true
          ? <View style={styles.loader}>
              <Bubbles size={10} color="#f33155" />
            </View>
          : <View>
              {
                this.state.noData === true
                ? <View style={{padding: 20}}>
                    <Text>No items in cart</Text>
                  </View>
                : <ScrollView>
                  <View style={styles.cartsView}>
                    <FlatList
                    contentContainerStyle={styles.flatList}
                    data={this.state.data}
                    // keyExtractor={(item) => item.name}
                    extraData={this.state}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) =>
                    <View style={styles.productView}>
                      <View style={styles.prodetailView}>
                        <Text style={styles.name}>{item.product_name}</Text>
                        <TouchableOpacity style={styles.delButton}
                          onPress={() => this.deleteCartItem(item)}
                          >
                          <Image source={require('../images/del_icon.png')}
                          resizeMode={'contain'}
                          style={{width: 20, height: 20}} />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.prodetailView}>
                        <TextInput
                          // value={this.state.quantity}
                          style={styles.textQuantity}
                          placeholder={'Enter quantity'}
                          placeholderTextColor = "#a6b8d4"
                          onChange={this._textQuantityChange}
                          onChangeText={this._textQuantity}
                        />
                        <Dropdown
                          containerStyle={styles.dropdownUnit}
                          dropdownPosition={0.1}
                          label='Unit'
                          data={dropdownUnit}
                          itemCount={5}
                          onChangeText={this._dropdownUnit}
                        />
                      </View>

                    </View>
                    }
                    />
                    <LoadingButton ref={(c) => this._loadingButton = c} title='Request for Quotation' onPress={() => this.sendRfq()} />
                  </View>
                </ScrollView>
              }
            </View>


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
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cartsView: {
    padding: 10
  },
  imageView: {
    width: '10%',
    alignItems: 'center',
    height: '100%'
  },
  prodetailView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'blue'
  },
  textQuantity: {
    width: '48%',
    borderBottomWidth: 1,
    height: 40,
    borderColor: '#4f5154',
    marginTop: 13,
    borderRadius: 5,
    // paddingTop: 1,
    marginBottom: 1
  },
  dropdownUnit: {
    width: '50%'
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold'
  },
};
