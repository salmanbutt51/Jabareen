import { React } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

const AuthStack = createStackNavigator({
  Welcome: {
    screen: WelcomeScreen,
    navigationOptions: {
      header: null
    }
  },
  Login: {
    screen: LoginScreen
  },
  Signup: {
    screen: SignupScreen
  }
})

const AppContainer = createAppContainer(AuthStack);

export default AppContainer;
