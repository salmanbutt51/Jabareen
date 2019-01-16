import React, { Component } from 'react';
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
import DropdownMessageAlert from '../templates/DropdownMessageAlert';
import services from '../utils/services';
export default class App extends Component<{}> {
  state = {
    data: [],
    dataRfq: [],
    statusPopupVisible: false,
    viewRfqPopupVisible: false,
    statusSelected: '',
    rfq_id: ''
  }

  async componentDidMount(){
    const token = await AsyncStorage.getItem('user_token');
    const data = {
      token: token,
    };
    const resp = await services.rfqHistory(data);
    const responseInJson = await resp.json();
    console.log(responseInJson);
    this.setState({
      data: responseInJson.data
    });
  }

  async rfqHistoryDetail(group_id){
    const token = await AsyncStorage.getItem('user_token');
    const data = {
      token: token,
      group_id: group_id
    };
    const resp = await services.rfqHistoryDetail(data);
    const responseInJson = await resp.json();
    console.log('Rfq response',responseInJson);
    this.setState({
      dataRfq: responseInJson.data,
      viewRfqPopupVisible: true
    });
  }

  _dropdownSelected = (statusSelected) => {
    console.log('status quotation: ', statusSelected);
    this.setState({
      statusSelected: statusSelected
    });
  }

  async changeRfqStatus(){
    const token = await AsyncStorage.getItem('user_token');
    const data = {
      token: token,
      rfq_id: this.state.rfq_id,
      status: this.state.statusSelected
    };
    const resp = await services.changeRfqStatus(data);
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
        {/*<Header navigation={this.props.navigation} title={'Rfq History'}/>*/}
        <ScrollView>
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
                  <View style={styles.dateView}>
                    <Text style={styles.heading}>Date</Text>
                    <Text style={styles.content}>january 15</Text>
                  </View>
                </View>
                <View>
                  <Text style={styles.heading}>Status</Text>
                  <Text style={styles.content}>{item.status}</Text>
                </View>
                <View style={styles.bothButtons}>
                  <TouchableOpacity onPress={() => this.setState({ statusPopupVisible: true, rfq_id: item.id })} style={styles.rfmButton}>
                    <Text style={styles.rfmText}>Change Status</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.rfqHistoryDetail(item.group_id)} style={styles.rfmButton}>
                    <Text style={styles.rfmText}>View Rfq</Text>
                  </TouchableOpacity>
                </View>
              </View>
            }
            />
          </View>
          <Dialog
            visible={this.state.statusPopupVisible}
            dialogTitle={<DialogTitle title="Change status" />}
            width={0.8}
            // height={350}
            onTouchOutside={() => {
              this.setState({ statusPopupVisible: false });
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
              <TouchableOpacity onPress={() => this.changeRfqStatus()} style={styles.rfmButton}>
                <Text style={styles.rfmText}>Done</Text>
              </TouchableOpacity>
            </DialogContent>
          </Dialog>
          <Dialog
            visible={this.state.viewRfqPopupVisible}
            dialogTitle={<DialogTitle title="Rfq detail" />}
            width={0.8}
            // height={350}
            onTouchOutside={() => {
              this.setState({ viewRfqPopupVisible: false });
            }}
            dialogAnimation={new ScaleAnimation({
              toValue: 0,
              useNativeDriver: true,
            })}
          >
            <DialogContent>
            <FlatList
            // contentContainerStyle={styles.flatList}
            // style={{flex: 1}}
            // numColumns={2}
            data={this.state.data}
            // keyExtractor={(item) => item.name}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) =>
              <View style={{paddingTop: 10}}>
                <View style={styles.historyView}>
                  <View style={styles.nameView}>
                    <Text style={styles.heading}>Sender Name</Text>
                    <Text style={styles.content}>{item.sender_name}</Text>
                  </View>
                  <View style={styles.dateView}>
                    <Text style={styles.heading}>Product</Text>
                    <Text style={styles.content}>{item.product_name}</Text>
                  </View>
                </View>
                <View>
                  <Text style={styles.heading}>Quantity</Text>
                  <Text style={styles.content}>{item.quantity}</Text>
                </View>
              </View>
            }
            />
              <TouchableOpacity onPress={() => this.setState({viewRfqPopupVisible: false})} style={styles.rfmButtonOk}>
                <Text style={styles.rfmText}>Ok</Text>
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
    backgroundColor: '#edf1f5',
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
    alignItems: 'center',
  },
  nameView: {
    // flex: 1,
    width: '70%'
  },
  dateView: {
    width: '30%'
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  content: {
    fontSize: 16
  },
  bothButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
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
