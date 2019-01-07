import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Button
} from 'react-native';
import Header from '../components/Header';
import services from '../utils/services';
export default class App extends Component<{}> {
  state = {
    token: ''
  };
  const resp = await services.category(data);
  this.setState({
    token: resp
  });
  render() {
    return(
      <View style={styles.container}>
        <Header navigation={this.props.navigation} />
        <ScrollView>
          <View style={styles.nameView}><Text style={styles.nameText}>Products</Text></View>
          <View style={styles.productsView}>
            <View style={styles.flexView}>
              <TouchableOpacity style={styles.tile}>
                <View><Text style={styles.tileText}>BIKES</Text></View>
                <View><Image source={require('../images/product1.png')}
                resizeMode={'contain'}
                style={styles.proImage} /></View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tile}>
                <View><Text style={styles.tileText}>CAMERAS</Text></View>
                <View><Image source={require('../images/product2.png')}
                resizeMode={'contain'}
                style={styles.proImage} /></View>
              </TouchableOpacity>
            </View>
            <View style={styles.flexView}>
              <TouchableOpacity style={styles.tile}>
                <View><Text style={styles.tileText}>MOBILES</Text></View>
                <View><Image source={require('../images/product3.png')}
                resizeMode={'contain'}
                style={styles.proImage} /></View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tile}>
                <View><Text style={styles.tileText}>CARS</Text></View>
                <View><Image source={require('../images/product4.png')}
                resizeMode={'contain'}
                style={styles.proImage} /></View>
              </TouchableOpacity>
            </View>
            <View style={styles.flexView}>
              <TouchableOpacity style={styles.tile}>
                <View><Text style={styles.tileText}>LAPTOPS</Text></View>
                <View><Image source={require('../images/product5.png')}
                resizeMode={'contain'}
                style={styles.proImage} /></View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tile}>
                <View><Text style={styles.tileText}>WATCHES</Text></View>
                <View><Image source={require('../images/product6.png')}
                resizeMode={'contain'}
                style={styles.proImage} /></View>
              </TouchableOpacity>
            </View>
            <View style={styles.flexView}>
              <TouchableOpacity style={styles.tile}>
                <View><Text style={styles.tileText}>CLOTHES</Text></View>
                <View><Image source={require('../images/product7.png')}
                resizeMode={'contain'}
                style={styles.proImage} /></View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tile}>
                <View><Text style={styles.tileText}>SHOES</Text></View>
                <View><Image source={require('../images/product8.png')}
                resizeMode={'contain'}
                style={styles.proImage} /></View>
              </TouchableOpacity>
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
  flexView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 13,
    flex: 1,
    height: 200,
  },
  tile: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#f33155',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 0.46
    // marginHorizontal: 10
  },
  tileText: {
    fontSize: 17,
    color: '#f994a7',
    textAlign: 'center'
  },
  proImage: {
    width: 150,
    height: 140
  }
}
