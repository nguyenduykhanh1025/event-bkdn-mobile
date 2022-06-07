import React, { useEffect } from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, theme, Text } from 'galio-framework';

import { Card, Button } from '../../components';
import articles from '../../constants/articles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { participantEventService } from '../../services';

const { width } = Dimensions.get('screen');

const Home = ({ navigation }) => {
  useEffect(() => {
    if (!AsyncStorage.getItem('@token')) {
      navigation.navigate('Login');
    }
    getEventsFromAPI();
  }, []);

  const getEventsFromAPI = async () => {
    const PARAMS_PAGINATE_DEFAULT = {
      page: 1,
      limit: 10000,
    };
    try {
      const res = await participantEventService.paginateEventIncoming(PARAMS_PAGINATE_DEFAULT);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const renderArticles = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.articles}>
        <Block flex>
          <Card item={articles[0]} horizontal />
          <Card item={articles[0]} horizontal />
          <Card item={articles[0]} horizontal />
          {/* <Card item={articles[0]} horizontal />
          <Card item={articles[0]} horizontal />
          <Card item={articles[0]} horizontal />
          <Card item={articles[0]} horizontal /> */}
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
// class Home extends React.Component {

//   render() {
//     return (
//       <Block flex center style={styles.home}>
//         {this.renderArticles()}
//       </Block>
//     );
//   }
// }

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

export default Home;
