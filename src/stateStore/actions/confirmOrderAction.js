const confirmOrderAction = ({cart}) => {
  // get the date and styling it
  const currentDate = new Date();
  const styledDate = `${currentDate.getHours()}:${currentDate.getMinutes()} ${currentDate.getDate()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getFullYear()}`;
  // get the price of confirmed order
  const orderPrice = Number(
    cart
      .reduce(
        (totalPrice, elementPrice) => {
          return {
            price: totalPrice.price + elementPrice.price,
          };
        },
        {price: 0},
      )
      .price.toFixed(2),
  );
  return async (dispatch,getState) => {
    const {token, userId} = getState().auth;
    try {
      let send = await fetch(
        // firebase project link
        `blabla/orders/${userId}.json?auth=${token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cart,
            date: styledDate,
            orderPrice
          }),
        },
      );
      if (send.ok) {
        let data = await send.json();
        console.log(data.name,'daaaa')
        dispatch({
          type: 'CONFIRM_ORDER',
          payload: {id: data.name, orderPrice,date: styledDate, cart},
        });
      } else {
        throw new Error('some thing went wrong');
      }
    } catch (err) {
      throw err;
    }
  };
};

export default confirmOrderAction;
