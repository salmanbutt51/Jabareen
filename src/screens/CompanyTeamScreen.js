import React, { Component } from 'react';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
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
  FlatList,
  TextInput,
  ActivityIndicator
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Header from '../components/Header';
import services from '../utils/services';
import LoadingButton from '../components/LoadingButton';
import { NavigationEvents } from 'react-navigation';
import DropdownMessageAlert from '../templates/DropdownMessageAlert';

export default class CompanyTeamScreen extends Component<{}> {
  state = {
    data: [],
    isDateTimePickerVisible: false,
    isrfmbuttonVisible: false,
    item: {},
    refreshing: true
  }

  componentDidMount(){
    this.getCompanyTeam()
  }

  async getCompanyTeam() {
    this.setState({refreshing: true});
    const token = await AsyncStorage.getItem('user_token');
    const data = {
      token: token
    };
    const resp = await services.companyTeamList(data);
    const responseInJson = await resp.json();
    console.log(responseInJson);
    this.setState({
      data: responseInJson.data,
      refreshing: false
    });
  }

  showDateTimePicker(item) {
    this.setState({ isDateTimePickerVisible: true, item });
  }

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    console.log('item:', this.state.item);
    var companies = this.state.data;
    companies.map((company) => {
      if (this.state.item.id === company.id) {
        company.date = date;
        console.log(company);
      }
    });
    console.log(companies);
    this.setState({data: companies});
    this._hideDateTimePicker();
  }

  async sendRfm(item) {
    this._loadingButton.showLoading(true);
    const token = await AsyncStorage.getItem('user_token');
    const data = {
      token: token,
      company_team_id: item.id,
      meeting_date_time: item.date
    };
    const resp = await services.sendRfm(data);
    this._loadingButton.showLoading(false);
    const responseInJson = await resp.json();
    console.log(responseInJson);
    if (responseInJson.response === 'success') {
      this._dropdown.itemAction({type: 'success', title: 'Rfm sent', message: responseInJson.message});
    } else {
      this._dropdown.itemAction({type: 'error', title: 'Error', message: responseInJson.message});
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <NavigationEvents
          onDidFocus={() => this.getCompanyTeam()}
        />
        <Header navigation={this.props.navigation} title={'Company Section'} />
        <FlatList
          contentContainerStyle={styles.flatList}
          extraData={this.state}
          onRefresh={() => (this.getCompanyTeam())}
          refreshing={this.state.refreshing}
          ListEmptyComponent={this.emptyView()}
          data={this.state.data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) =>
          <View style={styles.memberView}>
            <View style={styles.imageView}>
              <Image source={{uri: item.image}}
              resizeMode={'contain'}
              style={styles.profilePic} />
            </View>
            <View style={styles.detailView}>
              <Text style={styles.name}>{item.name}</Text>
              <View style={styles.rfmView}>
                <Text style={styles.position}>{item.position}</Text>
                <TouchableOpacity onPress={() => {
                    this.showDateTimePicker(item);
                  }}>
                  <Image source={require('../images/rfm_icon2.png')}
                  resizeMode={'contain'}
                  style={{width: 40, height: 30}} />
                </TouchableOpacity>
              </View>
              <Text style={styles.mobile}>Tel: {item.mobile}</Text>
              <Text style={styles.email}>Email: {item.email}</Text>
              {
                item.date === undefined
                ? <Text>Select date</Text>
                : <View>
                    <Text>{item.date.toString()}</Text>
                    <LoadingButton ref={(c) => this._loadingButton = c} style={{width: '50%', height: 30, marginTop: 10}} title='Send RFM' titleStyle={{fontSize: 16}} onPress={() => this.sendRfm(item)} />
                  </View>
              }
            </View>
          </View>
        }
        />
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          mode='datetime'
        />
        <DropdownMessageAlert ref={(c) => this._dropdown = c} />
      </View>
    );
  }

  emptyView() {
    if (this.state.refreshing === false) {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 100}}>
          <Text style={{fontSize: 20}}>No data</Text>
        </View>
      );
    }
  }

}
const styles = {
  container: {
    flex: 1,
  },
  subContainer: {
    padding: 10
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  flatList: {
    padding: 10
  },
  memberView: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderColor: '#f33155',
    marginBottom: 10,
    // backgroundColor: 'blue'
  },
  detailView: {
    justifyContent: 'center',
    // backgroundColor: 'blue',
    paddingRight: 10,
    flex: 1
  },
  rfmView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  rfmButton: {
    backgroundColor: '#f33155',
    height: 30,
    borderRadius: 5,
    marginTop: 3,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  rfmText: {
    color: '#fff',
    fontSize: 15
  },
  position: {
    fontSize: 18,
    fontStyle: 'italic',
    marginBottom: 8,
    color: '#444c47'
  },
  mobile: {
    fontSize: 15,
    color: '#444c47'
  },
  email: {
    fontSize: 15,
    color: '#444c47'
  },
  imageView: {
    alignItems: 'center',
    // justifyContent: 'center'
  },
  profilePic: {
    width: 150,
    height: 140,
  },
};
