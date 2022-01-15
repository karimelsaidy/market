import OrderModal from '../../models/orderModal';

const initialState = {
  confirmedOrders: [],
  totalConfirmedOrdersSum: 0,
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ORDERS':
      // get total orders Cost
      const totalSum = action.payload.loadedOrders.reduce((acc, item) => {
       return item.orderPrice + acc;
      }, 0);
      return {
        confirmedOrders: action.payload.loadedOrders,
        totalConfirmedOrdersSum: totalSum,
      };
    case 'CONFIRM_ORDER':
      // get products that has been confirmed to order
      const cartOrders = action.payload.cart;
      // get the date of confirmed order
      const date = action.payload.date;
      return {
        ...state,
        confirmedOrders: state.confirmedOrders.concat([
          {
            id: action.payload.id,
            date,
            orderPrice: action.payload.orderPrice,
            orders: cartOrders.map(
              item =>
                new OrderModal(item.id, item.title, item.quantity, item.price),
            ),
          },
        ]),
        totalConfirmedOrdersSum: Number(
          (action.payload.orderPrice + state.totalConfirmedOrdersSum).toFixed(
            2,
          ),
        ),
      };

    default:
      return state;
  }
};

export default ordersReducer;
