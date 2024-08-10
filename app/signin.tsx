import { Button, Text, TouchableOpacity, View } from "react-native";
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect, useState } from "react";
import InputBox from "@/components/InputBox";
import { router } from "expo-router";

export default function Login() {
       
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('')

    const handleSignIn=()=>{
      if(!email||!password||!confirmPassword){
        return alert("Please enter all fields")
      }
      router.push('login')
    }

  return (
    <View
      style={{
        flex: 1,
        marginTop:245,
        alignItems: "center",
      }}
    >
      <Text style={tw `text-2xl`}>SignIn</Text>  

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
      <InputBox
       value={confirmPassword}
       setValue={setConfirmPassword}
       autoComplete={password}
       secureTextEntry={true}
       placeholder={'Enter your Password'}
      />
         
      <TouchableOpacity className='bg-blue-500 mt-2 px-3 py-2 rounded-lg'
        onPress={handleSignIn}
      >
        <Text className='text-white'>Sign In</Text>
      </TouchableOpacity>

    </View>
  );
}

