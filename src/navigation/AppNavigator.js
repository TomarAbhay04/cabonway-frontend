import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../components/Splash.js'
import CreateAccount from '../screens/CreateAccount.js';
import Login from '../screens/Login.js'
import Home from '../screens/Home.js';
import Profile from '../screens/Profile.js';   
import ChangePassword from '../screens/ChangePassword.js'; 
import PhoneAuth from '../screens/PhoneAuth.js';
import CreatePost from '../screens/CreatePost.js';
import Payment from '../screens/Payment.js';
import ForgotPassword from '../screens/ForgotPassword.js';
import PhonePePayment from '../components/PhonePePayment.js';
const Stack = createStackNavigator();

const AppNavigator = () => {   
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Splash'>
                <Stack.Screen name='Splash' component={Splash} />
                <Stack.Screen name='CreateAccount' component={CreateAccount} />
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='Profile' component={Profile} />
                <Stack.Screen name='ChangePassword' component={ChangePassword} />
                <Stack.Screen name='PhoneAuth' component={PhoneAuth} />
                <Stack.Screen name='CreatePost' component={CreatePost} />
                <Stack.Screen name='Payment' component={Payment} />
                <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
                <Stack.Screen name='PhonePePayment' component={PhonePePayment} />
            </Stack.Navigator>
        </NavigationContainer>
    )
};

export default AppNavigator;