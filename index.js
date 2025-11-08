import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// ✅ Modular Firebase Imports
import { getApp } from '@react-native-firebase/app';
import {
  getMessaging,
  setBackgroundMessageHandler,
} from '@react-native-firebase/messaging';

// ✅ Firebase Modular 방식으로 변경
const app = getApp();
const messaging = getMessaging(app);

// ✅ Firebase Modular 백그라운드메세지 수신
setBackgroundMessageHandler(messaging, async remoteMessage => {
  console.log('📩 [Background] 메시지 수신:', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
