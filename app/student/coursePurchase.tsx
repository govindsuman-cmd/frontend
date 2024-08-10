import { View, Text, Image, Button, ScrollView } from 'react-native';
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useLocalSearchParams } from 'expo-router';
import { courseData } from '@/data/courseData';

export default function CoursePurchase() {
  const { courseId } = useLocalSearchParams();
  // Find the course data based on the courseId
  const course = courseData.find((c) => c.courseId === courseId);

  // Handle payment button press
  const handlePayment = () => {
    alert('Proceeding to payment...');
    // Implement payment logic here
  };

  // If no course is found, handle it gracefully
  if (!course) {
    return (
      <Layout>
        <Text className="text-xl font-bold p-4">Course not found.</Text>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header Section */}
      <View className="bg-blue-600 p-4">
        <Text className="text-white text-2xl font-bold">Order Details</Text>
      </View>

      {/* Content Section */}
      <ScrollView className="p-4">
        {/* Course Thumbnail */}
        <Image
          source={{ uri: course.thumbnail }}
          className="w-full h-60 rounded-lg mb-4"
          resizeMode="cover"
        />

        <Text className="text-xl font-bold mb-2">Course Purchase</Text>
        <Text className="text-lg">Course Name: {course.courseName}</Text>
        <Text className="text-lg">Duration: {course.courseDuration}</Text>
        <Text className="text-lg">Fee: ₹ {course.courseFee}</Text>

        <View className="mt-4">
          <Text className="text-lg font-semibold">Summary:</Text>
          <Text className="text-gray-700 mt-1">
            You are about to purchase the course "{course.courseName}" for ${course.courseFee}.
          </Text>
        </View>

        <View className="mt-6">
          <Button title="Proceed to Payment" onPress={handlePayment} />
        </View>
      </ScrollView>
    </Layout>
  );
}
