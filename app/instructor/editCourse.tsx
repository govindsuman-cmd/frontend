import { View, Text, Image, TextInput, Button, StyleSheet, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

export default function EditCourse() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation(); 
  const [courseDetails, setCourseDetails] = useState({
    name: '',
    description: '',
    price: '',
    streamName: '',
    status: '',
    thumbnail: null
  });
  const [newThumbnail, setNewThumbnail] = useState(null);

  const fetchCourseDetails = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:4000/api/v1/course/get-single-course/${id}`);
      if (response.data.success) {
        const course = response.data.course;
        setCourseDetails({
          name: course.name,
          description: course.description,
          price: course.price,
          streamName: course.stream.name,
          status: course.status,
          thumbnail: course.thumbnail
        });
      }
    } catch (error) {
      console.error('Error fetching course details:', error);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, [id]);

  const handleInputChange = (name, value) => {
    setCourseDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      const imageType = asset.uri.split('.').pop();
      setNewThumbnail({
          uri: asset.uri,
          type: `image/${imageType}`,
          fileName: asset.fileName || `thumbnail.${imageType}`,
       });
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', courseDetails.name);
    formData.append('description', courseDetails.description);
    formData.append('price', courseDetails.price);
    formData.append('streamName', courseDetails.streamName);
    formData.append('status', courseDetails.status);

    if (newThumbnail) {
      formData.append('thumbnail', {
        uri: newThumbnail.uri,
        type: newThumbnail.type || 'image/jpeg', // Default to 'image/jpeg' if type is undefined
        name: newThumbnail.fileName || 'image.jpg'
      });
    }

    try {
      const response = await axios.put(`http://10.0.2.2:4000/api/v1/course/update-course/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.data.success) {
        Alert.alert('Success', 'Course updated successfully!');
        navigation.goBack();
        fetchCourseDetails();
      } else {
        Alert.alert('Error', 'Failed to update course.');
      }
    } catch (error) {
      console.error('Error updating course:', error);
      console.log(formData.photo)
      Alert.alert('Error', 'An error occurred.');
    }
  };

  return (
    <Layout>
      <View style={styles.container}>
        <Text className='text-2xl w-fit mx-auto font-bold'>Edit Course</Text>
        {courseDetails.thumbnail && !newThumbnail && (
          <Image source={{ uri: courseDetails.thumbnail }} style={styles.thumbnail} className='mx-auto' />
        )}
        {newThumbnail && (
          <Image source={{ uri: newThumbnail.uri }} style={styles.thumbnail} className='h-1/3 w-fit' />
        )}
        <View className='my-4'>
          <Button title="Change Thumbnail" onPress={handleImagePick} />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Course Name"
          value={courseDetails.name}
          onChangeText={(text) => handleInputChange('name', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={courseDetails.description}
          onChangeText={(text) => handleInputChange('description', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          keyboardType="numeric"
          value={courseDetails.price.toString()}
          onChangeText={(text) => handleInputChange('price', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Stream Name"
          value={courseDetails.streamName}
          onChangeText={(text) => handleInputChange('streamName', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Status"
          value={courseDetails.status}
          onChangeText={(text) => handleInputChange('status', text)}
        />
        <Button title="Update Course" onPress={handleSubmit} />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  
  thumbnail: {
    // width: 150,
    
    resizeMode: 'cover',
    marginVertical: 10,
    // marginHorizontal:110
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8
  }
});
