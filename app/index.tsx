import Banner from '@/components/Banner';
import Categories from '@/components/categories';
import Layout from '@/components/layout/Layout';
import Product from '@/components/Product';
import { Link } from 'expo-router';
import { View } from 'react-native';

export default function Root() {
return (<Layout>
  <View className=' mx-auto' >
    
    <View className='mx-auto bg-gray-200'>
    <View className=' h-[11vh]'>
      <Categories className='my-auto'/></View>
    <View><Banner/></View>
    <View className='mt-2 w-full bg-red-300'><Product/></View>
    </View>
  </View>
  </Layout>);
}
