# EatWell Nutrition Tracker

A nutrition and meal tracking application built with React Native and Expo.

## Features

- **Home Screen**: Track daily meals and calorie intake
- **Chat Screen**: Get nutrition advice from an AI assistant
- **Insights Screen**: View nutrition insights and statistics
- **Profile Screen**: Manage your profile and app settings

## Application Structure

The application follows a clean architecture with separation of concerns:

- `src/app`: Contains the screen components and navigation structure
- `src/components`: Reusable UI components
- `src/shared/components/ui`: Common UI components used across screens
- `src/features`: Business logic and feature-specific code
- `src/lib`: Utility functions, theme configuration, and other helpers

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm start
# or
yarn start
```

4. Open the app in your emulator or device using Expo Go

## Development

- Run Storybook to view component examples:
  - Set `SHOW_STORYBOOK = true` in `App.tsx`
  - Run `npm start`

- Check for dependency issues:
  ```bash
  npm run deps:check
  ```

- Fix dependency issues:
  ```bash
  npm run deps:fix
  ```

## Backend Integration

This app is designed with a clean separation between UI and backend logic. Backend services will be implemented in:

- `src/services`: API clients and service interfaces
- `src/features`: Business logic organized by feature domain

## Design System

The app uses a comprehensive design system with:

- Color scales and themes
- Typography styles
- Spacing and layout tokens
- Consistent component styling
