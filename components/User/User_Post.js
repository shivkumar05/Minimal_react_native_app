import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Image,
  } from 'react-native';
  import Eye from 'react-native-vector-icons/Ionicons';
  
  import Box_P from '../Profile/Box_P';
  import Data_P from '../Profile/Data_P';
  import Dot3 from 'react-native-vector-icons/Entypo';
  import Heart from 'react-native-vector-icons/Entypo';
  import Share from 'react-native-vector-icons/Entypo';
  import Photo from 'react-native-vector-icons/MaterialIcons';
  import Smile from 'react-native-vector-icons/Fontisto';
  import Send from 'react-native-vector-icons/Ionicons';
  import Commenting from 'react-native-vector-icons/FontAwesome';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import React, { memo, useState } from 'react';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { useEffect } from 'react';
  import Loader from '../Loader';
  
  // ================[get user post api ]====================//
  
  const UserPost = (props) => {
    const [blog, setBlog] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log('newwww post',props.user)
    let newuser = props.user
    const postUser = async () => {
      let parsed = await AsyncStorage.getItem('resp');
      let users = JSON.parse(parsed);
      const user = users.id;
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
      fetch('http://35.90.113.221/user_post_data/'+newuser,
        requestOptions,
      ).then(resp => {
        resp.json().then(resp => {
          setLoading(false);
            setBlog(resp);
        });
      });
    };
  
    // ====================[comment api ]=============//
    const [text, setText] = useState([]);
    const PostComment = async (id) => {
      let Post = id
      let parsed = await AsyncStorage.getItem('resp');
      let users = JSON.parse(parsed);
      let tokens = JSON.parse(parsed);
      const user = users.user_id
      const token = tokens.access
  
      const item = {
        user,
        text,
        Post
      };
      console.log(item)
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
        'http://35.90.113.221/Comments/',
        requestOptions,
      )
        .then(result => result.json())
        .then(resp => {
          console.log('comment post ', resp);
          setText('');
          postUser();
        })
        .catch(error => {
          console.error(error);
        });
    };
  
    // ===========[like post api] =============//
    const likePost = async (id) => {
      console.log('GetId clicked', id);
      let parsed = await AsyncStorage.getItem('resp');
      let users = JSON.parse(parsed);
      const user = users.user_id;
      const token = users.access;
      let item = { id }
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization:
            'Bearer ' + token,
        },
        body: JSON.stringify(
          (item)
        ),
      };
  
      fetch(
        'http://35.90.113.221/like/' + id,
        requestOptions,
      )
        .then(resp => {
          if (resp) {
            // console.log('item post ', resp)
            postUser();
          }
        })
    };
  
    // ===========[Get profile picture of user api] =============//
    const [picture, setPicture] = useState([]);
    const Get_profile = async () => {
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
        'http://35.90.113.221/user_profile_pic/',
        requestOptions,
      ).then(resp => {
        resp.json().then(resp => {
          setPicture(resp);
        });
      });
    };
    useEffect(() => {
      Get_profile();
    }, []
    )
    useEffect(() => {
      postUser();
    }, []
    )
  
    return (
      <View>
        <SafeAreaView>
          <ScrollView>
            < View>
              {blog.map((item, index) => (
                <View
                  key={index}
                  style={{
                    elevation: 5,
                    width: wp('91%'),
                    backgroundColor: 'white',
                    borderRadius: 20,
                    marginTop: '8%',
                    // backgroundColor: 'red',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: '8%',
                      marginLeft: '5%',
                    }}>
                    <TouchableOpacity
                      style={{
                        width: wp('8%'),
                        height: hp('3%')
                      }}>
                      <Image
                        source={{ uri: item.user?.user.images }}
                        style={{
                          height: hp('5%'),
                          width: wp('10%'),
                          borderRadius: 30,
                        }}
                      />
                    </TouchableOpacity>
                    <View style={{ marginLeft: '5%' }}>
                      <TouchableOpacity>
                        <Text style={{
                          fontWeight: 'bold',
                          color: 'black'
                        }}>
                          {item.tag_name}
                        </Text>
                      </TouchableOpacity>
                      <Text
                        style={{ fontSize: 12, color: '#637381' }}>
                        {item.created_date}
                      </Text>
                    </View>
                    <TouchableOpacity>
                      <Dot3
                        style={{ marginLeft: '67%' }}
                        size={18}
                        name="dots-three-vertical"
                        color="#637381"
                        solid
                      />
                    </TouchableOpacity>
                  </View>
  
                  <Text
                    style={{
                      fontSize: 16,
                      marginTop: '8%',
                      margin: '5%',
                      color: '#637381',
                    }}>
                    {item.post_name}
                  </Text>
                  <Image
                    source={{ uri: item.images }}
                    style={{
                      width: wp('81%'),
                      height: hp('25%'),
                      marginLeft: '5%',
                      borderRadius: 5,
                    }}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: '8%',
                      marginLeft: '5%',
                    }}>
                    <TouchableOpacity style={{ borderRadius: 4 }} onPress={() => likePost(item.id)}>
                      <Heart
                        size={25}
                        name="heart"
                        color="#FF4842" />
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 16,
                        marginLeft: '2%',
                        color: 'black'
                      }}>{item.total_likes}
                    </Text>
                    <TouchableOpacity
                      style={{
                        height: hp('3.5%'),
                        width: wp('7%'),
                        borderRadius: 30,
                        borderWidth: wp('.3%'),
                        borderColor: 'white',
                        marginLeft: '17%',
                        position: 'absolute',
                      }}>
                      <Image
                        source={require('../../Images/avatar_3.jpg')}
                        style={{
                          height: hp('3.5%'),
                          width: wp('7%'),
                          borderRadius: 30,
                          position: 'absolute',
                        }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        height: hp('3.5%'),
                        width: wp('7%'),
                        borderRadius: 30,
                        borderWidth: wp('.3%'),
                        borderColor: 'white',
                        marginLeft: '23%',
                        position: 'absolute',
                      }}>
                      <Image
                        source={require('../../Images/avatar_4.jpg')}
                        style={{
                          height: hp('3.5%'),
                          width: wp('7%'),
                          borderRadius: 30,
                          position: 'absolute',
                        }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        height: hp('3.5%'),
                        width: wp('7%'),
                        borderRadius: 30,
                        borderWidth: wp('.3%'),
                        borderColor: 'white',
                        marginLeft: '29%',
                        position: 'absolute',
                      }}>
                      <Image
                        source={require('../../Images/avatar_5.jpg')}
                        style={{
                          height: hp('3.5%'),
                          width: wp('7%'),
                          borderRadius: 30,
                        }}
                      />
                    </TouchableOpacity>
  
                    <TouchableOpacity
                      style={{
                        height: hp('4%'),
                        width: wp('7.5%'),
                        borderRadius: 30,
                        backgroundColor: '#BEF6C7',
                        marginLeft: '21%',
                        borderWidth: wp('.3%'),
                        borderColor: 'white',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#70D798',
                          fontSize: 14,
                          fontWeight: 'bold',
                        }}>
                        +{item.total_likes}
                      </Text>
                    </TouchableOpacity>
  
  
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 15
                    }}>
                    <TouchableOpacity
                      style={{
                        width: wp('8%'),
                        height: hp('3%'),
                        marginLeft: '5%',
                      }}>
                      {
                        picture.map((item, index) => (
                          <Image
                            key={index}
                            source={{ uri: 'http://35.90.113.221' + item.images }}
                            style={{
                              height: 35,
                              width: 35,
                              borderRadius: 30,
                            }}
                          />
                        ))}
                      {/* <Image
                        source={Data_P[0].img}
                        style={{
                          height: hp('5%'),
                          width: wp('10%'),
                          borderRadius: 30,
                        }}
                      /> */}
                    </TouchableOpacity>
  
                    <View
                      style={{
                        borderWidth: wp('.3%'),
                        flexDirection: 'row',
                        width: '64%',
                        height: '57%',
                        borderRadius: 10,
                        marginBottom: '8%',
                        marginLeft: '6%',
                        borderColor: '#F4F6F8',
                      }}>
                      <TextInput
                        placeholder="Write a comment"
                        placeholderTextColor={'#C4C4C4'}
                        style={{ width: wp('44%') }}
                        value={text}
                        onChangeText={setText}
                      />
                    </View>
                    <TouchableOpacity>
                      <Send
                        onPress={() => PostComment(item.id)}
                        style={{
                          marginLeft: '20%',
                          marginTop: '10%'
                        }}
                        size={20}
                        name="send"
                        color="#637381"
                        solid
                      />
                    </TouchableOpacity>
                  </View>
                  {item.comment?.map((items, i) => (
                    <View key={i} style={{ top: -20 }}>
                      <TouchableOpacity>
                        <Image
                          source={{ uri:items.user.user?.images }}
                          style={{
                            width: 40,
                            height: 40,
                            top: 10,
                            left: 50,
                            borderWidth: 0.1,
                            borderColor: 'black',
                            borderRadius: 20,
                          }}
                        />
                        <Text
                          key={i}
                          style={{
                            position: 'relative',
                            top: -30,
                            left: 100,
                            color: '#C4C4C4',
                            fontWeight: 'bold',
                            fontSize: 16
                          }}>
                          {items.user?.first_name}
                          {/* {item.text}  */}
                        </Text>
                        <Text style={{
                          position: 'relative',
                          top: -30,
                          left: 100,
                          color: '#C4C4C4',
                          fontWeight: 'bold',
                          fontSize: 14
                        }}>{items.datetime}</Text>
                        <Text style={{
                          position: 'relative',
                          top: -30,
                          left: 100,
                          color: '#C4C4C4',
                          fontWeight: 'bold',
                          fontSize: 14
                        }}>{items.text}</Text>
                        <TouchableOpacity>
                          <Text style={{
                            position: 'relative',
                            top: -30,
                            left: 120,
                            color: 'pink',
                            fontWeight: 'bold',
                            fontSize: 14
                          }}>reply</Text>
                        </TouchableOpacity>
                        {/* Get reply comment section */}
                        {items.reply.map((itemss, index) => (<View key={index}>
                          <TouchableOpacity>
                            <Image
                              source={{ uri: 'http://35.90.113.221' + itemss.user.user?.images }}
                              style={{
                                width: 40,
                                height: 40,
                                top: 10,
                                left: 90,
                                borderWidth: 0.1,
                                borderColor: 'black',
                                borderRadius: 20,
                              }}
                            />
                            <Text
                              key={index}
                              style={{
                                position: 'relative',
                                top: -30,
                                left: 140,
                                color: '#C4C4C4',
                                fontWeight: 'bold',
                                fontSize: 16
                              }}>
                              {itemss.user?.first_name}
                              {/* {item.text}  */}
                            </Text>
                            <Text style={{
                              position: 'relative',
                              top: -30,
                              left: 140,
                              color: '#C4C4C4',
                              fontWeight: 'bold',
                              fontSize: 14
                            }}>{itemss.datetime}</Text>
                            <Text style={{
                              position: 'relative',
                              top: -30,
                              left: 140,
                              color: '#C4C4C4',
                              fontWeight: 'bold',
                              fontSize: 14
                            }}>{itemss.content}</Text>
                          </TouchableOpacity>
                        </View>
                        ))
                        }
                      </TouchableOpacity>
                    </View>
                  ))
                  }
                </View>
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    )
  }
  
  export default memo(UserPost)
  const styles = StyleSheet.create({
    main1: {
      backgroundColor: 'white',
      width: '100%',
      borderRadius: 20,
      marginBottom: 20,
    },
  
    space: {
      marginLeft: '5%',
    },
  });