import React, {useEffect, useState, useCallback} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  StatusBar,
  Text,
  Button,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import ShopCard from '../../components/ShopCard';
import colors from '../../constants/Colors';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import addToCartAction from '../../stateStore/actions/addToCartAction';
import fetchProducts from '../../stateStore/actions/fetchProducts';
import Spinner from '../../components/Spinner';

const shopScreen = props => {
  // states for detect loading data and refreshing it and there error or not
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  // getingall products from store
  const products = useSelector(state => state.products.allProducts);

  const dispatch = useDispatch();
  // handle adding products to cart
  const addProductToCart = id => {
    dispatch(addToCartAction(id));
  };
  // fetch data from the server and save it in the redux store
  const fetchData = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    
    try {
      await dispatch(fetchProducts());
      setIsRefreshing(false);;
    } catch (e) {
      setError('something wrong');
      setIsRefreshing(false);
    }

  }, [setError, dispatch]);
  useEffect(() => {
    const listener = props.navigation.addListener('willFocus', fetchData);
    return () => {
      listener.remove();
    };
  }, [fetchData]);
  useEffect(() => {
    setIsLoading(true);
    fetchData()
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [fetchData, dispatch]);
  // display card for products
  const renderProducts = ({item}) => {
    return (
      <ShopCard
        navigation={props.navigation}
        imageUrl={item.imageUrl}
        price={item.price}
        id={item.id}
        title={item.title}
        addToCard={() => addProductToCart({id: item.id, allProducts: products})}
      />
    );
  };
  if (isLoading) {
    return (
      <View style={styles.spinnerCon}>
        <StatusBar backgroundColor={colors.accentColor} />
        <Spinner />
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.errScsreen}>
        <StatusBar backgroundColor={colors.accentColor} />
        <Text style={styles.errTxt}> an error occurred</Text>
        <Button title="try again" onPress={fetchData} />
      </View>
    );
  }
  return (
    <View>
      <StatusBar backgroundColor={colors.accentColor} />
      <FlatList
        refreshing={isRefreshing}
        onRefresh={fetchData}
        data={products}
        renderItem={renderProducts}
        contentContainerStyle={styles.content}
      />
    </View>
  );
};
shopScreen.navigationOptions = navigationData => {
  return {
    title: 'Products',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="cart"
          iconName="ios-cart"
          onPress={() => navigationData.navigation.navigate('cartScreen')}
        />
      </HeaderButtons>
    ),
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="menu"
          iconName="menu"
          onPress={navigationData.navigation.toggleDrawer}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerCon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errScsreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errTxt: {
    color: colors.fifth,
    fontSize: 20,
    marginBottom: 6,
  },
});

export default shopScreen;
