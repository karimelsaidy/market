import {createStackNavigator} from 'react-navigation-stack';
import orderScreen from '../screens/shop/orderScreen';
import colors from '../constants/Colors';

const ordersNavigator = createStackNavigator(
  {orderScreen},
  {
    defaultNavigationOptions: {
      headerStyle: {backgroundColor: colors.accentColor},
      headerTintColor: colors.primary,
      cardStyle: {backgroundColor: colors.primary},
      headerTitleStyle: {fontFamily: 'Lobster-Regular', fontSize: 22},
    },
  },
);

export default ordersNavigator;
