import { View, Text, TextInput, Image, Button, Switch, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';

export default function AddNewCourse() {
  const [step, setStep] = useState(1);
  const [courseDetails, setCourseDetails] = useState({
    title: '',
    description: '',
    price: '',
    thumbnail: null
  });
  const [isPublic, setIsPublic] = useState(false);

  const handleNextStep = () => {
    if (step === 1) {
      // Validate Step 1 fields
      if (!courseDetails.title || !courseDetails.description || !courseDetails.price || !courseDetails.thumbnail) {
        Alert.alert('Error', 'Please fill out all fields');
        return;
      }
      setStep(2);
    } else {
      // Handle Save or Publish
      Alert.alert('Success', 'Course has been saved or published');
      // Add functionality to save/publish the course
    }
  };

  const handleSaveDraft = () => {
    // Implement save draft functionality here
    Alert.alert('Draft Saved', 'Your course has been saved as a draft.');
  };

  // Simulate opening the phone storage to pick an image
  const handlePickImage = () => {
    // This is where you would trigger the actual image picker functionality
    Alert.alert('Image Picker', 'Simulate opening phone storage to pick an image.');
    
    // For demonstration purposes, let's just set a static image URI
    setCourseDetails({
      ...courseDetails,
      thumbnail: 'https://via.placeholder.com/400x300.png?text=Course+Thumbnail'
    });
  };

  return (
    <Layout>
      <ScrollView className="p-4">
        {step === 1 ? (
          <View>
            <Text className="text-2xl font-bold mb-4">Step 1: Course Details</Text>
            <TextInput
              value={courseDetails.title}
              onChangeText={(text) => setCourseDetails({ ...courseDetails, title: text })}
              placeholder="Course Title"
              className="border p-2 mb-4 rounded-lg"
            />
            <TextInput
              value={courseDetails.description}
              onChangeText={(text) => setCourseDetails({ ...courseDetails, description: text })}
              placeholder="Course Description"
              multiline
              numberOfLines={6}
              className="border pl-2 pb-4 mb-4 rounded-lg"
            />
            <TextInput
              value={courseDetails.price}
              onChangeText={(text) => setCourseDetails({ ...courseDetails, price: text })}
              placeholder="Course Price"
              keyboardType="numeric"
              className="border p-2 mb-4 rounded-lg"
            />
            <TouchableOpacity onPress={handlePickImage} className="bg-blue-500 p-2 rounded-lg mb-4">
              <Text className="text-white text-center">Select Thumbnail</Text>
            </TouchableOpacity>
            {courseDetails.thumbnail ? (
              <Image
                source={{ uri: courseDetails.thumbnail }}
                className="w-full h-60 rounded-lg mb-4"
                resizeMode="cover"
              />
            ) : null}
            <Button title="Next" onPress={handleNextStep} />
          </View>
        ) : (
          <View>
            <Text className="text-2xl font-bold mb-4">Step 2: Publish Settings</Text>
            <View className="flex-row items-center mb-4">
              <Text className="text-lg mr-4">Public:</Text>
              <Switch value={isPublic} onValueChange={setIsPublic} />
            </View>
            <Button title="Publish" onPress={handleNextStep} />
            <TouchableOpacity onPress={handleSaveDraft} className="bg-gray-500 p-2 rounded-lg mt-4">
              <Text className="text-white text-center">Save as Draft</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </Layout>
  );
}
