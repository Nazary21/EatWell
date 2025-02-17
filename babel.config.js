module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@': './src',
          },
        },
      ],
      '@babel/plugin-transform-export-namespace-from',
      '@babel/plugin-proposal-export-namespace-from',
      'expo-router/babel',
    ],
    env: {
      test: {
        plugins: ['@babel/plugin-transform-flow-strip-types']
      }
    }
  };
}; 