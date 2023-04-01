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

const ProfileImage = (props) => {

    //================[fuction to render Profile pic]==================//

    const [blog, setBlog] = useState([]);
    let user = props.user
    const getUserPic = async () => {
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
            'http://35.90.113.221/profilepik/'+user,
            requestOptions,
        ).then(resp => {
            resp.json().then(resp => {
                setBlog(resp);
            });
        });
    };
    // console.log('newwww',props.user)

    useEffect(() => {
        getUserPic();
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
            <ImageBackground
                source={{ uri: 'http://35.90.113.221' + blog.background_image }}
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 300,
                }}>
                <Image
                    source={{ uri: 'http://35.90.113.221' + blog.images }}
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
export default memo(ProfileImage);
