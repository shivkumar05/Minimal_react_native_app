import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer';
import Homepage from './Screens/Homepage';
import Login from './Screens/Login';
import SignUp from './Screens/SignUp';
import Blogs from './Blog/Blogs';

const Drawer = createDrawerNavigator();

const HomePageDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Homepage" component={Homepage} options={{ headerShown: false }} />
      <Drawer.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Drawer.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
      {/* <Drawer.Screen name="Blog" component={Blogs} /> */}
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({})

export default HomePageDrawer;
