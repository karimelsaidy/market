import React from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import colors from '../constants/Colors';

const OrderDetail = ({product}) => {
  return (
    <View style={styles.orderDetailContainer}>
      <Text style={styles.txtDetail}>
        {product.quantity} {product.title}
      </Text>
      <Text style={styles.txtDetail}>{product.price} $</Text>
    </View>
  );
};
const OrderCard = ({item, opacity}) => {
  return (
    <Animated.View style={{...styles.container, opacity: opacity}}>
      <View style={styles.header}>
        <Text style={styles.headerTxt}>{item.orderPrice} $</Text>
        <Text style={styles.headerTxt}>{item.date}</Text>
      </View>

      {item.orders.map(product => (
        <OrderDetail key={product.id} product={product} />
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '75%',
    padding: 15,
    margin: 15,
    shadowOffset: {width: 0, height: 3},
    shadowColor: colors.shadow,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 7,
    backgroundColor: colors.third,
    borderRadius: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  orderDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  headerTxt: {
    fontSize: 20,
    fontFamily: 'RoadRage-Regular',
    color: colors.accentColor,
  },
  txtDetail: {
    fontSize: 18,
    fontFamily: 'RoadRage-Regular',
    color: colors.accentColor,
  },
});

export default OrderCard;
