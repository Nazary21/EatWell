module.exports = {
  extends: [
    'universe/native',
    'universe/shared/typescript-analysis',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
  rules: {
    // Enforce using our Button component instead of Paper's
    'no-restricted-imports': ['error', {
      paths: [{
        name: 'react-native-paper',
        importNames: ['Button'],
        message: 'Please use our custom Button component from @/components/core/Button instead.',
      }],
    }],
  },
}; 