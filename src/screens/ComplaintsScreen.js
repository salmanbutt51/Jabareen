import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  AsyncStorage
} from 'react-native';
import Header from '../components/Header';
import services from '../utils/services';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import Textarea from 'react-native-textarea';
import DropdownMessageAlert from '../templates/DropdownMessageAlert';
import LoadingButton from '../components/LoadingButton';

export default class App extends Component<{}> {
  state = {
    file: {},
    description: ''
  }

  _onChange = (text) => {
    console.log(text);
    this.setState({description: text});
  }

  attachFile() {
    DocumentPicker.show({
      filetype: [DocumentPickerUtil.allFiles()],
    },(error, file) => {
      if (file !== null) {
        this.setState({file: file});
      }
      console.log('Error: ', error);
      console.log('File: ', file);
    });
  }

  async sendComplaints() {
    const file = this.state.file;
    console.log(file);
    // return;
    if (this.state.description === '' || file.fileName === undefined) {
      this._dropdown.itemAction({type: 'error', message: 'Please fill all the required filelds', title: 'Error'});
    } else {
      this._loadingButton.showLoading(true);
      const token = await AsyncStorage.getItem('user_token');
      const data = {
        token: token,
        description: this.state.description,
      };
      const resp = await services.sendComplaint(data, file);
      this._loadingButton.showLoading(false);
      try {
        const responseInJson = await resp.json();
        console.log(responseInJson);
        if (responseInJson.response === 'success') {
          this._dropdown.itemAction({type: 'success', title: 'Success', message: 'Your complaint has been submitted'});
          this.setState({file: {}, description: ''});
        } else {
          this._dropdown.itemAction({type: 'error', title: 'Error', message: 'Something went wrong, file was not uploaded'});
        }
      } catch {
        this._dropdown.itemAction({type: 'error', title: 'Error', message: 'Something went wrong, file was not uploaded'});
      }
    }

  }

  render() {
    return(
      <View style={styles.container}>
        <Header navigation={this.props.navigation} title={'Complaints'} />
        <ScrollView>
          <View style={styles.complaintsView}>
            <Text style={styles.inputText}>Description<Text style={{color: 'red'}}>*</Text></Text>
            <Textarea
              containerStyle={styles.textareaContainer}
              value={this.state.description}
              style={styles.textarea}
              onChangeText={this._onChange}
              maxLength={120}
              underlineColorAndroid={'transparent'}
            />
            <Text style={styles.inputText}>Attachment<Text style={{color: 'red'}}>*</Text></Text>
            <Text style={{marginTop: 5, fontSize: 15, color: 'blue'}}>{this.state.file.fileName}</Text>
            <TouchableOpacity onPress={() => this.attachFile()} style={styles.rfmButton}>
              <Text style={styles.rfmText}>Attach file</Text>
            </TouchableOpacity>
            <LoadingButton ref={(c) => this._loadingButton = c} title='Submit Review' onPress={() => this.sendComplaints()} />
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
    backgroundColor: '#edf1f5',
  },
  complaintsView: {
    padding: 10
  },
  inputText:{
    fontSize: 20,
    color: 'black'
  },
  inputBox: {
    borderWidth: 1,
    borderColor: '#a6b8d4',
    fontSize: 20,
    color: 'black',
    marginTop: 10,
    marginBottom: 20,
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 8
  },
  textareaContainer: {
    height: 120,
    padding: 5,
    backgroundColor: '#fff',
    marginTop: 8,
    marginBottom: 15,
    borderRadius: 5
  },
  textarea: {
    textAlignVertical: 'top',  // hack android
    height: 120,
    fontSize: 14,
    color: '#333',
  },
  rfmButton: {
    // backgroundColor: '#f33155',
    height: 40,
    borderRadius: 5,
    // paddingVertical: 5,
    // paddingHorizontal: 8,
    marginVertical: 4,
    // width: '50%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  rfmText: {
    color: '#f33155',
    fontSize: 20
  },
};
