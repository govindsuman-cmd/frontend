import { View, Text, TextInput, Image, Button, Switch, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import Layout from '@/components/layout/Layout';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';

export default function AddNewCourse() {
  const [courseDetails, setCourseDetails] = useState({
    name: '',
    description: '',
    price: '',
    streamName: '',
    status:'',
    thumbnail: null,
  });
  const [isPublic, setIsPublic] = useState(false);
  const [streams, setStreams] = useState([]);

  const handleNextStep = async () => {

      const formData = new FormData();
      formData.append('name', courseDetails.name);
      formData.append('description', courseDetails.description);
      formData.append('price', courseDetails.price);
      formData.append('streamName', courseDetails.streamName);
      formData.append('status', isPublic ? 'Published' : 'Draft');

      if (courseDetails.thumbnail) {
        formData.append('photo', {
          uri: courseDetails.thumbnail.uri,
          type: courseDetails.thumbnail.type,
          name: courseDetails.thumbnail.fileName || 'thumbnail.jpg',
        });
      }

      try {
        const token = await AsyncStorage.getItem('token');
        console.log('Retrieved Token:', token);
    
        if (!token) {
          Alert.alert('Error', 'No authentication token found');
          return;
        }

        const res = await axios.post('http://10.0.2.2:4000/api/v1/course/create-course', formData, {
          headers: { 'Content-Type': 'multipart/form-data',
             'Authorization': `${token.trim()}`
           },
        });
        router.push("instructor/instructorDashboard")
        console.log(res.data);
        Alert.alert('Success', 'Course created successfully');
      } catch (error) {
        console.log("formdata: ", formData)
        console.log(error.response ? error.response.data : error.message);
        Alert.alert('Error', 'Failed to create course');
      }         
  };

  const fetchAllStreams = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:4000/api/v1/stream/get-all-stream');
      if (response.data?.success) {
        const streams = response.data.stream;
        setStreams(streams);
        console.log('Fetched Streams:', streams);
      } else {
        console.log('Failed to fetch streams:', response.data?.message);
      }
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  useEffect(()=>{
    fetchAllStreams()
  },[])

  const handleSaveDraft = () => {
    Alert.alert('Draft Saved', 'Your course has been saved as a draft.');
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      const asset = result.assets[0];
      const imageType = asset.uri.split('.').pop();
  
      setCourseDetails({
        ...courseDetails,
        thumbnail: {
          uri: asset.uri,
          type: `image/${imageType}`,
          fileName: asset.fileName || `thumbnail.${imageType}`,
        },
      });
    }
  };
  

  return (
    <Layout>
      <ScrollView className="p-4">
          <View>
            <Text className="text-2xl font-bold mb-4">Step 1: Course Details</Text>
            <TextInput
              value={courseDetails.name}
              onChangeText={(text) => setCourseDetails({ ...courseDetails, name: text })}
              placeholder="Course name"
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
            <View className='border rounded-lg my-2 '>
            <Picker
              selectedValue={courseDetails.streamName}
              onValueChange={(itemValue) => setCourseDetails({ ...courseDetails, streamName: itemValue })}
              className="border-2 rounded-lg"
            >
              <Picker.Item label="Select Stream" value="" />
              {streams.map((stream) => (
                <Picker.Item key={stream._id} label={stream.name} value={stream.name} />
              ))}
            </Picker>
            </View>
            <TouchableOpacity onPress={handlePickImage} className="bg-blue-500 p-2 rounded-lg mb-4">
              <Text className="text-white text-center">Select Thumbnail</Text>
            </TouchableOpacity>
            {courseDetails.thumbnail ? (
              <Image
                source={{ uri: courseDetails.thumbnail.uri }}
                className="w-full h-60 rounded-lg mb-4"
                resizeMode="cover"
              />
            ) : null}
  
            <View className="flex-row items-center mb-4">
              <Text className="text-lg mr-4">Public:</Text>
              <Switch value={isPublic} onValueChange={setIsPublic} />
            </View>
            <TouchableOpacity onPress={handleSaveDraft} className="bg-yellow-500 p-2 rounded-lg mt-4">
              <Text className="text-white text-center">Save as Draft</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNextStep} className="bg-blue-600 p-2 rounded-lg mt-4 mb-9">
              <Text className="text-white text-center">Publish</Text>
            </TouchableOpacity>
          </View>
      </ScrollView>
    </Layout>
  );
}
