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
        <Header navigation={this.props.navigation} />
        <ScrollView>
          <View style={styles.aboutView}>
            <View style={styles.nameView}><Text style={styles.nameText}>Mohammad Ghanem</Text></View>
            <Text style={styles.ownerText}>Mr. Ghanem is the creator of BIOSERVPRO LTD solutions which are new fully digital featured business customized platforms that effectively connect mutual business professionals together, insure their business development in almost all business fields & simplify having the important information for all parties to achieve the optimum results. Mr. Ghanem provide three main solutions through his websites as following </Text>
            <Text style={styles.aboutText}>Country wise virtual exhibitions/event solution</Text><TouchableOpacity><Text style={styles.withinText}>www.beinb.net</Text></TouchableOpacity>
            <Text style={styles.aboutText}>Organizers wise business solution for exhibitions/Trade-Shows</Text><TouchableOpacity><Text style={styles.withinText}>www.bioservpro.com</Text></TouchableOpacity>
            <Text style={styles.aboutText}>Companies wise interaction business solution</Text><TouchableOpacity><Text style={styles.withinText}>www.mghanem.net</Text></TouchableOpacity>
            <Text style={styles.aboutText}>You could reach us sending an email to mohammad@mghanem.net</Text>
            <Text style={styles.aboutText2}>or simply calling us at +1-647-697 5918 , +970-598-516067</Text>
            <Text style={styles.aboutText2}>Visit our  website for more details</Text>
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
  nameView: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  nameText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black'
  },
  aboutView: {
    padding: 10
  },
  ownerText: {
    fontSize: 20,
    marginBottom: 10
  },
  aboutText: {
    fontSize: 20,
  },
  aboutText2: {
    fontSize: 20,
    marginBottom: 10
  },
  withinText: {
    color: '#57b3ec',
    fontSize: 20,
    marginBottom: 10
  }
}
