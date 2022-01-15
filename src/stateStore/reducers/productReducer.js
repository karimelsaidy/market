// initial state for products
const initialState = {
  allProducts: [],
  myProducts: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      const userId = action.payload.userId
      const myProductsArr = action.payload.productArr.filter(
        product => product.ownerId === userId,
      );
      return {
        ...state,
        allProducts: action.payload.productArr,
        myProducts: myProductsArr,
      };
    case 'ADD_PRODUCT':
      return {
        ...state,
        allProducts: state.allProducts.concat(action.payload),
        myProducts: state.myProducts.concat(action.payload),
      };
    case 'REMOVE_PRODUCT':
      const newProducts = state.allProducts.filter(
        product => product.id !== action.payload.id,
      );
      const newMyProducts = state.myProducts.filter(
        product => product.id !== action.payload.id,
      );
      return {
        ...state,
        allProducts: newProducts,
        myProducts: newMyProducts,
      };
    case 'EDIT_PRODUCT':
      const editedProduct = action.payload.product;
      const newProductsArr = state.allProducts.map(product => {
        if (product.id === editedProduct.id) {
          return {
            ...editedProduct,
          };
        }
        return product;
      });
      const newMyProductsArr = state.myProducts.map(product => {
        if (product.id === editedProduct.id) {
          return {
            ...editedProduct,
          };
        }
        return product;
      });
      return {
        ...state,
        allProducts: newProductsArr,
        myProducts: newMyProductsArr,
      };
    default:
      return state;
  }
};

export default productReducer;
