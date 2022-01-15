import product from '../../models/products';
const addProduct = payload => {
  return async (dispatch,getState) => {
    const {token} = getState().auth;
    try {
      let send = await fetch(
        // firebase project link
        `https://blablabla?auth=${token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      );
      if (send.ok) {
        let data = await send.json();
        dispatch({
          type: 'ADD_PRODUCT',
          payload: new product(
            data.name,
            payload.ownerId,
            payload.title,
            payload.imageUrl,
            payload.description,
            payload.price,
          ),
        });
      } else {
        throw new Error('some thing went wrong');
      }
    } catch (err) {
      throw err;
    }
  };
};

export default addProduct;
