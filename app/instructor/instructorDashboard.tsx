import { View, Text, Image, FlatList, Button, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { courseData } from '@/data/courseData';
import { router } from 'expo-router';

export default function InstructorDashboard() {
  const [courses, setCourses] = useState(courseData);

  const handleDelete = (courseId) => {
    Alert.alert(
      'Delete Course',
      'Are you sure you want to delete this course?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            const updatedCourses = courses.filter((course) => course.courseId !== courseId);
            setCourses(updatedCourses);
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleEdit = (courseId) => {
    // Implement edit functionality here
    alert(`Edit course with ID: ${courseId}`);
  };

  const handleAddCourse = () => {
    router.push('instructor/addNewCourse')
  };

  const renderCourseItem = ({ item }) => (
    <View className="bg-white p-4 mb-4 rounded-lg shadow-md">
      <Image
        source={{ uri: item.thumbnail }}
        className="w-full h-40 rounded-lg mb-4"
        resizeMode="cover"
      />
      <Text className="text-lg font-bold">{item.courseName}</Text>
      <Text className="text-gray-600">{item.courseDuration}</Text>
      <Text className="text-gray-800">Fee: ₹ {item.courseFee}</Text>

      <View className="flex-row mt-4">
        <TouchableOpacity
          onPress={() => handleEdit(item.courseId)}
          className="bg-yellow-500 p-2 rounded-lg mr-2"
        >
          <Text className="text-white">Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDelete(item.courseId)}
          className="bg-red-500 p-2 rounded-lg"
        >
          <Text className="text-white">Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <Layout>
      <View className="p-4 mb-[12vh]">
      <View className="bg-blue-600 p-4">
        <Text className="text-white text-2xl font-bold">Instructor Dashboard</Text>
      </View>

        <View className="my-6">
          <Button title="Add New Course" onPress={handleAddCourse} />
        </View>

        <FlatList
          data={courses}
          renderItem={renderCourseItem}
          keyExtractor={(item) => item.courseId}
          ListEmptyComponent={<Text>No courses available</Text>}
        />
      </View>
    </Layout>
  );
}
