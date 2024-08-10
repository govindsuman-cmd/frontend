import { View, Text, ScrollView, Image, StyleSheet, Button } from 'react-native';
import React from 'react';
import { ProductsData } from '@/data/ProductData';
import { router } from 'expo-router';

export default function Product() {

  const handleButtonClick=(id)=>{
    router.push('login')
  }

  return (
    <ScrollView className='w-full'>
      <View style={styles.container}>
        {ProductsData.map((item, index) => (
          <View key={item.id} style={styles.card}>
            <Image source={{uri:item.image}} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            
            <Button onPress={()=>handleButtonClick(item.id)} title='Details'/>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Ensures cards wrap to the next line
    justifyContent: 'space-between', // Distributes cards evenly
  },
  card: {
    width: '48%', // Adjust width based on your desired card size
    margin: 5, // Add spacing between cards
    padding: 10, // Add padding within cards (optional)
    borderRadius: 10, // Add rounded corners (optional)
    backgroundColor: '#fff', // Set background color (optional)
    shadowColor: '#ccc', // Add shadow (optional)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  image: {
    width: '100%', // Ensures image fills the card width
    height: 150, // Adjust image height as needed
  },
  title: {
    marginTop: 10, // Add spacing between image and title
    fontSize: 16,
  },
});