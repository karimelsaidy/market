import {createStackNavigator} from 'react-navigation-stack';
import MyProducts from '../screens/user/MyProductsScreen';
import EditProduct from '../screens/user/EditProductScreen';
import colors from '../constants/Colors';

const myProductNav = createStackNavigator(
  {
    myProducts: {
      screen: MyProducts,
    },
    EditProduct: {
      screen: EditProduct,
    },
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

export default myProductNav;
