import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { memo,useState } from 'react';
import Photo from 'react-native-vector-icons/MaterialIcons';
import Attach from 'react-native-vector-icons/Ionicons';


const PostType = () => {

    const [text, onChangeText] = useState();
    return (
        <View style={styles.main}>
            <View style={{
                borderColor: 'black',
                borderWidth: 1,
                borderRadius: 10,
                borderColor: '#ECECEC',
                width: '100%',
                backgroundColor: 'white',
                elevation: 2,
                fontSize: 15,
                padding: 10,
                height: 150
            }}>
                <TextInput
                    placeholder='Share what you are thinking here'
                    placeholderTextColor='#808080'
                    multiline={true}
                    onChangeText={onChangeText}
                    style={{color:'grey'}}
                    value={text}
                />
            </View>
            <View
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    padding: 10,
                    justifyContent: 'space-between',
                    marginTop: 10
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        width: '20%',
                        justifyContent: 'space-between'
                    }}>
                    <TouchableOpacity >
                        <Photo
                            size={30}
                            name="add-photo-alternate"
                            color="#637381"
                            solid />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ marginLeft: 10 }}>
                        <Attach
                            size={30}
                            name="attach"
                            color="#637381"
                            solid />
                    </TouchableOpacity>
                </View>
                <View style={{ width: wp('15%') }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#21D393',
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: hp('4%'),
                            width: wp('15%'),
                        }}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: 16,
                                color: '#ffffff',
                                alignSelf: 'center',
                            }}>
                            Post</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    main: {
        backgroundColor: 'white',
        padding: '8%',
        width: '100%',
        borderRadius: 15,
        // marginTop: '8%',
        elevation: 5,
        marginTop: 30,
    },
});


export default memo(PostType);