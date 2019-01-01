import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
export default class App extends Component<{}> {

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.navbar}>
          <View style={{justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}><Image source={require('../images/menu_icon.png')}
              resizeMode={'contain'} style={{width: 70, height: 50}}/></TouchableOpacity>
          </View>
          <View style={{justifyContent: 'center'}}>
            <TouchableOpacity>
              <Image source={require('../images/logout.png')}
              resizeMode={'contain'} style={{width: 50, height: 37}}/>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          <View style={styles.dashboardView}>
            <Text style={styles.dashText}>Dashboard</Text>
          </View>
          <View style={styles.tilesView}>
            <View style={styles.flexView}>
              <TouchableOpacity style={styles.tile}>
                <View><Text style={styles.tileText}>PRODUCTS</Text></View>
                <View><Image source={require('../images/products.png')}
                resizeMode={'contain'}
                style={{width: 40, height: 30}} /></View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tile}>
                <View><Text style={styles.tileText}>CART</Text></View>
                <View><Image source={require('../images/products.png')}
                resizeMode={'contain'}
                style={{width: 40, height: 30}} /></View>
              </TouchableOpacity>
            </View>
            <View style={styles.flexView}>
              <TouchableOpacity style={styles.tile}>
                <View><Text style={styles.tileText}>EVALUATE</Text></View>
                <View><Image source={require('../images/products.png')}
                resizeMode={'contain'}
                style={{width: 40, height: 30}} /></View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tile}>
                <View><Text style={styles.tileText}>ADS</Text></View>
                <View><Image source={require('../images/products.png')}
                resizeMode={'contain'}
                style={{width: 40, height: 30}} /></View>
              </TouchableOpacity>
            </View>
            <View style={styles.flexView}>
              <TouchableOpacity style={styles.tile}>
                <View><Text style={styles.tileText}>RFM</Text></View>
                <View><Image source={require('../images/products.png')}
                resizeMode={'contain'}
                style={{width: 40, height: 30}} /></View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tile}>
                <View><Text style={styles.tileText}>WHO WE ARE</Text></View>
                <View><Image source={require('../images/products.png')}
                resizeMode={'contain'}
                style={{width: 40, height: 30}} /></View>
              </TouchableOpacity>
            </View>
            <View style={styles.flexView}>
              <TouchableOpacity style={styles.tile}>
                <View><Text style={styles.tileText}>CONTACT US</Text></View>
                <View><Image source={require('../images/products.png')}
                resizeMode={'contain'}
                style={{width: 40, height: 30}} /></View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tile}>
                <View><Text style={styles.tileText}>ACCOUNT REQUEST</Text></View>
                <View><Image source={require('../images/products.png')}
                resizeMode={'contain'}
                style={{width: 40, height: 30}} /></View>
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
  navbar:{
    justifyContent: 'center',
    backgroundColor: '#f33155',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dashboardView: {
    height: 70,
    justifyContent: 'center',
    // paddingHorizontal: 20,
  },
  dashText: {
    color: '#2098d1',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tilesView: {
    backgroundColor: '#edf1f5',
    // paddingHorizontal: 10,
  },
  flexView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    flex: 1,
    height: 100,
  },
  tile: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#f33155',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 0.45
    // marginHorizontal: 10
  },
  tileText: {
    fontSize: 20,
    color: '#f994a7',
    textAlign: 'center'
  }
}
