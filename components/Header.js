import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Navi from 'react-native-vector-icons/EvilIcons';
import Search from 'react-native-vector-icons/Feather';
import Bell from 'react-native-vector-icons/FontAwesome';
import Friend from 'react-native-vector-icons/FontAwesome5';
import Data_P from './Profile/Data_P';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
const Drawer = createDrawerNavigator();

const options = {
  title: 'Select Image',
  type: 'library',
  options: {
    selectionLimit: 0,
    mediaType: 'photo',
    includeBase64: false,
  },
};
const Header = () => {
  const navigation = useNavigation();
  const goprofile = () => {
    navigation.navigate('Profile')
  };
  const [blog, setBlog] = useState([]);


  // ===================[getting profile image of user && logout when token is invaild or token timeout]===================//

  async function profileData() {
    let parsed = await AsyncStorage.getItem('resp');
    let users = JSON.parse(parsed);
    const token = users.access;

    const response = await fetch('http://35.90.113.221/user_profile_pic/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (data.code === 'token_not_valid') {
      await AsyncStorage.removeItem('token');
      navigation.navigate('HomePageDrawer');
      alert('Your session has been expired login again')
    }
    else{
      setBlog(data)
    }
  }
  useEffect(() => {
    profileData();
  }, []
  )


  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        height: 40,
        justifyContent: 'space-between',
        paddingRight: 5
      }}>
      <View
        style={{
          flexDirection: 'row',
          width: 85,
          justifyContent: 'space-between',
        }}>
        <Navi
          name="navicon"
          size={40}
          color="#637381" />
        <TouchableOpacity
          style={{
            width: wp('8%'),
          }}>
          <Search
            name="search"
            size={25}
            color="#637381" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: 170,
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={{
            width: wp('8%'),
            height: hp('3%'),
          }}>
          {/* <Image
            source={Data_P[0].flag}
            style={{
              width: wp('8%'),
              height: hp('3%')
            }}
          /> */}
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: wp('8%'),
            height: hp('3%'),
            marginLeft: 2,
          }}>
          {/* <Bell
            name="bell"
            size={22}
            color="#637381" /> */}
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: wp('8%'),
            height: hp('3%'),
          }}>
          <Friend
            name="user-friends"
            size={20}
            color="#637381" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            // position:'absolute',
            width: wp('8%'),
            height: hp('3%'),

          }}
          onPress={() => goprofile()}>
          {
            blog.map((item, index) => (
              <Image
                key={index}
                source={{ uri: 'http://35.90.113.221' + item.images }}
                style={{
                  height: 35,
                  width: 35,
                  borderRadius: 30,
                  top: -10,
                }}
              />
            ))}
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Header;
