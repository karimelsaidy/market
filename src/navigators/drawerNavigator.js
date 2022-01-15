import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import shopNavigator from './shopNavigator';
import ordersNavigator from './ordersNavigator';
import myProductsNavigator from './myProductsNavigator';
import CustomDrawerComponent from '../components/CustomDrawerComponent';
import colors from '../constants/Colors';

const drawerNavigator = createDrawerNavigator(
  {
    shopNavigator: {
      screen: shopNavigator,
      navigationOptions: {
        title: ' All Products',
        drawerIcon: ({tintColor}) => (
          <Icon name="home-search" size={26} color={tintColor} />
        ),
      },
    },
    ordersNavigator: {
      screen: ordersNavigator,
      navigationOptions: {
        title: 'My Orders',
        drawerIcon: ({tintColor}) => (
          <Icon name="cart-arrow-down" size={24} color={tintColor} />
        ),
      },
    },
    myProductsNavigator: {
      screen:myProductsNavigator,navigationOptions:{
        title:'My Products',
        drawerIcon: ({tintColor}) => (
          <Icon name="account-edit" size={24} color={tintColor} />
        ),
      }
    }
  },
  {
   
    drawerWidth: '70%',
    drawerType: 'slide',
    contentComponent: props => <CustomDrawerComponent {...props} />,
    contentOptions: {
      activeTintColor: colors.accentColor,
      inactiveTintColor: colors.third,

      itemsContainerStyle: {
        marginVertical: 10,
      },
    },
  },
);

export default drawerNavigator;
