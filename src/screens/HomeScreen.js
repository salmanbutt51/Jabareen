import React, { Component } from 'react';
import ImageSlider from 'react-native-image-slider';
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
export default class App extends Component<{}> {

  render() {
    return(
      <View style={styles.container}>
        <ScrollView>
          <Header navigation={this.props.navigation} />
          <View style={styles.dashboardView}>
          <ImageSlider images={[
            'https://c.tribune.com.pk/2018/12/1877683-imrankhanofficialxx-1546178992-959-640x480.jpeg',
            'https://c.tribune.com.pk/2018/06/1736644-imrankhanepa-1529252546-908-640x480.jpg',
            'https://images.indianexpress.com/2018/08/imran-khan-7591.jpg']}
            loopBothSides= {true}
            autoPlayWithInterval={3000}
          />
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
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Whoweare')} style={styles.tile}>
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
            <View style={styles.flexView}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Complaints')} style={styles.tile}>
                <View><Text style={styles.tileText}>COMPLAINTS & PROPOSALS</Text></View>
                <View><Image source={require('../images/products.png')}
                resizeMode={'contain'}
                style={{width: 40, height: 30}} /></View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.contactView}>
            <TouchableOpacity style={styles.contactButton}>
              <Text style={styles.contactText}>Contact Us</Text>
            </TouchableOpacity>
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
    height: 250,
    // justifyContent: 'center',
    marginBottom: 13
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
    marginBottom: 13,
    flex: 1,
    height: 100,
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
  contactView: {
    justifyContent: 'flex-end',
  },
  contactButton: {
    backgroundColor: '#e04c67',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  contactText: {
    color: 'white',
    fontSize: 20
  }
}
