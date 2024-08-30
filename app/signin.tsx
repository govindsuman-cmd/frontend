import { Button, ScrollView, Text, TouchableOpacity, View } from "react-native";
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect, useState, useEffect } from "react";
import InputBox from "@/components/InputBox";
import { router } from "expo-router";
import { REACT_APP_API_ } from '@env';
import axios from "axios";

export default function Signup() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [answer, setAnswer] = useState('');  // Assuming this is a security answer
  const [role, setRole] = useState('');  // Admin, Student, Instructor, etc.

  // Log the value of process.env.REACT_APP_API_ when the component loads
  useEffect(() => {
    console.log("API URL SIGN UP :", process.env.REACT_APP_API_);
  }, []);

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword || !phone || !address || !answer || !role) {
      return alert("Please fill out all fields");
    }

    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      // Send signup request to backend
      const res = await axios.post(`http://10.0.2.2:4000/api/v1/auth/signup`, {
        name, email, password, phone, address, answer, role
      });

      alert(res.data.message);

      // After successful registration, navigate to login
      if (res.data.success) {
        router.push('login');
      }
    } catch (error) {
      console.error(error);
      alert("Signup failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <View
      style={{
        flex: 1,
        marginTop: 100,
        alignItems: "center",
      }}
    >
     <ScrollView className='w-full'>
     <Text className='w-fit mx-auto text-2xl font-bold my-2'>Sign Up</Text>

<InputBox
  value={name}
  setValue={setName}
  placeholder={'Enter your Name'}
/>
<InputBox
  value={email}
  setValue={setEmail}
  placeholder={'Enter your Email Address'}
/>
<InputBox
  value={password}
  setValue={setPassword}
  secureTextEntry={true}
  placeholder={'Enter your Password'}
/>
<InputBox
  value={confirmPassword}
  setValue={setConfirmPassword}
  secureTextEntry={true}
  placeholder={'Confirm your Password'}
/>
<InputBox
  value={phone}
  setValue={setPhone}
  placeholder={'Enter your Phone Number'}
/>
<InputBox
  value={address}
  setValue={setAddress}
  placeholder={'Enter your Address'}
/>
<InputBox
  value={answer}
  setValue={setAnswer}
  placeholder={'Enter your Security Answer'}
/>
<InputBox
  value={role}
  setValue={setRole}
  placeholder={'Enter your Role (Student, Instructor)'}
/>

<TouchableOpacity className='bg-blue-500 mt-2 px-3 py-2 w-24 mx-auto my-3 rounded-lg'
  onPress={handleSignUp}
>
  <Text className='text-white font-bold w-fit mx-auto'>Sign Up</Text>
</TouchableOpacity>
     </ScrollView>
    </View>
  );
}
