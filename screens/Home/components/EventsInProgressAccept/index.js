import { useFocusEffect } from '@react-navigation/native';
import { Block, theme } from 'galio-framework';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';
import { Card } from '../../../../components';
import articles from '../../../../constants/articles';
import { participantEventService } from '../../../../services';


const { width } = Dimensions.get('screen');

const EventsInProgressAccept = ({ navigation }) => {
  const [events, setEvents] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getEventsFromAPI()
    }, [])
  )

  const getEventsFromAPI = async () => {
    const PARAMS_PAGINATE_DEFAULT = {
      page: 1,
      limit: 10000,
    };
    try {
      const res = await participantEventService.getEventsInComming();
      setEvents(res.data.data);
    } catch (err) {
    }
  };

  const renderArticles = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.articles}>
        <Block flex>
          {events.map((item) => {
            return <Card item={articles[0]} horizontal data={item} key={item.id} navigation={navigation} />;
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

export default EventsInProgressAccept;
