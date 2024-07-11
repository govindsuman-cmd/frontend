import { View, Text } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Layout from '@/components/layout/Layout';
import { ProductsData } from '@/data/ProductData';
import { useLocalSearchParams } from 'expo-router';

export default function Product() {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Product Details',
    });
  }, [navigation]);
  const { id } = useLocalSearchParams<{ id: string }>();
  const [productDetails,setProductDetails]=useState([]);

  useEffect(() => {
    //find product details
    const getProudct = ProductsData.find((p) => {
      return p?.id == id;
    });
    setProductDetails(getProudct);
  }, [id]);


  if (!productDetails) {
    return (
      <Layout>
        <View>
          <Text>Product not found {id}</Text>
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      <View>
        <Text>{productDetails.id}</Text>
        <Text>{productDetails.title}</Text>
        
        {/* Add more product details as needed */}
      </View>
    </Layout>
  );
}
