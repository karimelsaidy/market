import React, { useEffect} from 'react';
import {View, StyleSheet, Animated} from 'react-native';

import OrderCard from './OrderCard';

const OrdersMenu = props => {
  const orderMenuLength = props.data.length;
  const arr = Array(orderMenuLength);
  for (let i = 0; i < props.data.length; i++) {
    arr[i] = new Animated.Value(0);
  }
  useEffect(() => {
    const show = i => {
      if (i === orderMenuLength) {
        return;
      }
      Animated.sequence([
        Animated.timing(arr[i], {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.delay(100),
      ]).start(() => show(++i));
    };
    show(0);
  });
  return (
    <View style={styles.menuContainer}>
      {props.data.map((item, index) => (
        <OrderCard key={index} item={item} opacity={arr[index]} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default OrdersMenu;
