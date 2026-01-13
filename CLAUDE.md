# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AllPro is a React Native mobile application featuring:
- User authentication via email and password
- Photo capture from device camera
- Photo import from device gallery
- Design: white (dominant), red, and gray color scheme with a minimalist, modern interface

## Project Status

This is a new project. The React Native application has not been initialized yet. When setting up the project, you will need to:

1. Initialize React Native project (Expo or React Native CLI)
2. Set up authentication system
3. Configure camera and gallery permissions
4. Implement photo upload/capture functionality

## Common Commands (to be updated once project is initialized)

### React Native CLI Projects
```bash
# Install dependencies
npm install
# or
yarn install

# Run on Android
npm run android
# or
yarn android

# Run on iOS (macOS only)
npm run ios
# or
yarn ios

# Start Metro bundler
npm start
# or
yarn start

# Run tests
npm test
# or
yarn test

# Lint code
npm run lint
# or
yarn lint
```

### Expo Projects
```bash
# Install dependencies
npm install
# or
yarn install

# Start development server
npx expo start
# or
yarn start

# Run on Android
npx expo start --android

# Run on iOS
npx expo start --ios

# Run tests
npm test
```

## Architecture Notes

### Authentication
- Implementation will require email/password authentication
- Consider using Firebase Authentication, AWS Amplify, or custom backend API

### Photo Management
- Will require native permissions for camera and gallery access
- React Native modules needed:
  - `react-native-image-picker` or `expo-image-picker`
  - `react-native-permissions` or Expo's permission system

### Design System
- Primary colors: white (background/dominant), red (accents/CTAs), gray (text/borders)
- Focus on clean, minimalist UI with good whitespace
- Modern, user-friendly interface prioritizing simplicity
