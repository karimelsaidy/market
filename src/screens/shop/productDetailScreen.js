import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Colors from '../../constants/Colors';
import addToCartAction from '../../stateStore/actions/addToCartAction';

const productDetailScreen = props => {
  // get the pressed product from products to display it's informations
  const productId = props.navigation.getParam('id');
  // get all products
  const allProducts = useSelector(state => state.products.allProducts);
  // get the pressed product
  const product = allProducts.find(item => item.id === productId);
  // make dispatch Method
  const dispatch = useDispatch();
  // get dimensions of the screen to set the image height
  const {height} = useWindowDimensions();

  return (
    <View style={styles.screen}>
      <View
        style={{...styles.imgContainer, height: height * 0.35, width: '95%'}}>
        <Image
          source={{uri: product.imageUrl}}
          resizeMode="stretch"
          style={styles.img}
        />
      </View>
      <View style={styles.txtPriceCon}>
        <Text style={styles.txtPrice}>{product.price} $</Text>
      </View>
      <View style={styles.txtDescriptionCon}>
        <Text style={styles.txtDescription}>{product.description}</Text>
      </View>

      <TouchableOpacity style={styles.btnCon} onPress={()=>dispatch(addToCartAction({id:product.id,allProducts}))}>
        <Text style={styles.btnTxt}>To Cart</Text>
      </TouchableOpacity>
    </View>
  );
};
// set dynamic title here
productDetailScreen.navigationOptions = navigationData => {
  return {
    title: navigationData.navigation.getParam('title'),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  imgContainer: {
    margin: 10,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
  },
  txtPriceCon: {
    margin: 10,
  },
  txtPrice: {
    fontSize: 18,
    fontFamily: 'Merriweather-Regular',
  },
  txtDescriptionCon: {
    margin: 5,
    padding: 10,
  },
  txtDescription: {
    fontSize: 18,
    fontFamily: 'Merriweather-Regular',
  },
  btnCon: {
    margin: 10,
    padding: 15,
    backgroundColor: Colors.accentColor,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 7,
  },
  btnTxt: {
    color: Colors.primary,
    fontSize: 18,
    fontFamily: 'Merriweather-Regular',
  },
});
export default productDetailScreen;
