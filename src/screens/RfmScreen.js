import React, { Component } from 'react';
import Dialog, { SlideAnimation, DialogContent, ScaleAnimation } from 'react-native-popup-dialog';
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
import DropdownMessageAlert from '../templates/DropdownMessageAlert';
import { Dropdown } from 'react-native-material-dropdown';
export default class App extends Component<{}> {
  state = {
    data: [],
    popupVisible: false,
    statusSelected: '',
    rfm_id: '',
  }
  async componentDidMount(){
    const token = await AsyncStorage.getItem('user_token');
    const data = {
      token: token
    };
    const resp = await services.rfmHistory(data);
    const responseInJson = await resp.json();
    console.log(responseInJson);
    this.setState({
      data: responseInJson.data
    });
  }

  _dropdownSelected = (meeting) => {
    console.log('Meeting done: ', meeting);
    this.setState({
      statusSelected: meeting
    });
  }

  async changeRfmStatus(){
    const token = await AsyncStorage.getItem('user_token');
    const data = {
      token: token,
      rfm_id: this.state.rfm_id,
      status: this.state.statusSelected
    };
    const resp = await services.changeRfmStatus(data);
    const responseInJson = await resp.json();
    console.log(responseInJson);
    this.setState({
      popupVisible: false,
    });
    if (responseInJson.response === 'success') {
      this._dropdown.itemAction({type: 'success', title: 'Status changed', message: responseInJson.message});
    } else {
      this._dropdown.itemAction({type: 'error', title: 'Error', message: responseInJson.message});
    }
  }

  render() {
    let dropdownData = [{
      value: 'Meeting done',
      },
    ];
    return(
      <View style={styles.container}>
        <Header navigation={this.props.navigation} title={'RFM'} />
        <ScrollView>
          <View style={styles.subContainer}>
            <FlatList
            contentContainerStyle={styles.flatList}
            // style={{flex: 1}}
            // numColumns={2}
            data={this.state.data}
            keyExtractor={(item) => item.id.toString()}
            // keyExtractor={(item) => item.name}
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
                    <Text style={styles.mobile}>Meeting Time:</Text>
                    <View style={styles.meetingButton}>
                      <Text style={styles.meetingText}>{item.meeting_date_time}</Text>
                    </View>
                    <TouchableOpacity onPress={() => this.setState({ popupVisible: true, rfm_id: item.id })} style={styles.rfmButton}>
                      <Text style={styles.rfmText}>Change Status</Text>
                    </TouchableOpacity>

                  </View>
                </View>
            }
            />
          </View>
          <Dialog
            visible={this.state.popupVisible}
            width={0.8}
            // height={350}
            onTouchOutside={() => {
              this.setState({ popupVisible: false });
            }}
            dialogAnimation={new ScaleAnimation({
              toValue: 0,
              useNativeDriver: true,
            })}
          >
            <DialogContent>
              <Dropdown
                label='Change Status'
                data={dropdownData}
                onChangeText={this._dropdownSelected}
              />
              <TouchableOpacity onPress={() => this.changeRfmStatus()} style={styles.rfmButton}>
                <Text style={styles.rfmText}>Done</Text>
              </TouchableOpacity>
            </DialogContent>
          </Dialog>
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
  meetingText: {
    fontSize: 15
  },
  rfmButton: {
    backgroundColor: '#f33155',
    height: 30,
    borderRadius: 5,
    // paddingVertical: 5,
    // paddingHorizontal: 8,
    marginTop: 3,
    // width: '40%',
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
