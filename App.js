import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';

import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

import HomeScreen from './screens/HomeScreen';
import MessageScreen from './screens/MessageScreen';
import PostScreen from './screens/PostScreen';
import NotificationScreen from './screens/NotificationScreen';
import ProfileScreen from './screens/ProfileScreen';

import * as firebase from 'firebase';
import FirebaseKeys from './config';

var firebaseConfig = FirebaseKeys;
// Initialize Firebase
//firebase.initializeApp(firebaseConfig);

try {
  firebase.initializeApp(firebaseConfig)
} catch (err) {
  // we skip the "already exists" message which is
  // not an actual error when we're hot-reloading
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error raised', err.stack)
  }
}
// const firebaseApp = firebase;

const AppContainer = createStackNavigator(
  {
    default: createBottomTabNavigator(
      {
        Home: {
          screen: HomeScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Ionicons name='ios-home' size={24} color={tintColor} />
          }
        },
        Notification: {
          screen: NotificationScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Ionicons name='ios-notifications' size={24} color={tintColor} />
          }
        },
        Post: {
          screen: PostScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Ionicons name='ios-add-circle' size={48} color='#e9446a' style={{ shadowColor: '#e9446a', shadowOffset: { width: 0, height: 0 }, shadowRadius: 10, shadowOpacity: 0.3, elevation: 8 }} />
          }
        },
        Message: {
          screen: MessageScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Ionicons name='ios-chatboxes' size={24} color={tintColor} />
          }
        },
        Profile: {
          screen: ProfileScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Ionicons name='ios-person' size={24} color={tintColor} />
          }
        }
      },
      {
        defaultNavigationOptions: {
          tabBarOnPress: ({ navigation, defaultHandler }) => {
            if (navigation.state.key === 'Post') {
              navigation.navigate('postModal');
            } else {
              defaultHandler();
            }
          }
        },
        tabBarOptions: {
          activeTintColor: '#161f3d',
          inactiveTintColor: '#b8bbc4',
          showLabel: false
        }
      }
    ),
    postModal: {
      screen: PostScreen
    }
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
);

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppContainer,
      Auth: AuthStack
    },
    {
      initialRouteName: "Loading"
    }
  )
)