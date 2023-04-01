import {
    Image, 
    SafeAreaView, 
    ScrollView, 
    StyleSheet, 
    Text, 
    View, 
    TextInput,
    TouchableOpacity,
    BackHandler
} from 'react-native';
import React, { useState,useEffect } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CheckBox from '@react-native-community/checkbox';
import Eye from 'react-native-vector-icons/Ionicons';
import {user_login} from './user_api';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Company = "MyApp";




const Login = ({ navigation }) => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [seePassword, setSeePassword] = useState(true);
    const [checkValidEmail, setCheckValidEmail] = useState(false);
    const [t, setT] = useState();

    // ==================[Handle back button]===================//


    useEffect(() => {
      const backAction = () => {
        // handle the back button press here
        navigation.navigate('Homepage');
        return true; // returning true from the event listener prevents the default back action
      };
  
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
  
      return () => backHandler.remove(); // clean up the event listener when the component unmounts
    }, []);
    
    // ==================[Handle email check]===================//
    
const handleCheckEmail = text => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    setEmail(text);
    if (re.test(text) || regex.test(text)) {
      setCheckValidEmail(false);
    } else {
      setCheckValidEmail(true);
    }
  };

  const checkPasswordValidity = value => {
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(value)) {
      return 'Password must not contain Whitespaces Invalid credentials,';
    }
const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(value)) {
      return 'Password must have at least one Uppercase Character Invalid credentials,.';
    }
const isContainsLowercase = /^(?=.*[a-z]).*$/;
    if (!isContainsLowercase.test(value)) {
      return 'Password must have at least one Lowercase Character Invalid credentials,.';
    }
 const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(value)) {
      return 'Password must contain at least one Digit Invalid credentials,.';
    }
};
  const handleLogin =async () => {
    

    const checkPassowrd = checkPasswordValidity(password);
    if (!checkPassowrd) {
      user_login({
        email: email.toLocaleLowerCase(),
        password: password,
      })
        .then(async (result) => {
        
          if (result.data.access) {
            await AsyncStorage.setItem('resp',JSON.stringify (result.data));
            //  await AsyncStorage.setItem('token', result.data.access);
            // console.log("accesssss",result.data.access);
            // console.log("login user id",result.data.user_id);
            setT(result.data.message);
            navigation.replace('MyDrawer');
          }

else{
  setT(result.data.message); // alert(result.data.message);
}

        })
        .catch(err => {
          console.error(err); 
         
        });
    } else {
      setT(checkPassowrd);
      
    }
  };
  
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.main}>
                    <Image source={require('../../Images/Capture.png')} style={{ height: hp('8%'), width: wp('16%'), borderRadius: 35 }} />
                    <Text style={styles.Heading}>Sign in to {Company}</Text>
                    <Text style={styles.Para}>Enter your details below</Text>

                    <View style={[styles.inputs, styles.rows]}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={text => handleCheckEmail(text)}
                        placeholderTextColor={'#C4C4C4'}
                            color ='#898a87'
                        
                      />
</View>
{checkValidEmail ? (
    <Text style={styles.textFailed}>Wrong format email</Text>
  ) : (
    <Text style={styles.textFailed}> </Text>
  )}
                    
                    <View style={[styles.inputs, styles.rows]}>
                        <TextInput
                            autoCapitalize='none'
                            autoCorrect={false}
                            placeholder="Password"
                            placeholderTextColor={'#C4C4C4'}
                            color ='#898a87'
                          
                         
                        value={password}
                        secureTextEntry={seePassword}
                        // onChangeText={text => setPassword(text)}
                        onChangeText={setPassword}
                            style={{
                                margin: ('0%'), width: wp('70%'),
                            }}/>
                            
                        <TouchableOpacity style={{ alignSelf: 'center', marginLeft: ('5%') }}
                        onPress={() => setSeePassword(!seePassword)} >
                            <Eye name={seePassword === false ? "eye-sharp" : "eye-off-sharp"} size={20} color="#7E8B98" solid />
                        </TouchableOpacity>
                       
                    </View>
                    <Text style={styles.textFa}> {t}</Text>
                    <View style={{ flexDirection: 'row', width: wp('90%'), marginTop: ('15%') }}>
                        <View style={{ flexDirection: 'row', width: wp('45%'), }}>
                            <CheckBox
                                tintColor='#F45CA5'
                                disabled={false}
                                value={toggleCheckBox}
                                tintColors={"black"}
                                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                            />
                            <Text style={{ marginTop: ('3%'), color: 'black' }}>Remember me</Text>
                        </View>
                        <View style={{ width: wp('45%') }}>
                            <TouchableOpacity style={{ alignSelf: 'flex-end' }} 
                            onPress={()=>{ navigation.navigate("Forgot") }}
                            >
                                <Text style={{ fontWeight: '480', color: '#F45CA5', fontWeight: 'bold', marginTop: ('3%') }}>
                                    Forget password?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {email == '' || password == '' || checkValidEmail == true ? (
                        <TouchableOpacity
                          disabled
                          style={styles.buttonDisable}
                          onPress={handleLogin}>
                          <Text style={styles.text}>Login</Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity style={styles.button} onPress={handleLogin}>
                          <Text style={styles.text}>Login</Text>
                        </TouchableOpacity>
                      )}

                    <View style={{ flexDirection: 'row', marginTop: ('10%'), justifyContent: 'center' }}>
                        <Text style={{ alignSelf: 'center', color: 'black' }}> Don't have an account? </Text>
                        <TouchableOpacity onPress={() => { navigation.navigate("SignUp") }}>
                            <Text style={{ color: '#F45CA5', fontWeight: 'bold' }}> Get Started</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    main: {
        width: wp('100%'), backgroundColor: '#F2F1F0', padding: ('5%')
    },
    Heading: {
        fontSize: 25, color: 'black', fontWeight: 'bold', marginTop: '8%'
    },
    Para: {
        fontSize: 20, color: '#79747E', marginTop: '4%', marginBottom: ('10%')
    },
    inputs: {
        marginTop: ('10%'), borderColor: 'black', borderWidth: 1, borderRadius: 10, borderColor: '#ECECEC',
        width: wp('90%'), backgroundColor: 'white', elevation: 2, height: hp('8%'), fontSize: 15
    },
    rows: {
        flexDirection: 'row'
    },
    input1: {
        borderColor: 'black', borderRadius: 10, marginLeft: ('3%'), height: hp('7.7%'), fontSize: 15
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 20,
      },
      wrapperInput: {
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: 'grey',
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
      },
      input: {
        padding: 10,
        width: '100%',
      },
      wrapperIcon: {
        position: 'absolute',
        right: 0,
        padding: 10,
      },
      icon: {
        width: 30,
        height: 24,
      },
      button: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F45CA5',
        borderRadius: 5,
        marginTop: 25,
      },
      buttonDisable: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey',
        borderRadius: 5,
        marginTop: 25,
      },
      text: {
        color: 'white',
        fontWeight: '700',
      },
      textFailed: {
        alignSelf: 'flex-end',
        color: 'red',
      },
      textFa: {
        alignSelf: 'center',
        color: 'red',
      },

});
export default Login;

    
// const postUser = ()=> {
//        const requestOptions = {
//            method: 'POST',
//           headers: {
//             "Content-Type": "application/json",
//             // 'Content-Type': 'application/json',
//             Accept: 'application/json',
//             },
//          body: JSON.stringify({email:email,password:password}),
//         };
    
//         fetch(
//           'http://10.0.2.2:8000/login/',
//           // 'http://10.0.2.2:8000/forget_password/',
//         // 'http://35.90.113.221/login/',
//           requestOptions,
//         )
//           .then(result => result.json())
//           .then(resp => {
            
//             console.log('users',email,password)
//             console.log('login ', resp)
//             console.log('login ', resp.token)
//             setUserToken(resp.token)
//            if (resp.token) 
//                // (email === email && password === password)
//                 {
//                   alert(resp.message); // AsyncStorage.setItem('AccessToken', resp.data.token);
//                   navigation.navigate('MyDrawer',{item:userToken});
                 
//                 }
//             else
//             {
//               alert(resp.message);
//             }
//  })
//          .catch(resp => {
//             alert(resp);
//           });
//       };


//     const postUser = async () => {
//         //Check if any file is selected or not
//         console.log("csrf")
//         const item ={email:"ashi9@gmail.com",
//         password:"62071234",}
//         if (item) {
//           //If file selected then create FormData
//         //   const fileToUpload = email;
        
//            const data = new FormData();
//            data.append('name', 'Image Upload');
//            data.append('file_attachment', item);
//            const res = await fetch(
//             //  'http://192.168.1.6/login/',
//             'http://10.0.2.2:8000/login/',
//             // 'http://127.0.0.1:8000/login/',
//             // 'http://35.90.113.221/login/',
            
//              {
//                method: 'post',
//             //    credentials:'include',
//             //    mode:'same-origin',
//              //   CSRF:" % CSRF_TOKAN ",
//                body: JSON.stringify(
//                 email,
//        password,
//        console.log(email,password),
//            ),
//              headers: {
//                 //  'Content-Type': 'multipart/form-data; ',
//                  'Content-Type': 'application/json; ',
//                Accept: 'application/json',
//             //  'X-CSRFToken':"2gXMOB0bwf9ob9H87pIFWCqenKaDwP0O",
//                },
//              }
//           )
          
//        const responseJson = await res.json();
//            console.log('responseJson ', responseJson);
//        if (responseJson.status ) {
        
//              alert('Upload Successful');
//            }
//          } else {
//            //if no file selected the show alert
//            alert('Please Select File first');
         
//          }
//  };



    // const postUser = ()=> {
    //   const formData = new FormData()
    // //   formData.append('first_name', first_name);
    // //   formData.append('last_name', last_name);
    //   formData.append('profile_pic', email);
    // formData.append('profile_pic', password);
    // // formData.append('profile_pic', username);
    // //   const Token = 'secret'
      
    //   fetch('http://35.88.83.10/register/', {
    //       method: "POST",
    //       headers: {
    //         // Accept: "application/json",
    //         "Content-Type": "multipart/form-data",
    //       },
    //       body: formData
    //     })
    //     .then(response => console.log(response.json()))
    // };



// import AsyncStorage from '@react-native-async-storage/async-storage';
// import React, {useState,useEffect} from 'react';
// import {
//   Image,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import {user_login} from './user_api';


// export default function Login({navigation}) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [seePassword, setSeePassword] = useState(true);
//   const [checkValidEmail, setCheckValidEmail] = useState(false);

//   const handleCheckEmail = text => {
//     let re = /\S+@\S+\.\S+/;
//     let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

//     setEmail(text);
//     if (re.test(text) || regex.test(text)) {
//       setCheckValidEmail(false);
//     } else {
//       setCheckValidEmail(true);
//     }
//   };

//   const checkPasswordValidity = value => {
//     const isNonWhiteSpace = /^\S*$/;
//     if (!isNonWhiteSpace.test(value)) {
//       return 'Password must not contain Whitespaces.';
//     }

//     const isContainsUppercase = /^(?=.*[A-Z]).*$/;
//     if (!isContainsUppercase.test(value)) {
//       return 'Password must have at least one Uppercase Character.';
//     }

//     const isContainsLowercase = /^(?=.*[a-z]).*$/;
//     if (!isContainsLowercase.test(value)) {
//       return 'Password must have at least one Lowercase Character.';
//     }

//     const isContainsNumber = /^(?=.*[0-9]).*$/;
//     if (!isContainsNumber.test(value)) {
//       return 'Password must contain at least one Digit.';
//     }

//     const isValidLength = /^.{8,16}$/;
//     if (!isValidLength.test(value)) {
//       return 'Password must be 8-16 Characters Long.';
//     }

//     // const isContainsSymbol =
//     //   /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
//     // if (!isContainsSymbol.test(value)) {
//     //   return 'Password must contain at least one Special Symbol.';
//     // }

//     return null;
//   };

  // const handleLogin = () => {
  //   const checkPassowrd = checkPasswordValidity(password);
  //   if (!checkPassowrd) {
  //     user_login({
  //       email: email.toLocaleLowerCase(),
  //       password: password,
  //     })
  //       .then(result => {
  //         // console.log("giid", token);
  //         if (token) {
            
  //           AsyncStorage.setItem('AccessToken', token);
  //           console.log("accesssss",result.data.token)
  //           // navigation.replace('MyDrawer');
  //         }
  //       })
  //       .catch(err => {
  //         console.error(err);
  //       });
  //   } else {
  //     alert(checkPassowrd);
  //   }
  // };
  // useEffect(() => {
  //   setTimeout(() => {
  //     handleGetToken();
  //   }, 900);
  // });

  // const handleGetToken = async () => {
  //   const dataToken = await AsyncStorage.getItem('AccessToken');
  //   if (!dataToken) {
  //     console.log("excellent",'AccessToken');
  //     navigation.replace('Login');
  //   } else {
  //     navigation.replace('MyDrawer');
  //   }
  // };
 
  

//   return (
//     <View style={styles.container}>
//       <View style={styles.wrapperInput}>
//         <TextInput
//           style={styles.input}
//           placeholder="Email"
//           value={email}
//           onChangeText={text => handleCheckEmail(text)}
//         />
//       </View>
//       {checkValidEmail ? (
//         <Text style={styles.textFailed}>Wrong format email</Text>
//       ) : (
//         <Text style={styles.textFailed}> </Text>
//       )}
//       <View style={styles.wrapperInput}>
//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           value={password}
//           secureTextEntry={seePassword}
//           onChangeText={text => setPassword(text)}
//         />
//         <TouchableOpacity
//           style={styles.wrapperIcon}
//           onPress={() => setSeePassword(!seePassword)}>
          
//         </TouchableOpacity>
//       </View>
//       {email == '' || password == '' || checkValidEmail == true ? (
//         <TouchableOpacity
//           disabled
//           style={styles.buttonDisable}
//           onPress={handleLogin}>
//           <Text style={styles.text}>Login</Text>
//         </TouchableOpacity>
//       ) : (
//         <TouchableOpacity style={styles.button} onPress={handleLogin}>
//           <Text style={styles.text}>Login</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     marginHorizontal: 20,
//   },
//   wrapperInput: {
//     borderWidth: 0.5,
//     borderRadius: 5,
//     borderColor: 'grey',
//     marginTop: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   input: {
//     padding: 10,
//     width: '100%',
//   },
//   wrapperIcon: {
//     position: 'absolute',
//     right: 0,
//     padding: 10,
//   },
//   icon: {
//     width: 30,
//     height: 24,
//   },
//   button: {
//     padding: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'orange',
//     borderRadius: 5,
//     marginTop: 25,
//   },
//   buttonDisable: {
//     padding: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'grey',
//     borderRadius: 5,
//     marginTop: 25,
//   },
//   text: {
//     color: 'white',
//     fontWeight: '700',
//   },
//   textFailed: {
//     alignSelf: 'flex-end',
//     color: 'red',
//   },
// });