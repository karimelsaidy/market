import AsyncStorage from '@react-native-async-storage/async-storage';
export const signInAction = (email, password) => {
  return async dispatch => {
    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={project key}',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        dispatch(authAction(data.localId, data.idToken));
        const expirationDate = new Date(
          new Date().getTime() + parseInt(data.expiresIn) * 1000,
        );
        console.log(expirationDate);
        AsyncStorage.setItem(
          'userData',
          JSON.stringify({
            userId: data.localId,
            token: data.idToken,
            expirationDate: expirationDate.toISOString(),
          }),
        );
      } else {
        throw new Error('invalid');
      }
    } catch (e) {
      throw e;
    }
  };
};

export const signUpAction = (email, password) => {
  return async dispatch => {
    try {
      const response = await fetch(
        //firebase project link
        'blablabla',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        dispatch(authAction(data.localId, data.idToken));
        AsyncStorage.setItem(
          'userData',
          JSON.stringify({
            userId: data.localId,
            token: data.idToken,
            expirationDate: expirationDate.toISOString(),
          }),
        );
      } else if (!response.ok && data.error.message === 'EMAIL_EXISTS') {
        throw new Error('exist');
      } else if (
        !response.ok &&
        data.error.message === 'TOO_MANY_ATTEMPTS_TRY_LATER'
      ) {
        throw new Error('attempts');
      }
    } catch (e) {
      throw e;
    }
  };
};

export const authAction = (userId, token) => {
  return {type: 'AUTH', payload: {userId, token}};
};
export const logOutAction = () => {
  AsyncStorage.removeItem('userData')
  return {type: 'LOG-OUT'};
};
