import Constants from 'expo-constants';

const apiUrl = Constants.expoConfig?.extra?.apiUrl || 'http://192.168.1.30:5000';

export default {
  apiUrl
};
