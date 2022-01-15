import {createStackNavigator} from 'react-navigation-stack';
import AuthScreen from '../screens/user/AuthScreen';
import SignUp from '../screens/user/SignUpScreen';

const authNav = createStackNavigator(
  {
    authinticate: AuthScreen,
    signUp: SignUp,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

export default authNav;
