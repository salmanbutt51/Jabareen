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
  Button,
  AsyncStorage,
  FlatList
} from 'react-native';
import Header from '../components/Header';
import { NavigationEvents } from 'react-navigation';
import services from '../utils/services';
export default class App extends Component<{}> {

  state = {
    sliderImages: []
  }

  componentDidMount() {
    this.dashboardOpen();
  }

  async dashboardOpen() {
    const token = await AsyncStorage.getItem('user_token');
    const data = {
      token: token,
    };
    const resp = await services.dashboard(data);
    const responseInJson = await resp.json();
    console.log(responseInJson);
    var slideImages = [];
    responseInJson.data.map((item)=>{
      slideImages.push(item.slider_url);
    });
    console.log(slideImages);
    this.setState({
      sliderImages: slideImages,
    });
  }

  render() {
    return(
      <View style={styles.container}>
        <Header navigation={this.props.navigation} showDrawer={true} showCartIcon={true} showNotificationIcon={true} title={'Dashboard'} />
        <ScrollView>
          <View style={styles.dashboardView}>
            <ImageSlider images={this.state.sliderImages}
              loopBothSides= {true}
              autoPlayWithInterval={3000}
            />
          </View>
          <View style={styles.tilesView}>
            <View style={styles.flexView}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Products')} style={styles.tile}>
                <View><Text style={styles.tileText}>PRODUCTS</Text></View>
                <View><Image source={require('../images/products1.png')}
                resizeMode={'contain'}
                style={styles.tileImage} /></View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Cart')} style={styles.tile}>
                <View><Text style={styles.tileText}>CART</Text></View>
                <View><Image source={require('../images/cart_icon.png')}
                resizeMode={'contain'}
                style={styles.tileImage} /></View>
              </TouchableOpacity>
            </View>
            <View style={styles.flexView}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Evaluate')} style={styles.tile}>
                <View><Text style={styles.tileText}>EVALUATE</Text></View>
                <View><Image source={require('../images/evaluate.png')}
                resizeMode={'contain'}
                style={styles.tileImage} /></View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Advertisement')} style={styles.tile}>
                <View><Text style={styles.tileText}>ADS</Text></View>
                <View><Image source={require('../images/ads.png')}
                resizeMode={'contain'}
                style={styles.tileImage} /></View>
              </TouchableOpacity>
            </View>
            <View style={styles.flexView}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Rfm')} style={styles.tile}>
                <View><Text style={styles.tileText}>RFM</Text></View>
                <View><Image source={require('../images/rfm.png')}
                resizeMode={'contain'}
                style={styles.tileImage} /></View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Whoweare')} style={styles.tile}>
                <View><Text style={styles.tileText}>WHO WE ARE</Text></View>
                <View><Image source={require('../images/whoweare.png')}
                resizeMode={'contain'}
                style={styles.tileImage} /></View>
              </TouchableOpacity>
            </View>
            <View style={styles.flexView}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Contactus')} style={styles.tile}>
                <View><Text style={styles.tileText}>CONTACT US</Text></View>
                <View><Image source={require('../images/contactus.png')}
                resizeMode={'contain'}
                style={styles.tileImage} /></View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('AccountRequest')} style={styles.tile}>
                <View><Text style={styles.tileText}>ACCOUNT REQUEST</Text></View>
                <View><Image source={require('../images/accountrequest.png')}
                resizeMode={'contain'}
                style={styles.tileImage} /></View>
              </TouchableOpacity>
            </View>
            <View style={styles.flexView}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Companyteam')} style={styles.tile}>
                <View><Text style={styles.tileText}>COMPANY TEAM</Text></View>
                <View><Image source={require('../images/products1.png')}
                resizeMode={'contain'}
                style={styles.tileImage} /></View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Complaints')} style={styles.tile}>
                <View><Text style={styles.tileText}>COMPLAINTS & PROPOSALS</Text></View>
                <View><Image source={require('../images/complaints.png')}
                resizeMode={'contain'}
                style={styles.tileImage} /></View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#edf1f5',
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
    color: '#f33155',
    textAlign: 'center'
  },
  tileImage: {
    height: 25,
    width: 30
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
};
