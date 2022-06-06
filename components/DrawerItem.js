import { Block, Text, theme } from 'galio-framework';
import { Linking, StyleSheet, TouchableOpacity } from 'react-native';

import Icon from './Icon';
import React from 'react';
import nowTheme from '../constants/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
class DrawerItem extends React.Component {
  renderIcon = () => {
    const { title, name, focused } = this.props;

    switch (title) {
      case 'Trang Chủ':
        return (
          <Icon
            name="app2x"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : 'black'}
            style={{ opacity: 0.5 }}
          />
        );
      case 'Tin Tức':
        return (
          <Icon
            name="news"
            family="Entypo"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : 'black'}
            style={{ opacity: 0.5 }}
          />
        );
      case 'Sự Kiện':
        return (
          <Icon
            name="event"
            family="MaterialIcons"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : 'black'}
            style={{ opacity: 0.5 }}
          />
        );
      case 'Tài Khoản':
        return (
          <Icon
            name="profile-circle"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : 'black'}
            style={{ opacity: 0.5 }}
          />
        );
      case 'Thông Báo':
        return (
          <Icon
            name="notification"
            family="AntDesign"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : 'black'}
            style={{ opacity: 0.5 }}
          />
        );
      case 'QR Code':
        return (
          <Icon
            name="qrcode"
            family="AntDesign"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : 'black'}
            style={{ opacity: 0.5 }}
          />
        );
      case 'Examples':
        return (
          <Icon
            name="album"
            family="NowExtra"
            size={14}
            color={focused ? nowTheme.COLORS.PRIMARY : 'black'}
          />
        );
      case 'GETTING STARTED':
        return (
          <Icon
            name="spaceship2x"
            family="NowExtra"
            size={18}
            style={{ borderColor: 'rgba(0,0,0,0.5)', opacity: 0.5 }}
            color={focused ? nowTheme.COLORS.PRIMARY : 'black'}
          />
        );
      case 'LOGOUT':
        return (
          <Icon
            name="share"
            family="NowExtra"
            size={18}
            style={{ borderColor: 'rgba(0,0,0,0.5)', opacity: 0.5 }}
            color={focused ? nowTheme.COLORS.PRIMARY : 'black'}
          />
        );
      default:
        return null;
    }
  };

  onCLickLogout = () => {
    AsyncStorage.removeItem('@token')
    this.props.navigation.navigate('Login')
  };

  render() {
    const { focused, title, name, navigation } = this.props;

    const containerStyles = [
      styles.defaultStyle,
      focused ? [styles.activeStyle, styles.shadow] : null,
    ];

    return (
      <TouchableOpacity
        style={{ height: 60 }}
        onPress={() => {
          console.log('name', name);
          name == 'LOGOUT'
            ? this.onCLickLogout()
            : navigation.navigate(name == 'LOGOUT' ? 'Onboarding' : name);
        }}
      >
        <Block flex row style={containerStyles}>
          <Block middle flex={0.1} style={{ marginRight: 5 }}>
            {this.renderIcon()}
          </Block>
          <Block row center flex={0.9}>
            <Text
              style={{
                fontFamily: 'montserrat-regular',
                textTransform: 'uppercase',
                fontWeight: '300',
              }}
              size={12}
              bold={focused ? true : false}
              color={focused ? nowTheme.COLORS.PRIMARY : 'black'}
            >
              {title}
            </Text>
          </Block>
        </Block>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 15,
    paddingHorizontal: 14,
    color: 'white',
  },
  activeStyle: {
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 30,
    color: 'white',
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
  },
});

export default DrawerItem;
