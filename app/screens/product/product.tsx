import { View, Text } from 'react-native'
import React from 'react'
import Layout from '@/components/layout/Layout'
import Product from '@/components/Product'
import { ProductsData } from '@/data/ProductData'

export default function product() {
  return (
    <Layout>
      <Text>product tab</Text>
      <View>{ProductsData.map((item)=><Text>{item.title}</Text>)}</View>
    </Layout>
  )
}