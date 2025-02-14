# CalTrackerReact

A comprehensive health and nutrition tracking application built with React Native and Expo.

## Features

- Email/password authentication
- Google Sign-In (requires development build)
- Apple Sign-In (requires development build)
- Beautiful Material Design 3 UI
- Dark/Light theme support
- Comprehensive health tracking features (coming soon)

## Development Setup

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn
- Expo CLI
- Expo Go app on your mobile device

### Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd CalTrackerReact
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Then edit `.env` with your Supabase credentials.

4. Start the development server:
```bash
npx expo start
```

### Development Notes

- The app can be run in Expo Go with limited functionality (email auth only)
- Full functionality requires a development build
- Social authentication requires:
  - Apple Developer Account for iOS
  - Or Android device/emulator

## Contributing

1. Create a feature branch
2. Commit your changes
3. Push to the branch
4. Create a Pull Request

## License

MIT
