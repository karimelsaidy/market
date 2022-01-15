import ProductCart from '../../models/productCart';
initialState = {
  cartProducts: [],
  cartPrice: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT_TO_CART':
      // get all products from the store
      const products = action.payload.allProducts;
      // get  the product from the store
      const product = products.find(
        product => product.id === action.payload.id,
      );
      // see if the product added to the cart before or not
      const addedToCart = state.cartProducts.find(
        product => product.id === action.payload.id,
      );
      if (addedToCart) {
        const newCart = state.cartProducts.filter(
          order => order.id !== addedToCart.id,
        );

        return {
          ...state,
          cartProducts: newCart.concat([
            {
              ...addedToCart,
              quantity: ++addedToCart.quantity,
              price: Number((addedToCart.price + product.price).toFixed(2)),
            },
          ]),
          cartPrice: Number((state.cartPrice + product.price).toFixed(2)),
        };
      } else {
        return {
          ...state,
          cartPrice: Number((product.price + state.cartPrice).toFixed(2)),
          cartProducts: state.cartProducts.concat([
            new ProductCart(
              product.id,
              product.title,
              1,
              Number(product.price.toFixed(2)),
            ),
          ]),
        };
      }
    case 'REMOVE_PRODUCT_FROM_CART':
      const removedProduct = state.cartProducts.find(
        product => product.id === action.payload.id,
      );
      const newCart = state.cartProducts.filter(
        product => product.id !== action.payload.id,
      );
      return {
        ...state,
        cartPrice: Number((state.cartPrice - removedProduct.price).toFixed(2)),
        cartProducts: newCart,
      };
    case 'CONFIRM_ORDER':
      return {
        ...state,
        cartPrice: 0,
        cartProducts: [],
      };

    default:
      return state;
  }
};

export default cartReducer;
