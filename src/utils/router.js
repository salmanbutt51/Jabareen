import { React } from 'react';
import { createStackNavigator, createSwitchNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import MyProfileScreen from '../screens/MyProfileScreen';
import ProductsScreen from '../screens/ProductsScreen';
import ProductsListScreen from '../screens/ProductsListScreen';
import SubCategoryScreen from '../screens/SubCategoryScreen';
import SubCategoryListScreen from '../screens/SubCategoryListScreen';
import CartScreen from '../screens/CartScreen';
import RfqHistoryScreen from '../screens/RfqHistoryScreen';
import RfqDetailScreen from '../screens/RfqDetailScreen';
import EvaluateScreen from '../screens/EvaluateScreen';
import AdvertiseScreen from '../screens/AdvertiseScreen';
import AdvertiseDetailScreen from '../screens/AdvertiseDetailScreen';
import RfmScreen from '../screens/RfmScreen';
import WhoWeAreScreen from '../screens/WhoWeAreScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
import AccountRequestScreen from '../screens/AccountRequestScreen';
import PayUsScreen from '../screens/PayUsScreen';
import CompanyTeamScreen from '../screens/CompanyTeamScreen';
import ComplaintsScreen from '../screens/ComplaintsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import MapScreen from '../screens/MapScreen';
import Drawer from '../screens/Drawer';
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
},
  {
    initialRouteName: 'Welcome',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f33155',
      },
      headerTintColor: '#fff'
    },
  }
);

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
  Subcategorylist:{
    screen: SubCategoryListScreen,
    navigationOptions: {
    title: 'Products List',
    },
  },
  Productslist:{
    screen: ProductsListScreen,
    navigationOptions: {
    title: 'Products List',
    },
  }
},
  {
    initialRouteName: 'Categories',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f33155',
      },
      headerTintColor: '#fff'
    },
  }
);

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
      title: 'Rfq History Detail',
      headerStyle: {
        backgroundColor: '#f33155',
      },
      headerTintColor: '#fff'
    },
  },
});

const AdvertiseStack = createStackNavigator({
  Advertise:{
    screen: AdvertiseScreen,
    navigationOptions: {
    header: null
    },
  },
  Advertisedetail:{
    screen: AdvertiseDetailScreen,
    navigationOptions: {
    title: 'Advertise Detail'
    },
  }
},
  {
    initialRouteName: 'Advertise',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f33155',
      },
      headerTintColor: '#fff'
    },
  }
);

const HomeStack = createDrawerNavigator({
  Dashboard: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Dashboard',
    }
  },
  Profile: {
    screen: MyProfileScreen,
    navigationOptions: {
      title: 'User Profile',
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
    screen: CartScreen
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
    screen: AdvertiseStack
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
  Payus: {
    screen: PayUsScreen,
    navigationOptions: {
      title: 'Pay Us'
    }
  },
  Complaints: {
    screen: ComplaintsScreen,
    navigationOptions: {
      title: 'Complaints'
    }
  },
  Notifications: {
    screen: NotificationsScreen,
    navigationOptions: {
      title: 'Notifications'
    }
  },
},
// {
//   contentComponent: Drawer
// }
);

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
