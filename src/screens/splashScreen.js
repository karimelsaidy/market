import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {StatusBar,Text,StyleSheet} from 'react-native';
import {authAction} from '../stateStore/actions/authActions';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../constants/Colors';

const splashScreen = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    const loginCheck = async () => {
      // get user saved data from device storage
      const savedData = await AsyncStorage.getItem('userData');
      // check saved data exist or not
      if (!savedData) {
        props.navigation.navigate('auth');
        return;
      }
      // extract user id and token and expiration date of the token
      const {userId, token, expirationDate} = JSON.parse(savedData);
      console.log(userId, token, expirationDate, 'user daaaa');
      const expirationDatFormat = new Date(expirationDate);
      if (expirationDatFormat <= new Date() || !userId || !token) {
        props.navigation.navigate('auth');
        return;
      }
      dispatch(authAction(userId, token));
      props.navigation.navigate('shop');
    };
    loginCheck();
  }, [dispatch]);
  return (
    <LinearGradient style={styles.linear} colors={[colors.fourth,colors.primary,colors.accentColor]} >
<StatusBar backgroundColor={colors.fourth}/>
<Text style={styles.txtLogo}>The Market</Text>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  linear:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
txtLogo:{
  fontSize: 25,
  fontFamily:'Lobster-Regular',
  color:colors.fifth
}
})
export default splashScreen;
