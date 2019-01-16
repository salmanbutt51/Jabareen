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
  FlatList,
  TextInput
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Header from '../components/Header';
import services from '../utils/services';
import DropdownMessageAlert from '../templates/DropdownMessageAlert';
export default class App extends Component<{}> {
  state = {
    data: [],
    isDateTimePickerVisible: false,
    date: 'Select Date',
    dateObj: {}
  }
  async componentDidMount(){
    const token = await AsyncStorage.getItem('user_token');
    const data = {
      token: token
    };
    const resp = await services.companyTeamList(data);
    const responseInJson = await resp.json();
    console.log(responseInJson);
    this.setState({
      data: responseInJson.data
    });
  }

  _showDateTimePicker() {
    this.setState({ isDateTimePickerVisible: true });
  }

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });



  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this._hideDateTimePicker();
    this.setState({
      date: date.toString(),
      dateObj: date
    });
  };

  async sendRfm(team_id){
    const token = await AsyncStorage.getItem('user_token');
    const data = {
      token: token,
      company_team_id: team_id,
      meeting_date_time: this.state.dateObj
    };
    const resp = await services.sendRfm(data);
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
        <ScrollView>

            <Header navigation={this.props.navigation} title={'Company Section'} />
            <View style={styles.subContainer}>
            <FlatList
            contentContainerStyle={styles.flatList}
            // style={{flex: 1}}
            // numColumns={2}
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
                    <View style={styles.rfmView}>
                      <Text style={styles.name}>{item.name}</Text>

                    </View>
                    <Text style={styles.position}>{item.position}</Text>
                    <Text style={styles.mobile}>Tel: {item.mobile}</Text>
                    <Text style={styles.email}>Email: {item.email}</Text>
                    <TouchableOpacity onPress={() => this._showDateTimePicker()}>
                      <Text>{this.state.date}</Text>
                    </TouchableOpacity>
                    <DateTimePicker
                      isVisible={this.state.isDateTimePickerVisible}
                      onConfirm={this._handleDatePicked}
                      onCancel={this._hideDateTimePicker}
                      mode='datetime'
                    />
                    <TouchableOpacity onPress={() => this.sendRfm(item.id)} style={styles.rfmButton}>
                      <Text style={styles.rfmText}>Send RFM</Text>
                    </TouchableOpacity>
                  </View>
                </View>
            }
            />

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
  flatList: {
    // flex: 1
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
    // paddingVertical: 5,
    // paddingHorizontal: 8,
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
    // alignItems: 'center',
    justifyContent: 'center'
  },
  profilePic: {
    width: 150,
    height: 140,
  },
  inputText:{
    fontSize: 20,
    color: 'black'
  },
  inputBox: {
    borderWidth: 1,
    borderColor: '#a6b8d4',
    // fontSize: 12,
    color: 'black',
    marginVertical: 5,
    // marginBottom: 10,
    paddingHorizontal: 8,
    height: 40,
    borderRadius: 5,
  },
};
