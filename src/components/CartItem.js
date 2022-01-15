import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/AntDesign';

const CartItem = ({item,removeProduct}) => {
  return (
    <View style={styles.container}>
      <View style={styles.txtContainer}>
        <View style={styles.titleTxtContainer}>
          <Text style={styles.itemTitle}>
            {item.quantity} {item.title}
          </Text>
        </View>

        <View style={styles.priceTxtCon}>
          <Text style={styles.itemPrice}>{item.price.toFixed(2)} $</Text>
        </View>
      </View>

      <View style={{justifyContent:'center',alignItems:'center'}}>
        <Icon.Button
          name="delete"
          color={Colors.delete}
          backgroundColor={Colors.fourth}
          size={23}
          iconStyle={{marginRight:0}}
          onPress={() => removeProduct()}></Icon.Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.fourth,
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    width: '80%',
  },
  txtContainer: {
   
    justifyContent: 'space-around',
    width: '70%',
  },
  itemTitle: {
    fontSize: 16,
    fontFamily: 'Merriweather-Regular',
    color: Colors.primary,
  },
  itemPrice: {
    fontSize: 16,
    fontFamily: 'Merriweather-Regular',
    color: Colors.primary,
  },
  priceTxtCon: {
    marginHorizontal: 5,
  },
  titleTxtContainer: {
    overflow: 'hidden',
  },
});

export default CartItem;
