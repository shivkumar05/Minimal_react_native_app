import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  DevSettings,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import React, { memo, useState } from 'react';
import Header from '../Header';
import Heading1 from '../Profile/Heading1';
import Box_P from '../Profile/Box_P';
import Data_P from '../Profile/Data_P';
import About from '../Profile/About';
import PostType from '../Profile/PostType';
import Dot3 from 'react-native-vector-icons/Entypo';
import Heart from 'react-native-vector-icons/Entypo';
import Share from 'react-native-vector-icons/Entypo';
import Photo from 'react-native-vector-icons/MaterialIcons';
import Smile from 'react-native-vector-icons/Fontisto';
import Send from 'react-native-vector-icons/Ionicons';
import Links from '../Profile/Links';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Userpost from '../Profile/Userpost';

const Profile = ({ props, navigation }) => {

  const handleLogout = async () => {
    AsyncStorage.clear().then(() => {
      console.log('AsyncStorage cleared successfully.');
      navigation.navigate('HomePageDrawer');
    }).catch((err) => {
      console.log('Error clearing AsyncStorage: ', err);
    });
  };
  return (<>
    <SafeAreaView style={{ width: '100%', padding: 20, }}>
      <View>
        <Header />
        <TouchableOpacity
          style={{
            width: 35,
            height: 35,
            position: 'absolute',
          }}
          onPress={() => navigation.openDrawer()}>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: '100%',
            marginTop: 40,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
          <Heading1
            sName={Data_P[0].sName}
            h1={Data_P[0].h1}
            userName={Data_P[0].userName}
          />
          <TouchableOpacity
            style={{
              width: 60,
              height: 30,
              backgroundColor: '#C2C2C2',
              padding: 2,
              borderRadius: 8,
            }}
            onPress={handleLogout}>
            <Text
              style={{
                height: hp('15%'),
                width: wp('20%'),
                color: 'white',
                top: 4,
                left: 5,
              }}>
              {' '}
              LogOut
            </Text>
          </TouchableOpacity>
        </View>
        <Box_P />
        <About />
        <Links />
        <PostType />
        <Userpost />
      </ScrollView>
    </SafeAreaView>
  </>
  );
};

const styles = StyleSheet.create({
  main: {
    width: wp('100%'),
    backgroundColor: '#F2F1F0',
    paddingTop: 15,
    alignItems: 'center',
  },
});

export default memo(Profile);
