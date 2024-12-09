import React from 'react';
import AppNavigator from './src/routes/navigation/AppNavigator';
import {PaperProvider} from 'react-native-paper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import store from './src/controller/store';
function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <PaperProvider>
          <AppNavigator />
        </PaperProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;
