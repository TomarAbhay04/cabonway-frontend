// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import phonepeSDK from 'react-native-phonepe-pg'
// import Base64 from 'react-native-base64'
// import sha256 from 'sha256'

// const PhonePePayment = () => {
//   const [amount, setAmount] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [enviroment, setEnviroment] = useState('SANDBOX');
//   const [merchantId, setMerchantId] = useState('M2306160483220675579140');
//   const [appId, setAppId] = useState(null);
//   const [enableLogging, setEnableLogging] = useState(true);


//   const generateTransactionId = () => {
//     const timestamp = Date.now();
//     const random =  Math.floor(Math.random() * 1000000000);
//     const merchantPrefix = 'A';
//     return `${merchantPrefix}${timestamp}${random}`;
//   };

//   // const handlePayment = async () => {

//   //       // Initiate payment
//   //       phonepeSDK.init(enviroment, merchantId, appId, enableLogging)
//   //       .then(res=>{
//   //           const requestBody = {
//   //               merchantId: merchantId,
//   //               merchantTransactionId: generateTransactionId(),
//   //               merchantUserId: "",
//   //               amount: (data.amount * 100),
//   //               mobileNumber: data.mobile,
//   //               callbackUrl: "", 
//   //               paymentInstruction: {
//   //                   type: "PAY_PAGE"
//   //               },
//   //           }

//   //           const salt_key = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
//   //           const salt_Index = 1;
//   //           const payload = JSON.stringify(requestBody);
//   //           const payload_main= Base64.encode(payload);
//   //           const string = payload_main + "/pg/v1/pay" + salt_key;
//   //           const checksum = sha256(string)+"###"+salt_Index;

//   //           phonepeSDK.startTransaction(payload_main, 
//   //               checksum
//   //           ).then(res=>{
//   //               console.log('startTransaction', res)

//   //           }).catch(err=>{
//   //           console.log('init', err)
//   //           })


//   //   }).catch(err=>{
//   //       console.log('init', err)
//   //   })

//   // };


//   const handlePayment = async () => {
//     try {
//       // Ensure amount and phone fields are filled
//       if (!amount || !phone) {
//         Alert.alert('Error', 'Please enter the amount and phone number.');
//         return;
//       }
  
//       // Initiate the PhonePe SDK
//       await phonepeSDK.init(enviroment, merchantId, appId, enableLogging);
  
//       // Prepare requestBody
//       const requestBody = {
//         merchantId: merchantId,
//         merchantTransactionId: generateTransactionId(),
//         merchantUserId: email || "test-user",  // Use test-user if email is not provided
//         amount: (amount * 100),  // Convert amount to paise
//         mobileNumber: phone,
//         callbackUrl: "",  // Add your callback URL here if applicable
//         paymentInstruction: {
//           type: "PAY_PAGE"  // Ensure this is the correct payment type for your integration
//         },
//       };
  
//       const salt_key = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
//       const salt_Index = 1;
//       const payload = JSON.stringify(requestBody);
//       const payload_main = Base64.encode(payload);
//       const stringToHash = payload_main + "/pg/v1/pay" + salt_key;
//       const checksum = sha256(stringToHash) + "###" + salt_Index;
  
//       // Start the transaction
//       const response = await phonepeSDK.startTransaction(payload_main, checksum);
  
//       console.log('Transaction started successfully:', response);
  
//     } catch (err) {
//       console.log('Error during transaction initiation:', err);
//       Alert.alert('Error', 'Transaction failed. Please try again.');
//     }
//   };

  
//   return (
//     <View style={{ padding: 20 }}>
//       <Text style={{ fontSize: 20, marginBottom: 20 }}>Payment</Text>
//       <TextInput
//         placeholder="Amount (INR)"
//         keyboardType="numeric"
//         value={amount}
//         onChangeText={setAmount}
//         style={{ borderBottomWidth: 1, marginBottom: 20 }}
//       />
//       <TextInput
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         style={{ borderBottomWidth: 1, marginBottom: 20 }}
//       />
//       <TextInput
//         placeholder="Phone Number"
//         value={phone}
//         onChangeText={setPhone}
//         style={{ borderBottomWidth: 1, marginBottom: 20 }}
//       />
//       <TouchableOpacity
//         onPress={handlePayment}
//         style={{ backgroundColor: '#1A1B25', padding: 15, alignItems: 'center' }}
//       >
//         <Text style={{ color: '#fff', fontWeight: 'bold' }}>
//           {loading ? 'Processing...' : 'Initiate Payment'}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default PhonePePayment;

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import phonepeSDK from 'react-native-phonepe-pg';
import Base64 from 'react-native-base64';
import sha256 from 'sha256';

const PhonePePayment = () => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [enviroment, setEnviroment] = useState('SANDBOX');
  const [merchantId, setMerchantId] = useState('M2306160483220675579140');
  const [appId, setAppId] = useState(null);
  const [enableLogging, setEnableLogging] = useState(true);

  const generateTransactionId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000000000);
    const merchantPrefix = 'A';
    return `${merchantPrefix}${timestamp}${random}`;
  };

  // const handlePayment = async () => {
  //   try {
  //     // Ensure amount is filled
  //     if (!amount) {
  //       Alert.alert('Error', 'Please enter the amount.');
  //       return;
  //     }

  //     // Initiate the PhonePe SDK
  //     await phonepeSDK.init(enviroment, merchantId, appId, enableLogging);

  //     // Prepare requestBody
  //     const requestBody = {
  //       merchantId: merchantId,
  //       merchantTransactionId: generateTransactionId(),
  //       merchantUserId: "test-user",  // Static user ID as no email is provided
  //       amount: amount * 100,  // Convert amount to paise
  //       mobileNumber: "9999999999",  // Static phone number for test purposes
  //       callbackUrl: "",  // Add your callback URL here if applicable
  //       paymentInstruction: {
  //         type: "PAY_PAGE",  // Ensure this is the correct payment type
  //       },
  //     };

  //     const salt_key = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
  //     const salt_Index = 1;
  //     const payload = JSON.stringify(requestBody);
  //     const payload_main = Base64.encode(payload);
  //     const stringToHash = payload_main + "/pg/v1/pay" + salt_key;
  //     const checksum = sha256(stringToHash) + "###" + salt_Index;

  //     // Start the transaction
  //     const response = await phonepeSDK.startTransaction(payload_main, checksum);

  //     console.log('Transaction started successfully:', response);

  //   } catch (err) {
  //     console.log('Error during transaction initiation:', err);
  //     Alert.alert('Error', 'Transaction failed. Please try again.');
  //   }
  // };


  const handlePayment = async () => {
    try {
      // Ensure amount is filled
      if (!amount) {
        Alert.alert('Error', 'Please enter the amount.');
        return;
      }
  
      // Initiate the PhonePe SDK
      await phonepeSDK.init(enviroment, merchantId, appId, enableLogging);
  
      // Prepare requestBody
      const requestBody = {
        merchantId: merchantId,
        merchantTransactionId: generateTransactionId(),
        merchantUserId: "test-user",  // Static user ID
        amount: amount * 100,  // Convert amount to paise
        mobileNumber: "9999999999",  // Static phone number for test purposes
        callbackUrl: "",  // Add your callback URL here if applicable
        paymentInstruction: {
          type: "PAY_PAGE",  // Ensure this is the correct payment type
        },
      };
  
      const salt_key = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
      const salt_Index = 1;
      const payload = JSON.stringify(requestBody);
      const payload_main = Base64.encode(payload);
      const stringToHash = payload_main + "/pg/v1/pay" + salt_key;
      const checksum = sha256(stringToHash) + "###" + salt_Index;
  
      // Start the transaction with only the required number of parameters
      const response = await phonepeSDK.startTransaction(
        payload_main, // Base64 encoded payload
        checksum,     // Checksum for security
        merchantId,   // Merchant ID
        appId,        // App ID
        enviroment,   // Environment (SANDBOX/PRODUCTION)
        ""            // Add an additional parameter if needed (e.g., additional info)
      );
  
      console.log('Transaction started successfully:', response);
  
    } catch (err) {
      console.log('Error during transaction initiation:', err);
      Alert.alert('Error', 'Transaction failed. Please try again.');
    }
  };
  
  
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Payment</Text>
      <TextInput
        placeholder="Amount (INR)"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />
      <TouchableOpacity
        onPress={handlePayment}
        style={{ backgroundColor: '#1A1B25', padding: 15, alignItems: 'center' }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>
          {loading ? 'Processing...' : 'Initiate Payment'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PhonePePayment;
