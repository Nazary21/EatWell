module.exports = {
  name: 'CalTracker',
  slug: 'caltracker',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'cover',
    backgroundColor: '#ffffff'
  },
  assetBundlePatterns: [
    '**/*'
  ],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.getwell.caltrackerreact',
    associatedDomains: ['applinks:caltrackerreact.app.link']
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff'
    },
    package: 'com.getwell.caltrackerreact',
    intentFilters: [
      {
        action: 'VIEW',
        data: [
          {
            scheme: 'caltrackerreact',
          },
        ],
        category: ['BROWSABLE', 'DEFAULT'],
      },
    ],
  },
  web: {
    favicon: './assets/favicon.png'
  },
  experiments: {
    tsconfigPaths: true
  },
  plugins: [
    [
      'expo-router',
      {
        root: './src/app'
      }
    ]
  ],
  scheme: 'caltracker',
  extra: {
    eas: {
      projectId: "your-project-id"
    }
  }
}; 