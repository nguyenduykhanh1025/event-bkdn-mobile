import React, { useState } from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { Block, Checkbox, Text, Button as GaButton, theme } from 'galio-framework';

import { Button, Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';
import { authService } from '../services';

const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

const Register = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [idStudent, setIdStudent] = useState('');
  const [password, setPassword] = useState('');

  const onCLickGoToLoginPage = () => {
    navigation.navigate('Login');
  };

  const onClickRegister = async () => {
    const payload = {
      first_name: fullName,
      last_name: '',
      email,
      phone_number: phoneNumber,
      id_student: idStudent,
      password: password,
    };

    try {
      await authService.registerParticipantAccount(payload);
      alert('Đăng kí thành công. Vui lòng đăng nhập.');
      navigation.navigate('Login');
    } catch (err) {
      console.log(err.response);
    } finally {
    }
  };

  return (
    <DismissKeyboard>
      <Block flex middle>
        <ImageBackground
          source={Images.RegisterBackground}
          style={styles.imageBackgroundContainer}
          imageStyle={styles.imageBackground}
        >
          <Block flex middle>
            <Block style={styles.registerContainer}>
              <Block flex space="evenly">
                <Block flex={0.15} middle style={styles.socialConnect}>
                  <Block flex={0.5} middle>
                    <Text
                      style={{
                        fontFamily: 'montserrat-regular',
                        textAlign: 'center',
                        fontWeight: 'bold',
                      }}
                      color={nowTheme.COLORS.PRIMARY}
                      size={28}
                    >
                      Đăng Ký
                    </Text>
                  </Block>
                </Block>
                <Block flex={1} middle space="between">
                  <Block center flex={0.9}>
                    <Block flex space="between">
                      <Block>
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
                        <Block width={width * 0.8}>
                          <Input
                            placeholder="Email"
                            style={styles.inputs}
                            value={email}
                            onChangeText={(e) => {
                              setEmail(e);
                            }}
                            iconContent={
                              <Icon
                                size={16}
                                color="#ADB5BD"
                                name="email-852x"
                                family="NowExtra"
                                style={styles.inputIcons}
                              />
                            }
                          />
                        </Block>
                        <Block width={width * 0.8}>
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
                        <Block width={width * 0.8}>
                          <Input
                            placeholder="Mật Khẩu"
                            style={styles.inputs}
                            value={password}
                            password
                            onChangeText={(e) => {
                              setPassword(e);
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
                        {/* <Block width={width * 0.8}>
                          <Input
                            placeholder="Nhập Lại Mật Khẩu"
                            style={styles.inputs}
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
                        </Block> */}
                        {/* <Block
                          style={{ marginVertical: theme.SIZES.BASE, marginLeft: 15 }}
                          row
                          width={width * 0.75}
                        >
                          <Checkbox
                            checkboxStyle={{
                              borderWidth: 1,
                              borderRadius: 2,
                              borderColor: '#E3E3E3'
                            }}
                            color={nowTheme.COLORS.PRIMARY}
                            labelStyle={{
                              color: nowTheme.COLORS.HEADER,
                              fontFamily: 'montserrat-regular'
                            }}
                            label="I agree to the terms and conditions."
                          />
                        </Block> */}
                      </Block>
                      <Block center>
                        <Button color="primary" round style={styles.createButton}>
                          <TouchableOpacity onPress={onClickRegister}>
                            <Text
                              style={{ fontFamily: 'montserrat-bold' }}
                              size={14}
                              color={nowTheme.COLORS.WHITE}
                            >
                              Đăng Ký
                            </Text>
                          </TouchableOpacity>
                        </Button>
                      </Block>
                      <Block
                        center
                        style={{
                          flexDirection: 'row',
                        }}
                      >
                        <Text style={{}}>Tôi đã có tài khoản. Đăng nhập</Text>
                        <TouchableOpacity onPress={() => onCLickGoToLoginPage()} style={{}}>
                          <Text color={nowTheme.COLORS.PRIMARY}>{` tại đây.`}</Text>
                        </TouchableOpacity>
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </Block>
          </Block>
        </ImageBackground>
      </Block>
    </DismissKeyboard>
  );
};

// class Register extends React.Component {
//   render() {

//   }
// }

const styles = StyleSheet.create({
  imageBackgroundContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1,
  },
  imageBackground: {
    width: width,
    height: height,
  },
  registerContainer: {
    marginTop: 55,
    width: width * 0.9,
    height: height < 812 ? height * 0.8 : height * 0.8,
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 4,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: 'hidden',
  },
  socialConnect: {
    backgroundColor: nowTheme.COLORS.WHITE,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderColor: "rgba(136, 152, 170, 0.3)"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: '#fff',
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  socialTextButtons: {
    color: nowTheme.COLORS.PRIMARY,
    fontWeight: '800',
    fontSize: 14,
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT,
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5,
  },
  passwordCheck: {
    paddingLeft: 2,
    paddingTop: 6,
    paddingBottom: 15,
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    marginBottom: 40,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
});

export default Register;
