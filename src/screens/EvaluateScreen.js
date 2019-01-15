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
  // async componentDidMount(){
  //   const token = await AsyncStorage.getItem('user_token');
  //   const data = {
  //     token: token
  //   };
  //   const resp = await services.companyTeamList(data);
  //   const responseInJson = await resp.json();
  //   console.log(responseInJson);
  //   this.setState({
  //     data: responseInJson.data
  //   });
  // }
  render() {
    return(
      <View style={styles.container}>
        <ScrollView>
            <Header navigation={this.props.navigation} title={'Evaluate'} />

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

};
