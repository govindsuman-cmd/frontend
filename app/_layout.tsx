import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Index from "./index"
import Login from './login'
import Signin from './signin'
import Home from './home'

const Stack = createStackNavigator()

export default function RootLayout() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="index" options={{ title: 'Landing Page' }} component={Index} />
      <Stack.Screen name="login" options={{ title: 'Login Page' }} component={Login} />
      <Stack.Screen name="home" options={{ title: 'Home Page' }} component={Home} />
      <Stack.Screen name="signin" options={{ title: 'SignIn Page' }} component={Signin} />
      
    </Stack.Navigator>
  );
}
