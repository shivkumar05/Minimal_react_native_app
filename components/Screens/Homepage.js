import {
    View,
    Text,
    SafeAreaView,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
} from 'react-native';
import React from 'react';
import Video from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';


const Homepage = ({ navigation, props }) => {

    const goLogin = () => {
        navigation.navigate('Login')
    };
    const goSignUp = () => {
        navigation.navigate('SignUp')
    };

    const onBuffer = (data) => {
        console.log('buffer=====>', data)
    };

    const videoError = (data) => {
        console.log('error=====>', data)
    };

    return (
        <SafeAreaView
            style={{
                backgroundColor: '#efeded',
                marginBottom: 5
            }}>
            <ScrollView>
                <Video
                    volume={0}
                    source={require('../../Images/BackVideo.mp4')}
                    repeat={true}
                    onBuffer={onBuffer}
                    onError={videoError}
                    style={styles.backgroundVideo} />
                <View style={{
                    width: '80%',
                    backgroundColor: 'rgba(77,70,74,0.85)',
                    alignSelf: 'center',
                    padding: 15,
                    marginTop: 350,
                    borderRadius: 10
                }}>
                    <Text style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 18
                    }}>Featured Post</Text>
                    <View>
                        <View
                            style={{
                                flexDirection: 'row',
                            }}>
                            <Image
                                source={require('../../Images/Feature.webp')}
                                style={{
                                    width: '50%',
                                    height: 100,
                                    marginTop: 10
                                }}
                            />
                            <View style={{
                                marginLeft: '10%',
                                width: '30%',
                            }}>
                                <Text style={{
                                    color: 'white',
                                    marginTop: 10,
                                    fontSize: 20,
                                }}>Top Hikes In Australia</Text>
                                <Text style={{
                                    color: 'white',
                                    marginTop: 10,
                                    fontSize: 12
                                }}>Dec 11, 2 min</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 5 }}>
                            <Text style={{
                                color: 'white',
                                marginTop: 10,
                                fontSize: 13
                            }}>Create a blog post subtitle that summarizes your post in s few short,punchy sentances and entices your audiance to continue reading....</Text>
                            <View
                                style={{
                                    height: 1,
                                    backgroundColor: 'white',
                                    marginTop: 10
                                }} />
                            <Text style={{
                                color: 'white',
                                fontSize: 12,
                                marginTop: 5,
                            }}>0 comments</Text>
                        </View>
                    </View>
                </View>
                <View
                    style={styles.box}>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: 'black'
                    }}>About Us</Text>
                    <Image
                        source={require('../../Images/blogg.jpeg')}
                        style={{
                            width: '90%',
                            height: 180,
                            marginTop: 10,
                            alignSelf: 'center',
                            borderWidth: 0.1,
                            borderColor: 'black'
                        }} />
                    <Text style={{
                        fontSize: 13,
                        color: 'black',
                        marginTop: 10
                    }}>There are many reasons to start a blog for personal use and only a handful of strong ones for business blogging. Blogging for business, projects, or anything else that might bring you money has a very straightforward purpose – to rank your website higher in Google SERPs, a.k.a. increase your visibility.
                    </Text>
                </View>
                <View
                    style={styles.box}>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: 'black'
                    }}>Recent Posts</Text>
                    {/* <FlatList
                        data={PageText}
                        renderItem={({ item, index }) => */}
                    <View
                        style={{
                            alignItems: 'center',
                            padding: 10,
                            width: '100%',
                            elevation: 1,
                            marginTop: 10,
                            backgroundColor: 'white'
                        }}>
                        <Image
                            style={{ width: '100%', elevation: 1 }}
                            source={require('../../Images/travel.jpeg')} />
                        <Text
                            style={styles.text1}>
                            Maxixo : a Gulinary journey</Text>
                    </View>

                    {/* }/> */}
                </View>
                <View
                    style={{
                        width: '80%',
                        alignSelf: 'center',
                        marginTop: 30,
                        elevation: 0,
                        borderRadius: 10
                    }}>
                    <LinearGradient
                        colors={['#ffffff', '#878c9d']}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 0, y: 0 }}
                        style={{
                            padding: 15,
                            borderRadius: 10
                        }}>
                        <Text
                            style={styles.text1}>
                            "I've always found NerdWallet extremely helpful when I've been looking for good credit options and savings options! The information is very easy to understand!"
                        </Text>
                        <Text
                            style={{
                                color: 'black',
                                fontSize: 20
                            }}>
                            John W.</Text>
                    </LinearGradient>
                </View>
                <View style={{
                    flexDirection: 'row',
                    padding: 25,
                    backgroundColor: '#f45ca5',
                    marginTop: 20,
                    justifyContent: 'space-between'
                }}>
                    <View
                        style={{ alignItems: 'center' }}>
                        <Text style={styles.textBelow1}>
                            159</Text>
                        <Text style={styles.textBelow2}>
                            Number of Blogs</Text>
                    </View>
                    <View
                        style={{ alignItems: 'center' }}>
                        <Text style={styles.textBelow1}>
                            646</Text>
                        <Text style={styles.textBelow2}>
                            Likes</Text>
                    </View>
                    <View
                        style={{ alignItems: 'center' }}>
                        <Text style={styles.textBelow1}>
                            485</Text>
                        <Text style={styles.textBelow2}>
                            Comments</Text>
                    </View>
                    <View
                        style={{ alignItems: 'center' }}>
                        <Text style={styles.textBelow1}>
                            645</Text>
                        <Text style={styles.textBelow2}>
                            Recommandation</Text>
                    </View>
                </View>

                <View style={{
                    padding: 12,
                    backgroundColor: '#303035',
                    width: '100%',
                    alignItems: 'center',
                    paddingTop: 20
                }}>
                    <Text style={styles.textBelow1}>
                        My App : The Blogging App</Text>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '90%', marginTop: 10
                    }}>
                        <View>
                            <TouchableOpacity>
                                <Text style={styles.textBelow3}>
                                    Home</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.textBelow3}>
                                    About Us</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.textBelow3}>
                                    Posts</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => goLogin()}>
                                <Text style={styles.textBelow3}>
                                    Login In</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => goSignUp()}>
                                <Text style={styles.textBelow3}>
                                    Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                marginTop: 10,
                                alignItems: 'flex-end'
                            }}>
                            <Text style={styles.textBelow1} >
                                Contact Us</Text>

                            <View
                                style={{
                                    backgroundColor: 'white',
                                    width: 180,
                                    height: 40,
                                    padding: 0,
                                    borderRadius: 10
                                }}>
                                <TextInput
                                    placeholder='Email'
                                />
                            </View>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#0077b7',
                                    width: 100,
                                    height: 40,
                                    marginTop: 15,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 10
                                }}>
                                <Text style={styles.textBelow2}>
                                    Subscribe</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View
                style={{
                    backgroundColor: 'rgba(232,230,231,0.8)',
                    width: '100%',
                    padding: 15,
                    flex: 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                    position: 'absolute'
                }}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('HomePageDrawer');
                }}>
                    <Image
                        source={require('../../Images/Capture.png')}
                        style={{
                            height: 40,
                            width: 40,
                            borderRadius: 35
                        }} />
                </TouchableOpacity>

                <View>
                    <Text
                        style={{
                            color: 'black',
                            marginLeft: 10,
                            fontSize: 18,
                            fontWeight: 'bold'
                        }}>My App</Text>
                </View>
                <TouchableOpacity
                    onPress={() => goLogin()}
                    style={{ marginLeft: '60%' }}>
                    <Text
                        style={{
                            color: 'grey',
                            fontSize: 15,
                        }}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    backgroundVideo: {
        width: '100%',
        height: 1080,
        position: 'absolute',
    },

    box: {
        padding: 15,
        backgroundColor: 'rgba(255,255,255,0.8)',
        width: '80%',
        alignSelf: 'center',
        marginTop: 30,
        elevation: 0,
        borderRadius: 10
    },
    text1: {
        fontSize: 14,
        color: 'black',
        marginTop: 10
    },
    textBelow1: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    textBelow2: {
        color: 'white',
        fontSize: 11,

    },
    textBelow3: {
        color: 'white',
        fontSize: 15,
        marginTop: 10
    }

})

export default Homepage;



