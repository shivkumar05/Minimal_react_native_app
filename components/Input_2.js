import {
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React from 'react'

const Input_2 = (props) => {

  return (
    <View  >
      <Text
        style={{
          color: 'red',
          fontSize: 20
        }}>*</Text>
      <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        placeholder={props.title}
        placeholderTextColor={'#C4C4C4'}
        backgroundColor='white'
        onChangeText={props.changed}
        value={props.vale}
        style={styles.input1}
      />
    </View>
  );
};

const styles = StyleSheet.create({


  rows: {
    flexDirection: 'row'
  },
  input1: {
    borderColor: 'black',
    borderRadius: 10,
    height: hp('7.7%'),
    fontSize: 15,
    color:'black',
    marginTop: '4%',
    borderWidth: 1.5,
    width: '100%',
    borderColor: '#ECECEC',
  },
});
export default Input_2;

