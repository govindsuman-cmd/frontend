import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import AntDesign from "react-native-vector-icons/AntDesign";
import { categoriesData } from '@/data/categoriesData '
import { Link, useRouter } from 'expo-router';
export default function Categories() {
  const router=useRouter();
  return (
    <ScrollView className=''
     horizontal={true} >
      <View className='flex flex-row gap-3 my-3'>{categoriesData.map((item)=>(<View key={item._id} 
      className='border-2 my-auto py-2 px-3 rounded-xl'>
        <TouchableOpacity onPress={() => router.push({
          pathname: '/coma',
          params: {id:item.name},
        })}>
              <AntDesign name={item.icon} size={20} />
              <Text className='ml-2 text-lg'>{item.name}</Text>
        </TouchableOpacity>
      </View>))}</View>
    </ScrollView>
  )
}