import { useFocusEffect } from '@react-navigation/native';
import { Block, theme } from 'galio-framework';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';
import { Card } from '../../components';
import articles from '../../constants/articles';
import { participantEventService, participantUserService } from '../../services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

const { width } = Dimensions.get('screen');

const EventsInProgressAccept = ({ navigation }) => {
  const [events, setEvents] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      checkTokenIsExist();
      getEventsFromAPI();
      updateExponentPushToken();
    }, [])
  );

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
  
  const checkTokenIsExist = async () => {
    const token = await AsyncStorage.getItem('@token');
    if(!token) {
      navigation.navigate('Login')
    }

  }
  const getEventsFromAPI = async () => {
    const PARAMS_PAGINATE_DEFAULT = {
      page: 1,
      limit: 10000,
    };
    try {
      const res = await participantEventService.getEventsJoin();
      setEvents(res.data.data);
    } catch (err) {}
  };

  const renderArticles = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.articles}>
        <Block flex>
          {typeof events !== 'undefined'
            ? events.map((item) => {
                return (
                  <Card
                    item={articles[0]}
                    horizontal
                    data={item}
                    key={item.id}
                    navigation={navigation}
                  />
                );
              })
            : null}
        </Block>
      </ScrollView>
    );
  };

  return (
    <Block flex center style={styles.home}>
      {renderArticles()}
    </Block>
  );
};

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular',
  },
});

export default EventsInProgressAccept;
