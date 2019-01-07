import { React } from 'react';
import { createStackNavigator, createSwitchNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import ProductsScreen from '../screens/ProductsScreen';
import CompanyTeamScreen from '../screens/CompanyTeamScreen';
import WhoWeAreScreen from '../screens/WhoWeAreScreen';
import ComplaintsScreen from '../screens/ComplaintsScreen';

const AuthStack = createStackNavigator({
  Welcome: {
    screen: WelcomeScreen,
    navigationOptions: {
      header: null
    }
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      title: 'Login'
    }
  },
  Signup: {
    screen: SignupScreen,
    navigationOptions: {
      title: 'Signup'
    }
  }
})

const HomeStack = createDrawerNavigator({
  Dashboard: {
    screen: HomeScreen,
    navigationOptions: {
      drawerLabel: 'Dashboard',
    }
  },
  Products: {
    screen: ProductsScreen,
    navigationOptions: {
      tabBarLabel: 'Products'
    }
  },
  Whoweare: {
    screen: WhoWeAreScreen,
    navigationOptions: {
      tabBarLabel: 'Who We Are'
    }
  },
  Companyteam: {
    screen: CompanyTeamScreen,
    navigationOptions: {
      tabBarLabel: 'Company Team'
    }
  },
  Complaints: {
    screen: ComplaintsScreen,
    navigationOptions: {
      tabBarLabel: 'Complaints'
    }
  }
})

const MainSwitch = createSwitchNavigator({
  Auth: {
    screen: AuthStack
  },
  Home: {
    screen: HomeStack
  }
})
const AppContainer = createAppContainer(MainSwitch);

export default AppContainer;
