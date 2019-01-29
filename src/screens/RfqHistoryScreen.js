import React, { Component } from 'react';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import Dialog, { SlideAnimation, DialogContent, ScaleAnimation, DialogTitle } from 'react-native-popup-dialog';
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
import { Dropdown } from 'react-native-material-dropdown';
import { NavigationEvents } from 'react-navigation';
import DropdownMessageAlert from '../templates/DropdownMessageAlert';
import LoadingButton from '../components/LoadingButton';
import services from '../utils/services';
export default class App extends Component<{}> {
  state = {
    data: [],
    dataRfq: [],
    statusPopupVisible: false,
    viewRfqPopupVisible: false,
    statusSelected: '',
    rfq_id: '',
    showLoader: true,
    noData: true
  }

  async rfqHistoryOpen(){
    const token = await AsyncStorage.getItem('user_token');
    const data = {
      token: token,
    };
    const resp = await services.rfqHistory(data);
    const responseInJson = await resp.json();
    console.log(responseInJson);
    this.setState({
      data: responseInJson.data,
      showLoader: false,
    });
    // const rfqHistory = this.state.data;
    if (this.state.data.length !== 0) {
      this.setState({
        noData: false
      });
    } else {
      this.setState({
        noData: true
      });
    }
  }



  _dropdownSelected = (statusSelected) => {
    if (statusSelected == 'Quotation received') {
      statusSelected = 3;
    } else if (statusSelected == 'Send items') {
      statusSelected = 4;
    } else if (statusSelected == 'Items received') {
      statusSelected = 6;
    } else if (statusSelected == 'Money sent') {
      statusSelected = 7;
    }
    console.log('status quotation: ', statusSelected);
    this.setState({
      statusSelected: statusSelected
    });
  }

  async changeRfqStatus(){
    this._loadingButton.showLoading(true);
    const token = await AsyncStorage.getItem('user_token');
    const data = {
      token: token,
      rfq_id: this.state.rfq_id,
      status: this.state.statusSelected
    };
    const resp = await services.changeRfqStatus(data);
    this._loadingButton.showLoading(false);
    const responseInJson = await resp.json();
    console.log(responseInJson);
    this.setState({
      statusPopupVisible: false,
    });
    if (responseInJson.response === 'success') {
      this._dropdown.itemAction({type: 'success', title: 'Status changed', message: responseInJson.message});
    } else {
      this._dropdown.itemAction({type: 'error', title: 'Error', message: responseInJson.message});
    }
  }

  render() {
    let dropdownData = [
      {
      value: 'Quotation received',
      },
      {
      value: 'Send items',
      },
      {
      value: 'Items received',
      },
      {
      value: 'Money sent',
      },
    ];
    return(
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={() => this.rfqHistoryOpen()}
        />
        <Header navigation={this.props.navigation} showCartIcon={true} title={'Rfq History'} />
        {
          this.state.showLoader === true
          ? <View style={styles.loader}>
              <Bubbles size={10} color="#f33155" />
            </View>

          : <View>
          {
            this.state.noData === true
            ? <View style={{padding: 20}}>
                <Text>No data available</Text>
              </View>
            : <ScrollView>
              <View style={styles.cartsView}>
                <FlatList
                // contentContainerStyle={styles.flatList}
                // style={{flex: 1}}
                // numColumns={2}
                data={this.state.data}
                // keyExtractor={(item) => item.name}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) =>
                  <View style={styles.item}>
                    <View style={styles.historyView}>
                      <View style={styles.nameView}>
                        <Text style={styles.heading}>Sender Name</Text>
                        <Text style={styles.content}>{item.sender_name}</Text>
                      </View>
                      <TouchableOpacity onPress={() => this.props.navigation.navigate('Rfqhistorydetail', {group_id: item.id})}>
                        <Image source={require('../images/eye-icon.png')}
                          resizeMode={'contain'}
                          style={{width: 40, height: 40}}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.dateView}>
                      <Text style={styles.heading}>Date</Text>
                      <Text style={styles.content}>{item.date.date}</Text>
                    </View>

                    <View>
                      <Text style={styles.heading}>Status</Text>
                      {
                        item.status == 1
                        ? <Text style={styles.content}>RFQ received</Text>
                        : <View>
                            {
                              item.status == 3
                              ? <Text style={styles.content}>Quotaion received</Text>
                              : <View>
                                  {
                                    item.status == 4
                                    ? <Text style={styles.content}>Send items</Text>
                                    : <View>
                                        {
                                          item.status == 6
                                          ? <Text style={styles.content}>Items received</Text>
                                          : <Text style={styles.content}>Money sent</Text>
                                        }
                                      </View>
                                  }
                                </View>
                            }
                          </View>

                      }
                      {/*<Text style={styles.content}>{item.status}</Text>*/}
                    </View>
                    <View style={styles.bothButtons}>
                      <TouchableOpacity onPress={() => this.setState({ statusPopupVisible: true, rfq_id: item.id })} style={styles.rfmButton}>
                        <Text style={styles.rfmText}>Change Status</Text>
                      </TouchableOpacity>

                      {/* <LoadingButton ref={(c) => this._loadingButton = c} title='View Rfq' style={{width: '48%'}} onPress={() => this.rfqHistoryDetail(item.group_id)} />*/}
                    </View>
                  </View>
                }
                />
              </View>
              <Dialog
                visible={this.state.statusPopupVisible}
                // dialogTitle={<DialogTitle title="Change status" />}
                width={0.8}
                // height={350}
                onTouchOutside={() => {
                  this.setState({ statusPopupVisible: false });
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
                  <LoadingButton ref={(c) => this._loadingButton = c} title='Done' onPress={() => this.changeRfqStatus()} />
                </DialogContent>
              </Dialog>

            </ScrollView>
          }
            </View>
        }



        <DropdownMessageAlert ref={(c) => this._dropdown = c} />
      </View>
    );
  }
}
const styles = {
  container: {
    flex: 1,
    backgroundColor: '#edf1f5',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cartsView: {
    padding: 10
  },
  item: {
    marginBottom: 10
  },
  historyView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  content: {
    fontSize: 16
  },
  bothButtons: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: 10,
    // marginBottom: 20
  },
  rfmButton: {
    backgroundColor: '#f33155',
    height: 35,
    borderRadius: 5,
    // paddingVertical: 5,
    // paddingHorizontal: 8,
    marginTop: 3,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  rfmButtonOk: {
    backgroundColor: '#f33155',
    height: 35,
    borderRadius: 5,
    // paddingVertical: 5,
    // paddingHorizontal: 8,
    marginTop: 3,
    // width: '48%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  rfmText: {
    color: '#fff',
    fontSize: 15
  },
};
