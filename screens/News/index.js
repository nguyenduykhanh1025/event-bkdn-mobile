import { useFocusEffect } from '@react-navigation/native';
import { Block, theme } from 'galio-framework';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';
import CardNews from './components/Card'

import articles from '../../constants/articles';
import { participantEventService, participantJournalService } from '../../services';


const { width } = Dimensions.get('screen');

const News = ({ navigation }) => {
  const [events, setEvents] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getEventsFromAPI()
    }, [])
  )

  const getEventsFromAPI = async () => {
    const params = {
      limit: 1000,
    }

    try {
      const res = await participantJournalService.paginate(params);
      console.log('res', res);
      setEvents(res.data.data.items);
    } catch (err) {
    }
  };

  const renderArticles = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.articles}>
        <Block flex>
          {events.map((item) => {
            return <CardNews item={articles[0]} horizontal data={item} key={item.id} navigation={navigation} />;
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

export default News;
