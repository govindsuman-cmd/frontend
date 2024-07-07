import { Tabs } from "expo-router"

export default function TabLayout(){
return(<Tabs screenOptions={{
        title:'rog',
        
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }} >
        <Tabs.Screen name="coma" options={{title:"manto", headerShown: false}}/>
        <Tabs.Screen name="bravo" options={{headerShown: false, title:"roma"}}/>
        </Tabs>)
}