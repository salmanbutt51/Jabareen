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
export default class App extends Component<{}> {
  // state = {
  //   data: []
  // }
  async accountRequest(){
    const token = await AsyncStorage.getItem('user_token');
    const data = {
      token: token
    };
    const resp = await services.AccountRequest(data);
    const responseInJson = await resp.json();
    console.log(responseInJson);
    // this.setState({
    //   data: responseInJson.data
    // });
  }
  render() {
    return(
      <View style={styles.container}>
        <ScrollView>
          <Header navigation={this.props.navigation} title={'Account Request'} />
          <View style={styles.subContainer}>
            <Text style={styles.text}>If you press this button. We will receive your account request & will reply you in the earliest.</Text>
            <Text style={styles.text}>إذا قمت بالضغط على الأيقونة الموجوده فسيتم إرسال طلب كشف حساب وسنقوم بإرساله لكم بأسرع وقت </Text>
            <TouchableOpacity onPress={() => this.accountRequest()} style={styles.submitButton}>
              <Text style={styles.submitText}>Submit Request</Text>
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
