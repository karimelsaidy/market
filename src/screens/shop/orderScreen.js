import React, {useState, useEffect, useCallback} from 'react';
import {Text, StyleSheet, View, ScrollView, Alert} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector, useDispatch} from 'react-redux';
import CustomHeaderButton from '../../components/CustomHeaderButton';
import colors from '../../constants/Colors';
import Empty from '../../components/Empty';
import CustomButton from '../../components/CustomButton';
import OrdersMenu from '../../components/OrdersMenu';
import fetchOrders from '../../stateStore/actions/fetchOrdersAction';
import Spinner from '../../components/Spinner';

const orderScreen = props => {
  let menu;
  //get orderd products
  const ordersState = useSelector(state => state.ordersReducer);
  const [showMenu, setShowMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();
  // fetch orders from server
  const fetchOrdersHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    dispatch(fetchOrders())
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setError('some thing wrong');
        Alert.alert(
          'connection Error',
          'please check your internet Connection',
          [{text: 'ok'}],
        );
      });
  }, [dispatch]);
  useEffect(() => {
    setIsLoading(true);
    fetchOrdersHandler().then(() => setIsLoading(false));
  }, [fetchOrders]);
  useEffect(() => {
    const ordersListener = props.navigation.addListener(
      'willFocus',
      fetchOrdersHandler,
    );
    return () => {
      ordersListener.remove();
    };
  }, [dispatch]);
  const handleShowMenu = () => {
    if (showMenu) {
      menu = <OrdersMenu data={ordersState.confirmedOrders} />;
    } else {
      menu = (
        <CustomButton title="More Details" onPress={() => setShowMenu(true)} />
      );
    }
  };
  handleShowMenu();

  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return (
      <View style={styles.errScreen}>
        <Text style={styles.errTxt}> an Error occuerd</Text>
      </View>
    );
  }

  if (ordersState.totalConfirmedOrdersSum === 0) {
    return <Empty txt="You didn't orderd any product yet!" />;
  } else {
    return (
      <ScrollView style={{flexGrow: 1}}>
        <View style={styles.orderCost}>
          <Text style={styles.costTxt}>Total orders cost:</Text>
          <Text style={styles.costTxt}>
            {ordersState.totalConfirmedOrdersSum} $
          </Text>
        </View>
        {menu}
      </ScrollView>
    );
  }
};
orderScreen.navigationOptions = navigationData => {
  return {
    title: 'Your Orders',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="menu-order"
          iconName="menu"
          onPress={() => navigationData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({
  nothingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nothingTxt: {
    fontSize: 16,
    fontFamily: 'Merriweather-Regular',
    color: colors.accentColor,
  },
  orderCost: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    margin: 10,
    shadowOffset: {width: 0, height: 3},
    shadowColor: colors.shadow,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 7,
    backgroundColor: colors.third,
    borderRadius: 15,
  },
  costTxt: {
    fontSize: 16,
    fontFamily: 'Merriweather-Regular',
    color: colors.accentColor,
  },
  errScreen: {
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

export default orderScreen;
