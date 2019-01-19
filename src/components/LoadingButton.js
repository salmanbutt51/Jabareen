import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';

export default class LoadingButton extends Component<{}> {
  static propTypes = {
    title: PropTypes.string,
    style: PropTypes.object,
    titleStyle: PropTypes.object,
    loadingColor: PropTypes.string,
  };

  state = {
      isLoading: false,
  };

  showLoading(isLoading) {
    if (isLoading) {
      this.setState({ isLoading: isLoading });
    } else {
      this.setState({ isLoading: isLoading });
    }
  }

  render() {
    return(
      <TouchableOpacity activeOpacity={0.7} onPress={!this.state.isLoading ? this.props.onPress : null} style={[styles.button, this.props.style]} >
        {
          this.state.isLoading
          ? <ActivityIndicator size="small" color={this.props.loadingColor || 'white'} />
          : <Text style={[styles.title, this.props.titleStyle]} >{this.props.title}</Text>
        }
      </TouchableOpacity>
    );
  }
}

const styles = {
  button: {
    backgroundColor: '#f33155',
    height: 40,
    borderRadius: 5,
    // paddingVertical: 5,
    // paddingHorizontal: 8,
    marginTop: 3,
    // width: '40%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 15,
    color: 'white'
  },
};
