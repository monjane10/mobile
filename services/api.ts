import axios from 'axios';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

function resolveBaseURL() {
  // 1) Usa variável de ambiente se definida
  const envUrl = process.env.EXPO_PUBLIC_API_URL;
  if (envUrl) return envUrl;

  // 2) Usa o mesmo host do Metro (hostUri) com porta 3333
  const hostUri = Constants.expoConfig?.hostUri;
  const lanHost = hostUri?.split(':')[0];
  if (lanHost) return `http://${lanHost}:3333`;

  // 3) Fallback para localhost (emulador Android usa 10.0.2.2)
  if (Platform.OS === 'android') return 'http://10.0.2.2:3333';
  return 'http://localhost:3333';
}

const baseURL = resolveBaseURL();
console.log('API baseURL ->', baseURL);

export const api = axios.create({
  baseURL,
});
