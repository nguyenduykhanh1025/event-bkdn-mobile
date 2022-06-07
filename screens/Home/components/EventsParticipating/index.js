import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, theme, Text } from 'galio-framework';

import { Card, Button } from '../../../../components';
import articles from '../../../../constants/articles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { participantEventService } from '../../../../services';

const { width } = Dimensions.get('screen');

const EventsParticipating = ({ navigation }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEventsFromAPI();
  }, []);

  const getEventsFromAPI = async () => {
    try {
      const res = await participantEventService.getEventsParticipating();
      setEvents(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const renderArticles = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.articles}>
        <Block flex>
          {events.map((item) => {
            return <Card item={articles[0]} horizontal data={item} />;
          })}
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

export default EventsParticipating;
