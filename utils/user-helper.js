import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getEmailFromStorage = async () => {
  const token = await AsyncStorage.getItem('@token');
  const jwtDecode = jwt_decode(token);
  return jwtDecode.email;
};

export { getEmailFromStorage };
