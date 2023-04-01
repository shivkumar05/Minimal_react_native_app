
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Switch,
  SafeAreaView, Platform, KeyboardAvoidingView, ScrollView,
} from 'react-native';
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";

import React, { memo, useState, useEffect } from 'react';
import Header from '../Header';
import Heading1 from '../Profile/Heading1';
import Data_P from '../Profile/Data_P';
import Underline from 'react-native-vector-icons/Feather';
import List from 'react-native-vector-icons/FontAwesome';
import Change from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { DevSettings } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';

const options = {
  title: 'Select Image',
  type: 'library',
  options: {
    selectionLimit: 1,
    mediaType: 'photo',
    includeBase64: false,
  },
}
const NewPost = props => {
  const richText = React.useRef();
  // const [selectedValue, setSelectedValue] = useState([]);
  const [dropdownData, setDropdownData] = useState([]);
  const { navigation, route } = props;
  const [uri, setUri] = useState();
  const [images, setImages] = useState();
  const [post_name, setPost] = useState();
  const [post_header, setHeader] = useState();
  const [post_content, setContent] = useState();
  const [tag_name, setTag] = useState();
  const [blog, setBlog] = useState();
  const open = async () => {
    const images = await launchImageLibrary(options);
    setUri(images.assets);
    setImages(images);
    console.log('first', images.assets);
  };
  const postUser = async () => {
    let parsed = await AsyncStorage.getItem('resp');
    // console.log('parsed', parsed)
    let users = JSON.parse(parsed);
    const user = users.user_id;
    const token = users.access;
    const formdata = new FormData();
    formdata.append('images', {
      uri: images.assets[0].uri,
      type: images.assets[0].type,
      name: images.assets[0].fileName,
    });

    formdata.append('user', user);
    formdata.append('post_name', post_name),
      formdata.append('post_header', post_header),
      formdata.append('post_content', post_content),
      formdata.append('tag_name', tag_name),
      formdata.append('blog', blog),
      fetch(`http://35.90.113.221/user_post/`, {
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        body: formdata,
      })
        .then(response => {
          console.log('Status code : ', response.status);
          if (response.status = 201) {
            // navigation.navigate('MyDrawer');
            DevSettings.reload();
          }
        })
        .catch(err => {
          console.log('errrr', err);
        });
  };



  // ===========/// get Blog list API ////===========//

  useEffect(() => {
    var config = {
      method: 'get',
      url: `http://35.90.113.221/blogs/`,
    };

    axios(config)
      .then(response => {
        // console.log(JSON.stringify(response.data));
        var count = Object.keys(response.data).length;
        let Array = [];
        for (var i = 0; i < count; i++) {
          Array.push({
            value: response.data[i].id,
            label: response.data[i].blog_name,
          });
        }
        setDropdownData(Array);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  const Toggle = props => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
      <View style={{ flexDirection: 'row', marginRight: '3%' }}>
        <Text
          style={{
            color: '#212B36',
            fontSize: 15,
            marginTop: '5%',
            marginLeft: '3%',
          }}>
          {props.text}
        </Text>
        <Switch
          trackColor={{ false: '#F45CA5', true: '#F45CA5' }}
          thumbColor={isEnabled ? '#c34984' : '#c34984'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={{
            marginLeft: '50%',
            marginTop: '4%',
          }}
        />
      </View>
    );

  };


  return (
    <SafeAreaView style={{ padding: 20 }}>
      <View>
        <Header />
        <TouchableOpacity style={{ width: 35, height: 35, position: 'absolute' }}
          onPress={() => navigation.openDrawer()}>
        </TouchableOpacity>
      </View>
      <ScrollView style={{ marginTop: 15 }} showsVerticalScrollIndicator={false}>
        <Heading1 sName={Data_P[1].sName} h1={Data_P[1].h1} userName={Data_P[1].userName} />
        <View style={styles.input}>
          <Text
            style={{
              color: 'red',
              fontSize: 20
            }}>*</Text>
          <TextInput
            value={post_name}
            autoCapitalize='none'
            autoCorrect={false}
            placeholder="Post"
            placeholderTextColor={'#C4C4C4'}
            backgroundColor='white'
            onChangeText={setPost}
            style={styles.input1}
          />
          <Text
            style={{
              color: 'red',
              fontSize: 20
            }}>*</Text>
          <TextInput
            autoCapitalize='none'
            autoCorrect={false}
            placeholder="Description"
            placeholderTextColor={'#C4C4C4'}
            backgroundColor='white'
            style={styles.input1}
            value={post_header}
            onChangeText={setHeader}
          />
          <SafeAreaView style={styles.description}>
            <RichToolbar
              actions={[actions.setBold, actions.setItalic, actions.setUnderline, actions.insertBulletsList, actions.insertOrderedList, actions.insertLink,]}
              iconMap={{ [actions.heading1]: ({ tintColor }) => (<Text style={[{ color: tintColor }]}>H1</Text>), }}
              editor={richText}
            />
            <ScrollView style={{ height: hp('35%') }}>
              <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                <Text>Content </Text>
                <RichEditor
                  style={{ height: 200 }}
                  autoGrow={true}
                  ref={richText}
                  value={post_content}
                  onChange={setContent}
                />
              </KeyboardAvoidingView>
            </ScrollView>
          </SafeAreaView>
          <Text style={styles.title}>
            Cover </Text>
          <TouchableOpacity
            onPress={open}
            style={{
              backgroundColor: '#F7F8FA',
              width: wp('85%'),
              marginTop: '5%',
              height: hp('45%'),
              borderRadius: 10,
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <ImageBackground
                source={require('../../Images/Drag.png')}
                style={styles.default}>
              </ImageBackground>
              <ImageBackground
                style={styles.avatar}
                source={uri}>
              </ImageBackground>
            </View>
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 20,
                  marginTop: '5%',
                  marginLeft: '3%',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  color: '#F45CA5',
                }}>
                Select a File</Text>
              <Text
                style={{
                  fontSize: 15,
                  alignSelf: 'center',
                  marginHorizontal: 1,
                }}>
                click here</Text>
              <TouchableOpacity
                style={{ fontSize: 15, marginTop: 2 }}
                onPress={open}>
                <Text
                  style={{
                    color: '#F45CA5', textDecorationLine: 'underline', fontWeight: 'bold',
                    fontSize: 20,
                    marginLeft: '3%',
                    justifyContent: 'center',
                    alignSelf: 'center',
                  }}>Browse
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.input}>
          <Toggle text="Publish" />
          <Toggle text="Comments" />
          <View
            style={{
              margin: 5,
              justifyContent: 'space-evenly',
              flexDirection: 'column',
            }}>
            <TextInput
              autoCapitalize='none'
              title="Tags"
              autoCorrect={false}
              placeholder="Tag"
              placeholderTextColor={'#C4C4C4'}
              backgroundColor='white'
              style={[styles.input1, styles.input3]}
              value={tag_name}
              onChangeText={setTag}
            />
            <Dropdown
              style={[styles.input1, styles.input3, styles.input]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={dropdownData}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={'Select Blog'}
              searchPlaceholder="Search..."
              value={blog}
              onChange={item => {
                setBlog(item.value);
              }}
            />
            <TextInput
              autoCapitalize='none'
              title="Meta Description"
              autoCorrect={false}
              placeholder="Meta Description"
              placeholderTextColor={'#C4C4C4'}
              backgroundColor='white'
              style={[styles.input1, styles.input3]}
            />
            <TextInput
              autoCapitalize='none'
              title="Meta Keyword"
              autoCorrect={false}
              placeholder="Meta Keyword"
              placeholderTextColor={'#C4C4C4'}
              backgroundColor='white'
              style={[styles.input1, styles.input3]}
            />
          </View>
          <View
            style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: 'white' }]}>
              <Text
                style={[styles.texts, { color: 'black' }]}>
                Preview</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: '#F45CA5' }]}
              onPress={() => {
                postUser();
                navigation.navigate('MyDrawer');
              }}>
              <Text style={[styles.texts, { color: 'white' }]}>
                Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView >

  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    width: '100%',
    padding: '2%',
    marginTop: '8%',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#F7F8FA',
    color: 'black',
    bottom: 10,
  },

  input1: {
    borderColor: 'black',
    borderRadius: 10,
    marginLeft: '2%',
    height: hp('7.7%'),
    fontSize: 15,
    width: wp('75%'),
    borderWidth: 1,
    borderColor: '#ECECEC',
    color: 'black',
  },
  input3: {
    marginBottom: 35
  },
  hairline: {
    marginTop: 10,
    backgroundColor: '#A2A2A2',
    height: hp('0.2%'),
    width: '100%',
  },
  btn: {
    height: hp('8%'),
    width: wp('40%'),
    borderRadius: 15,
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: '6%',
    marginTop: '5%',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ECECEC',
  },
  texts: {
    justifyContent: 'center',
    fontSize: 18,
    fontWeight: '500',
  },
  title: {
    color: '#6C7B88',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: '5%',
    marginLeft: '3%',
  },
  container: {
    marginLeft: '80%',
  },
  avatar: {
    height: 190,
    width: '95%',
    borderRadius: '24%',
    justifyContent: 'center',
    marginTop: '4%',
    alignContent: 'center',
    alignSelf: 'center',
    marginLeft: 15

  },
  default: {
    height: 110,
    width: 110,
    justifyContent: 'center',
    borderRadius: 80,
    marginBottom: 20,
    alignContent: 'center',
    alignSelf: 'center',
    marginTop: '4%',
    opacity: 150,
    position: 'absolute'

  },
  container: {
    backgroundColor: 'white',
    padding: 10,
    left: -5,
    bottom: 10
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  description: {
    backgroundColor: 'white',
    width: '100%',
    padding: '2%',
    marginTop: '8%',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#F7F8FA',
    color: 'black',
    bottom: 10,
  },
});
export default memo(NewPost);

