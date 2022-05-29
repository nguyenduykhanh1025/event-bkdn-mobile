import { Block, Text, theme } from 'galio-framework';
import { Dimensions, Image, Linking, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerItem as DrawerCustomItem, Icon } from '../components';

import Images from '../constants/Images';
import React from 'react';
import nowTheme from '../constants/Theme';
import { useSafeArea } from 'react-native-safe-area-context';
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

const { width } = Dimensions.get('screen');

function CustomDrawerContent({ drawerPosition, navigation, profile, focused, state, ...rest }) {
  const insets = useSafeArea();
  // 'Components', 'Articles', 'Profile', 'Account'
  // const screens = ['Trang Chủ', 'Tin Tức', 'Sự Kiện', 'Tài Khoản', 'Thông Báo'];
  const screens = [
    {
      'title': 'Sự Kiện',
      'name': 'Home'
    },
    {
      'title': 'Tin Tức',
      'name': 'News'
    },
    // {
    //   'title': 'Sự Kiện',
    //   'name': 'Events'
    // },
    {
      'title': 'Tài Khoản',
      'name': 'Profile'
    },
    {
      'title': 'Thông Báo',
      'name': 'Notifies'
    },
    {
      'title': 'QR Code',
      'name': 'QrCode'
    },
  ]

  return (
    <Block style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <Block style={styles.header}>
        {/* <Image style={styles.logo} source={Images.Logo} /> */}
        <Text style={styles.logo}>DUT</Text>
        {/* <Block right style={styles.headerIcon}>
          <Icon name="align-left-22x" family="NowExtra" size={15} color={'black'} />
        </Block> */}
      </Block>
      <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {screens.map((item, index) => {
            return (
              <DrawerCustomItem
                title={item.title}
                name={item.name}
                key={index}
                navigation={navigation}
                focused={state.index === index ? true : false}
              />
            );
          })}
          <Block flex style={{ marginTop: 24, marginVertical: 8, paddingHorizontal: 8 }}>
            <Block
              style={{
                borderColor: 'black',
                width: '93%',
                borderWidth: StyleSheet.hairlineWidth,
                marginHorizontal: 10,
              }}
            />
            {/* <Text
              color={nowTheme.COLORS.BLACK}
              style={{
                marginTop: 30,
                marginLeft: 20,
                marginBottom: 10,
                fontFamily: 'montserrat-regular',
                fontWeight: '300',
                fontSize: 12,
              }}
            >
              DOCUMENTATION
            </Text> */}
          </Block>
          {/* <DrawerCustomItem title="GETTING STARTED" navigation={navigation} /> */}
          <DrawerCustomItem title="LOGOUT" navigation={navigation} />
        </ScrollView>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 3,
    justifyContent: 'center',
  },
  headerIcon: {
    marginTop: -20,
  },
  logo: {
    height: 40,
    // width: 37,
    tintColor: 'black',
    fontSize: 25,
    color: nowTheme.COLORS.PRIMARY
  },
});

export default CustomDrawerContent;
