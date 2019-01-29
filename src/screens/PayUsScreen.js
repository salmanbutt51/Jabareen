import React, { Component } from 'react';
import PayPal from 'react-native-paypal-wrapper';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native';
import Header from '../components/Header';
import services from '../utils/services';
import DropdownMessageAlert from '../templates/DropdownMessageAlert';

export default class App extends Component<{}> {

  state = {
    amountToPay: '',
  }

  makePayment() {
    const amount = this.state.amountToPay;
    if (amount === '' || amount === '0') {
      this._dropdown.itemAction({title: 'Validation Error', type: 'error', message: 'Amount is required'});
      return;
    }
    PayPal.initialize(PayPal.NO_NETWORK, 'AREYMy5sYyFt0byzvPecaanW4N-zKN2A-lrbBKrRiAqO_3lBrctnkpM6srEmRLiqUd7MKuuiDewsl1k3PAYPAL_SECRET=EKHe_fA9M5TFQWzm0n0N0TlRFurrGgLM7DaQsGOd1gZwl0_UrOwRxt2p-MJE5jodeZOozSIJDrgiul77');
    PayPal.pay({
      price: amount,
      currency: 'USD',
      description: 'Payment from the app',
    }).then((confirm) => {
      this._dropdown.itemAction({title: 'Success', type: 'success', message: 'Payment was successfully done'});
      this.setState({amountToPay: ''});
    })
    .catch((error) => console.log(error));
  }

  render() {
    return(
      <View style={styles.container}>
        <Header navigation={this.props.navigation} showCartIcon={true} showNotificationIcon={true} title={'Pay Us'} />
        <View style={styles.subContainer}>
          <Text style={styles.inputText}>Amount<Text style={{color: 'red'}}>*</Text></Text>
          <TextInput
            value={this.state.amountToPay}
            style={styles.inputBox}
            keyboardType={'number-pad'}
            onChangeText={(t) => this.setState({amountToPay: t})}
          />
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity onPress={() => this.makePayment()} style={styles.rfmButton}>
              <Text style={styles.rfmText}>Pay with paypal</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  subContainer: {
    padding: 10
  },
  inputText:{
    fontSize: 18,
    color: 'black'
  },
  inputBox: {
    // width: '50%',
    borderWidth: 1,
    borderColor: '#a6b8d4',
    fontSize: 18,
    color: 'black',
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 8,
    height: 40,
    borderRadius: 5,
  },
  rfmButton: {
    backgroundColor: '#f33155',
    height: 35,
    borderRadius: 5,
    // paddingVertical: 5,
    // paddingHorizontal: 8,
    marginTop: 3,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  rfmText: {
    color: '#fff',
    fontSize: 15
  },
};
