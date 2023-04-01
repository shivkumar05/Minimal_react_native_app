import {
  View, Text, TouchableOpacity, StyleSheet, FlatList, Image,
  SafeAreaView, TextInput, ScrollView, Button
} from 'react-native';
import React, { memo, useEffect, useState } from 'react';
import Heading1 from '../Profile/Heading1';
import Data_P from '../Profile/Data_P';
import { useRoute } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Send from 'react-native-vector-icons/Ionicons';

import Icon from 'react-native-vector-icons/FontAwesome';
import Loader from '../Loader';
import HTMLView from 'react-native-htmlview';
const Posts = ({ props, navigation }) => {
  const [replyVisible, setReplyVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [rshow, setRshow] = useState(false)
  const [replyValue, setReplyValue] = useState('');
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRoute()
  const [value, setValue] = useState(null);
  let id = route.params.id
  let Post = id
  const GetId = (user) => {
    console.log('GetId profile clicked', user);
    navigation.navigate('User', {
      user: user
    });
  };
  const handleReplyClick = () => {
    setReplyVisible(true);
  };

  const handleReplyCancel = () => {
    setReplyVisible(false);
    setReplyValue('');
  };

  const handleReplySubmit = () => {
    // Handle reply submission logic here
    setReplyVisible(false);
    setReplyValue('');
  };
  // console.log(replyVisible)
  const postUser = async () => {
    let parsed = await AsyncStorage.getItem('resp');
    let users = JSON.parse(parsed);
    const user = users.user_id;
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
    fetch('http://35.90.113.221/postdetail/' + id,
      requestOptions,
    ).then(resp => {
      resp.json().then(resp => {
        setLoading(false);
        setBlog(resp);
        // resp = blog
      });
    });
  };
  let dates = blog.created_date
  const date = new Date(dates);
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  //============[like POST API]=============

  const likePost = async () => {
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
          postUser();
          // console.log('item post ', resp)
        }
      })
  };
  useEffect(() => {
    postUser();
  }, []
  );




  // ==============[post comment api ]===============

  const [text, setText] = useState([]);
  const PostComment = async () => {
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
        // console.log('Linkpost ', resp);
        setText('');
        postUser();
      })
      .catch(error => {
        console.error(error);
      });
  };
  // ==================[REPLY POST API]========================
  // var user_token = JSON.parse(localStorage.getItem('user'));
  const [content, setcontent] = useState("");
  const postreplyUser = async (Comments) => {
    let parsed = await AsyncStorage.getItem('resp');
    let users = JSON.parse(parsed);
    let tokens = JSON.parse(parsed);
    const user = users.user_id
    const token = tokens.access
    console.log(user, content, Comments)
    let item = { user, Comments, content }
    console.log(item)
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
      'http://35.90.113.221/reply/',
      requestOptions,
    )
      .then(detail => detail.json())
      .then(resp => {
        if (resp) {
          console.log('item post ', resp)
        }
        data();
        postUser();
      })
      .catch(error => {
        console.error(error);
      });
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

  return (<>
    {loading ? <Loader /> : (
      <SafeAreaView style={{ marginLeft: 10, marginRight: 10 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            {/* <Header /> */}
          </View>

          <View
            style={{
              marginTop: 20,
              padding: 5
            }}
            showsVerticalScrollIndicator={false}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between'
              }}>
              <Heading1
                sName={Data_P[2].sName}
                h1={Data_P[3].h1}
                userName={Data_P[2].userName}
              />
            </View>
          </View>
          <View
            style={styles.main1}>
            <Image
              source={{ uri: 'http://35.90.113.221' + blog.images }}
              style={{
                width: '100%',
                height: 240,
                marginTop: 0,
                alignSelf: 'center',
                borderWidth: 0.1,
                borderColor: 'black',
                // borderRadius: 20,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                opacity: 0.5
              }} />
            <TouchableOpacity
              onPress={() => GetId(blog.user?.user.user)}>
              <Image
                source={{ uri: 'http://35.90.113.221' + blog.user?.user.images }}
                style={styles.userimage} />
            </TouchableOpacity>
            <Text style={{
              position: 'absolute',
              top: "1%",
              marginLeft: 15,
              fontSize: 18,
              fontWeight: '500',
              color: 'black',
              marginTop: 10
            }}> {blog.post_header}
            </Text>

            <Text style={{
              position: 'absolute',
              top: 190,
              fontSize: 16,
              fontWeight: '500',
              color: 'black',
              left: 80,
            }}>{blog.user?.first_name} {blog.user?.last_name}
            </Text>
            <Text style={{
              position: 'absolute',
              top: 205,
              fontSize: 16,
              fontWeight: '500',
              color: 'black',
              left: 80,
            }}>
              {/* {blog.created_date} */}
            {formattedDate}
            </Text>

            <Text style={{
              position: 'absolute',
              top: 230,
              fontSize: 8,
              right: 10,
              color: 'black',
            }}>Last Update:  {blog.update_date}
            </Text>
            <Text style={{
              fontSize: 13,
              color: 'black',
              marginTop: 10,
              left: 20,
              fontSize: 16,
              fontWeight: '500',
            }}>#{blog.blog}
            </Text>
            <TouchableOpacity onPress={() => likePost()}
              style={{ top: 245, position: 'absolute', right: '12%' }}>
              <Icon name="heart" size={25} color="#900" />
            </TouchableOpacity>
            <Text style={{
              top: 245, position: 'absolute', right: '7%',
              fontSize: 17,
              fontWeight: '500',
              color: 'black',
              // marginTop: 10
            }}>{blog.total_likes}
            </Text>
            <Text style={{
              fontSize: 13,
              left: 20,
              color: 'black',
              fontSize: 14,
              fontWeight: '500',
              marginTop: 10
            }}>{blog.tag_name}
            </Text>
            <Text style={{
              fontSize: 13,
              left: 20,
              color: 'black',
              fontSize: 15,
              fontWeight: '500',
              marginTop: 10
            }}>{blog.post_name}
            </Text>
            <Text style={{
              fontSize: 20,
              left: 20,
              color: 'black',
              fontWeight: '500',
              marginTop: 10,
            }}>Description :-</Text>
            <Text style={{
              fontSize: 13,
              left: 20,
              color: 'black',
              fontSize: 14,
              fontWeight: '500',
              marginTop: 10,
              marginBottom: 50,
            }}>
              <HTMLView value={blog.post_content} />
            </Text>

            <View
              style={{
                borderBottomColor: '#b0b0b0',
                borderBottomWidth: 1,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                marginTop: 15,
                top: 10,
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
                  source={{ uri: 'http://35.90.113.221' + blog.user?.user.images }}
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
                  style={{ width: wp('50%') }}
                  value={text}
                  onChangeText={setText}
                />
              </View>
              <TouchableOpacity
                onPress={() => PostComment()}>
                <Send
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
            <View
              style={{
                borderBottomColor: '#b0b0b0',
                borderBottomWidth: 1,
              }}
            />
            {/* Get comment section */}
            {blog.comment?.map((item, i) => (
              <View key={i} style={{ top: 20 }}>
                <TouchableOpacity>
                  <Image
                    source={{ uri: 'http://35.90.113.221' + item.user.user?.images }}
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
                    style={{
                      position: 'relative',
                      top: -30,
                      left: 100,
                      color: '#C4C4C4',
                      fontWeight: 'bold',
                      fontSize: 16
                    }}>
                    {item.user?.first_name}
                    {/* {item.text}  */}
                  </Text>
                  <Text style={{
                    position: 'relative',
                    top: -30,
                    left: 100,
                    color: '#C4C4C4',
                    fontWeight: 'bold',
                    fontSize: 14
                  }}
                  >{item.datetime}</Text>
                  <Text key={i} style={{
                    position: 'relative',
                    top: -30,
                    left: 100,
                    color: '#C4C4C4',
                    fontWeight: 'bold',
                    fontSize: 14
                  }}>{item.cid}{item.text}</Text>
                  <View style={{
                    position: 'relative',
                    top: -30,
                    left: 120,
                    color: 'pink',
                    fontWeight: 'bold',
                    fontSize: 14
                  }}>
                    {replyVisible && (
                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: 15,
                          // top: 10,
                        }}>
                        <TouchableOpacity
                          style={{
                            width: wp('8%'),
                            height: hp('3%'),
                            // marginLeft: '5%',
                          }}>
                          <Image
                            source={Data_P[0].img}
                            style={{
                              height: hp('5%'),
                              width: wp('10%'),
                              borderRadius: 30,
                            }}
                          />
                        </TouchableOpacity>

                        <View
                          style={{
                            borderWidth: wp('.3%'),
                            flexDirection: 'row',
                            width: '35%',
                            height: '57%',
                            borderRadius: 10,
                            marginBottom: '8%',
                            marginLeft: '4%',
                            borderColor: '#F4F6F8',
                          }}>
                          <TextInput
                            placeholder="Write a reply"
                            placeholderTextColor={'#C4C4C4'}
                            style={{ width: wp('30%') }}
                            value={content}
                            onChangeText={setcontent}
                          />
                        </View>
                        <TouchableOpacity
                          onClick={() =>
                            postreplyUser(item.cid)
                            // console.log('clicked ')
                          }
                        >
                          <Send
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
                        <Text>Reply</Text>
                      </View>
                    )}
                    {!replyVisible && (
                      <TouchableOpacity >
                        <Text>Reply</Text>
                      </TouchableOpacity>
                    )}

                  </View>
                  {/* Get reply comment section */}
                  {item.reply.map((items, index) => (<View key={index}>
                    <TouchableOpacity>
                      <Image
                        source={{ uri: 'http://35.90.113.221' + items.user.user?.images }}
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
                        {items.user?.first_name}
                        {/* {item.text}  */}
                      </Text>
                      <Text style={{
                        position: 'relative',
                        top: -30,
                        left: 140,
                        color: '#C4C4C4',
                        fontWeight: 'bold',
                        fontSize: 14
                      }}>{items.datetime}</Text>
                      <Text style={{
                        position: 'relative',
                        top: -30,
                        left: 140,
                        color: '#C4C4C4',
                        fontWeight: 'bold',
                        fontSize: 14
                      }}>{items.content}</Text>
                    </TouchableOpacity>
                  </View>
                  ))
                  }
                </TouchableOpacity>
              </View>
            ))
            }
          </View>
        </ScrollView>
      </SafeAreaView>
    )}
  </>
  )
};
export default memo(Posts);

const styles = StyleSheet.create({
  dropdown: {
    padding: 3,
    borderColor: 'gray',
    borderWidth: 0.5,
    width: '30%',
    borderRadius: 10,
    marginLeft: '20%'
  },
  placeholderStyle: {
    fontSize: 15,
  },
  main1: {
    // height:'100%',
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    borderRadius: 20,
    marginBottom: 20,
  },

  space: {
    marginLeft: '5%',
  },
  userimage: {
    width: 60,
    height: 60,
    position: 'absolute',
    top: -60,
    marginLeft: 15,
    borderWidth: 0.1,
    borderColor: 'black',
    borderRadius: 50
  },
  a: {
    fontWeight: '300',
    color: '#FF3366', // make links coloured pink
  },
});
