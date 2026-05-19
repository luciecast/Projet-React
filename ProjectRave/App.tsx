import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store} from './store/store';

import Tabs from './src/navigation/Tabs';

export default function App() {
  return (
    <Provider store={store}>
      {/*<PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Tabs />
        </NavigationContainer>
      </PersistGate>*/}
      <NavigationContainer>
  <Tabs />
</NavigationContainer>

    </Provider>
  );
}
