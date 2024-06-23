import { Button, Text, View } from "react-native";
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
    const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={tw `text-2xl`}>This is Login Page</Text>
      
      <View style={tw `my-2`}>
      <Button 
      title="Go to Home page" 
      onPress={()=>{navigation.navigate("home")}}/>
      </View>
      <Button title="Sign In" onPress={()=>{navigation.navigate("signin")}}/>
    </View>
  );
}

