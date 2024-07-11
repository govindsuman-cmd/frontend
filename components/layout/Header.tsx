import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Header() {
  
  const [searchText,setSearchText]=useState('')
  
  const handleSearch=()=>{
    console.log(searchText)
    setSearchText('')
  }

  return (
    <View style={styles.container} className='mb-3' >
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={handleSearch}>
        <Icon name="search" size={20} color="#000" style={styles.icon} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={(text)=>setSearchText(text)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    width: '80%',
    alignSelf: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
});
