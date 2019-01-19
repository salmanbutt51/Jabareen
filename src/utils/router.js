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
import RfqHistoryScreen from '../screens/RfqHistoryScreen';
import RfqDetailScreen from '../screens/RfqDetailScreen';
import EvaluateScreen from '../screens/EvaluateScreen';
import AdvertiseScreen from '../screens/AdvertiseScreen';
import RfmScreen from '../screens/RfmScreen';
import WhoWeAreScreen from '../screens/WhoWeAreScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
import AccountRequestScreen from '../screens/AccountRequestScreen';
import CompanyTeamScreen from '../screens/CompanyTeamScreen';
import ComplaintsScreen from '../screens/ComplaintsScreen';
import MapScreen from '../screens/MapScreen';
import Root from '../screens/Root';

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
    header: null
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

const OrderStack = createStackNavigator({
  Rfqhistory:{
    screen: RfqHistoryScreen,
    navigationOptions: {
    header: null
    },
  },
  Rfqhistorydetail:{
    screen: RfqDetailScreen,
    navigationOptions: {
    title: 'Rfq History Detail'
    },
  },
});

const CartStack = createStackNavigator({
  Cartscreen:{
    screen: CartScreen,
    navigationOptions: {
    header: null
    },
  },
});

const HomeStack = createDrawerNavigator({
  Dashboard: {
    screen: HomeScreen,
    navigationOptions: {
      drawerLabel: 'Dashboard',
    }
  },
  Companyteam: {
    screen: CompanyTeamScreen,
    navigationOptions: {
      title: 'Company Team'
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
  Orders:{
    screen: OrderStack,
  },
  Evaluate:{
    screen: EvaluateScreen
  },
  CompanyMap:{
    screen: MapScreen,
    navigationOptions: {
      title: 'Company Map'
    }
  },
  Whoweare: {
    screen: WhoWeAreScreen,
    navigationOptions: {
      title: 'Who We Are'
    }
  },
  Advertisement:{
    screen: AdvertiseScreen
  },
  Rfm:{
    screen: RfmScreen
  },
  Contactus: {
    screen: ContactUsScreen,
    navigationOptions: {
      title: 'Contact Us'
    }
  },
  AccountRequest: {
    screen: AccountRequestScreen,
    navigationOptions: {
      title: 'Account Request'
    }
  },
  Complaints: {
    screen: ComplaintsScreen,
    navigationOptions: {
      title: 'Complaints'
    }
  },
});

const MainSwitch = createSwitchNavigator({
  AuthLoading: Root,
  Auth: {
    screen: AuthStack
  },
  Home: {
    screen: HomeStack
  }
});
const AppContainer = createAppContainer(MainSwitch);

export default AppContainer;
