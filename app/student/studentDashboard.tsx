import { View, Text, Image, ScrollView, TouchableOpacity, Button } from 'react-native';
import React from 'react';
import Layout from '@/components/layout/Layout';
import { router, useLocalSearchParams } from 'expo-router';
import { courseData } from '@/data/courseData';

export default function StudentDashboard() {
  // Use the useLocalSearchParams hook to access the role parameter
  const { role } = useLocalSearchParams();

  return (
    <Layout>
      <View className="bg-blue-600 p-4">
        <Text className="text-white text-2xl font-bold">Courses</Text>
      </View>
      <View className='my-5 w-2/3 mx-auto'>
      <Button title='Go To My Learning Dashboard ' onPress={()=>router.push({
        pathname:"student/myCourse"
      })}/>
      </View>
      <ScrollView className="flex flex-col">
        {courseData.map((item) => (
          <TouchableOpacity
            key={item.courseId}
            className="bg-white shadow-lg rounded-lg p-4 m-2 w-full md:w-1/2 lg:w-1/3"
           onPress={()=>router.push({
            pathname:"student/courseDetails",
            params: {courseId:item.courseId}
           })}
          >
            <Image
              source={{ uri: item.thumbnail }}
              className="w-full h-40 rounded-lg"
              resizeMode="cover"
            />
            
            <Text className="text-lg font-semibold mt-2">{item.courseName}</Text>
            <Text className="text-gray-600 mt-1">{item.courseDuration}</Text>
            <Text className="text-gray-800 mt-2">Fee: ₹ {item.courseFee}</Text>
            <Text className="text-gray-700 mt-1">{item.courseDescription}</Text>
            <Text className="text-yellow-500 mt-2">Rating: {item.courseRating}⭐</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Layout>
  );
}
