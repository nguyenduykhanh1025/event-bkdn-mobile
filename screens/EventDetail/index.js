import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  ToastAndroid,
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

const { width, height } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

function EventDetail({ navigation, route }) {
  const [event, setEvent] = useState(null);
  const [images, setImages] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getEventDetailFromAPI();
    }, [])
  )


  const getEventDetailFromAPI = async () => {
    try {
      const res = await participantEventService.show(route.params.idEvent);
      setEvent(res.data.data);
      console.log(event);
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
    try {
      const res = await eventUserService.joinToEvent(payload);
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
        ToastAndroid.show(
          'Bạn đã tham gia sự kiện này.',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      }
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
                    <Block middle>
                    </Block>
                    <Block style={styles.info}>
                      <Block row space="around">
                        <Block middle>
                          <Text
                            size={18}
                            color="white"
                            style={{ marginBottom: 4, fontFamily: 'montserrat-bold' }}
                          >
                            2K
                          </Text>
                          <Text
                            style={{ fontFamily: 'montserrat-regular' }}
                            size={14}
                            color="white"
                          >
                            Friends
                          </Text>
                        </Block>

                        <Block middle>
                          <Text
                            color="white"
                            size={18}
                            style={{ marginBottom: 4, fontFamily: 'montserrat-bold' }}
                          >
                            26
                          </Text>
                          <Text
                            style={{ fontFamily: 'montserrat-regular' }}
                            size={14}
                            color="white"
                          >
                            Comments
                          </Text>
                        </Block>

                        <Block middle>
                          <Text
                            color="white"
                            size={18}
                            style={{ marginBottom: 4, fontFamily: 'montserrat-bold' }}
                          >
                            48
                          </Text>
                          <Text
                            style={{ fontFamily: 'montserrat-regular' }}
                            size={14}
                            color="white"
                          >
                            Bookmarks
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
                <Block style={{ paddingBottom: -HeaderHeight * 2, paddingHorizontal: 15 }}>
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

                <Block left>
                  {/* <Text
                    style={{
                      color: '#2c2c2c',
                      fontWeight: 'bold',
                      fontSize: 19,
                      fontFamily: 'montserrat-bold',
                      marginTop: 5,
                      marginBottom: 30,
                      zIndex: 2,
                    }}
                  >
                    {event?.title}
                  </Text>
                  <Text
                    size={16}
                    muted
                    style={{
                      textAlign: 'center',
                      fontFamily: 'montserrat-regular',
                      zIndex: 2,
                      lineHeight: 25,
                      color: '#9A9A9A',
                      paddingHorizontal: 15,
                    }}
                  >
                    {event?.description}
                  </Text> */}
                </Block>
              </Block>
              <Block
                middle
                row
                style={{ marginTop: 20 }}
              >
                <TouchableOpacity onPress={onClickJoinToEvent}>
                  <Button
                    style={{ width: 160, height: 44, marginHorizontal: 20, elevation: 0 }}
                    textStyle={{ fontSize: 16 }}
                    round
                  >
                    Yêu Cầu Tham Gia
                  </Button>
                </TouchableOpacity>
              </Block>
              <Block
                middle
                row
                style={{ marginTop: 5 }}
              >
                <TouchableOpacity onPress={onClickJoinToEvent}>
                  <Button
                    style={{ width: 160, height: 44, marginHorizontal: 20, elevation: 0, backgroundColor: '#fff' }}
                    textStyle={{ fontSize: 16, color: '#f96332' }}
                    round
                  >
                    Hủy Tham Gia
                  </Button>
                </TouchableOpacity>
              </Block>
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
