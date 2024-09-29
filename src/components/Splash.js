import React, { useEffect } from 'react';
import { View, Image, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     navigation.replace('Login'); // Replace 'Login' with the actual route name for your login screen
  //   }, 2000);

  //   return () => clearTimeout(timer);
  // }, [navigation]);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          console.log('Token found, navigating to Home');
          // Optionally verify the token with the backend here
          navigation.replace('Home'); // Redirect to Home if token exists
        } else {
          console.log('No token found, navigating to Login');
          navigation.replace('Login'); // Redirect to Login if no token
        }
      } catch (error) {
        console.log('Error fetching token from storage:', error);
        navigation.replace('Login');
      }
    };

    checkToken();
  }, [navigation]);

  return (
    <View className="flex-1 bg-white justify-center items-center">
      <StatusBar hidden />
      <Image
        source={require('../assets/images/Splash.png')}
        className="w-[165px] h-[68.66px] absolute"
        // style={{ top: 322.62, left: 94 }}
      />
    </View>
  );
};

export default Splash;
