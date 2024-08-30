import { View, Text, Image, FlatList, Button, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import axios from 'axios';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function InstructorDashboard() {
  const [courses, setCourses] = useState([]);

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
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem('token');
              if (!token) {
                Alert.alert('Error', 'No authentication token found');
                return;
              }

              // API call to delete the course
              const response = await axios.delete(`http://10.0.2.2:4000/api/v1/course/delete-course/${courseId}`, {
                headers: {
                  'Authorization': `${token.trim()}`, // Include the token in the request headers
                },
              });

              if (response.data.success) {
                // Remove the course from the local state
                const updatedCourses = courses.filter((course) => course._id !== courseId);
                setCourses(updatedCourses);
                Alert.alert('Success', 'Course deleted successfully');
              } else {
                Alert.alert('Error', 'Failed to delete the course');
              }
            } catch (error) {
              console.log('Error deleting course:', error.message);
              Alert.alert('Error', 'Error while deleting course');
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleEdit = (courseId) => {
    router.push({
      pathname:'instructor/editCourse',
      params: {id:courseId}
    })
  };

  const handleAddCourse = () => {
    router.push('instructor/addNewCourse');
  };

  const getAllCourses = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      if (!token) {
        Alert.alert('Error', 'No authentication token found');
        return;
      }

      const response = await axios.get('http://10.0.2.2:4000/api/v1/course/get-course-instructor-wise', {
        headers: {
          'Authorization': `${token.trim()}`, // Include the token in the request headers
        },
      });
      if (response.data.success) {
        const courses = response.data.courses;
    
        setCourses(courses); // Assuming `setCourses` updates the state with the fetched courses
      } else {
        console.log('Failed to fetch courses');
      }
    } catch (error) {
      console.log('Error found in fetching courses:', error.message);
    }
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  const renderCourseItem = ({ item }) => (
    <View className="bg-white p-4 mb-4 rounded-lg shadow-md">
      <Image
        source={{ uri: item.thumbnail }}
        className="w-full h-40 rounded-lg mb-4"
        resizeMode="cover"
      />
      <Text className="text-lg font-bold">{item.name}</Text>
      <Text className="text-gray-600">{item.description}</Text>
      <Text className="text-gray-800">Fee: ₹ {item.price}</Text>

      <View className="flex-row mt-4">
        <TouchableOpacity
          onPress={() => handleEdit(item._id)}
          className="bg-yellow-500 p-2 rounded-lg mr-2"
        >
          <Text className="text-white">Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDelete(item._id)}
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
          keyExtractor={(item) => item._id}
          ListEmptyComponent={<Text>No courses available</Text>}
        />
      </View>
    </Layout>
  );
}
