import React, { Component } from 'react';
import StarRating from 'react-native-star-rating';
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
import Textarea from 'react-native-textarea';
import services from '../utils/services';
import { Dropdown } from 'react-native-material-dropdown';
import LoadingButton from '../components/LoadingButton';
import DropdownMessageAlert from '../templates/DropdownMessageAlert';
export default class App extends Component<{}> {
  state = {
    // data: [],
    starCountPromoter: 0,
    starCountSalesman: 0,
    starCountDriver: 0,
    starCountApp: 0,
    dropdownOverall: '',
    comments: ''
  }
  onStarRatingPressPromoter = [];
  onStarRatingPressSalesman = [];
  onStarRatingPressDriver = [];
  onStarRatingPressApp = [];
  dropdownOverall= [];

  async submitEvaluation(){
    this._loadingButton.showLoading(true);
    const token = await AsyncStorage.getItem('user_token');
    const data = {
      token: token,
      promoter_evaluation: this.state.starCountPromoter,
      sales_man_evaluation: this.state.starCountSalesman,
      driver_evaluation: this.state.starCountDriver,
      application_evaluation: this.state.starCountApp,
      overall_evaluation: this.state.dropdownOverall,
      comments: this.state.comments
    };
    const resp = await services.evaluate(data);
    this._loadingButton.showLoading(false);
    const responseInJson = await resp.json();
    console.log(responseInJson);
    // this.setState({
    //   data: responseInJson.data
    // });
    if (responseInJson.response === 'success') {
      this._dropdown.itemAction({type: 'success', title: 'Review submitted', message: responseInJson.message});
    } else {
      this._dropdown.itemAction({type: 'error', title: 'Error', message: 'Something gone wrong'});
    }
  }

  onStarRatingPressPromoter = (rating) => {
    console.log('Rating promoter: ', rating);
    // this.onStarRatingPressPromoter.push(rating);
    this.setState({
      starCountPromoter: rating
    });
  }

  onStarRatingPressSalesman = (rating) => {
    console.log('Rating salesman: ', rating);
    // this.onStarRatingPressSalesman.push(rating);
    this.setState({
      starCountSalesman: rating
    });
  }

  onStarRatingPressDriver = (rating) => {
    console.log('Rating Driver: ', rating);
    // this.onStarRatingPressDriver.push(rating);
    this.setState({
      starCountDriver: rating
    });
  }

  onStarRatingPressApp = (rating) => {
    console.log('Rating App: ', rating);
    // this.onStarRatingPressApp.push(rating);
    this.setState({
      starCountApp: rating
    });
  }

  _dropdownOverall = (dropdown) => {
    console.log('dropdown selected: ', dropdown);
    this.setState({
      dropdownOverall: dropdown
    });
  }

  _onChange = (comments) => {
    console.log('dropdown selected: ', comments);
    this.setState({
      comments: comments
    });
  }

  _zeroEvaluation(type) {
    if (type==='p'){
      this.setState({
        starCountPromoter: 0
      });
    }
    if (type==='s'){
      this.setState({
        starCountSalesman: 0
      });
    }
    if (type==='d'){
      this.setState({
        starCountDriver: 0
      });
    }
    if (type==='a'){
      this.setState({
        starCountApp: 0
      });
    }
  }

  render() {
    let dropdownOverall = [
      {
        value: 'I love',
      },
      {
        value: 'It bothers me',
      },
      {
        value: 'It scares',
      },
      {
        value: 'I enjoy',
      },
      {
        value: 'I like',
      },
      {
        value: 'It saddens',
      },
      {
        value: 'It amazes me',
      },
      {
        value: 'I am glad',
      },
    ];
    return(
      <View style={styles.container}>
        <Header navigation={this.props.navigation} title={'Evaluate'} />
        <ScrollView>

          <View style={styles.subContainer}>
            <View style={styles.evaluation}>
              <Text style={styles.text}>Promoter Evaluation </Text>
              <View style={styles.ratingView}>
                <TouchableOpacity style={styles.minusButton} onPress={() => this._zeroEvaluation('p')}>
                  <Image source={require('../images/minus.png')}
                  resizeMode={'center'}
                  style={styles.minusImage} />
                </TouchableOpacity>
                <StarRating
                  containerStyle={styles.starRating}
                  disabled={false}
                  maxStars={5}
                  fullStarColor='#fde16d'
                  rating={this.state.starCountPromoter}
                  selectedStar={(rating) => this.onStarRatingPressPromoter(rating)}
                />
              </View>
            </View>
            <View style={styles.evaluation}>
              <Text style={styles.text}>Sales Man Evaluation </Text>
              <View style={styles.ratingView}>
                <TouchableOpacity style={styles.minusButton} onPress={() => this._zeroEvaluation('s')}>
                  <Image source={require('../images/minus.png')}
                  resizeMode={'center'}
                  style={styles.minusImage} />
                </TouchableOpacity>
                <StarRating
                  containerStyle={styles.starRating}
                  disabled={false}
                  maxStars={5}
                  fullStarColor='#fde16d'
                  rating={this.state.starCountSalesman}
                  selectedStar={(rating) => this.onStarRatingPressSalesman(rating)}
                />
              </View>
            </View>
            <View style={styles.evaluation}>
              <Text style={styles.text}>Driver Evaluation </Text>
              <View style={styles.ratingView}>
                <TouchableOpacity style={styles.minusButton} onPress={() => this._zeroEvaluation('d')}>
                  <Image source={require('../images/minus.png')}
                  resizeMode={'center'}
                  style={styles.minusImage} />
                </TouchableOpacity>
                <StarRating
                  containerStyle={styles.starRating}
                  disabled={false}
                  maxStars={5}
                  fullStarColor='#fde16d'
                  rating={this.state.starCountDriver}
                  selectedStar={(rating) => this.onStarRatingPressDriver(rating)}
                />
              </View>
            </View>
            <View style={styles.evaluation}>
              <Text style={styles.text}>Application Evaluation </Text>
              <View style={styles.ratingView}>
                <TouchableOpacity style={styles.minusButton} onPress={() => this._zeroEvaluation('a')}>
                  <Image source={require('../images/minus.png')}
                  resizeMode={'center'}
                  style={styles.minusImage} />
                </TouchableOpacity>
                <StarRating
                  containerStyle={styles.starRating}
                  disabled={false}
                  maxStars={5}
                  fullStarColor='#fde16d'
                  rating={this.state.starCountApp}
                  selectedStar={(rating) => this.onStarRatingPressApp(rating)}
                />
              </View>
            </View>
            <View style={styles.evaluation}>
              <Text style={styles.overalltext}>Overall Evaluation</Text>
              <Dropdown
                containerStyle={styles.dropdownOverall}
                dropdownPosition={0.1}
                label='Select of your choice'
                textColor='black'
                baseColor='black'
                data={dropdownOverall}
                itemCount={5}
                onChangeText={this._dropdownOverall}
              />
            </View>
            <View style={styles.evaluation}>
              <Text style={styles.text}>Comment</Text>
              <Textarea
                containerStyle={styles.textareaContainer}
                style={styles.textarea}
                onChangeText={this._onChange}
                maxLength={120}
                underlineColorAndroid={'transparent'}
              />
            </View>
            <LoadingButton ref={(c) => this._loadingButton = c} title='Submit Review' onPress={() => this.submitEvaluation()} />
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
  },
  subContainer: {
    padding: 10
  },
  evaluation: {
    marginBottom: 30
  },
  ratingView: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-around'
  },
  minusButton: {
    // marginRight: 10
    width: '10%'
  },
  starRating: {
    width: '70%'
  },
  minusImage: {
    width: 20,
    height: 20
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10
  },
  overalltext: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  textareaContainer: {
    height: 120,
    padding: 5,
    backgroundColor: '#fff',
  },
  textarea: {
    textAlignVertical: 'top',
    height: 120,
    fontSize: 14,
    color: '#333',
  },
  rfmButton: {
    backgroundColor: '#f33155',
    height: 50,
    borderRadius: 5,
    // paddingVertical: 5,
    // paddingHorizontal: 8,
    marginTop: 3,
    // width: '40%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  rfmText: {
    color: '#fff',
    fontSize: 20
  },
};
