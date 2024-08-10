// ManageCourses.js
import { View, Text, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import React from 'react';
import { courseData } from '@/data/courseData'; // Make sure this is the correct path to your course data

export default function ManageCourses() {
  const handleReportIssue = (courseName) => {
    Alert.alert(
      'Report Issue',
      `Do you want to report an issue with the course: ${courseName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Report', onPress: () => console.log('Issue reported') },
      ]
    );
  };

  const renderCourse = ({ item }) => (
    <View className="bg-white p-4 my-2 rounded-lg shadow flex flex-row">
      <Image
        source={{ uri: item.thumbnail }}
        className="w-24 h-24 rounded-lg mr-4"
        resizeMode="cover"
      />
      <View className="flex-1">
        <Text className="text-lg font-bold">{item.courseName}</Text>
        <Text className="text-gray-600">Duration: {item.courseDuration}</Text>
        <Text className="text-gray-800">Fee: ₹ {item.courseFee}</Text>
        <View className="flex flex-row justify-end mt-2">
          <TouchableOpacity
            onPress={() => handleReportIssue(item.courseName)}
            className="bg-red-600 p-2 rounded-lg mx-1"
          >
            <Text className="text-white">Report Issue</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log('Examine Course', item.courseId)}
            className="bg-blue-600 p-2 rounded-lg mx-1"
          >
            <Text className="text-white">Examine</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View className="p-4">
      <FlatList
        data={courseData}
        keyExtractor={(item) => item.courseId}
        renderItem={renderCourse}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
