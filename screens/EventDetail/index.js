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
} from '../../services';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getEmailFromStorage } from '../../utils/user-helper';
import Toast from 'react-native-toast-message';
import InformationDetailOfEvent from './components/InformationDetailOfEvent';

const { width, height } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

function EventDetail({ navigation, route }) {
  const [event, setEvent] = useState(null);
  const [images, setImages] = useState([]);
  const [managerEventInformation, setManagerEventInformation] = useState(null);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     // event_users_status
  //     console.log('dasdasdasd');
  //     console.log(route.params.event_users_status);
  //   }, [])
  // )
  useEffect(() => {
    getEventDetailFromAPI();
  }, [route]);

  const getEventDetailFromAPI = async () => {
    try {
      const res = await participantEventService.show(route.params.idEvent);
      setEvent(res.data.data);
      buildImagesFromStr(event.images_str);
      buildManagerEventInformation(res.data.data.manager_event);
    } catch (err) {
    } finally {
    }
  };

  const buildManagerEventInformation = (data) => {
    setManagerEventInformation(` ${data.name} ${data.email} ${data.phone_number}`);
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
    try {
      const res = await eventUserService.joinToEvent(payload);
      navigation.goBack();
    } catch (err) {
      const message = err.response.data.message;
      if (message == 'exist_event_in_time') {
        alert(
          'Bạn đã tham gia sự kiện khác trong cùng khoảng thời gian. Vui lòng hủy sự kiện trước.'
        );
      }
      if (message == 'user_joined') {
        // ToastAndroid.show('Bạn đã tham gia sự kiện này.', ToastAndroid.SHORT, ToastAndroid.CENTER);
        alert('Bạn đã tham gia sự kiện này.');
      }

      if(message == 'exist_event_in_time') {
        alert('Bạn đã tham gia sự kiện khác cùng thời gian.');
      }
    } finally {
    }
  };

  const onClickRemoveToEvent = async () => {
    try {
      const payload = {
        id_event: event.id,
      };
      const res = await participantEventUserService.removeToEvent(payload);
      navigation.goBack();
    } catch (err) {
    } finally {
    }
  };

  return (
    <>
      <Toast />
      <ScrollView showsVerticalScrollIndicator={false}>
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
            >
              <Block flex style={styles.profileCard}>
                <Block
                  style={{ position: 'absolute', width: width, zIndex: 5, paddingHorizontal: 20 }}
                >
                  <Block style={{ top: height * 0.2 }}>
                    <Block middle></Block>
                    <Block style={styles.info}>
                      <Block row space="around">
                        <Block middle>
                          <Text
                            size={18}
                            color="white"
                            style={{ marginBottom: 4, fontFamily: 'montserrat-bold' }}
                          >
                            {event?.count_need_participate}
                          </Text>
                          <Text
                            style={{ fontFamily: 'montserrat-regular' }}
                            size={14}
                            color="white"
                          >
                            Số Lượng
                          </Text>
                        </Block>

                        <Block middle>
                          <Text
                            color="white"
                            size={18}
                            style={{ marginBottom: 4, fontFamily: 'montserrat-bold' }}
                          >
                            {event?.count_registered}
                          </Text>
                          <Text
                            style={{ fontFamily: 'montserrat-regular' }}
                            size={14}
                            color="white"
                          >
                            Đăng Kí
                          </Text>
                        </Block>

                        <Block middle>
                          <Text
                            color="white"
                            size={18}
                            style={{ marginBottom: 4, fontFamily: 'montserrat-bold' }}
                          >
                            {event?.count_participated}
                          </Text>
                          <Text
                            style={{ fontFamily: 'montserrat-regular' }}
                            size={14}
                            color="white"
                          >
                            Tham Gia
                          </Text>
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </ImageBackground>
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
                  <View
                    style={{
                      backgroundColor: nowTheme.COLORS.PRIMARY,
                      width: width,
                      height: 2,
                      marginTop: 10,
                    }}
                  />
                  <InformationDetailOfEvent title={'Địa điểm'} content={event?.address} />
                  <InformationDetailOfEvent title={'Bắt đầu'} content={event?.start_at} />
                  <InformationDetailOfEvent title={'Kết thúc'} content={event?.end_at} />
                  <InformationDetailOfEvent
                    title={'Đối tượng '}
                    content={event?.description_participant}
                  />
                  <InformationDetailOfEvent
                    title={'Yêu cầu '}
                    content={event?.description_required}
                  />
                  <InformationDetailOfEvent
                    title={'Phụ trách '}
                    content={managerEventInformation}
                  />
                </Block>

                <Block
                  style={{ paddingBottom: -HeaderHeight * 2, paddingHorizontal: 15, marginTop: 15 }}
                >
                  {/* <Block row space="between" style={{ flexWrap: 'wrap' }}> */}
                  {images.map((item, index) => {
                    return (
                      <Image
                        source={{ uri: item }}
                        key={`viewed-${index}`}
                        resizeMode="cover"
                        style={{ ...styles.thumb, width: '100%' }}
                      />
                    );
                  })}
                  {/* </Block> */}
                </Block>
              </Block>

              {!route.params.event_users_status ? (
                <Block middle row style={{ marginTop: 50 }}>
                  <TouchableOpacity onPress={onClickJoinToEvent}>
                    <Button
                      style={{ width: 300, height: 44, marginHorizontal: 20, elevation: 0 }}
                      textStyle={{ fontSize: 16 }}
                      round
                    >
                      Yêu Cầu Tham Gia
                    </Button>
                  </TouchableOpacity>
                </Block>
              ) : null}

              {route.params.event_users_status === 'IN_PROGRESS' ? (
                <Block middle row style={{ marginTop: 50 }}>
                  <TouchableOpacity onPress={onClickRemoveToEvent}>
                    <Button
                      style={{ width: 300, height: 44, marginHorizontal: 20, elevation: 0 }}
                      textStyle={{ fontSize: 16 }}
                      round
                    >
                      Hủy Tham Gia
                    </Button>
                  </TouchableOpacity>
                </Block>
              ) : null}
            </ScrollView>
          </Block>
        </Block>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    width,
    height: height - 600,
    padding: 0,
    zIndex: 1,
  },
  profileBackground: {
    width,
    height: height * 0.2,
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

export default EventDetail;
