import React from 'react';
import type {Node} from 'react';
import {enableScreens} from 'react-native-screens';
import {Provider} from 'react-redux';
import NavigationContainer from './navigators/mainNavigator';
import store from './stateStore/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';

// for navigation optmization
enableScreens();

const App: () => Node = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
