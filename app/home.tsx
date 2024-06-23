import { Text, View } from "react-native";
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TabFirst from "./tabfirst";
import TabSec from "./tabsec";

const Tab = createBottomTabNavigator()

export default function Home() {
  return (<Tab.Navigator initialRouteName="home">
      <Tab.Screen name="tabfirst" component={TabFirst}
        options={{
          tabBarLabel: 'Android',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="logo-android" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="tabsec" component={TabSec} 
        options={{
          tabBarLabel: 'IOS',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="logo-apple" color={color} size={size} />
          ),
        }}
      />
      
    </Tab.Navigator>);
}
