// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';

// const PhoneAuth = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
  
//   const isOtpLogin = route?.params?.otpLogin || false;
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [otpSent, setOtpSent] = useState(false);

//   // Function to simulate OTP sending
//   const handleSendOtp = () => {
//     setOtpSent(true);
//   };

//   // Function to verify OTP
//   const handleVerifyOtp = () => {
//     navigation.navigate('Home');
//   };

//   return (
//     <View style={styles.container}>
//       {/* Heading Section */}
//       {!otpSent && (
//         <View style={styles.headingSection}>
//           <Text style={styles.headingText}>
//             {isOtpLogin ? 'Login to your Account' : 'Create Account with Phone'}
//           </Text>
//         </View>
//       )}

//       {/* Phone Number or OTP Input Section */}
//       {!otpSent ? (
//         <View style={styles.inputSection}>
//           <View style={styles.inputBox}>
//             <TextInput
//               placeholder="Phone Number"
//               placeholderTextColor="#5E5E5E"
//               value={phoneNumber}
//               onChangeText={setPhoneNumber}
//               keyboardType="phone-pad"
//               style={styles.textInput}
//             />
//           </View>

//           <TouchableOpacity
//             style={styles.button}
//             onPress={handleSendOtp}
//           >
//             <Text style={styles.buttonText}>
//               Get OTP
//             </Text>
//           </TouchableOpacity>
//         </View>
//       ) : (
//         // <View> 
//         //   <h1></h1>
//         // </View>
//         <View style={styles.inputSection}>
//           <View style={styles.headingSection}>
//             <Text style={styles.headingText}>
//               Please check, we have sent you the OTP
//             </Text>
//              </View>
//           <View style={styles.otpMessageBox}>
//             <Text style={styles.otpMessageText}>
//               Enter the OTP sent to {phoneNumber.slice(0, 6)}****{phoneNumber.slice(-4)}
//             </Text>
//           </View>
        
//           <View style={styles.otpInputBox}>
//             {[...Array(4)].map((_, index) => (
//               <TextInput
//                 key={index}
//                 placeholder="0"
//                 placeholderTextColor="#5E5E5E"
//                 keyboardType="numeric"
//                 maxLength={1}
//                 style={styles.otpInput}
//               />
//             ))}
//           </View>

//           <Text style={styles.messageText}>
//             We will send you a message to set or reset your new password.
//           </Text>

//           <TouchableOpacity
//             style={styles.button}
//             onPress={handleVerifyOtp}
//           >
//             <Text style={styles.buttonText}>
//               Verify
//             </Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// };

// // Styling for the component
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     alignItems: 'center',
//   },
//   headingSection: {
//     width: 360,
//     height: 72,
//     marginTop: 98,  // Adds margin from the top
//     paddingHorizontal: 20,
//     // paddingVertical: 5,
//     justifyContent: 'center',
//   },
//   headingText: {
//     fontFamily: 'Poppins-SemiBold',
//     fontSize: 24,
//     // textAlign: 'center',
//     color: 'black',
//     fontWeight: 'bold',
//   },
//   inputSection: {
//     width: 360,
//     height: 226,
//     marginTop: 10,
//     paddingHorizontal: 20,
//     // paddingVertical: 10,
//     // alignItems: 'center',
//   },
//   inputBox: {
//     width: 300,
//     height: 46,
//     borderColor: '#5E5E5E',
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     justifyContent: 'center',
//   },
//   textInput: {
//     fontSize: 16,
//     color: 'black',
//   },
//   button: {
//     width: 300,
//     height: 46,
//     backgroundColor: '#1A1B25',
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   buttonText: {
//     fontSize: 18,
//     color: '#FFFFFF',
//     // fontWeight: 'bold',
//     fontWeight: '400',
//   },
//   otpMessageBox: {
//     width: 300,
//     height: 52,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   otpMessageText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: 'black',
//   },
//   otpInputBox: {
//     width: 300,
//     height: 46,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   otpInput: {
//     width: 60,
//     height: 46,
//     borderColor: '#5E5E5E',
//     borderWidth: 1,
//     borderRadius: 10,
//     textAlign: 'center',
//     fontSize: 16,
//     color: 'black',
//   },
//   messageText: {
//     fontSize: 14,
//     textAlign: 'center',
//     color: 'black',
//   },
// });

// export default PhoneAuth;

import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PhoneAuth = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const isOtpLogin = route?.params?.otpLogin || false;
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']); // For storing OTP digits

  // Refs for OTP inputs
  const otpInputRefs = useRef([]);

  // Function to validate phone number and simulate OTP sending
  const handleSendOtp = () => {
    if (phoneNumber.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number.');
      return;
    }
    setOtpSent(true);
    Alert.alert('Success', 'OTP sent successfully!');
  };

  // Function to validate and verify OTP
  const handleVerifyOtp = () => {
    if (otp.includes('')) {
      Alert.alert('Error', 'Please enter the complete 4-digit OTP.');
      return;
    }

    // If OTP is valid, navigate to the Payment screen or proceed further
    Alert.alert('Success', 'OTP verified successfully!');
    navigation.navigate('Payment');
  };

  // Function to handle OTP input changes
  const handleOtpChange = (value, index) => {
    if (/^\d*$/.test(value)) { // Ensure only numbers are input
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Automatically move to the next input if the current one is filled
      if (value && index < otpInputRefs.current.length - 1) {
        otpInputRefs.current[index + 1].focus();
      }
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
        <Text className="ml-[17px] font-bold text-[24.53px] leading-[31.89px] text-black w-[180px]">
          {otpSent ? 'OTP Verification' : (isOtpLogin ? 'Login to your Account' : 'Create Account with Phone')}
        </Text>
      </View>

      {!otpSent ? (
        <>
          {/* Phone Input Section */}
          <View className="w-[300px] h-auto py-[10px] px-[3px]">
            {/* Phone Input with Country Code */}
            <View className="flex-row items-center border border-gray-300 rounded-[8px] px-[10px] py-[10px]">
              <Text className="text-[16px] leading-[26px] text-black">+91</Text>
              <TextInput
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                maxLength={10}
                className="flex-1 ml-[10px] h-[36px] text-[16px] py-1 text-black"
              />
            </View>
            {/* Instruction Text */}
            <Text className="font-normal text-[12px] leading-[14.63px] text-[#666666] mt-[20px]">
              * We will send you an OTP to verify your number.
            </Text>
          </View>

          {/* Get OTP Button */}
          <TouchableOpacity
            onPress={handleSendOtp}
            className="w-[300px] h-auto bg-black rounded-[8px] py-[10px] mt-[20px]"
          >
            <Text className="text-lg font-bold text-white text-center">
              Get OTP
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          {/* OTP Section */}
          <View className="w-[300px] mt-[15px]">
            <Text className="font-bold text-[22px] leading-[26px] text-black">
              Please enter the OTP sent to +91******{phoneNumber.slice(-4)}
            </Text>

            {/* OTP Input Boxes */}
            <View className="flex-row justify-between w-full mt-[20px]">
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(value, index)}
                  maxLength={1}
                  keyboardType="number-pad"
                  ref={(el) => (otpInputRefs.current[index] = el)}
                  className="w-[50px] h-[50px] border border-gray-300 rounded-[8px] text-center text-lg text-black"
                />
              ))}
            </View>

            {/* Instruction Text */}
            <Text className="font-normal text-[12px] leading-[14.63px] text-[#666666] mt-[20px]">
              * We will send you a message to verify your new account.
            </Text>

            {/* Verify Button */}
            <TouchableOpacity
              onPress={handleVerifyOtp}
              className="w-[300px] h-auto bg-black rounded-[8px] py-[10px] mt-[40px] mx-auto"
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

export default PhoneAuth;
