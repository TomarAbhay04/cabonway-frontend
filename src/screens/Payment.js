import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';


const PaymentPage = () => {
    const navigation = useNavigation();
  return (
    <View className="flex-1 bg-white">
      {/* Heading Section */}
      <View className="w-[360px] h-auto mt-[128px] px-[30px] py-[10px]">
        <Text className="font-bold text-[24.53px] leading-[31.89px] text-black w-[255px]">
          Unlock Full Access
        </Text>
        <Text className="font-medium text-[14px] leading-[21px] text-[#666666] w-[290.83px] mt-[10px]">
          Complete your payment to start sharing and collaborating with your team.
        </Text>
      </View>

      {/* Pricing Section */}
      <View className="w-[360px] h-auto mt-[21px] px-[30px] py-[10px]">
        {/* Heading */}
        <Text className="font-bold text-[22px] leading-[26px] text-black w-[255px]">
          Team Collaboration Plan
        </Text>

        {/* Feature Points */}
        <View className="w-[290px] h-auto py-[10px]">
          <View className="flex-row items-center w-[290px] h-auto py-[10px]">
            <Icon name="check-circle" size={24} color="green" />
            <Text className="ml-[10px] text-black text-[18px]">
              Unlimited note sharing
            </Text>
          </View>
          <View className="flex-row items-center w-[290px] h-auto py-[10px]">
            <Icon name="check-circle" size={24} color="green" />
            <Text className="ml-[10px] text-black text-[18px]">
              Real-time Updates
            </Text>
          </View>
          <View className="flex-row items-center w-[290px] h-auto py-[10px]">
            <Icon name="check-circle" size={24} color="green" />
            <Text className="ml-[10px] text-black text-[18px]">
              Secure data storage
            </Text>
          </View>
          <View className="flex-row items-center w-[290px] h-auto py-[10px]">
            <Icon name="check-circle" size={24} color="green" />
            <Text className="ml-[10px] text-black text-[18px]">
              Access across all devices
            </Text>
          </View>
        </View>

        {/* Price */}
        <View className="w-full h-[46px] bg-[#FFFFFF] rounded-[8px] py-[10px] ">
          <Text className="text-lg font-bold text-black mx-auto">₹499/month</Text>
        </View>

        {/* Subscribe Now Button */}
        <TouchableOpacity className="w-full h-auto bg-black rounded-[8px] py-[10px] mt-[10px] "
            onPress={ () => { navigation.navigate('Home')} }
        >
          <Text className="text-lg font-bold text-white text-center">
            Subscribe Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentPage;
