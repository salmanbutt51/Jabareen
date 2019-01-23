import React, { Component } from 'react';
import {
  View,
  ActivityIndicator
} from 'react-native';
export default class ShowLoader extends Component<{}> {

  state = {
    showLoader: true
  }

  render(){
    return(
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#f33155" />
      </View>
    );
  }
}

const styles = {
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
};
