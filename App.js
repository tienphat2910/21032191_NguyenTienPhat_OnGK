import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Screen01 from './screens/Screen01'
import Screen02 from './screens/Screen02'

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Screen02'
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Screen01" component={Screen01}></Stack.Screen>
        <Stack.Screen name="Screen02" component={Screen02}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

