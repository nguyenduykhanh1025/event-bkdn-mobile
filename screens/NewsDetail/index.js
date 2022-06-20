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
		// getEventDetailFromAPI();
	}, [route])


	const getEventDetailFromAPI = async () => {
		try {
			const res = await participantEventService.show(route.params.idEvent);
			setEvent(res.data.data);
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
				ToastAndroid.show(
					'Bạn đã tham gia sự kiện này.',
					ToastAndroid.SHORT,
					ToastAndroid.CENTER
				);
			}
		} finally {
		}
	};

	const onClickRemoveToEvent = async () => {
		try {
			console.log(event.id);
			const payload = {
				"id_event": event.id
			}
			const res = await participantEventUserService.removeToEvent(payload);
			navigation.goBack();
			console.log('res', res);
		} catch (err) {
			console.log('err', err.response);
		} finally {
		}
	}

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
							{/* <Block flex style={styles.profileCard}>
								<Block
									style={{ position: 'absolute', width: width, zIndex: 5, paddingHorizontal: 20 }}
								>
									<Block style={{ top: height * 0.1 }}>
										<Block middle>
										</Block>
										<Block style={styles.info}>
											<Block row space="around">
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
														Đăng Kí Xem
													</Text>
												</Block>
											</Block>
										</Block>
									</Block>
								</Block>
							</Block> */}
						</ImageBackground>
					</Block>
				</Block>
				<Block flex={0.9} style={{ padding: theme.SIZES.BASE, marginTop: 0 }}>
					<ScrollView showsVerticalScrollIndicator={false}>
						<Text
							style={{
								fontWeight: 'bold',/*  */
								color: nowTheme.COLORS.PRIMARY,
								fontSize: 19,
								fontFamily: 'montserrat-bold',
								marginTop: 10,
								flex: 3
							}}
							size={14}
							color="white"
						>
							{'HỢP TÁC GIỮA TRƯỜNG ĐẠI HỌC BÁCH KHOA ĐHĐN VỚI TRƯỜNG ĐẠI HỌC POLYTECH MARSEILLE (PHÁP)'}
						</Text>
					</ScrollView>
				</Block>
			</ScrollView>
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

export default NewsDetail;
