# Dependencies Configuration Guide

## Core Dependencies

### React & React Native
```json
{
  "react": "18.2.0",
  "react-native": "0.72.6",
  "react-dom": "18.2.0"
}
```
- Stable version combination
- Supports all required features
- Compatible with Expo SDK 49

### Expo
```json
{
  "expo": "49.0.15",
  "expo-router": "2.0.0",
  "expo-constants": "~14.4.2",
  "expo-linking": "~5.0.2",
  "expo-splash-screen": "~0.20.5",
  "expo-status-bar": "~1.6.0",
  "expo-font": "~11.4.0"
}
```
- SDK 49 for stability
- Managed workflow
- Expo Router v2 for type-safe navigation

### State Management
```json
{
  "@reduxjs/toolkit": "^2.5.1",
  "react-redux": "^9.2.0"
}
```
- Latest stable versions
- Full TypeScript support
- Performance optimized

### UI Components
```json
{
  "react-native-paper": "^5.13.1",
  "react-native-safe-area-context": "4.6.3",
  "@expo-google-fonts/inter": "^0.2.3",
  "@expo-google-fonts/plus-jakarta-sans": "^0.2.3"
}
```
- Material Design 3 support
- Consistent theming
- Safe area handling

### Backend & Authentication
```json
{
  "@supabase/supabase-js": "^2.48.1",
  "@react-native-async-storage/async-storage": "1.18.2",
  "react-native-url-polyfill": "^2.0.0"
}
```
- Stable Supabase client
- Proper storage handling
- Required polyfills

### Development
```json
{
  "typescript": "^5.1.3",
  "@types/react": "~18.2.14",
  "@types/react-native": "^0.72.8"
}
```
- TypeScript for type safety
- Compatible type definitions
- Development tools

## Expo Dependency Management

### Why Expo for Dependencies?
1. **Version Compatibility**
   - Expo SDK ensures all dependencies work together
   - Pre-tested version combinations
   - Automatic resolution of peer dependencies

2. **Native Module Management**
   - Handles native module linking automatically
   - Manages iOS and Android builds
   - Simplifies plugin installation

3. **Update Process**
   ```bash
   # Update Expo SDK and dependencies
   expo upgrade
   
   # Install Expo package
   npx expo install package-name
   ```

4. **Best Practices**
   - Use `npx expo install` instead of `npm install`
   - Let Expo handle version resolution
   - Follow Expo SDK compatibility matrix

5. **Benefits**
   - Reduced dependency conflicts
   - Simplified native module integration
   - Consistent development environment
   - Automated version management

### Dependency Resolution Strategy
1. **Expo Managed Dependencies**
   - Core React Native packages
   - Expo SDK packages
   - Navigation libraries
   - Essential utilities

2. **Custom Dependencies**
   - UI components (react-native-paper)
   - State management (Redux)
   - Backend integration (Supabase)

3. **Resolution Process**
   ```bash
   # Preferred: Install with Expo
   npx expo install package-name

   # Alternative: Install with npm
   npm install package-name

   # Fix issues with Expo
   expo doctor --fix-dependencies
   ```

## Version Management Guidelines

1. **Expo SDK Updates**
   - Wait 2-3 weeks after new SDK release
   - Test thoroughly in development
   - Update all Expo packages together

2. **React Native Updates**
   - Follow Expo SDK compatibility
   - Test navigation thoroughly
   - Verify native module support

3. **UI Library Updates**
   - Test theme compatibility
   - Verify component behavior
   - Check for breaking changes

4. **State Management**
   - Test store migrations
   - Verify middleware compatibility
   - Check for performance impact

## Troubleshooting Log 

### 2024-02-17 - Initial Setup
**Issue**: Dependencies configuration for new project
**Resolution**:
1. Set up core dependencies with Expo SDK 49
2. Configured React Native Paper
3. Added Supabase integration
4. Set up navigation dependencies

**Notes**:
- Expo Router v2 requires specific configuration
- React Native Paper v5 needs proper theme setup
- Supabase requires URL polyfill

### Version Update Protocol

1. **Before Update**
   - Document current versions
   - Create test branch
   - Run full test suite

2. **During Update**
   - Update in correct order:
     1. Expo SDK
     2. React Native
     3. UI libraries
     4. Other dependencies
   - Run tests after each major update
   - Document any breaking changes

3. **After Update**
   - Verify all features
   - Test on both platforms
   - Update documentation
   - Create update log entry

## Common Issues & Solutions

### Metro Bundler Issues
```bash
# Clear Metro cache
npm start -- --reset-cache
```

### Pod Install Issues
```bash
cd ios
pod deintegrate
pod install
```

### Dependency Resolution
```bash
# Fix peer dependencies
npm install --legacy-peer-deps

# Force resolution
npm install --force
```

### TypeScript Errors
```bash
# Clean TypeScript cache
rm -rf node_modules/.cache/typescript
```

## Future Considerations & Reactive Maintenance

1. **Version Updates**
   - Update dependencies when issues arise
   - Monitor GitHub issues for critical bugs
   - Follow Expo's release notes for breaking changes
   - React to security advisories promptly

2. **Performance Monitoring**
   - Address bundle size issues as they appear
   - Optimize build times when they become problematic
   - Monitor runtime performance and memory usage
   - React to user-reported performance issues

3. **Dependency Health**
   - Update outdated packages when needed
   - Remove unused dependencies when discovered
   - Consolidate similar dependencies when identified
   - Address security vulnerabilities as they're reported

4. **Planned Evaluations**
   - Expo SDK 50 when stability is confirmed
   - React Native Paper v6 when features are needed
   - React Native 0.73 based on Expo compatibility
``` 