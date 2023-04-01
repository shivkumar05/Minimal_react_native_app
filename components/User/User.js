import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native';
import ProfileImage from './Profile_Image';
import UserAbout from './User_About';
import UserLink from './User_Link';
import UserPost from './User_Post';
import { useRoute } from '@react-navigation/native';

const User = () => {

    const route = useRoute()
    let user = route.params.user
    console.log(user)
    return (
        <SafeAreaView style={{ width: '100%', padding: 20, }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <ProfileImage user={user}/>
                    <UserAbout user={user}/>
                    <UserLink user={user}/>
                    <UserPost user={user}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})

export default User;
