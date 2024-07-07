import { View, Text, ViewBase, StatusBar } from 'react-native'
import React from 'react'
import Footer from './Footer'

export default function Layout({ children }) {
  return (<>
   <StatusBar/>
   <View>{children}</View>
   <Footer/>
  </>)
}