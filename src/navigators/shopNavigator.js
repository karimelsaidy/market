import {createStackNavigator} from 'react-navigation-stack';
import shopScreen from '../screens/shop/shopScreen';
import productDetailScreen from '../screens/shop/productDetailScreen';
import cartScreen from '../screens/shop/cartScreen';
import colors from '../constants/Colors';
const shopNavigator = createStackNavigator(
  {
    shopScreen,
    productDetailScreen,
    cartScreen: {screen: cartScreen, navigationOptions: {title: 'Your Cart'}},
  },
  {
    defaultNavigationOptions: {
      headerStyle: {backgroundColor: colors.accentColor},
      headerTintColor: colors.primary,
      cardStyle: {backgroundColor: colors.primary},
      headerTitleStyle: {fontFamily: 'Lobster-Regular', fontSize: 22},
    },
  },
);

export default shopNavigator;
