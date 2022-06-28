import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform } from 'react-native';
import { Block, Text, theme, Button as GaButton } from 'galio-framework';

import { Button } from '../components';
import { Images, nowTheme } from '../constants';
import { HeaderHeight } from '../constants/utils';
import { participantUserService } from '../services';

const { width, height } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    getProfileUser();
  }, []);

  const getProfileUser = async () => {
    try {
      const res = await participantUserService.getProfile();
      setUserProfile(res.data.data);
      console.log(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const renderFullName = () => {
    let fullName = '';
    if (userProfile?.last_name) {
      fullName += userProfile?.last_name;
    }
    if (userProfile?.first_name) {
      fullName += userProfile?.first_name;
    }
    return fullName;
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Block
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Block flex={0.5}>
          <ImageBackground
            source={Images.ProfileBackground}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}
          >
            <Block flex style={styles.profileCard}>
              <Block
                style={{ position: 'absolute', width: width, zIndex: 5, paddingHorizontal: 20 }}
              >
                <Block middle style={{ top: height * 0.15 }}>
                  <Image source={Images.ProfilePicture} style={styles.avatar} />
                </Block>
                <Block style={{ top: height * 0.2 }}>
                  <Block middle>
                    <Text
                      style={{
                        fontFamily: 'montserrat-regular',
                        marginBottom: theme.SIZES.BASE / 2,
                        fontWeight: '900',
                        fontSize: 26,
                      }}
                      color="#ffffff"
                    >
                      {renderFullName()}
                    </Text>

                    <Text
                      size={16}
                      color="white"
                      style={{
                        marginTop: 5,
                        fontFamily: 'montserrat-regular',
                        lineHeight: 20,
                        fontWeight: 'bold',
                        fontSize: 18,
                        opacity: 0.8,
                      }}
                    >
                      {userProfile?.id_student}
                    </Text>
                  </Block>
                  <Block style={styles.info}>
                    <Block row space="around">
                      <Block middle>
                        <Text
                          size={18}
                          color="white"
                          style={{ marginBottom: 4, fontFamily: 'montserrat-regular' }}
                        >
                          {userProfile?.sum_point_number['sum(point_number)']}
                        </Text>
                        <Text style={{ fontFamily: 'montserrat-regular' }} size={14} color="white">
                          Điểm tích lũy
                        </Text>
                      </Block>

                      <Block middle>
                        {/* <Text
                          color="white"
                          size={18}
                          style={{ marginBottom: 4, fontFamily: 'montserrat-regular' }}
                        >
                          26
                        </Text>
                        <Text style={{ fontFamily: 'montserrat-regular' }} size={14} color="white">
                          Sự kiện tham gia
                        </Text> */}
                      </Block>

                      <Block middle>
                        <Text
                          color="white"
                          size={18}
                          style={{ marginBottom: 4, fontFamily: 'montserrat-regular' }}
                        >
                          {userProfile?.sum_event_join}
                        </Text>
                        <Text style={{ fontFamily: 'montserrat-regular' }} size={14} color="white">
                          Sự kiện tham gia
                        </Text>
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>

              <Block
                middle
                row
                style={{ position: 'absolute', width: width, top: height * 0.6 - 26, zIndex: 99 }}
              >
                <Button
                  style={{ width: 114, height: 44, marginHorizontal: 5, elevation: 0 }}
                  textStyle={{ fontSize: 16 }}
                  round
                >
                  Follow
                </Button>
                <GaButton
                  round
                  onlyIcon
                  shadowless
                  icon="twitter"
                  iconFamily="Font-Awesome"
                  iconColor={nowTheme.COLORS.WHITE}
                  iconSize={nowTheme.SIZES.BASE * 1.375}
                  color={'#888888'}
                  style={[styles.social, styles.shadow]}
                />
                <GaButton
                  round
                  onlyIcon
                  shadowless
                  icon="pinterest"
                  iconFamily="Font-Awesome"
                  iconColor={nowTheme.COLORS.WHITE}
                  iconSize={nowTheme.SIZES.BASE * 1.375}
                  color={'#888888'}
                  style={[styles.social, styles.shadow]}
                />
              </Block>
            </Block>
          </ImageBackground>
        </Block>
        <Block flex={0.5} style={{ padding: theme.SIZES.BASE, marginTop: 0 }}>
          <Block flex style={{ marginTop: 0 }}>
            <Block middle>
              <Text
                style={{
                  color: '#2c2c2c',
                  fontWeight: 'bold',
                  fontSize: 19,
                  fontFamily: 'montserrat-regular',
                  marginTop: 0,
                  marginBottom: 30,
                  zIndex: 2,
                }}
              >
                Giới Thiệu
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
                {userProfile?.info_description}
              </Text>
            </Block>
            {/* <Block row style={{ paddingVertical: 14, paddingHorizontal: 15 }} space="between">
              <Text bold size={16} color="#2c2c2c" style={{ marginTop: 3 }}>
                Album
              </Text>
              <Button
                small
                color="transparent"
                textStyle={{ color: nowTheme.COLORS.PRIMARY, fontSize: 14 }}
              >
                View all
              </Button>
            </Block>

            <Block style={{ paddingBottom: -HeaderHeight * 2, paddingHorizontal: 15 }}>
              <Block row space="between" style={{ flexWrap: 'wrap' }}>
                {Images.Viewed.map((img, imgIndex) => (
                  <Image
                    source={img}
                    key={`viewed-${img}`}
                    resizeMode="cover"
                    style={styles.thumb}
                  />
                ))}
              </Block>
            </Block> */}
          </Block>
        </Block>
      </Block>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    width,
    height,
    padding: 0,
    zIndex: 1,
  },
  profileBackground: {
    width,
    height: height * 0.6,
  },

  info: {
    marginTop: 30,
    paddingHorizontal: 10,
    height: height * 0.8,
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

export default Profile;
