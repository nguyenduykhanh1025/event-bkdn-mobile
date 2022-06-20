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

import { Images, nowTheme } from '../../../../constants';
import { useFocusEffect } from '@react-navigation/native';

const { width, height } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

function InformationDetailOfEvent({ title, content, isTitleMain, idDescription }) {
  return (
    <>
      <Block row space="between">
        {
          title ? <Text
            size={16}
            color="white"
            style={{
              color: '#2c2c2c',
              fontSize: 14,
              fontFamily: 'montserrat-bold',
              // marginRight: 10,
              marginTop: 10,
              flex: 1
            }}
          >
            {/* 9A9A9A */}
            {title}:
          </Text> : null
        }

        <Text
          style={{
            fontWeight: 'bold',/*  */
            color: isTitleMain ? nowTheme.COLORS.PRIMARY : '#2c2c2c',
            fontSize: idDescription ? 16 : 19,
            fontFamily: 'montserrat-bold',
            marginTop: 10,
            flex: 3
          }}
          size={14}
          color="white"
        >
          {content}
        </Text>
      </Block>
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

export default InformationDetailOfEvent;
