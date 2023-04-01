import {
  StyleSheet,
  View,
  TextInput
} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React from 'react'

const Input_1 = (props) => {

  return (
    <View style={styles.inputs}>
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
    color:'black',
    elevation: 2,
    height: hp('8%'),
    fontSize: 15
  },
  rows: {
    flexDirection: 'row'
  },
  input1: {
    borderColor: 'black',
    borderRadius: 10,
    marginLeft: ('3%'),
    color:'black',
    height: hp('7.7%'),
    fontSize: 15,
  },
});
export default Input_1;

