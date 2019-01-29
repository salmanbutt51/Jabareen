import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
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
    refreshing: true,
  }

  quantity = [];
  unit = [];
  dropdownUnits = [
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

  async getCartItems() {
    this.setState({refreshing: true});
    const token = await AsyncStorage.getItem('user_token');
    const data = {
      token: token,
    };
    const resp = await services.cartList(data);
    const responseInJson = await resp.json();
    console.log(responseInJson);
    this.setState({
      data: responseInJson.data,
      refreshing: false,
    });
  }

  async deleteCartItem(topItem) {
    const item = topItem.item;
    var cartItems = this.state.data;
    const token = await AsyncStorage.getItem('user_token');
    const data = {
      token: token,
      cart_id: item.id
    };
    const resp = await services.deleteCart(data);
    const responseInJson = await resp.json();
    console.log(responseInJson);
    if (responseInJson.response === 'success') {
      this.state.data.map((cartItem, index) => {
        if (item.id === cartItem.id) {
          cartItems.splice(index, 1);
          if (this.quantity[index] !== undefined) {
            this.quantity.splice(index, 1);
          }
          if (this.unit[index] !== undefined) {
            this.unit.splice(index, 1);
          }
        }
      });
      this.setState({data: cartItems});
      this._dropdown.itemAction({type: 'success', title: 'Success', message: 'Item deleted from cart'});
    } else {
      this._dropdown.itemAction({type: 'error', title: 'Error', message: responseInJson.message});
    }
  }

  changeQuantity(quantity, item) {
    console.log('quantity: ', quantity);
    console.log('item: ', item);
    this.quantity[item.index] = quantity;
    console.log(this.quantity);
  }

  changeUnit(unit, item) {
    console.log('unit: ', unit);
    console.log('item: ', item);
    this.unit[item.index] = unit;
    console.log(this.unit);
  }

  async sendRfq() {
      this._loadingButton.showLoading(true);
      const token = await AsyncStorage.getItem('user_token');
      let cart_id = [];
      this.state.data.map((item, index) => {
        cart_id.push(item.id.toString());
        if (this.quantity[index] === undefined) {
          this.quantity[index] = '1';
        }
        if (this.unit[index] === undefined) {
          this.unit[index] = 'كرتونه';
        }
      });
      console.log('both ids: ', cart_id);
      const data = {
        token: token,
        cart_id: cart_id,
        quantity: this.quantity,
        unit: this.unit,
      };
      const resp = await services.sendRfq(data);
      this._loadingButton.showLoading(false);
      const responseInJson = await resp.json();
      console.log(responseInJson);
      if (responseInJson.response === 'success') {
        this._dropdown.itemAction({type: 'success', title: 'Success', message: 'Quotation Sent'});
        this.setState({data: []});
        this.quantity = [];
        this.unit = [];
      } else {
        this._dropdown.itemAction({type: 'error', title: 'Error', message: 'Please enter quantity and units'});
      }
    }

  render() {
    const items = this.state.data;
    return(
      <View style={styles.container}>
        <NavigationEvents
          onDidFocus={() => this.getCartItems()}
        />
        <Header navigation={this.props.navigation} title={'My Cart'}/>
        <FlatList
          contentContainerStyle={styles.flatList}
          data={this.state.data}
          extraData={this.state}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(topItem) => this.renderItem(topItem)}
          ListEmptyComponent={this.emptyView()}
          ListFooterComponent={items.length > 0 ? <LoadingButton ref={(c) => this._loadingButton = c} title='Request for Quotation' onPress={() => this.sendRfq()} /> : null}
          onRefresh={() => (this.getCartItems())}
          refreshing={this.state.refreshing}
        />
        <DropdownMessageAlert ref={(c) => this._dropdown = c} />
      </View>
    );
  }

  emptyView() {
    if (this.state.refreshing === false) {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 100}}>
          <Text style={{fontSize: 20}}>No Items in the Cart</Text>
        </View>
      );
    }
  }

  renderItem(topItem) {
    const item = topItem.item;
    return(
      <View style={styles.productView}>
        <View style={styles.prodetailView}>
          <Text style={styles.name}>{item.product_name}</Text>
          <TouchableOpacity style={styles.delButton}
            onPress={() => this.deleteCartItem(topItem)}
            >
            <Image source={require('../images/del_icon.png')}
            resizeMode={'contain'}
            style={{width: 20, height: 20}} />
          </TouchableOpacity>
        </View>
        <View style={styles.prodetailView}>
          <TextInput
            style={styles.textQuantity}
            placeholderTextColor='black'
            placeholder={'1'}
            onChange={this._textQuantityChange}
            onChangeText={(t) => this.changeQuantity(t, topItem)}
            keyboardType={'number-pad'}
          />
          <Dropdown
            containerStyle={styles.dropdownUnit}
            dropdownPosition={0.1}
            label='Unit'
            value={'كرتونه'}
            data={this.dropdownUnits}
            itemCount={5}
            onChangeText={(t) => this.changeUnit(t, topItem)}
          />
        </View>
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
  flatList: {
    padding: 15,
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
