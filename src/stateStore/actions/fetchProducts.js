import Product from '../../models/products';
const fetchProducts = () => {
  return async (dispatch,getState) => {
    const {userId} = getState().auth;
    try {
      let response = await fetch(
        // firebase project link
        'blabla/products.json',
      );
      if (response.ok) {
        let products = await response.json();
        let productArr = [];
        for (let key in products) {
          productArr.push(
            new Product(
              key,
              products[key].ownerId,
              products[key].title,
              products[key].imageUrl,
              products[key].description,
              products[key].price,
            ),
          );
        }
        dispatch({type: 'SET_PRODUCTS', payload: {productArr,userId}});
      } else {
        throw new Error('wrong');
      }
    } catch (err) {
      throw err;
    }
  };
};

export default fetchProducts;
