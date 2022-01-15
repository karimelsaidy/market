const addToCart = ({id, allProducts}) => {
  return {type: 'ADD_PRODUCT_TO_CART', payload: {id, allProducts}};
};

export default addToCart;
