module.exports = {
  extends: ['eslint-config-bzc'],
  settings: {
    'import/resolver': {
      webpack: {
        config: 'website/webpack.config.js',
      },
    },
  },
  rules: {
    'default-param-last': 0,
    'max-len': ['error', 100, 2, {
      ignoreUrls: true,
      ignoreComments: true,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignorePattern: '^.*React\\$AbstractComponent.*',
    }],
    'no-useless-computed-key': 0,
  },
};
