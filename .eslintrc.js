module.exports = {
  extends: ['eslint-config-bzc'],
  settings: {
    'import/resolver': {
      webpack: {
        config: 'website/webpack.config.js',
      },
    },
  },
};
