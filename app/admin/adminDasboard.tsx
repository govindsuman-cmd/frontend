import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import ManageCourses from './ManageCourses';
import ManageStudents from './ManageStudents';
import ManageInstructors from './ManageInstructors';
import { FontAwesome } from '@expo/vector-icons';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Courses');

  const renderContent = () => {
    switch (activeTab) {
      case 'Courses':
        return <ManageCourses/>;
      case 'Students':
        return <ManageStudents/>;
      case 'Instructors':
        return <ManageInstructors/>;
      case 'Notifications':
        return <Text className="text-lg p-4">Notifications</Text>;
      default:
        return null;
    }
  };

  return (
    <Layout>
      {/* Navigation Bar */}
      <View className="flex flex-row justify-around bg-gray-800 p-4">
        {['Courses', 'Students', 'Instructors'].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
            <Text className={`text-white ${activeTab === tab ? 'font-bold' : ''}`}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
        {/* Bell Icon for Notifications */}
        <TouchableOpacity onPress={() => setActiveTab('Notifications')}>
          <FontAwesome 
            name="bell" 
            size={24} 
            color={activeTab === 'Notifications' ? 'white' : 'gray'} 
            style={{ marginTop: -3 }} // Adjust for alignment
          />
        </TouchableOpacity>
      </View>

      {/* Main Content Area */}
      <View className="flex-1 bg-white p-4">
        {renderContent()}
      </View>
    </Layout>
  );
}