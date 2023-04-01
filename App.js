import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from './components/Screens/Splash';
import Forgot from './components/Screens/Forgot';
import MyDrawer from './components/MyDrawer';
import Aboutpost from './components/Screens/Aboutpost';
import Linkpost from './components/Screens/Linkpost';
import Pic from './components/Screens/Pic';
import Profile from './components/Screens/Profile';
import Posts from './components/Blog/PostDetail';
import HomePageDrawer from './components/HomePageDrawer'
import User from './components/User/User';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="HomePageDrawer" component={HomePageDrawer} />
        <Stack.Screen name="Forgot" component={Forgot} />
        <Stack.Screen name="MyDrawer" component={MyDrawer} />
        <Stack.Screen name="Aboutpost" component={Aboutpost} />
        <Stack.Screen name="Linkpost" component={Linkpost} />
        <Stack.Screen name="Pic" component={Pic} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen options={{ headerShown: true }} name="Posts" component={Posts} />
        <Stack.Screen options={{ headerShown: true }} name="User" component={User} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({})

export default App;
