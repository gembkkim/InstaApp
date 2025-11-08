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
// import { Alert } from 'react-native';
import { getApp } from '@react-native-firebase/app';
import {
  getMessaging,
  requestPermission,
  getToken,
  onMessage,
  onTokenRefresh,
  setBackgroundMessageHandler,
  AuthorizationStatus,
} from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

// FCM 권한 요청
async function requestUserPermission() {
  try {
    const app = getApp();
    const messaging = getMessaging(app);

    const authStatus = await requestPermission(messaging);
    const enabled =
      authStatus === AuthorizationStatus.AUTHORIZED ||
      authStatus === AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('🔐 FCM 권한 허용됨:', authStatus);

      const token = await getToken(messaging);
      console.log('📱 FCM Token:', token);

      // TODO: 서버에 token 전송 로직 추가
    } else {
      console.log('🚫 FCM 권한 거부됨');
    }
  } catch (error) {
    console.error('❌ FCM Permission Error:', error);
  }
}
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

  // requestUserPermission();

  useEffect(() => {
    const app = getApp();
    const messaging = getMessaging(app);

    // ✅ 권한 요청 및 토큰 발급
    requestUserPermission();

    // ✅ FCM 메시지 수신 (앱 실행 중)
    const unsubscribeOnMessage = onMessage(messaging, async remoteMessage => {
      console.log('📩 포그라운드 메시지:', remoteMessage);
      Alert.alert(
        remoteMessage.notification?.title,
        remoteMessage.notification?.body,
      );
    });

    // ✅ 토큰 갱신 이벤트
    const unsubscribeOnTokenRefresh = onTokenRefresh(messaging, token => {
      console.log('♻️ 새 FCM 토큰:', token);
      // TODO: 서버에 새로운 토큰 갱신 전송
    });

    return () => {
      unsubscribeOnMessage();
      unsubscribeOnTokenRefresh();
    };
  }, []);

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
