import {
  StyleSheet,
  Alert,
  Modal,
  Text,
  View,
  FlatList,
  ScrollView,
  Pressable,
  TextInput
} from 'react-native';
import React, { memo, useEffect, useState } from 'react';
import Location from 'react-native-vector-icons/Ionicons';
import Email from 'react-native-vector-icons/MaterialIcons';
import Bag from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Entypo';

const About = () => {
  const [loading, setLoading] = useState(true);
  const [about, setAbout] = useState([]);


  // =================[get About Api]===============//


  const getUser = async () => {
    let parsed = await AsyncStorage.getItem('resp');
    let users = JSON.parse(parsed);
    const token = users.access;

    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    fetch('http://35.90.113.221/user_about_view/',
      requestOptions).then(
        respp => {
          respp.json().then(async respp => {
            setAbout(respp);
            setDescription(about.length > 0 ? about[0].description : '')
            setLocation(about.length > 0 ? about[0].location : '')
            setEmail(about.length > 0 ? about[0].email : '')
            setWorked_at(about.length > 0 ? about[0].workad_at : '')
            setStudied_at(about.length > 0 ? about[0].Studied_at : '')
            setLoading(false);
          });
        },
      );
  };
  useEffect(() => {
    getUser();
  }, []);
  // ===========================[Update About Api]=====================//

  const [modalVisible, setModalVisible] = useState(false);
  const [description, setDescription] = useState();
  const [location, setLocation] = useState();
  const [email, setEmail] = useState();
  const [workad_at, setWorked_at] = useState();
  const [Studied_at, setStudied_at] = useState();

  const Aboutupdate = async () => {
    let parsed = await AsyncStorage.getItem('resp');
    let users = JSON.parse(parsed);
    let tokens = JSON.parse(parsed);
    const user = users.user_id
    const token = tokens.access
    const item = { user, description, location, email, workad_at, Studied_at };
    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(item),
    };
    fetch('http://35.90.113.221/user_about_update/',
      requestOptions,
    )
      .then(result => result.json())
      .then(response => {
        console.log('aboutpost ', response);
        setModalVisible(!modalVisible)
        getUser();
        stateupdate()
      })
      .catch(error => {
        console.error('erorrrrrrr', error);
      });
  };
  // ==================[update state after update]=====================//
  const stateupdate =()=>{
    setDescription();
    setLocation();
    setEmail();
    setWorked_at();
    setStudied_at();
  }
  return (
    <>
      <ScrollView>
        <View>
          {about.map((items, index) => (
            <View style={styles.main} key={index}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#637381',
                }}>
                About
              </Text>
              <View
                style={{
                  width: '100%',
                  marginTop: 5
                }}>
                <Text
                  style={{
                    color: '#637381',
                  }}>
                  {items.description}
                </Text>

                <View style={styles.link}>
                  <Location
                    size={18}
                    name="ios-location"
                    color="#637381"
                    solid />
                  <Text style={styles.txt}>
                    Live at</Text>
                  <Text style={styles.txt1}>
                    {items.location}</Text>
                </View>

                <View style={styles.link}>
                  <Email
                    size={18}
                    name="email"
                    color="#637381"
                    solid />
                  <Text key={index} style={styles.txt}>
                    {items.email}</Text>
                </View>

                <View style={styles.link}>
                  <Bag
                    size={18}
                    name="shopping-bag"
                    color="#637381"
                    solid />
                  <Text style={styles.txt}>
                    Worked at</Text>
                  <Text style={styles.txt1}>
                    {items.workad_at}</Text>
                </View>

                <View style={styles.link}>
                  <Bag
                    size={18}
                    name="shopping-bag"
                    color="#637381"
                    solid />
                  <Text style={styles.txt}>
                    Studied at</Text>
                  <Text style={styles.txt1}>
                    {items.Studied_at}</Text>
                </View>
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
                    placeholder='About'
                    placeholderTextColor={'#C4C4C4'}
                    backgroundColor='white'
                    value={description}
                    onChangeText={setDescription}
                  />
                </View>
                <View style={[styles.inputs, styles.input_top]}>
                  <TextInput
                    placeholder='Address'
                    placeholderTextColor={'#C4C4C4'}
                    backgroundColor='white'
                    value={location}
                    onChangeText={setLocation}
                  />
                </View>
                <View style={[styles.inputs, styles.input_top]}>
                  <TextInput
                    placeholder='Email'
                    placeholderTextColor={'#C4C4C4'}
                    backgroundColor='white'
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>
                <View style={[styles.inputs, styles.input_top]}>
                  <TextInput
                    placeholder='Worked at'
                    placeholderTextColor={'#C4C4C4'}
                    backgroundColor='white'
                    value={workad_at}
                    onChangeText={setWorked_at}
                  />
                </View>
                <View style={[styles.inputs, styles.input_top]}>
                  <TextInput
                    placeholder='Studied at'
                    placeholderTextColor={'#C4C4C4'}
                    backgroundColor='white'
                    value={Studied_at}
                    onChangeText={setStudied_at}
                  />
                </View>
                <Pressable
                  style={[styles.button, styles.buttonClose, styles.input_top]}
                  onPress={() => Aboutupdate()}>
                  <Text style={styles.textStyle}> Update About</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => {setModalVisible(true),getUser()}}>
              <Icon name="edit" size={20} color="white" />
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
};

export default memo(About);

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    padding: '8%',
    width: '100%',
    borderRadius: 15,
    elevation: 5,
    marginTop: 30,
  },
  link: {
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 15,
  },
  txt: {
    marginLeft: 10,
    color: '#637381',
  },
  txt1: {
    marginLeft: 10,
    fontWeight: 'bold',
    color: '#637381',
  },
  centeredView: {
    position: 'absolute',
    top: 200,
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
});
