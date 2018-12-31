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
export default class App extends Component<{}> {

  render() {
    return(
      <View style={styles.container}>
        <ScrollView>
          <Button onPress={() => this.props.navigation.goBack()} title='Go back To Dashboard'/>
        </ScrollView>
      </View>
    )
  }
}
const styles = {
  container: {
    flex: 1,
  },
  dashboardView: {
    backgroundColor: '#fff',
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  dashText: {
    color: '#2098d1',
    fontSize: 20,
    fontWeight: 'bold'
  },
  tilesView: {
    backgroundColor: '#edf1f5',
    // paddingHorizontal: 10,
    paddingVertical: 40
  },
  flexView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 17
  },
  tile: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#f33155',
    height: 100,
    width: 190,
    alignItems: 'center',
    justifyContent: 'space-around',
    // marginHorizontal: 10
  },
  tileText: {
    fontSize: 20,
    color: '#f994a7'
  }
}
