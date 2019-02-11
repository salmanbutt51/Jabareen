import React, { Component } from 'react';
import Slideshow from 'react-native-image-slider-show';
import {
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  ImageBackground,
  AsyncStorage,
} from 'react-native';
import Header from '../components/Header';
import DropdownMessageAlert from '../templates/DropdownMessageAlert';
import LoadingButton from '../templates/LoadingButton';

export default class MyProfileScreen extends Component<{}> {

  state = {
    userData: {}
  }

  async componentDidMount() {
    var userData = await AsyncStorage.getItem('userData');
    userData = JSON.parse(userData);
    this.setState({userData});
    console.log(userData);
  }

  render() {
    const {userData} = this.state;
    const uri = 'https://jabareen.app/uploads/profile/' + userData.picture;
    return(
      <View style={styles.mainContainer}>
        <Header navigation={this.props.navigation} showUserIcon={false} title={'Profile Overview'} />
        <ScrollView>
          <View style={styles.picView}>
            <Image
              source={{uri: uri}}
              resizeMode={'contain'}
              style={styles.profilePic}
            />
            <Text style={[styles.picText, {fontSize: 18, marginVertical: 5}]}>{userData.user_name}</Text>
            <Text style={styles.picText}>{userData.email}</Text>
          </View>
          <View style={styles.container}>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.inputText}>Full Name</Text>
              <Text style={styles.inputBox}>
                {userData.user_name}
              </Text>
              <Text style={styles.inputText}>Mobile</Text>
              <Text style={styles.inputBox}>
                {userData.phone_number}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

}

const styles = {
  mainContainer: {
    flex: 1,
    backgroundColor: '#edf1f5',
  },
  picView: {
    height: 230,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7c87d4'
  },
  profilePic: {
    height: 100,
    width: 100,
    borderRadius: 70,
    // backgroundColor: 'red'
  },
  picText: {
    color: '#fff',
    fontSize: 15
  },
  container: {
    padding: 10,
    marginTop: 20
  },
  inputText:{
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    paddingLeft: 5
  },
  inputBox: {
    // borderBottomWidth: 1,
    // borderColor: '#a6b8d4',
    fontSize: 18,
    color: 'black',
    marginTop: 10,
    marginBottom: 20,
    // paddingHorizontal: 8,
    height: 40,
  },
  button: {
    // flex: 1,
    backgroundColor: '#f33155',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: '100%',
    borderRadius: 5
    // paddingVertical: 30
  },
};
