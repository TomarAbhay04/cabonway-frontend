import { useNavigation } from '@react-navigation/native';
import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const otpInputs = useRef([]);

  const handleSendOtp = () => {
    const completePhoneNumber = `+91${phoneNumber}`;
    if (phoneNumber.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number.');
      return;
    }
    // Logic to send OTP with the completePhoneNumber
    setOtpSent(true);
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically move to the next input field
    if (value && index < 3) {
      otpInputs.current[index + 1].focus();
    }
  };

  return (
    <View className="flex-1 bg-white px-[30px] py-[10px]">
      {/* Back Arrow and Heading */}
      <View className="flex-row items-center mt-[79px] mb-[50px] w-[321px]">
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="ml-[15px] font-bold text-[24.53px] leading-[31px] text-black w-[360px]">
          Password Reset
        </Text>
      </View>

      {!otpSent ? (
        <>
          {/* Forgot Password Heading */}
          <View className="w-[360px] mb-[46px]">
            <Text className="font-bold text-[24px] leading-[26px] text-black">
              Forgot Password?
            </Text>
          </View>

          {/* Input Section */}
          <View className="w-[300px] h-auto py-[10px] px-[3px]">
            {/* Input Field */}
            <View className="flex-row items-center">
              <Text className="text-lg text-black mr-2">+91</Text>
              <TextInput
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Enter your number"
                keyboardType="phone-pad"
                className="flex-1 h-[46px] border border-gray-300 rounded-[8px] px-[20px] py-[10px] text-[16px] leading-[26px] text-black"
                maxLength={10}
              />
            </View>
            {/* Instruction Text */}
            <Text className="font-normal text-[12px] leading-[14.63px] text-[#666666] mt-[20px]">
              * We will send you a message to set or reset your new password.
            </Text>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSendOtp}
            className="w-[300px] h-auto bg-black rounded-[8px] py-[10px] mt-[20px]"
          >
            <Text className="text-lg font-bold text-white text-center">
              Submit
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          {/* OTP Section */}
          <View className="w-[360px] mt-[20px]">
            <Text className="font-bold text-[24px] leading-[26px] text-black">
              We have sent an OTP to reset your password
            </Text>
            <Text className="mt-[10px] text-[16px] leading-[26px] text-black">
              ******{phoneNumber.slice(-4)}
            </Text>

            {/* OTP Input Boxes */}
            <View className="flex-row justify-center gap-8 w-full mt-4">
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(el) => (otpInputs.current[index] = el)}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(index, value)}
                  maxLength={1}
                  keyboardType="number-pad"
                  className="w-[50px] h-[50px] border border-gray-300 rounded-[8px] text-center text-lg text-black"
                />
              ))}
            </View>

            {/* Instruction Text */}
            <Text className="font-normal text-[14px] leading-[14.63px] text-[#666666] mt-[20px] pr-8 mb-4">
              * We will send you a message to set or reset your new password.
            </Text>

            {/* Verify Button */}
            <TouchableOpacity
              className="w-[294px] h-[48px] bg-black rounded-[8px] py-[10px] mt-[20px]"
              onPress={() => {
                navigation.navigate('Login');
              }}
            >
              <Text className="text-lg font-bold text-white text-center">
                Verify
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default ForgotPassword;
