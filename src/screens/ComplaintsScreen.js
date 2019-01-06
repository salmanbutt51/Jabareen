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
export default class App extends Component<{}> {

  render() {
    return(
      <View style={styles.container}>
        <Header navigation={this.props.navigation} />
        <ScrollView>
          <View style={styles.complaintsView}>
            <Text style={styles.inputText}>Description<Text style={{color: 'red'}}>*</Text></Text>
            <TextInput style={styles.inputBox}
              placeholder="Enter Description"
              placeholderTextColor = "#a6b8d4"
            />
            <Text style={styles.inputText}>Attachment<Text style={{color: 'red'}}>*</Text></Text>
            <TouchableOpacity style={styles.chooseButton}>
              <Button title='Choose File' style={styles.chooseInButton} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
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
  chooseButton: {
    marginVertical: 10
  }
}
