# Dependencies Documentation

## Core Dependencies

### Expo & React Native
- `expo`: ~49.0.15
- `react-native`: 0.72.10
- `react`: 18.2.0
- `react-dom`: 18.2.0

### Navigation & Routing
- `expo-router`: ~2.0.0
- `expo-linking`: ~5.0.2
- `expo-constants`: ~14.4.2
- `@react-navigation/native`: ^6.1.9
- `@react-navigation/native-stack`: ^6.9.17
- `react-native-screens`: ~3.22.0
- `react-native-safe-area-context`: 4.6.3

### UI Components & Styling
- `react-native-paper`: ^5.0.0
- `react-native-gesture-handler`: ~2.12.0
- `react-native-reanimated`: ~3.3.0

### State Management
- `@reduxjs/toolkit`: ^2.0.0
- `react-redux`: ^9.0.0

### Backend & Data
- `@supabase/supabase-js`: ^2.0.0

### Development Dependencies
- `@babel/core`: ^7.20.0
- `@types/react`: ~18.2.14
- `typescript`: ^5.1.3

## Configuration Files

### babel.config.js
```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'expo-router/babel',
      'react-native-reanimated/plugin',
    ],
  };
};
```

### tsconfig.json
```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

## Project Structure
```
src/
  ├── app/
  │   ├── _layout.tsx    # Root layout with Paper Provider
  │   ├── index.tsx      # Home screen
  │   └── (tabs)/        # Tab navigation structure
  └── ...
```

## Important Notes

1. **Expo SDK Version**: We're using Expo SDK 49, which is stable and compatible with all our current dependencies.

2. **Path Aliases**: The project uses TypeScript path aliases with `@/*` pointing to the `src/` directory.

3. **Navigation**: Using Expo Router (file-based routing) with React Navigation integration.

4. **UI Framework**: React Native Paper v5 for consistent UI components.

5. **State Management**: Redux Toolkit for global state management.

## Installation Instructions

1. Clean install:
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

2. Starting the app:
```bash
npx expo start
```

## Known Working Configuration

- Node.js: Compatible with v16.x and above
- iOS: 13.0 and above
- Android: API Level 21 and above
- Expo Go: Latest version

## Troubleshooting

If you encounter dependency issues:
1. Clear watchman:
```bash
watchman watch-del '/path/to/project' ; watchman watch-project '/path/to/project'
```

2. Clear metro cache:
```bash
npx expo start --clear
``` 