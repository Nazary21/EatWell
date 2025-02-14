import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'CalTrackerReact',
  slug: 'CalTrackerReact',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    newArchEnabled: true,
    bundleIdentifier: 'com.getwell.caltrackerreact',
    config: {
      googleSignIn: {
        reservedClientId: '963420431336-5fj4ri1jsqoveensf9bf619f14o4qun8.apps.googleusercontent.com',
      },
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.getwell.caltrackerreact',
    newArchEnabled: true,
  },
  web: {
    favicon: './assets/favicon.png',
  },
  plugins: [
    'expo-router',
    'expo-font',
    [
      '@react-native-google-signin/google-signin',
      {
        iosUrlScheme: 'com.googleusercontent.apps.963420431336-5fj4ri1jsqoveensf9bf619f14o4qun8',
        androidClientId: '963420431336-et5t2rtngh7a74pfchl5jckj7kpvbiu6.apps.googleusercontent.com',
      },
    ],
  ],
  scheme: 'caltrackerreact',
  extra: {
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
    eas: {
      projectId: '47e5e52f-06b1-4d9f-8abf-7581a1e99406'
    }
  },
}); 