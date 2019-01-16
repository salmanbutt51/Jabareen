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
  TextInput,
  AsyncStorage,
  FlatList
} from 'react-native';
import Header from '../components/Header';
import services from '../utils/services';
import { Dropdown } from 'react-native-material-dropdown';
import DropdownMessageAlert from '../templates/DropdownMessageAlert';
export default class App extends Component<{}> {
  state = {
    data: [],
    quantity: '',
    unit: ''
  }

  quantity = [];
  unit = [];

  async componentDidMount(){
    const token = await AsyncStorage.getItem('user_token');
    const data = {
      token: token,
    };
    const resp = await services.cartList(data);
    const responseInJson = await resp.json();
    console.log(responseInJson);
    this.setState({
      data: responseInJson.data
    });
  }

  _dropdownQuantity = (quantity) => {
    console.log('quantitySelected from button: ', quantity);
    this.quantity.push(quantity);
    this.setState({
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

  async sendRfq(){
    const token = await AsyncStorage.getItem('user_token');
    let cart_id = [];
    this.state.data.map((item) => {
      cart_id.push(item.id);
    });
    console.log('both ids: ', cart_id)
    const data = {
      token: token,
      cart_id: cart_id,
      quantity: this.quantity,
      unit: this.unit,
    };
    const resp = await services.sendRfq(data);
    const responseInJson = await resp.json();
    console.log(responseInJson);
    if (responseInJson.response === 'success') {
      this._dropdown.itemAction({type: 'success', title: 'Quotation Sent', message: responseInJson.message});
    } else {
      this._dropdown.itemAction({type: 'error', title: 'Error', message: responseInJson.message});
    }
  }

  render() {
    let dropdownQuantity = [
      {
        value: '1',
      },
      {
        value: '2',
      },
      {
        value: '3',
      },
      {
        value: '4',
      },
      {
        value: '5',
      },
    ];
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
        {/*<Header navigation={this.props.navigation} title={'My Cart'}/>*/}
        <ScrollView>
          <View style={styles.cartsView}>
            <FlatList
            contentContainerStyle={styles.flatList}
            data={this.state.data}
            // keyExtractor={(item) => item.name}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) =>
            <View style={styles.productView}>

              <View style={styles.prodetailView}>
                <Text style={styles.name}>{item.product_name}</Text>
                <TouchableOpacity style={styles.delButton}>
                  <Image source={require('../images/del_icon.png')}
                  resizeMode={'contain'}
                  style={{width: 20, height: 20}} />
                </TouchableOpacity>
              </View>
              <View style={styles.prodetailView}>
                <Dropdown
                  containerStyle={styles.dropdownQuantity}
                  dropdownPosition={0.1}
                  label='Quantity'
                  data={dropdownQuantity}
                  itemCount={5}
                  onChangeText={this._dropdownQuantity}
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
            <TouchableOpacity onPress={() => this.sendRfq()} style={styles.rfmButton}>
              <Text style={styles.rfmText}>Request for quotation</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  cartsView: {
    padding: 10
  },
  productView: {

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
  dropdownQuantity: {
    width: '70%'
  },
  dropdownUnit: {
    width: '30%'
  },
  nameAndDel: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'red'
  },
  addRemoveButton: {
    flexDirection: 'row',
    marginTop: 10
  },
  quantityView: {
    width: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#a6b8d4',
    // backgroundColor: 'blue'
  },
  quantityItemsView: {
    width: 50,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#a6b8d4',
  },
  quantityText: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  rfmButton: {
    backgroundColor: '#f33155',
    height: 40,
    borderRadius: 5,
    // paddingVertical: 5,
    // paddingHorizontal: 8,
    marginTop: 3,
    // width: '40%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  rfmText: {
    color: '#fff',
    fontSize: 15
  },
};
