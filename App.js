import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


import MainNavigator from './navigation/mainNavigator';

export default function App() {

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <MainNavigator />
      </GestureHandlerRootView>
    </Provider>
  );
}
