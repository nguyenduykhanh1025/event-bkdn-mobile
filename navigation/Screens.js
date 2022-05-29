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

function AccountStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Account"
      screenOptions={{
        mode: 'card',
        headerShown: 'screen',
      }}
    >
      <Stack.Screen
        name="Account"
        component={Register}
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
    // <Stack.Navigator
    //   screenOptions={{
    //     mode: 'card',
    //     headerShown: 'screen',
    //   }}
    // >
    //   <Stack.Screen
    //     name="Home"
    //     component={Home}
    //     options={{
    //       header: ({ navigation, scene }) => (
    //         <Header title="Trang Chủ" search options navigation={navigation} scene={scene} />
    //       ),
    //       cardStyle: { backgroundColor: '#FFFFFF' },
    //       title: 'Trang Chủ'
    //     }}
    //   />

    // </Stack.Navigator>
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Đang tham gia') {
          iconName = 'carryout'
        } else if (route.name === 'Đã tham gia') {
          iconName = 'clockcircleo'
        } else {
          iconName = 'flag'
        }

        // if (route.name === 'Home') {
        //   iconName = focused
        //     ? 'ios-information-circle'
        //     : 'ios-information-circle-outline';
        // } else if (route.name === 'Settings') {
        //   iconName = focused ? 'ios-list-box' : 'ios-list';
        // }

        // You can return any component that you like here!
        return <Icon name={iconName} family="AntDesign" size={size} color={focused ? nowTheme.COLORS.PRIMARY : 'black'} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
      headerShown: false
    })}>
      <Tab.Screen name="Đang tham gia" component={Home} />
      <Tab.Screen name="Đã tham gia" component={Home} />
      <Tab.Screen name="Sắp diễn ra" component={Home} />
    </Tab.Navigator>
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
      <Drawer.Screen name="Home" component={HomeStack} options={{ title: 'Sự kiện' }} />
      {/* <Drawer.Screen name="Components" component={ComponentsStack} /> */}
      {/* <Drawer.Screen name="Articles" component={ArticlesStack} /> */}
      <Drawer.Screen name="Profile" component={ProfileStack} />
      {/* <Drawer.Screen name="Account" component={AccountStack} /> */}
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
