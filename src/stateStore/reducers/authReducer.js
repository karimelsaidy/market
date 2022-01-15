const initialState = {
  token: null,
  userId: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH':
      return {
        token: action.payload.token,
        userId: action.payload.userId,
      };
    case 'LOG-OUT':
      return initialState
    default:
      return state;
  }
};

export default authReducer;
