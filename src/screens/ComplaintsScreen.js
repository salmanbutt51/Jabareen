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
  TextInput
} from 'react-native';
import Header from '../components/Header';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import Textarea from 'react-native-textarea';
export default class App extends Component<{}> {

  attachFile(){
    DocumentPicker.show({
        filetype: [DocumentPickerUtil.images()],
      },(error,res) => {
        // Android
        console.log(
           res.uri,
           res.type, // mime type
           res.fileName,
           res.fileSize
        );
      });
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
              style={styles.textarea}
              onChangeText={this._onChange}
              maxLength={120}
              underlineColorAndroid={'transparent'}
            />
            <Text style={styles.inputText}>Attachment<Text style={{color: 'red'}}>*</Text></Text>
            <TouchableOpacity onPress={() => this.attachFile()} style={styles.rfmButton}>
              <Text style={styles.rfmText}>Attach file</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.sendComplaints()} style={styles.rfmButton}>
              <Text style={styles.rfmText}>Submit request</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    backgroundColor: '#f33155',
    height: 40,
    borderRadius: 5,
    // paddingVertical: 5,
    // paddingHorizontal: 8,
    marginTop: 8,
    // width: '50%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  rfmText: {
    color: '#fff',
    fontSize: 20
  },
};
