import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // For icons like arrow and eye
import { useNavigation } from '@react-navigation/native'; // For navigating between screens

const ChangePassword = () => {
  const navigation = useNavigation();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // Toggle functions for password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  // Function to handle password change
  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmNewPassword)  {
      Alert.alert('Validation Error', 'Current password is required.');
      return;
    }
    if(currentPassword.length < 8) {
      Alert.alert('Validation Error', 'Current password must be at least 8 characters long.');
      return;
    }

    if (newPassword.length < 8) {
      Alert.alert('Validation Error', 'New password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      Alert.alert('Validation Error', 'New password and confirm password do not match.');
      return;
    }

    // Proceed with password change logic
    Alert.alert('Success', 'Password changed successfully!');
    // navigation.navigate('SomeOtherScreen'); // Navigate to another screen if needed
  };

  return (
    <View className="flex-1 bg-white p-4">
      {/* Header Section */}
      <View className="flex-row items-center justify-normal mt-8">
        {/* Back Arrow */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        {/* Heading */}
        <Text className="text-2xl font-bold text-black ml-2" style={{ fontFamily: 'Gilroy-Bold' }}>
          Change Password
        </Text>
      </View>

      {/* Current Password Section */}
      <View className="w-full h-[66px] border-2 border-gray-800 rounded-lg py-1 px-2 mt-12">
        <View className="flex-row justify-between items-center">
          {/* Current Password Input */}
          <TextInput
            value={currentPassword}
            onChangeText={setCurrentPassword}
            secureTextEntry={!passwordVisible}
            placeholder="Enter current password"
            className="flex-1 text-lg text-black"
            placeholderTextColor="#000000"
          />
          {/* Eye Icon */}
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Icon name={passwordVisible ? 'visibility' : 'visibility-off'} size={24} color="#2A2A2A" />
          </TouchableOpacity>
        </View>
      </View>

      {/* New Password Section */}
      <View className="w-full h-[66px] border-2 border-gray-800 rounded-lg py-1 px-2 mt-5">
        <View className="flex-row justify-between items-center ">
          {/* New Password Input */}
          <TextInput
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={!newPasswordVisible}
            className="flex-1 text-lg text-black"
            placeholder="New password"
            placeholderTextColor="#000000"
          />
          {/* Eye Icon */}
          <TouchableOpacity onPress={toggleNewPasswordVisibility}>
            <Icon name={newPasswordVisible ? 'visibility' : 'visibility-off'} size={24} color="#2A2A2A" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Confirm New Password Section */}
      <View className="w-full h-[66px] border-2 border-gray-800 rounded-lg py-1 px-2 mt-5">
        <View className="flex-row justify-between items-center">
          {/* Confirm New Password Input */}
          <TextInput
            value={confirmNewPassword}
            onChangeText={setConfirmNewPassword}
            secureTextEntry={!confirmPasswordVisible}
            placeholder="Confirm new password"
            className="flex-1 text-lg text-black "
            placeholderTextColor="#000000"
          />
          {/* Eye Icon */}
          <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
            <Icon name={confirmPasswordVisible ? 'visibility' : 'visibility-off'} size={24} color="#2A2A2A" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Forgot Password Text */}
      <TouchableOpacity className="mt-5" onPress={() => { navigation.navigate('ForgotPassword') }}>
        <Text className="text-center text-red-500 font-semibold text-base" style={{ fontFamily: 'Montserrat' }}>
          Forgot Password?
        </Text>
      </TouchableOpacity>

      {/* Info Text */}
      <Text
        className="mt-5 text-center text-gray-800 text-base"
        style={{
          fontFamily: 'Gilroy-Regular',
          lineHeight: 21,
        }}
      >
        This is what is shown when people see your profile, your posts, and interact with you.
      </Text>

      {/* Change Password Button */}
      <TouchableOpacity
        className="mt-5 bg-black rounded-lg h-[50px] w-full justify-center items-center "
        onPress={handleChangePassword}
      >
        <Text className="text-white font-semibold text-lg" style={{ lineHeight: 20 }}>
          Change Password
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePassword;
