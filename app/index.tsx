import * as React from 'react';
import { Button, Text, View } from "react-native";
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import Login from './login';
export default function Index() {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={tw `text-2xl`}>This is Landing page</Text>
      <Button title="Login" onPress={()=>navigation.navigate("login")}/>
    </View>
  );
}
