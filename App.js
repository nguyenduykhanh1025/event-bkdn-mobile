import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Block, GalioProvider } from 'galio-framework';
import { NavigationContainer } from '@react-navigation/native';

import Screens from './navigation/Screens';
import { Images, articles, nowTheme } from './constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { participantUserService } from './services';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// cache app images
const assetImages = [
  Images.Onboarding,
  Images.Logo,
  Images.Pro,
  Images.NowLogo,
  Images.iOSLogo,
  Images.androidLogo,
  Images.ProfilePicture,
  Images.CreativeTimLogo,
  Images.InvisionLogo,
  Images.RegisterBackground,
  Images.ProfileBackground,
];

export default function App() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    updateExponentPushToken();
    _loadResourcesAsync();
  }, []);

  const updateExponentPushToken = () => {
    registerForPushNotification().then(async (token) => {
      if (token) {
        try {
          const payload = {
            exponent_push_token: token,
          };
          await participantUserService.updateExponentPushToken(payload);
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  const cacheImages = (images) => {
    return images.map((image) => {
      if (typeof image === 'string') {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
  };
  const _loadResourcesAsync = async () => {
    await Font.loadAsync({
      'montserrat-regular': require('./assets/font/Montserrat-Regular.ttf'),
      'montserrat-bold': require('./assets/font/Montserrat-Bold.otf'),
    });

    setFontLoaded(true);
    return Promise.all([...cacheImages(assetImages)]);
  };

  const _handleLoadingError = (error) => {
    console.warn(error);
  };

  const _handleFinishLoading = () => {
    if (fontLoaded) {
      setIsLoadingComplete(true);
    }
  };

  async function registerForPushNotification() {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status != 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      // finalStatus = status;
    }
    if (status !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    return token;
  }

  return (
    <NavigationContainer>
      {isLoadingComplete ? (
        <AppLoading
          startAsync={_loadResourcesAsync}
          onError={_handleLoadingError}
          onFinish={_handleFinishLoading}
        />
      ) : (
        <GalioProvider theme={nowTheme}>
          <Block flex>
            <Screens />
          </Block>
        </GalioProvider>
      )}
    </NavigationContainer>
  );
}
