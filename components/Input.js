import {
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React from 'react'

const Input_1 = (props) => {

  return (
    <View >
      <Text
        style={{
          color: 'red',
          fontSize: 20
        }}>*</Text>
      <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        placeholder={props.place}
        placeholderTextColor={'#C4C4C4'}
        backgroundColor='white'
        onChangeText={props.change}
        value={props.val}
        style={styles.input1}
      />
    </View>
  );
};

const styles = StyleSheet.create({

  inputs: {
    marginTop: ('8%'),
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ECECEC',
    width: wp('90%'),
    backgroundColor: 'white',
    elevation: 2,
    height: hp('8%'),
    fontSize: 15
  },
  rows: {
    flexDirection: 'row'
  },
  input1: {
    width: '100%',
    marginTop: '5%',

    height: hp('15%'),
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#ECECEC',
    fontSize: 15,
  },
});
export default Input_1;

