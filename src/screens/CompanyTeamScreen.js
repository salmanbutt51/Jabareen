import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Button
} from 'react-native';
import Header from '../components/Header';
export default class App extends Component<{}> {

  render() {
    return(
      <View style={styles.container}>
        <ScrollView>

            <Header navigation={this.props.navigation} />
            <View style={styles.detailView}>
              <Text style={styles.nameText}>Al Jabareen Member</Text>
              <Image source={require('../images/mem.png')}
              resizeMode={'contain'}
              style={styles.profilePic}
              />
              <Text style={styles.nameText2}>Manager</Text>

            </View>
            <View style={styles.contactView}>
              <TouchableOpacity>
                <Image source={require('../images/email.png')}
                resizeMode={'contain'}
                style={styles.contactIcons}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={require('../images/mobile.png')}
                resizeMode={'contain'}
                style={styles.contactIcons}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={require('../images/whatsapp.png')}
                resizeMode={'contain'}
                style={styles.contactIcons}
                />
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
  },
  detailView: {
    padding: 10,
    alignItems: 'center'
  },
  nameText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 10
  },
  profilePic: {
    height: 250
  },
  nameText2: {
    fontSize: 25,
    fontWeight: 'bold',
    // color: 'black',
    marginVertical: 10
  },
  contactView: {
    flexDirection: 'row',
    height: 200
  },
  contactIcons: {
    height: 40,
    backgroundColor: 'blue'
  }
}
