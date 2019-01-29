import React, { Component } from 'react';
import PayPal from 'react-native-paypal-wrapper';
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
  FlatList,
  TextInput
} from 'react-native';
import Header from '../components/Header';
import services from '../utils/services';
export default class App extends Component<{}> {

  state = {
    price: ''
  }

  render() {
    return(

      <View style={styles.container}>
        <Header navigation={this.props.navigation} showCartIcon={true} showNotificationIcon={true} title={'Pay Us'} />
        <View style={styles.subContainer}>
          <Text style={styles.inputText}>Amount<Text style={{color: 'red'}}>*</Text></Text>
          <TextInput
            // value={this.state.quantity}
            style={styles.inputBox}
            // onChange={this._textQuantityChange}
            // onChangeText={this._textQuantity}
          />
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity style={styles.rfmButton}>
              <Text style={styles.rfmText}>Pay with paypal</Text>
            </TouchableOpacity>
          </View>
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
