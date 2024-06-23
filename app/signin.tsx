import { Text, View } from "react-native";
import tw from 'twrnc';

export default function Signin() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={tw `text-2xl`}>This is SignIn Page</Text>
    </View>
  );
}
