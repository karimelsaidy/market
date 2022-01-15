import {createStore, combineReducers, applyMiddleware} from 'redux';
import Thunk from 'redux-thunk';
import productReducer from './reducers/productReducer';
import cartReducer from './reducers/cartReducer';
import ordersReducer from './reducers/ordersReducer';
import authReducer from './reducers/authReducer';

// creating store for state management
const store = createStore(
  combineReducers({
    products: productReducer,
    cart: cartReducer,
    ordersReducer: ordersReducer,
    auth:authReducer
  }),
  applyMiddleware(Thunk),
);

export default store;
