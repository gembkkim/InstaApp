import {
  Animated,
  Image,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  SafeAreaView,
  View,
} from 'react-native';
import React, { useEffect, useRef } from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Ionic from 'react-native-vector-icons/Ionicons';
// import { useNavigation } from '@react-navigation/native';

const Status = ({ route, navigation }) => {
  const { name, image } = route.params;
  const statusBarHeight = Math.floor(getStatusBarHeight());

  console.log('statusBarHeight: ' + statusBarHeight);
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let timer = setTimeout(() => {
      navigation.goBack();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [navigation]);

  useEffect(() => {
    Animated.timing(progress, {
      // Will change progress value to 5 in 5 seconds
      toValue: 5,
      duration: 5000,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const progressAnimation = progress.interpolate({
    inputRange: [0, 5],
    outputRange: ['0%', '100%'],
  });

  return (
    <SafeAreaView
      edges={['bottom', 'top']}
      style={{
        flex: 1,
        backgroundColor: 'black',
        height: '100%',
        justifyContent: 'center',
      }}
    >
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View
        style={{
          marginTop: Platform.OS === 'ios' ? statusBarHeight : 0,
          height: 3,
          width: '100%',
          borderWidth: 1,
          backgroundColor: 'gray',
          position: 'absolute',
          top: 18,
        }}
      >
        <Animated.View
          style={{
            height: '100%',
            backgroundColor: 'white',
            width: progressAnimation,
          }}
        />
      </View>
      <View
        style={{
          marginTop: Platform.OS === 'ios' ? statusBarHeight : 0,
          padding: 15,
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          top: 12,
          left: 0,
          width: '90%',
        }}
      >
        <View
          style={{
            borderRadius: 100,
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            source={image}
            style={{
              borderRadius: 100,
              backgroundColor: 'orange',
              width: '92%',
              height: '92%',
              resizeMode: 'cover',
            }}
          />
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: '100%',
          }}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 15,
              paddingLeft: 10,
            }}
          >
            {name}
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionic
              name="close"
              style={{
                color: 'white',
                fontSize: 15,
                opacity: 0.6,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Image
        source={image}
        style={{
          position: 'absolute',
          width: '100%',
          height: 600,
        }}
      />
    </SafeAreaView>
  );
};

export default Status;
