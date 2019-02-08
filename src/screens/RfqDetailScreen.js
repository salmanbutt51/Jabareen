import React, { Component } from 'react';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
// import Dialog, { SlideAnimation, DialogContent } from 'react-native-popup-dialog';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
  TextInput,
  AsyncStorage,
  FlatList
} from 'react-native';
import Header from '../components/Header';
import services from '../utils/services';
import { NavigationEvents } from 'react-navigation';
// import { Dropdown } from 'react-native-material-dropdown';
// import services from '../utils/services';
export default class App extends Component<{}> {

  state = {
    data: [],
    refreshing: true
  }

  componentDidMount(){
    this.getRfqHistoryDetail();
  }

  group_id = this.props.navigation.state.params.group_id;
  async getRfqHistoryDetail(){
    const token = await AsyncStorage.getItem('user_token');
    const data = {
      token: token,
      group_id: this.group_id
    };
    const resp = await services.rfqHistoryDetail(data);
    const responseInJson = await resp.json();
    console.log('Rfq response',responseInJson);
    this.setState({
      data: responseInJson.data,
      refreshing: false
    });
  }

  render() {
    return(
      <View style={styles.container}>
        <NavigationEvents
          onDidFocus={() => this.getRfqHistoryDetail()}
        />
        <FlatList
          contentContainerStyle={styles.flatlist}
          onRefresh={() => (this.getRfq())}
          refreshing={this.state.refreshing}
          ListEmptyComponent={this.emptyView()}
          data={this.state.data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) =>
            <View style={styles.item}>
              <View style={styles.nameView}>
                <Text style={styles.heading}>Sender Name</Text>
                <Text style={styles.content}>{item.sender_name}</Text>
              </View>
              <View style={styles.detailView}>
                <Text style={styles.heading}>Product: </Text>
                <Text style={styles.content}>{item.product_name}</Text>
              </View>
              <View style={styles.detailView}>
                <Text style={styles.heading}>Quantity: </Text>
                <Text style={styles.content}>{item.quantity}</Text>
              </View>
            </View>
          }
        />
      </View>
    );
  }

  emptyView() {
    if (this.state.refreshing === false) {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 100}}>
          <Text style={{fontSize: 20}}>No data available</Text>
        </View>
      );
    }
  }

}
const styles = {
  container: {
    flex: 1,
    backgroundColor: '#edf1f5',
  },
  flatlist: {
    paddingHorizontal: 10,
    paddingBottom: 10
  },
  item: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10
  },
  nameView: {
    marginBottom: 10
  },
  detailView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    // backgroundColor: '#f33155'
  },
  content: {
    fontSize: 16,
    // marginBottom: 5
  },
};
