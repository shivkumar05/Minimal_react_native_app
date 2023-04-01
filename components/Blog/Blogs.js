import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  FlatList,
  Image,
  RefreshControl
} from 'react-native';
import React, { memo, useState, useEffect, useCallback } from 'react';
import Header from '../Header';
import Heading1 from '../Profile/Heading1';
import Data_P from '../Profile/Data_P';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Search from 'react-native-vector-icons/Feather';
import { Dropdown } from 'react-native-element-dropdown';

import Commenting from 'react-native-vector-icons/FontAwesome';
import Share from 'react-native-vector-icons/Entypo';
import Eye from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Loader';

const data = [
  { label: 'Latest', value: '1' },
  { label: 'Popular', value: '2' },
  { label: 'Oldest', value: '3' },
];

const Blogs = ({ props, navigation }) => {
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const GetId = (id) => {
    console.log('GetId clicked', id);
    navigation.navigate('Posts', {
      id: id
    });
  };
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
    fetch('http://35.90.113.221/view_all_posts/',
      requestOptions,
    ).then(resp => {
      resp.json().then(resp => {
        // console.log(resp)
        setLoading(false);
        setBlog(resp);
      });
    });
  };
  useEffect(() => {
    postUser();
  }, []
  )
  // for (let i = 0; i < blog.length; i++) {
  //   console.log(blog[i].created_date);
  //   let dates = blog[i].created_date;
  //   const date = new Date(dates);
  //   const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  //   console.log(formattedDate);

  // }
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    postUser();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const [value, setValue] = useState(null);

  return (<>
    {loading ? <Loader /> : (
      <SafeAreaView style={{ margin: 20 }}>
        <View>
          <Header />
          <TouchableOpacity
            style={{
              width: 35,
              height: 35,
              position: 'absolute'
            }}
            onPress={() => navigation.openDrawer()}>
          </TouchableOpacity>
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
              h1={Data_P[2].h1}
              userName={Data_P[2].userName}
            />

            <TouchableOpacity style={styles.but}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  color: '#ffffff',
                  alignSelf: 'center',
                }}
                onPress={() => {
                  navigation.navigate('NewPost', { id: 59 });
                }}>
                + New Post
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              marginTop: '8%',
              marginBottom: '5%'
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 0.5,
                borderColor: 'gray',
                borderRadius: 10,
                width: '50%',
                height: '80%',
              }}>
              <TouchableOpacity
                style={{ marginLeft: '2%' }}>
                <Search
                  name="search"
                  size={22}
                  color="#637381" />
              </TouchableOpacity>
              <TextInput
                placeholder="Search Post..."
                placeholderTextColor="#000000"
                style={{ color: "black" }} />
            </View>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              data={data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Latest"
              value={value}
              onChange={item => {
                setValue(item.value);
              }}
            />
          </View>
          <View style={{ height: 500 }} >
            <ScrollView showsVerticalScrollIndicator={false} refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
              <View>
                {blog.map((item, index) => (
                  <View
                    key={index}
                    style={styles.main1}>
                    <TouchableOpacity
                      key={index}
                      onPress={() => GetId(item.id)}
                    >
                      <Image
                        key={index}
                        style={{
                          width: '100%',
                          height: 300,
                          borderTopLeftRadius: 20,
                          borderTopRightRadius: 20,
                        }}
                        source={{ uri: 'http://35.90.113.221' + item.images }} />
                    </TouchableOpacity>
                    <Text
                      style={{
                        color: '#919EAB',
                        marginTop: '10%',
                        marginLeft: '5%'
                      }}>
                      {item.created_date}</Text>
                    <Text style={{
                      color: 'black',
                      marginTop: '3%',
                      marginLeft: '5%'
                    }}>
                      {item.blog_name}</Text>
                    <Text style={{
                      color: 'black',
                      marginTop: '3%',
                      marginLeft: '5%'
                    }}>
                      {item.tag_name}</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        FmarginLeft: '40%',
                        marginBottom: '5%',
                      }}>
                      <TouchableOpacity style={styles.space}>
                        <Commenting
                          name="commenting"
                          size={15}
                          color="#637381" />
                      </TouchableOpacity>
                      <Text>6.14k</Text>
                      <TouchableOpacity style={styles.space}>
                        <Eye
                          name="eye-sharp"
                          size={15}
                          color="#7E8B98"
                          solid />
                      </TouchableOpacity>
                      <Text>9.62k</Text>
                      <TouchableOpacity style={{ marginLeft: '5%' }}>
                        <Share
                          name="share"
                          size={15}
                          color="#7E8B98"
                          solid />
                      </TouchableOpacity>
                      <Text style={{ marginRight: '5%' }}>
                        1.9k</Text>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    )
    }
  </>
  );
};

export default memo(Blogs);

const styles = StyleSheet.create({
  dropdown: {
    padding: 3,
    borderColor: 'gray',
    borderWidth: 0.5,
    width: '30%',
    borderRadius: 10,
    marginLeft: '20%',
  },

  placeholderStyle: {
    fontSize: 15,
    color: 'grey',

  },
  but: {
    backgroundColor: '#F45CA5',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: 100,
  },
  main1: {
    // height:'100%',
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 20,
    marginBottom: 20,
  },

  space: {
    marginLeft: '5%',
  },
});
