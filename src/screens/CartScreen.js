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
  TextInput
} from 'react-native';
import Header from '../components/Header';
export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = { quantity: 1 };
  }
  render() {
    return(
      <View style={styles.container}>
        <Header navigation={this.props.navigation} />
        <ScrollView>
          <View style={styles.cartsView}>
            <View style={styles.nameView}><Text style={styles.nameText}>My Cart</Text></View>
            <View style={styles.productView}>
              <View style={styles.imageView}>
                <Image source={require('../images/crockery1.png')}
                resizeMode={'contain'}
                style={{width: 150, height: 130}} />
              </View>
              <View style={styles.prodetailView}>
                <Text style={styles.name}>Product name</Text>
                <Text style={styles.price}>Price</Text>
                <View style={styles.addRemoveButton}>
                  <TouchableOpacity onPress =  {() => this.setState({quantity: this.state.quantity-1})} style={styles.quantityView}>
                    <Text style={styles.quantityText}>-</Text>
                  </TouchableOpacity>
                  <View style={styles.quantityItemsView}>
                    <Text style={styles.quantityText}>{this.state.quantity}</Text>
                  </View>
                  <TouchableOpacity onPress = {() => this.setState({quantity: this.state.quantity+1})} style={styles.quantityView}>
                    <Text style={styles.quantityText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    )
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
  nameView: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  nameText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black'
  },
  productView: {
    flexDirection: 'row',
    // justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: 'blue'
  },
  imageView: {
    marginRight: 5
  },
  prodetailView: {
    // backgroundColor: 'blue',
    flex: 1
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
  }
}
