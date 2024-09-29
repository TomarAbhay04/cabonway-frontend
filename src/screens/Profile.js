import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal, Image } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({
    name: 'Tomar Abhay',
    role: 'Student',
    gender: 'Male',
    phoneNumber: '9876543210',
    email: 'abhay.tomar@gmail.com',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isLogoutDialogVisible, setIsLogoutDialogVisible] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
        try {
            const token = await AsyncStorage.getItem('authToken'); // Get token from AsyncStorage
            // const response = await axios.get('http://192.168.1.3:4000/api/users/profile', {
            const response = await axios.get('https://cab-ontheway-backend.vercel.app/api/users/profile', {
                headers: {
                    Authorization: `Bearer ${token}`, // Attach the token to the request
                },
            });
            setUserData({
                name: response.data.name || 'Tomar Abhay',
                phoneNumber: response.data.phoneNumber || '9876543210',
                email: response.data.email || 'abhay.tomar@gmail.com',
                role: response.data.role || 'Student',
                gender: response.data.gender || 'Male',
            });
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }
    fetchUserData();
}, []);

  const saveProfileData = async () => {
    try {
      await axios.post('https://your-backend-api.com/update-user', userData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  // const handleLogout = () => {
  //   setIsLogoutDialogVisible(true);
  // };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('userId');
      console.log('Token removed, user logged out');
      navigation.replace('Login'); // Redirect to Login screen
    } catch (error) {
      console.log('Error during logout:', error);
    }
  };


  const confirmLogout = () => {
    setIsLogoutDialogVisible(false);
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Header */}
        <View className="w-full h-[65.42px] justify-between flex-row items-center mt-8 px-4">
          <Text className="text-2xl font-bold text-black">Profile</Text>
          <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
            <Image source={require('../assets/icons/edit.png')} style={{ width: 28, height: 28 }} />
          </TouchableOpacity>
        </View>

        {/* Profile Image, Name, and Role */}
        <View className="flex-row items-center mt-[11.43px] px-4 w-full h-[54px]">
          <Image
            source={require('../assets/images/image.png')}
            style={{ width: 54, height: 54, borderRadius: 15.55 }}
          />
          <View className="ml-4 flex-1">
            <Text className="text-lg font-bold text-black">{userData.name}</Text>
            <Text className="text-base font-medium text-black mt-1">{userData.role}</Text>
          </View>
        </View>

        {/* Editable Profile Section */}
        <View className="mt-[18.43px] px-4">
          {/* Name Input */}
          <View className="w-full h-[72px] border border-gray-400 rounded-lg p-2 mb-4">
            <Text className="text-sm text-black px-1">Name</Text>
            <TextInput
              value={userData.name}
              editable={isEditing}
              onChangeText={(text) => setUserData({ ...userData, name: text })}
              className="text-lg text-black"
              placeholder="Enter your name"
            />
          </View>

          {/* Role Input */}
          <View className="w-full h-[72px] border border-gray-400 rounded-lg p-2 mb-4">
            <Text className="text-sm text-black px-1">Role</Text>
            <TextInput
              value={userData.role}
              editable={isEditing}
              onChangeText={(text) => setUserData({ ...userData, role: text })}
              className="text-lg text-black"
              placeholder="Enter your role"
              placeholderTextColor= '#000000'
             />
          </View>

          {/* Gender Selection */}
          <View className="w-full h-[72px] border border-gray-400 rounded-lg p-2 mb-4">
            <Text className="text-sm text-black px-1">Gender</Text>
            {isEditing ? (
              <Picker
                selectedValue={userData.gender}
                onValueChange={(itemValue) => setUserData({ ...userData, gender: itemValue })}
                style={{ height: 50, width: '100%', color: '#000000' }}
              >
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
            ) : (
              <Text className="text-lg text-black p-1">{userData.gender || 'Not specified'}</Text>
            )}
          </View>

          {/* Phone Number (Non-editable) */}
          <View className="w-full h-[72px] border border-gray-400 rounded-lg p-2 mb-4">
            <Text className="text-sm text-black px-1">Phone Number</Text>
            <Text className="text-lg text-black py-1 px-1">{userData.phoneNumber}</Text>
          </View>

          {/* Email (Non-editable) */}
          <View className="w-full h-[72px] border border-gray-400 rounded-lg p-2 mb-4">
            <Text className="text-sm text-black px-1">Email ID</Text>
            <Text className="text-lg text-black py-1 px-1">{userData.email}</Text>
          </View>

          {/* Change Password Section */}
          <TouchableOpacity
            onPress={() => navigation.navigate('ChangePassword')}
            className="w-full h-[40px] border border-gray-400 rounded-lg flex-row justify-between items-center p-2 mb-4"
          >
            <Text className="text-sm text-black px-2">Change Password</Text>
            <Icon name="arrow-forward-ios" size={20} color="black" />
          </TouchableOpacity>

          {/* Logout Button */}
          <View className="w-full justify-center items-center">
            <TouchableOpacity onPress={handleLogout}>
              <Text className="text-lg text-red-500">Logout</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Save Button (only visible when editing) */}
        {isEditing && (
          <TouchableOpacity
            onPress={saveProfileData}
            className="w-[90%] h-[56px] bg-blue-500 p-3 rounded-lg self-center mt-6"
          >
            <Text className="text-center text-white text-lg">Save Profile</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="flex-row justify-between items-center p-4 border-t border-gray-200 bg-white">
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={require('../assets/icons/home.png')} style={{ width: 32, height: 32 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CreatePost')}>
          <Image source={require('../assets/icons/create-post.png')} style={{ width: 32, height: 32 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image source={require('../assets/icons/profile.png')} style={{ width: 32, height: 32 }} />
        </TouchableOpacity>
      </View>

      {/* Logout Confirmation Modal */}
      <Modal
        transparent={true}
        visible={isLogoutDialogVisible}
        animationType="slide"
        onRequestClose={() => setIsLogoutDialogVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-gray-100 bg-opacity-50">
          <View className="w-[90%] bg-white p-6 rounded-lg">
            <Text className="text-lg font-bold text-center mb-6">Are you sure you want to leave?</Text>
            <TouchableOpacity
              onPress={confirmLogout}
              className="w-full bg-black p-4 mb-4 rounded"
            >
              <Text className="text-center text-white text-lg">Leave</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsLogoutDialogVisible(false)}
              className="w-full bg-white p-4 border border-black rounded"
            >
              <Text className="text-center text-black text-lg">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Profile;
