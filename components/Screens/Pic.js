import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
const options = {
  title: 'Select Image',
  type: 'library',
  options: {
    selectionLimit: 0,
    mediaType: 'photo',
    includeBase64: false,
  },
};

const SignUp = props => {
  const { navigation, route } = props;
  const [uri, setUri] = useState();
  const [uriTwo, setUriTwo] = useState();
  const [images, setImages] = useState();
  const [imageTwo, setImagesTwo] = useState();

  const open = async () => {
    const imagesss = await launchImageLibrary(options);
    setUri(imagesss.assets);
    setImages(imagesss);
    console.log('first', imagesss.assets);
  };

  const openTwo = async () => {
    const imageT = await launchImageLibrary(options);
    setUriTwo(imageT.assets);
    setImagesTwo(imageT);
    console.log('seconf', imageT.assets);
  };

  const postUser = async () => {
    let parsed = await AsyncStorage.getItem('resp');
    let users = JSON.parse(parsed);
    const user = users.user_id;
    console.log(user)
    const token = users.access;
    const formdata = new FormData();
    formdata.append('images', {
      uri: images.assets[0].uri,
      type: images.assets[0].type,
      name: images.assets[0].fileName,
    });
    formdata.append('background_image', {
      uri: imageTwo.assets[0].uri,
      type: imageTwo.assets[0].type,
      name: imageTwo.assets[0].fileName,
    });

    formdata.append('user', user);
    fetch(`http://35.90.113.221/user_profile_pic/?user=${user}`, {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      body: formdata,
    })
      .then(response => {
        console.log('Status code : ', response.status);
        if (response.status = 201) {
          navigation.navigate('MyDrawer');
          // DevSettings.reload();
        }
      })
      .catch(err => {
        console.log('errrr', err);
      });
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.main}>
          <Image
            source={require('../../Images/Capture.png')}
            style={{
              height: 60,
              width: 60,
              borderRadius: 35
            }}
          />
          <Text style={styles.Heading}>
            Upload Profile Picture</Text>
          <Text style={styles.Para}>
            Enter the details below</Text>

          <TouchableOpacity
            style={styles.circles}
            onPress={open}>
            <Text
              style={{
                position: 'absolute',
                alignSelf: 'center',
                color: 'black',
                fontSize: 50,
              }}>
              {' '}
              +{' '}
            </Text>
            <Image
              style={styles.avatar}
              source={uri} />
          </TouchableOpacity>
          <Text
            style={{
              alignSelf: 'center',
              color: 'black',
              fontSize: 15
            }}>
            Profile Picture</Text>

          <TouchableOpacity
            style={styles.circleTwo}
            onPress={openTwo}>
            <Text
              style={{
                alignSelf: 'center',
                color: 'black',
                fontSize: 50,
                marginTop: 60
              }}>
              {' '}
              +{' '}
            </Text>
            <Image
              style={styles.avatarTwo}
              source={uriTwo} />
          </TouchableOpacity>
          <Text
            style={{
              alignSelf: 'center',
              color: 'black',
              fontSize: 15
            }}>
            Background image</Text>
          <TouchableOpacity
            onPress={() => postUser()}
            style={{
              backgroundColor: '#F45CA5',
              borderRadius: 10,
              marginTop: '10%',
              height: hp('8%'),
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#FFFFFF',
                alignSelf: 'center',
                fontWeight: 'bold',
              }}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    width: wp('100%'),
    backgroundColor: '#F2F1F0',
    padding: '5%',
    // backgroundColor: 'red',
  },
  Heading: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
    marginTop: '8%',
  },

  Para: {
    fontSize: 20,
    color: '#79747E',
    marginTop: '2%',
  },

  avatar: {
    height: 176,
    width: 176,
    borderRadius: 90,
    alignSelf: 'center',
  },
  avatarTwo: {
    height: 175,
    width: 315,
    alignSelf: 'center',
    position: 'absolute'

  },

  circles: {
    height: 180,
    width: 180,
    borderRadius: 90,
    marginTop: 15,
    justifyContent: 'center',
    borderWidth: 2,
    alignSelf: 'center',
    borderColor: '#F45CA5',
  },
  circleTwo: {
    height: 180,
    width: 320,
    borderWidth: 2,
    borderColor: '#F45CA5',
    marginTop: 15,
    // backgroundColor: 'white',
    alignSelf: 'center',
    // justifyContent:'center'

  },
});
export default SignUp;
