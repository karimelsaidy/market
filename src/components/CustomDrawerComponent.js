import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  Alert,
  Linking,
} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer';
import { useDispatch } from 'react-redux'; 
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../constants/Colors';
import Animated from 'react-native-reanimated';
import Btn from './Btn';
import {logOutAction} from '../stateStore/actions/authActions';

const CustomDrawerComponent = props => {

  const  dispatch = useDispatch();
  const translation = Animated.interpolate(props.drawerOpenProgress, {
    inputRange: [0, 1],
    outputRange: [-300, 1],
    extrapolate: 'clamp',
  });
  // my social accounts information
  const faceUrl = 'https://www.facebook.com/7.karim.m.abdelkarim';
  const whatsAppUrl = 'whatsapp://send?text= &phone=+201060688416';
  // log out handler
  const logOut = ()=> {
    dispatch(logOutAction());
    props.navigation.navigate('auth')
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{flexGrow: 1}} contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.imgCon}>
          <Image
            source={require('../assets/imgs/cart.png')}
            resizeMode="stretch"
            style={styles.imgLogo}
          />
        </View>
        <Animated.View style={{transform: [{translateX: translation}]}}>
          <DrawerItems {...props} />
        </Animated.View>
        <Animated.View
          style={{
            ...styles.footer,
            transform: [{translateX: translation}],
          }}>
          <View style={styles.iconCon}>
            <Icon.Button
              name="logo-facebook"
              size={25}
              onPress={() =>
                Linking.openURL(faceUrl).catch(() => {
                  Alert.alert(
                    'Browser not Found',
                    'please check your internet browsers first',
                    [{text: 'ok'}],
                  );
                })
              }>
              <Text style={styles.iconTxt}>Face Book connection</Text>
            </Icon.Button>
          </View>
          <View style={styles.iconCon}>
            <Icon.Button
              name="logo-whatsapp"
              size={25}
              style={{backgroundColor: '#00BFA5'}}
              onPress={() =>
                Linking.openURL(whatsAppUrl).catch(() => {
                  Alert.alert(
                    'App not Found',
                    'please install WhatsApp first',
                    [{text: 'ok'}],
                  );
                })
              }>
              <Text style={styles.iconTxt}>What's App connection</Text>
            </Icon.Button>
          </View>
          <Btn style={styles.btnLogOut} onPress={logOut}>
            <Text style={styles.btnTxt}>Log Out</Text>
            <Ionicons name="log-out-outline" size={24} />
          </Btn>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.primary},
  imgCon: {height: '20%', padding: 10, backgroundColor: colors.accentColor},
  imgLogo: {height: '100%', width: '100%'},
  footer: {
    position: 'absolute',
    bottom: '2%',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconTxt: {
    fontSize: 14,
    fontFamily: 'Merriweather-Regular',
    color: colors.primary,
  },
  iconCon: {
    marginVertical: 3,
  },
  btnLogOut: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  btnTxt:{
    marginHorizontal:5
  }
});

export default CustomDrawerComponent;
