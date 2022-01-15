import React from 'react';
import {Alert, FlatList, StyleSheet} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import Empty from '../../components/Empty';
import MyProductCard from '../../components/MyProductCard';
import removeProduct from '../../stateStore/actions/removeProduct';
const MyProducts = props => {
  const myProducts = useSelector(state => state.products.myProducts);
  const dispatch = useDispatch();

  const removeProductHandler = id => {
    Alert.alert('are you sure ?', 'are you want to delete this item ?', [
      {text: 'no'},
      {
        text: 'yes',
        onPress: async () => { 
          try {
            await dispatch(removeProduct(id));
          } catch (e) {
            Alert.alert(
              'Error Occuerd',
              'please check your internet Connection',
              [{text: 'ok'}],
            );
          }
        },
      },
    ]);
  };

  const renderProducts = ({item}) => {
    return (
      <MyProductCard
        navigation={props.navigation}
        imageUrl={item.imageUrl}
        price={item.price}
        id={item.id}
        title={item.title}
        removeProduct={() => removeProductHandler(item.id)}
        editProduct={() =>
          props.navigation.navigate('EditProduct', {id: item.id})
        }
      />
    );
  };

  if (myProducts.length === 0) {
    return <Empty txt="you didn't add any product yet!" />;
  } else {
    return (
      <FlatList
        data={myProducts}
        renderItem={renderProducts}
        contentContainerStyle={styles.content}
      />
    );
  }
};

MyProducts.navigationOptions = navigationData => {
  return {
    title: 'My Products',
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="menu"
            iconName="menu"
            onPress={navigationData.navigation.toggleDrawer}
          />
        </HeaderButtons>
      );
    },
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="add"
            iconName="md-add-circle-outline"
            onPress={() => navigationData.navigation.navigate('EditProduct')}
          />
        </HeaderButtons>
      );
    },
  };
};
const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
  },
});

export default MyProducts;
