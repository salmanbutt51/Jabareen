import React, { Component } from 'react';
import Slideshow from 'react-native-image-slider-show';
import {
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  FlatList,
  TextInput,
  ScrollView,
  Image,
  ImageBackground
} from 'react-native';
import services from '../utils/services';
import Header from '../components/Header';
import DropdownMessageAlert from '../templates/DropdownMessageAlert';
import LoadingButton from '../templates/LoadingButton';
export default class App extends Component<{}> {

  render() {
    return(
      <View style={styles.mainContainer}>
        <Header navigation={this.props.navigation} showUserIcon={false} title={'Profile Overview'} />
        <ScrollView>
          <ImageBackground source={require('../images/profile-pic.png')} style={{flex: 1}}>
            <View style={styles.picView}>
              <Image
                source={require('../images/profile-pic.png')}
                resizeMode={'contain'}
                style={styles.profilePic}
              />
              <Text style={[styles.picText, {marginTop: 10}]}>Change photo</Text>
              <Text style={[styles.picText, {fontSize: 18, marginVertical: 5}]}>Muhammad</Text>
              <Text style={styles.picText}>sbg.med5@gmail.com</Text>
            </View>
          </ImageBackground>
          <View style={styles.container}>
            <Text style={styles.inputText}>Full Name</Text>
            <TextInput style={styles.inputBox}
            value={'Muhammad'}
              placeholderTextColor = "#a6b8d4"
            />
            <Text style={styles.inputText}>Full Name</Text>
            <TextInput style={styles.inputBox}
            value={'Address'}
              placeholderTextColor = "#a6b8d4"
            />
            <Text style={styles.inputText}>Mobile<Text style={{color: 'red'}}>*</Text></Text>
            <TextInput style={styles.inputBox}
            value={'042435546 '}
              placeholderTextColor = "#a6b8d4"
            />
            <LoadingButton title='Update Profile' titleStyle={{fontSize: 18}} style={styles.button} />
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
    borderRadius: 70
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
    paddingLeft: 5
  },
  inputBox: {
    borderBottomWidth: 1,
    borderColor: '#a6b8d4',
    fontSize: 18,
    color: '#a4a4a4',
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
