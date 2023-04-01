import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer';
import NewPost from './Blog/NewPost';
import Profile from './Screens/Profile';
import Blogs from './Blog/Blogs';

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

const MyDrawer = () => {

  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Blog" component={Blogs} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="NewPost" component={NewPost} />
    </Drawer.Navigator>
  );
}

export default MyDrawer;