// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import axios from 'axios';

// const Login = () => {
//   const navigation = useNavigation();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleLogin = async () => {
//     let valid = true;

//     if (!validateEmail(email)) {
//       setEmailError('Please enter a valid email address.');
//       valid = false;
//     } else {
//       setEmailError('');
//     }

//     if (password.length < 8) {
//       setPasswordError('Password must be at least 8 characters long.');
//       valid = false;
//     } else {
//       setPasswordError('');
//     }

//     if (valid) {
//       // Proceed with login
//        setLoading(true);
//        try {
//         const response = await axios.post('http://localhost:4000/api/users/login', {
//           email,
//           password,
//         });

//         const data  = response;

//         Alert.alert('Login Success', 'You have successfully logged in.');
//         console.log(data);
//         navigation.navigate('Home');
//        }
//         catch (error) {
//           if(error.response) {
//           Alert.alert('Login Failed', 'Invalid email or password.');
//         } else {
//           Alert.alert('Login Failed', 'An error occurred. Please try again.');
//         }
//       } finally {
//         setLoading(false);
//       }
//     } else {
//       Alert.alert('Validation Error', 'Please check your inputs.');
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', alignItems: 'center' }}>
//       {/* Heading Section */}
//       <View className="w-[360px] h-[46px] mt-[118px] px-1 py-2">
//         <Text className="font-bold text-2xl leading-6 text-black text-center w-full h-[26px]">
//           Login to your Account
//         </Text>
//       </View>

//       {/* Input Fields Section */}
//       <View className="w-[360px] h-auto mt-[16px] px-2 py-2 space-y-5 items-center">
//         {/* Email Input */}
//         <View className="w-[300px] h-[46px] border border-[#5E5E5E] rounded-[6px] px-4 justify-center">
//           <TextInput
//             placeholder="Email"
//             placeholderTextColor="#5E5E5E"
//             className="flex-1 font-medium text-base leading-6 text-black"
//             value={email}
//             onChangeText={setEmail}
//             onBlur={() => {
//               if (!validateEmail(email)) {
//                 setEmailError('Please enter a valid email address.');
//               } else {
//                 setEmailError('');
//               }
//             }}
//           />
//         </View>
//         {emailError ? <Text className="text-red-500 text-xs ">{emailError}</Text> : null}

//         {/* Password Input */}
//         <View className="w-[300px] h-[46px] border border-[#5E5E5E] rounded-[6px] px-4 justify-center">
//           <TextInput
//             placeholder="Password"
//             placeholderTextColor="#5E5E5E"
//             secureTextEntry={true}
//             className="font-medium text-base leading-6 w-full text-black"
//             value={password}
//             onChangeText={setPassword}
//             onBlur={() => {
//               if (password.length < 8) {
//                 setPasswordError('Password must be at least 8 characters long.');
//               } else {
//                 setPasswordError('');
//               }
//             }}
//           />
//         </View>
//         {passwordError ? <Text className="text-red-500 text-xs mt-1">{passwordError}</Text> : null}
//       </View>

//       {/* Forgot Password Section */}
//       <View className="w-[360px] h-auto py-4 items-center justify-center">
//         <TouchableOpacity
//           onPress={() => { navigation.navigate('ForgotPassword'); }}
//         >
//           <Text className="font-medium text-base leading-6 text-[#FF4B26]">Forgot Password?</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Login Button */}
//       <TouchableOpacity
//         className="w-[294px] h-[48px] bg-[#1A1B25] rounded-lg justify-center items-center mt-1"
//         onPress={handleLogin}
//       >
//         <Text className="font-semibold text-[20.57px] leading-[26.3px] text-white">Login</Text>
//       </TouchableOpacity>

//       {/* Login with OTP Section */}
//       <View className="w-[360px] h-auto py-4 items-center justify-center mt-[4px]">
//         <TouchableOpacity
//           className="flex-row items-center gap-2"
//           onPress={() => {
//             navigation.navigate('PhoneAuth', { otpLogin: true }); // Passing otpLogin: true
//           }}
//         >
//           <Icon name="call" size={16} color="#1A1B25" />
//           <Text className="font-medium text-base leading-6 text-[#1A1B25]">Login with OTP</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Don't Have an Account Section */}
//       <View style={{ marginTop: 'auto', paddingBottom: 80 }} className="items-center">
//         <Text className="font-medium text-base leading-6 text-[#1A1B25] mb-2">Don't have an account?</Text>

//         {/* Create Account Button */}
//         <TouchableOpacity
//           className="w-[294px] h-[48px] bg-[#1A1B25] rounded-lg justify-center items-center mt-1"
//           onPress={() => {
//             navigation.navigate('CreateAccount');
//           }}
//         >
//           <Text className="font-semibold text-[20.57px] leading-[26.3px] text-white">Create Account</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    console.log("Login button pressed, validating inputs...");
    
    let valid = true;

    if (!validateEmail(email)) {
      console.log("Invalid email format:", email);
      setEmailError('Please enter a valid email address.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (password.length < 4) {
      console.log("Password is too short:", password);
      setPasswordError('Password must be at least 8 characters long.');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      console.log("Input validation passed. Sending login request...");
      // Proceed with login
      setLoading(true);
      try {
        // const response = await axios.post('http://192.168.1.3:4000/api/users/login', {
        const response = await axios.post('https://cab-ontheway-backend.vercel.app/api/users/login', {
          email,
          password,
        });

        const data = response.data;

        // Save token to AsyncStorage
        await AsyncStorage.setItem('authToken', data.token);
        await AsyncStorage.setItem('userId', data._id);
        // await AsyncStorage.setItem('userId', data._Id);
        console.log("Response from server:", response.data);
        console.log('userId:', data._id);

        Alert.alert('Login Success', 'You have successfully logged in.');

        // Navigate to the home page on success
        // navigation.navigate('Home');
        navigation.navigate('Payment');
      } catch (error) {
        if (error.response) {
          console.log("Error response from server:", error.response.data);
          Alert.alert('Login Failed', 'Invalid email or password.');
        } else {
          console.log("Error during login request:", error.message);
          Alert.alert('Login Failed', 'An error occurred. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Validation failed. Showing alert to user.");
      Alert.alert('Validation Error', 'Please check your inputs.');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', alignItems: 'center' }}>
      {/* Heading Section */}
      <View className="w-[360px] h-[46px] mt-[118px] px-1 py-2">
        <Text className="font-bold text-2xl leading-6 text-black text-center w-full h-[26px]">
          Login to your Account
        </Text>
      </View>

      {/* Input Fields Section */}
      <View className="w-[360px] h-auto mt-[16px] px-2 py-2 space-y-5 items-center">
        {/* Email Input */}
        <View className="w-[300px] h-[46px] border border-[#5E5E5E] rounded-[6px] px-4 justify-center">
          <TextInput
            placeholder="Email"
            placeholderTextColor="#5E5E5E"
            className="flex-1 font-medium text-base leading-6 text-black"
            value={email}
            onChangeText={(text) => {
              console.log("Email input changed:", text);
              setEmail(text);
            }}
            onBlur={() => {
              if (!validateEmail(email)) {
                console.log("Invalid email on blur:", email);
                setEmailError('Please enter a valid email address.');
              } else {
                setEmailError('');
              }
            }}
          />
        </View>
        {emailError ? <Text className="text-red-500 text-xs ">{emailError}</Text> : null}

        {/* Password Input */}
        <View className="w-[300px] h-[46px] border border-[#5E5E5E] rounded-[6px] px-4 justify-center">
          <TextInput
            placeholder="Password"
            placeholderTextColor="#5E5E5E"
            secureTextEntry={true}
            className="font-medium text-base leading-6 w-full text-black"
            value={password}
            onChangeText={(text) => {
              console.log("Password input changed:", text);
              setPassword(text);
            }}
            onBlur={() => {
              if (password.length < 8) {
                console.log("Invalid password on blur:", password);
                setPasswordError('Password must be at least 8 characters long.');
              } else {
                setPasswordError('');
              }
            }}
          />
        </View>
        {passwordError ? <Text className="text-red-500 text-xs mt-1">{passwordError}</Text> : null}
      </View>

      {/* Forgot Password Section */}
      <View className="w-[360px] h-auto py-4 items-center justify-center">
        <TouchableOpacity
          onPress={() => { 
            console.log("Navigating to ForgotPassword screen");
            navigation.navigate('ForgotPassword'); 
          }}
        >
          <Text className="font-medium text-base leading-6 text-[#FF4B26]">Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity
        className="w-[294px] h-[48px] bg-[#1A1B25] rounded-lg justify-center items-center mt-1"
        onPress={handleLogin}
      >
        <Text className="font-semibold text-[20.57px] leading-[26.3px] text-white">
          {loading ? "Logging in..." : "Login"}
        </Text>
      </TouchableOpacity>

      {/* Login with OTP Section */}
      <View className="w-[360px] h-auto py-4 items-center justify-center mt-[4px]">
        <TouchableOpacity
          className="flex-row items-center gap-2"
          onPress={() => {
            console.log("Navigating to PhoneAuth screen for OTP login");
            navigation.navigate('PhoneAuth', { otpLogin: true }); // Passing otpLogin: true
          }}
        >
          <Icon name="call" size={16} color="#1A1B25" />
          <Text className="font-medium text-base leading-6 text-[#1A1B25]">Login with OTP</Text>
        </TouchableOpacity>
      </View>

      {/* Don't Have an Account Section */}
      <View style={{ marginTop: 'auto', paddingBottom: 80 }} className="items-center">
        <Text className="font-medium text-base leading-6 text-[#1A1B25] mb-2">Don't have an account?</Text>

        {/* Create Account Button */}
        <TouchableOpacity
          className="w-[294px] h-[48px] bg-[#1A1B25] rounded-lg justify-center items-center mt-1"
          onPress={() => {
            console.log("Navigating to CreateAccount screen");
            navigation.navigate('CreateAccount');
          }}
        >
          <Text className="font-semibold text-[20.57px] leading-[26.3px] text-white">Create Account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Login;
