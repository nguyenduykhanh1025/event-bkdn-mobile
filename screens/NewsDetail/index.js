import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  ToastAndroid,
  View,
} from 'react-native';
import { Block, Text, theme, Button as GaButton } from 'galio-framework';

import { Button } from '../../components';
import { Images, nowTheme } from '../../constants';
import { HeaderHeight } from '../../constants/utils';
import { useFocusEffect } from '@react-navigation/native';
import {
  adminEventService,
  participantEventService,
  participantEventUserService,
  eventUserService,
  participantJournalService,
} from '../../services';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getEmailFromStorage } from '../../utils/user-helper';
import Toast from 'react-native-toast-message';
import InformationDetailOfEvent from '../EventDetail/components/InformationDetailOfEvent';
// import InformationDetailOfEvent from './components/InformationDetailOfEvent';

const { width, height } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

function NewsDetail({ navigation, route }) {
  const [event, setEvent] = useState(null);
  const [images, setImages] = useState([]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     // event_users_status
  //     console.log('dasdasdasd');
  //     console.log(route.params.event_users_status);
  //   }, [])
  // )
  useEffect(() => {
    getJournalDetailFromAPI();
  }, [route]);

  const getJournalDetailFromAPI = async () => {
    try {
      const res = await participantJournalService.show(route.params.idNews);
      setEvent(res.data.data);
      console.log(res.data.data);
      buildImagesFromStr(event.images_str);
    } catch (err) {
    } finally {
    }
  };

  const buildImagesFromStr = (imageStr) => {
    setImages(imageStr.split(','));
  };

  const onClickJoinToEvent = async () => {
    const email = await getEmailFromStorage();
    const payload = {
      email: email,
      id_event: event.id,
    };
    console.log(payload);
    try {
      const res = await eventUserService.joinToEvent(payload);
      navigation.goBack();
    } catch (err) {
      const message = err.response.data.message;
      if (message == 'exist_event_in_time') {
        ToastAndroid.show(
          'Bạn đã tham gia sự kiện khác trong cùng khoảng thời gian. Vui lòng hủy sự kiện.',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      }
      if (message == 'user_joined') {
        ToastAndroid.show('Bạn đã tham gia sự kiện này.', ToastAndroid.SHORT, ToastAndroid.CENTER);
      }
    } finally {
    }
  };

  const onClickRemoveToEvent = async () => {
    try {
      console.log(event.id);
      const payload = {
        id_event: event.id,
      };
      const res = await participantEventUserService.removeToEvent(payload);
      navigation.goBack();
      console.log('res', res);
    } catch (err) {
      console.log('err', err.response);
    } finally {
    }
  };

  return (
    <>
      <Block
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Block flex={0.1}>
          <ImageBackground
            source={Images.ProfileBackground}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}
          ></ImageBackground>
        </Block>
        <Block flex={0.9} style={{ padding: theme.SIZES.BASE, marginTop: 0 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Block flex style={{ marginTop: 0 }}>
              <Block left>
                <InformationDetailOfEvent title={''} content={event?.title} isTitleMain={true} />
                <InformationDetailOfEvent
                  title={''}
                  content={event?.description}
                  idDescription={true}
                />
              </Block>
            </Block>
            <View
              style={{
                backgroundColor: nowTheme.COLORS.PRIMARY,
                width: width,
                height: 2,
                marginTop: 10,
              }}
            />

            <Block
              style={{ paddingBottom: -HeaderHeight * 2, paddingHorizontal: 15, marginTop: 15 }}
            >
              <Block row space="between" style={{ flexWrap: 'wrap' }}>
                {images.map((item, index) => {
                  return (
                    <Image
                      source={{ uri: item }}
                      key={`viewed-${index}`}
                      resizeMode="cover"
                      style={styles.thumb}
                    />
                  );
                })}
              </Block>
            </Block>
          </ScrollView>
        </Block>
      </Block>
    </>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    width,
    height: height - 770,
    padding: 0,
    zIndex: 1,
  },
  profileBackground: {
    width,
    height: height * 0.09,
  },

  info: {
    marginTop: -60,
    paddingHorizontal: 0,
    height: height * 0.1,
  },
  avatarContainer: {
    position: 'relative',
    marginTop: -80,
  },
  avatar: {
    width: thumbMeasure,
    height: thumbMeasure,
    borderRadius: 50,
    borderWidth: 0,
  },
  nameInfo: {
    marginTop: 35,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure,
  },
  social: {
    width: nowTheme.SIZES.BASE * 3,
    height: nowTheme.SIZES.BASE * 3,
    borderRadius: nowTheme.SIZES.BASE * 1.5,
    justifyContent: 'center',
    zIndex: 99,
    marginHorizontal: 5,
  },
});

export default NewsDetail;
