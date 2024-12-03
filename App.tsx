import React from 'react';
import AppNavigator from './src/routes/navigation/AppNavigator';
import { PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App(): React.JSX.Element {
return(

<GestureHandlerRootView>
  <PaperProvider>

  <AppNavigator/>
  </PaperProvider>
  </GestureHandlerRootView>


)
}

export default App;
