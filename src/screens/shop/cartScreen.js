import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import Spinner from '../../components/Spinner';
import {useSelector, useDispatch} from 'react-redux';
import Colors from '../../constants/Colors';
import CartItem from '../../components/CartItem';
import removeProductFromCart from '../../stateStore/actions/removeProductFromCartAction';
import confirmOrder from '../../stateStore/actions/confirmOrderAction';
import EmptyCart from '../../components/EmptyCart';
const CartScreen = () => {
  //state for show Toast not orderd yet or submitted order
  const [submitOrder, setSubmited] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  // get product that added to the cart
  const cartProducts = useSelector(state => state.cart.cartProducts);
  // get sum price of all product that added to the cart
  const totalSum = useSelector(state => state.cart.cartPrice);
  const dispatch = useDispatch();
  const dispatchHandler = async () => {
    setIsLoading(true);
    try {
      await dispatch(confirmOrder({cart: cartProducts}));
      setSubmited(true);
    } catch (err) {
      Alert.alert('Some thing went Wrong', 'check your internet Connection', [{
        text: 'ok',
      }]);
    }
    setIsLoading(false);
  };
  // check Loading 
  if(isLoading){
   <Spinner />
  }
  //check cart empty or not using total sum cost of cart products
  if (totalSum === 0) {
    return <EmptyCart submitOrder={submitOrder} />;
  } 
    return (
      <View style={styles.container}>
        <View style={styles.orderCard}>
          <Text style={styles.cardTxt}>total Sum {totalSum} $</Text>
          <TouchableOpacity style={styles.btn} onPress={dispatchHandler}>
            <Text style={styles.cardTxt}>Order Now</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {cartProducts.map(item => (
            <CartItem
              key={item.id}
              item={item}
              removeProduct={() => dispatch(removeProductFromCart(item.id))}
            />
          ))}
        </ScrollView>
      </View>
    );
  
};

const styles = StyleSheet.create({
  orderCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    margin: 10,
    shadowOffset: {width: 0, height: 3},
    shadowColor: Colors.shadow,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 7,
    backgroundColor: Colors.third,
    borderRadius: 15,
  },
  btn: {
    backgroundColor: Colors.accentColor,
    padding: 10,
    borderRadius: 10,
  },
  cardTxt: {
    fontSize: 16,
    fontFamily: 'Merriweather-Regular',
    color: Colors.primary,
  },
});

export default CartScreen;
