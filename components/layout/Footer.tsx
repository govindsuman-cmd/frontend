import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import Icon from 'react-native-vector-icons/FontAwesome';

const FooterContainer = styled(View);
const FooterText = styled(Text);
const FooterButton = styled(TouchableOpacity);

export default function Footer() {
  return (
    <FooterContainer className="flex-row items-center justify-between p-4 bg-gray-800">
      <FooterButton className="flex-row items-center">
        <Icon name="home" size={20} color="#fff" />
        <FooterText className="text-white ml-2">Home</FooterText>
      </FooterButton>
      <FooterButton className="flex-row items-center">
        <Icon name="search" size={20} color="#fff" />
        <FooterText className="text-white ml-2">Search</FooterText>
      </FooterButton>
      <FooterButton className="flex-row items-center">
        <Icon name="user" size={20} color="#fff" />
        <FooterText className="text-white ml-2">Profile</FooterText>
      </FooterButton>
    </FooterContainer>
  );
}
