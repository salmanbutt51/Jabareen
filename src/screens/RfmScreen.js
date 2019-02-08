import React, { Component } from 'react';
import Dialog, { SlideAnimation, DialogContent, ScaleAnimation } from 'react-native-popup-dialog';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  FlatList,
} from 'react-native';
import Header from '../components/Header';
import services from '../utils/services';
import { NavigationEvents } from 'react-navigation';
import LoadingButton from '../templates/LoadingButton';
import DropdownMessageAlert from '../templates/DropdownMessageAlert';
import { Dropdown } from 'react-native-material-dropdown';
export default class App extends Component<{}> {
  state = {
    data: [],
    popupVisible: false,
    statusSelected: '',
    rfm_id: '',
    isMeetingTimeVisible: true,
    refreshing: true
  }

  componentDidMount(){
    this.rfmOpen();
  }

  async rfmOpen() {
    this.setState({refreshing: true});
    const token = await AsyncStorage.getItem('user_token');
    const data = {
      token: token
    };
    const resp = await services.rfmHistory(data);
    const responseInJson = await resp.json();
    console.log(responseInJson);
    this.setState({
      data: responseInJson.data,
      refreshing: false
    });
  }

  _dropdownSelected = (meeting) => {
    if (meeting == 'Meeting done') {
      meeting = 2;
    } else if (meeting == 'RFM approved') {
      meeting = 1;
    }
    console.log('Meeting done: ', meeting);
    this.setState({
      statusSelected: meeting
    });
  }

  async changeRfmStatus() {
    this._loginBtn.showLoading(true);
    const token = await AsyncStorage.getItem('user_token');
    const data = {
      token: token,
      rfm_id: this.state.rfm_id,
      status: this.state.statusSelected
    };
    const resp = await services.changeRfmStatus(data);
    this._loginBtn.showLoading(false);
    const responseInJson = await resp.json();
    console.log(responseInJson);
    this.setState({
      popupVisible: false,
      isMeetingTimeVisible: false
    });
    if (responseInJson.response === 'success') {
      this._dropdown.itemAction({type: 'success', title: 'Status changed', message: responseInJson.message});
      this.rfmOpen();
    } else {
      this._dropdown.itemAction({type: 'error', title: 'Error', message: responseInJson.message});
    }
  }

  renderDate(item){
    const date = services.getFormattedDate(item.meeting_date_time, 'DD-MM-YYYY');
    return(
      <Text style={styles.meetingText}>{date}</Text>
    );
  }

  render() {
    let dropdownData = [
      {
      value: 'RFM approved',
      },
      {
      value: 'Meeting done',
      },
    ];
    return(
      <View style={styles.container}>
        <NavigationEvents
          onDidFocus={() => this.rfmOpen()}
        />
        <Header navigation={this.props.navigation} title={'RFM'} />
        <FlatList
          contentContainerStyle={styles.flatList}
          data={this.state.data}
          keyExtractor={(item) => item.id.toString()}
          onRefresh={() => (this.rfmOpen())}
          refreshing={this.state.refreshing}
          renderItem={({item}) =>
            <View style={styles.memberView}>
              <View style={styles.imageView}>
                <Image source={{uri: item.company_image}}
                resizeMode={'contain'}
                style={styles.profilePic} />
              </View>
              <View style={styles.detailView}>
                <View style={styles.rfmView}>
                  <Text style={styles.name}>{item.company_name}</Text>

                </View>
                <Text style={styles.position}>{item.compnay_position}</Text>
                {
                  item.status == 2
                  ? <Text style={styles.status}>Meeting done</Text>
                  : null
                }
                {
                  item.status == 1
                  ? <Text style={styles.status}>RFM approved</Text>
                  : null
                }
                {
                  item.status == 0
                  ? <Text style={styles.status}>Waiting for approval</Text>
                  : null
                }
                {
                  item.status == 1 || item.status == 0
                  ? <View style={{marginTop: 5}}>
                      <Text style={styles.meetingText}>Meeting Time:</Text>
                      <Text style={styles.meetingText}>{item.meeting_date_time}</Text>
                    </View>
                  : null
                }
                {/*
                  this.state.isMeetingTimeVisible == true
                  ? <View>
                      <Text style={styles.status}>Waiting for approval</Text>
                      <Text style={styles.meetingText}>{item.meeting_date_time}</Text>
                    </View>
                  : <Text style={styles.status}>Meeting Done</Text>
                */}


                <TouchableOpacity onPress={() => this.setState({ popupVisible: true, rfm_id: item.id })} style={styles.rfmButton}>
                  <Text style={styles.rfmText}>Change Status</Text>
                </TouchableOpacity>
              </View>
            </View>
          }
        />
        <Dialog
            visible={this.state.popupVisible}
            width={0.8}
            // height={350}
            onTouchOutside={() => {
              this.setState({ popupVisible: false });
            }}
            dialogAnimation={new SlideAnimation({
              toValue: 0,
              useNativeDriver: true,
              slideFrom: 'top'
            })}
          >
          <DialogContent>
            <Dropdown
              label='Change Status'
              data={dropdownData}
              onChangeText={this._dropdownSelected}
            />
            <LoadingButton ref={(c) => this._loginBtn = c} title='Done' titleStyle={{fontSize: 16}} style={styles.rfmButton} onPress={() => this.changeRfmStatus()} />
          </DialogContent>
        </Dialog>
        <DropdownMessageAlert ref={(c) => this._dropdown = c} />
      </View>
    );
  }
}
const styles = {
  container: {
    flex: 1,
    backgroundColor: '#edf1f5'
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
    // flexDirection: 'row',
    // justifyContent: 'space-between',

  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  meetingButton: {
    height: 20,
    borderRadius: 5,
  },
  status: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  meetingText: {
    fontSize: 15
  },
  rfmButton: {
    backgroundColor: '#f33155',
    height: 30,
    borderRadius: 5,
    // paddingVertical: 5,
    // paddingHorizontal: 8,
    marginTop: 10,
    width: '60%',
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
  profilePic: {
    width: 150,
    height: 140,
  },
};
