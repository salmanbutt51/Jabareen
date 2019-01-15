import { React } from 'react';
import { createStackNavigator, createSwitchNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import ProductsScreen from '../screens/ProductsScreen';
import ProductsListScreen from '../screens/ProductsListScreen';
import SubCategoryScreen from '../screens/SubCategoryScreen';
import CartScreen from '../screens/CartScreen';
import EvaluateScreen from '../screens/EvaluateScreen';
import AdvertiseScreen from '../screens/AdvertiseScreen';
import RfmScreen from '../screens/RfmScreen';
import WhoWeAreScreen from '../screens/WhoWeAreScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
import AccountRequestScreen from '../screens/AccountRequestScreen';
import CompanyTeamScreen from '../screens/CompanyTeamScreen';
import ComplaintsScreen from '../screens/ComplaintsScreen';
import MapScreen from '../screens/MapScreen';

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
});

const ProductStack = createStackNavigator({
  Categories:{
    screen: ProductsScreen,
    navigationOptions: {
    title: 'Categories'
    },
  },
  Subcategory:{
    screen: SubCategoryScreen,
    navigationOptions: {
    title: 'Subcategories'
    },
  },
  Productslist:{
    screen: ProductsListScreen,
    navigationOptions: {
    title: 'Products List'
    },
  }
});

const CartStack = createStackNavigator({
  Cart:{
    screen: CartScreen,
    navigationOptions: {
    title: 'Cart'
    },
  }
});

const HomeStack = createDrawerNavigator({
  Dashboard: {
    screen: HomeScreen,
    navigationOptions: {
      drawerLabel: 'Dashboard',
    }
  },
  Products: {
    screen: ProductStack,
    navigationOptions: {
      tabBarLabel: 'Products'
    }
  },
  Cart: {
    screen: CartStack,
    navigationOptions: {
      tabBarLabel: 'Cart'
    }
  },
  Evaluate:{
    screen: EvaluateScreen
  },
  Advertisement:{
    screen: AdvertiseScreen
  },
  Rfm:{
    screen: RfmScreen
  },
  Whoweare: {
    screen: WhoWeAreScreen,
    navigationOptions: {
      tabBarLabel: 'Who We Are'
    }
  },
  Contactus: {
    screen: ContactUsScreen,
    navigationOptions: {
      tabBarLabel: 'ContactUsScreen'
    }
  },
  AccountRequest: {
    screen: AccountRequestScreen,
    navigationOptions: {
      tabBarLabel: 'ContactUsScreen'
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
  },
  CompanyMap:{
    screen: MapScreen
  },
});

const MainSwitch = createSwitchNavigator({
  Auth: {
    screen: AuthStack
  },
  Home: {
    screen: HomeStack
  }
});
const AppContainer = createAppContainer(MainSwitch);

export default AppContainer;
