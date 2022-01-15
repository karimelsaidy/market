
const fetchOrders = () => {
  return async (dispatch,getState) => {
    const { userId} = getState().auth;
    try {
      let response = await fetch(
        // firebase project link
        `blabla/orders/${userId}.json`,
      );
      if (response.ok) {
        let orders = await response.json();
        let ordersArr = [];
        for (let key in orders) {
          ordersArr.push({
            id: key,
            date: orders[key].date,
            orderPrice: orders[key].orderPrice,
            orders: orders[key].cart,
          });
          
        }
        dispatch({type: 'SET_ORDERS', payload: {loadedOrders: ordersArr}});
      } else {
        throw new Error('wrong');
      }
    } catch (err) {
      throw err;
    }
  };
};

export default fetchOrders;
