/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Search from './src/screens/Search';
import Activity from './src/screens/Activity';
import Profile from './src/screens/Profile';
import Status from './src/screens/Status';
import FriendProfile from './src/screens/FriendProfile';
import EditProfile from './src/screens/EditProfile';
import Ionic from 'react-native-vector-icons/Ionicons';
// import messaging from '@react-native-firebase/messaging';
// import firebase from '@react-native-firebase/app';
// import { Alert } from 'react-native';

const Tab = createBottomTabNavigator();

const getTabBarIcon = (route, focused, size, color) => {
  let iconName;
  if (route.name === 'Home') {
    iconName = focused ? 'home-sharp' : 'home-outline';
  } else if (route.name === 'Search') {
    iconName = focused ? 'search' : 'search-outline';
  } else if (route.name === 'Activity') {
    iconName = focused ? 'heart' : 'heart-outline';
  } else if (route.name === 'Profile') {
    iconName = focused ? 'person-circle' : 'person-circle-outline';
  }
  return <Ionic name={iconName} size={size} color={color} />;
};

const BottomTabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 70,
        },
        tabBarIcon: ({ focused, size, color }) =>
          getTabBarIcon(route, focused, size, color),
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Activity" component={Activity} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

function App() {
  const Stack = createNativeStackNavigator();
  // console.log(firebase.app().name); // '[DEFAULT]' 출력돼야 정상

  // useEffect(() => {
  //   // ✅ 앱이 실행 중일 때 메시지 수신
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert(
  //       remoteMessage.notification?.title,
  //       remoteMessage.notification?.body,
  //     );
  //   });

  //   // ✅ 백그라운드 메시지 처리 핸들러 등록
  //   messaging().setBackgroundMessageHandler(async remoteMessage => {
  //     console.log('Message handled in the background!', remoteMessage);
  //   });

  //   // ✅ 알림 권한 요청 (Android는 자동 허용이지만, iOS는 필요)
  //   messaging().requestPermission();

  //   // ✅ 디바이스 토큰 가져오기
  //   messaging()
  //     .getToken()
  //     .then(token => console.log('FCM Token:', token));

  //   return unsubscribe;
  // }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Bottom" component={BottomTabScreen} />
        <Stack.Screen name="Status" component={Status} />
        <Stack.Screen name="FriendProfile" component={FriendProfile} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
