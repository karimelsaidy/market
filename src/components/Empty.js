import React, {useRef, useEffect} from 'react';
import {View, StyleSheet, Animated, Easing} from 'react-native';
import colors from '../constants/Colors';

const Empty = (props) => {
  const opacity = new Animated.Value(0)
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 2000,
      easing: Easing.bounce,
      useNativeDriver: 'true',
    }).start();
  },[]);
  return (
    <View style={styles.container}>
      <Animated.Text style={{...styles.txt, opacity}}>
        {props.txt}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    color: colors.accentColor,
    fontSize: 18,
    fontFamily: 'Merriweather-Regular',
  },
});
export default Empty;
