import { Button, Text, View } from "react-native";
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

export default function TabFirst() {
   
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={tw `text-2xl`}>This is Tab 1</Text>
      
    </View>
  );
}
