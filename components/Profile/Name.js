// import { View, Text ,  FlatList,
// } from 'react-native'
// import React, { useState,useEffect } from 'react';

// export default function Name() {
//     const [blog, setBlog] = useState([]);

//   const postUser = async () => {
//     let parsed = await AsyncStorage.getItem('resp');
//     let users = JSON.parse(parsed);
//     const user = users.id;
//     const token = users.access;

//     const requestOptions = {
//       method: 'GET',
//       redirect: 'follow',
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//       },
//     };
//     fetch('http://35.90.113.221/show/1/',
//       requestOptions,
//     ).then(resp => {
//       resp.json().then(resp => {
//         setBlog(resp);
//       });
//     });
//   };
//   // console.log('data===>>>', blog)
//   useEffect(() => {
//     setTimeout(() => {
//       postUser();
//     }, 3000);
//   });
//   return (
//     <FlatList 
//     style={{ width: 350 ,height:520 }}
//       data={blog}
//       renderItem={({ item, index }) =>
//         <View
//           key={index}>
//           <Text style={{color:'black'}}>
//             {item.first_name}</Text>
//           <Text style={{color:'black'}}>
//             {item.last_name}</Text>
//           <Text style={{color:'black'}}>
//             {item.email}</Text>
//           {/* <View>
//             <Text>6.14k</Text>
//             <Text>9.62k</Text>
//             <View>
//       <Text>6.14k</Text>
//             <Text>9.62k</Text>
//             </View>
//             <Text style={{ marginRight: '5%' }}>
//               1.9k</Text>
//           </View> */}
//         </View>
//       }
//     />
//   )
// }
