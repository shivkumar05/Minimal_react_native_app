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
import Blogs from '../Blog/Blogs';

const UserLink = (props) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [link, setLink] = useState([]);

    // console.log('newwww link',props.user)
    let user = props.user
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
        fetch('http://35.90.113.221/sociale/'+user,
            requestOptions,
        ).then(resp => {
            resp.json().then(async (resp) => {
                setLink(resp);
                setLoading(false);
            });
        });
    }
    useEffect(() => {
        postUser();
    }, []);
    return (
        <>
            <ScrollView>
                <View style={{
                    backgroundColor: 'white',
                    padding: '8%',
                    width: '100%',
                    borderRadius: 15,
                    elevation: 5,
                    marginTop: 30,
                }}>

                    <View>
                        <View >
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
                                    {link.linkedin}</Text>
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
                                    {link.twitter}</Text>
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
                                    {link.instagram}</Text>
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
                                    {link.facebook}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    );
};

export default memo(UserLink);

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
        left: 120,
        top: -20
    },
})

