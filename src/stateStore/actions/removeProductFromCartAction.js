const removeProductFromCartAction = id => {
  return {type: 'REMOVE_PRODUCT_FROM_CART', payload: {id}};
};

export default removeProductFromCartAction;
