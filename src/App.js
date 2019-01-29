import React, {Component} from 'react';
import Video from 'react-native-video';
import {
  StyleSheet,
  View,
}
from 'react-native';
import AppContainer from './utils/router';

export default class App extends Component<{}> {
  state = {
    videoEnded: false
  }

  render() {
    return (
      <View style={styles.container}>
      {
        this.state.videoEnded
        ? <AppContainer />
        : <Video source={require('./videos/video.mp4')}   // Can be a URL or a local file.
           ref={(ref) =>
             this.player = ref
           }
           onError={() => console.log('Video was not loaded')}
           style={styles.backgroundVideo}
           resizeMode='cover'
           onEnd={() => this.setState({videoEnded: true})}
        />
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
