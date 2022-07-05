import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform, TouchableOpacity } from 'react-native';
import { Block, Text, theme, Button as GaButton } from 'galio-framework';

import { Button, Input, Icon } from '../components';
import { Images, nowTheme } from '../constants';
import { HeaderHeight } from '../constants/utils';
import { participantUserService } from '../services';
import Dialog from "react-native-dialog";
import { Toast } from 'galio-framework';

const { width, height } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [idStudent, setIdStudent] = useState('');
  const [isShowDialogUpdateInformation, setIsShowDialogUpdateInformation] = useState(false)
  const [isShowDialogUpdatePassword, setIsShowDialogUpdatePassword] = useState(false)
  const [userProfileOld, setUserProfileOld] = useState(null);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    getProfileUser();
  }, []);

  const getProfileUser = async () => {
    try {
      const res = await participantUserService.getProfile();
      setUserProfile(res.data.data);
      buildDataFromAPI(res.data.data)
      setUserProfileOld(res.data.data)
    } catch (err) {
    }
  };

  const renderFullName = (data) => {
    let fullName = '';
    if (data?.last_name) {
      fullName += data?.last_name;
    }
    if (data?.first_name) {
      fullName += data?.first_name;
    }
    return fullName;
  };


  const buildDataFromAPI = (data) => {
    setPhoneNumber(data.phone_number)
    setIdStudent(data.id_student)
    setFullName(renderFullName(data))
  }

  const onClickUpdateInformationProfile = async () => {
    const payload = {
      first_name: fullName,
      phone_number: phoneNumber,
      id_student: idStudent
    }

    try {
      await participantUserService.updateProfile(payload)
      setIsShowDialogUpdateInformation(false)
    } catch (err) {
    } finally {
    }
  }

  const onClickCancelInformationProfile = () => {
    setIsShowDialogUpdateInformation(false)
    buildDataFromAPI(userProfileOld)
  }

  const onClickUpdateUpdatePassword = async () => {
    const payload = {
      current_password: oldPassword,
      new_password: newPassword,
    }
    try {
      await participantUserService.updatePassword(payload)
      setIsShowDialogUpdatePassword(false)
      setOldPassword('')
      setNewPassword('')
    } catch (err) {
      console.log();
      if (err.response.data.message == 'current_pass_not_match') {
        alert('Mật khẩu hiện tại không đúng.');
      }
    } finally {
    }
  }

  const onClickCancelUpdatePassword = () => {
    setIsShowDialogUpdatePassword(false)
  }

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
                      {fullName}
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
                  onPress={() => { setIsShowDialogUpdateInformation(true) }}
                >
                  Sửa
                </Button>
                <Button
                  style={{ width: 114, height: 44, marginHorizontal: 5, elevation: 0 }}
                  textStyle={{ fontSize: 16 }}
                  round
                  onPress={() => { setIsShowDialogUpdatePassword(true) }}
                >
                  Đổi Mật Khẩu
                </Button>
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
          </Block>
        </Block>
      </Block>
      <Dialog.Container visible={isShowDialogUpdateInformation}>
        <Dialog.Title>Sửa Thông Tin Tài Khoản</Dialog.Title>
        <Dialog.Description>
          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
            <Input
              placeholder="Họ Và Tên"
              style={styles.inputs}
              value={fullName}
              onChangeText={(e) => {
                setFullName(e);
              }}
              iconContent={
                <Icon
                  size={16}
                  color="#ADB5BD"
                  name="profile-circle"
                  family="NowExtra"
                  style={styles.inputIcons}
                />
              }
            />
          </Block>
          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
            <Input
              placeholder="Số Điện Thoại"
              style={styles.inputs}
              value={phoneNumber}
              onChangeText={(e) => {
                setPhoneNumber(e);
              }}
              iconContent={
                <Icon
                  size={16}
                  color="#ADB5BD"
                  name="phone"
                  family="AntDesign"
                  style={styles.inputIcons}
                />
              }
            />
          </Block>
          <Block width={width * 0.8}>
            <Input
              placeholder="Mã Số Sinh Viên"
              style={styles.inputs}
              value={idStudent}
              onChangeText={(e) => {
                setIdStudent(e);
              }}
              iconContent={
                <Icon
                  size={16}
                  color="#ADB5BD"
                  name="idcard"
                  family="AntDesign"
                  style={styles.inputIcons}
                />
              }
            />
          </Block>
        </Dialog.Description>
        <Dialog.Button label="Thoát" onPress={onClickCancelInformationProfile} />
        <Dialog.Button label="Lưu" onPress={onClickUpdateInformationProfile} />
      </Dialog.Container>

      <Dialog.Container visible={isShowDialogUpdatePassword}>
        <Dialog.Title>Đổi Mật Khẩu</Dialog.Title>
        <Dialog.Description>
          <Block width={width * 0.8}>
            <Input
              placeholder="Mật Khẩu Hiện Tại"
              style={styles.inputs}
              value={oldPassword}
              password
              onChangeText={(e) => {
                setOldPassword(e);
              }}
              iconContent={
                <Icon
                  size={16}
                  color="#ADB5BD"
                  name="text"
                  family="Entypo"
                  style={styles.inputIcons}
                />
              }
            />
          </Block>
          <Block width={width * 0.8}>
            <Input
              placeholder="Mật Khẩu Mới"
              style={styles.inputs}
              value={newPassword}
              password
              onChangeText={(e) => {
                setNewPassword(e);
              }}
              iconContent={
                <Icon
                  size={16}
                  color="#ADB5BD"
                  name="text"
                  family="Entypo"
                  style={styles.inputIcons}
                />
              }
            />
          </Block>
        </Dialog.Description>
        <Dialog.Button label="Thoát" onPress={onClickCancelUpdatePassword} />
        <Dialog.Button label="Lưu" onPress={onClickUpdateUpdatePassword} />
      </Dialog.Container>
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
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT,
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5,
    width: '100%'
  },
});

export default Profile;
