

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, Share, Alert } from 'react-native';
import axios from 'axios';  // Use axios or fetch API for making HTTP requests
import AsyncStorage from '@react-native-async-storage/async-storage';


const Home = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedPosts, setSavedPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);  // To store posts from backend
  const [loading, setLoading] = useState(true);  // To handle loading state
  const [myPosts, setMyPosts] = useState([]);  // To store user's posts


  // useEffect(() => {
  //   // Fetch posts from backend
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await axios.get('http://192.168.1.3:4000/api/posts'); // Replace with your backend URL
  //       // const response = await axios.get('https://cab-ontheway-backend.vercel.app/api/posts'); 
  //       setAllPosts(response.data.data);  // Set posts data from backend
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching posts:', error);
  //       setLoading(false);
  //     }
  //   };
  
  //   fetchPosts();
  // }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // const response = await axios.get('http://192.168.1.3:4000/api/posts'); // Replace with your backend URL
        const response = await axios.get('https://cab-ontheway-backend.vercel.app/api/posts'); // Replace with your backend URL
        setAllPosts(response.data.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    const fetchMyPosts = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');  // Get the token from AsyncStorage
        console.log('userId:', userId);
        // const response = await axios.get(`http://192.168.1.3:4000/api/posts/${userId}`); // Fetch user's posts
        const response = await axios.get(`https://cab-ontheway-backend.vercel.app/api/posts/${userId}`); // Fetch user's posts
        setMyPosts(response.data.data);
      } catch (error) {
        console.error('Error fetching my posts:', error);
      }
    };

    fetchPosts();
    fetchMyPosts();
    setLoading(false);
  }, []);

 

  // Function to filter posts based on the selected tab and search query
  const filteredPosts = () => {
    let posts = [];
    if (selectedTab === 'All') posts = allPosts;  // Use backend posts here
    else if (selectedTab === 'My Posts') posts = myPosts;
    else if (selectedTab === 'Saved') posts = savedPosts;

    return posts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Function to handle saving a post
  const handleSavePost = (post) => {
    const isPostSaved = savedPosts.find((savedPost) => savedPost.id === post.id);
    
    if (isPostSaved) {
      // Unsave the post
      setSavedPosts(savedPosts.filter((savedPost) => savedPost.id !== post.id));
      Alert.alert('Post unsaved successfully');
    } else {
      // Save the post
      setSavedPosts([...savedPosts, post]);
      Alert.alert('Post saved successfully');
    }
  };

  // Function to handle sharing a post
  const handleSharePost = async (post) => {
    try {
      await Share.share({
        message: `${post.title}\n\n${post.description}\n\nShared via Caronway App`,
      });
    } catch (error) {
      Alert.alert('Error sharing post');
    }
  };

  // Render individual post item
  const renderPostItem = ({ item }) => {
    const isPostSaved = savedPosts.some((savedPost) => savedPost.id === item.id);  // Check if the post is saved

    return (
      <View className="p-2 border-b border-gray-300">
        <View className="flex-row justify-between items-center mb-2">
          <View className="flex-row items-center">
            <Image source={require('../assets/images/image.png')} style={{ width: 40, height: 40, borderRadius: 20 }} />
            <View className="ml-2">
              <Text className="text-base font-bold text-black">{item.userName}</Text>
              <Text className="text-sm text-gray-500">{item.role}</Text>
            </View>
          </View>
          <View className="flex-row">
            <TouchableOpacity 
              onPress={() => handleSavePost(item)} 
              className="mr-4"
            >
              <Image 
                source={require('../assets/icons/save.png')} 
                style={{ 
                  width: 24, 
                  height: 24, 
                  tintColor: isPostSaved ? 'black' : 'gray'  // Change color if post is saved
                }} 
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSharePost(item)}>
              <Image 
                source={require('../assets/icons/share.png')} 
                style={{ width: 24, height: 24 }} 
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text className="mt-2 text-lg text-black">{item.title}</Text>
        <Text className="mt-1 text-sm text-gray-600">{item.description}</Text>
      <Image
        source={{ uri: item.imageUrl}} // Use the profile image URL
         style={{ width: '100%', height: 200, borderRadius: 10 }} />
    </View>
    );
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading posts...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <View className="flex-row justify-between items-center p-4 mt-4">
        <Text className="text-2xl font-bold text-black">Posts</Text>
        <Image source={require('../assets/icons/logo.png')} style={{ width: 113, height: 44 }} />
      </View>

      <View className="items-center p-4">
        <TextInput
          placeholder="Search Posts..."
          placeholderTextColor="#000000"
          value={searchQuery}
          onChangeText={setSearchQuery}
          className="bg-gray-200 w-full h-[40px] rounded-full px-4 py-2 text-black"
        />
      </View>

      <View className="flex-row justify-around py-3 border-b border-black">
        <TouchableOpacity onPress={() => setSelectedTab('All')}>
          <Text className={`text-lg text-black ${selectedTab === 'All' ? 'font-bold' : 'font-normal'}`}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab('My Posts')}>
          <Text className={`text-lg text-black ${selectedTab === 'My Posts' ? 'font-bold' : 'font-normal'}`}>My Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab('Saved')}>
          <Text className={`text-lg text-black ${selectedTab === 'Saved' ? 'font-bold' : 'font-normal'}`}>Saved</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredPosts()}
        renderItem={renderPostItem}
        keyExtractor={(item) => item.id}
        className="flex-1 p-4"
      />

      <View className="flex-row justify-between items-center p-4">
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
    </View>
  );
};

export default Home;
