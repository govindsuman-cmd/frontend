import { Stack } from 'expo-router';
import product from './screens/product';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        title:'home',
        headerShown: false,
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      {/* Optionally configure static options outside the route.*/}
      <Stack.Screen name="index" options={{title:"Home"}} />
      <Stack.Screen name='product' options={{title:"Product"}}/>
    </Stack>
  );
}
