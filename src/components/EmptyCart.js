import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../constants/Colors';

const EmptyCart = ({submitOrder}) => {
  
  const {height} = useWindowDimensions();
  const translation = useRef(new Animated.Value(height * -1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(translation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(translation, {
        toValue: height * -1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const endToastImmed = () => {
    Animated.timing(translation, {
      toValue: height * -1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  const opacityOut = translation.interpolate({
    inputRange: [height * -1, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.nothingContainer}>
      <Animated.View
        style={{...styles.animate, transform: [{translateY: translation}]}}>
        <View style={styles.icnTxtCon}>
          <Icon
            name={submitOrder ? 'cart-arrow-down' : 'cart-off'}
            size={25}
            color={colors.accentColor}
            style={{marginEnd: 20}}
          />
          <View>
            <Text style={styles.title}>
              {submitOrder ? 'Order confirmed' : 'Empty Cart'}
            </Text>
            <Text style={styles.message}>
              {submitOrder
                ? 'You will receive it in two days'
                : "you didn't add products to cart "}{' '}
            </Text>
          </View>
        </View>
        <Icon.Button
          name="close-thick"
          size={25}
          backgroundColor={colors.primary}
          iconStyle={{
            marginRight: 0,
          }}
          color={colors.delete}
          onPress={endToastImmed}
        />
      </Animated.View>

      <Animated.Text
        style={{
          ...styles.nothingTxt,
          opacity: opacityOut,
        }}>
        add what you want to the cart then return here to order them !
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  nothingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animate: {
    width: '80%',
    position: 'absolute',
    top: 0,
    left: '10%',
    right: 0,
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowOffset: {width: 0, height: 3},
    shadowColor: colors.shadow,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 7,
  },
  icnTxtCon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontFamily: 'RoadRage-Regular',
    color: colors.fifth,
  },
  message: {
    fontSize: 18,
    fontFamily: 'RoadRage-Regular',
    color: colors.fifth,
  },
  nothingTxt: {
    fontSize: 16,
    fontFamily: 'Merriweather-Regular',
    color: colors.accentColor,
  },
});

export default EmptyCart;
