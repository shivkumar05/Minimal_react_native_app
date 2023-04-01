import { StyleSheet, Text, View, FlatList, ScrollView, Modal, Pressable, TextInput } from 'react-native'
import React, { memo, useState, useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Linkedin from 'react-native-vector-icons/Entypo';
import Twitter from 'react-native-vector-icons/Entypo';
import Insta from 'react-native-vector-icons/Entypo';
import Facebook from 'react-native-vector-icons/Entypo';
// import {datatoken} from '../../App'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Entypo';

const Links = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [link, setLink] = useState([]);


  // =============[Get Link Api ] ====================//
  const postUser = async () => {
    let parsed = await AsyncStorage.getItem('resp');
    let tokens = JSON.parse(parsed);
    const token = tokens.access
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    fetch('http://35.90.113.221/user_social_view/',
      requestOptions,
    ).then(resp => {
      resp.json().then(async (resp) => {
        setLink(resp);
        setLinkedIn(link.length > 0 ? link[0].linkedin : '')
        setTwitter(link.length > 0 ? link[0].twitter : '')
        setInstagram(link.length > 0 ? link[0].instagram : '')
        setFacebook(link.length > 0 ? link[0].facebook : '')
        setLoading(false);
      });
    });
  }
  useEffect(() => {
    postUser();
  }, []);


  // ===================[Update Api Link  ] ======================//

  const [linkedin, setLinkedIn] = useState();
  const [twitter, setTwitter] = useState();
  const [instagram, setInstagram] = useState();
  const [facebook, setFacebook] = useState();
  const Linkupdate = async () => {
    let parsed = await AsyncStorage.getItem('resp');
    let users = JSON.parse(parsed);
    let tokens = JSON.parse(parsed);
    const user = users.user_id
    const token = tokens.access
    // console.log("user", token, user)
    const item = { user, linkedin, twitter, instagram, facebook };
    // console.log(item);
    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(item),
    };
    fetch('http://35.90.113.221/user_social_update/',
      requestOptions,
    )
      .then(result => result.json())
      .then(response => {
        console.log('aboutpost ', response);
        setModalVisible(!modalVisible)
        postUser();
        stateupdate();
      })
      .catch(error => {
        console.error('erorrrrrrr', error);
      });
  };
  // ==================[update state after update]=====================//
  const stateupdate = () => {
    setLinkedIn();
    setTwitter();
    setInstagram();
    setFacebook();
  }


  return (
    <>
      <ScrollView>
        <View style={{
          backgroundColor: 'white',
          padding: '8%',
          width: '100%',
          borderRadius: 15,
          // marginTop: '8%',
          elevation: 5,
          marginTop: 30,
        }}>

          <View>
            {link.map((items, i) => (
              <View key={i}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#637381',
                  }}>
                  Social</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: 10,
                    marginTop: 15,
                  }}>
                  <Linkedin
                    size={18}
                    name="linkedin"
                    color="#006097"
                    solid />
                  <Text
                    style={{
                      marginLeft: ('5%'),
                      color: '#637381'
                    }}>
                    {items.linkedin}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: 10,
                    marginTop: 15
                  }}>
                  <Twitter
                    size={18}
                    name="twitter"
                    color="#1C9CEA"
                    solid />
                  <Text
                    style={{
                      marginLeft: ('5%'),
                      color: '#637381'
                    }}>
                    {items.twitter}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: 10,
                    marginTop: 15,
                  }}>
                  <Insta
                    size={18}
                    name="instagram"
                    color="#D7336D"
                    solid />
                  <Text
                    style={{
                      marginLeft: ('5%'),
                      color: '#637381'
                    }}>
                    {items.instagram}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: 10,
                    marginTop: 15,
                  }}>
                  <Facebook
                    size={18}
                    name="facebook"
                    color="#1877F2"
                    solid />
                  <Text
                    style={{
                      marginLeft: ('5%'),
                      color: '#637381'
                    }}>
                    {items.facebook}</Text>
                </View>
              </View>
            ))}
          </View>
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
                  <View style={styles.inputs}>
                    <TextInput
                      placeholder='LinkedIn'
                      placeholderTextColor={'#C4C4C4'}
                      backgroundColor='white'
                      value={linkedin}
                      onChangeText={setLinkedIn}
                    />
                  </View>
                  <View style={[styles.inputs, styles.input_top]}>
                    <TextInput
                      placeholder='Twitter'
                      placeholderTextColor={'#C4C4C4'}
                      backgroundColor='white'
                      value={twitter}
                      onChangeText={setTwitter}
                    />
                  </View>
                  <View style={[styles.inputs, styles.input_top]}>
                    <TextInput
                      placeholder='Instagram'
                      placeholderTextColor={'#C4C4C4'}
                      backgroundColor='white'
                      value={instagram}
                      onChangeText={setInstagram}
                    />
                  </View>
                  <View style={[styles.inputs, styles.input_top]}>
                    <TextInput
                      placeholder='Facebook'
                      placeholderTextColor={'#C4C4C4'}
                      backgroundColor='white'
                      value={facebook}
                      onChangeText={setFacebook}
                    />
                  </View>
                  <Pressable
                    style={[styles.button, styles.buttonClose, styles.input_top]}
                    onPress={() => Linkupdate()}>
                    <Text style={styles.textStyle}> Update Social</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => {setModalVisible(true),postUser()}}>
              <Icon name="edit" size={20} color="white" />
              {/* <Text style={styles.textStyle}>Edit Social</Text> */}
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default memo(Links);

const styles = StyleSheet.create({
  main: {
    width: wp('90%'),
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: ('8%'),
    elevation: 5,
  },
  link: {
    flexDirection: 'row',
    marginLeft: ('5%'),
    marginTop: ('5%'),
    width: ('90%'),
  },
  txt: {
    marginLeft: ('5%'),
    color: '#637381'
  },
  txt1: {
    marginLeft: ('2%'),
    fontWeight: 'bold',
    color: '#637381'
  },
  centeredView: {
    position: 'absolute',
    top: 150,
    alignItems: 'center',
    left: 250,
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
    left:120,
    top:-20
  },
})

