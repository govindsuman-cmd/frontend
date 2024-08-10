import { View, Text, Image, ScrollView, Button, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { router, useLocalSearchParams } from 'expo-router';
import { courseData } from '@/data/courseData'; // Ensure you have access to course data
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function CourseDetails() {
  const { courseId } = useLocalSearchParams(); // Get the courseId from the route params

  // Find the course data based on the courseId
  const course = courseData.find((c) => c.courseId === courseId);

  // State to manage the visibility of each FAQ answer, initially all hidden
  const [faqVisibility, setFaqVisibility] = useState(
    course ? course.faqs.reduce((acc, _, index) => ({ ...acc, [index]: false }), {}) : {}
  );

  // Toggle visibility of the answer for a specific FAQ
  const toggleFaqVisibility = (index) => {
    setFaqVisibility((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
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
      <ScrollView className="p-4">
        <Image
          source={{ uri: course.thumbnail }}
          className="w-full h-60 rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-2xl font-bold mt-4">{course.courseName}</Text>
        <Text className="text-lg text-gray-600 mt-2">{course.courseDuration}</Text>
        <Text className="text-gray-800 text-2xl mt-2">Fee: ₹ {course.courseFee}</Text>
        <Text className="text-gray-700 text-lg mt-2">{course.courseDescription}</Text>
        <Text className="text-yellow-500 text-lg my-2">Rating: {course.courseRating}⭐</Text>

        <Button title="Buy Now" onPress={() => router.push({
          pathname:"student/coursePurchase",
          params:{courseId:course.courseId}
        })} />
        <Text className="text-xl font-bold mt-4">Course Features:</Text>
        {course.features.map((feature, index) => (
          <Text key={index} className="text-gray-700 mt-1">- {feature}</Text>
        ))}

        {/* What You'll Learn Section */}
        <Text className="text-xl font-bold mt-4">What You'll Learn:</Text>
        {course.whatYoullLearn.map((chapter, index) => (
          <View key={index} className="mt-4">
            <Text className="text-lg font-semibold">{chapter.chapterTitle}</Text>
            {chapter.topics.map((topic, idx) => (
              <Text key={idx} className="text-gray-700 mt-1">- {topic}</Text>
            ))}
          </View>
        ))}

        {/* FAQ Section */}
        <Text className="text-xl font-bold mt-4">FAQs:</Text>
        <View className='mb-12'>
        {course.faqs.map((faq, index) => (
          <View key={index} className="mt-4">
            <TouchableOpacity onPress={() => toggleFaqVisibility(index)} className="flex-row items-center justify-between">
              <Text className="text-lg font-semibold flex-1">{faq.question}</Text>
              <FontAwesome
                name={faqVisibility[index] ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="gray"
              />
            </TouchableOpacity>
            {faqVisibility[index] && (
              <Text className="text-gray-700 mt-1">{faq.answer}</Text>
            )}
          </View>
        ))}
        </View>
      </ScrollView>
    </Layout>
  );
}
