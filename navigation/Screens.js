import { Animated, Dimensions, Easing } from 'react-native';
// header for screens
import { Header, Icon } from '../components';
import { nowTheme, tabs } from '../constants';

import Articles from '../screens/Articles';
import { Block } from 'galio-framework';
import Components from '../screens/Components';
// drawer
import CustomDrawerContent from './Menu';
// screens
import Home from '../screens/Home';
import Onboarding from '../screens/Onboarding';
import Pro from '../screens/Pro';
import Profile from '../screens/Profile';
import React from 'react';
import Register from '../screens/Register';
import SettingsScreen from '../screens/Settings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import {
  EventsInProgressAcceptScreen,
  EventsJoinedScreen,
  EventsParticipatingScreen,
} from '../screens/Home/components';
import EventDetail from '../screens/EventDetail';
import EventJoin from '../screens/EventJoin';
import EventNew from '../screens/EventNew';
import News from '../screens/News';

const { width } = Dimensions.get('screen');

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function ComponentsStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Components"
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="Components"
        component={Components}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Components" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
    </Stack.Navigator>
  );
}

function ArticlesStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Articles"
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="Articles"
        component={Articles}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Articles" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
    </Stack.Navigator>
  );
}

function RegisterStack(props) {
  return (
    <Stack.Navigator
      // initialRouteName="Register"
      screenOptions={{
        mode: 'card',
        // headerShown: 'screen',
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false, headerTransparent: true }}
      />
    </Stack.Navigator>
  );
}

function LoginStack(props) {
  return (
    <Stack.Navigator
      // initialRouteName="Register"
      screenOptions={{
        mode: 'card',
        // headerShown: 'screen',
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false, headerTransparent: true }}
      />
    </Stack.Navigator>
  );
}

function EventDetailStack(props) {
  return (
    <Stack.Navigator
      // initialRouteName="Register"
      screenOptions={{
        mode: 'card',
        // headerShown: 'screen',
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="EventDetail"
        component={EventDetail}
        options={{ headerShown: false, headerTransparent: true }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: ({ navigation, scene }) => (
            <Header transparent white title="Profile" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: '#FFFFFF' },
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="" back white transparent navigation={navigation} scene={scene} />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Đang tham gia') {
            iconName = 'carryout';
          } else if (route.name === 'Đã tham gia') {
            iconName = 'clockcircleo';
          } else {
            iconName = 'flag';
          }
          return (
            <Icon
              name={iconName}
              family="AntDesign"
              size={size}
              color={focused ? nowTheme.COLORS.PRIMARY : 'black'}
            />
          );
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Đang tham gia" component={EventsParticipatingScreen} />
      <Tab.Screen name="Đã tham gia" component={EventsJoinedScreen} />
      <Tab.Screen name="Sắp diễn ra" component={EventsInProgressAcceptScreen} />
    </Tab.Navigator>
  );
}

function EventJoinStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="EventJoin"
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="EventJoin"
        component={EventJoin}
        options={{
          header: ({ navigation, scene }) => (
            <Header transparent title="Create Account" navigation={navigation} scene={scene} />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function EventNewStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="EventNew"
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="EventNew"
        component={EventNew}
        options={{
          header: ({ navigation, scene }) => (
            <Header transparent title="Create Account" navigation={navigation} scene={scene} />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function NewsStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="News"
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="News"
        component={News}
        options={{
          header: ({ navigation, scene }) => (
            <Header transparent title="Create Account" navigation={navigation} scene={scene} />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      // drawerStyle={{
      //   backgroundColor: nowTheme.COLORS.PRIMARY,
      //   width: width * 0.8,
      // }}
      // drawerContentOptions={{
      //   activeTintcolor: nowTheme.COLORS.WHITE,
      //   inactiveTintColor: nowTheme.COLORS.WHITE,
      //   activeBackgroundColor: 'transparent',
      //   itemStyle: {
      //     width: width * 0.75,
      //     backgroundColor: 'transparent',
      //     paddingVertical: 16,
      //     paddingHorizonal: 12,
      //     justifyContent: 'center',
      //     alignContent: 'center',
      //     alignItems: 'center',
      //     overflow: 'hidden',
      //   },
      //   labelStyle: {
      //     fontSize: 18,
      //     marginLeft: 12,
      //     fontWeight: 'normal',
      //   },
      // }}
      initialRouteName="Home"
    >
      {/* <Drawer.Screen name="Home" component={HomeStack} options={{ title: 'Sự kiện' }} /> */}
      <Drawer.Screen name="EventJoin" component={EventJoinStack} options={{ title: 'Sự Kiện Tham Gia' }} />
      <Drawer.Screen name="EventNew" component={EventNewStack} options={{ title: 'Sự Kiện Mới' }} />
      <Drawer.Screen name="News" component={NewsStack} options={{ title: 'Tin Tức' }} />

      <Drawer.Screen name="Profile" component={ProfileStack} />
      <Drawer.Screen name="Register" component={RegisterStack} options={{ headerShown: false }} />
      <Drawer.Screen name="Login" component={LoginStack} options={{ headerShown: false }} />
      <Drawer.Screen name="EventDetail" component={EventDetailStack} options={{ headerShown: false }} />
      {/* <Drawer.Screen name="Register" component={RegisterStack} /> */}
    </Drawer.Navigator>
  );
}

export default function OnboardingStack(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        mode: 'card',
        headerShown: false,
      }}
    >
      {/* <Stack.Screen
        name="Home"
        component={HomeStack}
        option={{
          headerTransparent: true,
        }}
      /> */}
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
}
