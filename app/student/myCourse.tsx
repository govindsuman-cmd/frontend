import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';

const purchasedCourses = [
  {
    courseId: '101',
    courseName: 'Introduction to Python',
    thumbnail: 'https://via.placeholder.com/400x300.png?text=Python+Course',
  },
  {
    courseId: '102',
    courseName: 'Web Development with React',
    thumbnail: 'https://via.placeholder.com/400x300.png?text=React+Course',
  },
  {
    courseId: '103',
    courseName: 'Data Science and Machine Learning',
    thumbnail: 'https://via.placeholder.com/400x300.png?text=Data+Science+Course',
  },
];

export default function MyCourse() {
  const [courses, setCourses] = useState(purchasedCourses);

  const handleCourseAccess = (courseId) => {
    // Navigate to the course details or content page
    alert(`Access course with ID: ${courseId}`);
  };

  return (
    <Layout>
      <ScrollView className="p-4">
      <View className="bg-blue-600 p-4 mb-5">
        <Text className="text-white text-2xl font-bold">My Learning Dashboard</Text>
      </View>
        {courses.map((course) => (
          <View key={course.courseId} className="mb-4">
            <Image
              source={{ uri: course.thumbnail }}
              className="w-full h-40 rounded-lg"
              resizeMode="cover"
            />
            <Text className="text-xl font-bold mt-2">{course.courseName}</Text>
            <TouchableOpacity
              onPress={() => handleCourseAccess(course.courseId)}
              className="bg-blue-500 p-2 rounded-lg mt-2"
            >
              <Text className="text-white text-center">Access Course</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </Layout>
  );
}
