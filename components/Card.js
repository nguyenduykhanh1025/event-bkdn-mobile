import React, { useState, useEffect } from 'react';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import { nowTheme } from '../constants';
import EVENT_USER_STATUS from '../constants/event-users-status';

const Card = (props) => {
  const {
    navigation,
    item,
    horizontal,
    full,
    style,
    ctaColor,
    imageStyle,
    ctaRight,
    titleStyle,
    data,
  } = props;

  const imageStyles = [full ? styles.fullImage : styles.horizontalImage, imageStyle];
  const titleStyles = [styles.cardTitle, titleStyle];
  const cardContainer = [styles.card, styles.shadow, style];
  const imgContainer = [
    styles.imageContainer,
    horizontal ? styles.horizontalStyles : styles.verticalStyles,
    styles.shadow,
  ];
  const [images, setImages] = useState([''])

  useEffect(() => {
    buildImage()
    console.log(data);
  }, [data])

  const buildImage = () => {
    if (data) {
      setImages(data.images_str.split(','))
    }
  }

  const renderEventStatus = () => {
    if (data.event_users_status == EVENT_USER_STATUS.IN_PROGRESS) {
      return 'Đang yêu cầu'
    } else if (data.event_users_status == EVENT_USER_STATUS.REJECTED) {
      return 'Đã từ chối'
    } else if (data.event_users_status == EVENT_USER_STATUS.ACCEPTED) {
      return 'Đã tham gia'
    } else {
      return 'Chưa tham gia'
    }
  }

  return (
    <Block row={horizontal} card flex style={cardContainer}>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('EventDetail', {
            screen: 'EventDetail',
            params: { idEvent: data.id, event_users_status: data.event_users_status },
          });
        }}
      >
        <Block flex style={imgContainer}>
          <Image resizeMode="cover" source={{ uri: images[0] }} style={imageStyles} />
        </Block>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('EventDetail', {
            screen: 'EventDetail',
            params: { idEvent: data.id, event_users_status: data.event_users_status },
          });
        }}
        style={styles.touchableCardDescription}
      >
        <Block flex space="between" style={styles.cardDescription}>
          <Block flex>
            <Text
              style={{ fontFamily: 'montserrat-regular', fontWeight: 'bold' }}
              size={14}
              color={nowTheme.COLORS.SECONDARY}
            >
              {data?.title}
            </Text>
            <Block flex left>
              <Text
                style={{ fontFamily: 'montserrat-regular' }}
                size={12}
                color={nowTheme.COLORS.TEXT}
              >
                {data?.description}
              </Text>
            </Block>
          </Block>
          <Block right={ctaRight ? true : false}>
            <Text
              style={styles.articleButton}
              size={12}
              muted={!ctaColor}
              color={ctaColor || nowTheme.COLORS.ACTIVE}
              bold
            >
              {renderEventStatus()}
            </Text>
          </Block>
        </Block>
      </TouchableWithoutFeedback>
    </Block>
  );
};

Card.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
  ctaRight: PropTypes.bool,
  titleStyle: PropTypes.any,
  textBodyStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    height: 120,
    marginBottom: 4,
  },
  cardTitle: {
    paddingHorizontal: 9,
    paddingTop: 7,
    paddingBottom: 15,
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  fullImage: {
    height: 215,
  },
  shadow: {
    shadowColor: '#8898AA',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  articleButton: {
    fontFamily: 'montserrat-bold',
    paddingHorizontal: 0,
    paddingVertical: 7,
  },
});

export default Card;
