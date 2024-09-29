import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

const CreateAccount = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Signup handler
  const handleSignup = async () => {
    // Logs for debugging
    console.log('Signup button pressed');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Phone Number:', phoneNumber);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);

    // Validate input fields
    let valid = true; // Ensure valid flag resets

    // Name validation
    if (!name) {
      Alert.alert('Error', 'Please enter your name.');
      console.log('Name validation failed');
      valid = false;
    }

    // Email validation
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      console.log('Email validation failed');
      valid = false;
    }

    // Phone number validation
    if (phoneNumber.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number.');
      console.log('Phone number validation failed');
      valid = false;
    }

    // Password validation
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long.');
      console.log('Password validation failed');
      valid = false;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      console.log('Confirm password validation failed');
      valid = false;
    }

    // Proceed if validation is successful
    if (valid) {
      console.log('All validations passed');
      console.log('Sending signup request');
      setLoading(true); // Show loading state

      try {
        // const response = await axios.post('http://192.168.1.3:4000/api/users/signup', {
        const response = await axios.post('https://cab-ontheway-backend.vercel.app/api/users/signup', {
          name,
          email,
          phoneNumber,
          password,
          confirmPassword,
        });
        console.log('Signup successful:', response.data);

        // Show success alert
        Alert.alert('Success', 'Account created successfully.');

        // Navigate to Home screen
        navigation.navigate('Home');
      } catch (error) {
        console.error('Signup failed:', error);
        Alert.alert('Error', 'Signup failed. Please try again.');
      } finally {
        setLoading(false); // Hide loading state
      }
    } else {
      console.log('Validation failed, no signup request sent');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
      {/* Heading Section */}
      <View className="w-full max-w-md mt-[118px] mb-6">
        <Text className="font-bold text-3xl leading-9 text-black text-center">
          Create your Account
        </Text>
      </View>

      {/* Input Fields */}
      <View className="w-full max-w-md px-6 pb-4 space-y-4 items-center">
        {/* Name Input */}
        <View className="w-[330px] h-[46px] border border-[#5E5E5E] rounded-[6px] px-4 justify-center">
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Name"
            placeholderTextColor="#5E5E5E"
            className="flex-1 font-[Gilroy-Medium] text-[16px] leading-[26px] text-black"
            style={{ paddingVertical: 10, paddingHorizontal: 20 }}
          />
        </View>

        {/* Email Input */}
        <View className="w-[330px] h-[46px] border border-[#5E5E5E] rounded-[6px] px-4 justify-center">
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor="#5E5E5E"
            className="flex-1 font-[Gilroy-Medium] text-base leading-[26px] text-black"
            style={{ paddingVertical: 10, paddingHorizontal: 20 }}
          />
        </View>

        {/* Phone Number Input */}
        <View className="w-[330px] h-[46px] border border-[#5E5E5E] rounded-[6px] px-4 justify-center">
          <TextInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Phone Number"
            placeholderTextColor="#5E5E5E"
            keyboardType="phone-pad"
            maxLength={10}
            className="flex-1 font-[Gilroy-Medium] text-[16px] leading-[26px] text-black"
            style={{ paddingVertical: 10, paddingHorizontal: 20 }}
          />
        </View>

        {/* Password Input */}
        <View className="w-[330px] h-[46px] border border-[#5E5E5E] rounded-[6px] px-4 justify-center">
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor="#5E5E5E"
            secureTextEntry={true}
            className="flex-1 font-[Gilroy-Medium] text-[16px] leading-[26px] text-black"
            style={{ paddingVertical: 10, paddingHorizontal: 20 }}
          />
        </View>

        {/* Confirm Password Input */}
        <View className="w-[330px] h-[46px] border border-[#5E5E5E] rounded-[6px] px-4 justify-center">
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm Password"
            placeholderTextColor="#5E5E5E"
            secureTextEntry={true}
            className="flex-1 font-[Gilroy-Medium] text-[16px] leading-[26px] text-black"
            style={{ paddingVertical: 10, paddingHorizontal: 20 }}
          />
        </View>
      </View>

      {/* Terms and Conditions */}
      <Text className="font-medium text-sm leading-5 mb-5 px-0.5 text-black mx-2">
        By clicking the Sign up button, you agree to the platform's Terms and Conditions.
      </Text>

      {/* Signup Button */}
      <View className="w-full h-auto py-4 items-center justify-center mt-[4px]">
        <TouchableOpacity
          onPress={handleSignup}
          className="w-[344px] h-[56px] bg-[#1A1B25] rounded-lg justify-center items-center px-6 mt-2"
        >
          <Text className="text-[20.57px] leading-[26.3px] text-white">Sign up</Text>
        </TouchableOpacity>

        {/* Signup with OTP Button */}
        <TouchableOpacity
          className="flex-row items-center gap-2 mt-[5px]"
          onPress={() => {
            navigation.navigate('PhoneAuth', { isSigningUp: true });
          }}
        >
          <Icon name="call" size={16} color="#1A1B25" />
          <Text className="font-medium text-base leading-6 text-[#1A1B25]">Signup with OTP</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreateAccount;


// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import axios from 'axios';

// const CreateAccount = () => {
//   const navigation = useNavigation();
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleSignup = async () => {

//     // Validate input fields
//     let valid = true;


//     if (!name) {
//       Alert.alert('Error', 'Please enter your name.');
//       return;
//     }
//     if (!validateEmail(email)) {
//       Alert.alert('Error', 'Please enter a valid email address.');
//       return;
//     }
//     if (phoneNumber.length !== 10) {
//       Alert.alert('Error', 'Please enter a valid 10-digit phone number.');
//       return;
//     }
//     if (password.length < 6) {
//       Alert.alert('Error', 'Password must be at least 6 characters long.');
//       return;
//     }
//     if (password !== confirmPassword) {
//       Alert.alert('Error', 'Passwords do not match.');
//       return;
//     }

//     // Send signup request
//     if(valid){
//       console.log('Signup request:', { name, email, phoneNumber, password });
//       setLoading(true);

//       try {
//         const response = await axios.post('http://192.168.1.3/api/users/signup', {
//           name,
//           email,
//           phoneNumber,
//           password,
//         });
//         console.log('Signup successful:', response.data);

//         // Redirect to Home screen
//         navigation.navigate('Home');
//     }
//     catch (error) {
//       console.error('Signup failed:', error);
//       Alert.alert('Error', 'Signup failed. Please try again.');
//     }
//     finally {
//       setLoading(false);
//     }
//   };
// }

//   return (
//     <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
//       {/* Heading Section */}
//       <View className="w-full max-w-md mt-[118px] mb-6">
//         <Text className="font-bold text-3xl leading-9 text-black text-center">
//           Create your Account
//         </Text>
//       </View>

//       {/* Input Fields */}
//       <View className="w-full max-w-md px-6 pb-4 space-y-4 items-center">
//         {/* Name Input */}
//         <View className="w-[330px] h-[46px] border border-[#5E5E5E] rounded-[6px] px-4 justify-center ">
//           <TextInput
//             value={name}
//             onChangeText={setName}
//             placeholder="Name"
//             placeholderTextColor="#5E5E5E"
//             className="flex-1 font-[Gilroy-Medium] text-[16px] leading-[26px] text-black"
//             style={{ paddingVertical: 10, paddingHorizontal: 20 }}
//           />
//         </View>

//         {/* Email Input */}
//         <View className="w-[330px] h-[46px] border border-[#5E5E5E] rounded-[6px] px-4 justify-center">
//           <TextInput
//             value={email}
//             onChangeText={setEmail}
//             placeholder="Email"
//             placeholderTextColor="#5E5E5E"
//             className="flex-1 font-[Gilroy-Medium] text-base leading-[26px] text-black"
//             style={{ paddingVertical: 10, paddingHorizontal: 20 }}
//           />
//         </View>

//         {/* Phone Number Input */}
//         <View className="w-[330px] h-[46px] border border-[#5E5E5E] rounded-[6px] px-4 justify-center">
//           <TextInput
//             value={phoneNumber}
//             onChangeText={setPhoneNumber}
//             placeholder="Phone Number"
//             placeholderTextColor="#5E5E5E"
//             keyboardType="phone-pad"
//             maxLength={10}
//             className="flex-1 font-[Gilroy-Medium] text-[16px] leading-[26px] text-black"
//             style={{ paddingVertical: 10, paddingHorizontal: 20 }}
//           />
//         </View>

//         {/* Password Input */}
//         <View className="w-[330px] h-[46px] border border-[#5E5E5E] rounded-[6px] px-4 justify-center">
//           <TextInput
//             value={password}
//             onChangeText={setPassword}
//             placeholder="Password"
//             placeholderTextColor="#5E5E5E"
//             secureTextEntry={true}
//             className="flex-1 font-[Gilroy-Medium] text-[16px] leading-[26px] text-black"
//             style={{ paddingVertical: 10, paddingHorizontal: 20 }}
//           />
//         </View>

//         {/* Confirm Password Input */}
//         <View className="w-[330px] h-[46px] border border-[#5E5E5E] rounded-[6px] px-4 justify-center">
//           <TextInput
//             value={confirmPassword}
//             onChangeText={setConfirmPassword}
//             placeholder="Confirm Password"
//             placeholderTextColor="#5E5E5E"
//             secureTextEntry={true}
//             className="flex-1 font-[Gilroy-Medium] text-[16px] leading-[26px] text-black"
//             style={{ paddingVertical: 10, paddingHorizontal: 20 }}
//           />
//         </View>
//       </View>

//       {/* Terms and Conditions */}
//       <Text className="font-medium text-sm leading-5 mb-5 px-0.5 text-black mx-2">
//         By clicking the Sign up button, you agree to the platform's Terms and Conditions.
//       </Text>

//       {/* Signup Button */}
//       <View className="w-full h-auto py-4 items-center justify-center mt-[4px]">
//         <TouchableOpacity
//           onPress={handleSignup}
//           className="w-[344px] h-[56px] bg-[#1A1B25] rounded-lg justify-center items-center px-6 mt-2"
//         >
//           <Text className="text-[20.57px] leading-[26.3px] text-white">Sign up</Text>
//         </TouchableOpacity>

//         {/* Signup with OTP Button */}
//         <TouchableOpacity
//           className="flex-row items-center gap-2 mt-[5px]"
//           onPress={() => {
//             navigation.navigate('PhoneAuth', { isSigningUp: true });
//           }}
//         >
//           <Icon name="call" size={16} color="#1A1B25" />
//           <Text className="font-medium text-base leading-6 text-[#1A1B25]">Signup with OTP</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// export default CreateAccount;
