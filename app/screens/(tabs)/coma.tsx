import { View, Text } from 'react-native'
import React from 'react'
import Layout from '@/components/layout/Layout'
import { useLocalSearchParams } from 'expo-router'

export default function coma() {
 
  const { id } = useLocalSearchParams<{ id:string }>();

  return (
    <View>
      <Text>index inside tab {id}</Text>
    </View>
  )
}