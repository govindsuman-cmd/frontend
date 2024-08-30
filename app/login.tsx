import { Button, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useLayoutEffect, useState } from "react";
import InputBox from "@/components/InputBox";
import { router, useLocalSearchParams } from "expo-router";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // To store token locally
import Layout from "@/components/layout/Layout";
import { REACT_APP_API_ } from '@env';

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

  const handleLogin = async () => {
    if (!email || !password) {
      return alert("Please enter all fields");
    }

    try {
      // Send login request to backend
      const res = await axios.post(`http://10.0.2.2:4000/api/v1/auth/login`, { email, password });

      // Get the token and user info from the response
      const { token, user } = res.data;
      // console.log(res)
      // Store the token in AsyncStorage
       await AsyncStorage.setItem('token', token);
      // Role-based redirection
      
        if (user.role === 'Admin') {
          router.push({
            pathname: 'admin/adminDasboard',
            params: { role: user.role }
          });
        } else if (user.role === 'Student') {
          router.push({
            pathname: 'student/studentDashboard',
            params: { role: user.role }
          });
        } else if (user.role === 'Instructor') {
          router.push({
            pathname: 'instructor/instructorDashboard',
            params: { role: user.role }
          });
        } else {
          alert("Invalid role");
        }
      

    } catch (error) {
      console.error(JSON.stringify(error, null, 2)); // Full error details
      alert("Login failure: " + error.message);
    }
  };

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
          autoComplete="email"
          value={email}
          setValue={setEmail}
          placeholder={'Enter your Email Address'}
        />
        <InputBox
          value={password}
          setValue={setPassword}
          autoComplete="password"
          secureTextEntry={true}
          placeholder={'Enter your Password'}
        />

        <TouchableOpacity className='bg-blue-500 mt-2 px-3 py-2 rounded-lg'
          onPress={handleLogin}
        >
          <Text className='text-white'>Login</Text>
        </TouchableOpacity>

        <Text className='mt-4'>
          Not a user yet? Please{" "}
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
