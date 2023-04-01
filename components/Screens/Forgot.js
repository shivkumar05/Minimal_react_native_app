import {
    Image, SafeAreaView, ScrollView, StyleSheet, Text, View, TextInput,
    TouchableOpacity, FlatList
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Company = "MyApp";

const Login = ({ navigation }) => {
    const [email, onChangeEmail] = useState('');
    const Loginn = () => {
        if
            (email === email) {
        }
        else { alert('please enter email') }
    };
    const onpress = () => {
        Loginn();
        postUser();
    }
    const postUser = () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: 'application/json',
            },
            body: JSON.stringify({ email: email }),
        };
        fetch(
            'http://35.90.113.221/forget_password/',
            requestOptions,
        )
            .then(result => result.json())
            .then(resp => {
                console.log('users', email)
                console.log('login ', resp)
                if (resp.message)
                // (email === email && password === password)
                {
                    //    alert(resp.message); // AsyncStorage.setItem('AccessToken', resp.data.token);
                }
                else {
                    //    alert("wrong",resp.message);
                }
            })
            .catch(resp => {
                alert(resp);
            });
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.main}>
                    <Image
                        source={require('../../Images/Capture.png')} style={{ height: hp('8%'), width: wp('16%'), borderRadius: 35 }} />
                    <Text style={styles.Heading}>
                        Forgot Your Password?</Text>
                    <Text style={styles.Para}>
                        Please enter the email address
                        associated with your account and We will email you
                        a link to reset your password.</Text>

                    <View
                        style={[styles.inputs, styles.rows]}>
                        <TextInput
                            autoCapitalize='none'
                            autoCorrect={false}
                            placeholder="Email address"
                            placeholderTextColor={'#C4C4C4'}
                            style={{
                                margin: ('0%'),
                                width: wp('70%'),
                            }}
                            onChangeText={onChangeEmail}
                            value={email}
                        />

                    </View>

                    <TouchableOpacity
                        style={{
                            alignSelf: 'center',
                            width: ('100%'),
                            height: ('10%'),
                            backgroundColor: '#F45CA5',
                            borderRadius: 10,
                            marginTop: ('10%')
                        }}
                        onPress={onpress}>
                        <Text
                            style={{
                                color: '#FFFFFF',
                                alignSelf: 'center',
                                marginTop: ('4%'),
                                fontWeight: 'bold'
                            }}>
                            Send Request</Text>

                    </TouchableOpacity>
                    <View style={{
                        flexDirection: 'row',
                        marginTop: ('10%'),
                        justifyContent: 'center'
                    }}>
                        <TouchableOpacity
                            onPress={() => { navigation.goBack("") }}
                        >
                            <Text
                                style={{
                                    color: '#F45CA5',
                                    fontWeight: 'bold'
                                }}>
                                Back</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    main: {
        width: wp('100%'),
        backgroundColor: '#F2F1F0',
        padding: ('5%')
    },
    Heading: {
        fontSize: 25,
        color: 'black',
        fontWeight: 'bold',
        marginTop: '8%'
    },
    Para: {
        fontSize: 20,
        color: '#79747E',
        marginTop: '4%',
        marginBottom: ('10%')
    },
    inputs: {
        marginTop: ('10%'),
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
        borderColor: 'black',
        borderRadius: 10,
        marginLeft: ('3%'),
        height: hp('7.7%'),
        fontSize: 15
    },


});
export default Login;
// <Input_1 place="Email address" change={onChangeEmail} val={email} />