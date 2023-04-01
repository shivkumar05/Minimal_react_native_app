import {
    StyleSheet,
    Text,
    View,
    ScrollView,
} from 'react-native';
import React, { memo, useEffect, useState } from 'react';
import Location from 'react-native-vector-icons/Ionicons';
import Email from 'react-native-vector-icons/MaterialIcons';
import Bag from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Entypo';

const UserAbout = (props) => {
    const [loading, setLoading] = useState(true);
    const [about, setAbout] = useState([]);

    // console.log('newwww about',props.user)
    // =================[get About Api]===============//

    let user = props.user
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

        fetch('http://35.90.113.221/about/'+user,
            requestOptions).then(
                respp => {
                    respp.json().then(async respp => {
                        setAbout(respp);
                        setLoading(false);
                    });
                },
            );
    };
    useEffect(() => {
        getUser();
    }, []);
    return (
        <>
            <ScrollView>
                <View>
                    <View style={styles.main}>
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
                                {about.description}
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
                                    {about.location}</Text>
                            </View>

                            <View style={styles.link}>
                                <Email
                                    size={18}
                                    name="email"
                                    color="#637381"
                                    solid />
                                <Text style={styles.txt}>
                                    {about.email}</Text>
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
                                    {about.workad_at}</Text>
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
                                    {about.Studied_at}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    );
};

export default memo(UserAbout);

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
        left: 120,
        top: -20
    },
});
