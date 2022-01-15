const editProduct = ({id, product}) => {
  return async (dispatch,getState) => {
    const {token} = getState().auth;
  

    try {
      const response = await fetch(
        // firebase project link
        `blablabla/products/${id}.json?auth=${token}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: product.title,
            imageUrl: product.imageUrl,
            description: product.description,
            price: product.price,
          }),
        },
      );
      if (response.ok) {
        dispatch({type: 'EDIT_PRODUCT', payload: {product}});
      } else {
        throw new Error('some thing went wrong');
      }
    } catch (err) {
      throw err;
    }
  };
};

export default editProduct;
