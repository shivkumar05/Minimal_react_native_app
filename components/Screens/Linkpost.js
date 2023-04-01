import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Input_1 from '../Input_1';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = props => {
  const { navigation, route } = props;
  // console.log(props.route.params.id);
  // const [user, setUser] = useState(`${props.route.params.id}`);
  // const [user, setUser] = useState(`${props.route.params.id}`);
  const [facebook, onChangeFname] = useState('');
  const [instagram, onChangeLname] = useState('');
  const [linkedin, setEmail] = useState('');
  const [twitter, onChangeUser] = useState('');
  const [checkValidEmail, setCheckValidEmail] = useState(false);

  const postUser = async () => {
    let parsed = await AsyncStorage.getItem('resp');
    let users = JSON.parse(parsed);
    let tokens = JSON.parse(parsed);
    const user = users.user_id
    const token = tokens.access
    const item = {
      user,
      facebook,
      instagram,
      linkedin,
      twitter
    };
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      },

      body: JSON.stringify(item),
    };

    fetch(
      'http://35.90.113.221/user_social/',
      requestOptions,
    )
      .then(result => result.json())
      .then(resp => {
        console.log('Linkpost ', resp);
        if (resp.user) {
          navigation.navigate('Pic'
          );
        } else {
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.main}>
          <Image
            source={require('../../Images/Capture.png')}
            style={{
              height: hp('8%'),
              width: wp('16%'),
              borderRadius: 35
            }}
          />
          <Text style={styles.Heading}>
            Social links</Text>
          <Text style={styles.Para}>
            Enter the details below</Text>
          <Input_1
            place="facebook"
            change={onChangeFname}
            val={facebook}
          />
          <Input_1
            place="instagram"
            change={onChangeLname}
            val={instagram} />
          <Input_1
            place="linkedin"
            change={setEmail}
            val={linkedin}
          />
          <Input_1
            place="twitter"
            change={onChangeUser}
            val={twitter} />
          <TouchableOpacity
            onPress={() => postUser()}
            style={{
              backgroundColor: '#F45CA5',
              borderRadius: 10,
              marginTop: '7%',
              height: hp('8%'),
            }}>
            <Text
              style={{
                color: '#FFFFFF',
                alignSelf: 'center',
                marginTop: '6%',
                fontWeight: 'bold',
              }}>
              Next </Text>
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
  inputs: {
    marginTop: '8%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ECECEC',
    width: wp('90%'),
    backgroundColor: 'white',
    elevation: 2,
    height: hp('8%'),
    fontSize: 15,
  },
  rows: {
    flexDirection: 'row',
  },
  input1: {
    borderColor: 'black',
    borderRadius: 10,
    marginLeft: '3%',
    height: hp('7.7%'),
    fontSize: 15,
  },
  textFailed: {
    alignSelf: 'flex-end',
    color: 'red',
  },
});
export default SignUp;


