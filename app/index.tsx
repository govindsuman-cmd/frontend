// Root.js
import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import Layout from '@/components/layout/Layout';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Root() {
  const [role, setRole] = useState('');

  const goto = (selectedRole) => {
    setRole(selectedRole);
    router.push({
      pathname: 'login',
      params: { role: selectedRole }
    });
  };

  return (
    <Layout>
      <View className='z-0 mx-auto h-1/2 w-full bg-blue-500'>
        <Text className='text-white text-4xl font-bold mx-auto mt-[10vh]'>Welcome</Text>
      </View>
      <View className='w-2/3 shadow-2xl py-8 bg-white border-1 rounded-lg h-fit relative mx-auto bottom-[220px]'>
        <TouchableOpacity
          onPress={() => goto('Admin')}
          className="flex-row w-4/5 mx-auto my-5 items-center bg-[#3d43f3] rounded-full px-4 py-2 shadow-md"
        >
          <Icon name="user-shield" size={24} color="white" style={{ marginRight: 8, marginLeft: 42 }} />
          <Text className="text-white text-center text-lg">Admin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => goto('Instructor')}
          className="flex-row w-4/5 mx-auto my-5 items-center bg-[#3d43f3] rounded-full px-4 py-2 shadow-md"
        >
          <Icon name="chalkboard-teacher" size={24} color="white" style={{ marginRight: 8, marginLeft: 42 }} />
          <Text className="text-white text-center text-lg">Instructor</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => goto('Student')}
          className="flex-row w-4/5 mx-auto my-5 items-center bg-[#3d43f3] rounded-full px-4 py-2 shadow-md"
        >
          <Icon name="graduation-cap" size={24} color="white" style={{ marginRight: 8, marginLeft: 42 }} />
          <Text className="text-white text-center text-lg">Student</Text>
        </TouchableOpacity>
      </View>
      
      {/* Company Logo */}
      <View className='flex items-center relative bottom-[15vh]'>
        <Image
          source={require('@/assets/images/mmjlogo.png')} // Update the path to your logo file
          className="w-48 h-48"
          resizeMode="contain"
        />
      </View>
    </Layout>
  );
}
