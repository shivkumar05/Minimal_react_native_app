import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Splash({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      handleGetToken();
    }, 1000);
  });

  const handleGetToken = async () => {
    const dataToken = await AsyncStorage.getItem('resp');
    if (!dataToken) {
      navigation.replace('HomePageDrawer');
    } else {
      navigation.replace('MyDrawer');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../Images/Capture.png')}
        style={{
          height: hp('8%'),
          width: wp('16%'),
          borderRadius: 35
        }} />
      <Text style={styles.text}>
        Welcome To</Text>
      <Text style={styles.text}>
        My app</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontWeight: '800',
    fontSize: 30,
    color: 'black',
  },
});