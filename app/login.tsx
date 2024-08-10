import { Button, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect, useState } from "react";
import InputBox from "@/components/InputBox";
import { router, useLocalSearchParams } from "expo-router";
import axios from 'axios';
import { useAuth } from "@/context/auth";
import Layout from "@/components/layout/Layout";

export default function Login() {

  const { role } = useLocalSearchParams();

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Login',
    });
  }, [navigation]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [auth, setAuth] = useAuth();

  const handleLogin = async (e) => {
    if (!email || !password) {
      return alert("Please enter all fields");
    }

    try {
      // Here you can make an API call to verify the email and password

      if (role === 'Admin') {
        router.push({
          pathname:'admin/adminDasboard',
          params: { role: role }
        }) // Navigate to 'coma' if role is Admin
      } else if (role === 'Student') {
        router.push({
          pathname:'student/studentDashboard',
          params: { role: role }
        }); // Navigate to product screen if role is Student
      } else if (role==='Instructor'){
        router.push({
          pathname:'instructor/instructorDashboard',
          params: { role: role }
        })
      } 
      else {
        alert("Invalid role");
      }
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  }

  return (
    <Layout>
      <View
        style={{
          flex: 1,
          marginTop: 245,
          alignItems: "center",
        }}
      >
        <Text style={tw `text-2xl`}>Login as {role}</Text>

        <InputBox
          autoComplete={email}
          value={email}
          setValue={setEmail}
          placeholder={'Enter your Email Address'}
        />
        <InputBox
          value={password}
          setValue={setPassword}
          autoComplete={password}
          secureTextEntry={true}
          placeholder={'Enter your Password'}
        />

        <TouchableOpacity className='bg-blue-500 mt-2 px-3 py-2 rounded-lg'
          onPress={handleLogin}
        >
          <Text className='text-white'>Login</Text>
        </TouchableOpacity>

        <Text className='mt-4'>
          Not a user yet ? Please{" "}
          <Text className='text-blue-500'
            onPress={() => router.push('signin')}
          >
            Register!
          </Text>
        </Text>
      </View>
    </Layout>
  );
}
