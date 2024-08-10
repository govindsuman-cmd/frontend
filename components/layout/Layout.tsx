import { View, StatusBar, StyleSheet } from 'react-native';
import React from 'react';
import Footer from './Footer';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          {children}
        </View>
        <Footer />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal:5
  },
  content: {
    flex: 1,
  },
});
