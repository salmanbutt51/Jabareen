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
  AsyncStorage,
  FlatList
} from 'react-native';
import Header from '../components/Header';
import services from '../utils/services';
import LoadingButton from '../components/LoadingButton';
import DropdownMessageAlert from '../templates/DropdownMessageAlert';
export default class App extends Component<{}> {
  // state = {
  //   data: []
  // }
  async accountRequest(){
    this._loadingButton.showLoading(true);
    const token = await AsyncStorage.getItem('user_token');
    const data = {
      token: token
    };
    const resp = await services.AccountRequest(data);
    this._loadingButton.showLoading(false);
    const responseInJson = await resp.json();
    console.log(responseInJson);
    if (responseInJson.response === 'success') {
      this._dropdown.itemAction({type: 'success', title: 'Report Sent', message: responseInJson.message});
    } else {
      this._dropdown.itemAction({type: 'error', title: 'Error', message: responseInJson.message});
    }
    // this.setState({
    //   data: responseInJson.data
    // });
  }
  render() {
    return(
      <View style={styles.container}>
        <Header navigation={this.props.navigation} title={'Account Request'} />
        <ScrollView>
          <View style={styles.subContainer}>
            <Text style={styles.text}>If you press this button. We will receive your account request & will reply you in the earliest.</Text>
            <Text style={styles.text}>إذا قمت بالضغط على الأيقونة الموجوده فسيتم إرسال طلب كشف حساب وسنقوم بإرساله لكم بأسرع وقت </Text>
            <LoadingButton ref={(c) => this._loadingButton = c} style={{marginTop: 20}} title='Send Financial Account Report' onPress={() => this.accountRequest()} />
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
  },
  subContainer: {
    padding: 10
  },
  text: {
    fontSize: 20,
    marginTop: 5
  },
  submitButton: {
    backgroundColor: '#f33155',
    height: 50,
    marginTop: 30,
    // width: '50%',
    alignItems: 'center',
    borderRadius: 7,
    justifyContent: 'center'
  },
  submitText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  }
};
