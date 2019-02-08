import React, { Component } from 'react';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import ImageSlider from 'react-native-image-slider';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
  AsyncStorage,
  FlatList
} from 'react-native';
import Header from '../components/Header';
import services from '../utils/services';
import DropdownMessageAlert from '../templates/DropdownMessageAlert';
export default class App extends Component<{}> {
  state = {
    data: [],
    refreshing: true,
  }

  category_id = this.props.navigation.state.params.category_id;

  componentDidMount() {
    this.getSubCategories();
  }

  async getSubCategories() {
    this.setState({refreshing: true});
    const token = await AsyncStorage.getItem('user_token');
    const data = {
      token: token,
      category_id: this.category_id
    };
    const resp = await services.subCategory(data);
    const responseInJson = await resp.json();
    console.log(responseInJson);
    this.setState({
      data: responseInJson.data,
      refreshing: false,
    });
  }

  render() {
    return(
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.flatList}
          numColumns={2}
          data={this.state.data}
          onRefresh={() => (this.getSubCategories())}
          refreshing={this.state.refreshing}
          ListEmptyComponent={this.emptyView()}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) =>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Subcategorylist', {sub_category_id: item.id})}
              style={styles.item} >
              <View style={{alignItems: 'flex-start'}}>
                <Text style={styles.name} >{item.name}</Text>
                <Text style={styles.arabicName} >{item.arabic_name}</Text>
              </View>
            </TouchableOpacity>
          }
        />
        <DropdownMessageAlert ref={(c) => this._dropdown = c} />
      </View>
    );
  }

  emptyView() {
    if (this.state.refreshing === false) {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 100}}>
          <Text style={{fontSize: 20}}>There are no sub categories</Text>
        </View>
      );
    }
  }

}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#edf1f5',
  },
  flatList: {
    // backgroundColor: 'red',
    // justifyContent: 'space-around',
    // alignItems: 'center',
    // flex: 1,
  },
  item: {
    backgroundColor: '#fff',
    margin: 5,
    borderWidth: 2,
    borderColor: '#f33155',
    padding: 8,
    flex: 1
    // alignItems: 'center',
    // justifyContent: 'center',
    // width: '100%'
  },
  dashboardView: {
    height: 180,
    // justifyContent: 'center',
    marginBottom: 13
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20
    // fontFamily: 'Kapra-Regular',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  arabicName: {
    fontSize: 25
  },
  price: {
    fontSize: 30,
    color: 'red'
  },
  addToCartButton: {
    backgroundColor: '#f33155',
    paddingVertical: 5,
    marginTop: 10,
    width: '100%',
    alignItems: 'center'
  },
  addToCartText: {
    color: '#fff'
  },
};
