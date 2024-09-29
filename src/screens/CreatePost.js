
// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Image } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { launchImageLibrary } from 'react-native-image-picker';
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { storage } from '../../firebase.js';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const CreatePost = () => {
//   const navigation = useNavigation();
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [image, setImage] = useState(null);
//   const [imageUrl, setImageUrl] = useState(null);  // Store the uploaded image URL

//   // Function to handle publish action
//   const handlePublish = async () => {
//     if (!title || !description || !imageUrl) {
//       console.log("Please provide all the details including title, description, and image.");
//       return;
//     }

//     try {

//       const token = await AsyncStorage.getItem('authToken');  // Get the token from AsyncStorage
//       console.log('Token:', token);

//       // Send the post data (title, description, imageUrl) to your backend
//       // const response = await axios.post('http://192.168.1.3:4000/api/posts/create', {
//       const response = await axios.post('https://cab-ontheway-backend.vercel.app/api/posts/create', {
//         title,
//         description,
//         imageUrl
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`,  // Add your token here
//         }
//       });

//       if (response.status === 201) {
//         console.log('Post created successfully:', response.data);
//         navigation.navigate('Home');  // Navigate to home or any other screen after successful post creation
//       } else {
//         console.log('Failed to create post:', response.data);
//       }
//     } catch (error) {
//       console.log('Error creating post:', error);
//     }
//   };

//   // Handle image selection and upload
//   const handleGallery = () => {
//     const options = {
//       mediaType: 'photo',
//       quality: 1,
//     };

//     launchImageLibrary(options, async (response) => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.errorMessage) {
//         console.log('ImagePicker Error: ', response.errorMessage);
//       } else if (response.assets && response.assets.length > 0) {
//         const selectedImage = response.assets[0].uri;
//         setImage(selectedImage);

//         // Upload the selected image to Firebase Storage
//         const filename = selectedImage.substring(selectedImage.lastIndexOf('/') + 1);
//         const storageRef = ref(storage, `images/${filename}`);

//         const img = await fetch(selectedImage);
//         const bytes = await img.blob();

//         uploadBytes(storageRef, bytes).then((snapshot) => {
//           console.log('Uploaded a blob or file!');

//           // Get the download URL after successful upload
//           getDownloadURL(snapshot.ref).then((url) => {
//             setImageUrl(url);  // Set the image URL in state
//             console.log('Image available at', url);
//           });
//         }).catch((error) => {
//           console.log('Error uploading image:', error);
//         });
//       }
//     });
//   };

//   return (
//     <KeyboardAvoidingView behavior="padding" className="flex-1 bg-white">
//       {/* Header Section */}
//       <View className="flex-row justify-between items-center w-full h-[30px] mt-[69px] mx-[18px]">
//         <TouchableOpacity className="w-8 h-8" onPress={() => navigation.navigate('Home')}>
//           <Icon name="close" size={30} color="black" />
//         </TouchableOpacity>

//         <TouchableOpacity className="bg-black w-[94px] h-[35px] rounded-full p-4 mr-[30px] pr-[11.71px] py-[5.86px] flex-row items-center space-x-[6px]" onPress={handlePublish}>
//           <Text className="text-white font-[Gilroy-Bold] text-[14px] leading-[14px]">Publish</Text>
//           <Image source={require('../assets/icons/publish.png')} style={{ width: 17.57, height: 17.57 }} />
//         </TouchableOpacity>
//       </View>

//       {/* Title Section */}
//       <View className="mt-2 px-5">
//         <TextInput
//           placeholder="Title"
//           placeholderTextColor="#5E5E5E"
//           value={title}
//           onChangeText={setTitle}
//           className=" text-[24px] leading-[26px] text-black mt-2"
//         />
//       </View>

//       {/* Description Section */}
//       <View className="px-5">
//         <TextInput
//           placeholder="caption text..."
//           placeholderTextColor="#5E5E5E"
//           value={description}
//           onChangeText={setDescription}
//           multiline={true}
//           className=" text-[18px] text-black leading-7 "
//         />
//       </View>

//       {/* Image preview (if selected) */}
//       {image && (
//         <View className="mt-4 px-6">
//           <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
//         </View>
//       )}

//       {/* Footer Icons Section */}
//       <View className="absolute bottom-0 w-full px-6 py-4 flex-row justify-around bg-white border-t border-gray-200">
//         {/* Gallery Icon */}
//         <TouchableOpacity onPress={handleGallery}>
//           <Icon name="photo-library" size={28} color="black" />
//         </TouchableOpacity>

//         {/* More Icon */}
//         <TouchableOpacity>
//           <Icon name="more-horiz" size={28} color="black" />
//         </TouchableOpacity>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// export default CreatePost;

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../../firebase.js';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreatePost = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isImageUploading, setIsImageUploading] = useState(false); // New state for image upload status
  const [isPublishing, setIsPublishing] = useState(false); // New state for publishing post

  // Function to handle publish action
  const handlePublish = async () => {
    if (!title || !description || !imageUrl) {
      console.log("Please provide all the details including title, description, and image.");
      return;
    }

    try {
      setIsPublishing(true); // Set publishing state to true when publishing starts

      const token = await AsyncStorage.getItem('authToken');  // Get the token from AsyncStorage
      console.log('Token:', token);

      // Send the post data (title, description, imageUrl) to your backend
      const response = await axios.post('https://cab-ontheway-backend.vercel.app/api/posts/create', {
        // const response = await axios.post('http://192.168.1.3:4000/api/posts/create', {
        title,
        description,
        imageUrl
      }, {
        headers: {
          Authorization: `Bearer ${token}`,  // Add your token here
        }
      });

      if (response.status === 201) {
        console.log('Post created successfully:', response.data);
        navigation.navigate('Home', {newPost: response.data.post});  // Navigate to home or any other screen after successful post creation
      } else {
        console.log('Failed to create post:', response.data);
      }
    } catch (error) {
      console.log('Error creating post:', error);
    } finally {
      setIsPublishing(false); // Set publishing state to false after publishing is done
    }
  };

  // Handle image selection and upload
  const handleGallery = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0].uri;
        setImage(selectedImage);
        setIsImageUploading(true); // Set image uploading state to true when uploading starts

        // Upload the selected image to Firebase Storage
        const filename = selectedImage.substring(selectedImage.lastIndexOf('/') + 1);
        const storageRef = ref(storage, `images/${filename}`);

        try {
          const img = await fetch(selectedImage);
          const bytes = await img.blob();

          uploadBytes(storageRef, bytes).then((snapshot) => {
            console.log('Uploaded a blob or file!');

            // Get the download URL after successful upload
            getDownloadURL(snapshot.ref).then((url) => {
              setImageUrl(url);  // Set the image URL in state
              console.log('Image available at', url);
              setIsImageUploading(false); // Set image uploading state to false after upload is complete
            });
          }).catch((error) => {
            console.log('Error uploading image:', error);
            setIsImageUploading(false); // In case of error, stop the loading state
          });
        } catch (error) {
          console.log('Error fetching image:', error);
          setIsImageUploading(false); // Handle any fetch errors
        }
      }
    });
  };

  return (
    <KeyboardAvoidingView behavior="padding" className="flex-1 bg-white">
      {/* Header Section */}
      <View className="flex-row justify-between items-center w-full h-[30px] mt-[69px] mx-[18px]">
        <TouchableOpacity className="w-8 h-8" onPress={() => navigation.navigate('Home')}>
          <Icon name="close" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          className={`bg-black w-[94px] h-[35px] rounded-full p-4 mr-[30px] pr-[11.71px] py-[5.86px] flex-row items-center space-x-[6px] ${
            isImageUploading || isPublishing ? 'opacity-50' : ''
          }`}
          onPress={handlePublish}
          disabled={isImageUploading || isPublishing} // Disable button if image is uploading or publishing
        >
          {isPublishing ? (
            <ActivityIndicator size="small" color="#FFF" /> // Show loading spinner if publishing
          ) : (
            <>
              <Text className="text-white font-[Gilroy-Bold] text-[14px] leading-[14px]">Publish</Text>
              <Image source={require('../assets/icons/publish.png')} style={{ width: 17.57, height: 17.57 }} />
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Title Section */}
      <View className="mt-2 px-5">
        <TextInput
          placeholder="Title"
          placeholderTextColor="#5E5E5E"
          value={title}
          onChangeText={setTitle}
          className=" text-[24px] leading-[26px] text-black mt-2"
        />
      </View>

      {/* Description Section */}
      <View className="px-5">
        <TextInput
          placeholder="caption text..."
          placeholderTextColor="#5E5E5E"
          value={description}
          onChangeText={setDescription}
          multiline={true}
          className=" text-[18px] text-black leading-7 "
        />
      </View>

      {/* Image preview (if selected) */}
      {image && (
        <View className="mt-4 px-6">
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        </View>
      )}

      {/* Footer Icons Section */}
      <View className="absolute bottom-0 w-full px-6 py-4 flex-row justify-around bg-white border-t border-gray-200">
        {/* Gallery Icon */}
        <TouchableOpacity onPress={handleGallery}>
          <Icon name="photo-library" size={28} color="black" />
        </TouchableOpacity>

        {/* More Icon */}
        <TouchableOpacity>
          <Icon name="more-horiz" size={28} color="black" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreatePost;
