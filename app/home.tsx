import { Text, View } from "react-native";
import tw from 'twrnc';

export default function Home() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={tw `text-2xl`}>This is Home Page</Text>
    </View>
  );
}
