const removeProduct = id => {
  return async (dispatch, getState) => {
    const {token} = getState().auth;

    try {
      const response = await fetch(
        // firebase project link
        `blabla/products/${id}.json?auth=${token}`,
        {
          method: 'DELETE',
        },
      );
      if (response.ok) {
        dispatch({type: 'REMOVE_PRODUCT', payload: {id}});
      } else {
        throw new Error('something went wrong');
      }
    } catch (e) {
      throw e;
    }
  };
};

export default removeProduct;
