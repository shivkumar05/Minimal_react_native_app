import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  TextInput,
  Modal,
  Pressable,
} from 'react-native';
import React, { memo, useState, useEffect } from 'react';
import Person from 'react-native-vector-icons/Ionicons';
import Heart from 'react-native-vector-icons/Entypo';
import Right from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Entypo';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const options = {
  title: 'Select Image',
  type: 'library',
  options: {
    selectionLimit: 0,
    mediaType: 'photo',
    includeBase64: false,
  },
};
const Box_P = (props) => {

  const [count, setCount] = useState(0)
  //================[fuction to render username]=========================//
  const [blog1, setBlog1] = useState([]);
  const postUser = async () => {
    let parsed = await AsyncStorage.getItem('resp');
    let tokens = JSON.parse(parsed);
    const token = tokens.access;
    let users = JSON.parse(parsed);
    const user = users.user_id;
    // console.log('user===>>>', user)

    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    fetch('http://35.90.113.221/show/',
      requestOptions,
    ).then(resp => {
      resp.json().then(resp => {
        setBlog1(resp);
        // console.log(resp)
      });
    });
  };

  // console.log('data1===>>>', blog1)




  //================[fuction to render Profile pic]==================//

  const [blog, setBlog] = useState([]);
  const getUser = async () => {
    let parsed = await AsyncStorage.getItem('resp');
    let tokens = JSON.parse(parsed);
    const token = tokens.access;
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(
      'http://35.90.113.221/user_profile_pic/',
      requestOptions,
    ).then(resp => {
      resp.json().then(resp => {
        setBlog(resp);
        // console.log(resp);
      });
    });
  };

  // ================[fuction for update profile pic]=========================//
  const [modalVisible, setModalVisible] = useState(false);
  const [uri, setUri] = useState();
  const [uriTwo, setUriTwo] = useState();
  const [images, setImages] = useState();
  const [imageTwo, setImagesTwo] = useState();

  const open = async () => {
    const imagesss = await launchImageLibrary(options);
    setUri(imagesss.assets);
    setImages(imagesss);
    // console.log('first', imagesss.assets);
  };

  const openTwo = async () => {
    const imageT = await launchImageLibrary(options);
    setUriTwo(imageT.assets);
    setImagesTwo(imageT);
    // console.log('seconf', imageT.assets);
  };

  const profileUpdate = async () => {
    let parsed = await AsyncStorage.getItem('resp');
    let users = JSON.parse(parsed);
    const user = users.user_id;
    // console.log(user)
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
    fetch('http://35.90.113.221/user_profile_pic_update/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      body: formdata,
    })
      .then(response => {
        // console.log('profile picture is updated ', response);
        setModalVisible(!modalVisible)
        getUser();
      })
      .catch(err => {
        console.log('errrr', err);
      });
  };
  useEffect(() => {
    postUser();
  }, []
  )
  useEffect(() => {
    getUser();
  }, []
  )
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 15,
        elevation: 5,
        marginTop: 20,
      }}>
      {blog.map((item, i) => (
        <ImageBackground
          key={i}
          source={{ uri: 'http://35.90.113.221' + item.background_image }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 300,
          }}>
          <Image
            key={i}
            source={{ uri: 'http://35.90.113.221' + item.images }}
            style={{
              width: 220,
              height: 220,
              borderRadius: 110,
              borderColor: 'white',
              borderWidth: 2,
              marginTop: 10,
            }}
          />
        </ImageBackground>
      ))}
      {blog1.map((item, i) => (
        <View key={i}
          style={{ position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
          <Text
            key={item.i}
            style={{
              color: '#C4C4C4',
              fontWeight: 'bold',
              fontSize: 16
            }}>
            {item.first_name} {item.last_name}</Text>
          <Text
            key={item.i}
            style={{
              color: '#C4C4C4',
              fontWeight: 'bold',
              fontSize: 15,
            }}>
            {item.email}</Text>
        </View>

      ))
      }
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View>
            <View style={styles.modalView}>
              <Pressable
                style={[styles.buttons, styles.buttonOpen]}
                onPress={() => setModalVisible(false)}>
                <Icon name="cross" size={20} color="white" />
              </Pressable>

              <TouchableOpacity
                style={styles.circles}
              onPress={open}
              >
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
                source={uri} 
                />
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
              onPress={openTwo}
              >
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
                source={uriTwo} 
                />
              </TouchableOpacity>
              <Text
                style={{
                  alignSelf: 'center',
                  color: 'black',
                  fontSize: 15
                }}>
                Background image</Text>
              <Pressable
                style={[styles.button, styles.buttonClose, styles.input_top]}
              onPress={() => profileUpdate()}
              >
                <Text style={styles.textStyle}> Update About</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Icon name="edit" size={20} color="white" />
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: '4%',
          marginBottom: '4%',
        }}>
        <View
          style={{
            width: '40%',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Person
            style={{
              backgroundColor: '#637381',
              borderRadius: 5,
            }}
            size={18}
            name="person"
            color="white"
          />
          <TouchableOpacity
            style={{ marginLeft: '4%' }}>
            <Text style={{ color: '#637381' }}>
              Profile</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '40%',
            flexDirection: 'row',
          }}>
          <Heart
            size={18}
            name="heart"
            color="#637381" />
          <TouchableOpacity
            style={{ marginLeft: '4%' }}>
            <Text style={{ color: '#637381' }}>
              Followers</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            width: '20%',
            alignItems: 'center',
            paddingRight: 10
          }}>
          <Right
            size={18}
            name="chevron-right"
            color="#637381" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    position: 'absolute',
    top: 250,
    alignItems: 'center',
    left: 270,
  },
  modalView: {
    top: 100,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#F194FF',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  inputs: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ECECEC',
    width: wp('70%'),
    backgroundColor: 'white',
    color: 'black',
    elevation: 2,
    height: hp('5%'),
    fontSize: 10,
  },
  input_top: {
    marginTop: 15,
  },
  buttons: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    left: 120,
    top: -20
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
export default memo(Box_P);
